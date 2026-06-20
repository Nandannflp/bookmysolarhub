const fs = require('fs');
const path = require('path');

function replaceLogos() {
  const dir = 'frontend/src/app';
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) continue;
    if (path.extname(file) !== '.js') continue;

    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Find all logo URLs
    const matches = content.match(/https:\/\/[^"']*(logo)[^"']*\.(webp|png|jpg|svg)/gi);
    if (matches) {
      console.log(`Found logos in ${file}:`, new Set(matches));
    }

    // Replace all logo URLs with the new logo
    const newContent = content.replace(/https:\/\/[^"']*(logo)[^"']*\.(webp|png|jpg|svg)/gi, '/images/bookmysolarhub-logo.png');
    
    if (content !== newContent) {
      fs.writeFileSync(fullPath, newContent);
      console.log(`Replaced logos in ${file}`);
    }
  }
}

replaceLogos();
