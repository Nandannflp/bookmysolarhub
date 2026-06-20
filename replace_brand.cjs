const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (file.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // First, replace the brand name
      content = content.replace(/SolarSquare/g, 'BookMySolarHub');
      
      // Next, replace the lowercase version (used in links and some text)
      content = content.replace(/solarsquare/g, 'bookmysolarhub');
      
      // Finally, restore the exact domains for CDN images and CSS to ensure the site doesn't break
      content = content.replace(/cdn\.bookmysolarhub\.in/g, 'cdn.solarsquare.in');
      content = content.replace(/website-assets\.bookmysolarhub\.in/g, 'website-assets.solarsquare.in');
      
      fs.writeFileSync(fullPath, content);
    }
  }
}

processDir('frontend/src');
console.log('Brand replacement complete!');
