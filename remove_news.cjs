const fs = require('fs');
const path = require('path');

function removeSection(content, startStr) {
  let startIndex = content.indexOf(startStr);
  if (startIndex === -1) return content;

  let stack = [];
  let i = startIndex;
  
  // Find the end index
  while (i < content.length) {
    if (content.substring(i, i + 8) === '<section') {
      stack.push('<section');
      i += 8;
    } else if (content.substring(i, i + 10) === '</section>') {
      stack.pop();
      i += 10;
      if (stack.length === 0) {
        // Return content without this section
        return content.substring(0, startIndex) + content.substring(i);
      }
    } else {
      i++;
    }
  }
  return content; // Fallback if no matching tag found
}

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (file.endsWith('page.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Repeatedly remove in case there are multiple instances
      let oldContent;
      do {
        oldContent = content;
        content = removeSection(content, '<section className="d-block homes-in-the-news-section-border">');
      } while (oldContent !== content);
      
      if (fs.readFileSync(fullPath, 'utf8') !== content) {
        console.log(`Removed News section from ${fullPath}`);
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

processDir('frontend/src/app');
