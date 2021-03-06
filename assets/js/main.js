! function (e) {
    var t = {};

    function n(r) {
        if (t[r]) return t[r].exports;
        var o = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    }
    n.m = e, n.c = t, n.d = function (e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: r
        })
    }, n.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function (e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var o in e) n.d(r, o, function (t) {
                return e[t]
            }.bind(null, o));
        return r
    }, n.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 3)
}([function (e, t, n) {
    var r;
    ! function () {
        "use strict";
        var o = {
            not_string: /[^s]/,
            not_bool: /[^t]/,
            not_type: /[^T]/,
            not_primitive: /[^v]/,
            number: /[diefg]/,
            numeric_arg: /[bcdiefguxX]/,
            json: /[j]/,
            not_json: /[^j]/,
            text: /^[^\x25]+/,
            modulo: /^\x25{2}/,
            placeholder: /^\x25(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
            key: /^([a-z_][a-z_\d]*)/i,
            key_access: /^\.([a-z_][a-z_\d]*)/i,
            index_access: /^\[(\d+)\]/,
            sign: /^[+-]/
        };

        function i(e) {
            return l(a(e), arguments)
        }

        function u(e, t) {
            return i.apply(null, [e].concat(t || []))
        }

        function l(e, t) {
            var n, r, u, l, s, a, c, p, f, _ = 1,
                h = e.length,
                d = "";
            for (r = 0; r < h; r++)
                if ("string" == typeof e[r]) d += e[r];
                else if ("object" == typeof e[r]) {
                if ((l = e[r]).keys)
                    for (n = t[_], u = 0; u < l.keys.length; u++) {
                        if (null == n) throw new Error(i('[sprintf] Cannot access property "%s" of undefined value "%s"', l.keys[u], l.keys[u - 1]));
                        n = n[l.keys[u]]
                    } else n = l.param_no ? t[l.param_no] : t[_++];
                if (o.not_type.test(l.type) && o.not_primitive.test(l.type) && n instanceof Function && (n = n()), o.numeric_arg.test(l.type) && "number" != typeof n && isNaN(n)) throw new TypeError(i("[sprintf] expecting number but found %T", n));
                switch (o.number.test(l.type) && (p = n >= 0), l.type) {
                    case "b":
                        n = parseInt(n, 10).toString(2);
                        break;
                    case "c":
                        n = String.fromCharCode(parseInt(n, 10));
                        break;
                    case "d":
                    case "i":
                        n = parseInt(n, 10);
                        break;
                    case "j":
                        n = JSON.stringify(n, null, l.width ? parseInt(l.width) : 0);
                        break;
                    case "e":
                        n = l.precision ? parseFloat(n).toExponential(l.precision) : parseFloat(n).toExponential();
                        break;
                    case "f":
                        n = l.precision ? parseFloat(n).toFixed(l.precision) : parseFloat(n);
                        break;
                    case "g":
                        n = l.precision ? String(Number(n.toPrecision(l.precision))) : parseFloat(n);
                        break;
                    case "o":
                        n = (parseInt(n, 10) >>> 0).toString(8);
                        break;
                    case "s":
                        n = String(n), n = l.precision ? n.substring(0, l.precision) : n;
                        break;
                    case "t":
                        n = String(!!n), n = l.precision ? n.substring(0, l.precision) : n;
                        break;
                    case "T":
                        n = Object.prototype.toString.call(n).slice(8, -1).toLowerCase(), n = l.precision ? n.substring(0, l.precision) : n;
                        break;
                    case "u":
                        n = parseInt(n, 10) >>> 0;
                        break;
                    case "v":
                        n = n.valueOf(), n = l.precision ? n.substring(0, l.precision) : n;
                        break;
                    case "x":
                        n = (parseInt(n, 10) >>> 0).toString(16);
                        break;
                    case "X":
                        n = (parseInt(n, 10) >>> 0).toString(16).toUpperCase()
                }
                o.json.test(l.type) ? d += n : (!o.number.test(l.type) || p && !l.sign ? f = "" : (f = p ? "+" : "-", n = n.toString().replace(o.sign, "")), a = l.pad_char ? "0" === l.pad_char ? "0" : l.pad_char.charAt(1) : " ", c = l.width - (f + n).length, s = l.width && c > 0 ? a.repeat(c) : "", d += l.align ? f + n + s : "0" === a ? f + s + n : s + f + n)
            }
            return d
        }
        var s = Object.create(null);

        function a(e) {
            if (s[e]) return s[e];
            for (var t, n = e, r = [], i = 0; n;) {
                if (null !== (t = o.text.exec(n))) r.push(t[0]);
                else if (null !== (t = o.modulo.exec(n))) r.push("%");
                else {
                    if (null === (t = o.placeholder.exec(n))) throw new SyntaxError("[sprintf] unexpected placeholder");
                    if (t[2]) {
                        i |= 1;
                        var u = [],
                            l = t[2],
                            a = [];
                        if (null === (a = o.key.exec(l))) throw new SyntaxError("[sprintf] failed to parse named argument key");
                        for (u.push(a[1]);
                            "" !== (l = l.substring(a[0].length));)
                            if (null !== (a = o.key_access.exec(l))) u.push(a[1]);
                            else {
                                if (null === (a = o.index_access.exec(l))) throw new SyntaxError("[sprintf] failed to parse named argument key");
                                u.push(a[1])
                            } t[2] = u
                    } else i |= 2;
                    if (3 === i) throw new Error("[sprintf] mixing positional and named placeholders is not (yet) supported");
                    r.push({
                        placeholder: t[0],
                        param_no: t[1],
                        keys: t[2],
                        sign: t[3],
                        pad_char: t[4],
                        align: t[5],
                        width: t[6],
                        precision: t[7],
                        type: t[8]
                    })
                }
                n = n.substring(t[0].length)
            }
            return s[e] = r
        }
        t.sprintf = i, t.vsprintf = u, "undefined" != typeof window && (window.sprintf = i, window.vsprintf = u, void 0 === (r = function () {
            return {
                sprintf: i,
                vsprintf: u
            }
        }.call(t, n, t, e)) || (e.exports = r))
    }()
}, function (e, t, n) {
    e.exports = function (e, t) {
        var n, r, o, i = 0;

        function u() {
            var t, u, l = r,
                s = arguments.length;
            e: for (; l;) {
                if (l.args.length === arguments.length) {
                    for (u = 0; u < s; u++)
                        if (l.args[u] !== arguments[u]) {
                            l = l.next;
                            continue e
                        } return l !== r && (l === o && (o = l.prev), l.prev.next = l.next, l.next && (l.next.prev = l.prev), l.next = r, l.prev = null, r.prev = l, r = l), l.val
                }
                l = l.next
            }
            for (t = new Array(s), u = 0; u < s; u++) t[u] = arguments[u];
            return l = {
                args: t,
                val: e.apply(null, t)
            }, r ? (r.prev = l, l.next = r) : o = l, i === n ? (o = o.prev).next = null : i++, r = l, l.val
        }
        return t && t.maxSize && (n = t.maxSize), u.clear = function () {
            r = null, o = null, i = 0
        }, u
    }
}, function (e, t, n) {}, function (e, t, n) {
    "use strict";
    n.r(t);
    var r, o, i, u, l, s = {},
        a = [],
        c = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord/i;

    function p(e, t) {
        for (var n in t) e[n] = t[n];
        return e
    }

    function f(e) {
        var t = e.parentNode;
        t && t.removeChild(e)
    }

    function _(e, t, n) {
        var r, o = arguments,
            i = {};
        for (r in t) "key" !== r && "ref" !== r && (i[r] = t[r]);
        if (arguments.length > 3)
            for (n = [n], r = 3; r < arguments.length; r++) n.push(o[r]);
        if (null != n && (i.children = n), "function" == typeof e && null != e.defaultProps)
            for (r in e.defaultProps) void 0 === i[r] && (i[r] = e.defaultProps[r]);
        return h(e, i, t && t.key, t && t.ref)
    }

    function h(e, t, n, o) {
        var i = {
            type: e,
            props: t,
            key: n,
            ref: o,
            __k: null,
            __: null,
            __b: 0,
            __e: null,
            __d: void 0,
            __c: null,
            constructor: void 0
        };
        return r.vnode && r.vnode(i), i
    }

    function d(e) {
        return e.children
    }

    function y(e, t) {
        this.props = e, this.context = t
    }

    function v(e, t) {
        if (null == t) return e.__ ? v(e.__, e.__.__k.indexOf(e) + 1) : null;
        for (var n; t < e.__k.length; t++)
            if (null != (n = e.__k[t]) && null != n.__e) return n.__e;
        return "function" == typeof e.type ? v(e) : null
    }

    function b(e) {
        var t, n;
        if (null != (e = e.__) && null != e.__c) {
            for (e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++)
                if (null != (n = e.__k[t]) && null != n.__e) {
                    e.__e = e.__c.base = n.__e;
                    break
                } return b(e)
        }
    }

    function m(e) {
        (!e.__d && (e.__d = !0) && 1 === o.push(e) || u !== r.debounceRendering) && ((u = r.debounceRendering) || i)(g)
    }

    function g() {
        var e, t, n, r, i, u, l;
        for (o.sort((function (e, t) {
                return t.__v.__b - e.__v.__b
            })); e = o.pop();) e.__d && (n = void 0, r = void 0, u = (i = (t = e).__v).__e, (l = t.__P) && (n = [], r = P(l, i, p({}, i), t.__n, void 0 !== l.ownerSVGElement, null, n, null == u ? v(i) : u), j(n, i), r != u && b(i)))
    }

    function k(e, t, n, r, o, i, u, l, c) {
        var p, _, h, d, y, b, m, g = n && n.__k || a,
            k = g.length;
        if (l == s && (l = null != i ? i[0] : k ? v(n, 0) : null), p = 0, t.__k = w(t.__k, (function (n) {
                if (null != n) {
                    if (n.__ = t, n.__b = t.__b + 1, null === (h = g[p]) || h && n.key == h.key && n.type === h.type) g[p] = void 0;
                    else
                        for (_ = 0; _ < k; _++) {
                            if ((h = g[_]) && n.key == h.key && n.type === h.type) {
                                g[_] = void 0;
                                break
                            }
                            h = null
                        }
                    if (d = P(e, n, h = h || s, r, o, i, u, l, c), (_ = n.ref) && h.ref != _ && (m || (m = []), h.ref && m.push(h.ref, null, n), m.push(_, n.__c || d, n)), null != d) {
                        var a;
                        if (null == b && (b = d), void 0 !== n.__d) a = n.__d, n.__d = void 0;
                        else if (i == h || d != l || null == d.parentNode) {
                            e: if (null == l || l.parentNode !== e) e.appendChild(d), a = null;
                                else {
                                    for (y = l, _ = 0;
                                        (y = y.nextSibling) && _ < k; _ += 2)
                                        if (y == d) break e;
                                    e.insertBefore(d, l), a = l
                                }
                            "option" == t.type && (e.value = "")
                        }
                        l = void 0 !== a ? a : d.nextSibling, "function" == typeof t.type && (t.__d = l)
                    }
                }
                return p++, n
            })), t.__e = b, null != i && "function" != typeof t.type)
            for (p = i.length; p--;) null != i[p] && f(i[p]);
        for (p = k; p--;) null != g[p] && N(g[p], g[p]);
        if (m)
            for (p = 0; p < m.length; p++) C(m[p], m[++p], m[++p])
    }

    function w(e, t, n) {
        if (null == n && (n = []), null == e || "boolean" == typeof e) t && n.push(t(null));
        else if (Array.isArray(e))
            for (var r = 0; r < e.length; r++) w(e[r], t, n);
        else n.push(t ? t("string" == typeof e || "number" == typeof e ? h(null, e, null, null) : null != e.__e || null != e.__c ? h(e.type, e.props, e.key, null) : e) : e);
        return n
    }

    function x(e, t, n) {
        "-" === t[0] ? e.setProperty(t, n) : e[t] = "number" == typeof n && !1 === c.test(t) ? n + "px" : null == n ? "" : n
    }

    function S(e, t, n, r, o) {
        var i, u, l, s, a;
        if (o ? "className" === t && (t = "class") : "class" === t && (t = "className"), "key" === t || "children" === t);
        else if ("style" === t)
            if (i = e.style, "string" == typeof n) i.cssText = n;
            else {
                if ("string" == typeof r && (i.cssText = "", r = null), r)
                    for (u in r) n && u in n || x(i, u, "");
                if (n)
                    for (l in n) r && n[l] === r[l] || x(i, l, n[l])
            }
        else "o" === t[0] && "n" === t[1] ? (s = t !== (t = t.replace(/Capture$/, "")), a = t.toLowerCase(), t = (a in e ? a : t).slice(2), n ? (r || e.addEventListener(t, O, s), (e.l || (e.l = {}))[t] = n) : e.removeEventListener(t, O, s)) : "list" !== t && "tagName" !== t && "form" !== t && "type" !== t && "size" !== t && !o && t in e ? e[t] = null == n ? "" : n : "function" != typeof n && "dangerouslySetInnerHTML" !== t && (t !== (t = t.replace(/^xlink:?/, "")) ? null == n || !1 === n ? e.removeAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase()) : e.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), n) : null == n || !1 === n && !/^ar/.test(t) ? e.removeAttribute(t) : e.setAttribute(t, n))
    }

    function O(e) {
        this.l[e.type](r.event ? r.event(e) : e)
    }

    function P(e, t, n, o, i, u, l, s, a) {
        var c, f, _, h, v, b, m, g, w, x, S = t.type;
        if (void 0 !== t.constructor) return null;
        (c = r.__b) && c(t);
        try {
            e: if ("function" == typeof S) {
                if (g = t.props, w = (c = S.contextType) && o[c.__c], x = c ? w ? w.props.value : c.__ : o, n.__c ? m = (f = t.__c = n.__c).__ = f.__E : ("prototype" in S && S.prototype.render ? t.__c = f = new S(g, x) : (t.__c = f = new y(g, x), f.constructor = S, f.render = T), w && w.sub(f), f.props = g, f.state || (f.state = {}), f.context = x, f.__n = o, _ = f.__d = !0, f.__h = []), null == f.__s && (f.__s = f.state), null != S.getDerivedStateFromProps && (f.__s == f.state && (f.__s = p({}, f.__s)), p(f.__s, S.getDerivedStateFromProps(g, f.__s))), h = f.props, v = f.state, _) null == S.getDerivedStateFromProps && null != f.componentWillMount && f.componentWillMount(), null != f.componentDidMount && f.__h.push(f.componentDidMount);
                else {
                    if (null == S.getDerivedStateFromProps && g !== h && null != f.componentWillReceiveProps && f.componentWillReceiveProps(g, x), !f.__e && null != f.shouldComponentUpdate && !1 === f.shouldComponentUpdate(g, f.__s, x)) {
                        for (f.props = g, f.state = f.__s, f.__d = !1, f.__v = t, t.__e = n.__e, t.__k = n.__k, f.__h.length && l.push(f), c = 0; c < t.__k.length; c++) t.__k[c] && (t.__k[c].__ = t);
                        break e
                    }
                    null != f.componentWillUpdate && f.componentWillUpdate(g, f.__s, x), null != f.componentDidUpdate && f.__h.push((function () {
                        f.componentDidUpdate(h, v, b)
                    }))
                }
                f.context = x, f.props = g, f.state = f.__s, (c = r.__r) && c(t), f.__d = !1, f.__v = t, f.__P = e, c = f.render(f.props, f.state, f.context), t.__k = null != c && c.type == d && null == c.key ? c.props.children : c, null != f.getChildContext && (o = p(p({}, o), f.getChildContext())), _ || null == f.getSnapshotBeforeUpdate || (b = f.getSnapshotBeforeUpdate(h, v)), k(e, t, n, o, i, u, l, s, a), f.base = t.__e, f.__h.length && l.push(f), m && (f.__E = f.__ = null), f.__e = !1
            } else t.__e = E(n.__e, t, n, o, i, u, l, a);
            (c = r.diffed) && c(t)
        }
        catch (e) {
            r.__e(e, t, n)
        }
        return t.__e
    }

    function j(e, t) {
        r.__c && r.__c(t, e), e.some((function (t) {
            try {
                e = t.__h, t.__h = [], e.some((function (e) {
                    e.call(t)
                }))
            } catch (e) {
                r.__e(e, t.__v)
            }
        }))
    }

    function E(e, t, n, r, o, i, u, l) {
        var c, p, f, _, h, d = n.props,
            y = t.props;
        if (o = "svg" === t.type || o, null == e && null != i)
            for (c = 0; c < i.length; c++)
                if (null != (p = i[c]) && (null === t.type ? 3 === p.nodeType : p.localName === t.type)) {
                    e = p, i[c] = null;
                    break
                } if (null == e) {
            if (null === t.type) return document.createTextNode(y);
            e = o ? document.createElementNS("http://www.w3.org/2000/svg", t.type) : document.createElement(t.type, y.is && {
                is: y.is
            }), i = null
        }
        if (null === t.type) null != i && (i[i.indexOf(e)] = null), d !== y && e.data != y && (e.data = y);
        else if (t !== n) {
            if (null != i && (i[i.indexOf(e)] = null, i = a.slice.call(e.childNodes)), f = (d = n.props || s).dangerouslySetInnerHTML, _ = y.dangerouslySetInnerHTML, !l) {
                if (d === s)
                    for (d = {}, h = 0; h < e.attributes.length; h++) d[e.attributes[h].name] = e.attributes[h].value;
                (_ || f) && (_ && f && _.__html == f.__html || (e.innerHTML = _ && _.__html || ""))
            }(function (e, t, n, r, o) {
                var i;
                for (i in n) i in t || S(e, i, null, n[i], r);
                for (i in t) o && "function" != typeof t[i] || "value" === i || "checked" === i || n[i] === t[i] || S(e, i, t[i], n[i], r)
            })(e, y, d, o, l), t.__k = t.props.children, _ || k(e, t, n, r, "foreignObject" !== t.type && o, i, u, s, l), l || ("value" in y && void 0 !== y.value && y.value !== e.value && (e.value = null == y.value ? "" : y.value), "checked" in y && void 0 !== y.checked && y.checked !== e.checked && (e.checked = y.checked))
        }
        return e
    }

    function C(e, t, n) {
        try {
            "function" == typeof e ? e(t) : e.current = t
        } catch (e) {
            r.__e(e, n)
        }
    }

    function N(e, t, n) {
        var o, i, u;
        if (r.unmount && r.unmount(e), (o = e.ref) && (o.current && o.current !== e.__e || C(o, null, t)), n || "function" == typeof e.type || (n = null != (i = e.__e)), e.__e = e.__d = void 0, null != (o = e.__c)) {
            if (o.componentWillUnmount) try {
                o.componentWillUnmount()
            } catch (e) {
                r.__e(e, t)
            }
            o.base = o.__P = null
        }
        if (o = e.__k)
            for (u = 0; u < o.length; u++) o[u] && N(o[u], t, n);
        null != i && f(i)
    }

    function T(e, t, n) {
        return this.constructor(e, n)
    }

    function F(e, t, n) {
        var o, i, u;
        r.__ && r.__(e, t), i = (o = n === l) ? null : n && n.__k || t.__k, e = _(d, null, [e]), u = [], P(t, (o ? t : n || t).__k = e, i || s, s, void 0 !== t.ownerSVGElement, n && !o ? [n] : i ? null : a.slice.call(t.childNodes), u, n || s, o), j(u, e)
    }
    r = {
        __e: function (e, t) {
            for (var n, r; t = t.__;)
                if ((n = t.__c) && !n.__) try {
                    if (n.constructor && null != n.constructor.getDerivedStateFromError && (r = !0, n.setState(n.constructor.getDerivedStateFromError(e))), null != n.componentDidCatch && (r = !0, n.componentDidCatch(e)), r) return m(n.__E = n)
                } catch (t) {
                    e = t
                }
            throw e
        }
    }, y.prototype.setState = function (e, t) {
        var n;
        n = this.__s !== this.state ? this.__s : this.__s = p({}, this.state), "function" == typeof e && (e = e(n, this.props)), e && p(n, e), null != e && this.__v && (t && this.__h.push(t), m(this))
    }, y.prototype.forceUpdate = function (e) {
        this.__v && (this.__e = !0, e && this.__h.push(e), m(this))
    }, y.prototype.render = d, o = [], i = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, l = s;
    var D, M, A, L;
    n(2);
    D = {
        "(": 9,
        "!": 8,
        "*": 7,
        "/": 7,
        "%": 7,
        "+": 6,
        "-": 6,
        "<": 5,
        "<=": 5,
        ">": 5,
        ">=": 5,
        "==": 4,
        "!=": 4,
        "&&": 3,
        "||": 2,
        "?": 1,
        "?:": 1
    }, M = ["(", "?"], A = {
        ")": ["("],
        ":": ["?", "?:"]
    }, L = /<=|>=|==|!=|&&|\|\||\?:|\(|!|\*|\/|%|\+|-|<|>|\?|\)|:/;
    var I = {
        "!": function (e) {
            return !e
        },
        "*": function (e, t) {
            return e * t
        },
        "/": function (e, t) {
            return e / t
        },
        "%": function (e, t) {
            return e % t
        },
        "+": function (e, t) {
            return e + t
        },
        "-": function (e, t) {
            return e - t
        },
        "<": function (e, t) {
            return e < t
        },
        "<=": function (e, t) {
            return e <= t
        },
        ">": function (e, t) {
            return e > t
        },
        ">=": function (e, t) {
            return e >= t
        },
        "==": function (e, t) {
            return e === t
        },
        "!=": function (e, t) {
            return e !== t
        },
        "&&": function (e, t) {
            return e && t
        },
        "||": function (e, t) {
            return e || t
        },
        "?:": function (e, t, n) {
            if (e) throw t;
            return n
        }
    };

    function U(e) {
        var t = function (e) {
            for (var t, n, r, o, i = [], u = []; t = e.match(L);) {
                for (n = t[0], (r = e.substr(0, t.index).trim()) && i.push(r); o = u.pop();) {
                    if (A[n]) {
                        if (A[n][0] === o) {
                            n = A[n][1] || n;
                            break
                        }
                    } else if (M.indexOf(o) >= 0 || D[o] < D[n]) {
                        u.push(o);
                        break
                    }
                    i.push(o)
                }
                A[n] || u.push(n), e = e.substr(t.index + n.length)
            }
            return (e = e.trim()) && i.push(e), i.concat(u.reverse())
        }(e);
        return function (e) {
            return function (e, t) {
                var n, r, o, i, u, l, s = [];
                for (n = 0; n < e.length; n++) {
                    if (u = e[n], i = I[u]) {
                        for (r = i.length, o = Array(r); r--;) o[r] = s.pop();
                        try {
                            l = i.apply(null, o)
                        } catch (e) {
                            return e
                        }
                    } else l = t.hasOwnProperty(u) ? t[u] : +u;
                    s.push(l)
                }
                return s[0]
            }(t, e)
        }
    }
    var z = {
        contextDelimiter: " ",
        onMissingKey: null
    };

    function W(e, t) {
        var n;
        for (n in this.data = e, this.pluralForms = {}, this.options = {}, z) this.options[n] = void 0 !== t && n in t ? t[n] : z[n]
    }
    W.prototype.getPluralForm = function (e, t) {
        var n, r, o, i, u = this.pluralForms[e];
        return u || ("function" != typeof (o = (n = this.data[e][""])["Plural-Forms"] || n["plural-forms"] || n.plural_forms) && (r = function (e) {
            var t, n, r;
            for (t = e.split(";"), n = 0; n < t.length; n++)
                if (0 === (r = t[n].trim()).indexOf("plural=")) return r.substr(7)
        }(n["Plural-Forms"] || n["plural-forms"] || n.plural_forms), i = U(r), o = function (e) {
            return +i({
                n: e
            })
        }), u = this.pluralForms[e] = o), u(t)
    }, W.prototype.dcnpgettext = function (e, t, n, r, o) {
        var i, u, l;
        return i = void 0 === o ? 0 : this.getPluralForm(e, o), u = n, t && (u = t + this.options.contextDelimiter + n), (l = this.data[e][u]) && l[i] ? l[i] : (this.options.onMissingKey && this.options.onMissingKey(n, e), 0 === i ? n : r)
    };
    var R = n(1),
        B = n.n(R);
    n(0);
    B()(console.error), new W({});

    function H(e) {
        return (H = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function $(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }

    function K(e, t) {
        return !t || "object" !== H(t) && "function" != typeof t ? function (e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e) : t
    }

    function X(e) {
        return (X = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        })(e)
    }

    function G(e, t) {
        return (G = Object.setPrototypeOf || function (e, t) {
            return e.__proto__ = t, e
        })(e, t)
    }
    // var J = window.preactAuthorJSL10n["preact-author"].locale_data.messages;
    // !1 === J ? wp.i18n.setLocaleData({
    //     "": {}
    // }, "preact-author") : wp.i18n.setLocaleData(J, "preact-author");
    var V = function (e) {
        function t(e) {
            return function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, t), K(this, X(t).call(this, e))
        }
        var n, r, o;
        return function (e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), t && G(e, t)
        }(t, e), n = t, (r = [{
            key: "render",
            value: function (e, t) {
                return _("div", {
                    className: "author-info"
                }, _("h3", {
                    className: "author-info__name"
                }, _("span", null, wp.i18n.__("About", "preact-author"), " "), " ", _("a", {
                    href: this.props.link
                }, this.props.name)), _("div", {
                    className: "author-info__bio"
                }, this.props.bio))
            }
        }]) && $(n.prototype, r), o && $(n, o), t
    }(y);

    function q(e) {
        return (q = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function Q(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }

    function Y(e, t) {
        return !t || "object" !== q(t) && "function" != typeof t ? function (e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e) : t
    }

    function Z(e) {
        return (Z = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        })(e)
    }

    function ee(e, t) {
        return (ee = Object.setPrototypeOf || function (e, t) {
            return e.__proto__ = t, e
        })(e, t)
    }
    var te, ne, re = function (e) {
            function t(e) {
                var n;
                return function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t), (n = Y(this, Z(t).call(this, e))).state = {
                    author: []
                }, n.getAuthor(), n
            }
            var n, r, o;
            return function (e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), t && ee(e, t)
            }(t, e), n = t, (r = [{
                key: "getAuthor",
                value: function () {
                    var e = this;
                    fetch( MZPA_SITE_URL + "/wp-json/preact-author/v1/author?id=" + this.props.id).then((function (e) {
                        return e.json()
                    })).then((function (t) {
                        e.setState({
                            author: t
                        })
                    }))
                }
            }, {
                key: "render",
                value: function (e, t) {
                    return _("div", {
                        className: "author-box"
                    }, _(V, {
                        name: this.state.author.name,
                        bio: this.state.author.bio,
                        link: this.state.author.link
                    }))
                }
            }]) && Q(n.prototype, r), o && Q(n, o), t
        }(y),
        oe = document.getElementById("preact-author");
    ne = oe.getAttribute("data-id"), te = F(_(re, {
        id: ne
    }), oe, te)
}]);