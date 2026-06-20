const fs = require('fs');

const file = 'frontend/src/app/page.js';
let content = fs.readFileSync(file, 'utf8');

// The cities
const cities = [
  "Noida", "Greater Noida", "Lucknow", "Ayodhya", "Kanpur", "Agra", "Prayagraj", "Varanasi", "Meerut", "Ghaziabad", "Gorakhpur", "Bareilly", "Moradabad",
  "Patna", "Bodh Gaya", "Rajgir", "Vaishali", "Bhagalpur",
  "Ranchi", "Giridih", "Jamshedpur", "Dhanbad", "Bokaro"
];

// 1. Text Replacements
content = content.replace(/29 cities/gi, "3 states and 25 cities");
content = content.replace(/29 Cities across 9 States/gi, "25 Cities across 3 States");

// 2. City Grid (Dropdown)
const generateCityGrid = () => {
  return `<div className="city-grid">\n` + cities.map(c => {
    const slug = c.toLowerCase().replace(/ /g, '-');
    return `                        <button className="city-button" onclick="window.location.href='https://www.bookmysolarhub.in/rooftop-solar-in-${slug}/'">${c}</button>`;
  }).join('\n') + `\n                      </div>`;
};

// Replace city-grid
const cityGridRegex = /<div className="city-grid">[\s\S]*?<\/div>\s*<a[^>]*\+ 20 more\s*<\/a>/;
content = content.replace(cityGridRegex, generateCityGrid());

// 3. Mobile Menu Locations
const generateMobileMenu = () => {
  return cities.map(c => {
    const slug = c.toLowerCase().replace(/ /g, '-');
    return `                        <li className="menu-item menu-item-835">\n                          <a href="https://www.bookmysolarhub.in/rooftop-solar-in-${slug}/">${c}</a>\n                        </li>`;
  }).join('\n');
};

const mobileMenuRegex = /<ul className="sub-menu">[\s\S]*?(?=<\/ul>\s*<\/li>\s*<li className="menu-item menu-item-4743">)/;
content = content.replace(mobileMenuRegex, `<ul className="sub-menu">\n` + generateMobileMenu() + `\n                      `);

// 4. Footer Locations
const generateFooterLocations = () => {
  const upCities = ["Noida", "Greater Noida", "Lucknow", "Ayodhya", "Kanpur", "Agra", "Prayagraj", "Varanasi", "Meerut", "Ghaziabad", "Gorakhpur", "Bareilly", "Moradabad"];
  const biharCities = ["Patna", "Bodh Gaya", "Rajgir", "Vaishali", "Bhagalpur"];
  const jharkhandCities = ["Ranchi", "Giridih", "Jamshedpur", "Dhanbad", "Bokaro"];

  const buildList = (state, list) => {
    return `<div className="col-md-2 col-6 footer-locations-content">\n` +
      `  <p className="location-bold"><a href="javascript:void(0)">${state}</a></p>\n` +
      `  <ul>\n` + list.map(c => {
        const slug = c.toLowerCase().replace(/ /g, '-');
        return `    <li><a href="https://www.bookmysolarhub.in/rooftop-solar-in-${slug}/" onclick="trackFooterClickEvent('footer_solar_in_${slug.replace(/-/g, '_')}')">${c}</a></li>`;
      }).join('\n') + `\n  </ul>\n</div>`;
  };

  return `<div className="row mt-4" id="footer-locations-href">\n` +
    buildList("Uttar Pradesh", upCities.slice(0, 7)) +
    buildList("Uttar Pradesh", upCities.slice(7)) +
    buildList("Bihar", biharCities) +
    buildList("Jharkhand", jharkhandCities) +
    `\n</div>`;
};

const footerRegex = /<div className="row mt-4" id="footer-locations-href">[\s\S]*?<\/div>\s*<\/div>\s*<div className="border-top">/;
content = content.replace(footerRegex, generateFooterLocations() + `\n            </div>\n            <div className="border-top">`);

fs.writeFileSync(file, content);
console.log("Updated page.js with new cities!");
