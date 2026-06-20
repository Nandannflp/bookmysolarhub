const fs = require('fs');
const HTMLtoJSX = require('htmltojsx');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false });

$('body script').remove();

const bodyHtml = $('body').html();
const converter = new HTMLtoJSX({ createClass: false });
const jsxBody = converter.convert(bodyHtml);

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
console.log("Proper JSX generated!");
