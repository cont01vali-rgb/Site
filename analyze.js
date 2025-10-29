const fs = require('fs');
const svg = fs.readFileSync('formula/europeHigh.svg', 'utf8');
const paths = svg.match(/d="[^"]+"/g);
let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

paths.forEach(pathStr => {
  const coords = pathStr.match(/[0-9]+\.?[0-9]*/g);
  if (coords) {
    for (let i = 0; i < coords.length; i += 2) {
      const x = parseFloat(coords[i]);
      const y = parseFloat(coords[i + 1]);
      if (!isNaN(x) && !isNaN(y)) {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
    }
  }
});

console.log('Coordonate:');
console.log('X:', minX, '->', maxX, '(width:', maxX - minX, ')');
console.log('Y:', minY, '->', maxY, '(height:', maxY - minY, ')');
console.log('ViewBox sugerat:', minX, minY, maxX - minX, maxY - minY);