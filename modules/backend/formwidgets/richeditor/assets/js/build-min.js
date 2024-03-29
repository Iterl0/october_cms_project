!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)), a(c), c
    } : a(jQuery)
}(function (a) {
    var b = function (c, d) {
        this.id = ++a.FE.ID, this.opts = a.extend(!0, {}, a.extend({}, b.DEFAULTS, "object" == typeof d && d));
        var e = JSON.stringify(this.opts);
        a.FE.OPTS_MAPPING[e] = a.FE.OPTS_MAPPING[e] || this.id, this.sid = a.FE.OPTS_MAPPING[e], a.FE.SHARED[this.sid] = a.FE.SHARED[this.sid] || {}, this.shared = a.FE.SHARED[this.sid], this.shared.count = (this.shared.count || 0) + 1, this.$oel = a(c), this.$oel.data("froala.editor", this), this.o_doc = c.ownerDocument, this.o_win = "defaultView" in this.o_doc ? this.o_doc.defaultView : this.o_doc.parentWindow;
        var f = a(this.o_win).scrollTop();
        this.$oel.on("froala.doInit", a.proxy(function () {
            this.$oel.off("froala.doInit"), this.doc = this.$el.get(0).ownerDocument, this.win = "defaultView" in this.doc ? this.doc.defaultView : this.doc.parentWindow, this.$doc = a(this.doc), this.$win = a(this.win), this.opts.pluginsEnabled || (this.opts.pluginsEnabled = Object.keys(a.FE.PLUGINS)), this.opts.initOnClick ? (this.load(a.FE.MODULES), this.$el.on("touchstart.init", function () {
                a(this).data("touched", !0)
            }), this.$el.on("touchmove.init", function () {
                a(this).removeData("touched")
            }), this.$el.on("mousedown.init touchend.init dragenter.init focus.init", a.proxy(function (b) {
                if ("touchend" == b.type && !this.$el.data("touched")) return !0;
                if (1 === b.which || !b.which) {
                    this.$el.off("mousedown.init touchstart.init touchmove.init touchend.init dragenter.init focus.init"), this.load(a.FE.MODULES), this.load(a.FE.PLUGINS);
                    var c = b.originalEvent && b.originalEvent.originalTarget;
                    c && "IMG" == c.tagName && a(c).trigger("mousedown"), "undefined" == typeof this.ul && this.destroy(), "touchend" == b.type && this.image && b.originalEvent && b.originalEvent.target && a(b.originalEvent.target).is("img") && setTimeout(a.proxy(function () {
                        this.image.edit(a(b.originalEvent.target))
                    }, this), 100), this.ready = !0, this.events.trigger("initialized")
                }
            }, this))) : (this.load(a.FE.MODULES), this.load(a.FE.PLUGINS), a(this.o_win).scrollTop(f), "undefined" == typeof this.ul && this.destroy(), this.ready = !0, this.events.trigger("initialized"))
        }, this)), this._init()
    };
    b.DEFAULTS = {
        initOnClick: !1,
        pluginsEnabled: null
    }, b.MODULES = {}, b.PLUGINS = {}, b.VERSION = "2.4.2", b.INSTANCES = [], b.OPTS_MAPPING = {}, b.SHARED = {}, b.ID = 0, b.prototype._init = function () {
        var b = this.$oel.prop("tagName"), c = a.proxy(function () {
            "TEXTAREA" != b && (this._original_html = this._original_html || this.$oel.html()), this.$box = this.$box || this.$oel, this.opts.fullPage && (this.opts.iframe = !0), this.opts.iframe ? (this.$iframe = a('<iframe src="about:blank" frameBorder="0">'), this.$wp = a("<div></div>"), this.$box.html(this.$wp), this.$wp.append(this.$iframe), this.$iframe.get(0).contentWindow.document.open(), this.$iframe.get(0).contentWindow.document.write("<!DOCTYPE html>"), this.$iframe.get(0).contentWindow.document.write("<html><head></head><body></body></html>"), this.$iframe.get(0).contentWindow.document.close(), this.$el = this.$iframe.contents().find("body"), this.el = this.$el.get(0), this.$head = this.$iframe.contents().find("head"), this.$html = this.$iframe.contents().find("html"), this.iframe_document = this.$iframe.get(0).contentWindow.document, this.$oel.trigger("froala.doInit")) : (this.$el = a("<div></div>"), this.el = this.$el.get(0), this.$wp = a("<div></div>").append(this.$el), this.$box.html(this.$wp), this.$oel.trigger("froala.doInit"))
        }, this), d = a.proxy(function () {
            this.$box = a("<div>"), this.$oel.before(this.$box).hide(), this._original_html = this.$oel.val(), this.$oel.parents("form").on("submit." + this.id, a.proxy(function () {
                this.events.trigger("form.submit")
            }, this)), this.$oel.parents("form").on("reset." + this.id, a.proxy(function () {
                this.events.trigger("form.reset")
            }, this)), c()
        }, this), e = a.proxy(function () {
            this.$el = this.$oel, this.el = this.$el.get(0), this.$el.attr("contenteditable", !0).css("outline", "none").css("display", "inline-block"), this.opts.multiLine = !1, this.opts.toolbarInline = !1, this.$oel.trigger("froala.doInit")
        }, this), f = a.proxy(function () {
            this.$el = this.$oel, this.el = this.$el.get(0), this.opts.toolbarInline = !1, this.$oel.trigger("froala.doInit")
        }, this), g = a.proxy(function () {
            this.$el = this.$oel, this.el = this.$el.get(0), this.opts.toolbarInline = !1, this.$oel.on("click.popup", function (a) {
                a.preventDefault()
            }), this.$oel.trigger("froala.doInit")
        }, this);
        this.opts.editInPopup ? g() : "TEXTAREA" == b ? d() : "A" == b ? e() : "IMG" == b ? f() : "BUTTON" == b || "INPUT" == b ? (this.opts.editInPopup = !0, this.opts.toolbarInline = !1, g()) : c()
    }, b.prototype.load = function (b) {
        for (var c in b) if (b.hasOwnProperty(c)) {
            if (this[c]) continue;
            if (a.FE.PLUGINS[c] && this.opts.pluginsEnabled.indexOf(c) < 0) continue;
            if (this[c] = new b[c](this), this[c]._init && (this[c]._init(), this.opts.initOnClick && "core" == c)) return !1
        }
    }, b.prototype.destroy = function () {
        this.shared.count--, this.events.$off();
        var b = this.html.get();
        if (this.events.trigger("destroy", [], !0), this.events.trigger("shared.destroy", void 0, !0), 0 === this.shared.count) {
            for (var c in this.shared) this.shared.hasOwnProperty(c) && (null == this.shared[c], a.FE.SHARED[this.sid][c] = null);
            a.FE.SHARED[this.sid] = {}
        }
        this.$oel.parents("form").off("." + this.id), this.$oel.off("click.popup"), this.$oel.removeData("froala.editor"), this.$oel.off("froalaEditor"), this.core.destroy(b), a.FE.INSTANCES.splice(a.FE.INSTANCES.indexOf(this), 1)
    }, a.fn.froalaEditor = function (c) {
        for (var d = [], e = 0; e < arguments.length; e++) d.push(arguments[e]);
        if ("string" == typeof c) {
            var f = [];
            return this.each(function () {
                var b = a(this), e = b.data("froala.editor");
                if (e) {
                    var g, h;
                    if (c.indexOf(".") > 0 && e[c.split(".")[0]] ? (e[c.split(".")[0]] && (g = e[c.split(".")[0]]), h = c.split(".")[1]) : (g = e, h = c.split(".")[0]), !g[h]) return a.error("Method " + c + " does not exist in Froala Editor.");
                    var i = g[h].apply(e, d.slice(1));
                    void 0 === i ? f.push(this) : 0 === f.length && f.push(i)
                }
            }), 1 == f.length ? f[0] : f
        }
        if ("object" == typeof c || !c) return this.each(function () {
            var d = a(this).data("froala.editor");
            if (!d) {
                var e = this;
                new b(e, c)
            }
        })
    }, a.fn.froalaEditor.Constructor = b, a.FroalaEditor = b, a.FE = b, a.FE.XS = 0, a.FE.SM = 1, a.FE.MD = 2, a.FE.LG = 3, a.FE.MODULES.helpers = function (b) {
        function c() {
            var a, b, c = -1;
            return "Microsoft Internet Explorer" == navigator.appName ? (a = navigator.userAgent, b = new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})"), null !== b.exec(a) && (c = parseFloat(RegExp.$1))) : "Netscape" == navigator.appName && (a = navigator.userAgent, b = new RegExp("Trident/.*rv:([0-9]{1,}[\\.0-9]{0,})"), null !== b.exec(a) && (c = parseFloat(RegExp.$1))), c
        }

        function d() {
            var a = {}, b = c();
            if (b > 0) a.msie = !0; else {
                var d = navigator.userAgent.toLowerCase(),
                    e = /(edge)[ \/]([\w.]+)/.exec(d) || /(chrome)[ \/]([\w.]+)/.exec(d) || /(webkit)[ \/]([\w.]+)/.exec(d) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(d) || /(msie) ([\w.]+)/.exec(d) || d.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(d) || [],
                    f = {browser: e[1] || "", version: e[2] || "0"};
                e[1] && (a[f.browser] = !0), a.chrome ? a.webkit = !0 : a.webkit && (a.safari = !0)
            }
            return a.msie && (a.version = b), a
        }

        function e() {
            return /(iPad|iPhone|iPod)/g.test(navigator.userAgent) && !h()
        }

        function f() {
            return /(Android)/g.test(navigator.userAgent) && !h()
        }

        function g() {
            return /(Blackberry)/g.test(navigator.userAgent)
        }

        function h() {
            return /(Windows Phone)/gi.test(navigator.userAgent)
        }

        function i() {
            return f() || e() || g()
        }

        function j() {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (a) {
                window.setTimeout(a, 1e3 / 60)
            }
        }

        function k(a) {
            return parseInt(a, 10) || 0
        }

        function l() {
            var b = a('<div class="fr-visibility-helper"></div>').appendTo("body"), c = k(b.css("margin-left"));
            return b.remove(), c
        }

        function m() {
            return "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch
        }

        function n(a) {
            if (!/^(https?:|ftps?:|)\/\//i.test(a)) return !1;
            a = String(a).replace(/</g, "%3C").replace(/>/g, "%3E").replace(/"/g, "%22").replace(/ /g, "%20");
            var b = /(http|ftp|https):\/\/[a-z\u00a1-\uffff0-9{}]+(\.[a-z\u00a1-\uffff0-9{}]*)*([a-z\u00a1-\uffff0-9.,@?^=%&amp;:\/~+#-_{}]*[a-z\u00a1-\uffff0-9@?^=%&amp;\/~+#-_{}])?/gi;
            return b.test(a)
        }

        function o(a) {
            // prevent url sanitize for correct markup interpretation
            return a;
            if (/^(https?:|ftps?:|)\/\//i.test(a)) {
                if (!n(a) && !n("http:" + a)) return ""
            } else a = encodeURIComponent(a).replace(/%23/g, "#").replace(/%2F/g, "/").replace(/%25/g, "%").replace(/mailto%3A/gi, "mailto:").replace(/file%3A/gi, "file:").replace(/sms%3A/gi, "sms:").replace(/tel%3A/gi, "tel:").replace(/notes%3A/gi, "notes:").replace(/data%3Aimage/gi, "data:image").replace(/blob%3A/gi, "blob:").replace(/webkit-fake-url%3A/gi, "webkit-fake-url:").replace(/%3F/g, "?").replace(/%3D/g, "=").replace(/%26/g, "&").replace(/&amp;/g, "&").replace(/%2C/g, ",").replace(/%3B/g, ";").replace(/%2B/g, "+").replace(/%40/g, "@").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/%7B/g, "{").replace(/%7D/g, "}");
            return a
        }

        function p(a) {
            return a && !a.propertyIsEnumerable("length") && "object" == typeof a && "number" == typeof a.length
        }

        function q(a) {
            function b(a) {
                return ("0" + parseInt(a, 10).toString(16)).slice(-2)
            }

            try {
                return a && "transparent" !== a ? /^#[0-9A-F]{6}$/i.test(a) ? a : (a = a.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/), ("#" + b(a[1]) + b(a[2]) + b(a[3])).toUpperCase()) : ""
            } catch (c) {
                return null
            }
        }

        function r(a) {
            var b = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            a = a.replace(b, function (a, b, c, d) {
                return b + b + c + c + d + d
            });
            var c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
            return c ? "rgb(" + parseInt(c[1], 16) + ", " + parseInt(c[2], 16) + ", " + parseInt(c[3], 16) + ")" : ""
        }

        function s(b) {
            var c = (b.css("text-align") || "").replace(/-(.*)-/g, "");
            if (["left", "right", "justify", "center"].indexOf(c) < 0) {
                if (!y) {
                    var d = a('<div dir="auto" style="text-align: initial; position: fixed; left: -3000px;"><span id="s1">.</span><span id="s2">.</span></div>');
                    a("body").append(d);
                    var e = d.find("#s1").get(0).getBoundingClientRect().left,
                        f = d.find("#s2").get(0).getBoundingClientRect().left;
                    d.remove(), y = e < f ? "left" : "right"
                }
                c = y
            }
            return c
        }

        function t() {
            return null == z && (z = navigator.platform.toUpperCase().indexOf("MAC") >= 0), z
        }

        function u() {
            function a(a, b) {
                var d = a[b];
                a[b] = function (a) {
                    var b, f = !1, g = !1;
                    if (a.match(e)) {
                        a = a.replace(e, ""), this.parentNode || (c.appendChild(this), g = !0);
                        var h = this.parentNode;
                        return this.id || (this.id = "rootedQuerySelector_id_" + (new Date).getTime(), f = !0), b = d.call(h, "#" + this.id + " " + a), f && (this.id = ""), g && c.removeChild(this), b
                    }
                    return d.call(this, a)
                }
            }

            var c = b.o_doc.createElement("div");
            try {
                c.querySelectorAll(":scope *")
            } catch (d) {
                var e = /^\s*:scope/gi;
                a(Element.prototype, "querySelector"), a(Element.prototype, "querySelectorAll")
            }
        }

        function v() {
            return b.o_win.pageYOffset ? b.o_win.pageYOffset : b.o_doc.documentElement && b.o_doc.documentElement.scrollTop ? b.o_doc.documentElement.scrollTop : b.o_doc.body.scrollTop ? b.o_doc.body.scrollTop : 0
        }

        function w() {
            return b.o_win.pageXOffset ? b.o_win.pageXOffset : b.o_doc.documentElement && b.o_doc.documentElement.scrollLeft ? b.o_doc.documentElement.scrollLeft : b.o_doc.body.scrollLeft ? b.o_doc.body.scrollLeft : 0
        }

        function x() {
            b.browser = d(), u()
        }

        var y, z = null;
        return {
            _init: x,
            isIOS: e,
            isMac: t,
            isAndroid: f,
            isBlackberry: g,
            isWindowsPhone: h,
            isMobile: i,
            requestAnimationFrame: j,
            getPX: k,
            screenSize: l,
            isTouch: m,
            sanitizeURL: o,
            isArray: p,
            RGBToHex: q,
            HEXtoRGB: r,
            isURL: n,
            getAlignment: s,
            scrollTop: v,
            scrollLeft: w
        }
    }, a.FE.MODULES.events = function (b) {
        function c(a, b, c) {
            s(a, b, c)
        }

        function d() {
            c(b.$el, "cut copy paste beforepaste", function (a) {
                v(a.type, [a])
            })
        }

        function e() {
            c(b.$el, "click mouseup mousedown touchstart touchend dragenter dragover dragleave dragend drop dragstart", function (a) {
                v(a.type, [a])
            }), r("mousedown", function () {
                for (var c = 0; c < a.FE.INSTANCES.length; c++) a.FE.INSTANCES[c] != b && a.FE.INSTANCES[c].popups && a.FE.INSTANCES[c].popups.areVisible() && a.FE.INSTANCES[c].$el.find(".fr-marker").remove()
            })
        }

        function f() {
            c(b.$el, "keydown keypress keyup input", function (a) {
                v(a.type, [a])
            })
        }

        function g() {
            c(b.$win, b._mousedown, function (a) {
                v("window.mousedown", [a]), n()
            }), c(b.$win, b._mouseup, function (a) {
                v("window.mouseup", [a])
            }), c(b.$win, "cut copy keydown keyup touchmove touchend", function (a) {
                v("window." + a.type, [a])
            })
        }

        function h() {
            c(b.$doc, "dragend drop", function (a) {
                v("document." + a.type, [a])
            })
        }

        function i(c) {
            if ("undefined" == typeof c && (c = !0), !b.$wp) return !1;
            if (b.helpers.isIOS() && b.$win.get(0).focus(), !b.core.hasFocus() && c) {
                var d = b.$win.scrollTop();
                return b.browser.msie && b.$box && b.$box.css("position", "fixed"), b.$el.focus(), b.browser.msie && b.$box && b.$box.css("position", ""), d != b.$win.scrollTop() && b.$win.scrollTop(d), !1
            }
            if (!b.core.hasFocus() || b.$el.find(".fr-marker").length > 0) return !1;
            var e = b.selection.info(b.el);
            if (e.atStart && b.selection.isCollapsed() && null != b.html.defaultTag()) {
                var f = b.markers.insert();
                if (f && !b.node.blockParent(f)) {
                    a(f).remove();
                    var g = b.$el.find(b.html.blockTagsQuery()).get(0);
                    g && (a(g).prepend(a.FE.MARKERS), b.selection.restore())
                } else f && a(f).remove()
            }
        }

        function j() {
            c(b.$el, "focus", function (a) {
                p() && (i(!1), C === !1 && v(a.type, [a]))
            }), c(b.$el, "blur", function (a) {
                p() && C === !0 && (v(a.type, [a]), n())
            }), r("focus", function () {
                C = !0
            }), r("blur", function () {
                C = !1
            })
        }

        function k() {
            b.helpers.isMobile() ? (b._mousedown = "touchstart", b._mouseup = "touchend", b._move = "touchmove", b._mousemove = "touchmove") : (b._mousedown = "mousedown", b._mouseup = "mouseup", b._move = "", b._mousemove = "mousemove")
        }

        function l(c) {
            var d = a(c.currentTarget);
            return b.edit.isDisabled() || b.node.hasClass(d.get(0), "fr-disabled") ? (c.preventDefault(), !1) : "mousedown" === c.type && 1 !== c.which || (b.helpers.isMobile() || c.preventDefault(), (b.helpers.isAndroid() || b.helpers.isWindowsPhone()) && 0 === d.parents(".fr-dropdown-menu").length && (c.preventDefault(), c.stopPropagation()), d.addClass("fr-selected"), void b.events.trigger("commands.mousedown", [d]))
        }

        function m(c, d) {
            var e = a(c.currentTarget);
            if (b.edit.isDisabled() || b.node.hasClass(e.get(0), "fr-disabled")) return c.preventDefault(), !1;
            if ("mouseup" === c.type && 1 !== c.which) return !0;
            if (!b.node.hasClass(e.get(0), "fr-selected")) return !0;
            if ("touchmove" != c.type) {
                if (c.stopPropagation(), c.stopImmediatePropagation(), c.preventDefault(), !b.node.hasClass(e.get(0), "fr-selected")) return a(".fr-selected").removeClass("fr-selected"), !1;
                if (a(".fr-selected").removeClass("fr-selected"), e.data("dragging") || e.attr("disabled")) return e.removeData("dragging"), !1;
                var f = e.data("timeout");
                f && (clearTimeout(f), e.removeData("timeout")), d.apply(b, [c])
            } else e.data("timeout") || e.data("timeout", setTimeout(function () {
                e.data("dragging", !0)
            }, 100))
        }

        function n() {
            A = !0
        }

        function o() {
            A = !1
        }

        function p() {
            return A
        }

        function q(a, c, d) {
            s(a, b._mousedown, c, function (a) {
                b.edit.isDisabled() || l(a)
            }, !0), s(a, b._mouseup + " " + b._move, c, function (a) {
                b.edit.isDisabled() || m(a, d)
            }, !0), s(a, "mousedown click mouseup", c, function (a) {
                b.edit.isDisabled() || a.stopPropagation()
            }, !0), r("window.mouseup", function () {
                b.edit.isDisabled() || (a.find(c).removeClass("fr-selected"), n())
            })
        }

        function r(a, c, d) {
            var e = a.split(" ");
            if (e.length > 1) {
                for (var f = 0; f < e.length; f++) r(e[f], c, d);
                return !0
            }
            "undefined" == typeof d && (d = !1);
            var g;
            g = 0 != a.indexOf("shared.") ? B[a] = B[a] || [] : b.shared._events[a] = b.shared._events[a] || [], d ? g.unshift(c) : g.push(c)
        }

        function s(a, c, d, e, f) {
            "function" == typeof d && (f = e, e = d, d = !1);
            var g = f ? b.shared.$_events : D, h = f ? b.sid : b.id;
            d ? a.on(c.split(" ").join(".ed" + h + " ") + ".ed" + h, d, e) : a.on(c.split(" ").join(".ed" + h + " ") + ".ed" + h, e), g.indexOf(a.get(0)) < 0 && g.push(a.get(0))
        }

        function t(b, c) {
            for (var d = 0; d < b.length; d++) a(b[d]).off(".ed" + c)
        }

        function u() {
            t(D, b.id), D = [], 0 == b.shared.count && (t(b.shared.$_events, b.sid), b.shared.$_events = null)
        }

        function v(c, d, e) {
            if (!b.edit.isDisabled() || e) {
                var f;
                if (0 != c.indexOf("shared.")) f = B[c]; else {
                    if (b.shared.count > 0) return !1;
                    f = b.shared._events[c]
                }
                var g;
                if (f) for (var h = 0; h < f.length; h++) if (g = f[h].apply(b, d), g === !1) return !1;
                return g = b.$oel.triggerHandler("froalaEditor." + c, a.merge([b], d || [])), g !== !1 && g
            }
        }

        function w(c, d, e) {
            if (!b.edit.isDisabled() || e) {
                var f;
                if (0 != c.indexOf("shared.")) f = B[c]; else {
                    if (b.shared.count > 0) return !1;
                    f = b.shared._events[c]
                }
                var g;
                if (f) for (var h = 0; h < f.length; h++) g = f[h].apply(b, [d]), "undefined" != typeof g && (d = g);
                return g = b.$oel.triggerHandler("froalaEditor." + c, a.merge([b], [d])), "undefined" != typeof g && (d = g), d
            }
        }

        function x() {
            for (var a in B) B.hasOwnProperty(a) && delete B[a]
        }

        function y() {
            for (var a in b.shared._events) b.shared._events.hasOwnProperty(a) && delete b.shared._events[a]
        }

        function z() {
            b.shared.$_events = b.shared.$_events || [], b.shared._events = {}, k(), e(), g(), h(), f(), j(), n(), d(), r("destroy", x), r("shared.destroy", y)
        }

        var A, B = {}, C = !1, D = [];
        return {
            _init: z,
            on: r,
            trigger: v,
            bindClick: q,
            disableBlur: o,
            enableBlur: n,
            blurActive: p,
            focus: i,
            chainTrigger: w,
            $on: s,
            $off: u
        }
    }, a.FE.MODULES.node = function (b) {
        function c(a) {
            return a && "IFRAME" != a.tagName ? Array.prototype.slice.call(a.childNodes || []) : []
        }

        function d(b) {
            return !!b && (b.nodeType == Node.ELEMENT_NODE && a.FE.BLOCK_TAGS.indexOf(b.tagName.toLowerCase()) >= 0)
        }

        function e(e, f) {
            if (!e) return !0;
            if (e.querySelector("table")) return !1;
            var g = c(e);
            1 == g.length && d(g[0]) && (g = c(g[0]));
            for (var h = !1, i = 0; i < g.length; i++) {
                var j = g[i];
                if (!(f && b.node.hasClass(j, "fr-marker") || j.nodeType == Node.TEXT_NODE && 0 == j.textContent.length)) {
                    if ("BR" != j.tagName && (j.textContent || "").replace(/\u200B/gi, "").replace(/\n/g, "").length > 0) return !1;
                    if (h) return !1;
                    "BR" == j.tagName && (h = !0)
                }
            }
            return !(e.querySelectorAll(a.FE.VOID_ELEMENTS.join(",")).length - e.querySelectorAll("br").length) && (!e.querySelector(b.opts.htmlAllowedEmptyTags.join(":not(.fr-marker),") + ":not(.fr-marker)") && (!(e.querySelectorAll(a.FE.BLOCK_TAGS.join(",")).length > 1) && !e.querySelector(b.opts.htmlDoNotWrapTags.join(":not(.fr-marker),") + ":not(.fr-marker)")))
        }

        function f(a) {
            for (; a && a.parentNode !== b.el && (!a.parentNode || !b.node.hasClass(a.parentNode, "fr-inner"));) if (a = a.parentNode, d(a)) return a;
            return null
        }

        function g(c, e, f) {
            if ("undefined" == typeof e && (e = []), "undefined" == typeof f && (f = !0), e.push(b.el), e.indexOf(c.parentNode) >= 0 || c.parentNode && b.node.hasClass(c.parentNode, "fr-inner") || c.parentNode && a.FE.SIMPLE_ENTER_TAGS.indexOf(c.parentNode.tagName) >= 0 && f) return null;
            for (; e.indexOf(c.parentNode) < 0 && c.parentNode && !b.node.hasClass(c.parentNode, "fr-inner") && (a.FE.SIMPLE_ENTER_TAGS.indexOf(c.parentNode.tagName) < 0 || !f) && (!d(c) || !d(c.parentNode) || !f);) c = c.parentNode;
            return c
        }

        function h(a) {
            var b = {}, c = a.attributes;
            if (c) for (var d = 0; d < c.length; d++) {
                var e = c[d];
                b[e.nodeName] = e.value
            }
            return b
        }

        function i(a) {
            for (var b = "", c = h(a), d = Object.keys(c).sort(), e = 0; e < d.length; e++) {
                var f = d[e], g = c[f];
                b += g.indexOf('"') < 0 ? " " + f + '="' + g + '"' : " " + f + "='" + g + "'"
            }
            return b
        }

        function j(a) {
            for (var b = a.attributes, c = 0; c < b.length; c++) {
                var d = b[c];
                a.removeAttribute(d.nodeName)
            }
        }

        function k(a) {
            return "<" + a.tagName.toLowerCase() + i(a) + ">"
        }

        function l(a) {
            return "</" + a.tagName.toLowerCase() + ">"
        }

        function m(a, c) {
            "undefined" == typeof c && (c = !0);
            for (var d = a.previousSibling; d && c && b.node.hasClass(d, "fr-marker");) d = d.previousSibling;
            return !d || d.nodeType == Node.TEXT_NODE && "" === d.textContent && m(d)
        }

        function n(a, c) {
            "undefined" == typeof c && (c = !0);
            for (var d = a.nextSibling; d && c && b.node.hasClass(d, "fr-marker");) d = d.nextSibling;
            return !d || d.nodeType == Node.TEXT_NODE && "" === d.textContent && n(d)
        }

        function o(b) {
            return b && b.nodeType == Node.ELEMENT_NODE && a.FE.VOID_ELEMENTS.indexOf((b.tagName || "").toLowerCase()) >= 0
        }

        function p(a) {
            return !!a && ["UL", "OL"].indexOf(a.tagName) >= 0
        }

        function q(a) {
            return a === b.el
        }

        function r(a) {
            return a && a.nodeType == Node.ELEMENT_NODE && a.getAttribute("class") && (a.getAttribute("class") || "").indexOf("fr-deletable") >= 0
        }

        function s(a) {
            return a === b.doc.activeElement && (!b.doc.hasFocus || b.doc.hasFocus()) && !!(q(a) || a.type || a.href || ~a.tabIndex)
        }

        function t(a) {
            return (!a.getAttribute || "false" != a.getAttribute("contenteditable")) && ["STYLE", "SCRIPT"].indexOf(a.tagName) < 0
        }

        function u(b, c) {
            return b instanceof a && (b = b.get(0)), b && b.classList && b.classList.contains(c)
        }

        function v(a) {
            return b.browser.msie ? a : {acceptNode: a}
        }

        return {
            isBlock: d,
            isEmpty: e,
            blockParent: f,
            deepestParent: g,
            rawAttributes: h,
            attributes: i,
            clearAttributes: j,
            openTagString: k,
            closeTagString: l,
            isFirstSibling: m,
            isLastSibling: n,
            isList: p,
            isElement: q,
            contents: c,
            isVoid: o,
            hasFocus: s,
            isEditable: t,
            isDeletable: r,
            hasClass: u,
            filter: v
        }
    }, a.FE.INVISIBLE_SPACE = "&#8203;", a.FE.START_MARKER = '<span class="fr-marker" data-id="0" data-type="true" style="display: none; line-height: 0;">' + a.FE.INVISIBLE_SPACE + "</span>", a.FE.END_MARKER = '<span class="fr-marker" data-id="0" data-type="false" style="display: none; line-height: 0;">' + a.FE.INVISIBLE_SPACE + "</span>", a.FE.MARKERS = a.FE.START_MARKER + a.FE.END_MARKER, a.FE.MODULES.markers = function (b) {
        function c(c, d) {
            return a('<span class="fr-marker" data-id="' + d + '" data-type="' + c + '" style="display: ' + (b.browser.safari ? "none" : "inline-block") + '; line-height: 0;">' + a.FE.INVISIBLE_SPACE + "</span>", b.doc)[0]
        }

        function d(d, e, f) {
            try {
                var g = d.cloneRange();
                if (g.collapse(e), g.insertNode(c(e, f)), e === !0 && d.collapsed) for (var h = b.$el.find('span.fr-marker[data-type="true"][data-id="' + f + '"]'), i = h.get(0).nextSibling; i && i.nodeType === Node.TEXT_NODE && 0 === i.textContent.length;) a(i).remove(), i = h.nextSibling;
                if (e === !0 && !d.collapsed) {
                    var h = b.$el.find('span.fr-marker[data-type="true"][data-id="' + f + '"]').get(0),
                        i = h.nextSibling;
                    if (i && i.nodeType === Node.ELEMENT_NODE && b.node.isBlock(i)) {
                        var j = [i];
                        do i = j[0], j = b.node.contents(i); while (j[0] && b.node.isBlock(j[0]));
                        a(i).prepend(a(h))
                    }
                }
                if (e === !1 && !d.collapsed) {
                    var h = b.$el.find('span.fr-marker[data-type="false"][data-id="' + f + '"]').get(0),
                        i = h.previousSibling;
                    if (i && i.nodeType === Node.ELEMENT_NODE && b.node.isBlock(i)) {
                        var j = [i];
                        do i = j[j.length - 1], j = b.node.contents(i); while (j[j.length - 1] && b.node.isBlock(j[j.length - 1]));
                        a(i).append(a(h))
                    }
                    h.parentNode && ["TD", "TH"].indexOf(h.parentNode.tagName) >= 0 && h.parentNode.previousSibling && !h.previousSibling && a(h.parentNode.previousSibling).append(h)
                }
                var k = b.$el.find('span.fr-marker[data-type="' + e + '"][data-id="' + f + '"]').get(0);
                return k && (k.style.display = "none"), k
            } catch (l) {
                return null
            }
        }

        function e() {
            if (!b.$wp) return null;
            try {
                var c = b.selection.ranges(0), d = c.commonAncestorContainer;
                if (d != b.el && 0 == b.$el.find(d).length) return null;
                var e = c.cloneRange(), f = c.cloneRange();
                e.collapse(!0);
                var g = a('<span class="fr-marker" style="display: none; line-height: 0;">' + a.FE.INVISIBLE_SPACE + "</span>", b.doc)[0];
                if (e.insertNode(g), g = b.$el.find("span.fr-marker").get(0)) {
                    for (var h = g.nextSibling; h && h.nodeType === Node.TEXT_NODE && 0 === h.textContent.length;) a(h).remove(), h = b.$el.find("span.fr-marker").get(0).nextSibling;
                    return b.selection.clear(), b.selection.get().addRange(f), g
                }
                return null
            } catch (i) {
            }
        }

        function f() {
            b.selection.isCollapsed() || b.selection.remove();
            var c = b.$el.find(".fr-marker").get(0);
            if (null == c && (c = e()), null == c) return null;
            var d = b.node.deepestParent(c);
            if (d || (d = b.node.blockParent(c), d && "LI" != d.tagName && (d = null)), d) if (b.node.isBlock(d) && b.node.isEmpty(d)) a(d).replaceWith('<span class="fr-marker"></span>'); else if (b.cursor.isAtStart(c, d)) a(d).before('<span class="fr-marker"></span>'), a(c).remove(); else if (b.cursor.isAtEnd(c, d)) a(d).after('<span class="fr-marker"></span>'), a(c).remove(); else {
                var f = c, g = "", h = "";
                do f = f.parentNode, g += b.node.closeTagString(f), h = b.node.openTagString(f) + h; while (f != d);
                a(c).replaceWith('<span id="fr-break"></span>');
                var i = b.node.openTagString(d) + a(d).html() + b.node.closeTagString(d);
                i = i.replace(/<span id="fr-break"><\/span>/g, g + '<span class="fr-marker"></span>' + h), a(d).replaceWith(i)
            }
            return b.$el.find(".fr-marker").get(0)
        }

        function g(a) {
            var c = a.clientX, d = a.clientY;
            h();
            var f, g = null;
            if ("undefined" != typeof b.doc.caretPositionFromPoint ? (f = b.doc.caretPositionFromPoint(c, d), g = b.doc.createRange(), g.setStart(f.offsetNode, f.offset), g.setEnd(f.offsetNode, f.offset)) : "undefined" != typeof b.doc.caretRangeFromPoint && (f = b.doc.caretRangeFromPoint(c, d), g = b.doc.createRange(), g.setStart(f.startContainer, f.startOffset), g.setEnd(f.startContainer, f.startOffset)), null !== g && "undefined" != typeof b.win.getSelection) {
                var i = b.win.getSelection();
                i.removeAllRanges(), i.addRange(g)
            } else if ("undefined" != typeof b.doc.body.createTextRange) try {
                g = b.doc.body.createTextRange(), g.moveToPoint(c, d);
                var j = g.duplicate();
                j.moveToPoint(c, d), g.setEndPoint("EndToEnd", j), g.select()
            } catch (k) {
                return !1
            }
            e()
        }

        function h() {
            b.$el.find(".fr-marker").remove()
        }

        return {place: d, insert: e, split: f, insertAtPoint: g, remove: h}
    }, a.FE.MODULES.selection = function (b) {
        function c() {
            var a = "";
            return b.win.getSelection ? a = b.win.getSelection() : b.doc.getSelection ? a = b.doc.getSelection() : b.doc.selection && (a = b.doc.selection.createRange().text), a.toString()
        }

        function d() {
            var a = "";
            return a = b.win.getSelection ? b.win.getSelection() : b.doc.getSelection ? b.doc.getSelection() : b.doc.selection.createRange()
        }

        function e(a) {
            var c = d(), e = [];
            if (c && c.getRangeAt && c.rangeCount) for (var e = [], f = 0; f < c.rangeCount; f++) e.push(c.getRangeAt(f)); else e = b.doc.createRange ? [b.doc.createRange()] : [];
            return "undefined" != typeof a ? e[a] : e
        }

        function f() {
            var a = d();
            try {
                a.removeAllRanges ? a.removeAllRanges() : a.empty ? a.empty() : a.clear && a.clear()
            } catch (b) {
            }
        }

        function g() {
            var f = d();
            try {
                if (f.rangeCount) {
                    var g = e(0), h = g.startContainer;
                    if (h.nodeType == Node.TEXT_NODE && g.startOffset == (h.textContent || "").length && h.nextSibling && (h = h.nextSibling), h.nodeType == Node.ELEMENT_NODE) {
                        var i = !1;
                        if (h.childNodes.length > 0 && h.childNodes[g.startOffset]) {
                            for (var j = h.childNodes[g.startOffset]; j && j.nodeType == Node.TEXT_NODE && 0 == j.textContent.length;) j = j.nextSibling;
                            if (j && j.textContent.replace(/\u200B/g, "") === c().replace(/\u200B/g, "") && (h = j, i = !0), !i && h.childNodes.length > 1 && g.startOffset > 0 && h.childNodes[g.startOffset - 1]) {
                                for (var j = h.childNodes[g.startOffset - 1]; j && j.nodeType == Node.TEXT_NODE && 0 == j.textContent.length;) j = j.nextSibling;
                                j && j.textContent.replace(/\u200B/g, "") === c().replace(/\u200B/g, "") && (h = j, i = !0)
                            }
                        } else if (!g.collapsed && h.nextSibling && h.nextSibling.nodeType == Node.ELEMENT_NODE) {
                            var j = h.nextSibling;
                            j && j.textContent.replace(/\u200B/g, "") === c().replace(/\u200B/g, "") && (h = j, i = !0)
                        }
                        !i && h.childNodes.length > 0 && a(h.childNodes[0]).text().replace(/\u200B/g, "") === c().replace(/\u200B/g, "") && ["BR", "IMG", "HR"].indexOf(h.childNodes[0].tagName) < 0 && (h = h.childNodes[0])
                    }
                    for (; h.nodeType != Node.ELEMENT_NODE && h.parentNode;) h = h.parentNode;
                    for (var k = h; k && "HTML" != k.tagName;) {
                        if (k == b.el) return h;
                        k = a(k).parent()[0]
                    }
                }
            } catch (l) {
            }
            return b.el
        }

        function h() {
            var f = d();
            try {
                if (f.rangeCount) {
                    var g = e(0), h = g.endContainer;
                    if (h.nodeType == Node.ELEMENT_NODE) {
                        var i = !1;
                        if (h.childNodes.length > 0 && h.childNodes[g.endOffset] && a(h.childNodes[g.endOffset]).text() === c()) h = h.childNodes[g.endOffset], i = !0; else if (!g.collapsed && h.previousSibling && h.previousSibling.nodeType == Node.ELEMENT_NODE) {
                            var j = h.previousSibling;
                            j && j.textContent.replace(/\u200B/g, "") === c().replace(/\u200B/g, "") && (h = j, i = !0)
                        } else if (!g.collapsed && h.childNodes.length > 0 && h.childNodes[g.endOffset]) {
                            var j = h.childNodes[g.endOffset].previousSibling;
                            j.nodeType == Node.ELEMENT_NODE && j && j.textContent.replace(/\u200B/g, "") === c().replace(/\u200B/g, "") && (h = j, i = !0)
                        }
                        !i && h.childNodes.length > 0 && a(h.childNodes[h.childNodes.length - 1]).text() === c() && ["BR", "IMG", "HR"].indexOf(h.childNodes[h.childNodes.length - 1].tagName) < 0 && (h = h.childNodes[h.childNodes.length - 1])
                    }
                    for (h.nodeType == Node.TEXT_NODE && 0 == g.endOffset && h.previousSibling && h.previousSibling.nodeType == Node.ELEMENT_NODE && (h = h.previousSibling); h.nodeType != Node.ELEMENT_NODE && h.parentNode;) h = h.parentNode;
                    for (var k = h; k && "HTML" != k.tagName;) {
                        if (k == b.el) return h;
                        k = a(k).parent()[0]
                    }
                }
            } catch (l) {
            }
            return b.el
        }

        function i(a, b) {
            var c = a;
            return c.nodeType == Node.ELEMENT_NODE && c.childNodes.length > 0 && c.childNodes[b] && (c = c.childNodes[b]), c.nodeType == Node.TEXT_NODE && (c = c.parentNode), c
        }

        function j() {
            var c = [], f = d();
            if (t() && f.rangeCount) for (var g = e(), h = 0; h < g.length; h++) {
                var j = g[h], k = i(j.startContainer, j.startOffset), l = i(j.endContainer, j.endOffset);
                b.node.isBlock(k) && c.indexOf(k) < 0 && c.push(k);
                var m = b.node.blockParent(k);
                m && c.indexOf(m) < 0 && c.push(m);
                for (var n = [], o = k; o !== l && o !== b.el;) n.indexOf(o) < 0 && o.children && o.children.length ? (n.push(o), o = o.children[0]) : o.nextSibling ? o = o.nextSibling : o.parentNode && (o = o.parentNode, n.push(o)), b.node.isBlock(o) && n.indexOf(o) < 0 && c.indexOf(o) < 0 && (o !== l || j.endOffset > 0) && c.push(o);
                b.node.isBlock(l) && c.indexOf(l) < 0 && j.endOffset > 0 && c.push(l);
                var m = b.node.blockParent(l);
                m && c.indexOf(m) < 0 && c.push(m)
            }
            for (var h = c.length - 1; h > 0; h--) a(c[h]).find(c).length && ("LI" != c[h].tagName || 1 == c[h].children.length && c.indexOf(c[h].children[0]) >= 0) && c.splice(h, 1);
            return c
        }

        function k() {
            if (b.$wp) {
                b.markers.remove();
                for (var a = e(), c = [], d = 0; d < a.length; d++) if (a[d].startContainer !== b.doc) {
                    var f = a[d], g = f.collapsed, h = b.markers.place(f, !0, d), i = b.markers.place(f, !1, d);
                    if (b.el.normalize(), b.browser.safari && !g) {
                        var f = b.doc.createRange();
                        f.setStartAfter(h), f.setEndBefore(i), c.push(f)
                    }
                }
                if (b.browser.safari && c.length) {
                    b.selection.clear();
                    for (var d = 0; d < c.length; d++) b.selection.get().addRange(c[d])
                }
            }
        }

        function l() {
            var c = b.el.querySelectorAll('.fr-marker[data-type="true"]');
            if (!b.$wp) return b.markers.remove(), !1;
            if (0 === c.length) return !1;
            if (b.browser.msie || b.browser.edge) for (var e = 0; e < c.length; e++) c[e].style.display = "inline-block";
            b.core.hasFocus() || b.browser.msie || b.browser.webkit || b.$el.focus(), f();
            for (var g = d(), e = 0; e < c.length; e++) {
                var h = a(c[e]).data("id"), i = c[e], j = b.doc.createRange(),
                    k = b.$el.find('.fr-marker[data-type="false"][data-id="' + h + '"]');
                (b.browser.msie || b.browser.edge) && k.css("display", "inline-block");
                var l = null;
                if (k.length > 0) {
                    k = k[0];
                    try {
                        for (var n = !1, o = i.nextSibling; o && o.nodeType == Node.TEXT_NODE && 0 == o.textContent.length;) {
                            var p = o;
                            o = o.nextSibling, a(p).remove()
                        }
                        for (var q = k.nextSibling; q && q.nodeType == Node.TEXT_NODE && 0 == q.textContent.length;) {
                            var p = q;
                            q = q.nextSibling, a(p).remove()
                        }
                        if (i.nextSibling == k || k.nextSibling == i) {
                            for (var r = i.nextSibling == k ? i : k, s = r == i ? k : i, t = r.previousSibling; t && t.nodeType == Node.TEXT_NODE && 0 == t.length;) {
                                var p = t;
                                t = t.previousSibling, a(p).remove()
                            }
                            if (t && t.nodeType == Node.TEXT_NODE) for (; t && t.previousSibling && t.previousSibling.nodeType == Node.TEXT_NODE;) t.previousSibling.textContent = t.previousSibling.textContent + t.textContent, t = t.previousSibling, a(t.nextSibling).remove();
                            for (var u = s.nextSibling; u && u.nodeType == Node.TEXT_NODE && 0 == u.length;) {
                                var p = u;
                                u = u.nextSibling, a(p).remove()
                            }
                            if (u && u.nodeType == Node.TEXT_NODE) for (; u && u.nextSibling && u.nextSibling.nodeType == Node.TEXT_NODE;) u.nextSibling.textContent = u.textContent + u.nextSibling.textContent, u = u.nextSibling, a(u.previousSibling).remove();
                            if (t && (b.node.isVoid(t) || b.node.isBlock(t)) && (t = null), u && (b.node.isVoid(u) || b.node.isBlock(u)) && (u = null), t && u && t.nodeType == Node.TEXT_NODE && u.nodeType == Node.TEXT_NODE) {
                                a(i).remove(), a(k).remove();
                                var v = t.textContent.length;
                                t.textContent = t.textContent + u.textContent, a(u).remove(), b.spaces.normalize(t), j.setStart(t, v), j.setEnd(t, v), n = !0
                            } else !t && u && u.nodeType == Node.TEXT_NODE ? (a(i).remove(), a(k).remove(), b.spaces.normalize(u), l = a(b.doc.createTextNode("\u200b")), a(u).before(l), j.setStart(u, 0), j.setEnd(u, 0), n = !0) : !u && t && t.nodeType == Node.TEXT_NODE && (a(i).remove(), a(k).remove(), b.spaces.normalize(t), l = a(b.doc.createTextNode("\u200b")), a(t).after(l), j.setStart(t, t.textContent.length), j.setEnd(t, t.textContent.length), n = !0)
                        }
                        if (!n) {
                            var w, x;
                            if ((b.browser.chrome || b.browser.edge) && i.nextSibling == k) w = m(k, j, !0) || j.setStartAfter(k), x = m(i, j, !1) || j.setEndBefore(i); else {
                                i.previousSibling == k && (i = k, k = i.nextSibling), k.nextSibling && "BR" === k.nextSibling.tagName || !k.nextSibling && b.node.isBlock(i.previousSibling) || i.previousSibling && "BR" == i.previousSibling.tagName || (i.style.display = "inline", k.style.display = "inline", l = a(b.doc.createTextNode("\u200b")));
                                var y = i.previousSibling;
                                y && y.style && "block" == b.win.getComputedStyle(y).display && !b.opts.enter == a.FE.ENTER_BR ? (j.setEndAfter(y), j.setStartAfter(y)) : (w = m(i, j, !0) || a(i).before(l) && j.setStartBefore(i), x = m(k, j, !1) || a(k).after(l) && j.setEndAfter(k))
                            }
                            "function" == typeof w && w(), "function" == typeof x && x()
                        }
                    } catch (z) {
                    }
                }
                l && l.remove();
                try {
                    g.addRange(j)
                } catch (z) {
                }
            }
            b.markers.remove()
        }

        function m(c, d, e) {
            var f = c.previousSibling, g = c.nextSibling;
            if (f && g && f.nodeType == Node.TEXT_NODE && g.nodeType == Node.TEXT_NODE) {
                var h = f.textContent.length;
                return e ? (g.textContent = f.textContent + g.textContent, a(f).remove(), a(c).remove(), b.spaces.normalize(g), function () {
                    d.setStart(g, h)
                }) : (f.textContent = f.textContent + g.textContent, a(g).remove(), a(c).remove(), b.spaces.normalize(f), function () {
                    d.setEnd(f, h)
                })
            }
            if (f && !g && f.nodeType == Node.TEXT_NODE) {
                var h = f.textContent.length;
                return e ? (b.spaces.normalize(f), function () {
                    d.setStart(f, h)
                }) : (b.spaces.normalize(f), function () {
                    d.setEnd(f, h)
                })
            }
            return !(!g || f || g.nodeType != Node.TEXT_NODE) && (e ? (b.spaces.normalize(g), function () {
                d.setStart(g, 0)
            }) : (b.spaces.normalize(g), function () {
                d.setEnd(g, 0)
            }))
        }

        function n() {
            return !0
        }

        function o() {
            for (var a = e(), b = 0; b < a.length; b++) if (!a[b].collapsed) return !1;
            return !0
        }

        function p(a) {
            var c, d, e = !1, f = !1;
            if (b.win.getSelection) {
                var g = b.win.getSelection();
                g.rangeCount && (c = g.getRangeAt(0), d = c.cloneRange(), d.selectNodeContents(a), d.setEnd(c.startContainer, c.startOffset), e = "" === d.toString(), d.selectNodeContents(a), d.setStart(c.endContainer, c.endOffset), f = "" === d.toString())
            } else b.doc.selection && "Control" != b.doc.selection.type && (c = b.doc.selection.createRange(), d = c.duplicate(), d.moveToElementText(a), d.setEndPoint("EndToStart", c), e = "" === d.text, d.moveToElementText(a), d.setEndPoint("StartToEnd", c), f = "" === d.text);
            return {atStart: e, atEnd: f}
        }

        function q() {
            if (o()) return !1;
            b.$el.find("td, th, img").prepend('<span class="fr-mk">' + a.FE.INVISIBLE_SPACE + "</span>");
            var c = !1, d = p(b.el);
            return d.atStart && d.atEnd && (c = !0), b.$el.find(".fr-mk").remove(), c
        }

        function r(c, d) {
            "undefined" == typeof d && (d = !0);
            var e = a(c).html();
            e && e.replace(/\u200b/g, "").length != e.length && a(c).html(e.replace(/\u200b/g, ""));
            for (var f = b.node.contents(c), g = 0; g < f.length; g++) f[g].nodeType != Node.ELEMENT_NODE ? a(f[g]).remove() : (r(f[g], 0 == g), 0 == g && (d = !1));
            c.nodeType == Node.TEXT_NODE ? a(c).replaceWith('<span data-first="true" data-text="true"></span>') : d && a(c).attr("data-first", !0)
        }

        function s(c, d) {
            var e = b.node.contents(c.get(0));
            ["TD", "TH"].indexOf(c.get(0).tagName) >= 0 && 1 == c.find(".fr-marker").length && b.node.hasClass(e[0], "fr-marker") && c.attr("data-del-cell", !0);
            for (var f = 0; f < e.length; f++) {
                var g = e[f];
                b.node.hasClass(g, "fr-marker") ? d = (d + 1) % 2 : d ? a(g).find(".fr-marker").length > 0 ? d = s(a(g), d) : ["TD", "TH"].indexOf(g.tagName) < 0 && !b.node.hasClass(g, "fr-inner") ? !b.opts.keepFormatOnDelete || b.$el.find("[data-first]").length > 0 ? a(g).remove() : r(g) : b.node.hasClass(g, "fr-inner") ? 0 == a(g).find(".fr-inner").length ? a(g).html("<br>") : a(g).find(".fr-inner").filter(function () {
                    return 0 == a(this).find("fr-inner").length
                }).html("<br>") : (a(g).empty(), a(g).attr("data-del-cell", !0)) : a(g).find(".fr-marker").length > 0 && (d = s(a(g), d))
            }
            return d
        }

        function t() {
            try {
                if (!b.$wp) return !1;
                for (var a = e(0), c = a.commonAncestorContainer; c && !b.node.isElement(c);) c = c.parentNode;
                return !!b.node.isElement(c)
            } catch (d) {
                return !1
            }
        }

        function u() {
            if (o()) return !0;
            k();
            for (var c = function (b) {
                for (var c = b.previousSibling; c && c.nodeType == Node.TEXT_NODE && 0 == c.textContent.length;) {
                    var d = c, c = c.previousSibling;
                    a(d).remove()
                }
                return c
            }, d = function (b) {
                for (var c = b.nextSibling; c && c.nodeType == Node.TEXT_NODE && 0 == c.textContent.length;) {
                    var d = c, c = c.nextSibling;
                    a(d).remove()
                }
                return c
            }, e = b.$el.find('.fr-marker[data-type="true"]'), f = 0; f < e.length; f++) for (var g = e[f]; !c(g) && !b.node.isBlock(g.parentNode) && !b.$el.is(g.parentNode);) a(g.parentNode).before(g);
            for (var h = b.$el.find('.fr-marker[data-type="false"]'), f = 0; f < h.length; f++) {
                for (var i = h[f]; !d(i) && !b.node.isBlock(i.parentNode) && !b.$el.is(i.parentNode);) a(i.parentNode).after(i);
                i.parentNode && b.node.isBlock(i.parentNode) && b.node.isEmpty(i.parentNode) && !b.$el.is(i.parentNode) && b.opts.keepFormatOnDelete && a(i.parentNode).after(i)
            }
            if (n()) {
                s(b.$el, 0);
                var j = b.$el.find('[data-first="true"]');
                if (j.length) b.$el.find(".fr-marker").remove(), j.append(a.FE.INVISIBLE_SPACE + a.FE.MARKERS).removeAttr("data-first"), j.attr("data-text") && j.replaceWith(j.html()); else {
                    b.$el.find("table").filter(function () {
                        var b = a(this).find("[data-del-cell]").length > 0 && a(this).find("[data-del-cell]").length == a(this).find("td, th").length;
                        return b
                    }).remove(), b.$el.find("[data-del-cell]").removeAttr("data-del-cell");
                    for (var e = b.$el.find('.fr-marker[data-type="true"]'), f = 0; f < e.length; f++) {
                        var m = e[f], p = m.nextSibling,
                            q = b.$el.find('.fr-marker[data-type="false"][data-id="' + a(m).data("id") + '"]').get(0);
                        if (q) {
                            if (p && p == q) ; else if (m) {
                                var r = b.node.blockParent(m), t = b.node.blockParent(q), u = !1, v = !1;
                                if (r && ["UL", "OL"].indexOf(r.tagName) >= 0 && (r = null, u = !0), t && ["UL", "OL"].indexOf(t.tagName) >= 0 && (t = null, v = !0), a(m).after(q), r == t) ; else if (null != r || u) if (null != t || v || 0 != a(r).parentsUntil(b.$el, "table").length) r && t && 0 == a(r).parentsUntil(b.$el, "table").length && 0 == a(t).parentsUntil(b.$el, "table").length && (a(r).append(a(t).html()), a(t).remove()); else {
                                    for (var p = r; !p.nextSibling && p.parentNode != b.el;) p = p.parentNode;
                                    for (p = p.nextSibling; p && "BR" != p.tagName;) {
                                        var w = p.nextSibling;
                                        a(r).append(p), p = w
                                    }
                                    p && "BR" == p.tagName && a(p).remove()
                                } else {
                                    var x = b.node.deepestParent(m);
                                    x ? (a(x).after(a(t).html()), a(t).remove()) : 0 == a(t).parentsUntil(b.$el, "table").length && (a(m).next().after(a(t).html()), a(t).remove())
                                }
                            }
                        } else q = a(m).clone().attr("data-type", !1), a(m).after(q)
                    }
                }
            }
            b.opts.keepFormatOnDelete || b.html.fillEmptyBlocks(), b.html.cleanEmptyTags(!0), b.clean.lists(), b.spaces.normalize();
            var y = b.$el.find(".fr-marker:last").get(0), z = b.$el.find(".fr-marker:first").get(0);
            !y.nextSibling && z.previousSibling && "BR" == z.previousSibling.tagName && b.node.isElement(y.parentNode) && b.node.isElement(z.parentNode) && b.$el.append("<br>"), l()
        }

        function v(c) {
            if (!c || c.getElementsByClassName("fr-marker").length > 0) return !1;
            for (var d = c.firstChild; d && b.node.isBlock(d);) c = d, d = d.firstChild;
            c.innerHTML = a.FE.MARKERS + c.innerHTML
        }

        function w(c) {
            if (!c || c.getElementsByClassName("fr-marker").length > 0) return !1;
            for (var d = c.lastChild; d && b.node.isBlock(d);) c = d, d = d.lastChild;
            c.innerHTML = c.innerHTML + a.FE.MARKERS
        }

        function x(c, d) {
            "undefined" == typeof d && (d = !0);
            for (var e = c.previousSibling; e && e.nodeType == Node.TEXT_NODE && 0 == e.textContent.length;) e = e.previousSibling;
            return e ? (b.node.isBlock(e) ? w(e) : "BR" == e.tagName ? a(e).before(a.FE.MARKERS) : a(e).after(a.FE.MARKERS), !0) : !!d && (b.node.isBlock(c) ? v(c) : a(c).before(a.FE.MARKERS), !0)
        }

        function y(c, d) {
            "undefined" == typeof d && (d = !0);
            for (var e = c.nextSibling; e && e.nodeType == Node.TEXT_NODE && 0 == e.textContent.length;) e = e.nextSibling;
            return e ? (b.node.isBlock(e) ? v(e) : a(e).before(a.FE.MARKERS), !0) : !!d && (b.node.isBlock(c) ? w(c) : a(c).after(a.FE.MARKERS), !0)
        }

        return {
            text: c,
            get: d,
            ranges: e,
            clear: f,
            element: g,
            endElement: h,
            save: k,
            restore: l,
            isCollapsed: o,
            isFull: q,
            inEditor: t,
            remove: u,
            blocks: j,
            info: p,
            setAtEnd: w,
            setAtStart: v,
            setBefore: x,
            setAfter: y,
            rangeElement: i
        }
    }, a.extend(a.FE.DEFAULTS, {
        htmlAllowedTags: ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "pre", "progress", "queue", "rp", "rt", "ruby", "s", "samp", "script", "style", "section", "select", "small", "source", "span", "strike", "strong", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "u", "ul", "var", "video", "wbr", "html", "head"],
        htmlRemoveTags: [],
        htmlAllowedAttrs: ["accept", "accept-charset", "accesskey", "action", "align", "allowfullscreen", "allowtransparency", "alt", "async", "autocomplete", "autofocus", "autoplay", "autosave", "background", "bgcolor", "border", "charset", "cellpadding", "cellspacing", "checked", "cite", "class", "color", "cols", "colspan", "content", "contenteditable", "contextmenu", "controls", "coords", "data", "data-.*", "datetime", "default", "defer", "dir", "dirname", "disabled", "download", "draggable", "dropzone", "enctype", "for", "form", "formaction", "frameborder", "headers", "height", "hidden", "high", "href", "hreflang", "http-equiv", "icon", "id", "ismap", "itemprop", "keytype", "kind", "label", "lang", "language", "list", "loop", "low", "max", "maxlength", "media", "method", "min", "mozallowfullscreen", "multiple", "name", "novalidate", "open", "optimum", "pattern", "ping", "placeholder", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "reversed", "rows", "rowspan", "sandbox", "scope", "scoped", "scrolling", "seamless", "selected", "shape", "size", "sizes", "span", "src", "srcdoc", "srclang", "srcset", "start", "step", "summary", "spellcheck", "style", "tabindex", "target", "title", "type", "translate", "usemap", "value", "valign", "webkitallowfullscreen", "width", "wrap"],
        htmlAllowComments: !0,
        htmlUntouched: !1,
        fullPage: 1
    }), a.FE.HTML5Map = {B: "STRONG", I: "EM", STRIKE: "S"}, a.FE.MODULES.clean = function (b) {
        function c(a) {
            if (a.nodeType == Node.ELEMENT_NODE && a.getAttribute("class") && a.getAttribute("class").indexOf("fr-marker") >= 0) return !1;
            var d, e = b.node.contents(a), f = [];
            for (d = 0; d < e.length; d++) e[d].nodeType != Node.ELEMENT_NODE || b.node.isVoid(e[d]) ? e[d].nodeType == Node.TEXT_NODE && (e[d].textContent = e[d].textContent.replace(/\u200b/g, "").replace(/&/g, "&amp;")) : e[d].textContent.replace(/\u200b/g, "").length != e[d].textContent.length && c(e[d]);
            if (a.nodeType == Node.ELEMENT_NODE && !b.node.isVoid(a) && (a.normalize(), e = b.node.contents(a), f = a.querySelectorAll(".fr-marker"), e.length - f.length == 0)) {
                for (d = 0; d < e.length; d++) if ((e[d].getAttribute("class") || "").indexOf("fr-marker") < 0) return !1;
                for (d = 0; d < f.length; d++) a.parentNode.insertBefore(f[d].cloneNode(!0), a);
                return a.parentNode.removeChild(a), !1
            }
        }

        function d(a) {
            if (a.nodeType == Node.COMMENT_NODE) return "<!--" + a.nodeValue + "-->";
            if (a.nodeType == Node.TEXT_NODE) return a.textContent.replace(/\&/g, "&amp;").replace(/\</g, "&lt;").replace(/\>/g, "&gt;").replace(/\u00A0/g, "&nbsp;");
            if (a.nodeType != Node.ELEMENT_NODE) return a.outerHTML;
            if (a.nodeType == Node.ELEMENT_NODE && ["STYLE", "SCRIPT"].indexOf(a.tagName) >= 0) return a.outerHTML;
            if (a.nodeType == Node.ELEMENT_NODE && "svg" == a.tagName) {
                var c = document.createElement("div"), e = a.cloneNode(!0);
                return c.appendChild(e), c.innerHTML
            }
            if ("IFRAME" == a.tagName) return a.outerHTML;
            var f = a.childNodes;
            if (0 === f.length) return a.outerHTML;
            for (var g = "", h = 0; h < f.length; h++) g += d(f[h]);
            return b.node.openTagString(a) + g + b.node.closeTagString(a)
        }

        function e(a) {
            return H = [], a = a.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, function (a) {
                return H.push(a), "[FROALA.EDITOR.SCRIPT " + (H.length - 1) + "]"
            }), a = a.replace(/<img((?:[\w\W]*?)) src="/g, '<img$1 data-fr-src="')
        }

        function f(a) {
            return a = a.replace(/\[FROALA\.EDITOR\.SCRIPT ([\d]*)\]/gi, function (a, c) {
                return b.opts.htmlRemoveTags.indexOf("script") >= 0 ? "" : H[parseInt(c, 10)]
            }), a = a.replace(/<img((?:[\w\W]*?)) data-fr-src="/g, '<img$1 src="')
        }

        function g(a) {
            var b;
            for (b in a) a.hasOwnProperty(b) && (b.match(G) || delete a[b]);
            for (var c = "", d = Object.keys(a).sort(), e = 0; e < d.length; e++) b = d[e], c += a[b].indexOf('"') < 0 ? " " + b + '="' + a[b] + '"' : " " + b + "='" + a[b] + "'";
            return c
        }

        function h(a, c, d) {
            if (b.opts.fullPage) {
                var e = b.html.extractDoctype(d), f = g(b.html.extractNodeAttrs(d, "html"));
                c = null == c ? b.html.extractNode(d, "head") || "" : c;
                var h = g(b.html.extractNodeAttrs(d, "head")), i = g(b.html.extractNodeAttrs(d, "body"));
                return e + "<html" + f + "><head" + h + ">" + c + "</head><body" + i + ">" + a + "</body></html>"
            }
            return a
        }

        function i(c, e) {
            var f = a("<div>" + c + "</div>"), g = "";
            if (f) {
                for (var h = b.node.contents(f.get(0)), i = 0; i < h.length; i++) e(h[i]);
                h = b.node.contents(f.get(0));
                for (var i = 0; i < h.length; i++) g += d(h[i])
            }
            return g
        }

        function j(a, c, d) {
            a = e(a);
            var g = a, j = null;
            if (b.opts.fullPage) {
                var g = b.html.extractNode(a, "body") || (a.indexOf("<body") >= 0 ? "" : a);
                d && (j = b.html.extractNode(a, "head") || "")
            }
            g = i(g, c), j && (j = i(j, c));
            var k = h(g, j, a);
            return f(k)
        }

        function k(a) {
            return a.replace(/\u200b/g, "").length == a.length ? a : b.clean.exec(a, c)
        }

        function l() {
            var c = b.el.querySelectorAll(Object.keys(a.FE.HTML5Map).join(","));
            if (c.length) {
                var d = !1;
                b.el.querySelector(".fr-marker") || (b.selection.save(), d = !0);
                for (var e = 0; e < c.length; e++) "" === b.node.attributes(c[e]) && a(c[e]).replaceWith("<" + a.FE.HTML5Map[c[e].tagName] + ">" + c[e].innerHTML + "</" + a.FE.HTML5Map[c[e].tagName] + ">");
                d && b.selection.restore()
            }
        }

        function m(c) {
            if ("SPAN" == c.tagName && (c.getAttribute("class") || "").indexOf("fr-marker") >= 0) return !1;
            if ("PRE" == c.tagName && o(c), c.nodeType == Node.ELEMENT_NODE && (c.getAttribute("data-fr-src") && c.setAttribute("data-fr-src", b.helpers.sanitizeURL(c.getAttribute("data-fr-src"))), c.getAttribute("href") && c.setAttribute("href", b.helpers.sanitizeURL(c.getAttribute("href"))), ["TABLE", "TBODY", "TFOOT", "TR"].indexOf(c.tagName) >= 0 && (c.innerHTML = c.innerHTML.trim())), !b.opts.pasteAllowLocalImages && c.nodeType == Node.ELEMENT_NODE && "IMG" == c.tagName && c.getAttribute("data-fr-src") && 0 == c.getAttribute("data-fr-src").indexOf("file://")) return c.parentNode.removeChild(c), !1;
            if (c.nodeType == Node.ELEMENT_NODE && a.FE.HTML5Map[c.tagName] && "" === b.node.attributes(c)) {
                var d = a.FE.HTML5Map[c.tagName], e = "<" + d + ">" + c.innerHTML + "</" + d + ">";
                c.insertAdjacentHTML("beforebegin", e), c = c.previousSibling, c.parentNode.removeChild(c.nextSibling)
            }
            if (b.opts.htmlAllowComments || c.nodeType != Node.COMMENT_NODE) if (c.tagName && c.tagName.match(F)) c.parentNode.removeChild(c); else if (c.tagName && !c.tagName.match(E)) c.outerHTML = c.innerHTML; else {
                var f = c.attributes;
                if (f) for (var g = f.length - 1; g >= 0; g--) {
                    var h = f[g];
                    h.nodeName.match(G) || c.removeAttribute(h.nodeName)
                }
            } else 0 !== c.data.indexOf("[FROALA.EDITOR") && c.parentNode.removeChild(c)
        }

        function n(a) {
            for (var c = b.node.contents(a), d = 0; d < c.length; d++) c[d].nodeType != Node.TEXT_NODE && n(c[d]);
            m(a)
        }

        function o(a) {
            var b = a.innerHTML;
            b.indexOf("\n") >= 0 && (a.innerHTML = b.replace(/\n/g, "<br>"))
        }

        function p(c, d, e, f) {
            "undefined" == typeof d && (d = []), "undefined" == typeof e && (e = []), "undefined" == typeof f && (f = !1), c = c.replace(/\u0009/g, ""), c = c.replace(/<br> */g, "<br>");
            var g, h = a.merge([], b.opts.htmlAllowedTags);
            for (g = 0; g < d.length; g++) h.indexOf(d[g]) >= 0 && h.splice(h.indexOf(d[g]), 1);
            var i = a.merge([], b.opts.htmlAllowedAttrs);
            for (g = 0; g < e.length; g++) i.indexOf(e[g]) >= 0 && i.splice(i.indexOf(e[g]), 1);
            return i.push("data-fr-.*"), i.push("fr-.*"), E = new RegExp("^" + h.join("$|^") + "$", "gi"), G = new RegExp("^" + i.join("$|^") + "$", "gi"), F = new RegExp("^" + b.opts.htmlRemoveTags.join("$|^") + "$", "gi"), c = j(c, n, !0)
        }

        function q() {
            for (var c = b.el.querySelectorAll("blockquote + blockquote"), d = 0; d < c.length; d++) {
                var e = c[d];
                b.node.attributes(e) == b.node.attributes(e.previousSibling) && (a(e).prev().append(a(e).html()), a(e).remove())
            }
        }

        function r() {
            for (var a = b.el.querySelectorAll("tr"), c = 0; c < a.length; c++) {
                for (var d = a[c].children, e = !0, f = 0; f < d.length; f++) if ("TH" != d[f].tagName) {
                    e = !1;
                    break
                }
                if (0 != e && 0 != d.length) {
                    for (var g = a[c]; g && "TABLE" != g.tagName && "THEAD" != g.tagName;) g = g.parentNode;
                    var h = g;
                    "THEAD" != h.tagName && (h = b.doc.createElement("THEAD"), g.insertBefore(h, g.firstChild)), h.appendChild(a[c])
                }
            }
        }

        function s() {
            var c = b.html.defaultTag();
            if (c) for (var d = b.el.querySelectorAll("td > " + c + ", th > " + c), e = 0; e < d.length; e++) "" === b.node.attributes(d[e]) && a(d[e]).replaceWith(d[e].innerHTML + "<br>")
        }

        function t() {
            r(), s()
        }

        function u() {
            var a = [], c = function (a) {
                return !b.node.isList(a.parentNode)
            };
            do {
                if (a.length) {
                    var d = a[0], e = b.doc.createElement("ul");
                    d.parentNode.insertBefore(e, d);
                    do {
                        var f = d;
                        d = d.nextSibling, e.appendChild(f)
                    } while (d && "LI" == d.tagName)
                }
                a = [];
                for (var g = b.el.querySelectorAll("li"), h = 0; h < g.length; h++) c(g[h]) && a.push(g[h])
            } while (a.length > 0)
        }

        function v() {
            for (var a = b.el.querySelectorAll("ol + ol, ul + ul"), c = 0; c < a.length; c++) {
                var d = a[c];
                if (b.node.isList(d.previousSibling) && b.node.openTagString(d) == b.node.openTagString(d.previousSibling)) {
                    for (var e = b.node.contents(d), f = 0; f < e.length; f++) d.previousSibling.appendChild(e[f]);
                    d.parentNode.removeChild(d)
                }
            }
        }

        function w() {
            var a, c = function (b) {
                b.querySelector("LI") || (a = !0, b.parentNode.removeChild(b))
            };
            do {
                a = !1;
                for (var d = b.el.querySelectorAll("li:empty"), e = 0; e < d.length; e++) d[e].parentNode.removeChild(d[e]);
                for (var f = b.el.querySelectorAll("ul, ol"), e = 0; e < f.length; e++) c(f[e])
            } while (a === !0)
        }

        function x() {
            for (var c = b.el.querySelectorAll("ul > ul, ol > ol, ul > ol, ol > ul"), d = 0; d < c.length; d++) {
                var e = c[d], f = e.previousSibling;
                f && ("LI" == f.tagName ? f.appendChild(e) : a(e).wrap("<li></li>"))
            }
        }

        function y() {
            for (var c = b.el.querySelectorAll("li > ul, li > ol"), d = 0; d < c.length; d++) {
                var e = c[d];
                if (e.nextSibling) {
                    var f = e.nextSibling, g = a("<li>");
                    a(e.parentNode).after(g);
                    do {
                        var h = f;
                        f = f.nextSibling, g.append(h)
                    } while (f)
                }
            }
        }

        function z() {
            for (var c = b.el.querySelectorAll("li > ul, li > ol"), d = 0; d < c.length; d++) {
                var e = c[d];
                if (b.node.isFirstSibling(e)) a(e).before("<br/>"); else if (e.previousSibling && "BR" == e.previousSibling.tagName) {
                    for (var f = e.previousSibling.previousSibling; f && b.node.hasClass(f, "fr-marker");) f = f.previousSibling;
                    f && "BR" != f.tagName && a(e.previousSibling).remove()
                }
            }
        }

        function A() {
            for (var c = b.el.querySelectorAll("li:empty"), d = 0; d < c.length; d++) a(c[d]).remove()
        }

        function B() {
            for (var c = b.el.querySelectorAll("ul, ol"), d = 0; d < c.length; d++) for (var e = b.node.contents(c[d]), f = null, g = e.length - 1; g >= 0; g--) "LI" != e[g].tagName ? (f || (f = a("<li>"), f.insertBefore(e[g])), f.prepend(e[g])) : f = null
        }

        function C() {
            u(), v(), w(), x(), y(), z(), B(), A()
        }

        function D() {
            b.opts.fullPage && a.merge(b.opts.htmlAllowedTags, ["head", "title", "style", "link", "base", "body", "html", "meta"])
        }

        var E, F, G, H = [], H = [];
        return {_init: D, html: p, toHTML5: l, tables: t, lists: C, quotes: q, invisibleSpaces: k, exec: j}
    }, a.FE.MODULES.spaces = function (b) {
        function c(c, d) {
            var e = c.previousSibling, f = c.nextSibling, g = c.textContent, h = c.parentNode;
            d && (g = g.replace(/[\f\n\r\t\v ]{2,}/g, " "), f && "BR" !== f.tagName && !b.node.isBlock(f) || !b.node.isBlock(h) || (g = g.replace(/[\f\n\r\t\v ]{1,}$/g, "")), e && "BR" !== e.tagName && !b.node.isBlock(e) || !b.node.isBlock(h) || (g = g.replace(/^[\f\n\r\t\v ]{1,}/g, ""))), g = g.replace(new RegExp(a.FE.UNICODE_NBSP, "g"), " ");
            for (var i = "", j = 0; j < g.length; j++) i += 32 != g.charCodeAt(j) || 0 !== j && 32 != i.charCodeAt(j - 1) ? g[j] : a.FE.UNICODE_NBSP;
            (!f || b.node.isBlock(f) || f.nodeType == Node.ELEMENT_NODE && b.win.getComputedStyle(f) && "block" == b.win.getComputedStyle(f).display) && (i = i.replace(/ $/, a.FE.UNICODE_NBSP)), !e || b.node.isVoid(e) || b.node.isBlock(e) || (i = i.replace(/^\u00A0([^ $])/, " $1"), 1 !== i.length || 160 !== i.charCodeAt(0) || !f || b.node.isVoid(f) || b.node.isBlock(f) || (i = " ")), i = i.replace(/([^ \u00A0])\u00A0([^ \u00A0])/g, "$1 $2"), c.textContent != i && (c.textContent = i)
        }

        function d(a, d) {
            if ("undefined" != typeof a && a || (a = b.el), "undefined" == typeof d && (d = !1), !a.getAttribute || "false" != a.getAttribute("contenteditable")) if (a.nodeType == Node.TEXT_NODE) c(a, d); else if (a.nodeType == Node.ELEMENT_NODE) for (var e = b.doc.createTreeWalker(a, NodeFilter.SHOW_TEXT, b.node.filter(function (a) {
                return null != a.textContent.match(/([ \u00A0\f\n\r\t\v]{2,})|(^[ \u00A0\f\n\r\t\v]{1,})|([ \u00A0\f\n\r\t\v]{1,}$)/g) && !b.node.hasClass(a.parentNode, "fr-marker")
            }), !1); e.nextNode();) c(e.currentNode, d)
        }

        function e() {
            for (var a = [], c = b.el.querySelectorAll(".fr-marker"), e = 0; e < c.length; e++) {
                var f = null, g = b.node.blockParent(c[e]);
                f = g ? g : c[e];
                for (var h = f.nextSibling, i = f.previousSibling; h && "BR" == h.tagName;) h = h.nextSibling;
                for (; i && "BR" == i.tagName;) i = i.previousSibling;
                f && a.indexOf(f) < 0 && a.push(f), i && a.indexOf(i) < 0 && a.push(i), h && a.indexOf(h) < 0 && a.push(h)
            }
            for (var j = 0; j < a.length; j++) d(a[j])
        }

        return {normalize: d, normalizeAroundCursor: e}
    }, a.FE.UNICODE_NBSP = String.fromCharCode(160), a.FE.VOID_ELEMENTS = ["area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr"], a.FE.BLOCK_TAGS = ["address", "article", "aside", "audio", "blockquote", "canvas", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "li", "main", "nav", "noscript", "ol", "output", "p", "pre", "section", "table", "tbody", "td", "tfoot", "th", "thead", "tr", "ul", "video"], a.extend(a.FE.DEFAULTS, {
        htmlAllowedEmptyTags: ["textarea", "a", "iframe", "object", "video", "style", "script", ".fa", ".fr-emoticon"],
        htmlDoNotWrapTags: ["script", "style"],
        htmlSimpleAmpersand: !1,
        htmlIgnoreCSSProperties: []
    }), a.FE.MODULES.html = function (b) {
        function c() {
            return b.opts.enter == a.FE.ENTER_P ? "p" : b.opts.enter == a.FE.ENTER_DIV ? "div" : b.opts.enter == a.FE.ENTER_BR ? null : void 0
        }

        function d(c) {
            var d = [], e = [];
            if (c) for (var g = b.el.querySelectorAll(".fr-marker"), h = 0; h < g.length; h++) {
                var i = b.node.blockParent(g[h]) || g[h];
                if (i) {
                    var j = i.nextSibling, k = i.previousSibling;
                    i && e.indexOf(i) < 0 && b.node.isBlock(i) && e.push(i), k && b.node.isBlock(k) && e.indexOf(k) < 0 && e.push(k), j && b.node.isBlock(j) && e.indexOf(j) < 0 && e.push(j)
                }
            } else e = b.el.querySelectorAll(f());
            var l = f();
            l += "," + a.FE.VOID_ELEMENTS.join(","), l += "," + b.opts.htmlAllowedEmptyTags.join(":not(.fr-marker),") + ":not(.fr-marker)";
            for (var h = e.length - 1; h >= 0; h--) if (!(e[h].textContent && e[h].textContent.replace(/\u200B|\n/g, "").length > 0 || e[h].querySelectorAll(l).length > 0)) {
                for (var m = b.node.contents(e[h]), n = !1, o = 0; o < m.length; o++) if (m[o].nodeType != Node.COMMENT_NODE && m[o].textContent && m[o].textContent.replace(/\u200B|\n/g, "").length > 0) {
                    n = !0;
                    break
                }
                n || d.push(e[h])
            }
            return d
        }

        function e() {
            return a.FE.BLOCK_TAGS.join(":empty, ") + ":empty"
        }

        function f() {
            return a.FE.BLOCK_TAGS.join(", ")
        }

        function g(c) {
            var d = a.merge([], a.FE.VOID_ELEMENTS);
            d = a.merge(d, b.opts.htmlAllowedEmptyTags), "undefined" == typeof c && (d = a.merge(d, a.FE.BLOCK_TAGS));
            var e, f;
            e = b.el.querySelectorAll("*:empty:not(" + d.join("):not(") + "):not(.fr-marker)");
            do {
                f = !1;
                for (var g = 0; g < e.length; g++) 0 !== e[g].attributes.length && "undefined" == typeof e[g].getAttribute("href") || (e[g].parentNode.removeChild(e[g]), f = !0);
                e = b.el.querySelectorAll("*:empty:not(" + d.join("):not(") + "):not(.fr-marker)")
            } while (e.length && f)
        }

        function h(a, d) {
            var e = c();
            if (d && (e = "div"), e) {
                for (var f = b.doc.createDocumentFragment(), g = null, h = !1, i = a.firstChild; i;) {
                    var j = i.nextSibling;
                    if (i.nodeType == Node.ELEMENT_NODE && (b.node.isBlock(i) || b.opts.htmlDoNotWrapTags.indexOf(i.tagName.toLowerCase()) >= 0 && !b.node.hasClass(i, "fr-marker"))) g = null, f.appendChild(i); else if (i.nodeType != Node.ELEMENT_NODE && i.nodeType != Node.TEXT_NODE) g = null, f.appendChild(i); else if ("BR" == i.tagName) null == g ? (g = b.doc.createElement(e), d && g.setAttribute("data-empty", !0), g.appendChild(i), f.appendChild(g)) : h === !1 && (g.appendChild(b.doc.createElement("br")), g.setAttribute("data-empty", !0)), g = null; else {
                        var k = i.textContent;
                        i.nodeType == Node.TEXT_NODE && 0 == k.replace(/\n/g, "").replace(/(^ *)|( *$)/g, "").length || (null == g && (g = b.doc.createElement(e), d && g.setAttribute("class", "fr-temp-div"), f.appendChild(g), h = !1), g.appendChild(i), h || b.node.hasClass(i, "fr-marker") || i.nodeType == Node.TEXT_NODE && 0 === k.replace(/ /g, "").length || (h = !0))
                    }
                    i = j
                }
                a.innerHTML = "", a.appendChild(f)
            }
        }

        function i(a, b) {
            for (var c = 0; c < a.length; c++) h(a[c], b)
        }

        function j(a, c, d, e) {
            return !!b.$wp && ("undefined" == typeof a && (a = !1), "undefined" == typeof c && (c = !1), "undefined" == typeof d && (d = !1), "undefined" == typeof e && (e = !1), h(b.el, a), e && i(b.el.querySelectorAll(".fr-inner"), a), c && i(b.el.querySelectorAll("td, th"), a), void(d && i(b.el.querySelectorAll("blockquote"), a)))
        }

        function k() {
            b.$el.find("div.fr-temp-div").each(function () {
                a(this).data("empty") || "LI" == this.parentNode.tagName || b.node.isBlock(this.nextSibling) && !a(this.nextSibling).hasClass("fr-temp-div") ? a(this).replaceWith(a(this).html()) : a(this).replaceWith(a(this).html() + "<br>")
            }), b.$el.find(".fr-temp-div").removeClass("fr-temp-div").filter(function () {
                return "" == a(this).attr("class")
            }).removeAttr("class")
        }

        function l(c) {
            for (var e = d(c), f = 0; f < e.length; f++) {
                var g = e[f];
                "false" == g.getAttribute("contenteditable") || g.querySelector(b.opts.htmlAllowedEmptyTags.join(":not(.fr-marker),") + ":not(.fr-marker)") || b.node.isVoid(g) || "TABLE" != g.tagName && "TBODY" != g.tagName && "TR" != g.tagName && g.appendChild(b.doc.createElement("br"))
            }
            if (b.browser.msie && b.opts.enter == a.FE.ENTER_BR) {
                var h = b.node.contents(b.el);
                h.length && h[h.length - 1].nodeType == Node.TEXT_NODE && b.$el.append("<br>")
            }
        }

        function m() {
            return b.$el.get(0).querySelectorAll(f())
        }

        function n(a) {
            if ("undefined" == typeof a && (a = b.el), a && ["SCRIPT", "STYLE", "PRE"].indexOf(a.tagName) >= 0) return !1;
            for (var c = b.doc.createTreeWalker(a, NodeFilter.SHOW_TEXT, b.node.filter(function (a) {
                return null != a.textContent.match(/([ \n]{2,})|(^[ \n]{1,})|([ \n]{1,}$)/g)
            }), !1); c.nextNode();) {
                var d = c.currentNode, e = b.node.isBlock(d.parentNode) || b.node.isElement(d.parentNode),
                    f = d.textContent.replace(/(?!^)( ){2,}(?!$)/g, " ").replace(/\n/g, " ").replace(/^[ ]{2,}/g, " ").replace(/[ ]{2,}$/g, " ");
                if (e) {
                    var g = d.previousSibling, h = d.nextSibling;
                    g && h && " " == f ? f = b.node.isBlock(g) && b.node.isBlock(h) ? "" : "\n" : (g || (f = f.replace(/^ */, "")), h || (f = f.replace(/ *$/, "")))
                }
                d.textContent = f
            }
        }

        function o(a, b, c) {
            var d = new RegExp(b, "gi"), e = d.exec(a);
            return e ? e[c] : null
        }

        function p(a, b) {
            var c = a.match(/<!DOCTYPE ?([^ ]*) ?([^ ]*) ?"?([^"]*)"? ?"?([^"]*)"?>/i);
            return c ? b.implementation.createDocumentType(c[1], c[3], c[4]) : b.implementation.createDocumentType("html")
        }

        function q(a) {
            var b = a.doctype, c = "<!DOCTYPE html>";
            return b && (c = "<!DOCTYPE " + b.name + (b.publicId ? ' PUBLIC "' + b.publicId + '"' : "") + (!b.publicId && b.systemId ? " SYSTEM" : "") + (b.systemId ? ' "' + b.systemId + '"' : "") + ">"), c
        }

        function r(c, d) {
            var e = c.parentNode;
            if (e && (b.node.isBlock(e) || b.node.isElement(e)) && ["TD", "TH"].indexOf(e.tagName) < 0) {
                var f = c.previousSibling, g = c.nextSibling;
                f && e && "BR" != f.tagName && !b.node.isBlock(f) && !g && e.textContent.replace(/\u200B/g, "").length > 0 && f.textContent.length > 0 && !b.node.hasClass(f, "fr-marker") && (b.el == e && !g && b.opts.enter == a.FE.ENTER_BR && b.browser.msie || (d && b.selection.save(), c.parentNode.removeChild(c), d && b.selection.restore()))
            }
        }

        function s() {
            var a, c = b.selection.element();
            a = b.node.isBlock(c) ? c : b.node.blockParent(c);
            var d = [];
            if (a) {
                var e = a.nextSibling, f = a.previousSibling;
                a && d.indexOf(a) < 0 && d.push(a), f && b.node.isBlock(f) && d.indexOf(f) < 0 && d.push(f), e && b.node.isBlock(e) && d.indexOf(e) < 0 && d.push(e)
            }
            for (var g = [], h = 0; h < d.length; h++) for (var i = d[h].querySelectorAll("br"), j = 0; j < i.length; j++) g.indexOf(i[j]) < 0 && g.push(i[j]);
            if (c.parentNode == b.el) for (var k = b.el.children, h = 0; h < k.length; h++) "BR" == k[h].tagName && g.indexOf(k[h]) < 0 && g.push(k[h]);
            return g
        }

        function t(a, c) {
            var d;
            if (a) {
                d = s();
                for (var e = 0; e < d.length; e++) r(d[e], c)
            } else {
                d = b.el.getElementsByTagName("br");
                for (var e = 0; e < d.length; e++) r(d[e], c)
            }
        }

        function u() {
            b.opts.htmlUntouched || (g(), j()), n(), b.opts.htmlUntouched || (b.spaces.normalize(null, !0), b.html.fillEmptyBlocks(), b.clean.quotes(), b.clean.lists(), b.clean.tables(), b.clean.toHTML5(), b.html.cleanBRs()), b.selection.restore(), v(), b.placeholder.refresh()
        }

        function v() {
            b.core.isEmpty() && (null != c() ? b.el.querySelector(f()) || b.el.querySelector(b.opts.htmlDoNotWrapTags.join(":not(.fr-marker),") + ":not(.fr-marker)") || (b.core.hasFocus() ? (b.$el.html("<" + c() + ">" + a.FE.MARKERS + "<br/></" + c() + ">"), b.selection.restore()) : b.$el.html("<" + c() + "><br/></" + c() + ">")) : b.el.querySelector("*:not(.fr-marker):not(br)") || (b.core.hasFocus() ? (b.$el.html(a.FE.MARKERS + "<br/>"), b.selection.restore()) : b.$el.html("<br/>")))
        }

        function w(a, b) {
            return o(a, "<" + b + "[^>]*?>([\\w\\W]*)</" + b + ">", 1)
        }

        function x(c, d) {
            var e = a("<div " + (o(c, "<" + d + "([^>]*?)>", 1) || "") + ">");
            return b.node.rawAttributes(e.get(0))
        }

        function y(a) {
            return o(a, "<!DOCTYPE([^>]*?)>", 0) || "<!DOCTYPE html>"
        }

        function z(c) {
            var d = b.clean.html(c || "", [], [], b.opts.fullPage);
            if (b.opts.fullPage) {
                var e = w(d, "body") || (d.indexOf("<body") >= 0 ? "" : d), f = x(d, "body"),
                    g = w(d, "head") || "", h = x(d, "head"),
                    i = a("<div>").append(g).contents().each(function () {
                        (this.nodeType == Node.COMMENT_NODE || ["BASE", "LINK", "META", "NOSCRIPT", "SCRIPT", "STYLE", "TEMPLATE", "TITLE"].indexOf(this.tagName) >= 0) && this.parentNode.removeChild(this)
                    }).end().html().trim();
                g = a("<div>").append(g).contents().map(function () {
                    return this.nodeType == Node.COMMENT_NODE ? "<!--" + this.nodeValue + "-->" : ["BASE", "LINK", "META", "NOSCRIPT", "SCRIPT", "STYLE", "TEMPLATE", "TITLE"].indexOf(this.tagName) >= 0 ? this.outerHTML : ""
                }).toArray().join("");
                var j = y(d), k = x(d, "html");
                b.$el.html(i + "\n" + e), b.node.clearAttributes(b.el), b.$el.attr(f), b.$el.addClass("fr-view"), b.$el.attr("spellcheck", b.opts.spellcheck), b.$el.attr("dir", b.opts.direction), b.$head.html(g), b.node.clearAttributes(b.$head.get(0)), b.$head.attr(h), b.node.clearAttributes(b.$html.get(0)), b.$html.attr(k), b.iframe_document.doctype.parentNode.replaceChild(p(j, b.iframe_document), b.iframe_document.doctype)
            } else b.$el.html(d);
            var l = b.edit.isDisabled();
            b.edit.on(), b.core.injectStyle(b.opts.iframeStyle), u(), b.opts.useClasses || (b.$el.find("[fr-original-class]").each(function () {
                this.setAttribute("class", this.getAttribute("fr-original-class")), this.removeAttribute("fr-original-class")
            }), b.$el.find("[fr-original-style]").each(function () {
                this.setAttribute("style", this.getAttribute("fr-original-style")), this.removeAttribute("fr-original-style")
            })), l && b.edit.off(), b.events.trigger("html.set")
        }

        function A(a) {
            var b = /(#[^\s\+>~\.\[:]+)/g, c = /(\[[^\]]+\])/g, d = /(\.[^\s\+>~\.\[:]+)/g,
                e = /(::[^\s\+>~\.\[:]+|:first-line|:first-letter|:before|:after)/gi, f = /(:[\w-]+\([^\)]*\))/gi,
                g = /(:[^\s\+>~\.\[:]+)/g, h = /([^\s\+>~\.\[:]+)/g;
            !function () {
                var b = /:not\(([^\)]*)\)/g;
                b.test(a) && (a = a.replace(b, "     $1 "))
            }();
            var i = 100 * (a.match(b) || []).length + 10 * (a.match(c) || []).length + 10 * (a.match(d) || []).length + 10 * (a.match(f) || []).length + 10 * (a.match(g) || []).length + (a.match(e) || []).length;
            return a = a.replace(/[\*\s\+>~]/g, " "), a = a.replace(/[#\.]/g, " "), i += (a.match(h) || []).length
        }

        function B(a) {
            if (b.events.trigger("html.processGet", [a]), a && a.getAttribute && "" == a.getAttribute("class") && a.removeAttribute("class"), a && a.nodeType == Node.ELEMENT_NODE) for (var c = a.querySelectorAll('[class=""]'), d = 0; d < c.length; d++) c[d].removeAttribute("class")
        }

        function C(a, c) {
            if (!b.$wp) return b.$oel.clone().removeClass("fr-view").removeAttr("contenteditable").get(0).outerHTML;
            var d = "";
            b.events.trigger("html.beforeGet");
            var e, f = [], g = {};
            if (!b.opts.useClasses && !c) {
                var h = new RegExp("^" + b.opts.htmlIgnoreCSSProperties.join("$|^") + "$", "gi");
                for (e = 0; e < b.doc.styleSheets.length; e++) {
                    var i, j = 0;
                    try {
                        i = b.doc.styleSheets[e].cssRules, b.doc.styleSheets[e].ownerNode && "STYLE" == b.doc.styleSheets[e].ownerNode.nodeType && (j = 1)
                    } catch (k) {
                    }
                    if (i) for (var l = 0, m = i.length; l < m; l++) if (i[l].selectorText && i[l].style.cssText.length > 0) {
                        var n, o = i[l].selectorText.replace(/body |\.fr-view /g, "").replace(/::/g, ":");
                        try {
                            n = b.el.querySelectorAll(o)
                        } catch (k) {
                            n = []
                        }
                        for (var p = 0; p < n.length; p++) {
                            !n[p].getAttribute("fr-original-style") && n[p].getAttribute("style") ? (n[p].setAttribute("fr-original-style", n[p].getAttribute("style")), f.push(n[p])) : n[p].getAttribute("fr-original-style") || f.push(n[p]), g[n[p]] || (g[n[p]] = {});
                            for (var r = 1e3 * j + A(i[l].selectorText), s = i[l].style.cssText.split(";"), t = 0; t < s.length; t++) {
                                var u = s[t].trim().split(":")[0];
                                u.match(h) || (g[n[p]][u] || (g[n[p]][u] = 0, (n[p].getAttribute("fr-original-style") || "").indexOf(u + ":") >= 0 && (g[n[p]][u] = 1e4)), r >= g[n[p]][u] && (g[n[p]][u] = r, s[t].trim().length && (n[p].style[u.trim()] = s[t].trim().split(":")[1].trim())))
                            }
                        }
                    }
                }
                for (e = 0; e < f.length; e++) if (f[e].getAttribute("class") && (f[e].setAttribute("fr-original-class", f[e].getAttribute("class")), f[e].removeAttribute("class")), (f[e].getAttribute("fr-original-style") || "").trim().length > 0) for (var v = f[e].getAttribute("fr-original-style").split(";"), p = 0; p < v.length; p++) v[p].indexOf(":") > 0 && (f[e].style[v[p].split(":")[0].trim()] = v[p].split(":")[1].trim())
            }
            if (b.core.isEmpty() ? b.opts.fullPage && (d = q(b.iframe_document), d += "<html" + b.node.attributes(b.$html.get(0)) + ">" + b.$html.find("head").get(0).outerHTML + "<body></body></html>") : ("undefined" == typeof a && (a = !1), b.opts.fullPage ? (d = q(b.iframe_document), b.$el.removeClass("fr-view"), d += "<html" + b.node.attributes(b.$html.get(0)) + ">" + b.$html.html() + "</html>", b.$el.addClass("fr-view")) : d = b.$el.html()), !b.opts.useClasses && !c) for (e = 0; e < f.length; e++) f[e].getAttribute("fr-original-class") && (f[e].setAttribute("class", f[e].getAttribute("fr-original-class")), f[e].removeAttribute("fr-original-class")), f[e].getAttribute("fr-original-style") ? (f[e].setAttribute("style", f[e].getAttribute("fr-original-style")), f[e].removeAttribute("fr-original-style")) : f[e].removeAttribute("style");
            b.opts.fullPage && (d = d.replace(/<style data-fr-style="true">(?:[\w\W]*?)<\/style>/g, ""), d = d.replace(/<link([^>]*)data-fr-style="true"([^>]*)>/g, ""), d = d.replace(/<style(?:[\w\W]*?)class="firebugResetStyles"(?:[\w\W]*?)>(?:[\w\W]*?)<\/style>/g, ""), d = d.replace(/<body((?:[\w\W]*?)) spellcheck="true"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$2>$3</body>"), d = d.replace(/<body((?:[\w\W]*?)) contenteditable="(true|false)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$3>$4</body>"), d = d.replace(/<body((?:[\w\W]*?)) dir="([\w]*)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$3>$4</body>"), d = d.replace(/<body((?:[\w\W]*?))class="([\w\W]*?)(fr-rtl|fr-ltr)([\w\W]*?)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, '<body$1class="$2$4"$5>$6</body>'), d = d.replace(/<body((?:[\w\W]*?)) class=""((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$2>$3</body>")), b.opts.htmlSimpleAmpersand && (d = d.replace(/\&amp;/gi, "&")), b.events.trigger("html.afterGet"), a || (d = d.replace(/<span[^>]*? class\s*=\s*["']?fr-marker["']?[^>]+>\u200b<\/span>/gi, "")), d = b.clean.invisibleSpaces(d), d = b.clean.exec(d, B);
            var w = b.events.chainTrigger("html.get", d);
            return "string" == typeof w && (d = w), d = d.replace(/<pre(?:[\w\W]*?)>(?:[\w\W]*?)<\/pre>/g, function (a) {
                return a.replace(/<br>/g, "\n")
            })
        }

        function D() {
            var c = function (c, d) {
                for (; d && (d.nodeType == Node.TEXT_NODE || !b.node.isBlock(d)) && !b.node.isElement(d);) d && d.nodeType != Node.TEXT_NODE && a(c).wrapInner(b.node.openTagString(d) + b.node.closeTagString(d)), d = d.parentNode;
                d && c.innerHTML == d.innerHTML && (c.innerHTML = d.outerHTML)
            }, d = function () {
                var c, d = null;
                return b.win.getSelection ? (c = b.win.getSelection(), c && c.rangeCount && (d = c.getRangeAt(0).commonAncestorContainer, d.nodeType != Node.ELEMENT_NODE && (d = d.parentNode))) : (c = b.doc.selection) && "Control" != c.type && (d = c.createRange().parentElement()), null != d && (a.inArray(b.el, a(d).parents()) >= 0 || d == b.el) ? d : null
            }, e = "";
            if ("undefined" != typeof b.win.getSelection) {
                b.browser.mozilla && (b.selection.save(), b.$el.find('.fr-marker[data-type="false"]').length > 1 && (b.$el.find('.fr-marker[data-type="false"][data-id="0"]').remove(), b.$el.find('.fr-marker[data-type="false"]:last').attr("data-id", "0"), b.$el.find(".fr-marker").not('[data-id="0"]').remove()), b.selection.restore());
                for (var f = b.selection.ranges(), g = 0; g < f.length; g++) {
                    var h = document.createElement("div");
                    h.appendChild(f[g].cloneContents()), c(h, d()), a(h).find(".fr-element").length > 0 && (h = b.el), e += h.innerHTML
                }
            } else "undefined" != typeof b.doc.selection && "Text" == b.doc.selection.type && (e = b.doc.selection.createRange().htmlText);
            return e
        }

        function E(a) {
            var c = b.doc.createElement("div");
            return c.innerHTML = a, null !== c.querySelector(f())
        }

        function F(a) {
            var c = b.doc.createElement("div");
            return c.innerHTML = a, b.selection.setAtEnd(c), c.innerHTML
        }

        function G(a) {
            return a.replace(/</gi, "&lt;").replace(/>/gi, "&gt;").replace(/"/gi, "&quot;").replace(/'/gi, "&#39;")
        }

        function H(a, c, d) {
            b.selection.isCollapsed() || b.selection.remove();
            var e;
            if (e = c ? a : b.clean.html(a), e = e.replace(/\r|\n/g, " "), a.indexOf('class="fr-marker"') < 0 && (e = F(e)), b.core.isEmpty() && !b.opts.keepFormatOnDelete) b.el.innerHTML = e; else {
                var f = b.markers.insert();
                if (f) {
                    var g, h = b.node.blockParent(f);
                    if ((E(e) || d) && (g = b.node.deepestParent(f) || h && "LI" == h.tagName)) {
                        var f = b.markers.split();
                        if (!f) return !1;
                        f.outerHTML = e
                    } else f.outerHTML = e
                } else b.el.innerHTML = b.el.innerHTML + e
            }
            u(), b.events.trigger("html.inserted")
        }

        function I(c) {
            var d = null;
            if ("undefined" == typeof c && (d = b.selection.element()), b.opts.keepFormatOnDelete) return !1;
            var e = d ? (d.textContent.match(/\u200B/g) || []).length - d.querySelectorAll(".fr-marker").length : 0,
                f = (b.el.textContent.match(/\u200B/g) || []).length - b.el.querySelectorAll(".fr-marker").length;
            if (f == e) return !1;
            var g, h;
            do {
                h = !1, g = b.el.querySelectorAll("*:not(.fr-marker)");
                for (var i = 0; i < g.length; i++) {
                    var j = g[i];
                    if (d != j) {
                        var k = j.textContent;
                        0 === j.children.length && 1 === k.length && 8203 == k.charCodeAt(0) && (a(j).remove(), h = !0)
                    }
                }
            } while (h)
        }

        function J() {
            var a = function () {
                I(), b.placeholder && b.placeholder.refresh()
            };
            b.events.on("mouseup", a), b.events.on("keydown", a), b.events.on("contentChanged", v)
        }

        return {
            defaultTag: c,
            emptyBlocks: d,
            emptyBlockTagsQuery: e,
            blockTagsQuery: f,
            fillEmptyBlocks: l,
            cleanEmptyTags: g,
            cleanWhiteTags: I,
            cleanBlankSpaces: n,
            blocks: m,
            getDoctype: q,
            set: z,
            get: C,
            getSelected: D,
            insert: H,
            wrap: j,
            unwrap: k,
            escapeEntities: G,
            checkIfEmpty: v,
            extractNode: w,
            extractNodeAttrs: x,
            extractDoctype: y,
            cleanBRs: t,
            _init: J
        }
    }, a.extend(a.FE.DEFAULTS, {
        height: null,
        heightMax: null,
        heightMin: null,
        width: null
    }), a.FE.MODULES.size = function (a) {
        function b() {
            c(), a.opts.height && a.$el.css("minHeight", a.opts.height - a.helpers.getPX(a.$el.css("padding-top")) - a.helpers.getPX(a.$el.css("padding-bottom"))), a.$iframe.height(a.$el.outerHeight(!0))
        }

        function c() {
            a.opts.heightMin ? a.$el.css("minHeight", a.opts.heightMin) : a.$el.css("minHeight", ""), a.opts.heightMax ? (a.$wp.css("maxHeight", a.opts.heightMax), a.$wp.css("overflow", "auto")) : (a.$wp.css("maxHeight", ""), a.$wp.css("overflow", "")), a.opts.height ? (a.$wp.height(a.opts.height), a.$el.css("minHeight", a.opts.height - a.helpers.getPX(a.$el.css("padding-top")) - a.helpers.getPX(a.$el.css("padding-bottom"))), a.$wp.css("overflow", "auto")) : (a.$wp.css("height", ""), a.opts.heightMin || a.$el.css("minHeight", ""), a.opts.heightMax || a.$wp.css("overflow", "")), a.opts.width && a.$box.width(a.opts.width)
        }

        function d() {
            return !!a.$wp && (c(), void(a.$iframe && (a.events.on("keyup", b), a.events.on("commands.after", b), a.events.on("html.set", b), a.events.on("init", b), a.events.on("initialized", b))))
        }

        return {_init: d, syncIframe: b, refresh: c}
    }, a.extend(a.FE.DEFAULTS, {language: null}), a.FE.LANGUAGE = {}, a.FE.MODULES.language = function (b) {
        function c(a) {
            return e && e.translation[a] ? e.translation[a] : a
        }

        function d() {
            a.FE.LANGUAGE && (e = a.FE.LANGUAGE[b.opts.language]), e && e.direction && (b.opts.direction = e.direction)
        }

        var e;
        return {_init: d, translate: c}
    }, a.extend(a.FE.DEFAULTS, {placeholderText: "Type something"}), a.FE.MODULES.placeholder = function (b) {
        function c() {
            b.$placeholder || g();
            var c = 0, d = 0, e = 0, f = 0, h = 0, i = 0, j = b.node.contents(b.el),
                k = a(b.selection.element()).css("text-align");
            if (j.length && j[0].nodeType == Node.ELEMENT_NODE) {
                var l = a(j[0]);
                !b.opts.toolbarInline && b.ready && (c = b.helpers.getPX(l.css("margin-top")), f = b.helpers.getPX(l.css("padding-top")), d = b.helpers.getPX(l.css("margin-left")), e = b.helpers.getPX(l.css("margin-right")), h = b.helpers.getPX(l.css("padding-left")), i = b.helpers.getPX(l.css("padding-right"))), b.$placeholder.css("font-size", l.css("font-size")), b.$placeholder.css("line-height", l.css("line-height"))
            } else b.$placeholder.css("font-size", b.$el.css("font-size")), b.$placeholder.css("line-height", b.$el.css("line-height"));
            b.$wp.addClass("show-placeholder"), b.$placeholder.css({
                marginTop: Math.max(b.helpers.getPX(b.$el.css("margin-top")), c),
                paddingTop: Math.max(b.helpers.getPX(b.$el.css("padding-top")), f),
                paddingLeft: Math.max(b.helpers.getPX(b.$el.css("padding-left")), h),
                marginLeft: Math.max(b.helpers.getPX(b.$el.css("margin-left")), d),
                paddingRight: Math.max(b.helpers.getPX(b.$el.css("padding-right")), i),
                marginRight: Math.max(b.helpers.getPX(b.$el.css("margin-right")), e),
                textAlign: k
            }).text(b.language.translate(b.opts.placeholderText || b.$oel.attr("placeholder") || "")), b.$placeholder.html(b.$placeholder.text().replace(/\n/g, "<br>"))
        }

        function d() {
            b.$wp.removeClass("show-placeholder")
        }

        function e() {
            return !b.$wp || b.node.hasClass(b.$wp.get(0), "show-placeholder")
        }

        function f() {
            return !!b.$wp && void(b.core.isEmpty() ? c() : d())
        }

        function g() {
            b.$placeholder = a('<span class="fr-placeholder"></span>'), b.$wp.append(b.$placeholder)
        }

        function h() {
            return !!b.$wp && void b.events.on("init input keydown keyup contentChanged initialized", f)
        }

        return {_init: h, show: c, hide: d, refresh: f, isVisible: e}
    }, a.FE.MODULES.edit = function (a) {
        function b() {
            if (a.browser.mozilla) try {
                a.doc.execCommand("enableObjectResizing", !1, "false"), a.doc.execCommand("enableInlineTableEditing", !1, "false")
            } catch (b) {
            }
            if (a.browser.msie) try {
                a.doc.body.addEventListener("mscontrolselect", function (a) {
                    return a.preventDefault(), !1
                })
            } catch (b) {
            }
        }

        function c() {
            a.$wp ? (a.$el.attr("contenteditable", !0), a.$el.removeClass("fr-disabled").attr("aria-disabled", !1), a.$tb && a.$tb.removeClass("fr-disabled").attr("aria-disabled", !1), b()) : a.$el.is("a") && a.$el.attr("contenteditable", !0), f = !1
        }

        function d() {
            a.$wp ? (a.$el.attr("contenteditable", !1), a.$el.addClass("fr-disabled").attr("aria-disabled", !0), a.$tb && a.$tb.addClass("fr-disabled").attr("aria-disabled", !0)) : a.$el.is("a") && a.$el.attr("contenteditable", !1), f = !0
        }

        function e() {
            return f
        }

        var f = !1;
        return {on: c, off: d, disableDesign: b, isDisabled: e}
    }, a.extend(a.FE.DEFAULTS, {
        editorClass: null,
        typingTimer: 500,
        iframe: !1,
        requestWithCORS: !0,
        requestWithCredentials: !1,
        requestHeaders: {},
        useClasses: !0,
        spellcheck: !0,
        iframeStyle: 'html{margin:0px;height:auto;}body{height:auto;padding:10px;background:transparent;color:#000000;position:relative;z-index: 2;-webkit-user-select:auto;margin:0px;overflow:hidden;min-height:20px;}body:after{content:"";display:block;clear:both;}',
        iframeStyleFiles: [],
        direction: "auto",
        zIndex: 1,
        disableRightClick: !1,
        scrollableContainer: "body",
        keepFormatOnDelete: !1,
        theme: null
    }), a.FE.MODULES.core = function (b) {
        function c(c) {
            if (b.opts.iframe) {
                b.$head.find("style[data-fr-style], link[data-fr-style]").remove(), b.$head.append('<style data-fr-style="true">' + c + "</style>");
                for (var d = 0; d < b.opts.iframeStyleFiles.length; d++) {
                    var e = a('<link data-fr-style="true" rel="stylesheet" href="' + b.opts.iframeStyleFiles[d] + '">');
                    e.get(0).addEventListener("load", b.size.syncIframe), b.$head.append(e)
                }
            }
        }

        function d() {
            b.opts.iframe || b.$el.addClass("fr-element fr-view")
        }

        function e() {
            if (b.$box.addClass("fr-box" + (b.opts.editorClass ? " " + b.opts.editorClass : "")), b.$wp.addClass("fr-wrapper"), d(), b.opts.iframe) {
                b.$iframe.addClass("fr-iframe"), b.$el.addClass("fr-view");
                for (var a = 0; a < b.o_doc.styleSheets.length; a++) {
                    var c;
                    try {
                        c = b.o_doc.styleSheets[a].cssRules
                    } catch (e) {
                    }
                    if (c) for (var f = 0, g = c.length; f < g; f++) !c[f].selectorText || 0 !== c[f].selectorText.indexOf(".fr-view") && 0 !== c[f].selectorText.indexOf(".fr-element") || c[f].style.cssText.length > 0 && (0 === c[f].selectorText.indexOf(".fr-view") ? b.opts.iframeStyle += c[f].selectorText.replace(/\.fr-view/g, "body") + "{" + c[f].style.cssText + "}" : b.opts.iframeStyle += c[f].selectorText.replace(/\.fr-element/g, "body") + "{" + c[f].style.cssText + "}")
                }
            }
            "auto" != b.opts.direction && b.$box.removeClass("fr-ltr fr-rtl").addClass("fr-" + b.opts.direction), b.$el.attr("dir", b.opts.direction), b.$wp.attr("dir", b.opts.direction), b.opts.zIndex > 1 && b.$box.css("z-index", b.opts.zIndex), b.opts.theme && b.$box.addClass(b.opts.theme + "-theme")
        }

        function f() {
            return b.node.isEmpty(b.el)
        }

        function g() {
            b.drag_support = {
                filereader: "undefined" != typeof FileReader,
                formdata: !!b.win.FormData,
                progress: "upload" in new XMLHttpRequest
            }
        }

        function h(a, c) {
            var d = new XMLHttpRequest;
            d.open(c, a, !0), b.opts.requestWithCredentials && (d.withCredentials = !0);
            for (var e in b.opts.requestHeaders) b.opts.requestHeaders.hasOwnProperty(e) && d.setRequestHeader(e, b.opts.requestHeaders[e]);
            return d
        }

        function i(a) {
            "TEXTAREA" == b.$oel.get(0).tagName && b.$oel.val(a), b.$wp && ("TEXTAREA" == b.$oel.get(0).tagName ? (b.$el.html(""), b.$wp.html(""), b.$box.replaceWith(b.$oel), b.$oel.show()) : (b.$wp.replaceWith(a), b.$el.html(""), b.$box.removeClass("fr-view fr-ltr fr-box " + (b.opts.editorClass || "")), b.opts.theme && b.$box.addClass(b.opts.theme + "-theme"))), this.$wp = null, this.$el = null, this.el = null, this.$box = null
        }

        function j() {
            return b.browser.mozilla && b.helpers.isMobile() ? b.selection.inEditor() : b.node.hasFocus(b.el) || b.$el.find("*:focus").length > 0
        }

        function k(a) {
            if (!a) return !1;
            var c = a.data("instance");
            return !!c && c.id == b.id
        }

        function l() {
            if (a.FE.INSTANCES.push(b), g(), b.$wp) {
                e(), b.html.set(b._original_html), b.$el.attr("spellcheck", b.opts.spellcheck), b.helpers.isMobile() && (b.$el.attr("autocomplete", b.opts.spellcheck ? "on" : "off"), b.$el.attr("autocorrect", b.opts.spellcheck ? "on" : "off"), b.$el.attr("autocapitalize", b.opts.spellcheck ? "on" : "off")), b.opts.disableRightClick && b.events.$on(b.$el, "contextmenu", function (a) {
                    if (2 == a.button) return !1
                });
                try {
                    b.doc.execCommand("styleWithCSS", !1, !1)
                } catch (c) {
                }
            }
            "TEXTAREA" == b.$oel.get(0).tagName && (b.events.on("contentChanged", function () {
                b.$oel.val(b.html.get())
            }), b.events.on("form.submit", function () {
                b.$oel.val(b.html.get())
            }), b.events.on("form.reset", function () {
                b.html.set(b._original_html)
            }), b.$oel.val(b.html.get())), b.helpers.isIOS() && b.events.$on(b.$doc, "selectionchange", function () {
                b.$doc.get(0).hasFocus() || b.$win.get(0).focus()
            }), b.events.trigger("init")
        }

        return {_init: l, destroy: i, isEmpty: f, getXHR: h, injectStyle: c, hasFocus: j, sameInstance: k}
    }, a.FE.MODULES.cursorLists = function (b) {
        function c(a) {
            for (var b = a; "LI" != b.tagName;) b = b.parentNode;
            return b
        }

        function d(a) {
            for (var c = a; !b.node.isList(c);) c = c.parentNode;
            return c
        }

        function e(e) {
            var f, g = c(e), h = g.nextSibling, i = g.previousSibling, j = b.html.defaultTag();
            if (b.node.isEmpty(g, !0) && h) {
                for (var k = "", l = "", m = e.parentNode; !b.node.isList(m) && m.parentNode && "LI" !== m.parentNode.tagName;) k = b.node.openTagString(m) + k, l += b.node.closeTagString(m), m = m.parentNode;
                k = b.node.openTagString(m) + k, l += b.node.closeTagString(m);
                var n = "";
                for (n = m.parentNode && "LI" == m.parentNode.tagName ? l + "<li>" + a.FE.MARKERS + "<br>" + k : j ? l + "<" + j + ">" + a.FE.MARKERS + "<br></" + j + ">" + k : l + a.FE.MARKERS + "<br>" + k, a(g).html('<span id="fr-break"></span>'); ["UL", "OL"].indexOf(m.tagName) < 0 || m.parentNode && "LI" === m.parentNode.tagName;) m = m.parentNode;
                var o = b.node.openTagString(m) + a(m).html() + b.node.closeTagString(m);
                o = o.replace(/<span id="fr-break"><\/span>/g, n), a(m).replaceWith(o), b.$el.find("li:empty").remove()
            } else i && h || !b.node.isEmpty(g, !0) ? (a(g).before("<li><br></li>"), a(e).remove()) : i ? (f = d(g), f.parentNode && "LI" == f.parentNode.tagName ? a(f.parentNode).after("<li>" + a.FE.MARKERS + "<br></li>") : j ? a(f).after("<" + j + ">" + a.FE.MARKERS + "<br></" + j + ">") : a(f).after(a.FE.MARKERS + "<br>"), a(g).remove()) : (f = d(g), f.parentNode && "LI" == f.parentNode.tagName ? h ? a(f.parentNode).before("<li>" + a.FE.MARKERS + "<br></li>") : a(f.parentNode).after("<li>" + a.FE.MARKERS + "<br></li>") : j ? a(f).before("<" + j + ">" + a.FE.MARKERS + "<br></" + j + ">") : a(f).before(a.FE.MARKERS + "<br>"), a(g).remove())
        }

        function f(d) {
            for (var e = c(d), f = "", g = d, h = "", i = ""; g != e;) {
                g = g.parentNode;
                var j = "A" == g.tagName && b.cursor.isAtEnd(d, g) ? "fr-to-remove" : "";
                h = b.node.openTagString(a(g).clone().addClass(j).get(0)) + h, i = b.node.closeTagString(g) + i
            }
            f = i + f + h + a.FE.MARKERS, a(d).replaceWith('<span id="fr-break"></span>');
            var k = b.node.openTagString(e) + a(e).html() + b.node.closeTagString(e);
            k = k.replace(/<span id="fr-break"><\/span>/g, f), a(e).replaceWith(k)
        }

        function g(d) {
            for (var e = c(d), f = a.FE.MARKERS, g = "", h = d, i = !1; h != e;) {
                h = h.parentNode;
                var j = "A" == h.tagName && b.cursor.isAtEnd(d, h) ? "fr-to-remove" : "";
                i || h == e || b.node.isBlock(h) || (i = !0, g += a.FE.INVISIBLE_SPACE), g = b.node.openTagString(a(h).clone().addClass(j).get(0)) + g, f += b.node.closeTagString(h)
            }
            var k = g + f;
            a(d).remove(), a(e).after(k)
        }

        function h(e) {
            var f = c(e), g = f.previousSibling;
            if (g) {
                g = a(g).find(b.html.blockTagsQuery()).get(-1) || g, a(e).replaceWith(a.FE.MARKERS);
                var h = b.node.contents(g);
                h.length && "BR" == h[h.length - 1].tagName && a(h[h.length - 1]).remove(), a(f).find(b.html.blockTagsQuery()).not("ol, ul, table").each(function () {
                    this.parentNode == f && a(this).replaceWith(a(this).html() + (b.node.isEmpty(this) ? "" : "<br>"))
                });
                for (var i, j = b.node.contents(f)[0]; j && !b.node.isList(j);) i = j.nextSibling, a(g).append(j), j = i;
                for (g = f.previousSibling; j;) i = j.nextSibling, a(g).append(j), j = i;
                a(f).remove()
            } else {
                var k = d(f);
                if (a(e).replaceWith(a.FE.MARKERS), k.parentNode && "LI" == k.parentNode.tagName) {
                    var l = k.previousSibling;
                    b.node.isBlock(l) ? (a(f).find(b.html.blockTagsQuery()).not("ol, ul, table").each(function () {
                        this.parentNode == f && a(this).replaceWith(a(this).html() + (b.node.isEmpty(this) ? "" : "<br>"))
                    }), a(l).append(a(f).html())) : a(k).before(a(f).html())
                } else {
                    var m = b.html.defaultTag();
                    m && 0 === a(f).find(b.html.blockTagsQuery()).length ? a(k).before("<" + m + ">" + a(f).html() + "</" + m + ">") : a(k).before(a(f).html())
                }
                a(f).remove(), 0 === a(k).find("li").length && a(k).remove()
            }
        }

        function i(d) {
            var e, f = c(d), g = f.nextSibling;
            if (g) {
                e = b.node.contents(g), e.length && "BR" == e[0].tagName && a(e[0]).remove(), a(g).find(b.html.blockTagsQuery()).not("ol, ul, table").each(function () {
                    this.parentNode == g && a(this).replaceWith(a(this).html() + (b.node.isEmpty(this) ? "" : "<br>"))
                });
                for (var h, i = d, j = b.node.contents(g)[0]; j && !b.node.isList(j);) h = j.nextSibling, a(i).after(j), i = j, j = h;
                for (; j;) h = j.nextSibling, a(f).append(j), j = h;
                a(d).replaceWith(a.FE.MARKERS), a(g).remove()
            } else {
                for (var k = f; !k.nextSibling && k != b.el;) k = k.parentNode;
                if (k == b.el) return !1;
                if (k = k.nextSibling, b.node.isBlock(k)) a.FE.NO_DELETE_TAGS.indexOf(k.tagName) < 0 && (a(d).replaceWith(a.FE.MARKERS), e = b.node.contents(f), e.length && "BR" == e[e.length - 1].tagName && a(e[e.length - 1]).remove(), a(f).append(a(k).html()), a(k).remove()); else for (e = b.node.contents(f), e.length && "BR" == e[e.length - 1].tagName && a(e[e.length - 1]).remove(), a(d).replaceWith(a.FE.MARKERS); k && !b.node.isBlock(k) && "BR" != k.tagName;) a(f).append(a(k)), k = k.nextSibling
            }
        }

        return {_startEnter: e, _middleEnter: f, _endEnter: g, _backspace: h, _del: i}
    }, a.FE.NO_DELETE_TAGS = ["TH", "TD", "TR", "TABLE", "FORM"], a.FE.SIMPLE_ENTER_TAGS = ["TH", "TD", "LI", "DL", "DT", "FORM"], a.FE.MODULES.cursor = function (b) {
        function c(a) {
            return !!a && (!!b.node.isBlock(a) || (a.nextSibling && a.nextSibling.nodeType == Node.TEXT_NODE && 0 == a.nextSibling.textContent.replace(/\u200b/g, "").length ? c(a.nextSibling) : !a.nextSibling && c(a.parentNode)))
        }

        function d(a) {
            return !!a && (!!b.node.isBlock(a) || (a.previousSibling && a.previousSibling.nodeType == Node.TEXT_NODE && 0 == a.previousSibling.textContent.replace(/\u200b/g, "").length ? d(a.previousSibling) : !a.previousSibling && d(a.parentNode)))
        }

        function e(a, c) {
            return !!a && (a != b.$wp.get(0) && (a.previousSibling && a.previousSibling.nodeType == Node.TEXT_NODE && 0 == a.previousSibling.textContent.replace(/\u200b/g, "").length ? e(a.previousSibling, c) : !a.previousSibling && (a.parentNode == c || e(a.parentNode, c))))
        }

        function f(a, c) {
            return !!a && (a != b.$wp.get(0) && (a.nextSibling && a.nextSibling.nodeType == Node.TEXT_NODE && 0 == a.nextSibling.textContent.replace(/\u200b/g, "").length ? f(a.nextSibling, c) : !a.nextSibling && (a.parentNode == c || f(a.parentNode, c))))
        }

        function g(c) {
            return a(c).parentsUntil(b.$el, "LI").length > 0 && 0 === a(c).parentsUntil("LI", "TABLE").length
        }

        function h(c) {
            var d = a(c).parentsUntil(b.$el, "BLOCKQUOTE").length > 0, e = b.node.deepestParent(c, [], !d);
            if (e && "BLOCKQUOTE" == e.tagName) {
                var f = b.node.deepestParent(c, [a(c).parentsUntil(b.$el, "BLOCKQUOTE").get(0)]);
                f && f.previousSibling && (e = f)
            }
            if (null !== e) {
                var g, h = e.previousSibling;
                if (b.node.isBlock(e) && b.node.isEditable(e) && h && a.FE.NO_DELETE_TAGS.indexOf(h.tagName) < 0) if (b.node.isDeletable(h)) a(h).remove(), a(c).replaceWith(a.FE.MARKERS); else if (b.node.isEditable(h)) if (b.node.isBlock(h)) if (b.node.isEmpty(h) && !b.node.isList(h)) a(h).remove(); else {
                    if (b.node.isList(h) && (h = a(h).find("li:last").get(0)), g = b.node.contents(h), g.length && "BR" == g[g.length - 1].tagName && a(g[g.length - 1]).remove(), "BLOCKQUOTE" == h.tagName && "BLOCKQUOTE" != e.tagName) for (g = b.node.contents(h); g.length && b.node.isBlock(g[g.length - 1]);) h = g[g.length - 1], g = b.node.contents(h); else if ("BLOCKQUOTE" != h.tagName && "BLOCKQUOTE" == e.tagName) for (g = b.node.contents(e); g.length && b.node.isBlock(g[0]);) e = g[0], g = b.node.contents(e);
                    a(c).replaceWith(a.FE.MARKERS), a(h).append(b.node.isEmpty(e) ? a.FE.MARKERS : e.innerHTML), a(e).remove()
                } else a(c).replaceWith(a.FE.MARKERS), "BLOCKQUOTE" == e.tagName && h.nodeType == Node.ELEMENT_NODE ? a(h).remove() : (a(h).after(b.node.isEmpty(e) ? "" : a(e).html()), a(e).remove(), "BR" == h.tagName && a(h).remove())
            }
        }

        function i(c) {
            for (var d = c; !d.previousSibling;) if (d = d.parentNode, b.node.isElement(d)) return !1;
            d = d.previousSibling;
            var e;
            if (!b.node.isBlock(d) && b.node.isEditable(d)) {
                for (e = b.node.contents(d); d.nodeType != Node.TEXT_NODE && !b.node.isDeletable(d) && e.length && b.node.isEditable(d);) d = e[e.length - 1], e = b.node.contents(d);
                if (d.nodeType == Node.TEXT_NODE) {
                    if (b.helpers.isIOS()) return !0;
                    var f = d.textContent, g = f.length - 1;
                    if (b.opts.tabSpaces && f.length >= b.opts.tabSpaces) {
                        var h = f.substr(f.length - b.opts.tabSpaces, f.length - 1);
                        0 == h.replace(/ /g, "").replace(new RegExp(a.FE.UNICODE_NBSP, "g"), "").length && (g = f.length - b.opts.tabSpaces)
                    }
                    d.textContent = f.substring(0, g), d.textContent.length && 55357 == d.textContent.charCodeAt(d.textContent.length - 1) && (d.textContent = d.textContent.substr(0, d.textContent.length - 1));
                    var i = f.length != d.textContent.length;
                    0 == d.textContent.length ? i && b.opts.keepFormatOnDelete ? a(d).after(a.FE.INVISIBLE_SPACE + a.FE.MARKERS) : 2 != d.parentNode.childNodes.length || d.parentNode != c.parentNode || b.node.isBlock(d.parentNode) || b.node.isElement(d.parentNode) ? (a(d).after(a.FE.MARKERS), b.node.isElement(d.parentNode) && !c.nextSibling && d.previousSibling && "BR" == d.previousSibling.tagName && a(c).after("<br>"), d.parentNode.removeChild(d)) : (a(d.parentNode).after(a.FE.MARKERS), a(d.parentNode).remove()) : a(d).after(a.FE.MARKERS)
                } else b.node.isDeletable(d) ? (a(d).after(a.FE.MARKERS), a(d).remove()) : b.events.trigger("node.remove", [a(d)]) !== !1 && (a(d).after(a.FE.MARKERS), a(d).remove())
            } else if (a.FE.NO_DELETE_TAGS.indexOf(d.tagName) < 0 && (b.node.isEditable(d) || b.node.isDeletable(d))) if (b.node.isDeletable(d)) a(c).replaceWith(a.FE.MARKERS), a(d).remove(); else if (b.node.isEmpty(d) && !b.node.isList(d)) a(d).remove(), a(c).replaceWith(a.FE.MARKERS); else {
                for (b.node.isList(d) && (d = a(d).find("li:last").get(0)), e = b.node.contents(d), e && "BR" == e[e.length - 1].tagName && a(e[e.length - 1]).remove(), e = b.node.contents(d); e && b.node.isBlock(e[e.length - 1]);) d = e[e.length - 1], e = b.node.contents(d);
                a(d).append(a.FE.MARKERS);
                for (var j = c; !j.previousSibling;) j = j.parentNode;
                for (; j && "BR" !== j.tagName && !b.node.isBlock(j);) {
                    var k = j;
                    j = j.nextSibling, a(d).append(k)
                }
                j && "BR" == j.tagName && a(j).remove(), a(c).remove()
            } else c.nextSibling && "BR" == c.nextSibling.tagName && a(c.nextSibling).remove()
        }

        function j() {
            var f = !1, j = b.markers.insert();
            if (!j) return !0;
            for (var k = j.parentNode; k && !b.node.isElement(k);) {
                if ("false" === k.getAttribute("contenteditable")) return a(j).replaceWith(a.FE.MARKERS), b.selection.restore(), !1;
                if ("true" === k.getAttribute("contenteditable")) break;
                k = k.parentNode
            }
            b.el.normalize();
            var l = j.previousSibling;
            if (l) {
                var m = l.textContent;
                m && m.length && 8203 == m.charCodeAt(m.length - 1) && (1 == m.length ? a(l).remove() : (l.textContent = l.textContent.substr(0, m.length - 1), l.textContent.length && 55357 == l.textContent.charCodeAt(l.textContent.length - 1) && (l.textContent = l.textContent.substr(0, l.textContent.length - 1))))
            }
            return c(j) ? f = i(j) : d(j) ? g(j) && e(j, a(j).parents("li:first").get(0)) ? b.cursorLists._backspace(j) : h(j) : f = i(j), a(j).remove(), n(), b.html.fillEmptyBlocks(!0), b.opts.htmlUntouched || (b.html.cleanEmptyTags(), b.clean.quotes(), b.clean.lists()), b.spaces.normalizeAroundCursor(), b.selection.restore(), f
        }

        function k(c) {
            var d = a(c).parentsUntil(b.$el, "BLOCKQUOTE").length > 0, e = b.node.deepestParent(c, [], !d);
            if (e && "BLOCKQUOTE" == e.tagName) {
                var f = b.node.deepestParent(c, [a(c).parentsUntil(b.$el, "BLOCKQUOTE").get(0)]);
                f && f.nextSibling && (e = f)
            }
            if (null !== e) {
                var g, h = e.nextSibling;
                if (b.node.isBlock(e) && (b.node.isEditable(e) || b.node.isDeletable(e)) && h && a.FE.NO_DELETE_TAGS.indexOf(h.tagName) < 0) if (b.node.isDeletable(h)) a(h).remove(), a(c).replaceWith(a.FE.MARKERS); else if (b.node.isBlock(h) && b.node.isEditable(h)) if (b.node.isList(h)) if (b.node.isEmpty(e, !0)) a(e).remove(), a(h).find("li:first").prepend(a.FE.MARKERS); else {
                    var i = a(h).find("li:first");
                    "BLOCKQUOTE" == e.tagName && (g = b.node.contents(e), g.length && b.node.isBlock(g[g.length - 1]) && (e = g[g.length - 1])), 0 === i.find("ul, ol").length && (a(c).replaceWith(a.FE.MARKERS), i.find(b.html.blockTagsQuery()).not("ol, ul, table").each(function () {
                        this.parentNode == i.get(0) && a(this).replaceWith(a(this).html() + (b.node.isEmpty(this) ? "" : "<br>"))
                    }), a(e).append(b.node.contents(i.get(0))), i.remove(), 0 === a(h).find("li").length && a(h).remove())
                } else {
                    if (g = b.node.contents(h), g.length && "BR" == g[0].tagName && a(g[0]).remove(), "BLOCKQUOTE" != h.tagName && "BLOCKQUOTE" == e.tagName) for (g = b.node.contents(e); g.length && b.node.isBlock(g[g.length - 1]);) e = g[g.length - 1], g = b.node.contents(e); else if ("BLOCKQUOTE" == h.tagName && "BLOCKQUOTE" != e.tagName) for (g = b.node.contents(h); g.length && b.node.isBlock(g[0]);) h = g[0], g = b.node.contents(h);
                    a(c).replaceWith(a.FE.MARKERS), a(e).append(h.innerHTML), a(h).remove()
                } else {
                    for (a(c).replaceWith(a.FE.MARKERS); h && "BR" !== h.tagName && !b.node.isBlock(h) && b.node.isEditable(h);) {
                        var j = h;
                        h = h.nextSibling, a(e).append(j)
                    }
                    h && "BR" == h.tagName && b.node.isEditable(h) && a(h).remove()
                }
            }
        }

        function l(d) {
            for (var e = d; !e.nextSibling;) if (e = e.parentNode, b.node.isElement(e)) return !1;
            if (e = e.nextSibling, "BR" == e.tagName && b.node.isEditable(e)) if (e.nextSibling) {
                if (b.node.isBlock(e.nextSibling) && b.node.isEditable(e.nextSibling)) {
                    if (!(a.FE.NO_DELETE_TAGS.indexOf(e.nextSibling.tagName) < 0)) return void a(e).remove();
                    e = e.nextSibling, a(e.previousSibling).remove()
                }
            } else if (c(e)) {
                if (g(d)) b.cursorLists._del(d); else {
                    var f = b.node.deepestParent(e);
                    f && (a(e).remove(), k(d))
                }
                return
            }
            var h;
            if (!b.node.isBlock(e) && b.node.isEditable(e)) {
                for (h = b.node.contents(e); e.nodeType != Node.TEXT_NODE && h.length && !b.node.isDeletable(e) && b.node.isEditable(e);) e = h[0], h = b.node.contents(e);
                e.nodeType == Node.TEXT_NODE ? (a(e).before(a.FE.MARKERS), e.textContent.length && 55357 == e.textContent.charCodeAt(0) ? e.textContent = e.textContent.substring(2, e.textContent.length) : e.textContent = e.textContent.substring(1, e.textContent.length)) : b.node.isDeletable(e) ? (a(e).before(a.FE.MARKERS), a(e).remove()) : b.events.trigger("node.remove", [a(e)]) !== !1 && (a(e).before(a.FE.MARKERS), a(e).remove()), a(d).remove()
            } else if (a.FE.NO_DELETE_TAGS.indexOf(e.tagName) < 0 && (b.node.isEditable(e) || b.node.isDeletable(e))) if (b.node.isDeletable(e)) a(d).replaceWith(a.FE.MARKERS), a(e).remove(); else if (b.node.isList(e)) d.previousSibling ? (a(e).find("li:first").prepend(d), b.cursorLists._backspace(d)) : (a(e).find("li:first").prepend(a.FE.MARKERS), a(d).remove()); else if (h = b.node.contents(e), h && "BR" == h[0].tagName && a(h[0]).remove(), h && "BLOCKQUOTE" == e.tagName) {
                var i = h[0];
                for (a(d).before(a.FE.MARKERS); i && "BR" != i.tagName;) {
                    var j = i;
                    i = i.nextSibling, a(d).before(j)
                }
                i && "BR" == i.tagName && a(i).remove()
            } else a(d).after(a(e).html()).after(a.FE.MARKERS), a(e).remove()
        }

        function m() {
            var e = b.markers.insert();
            if (!e) return !1;
            if (b.el.normalize(), c(e)) if (g(e)) if (0 === a(e).parents("li:first").find("ul, ol").length) b.cursorLists._del(e); else {
                var f = a(e).parents("li:first").find("ul:first, ol:first").find("li:first");
                f = f.find(b.html.blockTagsQuery()).get(-1) || f, f.prepend(e), b.cursorLists._backspace(e)
            } else k(e); else l(d(e) ? e : e);
            a(e).remove(), n(), b.html.fillEmptyBlocks(!0), b.opts.htmlUntouched || (b.html.cleanEmptyTags(), b.clean.quotes(), b.clean.lists()), b.spaces.normalizeAroundCursor(), b.selection.restore()
        }

        function n() {
            for (var a = b.el.querySelectorAll("blockquote:empty"), c = 0; c < a.length; c++) a[c].parentNode.removeChild(a[c])
        }

        function o() {
            b.$el.find(".fr-to-remove").each(function () {
                for (var c = b.node.contents(this), d = 0; d < c.length; d++) c[d].nodeType == Node.TEXT_NODE && (c[d].textContent = c[d].textContent.replace(/\u200B/g, ""));
                a(this).replaceWith(this.innerHTML)
            })
        }

        function p(c, d, e) {
            var g, h = b.node.deepestParent(c, [], !e);
            if (h && "BLOCKQUOTE" == h.tagName) return f(c, h) ? (g = b.html.defaultTag(), g ? a(h).after("<" + g + ">" + a.FE.MARKERS + "<br></" + g + ">") : a(h).after(a.FE.MARKERS + "<br>"), a(c).remove(), !1) : (r(c, d, e), !1);
            if (null == h) g = b.html.defaultTag(), g && b.node.isElement(c.parentNode) ? a(c).replaceWith("<" + g + ">" + a.FE.MARKERS + "<br></" + g + ">") : a(c).replaceWith((b.node.isEmpty(c.parentNode, !0) ? "" : "<br/>") + a.FE.MARKERS + "<br/>"); else {
                var i = c, j = "";
                b.node.isBlock(h) && !d || (j = "<br/>");
                var k = "", l = "";
                g = b.html.defaultTag();
                var m = "", n = "";
                g && b.node.isBlock(h) && (m = "<" + g + ">", n = "</" + g + ">", h.tagName == g.toUpperCase() && (m = b.node.openTagString(a(h).clone().removeAttr("id").get(0))));
                do if (i = i.parentNode, !d || i != h || d && !b.node.isBlock(h)) if (k += b.node.closeTagString(i), i == h && b.node.isBlock(h)) l = m + l; else {
                    var o = "A" == i.tagName && f(c, i) ? "fr-to-remove" : "";
                    l = b.node.openTagString(a(i).clone().addClass(o).get(0)) + l
                } while (i != h);
                j = k + j + l + (c.parentNode == h && b.node.isBlock(h) ? "" : a.FE.INVISIBLE_SPACE) + a.FE.MARKERS, b.node.isBlock(h) && !a(h).find("*:last").is("br") && a(h).append("<br/>"), a(c).after('<span id="fr-break"></span>'), a(c).remove(), h.nextSibling && !b.node.isBlock(h.nextSibling) || b.node.isBlock(h) || a(h).after("<br>");
                var p;
                p = !d && b.node.isBlock(h) ? b.node.openTagString(h) + a(h).html() + n : b.node.openTagString(h) + a(h).html() + b.node.closeTagString(h), p = p.replace(/<span id="fr-break"><\/span>/g, j), a(h).replaceWith(p)
            }
        }

        function q(c, d, g) {
            var h, i = b.node.deepestParent(c, [], !g);
            if (i && "TABLE" == i.tagName) return a(i).find("td:first, th:first").prepend(c), q(c, d, g);
            if (i && "BLOCKQUOTE" == i.tagName) {
                if (e(c, i)) return h = b.html.defaultTag(), h ? a(i).before("<" + h + ">" + a.FE.MARKERS + "<br></" + h + ">") : a(i).before(a.FE.MARKERS + "<br>"), a(c).remove(), !1;
                f(c, i) ? p(c, d, !0) : r(c, d, !0)
            }
            if (null == i) h = b.html.defaultTag(), h && b.node.isElement(c.parentNode) ? a(c).replaceWith("<" + h + ">" + a.FE.MARKERS + "<br></" + h + ">") : a(c).replaceWith("<br>" + a.FE.MARKERS); else {
                if (b.node.isBlock(i)) if (d) a(c).remove(), a(i).prepend("<br>" + a.FE.MARKERS); else {
                    if (b.node.isEmpty(i, !0)) return p(c, d, g);
                    a(i).before(b.node.openTagString(a(i).clone().removeAttr("id").get(0)) + "<br>" + b.node.closeTagString(i))
                } else a(i).before("<br>");
                a(c).remove()
            }
        }

        function r(c, d, g) {
            var h = b.node.deepestParent(c, [], !g);
            if (null == h) b.html.defaultTag() && c.parentNode === b.el ? a(c).replaceWith("<" + b.html.defaultTag() + ">" + a.FE.MARKERS + "<br></" + b.html.defaultTag() + ">") : (c.nextSibling && !b.node.isBlock(c.nextSibling) || a(c).after("<br>"), a(c).replaceWith("<br>" + a.FE.MARKERS)); else {
                var i = c, j = "";
                "PRE" == h.tagName && (d = !0), b.node.isBlock(h) && !d || (j = "<br>");
                var k = "", l = "";
                do {
                    var m = i;
                    if (i = i.parentNode, "BLOCKQUOTE" == h.tagName && b.node.isEmpty(m) && !b.node.hasClass(m, "fr-marker") && a(m).find(c).length > 0 && a(m).after(c), ("BLOCKQUOTE" != h.tagName || !f(c, i) && !e(c, i)) && (!d || i != h || d && !b.node.isBlock(h))) {
                        k += b.node.closeTagString(i);
                        var n = "A" == i.tagName && f(c, i) ? "fr-to-remove" : "";
                        l = b.node.openTagString(a(i).clone().addClass(n).removeAttr("id").get(0)) + l
                    }
                } while (i != h);
                var o = h == c.parentNode && b.node.isBlock(h) || c.nextSibling;
                if ("BLOCKQUOTE" == h.tagName) {
                    c.previousSibling && b.node.isBlock(c.previousSibling) && c.nextSibling && "BR" == c.nextSibling.tagName && (a(c.nextSibling).after(c), c.nextSibling && "BR" == c.nextSibling.tagName && a(c.nextSibling).remove());
                    var p = b.html.defaultTag();
                    j = k + j + (p ? "<" + p + ">" : "") + a.FE.MARKERS + "<br>" + (p ? "</" + p + ">" : "") + l
                } else j = k + j + l + (o ? "" : a.FE.INVISIBLE_SPACE) + a.FE.MARKERS;
                a(c).replaceWith('<span id="fr-break"></span>');
                var q = b.node.openTagString(h) + a(h).html() + b.node.closeTagString(h);
                q = q.replace(/<span id="fr-break"><\/span>/g, j), a(h).replaceWith(q)
            }
        }

        function s(e) {
            var f = b.markers.insert();
            if (!f) return !0;
            b.el.normalize();
            var h = !1;
            a(f).parentsUntil(b.$el, "BLOCKQUOTE").length > 0 && (e = !1, h = !0), a(f).parentsUntil(b.$el, "TD, TH").length && (h = !1), c(f) ? !g(f) || e || h ? p(f, e, h) : b.cursorLists._endEnter(f) : d(f) ? !g(f) || e || h ? q(f, e, h) : b.cursorLists._startEnter(f) : !g(f) || e || h ? r(f, e, h) : b.cursorLists._middleEnter(f), o(), b.opts.htmlUntouched || (b.html.fillEmptyBlocks(!0), b.html.cleanEmptyTags(), b.clean.lists()), b.spaces.normalizeAroundCursor(), b.selection.restore()
        }

        return {enter: s, backspace: j, del: m, isAtEnd: f, isAtStart: e}
    }, a.FE.ENTER_P = 0, a.FE.ENTER_DIV = 1, a.FE.ENTER_BR = 2, a.FE.KEYCODE = {
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        ESC: 27,
        SPACE: 32,
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        DELETE: 46,
        ZERO: 48,
        ONE: 49,
        TWO: 50,
        THREE: 51,
        FOUR: 52,
        FIVE: 53,
        SIX: 54,
        SEVEN: 55,
        EIGHT: 56,
        NINE: 57,
        FF_SEMICOLON: 59,
        FF_EQUALS: 61,
        QUESTION_MARK: 63,
        A: 65,
        B: 66,
        C: 67,
        D: 68,
        E: 69,
        F: 70,
        G: 71,
        H: 72,
        I: 73,
        J: 74,
        K: 75,
        L: 76,
        M: 77,
        N: 78,
        O: 79,
        P: 80,
        Q: 81,
        R: 82,
        S: 83,
        T: 84,
        U: 85,
        V: 86,
        W: 87,
        X: 88,
        Y: 89,
        Z: 90,
        META: 91,
        NUM_ZERO: 96,
        NUM_ONE: 97,
        NUM_TWO: 98,
        NUM_THREE: 99,
        NUM_FOUR: 100,
        NUM_FIVE: 101,
        NUM_SIX: 102,
        NUM_SEVEN: 103,
        NUM_EIGHT: 104,
        NUM_NINE: 105,
        NUM_MULTIPLY: 106,
        NUM_PLUS: 107,
        NUM_MINUS: 109,
        NUM_PERIOD: 110,
        NUM_DIVISION: 111,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
        FF_HYPHEN: 173,
        SEMICOLON: 186,
        DASH: 189,
        EQUALS: 187,
        COMMA: 188,
        HYPHEN: 189,
        PERIOD: 190,
        SLASH: 191,
        APOSTROPHE: 192,
        TILDE: 192,
        SINGLE_QUOTE: 222,
        OPEN_SQUARE_BRACKET: 219,
        BACKSLASH: 220,
        CLOSE_SQUARE_BRACKET: 221
    }, a.extend(a.FE.DEFAULTS, {enter: a.FE.ENTER_BR, multiLine: 0, tabSpaces: 0}), a.FE.MODULES.keys = function (b) {
        function c(a) {
            b.opts.multiLine ? b.helpers.isIOS() || (a.preventDefault(), a.stopPropagation(), b.selection.isCollapsed() || b.selection.remove(), b.cursor.enter()) : (a.preventDefault(), a.stopPropagation())
        }

        function d(a) {
            a.preventDefault(), a.stopPropagation(), b.opts.multiLine && (b.selection.isCollapsed() || b.selection.remove(), b.cursor.enter(!0))
        }

        function e(a) {
            b.selection.isCollapsed() ? b.cursor.backspace() || (a.preventDefault(), a.stopPropagation(), z = !1) : (a.preventDefault(), a.stopPropagation(), b.selection.remove(), b.html.fillEmptyBlocks(), z = !1), b.placeholder.refresh()
        }

        function f(a) {
            a.preventDefault(), a.stopPropagation(), "" === b.selection.text() ? b.cursor.del() : b.selection.remove(), b.placeholder.refresh()
        }

        function g(c) {
            var d = b.selection.element();
            if (!b.helpers.isMobile() && (b.browser.mozilla || d && "A" == d.tagName)) {
                c.preventDefault(), c.stopPropagation(), b.selection.isCollapsed() || b.selection.remove();
                var e = b.markers.insert();
                if (e) {
                    var f = e.previousSibling, g = e.nextSibling;
                    !g && e.parentNode && "A" == e.parentNode.tagName ? (e.parentNode.insertAdjacentHTML("afterend", "&nbsp;" + a.FE.MARKERS), e.parentNode.removeChild(e)) : (f && f.nodeType == Node.TEXT_NODE && 1 == f.textContent.length && 160 == f.textContent.charCodeAt(0) ? f.textContent = f.textContent + " " : e.insertAdjacentHTML("beforebegin", "&nbsp;"), e.outerHTML = a.FE.MARKERS), b.selection.restore()
                }
            }
        }

        function h() {
            if (b.browser.mozilla && b.selection.isCollapsed() && !C) {
                var a = b.selection.ranges(0), c = a.startContainer, d = a.startOffset;
                c && c.nodeType == Node.TEXT_NODE && d <= c.textContent.length && d > 0 && 32 == c.textContent.charCodeAt(d - 1) && (b.selection.save(), b.spaces.normalize(), b.selection.restore())
            }
        }

        function i() {
            b.selection.isFull() && setTimeout(function () {
                var c = b.html.defaultTag();
                c ? b.$el.html("<" + c + ">" + a.FE.MARKERS + "<br/></" + c + ">") : b.$el.html(a.FE.MARKERS + "<br/>"), b.selection.restore(), b.placeholder.refresh(), b.button.bulkRefresh(), b.undo.saveStep()
            }, 0)
        }

        function j(a) {
            if (b.opts.tabSpaces > 0) if (b.selection.isCollapsed()) {
                b.undo.saveStep(), a.preventDefault(), a.stopPropagation();
                for (var c = "", d = 0; d < b.opts.tabSpaces; d++) c += "&nbsp;";
                b.html.insert(c), b.placeholder.refresh(), b.undo.saveStep()
            } else a.preventDefault(), a.stopPropagation(), a.shiftKey ? b.commands.outdent() : b.commands.indent()
        }

        function k(a) {
            C = !1
        }

        function l() {
            return C
        }

        function m(h) {
            b.events.disableBlur(), z = !0;
            var i = h.which;
            if (16 === i) return !0;
            if (229 === i) return C = !0, !0;
            C = !1;
            var k = t(i) && !r(h), l = i == a.FE.KEYCODE.BACKSPACE || i == a.FE.KEYCODE.DELETE;
            if ((b.selection.isFull() && !b.opts.keepFormatOnDelete && !b.placeholder.isVisible() || l && b.placeholder.isVisible() && b.opts.keepFormatOnDelete) && (k || l)) {
                var m = b.html.defaultTag();
                if (m ? b.$el.html("<" + m + ">" + a.FE.MARKERS + "<br/></" + m + ">") : b.$el.html(a.FE.MARKERS + "<br/>"), b.selection.restore(), !t(i)) return h.preventDefault(), !0
            }
            i == a.FE.KEYCODE.ENTER ? h.shiftKey ? d(h) : c(h) : i != a.FE.KEYCODE.BACKSPACE || r(h) || h.altKey ? i != a.FE.KEYCODE.DELETE || r(h) || h.altKey ? i == a.FE.KEYCODE.SPACE ? g(h) : i == a.FE.KEYCODE.TAB ? j(h) : r(h) || !t(h.which) || b.selection.isCollapsed() || h.ctrlKey || b.selection.remove() : b.placeholder.isVisible() ? (h.preventDefault(), h.stopPropagation()) : f(h) : b.placeholder.isVisible() ? (h.preventDefault(), h.stopPropagation()) : e(h), b.events.enableBlur()
        }

        function n(a) {
            for (var c = b.doc.createTreeWalker(a, NodeFilter.SHOW_TEXT, b.node.filter(function (a) {
                return /\u200B/gi.test(a.textContent)
            }), !1); c.nextNode();) {
                var d = c.currentNode;
                d.textContent = d.textContent.replace(/\u200B/gi, "")
            }
        }

        function o() {
            if (!b.$wp) return !0;
            var c;
            b.opts.height || b.opts.heightMax ? (c = b.position.getBoundingRect().top, b.helpers.isIOS() && (c -= b.helpers.scrollTop()), b.opts.iframe && (c += b.$iframe.offset().top), c > b.$wp.offset().top - b.helpers.scrollTop() + b.$wp.height() - 20 && b.$wp.scrollTop(c + b.$wp.scrollTop() - (b.$wp.height() + b.$wp.offset().top) + b.helpers.scrollTop() + 20)) : (c = b.position.getBoundingRect().top, b.opts.toolbarBottom && (c += b.opts.toolbarStickyOffset), b.helpers.isIOS() && (c -= b.helpers.scrollTop()), b.opts.iframe && (c += b.$iframe.offset().top), c += b.opts.toolbarStickyOffset, c > b.o_win.innerHeight - 20 && a(b.o_win).scrollTop(c + b.helpers.scrollTop() - b.o_win.innerHeight + 20), c = b.position.getBoundingRect().top, b.opts.toolbarBottom || (c -= b.opts.toolbarStickyOffset), b.helpers.isIOS() && (c -= b.helpers.scrollTop()), b.opts.iframe && (c += b.$iframe.offset().top), c < b.$tb.height() + 20 && a(b.o_win).scrollTop(c + b.helpers.scrollTop() - b.$tb.height() - 20))
        }

        function p() {
            var c = b.selection.element(), d = b.node.blockParent(c);
            if (d && "DIV" == d.tagName && b.selection.info(d).atStart) {
                var e = b.html.defaultTag();
                d.previousSibling && "DIV" != d.previousSibling.tagName && e && "div" != e && (b.selection.save(), a(d).replaceWith("<" + e + ">" + d.innerHTML + "</" + e + ">"), b.selection.restore())
            }
        }

        function q(c) {
            if (b.helpers.isAndroid && b.browser.mozilla) return !0;
            if (C) return C = !1, !1;
            if (!b.selection.isCollapsed()) return !0;
            if (c && (c.which === a.FE.KEYCODE.META || c.which == a.FE.KEYCODE.CTRL)) return !0;
            if (c && s(c.which)) return !0;
            c && c.which == a.FE.KEYCODE.ENTER && b.helpers.isIOS() && p(), c && (c.which == a.FE.KEYCODE.ENTER || c.which == a.FE.KEYCODE.BACKSPACE || c.which >= 37 && c.which <= 40 && !b.browser.msie) && (c.which == a.FE.KEYCODE.BACKSPACE && z || o()), b.html.cleanBRs(!0, !0);
            var d = function (a) {
                if (!a) return !1;
                var b = a.innerHTML;
                return b = b.replace(/<span[^>]*? class\s*=\s*["']?fr-marker["']?[^>]+>\u200b<\/span>/gi, ""), !!(b && /\u200B/.test(b) && b.replace(/\u200B/gi, "").length > 0)
            }, e = function (a) {
                var c = /[\u3041-\u3096\u30A0-\u30FF\u4E00-\u9FFF\u3130-\u318F\uAC00-\uD7AF]/gi;
                return !b.helpers.isIOS() || 0 === ((a.textContent || "").match(c) || []).length
            }, f = b.selection.element();
            d(f) && !b.node.hasClass(f, "fr-marker") && "IFRAME" != f.tagName && e(f) && (b.selection.save(), n(f), b.selection.restore())
        }

        function r(a) {
            if (navigator.userAgent.indexOf("Mac OS X") != -1) {
                if (a.metaKey && !a.altKey) return !0
            } else if (a.ctrlKey && !a.altKey) return !0;
            return !1
        }

        function s(b) {
            if (b >= a.FE.KEYCODE.ARROW_LEFT && b <= a.FE.KEYCODE.ARROW_DOWN) return !0
        }

        function t(c) {
            if (c >= a.FE.KEYCODE.ZERO && c <= a.FE.KEYCODE.NINE) return !0;
            if (c >= a.FE.KEYCODE.NUM_ZERO && c <= a.FE.KEYCODE.NUM_MULTIPLY) return !0;
            if (c >= a.FE.KEYCODE.A && c <= a.FE.KEYCODE.Z) return !0;
            if (b.browser.webkit && 0 === c) return !0;
            switch (c) {
                case a.FE.KEYCODE.SPACE:
                case a.FE.KEYCODE.QUESTION_MARK:
                case a.FE.KEYCODE.NUM_PLUS:
                case a.FE.KEYCODE.NUM_MINUS:
                case a.FE.KEYCODE.NUM_PERIOD:
                case a.FE.KEYCODE.NUM_DIVISION:
                case a.FE.KEYCODE.SEMICOLON:
                case a.FE.KEYCODE.FF_SEMICOLON:
                case a.FE.KEYCODE.DASH:
                case a.FE.KEYCODE.EQUALS:
                case a.FE.KEYCODE.FF_EQUALS:
                case a.FE.KEYCODE.COMMA:
                case a.FE.KEYCODE.PERIOD:
                case a.FE.KEYCODE.SLASH:
                case a.FE.KEYCODE.APOSTROPHE:
                case a.FE.KEYCODE.SINGLE_QUOTE:
                case a.FE.KEYCODE.OPEN_SQUARE_BRACKET:
                case a.FE.KEYCODE.BACKSLASH:
                case a.FE.KEYCODE.CLOSE_SQUARE_BRACKET:
                    return !0;
                default:
                    return !1
            }
        }

        function u(c) {
            var d = c.which;
            return !!(r(c) || d >= 37 && d <= 40 || !t(d) && d != a.FE.KEYCODE.DELETE && d != a.FE.KEYCODE.BACKSPACE && d != a.FE.KEYCODE.ENTER) || (A || (B = b.snapshot.get()), clearTimeout(A), void(A = setTimeout(function () {
                A = null, b.undo.saveStep()
            }, Math.max(250, b.opts.typingTimer))))
        }

        function v(a) {
            var c = a.which;
            return !!(r(a) || c >= 37 && c <= 40) || void(B && A && (b.undo.saveStep(B), B = null))
        }

        function w() {
            A && (clearTimeout(A), b.undo.saveStep(), B = null)
        }

        function x(b) {
            var c = b.which;
            return r(b) || c == a.FE.KEYCODE.F5
        }

        function y() {
            if (b.events.on("keydown", u), b.events.on("input", h), b.events.on("keyup input", v), b.events.on("keypress", k), b.events.on("keydown", m), b.events.on("keyup", q), b.events.on("html.inserted", q), b.events.on("cut", i), !b.browser.edge && b.el.msGetInputContext) try {
                b.el.msGetInputContext().addEventListener("MSCandidateWindowShow", function () {
                    C = !0
                }), b.el.msGetInputContext().addEventListener("MSCandidateWindowHide", function () {
                    C = !1, q()
                })
            } catch (a) {
            }
        }

        var z, A, B, C = !1;
        return {_init: y, ctrlKey: r, isCharacter: t, isArrow: s, forceUndo: w, isIME: l, isBrowserAction: x}
    }, a.FE.MODULES.accessibility = function (b) {
        function c(a) {
            if (a && a.length) {
                a.data("blur-event-set") || a.parents(".fr-popup").length || (b.events.$on(a, "blur", function (c) {
                    var d = a.parents(".fr-toolbar, .fr-popup").data("instance") || b;
                    d.events.blurActive() && d.events.trigger("blur"), d.events.enableBlur()
                }, !0), a.data("blur-event-set", !0));
                var c = a.parents(".fr-toolbar, .fr-popup").data("instance") || b;
                c.events.disableBlur(), a.focus(), b.shared.$f_el = a
            }
        }

        function d(a, b) {
            var d = b ? "last" : "first",
                e = a.find("button:visible:not(.fr-disabled), .fr-group span.fr-command:visible")[d]();
            if (e.length) return c(e), !0
        }

        function e(a) {
            return a.is("input, textarea") && g(), b.events.disableBlur(), a.focus(), !0
        }

        function f(a, c) {
            var d = a.find("input, textarea, button, select").filter(":visible").not(":disabled").filter(c ? ":last" : ":first");
            if (d.length) return e(d);
            if (b.shared.with_kb) {
                var f = a.find(".fr-active-item:visible:first");
                if (f.length) return e(f);
                var g = a.find("[tabIndex]:visible:first");
                if (g.length) return e(g)
            }
        }

        function g() {
            0 === b.$el.find(".fr-marker").length && b.core.hasFocus() && b.selection.save()
        }

        function h(a) {
            a.$el.find(".fr-marker").length && (a.events.disableBlur(), a.selection.restore(), a.events.enableBlur())
        }

        function i(a) {
            var c = a.children().not(".fr-buttons");
            c.data("mouseenter-event-set") || (b.events.$on(c, "mouseenter", "[tabIndex]", function (d) {
                var e = a.data("instance") || b;
                if (!F) return d.stopPropagation(), void d.preventDefault();
                var f = c.find(":focus:first");
                f.length && !f.is("input, button, textarea") && (e.events.disableBlur(), f.blur(), e.events.disableBlur(), e.events.focus())
            }), c.data("mouseenter-event-set", !0)), !f(c) && b.shared.with_kb && d(a.find(".fr-buttons"))
        }

        function j(a) {
            b.core.hasFocus() || (b.events.disableBlur(), b.events.focus()), b.accessibility.saveSelection(), b.events.disableBlur(), b.$el.blur(), b.selection.clear(), b.events.disableBlur(), b.shared.with_kb ? a.find(".fr-command[tabIndex]:first").focus() : a.find("[tabIndex]:first").focus()
        }

        function k() {
            var a = b.popups.areVisible();
            if (a) {
                var c = a.find(".fr-buttons");
                return c.find("button:focus, .fr-group span:focus").length ? !d(a.data("instance").$tb) : !d(c)
            }
            return !d(b.$tb)
        }

        function l() {
            var a = null;
            return b.shared.$f_el.is(".fr-dropdown.fr-active") ? a = b.shared.$f_el : b.shared.$f_el.closest(".fr-dropdown-menu").prev().is(".fr-dropdown.fr-active") && (a = b.shared.$f_el.closest(".fr-dropdown-menu").prev()), a
        }

        function m(e, g, h) {
            if (b.shared.$f_el) {
                var i = l();
                i && (b.button.click(i), b.shared.$f_el = i);
                var j = e.find("button:visible:not(.fr-disabled), .fr-group span.fr-command:visible"),
                    k = j.index(b.shared.$f_el);
                if (0 == k && !h || k == j.length - 1 && h) {
                    var m;
                    if (g) {
                        if (e.parent().is(".fr-popup")) {
                            var n = e.parent().children().not(".fr-buttons");
                            m = !f(n, !h)
                        }
                        m === !1 && (b.shared.$f_el = null)
                    }
                    g && m === !1 || d(e, !h)
                } else c(a(j.get(k + (h ? 1 : -1))));
                return !1
            }
        }

        function n(a, b) {
            return m(a, b, !0)
        }

        function o(a, b) {
            return m(a, b)
        }

        function p(a) {
            if (b.shared.$f_el) {
                if (b.shared.$f_el.is(".fr-dropdown.fr-active")) {
                    var d;
                    return d = a ? b.shared.$f_el.next().find(".fr-command:not(.fr-disabled)").first() : b.shared.$f_el.next().find(".fr-command:not(.fr-disabled)").last(), c(d), !1
                }
                if (b.shared.$f_el.is("a.fr-command")) {
                    var d;
                    return d = a ? b.shared.$f_el.closest("li").nextAll(":visible:first").find(".fr-command:not(.fr-disabled)").first() : b.shared.$f_el.closest("li").prevAll(":visible:first").find(".fr-command:not(.fr-disabled)").first(), d.length || (d = a ? b.shared.$f_el.closest(".fr-dropdown-menu").find(".fr-command:not(.fr-disabled)").first() : b.shared.$f_el.closest(".fr-dropdown-menu").find(".fr-command:not(.fr-disabled)").last()), c(d), !1
                }
            }
        }

        function q() {
            return b.shared.$f_el && b.shared.$f_el.is(".fr-dropdown:not(.fr-active)") ? s() : p(!0)
        }

        function r() {
            return p()
        }

        function s() {
            if (b.shared.$f_el) {
                if (b.shared.$f_el.hasClass("fr-dropdown")) b.button.click(b.shared.$f_el); else if (b.shared.$f_el.is("button.fr-back")) {
                    b.opts.toolbarInline && (b.events.disableBlur(), b.events.focus());
                    var a = b.popups.areVisible(b);
                    a && (b.shared.with_kb = !1), b.button.click(b.shared.$f_el), z(a)
                } else {
                    if (b.events.disableBlur(), b.button.click(b.shared.$f_el), b.shared.$f_el.attr("data-popup")) {
                        var c = b.popups.areVisible(b);
                        c && c.data("popup-button", b.shared.$f_el)
                    } else if (b.shared.$f_el.attr("data-modal")) {
                        var d = b.modals.areVisible(b);
                        d && d.data("modal-button", b.shared.$f_el)
                    }
                    b.shared.$f_el = null
                }
                return !1
            }
        }

        function t() {
            b.shared.$f_el && (b.events.disableBlur(), b.shared.$f_el.blur(), b.shared.$f_el = null), b.events.trigger("toolbar.focusEditor") !== !1 && (b.events.disableBlur(), b.events.focus())
        }

        function u(a) {
            if (b.shared.$f_el) {
                var d = l();
                return d ? (b.button.click(d), c(d)) : a.parent().find(".fr-back:visible").length ? (b.shared.with_kb = !1, b.opts.toolbarInline && (b.events.disableBlur(), b.events.focus()), b.button.exec(a.parent().find(".fr-back:visible:first")), z(a.parent())) : b.shared.$f_el.is("button, .fr-group span") && (a.parent().is(".fr-popup") ? (h(b), b.shared.$f_el = null, b.events.trigger("toolbar.esc") !== !1 && (b.popups.hide(a.parent()), b.opts.toolbarInline && b.toolbar.showInline(null, !0), z(a.parent()))) : t()), !1
            }
        }

        function v(c, d) {
            var e = navigator.userAgent.indexOf("Mac OS X") != -1 ? c.metaKey : c.ctrlKey, f = c.which, g = !1;
            return f != a.FE.KEYCODE.TAB || e || c.shiftKey || c.altKey ? f != a.FE.KEYCODE.ARROW_RIGHT || e || c.shiftKey || c.altKey ? f != a.FE.KEYCODE.TAB || e || !c.shiftKey || c.altKey ? f != a.FE.KEYCODE.ARROW_LEFT || e || c.shiftKey || c.altKey ? f != a.FE.KEYCODE.ARROW_UP || e || c.shiftKey || c.altKey ? f != a.FE.KEYCODE.ARROW_DOWN || e || c.shiftKey || c.altKey ? f != a.FE.KEYCODE.ENTER || e || c.shiftKey || c.altKey ? f != a.FE.KEYCODE.ESC || e || c.shiftKey || c.altKey ? f != a.FE.KEYCODE.F10 || e || c.shiftKey || !c.altKey || (g = k()) : g = u(d) : g = s() : g = q() : g = r() : g = o(d) : g = o(d, !0) : g = n(d) : g = n(d, !0), b.shared.$f_el || void 0 !== g || (g = !0), !g && b.keys.isBrowserAction(c) && (g = !0), !!g || (c.preventDefault(), c.stopPropagation(), !1)
        }

        function w(c) {
            c && c.length && (b.events.$on(c, "keydown", function (d) {
                if (!a(d.target).is("a.fr-command, button.fr-command, .fr-group span.fr-command")) return !0;
                var e = c.parents(".fr-popup").data("instance") || c.data("instance") || b;
                b.shared.with_kb = !0;
                var f = e.accessibility.exec(d, c);
                return b.shared.with_kb = !1, f
            }, !0), b.events.$on(c, "mouseenter", "[tabIndex]", function (d) {
                var e = c.parents(".fr-popup").data("instance") || c.data("instance") || b;
                if (!F) return d.stopPropagation(), void d.preventDefault();
                var f = a(d.currentTarget);
                e.shared.$f_el && e.shared.$f_el.not(f) && e.accessibility.focusEditor()
            }, !0))
        }

        function x(a) {
            var c = b.popups.get(a), d = y(a);
            w(c.find(".fr-buttons")), b.events.$on(c, "mouseenter", "tabIndex", d._tiMouseenter, !0), b.events.$on(c.children().not(".fr-buttons"), "keydown", "[tabIndex]", d._tiKeydown, !0), b.popups.onHide(a, function () {
                h(c.data("instance") || b)
            }), b.popups.onShow(a, function () {
                F = !1, setTimeout(function () {
                    F = !0
                }, 0)
            })
        }

        function y(c) {
            var e = b.popups.get(c);
            return {
                _tiKeydown: function (g) {
                    var i = e.data("instance") || b;
                    if (i.events.trigger("popup.tab", [g]) === !1) return !1;
                    var j = g.which, k = e.find(":focus:first");
                    if (a.FE.KEYCODE.TAB == j) {
                        g.preventDefault();
                        var l = e.children().not(".fr-buttons"),
                            m = l.find("input, textarea, button, select").filter(":visible").not(".fr-no-touch input, .fr-no-touch textarea, .fr-no-touch button, .fr-no-touch select, :disabled").toArray(),
                            n = m.indexOf(this) + (g.shiftKey ? -1 : 1);
                        if (0 <= n && n < m.length) return i.events.disableBlur(), a(m[n]).focus(), g.stopPropagation(), !1;
                        var o = e.find(".fr-buttons");
                        if (o.length && d(o, !!g.shiftKey)) return g.stopPropagation(), !1;
                        if (f(l)) return g.stopPropagation(), !1
                    } else {
                        if (a.FE.KEYCODE.ENTER != j) return a.FE.KEYCODE.ESC == j ? (g.preventDefault(), g.stopPropagation(), h(i), i.popups.isVisible(c) && e.find(".fr-back:visible").length ? (i.opts.toolbarInline && (i.events.disableBlur(), i.events.focus()), i.button.exec(e.find(".fr-back:visible:first")), z(e)) : i.popups.isVisible(c) && e.find(".fr-dismiss:visible").length ? i.button.exec(e.find(".fr-dismiss:visible:first")) : (i.popups.hide(c), i.opts.toolbarInline && i.toolbar.showInline(null, !0), z(e)), !1) : a.FE.KEYCODE.SPACE == j && (k.is(".fr-submit") || k.is(".fr-dismiss")) ? (g.preventDefault(), g.stopPropagation(), i.events.disableBlur(), i.button.exec(k), !0) : i.keys.isBrowserAction(g) ? void g.stopPropagation() : k.is("input[type=text], textarea") ? void g.stopPropagation() : a.FE.KEYCODE.SPACE == j && (k.is(".fr-link-attr") || k.is("input[type=file]")) ? void g.stopPropagation() : (g.stopPropagation(), g.preventDefault(), !1);
                        var p = null;
                        e.find(".fr-submit:visible").length > 0 ? p = e.find(".fr-submit:visible:first") : e.find(".fr-dismiss:visible").length && (p = e.find(".fr-dismiss:visible:first")), p && (g.preventDefault(), g.stopPropagation(), i.events.disableBlur(), i.button.exec(p))
                    }
                }, _tiMouseenter: function (a) {
                    var c = e.data("instance") || b;
                    C(c)
                }
            }
        }

        function z(a) {
            var b = a.data("popup-button");
            b && setTimeout(function () {
                c(b), a.data("popup-button", null)
            }, 0)
        }

        function A(a) {
            var b = a.data("modal-button");
            b && setTimeout(function () {
                c(b), a.data("modal-button", null)
            }, 0)
        }

        function B() {
            return null != b.shared.$f_el
        }

        function C(a) {
            var c = b.popups.areVisible(a);
            c && c.data("popup-button", null)
        }

        function D(c) {
            var d = navigator.userAgent.indexOf("Mac OS X") != -1 ? c.metaKey : c.ctrlKey, e = c.which;
            if (e == a.FE.KEYCODE.F10 && !d && !c.shiftKey && c.altKey) {
                b.shared.with_kb = !0;
                var g = b.popups.areVisible(b), h = !1;
                return g && (h = f(g.children().not(".fr-buttons"))), h || k(), b.shared.with_kb = !1, c.preventDefault(), c.stopPropagation(), !1
            }
            return !0
        }

        function E() {
            b.$wp ? b.events.on("keydown", D, !0) : b.events.$on(b.$win, "keydown", D, !0), b.events.on("mousedown", function (a) {
                C(b), b.shared.$f_el && (h(b), a.stopPropagation(), b.events.disableBlur(), b.shared.$f_el = null)
            }, !0), b.events.on("blur", function (a) {
                b.shared.$f_el = null, C(b)
            }, !0)
        }

        var F = !0;
        return {
            _init: E,
            registerPopup: x,
            registerToolbar: w,
            focusToolbarElement: c,
            focusToolbar: d,
            focusContent: f,
            focusPopup: i,
            focusModal: j,
            focusEditor: t,
            focusPopupButton: z,
            focusModalButton: A,
            hasFocus: B,
            exec: v,
            saveSelection: g,
            restoreSelection: h
        }
    }, a.FE.MODULES.format = function (b) {
        function c(a, b) {
            var c = "<" + a;
            for (var d in b) b.hasOwnProperty(d) && (c += " " + d + '="' + b[d] + '"');
            return c += ">"
        }

        function d(a) {
            return "</" + a + ">"
        }

        function e(a, b) {
            var c = a;
            for (var d in b) b.hasOwnProperty(d) && (a += "id" == d ? "#" + b[d] : "class" == d ? "." + b[d] : "[" + d + '="' + b[d] + '"]');
            return c
        }

        function f(a, b) {
            return !(!a || a.nodeType != Node.ELEMENT_NODE) && (a.matches || a.matchesSelector || a.msMatchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.oMatchesSelector).call(a, b)
        }

        function g(d, e, f) {
            if (d) {
                if (b.node.isBlock(d)) return g(d.firstChild, e, f), !1;
                for (var h = a(c(e, f)).insertBefore(d), i = d; i && !a(i).is(".fr-marker") && 0 == a(i).find(".fr-marker").length;) {
                    var j = i;
                    i = i.nextSibling, h.append(j)
                }
                if (i) a(i).find(".fr-marker").length && g(i.firstChild, e, f); else {
                    for (var k = h.get(0).parentNode; k && !k.nextSibling && !b.node.isElement(k);) k = k.parentNode;
                    if (k) {
                        var l = k.nextSibling;
                        l && (b.node.isBlock(l) ? g(l.firstChild, e, f) : g(l, e, f))
                    }
                }
                h.is(":empty") && h.remove()
            }
        }

        function h(h, i) {
            if ("undefined" == typeof i && (i = {}), i.style && delete i.style, b.selection.isCollapsed()) {
                b.markers.insert();
                var j = b.$el.find(".fr-marker");
                j.replaceWith(c(h, i) + a.FE.INVISIBLE_SPACE + a.FE.MARKERS + d(h)), b.selection.restore()
            } else {
                b.selection.save();
                var k = b.$el.find('.fr-marker[data-type="true"]').get(0).nextSibling;
                g(k, h, i);
                var l;
                do l = b.$el.find(e(h, i) + " > " + e(h, i)), l.each(function () {
                    a(this).replaceWith(this.innerHTML)
                }); while (l.length);
                b.el.normalize();
                for (var m = b.el.querySelectorAll(".fr-marker"), n = 0; n < m.length; n++) {
                    var o = a(m[n]);
                    1 == o.data("type") ? f(o.get(0).nextSibling, e(h, i)) && o.next().prepend(o) : f(o.get(0).previousSibling, e(h, i)) && o.prev().append(o)
                }
                b.selection.restore()
            }
        }

        function i(a, c, d, g) {
            if (!g) {
                var h = !1;
                if (a.data("type") === !0) for (; b.node.isFirstSibling(a.get(0)) && !a.parent().is(b.$el);) a.parent().before(a), h = !0; else if (a.data("type") === !1) for (; b.node.isLastSibling(a.get(0)) && !a.parent().is(b.$el);) a.parent().after(a), h = !0;
                if (h) return !0
            }
            if (a.parents(c).length || "undefined" == typeof c) {
                var i = "", j = "", k = a.parent();
                if (k.is(b.$el) || b.node.isBlock(k.get(0))) return !1;
                for (; "undefined" == typeof c && !b.node.isBlock(k.parent().get(0)) || "undefined" != typeof c && !f(k.get(0), e(c, d));) i += b.node.closeTagString(k.get(0)), j = b.node.openTagString(k.get(0)) + j, k = k.parent();
                var l = a.get(0).outerHTML;
                a.replaceWith('<span id="mark"></span>');
                var m = k.html().replace(/<span id="mark"><\/span>/, i + b.node.closeTagString(k.get(0)) + j + l + i + b.node.openTagString(k.get(0)) + j);
                return k.replaceWith(b.node.openTagString(k.get(0)) + m + b.node.closeTagString(k.get(0))), !0
            }
            return !1
        }

        function j(c, d, g, h) {
            for (var i = b.node.contents(c.get(0)), k = 0; k < i.length; k++) {
                var l = i[k];
                b.node.hasClass(l, "fr-marker") ? d = (d + 1) % 2 : d ? a(l).find(".fr-marker").length > 0 ? d = j(a(l), d, g, h) : (a(a(l).find(g || "*").get().reverse()).each(function () {
                    b.node.isBlock(this) || b.node.isVoid(this) || a(this).replaceWith(this.innerHTML)
                }), "undefined" == typeof g && l.nodeType == Node.ELEMENT_NODE && !b.node.isVoid(l) && !b.node.isBlock(l) || f(l, e(g, h)) ? a(l).replaceWith(l.innerHTML) : "undefined" == typeof g && l.nodeType == Node.ELEMENT_NODE && b.node.isBlock(l) && b.node.clearAttributes(l)) : a(l).find(".fr-marker").length > 0 && (d = j(a(l), d, g, h))
            }
            return d
        }

        function k(c, d) {
            "undefined" == typeof d && (d = {}), d.style && delete d.style;
            var e = b.selection.isCollapsed();
            b.selection.save();
            for (var f = !0; f;) {
                f = !1;
                for (var g = b.$el.find(".fr-marker"), h = 0; h < g.length; h++) if (i(a(g[h]), c, d, e)) {
                    f = !0;
                    break
                }
            }
            j(b.$el, 0, c, d), e && b.$el.find(".fr-marker").before(a.FE.INVISIBLE_SPACE).after(a.FE.INVISIBLE_SPACE), b.html.cleanEmptyTags(), b.el.normalize(), b.selection.restore()
        }

        function l(a, b) {
            q(a, b) ? k(a, b) : h(a, b)
        }

        function m(b, c) {
            var d = a(b);
            d.css(c, ""), "" === d.attr("style") && d.replaceWith(d.html())
        }

        function n(b, c) {
            return 0 === a(b).attr("style").indexOf(c + ":") || a(b).attr("style").indexOf(";" + c + ":") >= 0 || a(b).attr("style").indexOf("; " + c + ":") >= 0
        }

        function o(c, d) {
            if (b.selection.isCollapsed()) {
                b.markers.insert();
                var e = b.$el.find(".fr-marker"), f = e.parent();
                if (b.node.openTagString(f.get(0)) == '<span style="' + c + ": " + f.css(c) + ';">') if (b.node.isEmpty(f.get(0))) f.replaceWith('<span style="' + c + ": " + d + ';">' + a.FE.INVISIBLE_SPACE + a.FE.MARKERS + "</span>"); else {
                    var h = {};
                    h[c] = d, i(e, "span", h, !0), e = b.$el.find(".fr-marker"), e.replaceWith('<span style="' + c + ": " + d + ';">' + a.FE.INVISIBLE_SPACE + a.FE.MARKERS + "</span>")
                } else b.node.isEmpty(f.get(0)) && f.is("span") ? (e.replaceWith(a.FE.MARKERS), f.css(c, d)) : e.replaceWith('<span style="' + c + ": " + d + ';">' + a.FE.INVISIBLE_SPACE + a.FE.MARKERS + "</span>");
                b.selection.restore()
            } else {
                b.selection.save();
                for (var j = b.$el.find(".fr-marker"), k = 0; k < j.length; k++) {
                    var e = a(j[k]);
                    if (e.data("type") === !0) for (; b.node.isFirstSibling(e.get(0)) && !e.parent().is(b.$el);) e.parent().before(e); else for (; b.node.isLastSibling(e.get(0)) && !e.parent().is(b.$el);) e.parent().after(e)
                }
                var l = b.$el.find('.fr-marker[data-type="true"]').get(0).nextSibling, o = {class: "fr-unprocessed"};
                for (d && (o.style = c + ": " + d + ";"), g(l, "span", o), b.$el.find(".fr-marker + .fr-unprocessed").each(function () {
                    a(this).prepend(a(this).prev())
                }), b.$el.find(".fr-unprocessed + .fr-marker").each(function () {
                    a(this).prev().append(this)
                }); b.$el.find("span.fr-unprocessed").length > 0;) {
                    var p = b.$el.find("span.fr-unprocessed:first").removeClass("fr-unprocessed");
                    if (p.parent().get(0).normalize(), p.parent().is("span") && 1 == p.parent().get(0).childNodes.length) {
                        p.parent().css(c, d);
                        var q = p;
                        p = p.parent(), q.replaceWith(q.html())
                    }
                    for (var r = p.find("span"), k = r.length - 1; k >= 0; k--) m(r[k], c);
                    var s = p.parentsUntil(b.$el, "span[style]").filter(function () {
                        return n(this, c)
                    });
                    if (s.length) {
                        var t = "", u = "", v = "", w = "", x = p.get(0);
                        do x = x.parentNode, a(x).addClass("fr-split"), t += b.node.closeTagString(x), u = b.node.openTagString(a(x).clone().addClass("fr-split").get(0)) + u, s.get(0) != x && (v += b.node.closeTagString(x), w = b.node.openTagString(a(x).clone().addClass("fr-split").get(0)) + w); while (s.get(0) != x);
                        var y = t + b.node.openTagString(a(s.get(0)).clone().css(c, d || "").get(0)) + w + p.css(c, "").get(0).outerHTML + v + "</span>" + u;
                        p.replaceWith('<span id="fr-break"></span>');
                        var z = s.get(0).outerHTML;
                        a(s.get(0)).replaceWith(z.replace(/<span id="fr-break"><\/span>/g, y))
                    }
                }
                for (; b.$el.find(".fr-split:empty").length > 0;) b.$el.find(".fr-split:empty").remove();
                b.$el.find(".fr-split").removeClass("fr-split"), b.$el.find('span[style=""]').removeAttr("style"), b.$el.find('span[class=""]').removeAttr("class"), b.html.cleanEmptyTags(), a(b.$el.find("span").get().reverse()).each(function () {
                    this.attributes && 0 != this.attributes.length || a(this).replaceWith(this.innerHTML)
                }), b.el.normalize();
                var A = b.$el.find("span[style] + span[style]");
                for (k = 0; k < A.length; k++) {
                    var B = a(A[k]), C = a(A[k]).prev();
                    B.get(0).previousSibling == C.get(0) && b.node.openTagString(B.get(0)) == b.node.openTagString(C.get(0)) && (B.prepend(C.html()), C.remove())
                }
                b.el.normalize(), b.selection.restore()
            }
        }

        function p(a) {
            o(a, null)
        }

        function q(a, c) {
            "undefined" == typeof c && (c = {}), c.style && delete c.style;
            var d = b.selection.ranges(0), g = d.startContainer;
            g.nodeType == Node.ELEMENT_NODE && g.childNodes.length > 0 && g.childNodes[d.startOffset] && (g = g.childNodes[d.startOffset]);
            for (var h = g; h && h.nodeType == Node.ELEMENT_NODE && !f(h, e(a, c));) h = h.firstChild;
            if (h && h.nodeType == Node.ELEMENT_NODE && f(h, e(a, c))) return !0;
            var i = g;
            for (i && i.nodeType != Node.ELEMENT_NODE && (i = i.parentNode); i && i.nodeType == Node.ELEMENT_NODE && i != b.el && !f(i, e(a, c));) i = i.parentNode;
            return !(!i || i.nodeType != Node.ELEMENT_NODE || i == b.el || !f(i, e(a, c)))
        }

        return {is: q, toggle: l, apply: h, remove: k, applyStyle: o, removeStyle: p}
    }, a.FE.COMMANDS = {
        bold: {
            title: "Bold", toggle: !0, refresh: function (a) {
                var b = this.format.is("strong");
                a.toggleClass("fr-active", b).attr("aria-pressed", b)
            }
        },
        italic: {
            title: "Italic", toggle: !0, refresh: function (a) {
                var b = this.format.is("em");
                a.toggleClass("fr-active", b).attr("aria-pressed", b)
            }
        },
        underline: {
            title: "Underline", toggle: !0, refresh: function (a) {
                var b = this.format.is("u");
                a.toggleClass("fr-active", b).attr("aria-pressed", b)
            }
        },
        strikeThrough: {
            title: "Strikethrough", toggle: !0, refresh: function (a) {
                var b = this.format.is("s");
                a.toggleClass("fr-active", b).attr("aria-pressed", b)
            }
        },
        subscript: {
            title: "Subscript", toggle: !0, refresh: function (a) {
                var b = this.format.is("sub");
                a.toggleClass("fr-active", b).attr("aria-pressed", b)
            }
        },
        superscript: {
            title: "Superscript", toggle: !0, refresh: function (a) {
                var b = this.format.is("sup");
                a.toggleClass("fr-active", b).attr("aria-pressed", b)
            }
        },
        outdent: {title: "Decrease Indent"},
        indent: {title: "Increase Indent"},
        undo: {title: "Undo", undo: !1, forcedRefresh: !0, disabled: !0},
        redo: {title: "Redo", undo: !1, forcedRefresh: !0, disabled: !0},
        insertHR: {title: "Insert Horizontal Line"},
        clearFormatting: {title: "Clear Formatting"},
        selectAll: {title: "Select All", undo: !1}
    }, a.FE.RegisterCommand = function (b, c) {
        a.FE.COMMANDS[b] = c
    }, a.FE.MODULES.commands = function (b) {
        function c(c, d) {
            if (b.events.trigger("commands.before", a.merge([c], d || [])) !== !1) {
                var e = a.FE.COMMANDS[c] && a.FE.COMMANDS[c].callback || h[c], f = !0, g = !1;
                a.FE.COMMANDS[c] && ("undefined" != typeof a.FE.COMMANDS[c].focus && (f = a.FE.COMMANDS[c].focus), "undefined" != typeof a.FE.COMMANDS[c].accessibilityFocus && (g = a.FE.COMMANDS[c].accessibilityFocus)), (!b.core.hasFocus() && f && !b.popups.areVisible() || !b.core.hasFocus() && g && b.accessibility.hasFocus()) && b.events.focus(!0), a.FE.COMMANDS[c] && a.FE.COMMANDS[c].undo !== !1 && (b.$el.find(".fr-marker").length && (b.events.disableBlur(), b.selection.restore()), b.undo.saveStep()), e && e.apply(b, a.merge([c], d || [])), b.events.trigger("commands.after", a.merge([c], d || [])), a.FE.COMMANDS[c] && a.FE.COMMANDS[c].undo !== !1 && b.undo.saveStep()
            }
        }

        function d(a, c) {
            b.format.toggle(c)
        }

        function e(c) {
            b.selection.save(), b.html.wrap(!0, !0, !0, !0), b.selection.restore();
            for (var d = b.selection.blocks(), e = 0; e < d.length; e++) if ("LI" != d[e].tagName && "LI" != d[e].parentNode.tagName) {
                var f = a(d[e]),
                    g = "rtl" == b.opts.direction || "rtl" == f.css("direction") ? "margin-right" : "margin-left",
                    h = b.helpers.getPX(f.css(g));
                f.css(g, Math.max(h + 20 * c, 0) || ""), f.removeClass("fr-temp-div")
            }
            b.selection.save(), b.html.unwrap(), b.selection.restore()
        }

        function f(a) {
            return function () {
                c(a)
            }
        }

        function g() {
            b.events.on("keydown", function (a) {
                var c = b.selection.element();
                if (c && "HR" == c.tagName && !b.keys.isArrow(a.which)) return a.preventDefault(), !1
            }), b.events.on("keyup", function (c) {
                var d = b.selection.element();
                if (d && "HR" == d.tagName) if (c.which == a.FE.KEYCODE.ARROW_LEFT || c.which == a.FE.KEYCODE.ARROW_UP) {
                    if (d.previousSibling) return b.node.isBlock(d.previousSibling) ? b.selection.setAtEnd(d.previousSibling) : a(d).before(a.FE.MARKERS), b.selection.restore(), !1
                } else if ((c.which == a.FE.KEYCODE.ARROW_RIGHT || c.which == a.FE.KEYCODE.ARROW_DOWN) && d.nextSibling) return b.node.isBlock(d.nextSibling) ? b.selection.setAtStart(d.nextSibling) : a(d).after(a.FE.MARKERS), b.selection.restore(), !1
            }), b.events.on("mousedown", function (a) {
                if (a.target && "HR" == a.target.tagName) return a.preventDefault(), a.stopPropagation(), !1
            }), b.events.on("mouseup", function (c) {
                var d = b.selection.element(), e = b.selection.endElement();
                d == e && d && "HR" == d.tagName && (d.nextSibling && (b.node.isBlock(d.nextSibling) ? b.selection.setAtStart(d.nextSibling) : a(d).after(a.FE.MARKERS)), b.selection.restore())
            })
        }

        var h = {
            bold: function () {
                d("bold", "strong")
            }, subscript: function () {
                d("subscript", "sub")
            }, superscript: function () {
                d("superscript", "sup")
            }, italic: function () {
                d("italic", "em")
            }, strikeThrough: function () {
                d("strikeThrough", "s")
            }, underline: function () {
                d("underline", "u")
            }, undo: function () {
                b.undo.run()
            }, redo: function () {
                b.undo.redo()
            }, indent: function () {
                e(1)
            }, outdent: function () {
                e(-1)
            }, show: function () {
                b.opts.toolbarInline && b.toolbar.showInline(null, !0)
            }, insertHR: function () {
                b.selection.remove();
                var a = "";
                b.core.isEmpty() && (a = "<br>", b.html.defaultTag() && (a = "<" + b.html.defaultTag() + ">" + a + "</" + b.html.defaultTag() + ">")), b.html.insert('<hr id="fr-just">' + a);
                var c = b.$el.find("hr#fr-just");
                c.removeAttr("id"), b.selection.setAfter(c.get(0), !1) || b.selection.setBefore(c.get(0), !1), b.selection.restore()
            }, clearFormatting: function () {
                b.format.remove()
            }, selectAll: function () {
                b.doc.execCommand("selectAll", !1, !1)
            }
        }, i = {};
        for (var j in h) h.hasOwnProperty(j) && (i[j] = f(j));
        return a.extend(i, {exec: c, _init: g})
    }, a.FE.MODULES.data = function (a) {
        function b(a) {
            return a
        }

        function c(a) {
            if (!a) return a;
            for (var c = "", f = b("charCodeAt"), g = b("fromCharCode"), h = l.indexOf(a[0]), i = 1; i < a.length - 2; i++) {
                for (var j = d(++h), k = a[f](i), m = ""; /[0-9-]/.test(a[i + 1]);) m += a[++i];
                m = parseInt(m, 10) || 0, k = e(k, j, m), k ^= h - 1 & 31, c += String[g](k)
            }
            return c
        }

        function d(a) {
            for (var b = a.toString(), c = 0, d = 0; d < b.length; d++) c += parseInt(b.charAt(d), 10);
            return c > 10 ? c % 9 + 1 : c
        }

        function e(a, b, c) {
            for (var d = Math.abs(c); d-- > 0;) a -= b;
            return c < 0 && (a += 123), a
        }

        function f(a) {
            return !(!a || "none" != a.css("display") || (a.remove(), 0))
        }

        function g() {
            return f(j) || f(k)
        }

        function h() {
            return !!a.$box && (a.$box.append(n(b(n("kTDD4spmKD1klaMB1C7A5RA1G3RA10YA5qhrjuvnmE1D3FD2bcG-7noHE6B2JB4C3xXA8WF6F-10RG2C3G3B-21zZE3C3H3xCA16NC4DC1f1hOF1MB3B-21whzQH5UA2WB10kc1C2F4D3XC2YD4D1C4F3GF2eJ2lfcD-13HF1IE1TC11TC7WE4TA4d1A2YA6XA4d1A3yCG2qmB-13GF4A1B1KH1HD2fzfbeQC3TD9VE4wd1H2A20A2B-22ujB3nBG2A13jBC10D3C2HD5D1H1KB11uD-16uWF2D4A3F-7C9D-17c1E4D4B3d1D2CA6B2B-13qlwzJF2NC2C-13E-11ND1A3xqUA8UE6bsrrF-7C-22ia1D2CF2H1E2akCD2OE1HH1dlKA6PA5jcyfzB-22cXB4f1C3qvdiC4gjGG2H2gklC3D-16wJC1UG4dgaWE2D5G4g1I2H3B7vkqrxH1H2EC9C3E4gdgzKF1OA1A5PF5C4WWC3VA6XA4e1E3YA2YA5HE4oGH4F2H2IB10D3D2NC5G1B1qWA9PD6PG5fQA13A10XA4C4A3e1H2BA17kC-22cmOB1lmoA2fyhcptwWA3RA8A-13xB-11nf1I3f1B7GB3aD3pavFC10D5gLF2OG1LSB2D9E7fQC1F4F3wpSB5XD3NkklhhaE-11naKA9BnIA6D1F5bQA3A10c1QC6Kjkvitc2B6BE3AF3E2DA6A4JD2IC1jgA-64MB11D6C4==")))), j = a.$box.find("> div:last"), k = j.find("> a"), void("rtl" == a.opts.direction && j.css("left", "auto").css("right", 0)))
        }

        function i() {
            var c = a.opts.key || [""];
            "string" == typeof c && (c = [c]), a.ul = !0;
            for (var d = 0; d < c.length; d++) {
                var e = n(c[d]) || "";
                if (!(e !== n(b(n("mcVRDoB1BGILD7YFe1BTXBA7B6=="))) && e.indexOf(m, e.length - m.length) < 0 && [n("9qqG-7amjlwq=="), n("KA3B3C2A6D1D5H5H1A3=="), n("QzbzvxyB2yA-9m=="), n("naamngiA3dA-16xtE-11C-9B1H-8sc==")].indexOf(m) < 0)) {
                    a.ul = !1;
                    break
                }
            }
            a.ul === !0 && h(), a.events.on("contentChanged", function () {
                a.ul === !0 && g() && h()
            }), a.events.on("destroy", function () {
                j && j.length && j.remove()
            }, !0)
        }

        var j, k, l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", m = function () {
            for (var a = 0, b = document.domain, c = b.split("."), d = "_gd" + (new Date).getTime(); a < c.length - 1 && document.cookie.indexOf(d + "=" + d) == -1;) b = c.slice(-1 - ++a).join("."), document.cookie = d + "=" + d + ";domain=" + b + ";";
            return document.cookie = d + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=" + b + ";", (b || "").replace(/(^\.*)|(\.*$)/g, "")
        }(), n = b(c);
        return {_init: i}
    }, a.extend(a.FE.DEFAULTS, {
        pastePlain: !1,
        pasteDeniedTags: ["colgroup", "col"],
        pasteDeniedAttrs: ["class", "id", "style"],
        pasteAllowLocalImages: !1
    }), a.FE.MODULES.paste = function (b) {
        function c(c) {
            a.FE.copied_html = b.html.getSelected(), a.FE.copied_text = a("<div>").html(a.FE.copied_html).text(), "cut" == c.type && (b.undo.saveStep(), setTimeout(function () {
                b.selection.save(), b.html.wrap(), b.selection.restore(), b.events.focus(), b.undo.saveStep()
            }, 0))
        }

        function d(a) {
            if (o) return !1;
            if (a.originalEvent && (a = a.originalEvent), b.events.trigger("paste.before", [a]) === !1) return a.preventDefault(), !1;
            if (l = b.$win.scrollTop(), a && a.clipboardData && a.clipboardData.getData) {
                var c = "", d = a.clipboardData.types;
                if (b.helpers.isArray(d)) for (var f = 0; f < d.length; f++) c += d[f] + ";"; else c = d;
                if (m = "", /text\/html/.test(c) ? m = a.clipboardData.getData("text/html") : /text\/rtf/.test(c) && b.browser.safari ? m = a.clipboardData.getData("text/rtf") : /text\/plain/.test(c) && !this.browser.mozilla && (m = b.html.escapeEntities(a.clipboardData.getData("text/plain")).replace(/\n/g, "<br>")), "" !== m) return h(), a.preventDefault && (a.stopPropagation(), a.preventDefault()), !1;
                m = null
            }
            e()
        }

        function e() {
            b.selection.save(), b.events.disableBlur(), m = null, n ? n.html("") : (n = a('<div contenteditable="true" style="position: fixed; top: 0; left: -9999px; height: 100%; width: 0; word-break: break-all; overflow:hidden; z-index: 9999; line-height: 140%;" tabIndex="-1"></div>'), b.$box.after(n), b.events.on("destroy", function () {
                n.remove()
            })), n.focus(), b.win.setTimeout(h, 1)
        }

        function f(a) {
            a = a.replace(/<p(.*?)class="?'?MsoListParagraph"?'? ([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ul><li>$3</li></ul>"), a = a.replace(/<p(.*?)class="?'?NumberedText"?'? ([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ol><li>$3</li></ol>"), a = a.replace(/<p(.*?)class="?'?MsoListParagraphCxSpFirst"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ul><li$3>$5</li>"), a = a.replace(/<p(.*?)class="?'?NumberedTextCxSpFirst"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ol><li$3>$5</li>"), a = a.replace(/<p(.*?)class="?'?MsoListParagraphCxSpMiddle"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li>"), a = a.replace(/<p(.*?)class="?'?NumberedTextCxSpMiddle"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li>"), a = a.replace(/<p(.*?)class="?'?MsoListBullet"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li>"), a = a.replace(/<p(.*?)class="?'?MsoListParagraphCxSpLast"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li></ul>"), a = a.replace(/<p(.*?)class="?'?NumberedTextCxSpLast"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li></ol>"), a = a.replace(/<span([^<]*?)style="?'?mso-list:Ignore"?'?([\s\S]*?)>([\s\S]*?)<span/gi, "<span><span"), a = a.replace(/<!--\[if \!supportLists\]-->([\s\S]*?)<!--\[endif\]-->/gi, ""), a = a.replace(/<!\[if \!supportLists\]>([\s\S]*?)<!\[endif\]>/gi, ""), a = a.replace(/(\n|\r| class=(")?Mso[a-zA-Z0-9]+(")?)/gi, " "), a = a.replace(/<!--[\s\S]*?-->/gi, ""), a = a.replace(/<(\/)*(meta|link|span|\\?xml:|st1:|o:|font)(.*?)>/gi, "");
            for (var c = ["style", "script", "applet", "embed", "noframes", "noscript"], d = 0; d < c.length; d++) {
                var e = new RegExp("<" + c[d] + ".*?" + c[d] + "(.*?)>", "gi");
                a = a.replace(e, "")
            }
            a = a.replace(/&nbsp;/gi, " "), a = a.replace(/<td([^>]*)><\/td>/g, "<td$1><br></td>"), a = a.replace(/<th([^>]*)><\/th>/g, "<th$1><br></th>");
            var f;
            do f = a, a = a.replace(/<[^\/>][^>]*><\/[^>]+>/gi, ""); while (a != f);
            a = a.replace(/<lilevel([^1])([^>]*)>/gi, '<li data-indent="true"$2>'), a = a.replace(/<lilevel1([^>]*)>/gi, "<li$1>"), a = b.clean.html(a, b.opts.pasteDeniedTags, b.opts.pasteDeniedAttrs), a = a.replace(/<a>(.[^<]+)<\/a>/gi, "$1"), a = a.replace(/<br> */g, "<br>");
            var g = b.o_doc.createElement("div");
            g.innerHTML = a;
            for (var h = g.querySelectorAll("li[data-indent]"), d = 0; d < h.length; d++) {
                var i = h[d], j = i.previousElementSibling;
                if (j && "LI" == j.tagName) {
                    var k = j.querySelector(":scope > ul, :scope > ol");
                    k || (k = document.createElement("ul"), j.appendChild(k)), k.appendChild(i)
                } else i.removeAttribute("data-indent")
            }
            return b.html.cleanBlankSpaces(g), a = g.innerHTML
        }

        function g(a) {
            var c = b.doc.createElement("div");
            c.innerHTML = a;
            for (var d = c.querySelectorAll("p, div, h1, h2, h3, h4, h5, h6, pre, blockquote"), e = 0; e < d.length; e++) {
                var f = d[e];
                f.outerHTML = "<" + (b.html.defaultTag() || "DIV") + ">" + f.innerHTML + "</" + (b.html.defaultTag() || "DIV") + ">"
            }
            d = c.querySelectorAll("*:not(" + "p, div, h1, h2, h3, h4, h5, h6, pre, blockquote, ul, ol, li, table, tbody, thead, tr, td, br, img".split(",").join("):not(") + ")");
            for (var e = d.length - 1; e >= 0; e--) {
                var f = d[e];
                f.outerHTML = f.innerHTML
            }
            var g = function (a) {
                for (var c = b.node.contents(a), d = 0; d < c.length; d++) c[d].nodeType != Node.TEXT_NODE && c[d].nodeType != Node.ELEMENT_NODE ? c[d].parentNode.removeChild(c[d]) : g(c[d])
            };
            return g(c), c.innerHTML
        }

        function h() {
            b.keys.forceUndo();
            var c = b.snapshot.get();
            null === m && (m = n.get(0).innerHTML, b.selection.restore(), b.events.enableBlur());
            var d = b.events.chainTrigger("paste.beforeCleanup", m);
            "string" == typeof d && (m = d);
            var e = !1;
            m.match(/(class=\"?Mso|class=\'?Mso|style=\"[^\"]*\bmso\-|style=\'[^\']*\bmso\-|w:WordDocument)/gi) && (e = !0), m.indexOf("<body") >= 0 && (m = m.replace(/[.\s\S\w\W<>]*<body[^>]*>[\s]*([.\s\S\w\W<>]*)\s]*<\/body>[.\s\S\w\W<>]*/g, "$1"), m = m.replace(/([^>])\n([^<])/g, "$1 $2"));
            var h = !1;
            if (m.indexOf('id="docs-internal-guid') >= 0 && (m = m.replace(/^.* id="docs-internal-guid[^>]*>(.*)<\/b>.*$/, "$1"), h = !0), e) m = m.replace(/^\n*/g, "").replace(/^ /g, ""), 0 === m.indexOf("<colgroup>") && (m = "<table>" + m + "</table>"), m = f(m), m = j(m); else {
                b.opts.htmlAllowComments = !1, m = b.clean.html(m, b.opts.pasteDeniedTags, b.opts.pasteDeniedAttrs), b.opts.htmlAllowComments = !0, m = j(m), m = m.replace(/\r|\n|\t/g, "");
                var k = b.doc.createElement("div");
                k.innerHTML = m, a.FE.copied_text && k.textContent.replace(/(\u00A0)/gi, " ").replace(/\r|\n/gi, "") == a.FE.copied_text.replace(/(\u00A0)/gi, " ").replace(/\r|\n/gi, "") && (m = a.FE.copied_html), m = m.replace(/^ */g, "").replace(/ *$/g, "")
            }
            if (b.opts.pastePlain && (m = g(m)), d = b.events.chainTrigger("paste.afterCleanup", m), "string" == typeof d && (m = d), "" !== m) {
                var l = b.o_doc.createElement("div");
                l.innerHTML = m, b.spaces.normalize(l);
                for (var o = l.getElementsByTagName("span"), p = 0; p < o.length; p++) {
                    var q = o[p];
                    0 === q.attributes.length && (q.outerHTML = q.innerHTML)
                }
                var r = l.children;
                if (1 == r.length && ["OL", "UL"].indexOf(r[0].tagName) >= 0 && (r[0].outerHTML = r[0].innerHTML), !h) for (var s = l.getElementsByTagName("br"), p = 0; p < s.length; p++) {
                    var t = s[p];
                    b.node.isBlock(t.previousSibling) && t.parentNode.removeChild(t)
                }
                if (b.opts.enter == a.FE.ENTER_BR) for (var u = l.querySelectorAll("p, div"), p = 0; p < u.length; p++) {
                    var v = u[p];
                    v.outerHTML = v.innerHTML + (v.nextSibling && !b.node.isEmpty(v) ? "<br>" : "")
                } else if (b.opts.enter == a.FE.ENTER_DIV) for (var u = l.getElementsByTagName("p"), p = 0; p < u.length; p++) {
                    var v = u[p];
                    v.outerHTML = "<div>" + v.innerHTML + "</div>"
                }
                m = l.innerHTML, b.html.insert(m, !0)
            }
            i(), b.undo.saveStep(c), b.undo.saveStep()
        }

        function i() {
            b.events.trigger("paste.after")
        }

        function j(a) {
            var c = b.o_doc.createElement("div");
            c.innerHTML = a;
            for (var d = c.querySelectorAll("*:empty:not(br):not(img):not(td):not(th)"); d.length;) {
                for (var e = 0; e < d.length; e++) d[e].parentNode.removeChild(d[e]);
                d = c.querySelectorAll("*:empty:not(br):not(img):not(td):not(th)")
            }
            for (var f = c.querySelectorAll(":scope > div:not([style]), td > div, th > div, li > div"); f.length;) {
                var g = f[f.length - 1];
                if (b.html.defaultTag() && "div" != b.html.defaultTag()) g.querySelector(b.html.blockTagsQuery()) ? g.outerHTML = g.innerHTML : g.outerHTML = "<" + b.html.defaultTag() + ">" + g.innerHTML + "</" + b.html.defaultTag() + ">"; else {
                    var h = g.querySelectorAll("*");
                    h.length && "BR" === h[h.length - 1].tagName ? g.outerHTML = g.innerHTML : g.outerHTML = g.innerHTML + "<br>"
                }
                f = c.querySelectorAll(":scope > div:not([style]), td > div, th > div, li > div")
            }
            for (f = c.querySelectorAll("div:not([style])"); f.length;) {
                for (e = 0; e < f.length; e++) {
                    var i = f[e], j = i.innerHTML.replace(/\u0009/gi, "").trim();
                    i.outerHTML = j
                }
                f = c.querySelectorAll("div:not([style])")
            }
            return c.innerHTML
        }

        function k() {
            b.events.on("copy", c), b.events.on("cut", c), b.events.on("paste", d), b.browser.msie && b.browser.version < 11 && (b.events.on("mouseup", function (a) {
                2 == a.button && (setTimeout(function () {
                    o = !1
                }, 50), o = !0)
            }, !0), b.events.on("beforepaste", d))
        }

        var l, m, n, o = !1;
        return {_init: k}
    }, a.extend(a.FE.DEFAULTS, {
        shortcutsEnabled: ["show", "bold", "italic", "underline", "strikeThrough", "indent", "outdent", "undo", "redo"],
        shortcutsHint: !0
    }), a.FE.SHORTCUTS_MAP = {}, a.FE.RegisterShortcut = function (b, c, d, e, f, g) {
        a.FE.SHORTCUTS_MAP[(f ? "^" : "") + (g ? "@" : "") + b] = {
            cmd: c,
            val: d,
            letter: e,
            shift: f,
            option: g
        }, a.FE.DEFAULTS.shortcutsEnabled.push(c)
    }, a.FE.RegisterShortcut(a.FE.KEYCODE.E, "show", null, "E", !1, !1), a.FE.RegisterShortcut(a.FE.KEYCODE.B, "bold", null, "B", !1, !1), a.FE.RegisterShortcut(a.FE.KEYCODE.I, "italic", null, "I", !1, !1), a.FE.RegisterShortcut(a.FE.KEYCODE.U, "underline", null, "U", !1, !1), a.FE.RegisterShortcut(a.FE.KEYCODE.S, "strikeThrough", null, "S", !1, !1), a.FE.RegisterShortcut(a.FE.KEYCODE.CLOSE_SQUARE_BRACKET, "indent", null, "]", !1, !1), a.FE.RegisterShortcut(a.FE.KEYCODE.OPEN_SQUARE_BRACKET, "outdent", null, "[", !1, !1), a.FE.RegisterShortcut(a.FE.KEYCODE.Z, "undo", null, "Z", !1, !1), a.FE.RegisterShortcut(a.FE.KEYCODE.Z, "redo", null, "Z", !0, !1), a.FE.MODULES.shortcuts = function (b) {
        function c(c) {
            if (!b.opts.shortcutsHint) return null;
            if (!f) {
                f = {};
                for (var d in a.FE.SHORTCUTS_MAP) a.FE.SHORTCUTS_MAP.hasOwnProperty(d) && b.opts.shortcutsEnabled.indexOf(a.FE.SHORTCUTS_MAP[d].cmd) >= 0 && (f[a.FE.SHORTCUTS_MAP[d].cmd + "." + (a.FE.SHORTCUTS_MAP[d].val || "")] = {
                    shift: a.FE.SHORTCUTS_MAP[d].shift,
                    option: a.FE.SHORTCUTS_MAP[d].option,
                    letter: a.FE.SHORTCUTS_MAP[d].letter
                })
            }
            var e = f[c];
            return e ? (b.helpers.isMac() ? String.fromCharCode(8984) : "Ctrl+") + (e.shift ? b.helpers.isMac() ? String.fromCharCode(8679) : "Shift+" : "") + (e.option ? b.helpers.isMac() ? String.fromCharCode(8997) : "Alt+" : "") + e.letter : null
        }

        function d(c) {
            if (!b.core.hasFocus()) return !0;
            var d = c.which, e = navigator.userAgent.indexOf("Mac OS X") != -1 ? c.metaKey : c.ctrlKey;
            if ("keyup" == c.type && g && d != a.FE.KEYCODE.META) return g = !1, !1;
            "keydown" == c.type && (g = !1);
            var f = (c.shiftKey ? "^" : "") + (c.altKey ? "@" : "") + d;
            if (e && a.FE.SHORTCUTS_MAP[f]) {
                var h = a.FE.SHORTCUTS_MAP[f].cmd;
                if (h && b.opts.shortcutsEnabled.indexOf(h) >= 0) {
                    var i, j = a.FE.SHORTCUTS_MAP[f].val;
                    if (h && !j ? i = b.$tb.find('.fr-command[data-cmd="' + h + '"]') : h && j && (i = b.$tb.find('.fr-command[data-cmd="' + h + '"][data-param1="' + j + '"]')), i.length) return c.preventDefault(), c.stopPropagation(), i.parents(".fr-toolbar").data("instance", b), "keydown" == c.type && (b.button.exec(i), g = !0), !1;
                    if (h && b.commands[h]) return c.preventDefault(), c.stopPropagation(), "keydown" == c.type && (b.commands[h](), g = !0), !1
                }
            }
        }

        function e() {
            b.events.on("keydown", d, !0), b.events.on("keyup", d, !0)
        }

        var f = null, g = !1;
        return {_init: e, get: c}
    }, a.FE.MODULES.snapshot = function (a) {
        function b(a) {
            for (var b = a.parentNode.childNodes, c = 0, d = null, e = 0; e < b.length; e++) {
                if (d) {
                    var f = b[e].nodeType === Node.TEXT_NODE && "" === b[e].textContent,
                        g = d.nodeType === Node.TEXT_NODE && b[e].nodeType === Node.TEXT_NODE;
                    f || g || c++
                }
                if (b[e] == a) return c;
                d = b[e]
            }
        }

        function c(c) {
            var d = [];
            if (!c.parentNode) return [];
            for (; !a.node.isElement(c);) d.push(b(c)), c = c.parentNode;
            return d.reverse()
        }

        function d(a, b) {
            for (; a && a.nodeType === Node.TEXT_NODE;) {
                var c = a.previousSibling;
                c && c.nodeType == Node.TEXT_NODE && (b += c.textContent.length), a = c
            }
            return b
        }

        function e(a) {
            return {
                scLoc: c(a.startContainer),
                scOffset: d(a.startContainer, a.startOffset),
                ecLoc: c(a.endContainer),
                ecOffset: d(a.endContainer, a.endOffset)
            }
        }

        function f() {
            var b = {};
            if (a.events.trigger("snapshot.before"), b.html = (a.$wp ? a.$el.html() : a.$oel.get(0).outerHTML).replace(/ style=""/g, ""), b.ranges = [], a.$wp && a.selection.inEditor() && a.core.hasFocus()) for (var c = a.selection.ranges(), d = 0; d < c.length; d++) b.ranges.push(e(c[d]));
            return a.events.trigger("snapshot.after"), b
        }

        function g(b) {
            for (var c = a.el, d = 0; d < b.length; d++) c = c.childNodes[b[d]];
            return c
        }

        function h(b, c) {
            try {
                var d = g(c.scLoc), e = c.scOffset, f = g(c.ecLoc), h = c.ecOffset, i = a.doc.createRange();
                i.setStart(d, e), i.setEnd(f, h), b.addRange(i)
            } catch (j) {
            }
        }

        function i(b) {
            a.$el.html() != b.html && a.$el.html(b.html);
            var c = a.selection.get();
            a.selection.clear(), a.events.focus(!0);
            for (var d = 0; d < b.ranges.length; d++) h(c, b.ranges[d])
        }

        function j(b, c) {
            return b.html == c.html && (!a.core.hasFocus() || JSON.stringify(b.ranges) == JSON.stringify(c.ranges))
        }

        return {get: f, restore: i, equal: j}
    }, a.FE.MODULES.undo = function (a) {
        function b(b) {
            var c = b.which, d = a.keys.ctrlKey(b);
            d && (90 == c && b.shiftKey && b.preventDefault(), 90 == c && b.preventDefault())
        }

        function c() {
            return !(0 === a.undo_stack.length || a.undo_index <= 1)
        }

        function d() {
            return a.undo_index != a.undo_stack.length
        }

        function e(b) {
            return !(!a.undo_stack || a.undoing || a.el.querySelector(".fr-marker")) && void("undefined" == typeof b ? (b = a.snapshot.get(), a.undo_stack[a.undo_index - 1] && a.snapshot.equal(a.undo_stack[a.undo_index - 1], b) || (f(), a.undo_stack.push(b), a.undo_index++, b.html != l && (a.events.trigger("contentChanged"), l = b.html))) : (f(), a.undo_index > 0 ? a.undo_stack[a.undo_index - 1] = b : (a.undo_stack.push(b), a.undo_index++)))
        }

        function f() {
            if (!a.undo_stack || a.undoing) return !1;
            for (; a.undo_stack.length > a.undo_index;) a.undo_stack.pop()
        }

        function g() {
            if (a.undo_index > 1) {
                a.undoing = !0;
                var b = a.undo_stack[--a.undo_index - 1];
                clearTimeout(a._content_changed_timer), a.snapshot.restore(b), l = b.html, a.popups.hideAll(), a.toolbar.enable(), a.events.trigger("contentChanged"), a.events.trigger("commands.undo"), a.undoing = !1
            }
        }

        function h() {
            if (a.undo_index < a.undo_stack.length) {
                a.undoing = !0;
                var b = a.undo_stack[a.undo_index++];
                clearTimeout(a._content_changed_timer), a.snapshot.restore(b), l = b.html, a.popups.hideAll(), a.toolbar.enable(), a.events.trigger("contentChanged"), a.events.trigger("commands.redo"), a.undoing = !1
            }
        }

        function i() {
            a.undo_index = 0, a.undo_stack = []
        }

        function j() {
            a.undo_stack = []
        }

        function k() {
            i(), a.events.on("initialized", function () {
                l = (a.$wp ? a.$el.html() : a.$oel.get(0).outerHTML).replace(/ style=""/g, "")
            }), a.events.on("blur", function () {
                a.el.querySelector(".fr-dragging") || a.undo.saveStep()
            }), a.events.on("keydown", b), a.events.on("destroy", j)
        }

        var l = null;
        return {_init: k, run: g, redo: h, canDo: c, canRedo: d, dropRedo: f, reset: i, saveStep: e}
    }, a.FE.ICON_DEFAULT_TEMPLATE = "font_awesome", a.FE.ICON_TEMPLATES = {
        font_awesome: '<i class="fa fa-[NAME]" aria-hidden="true"></i>',
        text: '<span style="text-align: center;">[NAME]</span>',
        image: "<img src=[SRC] alt=[ALT] />",
        svg: '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">[PATH]</svg>'
    }, a.FE.ICONS = {
        bold: {NAME: "bold"},
        italic: {NAME: "italic"},
        underline: {NAME: "underline"},
        strikeThrough: {NAME: "strikethrough"},
        subscript: {NAME: "subscript"},
        superscript: {NAME: "superscript"},
        color: {NAME: "tint"},
        outdent: {NAME: "outdent"},
        indent: {NAME: "indent"},
        undo: {NAME: "rotate-left"},
        redo: {NAME: "rotate-right"},
        insertHR: {NAME: "minus"},
        clearFormatting: {NAME: "eraser"},
        selectAll: {NAME: "mouse-pointer"}
    }, a.FE.DefineIconTemplate = function (b, c) {
        a.FE.ICON_TEMPLATES[b] = c
    }, a.FE.DefineIcon = function (b, c) {
        a.FE.ICONS[b] = c
    }, a.FE.MODULES.icon = function (b) {
        function c(b) {
            var c = null, d = a.FE.ICONS[b];
            if ("undefined" != typeof d) {
                var e = d.template || a.FE.ICON_DEFAULT_TEMPLATE;
                e && (e = a.FE.ICON_TEMPLATES[e]) && (c = e.replace(/\[([a-zA-Z]*)\]/g, function (a, c) {
                    return "NAME" == c ? d[c] || b : d[c]
                }))
            }
            return c || b
        }

        function d(b) {
            var c = a.FE.ICONS[b], d = a.FE.ICON_DEFAULT_TEMPLATE;
            if ("undefined" != typeof c) {
                var d = c.template || a.FE.ICON_DEFAULT_TEMPLATE;
                return d
            }
            return d
        }

        return {create: c, getTemplate: d}
    }, a.extend(a.FE.DEFAULTS, {tooltips: !0}), a.FE.MODULES.tooltip = function (b) {
        function c() {
            b.$tooltip && b.$tooltip.removeClass("fr-visible").css("left", "-3000px").css("position", "fixed")
        }

        function d(c, d) {
            if (c.data("title") || c.data("title", c.attr("title")), !c.data("title")) return !1;
            b.$tooltip || f(), c.removeAttr("title"), b.$tooltip.text(c.data("title")), b.$tooltip.addClass("fr-visible");
            var e = c.offset().left + (c.outerWidth() - b.$tooltip.outerWidth()) / 2;
            e < 0 && (e = 0), e + b.$tooltip.outerWidth() > a(b.o_win).width() && (e = a(b.o_win).width() - b.$tooltip.outerWidth()), "undefined" == typeof d && (d = b.opts.toolbarBottom);
            var g = d ? c.offset().top - b.$tooltip.height() : c.offset().top + c.outerHeight();
            b.$tooltip.css("position", ""), b.$tooltip.css("left", e), b.$tooltip.css("top", Math.ceil(g)), "static" != a(b.o_doc).find("body").css("position") ? (b.$tooltip.css("margin-left", -a(b.o_doc).find("body").offset().left), b.$tooltip.css("margin-top", -a(b.o_doc).find("body").offset().top)) : (b.$tooltip.css("margin-left", ""), b.$tooltip.css("margin-top", ""))
        }

        function e(e, f, g) {
            b.opts.tooltips && !b.helpers.isMobile() && (b.events.$on(e, "mouseenter", f, function (c) {
                b.node.hasClass(c.currentTarget, "fr-disabled") || b.edit.isDisabled() || d(a(c.currentTarget), g)
            }, !0), b.events.$on(e, "mouseleave " + b._mousedown + " " + b._mouseup, f, function (a) {
                c()
            }, !0))
        }

        function f() {
            b.opts.tooltips && !b.helpers.isMobile() && (b.shared.$tooltip ? b.$tooltip = b.shared.$tooltip : (b.shared.$tooltip = a('<div class="fr-tooltip"></div>'), b.$tooltip = b.shared.$tooltip, b.opts.theme && b.$tooltip.addClass(b.opts.theme + "-theme"), a(b.o_doc).find("body").append(b.$tooltip)), b.events.on("shared.destroy", function () {
                b.$tooltip.html("").removeData().remove(), b.$tooltip = null
            }, !0))
        }

        return {hide: c, to: d, bind: e}
    }, a.FE.MODULES.button = function (b) {
        function c(c) {
            var d = c.next(), e = b.node.hasClass(c.get(0), "fr-active"),
                f = (b.helpers.isMobile(), a(".fr-dropdown.fr-active").not(c)),
                g = c.parents(".fr-toolbar, .fr-popup").data("instance") || b;
            if (g.helpers.isIOS() && !g.el.querySelector(".fr-marker") && (g.selection.save(), g.selection.clear(), g.selection.restore()), !e) {
                var h = c.data("cmd");
                d.find(".fr-command").removeClass("fr-active").attr("aria-selected", !1), a.FE.COMMANDS[h] && a.FE.COMMANDS[h].refreshOnShow && a.FE.COMMANDS[h].refreshOnShow.apply(g, [c, d]), d.css("left", c.offset().left - c.parent().offset().left - ("rtl" == b.opts.direction ? d.width() - c.outerWidth() : 0)), b.opts.toolbarBottom ? d.css("bottom", b.$tb.height() - c.position().top) : d.css("top", c.position().top + c.outerHeight())
            }
            c.addClass("fr-blink").toggleClass("fr-active"), c.hasClass("fr-active") ? (d.attr("aria-hidden", !1), c.attr("aria-expanded", !0)) : (d.attr("aria-hidden", !0), c.attr("aria-expanded", !1)), setTimeout(function () {
                c.removeClass("fr-blink")
            }, 300), d.offset().left + d.outerWidth() > b.$sc.offset().left + b.$sc.outerWidth() && d.css("margin-left", -(d.offset().left + d.outerWidth() - b.$sc.offset().left - b.$sc.outerWidth())), f.removeClass("fr-active").attr("aria-expanded", !1).next().attr("aria-hidden", !0), f.parent(".fr-toolbar:not(.fr-inline)").css("zIndex", ""), 0 != c.parents(".fr-popup").length || b.opts.toolbarInline || (b.node.hasClass(c.get(0), "fr-active") ? b.$tb.css("zIndex", (b.opts.zIndex || 1) + 4) : b.$tb.css("zIndex", ""));
            var i = d.find("a.fr-command.fr-active");
            i.length ? b.accessibility.focusToolbarElement(i) : b.accessibility.focusToolbarElement(c)
        }

        function d(b) {
            b.addClass("fr-blink"), setTimeout(function () {
                b.removeClass("fr-blink")
            }, 500);
            for (var c = b.data("cmd"), d = []; "undefined" != typeof b.data("param" + (d.length + 1));) d.push(b.data("param" + (d.length + 1)));
            var e = a(".fr-dropdown.fr-active");
            e.length && (e.removeClass("fr-active").attr("aria-expanded", !1).next().attr("aria-hidden", !0), e.parent(".fr-toolbar:not(.fr-inline)").css("zIndex", "")), b.parents(".fr-popup, .fr-toolbar").data("instance").commands.exec(c, d)
        }

        function e(a) {
            d(a)
        }

        function f(d) {
            var f = d.parents(".fr-popup, .fr-toolbar").data("instance");
            if (0 != d.parents(".fr-popup").length || d.data("popup") || f.popups.hideAll(), f.popups.areVisible() && !f.popups.areVisible(f)) {
                for (var g = 0; g < a.FE.INSTANCES.length; g++) a.FE.INSTANCES[g] != f && a.FE.INSTANCES[g].popups && a.FE.INSTANCES[g].popups.areVisible() && a.FE.INSTANCES[g].$el.find(".fr-marker").remove();
                f.popups.hideAll()
            }
            b.node.hasClass(d.get(0), "fr-dropdown") ? c(d) : (e(d), a.FE.COMMANDS[d.data("cmd")] && 0 != a.FE.COMMANDS[d.data("cmd")].refreshAfterCallback && f.button.bulkRefresh())
        }

        function g(b) {
            var c = a(b.currentTarget);
            f(c)
        }

        function h(a) {
            var b = a.find(".fr-dropdown.fr-active");
            b.length && (b.removeClass("fr-active").attr("aria-expanded", !1).next().attr("aria-hidden", !0), b.parent(".fr-toolbar:not(.fr-inline)").css("zIndex", ""))
        }

        function i(a) {
            a.preventDefault(), a.stopPropagation()
        }

        function j(a) {
            if (a.stopPropagation(), !b.helpers.isMobile()) return !1
        }

        function k(c, d) {
            b.events.bindClick(c, ".fr-command:not(.fr-disabled)", g), b.events.$on(c, b._mousedown + " " + b._mouseup + " " + b._move, ".fr-dropdown-menu", i, !0), b.events.$on(c, b._mousedown + " " + b._mouseup + " " + b._move, ".fr-dropdown-menu .fr-dropdown-wrapper", j, !0);
            var e = c.get(0).ownerDocument, f = "defaultView" in e ? e.defaultView : e.parentWindow, k = function (d) {
                (!d || d.type == b._mouseup && d.target != a("html").get(0) || "keydown" == d.type && (b.keys.isCharacter(d.which) && !b.keys.ctrlKey(d) || d.which == a.FE.KEYCODE.ESC)) && h(c)
            };
            b.events.$on(a(f), b._mouseup + " resize keydown", k, !0), b.opts.iframe && b.events.$on(b.$win, b._mouseup, k, !0), b.node.hasClass(c.get(0), "fr-popup") ? a.merge(u, c.find(".fr-btn").toArray()) : a.merge(t, c.find(".fr-btn").toArray()), b.tooltip.bind(c, ".fr-btn, .fr-title", d)
        }

        function l(a, c) {
            var d = "";
            if (c.html) d += "function" == typeof c.html ? c.html.call(b) : c.html; else {
                var e = c.options;
                "function" == typeof e && (e = e()), d += '<ul class="fr-dropdown-list" role="presentation">';
                for (var f in e) if (e.hasOwnProperty(f)) {
                    var g = b.shortcuts.get(a + "." + f);
                    g = g ? '<span class="fr-shortcut">' + g + "</span>" : "", d += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="' + a + '" data-param1="' + f + '" title="' + e[f] + '">' + b.language.translate(e[f]) + "</a></li>"
                }
                d += "</ul>"
            }
            return d
        }

        function m(a, c, d) {
            if (b.helpers.isMobile() && c.showOnMobile === !1) return "";
            var e = c.displaySelection;
            "function" == typeof e && (e = e(b));
            var f;
            if (e) {
                var g = "function" == typeof c.defaultSelection ? c.defaultSelection(b) : c.defaultSelection;
                f = '<span style="width:' + (c.displaySelectionWidth || 100) + 'px">' + (g || b.language.translate(c.title)) + "</span>"
            } else f = b.icon.create(c.icon || a), f += '<span class="fr-sr-only">' + (b.language.translate(c.title) || "") + "</span>";
            var h = c.popup ? ' data-popup="true"' : "", i = c.modal ? ' data-modal="true"' : "",
                j = b.shortcuts.get(a + ".");
            j = j ? " (" + j + ")" : "";
            var k = a + "-" + b.id,
                m = '<button id="' + k + '"type="button" tabIndex="-1" role="button"' + (c.toggle ? ' aria-pressed="false"' : "") + ("dropdown" == c.type ? ' aria-controls="drop" aria-expanded="false" aria-haspopup="true"' : "") + (c.disabled ? ' aria-disabled="true"' : "") + ' title="' + (b.language.translate(c.title) || "") + j + '" class="fr-command fr-btn' + ("dropdown" == c.type ? " fr-dropdown" : "") + (" fr-btn-" + b.icon.getTemplate(c.icon)) + (c.displaySelection ? " fr-selection" : "") + (c.back ? " fr-back" : "") + (c.disabled ? " fr-disabled" : "") + (d ? "" : " fr-hidden") + '" data-cmd="' + a + '"' + h + i + ">" + f + "</button>";
            if ("dropdown" == c.type) {
                var n = '<div class="fr-dropdown-menu" role="listbox" aria-labelledby="' + k + '" aria-hidden="true"><div class="fr-dropdown-wrapper" role="presentation"><div class="fr-dropdown-content" role="presentation">';
                n += l(a, c), n += "</div></div></div>", m += n
            }
            return m
        }

        function n(c, d) {
            for (var e = "", f = 0; f < c.length; f++) {
                var g = c[f], h = a.FE.COMMANDS[g];
                if (!(h && "undefined" != typeof h.plugin && b.opts.pluginsEnabled.indexOf(h.plugin) < 0)) if (h) {
                    var i = "undefined" == typeof d || d.indexOf(g) >= 0;
                    e += m(g, h, i)
                } else "|" == g ? e += '<div class="fr-separator fr-vs" role="separator" aria-orientation="vertical"></div>' : "-" == g && (e += '<div class="fr-separator fr-hs" role="separator" aria-orientation="horizontal"></div>')
            }
            return e
        }

        function o(c) {
            var d, e = c.parents(".fr-popup, .fr-toolbar").data("instance") || b, f = c.data("cmd");
            b.node.hasClass(c.get(0), "fr-dropdown") ? d = c.next() : (c.removeClass("fr-active"), c.attr("aria-pressed") && c.attr("aria-pressed", !1)), a.FE.COMMANDS[f] && a.FE.COMMANDS[f].refresh ? a.FE.COMMANDS[f].refresh.apply(e, [c, d]) : b.refresh[f] && e.refresh[f](c, d)
        }

        function p(c) {
            var d = b.$tb ? b.$tb.data("instance") || b : b;
            return 0 == b.events.trigger("buttons.refresh") || void setTimeout(function () {
                for (var e = d.selection.inEditor() && d.core.hasFocus(), f = 0; f < c.length; f++) {
                    var g = a(c[f]), h = g.data("cmd");
                    0 == g.parents(".fr-popup").length ? e || a.FE.COMMANDS[h] && a.FE.COMMANDS[h].forcedRefresh ? d.button.refresh(g) : b.node.hasClass(g.get(0), "fr-dropdown") || (g.removeClass("fr-active"), g.attr("aria-pressed") && g.attr("aria-pressed", !1)) : g.parents(".fr-popup").is(":visible") && d.button.refresh(g)
                }
            }, 0)
        }

        function q() {
            p(t), p(u)
        }

        function r() {
            t = [], u = []
        }

        function s() {
            b.opts.toolbarInline ? b.events.on("toolbar.show", q) : (b.events.on("mouseup", q), b.events.on("keyup", q), b.events.on("blur", q), b.events.on("focus", q), b.events.on("contentChanged", q)), b.events.on("shared.destroy", r)
        }

        var t = [];
        (b.opts.toolbarInline || b.opts.toolbarContainer) && (b.shared.buttons || (b.shared.buttons = []), t = b.shared.buttons);
        var u = [];
        return b.shared.popup_buttons || (b.shared.popup_buttons = []), u = b.shared.popup_buttons, {
            _init: s,
            buildList: n,
            bindCommands: k,
            refresh: o,
            bulkRefresh: q,
            exec: d,
            click: f,
            hideActiveDropdowns: h
        }
    }, a.FE.MODULES.modals = function (b) {
        function c(a) {
            return n[a]
        }

        function d(c, d) {
            var e = '<div tabIndex="-1" class="fr-modal' + (b.opts.theme ? " " + b.opts.theme + "-theme" : "") + '"><div class="fr-modal-wrapper">',
                f = '<i title="' + b.language.translate("Cancel") + '" class="fa fa-times fr-modal-close"></i>';
            return e += '<div class="fr-modal-head">' + c + f + "</div>", e += '<div tabIndex="-1" class="fr-modal-body">' + d + "</div>", e += "</div></div>", a(e)
        }

        function e(c, e, f) {
            if (b.shared.$overlay || (b.shared.$overlay = a('<div class="fr-overlay">').appendTo("body")), m = b.shared.$overlay, b.opts.theme && m.addClass(b.opts.theme + "-theme"), !n[c]) {
                var g = d(e, f);
                n[c] = {
                    $modal: g,
                    $head: g.find(".fr-modal-head"),
                    $body: g.find(".fr-modal-body")
                }, b.helpers.isMobile() || g.addClass("fr-desktop"), g.appendTo("body"), b.events.bindClick(g, "i.fr-modal-close", function () {
                    h(c)
                }), n[c].$body.css("margin-top", n[c].$head.outerHeight()), b.events.$on(g, "keydown", function (d) {
                    var e = d.which;
                    return e == a.FE.KEYCODE.ESC ? (h(c), b.accessibility.focusModalButton(g), !1) : !(!a(d.currentTarget).is("input[type=text], textarea") && e != a.FE.KEYCODE.ARROW_UP && e != a.FE.KEYCODE.ARROW_DOWN && !b.keys.isBrowserAction(d)) || (d.preventDefault(), d.stopPropagation(), !1)
                }, !0), h(c)
            }
            return n[c]
        }

        function f() {
            for (var a in n) {
                var b = n[a];
                b && b.$modal && b.$modal.removeData().remove()
            }
            m && m.removeData().remove(), n = {}
        }

        function g(a) {
            if (n[a]) {
                var c = n[a].$modal;
                c.data("instance", b), c.show(), m.show(), b.$doc.find("body").addClass("prevent-scroll"), b.helpers.isMobile() && b.$doc.find("body").addClass("fr-mobile"), c.addClass("fr-active"), b.accessibility.focusModal(c)
            }
        }

        function h(a) {
            if (n[a]) {
                var c = n[a].$modal, d = c.data("instance") || b;
                d.events.enableBlur(), c.hide(), m.hide(), d.$doc.find("body").removeClass("prevent-scroll fr-mobile"), c.removeClass("fr-active"), b.accessibility.restoreSelection(d)
            }
        }

        function i(a) {
            if (n[a]) {
                var c = n[a], d = c.$modal, e = c.$body, f = b.$win.height(), g = d.find(".fr-modal-wrapper"),
                    h = g.outerHeight(!0), i = g.height() - (e.outerHeight(!0) - e.height()), j = f - h + i,
                    k = e.get(0).scrollHeight, l = "auto";
                k > j && (l = j), e.height(l)
            }
        }

        function j(a) {
            var c;
            if ("string" == typeof a) {
                if (!n[a]) return;
                c = n[a].$modal
            } else c = a;
            return c && b.node.hasClass(c, "fr-active") && b.core.sameInstance(c) || !1
        }

        function k(a) {
            for (var b in n) if (n.hasOwnProperty(b) && j(b) && ("undefined" == typeof a || n[b].$modal.data("instance") == a)) return n[b].$modal;
            return !1
        }

        function l() {
            b.events.on("shared.destroy", f, !0)
        }

        b.shared.modals || (b.shared.modals = {});
        var m, n = b.shared.modals;
        return {_init: l, get: c, create: e, show: g, hide: h, resize: i, isVisible: j, areVisible: k}
    }, a.FE.POPUP_TEMPLATES = {"text.edit": "[_EDIT_]"}, a.FE.RegisterTemplate = function (b, c) {
        a.FE.POPUP_TEMPLATES[b] = c
    }, a.FE.MODULES.popups = function (b) {
        function c(a, c) {
            c.is(":visible") || (c = b.$sc), c.is(x[a].data("container")) || (x[a].data("container", c), c.append(x[a]))
        }

        function d(d, e, h, i) {
            if (g() && b.$el.find(".fr-marker").length > 0 ? (b.events.disableBlur(), b.selection.restore()) : (b.events.disableBlur(), b.events.focus(), b.events.enableBlur()), m([d]), !x[d]) return !1;
            var j = a(".fr-dropdown.fr-active");
            j.removeClass("fr-active").attr("aria-expanded", !1).parent(".fr-toolbar").css("zIndex", ""), j.next().attr("aria-hidden", !0), x[d].data("instance", b), b.$tb && b.$tb.data("instance", b);
            var k = x[d].outerWidth(), l = (x[d].outerHeight(), f(d));
            x[d].addClass("fr-active").removeClass("fr-hidden").find("input, textarea").removeAttr("disabled");
            var n = x[d].data("container");
            b.opts.toolbarInline && n && b.$tb && n.get(0) == b.$tb.get(0) && (c(d, b.$sc), h = b.$tb.offset().top - b.helpers.getPX(b.$tb.css("margin-top")), e = b.$tb.offset().left + b.$tb.outerWidth() / 2 + (parseFloat(b.$tb.find(".fr-arrow").css("margin-left")) || 0) + b.$tb.find(".fr-arrow").outerWidth() / 2, b.node.hasClass(b.$tb.get(0), "fr-above") && h && (h += b.$tb.outerHeight()), i = 0), n = x[d].data("container"), !b.opts.iframe || i || l || (e && (e -= b.$iframe.offset().left), h && (h -= b.$iframe.offset().top)), n.is(b.$tb) ? b.$tb.css("zIndex", (b.opts.zIndex || 1) + 4) : x[d].css("zIndex", (b.opts.zIndex || 1) + 4), e && (e -= k / 2), b.opts.toolbarBottom && n && b.$tb && n.get(0) == b.$tb.get(0) && (x[d].addClass("fr-above"), h && (h -= x[d].outerHeight())), x[d].removeClass("fr-active"), b.position.at(e, h, x[d], i || 0), x[d].addClass("fr-active"), l || b.accessibility.focusPopup(x[d]), b.opts.toolbarInline && b.toolbar.hide(), b.events.trigger("popups.show." + d), s(d)._repositionPopup(), o()
        }

        function e(a, c) {
            b.events.on("popups.show." + a, c)
        }

        function f(a) {
            return x[a] && b.node.hasClass(x[a], "fr-active") && b.core.sameInstance(x[a]) || !1
        }

        function g(a) {
            for (var b in x) if (x.hasOwnProperty(b) && f(b) && ("undefined" == typeof a || x[b].data("instance") == a)) return x[b];
            return !1
        }

        function h(a) {
            var c = null;
            c = "string" != typeof a ? a : x[a], c && b.node.hasClass(c, "fr-active") && (c.removeClass("fr-active fr-above"), b.events.trigger("popups.hide." + a), b.$tb && (b.opts.zIndex > 1 ? b.$tb.css("zIndex", b.opts.zIndex + 1) : b.$tb.css("zIndex", "")), b.events.disableBlur(), c.find("input, textarea, button").filter(":focus").blur(), c.find("input, textarea").attr("disabled", "disabled"))
        }

        function i(a, c) {
            b.events.on("popups.hide." + a, c)
        }

        function j(a) {
            var c = x[a];
            if (c && !c.data("inst" + b.id)) {
                var d = s(a);
                t(d, a)
            }
            return c
        }

        function k(a, c) {
            b.events.on("popups.refresh." + a, c)
        }

        function l(c) {
            b.events.trigger("popups.refresh." + c);
            for (var d = x[c].find(".fr-command"), e = 0; e < d.length; e++) {
                var f = a(d[e]);
                0 == f.parents(".fr-dropdown-menu").length && b.button.refresh(f)
            }
        }

        function m(a) {
            "undefined" == typeof a && (a = []);
            for (var b in x) x.hasOwnProperty(b) && a.indexOf(b) < 0 && h(b)
        }

        function n() {
            b.shared.exit_flag = !0
        }

        function o() {
            b.shared.exit_flag = !1
        }

        function p() {
            return b.shared.exit_flag
        }

        function q(c, d) {
            var e = a.FE.POPUP_TEMPLATES[c];
            "function" == typeof e && (e = e.apply(b));
            for (var f in d) d.hasOwnProperty(f) && (e = e.replace("[_" + f.toUpperCase() + "_]", d[f]));
            return e
        }

        function r(c, d) {
            var e = q(c, d),
                f = a('<div class="fr-popup' + (b.helpers.isMobile() ? " fr-mobile" : " fr-desktop") + (b.opts.toolbarInline ? " fr-inline" : "") + '"><span class="fr-arrow"></span>' + e + "</div>");
            b.opts.theme && f.addClass(b.opts.theme + "-theme"), b.opts.zIndex > 1 && b.$tb.css("z-index", b.opts.zIndex + 2), "auto" != b.opts.direction && f.removeClass("fr-ltr fr-rtl").addClass("fr-" + b.opts.direction), f.find("input, textarea").attr("dir", b.opts.direction).attr("disabled", "disabled");
            var g = a("body");
            return g.append(f), f.data("container", g), x[c] = f, b.button.bindCommands(f, !1), f
        }

        function s(c) {
            var d = x[c];
            return {
                _windowResize: function () {
                    var a = d.data("instance") || b;
                    !a.helpers.isMobile() && d.is(":visible") && (a.events.disableBlur(), a.popups.hide(c), a.events.enableBlur())
                }, _inputFocus: function (c) {
                    var e = d.data("instance") || b, f = a(c.currentTarget);
                    if (f.is("input:file") && f.closest(".fr-layer").addClass("fr-input-focus"), c.preventDefault(), c.stopPropagation(), setTimeout(function () {
                        e.events.enableBlur()
                    }, 0), e.helpers.isMobile()) {
                        var g = a(e.o_win).scrollTop();
                        setTimeout(function () {
                            a(e.o_win).scrollTop(g)
                        }, 0)
                    }
                }, _inputBlur: function (c) {
                    var e = d.data("instance") || b, f = a(c.currentTarget);
                    f.is("input:file") && f.closest(".fr-layer").removeClass("fr-input-focus"), document.activeElement != this && a(this).is(":visible") && (e.events.blurActive() && e.events.trigger("blur"), e.events.enableBlur())
                }, _editorKeydown: function (e) {
                    var g = d.data("instance") || b;
                    g.keys.ctrlKey(e) || e.which == a.FE.KEYCODE.ALT || e.which == a.FE.KEYCODE.ESC || (f(c) && d.find(".fr-back:visible").length ? g.button.exec(d.find(".fr-back:visible:first")) : e.which != a.FE.KEYCODE.ALT && g.popups.hide(c))
                }, _preventFocus: function (c) {
                    var e = d.data("instance") || b;
                    "mouseup" == c.type && b.button.hideActiveDropdowns(d);
                    var f = c.originalEvent ? c.originalEvent.target || c.originalEvent.originalTarget : null;
                    "mouseup" == c.type || a(f).is(":focus") || e.events.disableBlur();
                    var g = "input, textarea, button, select, label, .fr-command";
                    return f && !a(f).is(g) && 0 === a(f).parents(g).length ? (c.stopPropagation(), !1) : (f && a(f).is(g) && c.stopPropagation(), void o())
                }, _editorMouseup: function (a) {
                    d.is(":visible") && p() && d.find("input:focus, textarea:focus, button:focus, select:focus").filter(":visible").length > 0 && b.events.disableBlur()
                }, _windowMouseup: function (a) {
                    if (!b.core.sameInstance(d)) return !0;
                    var e = d.data("instance") || b;
                    d.is(":visible") && p() && (a.stopPropagation(), e.markers.remove(), e.popups.hide(c), o())
                }, _windowKeydown: function (e) {
                    if (!b.core.sameInstance(d)) return !0;
                    var f = d.data("instance") || b, g = e.which;
                    if (a.FE.KEYCODE.ESC == g) {
                        if (f.popups.isVisible(c) && f.opts.toolbarInline) return e.stopPropagation(), f.popups.isVisible(c) && (d.find(".fr-back:visible").length ? (f.button.exec(d.find(".fr-back:visible:first")), f.accessibility.focusPopupButton(d)) : d.find(".fr-dismiss:visible").length ? f.button.exec(d.find(".fr-dismiss:visible:first")) : (f.popups.hide(c), f.toolbar.showInline(null, !0), f.accessibility.FocusPopupButton(d))), !1;
                        if (f.popups.isVisible(c)) return d.find(".fr-back:visible").length ? (f.button.exec(d.find(".fr-back:visible:first")), f.accessibility.focusPopupButton(d)) : d.find(".fr-dismiss:visible").length ? f.button.exec(d.find(".fr-dismiss:visible:first")) : (f.popups.hide(c), f.accessibility.focusPopupButton(d)), !1
                    }
                }, _doPlaceholder: function (b) {
                    var c = a(this).next();
                    0 == c.length && a(this).attr("placeholder") && a(this).after('<label for="' + a(this).attr("id") + '">' + a(this).attr("placeholder") + "</label>"), a(this).toggleClass("fr-not-empty", "" != a(this).val())
                }, _repositionPopup: function (a) {
                    if (!b.opts.height && !b.opts.heightMax || b.opts.toolbarInline) return !0;
                    if (b.$wp && f(c) && d.parent().get(0) == b.$sc.get(0)) {
                        var e = d.offset().top - b.$wp.offset().top, g = b.$wp.outerHeight();
                        b.node.hasClass(d.get(0), "fr-above") && (e += d.outerHeight()), e > g || e < 0 ? d.addClass("fr-hidden") : d.removeClass("fr-hidden");
                    }
                }
            }
        }

        function t(a, c) {
            b.events.on("mouseup", a._editorMouseup, !0), b.$wp && b.events.on("keydown", a._editorKeydown), b.events.on("blur", function (a) {
                g() && b.markers.remove(), m()
            }), b.$wp && !b.helpers.isMobile() && b.events.$on(b.$wp, "scroll.popup" + c, a._repositionPopup), b.events.on("window.mouseup", a._windowMouseup, !0), b.events.on("window.keydown", a._windowKeydown, !0), x[c].data("inst" + b.id, !0), b.events.on("destroy", function () {
                b.core.sameInstance(x[c]) && x[c].removeClass("fr-active").appendTo("body")
            }, !0)
        }

        function u(c, d) {
            var e = r(c, d), f = s(c);
            return t(f, c), b.events.$on(e, "mousedown mouseup touchstart touchend touch", "*", f._preventFocus, !0), b.events.$on(e, "focus", "input, textarea, button, select", f._inputFocus, !0), b.events.$on(e, "blur", "input, textarea, button, select", f._inputBlur, !0), b.accessibility.registerPopup(c), b.events.$on(e, "keydown keyup change input", "input, textarea", f._doPlaceholder, !0), b.helpers.isIOS() && b.events.$on(e, "touchend", "label", function () {
                a("#" + a(this).attr("for")).prop("checked", function (a, b) {
                    return !b
                })
            }, !0), b.events.$on(a(b.o_win), "resize", f._windowResize, !0), e
        }

        function v() {
            for (var a in x) if (x.hasOwnProperty(a)) {
                var b = x[a];
                b.html("").removeData().remove(), x[a] = null
            }
            x = []
        }

        function w() {
            b.events.on("shared.destroy", v, !0), b.events.on("window.mousedown", n), b.events.on("window.touchmove", o), b.events.on("mousedown", function (a) {
                g() && (a.stopPropagation(), b.$el.find(".fr-marker").remove(), n(), b.events.disableBlur())
            })
        }

        b.shared.popups || (b.shared.popups = {});
        var x = b.shared.popups;
        return b.shared.exit_flag = !1, {
            _init: w,
            create: u,
            get: j,
            show: d,
            hide: h,
            onHide: i,
            hideAll: m,
            setContainer: c,
            refresh: l,
            onRefresh: k,
            onShow: e,
            isVisible: f,
            areVisible: g
        }
    }, a.FE.MODULES.position = function (b) {
        function c() {
            var a = b.selection.ranges(0), c = a.getBoundingClientRect();
            if (0 == c.top && 0 == c.left && 0 == c.width || 0 == c.height) {
                var d = !1;
                0 == b.$el.find(".fr-marker").length && (b.selection.save(), d = !0);
                var e = b.$el.find(".fr-marker:first");
                e.css("display", "inline"), e.css("line-height", "");
                var f = e.offset(), g = e.outerHeight();
                e.css("display", "none"), e.css("line-height", 0), c = {}, c.left = f.left, c.width = 0, c.height = g, c.top = f.top - (b.helpers.isMobile() ? 0 : b.helpers.scrollTop()), c.right = 1, c.bottom = 1, c.ok = !0, d && b.selection.restore()
            }
            return c
        }

        function d(a, c, d) {
            var e = a.get(0).offsetHeight;
            if (!b.helpers.isMobile() && b.$tb && a.parent().get(0) != b.$tb.get(0)) {
                var f = (a.get(0).parentNode.clientHeight - 20 - (b.opts.toolbarBottom ? b.$tb.get(0).offsetHeight : 0), a.parent().offset().top),
                    g = c - e - (d || 0);
                a.parent().get(0) == b.$sc.get(0) && (f -= a.parent().position().top);
                var h = b.$sc.get(0).scrollHeight;
                f + c + e > b.$sc.offset().top + h && a.parent().offset().top + g > 0 ? (c = g, a.addClass("fr-above")) : a.removeClass("fr-above")
            }
            return c
        }

        function e(a, c) {
            var d = a.get(0).offsetWidth;
            return c + d > b.$sc.get(0).clientWidth - 10 && (c = b.$sc.get(0).clientWidth - d - 10), c < 0 && (c = 10), c
        }

        function f(a) {
            var d = c();
            a.css({top: 0, left: 0});
            var e = d.top + d.height, f = d.left + d.width / 2 - a.get(0).offsetWidth / 2 + b.helpers.scrollLeft();
            b.opts.iframe || (e += b.helpers.scrollTop()), g(f, e, a, d.height)
        }

        function g(a, c, f, g) {
            var h = f.data("container");
            !h || "BODY" === h.get(0).tagName && "static" == h.css("position") || (a && (a -= h.offset().left), c && (c -= h.offset().top), "BODY" != h.get(0).tagName ? (a && (a += h.get(0).scrollLeft), c && (c += h.get(0).scrollTop)) : "absolute" == h.css("position") && (a && (a += h.position().left), c && (c += h.position().top))), b.opts.iframe && h && b.$tb && h.get(0) != b.$tb.get(0) && (a && (a += b.$iframe.offset().left), c && (c += b.$iframe.offset().top));
            var i = e(f, a);
            if (a) {
                f.css("left", i);
                var j = f.data("fr-arrow");
                j || (j = f.find(".fr-arrow"), f.data("fr-arrow", j)), j.data("margin-left") || j.data("margin-left", b.helpers.getPX(j.css("margin-left"))), j.css("margin-left", a - i + j.data("margin-left"))
            }
            c && f.css("top", d(f, c, g))
        }

        function h(c) {
            var d = a(c), e = d.is(".fr-sticky-on"), f = d.data("sticky-top"), g = d.data("sticky-scheduled");
            if ("undefined" == typeof f) {
                d.data("sticky-top", 0);
                var h = a('<div class="fr-sticky-dummy" style="height: ' + d.outerHeight() + 'px;"></div>');
                b.$box.prepend(h)
            } else b.$box.find(".fr-sticky-dummy").css("height", d.outerHeight());
            if (b.core.hasFocus() || b.$tb.find("input:visible:focus").length > 0) {
                var i = b.helpers.scrollTop(),
                    j = Math.min(Math.max(i - b.$tb.parent().offset().top, 0), b.$tb.parent().outerHeight() - d.outerHeight());
                j != f && j != g && (clearTimeout(d.data("sticky-timeout")), d.data("sticky-scheduled", j), d.outerHeight() < i - b.$tb.parent().offset().top && d.addClass("fr-opacity-0"), d.data("sticky-timeout", setTimeout(function () {
                    var a = b.helpers.scrollTop(),
                        c = Math.min(Math.max(a - b.$tb.parent().offset().top, 0), b.$tb.parent().outerHeight() - d.outerHeight());
                    c > 0 && "BODY" == b.$tb.parent().get(0).tagName && (c += b.$tb.parent().position().top), c != f && (d.css("top", Math.max(c, 0)), d.data("sticky-top", c), d.data("sticky-scheduled", c)), d.removeClass("fr-opacity-0")
                }, 100))), e || (d.css("top", "0"), d.width(b.$tb.parent().width()), d.addClass("fr-sticky-on"), b.$box.addClass("fr-sticky-box"))
            } else clearTimeout(a(c).css("sticky-timeout")), d.css("top", "0"), d.css("position", ""), d.width(""), d.data("sticky-top", 0), d.removeClass("fr-sticky-on"), b.$box.removeClass("fr-sticky-box")
        }

        function i(c) {
            if (c.offsetWidth) {
                var d, e, f = a(c), g = f.outerHeight(), h = f.data("sticky-position"),
                    i = a("body" == b.opts.scrollableContainer ? b.o_win : b.opts.scrollableContainer).outerHeight(),
                    j = 0, k = 0;
                "body" !== b.opts.scrollableContainer && (j = b.$sc.offset().top, k = a(b.o_win).outerHeight() - j - i);
                var l = "body" == b.opts.scrollableContainer ? b.helpers.scrollTop() : j, m = f.is(".fr-sticky-on");
                f.data("sticky-parent") || f.data("sticky-parent", f.parent());
                var n = f.data("sticky-parent"), o = n.offset().top, p = n.outerHeight();
                if (f.data("sticky-offset") || (f.data("sticky-offset", !0), f.after('<div class="fr-sticky-dummy" style="height: ' + g + 'px;"></div>')), !h) {
                    var q = "auto" !== f.css("top") || "auto" !== f.css("bottom");
                    q || f.css("position", "fixed"), h = {
                        top: b.node.hasClass(f.get(0), "fr-top"),
                        bottom: b.node.hasClass(f.get(0), "fr-bottom")
                    }, q || f.css("position", ""), f.data("sticky-position", h), f.data("top", b.node.hasClass(f.get(0), "fr-top") ? f.css("top") : "auto"), f.data("bottom", b.node.hasClass(f.get(0), "fr-bottom") ? f.css("bottom") : "auto")
                }
                var r = function () {
                    return o < l + d && o + p - g >= l + d
                }, s = function () {
                    return o + g < l + i - e && o + p > l + i - e
                };
                d = b.helpers.getPX(f.data("top")), e = b.helpers.getPX(f.data("bottom"));
                var t = h.top && r(), u = h.bottom && s();
                t || u ? (f.css("width", n.width() + "px"), m || (f.addClass("fr-sticky-on"), f.removeClass("fr-sticky-off"), f.css("top") && ("auto" != f.data("top") ? f.css("top", b.helpers.getPX(f.data("top")) + j) : f.data("top", "auto")), f.css("bottom") && ("auto" != f.data("bottom") ? f.css("bottom", b.helpers.getPX(f.data("bottom")) + k) : f.css("bottom", "auto")))) : b.node.hasClass(f.get(0), "fr-sticky-off") || (f.width(""), f.removeClass("fr-sticky-on"), f.addClass("fr-sticky-off"), f.css("top") && "auto" != f.data("top") && h.top && f.css("top", 0), f.css("bottom") && "auto" != f.data("bottom") && h.bottom && f.css("bottom", 0))
            }
        }

        function j() {
            var a = document.createElement("test"), c = a.style;
            return c.cssText = "position:" + ["-webkit-", "-moz-", "-ms-", "-o-", ""].join("sticky; position:") + " sticky;", c.position.indexOf("sticky") !== -1 && !b.helpers.isIOS() && !b.helpers.isAndroid() && !b.browser.chrome
        }

        function k() {
            if (!j()) if (b._stickyElements = [], b.helpers.isIOS()) {
                var c = function () {
                    b.helpers.requestAnimationFrame()(c);
                    for (var a = 0; a < b._stickyElements.length; a++) h(b._stickyElements[a])
                };
                c(), b.events.$on(a(b.o_win), "scroll", function () {
                    if (b.core.hasFocus()) for (var c = 0; c < b._stickyElements.length; c++) {
                        var d = a(b._stickyElements[c]), e = d.parent(), f = b.helpers.scrollTop();
                        d.outerHeight() < f - e.offset().top && (d.addClass("fr-opacity-0"), d.data("sticky-top", -1), d.data("sticky-scheduled", -1))
                    }
                }, !0)
            } else b.events.$on(a("body" == b.opts.scrollableContainer ? b.o_win : b.opts.scrollableContainer), "scroll", l, !0), b.events.$on(a(b.o_win), "resize", l, !0), b.events.on("initialized", l), b.events.on("focus", l), b.events.$on(a(b.o_win), "resize", "textarea", l, !0);
            b.events.on("destroy", function (a) {
                b._stickyElements = []
            })
        }

        function l() {
            if (b._stickyElements) for (var a = 0; a < b._stickyElements.length; a++) i(b._stickyElements[a])
        }

        function m(a) {
            a.addClass("fr-sticky"), b.helpers.isIOS() && a.addClass("fr-sticky-ios"), j() || b._stickyElements.push(a.get(0))
        }

        function n() {
            k()
        }

        return {_init: n, forSelection: f, addSticky: m, refresh: l, at: g, getBoundingRect: c}
    }, a.FE.MODULES.refresh = function (b) {
        function c(a) {
            g(a, !b.undo.canDo())
        }

        function d(a) {
            g(a, !b.undo.canRedo())
        }

        function e(a) {
            if (b.node.hasClass(a.get(0), "fr-no-refresh")) return !1;
            for (var c = b.selection.blocks(), d = 0; d < c.length; d++) {
                for (var e = c[d].previousSibling; e && e.nodeType == Node.TEXT_NODE && 0 === e.textContent.length;) e = e.previousSibling;
                if ("LI" != c[d].tagName || e) return g(a, !1), !0;
                g(a, !0)
            }
        }

        function f(c) {
            if (b.node.hasClass(c.get(0), "fr-no-refresh")) return !1;
            for (var d = b.selection.blocks(), e = 0; e < d.length; e++) {
                var f = "rtl" == b.opts.direction || "rtl" == a(d[e]).css("direction") ? "margin-right" : "margin-left";
                if ("LI" == d[e].tagName || "LI" == d[e].parentNode.tagName) return g(c, !1), !0;
                if (b.helpers.getPX(a(d[e]).css(f)) > 0) return g(c, !1), !0
            }
            g(c, !0)
        }

        function g(a, b) {
            a.toggleClass("fr-disabled", b).attr("aria-disabled", b)
        }

        return {undo: c, redo: d, outdent: f, indent: e}
    }, a.extend(a.FE.DEFAULTS, {editInPopup: !1}), a.FE.MODULES.textEdit = function (b) {
        function c() {
            var a = '<div id="fr-text-edit-' + b.id + '" class="fr-layer fr-text-edit-layer"><div class="fr-input-line"><input type="text" placeholder="' + b.language.translate("Text") + '" tabIndex="1"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="updateText" tabIndex="2">' + b.language.translate("Update") + "</button></div></div>",
                c = {edit: a};
            b.popups.create("text.edit", c)
        }

        function d() {
            var c, d = b.popups.get("text.edit");
            c = "INPUT" === b.$el.prop("tagName") ? b.$el.attr("placeholder") : b.$el.text(), d.find("input").val(c).trigger("change"), b.popups.setContainer("text.edit", a("body")), b.popups.show("text.edit", b.$el.offset().left + b.$el.outerWidth() / 2, b.$el.offset().top + b.$el.outerHeight(), b.$el.outerHeight())
        }

        function e() {
            b.events.$on(b.$el, b._mouseup, function (a) {
                setTimeout(function () {
                    d()
                }, 10)
            })
        }

        function f() {
            var a = b.popups.get("text.edit"), c = a.find("input").val();
            0 == c.length && (c = b.opts.placeholderText), "INPUT" === b.$el.prop("tagName") ? b.$el.attr("placeholder", c) : b.$el.text(c), b.events.trigger("contentChanged"), b.popups.hide("text.edit")
        }

        function g() {
            b.opts.editInPopup && (c(), e())
        }

        return {_init: g, update: f}
    }, a.FE.RegisterCommand("updateText", {
        focus: !1, undo: !1, callback: function () {
            this.textEdit.update()
        }
    }), a.extend(a.FE.DEFAULTS, {
        toolbarBottom: !1,
        toolbarButtons: ["fullscreen", "print", "bold", "italic", "underline", "strikeThrough", "subscript", "superscript", "fontFamily", "fontSize", "|", "specialCharacters", "color", "emoticons", "inlineStyle", "paragraphStyle", "|", "paragraphFormat", "align", "formatOL", "formatUL", "outdent", "indent", "quote", "insertHR", "-", "insertLink", "insertImage", "insertVideo", "insertFile", "insertTable", "undo", "redo", "clearFormatting", "selectAll", "html", "applyFormat", "removeFormat", "help"],
        toolbarButtonsXS: ["bold", "italic", "fontFamily", "fontSize", "|", "undo", "redo"],
        toolbarButtonsSM: ["bold", "italic", "underline", "|", "fontFamily", "fontSize", "insertLink", "insertImage", "table", "|", "undo", "redo"],
        toolbarButtonsMD: ["fullscreen", "bold", "italic", "underline", "fontFamily", "fontSize", "color", "paragraphStyle", "paragraphFormat", "align", "formatOL", "formatUL", "outdent", "indent", "quote", "insertHR", "-", "insertLink", "insertImage", "insertVideo", "insertFile", "insertTable", "undo", "redo", "clearFormatting"],
        toolbarContainer: null,
        toolbarInline: !1,
        toolbarSticky: !0,
        toolbarStickyOffset: 0,
        toolbarVisibleWithoutSelection: !1
    }), a.FE.MODULES.toolbar = function (b) {
        function c(a, b) {
            for (var c = 0; c < b.length; c++) "-" != b[c] && "|" != b[c] && a.indexOf(b[c]) < 0 && a.push(b[c])
        }

        function d() {
            var d = a.merge([], e());
            c(d, b.opts.toolbarButtonsXS || []), c(d, b.opts.toolbarButtonsSM || []), c(d, b.opts.toolbarButtonsMD || []), c(d, b.opts.toolbarButtons);
            for (var f = d.length - 1; f >= 0; f--) "-" != d[f] && "|" != d[f] && d.indexOf(d[f]) < f && d.splice(f, 1);
            var g = b.button.buildList(d, e());
            b.$tb.append(g), b.button.bindCommands(b.$tb)
        }

        function e() {
            var a = b.helpers.screenSize();
            return v[a]
        }

        function f() {
            var a = e();
            b.$tb.find(".fr-separator").remove(), b.$tb.find("> .fr-command").addClass("fr-hidden");
            for (var c = 0; c < a.length; c++) if ("|" == a[c] || "-" == a[c]) b.$tb.append(b.button.buildList([a[c]])); else {
                var d = b.$tb.find('> .fr-command[data-cmd="' + a[c] + '"]'), f = null;
                b.node.hasClass(d.next().get(0), "fr-dropdown-menu") && (f = d.next()), d.removeClass("fr-hidden").appendTo(b.$tb), f && f.appendTo(b.$tb)
            }
        }

        function g() {
            b.events.$on(a(b.o_win), "resize", f), b.events.$on(a(b.o_win), "orientationchange", f)
        }

        function h(c, d) {
            setTimeout(function () {
                if (c && c.which == a.FE.KEYCODE.ESC) ; else if (b.selection.inEditor() && b.core.hasFocus() && !b.popups.areVisible() && (b.opts.toolbarVisibleWithoutSelection || !b.selection.isCollapsed() && !b.keys.isIME() || d)) {
                    if (b.$tb.data("instance", b), 0 == b.events.trigger("toolbar.show", [c])) return !1;
                    b.$tb.show(), b.opts.toolbarContainer || b.position.forSelection(b.$tb), b.opts.zIndex > 1 ? b.$tb.css("z-index", b.opts.zIndex + 1) : b.$tb.css("z-index", null)
                }
            }, 0)
        }

        function i(c) {
            var d = a(".fr-dropdown.fr-active");
            return !!d.next().find(b.o_doc.activeElement).length || void(b.events.trigger("toolbar.hide") !== !1 && b.$tb.hide())
        }

        function j() {
            return 0 != b.events.trigger("toolbar.show") && void b.$tb.show()
        }

        function k(c) {
            clearTimeout(w), c && c.which == a.FE.KEYCODE.ESC || (w = setTimeout(h, b.opts.typingTimer))
        }

        function l() {
            b.events.on("window.mousedown", i), b.events.on("keydown", i), b.events.on("blur", i), b.events.on("window.mouseup", h);
            b.helpers.isMobile() ? b.helpers.isIOS() || (b.events.on("window.touchend", h), b.browser.mozilla && setInterval(h, 200)) : b.events.on("window.keyup", k), b.events.on("keydown", function (b) {
                b && b.which == a.FE.KEYCODE.ESC && i()
            }), b.events.on("keydown", function (b) {
                if (b.which == a.FE.KEYCODE.ALT) return b.stopPropagation(), !1
            }, !0), b.events.$on(b.$wp, "scroll.toolbar", h), b.events.on("commands.after", h), b.helpers.isMobile() && (b.events.$on(b.$doc, "selectionchange", k), b.events.$on(b.$doc, "orientationchange", h))
        }

        function m() {
            b.opts.toolbarInline ? (b.$sc.append(b.$tb), b.$tb.data("container", b.$sc), b.$tb.addClass("fr-inline"), b.$tb.prepend('<span class="fr-arrow"></span>'), l(), b.opts.toolbarBottom = !1) : (b.opts.toolbarBottom && !b.helpers.isIOS() ? (b.$box.append(b.$tb), b.$tb.addClass("fr-bottom"), b.$box.addClass("fr-bottom")) : (b.opts.toolbarBottom = !1, b.$box.prepend(b.$tb), b.$tb.addClass("fr-top"), b.$box.addClass("fr-top")), b.$tb.addClass("fr-basic"), b.opts.toolbarSticky && (b.opts.toolbarStickyOffset && (b.opts.toolbarBottom ? b.$tb.css("bottom", b.opts.toolbarStickyOffset) : b.$tb.css("top", b.opts.toolbarStickyOffset)), b.position.addSticky(b.$tb)))
        }

        function n() {
            b.$tb.html("").removeData().remove(), b.$tb = null
        }

        function o() {
            b.$box.removeClass("fr-top fr-bottom fr-inline fr-basic"), b.$box.find(".fr-sticky-dummy").remove()
        }

        function p() {
            b.opts.theme && b.$tb.addClass(b.opts.theme + "-theme"), b.opts.zIndex > 1 && b.$tb.css("z-index", b.opts.zIndex + 1), "auto" != b.opts.direction && b.$tb.removeClass("fr-ltr fr-rtl").addClass("fr-" + b.opts.direction), b.helpers.isMobile() ? b.$tb.addClass("fr-mobile") : b.$tb.addClass("fr-desktop"), b.opts.toolbarContainer ? (b.opts.toolbarInline && (l(), i()), b.opts.toolbarBottom ? b.$tb.addClass("fr-bottom") : b.$tb.addClass("fr-top")) : m(), t = b.$tb.get(0).ownerDocument, u = "defaultView" in t ? t.defaultView : t.parentWindow, d(), g(), b.accessibility.registerToolbar(b.$tb), b.events.$on(b.$tb, b._mousedown + " " + b._mouseup, function (a) {
                var c = a.originalEvent ? a.originalEvent.target || a.originalEvent.originalTarget : null;
                if (c && "INPUT" != c.tagName && !b.edit.isDisabled()) return a.stopPropagation(), a.preventDefault(), !1
            }, !0)
        }

        function q() {
            return b.$sc = a(b.opts.scrollableContainer), !!b.$wp && (b.opts.toolbarContainer ? (b.shared.$tb ? (b.$tb = b.shared.$tb, b.opts.toolbarInline && l()) : (b.shared.$tb = a('<div class="fr-toolbar"></div>'), b.$tb = b.shared.$tb, a(b.opts.toolbarContainer).append(b.$tb), p(), b.$tb.data("instance", b)), b.opts.toolbarInline ? b.$box.addClass("fr-inline") : b.$box.addClass("fr-basic"), b.events.on("focus", function () {
                b.$tb.data("instance", b)
            }, !0), b.opts.toolbarInline = !1) : b.opts.toolbarInline ? (b.$box.addClass("fr-inline"), b.shared.$tb ? (b.$tb = b.shared.$tb, l()) : (b.shared.$tb = a('<div class="fr-toolbar"></div>'), b.$tb = b.shared.$tb, p())) : (b.$box.addClass("fr-basic"), b.$tb = a('<div class="fr-toolbar"></div>'), p(), b.$tb.data("instance", b)), b.events.on("destroy", o, !0), void b.events.on(b.opts.toolbarInline || b.opts.toolbarContainer ? "shared.destroy" : "destroy", n, !0))
        }

        function r() {
            !x && b.$tb && (b.$tb.find("> .fr-command").addClass("fr-disabled fr-no-refresh").attr("aria-disabled", !0), x = !0)
        }

        function s() {
            x && b.$tb && (b.$tb.find("> .fr-command").removeClass("fr-disabled fr-no-refresh").attr("aria-disabled", !1), x = !1), b.button.bulkRefresh()
        }

        var t, u, v = [];
        v[a.FE.XS] = b.opts.toolbarButtonsXS || b.opts.toolbarButtons, v[a.FE.SM] = b.opts.toolbarButtonsSM || b.opts.toolbarButtons, v[a.FE.MD] = b.opts.toolbarButtonsMD || b.opts.toolbarButtons, v[a.FE.LG] = b.opts.toolbarButtons;
        var w = null, x = !1;
        return {_init: q, hide: i, show: j, showInline: h, disable: r, enable: s}
    }
});
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)), a(c), c
    } : a(jQuery)
}(function (a) {
    a.extend(a.FE.DEFAULTS, {
        paragraphStyles: {
            "fr-text-gray": "Gray",
            "fr-text-bordered": "Bordered",
            "fr-text-spaced": "Spaced",
            "fr-text-uppercase": "Uppercase"
        }, paragraphMultipleStyles: !0
    }), a.FE.PLUGINS.paragraphStyle = function (b) {
        function c(c, d, e) {
            "undefined" == typeof d && (d = b.opts.paragraphStyles), "undefined" == typeof e && (e = b.opts.paragraphMultipleStyles);
            var f = "";
            e || (f = Object.keys(d), f.splice(f.indexOf(c), 1), f = f.join(" ")), b.selection.save(), b.html.wrap(!0, !0, !0, !0), b.selection.restore();
            var g = b.selection.blocks();
            b.selection.save();
            for (var h = a(g[0]).hasClass(c), i = 0; i < g.length; i++) a(g[i]).removeClass(f).toggleClass(c, !h), a(g[i]).hasClass("fr-temp-div") && a(g[i]).removeClass("fr-temp-div"), "" === a(g[i]).attr("class") && a(g[i]).removeAttr("class");
            b.html.unwrap(), b.selection.restore()
        }

        function d(c, d) {
            var e = b.selection.blocks();
            if (e.length) {
                var f = a(e[0]);
                d.find(".fr-command").each(function () {
                    var b = a(this).data("param1"), c = f.hasClass(b);
                    a(this).toggleClass("fr-active", c).attr("aria-selected", c)
                })
            }
        }

        function e() {
        }

        return {_init: e, apply: c, refreshOnShow: d}
    }, a.FE.RegisterCommand("paragraphStyle", {
        type: "dropdown", html: function () {
            var a = '<ul class="fr-dropdown-list" role="presentation">', b = this.opts.paragraphStyles;
            for (var c in b) b.hasOwnProperty(c) && (a += '<li role="presentation"><a class="fr-command ' + c + '" tabIndex="-1" role="option" data-cmd="paragraphStyle" data-param1="' + c + '" title="' + this.language.translate(b[c]) + '">' + this.language.translate(b[c]) + "</a></li>");
            return a += "</ul>"
        }, title: "Paragraph Style", callback: function (a, b) {
            this.paragraphStyle.apply(b)
        }, refreshOnShow: function (a, b) {
            this.paragraphStyle.refreshOnShow(a, b)
        }, plugin: "paragraphStyle"
    }), a.FE.DefineIcon("paragraphStyle", {NAME: "magic"})
});
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');
                }
                else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function ($) {
    $.FE.PLUGINS.fullscreen = function (editor) {
        var old_scroll;

        function isActive() {
            return editor.$box.hasClass('fr-fullscreen');
        }

        var $placeholder;
        var height;
        var max_height;
        var z_index;

        function _on() {
            old_scroll = editor.helpers.scrollTop();
            editor.$box.toggleClass('fr-fullscreen');
            $('body').toggleClass('fr-fullscreen');
            $placeholder = $('<div style="display: none;"></div>');
            editor.$box.after($placeholder);
            if (editor.helpers.isMobile()) {
                editor.$tb.data('parent', editor.$tb.parent());
                editor.$tb.prependTo(editor.$box);
                if (editor.$tb.data('sticky-dummy')) {
                    editor.$tb.after(editor.$tb.data('sticky-dummy'));
                }
            }
            height = editor.opts.height;
            max_height = editor.opts.heightMax;
            z_index = editor.opts.zIndex;
            editor.opts.height = editor.o_win.innerHeight - (editor.opts.toolbarInline ? 0 : editor.$tb.outerHeight());
            editor.opts.zIndex = 9990;
            editor.opts.heightMax = null;
            editor.size.refresh();
            if (editor.opts.toolbarInline) editor.toolbar.showInline();
            editor.events.trigger('charCounter.update');
            editor.$win.trigger('scroll');
        }

        function _off() {
            editor.$box.toggleClass('fr-fullscreen');
            $('body').toggleClass('fr-fullscreen');
            editor.$tb.prependTo(editor.$tb.data('parent'));
            if (editor.$tb.data('sticky-dummy')) {
                editor.$tb.after(editor.$tb.data('sticky-dummy'));
            }
            editor.opts.height = height;
            editor.opts.heightMax = max_height;
            editor.opts.zIndex = z_index;
            editor.size.refresh();
            $(editor.o_win).scrollTop(old_scroll)
            if (editor.opts.toolbarInline) editor.toolbar.showInline();
            editor.events.trigger('charCounter.update');
            if (editor.opts.toolbarSticky) {
                if (editor.opts.toolbarStickyOffset) {
                    if (editor.opts.toolbarBottom) {
                        editor.$tb.css('bottom', editor.opts.toolbarStickyOffset).data('bottom', editor.opts.toolbarStickyOffset);
                    }
                    else {
                        editor.$tb.css('top', editor.opts.toolbarStickyOffset).data('top', editor.opts.toolbarStickyOffset);
                    }
                }
            }
            editor.$win.trigger('scroll');
        }

        function toggle() {
            if (!isActive()) {
                _on();
            }
            else {
                _off();
            }
            refresh(editor.$tb.find('.fr-command[data-cmd="fullscreen"]'));
            $(window).trigger('oc.updateUi')
        }

        function refresh($btn) {
            var active = isActive();
            $btn.toggleClass('fr-active', active).attr('aria-pressed', active);
            $btn.find('> *:not(.fr-sr-only)').replaceWith(!active ? editor.icon.create('fullscreen') : editor.icon.create('fullscreenCompress'));
        }

        function _init() {
            if (!editor.$wp) return false;
            editor.events.$on($(editor.o_win), 'resize', function () {
                if (isActive()) {
                    _off();
                    _on();
                }
            });
            editor.events.on('toolbar.hide', function () {
                if (isActive() && editor.helpers.isMobile()) return false;
            })
        }

        return {_init: _init, toggle: toggle, refresh: refresh, isActive: isActive}
    }
    $.FE.RegisterCommand('fullscreen', {
        title: 'Fullscreen',
        undo: false,
        focus: false,
        accessibilityFocus: true,
        forcedRefresh: true,
        toggle: true,
        callback: function () {
            this.fullscreen.toggle();
        },
        refresh: function ($btn) {
            this.fullscreen.refresh($btn);
        },
        plugin: 'fullscreen'
    })
    $.FE.DefineIcon('fullscreen', {NAME: 'expand'});
    $.FE.DefineIcon('fullscreenCompress', {NAME: 'compress'});
}));
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');
                }
                else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function ($) {
    $.extend($.FE.DEFAULTS, {
        aceEditor: true,
        aceEditorVendorPath: '/',
        aceEditorOptions: {showLineNumbers: true, useSoftTabs: false, wrap: true, mode: 'ace/mode/html', tabSize: 2},
        codeBeautifierOptions: {
            end_with_newline: true,
            indent_inner_html: true,
            extra_liners: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'ul', 'ol', 'table', 'dl'],
            brace_style: 'expand',
            indent_char: '\t',
            indent_size: 1,
            wrap_line_length: 0
        },
        codeViewKeepActiveButtons: ['fullscreen']
    })
    $.FE.PLUGINS.codeView = function (editor) {
        var $html_area;
        var ace_editor;

        function isActive() {
            return editor.$box.hasClass('fr-code-view');
        }

        function get() {
            if (ace_editor) {
                return ace_editor.getValue();
            } else {
                return $html_area.val();
            }
        }

        function _showText($btn) {
            var html = get();
            editor.html.set(html);
            editor.$el.blur();
            editor.$tb.find(' > .fr-command').not($btn).removeClass('fr-disabled').attr('aria-disabled', false);
            $btn.removeClass('fr-active').attr('aria-pressed', false);
            editor.events.focus(true);
            editor.placeholder.refresh();
            editor.undo.saveStep();
        }

        function _showHTML($btn) {
            if (!$html_area) {
                _initArea();
                if (!ace_editor && editor.opts.aceEditor && typeof ace != 'undefined') {
                    ace_editor = ace.edit($html_area.get(0));
                    ace.require('ace/config').set('basePath', editor.opts.aceEditorVendorPath);
                    ace_editor.setOptions(editor.opts.aceEditorOptions);
                }
                else {
                    editor.events.$on($html_area, 'keydown keyup change input', function () {
                        if (!editor.opts.height) {
                            if (!this.rows) {
                                this.rows = 1;
                            }
                            if (this.value.length === 0) {
                                this.rows = 1;
                            }
                            else {
                                this.style.height = 'auto';
                                while (this.rows > 1 && this.scrollHeight <= this.offsetHeight) {
                                    this.rows -= 1;
                                }
                                while (this.scrollHeight > this.offsetHeight && (!editor.opts.heightMax || this.offsetHeight < editor.opts.heightMax)) {
                                    this.rows += 1;
                                }
                            }
                        }
                        else {
                            this.removeAttribute('rows')
                        }
                    });
                }
            }
            editor.undo.saveStep();
            editor.html.cleanEmptyTags();
            editor.html.cleanWhiteTags(true);
            if (editor.core.hasFocus()) {
                if (!editor.core.isEmpty()) {
                    editor.selection.save();
                    editor.$el.find('.fr-marker[data-type="true"]:first').replaceWith('<span class="fr-tmp fr-sm">F</span>');
                    editor.$el.find('.fr-marker[data-type="false"]:last').replaceWith('<span class="fr-tmp fr-em">F</span>');
                }
            }
            var html = editor.html.get(false, true);
            editor.$el.find('span.fr-tmp').remove();
            editor.$box.toggleClass('fr-code-view', true);
            if (editor.core.hasFocus()) editor.$el.blur();
            html = html.replace(/<span class="fr-tmp fr-sm">F<\/span>/, 'FROALA-SM');
            html = html.replace(/<span class="fr-tmp fr-em">F<\/span>/, 'FROALA-EM');
            if (editor.codeBeautifier) {
                html = editor.codeBeautifier.run(html, editor.opts.codeBeautifierOptions);
            }
            var s_index;
            var e_index;
            if (ace_editor) {
                s_index = html.indexOf('FROALA-SM');
                e_index = html.indexOf('FROALA-EM');
                if (s_index > e_index) {
                    s_index = e_index;
                }
                else {
                    e_index = e_index - 9;
                }
                html = html.replace(/FROALA-SM/g, '').replace(/FROALA-EM/g, '')
                var s_line = html.substring(0, s_index).length - html.substring(0, s_index).replace(/\n/g, '').length;
                var e_line = html.substring(0, e_index).length - html.substring(0, e_index).replace(/\n/g, '').length;
                s_index = html.substring(0, s_index).length - html.substring(0, html.substring(0, s_index).lastIndexOf('\n') + 1).length;
                e_index = html.substring(0, e_index).length - html.substring(0, html.substring(0, e_index).lastIndexOf('\n') + 1).length;
                ace_editor.$blockScrolling = Infinity
                ace_editor.getSession().setValue(html);
                ace_editor.focus();
                ace_editor.selection.moveCursorToPosition({row: s_line, column: s_index});
                ace_editor.selection.selectToPosition({row: e_line, column: e_index});
                ace_editor.resize();
                ace_editor.session.getUndoManager().reset();
            }
            else {
                s_index = html.indexOf('FROALA-SM');
                e_index = html.indexOf('FROALA-EM') - 9;
                if (editor.opts.heightMin) {
                    $html_area.css('min-height', editor.opts.heightMin);
                }
                if (editor.opts.height) {
                    $html_area.css('height', editor.opts.height);
                }
                if (editor.opts.heightMax) {
                    $html_area.css('max-height', editor.opts.height || editor.opts.heightMax);
                }
                $html_area.val(html.replace(/FROALA-SM/g, '').replace(/FROALA-EM/g, '')).trigger('change');
                var scroll_top = $(editor.o_doc).scrollTop();
                $html_area.focus();
                $html_area.get(0).setSelectionRange(s_index, e_index);
                $(editor.o_doc).scrollTop(scroll_top);
            }
            editor.$tb.find(' > .fr-command').not($btn).filter(function () {
                return editor.opts.codeViewKeepActiveButtons.indexOf($(this).data('cmd')) < 0;
            }).addClass('fr-disabled').attr('aria-disabled', true);
            $btn.addClass('fr-active').attr('aria-pressed', true);
            if (!editor.helpers.isMobile() && editor.opts.toolbarInline) {
                editor.toolbar.hide();
            }
        }

        function toggle(val) {
            if (typeof val == 'undefined') val = !isActive();
            var $btn = editor.$tb.find('.fr-command[data-cmd="html"]');
            if (!val) {
                editor.$box.toggleClass('fr-code-view', false);
                _showText($btn);
            } else {
                editor.popups.hideAll();
                _showHTML($btn);
            }
        }

        function _destroy() {
            if (isActive()) {
                toggle(editor.$tb.find('button[data-cmd="html"]'));
            }
            $html_area.val('').removeData().remove();
            $html_area = null;
            if ($back_button) {
                $back_button.remove();
                $back_button = null;
            }
        }

        function _initArea() {
            $html_area = $('<textarea class="fr-code" tabIndex="-1">');
            editor.$wp.append($html_area);
            $html_area.attr('dir', editor.opts.direction);
            if (!editor.$box.hasClass('fr-basic')) {
                $back_button = $('<a data-cmd="html" title="Code View" class="fr-command fr-btn html-switch' + (editor.helpers.isMobile() ? '' : ' fr-desktop') + '" role="button" tabIndex="-1"><i class="fa fa-code"></i></button>');
                editor.$box.append($back_button);
                editor.events.bindClick(editor.$box, 'a.html-switch', function () {
                    toggle(false);
                });
            }
            var cancel = function () {
                return !isActive();
            }
            editor.events.on('buttons.refresh', cancel);
            editor.events.on('copy', cancel, true);
            editor.events.on('cut', cancel, true);
            editor.events.on('paste', cancel, true);
            editor.events.on('destroy', _destroy, true);
            editor.events.on('html.set', function () {
                if (isActive()) toggle(true);
            });
            editor.events.on('form.submit', function () {
                if (isActive()) {
                    editor.html.set(get());
                    editor.events.trigger('contentChanged', [], true);
                }
            }, true);
        }

        var $back_button;

        function _init() {
            if (!editor.$wp) return false;
        }

        return {_init: _init, toggle: toggle, isActive: isActive, get: get}
    };
    $.FE.RegisterCommand('html', {
        title: 'Code View',
        undo: false,
        focus: false,
        forcedRefresh: true,
        toggle: true,
        callback: function () {
            this.codeView.toggle();
        },
        plugin: 'codeView'
    })
    $.FE.DefineIcon('html', {NAME: 'code'});
}));
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)), a(c), c
    } : a(jQuery)
}(function (a) {
    a.extend(a.FE.DEFAULTS, {
        paragraphFormat: {
            N: "Normal",
            H1: "Heading 1",
            H2: "Heading 2",
            H3: "Heading 3",
            H4: "Heading 4",
            PRE: "Code"
        }, paragraphFormatSelection: !1
    }), a.FE.PLUGINS.paragraphFormat = function (b) {
        function c(c, d) {
            var e = b.html.defaultTag();
            if (d && d.toLowerCase() != e) if (c.find("ul, ol").length > 0) {
                var f = a("<" + d + ">");
                c.prepend(f);
                for (var g = b.node.contents(c.get(0))[0]; g && ["UL", "OL"].indexOf(g.tagName) < 0;) {
                    var h = g.nextSibling;
                    f.append(g), g = h
                }
            } else c.html("<" + d + ">" + c.html() + "</" + d + ">")
        }

        function d(c, d) {
            var e = b.html.defaultTag();
            d || (d = 'div class="fr-temp-div" data-empty="true"'), d.toLowerCase() == e ? c.replaceWith(c.html()) : c.replaceWith(a("<" + d + ">").html(c.html()))
        }

        function e(c, d) {
            var e = b.html.defaultTag();
            d || (d = 'div class="fr-temp-div"' + (b.node.isEmpty(c.get(0), !0) ? ' data-empty="true"' : "")), d.toLowerCase() == e ? (b.node.isEmpty(c.get(0), !0) || c.append("<br/>"), c.replaceWith(c.html())) : c.replaceWith(a("<" + d + ">").html(c.html()))
        }

        function f(c, d) {
            d || (d = 'div class="fr-temp-div"' + (b.node.isEmpty(c.get(0), !0) ? ' data-empty="true"' : "")), c.replaceWith(a("<" + d + " " + b.node.attributes(c.get(0)) + ">").html(c.html()))
        }

        function g(g) {
            "N" == g && (g = b.html.defaultTag()), b.selection.save(), b.html.wrap(!0, !0, !0, !0), b.selection.restore();
            var h = b.selection.blocks();
            b.selection.save(), b.$el.find("pre").attr("skip", !0);
            for (var i = 0; i < h.length; i++) if (h[i].tagName != g && !b.node.isList(h[i])) {
                var j = a(h[i]);
                "LI" == h[i].tagName ? c(j, g) : "LI" == h[i].parentNode.tagName && h[i] ? d(j, g) : ["TD", "TH"].indexOf(h[i].parentNode.tagName) >= 0 ? e(j, g) : f(j, g)
            }
            b.$el.find('pre:not([skip="true"]) + pre:not([skip="true"])').each(function () {
                a(this).prev().append("<br>" + a(this).html()), a(this).remove()
            }), b.$el.find("pre").removeAttr("skip"), b.html.unwrap(), b.selection.restore()
        }

        function h(a, c) {
            var d = b.selection.blocks();
            if (d.length) {
                var e = d[0], f = "N", g = b.html.defaultTag();
                e.tagName.toLowerCase() != g && e != b.el && (f = e.tagName), c.find('.fr-command[data-param1="' + f + '"]').addClass("fr-active").attr("aria-selected", !0)
            } else c.find('.fr-command[data-param1="N"]').addClass("fr-active").attr("aria-selected", !0)
        }

        function i(a) {
            if (b.opts.paragraphFormatSelection) {
                var c = b.selection.blocks();
                if (c.length) {
                    var d = c[0], e = "N", f = b.html.defaultTag();
                    d.tagName.toLowerCase() != f && d != b.el && (e = d.tagName), ["LI", "TD", "TH"].indexOf(e) >= 0 && (e = "N"), a.find("> span").text(b.opts.paragraphFormat[e])
                } else a.find("> span").text(b.opts.paragraphFormat.N)
            }
        }

        return {apply: g, refreshOnShow: h, refresh: i}
    }, a.FE.RegisterCommand("paragraphFormat", {
        type: "dropdown", displaySelection: function (a) {
            return a.opts.paragraphFormatSelection
        }, defaultSelection: "Normal", displaySelectionWidth: 100, html: function () {
            var a = '<ul class="fr-dropdown-list" role="presentation">', b = this.opts.paragraphFormat;
            for (var c in b) if (b.hasOwnProperty(c)) {
                var d = this.shortcuts.get("paragraphFormat." + c);
                d = d ? '<span class="fr-shortcut">' + d + "</span>" : "", a += '<li role="presentation"><' + ("N" == c ? this.html.defaultTag() || "DIV" : c) + ' style="padding: 0 !important; margin: 0 !important;" role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="paragraphFormat" data-param1="' + c + '" title="' + this.language.translate(b[c]) + '">' + this.language.translate(b[c]) + "</a></" + ("N" == c ? this.html.defaultTag() || "DIV" : c) + "></li>"
            }
            return a += "</ul>"
        }, title: "Paragraph Format", callback: function (a, b) {
            this.paragraphFormat.apply(b)
        }, refresh: function (a) {
            this.paragraphFormat.refresh(a)
        }, refreshOnShow: function (a, b) {
            this.paragraphFormat.refreshOnShow(a, b)
        }, plugin: "paragraphFormat"
    }), a.FE.DefineIcon("paragraphFormat", {NAME: "paragraph"})
});
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)), a(c), c
    } : a(jQuery)
}(function (a) {
    a.FE.PLUGINS.align = function (b) {
        function c(c) {
            b.selection.save(), b.html.wrap(!0, !0, !0, !0), b.selection.restore();
            for (var d = b.selection.blocks(), e = 0; e < d.length; e++) b.helpers.getAlignment(a(d[e].parentNode)) == c ? a(d[e]).css("text-align", "").removeClass("fr-temp-div") : a(d[e]).css("text-align", c).removeClass("fr-temp-div"), "" === a(d[e]).attr("class") && a(d[e]).removeAttr("class"), "" === a(d[e]).attr("style") && a(d[e]).removeAttr("style");
            b.selection.save(), b.html.unwrap(), b.selection.restore()
        }

        function d(c) {
            var d = b.selection.blocks();
            if (d.length) {
                var e = b.helpers.getAlignment(a(d[0]));
                c.find("> *:first").replaceWith(b.icon.create("align-" + e))
            }
        }

        function e(c, d) {
            var e = b.selection.blocks();
            if (e.length) {
                var f = b.helpers.getAlignment(a(e[0]));
                d.find('a.fr-command[data-param1="' + f + '"]').addClass("fr-active").attr("aria-selected", !0)
            }
        }

        return {apply: c, refresh: d, refreshOnShow: e}
    }, a.FE.DefineIcon("align", {NAME: "align-left"}), a.FE.DefineIcon("align-left", {NAME: "align-left"}), a.FE.DefineIcon("align-right", {NAME: "align-right"}), a.FE.DefineIcon("align-center", {NAME: "align-center"}), a.FE.DefineIcon("align-justify", {NAME: "align-justify"}), a.FE.RegisterCommand("align", {
        type: "dropdown",
        title: "Align",
        options: {left: "Align Left", center: "Align Center", right: "Align Right", justify: "Align Justify"},
        html: function () {
            var b = '<ul class="fr-dropdown-list" role="presentation">', c = a.FE.COMMANDS.align.options;
            for (var d in c) c.hasOwnProperty(d) && (b += '<li role="presentation"><a class="fr-command fr-title" tabIndex="-1" role="option" data-cmd="align" data-param1="' + d + '" title="' + this.language.translate(c[d]) + '">' + this.icon.create("align-" + d) + '<span class="fr-sr-only">' + this.language.translate(c[d]) + "</span></a></li>");
            return b += "</ul>"
        },
        callback: function (a, b) {
            this.align.apply(b)
        },
        refresh: function (a) {
            this.align.refresh(a)
        },
        refreshOnShow: function (a, b) {
            this.align.refreshOnShow(a, b)
        },
        plugin: "align"
    })
});
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)), a(c), c
    } : a(jQuery)
}(function (a) {
    a.FE.PLUGINS.lists = function (b) {
        function c(a) {
            return '<span class="fr-open-' + a.toLowerCase() + '"></span>'
        }

        function d(a) {
            return '<span class="fr-close-' + a.toLowerCase() + '"></span>'
        }

        function e(b, c) {
            for (var d = [], e = 0; e < b.length; e++) {
                var f = b[e].parentNode;
                "LI" == b[e].tagName && f.tagName != c && d.indexOf(f) < 0 && d.push(f)
            }
            for (e = d.length - 1; e >= 0; e--) {
                var g = a(d[e]);
                g.replaceWith("<" + c.toLowerCase() + ">" + g.html() + "</" + c.toLowerCase() + ">")
            }
        }

        function f(c, d) {
            e(c, d);
            for (var f = b.html.defaultTag(), g = 0; g < c.length; g++) "LI" != c[g].tagName && (f && c[g].tagName.toLowerCase() == f ? a(c[g]).replaceWith("<" + d + "><li" + b.node.attributes(c[g]) + ">" + a(c[g]).html() + "</li></" + d + ">") : a(c[g]).wrap("<" + d + "><li></li></" + d + ">"));
            b.clean.lists()
        }

        function g(e) {
            var f, g;
            for (f = e.length - 1; f >= 0; f--) for (g = f - 1; g >= 0; g--) if (a(e[g]).find(e[f]).length || e[g] == e[f]) {
                e.splice(f, 1);
                break
            }
            var h = [];
            for (f = 0; f < e.length; f++) {
                var i = a(e[f]), j = e[f].parentNode;
                i.before(d(j.tagName)), "LI" == j.parentNode.tagName ? (i.before(d("LI")), i.after(c("LI"))) : (b.node.isEmpty(i.get(0), !0) || 0 !== i.find(b.html.blockTagsQuery()).length || i.append("<br>"), i.append(c("LI")), i.prepend(d("LI"))), i.after(c(j.tagName)), "LI" == j.parentNode.tagName && (j = j.parentNode.parentNode), h.indexOf(j) < 0 && h.push(j)
            }
            for (f = 0; f < h.length; f++) {
                var k = a(h[f]), l = k.html();
                l = l.replace(/<span class="fr-close-([a-z]*)"><\/span>/g, "</$1>"), l = l.replace(/<span class="fr-open-([a-z]*)"><\/span>/g, "<$1>"), k.replaceWith(b.node.openTagString(k.get(0)) + l + b.node.closeTagString(k.get(0)))
            }
            b.$el.find("li:empty").remove(), b.$el.find("ul:empty, ol:empty").remove(), b.clean.lists(), b.html.wrap()
        }

        function h(a, b) {
            for (var c = !0, d = 0; d < a.length; d++) {
                if ("LI" != a[d].tagName) return !1;
                a[d].parentNode.tagName != b && (c = !1)
            }
            return c
        }

        function i(a) {
            b.selection.save(), b.html.wrap(!0, !0, !0, !0), b.selection.restore();
            for (var c = b.selection.blocks(), d = 0; d < c.length; d++) "LI" != c[d].tagName && "LI" == c[d].parentNode.tagName && (c[d] = c[d].parentNode);
            b.selection.save(), h(c, a) ? g(c) : f(c, a), b.html.unwrap(), b.selection.restore()
        }

        function j(c, d) {
            var e = a(b.selection.element());
            if (e.get(0) != b.el) {
                var f = e.get(0);
                "LI" != f.tagName && (f = e.parents("li").get(0)), f && f.parentNode.tagName == d && b.el.contains(f.parentNode) && c.addClass("fr-active")
            }
        }

        function k(c) {
            b.selection.save();
            for (var d = 0; d < c.length; d++) {
                var e = c[d].previousSibling;
                if (e) {
                    var f = a(c[d]).find("> ul, > ol").last().get(0);
                    if (f) {
                        for (var g = a("<li>").prependTo(a(f)), h = b.node.contents(c[d])[0]; h && !b.node.isList(h);) {
                            var i = h.nextSibling;
                            g.append(h), h = i
                        }
                        a(e).append(a(f)), a(c[d]).remove()
                    } else {
                        var j = a(e).find("> ul, > ol").last().get(0);
                        if (j) a(j).append(a(c[d])); else {
                            var k = a("<" + c[d].parentNode.tagName + ">");
                            a(e).append(k), k.append(a(c[d]))
                        }
                    }
                }
            }
            b.clean.lists(), b.selection.restore()
        }

        function l(a) {
            b.selection.save(), g(a), b.selection.restore()
        }

        function m(a) {
            if ("indent" == a || "outdent" == a) {
                for (var c = !1, d = b.selection.blocks(), e = [], f = 0; f < d.length; f++) "LI" == d[f].tagName ? (c = !0, e.push(d[f])) : "LI" == d[f].parentNode.tagName && (c = !0, e.push(d[f].parentNode));
                c && ("indent" == a ? k(e) : l(e))
            }
        }

        function n() {
            b.events.on("commands.after", m), b.events.on("keydown", function (c) {
                if (c.which == a.FE.KEYCODE.TAB) {
                    for (var d = b.selection.blocks(), e = [], f = 0; f < d.length; f++) "LI" == d[f].tagName ? e.push(d[f]) : "LI" == d[f].parentNode.tagName && e.push(d[f].parentNode);
                    if (e.length > 1 || e.length && (b.selection.info(e[0]).atStart || b.node.isEmpty(e[0]))) return c.preventDefault(), c.stopPropagation(), c.shiftKey ? l(e) : k(e), !1
                }
            }, !0)
        }

        return {_init: n, format: i, refresh: j}
    }, a.FE.RegisterCommand("formatUL", {
        title: "Unordered List", refresh: function (a) {
            this.lists.refresh(a, "UL")
        }, callback: function () {
            this.lists.format("UL")
        }, plugin: "lists"
    }), a.FE.RegisterCommand("formatOL", {
        title: "Ordered List", refresh: function (a) {
            this.lists.refresh(a, "OL")
        }, callback: function () {
            this.lists.format("OL")
        }, plugin: "lists"
    }), a.FE.DefineIcon("formatUL", {NAME: "list-ul"}), a.FE.DefineIcon("formatOL", {NAME: "list-ol"})
});
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');
                }
                else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function ($) {
    $.extend($.FE.POPUP_TEMPLATES, {'file.insert': '[_BUTTONS_][_UPLOAD_LAYER_][_BY_URL_LAYER_][_PROGRESS_BAR_]'})
    $.extend($.FE.DEFAULTS, {
        fileUploadURL: 'http://i.froala.com/upload',
        fileUploadParam: 'file',
        fileUploadParams: {},
        fileUploadToS3: false,
        fileUploadMethod: 'POST',
        fileMaxSize: 10 * 1024 * 1024,
        fileAllowedTypes: ['*'],
        fileInsertButtons: ['fileBack', '|', 'fileUpload', 'fileByURL'],
        fileUseSelectedText: false
    });
    $.FE.PLUGINS.file = function (editor) {
        var BAD_LINK = 1;
        var MISSING_LINK = 2;
        var ERROR_DURING_UPLOAD = 3;
        var BAD_RESPONSE = 4;
        var MAX_SIZE_EXCEEDED = 5;
        var BAD_FILE_TYPE = 6;
        var NO_CORS_IE = 7;
        var error_messages = {};
        error_messages[BAD_LINK] = 'File cannot be loaded from the passed link.';
        error_messages[MISSING_LINK] = 'No link in upload response.';
        error_messages[ERROR_DURING_UPLOAD] = 'Error during file upload.';
        error_messages[BAD_RESPONSE] = 'Parsing response failed.';
        error_messages[MAX_SIZE_EXCEEDED] = 'File is too large.';
        error_messages[BAD_FILE_TYPE] = 'File file type is invalid.';
        error_messages[NO_CORS_IE] = 'Files can be uploaded only to same domain in IE 8 and IE 9.';

        function showInsertPopup() {
            var $btn = editor.$tb.find('.fr-command[data-cmd="insertFile"]');
            var $popup = editor.popups.get('file.insert');
            if (!$popup) $popup = _initInsertPopup();
            hideProgressBar();
            if (!$popup.hasClass('fr-active')) {
                editor.popups.refresh('file.insert');
                editor.popups.setContainer('file.insert', editor.$tb);
                var left = $btn.offset().left + $btn.outerWidth() / 2;
                var top = $btn.offset().top + (editor.opts.toolbarBottom ? 10 : $btn.outerHeight() - 10);
                editor.popups.show('file.insert', left, top, $btn.outerHeight());
            }
        }

        function showProgressBar() {
            var $popup = editor.popups.get('file.insert');
            if (!$popup) $popup = _initInsertPopup();
            $popup.find('.fr-layer.fr-active').removeClass('fr-active').addClass('fr-pactive');
            $popup.find('.fr-file-progress-bar-layer').addClass('fr-active');
            $popup.find('.fr-buttons').hide();
            _setProgressMessage('Uploading', 0);
        }

        function hideProgressBar(dismiss) {
            var $popup = editor.popups.get('file.insert');
            if ($popup) {
                $popup.find('.fr-layer.fr-pactive').addClass('fr-active').removeClass('fr-pactive');
                $popup.find('.fr-file-progress-bar-layer').removeClass('fr-active');
                $popup.find('.fr-buttons').show();
                if (dismiss) {
                    editor.events.focus();
                    editor.popups.hide('file.insert');
                }
            }
        }

        function _setProgressMessage(message, progress) {
            var $popup = editor.popups.get('file.insert');
            if ($popup) {
                var $layer = $popup.find('.fr-file-progress-bar-layer');
                $layer.find('h3').text(message + (progress ? ' ' + progress + '%' : ''));
                $layer.removeClass('fr-error');
                if (progress) {
                    $layer.find('div').removeClass('fr-indeterminate');
                    $layer.find('div > span').css('width', progress + '%');
                }
                else {
                    $layer.find('div').addClass('fr-indeterminate');
                }
            }
        }

        function _showErrorMessage(message) {
            showProgressBar();
            var $popup = editor.popups.get('file.insert');
            var $layer = $popup.find('.fr-file-progress-bar-layer');
            $layer.addClass('fr-error');
            var $message_header = $layer.find('h3');
            $message_header.text(message);
            editor.events.disableBlur();
            $message_header.focus();
        }

        function insertByURL() {
            var $popup = editor.popups.get('file.insert');
            var $input = $popup.find('.fr-file-by-url-layer input');
            var url = $input.val()
            if (url.length > 0) {
                var filename = url.substring(url.lastIndexOf('/') + 1);
                insert(editor.helpers.sanitizeURL($input.val()), filename, []);
                $input.val('');
                $input.blur();
            }
        }

        function insert(link, text, response) {
            editor.edit.on();
            editor.events.focus(true);
            editor.selection.restore();
            if (editor.opts.fileUseSelectedText && editor.selection.text().length) {
                text = editor.selection.text();
            }
            editor.html.insert('<a href="' + link + '" id="fr-inserted-file" class="fr-file">' + text + '</a>');
            var $file = editor.$el.find('#fr-inserted-file');
            $file.removeAttr('id');
            editor.popups.hide('file.insert');
            editor.undo.saveStep();
            _syncFiles();
            editor.events.trigger('file.inserted', [$file, response]);
        }

        function _parseResponse(response) {
            try {
                if (editor.events.trigger('file.uploaded', [response], true) === false) {
                    editor.edit.on();
                    return false;
                }
                var resp = $.parseJSON(response);
                if (resp.link) {
                    return resp;
                } else {
                    _throwError(MISSING_LINK, response);
                    return false;
                }
            } catch (ex) {
                _throwError(BAD_RESPONSE, response);
                return false;
            }
        }

        function _parseXMLResponse(response) {
            try {
                var link = $(response).find('Location').text();
                var key = $(response).find('Key').text();
                if (editor.events.trigger('file.uploadedToS3', [link, key, response], true) === false) {
                    editor.edit.on();
                    return false;
                }
                return link;
            } catch (ex) {
                _throwError(BAD_RESPONSE, response);
                return false;
            }
        }

        function _fileUploaded(text) {
            var status = this.status;
            var response = this.response;
            var responseXML = this.responseXML;
            var responseText = this.responseText;
            try {
                if (editor.opts.fileUploadToS3) {
                    if (status == 201) {
                        var link = _parseXMLResponse(responseXML);
                        if (link) {
                            insert(link, text, response || responseXML);
                        }
                    } else {
                        _throwError(BAD_RESPONSE, response || responseXML);
                    }
                }
                else {
                    if (status >= 200 && status < 300) {
                        var resp = _parseResponse(responseText);
                        if (resp) {
                            insert(resp.link, text, response || responseText);
                        }
                    }
                    else {
                        _throwError(ERROR_DURING_UPLOAD, response || responseText);
                    }
                }
            } catch (ex) {
                _throwError(BAD_RESPONSE, response || responseText);
            }
        }

        function _fileUploadError() {
            _throwError(BAD_RESPONSE, this.response || this.responseText || this.responseXML);
        }

        function _fileUploadProgress(e) {
            if (e.lengthComputable) {
                var complete = (e.loaded / e.total * 100 | 0);
                _setProgressMessage('Uploading', complete);
            }
        }

        function _throwError(code, response) {
            editor.edit.on();
            _showErrorMessage(editor.language.translate('Something went wrong. Please try again.'));
            editor.events.trigger('file.error', [{code: code, message: error_messages[code]}, response]);
        }

        function _fileUploadAborted() {
            editor.edit.on();
            hideProgressBar(true);
        }

        function upload(files) {
            if (typeof files != 'undefined' && files.length > 0) {
                if (editor.events.trigger('file.beforeUpload', [files]) === false) {
                    return false;
                }
                var file = files[0];
                if (file.size > editor.opts.fileMaxSize) {
                    _throwError(MAX_SIZE_EXCEEDED);
                    return false;
                }
                if (editor.opts.fileAllowedTypes.indexOf('*') < 0 && editor.opts.fileAllowedTypes.indexOf(file.type.replace(/file\//g, '')) < 0) {
                    _throwError(BAD_FILE_TYPE);
                    return false;
                }
                var form_data;
                if (editor.drag_support.formdata) {
                    form_data = editor.drag_support.formdata ? new FormData() : null;
                }
                if (form_data) {
                    var key;
                    if (editor.opts.fileUploadToS3 !== false) {
                        form_data.append('key', editor.opts.fileUploadToS3.keyStart + (new Date()).getTime() + '-' + (file.name || 'untitled'));
                        form_data.append('success_action_status', '201');
                        form_data.append('X-Requested-With', 'xhr');
                        form_data.append('Content-Type', file.type);
                        for (key in editor.opts.fileUploadToS3.params) {
                            if (editor.opts.fileUploadToS3.params.hasOwnProperty(key)) {
                                form_data.append(key, editor.opts.fileUploadToS3.params[key]);
                            }
                        }
                    }
                    for (key in editor.opts.fileUploadParams) {
                        if (editor.opts.fileUploadParams.hasOwnProperty(key)) {
                            form_data.append(key, editor.opts.fileUploadParams[key]);
                        }
                    }
                    form_data.append(editor.opts.fileUploadParam, file);
                    var url = editor.opts.fileUploadURL;
                    if (editor.opts.fileUploadToS3) {
                        if (editor.opts.fileUploadToS3.uploadURL) {
                            url = editor.opts.fileUploadToS3.uploadURL;
                        }
                        else {
                            url = 'https://' + editor.opts.fileUploadToS3.region + '.amazonaws.com/' + editor.opts.fileUploadToS3.bucket;
                        }
                    }
                    var xhr = editor.core.getXHR(url, editor.opts.fileUploadMethod);
                    xhr.onload = function () {
                        _fileUploaded.call(xhr, file.name);
                    };
                    xhr.onerror = _fileUploadError;
                    xhr.upload.onprogress = _fileUploadProgress;
                    xhr.onabort = _fileUploadAborted;
                    showProgressBar();
                    editor.edit.off();
                    var $popup = editor.popups.get('file.insert');
                    if ($popup) {
                        $popup.off('abortUpload').on('abortUpload', function () {
                            if (xhr.readyState != 4) {
                                xhr.abort();
                            }
                        })
                    }
                    xhr.send(form_data);
                }
            }
        }

        function _bindInsertEvents($popup) {
            editor.events.$on($popup, 'dragover dragenter', '.fr-file-upload-layer', function () {
                $(this).addClass('fr-drop');
                return false;
            }, true);
            editor.events.$on($popup, 'dragleave dragend', '.fr-file-upload-layer', function () {
                $(this).removeClass('fr-drop');
                return false;
            }, true);
            editor.events.$on($popup, 'drop', '.fr-file-upload-layer', function (e) {
                e.preventDefault();
                e.stopPropagation();
                $(this).removeClass('fr-drop');
                var dt = e.originalEvent.dataTransfer;
                if (dt && dt.files) {
                    var inst = $popup.data('instance') || editor;
                    inst.file.upload(dt.files);
                }
            }, true);
            editor.events.$on($popup, 'change', '.fr-file-upload-layer input[type="file"]', function () {
                if (this.files) {
                    var inst = $popup.data('instance') || editor;
                    inst.file.upload(this.files);
                }
                $(this).val('');
            }, true);
        }

        function _hideInsertPopup() {
            hideProgressBar();
        }

        function _initInsertPopup(delayed) {
            if (delayed) {
                editor.popups.onHide('file.insert', _hideInsertPopup);
                return true;
            }
            var active;
            var file_buttons = '';
            if (editor.opts.fileInsertButtons.length > 1) {
                file_buttons = '<div class="fr-buttons">' + editor.button.buildList(editor.opts.fileInsertButtons) + '</div>';
            }
            var uploadIndex = editor.opts.fileInsertButtons.indexOf('fileUpload');
            var urlIndex = editor.opts.fileInsertButtons.indexOf('fileByURL');
            var upload_layer = '';
            if (uploadIndex >= 0) {
                active = ' fr-active';
                if (urlIndex >= 0 && uploadIndex > urlIndex) {
                    active = '';
                }
                upload_layer = '<div class="fr-file-upload-layer' + active + ' fr-layer fr-active" id="fr-file-upload-layer-' + editor.id + '"><strong>' + editor.language.translate('Drop file') + '</strong><br>(' + editor.language.translate('or click') + ')<div class="fr-form"><input type="file" name="' + editor.opts.fileUploadParam + '" accept="/*" tabIndex="-1" aria-labelledby="fr-file-upload-layer-' + editor.id + '" role="button"></div></div>'
            }
            var by_url_layer = '';
            if (urlIndex >= 0) {
                active = ' fr-active';
                if (uploadIndex >= 0 && urlIndex > uploadIndex) {
                    active = '';
                }
                by_url_layer = '<div class="fr-file-by-url-layer' + active + ' fr-layer" id="fr-file-by-url-layer-' + editor.id + '"><div class="fr-input-line"><input type="text" placeholder="http://" tabIndex="1"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="fileInsertByURL" tabIndex="2">' + editor.language.translate('Insert') + '</button></div></div>'
            }
            var progress_bar_layer = '<div class="fr-file-progress-bar-layer fr-layer"><h3 tabIndex="-1" class="fr-message">Uploading</h3><div class="fr-loader"><span class="fr-progress"></span></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-dismiss" data-cmd="fileDismissError" tabIndex="2" role="button">OK</button></div></div>';
            var template = {
                buttons: file_buttons,
                upload_layer: upload_layer,
                by_url_layer: by_url_layer,
                progress_bar: progress_bar_layer
            };
            var $popup = editor.popups.create('file.insert', template);
            _bindInsertEvents($popup);
            return $popup;
        }

        function _onRemove(link) {
            if (editor.node.hasClass(link, 'fr-file')) {
                return editor.events.trigger('file.unlink', [link]);
            }
        }

        function _drop(e) {
            var dt = e.originalEvent.dataTransfer;
            if (dt && dt.files && dt.files.length) {
                var file = dt.files[0];
                if (file && typeof file.type != 'undefined') {
                    if (file.type.indexOf('image') < 0 && (editor.opts.fileAllowedTypes.indexOf(file.type) >= 0 || editor.opts.fileAllowedTypes.indexOf('*') >= 0)) {
                        editor.markers.remove();
                        editor.markers.insertAtPoint(e.originalEvent);
                        editor.$el.find('.fr-marker').replaceWith($.FE.MARKERS);
                        editor.popups.hideAll();
                        var $popup = editor.popups.get('file.insert');
                        if (!$popup) $popup = _initInsertPopup();
                        editor.popups.setContainer('file.insert', editor.$sc);
                        editor.popups.show('file.insert', e.originalEvent.pageX, e.originalEvent.pageY);
                        showProgressBar();
                        upload(dt.files);
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    }
                }
            }
        }

        function _initEvents() {
            editor.events.on('drop', _drop);
            editor.events.$on(editor.$win, 'keydown', function (e) {
                var key_code = e.which;
                var $popup = editor.popups.get('file.insert');
                if ($popup && key_code == $.FE.KEYCODE.ESC) {
                    $popup.trigger('abortUpload');
                }
            });
            editor.events.on('destroy', function () {
                var $popup = editor.popups.get('file.insert');
                if ($popup) {
                    $popup.trigger('abortUpload');
                }
            });
        }

        function back() {
            editor.events.disableBlur();
            editor.selection.restore();
            editor.events.enableBlur();
            editor.popups.hide('file.insert');
            editor.toolbar.showInline();
        }

        var files;

        function _syncFiles() {
            var c_files = Array.prototype.slice.call(editor.el.querySelectorAll('a.fr-file'));
            var file_srcs = [];
            var i;
            for (i = 0; i < c_files.length; i++) {
                file_srcs.push(c_files[i].getAttribute('href'));
            }
            if (files) {
                for (i = 0; i < files.length; i++) {
                    if (file_srcs.indexOf(files[i].getAttribute('href')) < 0) {
                        editor.events.trigger('file.unlink', [files[i]]);
                    }
                }
            }
            files = c_files;
        }

        function showLayer(name) {
            var $popup = editor.popups.get('file.insert');
            var left;
            var top;
            if (!editor.opts.toolbarInline) {
                var $btn = editor.$tb.find('.fr-command[data-cmd="insertFile"]');
                left = $btn.offset().left + $btn.outerWidth() / 2;
                top = $btn.offset().top + (editor.opts.toolbarBottom ? 10 : $btn.outerHeight() - 10);
            }
            else {
                top = $popup.offset().top - editor.helpers.getPX($popup.css('margin-top'));
                if ($popup.hasClass('fr-above')) {
                    top += $popup.outerHeight();
                }
            }
            $popup.find('.fr-layer').removeClass('fr-active');
            $popup.find('.fr-' + name + '-layer').addClass('fr-active');
            editor.popups.show('file.insert', left, top, 0);
        }

        function refreshUploadButton($btn) {
            var $popup = editor.popups.get('file.insert');
            if ($popup.find('.fr-file-upload-layer').hasClass('fr-active')) {
                $btn.addClass('fr-active');
            }
        }

        function refreshByURLButton($btn) {
            var $popup = editor.popups.get('file.insert');
            if ($popup.find('.fr-file-by-url-layer').hasClass('fr-active')) {
                $btn.addClass('fr-active');
            }
        }

        function _init() {
            _initEvents();
            editor.events.on('link.beforeRemove', _onRemove);
            if (editor.$wp) {
                _syncFiles();
                editor.events.on('contentChanged', _syncFiles);
            }
            _initInsertPopup(true);
        }

        return {
            _init: _init,
            showInsertPopup: showInsertPopup,
            showLayer: showLayer,
            refreshUploadButton: refreshUploadButton,
            refreshByURLButton: refreshByURLButton,
            insertByURL: insertByURL,
            upload: upload,
            insert: insert,
            back: back,
            hideProgressBar: hideProgressBar
        }
    }
    $.FE.DefineIcon('insertFile', {NAME: 'file-o'});
    $.FE.RegisterCommand('insertFile', {
        title: 'Insert File',
        undo: false,
        focus: true,
        refreshAfterCallback: false,
        popup: true,
        callback: function () {
            if (!this.popups.isVisible('file.insert')) {
                this.file.showInsertPopup();
            }
            else {
                if (this.$el.find('.fr-marker').length) {
                    this.events.disableBlur();
                    this.selection.restore();
                }
                this.popups.hide('file.insert');
            }
        },
        plugin: 'file'
    });
    $.FE.DefineIcon('fileUpload', {NAME: 'upload'});
    $.FE.RegisterCommand('fileUpload', {
        title: 'Upload File', undo: false, focus: false, callback: function () {
            this.file.showLayer('file-upload');
        }, refresh: function ($btn) {
            this.file.refreshUploadButton($btn);
        }
    });
    $.FE.DefineIcon('fileByURL', {NAME: 'link'});
    $.FE.RegisterCommand('fileByURL', {
        title: 'By URL', undo: false, focus: false, callback: function () {
            this.file.showLayer('file-by-url');
        }, refresh: function ($btn) {
            this.file.refreshByURLButton($btn);
        }
    })
    $.FE.RegisterCommand('fileInsertByURL', {
        title: 'Insert File',
        undo: true,
        refreshAfterCallback: false,
        callback: function () {
            this.file.insertByURL();
        },
        refresh: function ($btn) {
            $btn.text(this.language.translate('Insert'));
        }
    })
    $.FE.DefineIcon('fileBack', {NAME: 'arrow-left'});
    $.FE.RegisterCommand('fileBack', {
        title: 'Back', undo: false, focus: false, back: true, refreshAfterCallback: false, callback: function () {
            this.file.back();
        }, refresh: function ($btn) {
            if (!this.opts.toolbarInline) {
                $btn.addClass('fr-hidden');
                $btn.next('.fr-separator').addClass('fr-hidden');
            }
            else {
                $btn.removeClass('fr-hidden');
                $btn.next('.fr-separator').removeClass('fr-hidden');
            }
        }
    });
    $.FE.RegisterCommand('fileDismissError', {
        title: 'OK', callback: function () {
            this.file.hideProgressBar(true);
        }
    })
}));
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)), a(c), c
    } : a(jQuery)
}(function (a) {
    a.extend(a.FE.POPUP_TEMPLATES, {
        "image.insert": "[_BUTTONS_][_UPLOAD_LAYER_][_BY_URL_LAYER_][_PROGRESS_BAR_]",
        "image.edit": "[_BUTTONS_]",
        "image.alt": "[_BUTTONS_][_ALT_LAYER_]",
        "image.size": "[_BUTTONS_][_SIZE_LAYER_]"
    }), a.extend(a.FE.DEFAULTS, {
        imageInsertButtons: ["imageBack", "|", "imageUpload", "imageByURL"],
        imageEditButtons: ["imageReplace", "imageRemove", "|", "imageLink", "linkOpen", "linkEdit", "linkRemove", "-", "imageStyle", "imageAlt", "imageSize"],
        imageAltButtons: ["imageBack", "|"],
        imageSizeButtons: ["imageBack", "|"],
        imageUploadURL: "https://i.froala.com/upload",
        imageUploadParam: "file",
        imageUploadParams: {},
        imageUploadToS3: !1,
        imageUploadMethod: "POST",
        imageMaxSize: 10485760,
        imageAllowedTypes: ["jpeg", "jpg", "png", "gif", "svg+xml"],
        imageResize: !0,
        imageResizeWithPercent: !1,
        imageRoundPercent: !1,
        imageDefaultWidth: null,
        imageDefaultAlign: "center",
        imageDefaultDisplay: "block",
        imageSplitHTML: !1,
        imageStyles: {"ft-rounded": "Rounded", "fr-bordered": "Bordered"},
        imageMove: !0,
        imageMultipleStyles: !0,
        imageTextNear: !0,
        imagePaste: !0,
        imagePasteProcess: !1,
        imageMinWidth: 16,
        imageOutputSize: !1,
        imageDefaultMargin: 5
    }), a.FE.PLUGINS.image = function (b) {
        function c() {
            var a = b.popups.get("image.insert"), c = a.find(".fr-image-by-url-layer input");
            c.val(""), xa && c.val(xa.attr("src")), c.trigger("change")
        }

        function d() {
            var a = b.$tb.find('.fr-command[data-cmd="insertImage"]'), c = b.popups.get("image.insert");
            if (c || (c = M()), s(), !c.hasClass("fr-active")) if (b.popups.refresh("image.insert"), b.popups.setContainer("image.insert", b.$tb), a.is(":visible")) {
                var d = a.offset().left + a.outerWidth() / 2,
                    e = a.offset().top + (b.opts.toolbarBottom ? 10 : a.outerHeight() - 10);
                b.popups.show("image.insert", d, e, a.outerHeight())
            } else b.position.forSelection(c), b.popups.show("image.insert")
        }

        function e() {
            var a = b.popups.get("image.edit");
            if (a || (a = q()), a) {
                b.popups.setContainer("image.edit", b.$sc), b.popups.refresh("image.edit");
                var c = xa.offset().left + xa.outerWidth() / 2, d = xa.offset().top + xa.outerHeight();
                b.popups.show("image.edit", c, d, xa.outerHeight())
            }
        }

        function f() {
            s()
        }

        function g(a) {
            a.hasClass("fr-dii") || a.hasClass("fr-dib") || (a.addClass("fr-fi" + ma(a)[0]), a.addClass("fr-di" + na(a)[0]), a.css("margin", ""), a.css("float", ""), a.css("display", ""), a.css("z-index", ""), a.css("position", ""), a.css("overflow", ""), a.css("vertical-align", ""))
        }

        function h(a) {
            var b = a.hasClass("fr-dib") ? "block" : a.hasClass("fr-dii") ? "inline" : null,
                c = a.hasClass("fr-fil") ? "left" : a.hasClass("fr-fir") ? "right" : ma(a);
            ka(a, b, c), a.removeClass("fr-dib fr-dii fr-fir fr-fil")
        }

        function i() {
            for (var c = "IMG" == b.el.tagName ? [b.el] : b.el.querySelectorAll("img"), d = 0; d < c.length; d++) {
                var e = a(c[d]);
                !b.opts.htmlUntouched && b.opts.useClasses ? ((b.opts.imageEditButtons.indexOf("imageAlign") >= 0 || b.opts.imageEditButtons.indexOf("imageDisplay") >= 0) && g(e), b.opts.imageTextNear || e.removeClass("fr-dii").addClass("fr-dib")) : b.opts.htmlUntouched || b.opts.useClasses || (b.opts.imageEditButtons.indexOf("imageAlign") >= 0 || b.opts.imageEditButtons.indexOf("imageDisplay") >= 0) && h(e), b.opts.iframe && e.on("load", b.size.syncIframe)
            }
        }

        function j() {
            var c, d = Array.prototype.slice.call(b.el.querySelectorAll("img")), e = [];
            for (c = 0; c < d.length; c++) e.push(d[c].getAttribute("src")), a(d[c]).toggleClass("fr-draggable", b.opts.imageMove), "" === d[c].getAttribute("class") && d[c].removeAttribute("class"), "" === d[c].getAttribute("style") && d[c].removeAttribute("style");
            if (Ka) for (c = 0; c < Ka.length; c++) e.indexOf(Ka[c].getAttribute("src")) < 0 && b.events.trigger("image.removed", [a(Ka[c])]);
            Ka = d
        }

        function k() {
            ya || Z();
            var a = b.$wp || b.$sc;
            a.append(ya), ya.data("instance", b);
            var c = a.scrollTop() - ("static" != a.css("position") ? a.offset().top : 0),
                d = a.scrollLeft() - ("static" != a.css("position") ? a.offset().left : 0);
            d -= b.helpers.getPX(a.css("border-left-width")), c -= b.helpers.getPX(a.css("border-top-width")), b.$el.is("img") && (c = 0, d = 0), ya.css("top", (b.opts.iframe ? xa.offset().top : xa.offset().top + c) - 1).css("left", (b.opts.iframe ? xa.offset().left : xa.offset().left + d) - 1).css("width", xa.get(0).getBoundingClientRect().width).css("height", xa.get(0).getBoundingClientRect().height).addClass("fr-active")
        }

        function l(a) {
            return '<div class="fr-handler fr-h' + a + '"></div>'
        }

        function m(c) {
            if (!b.core.sameInstance(ya)) return !0;
            if (c.preventDefault(), c.stopPropagation(), b.$el.find("img.fr-error").left) return !1;
            b.undo.canDo() || b.undo.saveStep(), za = a(this), za.data("start-x", c.pageX || c.originalEvent.touches[0].pageX), za.data("start-width", xa.width()), za.data("start-height", xa.height());
            var d = xa.width();
            if (b.opts.imageResizeWithPercent) {
                var e = xa.parentsUntil(b.$el, b.html.blockTagsQuery()).get(0) || b.el;
                xa.css("width", (d / a(e).outerWidth() * 100).toFixed(2) + "%")
            } else xa.css("width", d);
            Aa.show(), b.popups.hideAll(), ia()
        }

        function n(c) {
            if (!b.core.sameInstance(ya)) return !0;
            if (za && xa) {
                if (c.preventDefault(), b.$el.find("img.fr-error").left) return !1;
                var d = c.pageX || (c.originalEvent.touches ? c.originalEvent.touches[0].pageX : null);
                if (!d) return !1;
                var e = za.data("start-x"), f = d - e, g = za.data("start-width");
                if ((za.hasClass("fr-hnw") || za.hasClass("fr-hsw")) && (f = 0 - f), b.opts.imageResizeWithPercent) {
                    var h = xa.parentsUntil(b.$el, b.html.blockTagsQuery()).get(0) || b.el;
                    g = ((g + f) / a(h).outerWidth() * 100).toFixed(2), b.opts.imageRoundPercent && (g = Math.round(g)), xa.css("width", g + "%"), xa.css("height", "").removeAttr("height")
                } else g + f >= b.opts.imageMinWidth && xa.css("width", g + f), xa.css("height", za.data("start-height") * xa.width() / za.data("start-width"));
                k(), b.events.trigger("image.resize", [va()])
            }
        }

        function o(a) {
            if (!b.core.sameInstance(ya)) return !0;
            if (za && xa) {
                if (a && a.stopPropagation(), b.$el.find("img.fr-error").left) return !1;
                za = null, Aa.hide(), k(), e(), b.undo.saveStep(), b.events.trigger("image.resizeEnd", [va()])
            }
        }

        function p(a, c) {
            b.edit.on(), xa && xa.addClass("fr-error"), u(b.language.translate("Something went wrong. Please try again.")), b.events.trigger("image.error", [{
                code: a,
                message: Ja[a]
            }, c])
        }

        function q(a) {
            if (a) return b.$wp && b.events.$on(b.$wp, "scroll", function () {
                xa && b.popups.isVisible("image.edit") && (b.events.disableBlur(), w(xa))
            }), !0;
            var c = "";
            if (b.opts.imageEditButtons.length > 0) {
                c += '<div class="fr-buttons">', c += b.button.buildList(b.opts.imageEditButtons), c += "</div>";
                var d = {buttons: c}, e = b.popups.create("image.edit", d);
                return e
            }
            return !1
        }

        function r(a) {
            var c = b.popups.get("image.insert");
            if (c || (c = M()), c.find(".fr-layer.fr-active").removeClass("fr-active").addClass("fr-pactive"), c.find(".fr-image-progress-bar-layer").addClass("fr-active"), c.find(".fr-buttons").hide(), xa) {
                b.popups.setContainer("image.insert", b.$sc);
                var d = xa.offset().left + xa.width() / 2, e = xa.offset().top + xa.height();
                b.popups.show("image.insert", d, e, xa.outerHeight())
            }
            "undefined" == typeof a && t("Uploading", 0)
        }

        function s(a) {
            var c = b.popups.get("image.insert");
            if (c && (c.find(".fr-layer.fr-pactive").addClass("fr-active").removeClass("fr-pactive"), c.find(".fr-image-progress-bar-layer").removeClass("fr-active"), c.find(".fr-buttons").show(), a || b.$el.find("img.fr-error").length)) {
                if (b.events.focus(), b.$el.find("img.fr-error").length && (b.$el.find("img.fr-error").remove(), b.undo.saveStep(), b.undo.run(), b.undo.dropRedo()), !b.$wp && xa) {
                    var d = xa;
                    ga(!0), b.selection.setAfter(d.get(0)), b.selection.restore()
                }
                b.popups.hide("image.insert")
            }
        }

        function t(a, c) {
            var d = b.popups.get("image.insert");
            if (d) {
                var e = d.find(".fr-image-progress-bar-layer");
                e.find("h3").text(a + (c ? " " + c + "%" : "")), e.removeClass("fr-error"), c ? (e.find("div").removeClass("fr-indeterminate"), e.find("div > span").css("width", c + "%")) : e.find("div").addClass("fr-indeterminate")
            }
        }

        function u(a) {
            r();
            var c = b.popups.get("image.insert"), d = c.find(".fr-image-progress-bar-layer");
            d.addClass("fr-error");
            var e = d.find("h3");
            e.text(a), b.events.disableBlur(), e.focus()
        }

        function v() {
            var a = b.popups.get("image.insert"), c = a.find(".fr-image-by-url-layer input");
            c.val().length > 0 && (r(), t("Loading image"), y(c.val(), !0, [], xa), c.val(""), c.blur())
        }

        function w(a) {
            fa.call(a.get(0))
        }

        function x() {
            var c = a(this);
            b.popups.hide("image.insert"), c.removeClass("fr-uploading"), c.next().is("br") && c.next().remove(), w(c), b.events.trigger("image.loaded", [c])
        }

        function y(a, c, d, e, f) {
            b.edit.off(), t("Loading image"), c && (a = b.helpers.sanitizeURL(a));
            var g = new Image;
            g.onload = function () {
                var c, g;
                if (e) {
                    b.undo.canDo() || e.hasClass("fr-uploading") || b.undo.saveStep();
                    var h = e.data("fr-old-src");
                    b.$wp ? (c = e.clone().removeData("fr-old-src").removeClass("fr-uploading"), c.off("load"), h && e.attr("src", h), e.replaceWith(c)) : c = e;
                    for (var i = c.get(0).attributes, k = 0; k < i.length; k++) {
                        var l = i[k];
                        0 === l.nodeName.indexOf("data-") && c.removeAttr(l.nodeName)
                    }
                    if ("undefined" != typeof d) for (g in d) d.hasOwnProperty(g) && "link" != g && c.attr("data-" + g, d[g]);
                    c.on("load", x), c.attr("src", a), b.edit.on(), j(), b.undo.saveStep(), b.$el.blur(), b.events.trigger(h ? "image.replaced" : "image.inserted", [c, f])
                } else c = E(a, d, x), j(), b.undo.saveStep(), b.events.trigger("image.inserted", [c, f])
            }, g.onerror = function () {
                p(Ca)
            }, r("Loading image"), g.src = a
        }

        function z(c) {
            try {
                if (b.events.trigger("image.uploaded", [c], !0) === !1) return b.edit.on(), !1;
                var d = a.parseJSON(c);
                return d.link ? d : (p(Da, c), !1)
            } catch (e) {
                return p(Fa, c), !1
            }
        }

        function A(c) {
            try {
                var d = a(c).find("Location").text(), e = a(c).find("Key").text();
                return b.events.trigger("image.uploadedToS3", [d, e, c], !0) === !1 ? (b.edit.on(), !1) : d
            } catch (f) {
                return p(Fa, c), !1
            }
        }

        function B(a) {
            t("Loading image");
            var c = this.status, d = this.response, e = this.responseXML, f = this.responseText;
            try {
                if (b.opts.imageUploadToS3) if (201 == c) {
                    var g = A(e);
                    g && y(g, !1, [], a, d || e)
                } else p(Fa, d || e); else if (c >= 200 && c < 300) {
                    var h = z(f);
                    h && y(h.link, !1, h, a, d || f)
                } else p(Ea, d || f)
            } catch (i) {
                p(Fa, d || f)
            }
        }

        function C() {
            p(Fa, this.response || this.responseText || this.responseXML)
        }

        function D(a) {
            if (a.lengthComputable) {
                var b = a.loaded / a.total * 100 | 0;
                t("Uploading", b)
            }
        }

        function E(c, d, e) {
            var f, g = "";
            if (d && "undefined" != typeof d) for (f in d) d.hasOwnProperty(f) && "link" != f && (g += " data-" + f + '="' + d[f] + '"');
            var h = b.opts.imageDefaultWidth;
            h && "auto" != h && (h += b.opts.imageResizeWithPercent ? "%" : "px");
            var i = a('<img src="' + c + '"' + g + (h ? ' style="width: ' + h + ';"' : "") + ">");
            ka(i, b.opts.imageDefaultDisplay, b.opts.imageDefaultAlign), i.on("load", e), b.edit.on(), b.events.focus(!0), b.selection.restore(), b.undo.saveStep(), b.opts.imageSplitHTML ? b.markers.split() : b.markers.insert();
            var j = b.$el.find(".fr-marker");
            return j.replaceWith(i), b.html.wrap(), b.selection.clear(), i
        }

        function F() {
            b.edit.on(), s(!0)
        }

        function G(c, d, e) {
            function f() {
                var e = a(this);
                e.off("load"), e.addClass("fr-uploading"), e.next().is("br") && e.next().remove(), b.placeholder.refresh(), e.is(xa) || w(e), k(), r(), b.edit.off(), c.onload = function () {
                    B.call(c, e)
                }, c.onerror = C, c.upload.onprogress = D, c.onabort = F, e.off("abortUpload").on("abortUpload", function () {
                    4 != c.readyState && c.abort()
                }), c.send(d)
            }

            var g, h = new FileReader;
            h.addEventListener("load", function () {
                var a = h.result;
                if (h.result.indexOf("svg+xml") < 0) {
                    for (var c = atob(h.result.split(",")[1]), d = [], e = 0; e < c.length; e++) d.push(c.charCodeAt(e));
                    a = window.URL.createObjectURL(new Blob([new Uint8Array(d)], {type: "image/jpeg"}))
                }
                xa ? (xa.on("load", f), b.edit.on(), b.undo.saveStep(), xa.data("fr-old-src", xa.attr("src")), xa.attr("src", a)) : g = E(a, null, f)
            }, !1), h.readAsDataURL(e)
        }

        function H(a) {
            if ("undefined" != typeof a && a.length > 0) {
                if (b.events.trigger("image.beforeUpload", [a]) === !1) return !1;
                var c = a[0];
                if (c.size > b.opts.imageMaxSize) return p(Ga), !1;
                if (b.opts.imageAllowedTypes.indexOf(c.type.replace(/image\//g, "")) < 0) return p(Ha), !1;
                var d;
                if (b.drag_support.formdata && (d = b.drag_support.formdata ? new FormData : null), d) {
                    var e;
                    if (b.opts.imageUploadToS3 !== !1) {
                        d.append("key", b.opts.imageUploadToS3.keyStart + (new Date).getTime() + "-" + (c.name || "untitled")), d.append("success_action_status", "201"), d.append("X-Requested-With", "xhr"), d.append("Content-Type", c.type);
                        for (e in b.opts.imageUploadToS3.params) b.opts.imageUploadToS3.params.hasOwnProperty(e) && d.append(e, b.opts.imageUploadToS3.params[e])
                    }
                    for (e in b.opts.imageUploadParams) b.opts.imageUploadParams.hasOwnProperty(e) && d.append(e, b.opts.imageUploadParams[e]);
                    d.append(b.opts.imageUploadParam, c);
                    var f = b.opts.imageUploadURL;
                    b.opts.imageUploadToS3 && (f = b.opts.imageUploadToS3.uploadURL ? b.opts.imageUploadToS3.uploadURL : "https://" + b.opts.imageUploadToS3.region + ".amazonaws.com/" + b.opts.imageUploadToS3.bucket);
                    var g = b.core.getXHR(f, b.opts.imageUploadMethod);
                    G(g, d, c)
                }
            }
        }

        function I(c) {
            b.events.$on(c, "dragover dragenter", ".fr-image-upload-layer", function () {
                return a(this).addClass("fr-drop"), !1
            }), b.events.$on(c, "dragleave dragend", ".fr-image-upload-layer", function () {
                return a(this).removeClass("fr-drop"), !1
            }), b.events.$on(c, "drop", ".fr-image-upload-layer", function (d) {
                d.preventDefault(), d.stopPropagation(), a(this).removeClass("fr-drop");
                var e = d.originalEvent.dataTransfer;
                if (e && e.files) {
                    var f = c.data("instance") || b;
                    f.events.disableBlur(), f.image.upload(e.files), f.events.enableBlur()
                }
            }), b.events.$on(c, "change", '.fr-image-upload-layer input[type="file"]', function () {
                if (this.files) {
                    var d = c.data("instance") || b;
                    d.events.disableBlur(), c.find("input:focus").blur(), d.events.enableBlur(), d.image.upload(this.files)
                }
                a(this).val("")
            })
        }

        function J(c) {
            var d = c.originalEvent.dataTransfer;
            if (d && d.files && d.files.length) {
                var e = d.files[0];
                if (e && e.type && b.opts.imageAllowedTypes.indexOf(e.type.replace(/image\//g, "")) >= 0) {
                    b.markers.remove(), b.markers.insertAtPoint(c.originalEvent), b.$el.find(".fr-marker").replaceWith(a.FE.MARKERS), b.popups.hideAll();
                    var f = b.popups.get("image.insert");
                    return f || (f = M()), b.popups.setContainer("image.insert", b.$sc), b.popups.show("image.insert", c.originalEvent.pageX, c.originalEvent.pageY), r(), H(d.files), c.preventDefault(), c.stopPropagation(), !1
                }
            }
        }

        function K() {
            var c, d, e = b.selection.ranges(0);
            e.collapsed && e.startContainer.nodeType == Node.ELEMENT_NODE && (e.startContainer.childNodes.length == e.startOffset ? (c = e.startContainer.childNodes[e.startOffset - 1], c && "IMG" == c.tagName && "block" == a(c).css("display") && (d = b.node.blockParent(c), d && b.html.defaultTag() ? d.nextSibling || (["TD", "TH"].indexOf(d.tagName) < 0 ? a(d).after("<" + b.html.defaultTag() + "><br>" + a.FE.MARKERS + "</" + b.html.defaultTag() + ">") : a(c).after("<br>" + a.FE.MARKERS), b.selection.restore()) : d || (a(c).after("<br>" + a.FE.MARKERS), b.selection.restore()))) : 0 === e.startOffset && e.startContainer.childNodes.length > e.startOffset && (c = e.startContainer.childNodes[e.startOffset], c && "IMG" == c.tagName && "block" == a(c).css("display") && (d = b.node.blockParent(c), d && b.html.defaultTag() ? d.previousSibling || (["TD", "TH"].indexOf(d.tagName) < 0 ? a(d).before("<" + b.html.defaultTag() + "><br>" + a.FE.MARKERS + "</" + b.html.defaultTag() + ">") : a(c).before("<br>" + a.FE.MARKERS), b.selection.restore()) : d || (a(c).before(a.FE.MARKERS + "<br>"), b.selection.restore()))))
        }

        function L() {
            b.events.$on(b.$el, b._mousedown, "IMG" == b.el.tagName ? null : 'img:not([contenteditable="false"])', function (c) {
                return "false" == a(this).parents("[contenteditable]:not(.fr-element):not(body):first").attr("contenteditable") || (b.helpers.isMobile() || b.selection.clear(), Ba = !0, b.popups.areVisible() && b.events.disableBlur(), b.browser.msie && (b.events.disableBlur(), b.$el.attr("contenteditable", !1)), b.draggable || c.preventDefault(), void c.stopPropagation())
            }), b.events.$on(b.$el, b._mouseup, "IMG" == b.el.tagName ? null : 'img:not([contenteditable="false"])', function (c) {
                return "false" == a(this).parents("[contenteditable]:not(.fr-element):not(body):first").attr("contenteditable") || void(Ba && (Ba = !1, c.stopPropagation(), b.browser.msie && (b.$el.attr("contenteditable", !0), b.events.enableBlur())))
            }), b.events.on("keyup", function (c) {
                if (c.shiftKey && "" === b.selection.text().replace(/\n/g, "")) {
                    var d = b.selection.element(), e = b.selection.endElement();
                    d && "IMG" == d.tagName ? w(a(d)) : e && "IMG" == e.tagName && w(a(e))
                }
            }, !0), b.events.on("drop", J), b.events.on("mousedown window.mousedown", ha), b.events.on("window.touchmove", ia), b.events.on("mouseup window.mouseup", function () {
                return xa ? (ga(), !1) : void ia()
            }), b.events.on("commands.mousedown", function (a) {
                a.parents(".fr-toolbar").length > 0 && ga()
            }), b.browser.edge || b.events.on("mouseup", K), b.events.on("blur image.hideResizer commands.undo commands.redo element.dropped", function () {
                Ba = !1, ga(!0)
            })
        }

        function M(a) {
            if (a) return b.popups.onRefresh("image.insert", c), b.popups.onHide("image.insert", f), !0;
            var d, e = "";
            b.opts.imageInsertButtons.length > 1 && (e = '<div class="fr-buttons">' + b.button.buildList(b.opts.imageInsertButtons) + "</div>");
            var g = b.opts.imageInsertButtons.indexOf("imageUpload"),
                h = b.opts.imageInsertButtons.indexOf("imageByURL"), i = "";
            g >= 0 && (d = " fr-active", h >= 0 && g > h && (d = ""), i = '<div class="fr-image-upload-layer' + d + ' fr-layer" id="fr-image-upload-layer-' + b.id + '"><strong>' + b.language.translate("Drop image") + "</strong><br>(" + b.language.translate("or click") + ')<div class="fr-form"><input type="file" accept="image/' + b.opts.imageAllowedTypes.join(", image/").toLowerCase() + '" tabIndex="-1" aria-labelledby="fr-image-upload-layer-' + b.id + '" role="button"></div></div>');
            var j = "";
            h >= 0 && (d = " fr-active", g >= 0 && h > g && (d = ""), j = '<div class="fr-image-by-url-layer' + d + ' fr-layer" id="fr-image-by-url-layer-' + b.id + '"><div class="fr-input-line"><input id="fr-image-by-url-layer-text-' + b.id + '" type="text" placeholder="http://" tabIndex="1" aria-required="true"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageInsertByURL" tabIndex="2" role="button">' + b.language.translate("Insert") + "</button></div></div>");
            var k = '<div class="fr-image-progress-bar-layer fr-layer"><h3 tabIndex="-1" class="fr-message">Uploading</h3><div class="fr-loader"><span class="fr-progress"></span></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-dismiss" data-cmd="imageDismissError" tabIndex="2" role="button">OK</button></div></div>',
                l = {buttons: e, upload_layer: i, by_url_layer: j, progress_bar: k},
                m = b.popups.create("image.insert", l);
            return b.$wp && b.events.$on(b.$wp, "scroll", function () {
                xa && b.popups.isVisible("image.insert") && sa()
            }), I(m), m
        }

        function N() {
            if (xa) {
                var a = b.popups.get("image.alt");
                a.find("input").val(xa.attr("alt") || "").trigger("change")
            }
        }

        function O() {
            var a = b.popups.get("image.alt");
            a || (a = P()), s(), b.popups.refresh("image.alt"), b.popups.setContainer("image.alt", b.$sc);
            var c = xa.offset().left + xa.width() / 2, d = xa.offset().top + xa.height();
            b.popups.show("image.alt", c, d, xa.outerHeight())
        }

        function P(a) {
            if (a) return b.popups.onRefresh("image.alt", N), !0;
            var c = "";
            c = '<div class="fr-buttons">' + b.button.buildList(b.opts.imageAltButtons) + "</div>";
            var d = "";
            d = '<div class="fr-image-alt-layer fr-layer fr-active" id="fr-image-alt-layer-' + b.id + '"><div class="fr-input-line"><input id="fr-image-alt-layer-text-' + b.id + '" type="text" placeholder="' + b.language.translate("Alternate Text") + '" tabIndex="1"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageSetAlt" tabIndex="2" role="button">' + b.language.translate("Update") + "</button></div></div>";
            var e = {buttons: c, alt_layer: d}, f = b.popups.create("image.alt", e);
            return b.$wp && b.events.$on(b.$wp, "scroll.image-alt", function () {
                xa && b.popups.isVisible("image.alt") && O()
            }), f
        }

        function Q(a) {
            if (xa) {
                var c = b.popups.get("image.alt");
                xa.attr("alt", a || c.find("input").val() || ""), c.find("input:focus").blur(), w(xa)
            }
        }

        function R() {
            if (xa) {
                var a = b.popups.get("image.size");
                a.find('input[name="width"]').val(xa.get(0).style.width).trigger("change"), a.find('input[name="height"]').val(xa.get(0).style.height).trigger("change")
            }
        }

        function S() {
            var a = b.popups.get("image.size");
            a || (a = T()), s(), b.popups.refresh("image.size"), b.popups.setContainer("image.size", b.$sc);
            var c = xa.offset().left + xa.width() / 2, d = xa.offset().top + xa.height();
            b.popups.show("image.size", c, d, xa.outerHeight())
        }

        function T(a) {
            if (a) return b.popups.onRefresh("image.size", R), !0;
            var c = "";
            c = '<div class="fr-buttons">' + b.button.buildList(b.opts.imageSizeButtons) + "</div>";
            var d = "";
            d = '<div class="fr-image-size-layer fr-layer fr-active" id="fr-image-size-layer-' + b.id + '"><div class="fr-image-group"><div class="fr-input-line"><input id="fr-image-size-layer-width-' + b.id + '" type="text" name="width" placeholder="' + b.language.translate("Width") + '" tabIndex="1"></div><div class="fr-input-line"><input id="fr-image-size-layer-height' + b.id + '" type="text" name="height" placeholder="' + b.language.translate("Height") + '" tabIndex="1"></div></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageSetSize" tabIndex="2" role="button">' + b.language.translate("Update") + "</button></div></div>";
            var e = {buttons: c, size_layer: d}, f = b.popups.create("image.size", e);
            return b.$wp && b.events.$on(b.$wp, "scroll.image-size", function () {
                xa && b.popups.isVisible("image.size") && S()
            }), f
        }

        function U(a, c) {
            if (xa) {
                var d = b.popups.get("image.size");
                a = a || d.find('input[name="width"]').val() || "", c = c || d.find('input[name="height"]').val() || "";
                var e = /^[\d]+((px)|%)*$/g;
                a.match(e) && xa.css("width", a), c.match(e) && xa.css("height", c), d.find("input:focus").blur(), w(xa)
            }
        }

        function V(a) {
            var c, d, e = b.popups.get("image.insert");
            if (xa || b.opts.toolbarInline) xa && (d = xa.offset().top + xa.outerHeight()); else {
                var f = b.$tb.find('.fr-command[data-cmd="insertImage"]');
                c = f.offset().left + f.outerWidth() / 2, d = f.offset().top + (b.opts.toolbarBottom ? 10 : f.outerHeight() - 10)
            }
            !xa && b.opts.toolbarInline && (d = e.offset().top - b.helpers.getPX(e.css("margin-top")), e.hasClass("fr-above") && (d += e.outerHeight())), e.find(".fr-layer").removeClass("fr-active"), e.find(".fr-" + a + "-layer").addClass("fr-active"), b.popups.show("image.insert", c, d, xa ? xa.outerHeight() : 0), b.accessibility.focusPopup(e)
        }

        function W(a) {
            var c = b.popups.get("image.insert");
            c.find(".fr-image-upload-layer").hasClass("fr-active") && a.addClass("fr-active").attr("aria-pressed", !0)
        }

        function X(a) {
            var c = b.popups.get("image.insert");
            c.find(".fr-image-by-url-layer").hasClass("fr-active") && a.addClass("fr-active").attr("aria-pressed", !0)
        }

        function Y(a, b, c, d) {
            return a.pageX = b, m.call(this, a), a.pageX = a.pageX + c * Math.floor(Math.pow(1.1, d)), n.call(this, a), o.call(this, a), ++d
        }

        function Z() {
            var c;
            if (b.shared.$image_resizer ? (ya = b.shared.$image_resizer, Aa = b.shared.$img_overlay, b.events.on("destroy", function () {
                ya.removeClass("fr-active").appendTo(a("body"))
            }, !0)) : (b.shared.$image_resizer = a('<div class="fr-image-resizer"></div>'), ya = b.shared.$image_resizer, b.events.$on(ya, "mousedown", function (a) {
                a.stopPropagation()
            }, !0), b.opts.imageResize && (ya.append(l("nw") + l("ne") + l("sw") + l("se")), b.shared.$img_overlay = a('<div class="fr-image-overlay"></div>'), Aa = b.shared.$img_overlay, c = ya.get(0).ownerDocument, a(c).find("body").append(Aa))), b.events.on("shared.destroy", function () {
                ya.html("").removeData().remove(), ya = null, b.opts.imageResize && (Aa.remove(), Aa = null)
            }, !0), b.helpers.isMobile() || b.events.$on(a(b.o_win), "resize", function () {
                xa && !xa.hasClass("fr-uploading") ? ga(!0) : xa && (k(), sa(), r(!1))
            }), b.opts.imageResize) {
                c = ya.get(0).ownerDocument, b.events.$on(ya, b._mousedown, ".fr-handler", m), b.events.$on(a(c), b._mousemove, n), b.events.$on(a(c.defaultView || c.parentWindow), b._mouseup, o), b.events.$on(Aa, "mouseleave", o);
                var d = 1, e = null, f = 0;
                b.events.on("keydown", function (c) {
                    if (xa) {
                        var g = navigator.userAgent.indexOf("Mac OS X") != -1 ? c.metaKey : c.ctrlKey, h = c.which;
                        (h !== e || c.timeStamp - f > 200) && (d = 1), (h == a.FE.KEYCODE.EQUALS || b.browser.mozilla && h == a.FE.KEYCODE.FF_EQUALS) && g && !c.altKey ? d = Y.call(this, c, 1, 1, d) : (h == a.FE.KEYCODE.HYPHEN || b.browser.mozilla && h == a.FE.KEYCODE.FF_HYPHEN) && g && !c.altKey ? d = Y.call(this, c, 2, -1, d) : b.keys.ctrlKey(c) || h != a.FE.KEYCODE.ENTER || (xa.before("<br>"), w(xa)), e = h, f = c.timeStamp
                    }
                }, !0), b.events.on("keyup", function () {
                    d = 1
                })
            }
        }

        function $(c) {
            c = c || xa, c && b.events.trigger("image.beforeRemove", [c]) !== !1 && (b.popups.hideAll(), ta(), ga(!0), b.undo.canDo() || b.undo.saveStep(), c.get(0) == b.el ? c.removeAttr("src") : ("A" == c.get(0).parentNode.tagName ? (b.selection.setBefore(c.get(0).parentNode) || b.selection.setAfter(c.get(0).parentNode) || c.parent().after(a.FE.MARKERS), a(c.get(0).parentNode).remove()) : (b.selection.setBefore(c.get(0)) || b.selection.setAfter(c.get(0)) || c.after(a.FE.MARKERS), c.remove()), b.html.fillEmptyBlocks(), b.selection.restore()), b.undo.saveStep())
        }

        function _(c) {
            var d = c.which;
            if (xa && (d == a.FE.KEYCODE.BACKSPACE || d == a.FE.KEYCODE.DELETE)) return c.preventDefault(), c.stopPropagation(), $(), !1;
            if (xa && d == a.FE.KEYCODE.ESC) {
                var e = xa;
                return ga(!0), b.selection.setAfter(e.get(0)), b.selection.restore(), c.preventDefault(), !1
            }
            if (xa && (d == a.FE.KEYCODE.ARROW_LEFT || d == a.FE.KEYCODE.ARROW_RIGHT)) {
                var f = xa.get(0);
                return ga(!0), d == a.FE.KEYCODE.ARROW_LEFT ? b.selection.setBefore(f) : b.selection.setAfter(f), b.selection.restore(), c.preventDefault(), !1
            }
            return xa && d != a.FE.KEYCODE.F10 && !b.keys.isBrowserAction(c) ? (c.preventDefault(), c.stopPropagation(), !1) : void 0
        }

        function aa(a) {
            if (a && "IMG" == a.tagName) b.node.hasClass(a, "fr-uploading") || b.node.hasClass(a, "fr-error") ? a.parentNode.removeChild(a) : b.node.hasClass(a, "fr-draggable") && a.classList.remove("fr-draggable"); else if (a && a.nodeType == Node.ELEMENT_NODE) for (var c = a.querySelectorAll("img.fr-uploading, img.fr-error, img.fr-draggable"), d = 0; d < c.length; d++) aa(c[d])
        }

        function ba() {
            if (L(), "IMG" == b.el.tagName && b.$el.addClass("fr-view"), b.events.$on(b.$el, b.helpers.isMobile() && !b.helpers.isWindowsPhone() ? "touchend" : "click", "IMG" == b.el.tagName ? null : 'img:not([contenteditable="false"])', fa), b.helpers.isMobile() && (b.events.$on(b.$el, "touchstart", "IMG" == b.el.tagName ? null : 'img:not([contenteditable="false"])', function () {
                La = !1
            }), b.events.$on(b.$el, "touchmove", function () {
                La = !0
            })), b.$wp ? (b.events.on("window.keydown keydown", _, !0), b.events.on("keyup", function (b) {
                if (b.which == a.FE.KEYCODE.ENTER) return !1
            }, !0)) : b.events.$on(b.$win, "keydown", _), b.events.on("toolbar.esc", function () {
                if (xa) {
                    if (b.$wp) b.events.disableBlur(), b.events.focus(); else {
                        var a = xa;
                        ga(!0), b.selection.setAfter(a.get(0)), b.selection.restore()
                    }
                    return !1
                }
            }, !0), b.events.on("toolbar.focusEditor", function () {
                if (xa) return !1
            }, !0), b.events.on("window.cut window.copy", function (c) {
                xa && b.popups.isVisible("image.edit") && !b.popups.get("image.edit").find(":focus").length && (ta(), a.FE.copied_text = "\n", a.FE.copied_html = xa.get(0).outerHTML, "copy" == c.type ? setTimeout(function () {
                    w(xa)
                }) : (ga(!0), b.undo.saveStep(), setTimeout(function () {
                    b.undo.saveStep()
                }, 0)))
            }, !0), b.events.$on(a(b.o_win), "keydown", function (b) {
                var c = b.which;
                if (xa && c == a.FE.KEYCODE.BACKSPACE) return b.preventDefault(), !1
            }), b.events.$on(b.$win, "keydown", function (b) {
                var c = b.which;
                xa && xa.hasClass("fr-uploading") && c == a.FE.KEYCODE.ESC && xa.trigger("abortUpload")
            }), b.events.on("destroy", function () {
                xa && xa.hasClass("fr-uploading") && xa.trigger("abortUpload")
            }), b.events.on("paste.before", da), b.events.on("paste.beforeCleanup", ea), b.events.on("paste.after", ca), b.events.on("html.set", i), b.events.on("html.inserted", i), i(), b.events.on("destroy", function () {
                Ka = []
            }), b.events.on("html.processGet", aa), b.opts.imageOutputSize) {
                var c;
                b.events.on("html.beforeGet", function () {
                    c = b.el.querySelectorAll("img");
                    for (var d = 0; d < c.length; d++) {
                        var e = c[d].style.width || a(c[d]).width(), f = c[d].style.height || a(c[d]).height();
                        e && c[d].setAttribute("width", ("" + e).replace(/px/, "")), f && c[d].setAttribute("height", ("" + f).replace(/px/, ""))
                    }
                }), b.events.on("html.afterGet", function () {
                    for (var a = 0; a < c.length; a++) c[a].removeAttribute("width"), c[a].removeAttribute("height")
                })
            }
            b.opts.iframe && b.events.on("image.loaded", b.size.syncIframe), b.$wp && (j(), b.events.on("contentChanged", j)), b.events.$on(a(b.o_win), "orientationchange.image", function () {
                setTimeout(function () {
                    xa && w(xa)
                }, 100)
            }), q(!0), M(!0), T(!0), P(!0), b.events.on("node.remove", function (a) {
                if ("IMG" == a.get(0).tagName) return $(a), !1
            })
        }

        function ca() {
            b.opts.imagePaste ? b.$el.find("img[data-fr-image-pasted]").each(function (c, d) {
                if (b.opts.imagePasteProcess) {
                    var f = b.opts.imageDefaultWidth;
                    f && "auto" != f && (f += b.opts.imageResizeWithPercent ? "%" : "px"), a(d).css("width", f), a(d).removeClass("fr-dii fr-dib fr-fir fr-fil").addClass((b.opts.imageDefaultDisplay ? "fr-di" + b.opts.imageDefaultDisplay[0] : "") + (b.opts.imageDefaultAlign && "center" != b.opts.imageDefaultAlign ? " fr-fi" + b.opts.imageDefaultAlign[0] : ""))
                }
                if (0 === d.src.indexOf("data:")) {
                    if (b.events.trigger("image.beforePasteUpload", [d]) === !1) return !1;
                    xa = a(d), k(), e(), sa(), r(), b.edit.off();
                    for (var g = atob(a(d).attr("src").split(",")[1]), h = [], i = 0; i < g.length; i++) h.push(g.charCodeAt(i));
                    var j = new Blob([new Uint8Array(h)], {type: "image/jpeg"});
                    H([j]), a(d).removeAttr("data-fr-image-pasted")
                } else 0 !== d.src.indexOf("http") || 0 === d.src.indexOf("https://mail.google.com/mail") ? (b.selection.save(), a(d).remove(), b.selection.restore()) : a(d).removeAttr("data-fr-image-pasted")
            }) : b.$el.find("img[data-fr-image-pasted]").remove()
        }

        function da(a) {
            if (a && a.clipboardData && a.clipboardData.items && a.clipboardData.items[0]) {
                var c = a.clipboardData.items[0].getAsFile();
                if (c) {
                    var d = new FileReader;
                    return d.onload = function (a) {
                        var c = a.target.result, d = b.opts.imageDefaultWidth;
                        d && "auto" != d && (d += b.opts.imageResizeWithPercent ? "%" : "px"), b.html.insert('<img data-fr-image-pasted="true" class="' + (b.opts.imageDefaultDisplay ? "fr-di" + b.opts.imageDefaultDisplay[0] : "") + (b.opts.imageDefaultAlign && "center" != b.opts.imageDefaultAlign ? " fr-fi" + b.opts.imageDefaultAlign[0] : "") + '" src="' + c + '"' + (d ? ' style="width: ' + d + ';"' : "") + ">"), b.events.trigger("paste.after")
                    }, d.readAsDataURL(c), !1
                }
            }
        }

        function ea(a) {
            return a = a.replace(/<img /gi, '<img data-fr-image-pasted="true" ')
        }

        function fa(c) {
            if ("false" == a(this).parents("[contenteditable]:not(.fr-element):not(body):first").attr("contenteditable")) return !0;
            if (c && "touchend" == c.type && La) return !0;
            if (c && b.edit.isDisabled()) return c.stopPropagation(), c.preventDefault(), !1;
            for (var d = 0; d < a.FE.INSTANCES.length; d++) a.FE.INSTANCES[d] != b && a.FE.INSTANCES[d].events.trigger("image.hideResizer");
            b.toolbar.disable(), c && (c.stopPropagation(), c.preventDefault()), b.helpers.isMobile() && (b.events.disableBlur(), b.$el.blur(), b.events.enableBlur()), b.opts.iframe && b.size.syncIframe(), xa = a(this), ta(), k(), e(), b.selection.clear(), b.button.bulkRefresh(), b.events.trigger("video.hideResizer")
        }

        function ga(a) {
            xa && (ja() || a === !0) && (b.toolbar.enable(), ya.removeClass("fr-active"), b.popups.hide("image.edit"), xa = null, ia())
        }

        function ha() {
            Ma = !0
        }

        function ia() {
            Ma = !1
        }

        function ja() {
            return Ma
        }

        function ka(a, c, d) {
            !b.opts.htmlUntouched && b.opts.useClasses ? (a.removeClass("fr-fil fr-fir fr-dib fr-dii"), a.addClass("fr-fi" + d[0] + " fr-di" + c[0])) : "inline" == c ? (a.css({
                display: "inline-block",
                verticalAlign: "bottom",
                margin: b.opts.imageDefaultMargin
            }), "center" == d ? a.css({
                float: "none",
                marginBottom: "",
                marginTop: "",
                maxWidth: "calc(100% - " + 2 * b.opts.imageDefaultMargin + "px)"
            }) : "left" == d ? a.css({
                float: "left",
                marginLeft: 0,
                maxWidth: "calc(100% - " + b.opts.imageDefaultMargin + "px)"
            }) : a.css({
                float: "right",
                marginRight: 0,
                maxWidth: "calc(100% - " + b.opts.imageDefaultMargin + "px)"
            })) : "block" == c && (a.css({
                display: "block",
                float: "none",
                verticalAlign: "top",
                margin: b.opts.imageDefaultMargin + "px auto"
            }), "left" == d ? a.css({marginLeft: 0}) : "right" == d && a.css({marginRight: 0}))
        }

        function la(a) {
            xa.removeClass("fr-fir fr-fil"), !b.opts.htmlUntouched && b.opts.useClasses ? "left" == a ? xa.addClass("fr-fil") : "right" == a && xa.addClass("fr-fir") : ka(xa, na(), a), k(), e()
        }

        function ma(a) {
            if ("undefined" == typeof a && (a = xa), a) {
                if (a.hasClass("fr-fil")) return "left";
                if (a.hasClass("fr-fir")) return "right";
                if (a.hasClass("fr-dib") || a.hasClass("fr-dii")) return "center";
                var b = a.css("float");
                if (a.css("float", "none"), "block" == a.css("display")) {
                    if (a.css("float", ""), a.css("float") != b && a.css("float", b), 0 === parseInt(a.css("margin-left"), 10)) return "left";
                    if (0 === parseInt(a.css("margin-right"), 10)) return "right"
                } else {
                    if (a.css("float", ""), a.css("float") != b && a.css("float", b), "left" == a.css("float")) return "left";
                    if ("right" == a.css("float")) return "right"
                }
            }
            return "center"
        }

        function na(a) {
            "undefined" == typeof a && (a = xa);
            var b = a.css("float");
            return a.css("float", "none"), "block" == a.css("display") ? (a.css("float", ""), a.css("float") != b && a.css("float", b), "block") : (a.css("float", ""), a.css("float") != b && a.css("float", b), "inline")
        }

        function oa(a) {
            xa && a.find("> *:first").replaceWith(b.icon.create("image-align-" + ma()))
        }

        function pa(a, b) {
            xa && b.find('.fr-command[data-param1="' + ma() + '"]').addClass("fr-active").attr("aria-selected", !0)
        }

        function qa(a) {
            xa.removeClass("fr-dii fr-dib"), !b.opts.htmlUntouched && b.opts.useClasses ? "inline" == a ? xa.addClass("fr-dii") : "block" == a && xa.addClass("fr-dib") : ka(xa, a, ma()), k(), e()
        }

        function ra(a, b) {
            xa && b.find('.fr-command[data-param1="' + na() + '"]').addClass("fr-active").attr("aria-selected", !0)
        }

        function sa() {
            var a = b.popups.get("image.insert");
            a || (a = M()), b.popups.isVisible("image.insert") || (s(), b.popups.refresh("image.insert"), b.popups.setContainer("image.insert", b.$sc));
            var c = xa.offset().left + xa.width() / 2, d = xa.offset().top + xa.height();
            b.popups.show("image.insert", c, d, xa.outerHeight())
        }

        function ta() {
            if (xa) {
                b.selection.clear();
                var a = b.doc.createRange();
                a.selectNode(xa.get(0));
                var c = b.selection.get();
                c.addRange(a)
            }
        }

        function ua() {
            xa ? (b.events.disableBlur(), a(".fr-popup input:focus").blur(), w(xa)) : (b.events.disableBlur(), b.selection.restore(), b.events.enableBlur(), b.popups.hide("image.insert"), b.toolbar.showInline())
        }

        function va() {
            return xa
        }

        function wa(a, c, d) {
            if ("undefined" == typeof c && (c = b.opts.imageStyles), "undefined" == typeof d && (d = b.opts.imageMultipleStyles), !xa) return !1;
            if (!d) {
                var e = Object.keys(c);
                e.splice(e.indexOf(a), 1), xa.removeClass(e.join(" "))
            }
            "object" == typeof c[a] ? (xa.removeAttr("style"), xa.css(c[a].style)) : xa.toggleClass(a), w(xa)
        }

        var xa, ya, za, Aa, Ba = !1, Ca = 1, Da = 2, Ea = 3, Fa = 4, Ga = 5, Ha = 6, Ia = 7, Ja = {};
        Ja[Ca] = "Image cannot be loaded from the passed link.", Ja[Da] = "No link in upload response.", Ja[Ea] = "Error during file upload.", Ja[Fa] = "Parsing response failed.", Ja[Ga] = "File is too large.", Ja[Ha] = "Image file type is invalid.", Ja[Ia] = "Files can be uploaded only to same domain in IE 8 and IE 9.";
        var Ka, La, Ma = !1;
        return {
            _init: ba,
            showInsertPopup: d,
            showLayer: V,
            refreshUploadButton: W,
            refreshByURLButton: X,
            upload: H,
            insertByURL: v,
            align: la,
            refreshAlign: oa,
            refreshAlignOnShow: pa,
            display: qa,
            refreshDisplayOnShow: ra,
            replace: sa,
            back: ua,
            get: va,
            insert: y,
            showProgressBar: r,
            remove: $,
            hideProgressBar: s,
            applyStyle: wa,
            showAltPopup: O,
            showSizePopup: S,
            setAlt: Q,
            setSize: U,
            exitEdit: ga,
            edit: w
        }
    }, a.FE.DefineIcon("insertImage", {NAME: "image"}), a.FE.RegisterShortcut(a.FE.KEYCODE.P, "insertImage", null, "P"), a.FE.RegisterCommand("insertImage", {
        title: "Insert Image",
        undo: !1,
        focus: !0,
        refreshAfterCallback: !1,
        popup: !0,
        callback: function () {
            this.popups.isVisible("image.insert") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("image.insert")) : this.image.showInsertPopup()
        },
        plugin: "image"
    }), a.FE.DefineIcon("imageUpload", {NAME: "upload"}), a.FE.RegisterCommand("imageUpload", {
        title: "Upload Image",
        undo: !1,
        focus: !1,
        toggle: !0,
        callback: function () {
            this.image.showLayer("image-upload")
        },
        refresh: function (a) {
            this.image.refreshUploadButton(a)
        }
    }), a.FE.DefineIcon("imageByURL", {NAME: "link"}), a.FE.RegisterCommand("imageByURL", {
        title: "By URL",
        undo: !1,
        focus: !1,
        toggle: !0,
        callback: function () {
            this.image.showLayer("image-by-url")
        },
        refresh: function (a) {
            this.image.refreshByURLButton(a)
        }
    }), a.FE.RegisterCommand("imageInsertByURL", {
        title: "Insert Image",
        undo: !0,
        refreshAfterCallback: !1,
        callback: function () {
            this.image.insertByURL()
        },
        refresh: function (a) {
            var b = this.image.get();
            b ? a.text(this.language.translate("Replace")) : a.text(this.language.translate("Insert"))
        }
    }), a.FE.DefineIcon("imageDisplay", {NAME: "star"}), a.FE.RegisterCommand("imageDisplay", {
        title: "Display",
        type: "dropdown",
        options: {inline: "Inline", block: "Break Text"},
        callback: function (a, b) {
            this.image.display(b)
        },
        refresh: function (a) {
            this.opts.imageTextNear || a.addClass("fr-hidden")
        },
        refreshOnShow: function (a, b) {
            this.image.refreshDisplayOnShow(a, b)
        }
    }), a.FE.DefineIcon("image-align", {NAME: "align-left"}), a.FE.DefineIcon("image-align-left", {NAME: "align-left"}), a.FE.DefineIcon("image-align-right", {NAME: "align-right"}), a.FE.DefineIcon("image-align-center", {NAME: "align-justify"}), a.FE.DefineIcon("imageAlign", {NAME: "align-justify"}), a.FE.RegisterCommand("imageAlign", {
        type: "dropdown",
        title: "Align",
        options: {left: "Align Left", center: "None", right: "Align Right"},
        html: function () {
            var b = '<ul class="fr-dropdown-list" role="presentation">', c = a.FE.COMMANDS.imageAlign.options;
            for (var d in c) c.hasOwnProperty(d) && (b += '<li role="presentation"><a class="fr-command fr-title" tabIndex="-1" role="option" data-cmd="imageAlign" data-param1="' + d + '" title="' + this.language.translate(c[d]) + '">' + this.icon.create("image-align-" + d) + '<span class="fr-sr-only">' + this.language.translate(c[d]) + "</span></a></li>");
            return b += "</ul>"
        },
        callback: function (a, b) {
            this.image.align(b)
        },
        refresh: function (a) {
            this.image.refreshAlign(a)
        },
        refreshOnShow: function (a, b) {
            this.image.refreshAlignOnShow(a, b)
        }
    }), a.FE.DefineIcon("imageReplace", {NAME: "exchange"}), a.FE.RegisterCommand("imageReplace", {
        title: "Replace",
        undo: !1,
        focus: !1,
        popup: !0,
        refreshAfterCallback: !1,
        callback: function () {
            this.image.replace()
        }
    }), a.FE.DefineIcon("imageRemove", {NAME: "trash"}), a.FE.RegisterCommand("imageRemove", {
        title: "Remove",
        callback: function () {
            this.image.remove()
        }
    }), a.FE.DefineIcon("imageBack", {NAME: "arrow-left"}), a.FE.RegisterCommand("imageBack", {
        title: "Back",
        undo: !1,
        focus: !1,
        back: !0,
        callback: function () {
            this.image.back()
        },
        refresh: function (a) {
            var b = this.image.get();
            b || this.opts.toolbarInline ? (a.removeClass("fr-hidden"), a.next(".fr-separator").removeClass("fr-hidden")) : (a.addClass("fr-hidden"), a.next(".fr-separator").addClass("fr-hidden"))
        }
    }), a.FE.RegisterCommand("imageDismissError", {
        title: "OK", undo: !1, callback: function () {
            this.image.hideProgressBar(!0)
        }
    }), a.FE.DefineIcon("imageStyle", {NAME: "magic"}), a.FE.RegisterCommand("imageStyle", {
        title: "Style",
        type: "dropdown",
        html: function () {
            var a = '<ul class="fr-dropdown-list" role="presentation">', b = this.opts.imageStyles;
            for (var c in b) if (b.hasOwnProperty(c)) {
                var d = b[c];
                "object" == typeof d && (d = d.title), a += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="imageStyle" data-param1="' + c + '">' + this.language.translate(d) + "</a></li>"
            }
            return a += "</ul>"
        },
        callback: function (a, b) {
            this.image.applyStyle(b)
        },
        refreshOnShow: function (b, c) {
            var d = this.image.get();
            d && c.find(".fr-command").each(function () {
                var b = a(this).data("param1"), c = d.hasClass(b);
                a(this).toggleClass("fr-active", c).attr("aria-selected", c)
            })
        }
    }), a.FE.DefineIcon("imageAlt", {NAME: "info"}), a.FE.RegisterCommand("imageAlt", {
        undo: !1,
        focus: !1,
        popup: !0,
        title: "Alternate Text",
        callback: function () {
            this.image.showAltPopup()
        }
    }), a.FE.RegisterCommand("imageSetAlt", {
        undo: !0,
        focus: !1,
        title: "Update",
        refreshAfterCallback: !1,
        callback: function () {
            this.image.setAlt()
        }
    }), a.FE.DefineIcon("imageSize", {NAME: "arrows-alt"}), a.FE.RegisterCommand("imageSize", {
        undo: !1,
        focus: !1,
        popup: !0,
        title: "Change Size",
        callback: function () {
            this.image.showSizePopup()
        }
    }), a.FE.RegisterCommand("imageSetSize", {
        undo: !0,
        focus: !1,
        title: "Update",
        refreshAfterCallback: !1,
        callback: function () {
            this.image.setSize()
        }
    })
});
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');
                }
                else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function ($) {
    $.extend($.FE.POPUP_TEMPLATES, {'link.edit': '[_BUTTONS_]', 'link.insert': '[_BUTTONS_][_INPUT_LAYER_]'})
    $.extend($.FE.DEFAULTS, {
        linkEditButtons: ['linkOpen', 'linkStyle', 'linkEdit', 'linkRemove'],
        linkInsertButtons: ['linkBack', '|', 'linkList'],
        linkAttributes: {},
        linkAutoPrefix: 'http://',
        linkStyles: {'fr-green': 'Green', 'fr-strong': 'Thick'},
        linkMultipleStyles: true,
        linkConvertEmailAddress: true,
        linkAlwaysBlank: false,
        linkAlwaysNoFollow: false,
        linkList: [{text: 'Froala', href: 'https://froala.com', target: '_blank'}, {
            text: 'Google',
            href: 'https://google.com',
            target: '_blank'
        }, {displayText: 'Facebook', href: 'https://facebook.com'}],
        linkText: true
    });
    $.FE.PLUGINS.link = function (editor) {
        function get() {
            var $current_image = editor.image ? editor.image.get() : null;
            if (!$current_image && editor.$wp) {
                var c_el = editor.selection.ranges(0).commonAncestorContainer;
                if (c_el && (c_el.contains && c_el.contains(editor.el) || !editor.el.contains(c_el) || editor.el == c_el)) c_el = null;
                if (c_el && c_el.tagName === 'A') return c_el;
                var s_el = editor.selection.element();
                var e_el = editor.selection.endElement();
                if (s_el.tagName != 'A' && !editor.node.isElement(s_el)) {
                    s_el = $(s_el).parentsUntil(editor.$el, 'a:first').get(0);
                }
                if (e_el.tagName != 'A' && !editor.node.isElement(e_el)) {
                    e_el = $(e_el).parentsUntil(editor.$el, 'a:first').get(0);
                }
                if (e_el && (e_el.contains && e_el.contains(editor.el) || !editor.el.contains(e_el) || editor.el == e_el)) e_el = null;
                if (s_el && (s_el.contains && s_el.contains(editor.el) || !editor.el.contains(s_el) || editor.el == s_el)) s_el = null;
                if (e_el && e_el == s_el && e_el.tagName == 'A') {
                    return s_el;
                }
                return null;
            }
            else if (editor.el.tagName == 'A') {
                return editor.el;
            }
            else {
                if ($current_image && $current_image.get(0).parentNode && $current_image.get(0).parentNode.tagName == 'A') {
                    return $current_image.get(0).parentNode;
                }
            }
        }

        function allSelected() {
            var $current_image = editor.image ? editor.image.get() : null;
            var selectedLinks = [];
            if ($current_image) {
                if ($current_image.get(0).parentNode.tagName == 'A') {
                    selectedLinks.push($current_image.get(0).parentNode);
                }
            }
            else {
                var range;
                var containerEl;
                var links;
                var linkRange;
                if (editor.win.getSelection) {
                    var sel = editor.win.getSelection();
                    if (sel.getRangeAt && sel.rangeCount) {
                        linkRange = editor.doc.createRange();
                        for (var r = 0; r < sel.rangeCount; ++r) {
                            range = sel.getRangeAt(r);
                            containerEl = range.commonAncestorContainer;
                            if (containerEl && containerEl.nodeType != 1) {
                                containerEl = containerEl.parentNode;
                            }
                            if (containerEl && containerEl.nodeName.toLowerCase() == 'a') {
                                selectedLinks.push(containerEl);
                            } else {
                                links = containerEl.getElementsByTagName('a');
                                for (var i = 0; i < links.length; ++i) {
                                    linkRange.selectNodeContents(links[i]);
                                    if (linkRange.compareBoundaryPoints(range.END_TO_START, range) < 1 && linkRange.compareBoundaryPoints(range.START_TO_END, range) > -1) {
                                        selectedLinks.push(links[i]);
                                    }
                                }
                            }
                        }
                    }
                } else if (editor.doc.selection && editor.doc.selection.type != 'Control') {
                    range = editor.doc.selection.createRange();
                    containerEl = range.parentElement();
                    if (containerEl.nodeName.toLowerCase() == 'a') {
                        selectedLinks.push(containerEl);
                    } else {
                        links = containerEl.getElementsByTagName('a');
                        linkRange = editor.doc.body.createTextRange();
                        for (var j = 0; j < links.length; ++j) {
                            linkRange.moveToElementText(links[j]);
                            if (linkRange.compareEndPoints('StartToEnd', range) > -1 && linkRange.compareEndPoints('EndToStart', range) < 1) {
                                selectedLinks.push(links[j]);
                            }
                        }
                    }
                }
            }
            return selectedLinks;
        }

        function _edit(e) {
            _hideEditPopup();
            setTimeout(function () {
                if (!e || (e && (e.which == 1 || e.type != 'mouseup'))) {
                    var link = get();
                    var $current_image = editor.image ? editor.image.get() : null;
                    if (link && !$current_image) {
                        if (editor.image) {
                            var contents = editor.node.contents(link);
                            if (contents.length == 1 && contents[0].tagName == 'IMG') {
                                var range = editor.selection.ranges(0);
                                if (range.startOffset === 0 && range.endOffset === 0) {
                                    $(link).before($.FE.MARKERS);
                                }
                                else {
                                    $(link).after($.FE.MARKERS);
                                }
                                editor.selection.restore();
                                return false;
                            }
                        }
                        if (e) {
                            e.stopPropagation();
                        }
                        _showEditPopup(link);
                    }
                }
            }, editor.helpers.isIOS() ? 100 : 0);
        }

        function _showEditPopup(link) {
            var $popup = editor.popups.get('link.edit');
            if (!$popup) $popup = _initEditPopup();
            var $link = $(link);
            if (!editor.popups.isVisible('link.edit')) {
                editor.popups.refresh('link.edit');
            }
            editor.popups.setContainer('link.edit', editor.$sc);
            var left = $link.offset().left + $(link).outerWidth() / 2;
            var top = $link.offset().top + $link.outerHeight();
            editor.popups.show('link.edit', left, top, $link.outerHeight());
        }

        function _hideEditPopup() {
            editor.popups.hide('link.edit');
        }

        function _initEditPopup() {
            var link_buttons = '';
            if (editor.opts.linkEditButtons.length > 1) {
                if (editor.el.tagName == 'A' && editor.opts.linkEditButtons.indexOf('linkRemove') >= 0) {
                    editor.opts.linkEditButtons.splice(editor.opts.linkEditButtons.indexOf('linkRemove'), 1);
                }
                link_buttons = '<div class="fr-buttons">' + editor.button.buildList(editor.opts.linkEditButtons) + '</div>';
            }
            var template = {buttons: link_buttons};
            var $popup = editor.popups.create('link.edit', template);
            if (editor.$wp) {
                editor.events.$on(editor.$wp, 'scroll.link-edit', function () {
                    if (get() && editor.popups.isVisible('link.edit')) {
                        _showEditPopup(get());
                    }
                });
            }
            return $popup;
        }

        function _hideInsertPopup() {
        }

        function _refreshInsertPopup() {
            var $popup = editor.popups.get('link.insert');
            var link = get();
            if (link) {
                var $link = $(link);
                var text_inputs = $popup.find('input.fr-link-attr[type="text"]');
                var check_inputs = $popup.find('input.fr-link-attr[type="checkbox"]');
                var i;
                var $input;
                for (i = 0; i < text_inputs.length; i++) {
                    $input = $(text_inputs[i]);
                    $input.val($link.attr($input.attr('name') || ''));
                }
                check_inputs.prop('checked', false);
                for (i = 0; i < check_inputs.length; i++) {
                    $input = $(check_inputs[i]);
                    if ($link.attr($input.attr('name')) == $input.data('checked')) {
                        $input.prop('checked', true);
                    }
                }
                $popup.find('input.fr-link-attr[type="text"][name="text"]').val($link.text());
            }
            else {
                $popup.find('input.fr-link-attr[type="text"]').val('');
                $popup.find('input.fr-link-attr[type="checkbox"]').prop('checked', false);
                $popup.find('input.fr-link-attr[type="text"][name="text"]').val(editor.selection.text());
            }
            $popup.find('input.fr-link-attr').trigger('change');
            var $current_image = editor.image ? editor.image.get() : null;
            if ($current_image) {
                $popup.find('.fr-link-attr[name="text"]').parent().hide();
            }
            else {
                $popup.find('.fr-link-attr[name="text"]').parent().show();
            }
        }

        function _showInsertPopup() {
            var $btn = editor.$tb.find('.fr-command[data-cmd="insertLink"]');
            var $popup = editor.popups.get('link.insert');
            if (!$popup) $popup = _initInsertPopup();
            if (!$popup.hasClass('fr-active')) {
                editor.popups.refresh('link.insert');
                editor.popups.setContainer('link.insert', editor.$tb || editor.$sc);
                if ($btn.is(':visible')) {
                    var left = $btn.offset().left + $btn.outerWidth() / 2;
                    var top = $btn.offset().top + (editor.opts.toolbarBottom ? 10 : $btn.outerHeight() - 10);
                    editor.popups.show('link.insert', left, top, $btn.outerHeight());
                }
                else {
                    editor.position.forSelection($popup);
                    editor.popups.show('link.insert');
                }
            }
        }

        function _initInsertPopup(delayed) {
            if (delayed) {
                editor.popups.onRefresh('link.insert', _refreshInsertPopup);
                editor.popups.onHide('link.insert', _hideInsertPopup);
                return true;
            }
            var link_buttons = '';
            if (editor.opts.linkInsertButtons.length >= 1) {
                link_buttons = '<div class="fr-buttons">' + editor.button.buildList(editor.opts.linkInsertButtons) + '</div>';
            }
            var checkmark = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="10" height="10" viewBox="0 0 32 32"><path d="M27 4l-15 15-7-7-5 5 12 12 20-20z" fill="#FFF"></path></svg>';
            var input_layer = '';
            var tab_idx = 0;
            input_layer = '<div class="fr-link-insert-layer fr-layer fr-active" id="fr-link-insert-layer-' + editor.id + '">';
            input_layer += '<div class="fr-input-line"><input id="fr-link-insert-layer-url-' + editor.id + '" name="href" type="text" class="fr-link-attr" placeholder="URL" tabIndex="' + (++tab_idx) + '"></div>';
            if (editor.opts.linkText) {
                input_layer += '<div class="fr-input-line"><input id="fr-link-insert-layer-text-' + editor.id + '" name="text" type="text" class="fr-link-attr" placeholder="' + editor.language.translate('Text') + '" tabIndex="' + (++tab_idx) + '"></div>';
            }
            for (var attr in editor.opts.linkAttributes) {
                if (editor.opts.linkAttributes.hasOwnProperty(attr)) {
                    var placeholder = editor.opts.linkAttributes[attr];
                    input_layer += '<div class="fr-input-line"><input name="' + attr + '" type="text" class="fr-link-attr" placeholder="' + editor.language.translate(placeholder) + '" tabIndex="' + (++tab_idx) + '"></div>';
                }
            }
            if (!editor.opts.linkAlwaysBlank) {
                input_layer += '<div class="fr-checkbox-line"><span class="fr-checkbox"><input name="target" class="fr-link-attr" data-checked="_blank" type="checkbox" id="fr-link-target-' + editor.id + '" tabIndex="' + (++tab_idx) + '"><span>' + checkmark + '</span></span><label for="fr-link-target-' + editor.id + '">' + editor.language.translate('Open in new tab') + '</label></div>';
            }
            input_layer += '<div class="fr-action-buttons"><button class="fr-command fr-submit" role="button" data-cmd="linkInsert" href="#" tabIndex="' + (++tab_idx) + '" type="button">' + editor.language.translate('Insert') + '</button></div></div>'
            var template = {buttons: link_buttons, input_layer: input_layer}
            var $popup = editor.popups.create('link.insert', template);
            if (editor.$wp) {
                editor.events.$on(editor.$wp, 'scroll.link-insert', function () {
                    var $current_image = editor.image ? editor.image.get() : null;
                    if ($current_image && editor.popups.isVisible('link.insert')) {
                        imageLink();
                    }
                    if (get && editor.popups.isVisible('link.insert')) {
                        update();
                    }
                });
            }
            return $popup;
        }

        function remove() {
            var link = get();
            var $current_image = editor.image ? editor.image.get() : null;
            if (editor.events.trigger('link.beforeRemove', [link]) === false) return false;
            if ($current_image && link) {
                $current_image.unwrap();
                editor.image.edit($current_image);
            }
            else if (link) {
                editor.selection.save();
                $(link).replaceWith($(link).html());
                editor.selection.restore();
                _hideEditPopup();
            }
        }

        function _init() {
            editor.events.on('input', function (e) {
                if (e.which != $.FE.KEYCODE.ESC) {
                    _edit(e);
                }
            });
            editor.events.on('window.mouseup', _edit);
            if (editor.helpers.isMobile()) {
                editor.events.$on(editor.$doc, 'selectionchange', _edit);
            }
            _initInsertPopup(true);
            if (editor.el.tagName == 'A') {
                editor.$el.addClass('fr-view');
            }
            editor.events.on('toolbar.esc', function () {
                if (editor.popups.isVisible('link.edit')) {
                    editor.events.disableBlur();
                    editor.events.focus();
                    return false;
                }
            }, true);
        }

        function usePredefined(val) {
            var link = editor.opts.linkList[val];
            var $popup = editor.popups.get('link.insert');
            var text_inputs = $popup.find('input.fr-link-attr[type="text"]');
            var check_inputs = $popup.find('input.fr-link-attr[type="checkbox"]');
            var $input;
            var i;
            for (i = 0; i < text_inputs.length; i++) {
                $input = $(text_inputs[i]);
                if (link[$input.attr('name')]) {
                    $input.val(link[$input.attr('name')]);
                }
                else if ($input.attr('name') != 'text') {
                    $input.val('');
                }
            }
            for (i = 0; i < check_inputs.length; i++) {
                $input = $(check_inputs[i]);
                $input.prop('checked', $input.data('checked') == link[$input.attr('name')]);
            }
            editor.accessibility.focusPopup($popup);
        }

        function insertCallback() {
            var $popup = editor.popups.get('link.insert');
            var text_inputs = $popup.find('input.fr-link-attr[type="text"]');
            var check_inputs = $popup.find('input.fr-link-attr[type="checkbox"]');
            var href = text_inputs.filter('[name="href"]').val();
            var text = text_inputs.filter('[name="text"]').val();
            var attrs = {};
            var $input;
            var i;
            for (i = 0; i < text_inputs.length; i++) {
                $input = $(text_inputs[i]);
                if (['href', 'text'].indexOf($input.attr('name')) < 0) {
                    attrs[$input.attr('name')] = $input.val();
                }
            }
            for (i = 0; i < check_inputs.length; i++) {
                $input = $(check_inputs[i]);
                if ($input.is(':checked')) {
                    attrs[$input.attr('name')] = $input.data('checked');
                }
                else {
                    attrs[$input.attr('name')] = $input.data('unchecked') || null;
                }
            }
            var t = editor.helpers.scrollTop();
            insert(href, text, attrs);
            $(editor.o_win).scrollTop(t);
        }

        function _split() {
            if (!editor.selection.isCollapsed()) {
                editor.selection.save();
                var markers = editor.$el.find('.fr-marker').addClass('fr-unprocessed').toArray();
                while (markers.length) {
                    var $marker = $(markers.pop());
                    $marker.removeClass('fr-unprocessed');
                    var deep_parent = editor.node.deepestParent($marker.get(0));
                    if (deep_parent) {
                        var node = $marker.get(0);
                        var close_str = '';
                        var open_str = '';
                        do {
                            node = node.parentNode;
                            if (!editor.node.isBlock(node)) {
                                close_str = close_str + editor.node.closeTagString(node);
                                open_str = editor.node.openTagString(node) + open_str;
                            }
                        } while (node != deep_parent);
                        var marker_str = editor.node.openTagString($marker.get(0)) + $marker.html() + editor.node.closeTagString($marker.get(0));
                        $marker.replaceWith('<span id="fr-break"></span>');
                        var h = $(deep_parent).html();
                        h = h.replace(/<span id="fr-break"><\/span>/g, close_str + marker_str + open_str);
                        $(deep_parent).html(h);
                    }
                    markers = editor.$el.find('.fr-marker.fr-unprocessed').toArray();
                }
                editor.selection.restore();
            }
        }

        function insert(href, text, attrs) {
            if (typeof attrs == 'undefined') attrs = {};
            if (editor.events.trigger('link.beforeInsert', [href, text, attrs]) === false) return false;
            var $current_image = editor.image ? editor.image.get() : null;
            if (!$current_image && editor.el.tagName != 'A') {
                editor.selection.restore();
                editor.popups.hide('link.insert');
            }
            else if (editor.el.tagName == 'A') {
                editor.$el.focus();
            }
            var original_href = href;
            if (editor.opts.linkConvertEmailAddress) {
                var regex = /^[\w._]+@[a-z\u00a1-\uffff0-9_-]+?\.[a-z\u00a1-\uffff0-9]{2,}$/i;
                if (regex.test(href) && !/^mailto:.*/i.test(href)) {
                    href = 'mailto:' + href;
                }
            }
            if (editor.opts.linkAutoPrefix !== '' && !/^(mailto|tel|sms|notes|data):.*/i.test(href) && !/^data:image.*/i.test(href) && !/^(https?:|ftps?:|file:|)\/\//i.test(href)) {
                if (['/', '{', '[', '#', '('].indexOf((href || '')[0]) < 0) {
                    href = editor.opts.linkAutoPrefix + href;
                }
            }
            href = editor.helpers.sanitizeURL(href);
            if (editor.opts.linkAlwaysBlank) attrs.target = '_blank';
            if (editor.opts.linkAlwaysNoFollow) attrs.rel = 'nofollow';
            if (attrs.target == '_blank') {
                if (!attrs.rel) attrs.rel = 'noopener noreferrer'; else attrs.rel += ' noopener noreferrer';
            }
            text = text || '';
            if (href === editor.opts.linkAutoPrefix) {
                var $popup = editor.popups.get('link.insert');
                $popup.find('input[name="href"]').addClass('fr-error');
                editor.events.trigger('link.bad', [original_href]);
                return false;
            }
            var link = get();
            var $link;
            if (link) {
                $link = $(link);
                $link.attr('href', href);
                if (text.length > 0 && $link.text() != text && !$current_image) {
                    $link.text(text);
                }
                if (!$current_image) {
                    $link.prepend($.FE.START_MARKER).append($.FE.END_MARKER);
                }
                $link.attr(attrs);
                if (!$current_image) {
                    editor.selection.restore();
                }
            }
            else {
                if (!$current_image) {
                    editor.format.remove('a');
                    if (editor.selection.isCollapsed()) {
                        text = (text.length === 0 ? original_href : text);
                        editor.html.insert('<a href="' + href + '">' + $.FE.START_MARKER + text + $.FE.END_MARKER + '</a>');
                        editor.selection.restore();
                    }
                    else {
                        if (text.length > 0 && text != editor.selection.text().replace(/\n/g, '')) {
                            editor.selection.remove();
                            editor.html.insert('<a href="' + href + '">' + $.FE.START_MARKER + text + $.FE.END_MARKER + '</a>');
                            editor.selection.restore();
                        }
                        else {
                            _split();
                            editor.format.apply('a', {href: href});
                        }
                    }
                }
                else {
                    $current_image.wrap('<a href="' + href + '"></a>');
                }
                var links = allSelected();
                for (var i = 0; i < links.length; i++) {
                    $link = $(links[i]);
                    $link.attr(attrs);
                    $link.removeAttr('_moz_dirty');
                }
                if (links.length == 1 && editor.$wp && !$current_image) {
                    $(links[0]).prepend($.FE.START_MARKER).append($.FE.END_MARKER);
                    editor.selection.restore();
                }
            }
            if (!$current_image) {
                _edit();
            }
            else {
                var $pop = editor.popups.get('link.insert');
                $pop.find('input:focus').blur();
                editor.image.edit($current_image);
            }
        }

        function update() {
            _hideEditPopup();
            var link = get();
            if (link) {
                var $popup = editor.popups.get('link.insert');
                if (!$popup) $popup = _initInsertPopup();
                if (!editor.popups.isVisible('link.insert')) {
                    editor.popups.refresh('link.insert');
                    editor.selection.save();
                    if (editor.helpers.isMobile()) {
                        editor.events.disableBlur();
                        editor.$el.blur();
                        editor.events.enableBlur();
                    }
                }
                editor.popups.setContainer('link.insert', editor.$sc);
                var $ref = (editor.image ? editor.image.get() : null) || $(link);
                var left = $ref.offset().left + $ref.outerWidth() / 2;
                var top = $ref.offset().top + $ref.outerHeight();
                editor.popups.show('link.insert', left, top, $ref.outerHeight());
            }
        }

        function back() {
            var $current_image = editor.image ? editor.image.get() : null;
            if (!$current_image) {
                editor.events.disableBlur();
                editor.selection.restore();
                editor.events.enableBlur();
                var link = get();
                if (link && editor.$wp) {
                    editor.selection.restore();
                    _hideEditPopup();
                    _edit();
                }
                else if (editor.el.tagName == 'A') {
                    editor.$el.focus();
                    _edit();
                }
                else {
                    editor.popups.hide('link.insert');
                    editor.toolbar.showInline();
                }
            }
            else {
                editor.image.back();
            }
        }

        function imageLink() {
            var $current_image = editor.image ? editor.image.get() : null;
            if ($current_image) {
                var $popup = editor.popups.get('link.insert');
                if (!$popup) $popup = _initInsertPopup();
                _refreshInsertPopup(true);
                editor.popups.setContainer('link.insert', editor.$sc);
                var left = $current_image.offset().left + $current_image.outerWidth() / 2;
                var top = $current_image.offset().top + $current_image.outerHeight();
                editor.popups.show('link.insert', left, top, $current_image.outerHeight());
            }
        }

        function applyStyle(val, linkStyles, multipleStyles) {
            if (typeof multipleStyles == 'undefined') multipleStyles = editor.opts.linkMultipleStyles;
            if (typeof linkStyles == 'undefined') linkStyles = editor.opts.linkStyles;
            var link = get();
            if (!link) return false;
            if (!multipleStyles) {
                var styles = Object.keys(linkStyles);
                styles.splice(styles.indexOf(val), 1);
                $(link).removeClass(styles.join(' '));
            }
            $(link).toggleClass(val);
            _edit();
        }

        return {
            _init: _init,
            remove: remove,
            showInsertPopup: _showInsertPopup,
            usePredefined: usePredefined,
            insertCallback: insertCallback,
            insert: insert,
            update: update,
            get: get,
            allSelected: allSelected,
            back: back,
            imageLink: imageLink,
            applyStyle: applyStyle
        }
    }
    $.FE.DefineIcon('insertLink', {NAME: 'link'});
    $.FE.RegisterShortcut($.FE.KEYCODE.K, 'insertLink', null, 'K');
    $.FE.RegisterCommand('insertLink', {
        title: 'Insert Link', undo: false, focus: true, refreshOnCallback: false, popup: true, callback: function () {
            if (!this.popups.isVisible('link.insert')) {
                this.link.showInsertPopup();
            }
            else {
                if (this.$el.find('.fr-marker').length) {
                    this.events.disableBlur();
                    this.selection.restore();
                }
                this.popups.hide('link.insert');
            }
        }, plugin: 'link'
    })
    $.FE.DefineIcon('linkOpen', {NAME: 'external-link'});
    $.FE.RegisterCommand('linkOpen', {
        title: 'Open Link', undo: false, refresh: function ($btn) {
            var link = this.link.get();
            if (link) {
                $btn.removeClass('fr-hidden');
            }
            else {
                $btn.addClass('fr-hidden');
            }
        }, callback: function () {
            var link = this.link.get();
            if (link) {
                this.o_win.open(link.href);
            }
        }
    })
    $.FE.DefineIcon('linkEdit', {NAME: 'edit'});
    $.FE.RegisterCommand('linkEdit', {
        title: 'Edit Link', undo: false, refreshAfterCallback: false, popup: true, callback: function () {
            this.link.update();
        }, refresh: function ($btn) {
            var link = this.link.get();
            if (link) {
                $btn.removeClass('fr-hidden');
            }
            else {
                $btn.addClass('fr-hidden');
            }
        }
    })
    $.FE.DefineIcon('linkRemove', {NAME: 'unlink'});
    $.FE.RegisterCommand('linkRemove', {
        title: 'Unlink', callback: function () {
            this.link.remove();
        }, refresh: function ($btn) {
            var link = this.link.get();
            if (link) {
                $btn.removeClass('fr-hidden');
            }
            else {
                $btn.addClass('fr-hidden');
            }
        }
    })
    $.FE.DefineIcon('linkBack', {NAME: 'arrow-left'});
    $.FE.RegisterCommand('linkBack', {
        title: 'Back', undo: false, focus: false, back: true, refreshAfterCallback: false, callback: function () {
            this.link.back();
        }, refresh: function ($btn) {
            var link = this.link.get() && this.doc.hasFocus();
            var $current_image = this.image ? this.image.get() : null;
            if (!$current_image && !link && !this.opts.toolbarInline) {
                $btn.addClass('fr-hidden');
                $btn.next('.fr-separator').addClass('fr-hidden');
            }
            else {
                $btn.removeClass('fr-hidden');
                $btn.next('.fr-separator').removeClass('fr-hidden');
            }
        }
    });
    $.FE.DefineIcon('linkList', {NAME: 'search'});
    $.FE.RegisterCommand('linkList', {
        title: 'Choose Link',
        type: 'dropdown',
        focus: false,
        undo: false,
        refreshAfterCallback: false,
        html: function () {
            var c = '<ul class="fr-dropdown-list" role="presentation">';
            var options = this.opts.linkList;
            for (var i = 0; i < options.length; i++) {
                c += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="linkList" data-param1="' + i + '">' + (options[i].displayText || options[i].text) + '</a></li>';
            }
            c += '</ul>';
            return c;
        },
        callback: function (cmd, val) {
            this.link.usePredefined(val);
        }
    })
    $.FE.RegisterCommand('linkInsert', {
        focus: false, refreshAfterCallback: false, callback: function () {
            this.link.insertCallback();
        }, refresh: function ($btn) {
            var link = this.link.get();
            if (link) {
                $btn.text(this.language.translate('Update'));
            }
            else {
                $btn.text(this.language.translate('Insert'));
            }
        }
    })
    $.FE.DefineIcon('imageLink', {NAME: 'link'})
    $.FE.RegisterCommand('imageLink', {
        title: 'Insert Link', undo: false, focus: false, popup: true, callback: function () {
            this.link.imageLink();
        }, refresh: function ($btn) {
            var link = this.link.get();
            var $prev;
            if (link) {
                $prev = $btn.prev();
                if ($prev.hasClass('fr-separator')) {
                    $prev.removeClass('fr-hidden');
                }
                $btn.addClass('fr-hidden');
            }
            else {
                $prev = $btn.prev();
                if ($prev.hasClass('fr-separator')) {
                    $prev.addClass('fr-hidden');
                }
                $btn.removeClass('fr-hidden');
            }
        }
    })
    $.FE.DefineIcon('linkStyle', {NAME: 'magic'})
    $.FE.RegisterCommand('linkStyle', {
        title: 'Style', type: 'dropdown', html: function () {
            var c = '<ul class="fr-dropdown-list" role="presentation">';
            var options = this.opts.linkStyles;
            for (var cls in options) {
                if (options.hasOwnProperty(cls)) {
                    c += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="linkStyle" data-param1="' + cls + '">' + this.language.translate(options[cls]) + '</a></li>';
                }
            }
            c += '</ul>';
            return c;
        }, callback: function (cmd, val) {
            this.link.applyStyle(val);
        }, refreshOnShow: function ($btn, $dropdown) {
            var link = this.link.get();
            if (link) {
                var $link = $(link);
                $dropdown.find('.fr-command').each(function () {
                    var cls = $(this).data('param1');
                    var active = $link.hasClass(cls);
                    $(this).toggleClass('fr-active', active).attr('aria-selected', active);
                })
            }
        }
    })
}));
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)), a(c), c
    } : a(jQuery)
}(function (a) {
    a.extend(a.FE.POPUP_TEMPLATES, {
        "table.insert": "[_BUTTONS_][_ROWS_COLUMNS_]",
        "table.edit": "[_BUTTONS_]",
        "table.colors": "[_BUTTONS_][_COLORS_]"
    }), a.extend(a.FE.DEFAULTS, {
        tableInsertMaxSize: 10,
        tableEditButtons: ["tableHeader", "tableRemove", "|", "tableRows", "tableColumns", "tableStyle", "-", "tableCells", "tableCellBackground", "tableCellVerticalAlign", "tableCellHorizontalAlign", "tableCellStyle"],
        tableInsertButtons: ["tableBack", "|"],
        tableResizer: !0,
        tableResizerOffset: 5,
        tableResizingLimit: 30,
        tableColorsButtons: ["tableBack", "|"],
        tableColors: ["#61BD6D", "#1ABC9C", "#54ACD2", "#2C82C9", "#9365B8", "#475577", "#CCCCCC", "#41A85F", "#00A885", "#3D8EB9", "#2969B0", "#553982", "#28324E", "#000000", "#F7DA64", "#FBA026", "#EB6B56", "#E25041", "#A38F84", "#EFEFEF", "#FFFFFF", "#FAC51C", "#F37934", "#D14841", "#B8312F", "#7C706B", "#D1D5D8", "REMOVE"],
        tableColorsStep: 7,
        tableCellStyles: {"fr-highlighted": "Highlighted", "fr-thick": "Thick"},
        tableStyles: {"fr-dashed-borders": "Dashed Borders", "fr-alternate-rows": "Alternate Rows"},
        tableCellMultipleStyles: !0,
        tableMultipleStyles: !0,
        tableInsertHelper: !0,
        tableInsertHelperOffset: 15
    }), a.FE.PLUGINS.table = function (b) {
        function c() {
            var a = b.$tb.find('.fr-command[data-cmd="insertTable"]'), c = b.popups.get("table.insert");
            if (c || (c = g()), !c.hasClass("fr-active")) {
                b.popups.refresh("table.insert"), b.popups.setContainer("table.insert", b.$tb);
                var d = a.offset().left + a.outerWidth() / 2,
                    e = a.offset().top + (b.opts.toolbarBottom ? 10 : a.outerHeight() - 10);
                b.popups.show("table.insert", d, e, a.outerHeight())
            }
        }

        function d() {
            var a = I();
            if (a) {
                var c = b.popups.get("table.edit");
                c || (c = k()), b.popups.setContainer("table.edit", b.$sc);
                var d = P(a), e = (d.left + d.right) / 2, f = d.bottom;
                b.popups.show("table.edit", e, f, d.bottom - d.top), b.edit.isDisabled() && (b.toolbar.disable(), b.$el.removeClass("fr-no-selection"), b.edit.on(), b.button.bulkRefresh(), b.selection.setAtEnd(b.$el.find(".fr-selected-cell:last").get(0)), b.$el.focus(), b.selection.restore())
            }
        }

        function e() {
            var a = I();
            if (a) {
                var c = b.popups.get("table.colors");
                c || (c = l()), b.popups.setContainer("table.colors", b.$sc);
                var d = P(a), e = (d.left + d.right) / 2, f = d.bottom;
                o(), b.popups.show("table.colors", e, f, d.bottom - d.top)
            }
        }

        function f() {
            0 === ra().length && b.toolbar.enable()
        }

        function g(c) {
            if (c) return b.popups.onHide("table.insert", function () {
                b.popups.get("table.insert").find('.fr-table-size .fr-select-table-size > span[data-row="1"][data-col="1"]').trigger("mouseenter")
            }), !0;
            var d = "";
            b.opts.tableInsertButtons.length > 0 && (d = '<div class="fr-buttons">' + b.button.buildList(b.opts.tableInsertButtons) + "</div>");
            var e = {buttons: d, rows_columns: i()}, f = b.popups.create("table.insert", e);
            return b.events.$on(f, "mouseenter", ".fr-table-size .fr-select-table-size .fr-table-cell", function (b) {
                h(a(b.currentTarget))
            }, !0), j(f), f
        }

        function h(a) {
            var c = a.data("row"), d = a.data("col"), e = a.parent();
            e.siblings(".fr-table-size-info").html(c + " &times; " + d), e.find("> span").removeClass("hover fr-active-item");
            for (var f = 1; f <= b.opts.tableInsertMaxSize; f++) for (var g = 0; g <= b.opts.tableInsertMaxSize; g++) {
                var h = e.find('> span[data-row="' + f + '"][data-col="' + g + '"]');
                f <= c && g <= d ? h.addClass("hover") : f <= c + 1 || f <= 2 && !b.helpers.isMobile() ? h.css("display", "inline-block") : f > 2 && !b.helpers.isMobile() && h.css("display", "none")
            }
            a.addClass("fr-active-item")
        }

        function i() {
            for (var a = '<div class="fr-table-size"><div class="fr-table-size-info">1 &times; 1</div><div class="fr-select-table-size">', c = 1; c <= b.opts.tableInsertMaxSize; c++) {
                for (var d = 1; d <= b.opts.tableInsertMaxSize; d++) {
                    var e = "inline-block";
                    c > 2 && !b.helpers.isMobile() && (e = "none");
                    var f = "fr-table-cell ";
                    1 == c && 1 == d && (f += " hover"), a += '<span class="fr-command ' + f + '" tabIndex="-1" data-cmd="tableInsert" data-row="' + c + '" data-col="' + d + '" data-param1="' + c + '" data-param2="' + d + '" style="display: ' + e + ';" role="button"><span></span><span class="fr-sr-only">' + c + " &times; " + d + "&nbsp;&nbsp;&nbsp;</span></span>"
                }
                a += '<div class="new-line"></div>'
            }
            return a += "</div></div>"
        }

        function j(c) {
            b.events.$on(c, "focus", "[tabIndex]", function (b) {
                var c = a(b.currentTarget);
                h(c)
            }), b.events.on("popup.tab", function (c) {
                var d = a(c.currentTarget);
                if (!b.popups.isVisible("table.insert") || !d.is("span, a")) return !0;
                var e, f = c.which;
                if (a.FE.KEYCODE.ARROW_UP == f || a.FE.KEYCODE.ARROW_DOWN == f || a.FE.KEYCODE.ARROW_LEFT == f || a.FE.KEYCODE.ARROW_RIGHT == f) {
                    if (d.is("span.fr-table-cell")) {
                        var g = d.parent().find("span.fr-table-cell"), i = g.index(d), j = b.opts.tableInsertMaxSize,
                            k = i % j, l = Math.floor(i / j);
                        a.FE.KEYCODE.ARROW_UP == f ? l = Math.max(0, l - 1) : a.FE.KEYCODE.ARROW_DOWN == f ? l = Math.min(b.opts.tableInsertMaxSize - 1, l + 1) : a.FE.KEYCODE.ARROW_LEFT == f ? k = Math.max(0, k - 1) : a.FE.KEYCODE.ARROW_RIGHT == f && (k = Math.min(b.opts.tableInsertMaxSize - 1, k + 1));
                        var m = l * j + k, n = a(g.get(m));
                        h(n), b.events.disableBlur(), n.focus(), e = !1
                    }
                } else a.FE.KEYCODE.ENTER == f && (b.button.exec(d), e = !1);
                return e === !1 && (c.preventDefault(), c.stopPropagation()), e
            }, !0)
        }

        function k(a) {
            if (a) return b.popups.onHide("table.edit", f), !0;
            var c = "";
            b.opts.tableEditButtons.length > 0 && (c = '<div class="fr-buttons">' + b.button.buildList(b.opts.tableEditButtons) + "</div>");
            var e = {buttons: c}, g = b.popups.create("table.edit", e);
            return b.events.$on(b.$wp, "scroll.table-edit", function () {
                b.popups.isVisible("table.edit") && d()
            }), g
        }

        function l() {
            var a = "";
            b.opts.tableColorsButtons.length > 0 && (a = '<div class="fr-buttons fr-table-colors-buttons">' + b.button.buildList(b.opts.tableColorsButtons) + "</div>");
            var c = {buttons: a, colors: m()}, d = b.popups.create("table.colors", c);
            return b.events.$on(b.$wp, "scroll.table-colors", function () {
                b.popups.isVisible("table.colors") && e()
            }), n(d), d
        }

        function m() {
            for (var a = '<div class="fr-table-colors">', c = 0; c < b.opts.tableColors.length; c++) 0 !== c && c % b.opts.tableColorsStep === 0 && (a += "<br>"), a += "REMOVE" != b.opts.tableColors[c] ? '<span class="fr-command" style="background: ' + b.opts.tableColors[c] + ';" tabIndex="-1" role="button" data-cmd="tableCellBackgroundColor" data-param1="' + b.opts.tableColors[c] + '"><span class="fr-sr-only">' + b.language.translate("Color") + " " + b.opts.tableColors[c] + "&nbsp;&nbsp;&nbsp;</span></span>" : '<span class="fr-command" data-cmd="tableCellBackgroundColor" tabIndex="-1" role="button" data-param1="REMOVE" title="' + b.language.translate("Clear Formatting") + '"><i class="fa fa-eraser"></i><span class="fr-sr-only">' + b.language.translate("Clear Formatting") + "</span></span>";
            return a += "</div>"
        }

        function n(c) {
            b.events.on("popup.tab", function (d) {
                var e = a(d.currentTarget);
                if (!b.popups.isVisible("table.colors") || !e.is("span")) return !0;
                var f = d.which, g = !0;
                if (a.FE.KEYCODE.TAB == f) {
                    var h = c.find(".fr-buttons");
                    g = !b.accessibility.focusToolbar(h, !!d.shiftKey)
                } else if (a.FE.KEYCODE.ARROW_UP == f || a.FE.KEYCODE.ARROW_DOWN == f || a.FE.KEYCODE.ARROW_LEFT == f || a.FE.KEYCODE.ARROW_RIGHT == f) {
                    var i = e.parent().find("span.fr-command"), j = i.index(e), k = b.opts.colorsStep,
                        l = Math.floor(i.length / k), m = j % k, n = Math.floor(j / k), o = n * k + m, p = l * k;
                    a.FE.KEYCODE.ARROW_UP == f ? o = ((o - k) % p + p) % p : a.FE.KEYCODE.ARROW_DOWN == f ? o = (o + k) % p : a.FE.KEYCODE.ARROW_LEFT == f ? o = ((o - 1) % p + p) % p : a.FE.KEYCODE.ARROW_RIGHT == f && (o = (o + 1) % p);
                    var q = a(i.get(o));
                    b.events.disableBlur(), q.focus(), g = !1
                } else a.FE.KEYCODE.ENTER == f && (b.button.exec(e), g = !1);
                return g === !1 && (d.preventDefault(), d.stopPropagation()), g
            }, !0)
        }

        function o() {
            var a = b.popups.get("table.colors"), c = b.$el.find(".fr-selected-cell:first");
            a.find(".fr-selected-color").removeClass("fr-selected-color fr-active-item"), a.find('span[data-param1="' + b.helpers.RGBToHex(c.css("background-color")) + '"]').addClass("fr-selected-color fr-active-item")
        }

        function p(c, d) {
            var e, f, g = '<table style="width: 100%;"><tbody>', h = 100 / d;
            for (e = 0; e < c; e++) {
                for (g += "<tr>", f = 0; f < d; f++) g += '<td style="width: ' + h.toFixed(4) + '%;">', 0 === e && 0 === f && (g += a.FE.MARKERS), g += "<br></td>";
                g += "</tr>"
            }
            g += "</tbody></table>", b.html.insert(g), b.selection.restore()
        }

        function q() {
            if (ra().length > 0) {
                var a = sa();
                b.selection.setBefore(a.get(0)) || b.selection.setAfter(a.get(0)), b.selection.restore(), b.popups.hide("table.edit"), a.remove(), b.toolbar.enable()
            }
        }

        function r() {
            var b = sa();
            if (b.length > 0 && 0 === b.find("th").length) {
                var c, e = "<thead><tr>", f = 0;
                for (b.find("tr:first > td").each(function () {
                    var b = a(this);
                    f += parseInt(b.attr("colspan"), 10) || 1
                }), c = 0; c < f; c++) e += "<th><br></th>";
                e += "</tr></thead>", b.prepend(e), d()
            }
        }

        function s() {
            var a = sa(), c = a.find("thead");
            if (c.length > 0) if (0 === a.find("tbody tr").length) q(); else if (c.remove(), ra().length > 0) d(); else {
                b.popups.hide("table.edit");
                var e = a.find("tbody tr:first td:first").get(0);
                e && (b.selection.setAtEnd(e), b.selection.restore())
            }
        }

        function t(c) {
            var e = sa();
            if (e.length > 0) {
                if (b.$el.find("th.fr-selected-cell").length > 0 && "above" == c) return;
                var f, g, h = I(), i = N(h);
                g = "above" == c ? i.min_i : i.max_i;
                var j = "<tr>";
                for (f = 0; f < h[g].length; f++) if ("below" == c && g < h.length - 1 && h[g][f] == h[g + 1][f] || "above" == c && g > 0 && h[g][f] == h[g - 1][f]) {
                    if (0 === f || f > 0 && h[g][f] != h[g][f - 1]) {
                        var k = a(h[g][f]);
                        k.attr("rowspan", parseInt(k.attr("rowspan"), 10) + 1)
                    }
                } else j += "<td><br></td>";
                j += "</tr>";
                var l = a(e.find("tr").not(e.find("table tr")).get(g));
                "below" == c ? l.after(j) : "above" == c && (l.before(j), b.popups.isVisible("table.edit") && d())
            }
        }

        function u() {
            var c = sa();
            if (c.length > 0) {
                var d, e, f, g = I(), h = N(g);
                if (0 === h.min_i && h.max_i == g.length - 1) q(); else {
                    for (d = h.max_i; d >= h.min_i; d--) {
                        for (f = a(c.find("tr").not(c.find("table tr")).get(d)), e = 0; e < g[d].length; e++) if (0 === e || g[d][e] != g[d][e - 1]) {
                            var i = a(g[d][e]);
                            if (parseInt(i.attr("rowspan"), 10) > 1) {
                                var j = parseInt(i.attr("rowspan"), 10) - 1;
                                1 == j ? i.removeAttr("rowspan") : i.attr("rowspan", j)
                            }
                            if (d < g.length - 1 && g[d][e] == g[d + 1][e] && (0 === d || g[d][e] != g[d - 1][e])) {
                                for (var k = g[d][e], l = e; l > 0 && g[d][l] == g[d][l - 1];) l--;
                                0 === l ? a(c.find("tr").not(c.find("table tr")).get(d + 1)).prepend(k) : a(g[d + 1][l - 1]).after(k)
                            }
                        }
                        var m = f.parent();
                        f.remove(), 0 === m.find("tr").length && m.remove(), g = I(c)
                    }
                    A(0, g.length - 1, 0, g[0].length - 1, c), h.min_i > 0 ? b.selection.setAtEnd(g[h.min_i - 1][0]) : b.selection.setAtEnd(g[0][0]), b.selection.restore(), b.popups.hide("table.edit")
                }
            }
        }

        function v(c) {
            var e = sa();
            if (e.length > 0) {
                var f, g = I(), h = N(g);
                f = "before" == c ? h.min_j : h.max_j;
                var i, j = 100 / g[0].length, k = 100 / (g[0].length + 1);
                e.find("th, td").each(function () {
                    i = a(this), i.data("old-width", i.outerWidth() / e.outerWidth() * 100)
                }), e.find("tr").not(e.find("table tr")).each(function (b) {
                    for (var d, e = a(this), h = 0, i = 0; h - 1 < f;) {
                        if (d = e.find("> th, > td").get(i), !d) {
                            d = null;
                            break
                        }
                        d == g[b][h] ? (h += parseInt(a(d).attr("colspan"), 10) || 1, i++) : (h += parseInt(a(g[b][h]).attr("colspan"), 10) || 1, "after" == c && (d = 0 === i ? -1 : e.find("> th, > td").get(i - 1)))
                    }
                    var l = a(d);
                    if ("after" == c && h - 1 > f || "before" == c && f > 0 && g[b][f] == g[b][f - 1]) {
                        if (0 === b || b > 0 && g[b][f] != g[b - 1][f]) {
                            var m = parseInt(l.attr("colspan"), 10) + 1;
                            l.attr("colspan", m), l.css("width", (l.data("old-width") * k / j + k).toFixed(4) + "%"), l.removeData("old-width")
                        }
                    } else {
                        var n;
                        n = e.find("th").length > 0 ? '<th style="width: ' + k.toFixed(4) + '%;"><br></th>' : '<td style="width: ' + k.toFixed(4) + '%;"><br></td>', d == -1 ? e.prepend(n) : null == d ? e.append(n) : "before" == c ? l.before(n) : "after" == c && l.after(n)
                    }
                }), e.find("th, td").each(function () {
                    i = a(this), i.data("old-width") && (i.css("width", (i.data("old-width") * k / j).toFixed(4) + "%"), i.removeData("old-width"))
                }), b.popups.isVisible("table.edit") && d()
            }
        }

        function w() {
            var c = sa();
            if (c.length > 0) {
                var d, e, f, g = I(), h = N(g);
                if (0 === h.min_j && h.max_j == g[0].length - 1) q(); else {
                    var i = 100 / g[0].length, j = 100 / (g[0].length - h.max_j + h.min_j - 1);
                    for (c.find("th, td").each(function () {
                        f = a(this), f.hasClass("fr-selected-cell") || f.data("old-width", f.outerWidth() / c.outerWidth() * 100)
                    }), e = h.max_j; e >= h.min_j; e--) for (d = 0; d < g.length; d++) if (0 === d || g[d][e] != g[d - 1][e]) if (f = a(g[d][e]), (parseInt(f.attr("colspan"), 10) || 1) > 1) {
                        var k = parseInt(f.attr("colspan"), 10) - 1;
                        1 == k ? f.removeAttr("colspan") : f.attr("colspan", k), f.css("width", ((f.data("old-width") - ja(e, g)) * j / i).toFixed(4) + "%"), f.removeData("old-width")
                    } else {
                        var l = a(f.parent().get(0));
                        f.remove(), 0 === l.find("> th, > td").length && (0 === l.prev().length || 0 === l.next().length || l.prev().find("> th[rowspan], > td[rowspan]").length < l.prev().find("> th, > td").length) && l.remove()
                    }
                    A(0, g.length - 1, 0, g[0].length - 1, c), h.min_j > 0 ? b.selection.setAtEnd(g[h.min_i][h.min_j - 1]) : b.selection.setAtEnd(g[h.min_i][0]), b.selection.restore(), b.popups.hide("table.edit"), c.find("th, td").each(function () {
                        f = a(this), f.data("old-width") && (f.css("width", (f.data("old-width") * j / i).toFixed(4) + "%"), f.removeData("old-width"))
                    })
                }
            }
        }

        function x(a, b, c) {
            var d, e, f, g, h, i = 0, j = I(c);
            for (b = Math.min(b, j[0].length - 1), e = a; e <= b; e++) if (!(e > a && j[0][e] == j[0][e - 1]) && (g = parseInt(j[0][e].getAttribute("colspan"), 10) || 1, g > 1 && j[0][e] == j[0][e + 1])) for (i = g - 1, d = 1; d < j.length; d++) if (j[d][e] != j[d - 1][e]) {
                for (f = e; f < e + g; f++) if (h = parseInt(j[d][f].getAttribute("colspan"), 10) || 1, h > 1 && j[d][f] == j[d][f + 1]) i = Math.min(i, h - 1), f += i; else if (i = Math.max(0, i - 1), !i) break;
                if (!i) break
            }
            i && z(j, i, "colspan", 0, j.length - 1, a, b)
        }

        function y(a, b, c) {
            var d, e, f, g, h, i = 0, j = I(c);
            for (b = Math.min(b, j.length - 1), d = a; d <= b; d++) if (!(d > a && j[d][0] == j[d - 1][0]) && (g = parseInt(j[d][0].getAttribute("rowspan"), 10) || 1, g > 1 && j[d][0] == j[d + 1][0])) for (i = g - 1, e = 1; e < j[0].length; e++) if (j[d][e] != j[d][e - 1]) {
                for (f = d; f < d + g; f++) if (h = parseInt(j[f][e].getAttribute("rowspan"), 10) || 1, h > 1 && j[f][e] == j[f + 1][e]) i = Math.min(i, h - 1), f += i; else if (i = Math.max(0, i - 1), !i) break;
                if (!i) break
            }
            i && z(j, i, "rowspan", a, b, 0, j[0].length - 1)
        }

        function z(a, b, c, d, e, f, g) {
            var h, i, j;
            for (h = d; h <= e; h++) for (i = f; i <= g; i++) h > d && a[h][i] == a[h - 1][i] || i > f && a[h][i] == a[h][i - 1] || (j = parseInt(a[h][i].getAttribute(c), 10) || 1, j > 1 && (j - b > 1 ? a[h][i].setAttribute(c, j - b) : a[h][i].removeAttribute(c)))
        }

        function A(a, b, c, d, e) {
            y(a, b, e), x(c, d, e)
        }

        function B() {
            if (ra().length > 1 && (0 === b.$el.find("th.fr-selected-cell").length || 0 === b.$el.find("td.fr-selected-cell").length)) {
                var c, e, f = I(), g = N(f), h = b.$el.find(".fr-selected-cell"), i = a(h[0]), j = i.parent(),
                    k = j.find(".fr-selected-cell"), l = i.closest("table"), m = i.html(), n = 0;
                for (c = 0; c < k.length; c++) n += a(k[c]).outerWidth();
                for (i.css("width", (n / l.outerWidth() * 100).toFixed(4) + "%"), g.min_j < g.max_j && i.attr("colspan", g.max_j - g.min_j + 1), g.min_i < g.max_i && i.attr("rowspan", g.max_i - g.min_i + 1), c = 1; c < h.length; c++) e = a(h[c]), "<br>" != e.html() && "" !== e.html() && (m += "<br>" + e.html()), e.remove();
                i.html(m), b.selection.setAtEnd(i.get(0)), b.selection.restore(), b.toolbar.enable(), y(g.min_i, g.max_i, l);
                var o = l.find("tr:empty");
                for (c = o.length - 1; c >= 0; c--) a(o[c]).remove();
                x(g.min_j, g.max_j, l), d()
            }
        }

        function C() {
            if (1 == ra().length) {
                var c = b.$el.find(".fr-selected-cell"), d = c.parent(), e = c.closest("table"),
                    f = parseInt(c.attr("rowspan"), 10), g = I(), h = J(c.get(0), g), i = c.clone().html("<br>");
                if (f > 1) {
                    var j = Math.ceil(f / 2);
                    j > 1 ? c.attr("rowspan", j) : c.removeAttr("rowspan"), f - j > 1 ? i.attr("rowspan", f - j) : i.removeAttr("rowspan");
                    for (var k = h.row + j, l = 0 === h.col ? h.col : h.col - 1; l >= 0 && (g[k][l] == g[k][l - 1] || k > 0 && g[k][l] == g[k - 1][l]);) l--;
                    l == -1 ? a(e.find("tr").not(e.find("table tr")).get(k)).prepend(i) : a(g[k][l]).after(i)
                } else {
                    var m, n = a("<tr>").append(i);
                    for (m = 0; m < g[0].length; m++) if (0 === m || g[h.row][m] != g[h.row][m - 1]) {
                        var o = a(g[h.row][m]);
                        o.is(c) || o.attr("rowspan", (parseInt(o.attr("rowspan"), 10) || 1) + 1)
                    }
                    d.after(n)
                }
                L(), b.popups.hide("table.edit")
            }
        }

        function D() {
            if (1 == ra().length) {
                var c = b.$el.find(".fr-selected-cell"), d = parseInt(c.attr("colspan"), 10) || 1,
                    e = c.parent().outerWidth(), f = c.outerWidth(), g = c.clone().html("<br>"), h = I(),
                    i = J(c.get(0), h);
                if (d > 1) {
                    var j = Math.ceil(d / 2);
                    f = ka(i.col, i.col + j - 1, h) / e * 100;
                    var k = ka(i.col + j, i.col + d - 1, h) / e * 100;
                    j > 1 ? c.attr("colspan", j) : c.removeAttr("colspan"), d - j > 1 ? g.attr("colspan", d - j) : g.removeAttr("colspan"), c.css("width", f.toFixed(4) + "%"), g.css("width", k.toFixed(4) + "%")
                } else {
                    var l;
                    for (l = 0; l < h.length; l++) if (0 === l || h[l][i.col] != h[l - 1][i.col]) {
                        var m = a(h[l][i.col]);
                        if (!m.is(c)) {
                            var n = (parseInt(m.attr("colspan"), 10) || 1) + 1;
                            m.attr("colspan", n)
                        }
                    }
                    f = f / e * 100 / 2, c.css("width", f.toFixed(4) + "%"), g.css("width", f.toFixed(4) + "%")
                }
                c.after(g), L(), b.popups.hide("table.edit")
            }
        }

        function E(a) {
            "REMOVE" != a ? b.$el.find(".fr-selected-cell").css("background-color", b.helpers.HEXtoRGB(a)) : b.$el.find(".fr-selected-cell").css("background-color", "")
        }

        function F(a) {
            b.$el.find(".fr-selected-cell").css("vertical-align", a)
        }

        function G(a) {
            b.$el.find(".fr-selected-cell").css("text-align", a)
        }

        function H(a, b, c, d) {
            if (b.length > 0) {
                if (!c) {
                    var e = Object.keys(d);
                    e.splice(e.indexOf(a), 1), b.removeClass(e.join(" "))
                }
                b.toggleClass(a)
            }
        }

        function I(b) {
            b = b || null;
            var c = [];
            if (null == b && ra().length > 0 && (b = sa()), b) return b.find("tr").not(b.find("table tr")).each(function (b, d) {
                var e = a(d), f = 0;
                e.find("> th, > td").each(function (d, e) {
                    for (var g = a(e), h = parseInt(g.attr("colspan"), 10) || 1, i = parseInt(g.attr("rowspan"), 10) || 1, j = b; j < b + i; j++) for (var k = f; k < f + h; k++) c[j] || (c[j] = []), c[j][k] ? f++ : c[j][k] = e;
                    f += h
                })
            }), c
        }

        function J(a, b) {
            for (var c = 0; c < b.length; c++) for (var d = 0; d < b[c].length; d++) if (b[c][d] == a) return {
                row: c,
                col: d
            }
        }

        function K(a, b, c) {
            for (var d = a + 1, e = b + 1; d < c.length;) {
                if (c[d][b] != c[a][b]) {
                    d--;
                    break
                }
                d++
            }
            for (d == c.length && d--; e < c[a].length;) {
                if (c[a][e] != c[a][b]) {
                    e--;
                    break
                }
                e++
            }
            return e == c[a].length && e--, {row: d, col: e}
        }

        function L() {
            var c = b.$el.find(".fr-selected-cell");
            c.length > 0 && c.each(function () {
                var b = a(this);
                b.removeClass("fr-selected-cell"), "" === b.attr("class") && b.removeAttr("class")
            }), b.el.querySelector(".fr-cell-fixed") && (b.el.querySelector(".fr-cell-fixed").classList.remove("fr-cell-fixed"), b.el.querySelector(".fr-cell-handler").classList.remove("fr-cell-handler"))
        }

        function M() {
            setTimeout(function () {
                b.selection.clear(), b.$el.addClass("fr-no-selection"), b.$el.blur()
            }, 0)
        }

        function N(a) {
            var c = b.$el.find(".fr-selected-cell");
            if (c.length > 0) {
                var d, e = a.length, f = 0, g = a[0].length, h = 0;
                for (d = 0; d < c.length; d++) {
                    var i = J(c[d], a), j = K(i.row, i.col, a);
                    e = Math.min(i.row, e), f = Math.max(j.row, f), g = Math.min(i.col, g), h = Math.max(j.col, h)
                }
                return {min_i: e, max_i: f, min_j: g, max_j: h}
            }
            return null
        }

        function O(b, c, d, e, f) {
            var g, h, i, j, k = b, l = c, m = d, n = e;
            for (g = k; g <= l; g++) ((parseInt(a(f[g][m]).attr("rowspan"), 10) || 1) > 1 || (parseInt(a(f[g][m]).attr("colspan"), 10) || 1) > 1) && (i = J(f[g][m], f), j = K(i.row, i.col, f), k = Math.min(i.row, k), l = Math.max(j.row, l), m = Math.min(i.col, m), n = Math.max(j.col, n)), ((parseInt(a(f[g][n]).attr("rowspan"), 10) || 1) > 1 || (parseInt(a(f[g][n]).attr("colspan"), 10) || 1) > 1) && (i = J(f[g][n], f), j = K(i.row, i.col, f), k = Math.min(i.row, k), l = Math.max(j.row, l), m = Math.min(i.col, m), n = Math.max(j.col, n));
            for (h = m; h <= n; h++) ((parseInt(a(f[k][h]).attr("rowspan"), 10) || 1) > 1 || (parseInt(a(f[k][h]).attr("colspan"), 10) || 1) > 1) && (i = J(f[k][h], f), j = K(i.row, i.col, f), k = Math.min(i.row, k), l = Math.max(j.row, l), m = Math.min(i.col, m), n = Math.max(j.col, n)), ((parseInt(a(f[l][h]).attr("rowspan"), 10) || 1) > 1 || (parseInt(a(f[l][h]).attr("colspan"), 10) || 1) > 1) && (i = J(f[l][h], f), j = K(i.row, i.col, f), k = Math.min(i.row, k), l = Math.max(j.row, l), m = Math.min(i.col, m), n = Math.max(j.col, n));
            return k == b && l == c && m == d && n == e ? {min_i: b, max_i: c, min_j: d, max_j: e} : O(k, l, m, n, f)
        }

        function P(b) {
            var c = N(b), d = a(b[c.min_i][c.min_j]), e = a(b[c.min_i][c.max_j]), f = a(b[c.max_i][c.min_j]),
                g = d.offset().left, h = e.offset().left + e.outerWidth(), i = d.offset().top,
                j = f.offset().top + f.outerHeight();
            return {left: g, right: h, top: i, bottom: j}
        }

        function Q(c, d) {
            if (a(c).is(d)) L(), b.edit.on(), a(c).addClass("fr-selected-cell"); else {
                M(), b.edit.off();
                var e = I(), f = J(c, e), g = J(d, e),
                    h = O(Math.min(f.row, g.row), Math.max(f.row, g.row), Math.min(f.col, g.col), Math.max(f.col, g.col), e);
                L(), c.classList.add("fr-cell-fixed"), d.classList.add("fr-cell-handler");
                for (var i = h.min_i; i <= h.max_i; i++) for (var j = h.min_j; j <= h.max_j; j++) a(e[i][j]).addClass("fr-selected-cell")
            }
        }

        function R(c) {
            var d = null, e = a(c.target);
            return "TD" == c.target.tagName || "TH" == c.target.tagName ? d = c.target : e.closest("td").length > 0 ? d = e.closest("td").get(0) : e.closest("th").length > 0 && (d = e.closest("th").get(0)), 0 === b.$el.find(d).length ? null : d
        }

        function S() {
            L(), b.popups.hide("table.edit")
        }

        function T(c) {
            var d = R(c);
            if (ra().length > 0 && !d && S(), !b.edit.isDisabled() || b.popups.isVisible("table.edit")) if (1 != c.which || 1 == c.which && b.helpers.isMac() && c.ctrlKey) (3 == c.which || 1 == c.which && b.helpers.isMac() && c.ctrlKey) && d && S(); else if (za = !0, d) {
                ra().length > 0 && !c.shiftKey && S(), c.stopPropagation(), b.events.trigger("image.hideResizer"), b.events.trigger("video.hideResizer"), ya = !0;
                var e = d.tagName.toLowerCase();
                c.shiftKey && b.$el.find(e + ".fr-selected-cell").length > 0 ? a(b.$el.find(e + ".fr-selected-cell").closest("table")).is(a(d).closest("table")) ? Q(Aa, d) : M() : ((b.keys.ctrlKey(c) || c.shiftKey) && (ra().length > 1 || 0 === a(d).find(b.selection.element()).length && !a(d).is(b.selection.element())) && M(), Aa = d, Q(Aa, Aa))
            }
        }

        function U(c) {
            if (ya || b.$tb.is(c.target) || b.$tb.is(a(c.target).closest(b.$tb.get(0))) || (ra().length > 0 && b.toolbar.enable(), L()), !(1 != c.which || 1 == c.which && b.helpers.isMac() && c.ctrlKey)) {
                if (za = !1, ya) {
                    ya = !1;
                    var e = R(c);
                    e || 1 != ra().length ? ra().length > 0 && (b.selection.isCollapsed() ? d() : L()) : L()
                }
                if (Ca) {
                    Ca = !1, wa.removeClass("fr-moving"), b.$el.removeClass("fr-no-selection"), b.edit.on();
                    var f = parseFloat(wa.css("left")) + b.opts.tableResizerOffset;
                    b.opts.iframe && (f -= b.$iframe.offset().left), wa.data("release-position", f), wa.removeData("max-left"), wa.removeData("max-right"), ia(c), aa()
                }
            }
        }

        function V(c) {
            if (ya === !0) {
                var d = a(c.currentTarget);
                if (d.closest("table").is(sa())) {
                    if ("TD" == c.currentTarget.tagName && 0 === b.$el.find("th.fr-selected-cell").length) return void Q(Aa, c.currentTarget);
                    if ("TH" == c.currentTarget.tagName && 0 === b.$el.find("td.fr-selected-cell").length) return void Q(Aa, c.currentTarget)
                }
                M()
            }
        }

        function W(c, d) {
            for (var e = c; e && "TABLE" != e.tagName && e.parentNode != b.el;) e = e.parentNode;
            if (e && "TABLE" == e.tagName) {
                var f = I(a(e));
                "up" == d ? Y(J(c, f), e, f) : "down" == d && Z(J(c, f), e, f)
            }
        }

        function X(a, c, d, e) {
            for (var f, g = c; g != b.el && "TD" != g.tagName && "TH" != g.tagName && ("up" == e ? f = g.previousElementSibling : "down" == e && (f = g.nextElementSibling), !f);) g = g.parentNode;
            "TD" == g.tagName || "TH" == g.tagName ? W(g, e) : f && ("up" == e && b.selection.setAtEnd(f), "down" == e && b.selection.setAtStart(f))
        }

        function Y(a, c, d) {
            a.row > 0 ? b.selection.setAtEnd(d[a.row - 1][a.col]) : X(a, c, d, "up")
        }

        function Z(a, c, d) {
            var e = parseInt(d[a.row][a.col].getAttribute("rowspan"), 10) || 1;
            a.row < d.length - e ? b.selection.setAtStart(d[a.row + e][a.col]) : X(a, c, d, "down")
        }

        function $(c) {
            var d = c.which, e = b.selection.blocks();
            if (e.length && (e = e[0], "TD" == e.tagName || "TH" == e.tagName)) {
                for (var f = e; f && "TABLE" != f.tagName && f.parentNode != b.el;) f = f.parentNode;
                if (f && "TABLE" == f.tagName && (a.FE.KEYCODE.ARROW_LEFT == d || a.FE.KEYCODE.ARROW_UP == d || a.FE.KEYCODE.ARROW_RIGHT == d || a.FE.KEYCODE.ARROW_DOWN == d) && (ra().length > 0 && S(), b.browser.webkit && (a.FE.KEYCODE.ARROW_UP == d || a.FE.KEYCODE.ARROW_DOWN == d))) {
                    var g = b.selection.ranges(0).startContainer;
                    if (g.nodeType == Node.TEXT_NODE && (a.FE.KEYCODE.ARROW_UP == d && g.previousSibling || a.FE.KEYCODE.ARROW_DOWN == d && g.nextSibling)) return;
                    c.preventDefault(), c.stopPropagation();
                    var h = I(a(f)), i = J(e, h);
                    return a.FE.KEYCODE.ARROW_UP == d ? Y(i, f, h) : a.FE.KEYCODE.ARROW_DOWN == d && Z(i, f, h), b.selection.restore(), !1
                }
            }
        }

        function _() {
            b.shared.$table_resizer || (b.shared.$table_resizer = a('<div class="fr-table-resizer"><div></div></div>')), wa = b.shared.$table_resizer, b.events.$on(wa, "mousedown", function (a) {
                return !b.core.sameInstance(wa) || (ra().length > 0 && S(), 1 == a.which ? (b.selection.save(), Ca = !0, wa.addClass("fr-moving"), M(), b.edit.off(), wa.find("div").css("opacity", 1), !1) : void 0)
            }), b.events.$on(wa, "mousemove", function (a) {
                return !b.core.sameInstance(wa) || void(Ca && (b.opts.iframe && (a.pageX -= b.$iframe.offset().left), la(a)))
            }), b.events.on("shared.destroy", function () {
                wa.html("").removeData().remove(), wa = null
            }, !0), b.events.on("destroy", function () {
                b.$el.find(".fr-selected-cell").removeClass("fr-selected-cell"), wa.hide().appendTo(a("body"))
            }, !0)
        }

        function aa() {
            wa && (wa.find("div").css("opacity", 0), wa.css("top", 0), wa.css("left", 0), wa.css("height", 0), wa.find("div").css("height", 0), wa.hide())
        }

        function ba() {
            xa && xa.removeClass("fr-visible").css("left", "-9999px")
        }

        function ca(c, d) {
            var e = a(d), f = e.closest("table"), g = f.parent();
            if (d && "TD" != d.tagName && "TH" != d.tagName && (e.closest("td").length > 0 ? d = e.closest("td") : e.closest("th").length > 0 && (d = e.closest("th"))), !d || "TD" != d.tagName && "TH" != d.tagName) wa && e.get(0) != wa.get(0) && e.parent().get(0) != wa.get(0) && b.core.sameInstance(wa) && aa(); else {
                if (e = a(d), 0 === b.$el.find(e).length) return !1;
                var h = e.offset().left - 1, i = h + e.outerWidth();
                if (Math.abs(c.pageX - h) <= b.opts.tableResizerOffset || Math.abs(i - c.pageX) <= b.opts.tableResizerOffset) {
                    var j, k, l, m, n, o = I(f), p = J(d, o), q = K(p.row, p.col, o), r = f.offset().top,
                        s = f.outerHeight() - 1;
                    "rtl" != b.opts.direction ? c.pageX - h <= b.opts.tableResizerOffset ? (l = h, p.col > 0 ? (m = h - ja(p.col - 1, o) + b.opts.tableResizingLimit, n = h + ja(p.col, o) - b.opts.tableResizingLimit, j = p.col - 1, k = p.col) : (j = null, k = 0, m = f.offset().left - 1 - parseInt(f.css("margin-left"), 10), n = f.offset().left - 1 + f.width() - o[0].length * b.opts.tableResizingLimit)) : i - c.pageX <= b.opts.tableResizerOffset && (l = i, q.col < o[q.row].length && o[q.row][q.col + 1] ? (m = i - ja(q.col, o) + b.opts.tableResizingLimit, n = i + ja(q.col + 1, o) - b.opts.tableResizingLimit, j = q.col, k = q.col + 1) : (j = q.col, k = null, m = f.offset().left - 1 + o[0].length * b.opts.tableResizingLimit, n = g.offset().left - 1 + g.width() + parseFloat(g.css("padding-left")))) : i - c.pageX <= b.opts.tableResizerOffset ? (l = i, p.col > 0 ? (m = i - ja(p.col, o) + b.opts.tableResizingLimit, n = i + ja(p.col - 1, o) - b.opts.tableResizingLimit, j = p.col, k = p.col - 1) : (j = null, k = 0, m = f.offset().left + o[0].length * b.opts.tableResizingLimit, n = g.offset().left - 1 + g.width() + parseFloat(g.css("padding-left")))) : c.pageX - h <= b.opts.tableResizerOffset && (l = h, q.col < o[q.row].length && o[q.row][q.col + 1] ? (m = h - ja(q.col + 1, o) + b.opts.tableResizingLimit, n = h + ja(q.col, o) - b.opts.tableResizingLimit, j = q.col + 1, k = q.col) : (j = q.col, k = null, m = g.offset().left + parseFloat(g.css("padding-left")), n = f.offset().left - 1 + f.width() - o[0].length * b.opts.tableResizingLimit)), wa || _(), wa.data("table", f), wa.data("first", j), wa.data("second", k), wa.data("instance", b), b.$wp.append(wa);
                    var t = l - b.win.pageXOffset - b.opts.tableResizerOffset, u = r - b.win.pageYOffset;
                    b.opts.iframe && (t += b.$iframe.offset().left - b.helpers.scrollLeft(), u += b.$iframe.offset().top - b.helpers.scrollTop(), m += b.$iframe.offset().left, n += b.$iframe.offset().left), wa.data("max-left", m), wa.data("max-right", n), wa.data("origin", l - b.win.pageXOffset), wa.css("top", u), wa.css("left", t), wa.css("height", s), wa.find("div").css("height", s), wa.css("padding-left", b.opts.tableResizerOffset), wa.css("padding-right", b.opts.tableResizerOffset), wa.show()
                } else b.core.sameInstance(wa) && aa()
            }
        }

        function da(c, d) {
            if (b.$box.find(".fr-line-breaker").is(":visible")) return !1;
            xa || oa(), b.$box.append(xa), xa.data("instance", b);
            var e = a(d), f = e.find("tr:first"), g = c.pageX, h = 0, i = 0;
            b.opts.iframe && (h += b.$iframe.offset().left - b.helpers.scrollLeft(), i += b.$iframe.offset().top - b.helpers.scrollTop());
            var j;
            f.find("th, td").each(function () {
                var c = a(this);
                return c.offset().left <= g && g < c.offset().left + c.outerWidth() / 2 ? (j = parseInt(xa.find("a").css("width"), 10), xa.css("top", i + c.offset().top - b.win.pageYOffset - j - 5), xa.css("left", h + c.offset().left - b.win.pageXOffset - j / 2), xa.data("selected-cell", c), xa.data("position", "before"), xa.addClass("fr-visible"), !1) : c.offset().left + c.outerWidth() / 2 <= g && g < c.offset().left + c.outerWidth() ? (j = parseInt(xa.find("a").css("width"), 10), xa.css("top", i + c.offset().top - b.win.pageYOffset - j - 5), xa.css("left", h + c.offset().left + c.outerWidth() - b.win.pageXOffset - j / 2), xa.data("selected-cell", c), xa.data("position", "after"), xa.addClass("fr-visible"), !1) : void 0
            })
        }

        function ea(c, d) {
            if (b.$box.find(".fr-line-breaker").is(":visible")) return !1;
            xa || oa(), b.$box.append(xa), xa.data("instance", b);
            var e = a(d), f = c.pageY, g = 0, h = 0;
            b.opts.iframe && (g += b.$iframe.offset().left - b.helpers.scrollLeft(), h += b.$iframe.offset().top - b.helpers.scrollTop());
            var i;
            e.find("tr").each(function () {
                var c = a(this);
                return c.offset().top <= f && f < c.offset().top + c.outerHeight() / 2 ? (i = parseInt(xa.find("a").css("width"), 10), xa.css("top", h + c.offset().top - b.win.pageYOffset - i / 2), xa.css("left", g + c.offset().left - b.win.pageXOffset - i - 5), xa.data("selected-cell", c.find("td:first")), xa.data("position", "above"), xa.addClass("fr-visible"), !1) : c.offset().top + c.outerHeight() / 2 <= f && f < c.offset().top + c.outerHeight() ? (i = parseInt(xa.find("a").css("width"), 10), xa.css("top", h + c.offset().top + c.outerHeight() - b.win.pageYOffset - i / 2), xa.css("left", g + c.offset().left - b.win.pageXOffset - i - 5), xa.data("selected-cell", c.find("td:first")), xa.data("position", "below"), xa.addClass("fr-visible"), !1) : void 0
            })
        }

        function fa(c, d) {
            if (0 === ra().length) {
                var e, f, g;
                if (d && ("HTML" == d.tagName || "BODY" == d.tagName || b.node.isElement(d))) for (e = 1; e <= b.opts.tableInsertHelperOffset; e++) {
                    if (f = b.doc.elementFromPoint(c.pageX - b.win.pageXOffset, c.pageY - b.win.pageYOffset + e), a(f).hasClass("fr-tooltip")) return !0;
                    if (f && ("TH" == f.tagName || "TD" == f.tagName || "TABLE" == f.tagName) && (a(f).parents(".fr-wrapper").length || b.opts.iframe)) return da(c, a(f).closest("table")), !0;
                    if (g = b.doc.elementFromPoint(c.pageX - b.win.pageXOffset + e, c.pageY - b.win.pageYOffset), a(g).hasClass("fr-tooltip")) return !0;
                    if (g && ("TH" == g.tagName || "TD" == g.tagName || "TABLE" == g.tagName) && (a(g).parents(".fr-wrapper").length || b.opts.iframe)) return ea(c, a(g).closest("table")), !0
                }
                b.core.sameInstance(xa) && ba()
            }
        }

        function ga(a) {
            Ba = null;
            var c = b.doc.elementFromPoint(a.pageX - b.win.pageXOffset, a.pageY - b.win.pageYOffset);
            b.opts.tableResizer && (!b.popups.areVisible() || b.popups.areVisible() && b.popups.isVisible("table.edit")) && ca(a, c), !b.opts.tableInsertHelper || b.popups.areVisible() || b.$tb.hasClass("fr-inline") && b.$tb.is(":visible") || fa(a, c)
        }

        function ha() {
            if (Ca) {
                var a = wa.data("table"), c = a.offset().top - b.win.pageYOffset;
                b.opts.iframe && (c += b.$iframe.offset().top - b.helpers.scrollTop()), wa.css("top", c)
            }
        }

        function ia() {
            var c = wa.data("origin"), d = wa.data("release-position");
            if (c !== d) {
                var e = wa.data("first"), f = wa.data("second"), g = wa.data("table"), h = g.outerWidth();
                if (null !== e && null !== f) {
                    var i, j, k, l = I(g), m = [], n = [], o = [], p = [];
                    for (i = 0; i < l.length; i++) j = a(l[i][e]), k = a(l[i][f]), m[i] = j.outerWidth(), o[i] = k.outerWidth(), n[i] = m[i] / h * 100, p[i] = o[i] / h * 100;
                    for (i = 0; i < l.length; i++) {
                        j = a(l[i][e]), k = a(l[i][f]);
                        var q = (n[i] * (m[i] + d - c) / m[i]).toFixed(4);
                        j.css("width", q + "%"), k.css("width", (n[i] + p[i] - q).toFixed(4) + "%")
                    }
                } else {
                    var r, s = g.parent(), t = h / s.width() * 100,
                        u = (parseInt(g.css("margin-left"), 10) || 0) / s.width() * 100,
                        v = (parseInt(g.css("margin-right"), 10) || 0) / s.width() * 100;
                    "rtl" == b.opts.direction && 0 === f || "rtl" != b.opts.direction && 0 !== f ? (r = (h + d - c) / h * t, g.css("margin-right", "calc(100% - " + Math.round(r).toFixed(4) + "% - " + Math.round(u).toFixed(4) + "%)")) : ("rtl" == b.opts.direction && 0 !== f || "rtl" != b.opts.direction && 0 === f) && (r = (h - d + c) / h * t, g.css("margin-left", "calc(100% - " + Math.round(r).toFixed(4) + "% - " + Math.round(v).toFixed(4) + "%)")), g.css("width", Math.round(r).toFixed(4) + "%")
                }
                b.selection.restore(), b.undo.saveStep()
            }
            wa.removeData("origin"), wa.removeData("release-position"), wa.removeData("first"), wa.removeData("second"), wa.removeData("table")
        }

        function ja(b, c) {
            var d, e = a(c[0][b]).outerWidth();
            for (d = 1; d < c.length; d++) e = Math.min(e, a(c[d][b]).outerWidth());
            return e
        }

        function ka(a, b, c) {
            var d, e = 0;
            for (d = a; d <= b; d++) e += ja(d, c);
            return e
        }

        function la(a) {
            if (ra().length > 1 && za && M(), za === !1 && ya === !1 && Ca === !1) Ba && clearTimeout(Ba), b.edit.isDisabled() && !b.popups.isVisible("table.edit") || (Ba = setTimeout(ga, 30, a)); else if (Ca) {
                var c = a.pageX - b.win.pageXOffset;
                b.opts.iframe && (c += b.$iframe.offset().left);
                var d = wa.data("max-left"), e = wa.data("max-right");
                c >= d && c <= e ? wa.css("left", c - b.opts.tableResizerOffset) : c < d && parseFloat(wa.css("left"), 10) > d - b.opts.tableResizerOffset ? wa.css("left", d - b.opts.tableResizerOffset) : c > e && parseFloat(wa.css("left"), 10) < e - b.opts.tableResizerOffset && wa.css("left", e - b.opts.tableResizerOffset)
            } else za && ba()
        }

        function ma(c) {
            b.node.isEmpty(c.get(0)) ? c.prepend(a.FE.MARKERS) : c.prepend(a.FE.START_MARKER).append(a.FE.END_MARKER)
        }

        function na(c) {
            var d = c.which;
            if (d == a.FE.KEYCODE.TAB) {
                var e;
                if (ra().length > 0) e = b.$el.find(".fr-selected-cell:last"); else {
                    var f = b.selection.element();
                    "TD" == f.tagName || "TH" == f.tagName ? e = a(f) : a(f).closest("td").length > 0 ? e = a(f).closest("td") : a(f).closest("th").length > 0 && (e = a(f).closest("th"))
                }
                if (e) return c.preventDefault(), S(), c.shiftKey ? e.prev().length > 0 ? ma(e.prev()) : e.closest("tr").length > 0 && e.closest("tr").prev().length > 0 ? ma(e.closest("tr").prev().find("td:last")) : e.closest("tbody").length > 0 && e.closest("table").find("thead tr").length > 0 && ma(e.closest("table").find("thead tr th:last")) : e.next().length > 0 ? ma(e.next()) : e.closest("tr").length > 0 && e.closest("tr").next().length > 0 ? ma(e.closest("tr").next().find("td:first")) : e.closest("thead").length > 0 && e.closest("table").find("tbody tr").length > 0 ? ma(e.closest("table").find("tbody tr td:first")) : (e.addClass("fr-selected-cell"), t("below"), L(), ma(e.closest("tr").next().find("td:first"))), b.selection.restore(), !1
            }
        }

        function oa() {
            b.shared.$ti_helper || (b.shared.$ti_helper = a('<div class="fr-insert-helper"><a class="fr-floating-btn" role="button" tabIndex="-1" title="' + b.language.translate("Insert") + '"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M22,16.75 L16.75,16.75 L16.75,22 L15.25,22.000 L15.25,16.75 L10,16.75 L10,15.25 L15.25,15.25 L15.25,10 L16.75,10 L16.75,15.25 L22,15.25 L22,16.75 Z"/></svg></a></div>'), b.events.bindClick(b.shared.$ti_helper, "a", function () {
                var a = xa.data("selected-cell"), c = xa.data("position"), d = xa.data("instance") || b;
                "before" == c ? (a.addClass("fr-selected-cell"), d.table.insertColumn(c), a.removeClass("fr-selected-cell")) : "after" == c ? (a.addClass("fr-selected-cell"), d.table.insertColumn(c), a.removeClass("fr-selected-cell")) : "above" == c ? (a.addClass("fr-selected-cell"), d.table.insertRow(c), a.removeClass("fr-selected-cell")) : "below" == c && (a.addClass("fr-selected-cell"), d.table.insertRow(c), a.removeClass("fr-selected-cell")), ba()
            }), b.events.on("shared.destroy", function () {
                b.shared.$ti_helper.html("").removeData().remove(), b.shared.$ti_helper = null
            }, !0), b.events.$on(b.shared.$ti_helper, "mousemove", function (a) {
                a.stopPropagation()
            }, !0), b.events.$on(a(b.o_win), "scroll", function () {
                ba()
            }, !0), b.events.$on(b.$wp, "scroll", function () {
                ba()
            }, !0)), xa = b.shared.$ti_helper, b.events.on("destroy", function () {
                xa = null
            }), b.tooltip.bind(b.$box, ".fr-insert-helper > a.fr-floating-btn")
        }

        function pa() {
            Aa = null, clearTimeout(Ba)
        }

        function qa() {
            ra().length > 0 ? d() : (b.popups.hide("table.insert"), b.toolbar.showInline())
        }

        function ra() {
            return b.el.querySelectorAll(".fr-selected-cell")
        }

        function sa() {
            var c = ra();
            if (c.length) {
                for (var d = c[0]; d && "TABLE" != d.tagName && d.parentNode != b.el;) d = d.parentNode;
                return a(d && "TABLE" == d.tagName ? d : [])
            }
            return a([])
        }

        function ta(c) {
            if (c.altKey && c.which == a.FE.KEYCODE.SPACE) {
                var e, f = b.selection.element();
                if ("TD" == f.tagName || "TH" == f.tagName ? e = f : a(f).closest("td").length > 0 ? e = a(f).closest("td").get(0) : a(f).closest("th").length > 0 && (e = a(f).closest("th").get(0)), e) return c.preventDefault(), Q(e, e), d(), !1
            }
        }

        function ua(c) {
            var d = ra();
            if (d.length > 0) {
                var e, f, g = I(), h = c.which;
                1 == d.length ? (e = d[0], f = e) : (e = b.el.querySelector(".fr-cell-fixed"), f = b.el.querySelector(".fr-cell-handler"));
                var i = J(f, g);
                if (a.FE.KEYCODE.ARROW_RIGHT == h) {
                    if (i.col < g[0].length - 1) return Q(e, g[i.row][i.col + 1]), !1
                } else if (a.FE.KEYCODE.ARROW_DOWN == h) {
                    if (i.row < g.length - 1) return Q(e, g[i.row + 1][i.col]), !1
                } else if (a.FE.KEYCODE.ARROW_LEFT == h) {
                    if (i.col > 0) return Q(e, g[i.row][i.col - 1]), !1
                } else if (a.FE.KEYCODE.ARROW_UP == h && i.row > 0) return Q(e, g[i.row - 1][i.col]), !1
            }
        }

        function va() {
            if (!b.$wp) return !1;
            if (!b.helpers.isMobile()) {
                za = !1, ya = !1, Ca = !1, b.events.$on(b.$el, "mousedown", T), b.popups.onShow("image.edit", function () {
                    L(), za = !1, ya = !1
                }), b.popups.onShow("link.edit", function () {
                    L(), za = !1, ya = !1
                }), b.events.on("commands.mousedown", function (a) {
                    a.parents(".fr-toolbar").length > 0 && L()
                }), b.events.$on(b.$el, "mouseenter", "th, td", V), b.events.$on(b.$win, "mouseup", U), b.opts.iframe && b.events.$on(a(b.o_win), "mouseup", U), b.events.$on(b.$win, "mousemove", la), b.events.$on(a(b.o_win), "scroll", ha), b.events.on("contentChanged", function () {
                    ra().length > 0 && (d(), b.$el.find("img").on("load.selected-cells", function () {
                        a(this).off("load.selected-cells"), ra().length > 0 && d()
                    }))
                }), b.events.$on(a(b.o_win), "resize", function () {
                    L()
                }), b.events.on("toolbar.esc", function () {
                    if (ra().length > 0) return b.events.disableBlur(), b.events.focus(), !1
                }, !0), b.events.$on(b.$el, "keydown", function (a) {
                    a.shiftKey ? ua(a) === !1 && setTimeout(function () {
                        d()
                    }, 0) : $(a)
                }), b.events.on("keydown", function (c) {
                    if (na(c) === !1) return !1;
                    var d = ra();
                    if (d.length > 0) {
                        if (c.which == a.FE.KEYCODE.ESC && b.popups.isVisible("table.edit")) return L(), b.popups.hide("table.edit"), c.preventDefault(), c.stopPropagation(), c.stopImmediatePropagation(), d = [], !1;
                        if (d.length > 1 && c.which == a.FE.KEYCODE.BACKSPACE) {
                            b.undo.saveStep();
                            for (var e = 0; e < d.length; e++) a(d[e]).html("<br>"), e == d.length - 1 && a(d[e]).prepend(a.FE.MARKERS);
                            return b.selection.restore(), b.undo.saveStep(), d = [], !1
                        }
                        if (d.length > 1 && c.which != a.FE.KEYCODE.F10 && !b.keys.isBrowserAction(c)) return c.preventDefault(), d = [], !1
                    } else if (d = [], ta(c) === !1) return !1
                }, !0);
                var c = [];
                b.events.on("html.beforeGet", function () {
                    c = ra();
                    for (var a = 0; a < c.length; a++) c[a].className = (c[a].className || "").replace(/fr-selected-cell/g, "")
                }), b.events.on("html.afterGet", function () {
                    for (var a = 0; a < c.length; a++) c[a].className = (c[a].className ? c[a].className.trim() + " " : "") + "fr-selected-cell";
                    c = []
                }), g(!0), k(!0)
            }
            b.events.on("destroy", pa)
        }

        var wa, xa, ya, za, Aa, Ba, Ca;
        return {
            _init: va,
            insert: p,
            remove: q,
            insertRow: t,
            deleteRow: u,
            insertColumn: v,
            deleteColumn: w,
            mergeCells: B,
            splitCellVertically: D,
            splitCellHorizontally: C,
            addHeader: r,
            removeHeader: s,
            setBackground: E,
            showInsertPopup: c,
            showEditPopup: d,
            showColorsPopup: e,
            back: qa,
            verticalAlign: F,
            horizontalAlign: G,
            applyStyle: H,
            selectedTable: sa,
            selectedCells: ra
        }
    }, a.FE.DefineIcon("insertTable", {NAME: "table"}), a.FE.RegisterCommand("insertTable", {
        title: "Insert Table",
        undo: !1,
        focus: !0,
        refreshOnCallback: !1,
        popup: !0,
        callback: function () {
            this.popups.isVisible("table.insert") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("table.insert")) : this.table.showInsertPopup()
        },
        plugin: "table"
    }), a.FE.RegisterCommand("tableInsert", {
        callback: function (a, b, c) {
            this.table.insert(b, c), this.popups.hide("table.insert")
        }
    }), a.FE.DefineIcon("tableHeader", {NAME: "header"}), a.FE.RegisterCommand("tableHeader", {
        title: "Table Header",
        focus: !1,
        toggle: !0,
        callback: function () {
            var a = this.popups.get("table.edit").find('.fr-command[data-cmd="tableHeader"]');
            a.hasClass("fr-active") ? this.table.removeHeader() : this.table.addHeader()
        },
        refresh: function (a) {
            var b = this.table.selectedTable();
            b.length > 0 && (0 === b.find("th").length ? a.removeClass("fr-active").attr("aria-pressed", !1) : a.addClass("fr-active").attr("aria-pressed", !0))
        }
    }), a.FE.DefineIcon("tableRows", {NAME: "bars"}), a.FE.RegisterCommand("tableRows", {
        type: "dropdown",
        focus: !1,
        title: "Row",
        options: {above: "Insert row above", below: "Insert row below", delete: "Delete row"},
        html: function () {
            var b = '<ul class="fr-dropdown-list" role="presentation">', c = a.FE.COMMANDS.tableRows.options;
            for (var d in c) c.hasOwnProperty(d) && (b += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableRows" data-param1="' + d + '" title="' + this.language.translate(c[d]) + '">' + this.language.translate(c[d]) + "</a></li>");
            return b += "</ul>"
        },
        callback: function (a, b) {
            "above" == b || "below" == b ? this.table.insertRow(b) : this.table.deleteRow()
        }
    }), a.FE.DefineIcon("tableColumns", {NAME: "bars fa-rotate-90"}), a.FE.RegisterCommand("tableColumns", {
        type: "dropdown",
        focus: !1,
        title: "Column",
        options: {before: "Insert column before", after: "Insert column after", delete: "Delete column"},
        html: function () {
            var b = '<ul class="fr-dropdown-list" role="presentation">', c = a.FE.COMMANDS.tableColumns.options;
            for (var d in c) c.hasOwnProperty(d) && (b += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableColumns" data-param1="' + d + '" title="' + this.language.translate(c[d]) + '">' + this.language.translate(c[d]) + "</a></li>");
            return b += "</ul>"
        },
        callback: function (a, b) {
            "before" == b || "after" == b ? this.table.insertColumn(b) : this.table.deleteColumn()
        }
    }), a.FE.DefineIcon("tableCells", {NAME: "square-o"}), a.FE.RegisterCommand("tableCells", {
        type: "dropdown",
        focus: !1,
        title: "Cell",
        options: {merge: "Merge cells", "vertical-split": "Vertical split", "horizontal-split": "Horizontal split"},
        html: function () {
            var b = '<ul class="fr-dropdown-list" role="presentation">', c = a.FE.COMMANDS.tableCells.options;
            for (var d in c) c.hasOwnProperty(d) && (b += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableCells" data-param1="' + d + '" title="' + this.language.translate(c[d]) + '">' + this.language.translate(c[d]) + "</a></li>");
            return b += "</ul>"
        },
        callback: function (a, b) {
            "merge" == b ? this.table.mergeCells() : "vertical-split" == b ? this.table.splitCellVertically() : this.table.splitCellHorizontally()
        },
        refreshOnShow: function (a, b) {
            this.$el.find(".fr-selected-cell").length > 1 ? (b.find('a[data-param1="vertical-split"]').addClass("fr-disabled").attr("aria-disabled", !0), b.find('a[data-param1="horizontal-split"]').addClass("fr-disabled").attr("aria-disabled", !0), b.find('a[data-param1="merge"]').removeClass("fr-disabled").attr("aria-disabled", !1)) : (b.find('a[data-param1="merge"]').addClass("fr-disabled").attr("aria-disabled", !0), b.find('a[data-param1="vertical-split"]').removeClass("fr-disabled").attr("aria-disabled", !1), b.find('a[data-param1="horizontal-split"]').removeClass("fr-disabled").attr("aria-disabled", !1))
        }
    }), a.FE.DefineIcon("tableRemove", {NAME: "trash"}), a.FE.RegisterCommand("tableRemove", {
        title: "Remove Table",
        focus: !1,
        callback: function () {
            this.table.remove()
        }
    }), a.FE.DefineIcon("tableStyle", {NAME: "paint-brush"}), a.FE.RegisterCommand("tableStyle", {
        title: "Table Style",
        type: "dropdown",
        focus: !1,
        html: function () {
            var a = '<ul class="fr-dropdown-list" role="presentation">', b = this.opts.tableStyles;
            for (var c in b) b.hasOwnProperty(c) && (a += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableStyle" data-param1="' + c + '" title="' + this.language.translate(b[c]) + '">' + this.language.translate(b[c]) + "</a></li>");
            return a += "</ul>"
        },
        callback: function (a, b) {
            this.table.applyStyle(b, this.$el.find(".fr-selected-cell").closest("table"), this.opts.tableMultipleStyles, this.opts.tableStyles)
        },
        refreshOnShow: function (b, c) {
            var d = this.$el.find(".fr-selected-cell").closest("table");
            d && c.find(".fr-command").each(function () {
                var b = a(this).data("param1"), c = d.hasClass(b);
                a(this).toggleClass("fr-active", c).attr("aria-selected", c)
            })
        }
    }), a.FE.DefineIcon("tableCellBackground", {NAME: "tint"}), a.FE.RegisterCommand("tableCellBackground", {
        title: "Cell Background",
        focus: !1,
        popup: !0,
        callback: function () {
            this.table.showColorsPopup()
        }
    }), a.FE.RegisterCommand("tableCellBackgroundColor", {
        undo: !0, focus: !1, callback: function (a, b) {
            this.table.setBackground(b)
        }
    }), a.FE.DefineIcon("tableBack", {NAME: "arrow-left"}), a.FE.RegisterCommand("tableBack", {
        title: "Back",
        undo: !1,
        focus: !1,
        back: !0,
        callback: function () {
            this.table.back()
        },
        refresh: function (a) {
            0 !== this.table.selectedCells().length || this.opts.toolbarInline ? (a.removeClass("fr-hidden"), a.next(".fr-separator").removeClass("fr-hidden")) : (a.addClass("fr-hidden"), a.next(".fr-separator").addClass("fr-hidden"))
        }
    }), a.FE.DefineIcon("tableCellVerticalAlign", {NAME: "arrows-v"}), a.FE.RegisterCommand("tableCellVerticalAlign", {
        type: "dropdown",
        focus: !1,
        title: "Vertical Align",
        options: {Top: "Align Top", Middle: "Align Middle", Bottom: "Align Bottom"},
        html: function () {
            var b = '<ul class="fr-dropdown-list" role="presentation">',
                c = a.FE.COMMANDS.tableCellVerticalAlign.options;
            for (var d in c) c.hasOwnProperty(d) && (b += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableCellVerticalAlign" data-param1="' + d.toLowerCase() + '" title="' + this.language.translate(c[d]) + '">' + this.language.translate(d) + "</a></li>");
            return b += "</ul>"
        },
        callback: function (a, b) {
            this.table.verticalAlign(b)
        },
        refreshOnShow: function (a, b) {
            b.find('.fr-command[data-param1="' + this.$el.find(".fr-selected-cell").css("vertical-align") + '"]').addClass("fr-active").attr("aria-selected", !0)
        }
    }), a.FE.DefineIcon("tableCellHorizontalAlign", {NAME: "align-left"}), a.FE.DefineIcon("align-left", {NAME: "align-left"}), a.FE.DefineIcon("align-right", {NAME: "align-right"}), a.FE.DefineIcon("align-center", {NAME: "align-center"}), a.FE.DefineIcon("align-justify", {NAME: "align-justify"}), a.FE.RegisterCommand("tableCellHorizontalAlign", {
        type: "dropdown",
        focus: !1,
        title: "Horizontal Align",
        options: {left: "Align Left", center: "Align Center", right: "Align Right", justify: "Align Justify"},
        html: function () {
            var b = '<ul class="fr-dropdown-list" role="presentation">',
                c = a.FE.COMMANDS.tableCellHorizontalAlign.options;
            for (var d in c) c.hasOwnProperty(d) && (b += '<li role="presentation"><a class="fr-command fr-title" tabIndex="-1" role="option" data-cmd="tableCellHorizontalAlign" data-param1="' + d + '" title="' + this.language.translate(c[d]) + '">' + this.icon.create("align-" + d) + '<span class="fr-sr-only">' + this.language.translate(c[d]) + "</span></a></li>");
            return b += "</ul>"
        },
        callback: function (a, b) {
            this.table.horizontalAlign(b)
        },
        refresh: function (b) {
            var c = this.table.selectedCells();
            c.length && b.find("> *:first").replaceWith(this.icon.create("align-" + this.helpers.getAlignment(a(c[0]))))
        },
        refreshOnShow: function (a, b) {
            b.find('.fr-command[data-param1="' + this.helpers.getAlignment(this.$el.find(".fr-selected-cell:first")) + '"]').addClass("fr-active").attr("aria-selected", !0)
        }
    }), a.FE.DefineIcon("tableCellStyle", {NAME: "magic"}), a.FE.RegisterCommand("tableCellStyle", {
        title: "Cell Style",
        type: "dropdown",
        focus: !1,
        html: function () {
            var a = '<ul class="fr-dropdown-list" role="presentation">', b = this.opts.tableCellStyles;
            for (var c in b) b.hasOwnProperty(c) && (a += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableCellStyle" data-param1="' + c + '" title="' + this.language.translate(b[c]) + '">' + this.language.translate(b[c]) + "</a></li>");
            return a += "</ul>"
        },
        callback: function (a, b) {
            this.table.applyStyle(b, this.$el.find(".fr-selected-cell"), this.opts.tableCellMultipleStyles, this.opts.tableCellStyles)
        },
        refreshOnShow: function (b, c) {
            var d = this.$el.find(".fr-selected-cell:first");
            d && c.find(".fr-command").each(function () {
                var b = a(this).data("param1"), c = d.hasClass(b);
                a(this).toggleClass("fr-active", c).attr("aria-selected", c)
            })
        }
    })
});
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');
                }
                else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function ($) {
    'use strict';
    $.extend($.FE.POPUP_TEMPLATES, {
        'video.insert': '[_BUTTONS_][_BY_URL_LAYER_][_EMBED_LAYER_]',
        'video.edit': '[_BUTTONS_]',
        'video.size': '[_BUTTONS_][_SIZE_LAYER_]'
    })
    $.extend($.FE.DEFAULTS, {
        videoInsertButtons: ['videoBack', '|', 'videoByURL', 'videoEmbed'],
        videoEditButtons: ['videoDisplay', 'videoAlign', 'videoSize', 'videoRemove'],
        videoResize: true,
        videoSizeButtons: ['videoBack', '|'],
        videoSplitHTML: false,
        videoTextNear: true,
        videoDefaultAlign: 'center',
        videoDefaultDisplay: 'block',
        videoMove: true
    });
    $.FE.VIDEO_PROVIDERS = [{
        test_regex: /^.*((youtu.be)|(youtube.com))\/((v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))?\??v?=?([^#\&\?]*).*/,
        url_regex: /(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/)?([0-9a-zA-Z_\-]+)(.+)?/g,
        url_text: '//www.youtube.com/embed/$1',
        html: '<iframe width="640" height="360" src="{url}?wmode=opaque" frameborder="0" allowfullscreen></iframe>'
    }, {
        test_regex: /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/,
        url_regex: /(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com)\/(?:channels\/[A-z]+\/|groups\/[A-z]+\/videos\/)?(.+)/g,
        url_text: '//player.vimeo.com/video/$1',
        html: '<iframe width="640" height="360" src="{url}" frameborder="0" allowfullscreen></iframe>'
    }, {
        test_regex: /^.+(dailymotion.com|dai.ly)\/(video|hub)?\/?([^_]+)[^#]*(#video=([^_&]+))?/,
        url_regex: /(?:https?:\/\/)?(?:www\.)?(?:dailymotion\.com|dai\.ly)\/(?:video|hub)?\/?(.+)/g,
        url_text: '//www.dailymotion.com/embed/video/$1',
        html: '<iframe width="640" height="360" src="{url}" frameborder="0" allowfullscreen></iframe>'
    }, {
        test_regex: /^.+(screen.yahoo.com)\/[^_&]+/,
        url_regex: '',
        url_text: '',
        html: '<iframe width="640" height="360" src="{url}?format=embed" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" allowtransparency="true"></iframe>'
    }, {
        test_regex: /^.+(rutube.ru)\/[^_&]+/,
        url_regex: /(?:https?:\/\/)?(?:www\.)?(?:rutube\.ru)\/(?:video)?\/?(.+)/g,
        url_text: '//rutube.ru/play/embed/$1',
        html: '<iframe width="640" height="360" src="{url}" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" allowtransparency="true"></iframe>'
    }];
    $.FE.VIDEO_EMBED_REGEX = /^\W*((<iframe.*><\/iframe>)|(<embed.*>))\W*$/i;
    $.FE.PLUGINS.video = function (editor) {
        var $overlay;
        var $handler;
        var $video_resizer;
        var $current_video;

        function _refreshInsertPopup() {
            var $popup = editor.popups.get('video.insert');
            var $url_input = $popup.find('.fr-video-by-url-layer input');
            $url_input.val('').trigger('change');
            var $embed_area = $popup.find('.fr-video-embed-layer textarea');
            $embed_area.val('').trigger('change');
        }

        function showInsertPopup() {
            var $btn = editor.$tb.find('.fr-command[data-cmd="insertVideo"]');
            var $popup = editor.popups.get('video.insert');
            if (!$popup) $popup = _initInsertPopup();
            if (!$popup.hasClass('fr-active')) {
                editor.popups.refresh('video.insert');
                editor.popups.setContainer('video.insert', editor.$tb);
                var left = $btn.offset().left + $btn.outerWidth() / 2;
                var top = $btn.offset().top + (editor.opts.toolbarBottom ? 10 : $btn.outerHeight() - 10);
                editor.popups.show('video.insert', left, top, $btn.outerHeight());
            }
        }

        function _showEditPopup() {
            var $popup = editor.popups.get('video.edit');
            if (!$popup) $popup = _initEditPopup();
            editor.popups.setContainer('video.edit', $(editor.opts.scrollableContainer));
            editor.popups.refresh('video.edit');
            var $video_obj = $current_video.find('iframe, embed, video');
            var left = $video_obj.offset().left + $video_obj.outerWidth() / 2;
            var top = $video_obj.offset().top + $video_obj.outerHeight();
            editor.popups.show('video.edit', left, top, $video_obj.outerHeight());
        }

        function _initInsertPopup(delayed) {
            if (delayed) {
                editor.popups.onRefresh('video.insert', _refreshInsertPopup);
                return true;
            }
            var video_buttons = '';
            if (editor.opts.videoInsertButtons.length > 1) {
                video_buttons = '<div class="fr-buttons">' + editor.button.buildList(editor.opts.videoInsertButtons) + '</div>';
            }
            var by_url_layer = '';
            if (editor.opts.videoInsertButtons.indexOf('videoByURL') >= 0) {
                by_url_layer = '<div class="fr-video-by-url-layer fr-layer fr-active" id="fr-video-by-url-layer-' + editor.id + '"><div class="fr-input-line"><input type="text" placeholder="http://" tabIndex="1"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="videoInsertByURL" tabIndex="2">' + editor.language.translate('Insert') + '</button></div></div>'
            }
            var embed_layer = '';
            if (editor.opts.videoInsertButtons.indexOf('videoEmbed') >= 0) {
                embed_layer = '<div class="fr-video-embed-layer fr-layer" id="fr-video-embed-layer-' + editor.id + '"><div class="fr-input-line"><textarea type="text" placeholder="' + editor.language.translate('Embedded Code') + '" tabIndex="1" rows="5"></textarea></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="videoInsertEmbed" tabIndex="2">' + editor.language.translate('Insert') + '</button></div></div>'
            }
            var template = {buttons: video_buttons, by_url_layer: by_url_layer, embed_layer: embed_layer}
            var $popup = editor.popups.create('video.insert', template);
            return $popup;
        }

        function showLayer(name) {
            var $popup = editor.popups.get('video.insert');
            var left;
            var top;
            if (!$current_video && !editor.opts.toolbarInline) {
                var $btn = editor.$tb.find('.fr-command[data-cmd="insertVideo"]');
                left = $btn.offset().left + $btn.outerWidth() / 2;
                top = $btn.offset().top + (editor.opts.toolbarBottom ? 10 : $btn.outerHeight() - 10);
            }
            if (editor.opts.toolbarInline) {
                top = $popup.offset().top - editor.helpers.getPX($popup.css('margin-top'));
                if ($popup.hasClass('fr-above')) {
                    top += $popup.outerHeight();
                }
            }
            $popup.find('.fr-layer').removeClass('fr-active');
            $popup.find('.fr-' + name + '-layer').addClass('fr-active');
            editor.popups.show('video.insert', left, top, 0);
        }

        function refreshByURLButton($btn) {
            var $popup = editor.popups.get('video.insert');
            if ($popup.find('.fr-video-by-url-layer').hasClass('fr-active')) {
                $btn.addClass('fr-active');
            }
        }

        function refreshEmbedButton($btn) {
            var $popup = editor.popups.get('video.insert');
            if ($popup.find('.fr-video-embed-layer').hasClass('fr-active')) {
                $btn.addClass('fr-active');
            }
        }

        function insert(embedded_code) {
            editor.events.focus(true);
            editor.selection.restore();
            editor.html.insert('<span contenteditable="false" draggable="true" class="fr-jiv fr-video fr-dv' + (editor.opts.videoDefaultDisplay[0]) + (editor.opts.videoDefaultAlign != 'center' ? ' fr-fv' + editor.opts.videoDefaultAlign[0] : '') + '">' + embedded_code + '</span>', false, editor.opts.videoSplitHTML);
            editor.popups.hide('video.insert');
            var $video = editor.$el.find('.fr-jiv');
            $video.removeClass('fr-jiv');
            $video.toggleClass('fr-draggable', editor.opts.videoMove);
            editor.events.trigger('video.inserted', [$video]);
        }

        function insertByURL(link) {
            if (typeof link == 'undefined') {
                var $popup = editor.popups.get('video.insert');
                link = $popup.find('.fr-video-by-url-layer input[type="text"]').val() || '';
            }
            var video = null;
            if (editor.helpers.isURL(link)) {
                for (var i = 0; i < $.FE.VIDEO_PROVIDERS.length; i++) {
                    var vp = $.FE.VIDEO_PROVIDERS[i];
                    if (vp.test_regex.test(link)) {
                        video = link.replace(vp.url_regex, vp.url_text);
                        video = vp.html.replace(/\{url\}/, video);
                        break;
                    }
                }
            }
            if (video) {
                insert(video);
            }
            else {
                editor.events.trigger('video.linkError', [link]);
            }
        }

        function insertEmbed(code) {
            if (typeof code == 'undefined') {
                var $popup = editor.popups.get('video.insert');
                code = $popup.find('.fr-video-embed-layer textarea').val() || '';
            }
            if (code.length === 0 || !$.FE.VIDEO_EMBED_REGEX.test(code)) {
                editor.events.trigger('video.codeError', [code]);
            }
            else {
                insert(code);
            }
        }

        function _handlerMousedown(e) {
            if (!editor.core.sameInstance($video_resizer)) return true;
            e.preventDefault();
            e.stopPropagation();
            var c_x = e.pageX || (e.originalEvent.touches ? e.originalEvent.touches[0].pageX : null);
            var c_y = e.pageY || (e.originalEvent.touches ? e.originalEvent.touches[0].pageY : null);
            if (!c_x || !c_y) {
                return false;
            }
            if (!editor.undo.canDo()) editor.undo.saveStep();
            $handler = $(this);
            $handler.data('start-x', c_x);
            $handler.data('start-y', c_y);
            $overlay.show();
            editor.popups.hideAll();
            _unmarkExit();
        }

        function _handlerMousemove(e) {
            if (!editor.core.sameInstance($video_resizer)) return true;
            if ($handler) {
                e.preventDefault()
                var c_x = e.pageX || (e.originalEvent.touches ? e.originalEvent.touches[0].pageX : null);
                var c_y = e.pageY || (e.originalEvent.touches ? e.originalEvent.touches[0].pageY : null);
                if (!c_x || !c_y) {
                    return false;
                }
                var s_x = $handler.data('start-x');
                var s_y = $handler.data('start-y');
                $handler.data('start-x', c_x);
                $handler.data('start-y', c_y);
                var diff_x = c_x - s_x;
                var diff_y = c_y - s_y;
                var $video_obj = $current_video.find('iframe, embed, video');
                var width = $video_obj.width();
                var height = $video_obj.height();
                if ($handler.hasClass('fr-hnw') || $handler.hasClass('fr-hsw')) {
                    diff_x = 0 - diff_x;
                }
                if ($handler.hasClass('fr-hnw') || $handler.hasClass('fr-hne')) {
                    diff_y = 0 - diff_y;
                }
                $video_obj.css('width', width + diff_x);
                $video_obj.css('height', height + diff_y);
                $video_obj.removeAttr('width');
                $video_obj.removeAttr('height');
                _repositionResizer();
            }
        }

        function _handlerMouseup(e) {
            if (!editor.core.sameInstance($video_resizer)) return true;
            if ($handler && $current_video) {
                if (e) e.stopPropagation();
                $handler = null;
                $overlay.hide();
                _repositionResizer();
                _showEditPopup();
                editor.undo.saveStep();
            }
        }

        function _getHandler(pos) {
            return '<div class="fr-handler fr-h' + pos + '"></div>';
        }

        function _initResizer() {
            var doc;
            if (!editor.shared.$video_resizer) {
                editor.shared.$video_resizer = $('<div class="fr-video-resizer"></div>');
                $video_resizer = editor.shared.$video_resizer;
                editor.events.$on($video_resizer, 'mousedown', function (e) {
                    e.stopPropagation();
                }, true);
                if (editor.opts.videoResize) {
                    $video_resizer.append(_getHandler('nw') + _getHandler('ne') + _getHandler('sw') + _getHandler('se'));
                    editor.shared.$vid_overlay = $('<div class="fr-video-overlay"></div>');
                    $overlay = editor.shared.$vid_overlay;
                    doc = $video_resizer.get(0).ownerDocument;
                    $(doc).find('body').append($overlay);
                }
            } else {
                $video_resizer = editor.shared.$video_resizer;
                $overlay = editor.shared.$vid_overlay;
                editor.events.on('destroy', function () {
                    $video_resizer.removeClass('fr-active').appendTo($('body'));
                }, true);
            }
            editor.events.on('shared.destroy', function () {
                $video_resizer.html('').removeData().remove();
                $video_resizer = null;
                if (editor.opts.videoResize) {
                    $overlay.remove();
                    $overlay = null;
                }
            }, true);
            if (!editor.helpers.isMobile()) {
                editor.events.$on($(editor.o_win), 'resize.video', function () {
                    _exitEdit(true);
                });
            }
            if (editor.opts.videoResize) {
                doc = $video_resizer.get(0).ownerDocument;
                editor.events.$on($video_resizer, editor._mousedown, '.fr-handler', _handlerMousedown);
                editor.events.$on($(doc), editor._mousemove, _handlerMousemove);
                editor.events.$on($(doc.defaultView || doc.parentWindow), editor._mouseup, _handlerMouseup);
                editor.events.$on($overlay, 'mouseleave', _handlerMouseup);
            }
        }

        function _repositionResizer() {
            if (!$video_resizer) _initResizer();
            (editor.$wp || $(editor.opts.scrollableContainer)).append($video_resizer);
            $video_resizer.data('instance', editor);
            var $video_obj = $current_video.find('iframe, embed, video');
            $video_resizer.css('top', (editor.opts.iframe ? $video_obj.offset().top - 1 : $video_obj.offset().top - editor.$wp.offset().top - 1) + editor.$wp.scrollTop()).css('left', (editor.opts.iframe ? $video_obj.offset().left - 1 : $video_obj.offset().left - editor.$wp.offset().left - 1) + editor.$wp.scrollLeft()).css('width', $video_obj.outerWidth()).css('height', $video_obj.height()).addClass('fr-active')
        }

        var touchScroll;

        function _edit(e) {
            if (e && e.type == 'touchend' && touchScroll) {
                return true;
            }
            e.preventDefault();
            e.stopPropagation();
            if (editor.edit.isDisabled()) {
                return false;
            }
            for (var i = 0; i < $.FE.INSTANCES.length; i++) {
                if ($.FE.INSTANCES[i] != editor) {
                    $.FE.INSTANCES[i].events.trigger('video.hideResizer');
                }
            }
            editor.toolbar.disable();
            if (editor.helpers.isMobile()) {
                editor.events.disableBlur();
                editor.$el.blur();
                editor.events.enableBlur();
            }
            $current_video = $(this);
            $(this).addClass('fr-active');
            if (editor.opts.iframe) {
                editor.size.syncIframe();
            }
            _repositionResizer();
            _showEditPopup();
            editor.selection.clear();
            editor.button.bulkRefresh();
            editor.events.trigger('image.hideResizer');
        }

        function _exitEdit(force_exit) {
            if ($current_video && (_canExit() || force_exit === true)) {
                $video_resizer.removeClass('fr-active');
                editor.toolbar.enable();
                $current_video.removeClass('fr-active');
                $current_video = null;
                _unmarkExit();
            }
        }

        editor.shared.vid_exit_flag = false;

        function _markExit() {
            editor.shared.vid_exit_flag = true;
        }

        function _unmarkExit() {
            editor.shared.vid_exit_flag = false;
        }

        function _canExit() {
            return editor.shared.vid_exit_flag;
        }

        function _initEvents() {
            editor.events.on('mousedown window.mousedown', _markExit);
            editor.events.on('window.touchmove', _unmarkExit);
            editor.events.on('mouseup window.mouseup', _exitEdit);
            editor.events.on('commands.mousedown', function ($btn) {
                if ($btn.parents('.fr-toolbar').length > 0) {
                    _exitEdit();
                }
            });
            editor.events.on('blur video.hideResizer commands.undo commands.redo element.dropped', function () {
                _exitEdit(true);
            });
        }

        function _initEditPopup() {
            var video_buttons = '';
            if (editor.opts.videoEditButtons.length >= 1) {
                video_buttons += '<div class="fr-buttons">';
                video_buttons += editor.button.buildList(editor.opts.videoEditButtons);
                video_buttons += '</div>';
            }
            var template = {buttons: video_buttons}
            var $popup = editor.popups.create('video.edit', template);
            editor.events.$on(editor.$wp, 'scroll.video-edit', function () {
                if ($current_video && editor.popups.isVisible('video.edit')) {
                    _showEditPopup();
                }
            });
            return $popup;
        }

        function _refreshSizePopup() {
            if ($current_video) {
                var $popup = editor.popups.get('video.size');
                var $video_obj = $current_video.find('iframe, embed, video')
                $popup.find('input[name="width"]').val($video_obj.get(0).style.width || $video_obj.attr('width')).trigger('change');
                $popup.find('input[name="height"]').val($video_obj.get(0).style.height || $video_obj.attr('height')).trigger('change');
            }
        }

        function showSizePopup() {
            var $popup = editor.popups.get('video.size');
            if (!$popup) $popup = _initSizePopup();
            editor.popups.refresh('video.size');
            editor.popups.setContainer('video.size', $(editor.opts.scrollableContainer));
            var $video_obj = $current_video.find('iframe, embed, video')
            var left = $video_obj.offset().left + $video_obj.width() / 2;
            var top = $video_obj.offset().top + $video_obj.height();
            editor.popups.show('video.size', left, top, $video_obj.height());
        }

        function _initSizePopup(delayed) {
            if (delayed) {
                editor.popups.onRefresh('video.size', _refreshSizePopup);
                return true;
            }
            var video_buttons = '';
            video_buttons = '<div class="fr-buttons">' + editor.button.buildList(editor.opts.videoSizeButtons) + '</div>';
            var size_layer = '';
            size_layer = '<div class="fr-video-size-layer fr-layer fr-active" id="fr-video-size-layer-' + editor.id + '"><div class="fr-video-group"><div class="fr-input-line"><input type="text" name="width" placeholder="' + editor.language.translate('Width') + '" tabIndex="1"></div><div class="fr-input-line"><input type="text" name="height" placeholder="' + editor.language.translate('Height') + '" tabIndex="1"></div></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="videoSetSize" tabIndex="2">' + editor.language.translate('Update') + '</button></div></div>';
            var template = {buttons: video_buttons, size_layer: size_layer}
            var $popup = editor.popups.create('video.size', template);
            editor.events.$on(editor.$wp, 'scroll', function () {
                if ($current_video && editor.popups.isVisible('video.size')) {
                    showSizePopup();
                }
            });
            return $popup;
        }

        function align(val) {
            $current_video.removeClass('fr-fvr fr-fvl');
            if (val == 'left') {
                $current_video.addClass('fr-fvl');
            }
            else if (val == 'right') {
                $current_video.addClass('fr-fvr');
            }
            _repositionResizer();
            _showEditPopup();
        }

        function refreshAlign($btn) {
            if (!$current_video) return false;
            if ($current_video.hasClass('fr-fvl')) {
                $btn.find('> *:first').replaceWith(editor.icon.create('align-left'));
            }
            else if ($current_video.hasClass('fr-fvr')) {
                $btn.find('> *:first').replaceWith(editor.icon.create('align-right'));
            }
            else {
                $btn.find('> *:first').replaceWith(editor.icon.create('align-justify'));
            }
        }

        function refreshAlignOnShow($btn, $dropdown) {
            var alignment = 'justify';
            if ($current_video.hasClass('fr-fvl')) {
                alignment = 'left';
            }
            else if ($current_video.hasClass('fr-fvr')) {
                alignment = 'right';
            }
            $dropdown.find('.fr-command[data-param1="' + alignment + '"]').addClass('fr-active');
        }

        function display(val) {
            $current_video.removeClass('fr-dvi fr-dvb');
            if (val == 'inline') {
                $current_video.addClass('fr-dvi');
            }
            else if (val == 'block') {
                $current_video.addClass('fr-dvb');
            }
            _repositionResizer();
            _showEditPopup();
        }

        function refreshDisplayOnShow($btn, $dropdown) {
            var d = 'block';
            if ($current_video.hasClass('fr-dvi')) {
                d = 'inline';
            }
            $dropdown.find('.fr-command[data-param1="' + d + '"]').addClass('fr-active');
        }

        function remove() {
            if ($current_video) {
                if (editor.events.trigger('video.beforeRemove', [$current_video]) !== false) {
                    var $video = $current_video;
                    editor.popups.hideAll();
                    _exitEdit(true);
                    editor.selection.setBefore($video.get(0)) || editor.selection.setAfter($video.get(0));
                    $video.remove();
                    editor.selection.restore();
                    editor.html.fillEmptyBlocks();
                    editor.events.trigger('video.removed', [$video]);
                }
            }
        }

        function _convertStyleToClasses($video) {
            if (!$video.hasClass('fr-dvi') && !$video.hasClass('fr-dvb')) {
                var flt = $video.css('float');
                $video.css('float', 'none');
                if ($video.css('display') == 'block') {
                    $video.css('float', flt);
                    if (parseInt($video.css('margin-left'), 10) === 0 && ($video.attr('style') || '').indexOf('margin-right: auto') >= 0) {
                        $video.addClass('fr-fvl');
                    }
                    else if (parseInt($video.css('margin-right'), 10) === 0 && ($video.attr('style') || '').indexOf('margin-left: auto') >= 0) {
                        $video.addClass('fr-fvr');
                    }
                    $video.addClass('fr-dvb');
                }
                else {
                    $video.css('float', flt);
                    if ($video.css('float') == 'left') {
                        $video.addClass('fr-fvl');
                    }
                    else if ($video.css('float') == 'right') {
                        $video.addClass('fr-fvr');
                    }
                    $video.addClass('fr-dvi');
                }
                $video.css('margin', '');
                $video.css('float', '');
                $video.css('display', '');
                $video.css('z-index', '');
                $video.css('position', '');
                $video.css('overflow', '');
                $video.css('vertical-align', '');
            }
            if (!editor.opts.videoTextNear) {
                $video.removeClass('fr-dvi').addClass('fr-dvb');
            }
        }

        function _refreshVideoList() {
            editor.$el.find('video').filter(function () {
                return $(this).parents('span.fr-video').length === 0;
            }).wrap('<span class="fr-video" contenteditable="false"></span>');
            editor.$el.find('embed, iframe').filter(function () {
                if (editor.browser.safari && this.getAttribute('src')) {
                    this.setAttribute('src', this.src);
                }
                if ($(this).parents('span.fr-video').length > 0) return false;
                var link = $(this).attr('src');
                for (var i = 0; i < $.FE.VIDEO_PROVIDERS.length; i++) {
                    var vp = $.FE.VIDEO_PROVIDERS[i];
                    if (vp.test_regex.test(link)) {
                        return true;
                    }
                }
                return false;
            }).map(function () {
                return $(this).parents('object').length === 0 ? this : $(this).parents('object').get(0);
            }).wrap('<span class="fr-video" contenteditable="false"></span>');
            var videos = editor.$el.find('span.fr-video');
            for (var i = 0; i < videos.length; i++) {
                _convertStyleToClasses($(videos[i]));
            }
            videos.toggleClass('fr-draggable', editor.opts.videoMove);
        }

        function _init() {
            _initEvents();
            if (editor.helpers.isMobile()) {
                editor.events.$on(editor.$el, 'touchstart', 'span.fr-video', function () {
                    touchScroll = false;
                })
                editor.events.$on(editor.$el, 'touchmove', function () {
                    touchScroll = true;
                });
            }
            editor.events.on('html.set', _refreshVideoList);
            _refreshVideoList();
            editor.events.$on(editor.$el, 'mousedown', 'span.fr-video', function (e) {
                e.stopPropagation();
            })
            editor.events.$on(editor.$el, 'click touchend', 'span.fr-video', _edit);
            editor.events.on('keydown', function (e) {
                var key_code = e.which;
                if ($current_video && (key_code == $.FE.KEYCODE.BACKSPACE || key_code == $.FE.KEYCODE.DELETE)) {
                    e.preventDefault();
                    remove();
                    return false;
                }
                if ($current_video && key_code == $.FE.KEYCODE.ESC) {
                    _exitEdit(true);
                    e.preventDefault();
                    return false;
                }
                if ($current_video && !editor.keys.ctrlKey(e)) {
                    e.preventDefault();
                    return false;
                }
            }, true);
            editor.events.on('keydown', function () {
                editor.$el.find('span.fr-video:empty').remove();
            })
            _initInsertPopup(true);
            _initSizePopup(true);
        }

        function back() {
            if ($current_video) {
                $current_video.trigger('click');
            }
            else {
                editor.events.disableBlur();
                editor.selection.restore();
                editor.events.enableBlur();
                editor.popups.hide('video.insert');
                editor.toolbar.showInline();
            }
        }

        function setSize(width, height) {
            if ($current_video) {
                var $popup = editor.popups.get('video.size');
                var $video_obj = $current_video.find('iframe, embed, video');
                $video_obj.css('width', width || $popup.find('input[name="width"]').val());
                $video_obj.css('height', height || $popup.find('input[name="height"]').val());
                if ($video_obj.get(0).style.width) $video_obj.removeAttr('width');
                if ($video_obj.get(0).style.height) $video_obj.removeAttr('height');
                $popup.find('input').blur();
                setTimeout(function () {
                    $current_video.trigger('click');
                }, editor.helpers.isAndroid() ? 50 : 0);
            }
        }

        function get() {
            return $current_video;
        }

        return {
            _init: _init,
            showInsertPopup: showInsertPopup,
            showLayer: showLayer,
            refreshByURLButton: refreshByURLButton,
            refreshEmbedButton: refreshEmbedButton,
            insertByURL: insertByURL,
            insertEmbed: insertEmbed,
            insert: insert,
            align: align,
            refreshAlign: refreshAlign,
            refreshAlignOnShow: refreshAlignOnShow,
            display: display,
            refreshDisplayOnShow: refreshDisplayOnShow,
            remove: remove,
            showSizePopup: showSizePopup,
            back: back,
            setSize: setSize,
            get: get
        }
    }
    $.FE.RegisterCommand('insertVideo', {
        title: 'Insert Video',
        undo: false,
        focus: true,
        refreshAfterCallback: false,
        popup: true,
        callback: function () {
            if (!this.popups.isVisible('video.insert')) {
                this.video.showInsertPopup();
            }
            else {
                if (this.$el.find('.fr-marker')) {
                    this.events.disableBlur();
                    this.selection.restore();
                }
                this.popups.hide('video.insert');
            }
        },
        plugin: 'video'
    })
    $.FE.DefineIcon('insertVideo', {NAME: 'video-camera'});
    $.FE.DefineIcon('videoByURL', {NAME: 'link'});
    $.FE.RegisterCommand('videoByURL', {
        title: 'By URL', undo: false, focus: false, callback: function () {
            this.video.showLayer('video-by-url');
        }, refresh: function ($btn) {
            this.video.refreshByURLButton($btn);
        }
    })
    $.FE.DefineIcon('videoEmbed', {NAME: 'code'});
    $.FE.RegisterCommand('videoEmbed', {
        title: 'Embedded Code', undo: false, focus: false, callback: function () {
            this.video.showLayer('video-embed');
        }, refresh: function ($btn) {
            this.video.refreshEmbedButton($btn);
        }
    })
    $.FE.RegisterCommand('videoInsertByURL', {
        undo: true, focus: true, callback: function () {
            this.video.insertByURL();
        }
    })
    $.FE.RegisterCommand('videoInsertEmbed', {
        undo: true, focus: true, callback: function () {
            this.video.insertEmbed();
        }
    })
    $.FE.DefineIcon('videoDisplay', {NAME: 'star'})
    $.FE.RegisterCommand('videoDisplay', {
        title: 'Display',
        type: 'dropdown',
        options: {inline: 'Inline', block: 'Break Text'},
        callback: function (cmd, val) {
            this.video.display(val);
        },
        refresh: function ($btn) {
            if (!this.opts.videoTextNear) $btn.addClass('fr-hidden');
        },
        refreshOnShow: function ($btn, $dropdown) {
            this.video.refreshDisplayOnShow($btn, $dropdown);
        }
    })
    $.FE.DefineIcon('videoAlign', {NAME: 'align-center'})
    $.FE.RegisterCommand('videoAlign', {
        type: 'dropdown',
        title: 'Align',
        options: {left: 'Align Left', justify: 'None', right: 'Align Right'},
        html: function () {
            var c = '<ul class="fr-dropdown-list">';
            var options = $.FE.COMMANDS.videoAlign.options;
            for (var val in options) {
                if (options.hasOwnProperty(val)) {
                    c += '<li><a class="fr-command fr-title" data-cmd="videoAlign" data-param1="' + val + '" title="' + this.language.translate(options[val]) + '">' + this.icon.create('align-' + val) + '</a></li>';
                }
            }
            c += '</ul>';
            return c;
        },
        callback: function (cmd, val) {
            this.video.align(val);
        },
        refresh: function ($btn) {
            this.video.refreshAlign($btn);
        },
        refreshOnShow: function ($btn, $dropdown) {
            this.video.refreshAlignOnShow($btn, $dropdown);
        }
    })
    $.FE.DefineIcon('videoRemove', {NAME: 'trash'})
    $.FE.RegisterCommand('videoRemove', {
        title: 'Remove', callback: function () {
            this.video.remove();
        }
    })
    $.FE.DefineIcon('videoSize', {NAME: 'arrows-alt'})
    $.FE.RegisterCommand('videoSize', {
        undo: false, focus: false, title: 'Change Size', callback: function () {
            this.video.showSizePopup();
        }
    });
    $.FE.DefineIcon('videoBack', {NAME: 'arrow-left'});
    $.FE.RegisterCommand('videoBack', {
        title: 'Back', undo: false, focus: false, back: true, callback: function () {
            this.video.back();
        }, refresh: function ($btn) {
            var $current_video = this.video.get();
            if (!$current_video && !this.opts.toolbarInline) {
                $btn.addClass('fr-hidden');
                $btn.next('.fr-separator').addClass('fr-hidden');
            }
            else {
                $btn.removeClass('fr-hidden');
                $btn.next('.fr-separator').removeClass('fr-hidden');
            }
        }
    });
    $.FE.RegisterCommand('videoSetSize', {
        undo: true, focus: false, callback: function () {
            this.video.setSize();
        }
    })
}));
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');
                }
                else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function ($) {
    'use strict';
    $.extend($.FE.POPUP_TEMPLATES, {
        'audio.insert': '[_BUTTONS_][_BY_URL_LAYER_][_EMBED_LAYER_]',
        'audio.edit': '[_BUTTONS_]',
        'audio.size': '[_BUTTONS_][_SIZE_LAYER_]'
    })
    $.extend($.FE.DEFAULTS, {
        audioInsertButtons: ['audioBack', '|', 'audioByURL', 'audioEmbed'],
        audioEditButtons: ['audioDisplay', 'audioAlign', 'audioSize', 'audioRemove'],
        audioResize: true,
        audioSizeButtons: ['audioBack', '|'],
        audioSplitHTML: false,
        audioTextNear: true,
        audioDefaultAlign: 'center',
        audioDefaultDisplay: 'block',
        audioMove: true
    });
    $.FE.VIDEO_PROVIDERS = [];
    $.FE.VIDEO_EMBED_REGEX = /^\W*((<iframe.*><\/iframe>)|(<embed.*>))\W*$/i;
    $.FE.PLUGINS.audio = function (editor) {
        var $overlay;
        var $handler;
        var $audio_resizer;
        var $current_audio;

        function _refreshInsertPopup() {
            var $popup = editor.popups.get('audio.insert');
            var $url_input = $popup.find('.fr-audio-by-url-layer input');
            $url_input.val('').trigger('change');
            var $embed_area = $popup.find('.fr-audio-embed-layer textarea');
            $embed_area.val('').trigger('change');
        }

        function showInsertPopup() {
            var $btn = editor.$tb.find('.fr-command[data-cmd="insertAudio"]');
            var $popup = editor.popups.get('audio.insert');
            if (!$popup) $popup = _initInsertPopup();
            if (!$popup.hasClass('fr-active')) {
                editor.popups.refresh('audio.insert');
                editor.popups.setContainer('audio.insert', editor.$tb);
                var left = $btn.offset().left + $btn.outerWidth() / 2;
                var top = $btn.offset().top + (editor.opts.toolbarBottom ? 10 : $btn.outerHeight() - 10);
                editor.popups.show('audio.insert', left, top, $btn.outerHeight());
            }
        }

        function _showEditPopup() {
            var $popup = editor.popups.get('audio.edit');
            if (!$popup) $popup = _initEditPopup();
            editor.popups.setContainer('audio.edit', $(editor.opts.scrollableContainer));
            editor.popups.refresh('audio.edit');
            var $audio_obj = $current_audio.find('iframe, embed, audio');
            var left = $audio_obj.offset().left + $audio_obj.outerWidth() / 2;
            var top = $audio_obj.offset().top + $audio_obj.outerHeight();
            editor.popups.show('audio.edit', left, top, $audio_obj.outerHeight());
        }

        function _initInsertPopup(delayed) {
            if (delayed) {
                editor.popups.onRefresh('audio.insert', _refreshInsertPopup);
                return true;
            }
            var audio_buttons = '';
            if (editor.opts.audioInsertButtons.length > 1) {
                audio_buttons = '<div class="fr-buttons">' + editor.button.buildList(editor.opts.audioInsertButtons) + '</div>';
            }
            var by_url_layer = '';
            if (editor.opts.audioInsertButtons.indexOf('audioByURL') >= 0) {
                by_url_layer = '<div class="fr-audio-by-url-layer fr-layer fr-active" id="fr-audio-by-url-layer-' + editor.id + '"><div class="fr-input-line"><input type="text" placeholder="http://" tabIndex="1"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="audioInsertByURL" tabIndex="2">' + editor.language.translate('Insert') + '</button></div></div>'
            }
            var embed_layer = '';
            if (editor.opts.audioInsertButtons.indexOf('audioEmbed') >= 0) {
                embed_layer = '<div class="fr-audio-embed-layer fr-layer" id="fr-audio-embed-layer-' + editor.id + '"><div class="fr-input-line"><textarea type="text" placeholder="' + editor.language.translate('Embedded Code') + '" tabIndex="1" rows="5"></textarea></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="audioInsertEmbed" tabIndex="2">' + editor.language.translate('Insert') + '</button></div></div>'
            }
            var template = {buttons: audio_buttons, by_url_layer: by_url_layer, embed_layer: embed_layer}
            var $popup = editor.popups.create('audio.insert', template);
            return $popup;
        }

        function showLayer(name) {
            var $popup = editor.popups.get('audio.insert');
            var left;
            var top;
            if (!$current_audio && !editor.opts.toolbarInline) {
                var $btn = editor.$tb.find('.fr-command[data-cmd="insertAudio"]');
                left = $btn.offset().left + $btn.outerWidth() / 2;
                top = $btn.offset().top + (editor.opts.toolbarBottom ? 10 : $btn.outerHeight() - 10);
            }
            if (editor.opts.toolbarInline) {
                top = $popup.offset().top - editor.helpers.getPX($popup.css('margin-top'));
                if ($popup.hasClass('fr-above')) {
                    top += $popup.outerHeight();
                }
            }
            $popup.find('.fr-layer').removeClass('fr-active');
            $popup.find('.fr-' + name + '-layer').addClass('fr-active');
            editor.popups.show('audio.insert', left, top, 0);
        }

        function refreshByURLButton($btn) {
            var $popup = editor.popups.get('audio.insert');
            if ($popup.find('.fr-audio-by-url-layer').hasClass('fr-active')) {
                $btn.addClass('fr-active');
            }
        }

        function refreshEmbedButton($btn) {
            var $popup = editor.popups.get('audio.insert');
            if ($popup.find('.fr-audio-embed-layer').hasClass('fr-active')) {
                $btn.addClass('fr-active');
            }
        }

        function insert(embedded_code) {
            editor.events.focus(true);
            editor.selection.restore();
            editor.html.insert('<span contenteditable="false" draggable="true" class="fr-jiv fr-video fr-dv' + (editor.opts.audioDefaultDisplay[0]) + (editor.opts.audioDefaultAlign != 'center' ? ' fr-fv' + editor.opts.audioDefaultAlign[0] : '') + '">' + embedded_code + '</span>', false, editor.opts.audioSplitHTML);
            editor.popups.hide('audio.insert');
            var $audio = editor.$el.find('.fr-jiv');
            $audio.removeClass('fr-jiv');
            $audio.toggleClass('fr-draggable', editor.opts.audioMove);
            editor.events.trigger('audio.inserted', [$audio]);
        }

        function insertByURL(link) {
            if (typeof link == 'undefined') {
                var $popup = editor.popups.get('audio.insert');
                link = $popup.find('.fr-audio-by-url-layer input[type="text"]').val() || '';
            }
            var audio = null;
            if (editor.helpers.isURL(link)) {
                for (var i = 0; i < $.FE.VIDEO_PROVIDERS.length; i++) {
                    var vp = $.FE.VIDEO_PROVIDERS[i];
                    if (vp.test_regex.test(link)) {
                        audio = link.replace(vp.url_regex, vp.url_text);
                        audio = vp.html.replace(/\{url\}/, audio);
                        break;
                    }
                }
            }
            if (audio) {
                insert(audio);
            }
            else {
                editor.events.trigger('audio.linkError', [link]);
            }
        }

        function insertEmbed(code) {
            if (typeof code == 'undefined') {
                var $popup = editor.popups.get('audio.insert');
                code = $popup.find('.fr-audio-embed-layer textarea').val() || '';
            }
            if (code.length === 0 || !$.FE.VIDEO_EMBED_REGEX.test(code)) {
                editor.events.trigger('audio.codeError', [code]);
            }
            else {
                insert(code);
            }
        }

        function _handlerMousedown(e) {
            if (!editor.core.sameInstance($audio_resizer)) return true;
            e.preventDefault();
            e.stopPropagation();
            var c_x = e.pageX || (e.originalEvent.touches ? e.originalEvent.touches[0].pageX : null);
            var c_y = e.pageY || (e.originalEvent.touches ? e.originalEvent.touches[0].pageY : null);
            if (!c_x || !c_y) {
                return false;
            }
            if (!editor.undo.canDo()) editor.undo.saveStep();
            $handler = $(this);
            $handler.data('start-x', c_x);
            $handler.data('start-y', c_y);
            $overlay.show();
            editor.popups.hideAll();
            _unmarkExit();
        }

        function _handlerMousemove(e) {
            if (!editor.core.sameInstance($audio_resizer)) return true;
            if ($handler) {
                e.preventDefault()
                var c_x = e.pageX || (e.originalEvent.touches ? e.originalEvent.touches[0].pageX : null);
                var c_y = e.pageY || (e.originalEvent.touches ? e.originalEvent.touches[0].pageY : null);
                if (!c_x || !c_y) {
                    return false;
                }
                var s_x = $handler.data('start-x');
                var s_y = $handler.data('start-y');
                $handler.data('start-x', c_x);
                $handler.data('start-y', c_y);
                var diff_x = c_x - s_x;
                var diff_y = c_y - s_y;
                var $audio_obj = $current_audio.find('iframe, embed, audio');
                var width = $audio_obj.width();
                var height = $audio_obj.height();
                if ($handler.hasClass('fr-hnw') || $handler.hasClass('fr-hsw')) {
                    diff_x = 0 - diff_x;
                }
                if ($handler.hasClass('fr-hnw') || $handler.hasClass('fr-hne')) {
                    diff_y = 0 - diff_y;
                }
                $audio_obj.css('width', width + diff_x);
                $audio_obj.css('height', height + diff_y);
                $audio_obj.removeAttr('width');
                $audio_obj.removeAttr('height');
                _repositionResizer();
            }
        }

        function _handlerMouseup(e) {
            if (!editor.core.sameInstance($audio_resizer)) return true;
            if ($handler && $current_audio) {
                if (e) e.stopPropagation();
                $handler = null;
                $overlay.hide();
                _repositionResizer();
                _showEditPopup();
                editor.undo.saveStep();
            }
        }

        function _getHandler(pos) {
            return '<div class="fr-handler fr-h' + pos + '"></div>';
        }

        function _initResizer() {
            var doc;
            if (!editor.shared.$audio_resizer) {
                editor.shared.$audio_resizer = $('<div class="fr-video-resizer"></div>');
                $audio_resizer = editor.shared.$audio_resizer;
                editor.events.$on($audio_resizer, 'mousedown', function (e) {
                    e.stopPropagation();
                }, true);
                if (editor.opts.audioResize) {
                    $audio_resizer.append(_getHandler('nw') + _getHandler('ne') + _getHandler('sw') + _getHandler('se'));
                    editor.shared.$audio_overlay = $('<div class="fr-video-overlay"></div>');
                    $overlay = editor.shared.$audio_overlay;
                    doc = $audio_resizer.get(0).ownerDocument;
                    $(doc).find('body').append($overlay);
                }
            } else {
                $audio_resizer = editor.shared.$audio_resizer;
                $overlay = editor.shared.$audio_overlay;
                editor.events.on('destroy', function () {
                    $audio_resizer.removeClass('fr-active').appendTo($('body'));
                }, true);
            }
            editor.events.on('shared.destroy', function () {
                $audio_resizer.html('').removeData().remove();
                $audio_resizer = null;
                if (editor.opts.audioResize) {
                    $overlay.remove();
                    $overlay = null;
                }
            }, true);
            if (!editor.helpers.isMobile()) {
                editor.events.$on($(editor.o_win), 'resize.audio', function () {
                    _exitEdit(true);
                });
            }
            if (editor.opts.audioResize) {
                doc = $audio_resizer.get(0).ownerDocument;
                editor.events.$on($audio_resizer, editor._mousedown, '.fr-handler', _handlerMousedown);
                editor.events.$on($(doc), editor._mousemove, _handlerMousemove);
                editor.events.$on($(doc.defaultView || doc.parentWindow), editor._mouseup, _handlerMouseup);
                editor.events.$on($overlay, 'mouseleave', _handlerMouseup);
            }
        }

        function _repositionResizer() {
            if (!$audio_resizer) _initResizer();
            (editor.$wp || $(editor.opts.scrollableContainer)).append($audio_resizer);
            $audio_resizer.data('instance', editor);
            var $audio_obj = $current_audio.find('iframe, embed, audio');
            $audio_resizer.css('top', (editor.opts.iframe ? $audio_obj.offset().top - 1 : $audio_obj.offset().top - editor.$wp.offset().top - 1) + editor.$wp.scrollTop()).css('left', (editor.opts.iframe ? $audio_obj.offset().left - 1 : $audio_obj.offset().left - editor.$wp.offset().left - 1) + editor.$wp.scrollLeft()).css('width', $audio_obj.outerWidth()).css('height', $audio_obj.height()).addClass('fr-active')
        }

        var touchScroll;

        function _edit(e) {
            if (e && e.type == 'touchend' && touchScroll) {
                return true;
            }
            e.preventDefault();
            e.stopPropagation();
            if (editor.edit.isDisabled()) {
                return false;
            }
            for (var i = 0; i < $.FE.INSTANCES.length; i++) {
                if ($.FE.INSTANCES[i] != editor) {
                    $.FE.INSTANCES[i].events.trigger('audio.hideResizer');
                }
            }
            editor.toolbar.disable();
            if (editor.helpers.isMobile()) {
                editor.events.disableBlur();
                editor.$el.blur();
                editor.events.enableBlur();
            }
            $current_audio = $(this);
            $(this).addClass('fr-active');
            if (editor.opts.iframe) {
                editor.size.syncIframe();
            }
            _repositionResizer();
            _showEditPopup();
            editor.selection.clear();
            editor.button.bulkRefresh();
            editor.events.trigger('image.hideResizer');
        }

        function _exitEdit(force_exit) {
            if ($current_audio && (_canExit() || force_exit === true)) {
                $audio_resizer.removeClass('fr-active');
                editor.toolbar.enable();
                $current_audio.removeClass('fr-active');
                $current_audio = null;
                _unmarkExit();
            }
        }

        editor.shared.audio_exit_flag = false;

        function _markExit() {
            editor.shared.audio_exit_flag = true;
        }

        function _unmarkExit() {
            editor.shared.audio_exit_flag = false;
        }

        function _canExit() {
            return editor.shared.audio_exit_flag;
        }

        function _initEvents() {
            editor.events.on('mousedown window.mousedown', _markExit);
            editor.events.on('window.touchmove', _unmarkExit);
            editor.events.on('mouseup window.mouseup', _exitEdit);
            editor.events.on('commands.mousedown', function ($btn) {
                if ($btn.parents('.fr-toolbar').length > 0) {
                    _exitEdit();
                }
            });
            editor.events.on('blur audio.hideResizer commands.undo commands.redo element.dropped', function () {
                _exitEdit(true);
            });
        }

        function _initEditPopup() {
            var audio_buttons = '';
            if (editor.opts.audioEditButtons.length >= 1) {
                audio_buttons += '<div class="fr-buttons">';
                audio_buttons += editor.button.buildList(editor.opts.audioEditButtons);
                audio_buttons += '</div>';
            }
            var template = {buttons: audio_buttons}
            var $popup = editor.popups.create('audio.edit', template);
            editor.events.$on(editor.$wp, 'scroll.audio-edit', function () {
                if ($current_audio && editor.popups.isVisible('audio.edit')) {
                    _showEditPopup();
                }
            });
            return $popup;
        }

        function _refreshSizePopup() {
            if ($current_audio) {
                var $popup = editor.popups.get('audio.size');
                var $audio_obj = $current_audio.find('iframe, embed, audio')
                $popup.find('input[name="width"]').val($audio_obj.get(0).style.width || $audio_obj.attr('width')).trigger('change');
                $popup.find('input[name="height"]').val($audio_obj.get(0).style.height || $audio_obj.attr('height')).trigger('change');
            }
        }

        function showSizePopup() {
            var $popup = editor.popups.get('audio.size');
            if (!$popup) $popup = _initSizePopup();
            editor.popups.refresh('audio.size');
            editor.popups.setContainer('audio.size', $(editor.opts.scrollableContainer));
            var $audio_obj = $current_audio.find('iframe, embed, audio')
            var left = $audio_obj.offset().left + $audio_obj.width() / 2;
            var top = $audio_obj.offset().top + $audio_obj.height();
            editor.popups.show('audio.size', left, top, $audio_obj.height());
        }

        function _initSizePopup(delayed) {
            if (delayed) {
                editor.popups.onRefresh('audio.size', _refreshSizePopup);
                return true;
            }
            var audio_buttons = '';
            audio_buttons = '<div class="fr-buttons">' + editor.button.buildList(editor.opts.audioSizeButtons) + '</div>';
            var size_layer = '';
            size_layer = '<div class="fr-video-size-layer fr-layer fr-active" id="fr-video-size-layer-' + editor.id + '"><div class="fr-audio-group"><div class="fr-input-line"><input type="text" name="width" placeholder="' + editor.language.translate('Width') + '" tabIndex="1"></div><div class="fr-input-line"><input type="text" name="height" placeholder="' + editor.language.translate('Height') + '" tabIndex="1"></div></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="audioSetSize" tabIndex="2">' + editor.language.translate('Update') + '</button></div></div>';
            var template = {buttons: audio_buttons, size_layer: size_layer}
            var $popup = editor.popups.create('audio.size', template);
            editor.events.$on(editor.$wp, 'scroll', function () {
                if ($current_audio && editor.popups.isVisible('audio.size')) {
                    showSizePopup();
                }
            });
            return $popup;
        }

        function align(val) {
            $current_audio.removeClass('fr-fvr fr-fvl');
            if (val == 'left') {
                $current_audio.addClass('fr-fvl');
            }
            else if (val == 'right') {
                $current_audio.addClass('fr-fvr');
            }
            _repositionResizer();
            _showEditPopup();
        }

        function refreshAlign($btn) {
            if (!$current_audio) return false;
            if ($current_audio.hasClass('fr-fvl')) {
                $btn.find('> *:first').replaceWith(editor.icon.create('align-left'));
            }
            else if ($current_audio.hasClass('fr-fvr')) {
                $btn.find('> *:first').replaceWith(editor.icon.create('align-right'));
            }
            else {
                $btn.find('> *:first').replaceWith(editor.icon.create('align-justify'));
            }
        }

        function refreshAlignOnShow($btn, $dropdown) {
            var alignment = 'justify';
            if ($current_audio.hasClass('fr-fvl')) {
                alignment = 'left';
            }
            else if ($current_audio.hasClass('fr-fvr')) {
                alignment = 'right';
            }
            $dropdown.find('.fr-command[data-param1="' + alignment + '"]').addClass('fr-active');
        }

        function display(val) {
            $current_audio.removeClass('fr-dvi fr-dvb');
            if (val == 'inline') {
                $current_audio.addClass('fr-dvi');
            }
            else if (val == 'block') {
                $current_audio.addClass('fr-dvb');
            }
            _repositionResizer();
            _showEditPopup();
        }

        function refreshDisplayOnShow($btn, $dropdown) {
            var d = 'block';
            if ($current_audio.hasClass('fr-dvi')) {
                d = 'inline';
            }
            $dropdown.find('.fr-command[data-param1="' + d + '"]').addClass('fr-active');
        }

        function remove() {
            if ($current_audio) {
                if (editor.events.trigger('audio.beforeRemove', [$current_audio]) !== false) {
                    var $audio = $current_audio;
                    editor.popups.hideAll();
                    _exitEdit(true);
                    editor.selection.setBefore($audio.get(0)) || editor.selection.setAfter($audio.get(0));
                    $audio.remove();
                    editor.selection.restore();
                    editor.html.fillEmptyBlocks();
                    editor.events.trigger('audio.removed', [$audio]);
                }
            }
        }

        function _convertStyleToClasses($audio) {
            if (!$audio.hasClass('fr-dvi') && !$audio.hasClass('fr-dvb')) {
                var flt = $audio.css('float');
                $audio.css('float', 'none');
                if ($audio.css('display') == 'block') {
                    $audio.css('float', flt);
                    if (parseInt($audio.css('margin-left'), 10) === 0 && ($audio.attr('style') || '').indexOf('margin-right: auto') >= 0) {
                        $audio.addClass('fr-fvl');
                    }
                    else if (parseInt($audio.css('margin-right'), 10) === 0 && ($audio.attr('style') || '').indexOf('margin-left: auto') >= 0) {
                        $audio.addClass('fr-fvr');
                    }
                    $audio.addClass('fr-dvb');
                }
                else {
                    $audio.css('float', flt);
                    if ($audio.css('float') == 'left') {
                        $audio.addClass('fr-fvl');
                    }
                    else if ($audio.css('float') == 'right') {
                        $audio.addClass('fr-fvr');
                    }
                    $audio.addClass('fr-dvi');
                }
                $audio.css('margin', '');
                $audio.css('float', '');
                $audio.css('display', '');
                $audio.css('z-index', '');
                $audio.css('position', '');
                $audio.css('overflow', '');
                $audio.css('vertical-align', '');
            }
            if (!editor.opts.audioTextNear) {
                $audio.removeClass('fr-dvi').addClass('fr-dvb');
            }
        }

        function _refreshAudioList() {
            editor.$el.find('audio').filter(function () {
                return $(this).parents('span.fr-video').length === 0;
            }).wrap('<span class="fr-video" contenteditable="false"></span>');
            editor.$el.find('embed, iframe').filter(function () {
                if (editor.browser.safari && this.getAttribute('src')) {
                    this.setAttribute('src', this.src);
                }
                if ($(this).parents('span.fr-video').length > 0) return false;
                var link = $(this).attr('src');
                for (var i = 0; i < $.FE.VIDEO_PROVIDERS.length; i++) {
                    var vp = $.FE.VIDEO_PROVIDERS[i];
                    if (vp.test_regex.test(link)) {
                        return true;
                    }
                }
                return false;
            }).map(function () {
                return $(this).parents('object').length === 0 ? this : $(this).parents('object').get(0);
            }).wrap('<span class="fr-video" contenteditable="false"></span>');
            var audios = editor.$el.find('span.fr-video');
            for (var i = 0; i < audios.length; i++) {
                _convertStyleToClasses($(audios[i]));
            }
            audios.toggleClass('fr-draggable', editor.opts.audioMove);
        }

        function _init() {
            _initEvents();
            if (editor.helpers.isMobile()) {
                editor.events.$on(editor.$el, 'touchstart', 'span.fr-video', function () {
                    touchScroll = false;
                })
                editor.events.$on(editor.$el, 'touchmove', function () {
                    touchScroll = true;
                });
            }
            editor.events.on('html.set', _refreshAudioList);
            _refreshAudioList();
            editor.events.$on(editor.$el, 'mousedown', 'span.fr-video', function (e) {
                e.stopPropagation();
            })
            editor.events.$on(editor.$el, 'click touchend', 'span.fr-video', _edit);
            editor.events.on('keydown', function (e) {
                var key_code = e.which;
                if ($current_audio && (key_code == $.FE.KEYCODE.BACKSPACE || key_code == $.FE.KEYCODE.DELETE)) {
                    e.preventDefault();
                    remove();
                    return false;
                }
                if ($current_audio && key_code == $.FE.KEYCODE.ESC) {
                    _exitEdit(true);
                    e.preventDefault();
                    return false;
                }
                if ($current_audio && !editor.keys.ctrlKey(e)) {
                    e.preventDefault();
                    return false;
                }
            }, true);
            editor.events.on('keydown', function () {
                editor.$el.find('span.fr-video:empty').remove();
            })
            _initInsertPopup(true);
            _initSizePopup(true);
        }

        function back() {
            if ($current_audio) {
                $current_audio.trigger('click');
            }
            else {
                editor.events.disableBlur();
                editor.selection.restore();
                editor.events.enableBlur();
                editor.popups.hide('audio.insert');
                editor.toolbar.showInline();
            }
        }

        function setSize(width, height) {
            if ($current_audio) {
                var $popup = editor.popups.get('audio.size');
                var $audio_obj = $current_audio.find('iframe, embed, audio');
                $audio_obj.css('width', width || $popup.find('input[name="width"]').val());
                $audio_obj.css('height', height || $popup.find('input[name="height"]').val());
                if ($audio_obj.get(0).style.width) $audio_obj.removeAttr('width');
                if ($audio_obj.get(0).style.height) $audio_obj.removeAttr('height');
                $popup.find('input').blur();
                setTimeout(function () {
                    $current_audio.trigger('click');
                }, editor.helpers.isAndroid() ? 50 : 0);
            }
        }

        function get() {
            return $current_audio;
        }

        return {
            _init: _init,
            showInsertPopup: showInsertPopup,
            showLayer: showLayer,
            refreshByURLButton: refreshByURLButton,
            refreshEmbedButton: refreshEmbedButton,
            insertByURL: insertByURL,
            insertEmbed: insertEmbed,
            insert: insert,
            align: align,
            refreshAlign: refreshAlign,
            refreshAlignOnShow: refreshAlignOnShow,
            display: display,
            refreshDisplayOnShow: refreshDisplayOnShow,
            remove: remove,
            showSizePopup: showSizePopup,
            back: back,
            setSize: setSize,
            get: get
        }
    }
    $.FE.RegisterCommand('insertAudio', {
        title: 'Insert Audio',
        undo: false,
        focus: true,
        refreshAfterCallback: false,
        popup: true,
        callback: function () {
            if (!this.popups.isVisible('audio.insert')) {
                this.audio.showInsertPopup();
            }
            else {
                if (this.$el.find('.fr-marker')) {
                    this.events.disableBlur();
                    this.selection.restore();
                }
                this.popups.hide('audio.insert');
            }
        },
        plugin: 'audio'
    })
    $.FE.DefineIcon('insertAudio', {NAME: 'volume-up'});
    $.FE.DefineIcon('audioByURL', {NAME: 'link'});
    $.FE.RegisterCommand('audioByURL', {
        title: 'By URL', undo: false, focus: false, callback: function () {
            this.audio.showLayer('audio-by-url');
        }, refresh: function ($btn) {
            this.audio.refreshByURLButton($btn);
        }
    })
    $.FE.DefineIcon('audioEmbed', {NAME: 'code'});
    $.FE.RegisterCommand('audioEmbed', {
        title: 'Embedded Code', undo: false, focus: false, callback: function () {
            this.audio.showLayer('audio-embed');
        }, refresh: function ($btn) {
            this.audio.refreshEmbedButton($btn);
        }
    })
    $.FE.RegisterCommand('audioInsertByURL', {
        undo: true, focus: true, callback: function () {
            this.audio.insertByURL();
        }
    })
    $.FE.RegisterCommand('audioInsertEmbed', {
        undo: true, focus: true, callback: function () {
            this.audio.insertEmbed();
        }
    })
    $.FE.DefineIcon('audioDisplay', {NAME: 'star'})
    $.FE.RegisterCommand('audioDisplay', {
        title: 'Display',
        type: 'dropdown',
        options: {inline: 'Inline', block: 'Break Text'},
        callback: function (cmd, val) {
            this.audio.display(val);
        },
        refresh: function ($btn) {
            if (!this.opts.audioTextNear) $btn.addClass('fr-hidden');
        },
        refreshOnShow: function ($btn, $dropdown) {
            this.audio.refreshDisplayOnShow($btn, $dropdown);
        }
    })
    $.FE.DefineIcon('audioAlign', {NAME: 'align-center'})
    $.FE.RegisterCommand('audioAlign', {
        type: 'dropdown',
        title: 'Align',
        options: {left: 'Align Left', justify: 'None', right: 'Align Right'},
        html: function () {
            var c = '<ul class="fr-dropdown-list">';
            var options = $.FE.COMMANDS.audioAlign.options;
            for (var val in options) {
                if (options.hasOwnProperty(val)) {
                    c += '<li><a class="fr-command fr-title" data-cmd="audioAlign" data-param1="' + val + '" title="' + this.language.translate(options[val]) + '">' + this.icon.create('align-' + val) + '</a></li>';
                }
            }
            c += '</ul>';
            return c;
        },
        callback: function (cmd, val) {
            this.audio.align(val);
        },
        refresh: function ($btn) {
            this.audio.refreshAlign($btn);
        },
        refreshOnShow: function ($btn, $dropdown) {
            this.audio.refreshAlignOnShow($btn, $dropdown);
        }
    })
    $.FE.DefineIcon('audioRemove', {NAME: 'trash'})
    $.FE.RegisterCommand('audioRemove', {
        title: 'Remove', callback: function () {
            this.audio.remove();
        }
    })
    $.FE.DefineIcon('audioSize', {NAME: 'arrows-alt'})
    $.FE.RegisterCommand('audioSize', {
        undo: false, focus: false, title: 'Change Size', callback: function () {
            this.audio.showSizePopup();
        }
    });
    $.FE.DefineIcon('audioBack', {NAME: 'arrow-left'});
    $.FE.RegisterCommand('audioBack', {
        title: 'Back', undo: false, focus: false, back: true, callback: function () {
            this.audio.back();
        }, refresh: function ($btn) {
            var $current_audio = this.audio.get();
            if (!$current_audio && !this.opts.toolbarInline) {
                $btn.addClass('fr-hidden');
                $btn.next('.fr-separator').addClass('fr-hidden');
            }
            else {
                $btn.removeClass('fr-hidden');
                $btn.next('.fr-separator').removeClass('fr-hidden');
            }
        }
    });
    $.FE.RegisterCommand('audioSetSize', {
        undo: true, focus: false, callback: function () {
            this.audio.setSize();
        }
    })
}));
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)), a(c), c
    } : a(jQuery)
}(function (a) {
    a.FE.PLUGINS.quote = function (b) {
        function c(a) {
            for (; a.parentNode && a.parentNode != b.el;) a = a.parentNode;
            return a
        }

        function d() {
            var d, e = b.selection.blocks();
            for (d = 0; d < e.length; d++) e[d] = c(e[d]);
            b.selection.save();
            var f = a("<blockquote>");
            for (f.insertBefore(e[0]), d = 0; d < e.length; d++) f.append(e[d]);
            b.html.unwrap(), b.selection.restore()
        }

        function e() {
            var c, d = b.selection.blocks();
            for (c = 0; c < d.length; c++) "BLOCKQUOTE" != d[c].tagName && (d[c] = a(d[c]).parentsUntil(b.$el, "BLOCKQUOTE").get(0));
            for (b.selection.save(), c = 0; c < d.length; c++) d[c] && a(d[c]).replaceWith(d[c].innerHTML);
            b.html.unwrap(), b.selection.restore()
        }

        function f(a) {
            b.selection.save(), b.html.wrap(!0, !0, !0, !0), b.selection.restore(), "increase" == a ? d() : "decrease" == a && e()
        }

        return {apply: f}
    }, a.FE.RegisterShortcut(a.FE.KEYCODE.SINGLE_QUOTE, "quote", "increase", "'"), a.FE.RegisterShortcut(a.FE.KEYCODE.SINGLE_QUOTE, "quote", "decrease", "'", !0), a.FE.RegisterCommand("quote", {
        title: "Quote",
        type: "dropdown",
        options: {increase: "Increase", decrease: "Decrease"},
        callback: function (a, b) {
            this.quote.apply(b)
        },
        plugin: "quote"
    }), a.FE.DefineIcon("quote", {NAME: "quote-left"})
});
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)), a(c), c
    } : a(jQuery)
}(function (a) {
    a.extend(a.FE.DEFAULTS, {
        fontSize: ["8", "9", "10", "11", "12", "14", "18", "24", "30", "36", "48", "60", "72", "96"],
        fontSizeSelection: !1,
        fontSizeDefaultSelection: "12"
    }), a.FE.PLUGINS.fontSize = function (b) {
        function c(a) {
            b.format.applyStyle("font-size", a)
        }

        function d(c, d) {
            var e = a(b.selection.element()).css("font-size");
            d.find(".fr-command.fr-active").removeClass("fr-active").attr("aria-selected", !1), d.find('.fr-command[data-param1="' + e + '"]').addClass("fr-active").attr("aria-selected", !0);
            var f = d.find(".fr-dropdown-list"), g = d.find(".fr-active").parent();
            g.length ? f.parent().scrollTop(g.offset().top - f.offset().top - (f.parent().outerHeight() / 2 - g.outerHeight() / 2)) : f.parent().scrollTop(0)
        }

        function e(c) {
            if (b.opts.fontSizeSelection) {
                var d = b.helpers.getPX(a(b.selection.element()).css("font-size"));
                c.find("> span").text(d)
            }
        }

        return {apply: c, refreshOnShow: d, refresh: e}
    }, a.FE.RegisterCommand("fontSize", {
        type: "dropdown", title: "Font Size", displaySelection: function (a) {
            return a.opts.fontSizeSelection
        }, displaySelectionWidth: 30, defaultSelection: function (a) {
            return a.opts.fontSizeDefaultSelection
        }, html: function () {
            for (var a = '<ul class="fr-dropdown-list" role="presentation">', b = this.opts.fontSize, c = 0; c < b.length; c++) {
                var d = b[c];
                a += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="fontSize" data-param1="' + d + 'px" title="' + d + '">' + d + "</a></li>"
            }
            return a += "</ul>"
        }, callback: function (a, b) {
            this.fontSize.apply(b)
        }, refresh: function (a) {
            this.fontSize.refresh(a)
        }, refreshOnShow: function (a, b) {
            this.fontSize.refreshOnShow(a, b)
        }, plugin: "fontSize"
    }), a.FE.DefineIcon("fontSize", {NAME: "text-height"})
});
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)), a(c), c
    } : a(jQuery)
}(function (a) {
    a.extend(a.FE.DEFAULTS, {
        fontFamily: {
            "Arial,Helvetica,sans-serif": "Arial",
            "Georgia,serif": "Georgia",
            "Impact,Charcoal,sans-serif": "Impact",
            "Tahoma,Geneva,sans-serif": "Tahoma",
            "Times New Roman,Times,serif": "Times New Roman",
            "Verdana,Geneva,sans-serif": "Verdana"
        }, fontFamilySelection: !1, fontFamilyDefaultSelection: "Font Family"
    }), a.FE.PLUGINS.fontFamily = function (b) {
        function c(a) {
            b.format.applyStyle("font-family", a)
        }

        function d(a, b) {
            b.find(".fr-command.fr-active").removeClass("fr-active").attr("aria-selected", !1), b.find('.fr-command[data-param1="' + g() + '"]').addClass("fr-active").attr("aria-selected", !0);
            var c = b.find(".fr-dropdown-list"), d = b.find(".fr-active").parent();
            d.length ? c.parent().scrollTop(d.offset().top - c.offset().top - (c.parent().outerHeight() / 2 - d.outerHeight() / 2)) : c.parent().scrollTop(0)
        }

        function e(b) {
            var c = b.replace(/(sans-serif|serif|monospace|cursive|fantasy)/gi, "").replace(/"|'| /g, "").split(",");
            return a.grep(c, function (a) {
                return a.length > 0
            })
        }

        function f(a, b) {
            for (var c = 0; c < a.length; c++) for (var d = 0; d < b.length; d++) if (a[c] == b[d]) return [c, d];
            return null
        }

        function g() {
            var c = a(b.selection.element()).css("font-family"), d = e(c), g = [];
            for (var h in b.opts.fontFamily) if (b.opts.fontFamily.hasOwnProperty(h)) {
                var i = e(h), j = f(d, i);
                j && g.push([h, j])
            }
            return 0 === g.length ? null : (g.sort(function (a, b) {
                var c = a[1][0] - b[1][0];
                return 0 === c ? a[1][1] - b[1][1] : c
            }), g[0][0])
        }

        function h(c) {
            if (b.opts.fontFamilySelection) {
                var d = a(b.selection.element()).css("font-family").replace(/(sans-serif|serif|monospace|cursive|fantasy)/gi, "").replace(/"|'|/g, "").split(",");
                c.find("> span").text(b.opts.fontFamily[g()] || d[0] || b.opts.fontFamilyDefaultSelection)
            }
        }

        return {apply: c, refreshOnShow: d, refresh: h}
    }, a.FE.RegisterCommand("fontFamily", {
        type: "dropdown", displaySelection: function (a) {
            return a.opts.fontFamilySelection
        }, defaultSelection: function (a) {
            return a.opts.fontFamilyDefaultSelection
        }, displaySelectionWidth: 120, html: function () {
            var a = '<ul class="fr-dropdown-list" role="presentation">', b = this.opts.fontFamily;
            for (var c in b) b.hasOwnProperty(c) && (a += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="fontFamily" data-param1="' + c + '" style="font-family: ' + c + '" title="' + b[c] + '">' + b[c] + "</a></li>");
            return a += "</ul>"
        }, title: "Font Family", callback: function (a, b) {
            this.fontFamily.apply(b)
        }, refresh: function (a) {
            this.fontFamily.refresh(a)
        }, refreshOnShow: function (a, b) {
            this.fontFamily.refreshOnShow(a, b)
        }, plugin: "fontFamily"
    }), a.FE.DefineIcon("fontFamily", {NAME: "font"})
});
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)), a(c), c
    } : a(jQuery)
}(function (a) {
    a.extend(a.FE.POPUP_TEMPLATES, {emoticons: "[_BUTTONS_][_EMOTICONS_]"}), a.extend(a.FE.DEFAULTS, {
        emoticonsStep: 8,
        emoticonsSet: [{code: "1f600", desc: "Grinning face"}, {
            code: "1f601",
            desc: "Grinning face with smiling eyes"
        }, {code: "1f602", desc: "Face with tears of joy"}, {
            code: "1f603",
            desc: "Smiling face with open mouth"
        }, {code: "1f604", desc: "Smiling face with open mouth and smiling eyes"}, {
            code: "1f605",
            desc: "Smiling face with open mouth and cold sweat"
        }, {code: "1f606", desc: "Smiling face with open mouth and tightly-closed eyes"}, {
            code: "1f607",
            desc: "Smiling face with halo"
        }, {code: "1f608", desc: "Smiling face with horns"}, {code: "1f609", desc: "Winking face"}, {
            code: "1f60a",
            desc: "Smiling face with smiling eyes"
        }, {code: "1f60b", desc: "Face savoring delicious food"}, {
            code: "1f60c",
            desc: "Relieved face"
        }, {code: "1f60d", desc: "Smiling face with heart-shaped eyes"}, {
            code: "1f60e",
            desc: "Smiling face with sunglasses"
        }, {code: "1f60f", desc: "Smirking face"}, {code: "1f610", desc: "Neutral face"}, {
            code: "1f611",
            desc: "Expressionless face"
        }, {code: "1f612", desc: "Unamused face"}, {code: "1f613", desc: "Face with cold sweat"}, {
            code: "1f614",
            desc: "Pensive face"
        }, {code: "1f615", desc: "Confused face"}, {code: "1f616", desc: "Confounded face"}, {
            code: "1f617",
            desc: "Kissing face"
        }, {code: "1f618", desc: "Face throwing a kiss"}, {
            code: "1f619",
            desc: "Kissing face with smiling eyes"
        }, {code: "1f61a", desc: "Kissing face with closed eyes"}, {
            code: "1f61b",
            desc: "Face with stuck out tongue"
        }, {code: "1f61c", desc: "Face with stuck out tongue and winking eye"}, {
            code: "1f61d",
            desc: "Face with stuck out tongue and tightly-closed eyes"
        }, {code: "1f61e", desc: "Disappointed face"}, {code: "1f61f", desc: "Worried face"}, {
            code: "1f620",
            desc: "Angry face"
        }, {code: "1f621", desc: "Pouting face"}, {code: "1f622", desc: "Crying face"}, {
            code: "1f623",
            desc: "Persevering face"
        }, {code: "1f624", desc: "Face with look of triumph"}, {
            code: "1f625",
            desc: "Disappointed but relieved face"
        }, {code: "1f626", desc: "Frowning face with open mouth"}, {
            code: "1f627",
            desc: "Anguished face"
        }, {code: "1f628", desc: "Fearful face"}, {code: "1f629", desc: "Weary face"}, {
            code: "1f62a",
            desc: "Sleepy face"
        }, {code: "1f62b", desc: "Tired face"}, {code: "1f62c", desc: "Grimacing face"}, {
            code: "1f62d",
            desc: "Loudly crying face"
        }, {code: "1f62e", desc: "Face with open mouth"}, {code: "1f62f", desc: "Hushed face"}, {
            code: "1f630",
            desc: "Face with open mouth and cold sweat"
        }, {code: "1f631", desc: "Face screaming in fear"}, {code: "1f632", desc: "Astonished face"}, {
            code: "1f633",
            desc: "Flushed face"
        }, {code: "1f634", desc: "Sleeping face"}, {code: "1f635", desc: "Dizzy face"}, {
            code: "1f636",
            desc: "Face without mouth"
        }, {code: "1f637", desc: "Face with medical mask"}],
        emoticonsButtons: ["emoticonsBack", "|"],
        emoticonsUseImage: !0
    }), a.FE.PLUGINS.emoticons = function (b) {
        function c() {
            var a = b.$tb.find('.fr-command[data-cmd="emoticons"]'), c = b.popups.get("emoticons");
            if (c || (c = e()), !c.hasClass("fr-active")) {
                b.popups.refresh("emoticons"), b.popups.setContainer("emoticons", b.$tb);
                var d = a.offset().left + a.outerWidth() / 2,
                    f = a.offset().top + (b.opts.toolbarBottom ? 10 : a.outerHeight() - 10);
                b.popups.show("emoticons", d, f, a.outerHeight())
            }
        }

        function d() {
            b.popups.hide("emoticons")
        }

        function e() {
            var a = "";
            b.opts.toolbarInline && b.opts.emoticonsButtons.length > 0 && (a = '<div class="fr-buttons fr-emoticons-buttons">' + b.button.buildList(b.opts.emoticonsButtons) + "</div>");
            var c = {buttons: a, emoticons: f()}, d = b.popups.create("emoticons", c);
            return b.tooltip.bind(d, ".fr-emoticon"), g(d), d
        }

        function f() {
            for (var a = '<div style="text-align: center">', c = 0; c < b.opts.emoticonsSet.length; c++) 0 !== c && c % b.opts.emoticonsStep === 0 && (a += "<br>"), a += '<span class="fr-command fr-emoticon" tabIndex="-1" data-cmd="insertEmoticon" title="' + b.language.translate(b.opts.emoticonsSet[c].desc) + '" role="button" data-param1="' + b.opts.emoticonsSet[c].code + '">' + (b.opts.emoticonsUseImage ? '<img src="https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/' + b.opts.emoticonsSet[c].code + '.svg"/>' : "&#x" + b.opts.emoticonsSet[c].code + ";") + '<span class="fr-sr-only">' + b.language.translate(b.opts.emoticonsSet[c].desc) + "&nbsp;&nbsp;&nbsp;</span></span>";
            return b.opts.emoticonsUseImage && (a += '<p style="font-size: 12px; text-align: center; padding: 0 5px;">Emoji free by <a class="fr-link" tabIndex="-1" href="http://emojione.com/" target="_blank" rel="nofollow" role="link" aria-label="Open Emoji One website.">Emoji One</a></p>'), a += "</div>"
        }

        function g(c) {
            b.events.on("popup.tab", function (d) {
                var e = a(d.currentTarget);
                if (!b.popups.isVisible("emoticons") || !e.is("span, a")) return !0;
                var f, g, h, i = d.which;
                if (a.FE.KEYCODE.TAB == i) {
                    if (e.is("span.fr-emoticon") && d.shiftKey || e.is("a") && !d.shiftKey) {
                        var j = c.find(".fr-buttons");
                        f = !b.accessibility.focusToolbar(j, !!d.shiftKey)
                    }
                    if (f !== !1) {
                        var k = c.find("span.fr-emoticon:focus:first, span.fr-emoticon:visible:first, a");
                        e.is("span.fr-emoticon") && (k = k.not("span.fr-emoticon:not(:focus)")), g = k.index(e), g = d.shiftKey ? ((g - 1) % k.length + k.length) % k.length : (g + 1) % k.length, h = k.get(g), b.events.disableBlur(), h.focus(), f = !1
                    }
                } else if (a.FE.KEYCODE.ARROW_UP == i || a.FE.KEYCODE.ARROW_DOWN == i || a.FE.KEYCODE.ARROW_LEFT == i || a.FE.KEYCODE.ARROW_RIGHT == i) {
                    if (e.is("span.fr-emoticon")) {
                        var l = e.parent().find("span.fr-emoticon");
                        g = l.index(e);
                        var m = b.opts.emoticonsStep, n = Math.floor(l.length / m), o = g % m, p = Math.floor(g / m),
                            q = p * m + o, r = n * m;
                        a.FE.KEYCODE.ARROW_UP == i ? q = ((q - m) % r + r) % r : a.FE.KEYCODE.ARROW_DOWN == i ? q = (q + m) % r : a.FE.KEYCODE.ARROW_LEFT == i ? q = ((q - 1) % r + r) % r : a.FE.KEYCODE.ARROW_RIGHT == i && (q = (q + 1) % r), h = a(l.get(q)), b.events.disableBlur(), h.focus(), f = !1
                    }
                } else a.FE.KEYCODE.ENTER == i && (e.is("a") ? e[0].click() : b.button.exec(e), f = !1);
                return f === !1 && (d.preventDefault(), d.stopPropagation()), f
            }, !0)
        }

        function h(c, d) {
            b.html.insert('<span class="fr-emoticon fr-deletable' + (d ? " fr-emoticon-img" : "") + '"' + (d ? ' style="background: url(' + d + ');"' : "") + ">" + (d ? "&nbsp;" : c) + "</span>&nbsp;" + a.FE.MARKERS, !0)
        }

        function i() {
            b.popups.hide("emoticons"), b.toolbar.showInline()
        }

        function j() {
            var c = function () {
                for (var a = b.el.querySelectorAll(".fr-emoticon:not(.fr-deletable)"), c = 0; c < a.length; c++) a[c].className += " fr-deletable"
            };
            c(), b.events.on("html.set", c);
            var d = function () {
                if (!b.selection.isCollapsed()) return !1;
                var a = b.selection.element(), c = b.selection.endElement();
                if (a && b.node.hasClass(a, "fr-emoticon")) return a;
                if (c && b.node.hasClass(c, "fr-emoticon")) return c;
                var d = b.selection.ranges(0), e = d.startContainer;
                if (e.nodeType == Node.ELEMENT_NODE && e.childNodes.length > 0 && d.startOffset > 0) {
                    var f = e.childNodes[d.startOffset - 1];
                    if (b.node.hasClass(f, "fr-emoticon")) return f
                }
                return !1
            };
            b.events.on("keydown", function (c) {
                if (b.keys.isCharacter(c.which) && b.selection.inEditor()) {
                    var e = b.selection.ranges(0), f = d();
                    f && (0 === e.startOffset && b.selection.element() === f ? a(f).before(a.FE.MARKERS + a.FE.INVISIBLE_SPACE) : a(f).after(a.FE.INVISIBLE_SPACE + a.FE.MARKERS), b.selection.restore())
                }
            }), b.events.on("keyup", function (c) {
                for (var e = b.el.querySelectorAll(".fr-emoticon"), f = 0; f < e.length; f++) "undefined" != typeof e[f].textContent && 0 === e[f].textContent.replace(/\u200B/gi, "").length && a(e[f]).remove();
                if (!(c.which >= a.FE.KEYCODE.ARROW_LEFT && c.which <= a.FE.KEYCODE.ARROW_DOWN)) {
                    var g = d();
                    b.node.hasClass(g, "fr-emoticon-img") && (a(g).append(a.FE.MARKERS), b.selection.restore())
                }
            })
        }

        return {_init: j, insert: h, showEmoticonsPopup: c, hideEmoticonsPopup: d, back: i}
    }, a.FE.DefineIcon("emoticons", {NAME: "smile-o"}), a.FE.RegisterCommand("emoticons", {
        title: "Emoticons",
        undo: !1,
        focus: !0,
        refreshOnCallback: !1,
        popup: !0,
        callback: function () {
            this.popups.isVisible("emoticons") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("emoticons")) : this.emoticons.showEmoticonsPopup()
        },
        plugin: "emoticons"
    }), a.FE.RegisterCommand("insertEmoticon", {
        callback: function (a, b) {
            this.emoticons.insert("&#x" + b + ";", this.opts.emoticonsUseImage ? "https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/" + b + ".svg" : null), this.emoticons.hideEmoticonsPopup()
        }
    }), a.FE.DefineIcon("emoticonsBack", {NAME: "arrow-left"}), a.FE.RegisterCommand("emoticonsBack", {
        title: "Back",
        undo: !1,
        focus: !1,
        back: !0,
        refreshAfterCallback: !1,
        callback: function () {
            this.emoticons.back()
        }
    })
});
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)), a(c), c
    } : a(jQuery)
}(function (a) {
    a.extend(a.FE.POPUP_TEMPLATES, {"colors.picker": "[_BUTTONS_][_TEXT_COLORS_][_BACKGROUND_COLORS_]"}), a.extend(a.FE.DEFAULTS, {
        colorsText: ["#61BD6D", "#1ABC9C", "#54ACD2", "#2C82C9", "#9365B8", "#475577", "#CCCCCC", "#41A85F", "#00A885", "#3D8EB9", "#2969B0", "#553982", "#28324E", "#000000", "#F7DA64", "#FBA026", "#EB6B56", "#E25041", "#A38F84", "#EFEFEF", "#FFFFFF", "#FAC51C", "#F37934", "#D14841", "#B8312F", "#7C706B", "#D1D5D8", "REMOVE"],
        colorsBackground: ["#61BD6D", "#1ABC9C", "#54ACD2", "#2C82C9", "#9365B8", "#475577", "#CCCCCC", "#41A85F", "#00A885", "#3D8EB9", "#2969B0", "#553982", "#28324E", "#000000", "#F7DA64", "#FBA026", "#EB6B56", "#E25041", "#A38F84", "#EFEFEF", "#FFFFFF", "#FAC51C", "#F37934", "#D14841", "#B8312F", "#7C706B", "#D1D5D8", "REMOVE"],
        colorsStep: 7,
        colorsDefaultTab: "text",
        colorsButtons: ["colorsBack", "|", "-"]
    }), a.FE.PLUGINS.colors = function (b) {
        function c() {
            var a = b.$tb.find('.fr-command[data-cmd="color"]'), c = b.popups.get("colors.picker");
            if (c || (c = e()), !c.hasClass("fr-active")) if (b.popups.setContainer("colors.picker", b.$tb), i(c.find(".fr-selected-tab").attr("data-param1")), a.is(":visible")) {
                var d = a.offset().left + a.outerWidth() / 2,
                    f = a.offset().top + (b.opts.toolbarBottom ? 10 : a.outerHeight() - 10);
                b.popups.show("colors.picker", d, f, a.outerHeight())
            } else b.position.forSelection(c), b.popups.show("colors.picker")
        }

        function d() {
            b.popups.hide("colors.picker")
        }

        function e() {
            var a = '<div class="fr-buttons fr-colors-buttons">';
            b.opts.toolbarInline && b.opts.colorsButtons.length > 0 && (a += b.button.buildList(b.opts.colorsButtons)), a += f() + "</div>";
            var c = {buttons: a, text_colors: g("text"), background_colors: g("background")},
                d = b.popups.create("colors.picker", c);
            return h(d), d
        }

        function f() {
            var a = '<div class="fr-colors-tabs fr-group">';
            return a += '<span class="fr-colors-tab ' + ("background" == b.opts.colorsDefaultTab ? "" : "fr-selected-tab ") + 'fr-command" tabIndex="-1" role="button" aria-pressed="' + ("background" != b.opts.colorsDefaultTab) + '" data-param1="text" data-cmd="colorChangeSet" title="' + b.language.translate("Text") + '">' + b.language.translate("Text") + "</span>", a += '<span class="fr-colors-tab ' + ("background" == b.opts.colorsDefaultTab ? "fr-selected-tab " : "") + 'fr-command" tabIndex="-1" role="button" aria-pressed="' + ("background" == b.opts.colorsDefaultTab) + '" data-param1="background" data-cmd="colorChangeSet" title="' + b.language.translate("Background") + '">' + b.language.translate("Background") + "</span>", a + "</div>"
        }

        function g(a) {
            for (var c = "text" == a ? b.opts.colorsText : b.opts.colorsBackground, d = '<div class="fr-color-set fr-' + a + "-color" + (b.opts.colorsDefaultTab == a || "text" != b.opts.colorsDefaultTab && "background" != b.opts.colorsDefaultTab && "text" == a ? " fr-selected-set" : "") + '">', e = 0; e < c.length; e++) 0 !== e && e % b.opts.colorsStep === 0 && (d += "<br>"), d += "REMOVE" != c[e] ? '<span class="fr-command fr-select-color" style="background: ' + c[e] + ';" tabIndex="-1" aria-selected="false" role="button" data-cmd="' + a + 'Color" data-param1="' + c[e] + '"><span class="fr-sr-only">' + b.language.translate("Color") + " " + c[e] + "&nbsp;&nbsp;&nbsp;</span></span>" : '<span class="fr-command fr-select-color" data-cmd="' + a + 'Color" tabIndex="-1" role="button" data-param1="REMOVE" title="' + b.language.translate("Clear Formatting") + '">' + b.icon.create("remove") + '<span class="fr-sr-only">' + b.language.translate("Clear Formatting") + "</span></span>";
            return d + "</div>"
        }

        function h(c) {
            b.events.on("popup.tab", function (d) {
                var e = a(d.currentTarget);
                if (!b.popups.isVisible("colors.picker") || !e.is("span")) return !0;
                var f = d.which, g = !0;
                if (a.FE.KEYCODE.TAB == f) {
                    var h = c.find(".fr-buttons");
                    g = !b.accessibility.focusToolbar(h, !!d.shiftKey)
                } else if (a.FE.KEYCODE.ARROW_UP == f || a.FE.KEYCODE.ARROW_DOWN == f || a.FE.KEYCODE.ARROW_LEFT == f || a.FE.KEYCODE.ARROW_RIGHT == f) {
                    if (e.is("span.fr-select-color")) {
                        var i = e.parent().find("span.fr-select-color"), j = i.index(e), k = b.opts.colorsStep,
                            l = Math.floor(i.length / k), m = j % k, n = Math.floor(j / k), o = n * k + m, p = l * k;
                        a.FE.KEYCODE.ARROW_UP == f ? o = ((o - k) % p + p) % p : a.FE.KEYCODE.ARROW_DOWN == f ? o = (o + k) % p : a.FE.KEYCODE.ARROW_LEFT == f ? o = ((o - 1) % p + p) % p : a.FE.KEYCODE.ARROW_RIGHT == f && (o = (o + 1) % p);
                        var q = a(i.get(o));
                        b.events.disableBlur(), q.focus(), g = !1
                    }
                } else a.FE.KEYCODE.ENTER == f && (b.button.exec(e), g = !1);
                return g === !1 && (d.preventDefault(), d.stopPropagation()), g
            }, !0)
        }

        function i(c) {
            var d, e = b.popups.get("colors.picker"), f = a(b.selection.element());
            d = "background" == c ? "background-color" : "color";
            var g = e.find(".fr-" + c + "-color .fr-select-color");
            for (g.find(".fr-selected-color").remove(), g.removeClass("fr-active-item"), g.not('[data-param1="REMOVE"]').attr("aria-selected", !1); f.get(0) != b.el;) {
                if ("transparent" != f.css(d) && "rgba(0, 0, 0, 0)" != f.css(d)) {
                    var h = e.find(".fr-" + c + '-color .fr-select-color[data-param1="' + b.helpers.RGBToHex(f.css(d)) + '"]');
                    h.append('<span class="fr-selected-color" aria-hidden="true">\uf00c</span>'), h.addClass("fr-active-item").attr("aria-selected", !0);
                    break
                }
                f = f.parent()
            }
        }

        function j(a, c) {
            a.hasClass("fr-selected-tab") || (a.siblings().removeClass("fr-selected-tab").attr("aria-pressed", !1), a.addClass("fr-selected-tab").attr("aria-pressed", !0), a.parents(".fr-popup").find(".fr-color-set").removeClass("fr-selected-set"), a.parents(".fr-popup").find(".fr-color-set.fr-" + c + "-color").addClass("fr-selected-set"), i(c)), b.accessibility.focusPopup(a.parents(".fr-popup"))
        }

        function k(a) {
            "REMOVE" != a ? b.format.applyStyle("background-color", b.helpers.HEXtoRGB(a)) : b.format.removeStyle("background-color"), d()
        }

        function l(a) {
            "REMOVE" != a ? b.format.applyStyle("color", b.helpers.HEXtoRGB(a)) : b.format.removeStyle("color"), d()
        }

        function m() {
            b.popups.hide("colors.picker"), b.toolbar.showInline()
        }

        return {showColorsPopup: c, hideColorsPopup: d, changeSet: j, background: k, text: l, back: m}
    }, a.FE.DefineIcon("colors", {NAME: "tint"}), a.FE.RegisterCommand("color", {
        title: "Colors",
        undo: !1,
        focus: !0,
        refreshOnCallback: !1,
        popup: !0,
        callback: function () {
            this.popups.isVisible("colors.picker") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("colors.picker")) : this.colors.showColorsPopup()
        },
        plugin: "colors"
    }), a.FE.RegisterCommand("textColor", {
        undo: !0, callback: function (a, b) {
            this.colors.text(b)
        }
    }), a.FE.RegisterCommand("backgroundColor", {
        undo: !0, callback: function (a, b) {
            this.colors.background(b)
        }
    }), a.FE.RegisterCommand("colorChangeSet", {
        undo: !1, focus: !1, callback: function (a, b) {
            var c = this.popups.get("colors.picker").find('.fr-command[data-cmd="' + a + '"][data-param1="' + b + '"]');
            this.colors.changeSet(c, b)
        }
    }), a.FE.DefineIcon("colorsBack", {NAME: "arrow-left"}), a.FE.RegisterCommand("colorsBack", {
        title: "Back",
        undo: !1,
        focus: !1,
        back: !0,
        refreshAfterCallback: !1,
        callback: function () {
            this.colors.back()
        }
    }), a.FE.DefineIcon("remove", {NAME: "eraser"})
});
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)), a(c), c
    } : a(jQuery)
}(function (a) {
    a.extend(a.FE.DEFAULTS, {}), a.FE.URLRegEx = /(\s|^|>)((http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+(\.[a-zA-Z]{2,3})?(:\d*)?(\/[^\s<]*)?)(\s|$|<)/gi, a.FE.PLUGINS.url = function (b) {
        function c(a) {
            for (; a.parentNode;) if (a = a.parentNode, ["A", "BUTTON", "TEXTAREA"].indexOf(a.tagName) >= 0) return !0;
            return !1
        }

        function d() {
            for (var d = b.doc.createTreeWalker(b.el, NodeFilter.SHOW_TEXT, b.node.filter(function (b) {
                return a.FE.URLRegEx.test(b.textContent.replace(/&nbsp;/gi, "")) && !c(b)
            }), !1); d.nextNode();) {
                var e = d.currentNode, f = null;
                b.opts.linkAlwaysNoFollow && (f = "nofollow"), b.opts.linkAlwaysBlank && (f ? f += " noopener noreferrer" : f = "noopener noreferrer"), a(e).before(e.textContent.replace(a.FE.URLRegEx, "$1<a" + (b.opts.linkAlwaysBlank ? ' target="_blank"' : "") + (f ? ' rel="' + f + '"' : "") + ' href="$2">$2</a>$7')), e.parentNode.removeChild(e)
            }
        }

        function e() {
            b.events.on("paste.afterCleanup", function (c) {
                if (a.FE.URLRegEx.test(c)) return c.replace(a.FE.URLRegEx, "$1<a" + (b.opts.linkAlwaysBlank ? ' target="_blank"' : "") + (b.opts.linkAlwaysNoFollow ? ' rel="nofollow"' : "") + ' href="$2">$2</a>$7')
            }), b.events.on("keyup", function (c) {
                var e = c.which;
                e != a.FE.KEYCODE.ENTER && e != a.FE.KEYCODE.SPACE || d(b.node.contents(b.el))
            }), b.events.on("keydown", function (c) {
                var d = c.which;
                if (d == a.FE.KEYCODE.ENTER) {
                    var e = b.selection.element();
                    if (("A" == e.tagName || a(e).parents("a").length) && b.selection.info(e).atEnd) return c.stopImmediatePropagation(), "A" !== e.tagName && (e = a(e).parents("a")[0]), a(e).after("&nbsp;" + a.FE.MARKERS), b.selection.restore(), !1
                }
            })
        }

        return {_init: e}
    }
});
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)), a(c), c
    } : a(jQuery)
}(function (a) {
    a.extend(a.FE.DEFAULTS, {
        lineBreakerTags: ["table", "hr", "form", "dl", "span.fr-video"],
        lineBreakerOffset: 15,
        lineBreakerHorizontalOffset: 10
    }), a.FE.PLUGINS.lineBreaker = function (b) {
        function c(a, c) {
            var d, e, f, g, h, i, j, k;
            if (null == a) g = c.parent(), h = g.offset().top, j = c.offset().top, d = j - Math.min((j - h) / 2, b.opts.lineBreakerOffset), f = g.outerWidth(), e = g.offset().left; else if (null == c) g = a.parent(), i = g.offset().top + g.outerHeight(), k = a.offset().top + a.outerHeight(), d = k + Math.min((i - k) / 2, b.opts.lineBreakerOffset), f = g.outerWidth(), e = g.offset().left; else {
                g = a.parent();
                var l = a.offset().top + a.height(), m = c.offset().top;
                if (l > m) return !1;
                d = (l + m) / 2, f = g.outerWidth(), e = g.offset().left
            }
            b.opts.iframe && (e += b.$iframe.offset().left - b.helpers.scrollLeft(), d += b.$iframe.offset().top - b.helpers.scrollTop()), b.$box.append(q), q.css("top", d - b.win.pageYOffset), q.css("left", e - b.win.pageXOffset), q.css("width", f), q.data("tag1", a), q.data("tag2", c), q.addClass("fr-visible").data("instance", b)
        }

        function d(a, d) {
            var f, g, h = a.offset().top, i = a.offset().top + a.outerHeight();
            if (Math.abs(i - d) <= b.opts.lineBreakerOffset || Math.abs(d - h) <= b.opts.lineBreakerOffset) if (Math.abs(i - d) < Math.abs(d - h)) {
                g = a.get(0);
                for (var j = g.nextSibling; j && j.nodeType == Node.TEXT_NODE && 0 === j.textContent.length;) j = j.nextSibling;
                if (!j) return c(a, null), !0;
                if (f = e(j)) return c(a, f), !0
            } else {
                if (g = a.get(0), !g.previousSibling) return c(null, a), !0;
                if (f = e(g.previousSibling)) return c(f, a), !0
            }
            q.removeClass("fr-visible").removeData("instance")
        }

        function e(c) {
            if (c) {
                var d = a(c);
                if (0 === b.$el.find(d).length) return null;
                if (c.nodeType != Node.TEXT_NODE && d.is(b.opts.lineBreakerTags.join(","))) return d;
                if (d.parents(b.opts.lineBreakerTags.join(",")).length > 0) return c = d.parents(b.opts.lineBreakerTags.join(",")).get(0), a(c)
            }
            return null
        }

        function f(c, d) {
            var e = b.doc.elementFromPoint(c, d);
            return e && !a(e).closest(".fr-line-breaker").length && !b.node.isElement(e) && e != b.$wp.get(0) && a(e).closest(b.$wp).length ? e : null
        }

        function g(a, c, d) {
            for (var e = d, g = null; e <= b.opts.lineBreakerOffset && !g;) g = f(a, c - e), g || (g = f(a, c + e)), e += d;
            return g
        }

        function h(a, c, d) {
            for (var e = null; !e && a > b.$box.offset().left && a < b.$box.offset().left + b.$box.outerWidth();) e = f(a, c), e || (e = g(a, c, 5)), "left" == d ? a -= b.opts.lineBreakerHorizontalOffset : a += b.opts.lineBreakerHorizontalOffset;
            return e
        }

        function i(a) {
            s = null;
            var c = null, f = null,
                i = b.doc.elementFromPoint(a.pageX - b.win.pageXOffset, a.pageY - b.win.pageYOffset);
            i && ("HTML" == i.tagName || "BODY" == i.tagName || b.node.isElement(i) || i.classList.contains(".fr-line-breaker")) ? (f = g(a.pageX - b.win.pageXOffset, a.pageY - b.win.pageYOffset, 1), f || (f = h(a.pageX - b.win.pageXOffset - b.opts.lineBreakerHorizontalOffset, a.pageY - b.win.pageYOffset, "left")), f || (f = h(a.pageX - b.win.pageXOffset + b.opts.lineBreakerHorizontalOffset, a.pageY - b.win.pageYOffset, "right")), c = e(f)) : c = e(i), c ? d(c, a.pageY) : b.core.sameInstance(q) && q.removeClass("fr-visible").removeData("instance")
        }

        function j(a) {
            return !(q.hasClass("fr-visible") && !b.core.sameInstance(q)) && (b.popups.areVisible() || b.el.querySelector(".fr-selected-cell") ? (q.removeClass("fr-visible"), !0) : void(r === !1 && (s && clearTimeout(s), s = setTimeout(i, 30, a))))
        }

        function k() {
            s && clearTimeout(s), q.hasClass("fr-visible") && q.removeClass("fr-visible").removeData("instance")
        }

        function l() {
            r = !0, k()
        }

        function m() {
            r = !1
        }

        function n(c) {
            if (!b.core.sameInstance(q)) return !0;
            c.preventDefault(), q.removeClass("fr-visible").removeData("instance");
            var d = q.data("tag1"), e = q.data("tag2"), f = b.html.defaultTag();
            null == d ? f && "TD" != e.parent().get(0).tagName ? e.before("<" + f + ">" + a.FE.MARKERS + "<br></" + f + ">") : e.before(a.FE.MARKERS + "<br>") : f && "TD" != d.parent().get(0).tagName && 0 === d.parents(f).length ? d.after("<" + f + ">" + a.FE.MARKERS + "<br></" + f + ">") : d.after(a.FE.MARKERS + "<br>"), b.selection.restore()
        }

        function o() {
            b.shared.$line_breaker || (b.shared.$line_breaker = a('<div class="fr-line-breaker"><a class="fr-floating-btn" role="button" tabIndex="-1" title="' + b.language.translate("Break") + '"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect x="21" y="11" width="2" height="8"/><rect x="14" y="17" width="7" height="2"/><path d="M14.000,14.000 L14.000,22.013 L9.000,18.031 L14.000,14.000 Z"/></svg></a></div>')), q = b.shared.$line_breaker, b.events.on("shared.destroy", function () {
                q.html("").removeData().remove(), q = null
            }, !0), b.events.on("destroy", function () {
                q.removeData("instance").removeClass("fr-visible").appendTo("body"), clearTimeout(s)
            }, !0), b.events.$on(q, "mousemove", function (a) {
                a.stopPropagation()
            }, !0), b.events.$on(q, "mousedown", "a", function (a) {
                a.stopPropagation()
            }, !0), b.events.$on(q, "click", "a", n, !0)
        }

        function p() {
            return !!b.$wp && (o(), r = !1, b.events.$on(b.$win, "mousemove", j), b.events.$on(a(b.win), "scroll", k), b.events.on("popups.show.table.edit", k), b.events.on("commands.after", k), b.events.$on(a(b.win), "mousedown", l), void b.events.$on(a(b.win), "mouseup", m))
        }

        var q, r, s;
        return {_init: p}
    }
});
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)), a(c), c
    } : a(jQuery)
}(function (a) {
    a.extend(a.FE.DEFAULTS, {entities: "&quot;&#39;&iexcl;&cent;&pound;&curren;&yen;&brvbar;&sect;&uml;&copy;&ordf;&laquo;&not;&shy;&reg;&macr;&deg;&plusmn;&sup2;&sup3;&acute;&micro;&para;&middot;&cedil;&sup1;&ordm;&raquo;&frac14;&frac12;&frac34;&iquest;&Agrave;&Aacute;&Acirc;&Atilde;&Auml;&Aring;&AElig;&Ccedil;&Egrave;&Eacute;&Ecirc;&Euml;&Igrave;&Iacute;&Icirc;&Iuml;&ETH;&Ntilde;&Ograve;&Oacute;&Ocirc;&Otilde;&Ouml;&times;&Oslash;&Ugrave;&Uacute;&Ucirc;&Uuml;&Yacute;&THORN;&szlig;&agrave;&aacute;&acirc;&atilde;&auml;&aring;&aelig;&ccedil;&egrave;&eacute;&ecirc;&euml;&igrave;&iacute;&icirc;&iuml;&eth;&ntilde;&ograve;&oacute;&ocirc;&otilde;&ouml;&divide;&oslash;&ugrave;&uacute;&ucirc;&uuml;&yacute;&thorn;&yuml;&OElig;&oelig;&Scaron;&scaron;&Yuml;&fnof;&circ;&tilde;&Alpha;&Beta;&Gamma;&Delta;&Epsilon;&Zeta;&Eta;&Theta;&Iota;&Kappa;&Lambda;&Mu;&Nu;&Xi;&Omicron;&Pi;&Rho;&Sigma;&Tau;&Upsilon;&Phi;&Chi;&Psi;&Omega;&alpha;&beta;&gamma;&delta;&epsilon;&zeta;&eta;&theta;&iota;&kappa;&lambda;&mu;&nu;&xi;&omicron;&pi;&rho;&sigmaf;&sigma;&tau;&upsilon;&phi;&chi;&psi;&omega;&thetasym;&upsih;&piv;&ensp;&emsp;&thinsp;&zwnj;&zwj;&lrm;&rlm;&ndash;&mdash;&lsquo;&rsquo;&sbquo;&ldquo;&rdquo;&bdquo;&dagger;&Dagger;&bull;&hellip;&permil;&prime;&Prime;&lsaquo;&rsaquo;&oline;&frasl;&euro;&image;&weierp;&real;&trade;&alefsym;&larr;&uarr;&rarr;&darr;&harr;&crarr;&lArr;&uArr;&rArr;&dArr;&hArr;&forall;&part;&exist;&empty;&nabla;&isin;&notin;&ni;&prod;&sum;&minus;&lowast;&radic;&prop;&infin;&ang;&and;&or;&cap;&cup;&int;&there4;&sim;&cong;&asymp;&ne;&equiv;&le;&ge;&sub;&sup;&nsub;&sube;&supe;&oplus;&otimes;&perp;&sdot;&lceil;&rceil;&lfloor;&rfloor;&lang;&rang;&loz;&spades;&clubs;&hearts;&diams;"}), a.FE.PLUGINS.entities = function (b) {
        function c(a) {
            var b = a.textContent;
            if (b.match(g)) {
                for (var c = "", d = 0; d < b.length; d++) c += h[b[d]] ? h[b[d]] : b[d];
                a.textContent = c
            }
        }

        function d(a) {
            if (a && ["STYLE", "SCRIPT", "svg"].indexOf(a.tagName) >= 0) return !0;
            for (var e = b.node.contents(a), f = 0; f < e.length; f++) e[f].nodeType == Node.TEXT_NODE ? c(e[f]) : d(e[f]);
            a.nodeType == Node.TEXT_NODE && c(a)
        }

        function e(a) {
            if (0 === a.length) return "";
            var c = b.clean.exec(a, d).replace(/\&amp;/g, "&");
            return c
        }

        function f() {
            b.opts.htmlSimpleAmpersand || (b.opts.entities = b.opts.entities + "&amp;");
            var c = a("<div>").html(b.opts.entities).text(), d = b.opts.entities.split(";");
            h = {}, g = "";
            for (var f = 0; f < c.length; f++) {
                var i = c.charAt(f);
                h[i] = d[f] + ";", g += "\\" + i + (f < c.length - 1 ? "|" : "")
            }
            g = new RegExp("(" + g + ")", "g"), b.events.on("html.get", e, !0)
        }

        var g, h;
        return {_init: f}
    }
});
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)), a(c), c
    } : a(jQuery)
}(function (a) {
    a.extend(a.FE.DEFAULTS, {dragInline: !0}), a.FE.PLUGINS.draggable = function (b) {
        function c(c) {
            return !(!c.originalEvent || !c.originalEvent.target || c.originalEvent.target.nodeType != Node.TEXT_NODE) || (c.target && "A" == c.target.tagName && 1 == c.target.childNodes.length && "IMG" == c.target.childNodes[0].tagName && (c.target = c.target.childNodes[0]), a(c.target).hasClass("fr-draggable") ? (b.undo.canDo() || b.undo.saveStep(), b.opts.dragInline ? b.$el.attr("contenteditable", !0) : b.$el.attr("contenteditable", !1), b.opts.toolbarInline && b.toolbar.hide(), a(c.target).addClass("fr-dragging"), b.browser.msie || b.browser.edge || b.selection.clear(), void c.originalEvent.dataTransfer.setData("text", "Froala")) : (c.preventDefault(), !1))
        }

        function d(a) {
            return !(a && ("HTML" == a.tagName || "BODY" == a.tagName || b.node.isElement(a)))
        }

        function e(a, c, d) {
            b.opts.iframe && (a += b.$iframe.offset().top, c += b.$iframe.offset().left), n.offset().top != a && n.css("top", a), n.offset().left != c && n.css("left", c), n.width() != d && n.css("width", d)
        }

        function f(c) {
            var f = b.doc.elementFromPoint(c.originalEvent.pageX - b.win.pageXOffset, c.originalEvent.pageY - b.win.pageYOffset);
            if (!d(f)) {
                for (var g = 0, h = f; !d(h) && h == f && c.originalEvent.pageY - b.win.pageYOffset - g > 0;) g++, h = b.doc.elementFromPoint(c.originalEvent.pageX - b.win.pageXOffset, c.originalEvent.pageY - b.win.pageYOffset - g);
                (!d(h) || n && 0 === b.$el.find(h).length && h != n.get(0)) && (h = null);
                for (var i = 0, j = f; !d(j) && j == f && c.originalEvent.pageY - b.win.pageYOffset + i < a(b.doc).height();) i++, j = b.doc.elementFromPoint(c.originalEvent.pageX - b.win.pageXOffset, c.originalEvent.pageY - b.win.pageYOffset + i);
                (!d(j) || n && 0 === b.$el.find(j).length && j != n.get(0)) && (j = null), f = null == j && h ? h : j && null == h ? j : j && h ? g < i ? h : j : null
            }
            if (a(f).hasClass("fr-drag-helper")) return !1;
            if (f && !b.node.isBlock(f) && (f = b.node.blockParent(f)), f && ["TD", "TH", "TR", "THEAD", "TBODY"].indexOf(f.tagName) >= 0 && (f = a(f).parents("table").get(0)), f && ["LI"].indexOf(f.tagName) >= 0 && (f = a(f).parents("UL, OL").get(0)), f && !a(f).hasClass("fr-drag-helper")) {
                n || (a.FE.$draggable_helper || (a.FE.$draggable_helper = a('<div class="fr-drag-helper"></div>')), n = a.FE.$draggable_helper, b.events.on("shared.destroy", function () {
                    n.html("").removeData().remove(), n = null
                }, !0));
                var k, l = c.originalEvent.pageY;
                k = l < a(f).offset().top + a(f).outerHeight() / 2;
                var m = a(f), o = 0;
                k || 0 !== m.next().length ? (k || (m = m.next()), "before" == n.data("fr-position") && m.is(n.data("fr-tag")) || (m.prev().length > 0 && (o = parseFloat(m.prev().css("margin-bottom")) || 0), o = Math.max(o, parseFloat(m.css("margin-top")) || 0), e(m.offset().top - o / 2 - b.$box.offset().top, m.offset().left - b.win.pageXOffset - b.$box.offset().left, m.width()), n.data("fr-position", "before"))) : "after" == n.data("fr-position") && m.is(n.data("fr-tag")) || (o = parseFloat(m.css("margin-bottom")) || 0, e(m.offset().top + a(f).height() + o / 2 - b.$box.offset().top, m.offset().left - b.win.pageXOffset - b.$box.offset().left, m.width()), n.data("fr-position", "after")), n.data("fr-tag", m), n.addClass("fr-visible"), n.appendTo(b.$box)
            } else n && b.$box.find(n).length > 0 && n.removeClass("fr-visible")
        }

        function g(a) {
            a.originalEvent.dataTransfer.dropEffect = "move", b.opts.dragInline ? j() || !b.browser.msie && !b.browser.edge || a.preventDefault() : (a.preventDefault(), f(a))
        }

        function h(a) {
            a.originalEvent.dataTransfer.dropEffect = "move", b.opts.dragInline || a.preventDefault()
        }

        function i(a) {
            b.$el.attr("contenteditable", !0);
            var c = b.$el.find(".fr-dragging");
            n && n.hasClass("fr-visible") && b.$box.find(n).length ? k(a) : c.length && (a.preventDefault(), a.stopPropagation()), n && b.$box.find(n).length && n.removeClass("fr-visible"), c.removeClass("fr-dragging")
        }

        function j() {
            for (var b = null, c = 0; c < a.FE.INSTANCES.length; c++) if (b = a.FE.INSTANCES[c].$el.find(".fr-dragging"), b.length) return b.get(0)
        }

        function k(c) {
            for (var d, e, f = 0; f < a.FE.INSTANCES.length; f++) if (d = a.FE.INSTANCES[f].$el.find(".fr-dragging"), d.length) {
                e = a.FE.INSTANCES[f];
                break
            }
            if (d.length) {
                if (c.preventDefault(), c.stopPropagation(), n && n.hasClass("fr-visible") && b.$box.find(n).length) n.data("fr-tag")[n.data("fr-position")]('<span class="fr-marker"></span>'), n.removeClass("fr-visible"); else {
                    var g = b.markers.insertAtPoint(c.originalEvent);
                    if (g === !1) return !1
                }
                d.removeClass("fr-dragging");
                var h = d;
                if (d.parent().is("A") && (h = d.parent()), b.core.isEmpty()) b.events.focus(); else {
                    var i = b.$el.find(".fr-marker");
                    i.replaceWith(a.FE.MARKERS), b.selection.restore()
                }
                if (e == b || b.undo.canDo() || b.undo.saveStep(), b.core.isEmpty()) b.$el.html(h); else {
                    var j = b.markers.insert();
                    a(j).replaceWith(h), d.after(a.FE.MARKERS), b.selection.restore()
                }
                return b.popups.hideAll(), b.selection.save(), b.$el.find(b.html.emptyBlockTagsQuery()).not("TD, TH, LI, .fr-inner").remove(), b.html.wrap(), b.html.fillEmptyBlocks(), b.selection.restore(), b.undo.saveStep(), b.opts.iframe && b.size.syncIframe(), e != b && (e.popups.hideAll(), e.$el.find(e.html.emptyBlockTagsQuery()).not("TD, TH, LI, .fr-inner").remove(), e.html.wrap(), e.html.fillEmptyBlocks(), e.undo.saveStep(), e.events.trigger("element.dropped"), e.opts.iframe && e.size.syncIframe()), b.events.trigger("element.dropped", [h]), !1
            }
        }

        function l(a) {
            if (a && "DIV" == a.tagName && b.node.hasClass(a, "fr-drag-helper")) a.parentNode.removeChild(a); else if (a && a.nodeType == Node.ELEMENT_NODE) for (var c = a.querySelectorAll("div.fr-drag-helper"), d = 0; d < c.length; d++) c[d].parentNode.removeChild(c[d])
        }

        function m() {
            b.opts.enter == a.FE.ENTER_BR && (b.opts.dragInline = !0), b.events.on("dragstart", c, !0), b.events.on("dragover", g, !0), b.events.on("dragenter", h, !0), b.events.on("document.dragend", i, !0), b.events.on("document.drop", i, !0), b.events.on("drop", k, !0), b.events.on("html.processGet", l)
        }

        var n;
        return {_init: m}
    }
});
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)), a(c), c
    } : a(jQuery)
}(function (a) {
    a.FE.PLUGINS.codeBeautifier = function () {
        function a(a, c) {
            function d(a) {
                return a.replace(/^\s+/g, "")
            }

            function e(a) {
                return a.replace(/\s+$/g, "")
            }

            function g() {
                return this.pos = 0, this.token = "", this.current_mode = "CONTENT", this.tags = {
                    parent: "parent1",
                    parentcount: 1,
                    parent1: ""
                }, this.tag_type = "", this.token_text = this.last_token = this.last_text = this.token_type = "", this.newlines = 0, this.indent_content = i, this.Utils = {
                    whitespace: "\n\r\t ".split(""),
                    single_token: "br,input,link,meta,source,!doctype,basefont,base,area,hr,wbr,param,img,isindex,embed".split(","),
                    extra_liners: u,
                    in_array: function (a, b) {
                        for (var c = 0; c < b.length; c++) if (a == b[c]) return !0;
                        return !1
                    }
                }, this.is_whitespace = function (a) {
                    for (var b = 0; b < a.length; a++) if (!this.Utils.in_array(a.charAt(b), this.Utils.whitespace)) return !1;
                    return !0
                }, this.traverse_whitespace = function () {
                    var a = "";
                    if (a = this.input.charAt(this.pos), this.Utils.in_array(a, this.Utils.whitespace)) {
                        for (this.newlines = 0; this.Utils.in_array(a, this.Utils.whitespace);) o && "\n" == a && this.newlines <= p && (this.newlines += 1), this.pos++, a = this.input.charAt(this.pos);
                        return !0
                    }
                    return !1
                }, this.space_or_wrap = function (a) {
                    this.line_char_count >= this.wrap_line_length ? (this.print_newline(!1, a), this.print_indentation(a)) : (this.line_char_count++, a.push(" "))
                }, this.get_content = function () {
                    for (var a = "", b = []; "<" != this.input.charAt(this.pos);) {
                        if (this.pos >= this.input.length) return b.length ? b.join("") : ["", "TK_EOF"];
                        if (this.traverse_whitespace()) this.space_or_wrap(b); else {
                            if (q) {
                                var c = this.input.substr(this.pos, 3);
                                if ("{{#" == c || "{{/" == c) break;
                                if ("{{!" == c) return [this.get_tag(), "TK_TAG_HANDLEBARS_COMMENT"];
                                if ("{{" == this.input.substr(this.pos, 2) && "{{else}}" == this.get_tag(!0)) break
                            }
                            a = this.input.charAt(this.pos), this.pos++, this.line_char_count++, b.push(a)
                        }
                    }
                    return b.length ? b.join("") : ""
                }, this.get_contents_to = function (a) {
                    if (this.pos == this.input.length) return ["", "TK_EOF"];
                    var b = "", c = new RegExp("</" + a + "\\s*>", "igm");
                    c.lastIndex = this.pos;
                    var d = c.exec(this.input), e = d ? d.index : this.input.length;
                    return this.pos < e && (b = this.input.substring(this.pos, e), this.pos = e), b
                }, this.record_tag = function (a) {
                    this.tags[a + "count"] ? (this.tags[a + "count"]++, this.tags[a + this.tags[a + "count"]] = this.indent_level) : (this.tags[a + "count"] = 1, this.tags[a + this.tags[a + "count"]] = this.indent_level), this.tags[a + this.tags[a + "count"] + "parent"] = this.tags.parent, this.tags.parent = a + this.tags[a + "count"]
                }, this.retrieve_tag = function (a) {
                    if (this.tags[a + "count"]) {
                        for (var b = this.tags.parent; b && a + this.tags[a + "count"] != b;) b = this.tags[b + "parent"];
                        b && (this.indent_level = this.tags[a + this.tags[a + "count"]], this.tags.parent = this.tags[b + "parent"]), delete this.tags[a + this.tags[a + "count"] + "parent"], delete this.tags[a + this.tags[a + "count"]], 1 == this.tags[a + "count"] ? delete this.tags[a + "count"] : this.tags[a + "count"]--
                    }
                }, this.indent_to_tag = function (a) {
                    if (this.tags[a + "count"]) {
                        for (var b = this.tags.parent; b && a + this.tags[a + "count"] != b;) b = this.tags[b + "parent"];
                        b && (this.indent_level = this.tags[a + this.tags[a + "count"]])
                    }
                }, this.get_tag = function (a) {
                    var b, c, d, e = "", f = [], g = "", h = !1, i = !0, j = this.pos, l = this.line_char_count;
                    a = void 0 !== a && a;
                    do {
                        if (this.pos >= this.input.length) return a && (this.pos = j, this.line_char_count = l), f.length ? f.join("") : ["", "TK_EOF"];
                        if (e = this.input.charAt(this.pos), this.pos++, this.Utils.in_array(e, this.Utils.whitespace)) h = !0; else {
                            if ("'" != e && '"' != e || (e += this.get_unformatted(e), h = !0), "=" == e && (h = !1), f.length && "=" != f[f.length - 1] && ">" != e && h) {
                                if (this.space_or_wrap(f), h = !1, !i && "force" == r && "/" != e) {
                                    this.print_newline(!0, f), this.print_indentation(f);
                                    for (var m = 0; m < s; m++) f.push(k)
                                }
                                for (var o = 0; o < f.length; o++) if (" " == f[o]) {
                                    i = !1;
                                    break
                                }
                            }
                            if (q && "<" == d && e + this.input.charAt(this.pos) == "{{" && (e += this.get_unformatted("}}"), f.length && " " != f[f.length - 1] && "<" != f[f.length - 1] && (e = " " + e), h = !0), "<" != e || d || (b = this.pos - 1, d = "<"), q && !d && f.length >= 2 && "{" == f[f.length - 1] && "{" == f[f.length - 2] && (b = "#" == e || "/" == e || "!" == e ? this.pos - 3 : this.pos - 2, d = "{"), this.line_char_count++, f.push(e), f[1] && ("!" == f[1] || "?" == f[1] || "%" == f[1])) {
                                f = [this.get_comment(b)];
                                break
                            }
                            if (q && f[1] && "{" == f[1] && f[2] && "!" == f[2]) {
                                f = [this.get_comment(b)];
                                break
                            }
                            if (q && "{" == d && f.length > 2 && "}" == f[f.length - 2] && "}" == f[f.length - 1]) break
                        }
                    } while (">" != e);
                    var p, t, u = f.join("");
                    p = u.indexOf(" ") != -1 ? u.indexOf(" ") : "{" == u[0] ? u.indexOf("}") : u.indexOf(">"), t = "<" != u[0] && q ? "#" == u[2] ? 3 : 2 : 1;
                    var v = u.substring(t, p).toLowerCase();
                    return "/" == u.charAt(u.length - 2) || this.Utils.in_array(v, this.Utils.single_token) ? a || (this.tag_type = "SINGLE") : q && "{" == u[0] && "else" == v ? a || (this.indent_to_tag("if"), this.tag_type = "HANDLEBARS_ELSE", this.indent_content = !0, this.traverse_whitespace()) : this.is_unformatted(v, n) ? (g = this.get_unformatted("</" + v + ">", u), f.push(g), c = this.pos - 1, this.tag_type = "SINGLE") : "script" == v && (u.search("type") == -1 || u.search("type") > -1 && u.search(/\b(text|application)\/(x-)?(javascript|ecmascript|jscript|livescript)/) > -1) ? a || (this.record_tag(v), this.tag_type = "SCRIPT") : "style" == v && (u.search("type") == -1 || u.search("type") > -1 && u.search("text/css") > -1) ? a || (this.record_tag(v), this.tag_type = "STYLE") : "!" == v.charAt(0) ? a || (this.tag_type = "SINGLE", this.traverse_whitespace()) : a || ("/" == v.charAt(0) ? (this.retrieve_tag(v.substring(1)), this.tag_type = "END") : (this.record_tag(v), "html" != v.toLowerCase() && (this.indent_content = !0), this.tag_type = "START"), this.traverse_whitespace() && this.space_or_wrap(f), this.Utils.in_array(v, this.Utils.extra_liners) && (this.print_newline(!1, this.output), this.output.length && "\n" != this.output[this.output.length - 2] && this.print_newline(!0, this.output))), a && (this.pos = j, this.line_char_count = l), f.join("")
                }, this.get_comment = function (a) {
                    var b = "", c = ">", d = !1;
                    this.pos = a;
                    var e = this.input.charAt(this.pos);
                    for (this.pos++; this.pos <= this.input.length && (b += e, b[b.length - 1] != c[c.length - 1] || b.indexOf(c) == -1);) !d && b.length < 10 && (0 === b.indexOf("<![if") ? (c = "<![endif]>", d = !0) : 0 === b.indexOf("<![cdata[") ? (c = "]]>", d = !0) : 0 === b.indexOf("<![") ? (c = "]>", d = !0) : 0 === b.indexOf("<!--") ? (c = "-->", d = !0) : 0 === b.indexOf("{{!") ? (c = "}}", d = !0) : 0 === b.indexOf("<?") ? (c = "?>", d = !0) : 0 === b.indexOf("<%") && (c = "%>", d = !0)), e = this.input.charAt(this.pos), this.pos++;
                    return b
                }, this.get_unformatted = function (a, b) {
                    if (b && b.toLowerCase().indexOf(a) != -1) return "";
                    var c = "", d = "", e = 0, f = !0;
                    do {
                        if (this.pos >= this.input.length) return d;
                        if (c = this.input.charAt(this.pos), this.pos++, this.Utils.in_array(c, this.Utils.whitespace)) {
                            if (!f) {
                                this.line_char_count--;
                                continue
                            }
                            if ("\n" == c || "\r" == c) {
                                d += "\n", this.line_char_count = 0;
                                continue
                            }
                        }
                        d += c, this.line_char_count++, f = !0, q && "{" == c && d.length && "{" == d[d.length - 2] && (d += this.get_unformatted("}}"), e = d.length)
                    } while (d.toLowerCase().indexOf(a, e) == -1);
                    return d
                }, this.get_token = function () {
                    var a;
                    if ("TK_TAG_SCRIPT" == this.last_token || "TK_TAG_STYLE" == this.last_token) {
                        var b = this.last_token.substr(7);
                        return a = this.get_contents_to(b), "string" != typeof a ? a : [a, "TK_" + b]
                    }
                    if ("CONTENT" == this.current_mode) return a = this.get_content(), "string" != typeof a ? a : [a, "TK_CONTENT"];
                    if ("TAG" == this.current_mode) {
                        if (a = this.get_tag(), "string" != typeof a) return a;
                        var c = "TK_TAG_" + this.tag_type;
                        return [a, c]
                    }
                }, this.get_full_indent = function (a) {
                    return a = this.indent_level + a || 0, a < 1 ? "" : new Array(a + 1).join(this.indent_string)
                }, this.is_unformatted = function (a, b) {
                    if (!this.Utils.in_array(a, b)) return !1;
                    if ("a" != a.toLowerCase() || !this.Utils.in_array("a", b)) return !0;
                    var c = this.get_tag(!0), d = (c || "").match(/^\s*<\s*\/?([a-z]*)\s*[^>]*>\s*$/);
                    return !(d && !this.Utils.in_array(d, b))
                }, this.printer = function (a, b, c, f, g) {
                    this.input = a || "", this.output = [], this.indent_character = b, this.indent_string = "", this.indent_size = c, this.brace_style = g, this.indent_level = 0, this.wrap_line_length = f, this.line_char_count = 0;
                    for (var h = 0; h < this.indent_size; h++) this.indent_string += this.indent_character;
                    this.print_newline = function (a, b) {
                        this.line_char_count = 0, b && b.length && (a || "\n" != b[b.length - 1]) && ("\n" != b[b.length - 1] && (b[b.length - 1] = e(b[b.length - 1])), b.push("\n"))
                    }, this.print_indentation = function (a) {
                        for (var b = 0; b < this.indent_level; b++) a.push(this.indent_string), this.line_char_count += this.indent_string.length
                    }, this.print_token = function (a) {
                        this.is_whitespace(a) && !this.output.length || ((a || "" !== a) && this.output.length && "\n" == this.output[this.output.length - 1] && (this.print_indentation(this.output), a = d(a)), this.print_token_raw(a))
                    }, this.print_token_raw = function (a) {
                        this.newlines > 0 && (a = e(a)), a && "" !== a && (a.length > 1 && "\n" == a[a.length - 1] ? (this.output.push(a.slice(0, -1)), this.print_newline(!1, this.output)) : this.output.push(a));
                        for (var b = 0; b < this.newlines; b++) this.print_newline(b > 0, this.output);
                        this.newlines = 0
                    }, this.indent = function () {
                        this.indent_level++
                    }, this.unindent = function () {
                        this.indent_level > 0 && this.indent_level--
                    }
                }, this
            }

            var h, i, j, k, l, m, n, o, p, q, r, s, t, u;
            for (c = c || {}, void 0 !== c.wrap_line_length && 0 !== parseInt(c.wrap_line_length, 10) || void 0 === c.max_char || 0 === parseInt(c.max_char, 10) || (c.wrap_line_length = c.max_char), i = void 0 !== c.indent_inner_html && c.indent_inner_html, j = void 0 === c.indent_size ? 4 : parseInt(c.indent_size, 10), k = void 0 === c.indent_char ? " " : c.indent_char, m = void 0 === c.brace_style ? "collapse" : c.brace_style, l = 0 === parseInt(c.wrap_line_length, 10) ? 32786 : parseInt(c.wrap_line_length || 250, 10), n = c.unformatted || ["a", "span", "img", "bdo", "em", "strong", "dfn", "code", "samp", "kbd", "var", "cite", "abbr", "acronym", "q", "sub", "sup", "tt", "i", "b", "big", "small", "u", "s", "strike", "font", "ins", "del", "address", "pre"], o = void 0 === c.preserve_newlines || c.preserve_newlines, p = o ? isNaN(parseInt(c.max_preserve_newlines, 10)) ? 32786 : parseInt(c.max_preserve_newlines, 10) : 0, q = void 0 !== c.indent_handlebars && c.indent_handlebars, r = void 0 === c.wrap_attributes ? "auto" : c.wrap_attributes, s = void 0 === c.wrap_attributes_indent_size ? j : parseInt(c.wrap_attributes_indent_size, 10) || j, t = void 0 !== c.end_with_newline && c.end_with_newline, u = Array.isArray(c.extra_liners) ? c.extra_liners.concat() : "string" == typeof c.extra_liners ? c.extra_liners.split(",") : "head,body,/html".split(","), c.indent_with_tabs && (k = "\t", j = 1), h = new g, h.printer(a, k, j, l, m); ;) {
                var v = h.get_token();
                if (h.token_text = v[0], h.token_type = v[1], "TK_EOF" == h.token_type) break;
                switch (h.token_type) {
                    case"TK_TAG_START":
                        h.print_newline(!1, h.output), h.print_token(h.token_text), h.indent_content && (h.indent(), h.indent_content = !1), h.current_mode = "CONTENT";
                        break;
                    case"TK_TAG_STYLE":
                    case"TK_TAG_SCRIPT":
                        h.print_newline(!1, h.output), h.print_token(h.token_text), h.current_mode = "CONTENT";
                        break;
                    case"TK_TAG_END":
                        if ("TK_CONTENT" == h.last_token && "" === h.last_text) {
                            var w = h.token_text.match(/\w+/)[0], x = null;
                            h.output.length && (x = h.output[h.output.length - 1].match(/(?:<|{{#)\s*(\w+)/)), (null == x || x[1] != w && !h.Utils.in_array(x[1], n)) && h.print_newline(!1, h.output)
                        }
                        h.print_token(h.token_text), h.current_mode = "CONTENT";
                        break;
                    case"TK_TAG_SINGLE":
                        var y = h.token_text.match(/^\s*<([a-z-]+)/i);
                        y && h.Utils.in_array(y[1], n) || h.print_newline(!1, h.output), h.print_token(h.token_text), h.current_mode = "CONTENT";
                        break;
                    case"TK_TAG_HANDLEBARS_ELSE":
                        h.print_token(h.token_text), h.indent_content && (h.indent(), h.indent_content = !1), h.current_mode = "CONTENT";
                        break;
                    case"TK_TAG_HANDLEBARS_COMMENT":
                        h.print_token(h.token_text), h.current_mode = "TAG";
                        break;
                    case"TK_CONTENT":
                        h.print_token(h.token_text), h.current_mode = "TAG";
                        break;
                    case"TK_STYLE":
                    case"TK_SCRIPT":
                        if ("" !== h.token_text) {
                            h.print_newline(!1, h.output);
                            var z, A = h.token_text, B = 1;
                            "TK_SCRIPT" == h.token_type ? z = "function" == typeof f && f : "TK_STYLE" == h.token_type && (z = "function" == typeof b && b), "keep" == c.indent_scripts ? B = 0 : "separate" == c.indent_scripts && (B = -h.indent_level);
                            var C = h.get_full_indent(B);
                            if (z) A = z(A.replace(/^\s*/, C), c); else {
                                var D = A.match(/^\s*/)[0],
                                    E = D.match(/[^\n\r]*$/)[0].split(h.indent_string).length - 1,
                                    F = h.get_full_indent(B - E);
                                A = A.replace(/^\s*/, C).replace(/\r\n|\r|\n/g, "\n" + F).replace(/\s+$/, "")
                            }
                            A && (h.print_token_raw(A), h.print_newline(!0, h.output))
                        }
                        h.current_mode = "TAG";
                        break;
                    default:
                        "" !== h.token_text && h.print_token(h.token_text)
                }
                h.last_token = h.token_type, h.last_text = h.token_text
            }
            var G = h.output.join("").replace(/[\r\n\t ]+$/, "");
            return t && (G += "\n"), G
        }

        function b(a, b) {
            function c() {
                return v = a.charAt(++x), v || ""
            }

            function d(b) {
                var d = "", e = x;
                return b && g(), d = a.charAt(x + 1) || "", x = e - 1, c(), d
            }

            function e(b) {
                for (var d = x; c();) if ("\\" === v) c(); else {
                    if (b.indexOf(v) !== -1) break;
                    if ("\n" === v) break
                }
                return a.substring(d, x + 1)
            }

            function f(a) {
                var b = x, d = e(a);
                return x = b - 1, c(), d
            }

            function g() {
                for (var a = ""; w.test(d());) c(), a += v;
                return a
            }

            function h() {
                var a = "";
                for (v && w.test(v) && (a = v); w.test(c());) a += v;
                return a
            }

            function i(b) {
                var e = x;
                for (b = "/" === d(), c(); c();) {
                    if (!b && "*" === v && "/" === d()) {
                        c();
                        break
                    }
                    if (b && "\n" === v) return a.substring(e, x)
                }
                return a.substring(e, x) + v
            }

            function j(b) {
                return a.substring(x - b.length, x).toLowerCase() === b
            }

            function k() {
                for (var b = 0, c = x + 1; c < a.length; c++) {
                    var d = a.charAt(c);
                    if ("{" === d) return !0;
                    if ("(" === d) b += 1; else if (")" === d) {
                        if (0 == b) return !1;
                        b -= 1
                    } else if (";" === d || "}" === d) return !1
                }
                return !1
            }

            function l() {
                B++, z += A
            }

            function m() {
                B--, z = z.slice(0, -p)
            }

            var n = {"@page": !0, "@font-face": !0, "@keyframes": !0, "@media": !0, "@supports": !0, "@document": !0},
                o = {"@media": !0, "@supports": !0, "@document": !0};
            b = b || {}, a = a || "", a = a.replace(/\r\n|[\r\u2028\u2029]/g, "\n");
            var p = b.indent_size || 4, q = b.indent_char || " ",
                r = void 0 === b.selector_separator_newline || b.selector_separator_newline,
                s = void 0 !== b.end_with_newline && b.end_with_newline,
                t = void 0 === b.newline_between_rules || b.newline_between_rules, u = b.eol ? b.eol : "\n";
            "string" == typeof p && (p = parseInt(p, 10)), b.indent_with_tabs && (q = "\t", p = 1), u = u.replace(/\\r/, "\r").replace(/\\n/, "\n");
            var v, w = /^\s+$/, x = -1, y = 0, z = a.match(/^[\t ]*/)[0], A = new Array(p + 1).join(q), B = 0, C = 0,
                D = {};
            D["{"] = function (a) {
                D.singleSpace(), E.push(a), D.newLine()
            }, D["}"] = function (a) {
                D.newLine(), E.push(a), D.newLine()
            }, D._lastCharWhitespace = function () {
                return w.test(E[E.length - 1])
            }, D.newLine = function (a) {
                E.length && (a || "\n" === E[E.length - 1] || D.trim(), E.push("\n"), z && E.push(z))
            }, D.singleSpace = function () {
                E.length && !D._lastCharWhitespace() && E.push(" ")
            }, D.preserveSingleSpace = function () {
                L && D.singleSpace()
            }, D.trim = function () {
                for (; D._lastCharWhitespace();) E.pop()
            };
            for (var E = [], F = !1, G = !1, H = !1, I = "", J = ""; ;) {
                var K = h(), L = "" !== K, M = K.indexOf("\n") !== -1;
                if (J = I, I = v, !v) break;
                if ("/" === v && "*" === d()) {
                    var N = 0 === B;
                    (M || N) && D.newLine(), E.push(i()), D.newLine(), N && D.newLine(!0)
                } else if ("/" === v && "/" === d()) M || "{" === J || D.trim(), D.singleSpace(), E.push(i()), D.newLine(); else if ("@" === v) {
                    D.preserveSingleSpace(), E.push(v);
                    var O = f(": ,;{}()[]/='\"");
                    O.match(/[ :]$/) && (c(), O = e(": ").replace(/\s$/, ""), E.push(O), D.singleSpace()), O = O.replace(/\s$/, ""), O in n && (C += 1, O in o && (H = !0))
                } else "#" === v && "{" === d() ? (D.preserveSingleSpace(), E.push(e("}"))) : "{" === v ? "}" === d(!0) ? (g(), c(), D.singleSpace(), E.push("{}"), D.newLine(), t && 0 === B && D.newLine(!0)) : (l(), D["{"](v), H ? (H = !1, F = B > C) : F = B >= C) : "}" === v ? (m(), D["}"](v), F = !1, G = !1, C && C--, t && 0 === B && D.newLine(!0)) : ":" === v ? (g(), !F && !H || j("&") || k() ? ":" === d() ? (c(), E.push("::")) : E.push(":") : (G = !0, E.push(":"), D.singleSpace())) : '"' === v || "'" === v ? (D.preserveSingleSpace(), E.push(e(v))) : ";" === v ? (G = !1, E.push(v), D.newLine()) : "(" === v ? j("url") ? (E.push(v), g(), c() && (")" !== v && '"' !== v && "'" !== v ? E.push(e(")")) : x--)) : (y++, D.preserveSingleSpace(), E.push(v), g()) : ")" === v ? (E.push(v), y--) : "," === v ? (E.push(v), g(), r && !G && y < 1 ? D.newLine() : D.singleSpace()) : "]" === v ? E.push(v) : "[" === v ? (D.preserveSingleSpace(), E.push(v)) : "=" === v ? (g(), v = "=", E.push(v)) : (D.preserveSingleSpace(), E.push(v))
            }
            var P = "";
            return z && (P += z), P += E.join("").replace(/[\r\n\t ]+$/, ""), s && (P += "\n"), "\n" != u && (P = P.replace(/[\n]/g, u)), P
        }

        function c(a, b) {
            for (var c = 0; c < b.length; c += 1) if (b[c] === a) return !0;
            return !1
        }

        function d(a) {
            return a.replace(/^\s+|\s+$/g, "")
        }

        function e(a) {
            return a.replace(/^\s+/g, "")
        }

        function f(a, b) {
            var c = new g(a, b);
            return c.beautify()
        }

        function g(a, b) {
            function f(a, b) {
                var c = 0;
                a && (c = a.indentation_level, !R.just_added_newline() && a.line_indent_level > c && (c = a.line_indent_level));
                var d = {
                    mode: b,
                    parent: a,
                    last_text: a ? a.last_text : "",
                    last_word: a ? a.last_word : "",
                    declaration_statement: !1,
                    declaration_assignment: !1,
                    multiline_frame: !1,
                    if_block: !1,
                    else_block: !1,
                    do_block: !1,
                    do_while: !1,
                    in_case_statement: !1,
                    in_case: !1,
                    case_body: !1,
                    indentation_level: c,
                    line_indent_level: a ? a.line_indent_level : c,
                    start_line_index: R.get_line_number(),
                    ternary_depth: 0
                };
                return d
            }

            function g(a) {
                var b = a.newlines, c = ba.keep_array_indentation && t(Y.mode);
                if (c) for (d = 0; d < b; d += 1) n(d > 0); else if (ba.max_preserve_newlines && b > ba.max_preserve_newlines && (b = ba.max_preserve_newlines), ba.preserve_newlines && a.newlines > 1) {
                    n();
                    for (var d = 1; d < b; d += 1) n(!0)
                }
                U = a, aa[U.type]()
            }

            function h(a) {
                a = a.replace(/\x0d/g, "");
                for (var b = [], c = a.indexOf("\n"); c !== -1;) b.push(a.substring(0, c)), a = a.substring(c + 1), c = a.indexOf("\n");
                return a.length && b.push(a), b
            }

            function m(a) {
                if (a = void 0 !== a && a, !R.just_added_newline()) if (ba.preserve_newlines && U.wanted_newline || a) n(!1, !0); else if (ba.wrap_line_length) {
                    var b = R.current_line.get_character_count() + U.text.length + (R.space_before_token ? 1 : 0);
                    b >= ba.wrap_line_length && n(!1, !0)
                }
            }

            function n(a, b) {
                if (!b && ";" !== Y.last_text && "," !== Y.last_text && "=" !== Y.last_text && "TK_OPERATOR" !== V) for (; Y.mode === l.Statement && !Y.if_block && !Y.do_block;) v();
                R.add_new_line(a) && (Y.multiline_frame = !0)
            }

            function o() {
                R.just_added_newline() && (ba.keep_array_indentation && t(Y.mode) && U.wanted_newline ? (R.current_line.push(U.whitespace_before), R.space_before_token = !1) : R.set_indent(Y.indentation_level) && (Y.line_indent_level = Y.indentation_level))
            }

            function p(a) {
                return R.raw ? void R.add_raw_token(U) : (ba.comma_first && "TK_COMMA" === V && R.just_added_newline() && "," === R.previous_line.last() && (R.previous_line.pop(), o(), R.add_token(","), R.space_before_token = !0), a = a || U.text, o(), void R.add_token(a))
            }

            function q() {
                Y.indentation_level += 1
            }

            function r() {
                Y.indentation_level > 0 && (!Y.parent || Y.indentation_level > Y.parent.indentation_level) && (Y.indentation_level -= 1)
            }

            function s(a) {
                Y ? ($.push(Y), Z = Y) : Z = f(null, a), Y = f(Z, a)
            }

            function t(a) {
                return a === l.ArrayLiteral
            }

            function u(a) {
                return c(a, [l.Expression, l.ForInitializer, l.Conditional])
            }

            function v() {
                $.length > 0 && (Z = Y, Y = $.pop(), Z.mode === l.Statement && R.remove_redundant_indentation(Z))
            }

            function w() {
                return Y.parent.mode === l.ObjectLiteral && Y.mode === l.Statement && (":" === Y.last_text && 0 === Y.ternary_depth || "TK_RESERVED" === V && c(Y.last_text, ["get", "set"]))
            }

            function x() {
                return !!("TK_RESERVED" === V && c(Y.last_text, ["var", "let", "const"]) && "TK_WORD" === U.type || "TK_RESERVED" === V && "do" === Y.last_text || "TK_RESERVED" === V && "return" === Y.last_text && !U.wanted_newline || "TK_RESERVED" === V && "else" === Y.last_text && ("TK_RESERVED" !== U.type || "if" !== U.text) || "TK_END_EXPR" === V && (Z.mode === l.ForInitializer || Z.mode === l.Conditional) || "TK_WORD" === V && Y.mode === l.BlockStatement && !Y.in_case && "--" !== U.text && "++" !== U.text && "function" !== W && "TK_WORD" !== U.type && "TK_RESERVED" !== U.type || Y.mode === l.ObjectLiteral && (":" === Y.last_text && 0 === Y.ternary_depth || "TK_RESERVED" === V && c(Y.last_text, ["get", "set"]))) && (s(l.Statement), q(), "TK_RESERVED" === V && c(Y.last_text, ["var", "let", "const"]) && "TK_WORD" === U.type && (Y.declaration_statement = !0), w() || m("TK_RESERVED" === U.type && c(U.text, ["do", "for", "if", "while"])), !0)
            }

            function y(a, b) {
                for (var c = 0; c < a.length; c++) {
                    var e = d(a[c]);
                    if (e.charAt(0) !== b) return !1
                }
                return !0
            }

            function z(a, b) {
                for (var c, d = 0, e = a.length; d < e; d++) if (c = a[d], c && 0 !== c.indexOf(b)) return !1;
                return !0
            }

            function A(a) {
                return c(a, ["case", "return", "do", "if", "throw", "else"])
            }

            function B(a) {
                var b = S + (a || 0);
                return b < 0 || b >= ca.length ? null : ca[b]
            }

            function C() {
                x();
                var a = l.Expression;
                if ("[" === U.text) {
                    if ("TK_WORD" === V || ")" === Y.last_text) return "TK_RESERVED" === V && c(Y.last_text, T.line_starters) && (R.space_before_token = !0), s(a), p(), q(), void(ba.space_in_paren && (R.space_before_token = !0));
                    a = l.ArrayLiteral, t(Y.mode) && ("[" !== Y.last_text && ("," !== Y.last_text || "]" !== W && "}" !== W) || ba.keep_array_indentation || n())
                } else "TK_RESERVED" === V && "for" === Y.last_text ? a = l.ForInitializer : "TK_RESERVED" === V && c(Y.last_text, ["if", "while"]) && (a = l.Conditional);
                ";" === Y.last_text || "TK_START_BLOCK" === V ? n() : "TK_END_EXPR" === V || "TK_START_EXPR" === V || "TK_END_BLOCK" === V || "." === Y.last_text ? m(U.wanted_newline) : "TK_RESERVED" === V && "(" === U.text || "TK_WORD" === V || "TK_OPERATOR" === V ? "TK_RESERVED" === V && ("function" === Y.last_word || "typeof" === Y.last_word) || "*" === Y.last_text && "function" === W ? ba.space_after_anon_function && (R.space_before_token = !0) : "TK_RESERVED" !== V || !c(Y.last_text, T.line_starters) && "catch" !== Y.last_text || ba.space_before_conditional && (R.space_before_token = !0) : R.space_before_token = !0, "(" === U.text && "TK_RESERVED" === V && "await" === Y.last_word && (R.space_before_token = !0), "(" === U.text && ("TK_EQUALS" !== V && "TK_OPERATOR" !== V || w() || m()), s(a), p(), ba.space_in_paren && (R.space_before_token = !0), q()
            }

            function D() {
                for (; Y.mode === l.Statement;) v();
                Y.multiline_frame && m("]" === U.text && t(Y.mode) && !ba.keep_array_indentation), ba.space_in_paren && ("TK_START_EXPR" !== V || ba.space_in_empty_paren ? R.space_before_token = !0 : (R.trim(), R.space_before_token = !1)), "]" === U.text && ba.keep_array_indentation ? (p(), v()) : (v(), p()), R.remove_redundant_indentation(Z), Y.do_while && Z.mode === l.Conditional && (Z.mode = l.Expression, Y.do_block = !1, Y.do_while = !1)
            }

            function E() {
                var a = B(1), b = B(2);
                s(b && (":" === b.text && c(a.type, ["TK_STRING", "TK_WORD", "TK_RESERVED"]) || c(a.text, ["get", "set"]) && c(b.type, ["TK_WORD", "TK_RESERVED"])) ? c(W, ["class", "interface"]) ? l.BlockStatement : l.ObjectLiteral : l.BlockStatement);
                var d = !a.comments_before.length && "}" === a.text,
                    e = d && "function" === Y.last_word && "TK_END_EXPR" === V;
                "expand" === ba.brace_style || "none" === ba.brace_style && U.wanted_newline ? "TK_OPERATOR" !== V && (e || "TK_EQUALS" === V || "TK_RESERVED" === V && A(Y.last_text) && "else" !== Y.last_text) ? R.space_before_token = !0 : n(!1, !0) : "TK_OPERATOR" !== V && "TK_START_EXPR" !== V ? "TK_START_BLOCK" === V ? n() : R.space_before_token = !0 : t(Z.mode) && "," === Y.last_text && ("}" === W ? R.space_before_token = !0 : n()), p(), q()
            }

            function F() {
                for (; Y.mode === l.Statement;) v();
                var a = "TK_START_BLOCK" === V;
                "expand" === ba.brace_style ? a || n() : a || (t(Y.mode) && ba.keep_array_indentation ? (ba.keep_array_indentation = !1, n(), ba.keep_array_indentation = !0) : n()), v(), p()
            }

            function G() {
                if ("TK_RESERVED" === U.type && Y.mode !== l.ObjectLiteral && c(U.text, ["set", "get"]) && (U.type = "TK_WORD"), "TK_RESERVED" === U.type && Y.mode === l.ObjectLiteral) {
                    var a = B(1);
                    ":" == a.text && (U.type = "TK_WORD")
                }
                if (x() || !U.wanted_newline || u(Y.mode) || "TK_OPERATOR" === V && "--" !== Y.last_text && "++" !== Y.last_text || "TK_EQUALS" === V || !ba.preserve_newlines && "TK_RESERVED" === V && c(Y.last_text, ["var", "let", "const", "set", "get"]) || n(), Y.do_block && !Y.do_while) {
                    if ("TK_RESERVED" === U.type && "while" === U.text) return R.space_before_token = !0, p(), R.space_before_token = !0, void(Y.do_while = !0);
                    n(), Y.do_block = !1
                }
                if (Y.if_block) if (Y.else_block || "TK_RESERVED" !== U.type || "else" !== U.text) {
                    for (; Y.mode === l.Statement;) v();
                    Y.if_block = !1, Y.else_block = !1
                } else Y.else_block = !0;
                if ("TK_RESERVED" === U.type && ("case" === U.text || "default" === U.text && Y.in_case_statement)) return n(), (Y.case_body || ba.jslint_happy) && (r(), Y.case_body = !1), p(), Y.in_case = !0, void(Y.in_case_statement = !0);
                if ("TK_RESERVED" === U.type && "function" === U.text && ((c(Y.last_text, ["}", ";"]) || R.just_added_newline() && !c(Y.last_text, ["[", "{", ":", "=", ","])) && (R.just_added_blankline() || U.comments_before.length || (n(), n(!0))), "TK_RESERVED" === V || "TK_WORD" === V ? "TK_RESERVED" === V && c(Y.last_text, ["get", "set", "new", "return", "export", "async"]) ? R.space_before_token = !0 : "TK_RESERVED" === V && "default" === Y.last_text && "export" === W ? R.space_before_token = !0 : n() : "TK_OPERATOR" === V || "=" === Y.last_text ? R.space_before_token = !0 : (Y.multiline_frame || !u(Y.mode) && !t(Y.mode)) && n()), "TK_COMMA" !== V && "TK_START_EXPR" !== V && "TK_EQUALS" !== V && "TK_OPERATOR" !== V || w() || m(), "TK_RESERVED" === U.type && c(U.text, ["function", "get", "set"])) return p(), void(Y.last_word = U.text);
                if (_ = "NONE", "TK_END_BLOCK" === V ? "TK_RESERVED" === U.type && c(U.text, ["else", "catch", "finally"]) ? "expand" === ba.brace_style || "end-expand" === ba.brace_style || "none" === ba.brace_style && U.wanted_newline ? _ = "NEWLINE" : (_ = "SPACE", R.space_before_token = !0) : _ = "NEWLINE" : "TK_SEMICOLON" === V && Y.mode === l.BlockStatement ? _ = "NEWLINE" : "TK_SEMICOLON" === V && u(Y.mode) ? _ = "SPACE" : "TK_STRING" === V ? _ = "NEWLINE" : "TK_RESERVED" === V || "TK_WORD" === V || "*" === Y.last_text && "function" === W ? _ = "SPACE" : "TK_START_BLOCK" === V ? _ = "NEWLINE" : "TK_END_EXPR" === V && (R.space_before_token = !0, _ = "NEWLINE"), "TK_RESERVED" === U.type && c(U.text, T.line_starters) && ")" !== Y.last_text && (_ = "else" === Y.last_text || "export" === Y.last_text ? "SPACE" : "NEWLINE"), "TK_RESERVED" === U.type && c(U.text, ["else", "catch", "finally"])) if ("TK_END_BLOCK" !== V || "expand" === ba.brace_style || "end-expand" === ba.brace_style || "none" === ba.brace_style && U.wanted_newline) n(); else {
                    R.trim(!0);
                    var b = R.current_line;
                    "}" !== b.last() && n(), R.space_before_token = !0
                } else "NEWLINE" === _ ? "TK_RESERVED" === V && A(Y.last_text) ? R.space_before_token = !0 : "TK_END_EXPR" !== V ? "TK_START_EXPR" === V && "TK_RESERVED" === U.type && c(U.text, ["var", "let", "const"]) || ":" === Y.last_text || ("TK_RESERVED" === U.type && "if" === U.text && "else" === Y.last_text ? R.space_before_token = !0 : n()) : "TK_RESERVED" === U.type && c(U.text, T.line_starters) && ")" !== Y.last_text && n() : Y.multiline_frame && t(Y.mode) && "," === Y.last_text && "}" === W ? n() : "SPACE" === _ && (R.space_before_token = !0);
                p(), Y.last_word = U.text, "TK_RESERVED" === U.type && "do" === U.text && (Y.do_block = !0), "TK_RESERVED" === U.type && "if" === U.text && (Y.if_block = !0)
            }

            function H() {
                for (x() && (R.space_before_token = !1); Y.mode === l.Statement && !Y.if_block && !Y.do_block;) v();
                p()
            }

            function I() {
                x() ? R.space_before_token = !0 : "TK_RESERVED" === V || "TK_WORD" === V ? R.space_before_token = !0 : "TK_COMMA" === V || "TK_START_EXPR" === V || "TK_EQUALS" === V || "TK_OPERATOR" === V ? w() || m() : n(), p()
            }

            function J() {
                x(), Y.declaration_statement && (Y.declaration_assignment = !0), R.space_before_token = !0, p(), R.space_before_token = !0
            }

            function K() {
                return Y.declaration_statement ? (u(Y.parent.mode) && (Y.declaration_assignment = !1), p(), void(Y.declaration_assignment ? (Y.declaration_assignment = !1, n(!1, !0)) : (R.space_before_token = !0, ba.comma_first && m()))) : (p(), void(Y.mode === l.ObjectLiteral || Y.mode === l.Statement && Y.parent.mode === l.ObjectLiteral ? (Y.mode === l.Statement && v(), n()) : (R.space_before_token = !0, ba.comma_first && m())))
            }

            function L() {
                if (x(), "TK_RESERVED" === V && A(Y.last_text)) return R.space_before_token = !0, void p();
                if ("*" === U.text && "TK_DOT" === V) return void p();
                if (":" === U.text && Y.in_case) return Y.case_body = !0, q(), p(), n(), void(Y.in_case = !1);
                if ("::" === U.text) return void p();
                "TK_OPERATOR" === V && m();
                var a = !0, b = !0;
                c(U.text, ["--", "++", "!", "~"]) || c(U.text, ["-", "+"]) && (c(V, ["TK_START_BLOCK", "TK_START_EXPR", "TK_EQUALS", "TK_OPERATOR"]) || c(Y.last_text, T.line_starters) || "," === Y.last_text) ? (a = !1, b = !1, !U.wanted_newline || "--" !== U.text && "++" !== U.text || n(!1, !0), ";" === Y.last_text && u(Y.mode) && (a = !0), "TK_RESERVED" === V ? a = !0 : "TK_END_EXPR" === V ? a = !("]" === Y.last_text && ("--" === U.text || "++" === U.text)) : "TK_OPERATOR" === V && (a = c(U.text, ["--", "-", "++", "+"]) && c(Y.last_text, ["--", "-", "++", "+"]), c(U.text, ["+", "-"]) && c(Y.last_text, ["--", "++"]) && (b = !0)), Y.mode !== l.BlockStatement && Y.mode !== l.Statement || "{" !== Y.last_text && ";" !== Y.last_text || n()) : ":" === U.text ? 0 === Y.ternary_depth ? a = !1 : Y.ternary_depth -= 1 : "?" === U.text ? Y.ternary_depth += 1 : "*" === U.text && "TK_RESERVED" === V && "function" === Y.last_text && (a = !1, b = !1), R.space_before_token = R.space_before_token || a, p(), R.space_before_token = b
            }

            function M() {
                if (R.raw) return R.add_raw_token(U), void(U.directives && "end" === U.directives.preserve && (ba.test_output_raw || (R.raw = !1)));
                if (U.directives) return n(!1, !0), p(), "start" === U.directives.preserve && (R.raw = !0), void n(!1, !0);
                if (!k.newline.test(U.text) && !U.wanted_newline) return R.space_before_token = !0, p(), void(R.space_before_token = !0);
                var a, b = h(U.text), c = !1, d = !1, f = U.whitespace_before, g = f.length;
                for (n(!1, !0), b.length > 1 && (y(b.slice(1), "*") ? c = !0 : z(b.slice(1), f) && (d = !0)), p(b[0]), a = 1; a < b.length; a++) n(!1, !0), c ? p(" " + e(b[a])) : d && b[a].length > g ? p(b[a].substring(g)) : R.add_token(b[a]);
                n(!1, !0)
            }

            function N() {
                U.wanted_newline ? n(!1, !0) : R.trim(!0), R.space_before_token = !0, p(), n(!1, !0)
            }

            function O() {
                x(), "TK_RESERVED" === V && A(Y.last_text) ? R.space_before_token = !0 : m(")" === Y.last_text && ba.break_chained_methods), p()
            }

            function P() {
                p(), "\n" === U.text[U.text.length - 1] && n()
            }

            function Q() {
                for (; Y.mode === l.Statement;) v()
            }

            var R, S, T, U, V, W, X, Y, Z, $, _, aa, ba, ca = [], da = "";
            for (aa = {
                TK_START_EXPR: C,
                TK_END_EXPR: D,
                TK_START_BLOCK: E,
                TK_END_BLOCK: F,
                TK_WORD: G,
                TK_RESERVED: G,
                TK_SEMICOLON: H,
                TK_STRING: I,
                TK_EQUALS: J,
                TK_OPERATOR: L,
                TK_COMMA: K,
                TK_BLOCK_COMMENT: M,
                TK_COMMENT: N,
                TK_DOT: O,
                TK_UNKNOWN: P,
                TK_EOF: Q
            }, b = b ? b : {}, ba = {}, void 0 !== b.braces_on_own_line && (ba.brace_style = b.braces_on_own_line ? "expand" : "collapse"), ba.brace_style = b.brace_style ? b.brace_style : ba.brace_style ? ba.brace_style : "collapse", "expand-strict" === ba.brace_style && (ba.brace_style = "expand"), ba.indent_size = b.indent_size ? parseInt(b.indent_size, 10) : 4, ba.indent_char = b.indent_char ? b.indent_char : " ", ba.eol = b.eol ? b.eol : "\n", ba.preserve_newlines = void 0 === b.preserve_newlines || b.preserve_newlines, ba.break_chained_methods = void 0 !== b.break_chained_methods && b.break_chained_methods, ba.max_preserve_newlines = void 0 === b.max_preserve_newlines ? 0 : parseInt(b.max_preserve_newlines, 10), ba.space_in_paren = void 0 !== b.space_in_paren && b.space_in_paren, ba.space_in_empty_paren = void 0 !== b.space_in_empty_paren && b.space_in_empty_paren, ba.jslint_happy = void 0 !== b.jslint_happy && b.jslint_happy, ba.space_after_anon_function = void 0 !== b.space_after_anon_function && b.space_after_anon_function, ba.keep_array_indentation = void 0 !== b.keep_array_indentation && b.keep_array_indentation, ba.space_before_conditional = void 0 === b.space_before_conditional || b.space_before_conditional, ba.unescape_strings = void 0 !== b.unescape_strings && b.unescape_strings, ba.wrap_line_length = void 0 === b.wrap_line_length ? 0 : parseInt(b.wrap_line_length, 10), ba.e4x = void 0 !== b.e4x && b.e4x, ba.end_with_newline = void 0 !== b.end_with_newline && b.end_with_newline, ba.comma_first = void 0 !== b.comma_first && b.comma_first, ba.test_output_raw = void 0 !== b.test_output_raw && b.test_output_raw, ba.jslint_happy && (ba.space_after_anon_function = !0), b.indent_with_tabs && (ba.indent_char = "\t", ba.indent_size = 1), ba.eol = ba.eol.replace(/\\r/, "\r").replace(/\\n/, "\n"), X = ""; ba.indent_size > 0;) X += ba.indent_char, ba.indent_size -= 1;
            var ea = 0;
            if (a && a.length) {
                for (; " " === a.charAt(ea) || "\t" === a.charAt(ea);) da += a.charAt(ea), ea += 1;
                a = a.substring(ea)
            }
            V = "TK_START_BLOCK", W = "", R = new i(X, da), R.raw = ba.test_output_raw, $ = [], s(l.BlockStatement), this.beautify = function () {
                var b, c;
                for (T = new j(a, ba, X), ca = T.tokenize(), S = 0; b = B();) {
                    for (var d = 0; d < b.comments_before.length; d++) g(b.comments_before[d]);
                    g(b), W = Y.last_text, V = b.type, Y.last_text = b.text, S += 1
                }
                return c = R.get_code(), ba.end_with_newline && (c += "\n"), "\n" != ba.eol && (c = c.replace(/[\n]/g, ba.eol)), c
            }
        }

        function h(a) {
            var b = 0, c = -1, d = [], e = !0;
            this.set_indent = function (d) {
                b = a.baseIndentLength + d * a.indent_length, c = d
            }, this.get_character_count = function () {
                return b
            }, this.is_empty = function () {
                return e
            }, this.last = function () {
                return this._empty ? null : d[d.length - 1]
            }, this.push = function (a) {
                d.push(a), b += a.length, e = !1
            }, this.pop = function () {
                var a = null;
                return e || (a = d.pop(), b -= a.length, e = 0 === d.length), a
            }, this.remove_indent = function () {
                c > 0 && (c -= 1, b -= a.indent_length)
            }, this.trim = function () {
                for (; " " === this.last();) {
                    d.pop();
                    b -= 1
                }
                e = 0 === d.length
            }, this.toString = function () {
                var b = "";
                return this._empty || (c >= 0 && (b = a.indent_cache[c]), b += d.join("")), b
            }
        }

        function i(a, b) {
            b = b || "", this.indent_cache = [b], this.baseIndentLength = b.length, this.indent_length = a.length, this.raw = !1;
            var c = [];
            this.baseIndentString = b, this.indent_string = a, this.previous_line = null, this.current_line = null, this.space_before_token = !1, this.add_outputline = function () {
                this.previous_line = this.current_line, this.current_line = new h(this), c.push(this.current_line)
            }, this.add_outputline(), this.get_line_number = function () {
                return c.length
            }, this.add_new_line = function (a) {
                return (1 !== this.get_line_number() || !this.just_added_newline()) && (!(!a && this.just_added_newline()) && (this.raw || this.add_outputline(), !0))
            }, this.get_code = function () {
                var a = c.join("\n").replace(/[\r\n\t ]+$/, "");
                return a
            }, this.set_indent = function (a) {
                if (c.length > 1) {
                    for (; a >= this.indent_cache.length;) this.indent_cache.push(this.indent_cache[this.indent_cache.length - 1] + this.indent_string);
                    return this.current_line.set_indent(a), !0
                }
                return this.current_line.set_indent(0), !1
            }, this.add_raw_token = function (a) {
                for (var b = 0; b < a.newlines; b++) this.add_outputline();
                this.current_line.push(a.whitespace_before), this.current_line.push(a.text), this.space_before_token = !1
            }, this.add_token = function (a) {
                this.add_space_before_token(), this.current_line.push(a)
            }, this.add_space_before_token = function () {
                this.space_before_token && !this.just_added_newline() && this.current_line.push(" "), this.space_before_token = !1
            }, this.remove_redundant_indentation = function (a) {
                if (!a.multiline_frame && a.mode !== l.ForInitializer && a.mode !== l.Conditional) for (var b = a.start_line_index, d = c.length; b < d;) c[b].remove_indent(), b++
            }, this.trim = function (d) {
                for (d = void 0 !== d && d, this.current_line.trim(a, b); d && c.length > 1 && this.current_line.is_empty();) c.pop(), this.current_line = c[c.length - 1], this.current_line.trim();
                this.previous_line = c.length > 1 ? c[c.length - 2] : null
            }, this.just_added_newline = function () {
                return this.current_line.is_empty()
            }, this.just_added_blankline = function () {
                if (this.just_added_newline()) {
                    if (1 === c.length) return !0;
                    var a = c[c.length - 2];
                    return a.is_empty()
                }
                return !1
            }
        }

        function j(a, b, e) {
            function f(a) {
                if (!a.match(y)) return null;
                var b = {};
                z.lastIndex = 0;
                for (var c = z.exec(a); c;) b[c[1]] = c[2], c = z.exec(a);
                return b
            }

            function g() {
                var e, g = [];
                if (p = 0, q = "", t >= u) return ["", "TK_EOF"];
                var y;
                y = s.length ? s[s.length - 1] : new m("TK_START_BLOCK", "{");
                var z = a.charAt(t);
                for (t += 1; c(z, i);) {
                    if (k.newline.test(z) ? "\n" === z && "\r" === a.charAt(t - 2) || (p += 1, g = []) : g.push(z), t >= u) return ["", "TK_EOF"];
                    z = a.charAt(t), t += 1
                }
                if (g.length && (q = g.join("")), j.test(z)) {
                    var C = !0, D = !0, E = j;
                    for ("0" === z && t < u && /[Xxo]/.test(a.charAt(t)) ? (C = !1, D = !1, z += a.charAt(t), t += 1, E = /[o]/.test(a.charAt(t)) ? l : n) : (z = "", t -= 1); t < u && E.test(a.charAt(t));) z += a.charAt(t), t += 1, C && t < u && "." === a.charAt(t) && (z += a.charAt(t), t += 1, C = !1), D && t < u && /[Ee]/.test(a.charAt(t)) && (z += a.charAt(t), t += 1, t < u && /[+-]/.test(a.charAt(t)) && (z += a.charAt(t), t += 1), D = !1, C = !1);
                    return [z, "TK_WORD"]
                }
                if (k.isIdentifierStart(a.charCodeAt(t - 1))) {
                    if (t < u) for (; k.isIdentifierChar(a.charCodeAt(t)) && (z += a.charAt(t), t += 1, t !== u);) ;
                    return "TK_DOT" === y.type || "TK_RESERVED" === y.type && c(y.text, ["set", "get"]) || !c(z, v) ? [z, "TK_WORD"] : "in" === z ? [z, "TK_OPERATOR"] : [z, "TK_RESERVED"]
                }
                if ("(" === z || "[" === z) return [z, "TK_START_EXPR"];
                if (")" === z || "]" === z) return [z, "TK_END_EXPR"];
                if ("{" === z) return [z, "TK_START_BLOCK"];
                if ("}" === z) return [z, "TK_END_BLOCK"];
                if (";" === z) return [z, "TK_SEMICOLON"];
                if ("/" === z) {
                    var F = "";
                    if ("*" === a.charAt(t)) {
                        t += 1, w.lastIndex = t;
                        var G = w.exec(a);
                        F = "/*" + G[0], t += G[0].length;
                        var H = f(F);
                        return H && "start" === H.ignore && (A.lastIndex = t, G = A.exec(a), F += G[0], t += G[0].length), F = F.replace(k.lineBreak, "\n"), [F, "TK_BLOCK_COMMENT", H]
                    }
                    if ("/" === a.charAt(t)) {
                        t += 1, x.lastIndex = t;
                        var G = x.exec(a);
                        return F = "//" + G[0], t += G[0].length, [F, "TK_COMMENT"]
                    }
                }
                if ("`" === z || "'" === z || '"' === z || ("/" === z || b.e4x && "<" === z && a.slice(t - 1).match(/^<([-a-zA-Z:0-9_.]+|{[^{}]*}|!\[CDATA\[[\s\S]*?\]\])(\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{.*?}))*\s*(\/?)\s*>/)) && ("TK_RESERVED" === y.type && c(y.text, ["return", "case", "throw", "else", "do", "typeof", "yield"]) || "TK_END_EXPR" === y.type && ")" === y.text && y.parent && "TK_RESERVED" === y.parent.type && c(y.parent.text, ["if", "while", "for"]) || c(y.type, ["TK_COMMENT", "TK_START_EXPR", "TK_START_BLOCK", "TK_END_BLOCK", "TK_OPERATOR", "TK_EQUALS", "TK_EOF", "TK_SEMICOLON", "TK_COMMA"]))) {
                    var I = z, J = !1, K = !1;
                    if (e = z, "/" === I) for (var L = !1; t < u && (J || L || a.charAt(t) !== I) && !k.newline.test(a.charAt(t));) e += a.charAt(t), J ? J = !1 : (J = "\\" === a.charAt(t), "[" === a.charAt(t) ? L = !0 : "]" === a.charAt(t) && (L = !1)), t += 1; else if (b.e4x && "<" === I) {
                        var M = /<(\/?)([-a-zA-Z:0-9_.]+|{[^{}]*}|!\[CDATA\[[\s\S]*?\]\])(\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{.*?}))*\s*(\/?)\s*>/g,
                            N = a.slice(t - 1), O = M.exec(N);
                        if (O && 0 === O.index) {
                            for (var P = O[2], Q = 0; O;) {
                                var R = !!O[1], S = O[2], T = !!O[O.length - 1] || "![CDATA[" === S.slice(0, 8);
                                if (S !== P || T || (R ? --Q : ++Q), Q <= 0) break;
                                O = M.exec(N)
                            }
                            var U = O ? O.index + O[0].length : N.length;
                            return N = N.slice(0, U), t += U - 1, N = N.replace(k.lineBreak, "\n"), [N, "TK_STRING"]
                        }
                    } else for (; t < u && (J || a.charAt(t) !== I && ("`" === I || !k.newline.test(a.charAt(t))));) (J || "`" === I) && k.newline.test(a.charAt(t)) ? ("\r" === a.charAt(t) && "\n" === a.charAt(t + 1) && (t += 1), e += "\n") : e += a.charAt(t), J ? ("x" !== a.charAt(t) && "u" !== a.charAt(t) || (K = !0), J = !1) : J = "\\" === a.charAt(t), t += 1;
                    if (K && b.unescape_strings && (e = h(e)), t < u && a.charAt(t) === I && (e += I, t += 1, "/" === I)) for (; t < u && k.isIdentifierStart(a.charCodeAt(t));) e += a.charAt(t), t += 1;
                    return [e, "TK_STRING"]
                }
                if ("#" === z) {
                    if (0 === s.length && "!" === a.charAt(t)) {
                        for (e = z; t < u && "\n" !== z;) z = a.charAt(t), e += z, t += 1;
                        return [d(e) + "\n", "TK_UNKNOWN"]
                    }
                    var V = "#";
                    if (t < u && j.test(a.charAt(t))) {
                        do z = a.charAt(t), V += z, t += 1; while (t < u && "#" !== z && "=" !== z);
                        return "#" === z || ("[" === a.charAt(t) && "]" === a.charAt(t + 1) ? (V += "[]", t += 2) : "{" === a.charAt(t) && "}" === a.charAt(t + 1) && (V += "{}", t += 2)), [V, "TK_WORD"]
                    }
                }
                if ("<" === z && ("?" === a.charAt(t) || "%" === a.charAt(t))) {
                    B.lastIndex = t - 1;
                    var W = B.exec(a);
                    if (W) return z = W[0], t += z.length - 1, z = z.replace(k.lineBreak, "\n"), [z, "TK_STRING"]
                }
                if ("<" === z && "<!--" === a.substring(t - 1, t + 3)) {
                    for (t += 3, z = "<!--"; !k.newline.test(a.charAt(t)) && t < u;) z += a.charAt(t), t++;
                    return r = !0, [z, "TK_COMMENT"]
                }
                if ("-" === z && r && "-->" === a.substring(t - 1, t + 2)) return r = !1, t += 2, ["-->", "TK_COMMENT"];
                if ("." === z) return [z, "TK_DOT"];
                if (c(z, o)) {
                    for (; t < u && c(z + a.charAt(t), o) && (z += a.charAt(t), t += 1, !(t >= u));) ;
                    return "," === z ? [z, "TK_COMMA"] : "=" === z ? [z, "TK_EQUALS"] : [z, "TK_OPERATOR"]
                }
                return [z, "TK_UNKNOWN"]
            }

            function h(a) {
                for (var b, c = !1, d = "", e = 0, f = "", g = 0; c || e < a.length;) if (b = a.charAt(e), e++, c) {
                    if (c = !1, "x" === b) f = a.substr(e, 2), e += 2; else {
                        if ("u" !== b) {
                            d += "\\" + b;
                            continue
                        }
                        f = a.substr(e, 4), e += 4
                    }
                    if (!f.match(/^[0123456789abcdefABCDEF]+$/)) return a;
                    if (g = parseInt(f, 16), g >= 0 && g < 32) {
                        d += "x" === b ? "\\x" + f : "\\u" + f;
                        continue
                    }
                    if (34 === g || 39 === g || 92 === g) d += "\\" + String.fromCharCode(g); else {
                        if ("x" === b && g > 126 && g <= 255) return a;
                        d += String.fromCharCode(g)
                    }
                } else "\\" === b ? c = !0 : d += b;
                return d
            }

            var i = "\n\r\t ".split(""), j = /[0-9]/, l = /[01234567]/, n = /[0123456789abcdefABCDEF]/,
                o = "+ - * / % & ++ -- = += -= *= /= %= == === != !== > < >= <= >> << >>> >>>= >>= <<= && &= | || ! ~ , : ? ^ ^= |= :: =>".split(" ");
            this.line_starters = "continue,try,throw,return,var,let,const,if,switch,case,default,for,while,break,function,import,export".split(",");
            var p, q, r, s, t, u,
                v = this.line_starters.concat(["do", "in", "else", "get", "set", "new", "catch", "finally", "typeof", "yield", "async", "await"]),
                w = /([\s\S]*?)((?:\*\/)|$)/g, x = /([^\n\r\u2028\u2029]*)/g, y = /\/\* beautify( \w+[:]\w+)+ \*\//g,
                z = / (\w+)[:](\w+)/g, A = /([\s\S]*?)((?:\/\*\sbeautify\signore:end\s\*\/)|$)/g,
                B = /((<\?php|<\?=)[\s\S]*?\?>)|(<%[\s\S]*?%>)/g;
            this.tokenize = function () {
                u = a.length, t = 0, r = !1, s = [];
                for (var b, c, d, e = null, f = [], h = []; !c || "TK_EOF" !== c.type;) {
                    for (d = g(), b = new m(d[1], d[0], p, q); "TK_COMMENT" === b.type || "TK_BLOCK_COMMENT" === b.type || "TK_UNKNOWN" === b.type;) "TK_BLOCK_COMMENT" === b.type && (b.directives = d[2]), h.push(b), d = g(), b = new m(d[1], d[0], p, q);
                    h.length && (b.comments_before = h, h = []), "TK_START_BLOCK" === b.type || "TK_START_EXPR" === b.type ? (b.parent = c, f.push(e), e = b) : ("TK_END_BLOCK" === b.type || "TK_END_EXPR" === b.type) && e && ("]" === b.text && "[" === e.text || ")" === b.text && "(" === e.text || "}" === b.text && "{" === e.text) && (b.parent = e.parent, e = f.pop()), s.push(b), c = b
                }
                return s
            }
        }

        var k = {};
        !function (a) {
            var b = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc",
                c = "\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u0620-\u0649\u0672-\u06d3\u06e7-\u06e8\u06fb-\u06fc\u0730-\u074a\u0800-\u0814\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0840-\u0857\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09d7\u09df-\u09e0\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5f-\u0b60\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d46-\u0d48\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e34-\u0e3a\u0e40-\u0e45\u0e50-\u0e59\u0eb4-\u0eb9\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f41-\u0f47\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1029\u1040-\u1049\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u170e-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17b2\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1920-\u192b\u1930-\u193b\u1951-\u196d\u19b0-\u19c0\u19c8-\u19c9\u19d0-\u19d9\u1a00-\u1a15\u1a20-\u1a53\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b46-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1bb0-\u1bb9\u1be6-\u1bf3\u1c00-\u1c22\u1c40-\u1c49\u1c5b-\u1c7d\u1cd0-\u1cd2\u1d00-\u1dbe\u1e01-\u1f15\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2d81-\u2d96\u2de0-\u2dff\u3021-\u3028\u3099\u309a\ua640-\ua66d\ua674-\ua67d\ua69f\ua6f0-\ua6f1\ua7f8-\ua800\ua806\ua80b\ua823-\ua827\ua880-\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8f3-\ua8f7\ua900-\ua909\ua926-\ua92d\ua930-\ua945\ua980-\ua983\ua9b3-\ua9c0\uaa00-\uaa27\uaa40-\uaa41\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b\uaae0-\uaae9\uaaf2-\uaaf3\uabc0-\uabe1\uabec\uabed\uabf0-\uabf9\ufb20-\ufb28\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f",
                d = new RegExp("[" + b + "]"), e = new RegExp("[" + b + c + "]");
            a.newline = /[\n\r\u2028\u2029]/, a.lineBreak = new RegExp("\r\n|" + a.newline.source), a.allLineBreaks = new RegExp(a.lineBreak.source, "g"), a.isIdentifierStart = function (a) {
                return a < 65 ? 36 === a || 64 === a : a < 91 || (a < 97 ? 95 === a : a < 123 || a >= 170 && d.test(String.fromCharCode(a)))
            }, a.isIdentifierChar = function (a) {
                return a < 48 ? 36 === a : a < 58 || !(a < 65) && (a < 91 || (a < 97 ? 95 === a : a < 123 || a >= 170 && e.test(String.fromCharCode(a))))
            }
        }(k);
        var l = {
            BlockStatement: "BlockStatement",
            Statement: "Statement",
            ObjectLiteral: "ObjectLiteral",
            ArrayLiteral: "ArrayLiteral",
            ForInitializer: "ForInitializer",
            Conditional: "Conditional",
            Expression: "Expression"
        }, m = function (a, b, c, d, e, f) {
            this.type = a, this.text = b, this.comments_before = [], this.newlines = c || 0, this.wanted_newline = c > 0, this.whitespace_before = d || "", this.parent = null, this.directives = null
        };
        return {run: a}
    }
});
(function ($) {
    $.FroalaEditor.PLUGINS.mediaManager = function (editor) {
        function onInsertFile() {
            new $.oc.mediaManager.popup({
                alias: 'ocmediamanager', cropAndInsertButton: false, onInsert: function (items) {
                    if (!items.length) {
                        $.oc.alert($.oc.lang.get('mediamanager.invalid_file_empty_insert'))
                        return
                    }
                    if (items.length > 1) {
                        $.oc.alert($.oc.lang.get('mediamanager.invalid_file_single_insert'))
                        return
                    }
                    var link, text = editor.selection.text(), textIsEmpty = $.trim(text) === ''
                    for (var i = 0, len = items.length; i < len; i++) {
                        var text = textIsEmpty ? items[i].title : text
                        link = items[i].publicUrl
                    }
                    editor.events.focus(true);
                    editor.selection.restore();
                    editor.html.insert('<a href="' + link + '" id="fr-inserted-file" class="fr-file">' + text + '</a>');
                    var $file = editor.$el.find('#fr-inserted-file');
                    $file.removeAttr('id');
                    editor.undo.saveStep()
                    this.hide()
                }
            })
        }

        function onInsertImage() {
            var $currentImage = editor.image.get()
            new $.oc.mediaManager.popup({
                alias: 'ocmediamanager', cropAndInsertButton: true, onInsert: function (items) {
                    if (!items.length) {
                        $.oc.alert($.oc.lang.get('mediamanager.invalid_image_empty_insert'))
                        return
                    }
                    var imagesInserted = 0
                    for (var i = 0, len = items.length; i < len; i++) {
                        if (items[i].documentType !== 'image') {
                            $.oc.alert($.oc.lang.get('mediamanager.invalid_image_invalid_insert', 'The file "' + items[i].title + '" is not an image.'))
                            continue
                        }
                        editor.image.insert(items[i].publicUrl, false, {}, $currentImage)
                        imagesInserted++
                        if (imagesInserted == 1) {
                            $currentImage = null
                        }
                    }
                    if (imagesInserted !== 0) {
                        this.hide()
                        editor.undo.saveStep()
                    }
                }
            })
        }

        function onInsertVideo() {
            new $.oc.mediaManager.popup({
                alias: 'ocmediamanager', cropAndInsertButton: false, onInsert: function (items) {
                    if (!items.length) {
                        $.oc.alert($.oc.lang.get('mediamanager.invalid_video_empty_insert'))
                        return
                    }
                    if (items.length > 1) {
                        $.oc.alert($.oc.lang.get('mediamanager.invalid_file_single_insert'))
                        return
                    }
                    var item = items[0]
                    if (item.documentType !== 'video') {
                        $.oc.alert($.oc.lang.get('mediamanager.invalid_video_invalid_insert', 'The file "' + item.title + '" is not a video.'))
                        return
                    }
                    var $richEditorNode = editor.$el.closest('[data-control="richeditor"]')
                    $richEditorNode.richEditor('insertVideo', item.publicUrl, item.title)
                    this.hide()
                }
            })
        }

        function onInsertAudio() {
            new $.oc.mediaManager.popup({
                alias: 'ocmediamanager', cropAndInsertButton: false, onInsert: function (items) {
                    if (!items.length) {
                        $.oc.alert($.oc.lang.get('mediamanager.invalid_audio_empty_insert'))
                        return
                    }
                    if (items.length > 1) {
                        $.oc.alert($.oc.lang.get('mediamanager.invalid_file_single_insert'))
                        return
                    }
                    var item = items[0]
                    if (item.documentType !== 'audio') {
                        $.oc.alert($.oc.lang.get('mediamanager.invalid_audio_invalid_insert', 'The file "' + item.title + '" is not an audio file.'))
                        return
                    }
                    var $richEditorNode = editor.$el.closest('[data-control="richeditor"]')
                    $richEditorNode.richEditor('insertAudio', item.publicUrl, item.title)
                    this.hide()
                }
            })
        }

        function _insertVideoFallback(link) {
            var $richEditorNode = editor.$el.closest('[data-control="richeditor"]')
            var title = link.substring(link.lastIndexOf('/') + 1)
            $richEditorNode.richEditor('insertVideo', link, title)
            editor.popups.hide('video.insert')
        }

        function _insertAudioFallback(link) {
            var $richEditorNode = editor.$el.closest('[data-control="richeditor"]')
            var title = link.substring(link.lastIndexOf('/') + 1)
            $richEditorNode.richEditor('insertAudio', link, title)
            editor.popups.hide('audio.insert')
        }

        function _init() {
            editor.events.on('destroy', _destroy, true)
            editor.events.on('video.linkError', _insertVideoFallback)
            editor.events.on('audio.linkError', _insertAudioFallback)
        }

        function _destroy() {
        }

        return {
            _init: _init,
            insertFile: onInsertFile,
            insertImage: onInsertImage,
            insertVideo: onInsertVideo,
            insertAudio: onInsertAudio
        }
    }
    if (!$.FE.PLUGINS.link || !$.FE.PLUGINS.file || !$.FE.PLUGINS.image || !$.FE.PLUGINS.video) {
        throw new Error('Media manager plugin requires link, file, image and video plugin.');
    }
    $.FE.DEFAULTS.imageInsertButtons.push('mmImageManager');
    $.FE.RegisterCommand('mmImageManager', {
        title: 'Browse', undo: false, focus: false, callback: function () {
            this.mediaManager.insertImage();
        }, plugin: 'mediaManager'
    })
    $.FE.DefineIcon('mmImageManager', {NAME: 'folder'});
    $.FE.DEFAULTS.fileInsertButtons.push('mmFileManager');
    $.FE.RegisterCommand('mmFileManager', {
        title: 'Browse', undo: false, focus: false, callback: function () {
            this.mediaManager.insertFile();
        }, plugin: 'mediaManager'
    })
    $.FE.DefineIcon('mmFileManager', {NAME: 'folder'});
    $.FE.DEFAULTS.videoInsertButtons.push('mmVideoManager');
    $.FE.RegisterCommand('mmVideoManager', {
        title: 'Browse', undo: false, focus: false, callback: function () {
            this.mediaManager.insertVideo();
        }, plugin: 'mediaManager'
    })
    $.FE.DefineIcon('mmVideoManager', {NAME: 'folder'});
    $.FE.DEFAULTS.audioInsertButtons.push('mmAudioManager');
    $.FE.RegisterCommand('mmAudioManager', {
        title: 'Browse', undo: false, focus: false, callback: function () {
            this.mediaManager.insertAudio();
        }, plugin: 'mediaManager'
    })
    $.FE.DefineIcon('mmAudioManager', {NAME: 'folder'});
})(jQuery);
var richeditorPageLinksPlugin

function richeditorPageLinksSelectPage($form) {
    richeditorPageLinksPlugin.setLinkValueFromPopup($form)
}

$.FroalaEditor.DEFAULTS = $.extend($.FroalaEditor.DEFAULTS, {pageLinksHandler: 'onLoadPageLinksForm'});
$.FroalaEditor.DEFAULTS.key = 'HHMDUGENKACTMXQL==';
(function ($) {
    $.FroalaEditor.PLUGINS.pageLinks = function (editor) {
        function setLinkValueFromPopup($form) {
            var $select = $('select[name=pagelink]', $form)
            var link = {text: $('option:selected', $select).text().trim(), href: $select.val()}
            setTimeout(function () {
                editor.popups.show('link.insert')
                setLinkValue(link)
            }, 300)
        }

        function setLinkValue(link) {
            var $popup = editor.popups.get('link.insert');
            var text_inputs = $popup.find('input.fr-link-attr[type="text"]');
            var check_inputs = $popup.find('input.fr-link-attr[type="checkbox"]');
            var $input;
            var i;
            for (i = 0; i < text_inputs.length; i++) {
                $input = $(text_inputs[i]);
                if (link[$input.attr('name')]) {
                    $input.val(link[$input.attr('name')]);
                }
                else if ($input.attr('name') != 'text') {
                    $input.val('');
                }
            }
            for (i = 0; i < check_inputs.length; i++) {
                $input = $(check_inputs[i]);
                $input.prop('checked', $input.data('checked') == link[$input.attr('name')]);
            }
        }

        function insertLink() {
            richeditorPageLinksPlugin = this
            editor.$el.popup({handler: editor.opts.pageLinksHandler})
        }

        function _init() {
        }

        return {
            _init: _init,
            setLinkValueFromPopup: setLinkValueFromPopup,
            setLinkValue: setLinkValue,
            insertLink: insertLink
        }
    }
    $.FE.DEFAULTS.linkInsertButtons = ['linkBack', '|', 'linkPageLinks']
    $.FE.RegisterCommand('linkPageLinks', {
        title: 'Choose Link', undo: false, focus: false, callback: function () {
            this.pageLinks.insertLink()
        }, plugin: 'pageLinks'
    })
    $.FE.DefineIcon('linkPageLinks', {NAME: 'search'});
})(jQuery);
(function ($) {
    $.FroalaEditor.PLUGINS.figures = function (editor) {
        function insertElement($el) {
            var html = $('<div />').append($el.clone()).remove().html()
            editor.events.focus(true)
            editor.selection.restore()
            editor.html.insert(html)
            editor.html.cleanEmptyTags()
            $('figure', editor.$el).each(function () {
                var $this = $(this), $parent = $this.parent('p'), $next = $this.next('p')
                if (!!$parent.length) {
                    $this.insertAfter($parent)
                }
                if (!!$next.length && $.trim($next.text()).length == 0) {
                    $next.remove()
                }
            })
            editor.undo.saveStep()
        }

        function _makeUiBlockElement() {
            var $node = $('<figure contenteditable="false" tabindex="0" data-ui-block="true">&nbsp;</figure>')
            $node.get(0).contentEditable = false
            return $node
        }

        function insertVideo(url, text) {
            var $node = _makeUiBlockElement()
            $node.attr('data-video', url)
            $node.attr('data-label', text)
            insertElement($node)
        }

        function insertAudio(url, text) {
            var $node = _makeUiBlockElement()
            $node.attr('data-audio', url)
            $node.attr('data-label', text)
            insertElement($node)
        }

        function _initUiBlocks() {
            $('[data-video], [data-audio]', editor.$el).each(function () {
                $(this).addClass('fr-draggable').attr({
                    'data-ui-block': 'true',
                    'draggable': 'true',
                    'tabindex': '0'
                }).html('&nbsp;')
                this.contentEditable = false
            })
        }

        function _handleUiBlocksKeydown(ev) {
            if (ev.which == 40 || ev.which == 38 || ev.which == 8 || ev.which == 46) {
                var $block = $(editor.selection.element())
                if ($block.is('br')) {
                    $block = $block.parent()
                }
                if (!!$block.length) {
                    switch (ev.which) {
                        case 38:
                            _handleUiBlockCaretIn($block.prev())
                            break
                        case 40:
                            _handleUiBlockCaretIn($block.next())
                            break
                        case 46:
                            _handleUiBlockCaretClearEmpty($block.next(), $block)
                            break
                        case 8:
                            _handleUiBlockCaretClearEmpty($block.prev(), $block)
                            break
                    }
                }
            }
        }

        function _handleUiBlockCaretClearEmpty($block, $p) {
            if ($block.attr('data-ui-block') !== undefined && $.trim($p.text()).length == 0) {
                $p.remove()
                _handleUiBlockCaretIn($block)
                editor.undo.saveStep()
            }
        }

        function _handleUiBlockCaretIn($block) {
            if ($block.attr('data-ui-block') !== undefined) {
                $block.focus()
                editor.selection.clear()
                return true
            }
            return false
        }

        function _uiBlockKeyDown(ev, block) {
            if (ev.which == 40 || ev.which == 38 || ev.which == 13 || ev.which == 8 || ev.which == 46) {
                switch (ev.which) {
                    case 40:
                        _focusUiBlockOrText($(block).next(), true)
                        break
                    case 38:
                        _focusUiBlockOrText($(block).prev(), false)
                        break
                    case 13:
                        var $paragraph = $('<p><br/></p>')
                        $paragraph.insertAfter(block)
                        editor.selection.setAfter(block)
                        editor.selection.restore()
                        editor.undo.saveStep()
                        break
                    case 8:
                    case 46:
                        var $nextFocus = $(block).next(), gotoStart = true
                        if ($nextFocus.length == 0) {
                            $nextFocus = $(block).prev()
                            gotoStart = false
                        }
                        _focusUiBlockOrText($nextFocus, gotoStart)
                        $(block).remove()
                        editor.undo.saveStep()
                        break
                }
                ev.preventDefault()
            }
        }

        function _focusUiBlockOrText($block, gotoStart) {
            if (!!$block.length) {
                if (!_handleUiBlockCaretIn($block)) {
                    if (gotoStart) {
                        editor.selection.setAtStart($block.get(0))
                        editor.selection.restore()
                    }
                    else {
                        editor.selection.setAtEnd($block.get(0))
                        editor.selection.restore()
                    }
                }
            }
        }

        function _onKeydown(ev) {
            _handleUiBlocksKeydown(ev)
            if (ev.isDefaultPrevented()) {
                return false
            }
        }

        function _onFigureKeydown(ev) {
            if (ev.target && $(ev.target).attr('data-ui-block') !== undefined) {
                _uiBlockKeyDown(ev, ev.target)
            }
            if (ev.isDefaultPrevented()) {
                return false
            }
        }

        function _onSync(html) {
            var $domTree = $('<div>' + html + '</div>')
            $domTree.find('[data-video], [data-audio]').each(function () {
                $(this).removeAttr('contenteditable data-ui-block tabindex draggable').removeClass('fr-draggable fr-dragging')
            })
            return $domTree.html()
        }

        function _init() {
            editor.events.on('initialized', _initUiBlocks)
            editor.events.on('html.set', _initUiBlocks)
            editor.events.on('html.get', _onSync)
            editor.events.on('keydown', _onKeydown)
            editor.events.on('destroy', _destroy, true)
            editor.$el.on('keydown', 'figure', _onFigureKeydown)
        }

        function _destroy() {
            editor.$el.off('keydown', 'figure', _onFigureKeydown)
        }

        return {_init: _init, insert: insertElement, insertVideo: insertVideo, insertAudio: insertAudio}
    }
})(jQuery);
+function ($) {
    "use strict";
    var Base = $.oc.foundation.base, BaseProto = Base.prototype
    var RichEditor = function (element, options) {
        this.options = options
        this.$el = $(element)
        this.$textarea = this.$el.find('>textarea:first')
        this.$form = this.$el.closest('form')
        this.editor = null
        $.oc.foundation.controlUtils.markDisposable(element)
        Base.call(this)
        this.init()
    }
    RichEditor.prototype = Object.create(BaseProto)
    RichEditor.prototype.constructor = RichEditor
    RichEditor.DEFAULTS = {
        linksHandler: null,
        stylesheet: null,
        fullpage: true,
        editorLang: 'en',
        toolbarButtons: null,
        allowEmptyTags: null,
        allowTags: null,
        noWrapTags: null,
        removeTags: null,
        lineBreakerTags: null,
        imageStyles: null,
        linkStyles: null,
        paragraphStyles: null,
        tableStyles: null,
        tableCellStyles: null,
        aceVendorPath: '/',
        readOnly: false
    }
    RichEditor.prototype.init = function () {
        var self = this;
        this.$el.one('dispose-control', this.proxy(this.dispose))
        if (!this.$textarea.attr('id')) {
            this.$textarea.attr('id', 'element-' + Math.random().toString(36).substring(7))
        }
        this.initFroala()
    }
    RichEditor.prototype.initFroala = function () {
        var froalaOptions = {
            editorClass: 'control-richeditor',
            language: this.options.editorLang,
            fullPage: this.options.fullpage,
            pageLinksHandler: this.options.linksHandler,
            aceEditorVendorPath: this.options.aceVendorPath,
            toolbarSticky: false
        }
        if (this.options.toolbarButtons) {
            froalaOptions.toolbarButtons = this.options.toolbarButtons.split(',')
        }
        else {
            froalaOptions.toolbarButtons = $.oc.richEditorButtons
        }
        froalaOptions.imageStyles = this.options.imageStyles ? this.options.imageStyles : {
            'oc-img-rounded': 'Rounded',
            'oc-img-bordered': 'Bordered'
        }
        froalaOptions.linkStyles = this.options.linkStyles ? this.options.linkStyles : {
            'oc-link-green': 'Green',
            'oc-link-strong': 'Thick'
        }
        froalaOptions.paragraphStyles = this.options.paragraphStyles ? this.options.paragraphStyles : {
            'oc-text-gray': 'Gray',
            'oc-text-bordered': 'Bordered',
            'oc-text-spaced': 'Spaced',
            'oc-text-uppercase': 'Uppercase'
        }
        froalaOptions.tableStyles = this.options.tableStyles ? this.options.tableStyles : {
            'oc-dashed-borders': 'Dashed Borders',
            'oc-alternate-rows': 'Alternate Rows'
        }
        froalaOptions.tableCellStyles = this.options.tableCellStyles ? this.options.tableCellStyles : {
            'oc-cell-highlighted': 'Highlighted',
            'oc-cell-thick-border': 'Thick'
        }
        froalaOptions.toolbarButtonsMD = froalaOptions.toolbarButtons
        froalaOptions.toolbarButtonsSM = froalaOptions.toolbarButtons
        froalaOptions.toolbarButtonsXS = froalaOptions.toolbarButtons
        if (this.options.htmlAllowedEmptyTags) {
            froalaOptions.allowEmptyTags = this.options.htmlAllowedEmptyTags.split(/[\s,]+/)
        }
        if (this.options.allowTags) {
            froalaOptions.htmlAllowedTags = this.options.allowTags.split(/[\s,]+/)
        }
        froalaOptions.htmlDoNotWrapTags = this.options.noWrapTags ? this.options.noWrapTags.split(/[\s,]+/) : ['figure', 'script', 'style']
        if (this.options.removeTags) {
            froalaOptions.htmlRemoveTags = this.options.removeTags.split(/[\s,]+/)
        }
        froalaOptions.lineBreakerTags = this.options.lineBreakerTags ? this.options.lineBreakerTags.split(/[\s,]+/) : ['figure,table,hr,iframe,form,dl']
        froalaOptions.shortcutsEnabled = ['show', 'bold', 'italic', 'underline', 'indent', 'outdent', 'undo', 'redo']
        froalaOptions.imageUploadURL = froalaOptions.fileUploadURL = window.location
        froalaOptions.imageUploadParam = froalaOptions.fileUploadParam = 'file_data'
        froalaOptions.imageUploadParams = froalaOptions.fileUploadParams = {X_OCTOBER_MEDIA_MANAGER_QUICK_UPLOAD: 1}
        var placeholder = this.$textarea.attr('placeholder')
        froalaOptions.placeholderText = placeholder ? placeholder : ''
        froalaOptions.height = this.$el.hasClass('stretch') ? Infinity : $('.height-indicator', this.$el).height()
        $.FroalaEditor.ICON_TEMPLATES = {
            font_awesome: '<i class="icon-[NAME]"></i>',
            text: '<span style="text-align: center;">[NAME]</span>',
            image: '<img src=[SRC] alt=[ALT] />'
        }
        this.$textarea.on('froalaEditor.initialized', this.proxy(this.build))
        this.$textarea.on('froalaEditor.contentChanged', this.proxy(this.onChange))
        this.$textarea.on('froalaEditor.keydown', this.proxy(this.onKeydown))
        this.$textarea.on('froalaEditor.html.get', this.proxy(this.onSyncContent))
        this.$textarea.on('froalaEditor.html.set', this.proxy(this.onSetContent))
        this.$form.on('oc.beforeRequest', this.proxy(this.onFormBeforeRequest))
        this.$textarea.froalaEditor(froalaOptions)
        this.editor = this.$textarea.data('froala.editor')
        if (this.options.readOnly) {
            this.editor.edit.off()
        }
        this.$el.on('keydown', '.fr-view figure', this.proxy(this.onFigureKeydown))
    }
    RichEditor.prototype.dispose = function () {
        this.unregisterHandlers()
        this.$textarea.froalaEditor('destroy')
        this.$el.removeData('oc.richEditor')
        this.options = null
        this.$el = null
        this.$textarea = null
        this.$form = null
        this.editor = null
        BaseProto.dispose.call(this)
    }
    RichEditor.prototype.unregisterHandlers = function () {
        this.$el.off('keydown', '.fr-view figure', this.proxy(this.onFigureKeydown))
        this.$textarea.off('froalaEditor.initialized', this.proxy(this.build))
        this.$textarea.off('froalaEditor.contentChanged', this.proxy(this.onChange))
        this.$textarea.off('froalaEditor.keydown', this.proxy(this.onKeydown))
        this.$textarea.off('froalaEditor.html.get', this.proxy(this.onSyncContent))
        this.$textarea.off('froalaEditor.html.set', this.proxy(this.onSetContent))
        this.$form.off('oc.beforeRequest', this.proxy(this.onFormBeforeRequest))
        $(window).off('resize', this.proxy(this.updateLayout))
        $(window).off('oc.updateUi', this.proxy(this.updateLayout))
        this.$el.off('dispose-control', this.proxy(this.dispose))
    }
    RichEditor.prototype.build = function (event, editor) {
        this.updateLayout()
        $(window).on('resize', this.proxy(this.updateLayout))
        $(window).on('oc.updateUi', this.proxy(this.updateLayout))
        this.$textarea.trigger('init.oc.richeditor', [this])
    }
    RichEditor.prototype.isCodeViewActive = function () {
        return this.editor && this.editor.codeView && this.editor.codeView.isActive()
    }
    RichEditor.prototype.getElement = function () {
        return this.$el
    }
    RichEditor.prototype.getEditor = function () {
        return this.editor
    }
    RichEditor.prototype.getTextarea = function () {
        return this.$textarea
    }
    RichEditor.prototype.getContent = function () {
        return this.editor.html.get()
    }
    RichEditor.prototype.setContent = function (html) {
        this.editor.html.set(html)
    }
    RichEditor.prototype.syncContent = function () {
        this.editor.events.trigger('contentChanged')
    }
    RichEditor.prototype.updateLayout = function () {
        var $editor = $('.fr-wrapper', this.$el), $codeEditor = $('.fr-code', this.$el),
            $toolbar = $('.fr-toolbar', this.$el), $box = $('.fr-box', this.$el)
        if (!$editor.length) {
            return
        }
        if (this.$el.hasClass('stretch') && !$box.hasClass('fr-fullscreen')) {
            var height = $toolbar.outerHeight(true)
            $editor.css('top', height + 1)
            $codeEditor.css('top', height)
        }
        else {
            $editor.css('top', '')
            $codeEditor.css('top', '')
        }
    }
    RichEditor.prototype.insertHtml = function (html) {
        this.editor.html.insert(html)
        this.editor.selection.restore()
    }
    RichEditor.prototype.insertElement = function ($el) {
        this.insertHtml($('<div />').append($el.clone()).remove().html())
    }
    RichEditor.prototype.insertUiBlock = function ($node) {
        this.$textarea.froalaEditor('figures.insert', $node)
    }
    RichEditor.prototype.insertVideo = function (url, title) {
        this.$textarea.froalaEditor('figures.insertVideo', url, title)
    }
    RichEditor.prototype.insertAudio = function (url, title) {
        this.$textarea.froalaEditor('figures.insertAudio', url, title)
    }
    RichEditor.prototype.onSetContent = function (ev, editor) {
        this.$textarea.trigger('setContent.oc.richeditor', [this])
    }
    RichEditor.prototype.onSyncContent = function (ev, editor, html) {
        if (editor.codeBeautifier) {
            html = editor.codeBeautifier.run(html, editor.opts.codeBeautifierOptions)
        }
        var container = {html: html}
        this.$textarea.trigger('syncContent.oc.richeditor', [this, container])
        return container.html
    }
    RichEditor.prototype.onFocus = function () {
        this.$el.addClass('editor-focus')
    }
    RichEditor.prototype.onBlur = function () {
        this.$el.removeClass('editor-focus')
    }
    RichEditor.prototype.onFigureKeydown = function (ev) {
        this.$textarea.trigger('figureKeydown.oc.richeditor', [ev, this])
    }
    RichEditor.prototype.onKeydown = function (ev, editor, keyEv) {
        this.$textarea.trigger('keydown.oc.richeditor', [keyEv, this])
        if (ev.isDefaultPrevented()) {
            return false
        }
    }
    RichEditor.prototype.onChange = function (ev) {
        this.$form.trigger('change')
    }
    RichEditor.prototype.onFormBeforeRequest = function (ev) {
        if (!this.editor) {
            return
        }
        if (this.isCodeViewActive()) {
            this.editor.html.set(this.editor.codeView.get())
        }
        this.$textarea.val(this.editor.html.get())
    }
    var old = $.fn.richEditor
    $.fn.richEditor = function (option) {
        var args = Array.prototype.slice.call(arguments, 1), result
        this.each(function () {
            var $this = $(this)
            var data = $this.data('oc.richEditor')
            var options = $.extend({}, RichEditor.DEFAULTS, $this.data(), typeof option == 'object' && option)
            if (!data) $this.data('oc.richEditor', (data = new RichEditor(this, options)))
            if (typeof option == 'string') result = data[option].apply(data, args)
            if (typeof result != 'undefined') return false
        })
        return result ? result : this
    }
    $.fn.richEditor.Constructor = RichEditor
    $.fn.richEditor.noConflict = function () {
        $.fn.richEditor = old
        return this
    }
    $(document).render(function () {
        $('[data-control="richeditor"]').richEditor()
    })
    if ($.oc === undefined)
        $.oc = {}
    $.oc.richEditorButtons = ['paragraphFormat', 'paragraphStyle', 'quote', 'bold', 'italic', 'align', 'formatOL', 'formatUL', 'insertTable', 'insertLink', 'insertImage', 'insertVideo', 'insertAudio', 'insertFile', 'insertHR', 'fullscreen', 'html']
}(window.jQuery);
