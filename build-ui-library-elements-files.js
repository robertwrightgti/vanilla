const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = [
    './dist/ui-library-elements/main-es5.js',
    './dist/ui-library-elements/polyfills-es5.js',
    './dist/ui-library-elements/runtime-es5.js'
  ];

  await fs.ensureDir('./dist/ui-library-elements');
  await concat(files, './dist/ui-library-elements/ui-library-elements.js');

  await fs.copy('./projects/ui-library-elements/src/assets', './dist/ui-library-elements/assets', err => {
    if (err) return console.error(err)
  });

  await fs.copy('./projects/ui-library-elements/package.json', './dist/ui-library-elements/package.json', err => {
    if (err) return console.error(err)
  });

})();
