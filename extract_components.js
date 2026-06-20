const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const HTMLtoJSX = require('htmltojsx');

const htmlContent = fs.readFileSync('d:\\bookmysolarhub\\scraper-scripts\\index.html', 'utf8');

const dom = new JSDOM(htmlContent);
const document = dom.window.document;

const navElement = document.querySelector('nav.navbar');
const footerElement = document.querySelector('footer') || document.querySelector('.footer');

let headerJSX = '';
if (navElement) {
    let converterHeader = new HTMLtoJSX({ createClass: false });
    let jsx = converterHeader.convert(navElement.outerHTML);
    headerJSX = `import React from 'react';\n\nexport default function Header() {\n  return (\n    <>\n${jsx.split('\n').map(line => '      ' + line).join('\n')}\n    </>\n  );\n}\n`;
}

let footerJSX = '';
if (footerElement) {
    let converterFooter = new HTMLtoJSX({ createClass: false });
    let jsx = converterFooter.convert(footerElement.outerHTML);
    footerJSX = `import React from 'react';\n\nexport default function Footer() {\n  return (\n    <>\n${jsx.split('\n').map(line => '      ' + line).join('\n')}\n    </>\n  );\n}\n`;
}

if (headerJSX) fs.writeFileSync('d:\\bookmysolarhub\\frontend\\src\\components\\Header.js', headerJSX);
if (footerJSX) fs.writeFileSync('d:\\bookmysolarhub\\frontend\\src\\components\\Footer.js', footerJSX);

console.log('Successfully generated Header.js and Footer.js');
