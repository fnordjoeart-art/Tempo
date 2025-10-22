const fs = require('fs');
const path = require('path');
const dir = path.join('build','assets');
if (!fs.existsSync(dir)) { console.error('Manca build/assets'); process.exit(1); }
const css = (fs.readdirSync(dir).filter(f=>f.endsWith('.css'))[0]) || '';
if (!css) { console.error('Nessun CSS generato'); process.exit(2); }
const size = fs.statSync(path.join(dir, css)).size;
if (size < 1024) { console.error('CSS troppo piccolo, probabilmente vuoto'); process.exit(3); }
console.log('CSS OK:', css, size,'bytes');
