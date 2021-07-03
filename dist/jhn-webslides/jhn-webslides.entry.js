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
  '@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,200italic,300,300italic,regular,italic,600,600italic,700,700italic,900,900italic);@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;600;700;900&display=swap");html,body{margin:0;padding:0;color:#484848;font-family:\'Source Sans Pro\', sans-serif;overflow-x:hidden}div,p,input,button,form,ul,h1,h2,h3,h4,h5,h6{-webkit-box-sizing:border-box;box-sizing:border-box;margin:0;padding:0}img{image-rendering:optimizeSpeed;image-resolution:snap from-image;transition:all 0.5s ease;-webkit-transition:all 0.5s ease;-moz-transition:all 0.5s ease;-ms-transition:all 0.5s ease;-o-transition:all 0.5s ease}ul{list-style-type:none}a:active,a:focus,a:visited,a:hover{outline:none}a,a:hover{text-decoration:none}.j-story{width:100vw;height:100vh;overflow:hidden;display:-ms-grid;display:grid;-ms-grid-columns:40% 60%;grid-template-columns:40% 60%}.j-story__photo{height:100%;width:95%}.j-story__photo_wrap{background-color:#0849FF;height:100vh}.j-story__info_wrap{margin-left:7%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.j-story__info_wrap p.j-story__info_above{font-size:1.9rem;color:#545454;font-weight:600;text-transform:uppercase}.j-story__info_wrap .j-story__info_title{font-size:82px;line-height:86px;margin-top:25px;color:#0849FF;font-weight:400}.j-story__info_wrap .j-story__info_title span{font-weight:900}.j-story__info_wrap .j-story__info_subtitle{margin-top:20px;font-size:2.2rem;font-weight:300}.logos{position:absolute;bottom:5%;right:5%;height:50px}.footer__logo_wrap{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.footer__logo_wrap .footer__logo{height:45px;margin-left:50px;max-width:150px}.century{width:100vw;height:100vh;overflow:hidden;display:-ms-grid;display:grid;-ms-grid-rows:85% 15%;grid-template-rows:85% 15%}.century__info_wrap{background-color:#0849FF;display:-ms-grid;display:grid;-ms-grid-columns:(minmax(0, 1fr))[2];grid-template-columns:repeat(2, minmax(0, 1fr));place-items:center;color:#fff;font-size:1.8rem;font-weight:300;line-height:40px}.century__info{padding:10%;max-width:100ch}.century__footer{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;padding:0 3.75%}.vistual{width:100vw;height:100vh;overflow:hidden;display:-ms-grid;display:grid;-ms-grid-rows:85% 15%;grid-template-rows:85% 15%}.vistual__info{background-color:#0849FF;display:-ms-grid;display:grid;-ms-grid-columns:(minmax(0, 1fr))[3];grid-template-columns:repeat(3, minmax(0, 1fr));place-items:center}.vistual__info_item{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;height:70%}.vistual_item_list{width:70%}.vistual__item_title{font-size:2.3rem;font-weight:600;color:#fff}.vistual__item_subtitle{font-size:1.4rem;font-weight:300;font-style:italic;margin-top:25px;color:#fff}.vistual__link{display:-webkit-box;display:-ms-flexbox;display:flex;font-size:1.9rem;font-weight:600;margin-bottom:40px}.vistual__link_number{color:#FAC807;margin-right:10px}.vistual__link_name{color:#fff;text-transform:uppercase;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.vistual__link_name span{font-size:1.4rem;font-weight:300;color:#fff;text-transform:none;margin-top:15px}.instance{position:relative}.instance__title{font-size:2.5rem;font-weight:400;color:#717C9C}.instance__title span{color:#0849FF;font-weight:600;margin-left:10px}.instance__description{color:#717C9C;font-weight:300;font-size:2rem;line-height:40px;width:70%;margin-top:30px}.instance__hashtags{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-flow:row wrap;flex-flow:row wrap;width:80%;margin-top:50px}.instance__hashtags .instance__hashtag{padding:10px 30px;background-color:#F7F7F7;border-radius:32px;margin-right:20px;margin-bottom:20px}.judaism{width:100vw;height:100vh;overflow:hidden;display:-ms-grid;display:grid;-ms-grid-rows:85% 15%;grid-template-rows:85% 15%}.judaism .instance{padding-bottom:10%;position:relative}.judaism .logos{position:absolute;left:-2%;bottom:15%}.judaism .footer{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;width:80%}.judaism .footer__title{white-space:nowrap;text-transform:uppercase;font-size:1rem}.person{width:100vw;height:100vh;overflow:hidden;display:-ms-grid;display:grid;-ms-grid-rows:85% 15%;grid-template-rows:85% 15%;-webkit-transition:opacity .3s ease;-o-transition:opacity .3s ease;transition:opacity .3s ease;opacity:0}.person.visible{opacity:1}.person__wrap{display:-ms-grid;display:grid;padding:5% 10% 2.5% 10%;-ms-grid-rows:30% 70%;grid-template-rows:30% 70%}.person .swiper-container{height:100%;width:100%}.person__slide_wrap{display:-ms-grid;display:grid;-ms-grid-rows:90% 10%;grid-template-rows:90% 10%;width:100%;height:100%}.person__title_wrap{text-align:center}.person__name{font-size:2.5rem;color:#0849FF;font-weight:600}.person__info{color:#717C9C;font-weight:300;font-size:1.8rem;padding-top:20px}.person__info_wrap{background-color:#0849FF;color:#fff;font-weight:300;text-align:center;display:-ms-grid;display:grid;place-items:center}.person__footer{background-color:#F7F7F7}.person .swiper-slide img{display:block;width:100%;height:100%;-o-object-fit:cover;object-fit:cover}.person .swiper-button-prev{left:2.5%}.person .swiper-button-next{right:2.5%;-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg)}.person .swiper-button-prev,.person .swiper-button-next{top:55%}.person .swiper-button-prev::after,.person .swiper-button-next::after{content:\'\'}@media screen and (min-width: 1920px){.vistual__info_item{padding-top:25%}.judaism .instance{-webkit-box-pack:space-evenly;-ms-flex-pack:space-evenly;justify-content:space-evenly}}@media screen and (min-width: 1466px){.judaism .instance{padding-bottom:5%}.judaism .logos{bottom:10%}}@media screen and (max-width: 1465px){.judaism .footer{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start}.judaism .footer__logo_wrap{margin-top:30px}.judaism .footer__logo:first-child{margin-left:0}}.j-story_photo_second{display:-ms-grid;display:grid;-ms-grid-rows:55% 45%;grid-template-rows:55% 45%;height:100vh}.j-story_photo_second img{-o-object-fit:cover;object-fit:cover}.j-story_photo_second img:first-child{position:relative;border-bottom:#fff 2px solid}:host{display:block;position:relative;-webkit-user-select:var(--slide-user-select, none);-moz-user-select:var(--slide-user-select, none);-ms-user-select:var(--slide-user-select, none);user-select:var(--slide-user-select, none);background:var(--background);color:var(--color);height:inherit;z-index:var(--zIndex, 1);--slide-padding-top-default:64px;--slide-padding-end-default:64px;--slide-padding-bottom-default:64px;--slide-padding-start-default:64px}@media screen and (max-width: 1024px){:host{--slide-padding-top-default:32px;--slide-padding-end-default:32px;--slide-padding-bottom-default:32px;--slide-padding-start-default:32px}}div.deckgo-slide{display:flex;overflow:var(--overflow, hidden);padding:var(--slide-padding-top, var(--slide-padding-top-default)) var(--slide-padding-end, var(--slide-padding-end-default)) var(--slide-padding-bottom, var(--slide-padding-bottom-default)) var(--slide-padding-start, var(--slide-padding-start-default));width:calc(var(--slide-width) - var(--slide-padding-start, var(--slide-padding-start-default)) - var(--slide-padding-end, var(--slide-padding-end-default)));height:calc( var(--slide-height) - var(--slide-padding-top, var(--slide-padding-top-default)) - var(--slide-padding-bottom, var(--slide-padding-bottom-default)) );min-height:calc( var(--slide-min-height) - var(--slide-padding-top, var(--slide-padding-top-default)) - var(--slide-padding-bottom, var(--slide-padding-bottom-default)) );user-drag:none;-webkit-user-drag:none}@media print{div.deckgo-slide{padding:0;page-break-after:always;height:100vh}::slotted([slot=actions]){display:none}::slotted([slot=background]){display:var(--slide-background-print-display, none)}}::slotted(ul),::slotted(ol){-webkit-padding-start:var(--slide-padding-start, var(--slide-padding-start-default));padding-inline-start:var(--slide-padding-start, var(--slide-padding-start-default))}::slotted([slot=notes]){display:none}::slotted([slot=actions]){position:absolute;top:var(--slide-actions-top, 16px);right:var(--slide-actions-end, 32px);left:var(--slide-actions-start);display:var(--slide-actions-display);z-index:var(--slide-actions-z-index)}::slotted([slot=background]){position:var(--slide-background-position, absolute);top:var(--slide-background-top, 0);right:var(--slide-background-end);left:var(--slide-background-start, 0);width:var(--slide-background-width);height:var(--slide-background-height);z-index:-2;pointer-events:none}::slotted([slot=header]),::slotted([slot=footer]){position:absolute;left:0;width:var(--slide-width);height:100%;display:flex;align-items:center;z-index:var(--slide-header-footer-z-index, -1)}::slotted([slot=header]){top:0;width:calc(var(--slide-width) - var(--slide-header-margin-start, 32px) - var(--slide-header-margin-end, 32px));max-height:var(--slide-header-max-height, 48px);justify-content:var(--slide-header-justify-content, flex-start);margin:var(--slide-header-margin-top, 16px) var(--slide-header-margin-end, 32px) var(--slide-header-margin-bottom, 16px) var(--slide-header-margin-start, 32px)}@media screen and (max-width: 1024px){::slotted([slot=header]){max-height:var(--slide-header-max-height, 16px)}}::slotted([slot=footer]){bottom:0;width:calc(var(--slide-width) - var(--slide-footer-margin-start, 16px) - var(--slide-footer-margin-end, 16px));max-height:var(--slide-footer-max-height, 32px);justify-content:var(--slide-footer-justify-content, center);margin:var(--slide-footer-margin-top, 16px) var(--slide-footer-margin-end, 16px) var(--slide-footer-margin-bottom, 16px) var(--slide-footer-margin-start, 16px)}div.deckgo-slide{flex-direction:column;align-items:center;justify-content:center}body{padding:0;margin:0;font-family:"Source Sans Pro", sans-serif}*{box-sizing:border-box;padding:0;margin:0}.container{max-width:80%;margin:0 auto}.slide{width:100%;height:100vh;display:flex;flex-direction:row;padding:4rem 0}.slide-image::slotted([name=image]){--deckgo-lazy-img-object-fit:cover;--deckgo-lazy-img-min-width:50%;--deckgo-lazy-img-height:100%;border-right:3rem solid #0849ff}deckgo-lazy-img[slot=image]{--deckgo-lazy-img-object-fit:cover;--deckgo-lazy-img-min-width:50%;--deckgo-lazy-img-height:100%;border-right:3rem solid #0849ff}.slide-info{display:flex;flex-direction:column;padding:0.5em;margin-left:5%;font-size:var(--slide-font-size, var(--slide-auto-font-size, 1em))}.slide-info_headline{color:#545454;margin-top:auto;font-size:0.2em;margin-bottom:0.16em;text-transform:uppercase}.slide-info_title{color:#0849ff;font-weight:normal;font-size:0.54em;margin-bottom:0.06em}.slide-info_subtitle{color:#717c9c;font-size:0.24em}.slide-info-footer{margin-top:auto;display:flex;justify-content:flex-end;gap:2rem}.slide-info-footer_logo{width:20%;height:auto;-o-object-fit:cover;object-fit:cover}';

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
          'section',
          {class: 'j-story'},
          h('div', {class: 'j-story__photo_wrap'}, h('slot', {name: 'image' /*class="j-story__photo"*/})),
          h(
            'div',
            {class: 'j-story__info_wrap'},
            h('p', {class: 'j-story__info_above'}, h('slot', {name: 'headline'})),
            h('h1', {class: 'j-story__info_title'}, h('slot', {name: 'title'})),
            h('h2', {class: 'j-story__info_subtitle'}, h('slot', {name: 'subtitle'}))
          )
        ),
        h(
          'section',
          {class: 'logos'},
          h(
            'div',
            {class: 'footer__logo_wrap'},
            h('img', {src: 'img/JHM.png', alt: 'Jewish woman', class: 'footer__logo'}),
            h('img', {src: 'img/europeana.svg', alt: 'Jewish woman', class: 'footer__logo'}),
            h('img', {src: 'img/JWA_logo.jpeg', alt: 'Jewish woman', class: 'footer__logo'})
          )
        ),
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
