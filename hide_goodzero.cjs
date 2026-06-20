const fs = require('fs');
const path = require('path');

function hideSection() {
  const dir = 'frontend/src/app';
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    
    if (file === 'page.js') {
      processFile(fullPath);
    } else if (fs.statSync(fullPath).isDirectory()) {
       const pagePath = path.join(fullPath, 'page.js');
       if (fs.existsSync(pagePath)) {
          processFile(pagePath);
       }
    }
  }
}

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Add d-none to hide the GoodZero section
    content = content.replace(
      '<section className="good-zero-rates-section position-relative overflow-hidden">',
      '<section className="good-zero-rates-section position-relative overflow-hidden d-none">'
    );

    fs.writeFileSync(filePath, content);
    console.log('Update complete for ' + filePath);
}

hideSection();
