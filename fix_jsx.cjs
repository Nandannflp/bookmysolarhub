const fs = require('fs');

let content = fs.readFileSync('src/app/page.js', 'utf8');

const voidTags = ['img', 'input', 'br', 'hr', 'meta', 'link', 'source', 'track', 'wbr', 'area', 'base', 'col', 'embed', 'param'];

voidTags.forEach(tag => {
    const regex = new RegExp("<" + tag + "([^>]*?)>\\s*</" + tag + ">", "gi");
    content = content.replace(regex, "<" + tag + "$1 />");
    
    // Also catch unclosed tags if xmlMode was false, just in case
    // const regexUnclosed = new RegExp("<" + tag + "([^>/]*?)>(?!\\s*</" + tag + ">)", "gi");
    // content = content.replace(regexUnclosed, "<" + tag + "$1 />");
});

fs.writeFileSync('src/app/page.js', content);
console.log("Fixed page.js");
