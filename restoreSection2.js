const fs = require('fs');

const diffLines = fs.readFileSync('removal_utf8.diff', 'utf8').split('\n');

let extracting = false;
let componentLines = [];

for (const line of diffLines) {
  if (line.includes('<section') && diffLines[diffLines.indexOf(line) + 1].includes('id="solar-calc-blog-component"')) {
    extracting = true;
  }
  
  if (extracting) {
    if (line.startsWith('-')) {
      componentLines.push(line.substring(1));
    } else {
      // It might be Context lines, but in this diff it's a contiguous deletion.
    }
    
    if (line.includes('</section>')) {
      break;
    }
  }
}

console.log("Extracted lines: " + componentLines.length);

if (componentLines.length > 0) {
  const pageFile = 'frontend/src/app/page.js';
  const pageLines = fs.readFileSync(pageFile, 'utf8').split('\n');

  let insertIndex = -1;
  for (let i = 0; i < pageLines.length; i++) {
    if (pageLines[i].includes('className="divider  d-md-block m-0"')) {
      insertIndex = i;
      break;
    }
  }

  if (insertIndex !== -1) {
    pageLines.splice(insertIndex, 0, ...componentLines);
    fs.writeFileSync(pageFile, pageLines.join('\n'));
    console.log("Inserted into page.js");
  } else {
    console.log("Insert index not found");
  }
}
