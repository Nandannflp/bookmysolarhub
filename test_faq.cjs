const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('frontend/src/app/page.js', 'utf8');
const $ = cheerio.load(html, {xmlMode: false});
let emptyCount = 0;
$('.faq_accordian .accordion-item').each((i, el) => {
  const q = $(el).find('.accordion-button').text().trim();
  const a = $(el).find('.accordion-body').text().trim();
  if (a.length === 0) {
    console.log(i+1 + '. ' + q + ' | Answer is EMPTY!');
    emptyCount++;
  }
});
if (emptyCount === 0) {
  console.log('All FAQs have answers!');
}
