const fs = require('fs');
const path = require('path');
const { URL } = require('url');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const csstree = require('css-tree');

const BASE_URL = 'https://www.solarsquare.in/';
const OUT_DIR = path.resolve('C:/Users/nanda/solarsquare');

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const visited = new Set();
const assets = new Map();

function assetPath(url) {
  if (assets.has(url)) return assets.get(url);
  const parsed = new URL(url);
  let ext = path.extname(parsed.pathname) || '';
  if (!ext) ext = '.bin';
  const hash = Buffer.from(url).toString('base64').replace(/[^a-zA-Z0-9_-]/g, 'x').slice(0, 10);
  const filename = `${hash}${ext}`;
  const dest = path.join('assets', filename);
  assets.set(url, dest);
  return dest;
}

function resolveUrl(base, relative) {
  try { return new URL(relative, base).href; } catch { return relative; }
}

function relPathFromOut(fullPath) {
  return path.relative(OUT_DIR, fullPath).replace(/\\/g, '/');
}

async function downloadAsset(url) {
  if (!url.startsWith('http')) return url;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    const rel = assetPath(url);
    const abs = path.join(OUT_DIR, rel);
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, buffer);
    return rel;
  } catch (e) {
    console.error('[download failed]', url, e.message);
    return null;
  }
}

function rewriteCssUrls(cssText, baseUrl) {
  return csstree.parse(cssText, { positions: false }).walk((node, item, list) => {
    if (node.type === 'Url') {
      const raw = node.value.raw;
      if (raw.startsWith('url(')) {
        const inner = raw.slice(('url(').length).trim();
        const quote = inner[0];
        const unquoted = inner.replace(/^['"]|['"]$/g, '');
        const resolved = resolveUrl(baseUrl, unquoted);
        // We will handle actual download later in main flow
        return;
      }
    }
  });
}

async function clonePage(url, depth = 0, maxDepth = 2) {
  if (visited.has(url) || depth > maxDepth) return;
  visited.add(url);
  console.log('[page]', url, 'depth', depth);
  let html;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    html = await res.text();
  } catch (e) {
    console.error('[page failed]', url, e.message);
    return;
  }

  const $ = cheerio.load(html, { decodeEntities: false });

  // Save page structure
  const outFilename = depth === 0 ? 'index.html' : `page_${depth}_${Buffer.from(url).toString('base64').slice(0, 8)}.html`;
  const outPath = path.join(OUT_DIR, outFilename);

  // Process links/scripts/stylesheets/images
  const assetsToDownload = new Set();

  $('link').each((_, el) => {
    const $el = $(el);
    const rel = $el.attr('rel');
    const href = $el.attr('href');
    if (rel && ['stylesheet', 'preload', 'manifest', 'icon', 'apple-touch-icon'].some(r => rel.includes(r))) {
      const resolved = resolveUrl(url, href);
      assetsToDownload.add({ kind: 'asset', url: resolved });
      $el.attr('href', assetPath(resolved));
    }
  });

  $('script[src]').each((_, el) => {
    const $el = $(el);
    const src = $el.attr('src');
    const resolved = resolveUrl(url, src);
    assetsToDownload.add({ kind: 'asset', url: resolved });
    $el.attr('src', assetPath(resolved));
  });

  $('img').each((_, el) => {
    const $el = $(el);
    ['src', 'srcset'].forEach(attr => {
      const val = $el.attr(attr);
      if (!val) return;
      const resolved = resolveUrl(url, val.split(',')[0].trim().split(' ')[0]);
      assetsToDownload.add({ kind: 'asset', url: resolved });
      $el.attr(attr, assetPath(resolved));
    });
  });

  $('a[href]').each((_, el) => {
    const $el = $(el);
    const href = $el.attr('href');
    const resolved = resolveUrl(url, href);
    const sameHost = new URL(resolved).host === new URL(BASE_URL).host;
    if (sameHost && (resolved.endsWith('/') || resolved.endsWith('.html'))) {
      assetsToDownload.add({ kind: 'page', url: resolved });
    } else {
      assetsToDownload.add({ kind: 'asset', url: resolved });
      $el.attr('href', assetPath(resolved));
    }
  });

  // Download assets
  await Promise.all([...assetsToDownload].map(async entry => {
    if (entry.kind === 'asset') {
      const rel = await downloadAsset(entry.url);
      if (rel) {
        // Inline CSS @import and url() references encoded as placeholders
        // (optional: advanced CSS rewriting could go here)
      }
    } else if (entry.kind === 'page' && depth + 1 <= maxDepth) {
      await clonePage(entry.url, depth + 1, maxDepth);
    }
  }));

  fs.writeFileSync(outPath, $.html());
  console.log('[saved]', outPath);
}

(async () => {
  await clonePage(BASE_URL);
  console.log('\nDone. Pages:', Array.from(visited).length);
  console.log('Output:', OUT_DIR);
})();
