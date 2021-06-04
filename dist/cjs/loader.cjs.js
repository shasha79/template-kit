'use strict';

Object.defineProperty(exports, '__esModule', {value: true});

const index = require('./index-b82a7f65.js');

/*
 Stencil Client Patch Esm v2.3.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
  return index.promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
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
};

exports.defineCustomElements = defineCustomElements;
