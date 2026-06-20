const fs = require('fs');

const pageFile = 'frontend/src/app/page.js';
const pageLines = fs.readFileSync(pageFile, 'utf8').split('\n');

let startIndex = -1;
let endIndex = -1;

for (let i = 0; i < pageLines.length; i++) {
  if (pageLines[i].includes('<section') && pageLines[i+1] && pageLines[i+1].includes('id="solar-calc-blog-component"')) {
    startIndex = i;
  }
  if (startIndex !== -1 && pageLines[i].includes('</section>')) {
    endIndex = i;
    break;
  }
}

if (startIndex !== -1 && endIndex !== -1) {
  // Remove the badly inserted section
  const section = pageLines.splice(startIndex, endIndex - startIndex + 1);
  
  // Now find the divider correctly
  let dividerIndex = -1;
  for (let i = 0; i < pageLines.length; i++) {
    if (pageLines[i].includes('className="divider  d-md-block m-0"')) {
      // The previous line should be `<div`
      dividerIndex = i - 1;
      break;
    }
  }
  
  if (dividerIndex !== -1) {
    pageLines.splice(dividerIndex, 0, ...section);
    fs.writeFileSync(pageFile, pageLines.join('\n'));
    console.log("Fixed insertion!");
  }
} else {
  console.log("Could not find badly inserted section.");
}
