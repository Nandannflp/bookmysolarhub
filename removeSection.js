const fs = require('fs');

const file = 'frontend/src/app/page.js';
const lines = fs.readFileSync(file, 'utf8').split('\n');

const startLineIndex = lines.findIndex(l => l.includes('<section') && lines[l.indexOf('<section') + 1] && lines[lines.indexOf(l) + 1].includes('id="solar-calc-blog-component"'));
let endLineIndex = -1;

// The start is actually spread over multiple lines in formatted code:
// 1129:           <section
// 1130:             id="solar-calc-blog-component"
// Let's just find the line with id="solar-calc-blog-component"
const idLineIndex = lines.findIndex(l => l.includes('id="solar-calc-blog-component"'));
const sectionStartIndex = idLineIndex - 1; // since `<section` is on the line above

for (let i = sectionStartIndex; i < lines.length; i++) {
  if (lines[i].includes('</section>')) {
    endLineIndex = i;
    break;
  }
}

if (sectionStartIndex !== -1 && endLineIndex !== -1) {
  lines.splice(sectionStartIndex, endLineIndex - sectionStartIndex + 1);
  fs.writeFileSync(file, lines.join('\n'));
  console.log("Removed section successfully!");
} else {
  console.log("Could not find section.");
}
