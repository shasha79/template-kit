import {r as e, c as i, h as t, H as o, F as a, g as s} from './p-1a8d080c.js';
function r(e, i) {
  const t = e.querySelectorAll(i),
    o = e.shadowRoot ? e.shadowRoot.querySelectorAll(i) : [];
  return Array.from(t).concat(Array.from(o));
}
function n(e, i) {
  return new Promise(async (t) => {
    const o = [],
      a = r(e, i);
    a &&
      a.length > 0 &&
      (a.forEach((e) => {
        o.push(e.lazyLoadContent());
      }),
      await Promise.all(o),
      t()),
      t();
  });
}
const d = class {
  constructor(t) {
    e(this, t), (this.slideDidLoad = i(this, 'slideDidLoad', 7));
  }
  async componentDidLoad() {
    var e;
    await ((e = this.el),
    new Promise((i) => {
      let t = r(e, 'img');
      t
        ? ((t = t.filter((e) => e.getAttribute('data-src'))),
          t.forEach((e) => {
            e.style.setProperty('visibility', 'hidden');
          }),
          i())
        : i();
    })),
      this.slideDidLoad.emit();
  }
  beforeSwipe(e, i) {
    return (function (e, i, t) {
      return new Promise(async (o) => {
        if (t) {
          const t = i
            ? await (function (e) {
                return new Promise(async (i) => {
                  const t = e.querySelectorAll('deckgo-reveal, deckgo-reveal-list');
                  let o = !0;
                  if (t) {
                    const e = Array.from(t).find((e) => !e.allElementsRevealed);
                    e && (await e.reveal(), (o = !1));
                  }
                  i(o);
                });
              })(e)
            : await (function (e) {
                return new Promise(async (i) => {
                  const t = e.querySelectorAll('deckgo-reveal, deckgo-reveal-list');
                  let o = !0;
                  if (t) {
                    const e = Array.from(t)
                      .reverse()
                      .find((e) => !e.allElementsHidden);
                    e && (await e.hide(), (o = !1));
                  }
                  i(o);
                });
              })(e);
          o(t);
        } else o(!0);
      });
    })(this.el, e, i);
  }
  afterSwipe() {
    return new Promise((e) => {
      e();
    });
  }
  lazyLoadContent() {
    return (
      (e = this.el),
      new Promise(async (i) => {
        const t = [];
        t.push(
          (function (e) {
            return new Promise(async (i) => {
              const t = [];
              t.push(
                (function (e) {
                  return new Promise(async (i) => {
                    const t = r(e, 'img');
                    await (function (e) {
                      return new Promise((i) => {
                        e
                          ? (e.forEach((e) => {
                              e.hasAttribute('data-src') &&
                                (e.setAttribute('src', '' + e.getAttribute('data-src')),
                                e.removeAttribute('data-src'),
                                e.classList.contains('deckgo-reveal') || e.style.setProperty('visibility', 'inherit')),
                                e.style.setProperty('pointer-events', 'none');
                            }),
                            i())
                          : i();
                      });
                    })(t),
                      i();
                  });
                })(e)
              ),
                t.push(
                  (function (e) {
                    return new Promise(async (i) => {
                      const t = r(e, 'deckgo-lazy-img');
                      var o;
                      await ((o = t),
                      new Promise((e) => {
                        o
                          ? (o.forEach(async (e) => {
                              await e.lazyLoad();
                            }),
                            e())
                          : e();
                      })),
                        i();
                    });
                  })(e)
                ),
                await Promise.all(t),
                i();
            });
          })(e)
        ),
          t.push(n(e, 'deckgo-gif')),
          t.push(n(e, 'deckgo-youtube')),
          t.push(n(e, 'deckgo-demo')),
          t.push(n(e, 'deckgo-word-cloud')),
          t.push(n(e, 'deckgo-markdown')),
          await Promise.all(t),
          i();
      })
    );
    var e;
  }
  revealContent() {
    return (
      (e = this.el),
      new Promise(async (i) => {
        const t = e.querySelectorAll('deckgo-reveal, deckgo-reveal-list');
        if (t && t.length > 0) {
          const e = [];
          for (const i of Array.from(t)) e.push(i.revealAll());
          await Promise.all(e);
        }
        i();
      })
    );
    var e;
  }
  hideContent() {
    return (
      (e = this.el),
      new Promise(async (i) => {
        const t = e.querySelectorAll('deckgo-reveal, deckgo-reveal-list');
        if (t && t.length > 0) {
          const e = [];
          for (const i of Array.from(t)) e.push(i.hideAll());
          await Promise.all(e);
        }
        i();
      })
    );
    var e;
  }
  render() {
    return t(
      o,
      {class: {'deckgo-slide-container': !0}},
      t(
        'div',
        {class: 'deckgo-slide'},
        t(
          'section',
          {class: 'j-story'},
          t('div', {class: 'j-story__photo_wrap'}, t('slot', {name: 'image'})),
          t(
            'div',
            {class: 'j-story__info_wrap'},
            t('p', {class: 'j-story__info_above'}, t('slot', {name: 'headline'})),
            t('h1', {class: 'j-story__info_title'}, t('slot', {name: 'title'})),
            t('h2', {class: 'j-story__info_subtitle'}, t('slot', {name: 'subtitle'}))
          )
        ),
        t(
          'section',
          {class: 'logos'},
          t(
            'div',
            {class: 'footer__logo_wrap'},
            t('img', {src: 'img/JHM.png', alt: 'Jewish woman', class: 'footer__logo'}),
            t('img', {src: 'img/europeana.svg', alt: 'Jewish woman', class: 'footer__logo'}),
            t('img', {src: 'img/JWA_logo.jpeg', alt: 'Jewish woman', class: 'footer__logo'})
          )
        ),
        this.renderDeckSlots()
      )
    );
  }
  renderDeckSlots() {
    return t(
      a,
      null,
      t('slot', {name: 'notes'}),
      t('slot', {name: 'header'}),
      t('slot', {name: 'footer'}),
      t('slot', {name: 'background'}),
      t('slot', {name: 'actions'})
    );
  }
  get el() {
    return s(this);
  }
};
d.style =
  '@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,200italic,300,300italic,regular,italic,600,600italic,700,700italic,900,900italic);@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;600;700;900&display=swap");html,body{margin:0;padding:0;color:#484848;font-family:\'Source Sans Pro\', sans-serif;overflow-x:hidden}div,p,input,button,form,ul,h1,h2,h3,h4,h5,h6{-webkit-box-sizing:border-box;box-sizing:border-box;margin:0;padding:0}img{image-rendering:optimizeSpeed;image-resolution:snap from-image;transition:all 0.5s ease;-webkit-transition:all 0.5s ease;-moz-transition:all 0.5s ease;-ms-transition:all 0.5s ease;-o-transition:all 0.5s ease}ul{list-style-type:none}a:active,a:focus,a:visited,a:hover{outline:none}a,a:hover{text-decoration:none}.j-story{width:100vw;height:100vh;overflow:hidden;display:-ms-grid;display:grid;-ms-grid-columns:40% 60%;grid-template-columns:40% 60%}.j-story__photo{height:100%;width:95%}.j-story__photo_wrap{background-color:#0849FF;height:100vh}.j-story__info_wrap{margin-left:7%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.j-story__info_wrap p.j-story__info_above{font-size:1.9rem;color:#545454;font-weight:600;text-transform:uppercase}.j-story__info_wrap .j-story__info_title{font-size:82px;line-height:86px;margin-top:25px;color:#0849FF;font-weight:400}.j-story__info_wrap .j-story__info_title span{font-weight:900}.j-story__info_wrap .j-story__info_subtitle{margin-top:20px;font-size:2.2rem;font-weight:300}.logos{position:absolute;bottom:5%;right:5%;height:50px}.footer__logo_wrap{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.footer__logo_wrap .footer__logo{height:45px;margin-left:50px;max-width:150px}.century{width:100vw;height:100vh;overflow:hidden;display:-ms-grid;display:grid;-ms-grid-rows:85% 15%;grid-template-rows:85% 15%}.century__info_wrap{background-color:#0849FF;display:-ms-grid;display:grid;-ms-grid-columns:(minmax(0, 1fr))[2];grid-template-columns:repeat(2, minmax(0, 1fr));place-items:center;color:#fff;font-size:1.8rem;font-weight:300;line-height:40px}.century__info{padding:10%;max-width:100ch}.century__footer{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;padding:0 3.75%}.vistual{width:100vw;height:100vh;overflow:hidden;display:-ms-grid;display:grid;-ms-grid-rows:85% 15%;grid-template-rows:85% 15%}.vistual__info{background-color:#0849FF;display:-ms-grid;display:grid;-ms-grid-columns:(minmax(0, 1fr))[3];grid-template-columns:repeat(3, minmax(0, 1fr));place-items:center}.vistual__info_item{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;height:70%}.vistual_item_list{width:70%}.vistual__item_title{font-size:2.3rem;font-weight:600;color:#fff}.vistual__item_subtitle{font-size:1.4rem;font-weight:300;font-style:italic;margin-top:25px;color:#fff}.vistual__link{display:-webkit-box;display:-ms-flexbox;display:flex;font-size:1.9rem;font-weight:600;margin-bottom:40px}.vistual__link_number{color:#FAC807;margin-right:10px}.vistual__link_name{color:#fff;text-transform:uppercase;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.vistual__link_name span{font-size:1.4rem;font-weight:300;color:#fff;text-transform:none;margin-top:15px}.instance{position:relative}.instance__title{font-size:2.5rem;font-weight:400;color:#717C9C}.instance__title span{color:#0849FF;font-weight:600;margin-left:10px}.instance__description{color:#717C9C;font-weight:300;font-size:2rem;line-height:40px;width:70%;margin-top:30px}.instance__hashtags{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-flow:row wrap;flex-flow:row wrap;width:80%;margin-top:50px}.instance__hashtags .instance__hashtag{padding:10px 30px;background-color:#F7F7F7;border-radius:32px;margin-right:20px;margin-bottom:20px}.judaism{width:100vw;height:100vh;overflow:hidden;display:-ms-grid;display:grid;-ms-grid-rows:85% 15%;grid-template-rows:85% 15%}.judaism .instance{padding-bottom:10%;position:relative}.judaism .logos{position:absolute;left:-2%;bottom:15%}.judaism .footer{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;width:80%}.judaism .footer__title{white-space:nowrap;text-transform:uppercase;font-size:1rem}.person{width:100vw;height:100vh;overflow:hidden;display:-ms-grid;display:grid;-ms-grid-rows:85% 15%;grid-template-rows:85% 15%;-webkit-transition:opacity .3s ease;-o-transition:opacity .3s ease;transition:opacity .3s ease;opacity:0}.person.visible{opacity:1}.person__wrap{display:-ms-grid;display:grid;padding:5% 10% 2.5% 10%;-ms-grid-rows:30% 70%;grid-template-rows:30% 70%}.person .swiper-container{height:100%;width:100%}.person__slide_wrap{display:-ms-grid;display:grid;-ms-grid-rows:90% 10%;grid-template-rows:90% 10%;width:100%;height:100%}.person__title_wrap{text-align:center}.person__name{font-size:2.5rem;color:#0849FF;font-weight:600}.person__info{color:#717C9C;font-weight:300;font-size:1.8rem;padding-top:20px}.person__info_wrap{background-color:#0849FF;color:#fff;font-weight:300;text-align:center;display:-ms-grid;display:grid;place-items:center}.person__footer{background-color:#F7F7F7}.person .swiper-slide img{display:block;width:100%;height:100%;-o-object-fit:cover;object-fit:cover}.person .swiper-button-prev{left:2.5%}.person .swiper-button-next{right:2.5%;-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg)}.person .swiper-button-prev,.person .swiper-button-next{top:55%}.person .swiper-button-prev::after,.person .swiper-button-next::after{content:\'\'}@media screen and (min-width: 1920px){.vistual__info_item{padding-top:25%}.judaism .instance{-webkit-box-pack:space-evenly;-ms-flex-pack:space-evenly;justify-content:space-evenly}}@media screen and (min-width: 1466px){.judaism .instance{padding-bottom:5%}.judaism .logos{bottom:10%}}@media screen and (max-width: 1465px){.judaism .footer{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start}.judaism .footer__logo_wrap{margin-top:30px}.judaism .footer__logo:first-child{margin-left:0}}.j-story_photo_second{display:-ms-grid;display:grid;-ms-grid-rows:55% 45%;grid-template-rows:55% 45%;height:100vh}.j-story_photo_second img{-o-object-fit:cover;object-fit:cover}.j-story_photo_second img:first-child{position:relative;border-bottom:#fff 2px solid}:host{display:block;position:relative;-webkit-user-select:var(--slide-user-select, none);-moz-user-select:var(--slide-user-select, none);-ms-user-select:var(--slide-user-select, none);user-select:var(--slide-user-select, none);background:var(--background);color:var(--color);height:inherit;z-index:var(--zIndex, 1);--slide-padding-top-default:64px;--slide-padding-end-default:64px;--slide-padding-bottom-default:64px;--slide-padding-start-default:64px}@media screen and (max-width: 1024px){:host{--slide-padding-top-default:32px;--slide-padding-end-default:32px;--slide-padding-bottom-default:32px;--slide-padding-start-default:32px}}div.deckgo-slide{display:flex;overflow:var(--overflow, hidden);padding:var(--slide-padding-top, var(--slide-padding-top-default)) var(--slide-padding-end, var(--slide-padding-end-default)) var(--slide-padding-bottom, var(--slide-padding-bottom-default)) var(--slide-padding-start, var(--slide-padding-start-default));width:calc(var(--slide-width) - var(--slide-padding-start, var(--slide-padding-start-default)) - var(--slide-padding-end, var(--slide-padding-end-default)));height:calc( var(--slide-height) - var(--slide-padding-top, var(--slide-padding-top-default)) - var(--slide-padding-bottom, var(--slide-padding-bottom-default)) );min-height:calc( var(--slide-min-height) - var(--slide-padding-top, var(--slide-padding-top-default)) - var(--slide-padding-bottom, var(--slide-padding-bottom-default)) );user-drag:none;-webkit-user-drag:none}@media print{div.deckgo-slide{padding:0;page-break-after:always;height:100vh}::slotted([slot=actions]){display:none}::slotted([slot=background]){display:var(--slide-background-print-display, none)}}::slotted(ul),::slotted(ol){-webkit-padding-start:var(--slide-padding-start, var(--slide-padding-start-default));padding-inline-start:var(--slide-padding-start, var(--slide-padding-start-default))}::slotted([slot=notes]){display:none}::slotted([slot=actions]){position:absolute;top:var(--slide-actions-top, 16px);right:var(--slide-actions-end, 32px);left:var(--slide-actions-start);display:var(--slide-actions-display);z-index:var(--slide-actions-z-index)}::slotted([slot=background]){position:var(--slide-background-position, absolute);top:var(--slide-background-top, 0);right:var(--slide-background-end);left:var(--slide-background-start, 0);width:var(--slide-background-width);height:var(--slide-background-height);z-index:-2;pointer-events:none}::slotted([slot=header]),::slotted([slot=footer]){position:absolute;left:0;width:var(--slide-width);height:100%;display:flex;align-items:center;z-index:var(--slide-header-footer-z-index, -1)}::slotted([slot=header]){top:0;width:calc(var(--slide-width) - var(--slide-header-margin-start, 32px) - var(--slide-header-margin-end, 32px));max-height:var(--slide-header-max-height, 48px);justify-content:var(--slide-header-justify-content, flex-start);margin:var(--slide-header-margin-top, 16px) var(--slide-header-margin-end, 32px) var(--slide-header-margin-bottom, 16px) var(--slide-header-margin-start, 32px)}@media screen and (max-width: 1024px){::slotted([slot=header]){max-height:var(--slide-header-max-height, 16px)}}::slotted([slot=footer]){bottom:0;width:calc(var(--slide-width) - var(--slide-footer-margin-start, 16px) - var(--slide-footer-margin-end, 16px));max-height:var(--slide-footer-max-height, 32px);justify-content:var(--slide-footer-justify-content, center);margin:var(--slide-footer-margin-top, 16px) var(--slide-footer-margin-end, 16px) var(--slide-footer-margin-bottom, 16px) var(--slide-footer-margin-start, 16px)}div.deckgo-slide{flex-direction:column;align-items:center;justify-content:center}body{padding:0;margin:0;font-family:"Source Sans Pro", sans-serif}*{box-sizing:border-box;padding:0;margin:0}.container{max-width:80%;margin:0 auto}.slide{width:100%;height:100vh;display:flex;flex-direction:row;padding:4rem 0}.slide-image::slotted([name=image]){--deckgo-lazy-img-object-fit:cover;--deckgo-lazy-img-min-width:50%;--deckgo-lazy-img-height:100%;border-right:3rem solid #0849ff}deckgo-lazy-img[slot=image]{--deckgo-lazy-img-object-fit:cover;--deckgo-lazy-img-min-width:50%;--deckgo-lazy-img-height:100%;border-right:3rem solid #0849ff}.slide-info{display:flex;flex-direction:column;padding:0.5em;margin-left:5%;font-size:var(--slide-font-size, var(--slide-auto-font-size, 1em))}.slide-info_headline{color:#545454;margin-top:auto;font-size:0.2em;margin-bottom:0.16em;text-transform:uppercase}.slide-info_title{color:#0849ff;font-weight:normal;font-size:0.54em;margin-bottom:0.06em}.slide-info_subtitle{color:#717c9c;font-size:0.24em}.slide-info-footer{margin-top:auto;display:flex;justify-content:flex-end;gap:2rem}.slide-info-footer_logo{width:20%;height:auto;-o-object-fit:cover;object-fit:cover}';
export {d as jhn_webslides};
