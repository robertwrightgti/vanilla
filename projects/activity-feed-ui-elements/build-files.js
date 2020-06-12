const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = [
    '../../dist/activity-feed-ui-elements/main-es5.js',
    '../../dist/activity-feed-ui-elements/polyfills-es5.js',
    '../../dist/activity-feed-ui-elements/runtime-es5.js'
  ];

  await fs.ensureDir('../../dist/activity-feed-ui-elements');
  await concat(files, '../../dist/activity-feed-ui-elements/activity-feed-ui-elements.js');

  await fs.copy('./src/assets', '../../dist/activity-feed-ui-elements/assets', err => {
    if (err) return console.error(err)
  });

  await fs.copy('package.json', '../../dist/activity-feed-ui-elements/package.json', err => {
    if (err) return console.error(err)
  });

})();
