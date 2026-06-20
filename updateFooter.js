const fs = require('fs');

const file = 'frontend/src/app/page.js';
const lines = fs.readFileSync(file, 'utf8').split('\n');

const upCities = ["Noida", "Greater Noida", "Lucknow", "Ayodhya", "Kanpur", "Agra", "Prayagraj", "Varanasi", "Meerut", "Ghaziabad", "Gorakhpur", "Bareilly", "Moradabad"];
const biharCities = ["Patna", "Bodh Gaya", "Rajgir", "Vaishali", "Bhagalpur"];
const jharkhandCities = ["Ranchi", "Giridih", "Jamshedpur", "Dhanbad", "Bokaro"];

const buildList = (state, list, isFirstPart = true) => {
  const stateSlug = state.toLowerCase().replace(/ /g, '-');
  const stateLabel = isFirstPart ? `\n                <p className="location-bold">\n                  <a\n                    className="text-white"\n                    href="https://www.bookmysolarhub.in/rooftop-solar-in-${stateSlug}/"\n                    onclick="trackFooterClickEvent('footer_solar_in_${stateSlug.replace(/-/g, '_')}')"\n                  >\n                    {" "}\n                    ${state}\n                  </a>\n                </p>` : `\n                <p className="location-bold">&nbsp;</p>`;
  
  return `              <div className="col-md-3 col-6 footer-locations-content">` + stateLabel + `\n                <ul>\n                  {" "}\n` + list.map(c => {
      const slug = c.toLowerCase().replace(/ /g, '-');
      return `                  <li>\n                    <a\n                      className="text-white"\n                      href="https://www.bookmysolarhub.in/rooftop-solar-in-${slug}/"\n                      onclick="trackFooterClickEvent('footer_solar_in_${slug.replace(/-/g, '_')}')"\n                    >\n                      ${c}\n                    </a>\n                  </li>{" "}`;
    }).join('\n') + `\n                </ul>\n              </div>`;
};

const newFooterHtml = `            <div className="row footer-locations-block pb-3">\n` +
  buildList("Uttar Pradesh", upCities.slice(0, 7), true) + '\n' +
  buildList("Uttar Pradesh", upCities.slice(7), false) + '\n' +
  buildList("Bihar", biharCities, true) + '\n' +
  buildList("Jharkhand", jharkhandCities, true) +
  `\n            </div>`;

const startLineIndex = lines.findIndex(l => l.includes('<div className="row footer-locations-block pb-3">'));
let endLineIndex = -1;
for (let i = startLineIndex; i < lines.length; i++) {
  if (lines[i].includes('<div className="col-md-1 d-flex justify-content-center align-items-stretch">')) {
    endLineIndex = i - 1;
    break;
  }
}

if (startLineIndex !== -1 && endLineIndex !== -1) {
  lines.splice(startLineIndex, endLineIndex - startLineIndex + 1, newFooterHtml);
  fs.writeFileSync(file, lines.join('\n'));
  console.log("Updated footer locations perfectly with white color!");
} else {
  console.log("Could not find the bounds of the footer locations block.");
}
