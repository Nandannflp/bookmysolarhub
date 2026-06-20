const fs = require('fs');

function updateTestimonials() {
  const file = 'frontend/src/app/page.js';
  let content = fs.readFileSync(file, 'utf8');

  // 1. Remove the left-section video block
  const startIdx = content.indexOf('<div className="card-wrapper left-section d-md-flex justify-content-center">');
  const endIdx = content.indexOf('<div className="right-section d-none d-md-none d-lg-block">');
  
  if (startIdx !== -1 && endIdx !== -1) {
    content = content.substring(0, startIdx) + content.substring(endIdx);
    
    // Remove the display none classes so the google ratings show on all devices now that the left section is gone
    content = content.replace(
      '<div className="right-section d-none d-md-none d-lg-block">', 
      '<div className="right-section w-100">'
    );
  }

  // 2. Change 4.8 to 4.5
  content = content.replace(/>4\.8<\/h2>/g, '>4.5</h2>');
  content = content.replace(/Rated 4\.8 On Google/gi, 'Rated 4.5 On Google');
  content = content.replace(/★ 4\.8/g, '★ 4.5');

  // 3. Change 12000+ ratings to 5000+ reviews
  content = content.replace(/12000\+ ratings/gi, '5000+ reviews');

  // 4. Update the star width for 4.5 (from 98% to 90%)
  content = content.replace(/width: '98%'/g, "width: '90%'");

  fs.writeFileSync(file, content);
  console.log('Update complete');
}

updateTestimonials();
