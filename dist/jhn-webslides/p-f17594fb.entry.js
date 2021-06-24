import {r as e, c as t, h as i, H as a, F as s, g as o} from './p-1a8d080c.js';
function d(e, t) {
  const i = e.querySelectorAll(t),
    a = e.shadowRoot ? e.shadowRoot.querySelectorAll(t) : [];
  return Array.from(i).concat(Array.from(a));
}
function r(e, t) {
  return new Promise(async (i) => {
    const a = [],
      s = d(e, t);
    s &&
      s.length > 0 &&
      (s.forEach((e) => {
        a.push(e.lazyLoadContent());
      }),
      await Promise.all(a),
      i()),
      i();
  });
}
const n = class {
  constructor(i) {
    e(this, i), (this.slideDidLoad = t(this, 'slideDidLoad', 7));
  }
  async componentDidLoad() {
    var e;
    await ((e = this.el),
    new Promise((t) => {
      let i = d(e, 'img');
      i
        ? ((i = i.filter((e) => e.getAttribute('data-src'))),
          i.forEach((e) => {
            e.style.setProperty('visibility', 'hidden');
          }),
          t())
        : t();
    })),
      this.slideDidLoad.emit();
  }
  beforeSwipe(e, t) {
    return (function (e, t, i) {
      return new Promise(async (a) => {
        if (i) {
          const i = t
            ? await (function (e) {
                return new Promise(async (t) => {
                  const i = e.querySelectorAll('deckgo-reveal, deckgo-reveal-list');
                  let a = !0;
                  if (i) {
                    const e = Array.from(i).find((e) => !e.allElementsRevealed);
                    e && (await e.reveal(), (a = !1));
                  }
                  t(a);
                });
              })(e)
            : await (function (e) {
                return new Promise(async (t) => {
                  const i = e.querySelectorAll('deckgo-reveal, deckgo-reveal-list');
                  let a = !0;
                  if (i) {
                    const e = Array.from(i)
                      .reverse()
                      .find((e) => !e.allElementsHidden);
                    e && (await e.hide(), (a = !1));
                  }
                  t(a);
                });
              })(e);
          a(i);
        } else a(!0);
      });
    })(this.el, e, t);
  }
  afterSwipe() {
    return new Promise((e) => {
      e();
    });
  }
  lazyLoadContent() {
    return (
      (e = this.el),
      new Promise(async (t) => {
        const i = [];
        i.push(
          (function (e) {
            return new Promise(async (t) => {
              const i = [];
              i.push(
                (function (e) {
                  return new Promise(async (t) => {
                    const i = d(e, 'img');
                    await (function (e) {
                      return new Promise((t) => {
                        e
                          ? (e.forEach((e) => {
                              e.hasAttribute('data-src') &&
                                (e.setAttribute('src', '' + e.getAttribute('data-src')),
                                e.removeAttribute('data-src'),
                                e.classList.contains('deckgo-reveal') || e.style.setProperty('visibility', 'inherit')),
                                e.style.setProperty('pointer-events', 'none');
                            }),
                            t())
                          : t();
                      });
                    })(i),
                      t();
                  });
                })(e)
              ),
                i.push(
                  (function (e) {
                    return new Promise(async (t) => {
                      const i = d(e, 'deckgo-lazy-img');
                      var a;
                      await ((a = i),
                      new Promise((e) => {
                        a
                          ? (a.forEach(async (e) => {
                              await e.lazyLoad();
                            }),
                            e())
                          : e();
                      })),
                        t();
                    });
                  })(e)
                ),
                await Promise.all(i),
                t();
            });
          })(e)
        ),
          i.push(r(e, 'deckgo-gif')),
          i.push(r(e, 'deckgo-youtube')),
          i.push(r(e, 'deckgo-demo')),
          i.push(r(e, 'deckgo-word-cloud')),
          i.push(r(e, 'deckgo-markdown')),
          await Promise.all(i),
          t();
      })
    );
    var e;
  }
  revealContent() {
    return (
      (e = this.el),
      new Promise(async (t) => {
        const i = e.querySelectorAll('deckgo-reveal, deckgo-reveal-list');
        if (i && i.length > 0) {
          const e = [];
          for (const t of Array.from(i)) e.push(t.revealAll());
          await Promise.all(e);
        }
        t();
      })
    );
    var e;
  }
  hideContent() {
    return (
      (e = this.el),
      new Promise(async (t) => {
        const i = e.querySelectorAll('deckgo-reveal, deckgo-reveal-list');
        if (i && i.length > 0) {
          const e = [];
          for (const t of Array.from(i)) e.push(t.hideAll());
          await Promise.all(e);
        }
        t();
      })
    );
    var e;
  }
  render() {
    return i(
      a,
      {class: {'deckgo-slide-container': !0}},
      i(
        'div',
        {class: 'deckgo-slide'},
        i(
          'div',
          {class: 'container'},
          i(
            'div',
            {class: 'slide'},
            i('slot', {name: 'image'}),
            i(
              'div',
              {class: 'slide-info'},
              i('h2', {class: 'slide-info_headline'}, i('slot', {name: 'headline'})),
              i('h1', {class: 'slide-info_title'}, i('slot', {name: 'title'})),
              i('h3', {class: 'slide-info_subtitle', slot: 'subtitle'}, i('slot', {name: 'subtitle'})),
              i(
                'div',
                {class: 'slide-info-footer'},
                i('img', {class: 'slide-info-footer_logo', src: 'https://jhn.ngo/assets/img/logos/JHM.png'}),
                i('img', {class: 'slide-info-footer_logo', src: 'https://jhn.ngo/assets/img/logos/JHM.png'}),
                i('img', {class: 'slide-info-footer_logo', src: 'https://jhn.ngo/assets/img/logos/JHM.png'})
              )
            )
          )
        ),
        i('slot', {name: 'subtitle'}),
        this.renderDeckSlots()
      )
    );
  }
  renderDeckSlots() {
    return i(
      s,
      null,
      i('slot', {name: 'notes'}),
      i('slot', {name: 'header'}),
      i('slot', {name: 'footer'}),
      i('slot', {name: 'background'}),
      i('slot', {name: 'actions'})
    );
  }
  get el() {
    return o(this);
  }
};
n.style =
  '@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,200italic,300,300italic,regular,italic,600,600italic,700,700italic,900,900italic);:host{display:block;position:relative;-webkit-user-select:var(--slide-user-select, none);-moz-user-select:var(--slide-user-select, none);-ms-user-select:var(--slide-user-select, none);user-select:var(--slide-user-select, none);background:var(--background);color:var(--color);height:inherit;z-index:var(--zIndex, 1);--slide-padding-top-default:64px;--slide-padding-end-default:64px;--slide-padding-bottom-default:64px;--slide-padding-start-default:64px}@media screen and (max-width: 1024px){:host{--slide-padding-top-default:32px;--slide-padding-end-default:32px;--slide-padding-bottom-default:32px;--slide-padding-start-default:32px}}div.deckgo-slide{display:flex;overflow:var(--overflow, hidden);padding:var(--slide-padding-top, var(--slide-padding-top-default)) var(--slide-padding-end, var(--slide-padding-end-default)) var(--slide-padding-bottom, var(--slide-padding-bottom-default)) var(--slide-padding-start, var(--slide-padding-start-default));width:calc(var(--slide-width) - var(--slide-padding-start, var(--slide-padding-start-default)) - var(--slide-padding-end, var(--slide-padding-end-default)));height:calc( var(--slide-height) - var(--slide-padding-top, var(--slide-padding-top-default)) - var(--slide-padding-bottom, var(--slide-padding-bottom-default)) );min-height:calc( var(--slide-min-height) - var(--slide-padding-top, var(--slide-padding-top-default)) - var(--slide-padding-bottom, var(--slide-padding-bottom-default)) );user-drag:none;-webkit-user-drag:none}@media print{div.deckgo-slide{padding:0;page-break-after:always;height:100vh}::slotted([slot=actions]){display:none}::slotted([slot=background]){display:var(--slide-background-print-display, none)}}::slotted(ul),::slotted(ol){-webkit-padding-start:var(--slide-padding-start, var(--slide-padding-start-default));padding-inline-start:var(--slide-padding-start, var(--slide-padding-start-default))}::slotted([slot=notes]){display:none}::slotted([slot=actions]){position:absolute;top:var(--slide-actions-top, 16px);right:var(--slide-actions-end, 32px);left:var(--slide-actions-start);display:var(--slide-actions-display);z-index:var(--slide-actions-z-index)}::slotted([slot=background]){position:var(--slide-background-position, absolute);top:var(--slide-background-top, 0);right:var(--slide-background-end);left:var(--slide-background-start, 0);width:var(--slide-background-width);height:var(--slide-background-height);z-index:-2;pointer-events:none}::slotted([slot=header]),::slotted([slot=footer]){position:absolute;left:0;width:var(--slide-width);height:100%;display:flex;align-items:center;z-index:var(--slide-header-footer-z-index, -1)}::slotted([slot=header]){top:0;width:calc(var(--slide-width) - var(--slide-header-margin-start, 32px) - var(--slide-header-margin-end, 32px));max-height:var(--slide-header-max-height, 48px);justify-content:var(--slide-header-justify-content, flex-start);margin:var(--slide-header-margin-top, 16px) var(--slide-header-margin-end, 32px) var(--slide-header-margin-bottom, 16px) var(--slide-header-margin-start, 32px)}@media screen and (max-width: 1024px){::slotted([slot=header]){max-height:var(--slide-header-max-height, 16px)}}::slotted([slot=footer]){bottom:0;width:calc(var(--slide-width) - var(--slide-footer-margin-start, 16px) - var(--slide-footer-margin-end, 16px));max-height:var(--slide-footer-max-height, 32px);justify-content:var(--slide-footer-justify-content, center);margin:var(--slide-footer-margin-top, 16px) var(--slide-footer-margin-end, 16px) var(--slide-footer-margin-bottom, 16px) var(--slide-footer-margin-start, 16px)}div.deckgo-slide{flex-direction:column;align-items:center;justify-content:center}body{padding:0;margin:0;font-family:"Source Sans Pro", sans-serif}*{box-sizing:border-box;padding:0;margin:0}.container{max-width:80%;margin:0 auto}.slide{width:100%;height:100vh;display:flex;flex-direction:row;padding:4rem 0}.slide-image{min-width:50%;height:100%}deckgo-lazy-img[slot=image]{--deckgo-lazy-img-object-fit:cover;--deckgo-lazy-img-min-width:50%;--deckgo-lazy-img-height:100%;border-right:3rem solid #0849ff}.slide-info{display:flex;flex-direction:column;padding:0.5em;margin-left:5%;font-size:var(--slide-font-size, var(--slide-auto-font-size, 1em))}.slide-info_headline{color:#545454;margin-top:auto;font-size:0.2em;margin-bottom:0.16em;text-transform:uppercase}.slide-info_title{color:#0849ff;font-weight:normal;font-size:0.54em;margin-bottom:0.06em}.slide-info_subtitle{color:#717c9c;font-size:0.24em}.slide-info-footer{margin-top:auto;display:flex;justify-content:flex-end;gap:2rem}.slide-info-footer_logo{width:20%;height:auto;-o-object-fit:cover;object-fit:cover}';
export {n as jhn_webslides};
