# 🔒 Secure Website Cloner

A secure, configurable website cloner that preserves exact front-end design with security-first architecture.

## Features

- **Security First:**
  - URL validation with allowed hosts
  - SSRF protection (private IP blocking)
  - Directory traversal prevention
  - File extension filtering
  - HTML sanitization (XSS prevention)
  - Content-type validation
  - File size limits
  - Request timeouts

- **Exact Design Preservation:**
  - Downloads all CSS, JS, images
  - Rewrites asset paths automatically
  - Preserves HTML structure
  - Handles relative/absolute URLs

## Installation

```bash
npm install
```

## Usage

### Basic Clone
```bash
npm run clone
```

### Custom Options
```bash
node src/index.js --url https://example.com --output ./site --depth 3
```

### Options
- `--url <url>` - Base URL to clone
- `--output <dir>` - Output directory
- `--depth <number>` - Maximum crawl depth (default: 2)
- `--timeout <ms>` - Request timeout (default: 30000)
- `--help` - Show help

## Security Configuration

Edit `CONFIG` object in `src/index.js`:

```javascript
const CONFIG = {
  baseUrl: 'https://www.solarsquare.in/',
  outputDir: 'C:/Users/nanda/solarsquare',
  maxDepth: 2,
  maxFileSize: 50 * 1024 * 1024, // 50MB
  requestTimeout: 30000,
  allowedHosts: ['www.solarsquare.in', 'solarsquare.in'],
  blockedSchemes: ['file', 'ftp', 'gopher'],
  blockedExtensions: ['.exe', '.dll', '.bat', '.cmd', '.sh'],
  maxConcurrentDownloads: 5
};
```

## Output Structure

```
solarsquare/
├── index.html          # Homepage
├── page_1_abc123.html  # Subpages (if depth > 0)
├── assets/
│   ├── xyz789.css
│   ├── abc123.js
│   └── def456.jpg
└── README.md
```

## Security Measures

1. **URL Validation:** Only allowed hosts can be accessed
2. **SSRF Protection:** Blocks private/internal IPs
3. **Path Sanitization:** Prevents directory traversal attacks
4. **Content Validation:** Checks MIME types
5. **Size Limits:** Prevents DoS via large files
6. **HTML Sanitization:** Removes scripts and event handlers
7. **Extension Blocking:** Blocks executable files
8. **Timeout Protection:** Prevents hanging requests

## Troubleshooting

**Missing dependencies:**
```bash
npm install
```

**Permission errors:**
- Ensure write access to output directory
- Run from a location with proper permissions

**Download failures:**
- Check internet connection
- Verify URL is accessible
- Review `allowedHosts` in config

## Future Editing

To clone a different site:
1. Update `CONFIG.baseUrl`
2. Update `CONFIG.allowedHosts` to include the new domain
3. Run: `node src/index.js`

To adjust depth/speed:
1. Change `CONFIG.maxDepth`
2. Change `CONFIG.maxConcurrentDownloads`

## License

MIT
