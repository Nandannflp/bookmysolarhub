const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false, xmlMode: false });

// Extract head components
const cssLinks = [];
$('link[rel="stylesheet"]').each((i, el) => {
    cssLinks.push($(el).attr('href'));
});

// Remove script tags from body to avoid JSX parsing issues with inline JS
$('body script').remove();

// Get the body content as HTML
let bodyHtml = $('body').html();

// Use a proper html-to-jsx package if possible, but let's do a robust regex approach 
// First, make it self-closing for JSX
bodyHtml = cheerio.load(bodyHtml, { xmlMode: true }).xml();

function htmlToJsx(jsx) {
    if (!jsx) return '';
    jsx = jsx.replace(/class=/g, 'className=');
    jsx = jsx.replace(/for=/g, 'htmlFor=');
    
    // Replace inline styles
    jsx = jsx.replace(/style="([^"]*)"/g, (match, p1) => {
        const styles = p1.split(';').filter(s => s.trim() !== '');
        const styleObj = {};
        styles.forEach(s => {
            let [key, ...val] = s.split(':');
            if (key && val.length) {
                key = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
                styleObj[key] = val.join(':').trim().replace(/"/g, "'");
            }
        });
        return `style={${JSON.stringify(styleObj)}}`;
    });
    jsx = jsx.replace(/style='([^']*)'/g, (match, p1) => {
        const styles = p1.split(';').filter(s => s.trim() !== '');
        const styleObj = {};
        styles.forEach(s => {
            let [key, ...val] = s.split(':');
            if (key && val.length) {
                key = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
                styleObj[key] = val.join(':').trim().replace(/"/g, "'");
            }
        });
        return `style={${JSON.stringify(styleObj)}}`;
    });

    // Strip event handlers
    jsx = jsx.replace(/on[a-z]+="[^"]*"/gi, '');
    jsx = jsx.replace(/on[a-z]+='[^']*'/gi, '');

    // Handle HTML comments
    jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');
    
    // Fix common attributes
    jsx = jsx.replace(/tabindex/g, 'tabIndex')
             .replace(/srcset/g, 'srcSet')
             .replace(/autocomplete/g, 'autoComplete')
             .replace(/autofocus/g, 'autoFocus')
             .replace(/readonly/g, 'readOnly')
             .replace(/maxlength/g, 'maxLength');

    return jsx;
}

const jsxBody = htmlToJsx(bodyHtml);

// Build page.js
const pageCode = `
import React from 'react';
import './global.css';

export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{__html: \`${bodyHtml.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`}} />
    </>
  );
}
`;
// WAIT: The user wants to "make changes easily". If I use dangerouslySetInnerHTML, they can't make changes.
// I will output the JSX, but wrap it in try-catch or just write it. If Next.js fails to build, I'll see it.

const actualPageCode = `
import React from 'react';
import './global.css';

export default function Page() {
  return (
    <>
      ${jsxBody}
    </>
  );
}
`;

fs.writeFileSync('frontend/src/app/page.js', actualPageCode);

// Write layout.js
const layoutCode = `
export const metadata = {
  title: 'SolarSquare - Bharat ki #1 Home Rooftop Solar Company',
  description: 'Discover the best rooftop solar panel system for your home.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        ${cssLinks.map(link => `<link rel="stylesheet" href="${link}" />`).join('\n        ')}
      </head>
      <body>
        \${children}
      </body>
    </html>
  )
}
`;
fs.writeFileSync('frontend/src/app/layout.js', layoutCode);

// Write global.css
const styles = [];
$('style').each((i, el) => {
    styles.push($(el).html());
});
fs.writeFileSync('frontend/src/app/global.css', styles.join('\n\n'));

console.log("Conversion complete!");
