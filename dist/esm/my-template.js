import {p as promiseResolve, b as bootstrapLazy} from './index-199bfa32.js';

/*
 Stencil Client Patch Browser v2.3.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
  const importMeta = import.meta.url;
  const opts = {};
  if (importMeta !== '') {
    opts.resourcesUrl = new URL('.', importMeta).href;
  }
  return promiseResolve(opts);
};

patchBrowser().then((options) => {
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
