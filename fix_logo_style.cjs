const fs = require('fs');

const file = 'frontend/src/app/page.js';
let content = fs.readFileSync(file, 'utf8');

// The current tag might be:
// <img loading="lazy" className="brand-logo" src="/images/bookmysolarhub-logo.png" alt="BookMySolarHub" width={100} height={60} />
// We will replace width={100} height={60} with a style object

content = content.replace(
  /<img loading="lazy" className="brand-logo" src="\/images\/bookmysolarhub-logo\.png" alt="BookMySolarHub" width=\{100\} height=\{60\} \/>/g,
  '<img loading="lazy" className="brand-logo" src="/images/bookmysolarhub-logo.png" alt="BookMySolarHub" style={{ maxWidth: "200px", height: "auto", objectFit: "contain", maxHeight: "60px" }} />'
);

// Fallback in case of formatting differences
content = content.replace(
  /width=\{100\}\s+height=\{60\}/g,
  'style={{ maxWidth: "200px", height: "auto", objectFit: "contain", maxHeight: "60px" }}'
);

fs.writeFileSync(file, content);
console.log('Fixed logo styling');
