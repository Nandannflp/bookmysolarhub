const fs = require('fs');

const diff = fs.readFileSync('removal_utf8.diff', 'utf8');
const lines = diff.split('\n');

let extracting = false;
let componentLines = [];

for (const line of lines) {
  if (line.startsWith('-          <section') && line.includes('id="solar-calc-blog-component"')) {
    extracting = true;
  }
  
  if (extracting) {
    if (line.startsWith('-')) {
      componentLines.push(line.substring(1)); // remove the leading minus
    } else if (line.startsWith(' ')) {
      // It's a context line? No, in unified diff, deleted lines are just `-`.
      // The section end is `</section>`.
      // Let's just collect all `-` lines from the start.
    }
    
    if (line === '-          </section>') {
      break;
    }
  }
}

if (componentLines.length === 0) {
  console.log("Could not extract component from diff.");
  process.exit(1);
}

const pageFile = 'frontend/src/app/page.js';
const pageLines = fs.readFileSync(pageFile, 'utf8').split('\n');

// Find where goodzero-pride ends
// It ends right before:
//           <div
//             className="divider  d-md-block m-0"
//             style={{ backgroundColor: "#F1F1F5" }}
//           />
let insertIndex = -1;
for (let i = 0; i < pageLines.length; i++) {
  if (pageLines[i].includes('className="divider  d-md-block m-0"')) {
    // Check if the previous line is closing the goodzero-pride or similar
    // We want to insert right before the divider.
    insertIndex = i;
    break;
  }
}

if (insertIndex !== -1) {
  pageLines.splice(insertIndex, 0, ...componentLines);
  fs.writeFileSync(pageFile, pageLines.join('\n'));
  console.log("Restored calculator section successfully!");
} else {
  console.log("Could not find insertion point.");
}
