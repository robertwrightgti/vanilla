const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = [
    './dist/elements/main-es5.js',
    './dist/elements/polyfills-es5.js',
    './dist/elements/runtime-es5.js'
  ];

  await fs.ensureDir('./dist/elements');
  await concat(files, './dist/elements/elements.js');

  await fs.copy('./src/assets', './dist/elements/assets', err => {
    if (err) return console.error(err)
  });

  await fs.copy('./projects/elements/package.json', './dist/elements/package.json', err => {
    if (err) return console.error(err)
  });

})();
