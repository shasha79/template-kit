import {r as registerInstance, e as createEvent, h, f as Host, F as Fragment, g as getElement} from './index-4e072894.js';

function getAllElements(el, tag) {
  const allSlottedElements = el.querySelectorAll(tag);
  const allShadowsElements = el.shadowRoot ? el.shadowRoot.querySelectorAll(tag) : [];
  return Array.from(allSlottedElements).concat(Array.from(allShadowsElements));
}

function lazyLoadComponentContent(el, tag) {
  return new Promise(async (resolve) => {
    const promises = [];
    const elements = getAllElements(el, tag);
    if (elements && elements.length > 0) {
      elements.forEach((element) => {
        promises.push(element.lazyLoadContent());
      });
      await Promise.all(promises);
      resolve();
    }
    resolve();
  });
}

function unifyEvent(e) {
  return e.changedTouches ? e.changedTouches[0] : e;
}
function debounce(func, timeout) {
  let timer;
  return (...args) => {
    const next = () => func(...args);
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(next, timeout && timeout > 0 ? timeout : 300);
  };
}
function isMobile() {
  if (!window) {
    return false;
  }
  return window.matchMedia('(any-pointer:coarse)').matches;
}
function isIOS() {
  if (!window || !navigator) {
    return false;
  }
  const a = navigator.userAgent || navigator.vendor || window.opera;
  return /iPhone|iPod/i.test(a) || isIPad();
}
function isIPad() {
  if (!window || !navigator) {
    return false;
  }
  const a = navigator.userAgent || navigator.vendor || window.opera;
  if (/iPad/i.test(a)) {
    return true;
  }
  return /Macintosh/i.test(a) && isMobile();
}
function isFullscreen() {
  if (!window || !screen) {
    return false;
  }
  return window.innerHeight == screen.height;
}
function isFirefox() {
  if (!window || !navigator) {
    return false;
  }
  const a = navigator.userAgent || navigator.vendor || window.opera;
  return /firefox/i.test(a);
}
function isRTL() {
  if (!document || !document.documentElement) {
    return false;
  }
  const htmlDir = document.documentElement.getAttribute('dir');
  return htmlDir !== null && htmlDir === 'rtl';
}
function isLandscape() {
  return !isPortrait();
}
function isPortrait() {
  if (!window) {
    return false;
  }
  return window.matchMedia && window.matchMedia('(orientation: portrait)').matches;
}

function lazyLoadSelectedImages(images) {
  return new Promise((resolve) => {
    if (!images) {
      resolve();
      return;
    }
    images.forEach((image) => {
      if (image.hasAttribute('data-src')) {
        image.setAttribute('src', `${image.getAttribute('data-src')}`);
        image.removeAttribute('data-src');
        if (!image.classList.contains('deckgo-reveal')) {
          image.style.setProperty('visibility', 'inherit');
        }
      }
      image.style.setProperty('pointer-events', 'none');
    });
    resolve();
  });
}
function lazyLoadSelectedLazyImagesComponent(components) {
  return new Promise((resolve) => {
    if (!components) {
      resolve();
      return;
    }
    components.forEach(async (component) => {
      await component.lazyLoad();
    });
    resolve();
  });
}

function injectJS(id, src) {
  return new Promise((resolve, reject) => {
    if (!document) {
      resolve();
      return;
    }
    if (document.getElementById(id)) {
      resolve('JS already loaded.');
      return;
    }
    const script = document.createElement('script');
    script.id = id;
    script.async = true;
    script.defer = true;
    script.src = src;
    script.addEventListener('load', () => resolve('JS loaded.'));
    script.addEventListener('error', () => reject('Error loading script.'));
    script.addEventListener('abort', () => reject('Script loading aborted.'));
    document.head.appendChild(script);
  });
}
function injectCSS(id, src) {
  return new Promise((resolve, reject) => {
    if (!document) {
      resolve();
      return;
    }
    if (document.getElementById(id)) {
      resolve('CSS already loaded.');
      return;
    }
    const link = document.createElement('link');
    link.id = id;
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', src);
    link.addEventListener('load', () => resolve('CSS loaded.'));
    link.addEventListener('error', () => reject('Error loading css.'));
    link.addEventListener('abort', () => reject('CSS loading aborted.'));
    document.head.appendChild(link);
  });
}

async function hexToRgb(hex) {
  if (!hex || hex === undefined || hex === '') {
    return undefined;
  }
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : undefined;
}
async function rgbToHex(rgb) {
  if (!rgb) {
    return undefined;
  }
  const toHex = (rgb) => {
    if (!rgb) {
      return undefined;
    }
    return `#${rgb.map((v) => v.toString(16).padStart(2, '0')).join('')}`;
  };
  return toHex(extractRgb(rgb));
}
function extractRgb(rgb) {
  const match = rgb.match(/([.\d]+),\s*([.\d]+),\s*([.\d]+)/);
  if (!match) {
    return undefined;
  }
  return match.splice(1, 3).map((v) => Number(v));
}
function extractRgba(rgb) {
  const match = rgb.match(/([.\d]+),\s*([.\d]+),\s*([.\d]+),\s*([.\d]+)/);
  if (!match) {
    return undefined;
  }
  return match.splice(1, 4).map((v) => Number(v));
}

function lazyLoadImages(el) {
  return new Promise(async (resolve) => {
    const promises = [];
    promises.push(lazyLoadLazyImgTags(el));
    promises.push(lazyLoadLazyImgComponents(el));
    await Promise.all(promises);
    resolve();
  });
}
function lazyLoadLazyImgTags(el) {
  return new Promise(async (resolve) => {
    const images = getAllElements(el, 'img');
    await lazyLoadSelectedImages(images);
    resolve();
  });
}
function lazyLoadLazyImgComponents(el) {
  return new Promise(async (resolve) => {
    const images = getAllElements(el, 'deckgo-lazy-img');
    await lazyLoadSelectedLazyImagesComponent(images);
    resolve();
  });
}
function hideLazyLoadImages(el) {
  return new Promise((resolve) => {
    let images = getAllElements(el, 'img');
    if (!images) {
      resolve();
    } else {
      images = images.filter((image) => image.getAttribute('data-src'));
      images.forEach((image) => {
        image.style.setProperty('visibility', 'hidden');
      });
      resolve();
    }
  });
}

function showRevealElement(el) {
  return new Promise(async (resolve) => {
    const elements = el.querySelectorAll('deckgo-reveal, deckgo-reveal-list');
    let couldSwipe = true;
    if (elements) {
      const nextElement = Array.from(elements).find((element) => {
        return !element.allElementsRevealed;
      });
      if (nextElement) {
        await nextElement.reveal();
        couldSwipe = false;
      }
    }
    resolve(couldSwipe);
  });
}
function hideRevealElement(el) {
  return new Promise(async (resolve) => {
    const elements = el.querySelectorAll('deckgo-reveal, deckgo-reveal-list');
    let couldSwipe = true;
    if (elements) {
      const nextElement = Array.from(elements)
        .reverse()
        .find((element) => {
          return !element.allElementsHidden;
        });
      if (nextElement) {
        await nextElement.hide();
        couldSwipe = false;
      }
    }
    resolve(couldSwipe);
  });
}
function showAllRevealElements(el) {
  return new Promise(async (resolve) => {
    const elements = el.querySelectorAll('deckgo-reveal, deckgo-reveal-list');
    if (elements && elements.length > 0) {
      const promises = [];
      for (const element of Array.from(elements)) {
        promises.push(element.revealAll());
      }
      await Promise.all(promises);
    }
    resolve();
  });
}
function hideAllRevealElements(el) {
  return new Promise(async (resolve) => {
    const elements = el.querySelectorAll('deckgo-reveal, deckgo-reveal-list');
    if (elements && elements.length > 0) {
      const promises = [];
      for (const element of Array.from(elements)) {
        promises.push(element.hideAll());
      }
      await Promise.all(promises);
    }
    resolve();
  });
}
function beforeSwipe(el, enter, reveal) {
  return new Promise(async (resolve) => {
    if (reveal) {
      const couldSwipe = enter ? await showRevealElement(el) : await hideRevealElement(el);
      resolve(couldSwipe);
    } else {
      resolve(true);
    }
  });
}
function afterSwipe() {
  return new Promise((resolve) => {
    resolve();
  });
}
function lazyLoadContent(el) {
  return new Promise(async (resolve) => {
    const promises = [];
    promises.push(lazyLoadImages(el));
    promises.push(lazyLoadComponentContent(el, 'deckgo-gif'));
    promises.push(lazyLoadComponentContent(el, 'deckgo-youtube'));
    promises.push(lazyLoadComponentContent(el, 'deckgo-demo'));
    promises.push(lazyLoadComponentContent(el, 'deckgo-word-cloud'));
    promises.push(lazyLoadComponentContent(el, 'deckgo-markdown'));
    await Promise.all(promises);
    resolve();
  });
}

const jhnWebslidesCss =
  '@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,200italic,300,300italic,regular,italic,600,600italic,700,700italic,900,900italic);:host{display:block;position:relative;-webkit-user-select:var(--slide-user-select, none);-moz-user-select:var(--slide-user-select, none);-ms-user-select:var(--slide-user-select, none);user-select:var(--slide-user-select, none);background:var(--background);color:var(--color);height:inherit;z-index:var(--zIndex, 1);--slide-padding-top-default:64px;--slide-padding-end-default:64px;--slide-padding-bottom-default:64px;--slide-padding-start-default:64px}@media screen and (max-width: 1024px){:host{--slide-padding-top-default:32px;--slide-padding-end-default:32px;--slide-padding-bottom-default:32px;--slide-padding-start-default:32px}}div.deckgo-slide{display:flex;overflow:var(--overflow, hidden);padding:var(--slide-padding-top, var(--slide-padding-top-default)) var(--slide-padding-end, var(--slide-padding-end-default)) var(--slide-padding-bottom, var(--slide-padding-bottom-default)) var(--slide-padding-start, var(--slide-padding-start-default));width:calc(var(--slide-width) - var(--slide-padding-start, var(--slide-padding-start-default)) - var(--slide-padding-end, var(--slide-padding-end-default)));height:calc( var(--slide-height) - var(--slide-padding-top, var(--slide-padding-top-default)) - var(--slide-padding-bottom, var(--slide-padding-bottom-default)) );min-height:calc( var(--slide-min-height) - var(--slide-padding-top, var(--slide-padding-top-default)) - var(--slide-padding-bottom, var(--slide-padding-bottom-default)) );user-drag:none;-webkit-user-drag:none}@media print{div.deckgo-slide{padding:0;page-break-after:always;height:100vh}::slotted([slot=actions]){display:none}::slotted([slot=background]){display:var(--slide-background-print-display, none)}}::slotted(ul),::slotted(ol){-webkit-padding-start:var(--slide-padding-start, var(--slide-padding-start-default));padding-inline-start:var(--slide-padding-start, var(--slide-padding-start-default))}::slotted([slot=notes]){display:none}::slotted([slot=actions]){position:absolute;top:var(--slide-actions-top, 16px);right:var(--slide-actions-end, 32px);left:var(--slide-actions-start);display:var(--slide-actions-display);z-index:var(--slide-actions-z-index)}::slotted([slot=background]){position:var(--slide-background-position, absolute);top:var(--slide-background-top, 0);right:var(--slide-background-end);left:var(--slide-background-start, 0);width:var(--slide-background-width);height:var(--slide-background-height);z-index:-2;pointer-events:none}::slotted([slot=header]),::slotted([slot=footer]){position:absolute;left:0;width:var(--slide-width);height:100%;display:flex;align-items:center;z-index:var(--slide-header-footer-z-index, -1)}::slotted([slot=header]){top:0;width:calc(var(--slide-width) - var(--slide-header-margin-start, 32px) - var(--slide-header-margin-end, 32px));max-height:var(--slide-header-max-height, 48px);justify-content:var(--slide-header-justify-content, flex-start);margin:var(--slide-header-margin-top, 16px) var(--slide-header-margin-end, 32px) var(--slide-header-margin-bottom, 16px) var(--slide-header-margin-start, 32px)}@media screen and (max-width: 1024px){::slotted([slot=header]){max-height:var(--slide-header-max-height, 16px)}}::slotted([slot=footer]){bottom:0;width:calc(var(--slide-width) - var(--slide-footer-margin-start, 16px) - var(--slide-footer-margin-end, 16px));max-height:var(--slide-footer-max-height, 32px);justify-content:var(--slide-footer-justify-content, center);margin:var(--slide-footer-margin-top, 16px) var(--slide-footer-margin-end, 16px) var(--slide-footer-margin-bottom, 16px) var(--slide-footer-margin-start, 16px)}div.deckgo-slide{flex-direction:column;align-items:center;justify-content:center}body{padding:0;margin:0;font-family:"Source Sans Pro", sans-serif}*{box-sizing:border-box;padding:0;margin:0}.container{max-width:80%;margin:0 auto}.slide{width:100%;height:100vh;display:flex;flex-direction:row;padding:4rem 0}.slide-image{width:50%;height:100%;-o-object-fit:cover;object-fit:cover;border-right:3rem solid #0849ff}.slide-info{display:flex;flex-direction:column;padding:2rem;margin-left:5%;font-size:clamp(0.5rem, 2vw, 1.875rem)}.slide-info_headline{color:#545454;margin-top:auto;font-size:1em;margin-bottom:0.8em;text-transform:uppercase}.slide-info_title{color:#0849ff;font-weight:normal;font-size:2.733333em;margin-bottom:0.3em}.slide-info_subtitle{color:#717c9c;font-size:1.2em}.slide-info-footer{margin-top:auto;display:flex;justify-content:flex-end;gap:2rem}.slide-info-footer_logo{width:20%;height:auto;-o-object-fit:cover;object-fit:cover}';

const MyTemplate = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.slideDidLoad = createEvent(this, 'slideDidLoad', 7);
  }
  async componentDidLoad() {
    await hideLazyLoadImages(this.el);
    this.slideDidLoad.emit();
  }
  beforeSwipe(enter, reveal) {
    return beforeSwipe(this.el, enter, reveal);
  }
  afterSwipe() {
    return afterSwipe();
  }
  lazyLoadContent() {
    return lazyLoadContent(this.el);
  }
  revealContent() {
    return showAllRevealElements(this.el);
  }
  hideContent() {
    return hideAllRevealElements(this.el);
  }
  render() {
    return h(
      Host,
      {class: {'deckgo-slide-container': true}},
      h(
        'div',
        {class: 'deckgo-slide'},
        h(
          'div',
          {class: 'container'},
          h(
            'div',
            {class: 'slide'},
            h('slot', {name: 'image'}),
            h(
              'div',
              {class: 'slide-info'},
              h('h2', {class: 'slide-info_headline'}, h('slot', {name: 'headline'})),
              h('h1', {class: 'slide-info_title'}, h('slot', {name: 'title'})),
              h('h3', {class: 'slide-info_subtitle', slot: 'subtitle'}, h('slot', {name: 'subtitle'})),
              h(
                'div',
                {class: 'slide-info-footer'},
                h('img', {class: 'slide-info-footer_logo', src: 'https://jhn.ngo/assets/img/logos/JHM.png'}),
                h('img', {class: 'slide-info-footer_logo', src: 'https://jhn.ngo/assets/img/logos/JHM.png'}),
                h('img', {class: 'slide-info-footer_logo', src: 'https://jhn.ngo/assets/img/logos/JHM.png'})
              )
            )
          )
        ),
        h('slot', {name: 'subtitle'}),
        this.renderDeckSlots()
      )
    );
  }
  /*

          <div class="center h-100 w-100">
              <div class="fl w-40 w-40-ns h-100">
                <img class="h-100" src="https://s3.eu-central-1.amazonaws.com/jewish-heritage-tours/storymapjs/742d132034c90ea2dfff4fa9290d4f09/berlin-test1/_images/1.jpg"/>
              </div>
              <div class="fl w3 w3-ns h-100 j-story-blue-background"></div>
              <div class="h-100 fl w-30 w-50-ns tc pl6 flex flex-column">
                <h2 class="j-story-title-1 f1 lh-copy tl fw3 ttu">A J-Story Virtual Exhibit</h2>
                <h1 class="j-story-title-2 f-headline lh-title tl fw5 mv4"><strong>Jewish Women</strong> in the Century of Change</h1>
                <h1 class="j-story-subtitle f1 lh-copy tl">Optional Sub-Headline Text to Describe this Virtual Exhibit</h1>
                <div class="tr right-0 bottom-0" style={{marginTop: 'auto'}}>
                  <img class="h-10 w-20" src="https://jhn.ngo/assets/img/logos/JHM.png"/>
                  <img class="h-10 w-20 ml5" src="https://jhn.ngo/assets/img/logos/JHM.png"/>
                  <img class="h-10 w-20 ml5" src="https://jhn.ngo/assets/img/logos/JHM.png"/>
                </div>
              </div>
          </div>

<article id="webslides">
            <section class="fullscreen bg-white">
              <div class="card-50">
                <figure>
                  <slot name="image">
                    <img
                      src="https://s3.eu-central-1.amazonaws.com/jewish-heritage-tours/storymapjs/742d132034c90ea2dfff4fa9290d4f09/berlin-test1/_images/1.jpg"
                      alt="Bonsai"></img>
                  </slot>
                </figure>
                <div class="flex-content">
                  <h2>
                    <strong>
                      <slot name="title"></slot>
                    </strong>
                  </h2>
                  <p class="text-intro">
                    <slot name="content"></slot>
                  </p>
                </div>
              </div>
            </section>
          </article>
 */
  /**
   * Slots used to propagate decks options.
   *
   * - notes: allow user to add notes for this slide (mandatory)
   * - header: clone a header on every slides (recommended)
   * - footer: clone a footer on every slides (recommended)
   * - background: replicate the same background on every slides (recommended if you do not provide any particular design)
   * - actions: can be use to add an action on the top right corner of a slide (optional)
   */
  renderDeckSlots() {
    return h(
      Fragment,
      null,
      h('slot', {name: 'notes'}),
      h('slot', {name: 'header'}),
      h('slot', {name: 'footer'}),
      h('slot', {name: 'background'}),
      h('slot', {name: 'actions'})
    );
  }
  get el() {
    return getElement(this);
  }
};
MyTemplate.style = jhnWebslidesCss;

export {MyTemplate as jhn_webslides};
