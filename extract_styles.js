const fs = require('fs');
const html = fs.readFileSync('d:/bookmysolarhub/scraper-scripts/index.html', 'utf8');

const styleRegex = /<style[^>]*>[\s\S]*?<\/style>/gi;
const linkRegex = /<link[^>]*rel=["']?stylesheet["']?[^>]*>/gi;

let styles = [];
let match;

while ((match = styleRegex.exec(html)) !== null) {
  styles.push(match[0]);
}

while ((match = linkRegex.exec(html)) !== null) {
  styles.push(match[0]);
}

fs.writeFileSync('d:/bookmysolarhub/frontend/styles.json', JSON.stringify(styles, null, 2));
