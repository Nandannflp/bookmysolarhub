const fs = require('fs');
const path = require('path');

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      let newContent = content;
      
      const regex = /@media\s*\(prefers-color-scheme:\s*dark\)\s*\{([\s\S]*?)\n\}/g;
      newContent = newContent.replace(regex, (match, inner) => {
        let unnested = inner.replace(/([^{]+)\s*\{([^}]+)\}/g, (m, selector, props) => {
           let selectors = selector.split(',').map(s => s.trim());
           let mapped = selectors.map(s => {
               // if the selector is :root, we don't want :global([data-theme='dark']) :root
               // we just want [data-theme='dark']
               if (s === ':root' || s === 'html' || s === 'body') {
                   return `[data-theme='dark']`;
               }
               return `:global([data-theme='dark']) ${s}`;
           }).join(', ');
           return `${mapped} {${props}}`;
        });
        
        return unnested + "\n";
      });
      
      if (newContent !== content) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDirectory('./src');
console.log('Done CSS refactor!');
