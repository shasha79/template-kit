import {p as promiseResolve, b as bootstrapLazy} from './index-199bfa32.js';

/*
 Stencil Client Patch Esm v2.3.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
  return promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
    return bootstrapLazy(
      [
        [
          'my-template',
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

export {defineCustomElements};
