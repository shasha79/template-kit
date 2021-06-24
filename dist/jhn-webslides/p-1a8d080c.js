let e,
  t,
  n = !1;
const l = 'undefined' != typeof window ? window : {},
  s = l.document || {head: {}},
  o = {
    t: 0,
    l: '',
    jmp: (e) => e(),
    raf: (e) => requestAnimationFrame(e),
    ael: (e, t, n, l) => e.addEventListener(t, n, l),
    rel: (e, t, n, l) => e.removeEventListener(t, n, l),
    ce: (e, t) => new CustomEvent(e, t)
  },
  r = (e) => Promise.resolve(e),
  c = (() => {
    try {
      return new CSSStyleSheet(), !0;
    } catch (e) {}
    return !1;
  })(),
  i = new WeakMap(),
  a = (e) => 'sc-' + e.o,
  u = {},
  f = (e) => 'object' == (e = typeof e) || 'function' === e,
  d = (e, t, ...n) => {
    let l = null,
      s = !1,
      o = !1,
      r = [];
    const c = (t) => {
      for (let n = 0; n < t.length; n++)
        (l = t[n]),
          Array.isArray(l)
            ? c(l)
            : null != l &&
              'boolean' != typeof l &&
              ((s = 'function' != typeof e && !f(l)) && (l += ''), s && o ? (r[r.length - 1].i += l) : r.push(s ? $(null, l) : l), (o = s));
    };
    if ((c(n), t)) {
      const e = t.className || t.class;
      e &&
        (t.class =
          'object' != typeof e
            ? e
            : Object.keys(e)
                .filter((t) => e[t])
                .join(' '));
    }
    if ('function' == typeof e) return e(null === t ? {} : t, r, p);
    const i = $(e, null);
    return (i.u = t), r.length > 0 && (i.$ = r), i;
  },
  $ = (e, t) => ({t: 0, m: e, i: t, p: null, $: null, u: null}),
  m = {},
  p = {forEach: (e, t) => e.map(y).forEach(t), map: (e, t) => e.map(y).map(t).map(h)},
  y = (e) => ({vattrs: e.u, vchildren: e.$, vkey: e.h, vname: e.v, vtag: e.m, vtext: e.i}),
  h = (e) => {
    if ('function' == typeof e.vtag) {
      const t = Object.assign({}, e.vattrs);
      return e.vkey && (t.key = e.vkey), e.vname && (t.name = e.vname), d(e.vtag, t, ...(e.vchildren || []));
    }
    const t = $(e.vtag, e.vtext);
    return (t.u = e.vattrs), (t.$ = e.vchildren), (t.h = e.vkey), (t.v = e.vname), t;
  },
  b = (e, t, n, l, s, o) => {
    if (n !== l) {
      let r = I(e, t);
      if ((t.toLowerCase(), 'class' === t)) {
        const t = e.classList,
          s = v(n),
          o = v(l);
        t.remove(...s.filter((e) => e && !o.includes(e))), t.add(...o.filter((e) => e && !s.includes(e)));
      } else {
        const c = f(l);
        if ((r || (c && null !== l)) && !s)
          try {
            if (e.tagName.includes('-')) e[t] = l;
            else {
              let s = null == l ? '' : l;
              'list' === t ? (r = !1) : (null != n && e[t] == s) || (e[t] = s);
            }
          } catch (e) {}
        null == l || !1 === l
          ? (!1 === l && '' !== e.getAttribute(t)) || e.removeAttribute(t)
          : (!r || 4 & o || s) && !c && e.setAttribute(t, (l = !0 === l ? '' : l));
      }
    }
  },
  w = /\s/,
  v = (e) => (e ? e.split(w) : []),
  g = (e, t, n, l) => {
    const s = 11 === t.p.nodeType && t.p.host ? t.p.host : t.p,
      o = (e && e.u) || u,
      r = t.u || u;
    for (l in o) l in r || b(s, l, o[l], void 0, n, t.t);
    for (l in r) b(s, l, o[l], r[l], n, t.t);
  },
  j = (t, n, l) => {
    let o,
      r,
      c = n.$[l],
      i = 0;
    if (null !== c.i) o = c.p = s.createTextNode(c.i);
    else if (((o = c.p = s.createElement(c.m)), g(null, c, !1), null != e && o['s-si'] !== e && o.classList.add((o['s-si'] = e)), c.$))
      for (i = 0; i < c.$.length; ++i) (r = j(t, c, i)), r && o.appendChild(r);
    return o;
  },
  S = (e, n, l, s, o, r) => {
    let c,
      i = e;
    for (i.shadowRoot && i.tagName === t && (i = i.shadowRoot); o <= r; ++o)
      s[o] && ((c = j(null, l, o)), c && ((s[o].p = c), i.insertBefore(c, n)));
  },
  M = (e, t, n, l) => {
    for (; t <= n; ++t) (l = e[t]) && l.p.remove();
  },
  O = (e, t) => e.m === t.m,
  k = (e, t) => {
    const n = (t.p = e.p),
      l = e.$,
      s = t.$,
      o = t.i;
    null === o
      ? ('slot' === t.m || g(e, t, !1),
        null !== l && null !== s
          ? ((e, t, n, l) => {
              let s,
                o = 0,
                r = 0,
                c = t.length - 1,
                i = t[0],
                a = t[c],
                u = l.length - 1,
                f = l[0],
                d = l[u];
              for (; o <= c && r <= u; )
                null == i
                  ? (i = t[++o])
                  : null == a
                  ? (a = t[--c])
                  : null == f
                  ? (f = l[++r])
                  : null == d
                  ? (d = l[--u])
                  : O(i, f)
                  ? (k(i, f), (i = t[++o]), (f = l[++r]))
                  : O(a, d)
                  ? (k(a, d), (a = t[--c]), (d = l[--u]))
                  : O(i, d)
                  ? (k(i, d), e.insertBefore(i.p, a.p.nextSibling), (i = t[++o]), (d = l[--u]))
                  : O(a, f)
                  ? (k(a, f), e.insertBefore(a.p, i.p), (a = t[--c]), (f = l[++r]))
                  : ((s = j(t && t[r], n, r)), (f = l[++r]), s && i.p.parentNode.insertBefore(s, i.p));
              o > c ? S(e, null == l[u + 1] ? null : l[u + 1].p, n, l, r, u) : r > u && M(t, o, c);
            })(n, l, t, s)
          : null !== s
          ? (null !== e.i && (n.textContent = ''), S(n, null, t, s, 0, s.length - 1))
          : null !== l && M(l, 0, l.length - 1))
      : e.i !== o && (n.data = o);
  },
  C = (e) => z(e).g,
  P = (e, t, n) => {
    const l = C(e);
    return {emit: (e) => x(l, t, {bubbles: !!(4 & n), composed: !!(2 & n), cancelable: !!(1 & n), detail: e})};
  },
  x = (e, t, n) => {
    const l = o.ce(t, n);
    return e.dispatchEvent(l), l;
  },
  E = (e, t) => {
    t && !e.j && t['s-p'] && t['s-p'].push(new Promise((t) => (e.j = t)));
  },
  L = (e, t) => {
    if (((e.t |= 16), !(4 & e.t))) return E(e, e.S), se(() => T(e, t));
    e.t |= 512;
  },
  T = (e, t) => {
    const n = e.M;
    return W(void 0, () => A(e, n, t));
  },
  A = async (n, l, o) => {
    const r = n.g,
      c = r['s-rc'];
    o &&
      ((e) => {
        const t = e.O,
          n = e.g,
          l = t.t,
          o = ((e, t) => {
            let n = a(t),
              l = X.get(n);
            if (((e = 11 === e.nodeType ? e : s), l))
              if ('string' == typeof l) {
                let t,
                  o = i.get((e = e.head || e));
                o || i.set(e, (o = new Set())),
                  o.has(n) ||
                    ((t = s.createElement('style')), (t.innerHTML = l), e.insertBefore(t, e.querySelector('link')), o && o.add(n));
              } else e.adoptedStyleSheets.includes(l) || (e.adoptedStyleSheets = [...e.adoptedStyleSheets, l]);
            return n;
          })(n.shadowRoot ? n.shadowRoot : n.getRootNode(), t);
        10 & l && ((n['s-sc'] = o), n.classList.add(o + '-h'));
      })(n);
    ((n, l) => {
      const s = n.g,
        o = n.O,
        r = n.k || $(null, null),
        c = ((e) => e && e.m === m)(l) ? l : d(null, null, l);
      (t = s.tagName),
        o.C && ((c.u = c.u || {}), o.C.map(([e, t]) => (c.u[t] = s[e]))),
        (c.m = null),
        (c.t |= 4),
        (n.k = c),
        (c.p = r.p = s.shadowRoot || s),
        (e = s['s-sc']),
        k(r, c);
    })(n, F(n, l)),
      c && (c.map((e) => e()), (r['s-rc'] = void 0));
    {
      const e = r['s-p'],
        t = () => H(n);
      0 === e.length ? t() : (Promise.all(e).then(t), (n.t |= 4), (e.length = 0));
    }
  },
  F = (e, t) => {
    try {
      (t = t.render()), (e.t &= -17), (e.t |= 2);
    } catch (t) {
      J(t, e.g);
    }
    return t;
  },
  H = (e) => {
    const t = e.g,
      n = e.M,
      l = e.S;
    64 & e.t || ((e.t |= 64), q(t), U(n, 'componentDidLoad'), e.P(t), l || R()),
      e.L(t),
      e.j && (e.j(), (e.j = void 0)),
      512 & e.t && le(() => L(e, !1)),
      (e.t &= -517);
  },
  R = () => {
    q(s.documentElement), le(() => x(l, 'appload', {detail: {namespace: 'jhn-webslides'}}));
  },
  U = (e, t, n) => {
    if (e && e[t])
      try {
        return e[t](n);
      } catch (e) {
        J(e);
      }
  },
  W = (e, t) => (e && e.then ? e.then(t) : t()),
  q = (e) => e.classList.add('hydrated'),
  D = (e, t, n) => {
    if (t.T) {
      const l = Object.entries(t.T),
        s = e.prototype;
      if (
        (l.map(([e, [l]]) => {
          31 & l || (2 & n && 32 & l)
            ? Object.defineProperty(s, e, {
                get() {
                  return ((e, t) => z(this).A.get(t))(0, e);
                },
                set(n) {
                  ((e, t, n, l) => {
                    const s = z(e),
                      o = s.A.get(t),
                      r = s.t,
                      c = s.M;
                    (n = ((e, t) => (null == e || f(e) ? e : 1 & t ? e + '' : e))(n, l.T[t][0])),
                      (8 & r && void 0 !== o) || n === o || (s.A.set(t, n), c && 2 == (18 & r) && L(s, !1));
                  })(this, e, n, t);
                },
                configurable: !0,
                enumerable: !0
              })
            : 1 & n &&
              64 & l &&
              Object.defineProperty(s, e, {
                value(...t) {
                  const n = z(this);
                  return n.F.then(() => n.M[e](...t));
                }
              });
        }),
        1 & n)
      ) {
        const n = new Map();
        (s.attributeChangedCallback = function (e, t, l) {
          o.jmp(() => {
            const t = n.get(e);
            this[t] = (null !== l || 'boolean' != typeof this[t]) && l;
          });
        }),
          (e.observedAttributes = l
            .filter(([e, t]) => 15 & t[0])
            .map(([e, l]) => {
              const s = l[1] || e;
              return n.set(s, e), 512 & l[0] && t.C.push([e, s]), s;
            }));
      }
    }
    return e;
  },
  N = (e, t = {}) => {
    const n = [],
      r = t.exclude || [],
      i = l.customElements,
      u = s.head,
      f = u.querySelector('meta[charset]'),
      d = s.createElement('style'),
      $ = [];
    let m,
      p = !0;
    Object.assign(o, t),
      (o.l = new URL(t.resourcesUrl || './', s.baseURI).href),
      e.map((e) =>
        e[1].map((t) => {
          const l = {t: t[0], o: t[1], T: t[2], H: t[3]};
          (l.T = t[2]), (l.C = []);
          const s = l.o,
            u = class extends HTMLElement {
              constructor(e) {
                super(e), G((e = this), l), 1 & l.t && e.attachShadow({mode: 'open'});
              }
              connectedCallback() {
                m && (clearTimeout(m), (m = null)),
                  p
                    ? $.push(this)
                    : o.jmp(() =>
                        ((e) => {
                          if (0 == (1 & o.t)) {
                            const t = z(e),
                              n = t.O,
                              l = () => {};
                            if (!(1 & t.t)) {
                              t.t |= 1;
                              {
                                let n = e;
                                for (; (n = n.parentNode || n.host); )
                                  if (n['s-p']) {
                                    E(t, (t.S = n));
                                    break;
                                  }
                              }
                              n.T &&
                                Object.entries(n.T).map(([t, [n]]) => {
                                  if (31 & n && e.hasOwnProperty(t)) {
                                    const n = e[t];
                                    delete e[t], (e[t] = n);
                                  }
                                }),
                                (async (e, t, n, l, s) => {
                                  if (0 == (32 & t.t)) {
                                    {
                                      if (((t.t |= 32), (s = Q(n)).then)) {
                                        const e = () => {};
                                        (s = await s), e();
                                      }
                                      s.isProxied || (D(s, n, 2), (s.isProxied = !0));
                                      const e = () => {};
                                      t.t |= 8;
                                      try {
                                        new s(t);
                                      } catch (e) {
                                        J(e);
                                      }
                                      (t.t &= -9), e();
                                    }
                                    if (s.style) {
                                      let e = s.style;
                                      const t = a(n);
                                      if (!X.has(t)) {
                                        const l = () => {};
                                        ((e, t, n) => {
                                          let l = X.get(e);
                                          c && n ? ((l = l || new CSSStyleSheet()), l.replace(t)) : (l = t), X.set(e, l);
                                        })(t, e, !!(1 & n.t)),
                                          l();
                                      }
                                    }
                                  }
                                  const o = t.S,
                                    r = () => L(t, !0);
                                  o && o['s-rc'] ? o['s-rc'].push(r) : r();
                                })(0, t, n);
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
          (l.U = e[0]), r.includes(s) || i.get(s) || (n.push(s), i.define(s, D(u, l, 1)));
        })
      ),
      (d.innerHTML = n + '{visibility:hidden}.hydrated{visibility:inherit}'),
      d.setAttribute('data-styles', ''),
      u.insertBefore(d, f ? f.nextSibling : u.firstChild),
      (p = !1),
      $.length ? $.map((e) => e.connectedCallback()) : o.jmp(() => (m = setTimeout(R, 30)));
  },
  V = (e, t) => t,
  _ = new WeakMap(),
  z = (e) => _.get(e),
  B = (e, t) => _.set((t.M = e), t),
  G = (e, t) => {
    const n = {t: 0, g: e, O: t, A: new Map()};
    return (n.F = new Promise((e) => (n.L = e))), (n.R = new Promise((e) => (n.P = e))), (e['s-p'] = []), (e['s-rc'] = []), _.set(e, n);
  },
  I = (e, t) => t in e,
  J = (e, t) => (0, console.error)(e, t),
  K = new Map(),
  Q = (e) => {
    const t = e.o.replace(/-/g, '_'),
      n = e.U,
      l = K.get(n);
    return l ? l[t] : import(`./${n}.entry.js`).then((e) => (K.set(n, e), e[t]), J);
  },
  X = new Map(),
  Y = [],
  Z = [],
  ee = (e, t) => (l) => {
    e.push(l), n || ((n = !0), t && 4 & o.t ? le(ne) : o.raf(ne));
  },
  te = (e) => {
    for (let t = 0; t < e.length; t++)
      try {
        e[t](performance.now());
      } catch (e) {
        J(e);
      }
    e.length = 0;
  },
  ne = () => {
    te(Y), te(Z), (n = Y.length > 0) && o.raf(ne);
  },
  le = (e) => r().then(e),
  se = ee(Z, !0);
export {V as F, m as H, N as b, P as c, C as g, d as h, r as p, B as r};
