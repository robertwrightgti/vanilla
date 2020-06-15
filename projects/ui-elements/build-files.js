const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = [
    '../../dist/ui-elements/main-es5.js',
    '../../dist/ui-elements/polyfills-es5.js',
    '../../dist/ui-elements/runtime-es5.js'
  ];

  await fs.ensureDir('../../dist/ui-elements');
  await concat(files, '../../dist/ui-elements/ui-elements.js');

  await fs.copy('./src/assets', '../../dist/ui-elements/assets', err => {
    if (err) return console.error(err)
  });

  await fs.copy('package.json', '../../dist/ui-elements/package.json', err => {
    if (err) return console.error(err)
  });

})();
