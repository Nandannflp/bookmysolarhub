const fs = require('fs');

const elements = JSON.parse(fs.readFileSync('d:/bookmysolarhub/frontend/styles.json', 'utf8'));

let styleInnerHtmls = [];
let linkHrefs = new Set();

for (const el of elements) {
  if (el.startsWith('<style')) {
    const match = el.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
    if (match) {
      styleInnerHtmls.push(match[1]);
    }
  } else if (el.startsWith('<link')) {
    const match = el.match(/href=(?:["']([^"']+)["']|([^\s>]+))/i);
    if (match) {
      let href = match[1] || match[2];
      href = href.replace(/&#038;/g, '&');
      linkHrefs.add(href);
    }
  }
}

const stylesJSX = styleInnerHtmls.map((html, i) => `<style dangerouslySetInnerHTML={{ __html: \`${html.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} />`).join('\n        ');

const linksJSX = Array.from(linkHrefs).map(href => `<link rel="stylesheet" href="${href}" />`).join('\n        ');

const layoutPath = 'd:/bookmysolarhub/frontend/src/app/layout.js';
let layout = fs.readFileSync(layoutPath, 'utf8');

layout = layout.replace(
  /<head>[\s\S]*?<\/head>/i,
  `<head>\n        ${linksJSX}\n        ${stylesJSX}\n      </head>`
);

fs.writeFileSync(layoutPath, layout);
