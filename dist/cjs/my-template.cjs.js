'use strict';

const index = require('./index-b82a7f65.js');

/*
 Stencil Client Patch Browser v2.3.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
  const importMeta =
    typeof document === 'undefined'
      ? new (require('u' + 'rl').URL)('file:' + __filename).href
      : (document.currentScript && document.currentScript.src) || new URL('my-template.cjs.js', document.baseURI).href;
  const opts = {};
  if (importMeta !== '') {
    opts.resourcesUrl = new URL('.', importMeta).href;
  }
  return index.promiseResolve(opts);
};

patchBrowser().then((options) => {
  return index.bootstrapLazy(
    [
      [
        'my-template.cjs',
        [
          [
            1,
            'my-template',
            {value: [513], beforeSwipe: [64], afterSwipe: [64], lazyLoadContent: [64], revealContent: [64], hideContent: [64]}
          ]
        ]
      ]
    ],
    options
  );
});
