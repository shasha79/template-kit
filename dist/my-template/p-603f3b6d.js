let t,
  e,
  n = !1;
const l = 'undefined' != typeof window ? window : {},
  s = l.document || {head: {}},
  o = {
    t: 0,
    l: '',
    jmp: (t) => t(),
    raf: (t) => requestAnimationFrame(t),
    ael: (t, e, n, l) => t.addEventListener(e, n, l),
    rel: (t, e, n, l) => t.removeEventListener(e, n, l),
    ce: (t, e) => new CustomEvent(t, e)
  },
  r = (t) => Promise.resolve(t),
  c = (() => {
    try {
      return new CSSStyleSheet(), !0;
    } catch (t) {}
    return !1;
  })(),
  i = new WeakMap(),
  a = (t) => 'sc-' + t.o,
  u = {},
  f = (t) => 'object' == (t = typeof t) || 'function' === t,
  $ = (t, e, ...n) => {
    let l = null,
      s = !1,
      o = !1,
      r = [];
    const c = (e) => {
      for (let n = 0; n < e.length; n++)
        (l = e[n]),
          Array.isArray(l)
            ? c(l)
            : null != l &&
              'boolean' != typeof l &&
              ((s = 'function' != typeof t && !f(l)) && (l += ''), s && o ? (r[r.length - 1].i += l) : r.push(s ? d(null, l) : l), (o = s));
    };
    if ((c(n), e)) {
      const t = e.className || e.class;
      t &&
        (e.class =
          'object' != typeof t
            ? t
            : Object.keys(t)
                .filter((e) => t[e])
                .join(' '));
    }
    if ('function' == typeof t) return t(null === e ? {} : e, r, p);
    const i = d(t, null);
    return (i.u = e), r.length > 0 && (i.$ = r), i;
  },
  d = (t, e) => ({t: 0, m: t, i: e, p: null, $: null, u: null}),
  m = {},
  p = {forEach: (t, e) => t.map(y).forEach(e), map: (t, e) => t.map(y).map(e).map(h)},
  y = (t) => ({vattrs: t.u, vchildren: t.$, vkey: t.h, vname: t.v, vtag: t.m, vtext: t.i}),
  h = (t) => {
    if ('function' == typeof t.vtag) {
      const e = Object.assign({}, t.vattrs);
      return t.vkey && (e.key = t.vkey), t.vname && (e.name = t.vname), $(t.vtag, e, ...(t.vchildren || []));
    }
    const e = d(t.vtag, t.vtext);
    return (e.u = t.vattrs), (e.$ = t.vchildren), (e.h = t.vkey), (e.v = t.vname), e;
  },
  b = (t, e, n, l, s, o) => {
    if (n !== l) {
      let r = I(t, e);
      if ((e.toLowerCase(), 'class' === e)) {
        const e = t.classList,
          s = v(n),
          o = v(l);
        e.remove(...s.filter((t) => t && !o.includes(t))), e.add(...o.filter((t) => t && !s.includes(t)));
      } else {
        const c = f(l);
        if ((r || (c && null !== l)) && !s)
          try {
            if (t.tagName.includes('-')) t[e] = l;
            else {
              let s = null == l ? '' : l;
              'list' === e ? (r = !1) : (null != n && t[e] == s) || (t[e] = s);
            }
          } catch (t) {}
        null == l || !1 === l
          ? (!1 === l && '' !== t.getAttribute(e)) || t.removeAttribute(e)
          : (!r || 4 & o || s) && !c && t.setAttribute(e, (l = !0 === l ? '' : l));
      }
    }
  },
  w = /\s/,
  v = (t) => (t ? t.split(w) : []),
  g = (t, e, n, l) => {
    const s = 11 === e.p.nodeType && e.p.host ? e.p.host : e.p,
      o = (t && t.u) || u,
      r = e.u || u;
    for (l in o) l in r || b(s, l, o[l], void 0, n, e.t);
    for (l in r) b(s, l, o[l], r[l], n, e.t);
  },
  j = (e, n, l) => {
    let o,
      r,
      c = n.$[l],
      i = 0;
    if (null !== c.i) o = c.p = s.createTextNode(c.i);
    else if (((o = c.p = s.createElement(c.m)), g(null, c, !1), null != t && o['s-si'] !== t && o.classList.add((o['s-si'] = t)), c.$))
      for (i = 0; i < c.$.length; ++i) (r = j(e, c, i)), r && o.appendChild(r);
    return o;
  },
  S = (t, n, l, s, o, r) => {
    let c,
      i = t;
    for (i.shadowRoot && i.tagName === e && (i = i.shadowRoot); o <= r; ++o)
      s[o] && ((c = j(null, l, o)), c && ((s[o].p = c), i.insertBefore(c, n)));
  },
  M = (t, e, n, l) => {
    for (; e <= n; ++e) (l = t[e]) && l.p.remove();
  },
  O = (t, e) => t.m === e.m,
  k = (t, e) => {
    const n = (e.p = t.p),
      l = t.$,
      s = e.$,
      o = e.i;
    null === o
      ? ('slot' === e.m || g(t, e, !1),
        null !== l && null !== s
          ? ((t, e, n, l) => {
              let s,
                o = 0,
                r = 0,
                c = e.length - 1,
                i = e[0],
                a = e[c],
                u = l.length - 1,
                f = l[0],
                $ = l[u];
              for (; o <= c && r <= u; )
                null == i
                  ? (i = e[++o])
                  : null == a
                  ? (a = e[--c])
                  : null == f
                  ? (f = l[++r])
                  : null == $
                  ? ($ = l[--u])
                  : O(i, f)
                  ? (k(i, f), (i = e[++o]), (f = l[++r]))
                  : O(a, $)
                  ? (k(a, $), (a = e[--c]), ($ = l[--u]))
                  : O(i, $)
                  ? (k(i, $), t.insertBefore(i.p, a.p.nextSibling), (i = e[++o]), ($ = l[--u]))
                  : O(a, f)
                  ? (k(a, f), t.insertBefore(a.p, i.p), (a = e[--c]), (f = l[++r]))
                  : ((s = j(e && e[r], n, r)), (f = l[++r]), s && i.p.parentNode.insertBefore(s, i.p));
              o > c ? S(t, null == l[u + 1] ? null : l[u + 1].p, n, l, r, u) : r > u && M(e, o, c);
            })(n, l, e, s)
          : null !== s
          ? (null !== t.i && (n.textContent = ''), S(n, null, e, s, 0, s.length - 1))
          : null !== l && M(l, 0, l.length - 1))
      : t.i !== o && (n.data = o);
  },
  C = (t) => z(t).g,
  P = (t, e, n) => {
    const l = C(t);
    return {emit: (t) => x(l, e, {bubbles: !!(4 & n), composed: !!(2 & n), cancelable: !!(1 & n), detail: t})};
  },
  x = (t, e, n) => {
    const l = o.ce(e, n);
    return t.dispatchEvent(l), l;
  },
  E = (t, e) => {
    e && !t.j && e['s-p'] && e['s-p'].push(new Promise((e) => (t.j = e)));
  },
  L = (t, e) => {
    if (((t.t |= 16), !(4 & t.t))) return E(t, t.S), st(() => T(t, e));
    t.t |= 512;
  },
  T = (t, e) => {
    const n = t.M;
    return W(void 0, () => A(t, n, e));
  },
  A = async (n, l, o) => {
    const r = n.g,
      c = r['s-rc'];
    o &&
      ((t) => {
        const e = t.O,
          n = t.g,
          l = e.t,
          o = ((t, e) => {
            let n = a(e),
              l = X.get(n);
            if (((t = 11 === t.nodeType ? t : s), l))
              if ('string' == typeof l) {
                let e,
                  o = i.get((t = t.head || t));
                o || i.set(t, (o = new Set())),
                  o.has(n) ||
                    ((e = s.createElement('style')), (e.innerHTML = l), t.insertBefore(e, t.querySelector('link')), o && o.add(n));
              } else t.adoptedStyleSheets.includes(l) || (t.adoptedStyleSheets = [...t.adoptedStyleSheets, l]);
            return n;
          })(n.shadowRoot ? n.shadowRoot : n.getRootNode(), e);
        10 & l && ((n['s-sc'] = o), n.classList.add(o + '-h'));
      })(n);
    ((n, l) => {
      const s = n.g,
        o = n.O,
        r = n.k || d(null, null),
        c = ((t) => t && t.m === m)(l) ? l : $(null, null, l);
      (e = s.tagName),
        o.C && ((c.u = c.u || {}), o.C.map(([t, e]) => (c.u[e] = s[t]))),
        (c.m = null),
        (c.t |= 4),
        (n.k = c),
        (c.p = r.p = s.shadowRoot || s),
        (t = s['s-sc']),
        k(r, c);
    })(n, F(n, l)),
      c && (c.map((t) => t()), (r['s-rc'] = void 0));
    {
      const t = r['s-p'],
        e = () => H(n);
      0 === t.length ? e() : (Promise.all(t).then(e), (n.t |= 4), (t.length = 0));
    }
  },
  F = (t, e) => {
    try {
      (e = e.render()), (t.t &= -17), (t.t |= 2);
    } catch (e) {
      J(e, t.g);
    }
    return e;
  },
  H = (t) => {
    const e = t.g,
      n = t.M,
      l = t.S;
    64 & t.t || ((t.t |= 64), q(e), U(n, 'componentDidLoad'), t.P(e), l || R()),
      t.L(e),
      t.j && (t.j(), (t.j = void 0)),
      512 & t.t && lt(() => L(t, !1)),
      (t.t &= -517);
  },
  R = () => {
    q(s.documentElement), lt(() => x(l, 'appload', {detail: {namespace: 'my-template'}}));
  },
  U = (t, e, n) => {
    if (t && t[e])
      try {
        return t[e](n);
      } catch (t) {
        J(t);
      }
  },
  W = (t, e) => (t && t.then ? t.then(e) : e()),
  q = (t) => t.classList.add('hydrated'),
  D = (t, e, n) => {
    if (e.T) {
      const l = Object.entries(e.T),
        s = t.prototype;
      if (
        (l.map(([t, [l]]) => {
          31 & l || (2 & n && 32 & l)
            ? Object.defineProperty(s, t, {
                get() {
                  return ((t, e) => z(this).A.get(e))(0, t);
                },
                set(n) {
                  ((t, e, n, l) => {
                    const s = z(t),
                      o = s.A.get(e),
                      r = s.t,
                      c = s.M;
                    (n = ((t, e) => (null == t || f(t) ? t : 1 & e ? t + '' : t))(n, l.T[e][0])),
                      (8 & r && void 0 !== o) || n === o || (s.A.set(e, n), c && 2 == (18 & r) && L(s, !1));
                  })(this, t, n, e);
                },
                configurable: !0,
                enumerable: !0
              })
            : 1 & n &&
              64 & l &&
              Object.defineProperty(s, t, {
                value(...e) {
                  const n = z(this);
                  return n.F.then(() => n.M[t](...e));
                }
              });
        }),
        1 & n)
      ) {
        const n = new Map();
        (s.attributeChangedCallback = function (t, e, l) {
          o.jmp(() => {
            const e = n.get(t);
            this[e] = (null !== l || 'boolean' != typeof this[e]) && l;
          });
        }),
          (t.observedAttributes = l
            .filter(([t, e]) => 15 & e[0])
            .map(([t, l]) => {
              const s = l[1] || t;
              return n.set(s, t), 512 & l[0] && e.C.push([t, s]), s;
            }));
      }
    }
    return t;
  },
  N = (t, e = {}) => {
    const n = [],
      r = e.exclude || [],
      i = l.customElements,
      u = s.head,
      f = u.querySelector('meta[charset]'),
      $ = s.createElement('style'),
      d = [];
    let m,
      p = !0;
    Object.assign(o, e),
      (o.l = new URL(e.resourcesUrl || './', s.baseURI).href),
      t.map((t) =>
        t[1].map((e) => {
          const l = {t: e[0], o: e[1], T: e[2], H: e[3]};
          (l.T = e[2]), (l.C = []);
          const s = l.o,
            u = class extends HTMLElement {
              constructor(t) {
                super(t), G((t = this), l), 1 & l.t && t.attachShadow({mode: 'open'});
              }
              connectedCallback() {
                m && (clearTimeout(m), (m = null)),
                  p
                    ? d.push(this)
                    : o.jmp(() =>
                        ((t) => {
                          if (0 == (1 & o.t)) {
                            const e = z(t),
                              n = e.O,
                              l = () => {};
                            if (!(1 & e.t)) {
                              e.t |= 1;
                              {
                                let n = t;
                                for (; (n = n.parentNode || n.host); )
                                  if (n['s-p']) {
                                    E(e, (e.S = n));
                                    break;
                                  }
                              }
                              n.T &&
                                Object.entries(n.T).map(([e, [n]]) => {
                                  if (31 & n && t.hasOwnProperty(e)) {
                                    const n = t[e];
                                    delete t[e], (t[e] = n);
                                  }
                                }),
                                (async (t, e, n, l, s) => {
                                  if (0 == (32 & e.t)) {
                                    {
                                      if (((e.t |= 32), (s = Q(n)).then)) {
                                        const t = () => {};
                                        (s = await s), t();
                                      }
                                      s.isProxied || (D(s, n, 2), (s.isProxied = !0));
                                      const t = () => {};
                                      e.t |= 8;
                                      try {
                                        new s(e);
                                      } catch (t) {
                                        J(t);
                                      }
                                      (e.t &= -9), t();
                                    }
                                    if (s.style) {
                                      let t = s.style;
                                      const e = a(n);
                                      if (!X.has(e)) {
                                        const l = () => {};
                                        ((t, e, n) => {
                                          let l = X.get(t);
                                          c && n ? ((l = l || new CSSStyleSheet()), l.replace(e)) : (l = e), X.set(t, l);
                                        })(e, t, !!(1 & n.t)),
                                          l();
                                      }
                                    }
                                  }
                                  const o = e.S,
                                    r = () => L(e, !0);
                                  o && o['s-rc'] ? o['s-rc'].push(r) : r();
                                })(0, e, n);
                            }
                            l();
                          }
                        })(this)
                      );
              }
              disconnectedCallback() {
                o.jmp(() => {});
              }
              componentOnReady() {
                return z(this).R;
              }
            };
          (l.U = t[0]), r.includes(s) || i.get(s) || (n.push(s), i.define(s, D(u, l, 1)));
        })
      ),
      ($.innerHTML = n + '{visibility:hidden}.hydrated{visibility:inherit}'),
      $.setAttribute('data-styles', ''),
      u.insertBefore($, f ? f.nextSibling : u.firstChild),
      (p = !1),
      d.length ? d.map((t) => t.connectedCallback()) : o.jmp(() => (m = setTimeout(R, 30)));
  },
  V = (t, e) => e,
  _ = new WeakMap(),
  z = (t) => _.get(t),
  B = (t, e) => _.set((e.M = t), e),
  G = (t, e) => {
    const n = {t: 0, g: t, O: e, A: new Map()};
    return (n.F = new Promise((t) => (n.L = t))), (n.R = new Promise((t) => (n.P = t))), (t['s-p'] = []), (t['s-rc'] = []), _.set(t, n);
  },
  I = (t, e) => e in t,
  J = (t, e) => (0, console.error)(t, e),
  K = new Map(),
  Q = (t) => {
    const e = t.o.replace(/-/g, '_'),
      n = t.U,
      l = K.get(n);
    return l ? l[e] : import(`./${n}.entry.js`).then((t) => (K.set(n, t), t[e]), J);
  },
  X = new Map(),
  Y = [],
  Z = [],
  tt = (t, e) => (l) => {
    t.push(l), n || ((n = !0), e && 4 & o.t ? lt(nt) : o.raf(nt));
  },
  et = (t) => {
    for (let e = 0; e < t.length; e++)
      try {
        t[e](performance.now());
      } catch (t) {
        J(t);
      }
    t.length = 0;
  },
  nt = () => {
    et(Y), et(Z), (n = Y.length > 0) && o.raf(nt);
  },
  lt = (t) => r().then(t),
  st = tt(Z, !0);
export {V as F, m as H, N as b, P as c, C as g, $ as h, r as p, B as r};
