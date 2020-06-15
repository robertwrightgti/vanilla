const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = [
    './dist/ui-components-elements/main-es5.js',
    './dist/ui-components-elements/polyfills-es5.js',
    './dist/ui-components-elements/runtime-es5.js'
  ];

  await fs.ensureDir('./dist/ui-components-elements');
  await concat(files, './dist/ui-components-elements/ui-components-elements.js');

  await fs.copy('./projects/ui-components-elements/src/assets', './dist/ui-components-elements/assets', err => {
    if (err) return console.error(err)
  });

  await fs.copy('./projects/ui-components-elements/package.json', './dist/ui-components-elements/package.json', err => {
    if (err) return console.error(err)
  });

})();
