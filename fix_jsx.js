const fs = require('fs');

let content = fs.readFileSync('frontend/src/app/page.js', 'utf8');

// cheerio with xmlMode: true outputs <img ...></img>
// We need to convert <img></img> to <img />
// We need to do this for all self-closing tags
const voidTags = ['img', 'input', 'br', 'hr', 'meta', 'link', 'source', 'track', 'wbr', 'area', 'base', 'col', 'embed', 'param'];

voidTags.forEach(tag => {
    // Replace <tag ...></tag> with <tag ... />
    const regex = new RegExp(\`<\${tag}([^>]*?)>\\s*</\${tag}>\`, 'gi');
    content = content.replace(regex, \`<\${tag}$1 />\`);
});

// Also cheerio sometimes just leaves <img ...> unclosed if xmlMode is false.
// But we used xmlMode: true. So it should be <img></img>

// Let's also fix <source></source>
content = content.replace(/<source([^>]*?)>\s*<\/source>/gi, '<source$1 />');

fs.writeFileSync('frontend/src/app/page.js', content);
console.log("Fixed page.js");
