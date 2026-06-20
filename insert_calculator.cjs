const fs = require('fs');

const file = 'frontend/src/app/page.js';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('import SavingsCalculator')) {
  content = `import SavingsCalculator from '../components/SavingsCalculator';\n` + content;
}

const footerIdx = content.indexOf('<div className="footer">');
if (footerIdx !== -1) {
  content = content.substring(0, footerIdx) + '<SavingsCalculator />\n' + content.substring(footerIdx);
  fs.writeFileSync(file, content);
  console.log('Inserted SavingsCalculator before footer');
} else {
  console.log('Could not find footer');
}
