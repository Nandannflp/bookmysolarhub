const fs = require('fs');
const path = require('path');

let HTMLtoJSX;
try {
  HTMLtoJSX = require('htmltojsx');
} catch (e) {
  console.error("Please install htmltojsx: npm install htmltojsx");
  process.exit(1);
}

const BASE_URL = 'https://www.solarsquare.in';

async function generateRoutes() {
  const converter = new HTMLtoJSX({ createClass: false });
  
  console.log('Fetching homepage...');
  const res = await fetch(BASE_URL);
  const html = await res.text();
  
  const linkRegex = /href=["'](?:https:\/\/www\.solarsquare\.in)?\/([a-zA-Z0-9-]+)\/?["']/g;
  let match;
  const links = new Set();
  
  while ((match = linkRegex.exec(html)) !== null) {
    const route = match[1];
    if (route && route.length > 1 && !['wp-content', 'wp-includes', 'cdn-cgi'].includes(route)) {
      links.add(route);
    }
  }
  
  const subpages = Array.from(links).slice(0, 10);
  console.log('Found subpages:', subpages);
  
  for (const route of subpages) {
    console.log(`Processing /${route}/`);
    try {
      const pageRes = await fetch(`${BASE_URL}/${route}/`);
      if (!pageRes.ok) {
         console.log(`Skipping /${route}/ - not found`);
         continue;
      }
      const pageHtml = await pageRes.text();
      
      const bodyMatch = pageHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      let bodyContent = '';
      if (bodyMatch && bodyMatch[1]) {
        bodyContent = bodyMatch[1];
      } else {
        console.log(`No body found for /${route}/, skipping`);
        continue;
      }
      
      // Remove script tags
      bodyContent = bodyContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
      // Remove iframe tags
      bodyContent = bodyContent.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
      // Remove noscript tags
      bodyContent = bodyContent.replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, '');
      
      const jsx = converter.convert(bodyContent);
      
      const componentName = route.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
      
      const finalCode = `export default function ${componentName}() {\n  return (\n    <>\n      ${jsx}\n    </>\n  );\n}\n`;
      
      const dirPath = path.join(__dirname, 'frontend', 'src', 'app', route);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      
      fs.writeFileSync(path.join(dirPath, 'page.js'), finalCode);
      console.log(`Generated frontend/src/app/${route}/page.js`);
    } catch (e) {
      console.error(`Failed to process /${route}/`, e);
    }
  }
}

generateRoutes();
