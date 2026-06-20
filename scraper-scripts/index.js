import fs from 'fs';
import path from 'path';
import { URL } from 'url';
import http from 'http';
import https from 'https';
import { File } from 'fs/promises';
import { Readable } from 'stream';
import { pipeline } from 'stream/promises';

const CONFIG = {
  baseUrl: 'https://www.solarsquare.in/',
  outputDir: 'C:/Users/nanda/solarsquare',
  maxDepth: 2,
  maxFileSize: 50 * 1024 * 1024, // 50MB
  requestTimeout: 30000,
  allowedHosts: ['www.solarsquare.in', 'solarsquare.in'],
  blockedSchemes: ['file', 'ftp', 'gopher', 'file://'],
  blockedExtensions: ['.exe', '.dll', '.bat', '.cmd', '.sh', '.php', '.asp', '.aspx', '.jsp'],
  maxConcurrentDownloads: 5,
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
};

class SecureCloner {
  constructor() {
    this.visited = new Set();
    this.downloaded = new Map();
    this.outputDir = path.resolve(CONFIG.outputDir);
    this.ensureOutputDir();
    this.downloadQueue = [];
    this.activeDownloads = 0;
    this.stats = { pages: 0, assets: 0, errors: 0 };
  }

  ensureOutputDir() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
    // Create assets directory
    const assetsDir = path.join(this.outputDir, 'assets');
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }
  }

  // Security: Validate URL against allowed hosts and schemes
  validateUrl(urlString) {
    try {
      const url = new URL(urlString);
      
      // Check scheme
      if (CONFIG.blockedSchemes.includes(url.protocol)) {
        throw new Error(`Blocked scheme: ${url.protocol}`);
      }
      
      // Check host
      const host = url.host.toLowerCase();
      if (!CONFIG.allowedHosts.some(allowed => 
        host === allowed || host.endsWith(`.${allowed}`))) {
        throw new Error(`Blocked host: ${host}`);
      }
      
      // Check file extension
      const ext = path.extname(url.pathname).toLowerCase();
      if (CONFIG.blockedExtensions.includes(ext)) {
        throw new Error(`Blocked extension: ${ext}`);
      }
      
      return url;
    } catch (error) {
      console.error(`[SECURITY] Invalid URL blocked: ${urlString} - ${error.message}`);
      return null;
    }
  }

  // Security: Sanitize file path to prevent directory traversal
  sanitizeFilePath(filename) {
    // Remove any path traversal sequences
    let safe = filename.replace(/\.\./g, '');
    safe = safe.replace(/[<>:"|?*]/g, '_');
    safe = safe.replace(/\0/g, '');
    
    // Limit length
    if (safe.length > 255) {
      const ext = path.extname(safe);
      safe = safe.slice(0, 250) + ext;
    }
    
    return safe;
  }

  // Security: Check for private IP ranges (SSRF protection)
  isPrivateIp(hostname) {
    // Simple check - in production, use a proper IP validation library
    const privatePatterns = [
      /^127\./, /^10\./, /^172\.(1[6-9]|2\d|3[01])\./, 
      /^192\.168\./, /^0\.0\.0\.0/, /^::1$/, /^fe80:/i
    ];
    return privatePatterns.some(pattern => pattern.test(hostname));
  }

  // Security: Secure file download with size limits
  async downloadFile(url) {
    if (this.downloaded.has(url)) {
      return this.downloaded.get(url);
    }

    const validatedUrl = this.validateUrl(url);
    if (!validatedUrl) {
      this.stats.errors++;
      return null;
    }

    // SSRF protection
    if (this.isPrivateIp(validatedUrl.hostname)) {
      console.error(`[SECURITY] Private IP blocked: ${validatedUrl.hostname}`);
      this.stats.errors++;
      return null;
    }

    try {
      await this.waitForDownloadSlot();
      
      const filename = this.sanitizeFilePath(path.basename(validatedUrl.pathname) || 'file');
      const safeFilename = `${Buffer.from(url).toString('base64').replace(/[^a-zA-Z0-9_-]/g, 'x').slice(0, 10)}${path.extname(filename)}`;
      const filePath = path.join(this.outputDir, 'assets', safeFilename);
      
      // Ensure directory exists
      fs.mkdirSync(path.dirname(filePath), { recursive: true });

      const file = await this.fetchWithSecurity(validatedUrl.href, filePath);
      
      if (file) {
        this.downloaded.set(url, `assets/${safeFilename}`);
        this.stats.assets++;
        console.log(`[ASSET] ${url} -> assets/${safeFilename}`);
        return `assets/${safeFilename}`;
      }
    } catch (error) {
      console.error(`[DOWNLOAD ERROR] ${url}: ${error.message}`);
      this.stats.errors++;
    } finally {
      this.releaseDownloadSlot();
    }
    
    return null;
  }

  // Security: Secure HTTP fetch with headers and validation
  async fetchWithSecurity(url, filePath) {
    return new Promise((resolve, reject) => {
      const client = url.startsWith('https') ? https : http;
      
      const request = client.get(url, {
        headers: {
          'User-Agent': CONFIG.userAgent,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate, br',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
          'Sec-Fetch-Dest': 'document',
          'Sec-Fetch-Mode': 'navigate',
          'Sec-Fetch-Site': 'none',
          'Sec-Fetch-User': '?1'
        },
        timeout: CONFIG.requestTimeout,
        maxRedirects: 5
      }, (response) => {
        // Validate content type
        const contentType = response.headers['content-type'] || '';
        if (contentType.includes('text/html') || contentType.includes('image/') || 
            contentType.includes('text/css') || contentType.includes('application/javascript')) {
          
          // Check content length
          const contentLength = parseInt(response.headers['content-length']);
          if (contentLength && contentLength > CONFIG.maxFileSize) {
            response.destroy();
            reject(new Error(`File too large: ${contentLength} bytes`));
            return;
          }

          const fileStream = fs.createWriteStream(filePath);
          let downloadedBytes = 0;

          response.on('data', (chunk) => {
            downloadedBytes += chunk.length;
            if (downloadedBytes > CONFIG.maxFileSize) {
              response.destroy();
              fs.unlink(filePath, () => {});
              reject(new Error(`File too large during download`));
              return;
            }
          });

          response.pipe(fileStream);
          fileStream.on('finish', () => {
            fileStream.close();
            resolve(filePath);
          });
        } else {
          response.destroy();
          reject(new Error(`Invalid content type: ${contentType}`));
        }
      });

      request.on('error', reject);
      request.on('timeout', () => {
        request.destroy();
        reject(new Error('Request timeout'));
      });
    });
  }

  // Download queue management
  async waitForDownloadSlot() {
    while (this.activeDownloads >= CONFIG.maxConcurrentDownloads) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    this.activeDownloads++;
  }

  releaseDownloadSlot() {
    this.activeDownloads--;
  }

  // Security: Sanitize HTML content
  sanitizeHtml(html) {
    // Remove script tags and event handlers
    let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    sanitized = sanitized.replace(/\s+on\w+\s*=\s*(".*?"|'.*?'|\S+)/gi, '');
    
    // Remove dangerous tags
    sanitized = sanitized.replace(/<(iframe|object|embed|applet|form|input|textarea|button|select)\b[^>]*>/gi, '');
    
    // Remove javascript: URLs
    sanitized = sanitized.replace(/\s+href\s*=\s*("javascript:.*?"|'javascript:.*?'|javascript:\S+)/gi, '');
    
    return sanitized;
  }

  // Process and save a page
  async processPage(url, depth = 0) {
    if (this.visited.has(url) || depth > CONFIG.maxDepth) {
      return;
    }

    const validatedUrl = this.validateUrl(url);
    if (!validatedUrl) return;

    this.visited.add(url);
    console.log(`[PAGE] ${url} (depth: ${depth})`);

    try {
      const html = await this.fetchPageAsText(validatedUrl.href);
      const sanitized = this.sanitizeHtml(html);
      
      // Parse and rewrite assets
      const processed = await this.rewriteAssets(validatedUrl.href, sanitized);
      
      // Save page
      const pageName = depth === 0 ? 'index.html' : `page_${depth}_${Buffer.from(url).toString('base64').slice(0, 8)}.html`;
      const pagePath = path.join(this.outputDir, pageName);
      
      fs.writeFileSync(pagePath, processed, 'utf8');
      this.stats.pages++;
      console.log(`[SAVED] ${pageName}`);

      // Extract and queue links
      await this.extractLinks(validatedUrl.href, processed, depth);
      
    } catch (error) {
      console.error(`[PAGE ERROR] ${url}: ${error.message}`);
      this.stats.errors++;
    }
  }

  async fetchPageAsText(url) {
    return new Promise((resolve, reject) => {
      const client = url.startsWith('https') ? https : http;
      
      const request = client.get(url, {
        headers: {
          'User-Agent': CONFIG.userAgent,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        },
        timeout: CONFIG.requestTimeout
      }, (response) => {
        let data = '';
        response.on('data', chunk => data += chunk);
        response.on('end', () => resolve(data));
      });

      request.on('error', reject);
      request.on('timeout', () => {
        request.destroy();
        reject(new Error('Request timeout'));
      });
    });
  }

  async rewriteAssets(baseUrl, html) {
    let processed = html;

    // Rewrite image sources
    processed = processed.replace(/(src|srcset)\s*=\s*("(.*?)"|'(.*?)'|([^\s>]+))/gi, (match, attr, quote, dq, sq, unquoted) => {
      const url = quote ? (dq || sq) : unquoted;
      if (!url || url.startsWith('data:') || url.startsWith('#') || url.startsWith('//')) {
        return match;
      }
      
      const absoluteUrl = new URL(url, baseUrl).href;
      const localPath = this.downloaded.get(absoluteUrl) || this.assetPath(absoluteUrl);
      return `${attr}="${localPath}"`;
    });

    // Rewrite stylesheets
    processed = processed.replace(/href\s*=\s*("(.*?)"|'(.*?)'|([^\s>]+))/gi, (match, quote, dq, sq, unquoted) => {
      const url = quote ? (dq || sq) : unquoted;
      if (!url || url.startsWith('#') || url.startsWith('//')) {
        return match;
      }
      
      if (url.includes('.css') || url.includes('stylesheet')) {
        const absoluteUrl = new URL(url, baseUrl).href;
        const localPath = this.downloaded.get(absoluteUrl) || this.assetPath(absoluteUrl);
        return `href="${localPath}"`;
      }
      return match;
    });

    // Rewrite script sources
    processed = processed.replace(/src\s*=\s*("(.*?)"|'(.*?)'|([^\s>]+))/gi, (match, quote, dq, sq, unquoted) => {
      const url = quote ? (dq || sq) : unquoted;
      if (!url || url.startsWith('#') || url.startsWith('//')) {
        return match;
      }
      
      const absoluteUrl = new URL(url, baseUrl).href;
      const localPath = this.downloaded.get(absoluteUrl) || this.assetPath(absoluteUrl);
      return `src="${localPath}"`;
    });

    return processed;
  }

  assetPath(url) {
    const hash = Buffer.from(url).toString('base64').replace(/[^a-zA-Z0-9_-]/g, 'x').slice(0, 10);
    const ext = path.extname(new URL(url).pathname) || '.bin';
    return `assets/${hash}${ext}`;
  }

  async extractLinks(baseUrl, html, depth) {
    const linkRegex = /href\s*=\s*("(.*?)"|'(.*?)'|([^\s>]+))/gi;
    let match;
    
    while ((match = linkRegex.exec(html)) !== null) {
      const url = match[2] || match[3] || match[4];
      if (!url || url.startsWith('#') || url.startsWith('mailto:') || url.startsWith('tel:')) {
        continue;
      }
      
      const absoluteUrl = new URL(url, baseUrl).href;
      if (this.shouldCrawl(absoluteUrl, depth)) {
        setTimeout(() => this.processPage(absoluteUrl, depth + 1), 0);
      }
    }
  }

  shouldCrawl(url, depth) {
    if (depth >= CONFIG.maxDepth) return false;
    
    const validated = this.validateUrl(url);
    if (!validated) return false;
    
    // Only crawl HTML pages
    const pathname = validated.pathname.toLowerCase();
    return pathname.endsWith('/') || pathname.endsWith('.html') || pathname === '';
  }

  async start() {
    console.log('🔒 Secure Website Cloner Starting...\n');
    console.log(`Base URL: ${CONFIG.baseUrl}`);
    console.log(`Output: ${this.outputDir}`);
    console.log(`Max Depth: ${CONFIG.maxDepth}\n`);

    await this.processPage(CONFIG.baseUrl, 0);

    console.log('\n✅ Cloning Complete!');
    console.log(`Pages: ${this.stats.pages}`);
    console.log(`Assets: ${this.stats.assets}`);
    console.log(`Errors: ${this.stats.errors}`);
    console.log(`Output: ${this.outputDir}`);
  }
}

// Security: Input validation for command line args
function validateArgs() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
🔒 Secure Website Cloner

Usage: node src/index.js [options]

Options:
  --url <url>        Base URL to clone
  --output <dir>     Output directory
  --depth <number>   Maximum crawl depth
  --timeout <ms>     Request timeout
  --help             Show this help

Example:
  node src/index.js --url https://example.com --output ./site --depth 3
    `);
    process.exit(0);
  }

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--url':
        CONFIG.baseUrl = args[++i];
        break;
      case '--output':
        CONFIG.outputDir = path.resolve(args[++i]);
        break;
      case '--depth':
        CONFIG.maxDepth = parseInt(args[++i]);
        break;
      case '--timeout':
        CONFIG.requestTimeout = parseInt(args[++i]);
        break;
    }
  }
}

// Main execution
validateArgs();
const cloner = new SecureCloner();
cloner.start().catch(console.error);
