const fs = require('fs');

const file = 'frontend/src/app/page.js';
let content = fs.readFileSync(file, 'utf8');

// The current tag has src="/images/bookmysolarhub-logo.png"
// Replace it with src="/bookmysolarhub/images/bookmysolarhub-logo.png"
content = content.replace(
  /src="\/images\/bookmysolarhub-logo\.png"/g,
  'src="/bookmysolarhub/images/bookmysolarhub-logo.png"'
);

fs.writeFileSync(file, content);
console.log('Fixed logo path to include basePath');
