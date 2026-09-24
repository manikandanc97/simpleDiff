const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        if (file === 'node_modules' || file === '.next' || file === '.git') return;
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.md')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('.');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    
    // Global replace for SimplePrime -> SimpleThink
    if (content.includes('SimplePrime')) {
        content = content.replace(/SimplePrime/g, 'SimpleThink');
        changed = true;
    }
    
    // Various old slogans to replace
    const oldSlogans = [
        'Keep It Simple. Think Different.',
        'Keep It Simple. Think Different',
        'Think Simple. Build Premium.',
        'Think Simple.\n                <br />\n                Build Premium.'
    ];

    const newSlogan = 'Keep It Simple. Make It Luxury.';
    const newSloganMultiline = 'Keep It Simple.\n                <br />\n                Make It Luxury.';

    oldSlogans.forEach(slogan => {
        if (content.includes(slogan)) {
            let replacement = slogan.includes('<br />') ? newSloganMultiline : newSlogan;
            content = content.split(slogan).join(replacement);
            changed = true;
        }
    });

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Updated', file);
    }
});
console.log('Done');
