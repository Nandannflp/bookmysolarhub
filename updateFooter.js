const fs = require('fs');

const file = 'frontend/src/app/page.js';
const lines = fs.readFileSync(file, 'utf8').split('\n');

const upCities = ["Noida", "Greater Noida", "Lucknow", "Ayodhya", "Kanpur", "Agra", "Prayagraj", "Varanasi", "Meerut", "Ghaziabad", "Gorakhpur", "Bareilly", "Moradabad"];
const biharCities = ["Patna", "Bodh Gaya", "Rajgir", "Vaishali", "Bhagalpur"];
const jharkhandCities = ["Ranchi", "Giridih", "Jamshedpur", "Dhanbad", "Bokaro"];

const buildList = (state, list) => {
  return `              <div className="col-md-3 col-6 footer-locations-content">\n` +
    `                <p className="location-bold"><a href="javascript:void(0)" className="text-white">${state}</a></p>\n` +
    `                <ul>\n` + list.map(c => {
      const slug = c.toLowerCase().replace(/ /g, '-');
      return `                  <li><a href="https://www.bookmysolarhub.in/rooftop-solar-in-${slug}/" onclick="trackFooterClickEvent('footer_solar_in_${slug.replace(/-/g, '_')}')" className="text-white" style={{ opacity: 0.8 }}>${c}</a></li>`;
    }).join('\n') + `\n                </ul>\n              </div>`;
};

const newFooterHtml = `            <div className="row footer-locations-block pb-3">\n` +
  buildList("UTTAR PRADESH", upCities.slice(0, 7)) + '\n' +
  buildList("UTTAR PRADESH", upCities.slice(7)) + '\n' +
  buildList("BIHAR", biharCities) + '\n' +
  buildList("JHARKHAND", jharkhandCities) +
  `\n            </div>`;

// Find the start and end of the block
const startLineIndex = lines.findIndex(l => l.includes('<div className="row footer-locations-block pb-3">'));
let endLineIndex = -1;
for (let i = startLineIndex; i < lines.length; i++) {
  if (lines[i].includes('<div className="col-md-1 d-flex justify-content-center align-items-stretch">')) {
    endLineIndex = i - 1; // The line before the next block
    break;
  }
}

if (startLineIndex !== -1 && endLineIndex !== -1) {
  lines.splice(startLineIndex, endLineIndex - startLineIndex + 1, newFooterHtml);
  fs.writeFileSync(file, lines.join('\n'));
  console.log("Updated footer locations!");
} else {
  console.log("Could not find the bounds of the footer locations block.");
}
