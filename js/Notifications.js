! function (t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.Notifications = e() : t.Notifications = e()
}(window, function () {
    return function (t) {
        var e = {};

        function i(n) {
            if (e[n]) return e[n].exports;
            var o = e[n] = {
                i: n,
                l: !1,
                exports: {}
            };
            return t[n].call(o.exports, o, o.exports, i), o.l = !0, o.exports
        }
        return i.m = t, i.c = e, i.d = function (t, e, n) {
            i.o(t, e) || Object.defineProperty(t, e, {
                enumerable: !0,
                get: n
            })
        }, i.r = function (t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(t, "__esModule", {
                value: !0
            })
        }, i.t = function (t, e) {
            if (1 & e && (t = i(t)), 8 & e) return t;
            if (4 & e && "object" == typeof t && t && t.__esModule) return t;
            var n = Object.create(null);
            if (i.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
                for (var o in t) i.d(n, o, function (e) {
                    return t[e]
                }.bind(null, o));
            return n
        }, i.n = function (t) {
            var e = t && t.__esModule ? function () {
                return t.default
            } : function () {
                return t
            };
            return i.d(e, "a", e), e
        }, i.o = function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }, i.p = "", i(i.s = 0)
    }([function (t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), i(1);
        var n = i(3);
        e.default = n.Notifications
    }, function (t, e, i) { }, , function (t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var n = function () {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function (e, i, n) {
                return i && t(e.prototype, i), n && t(e, n), e
            }
        }();
        e.Notifications = function () {
            function t() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ".notification",
                    i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                ! function (t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.selector = e, this.options = {
                    animationInName: "slidein",
                    animationOutSelf: "slideout 1s",
                    animationOutClose: "fadeout 1s",
                    closeButtonSelector: ".delete",
                    closeSelfOnClick: !0,
                    startTopPosition: 8,
                    gap: 8,
                    delayFunction: function (t) {
                        return 3 + 2 * t
                    },
                    topTransition: "top .75s ease-in-out"
                }, this.extendDefaults(i)
            }
            return n(t, [{
                key: "extendDefaults",
                value: function (t) {
                    var e = this;
                    Object.keys(t).forEach(function (i) {
                        e.options.hasOwnProperty(i) && (e.options[i] = t[i])
                    })
                }
            }, {
                key: "init",
                value: function () {
                    var t = this;
                    this.onload(), document.addEventListener("animationstart", function (e) {
                        t.onStartHandler(e)
                    })
                }
            }, {
                key: "onload",
                value: function () {
                    var t = this;
                    this.setTopPositions(), this.allNotifications().forEach(function (e, i) {
                        t.setNotification(e, .5 + i + "s")
                    })
                }
            }, {
                key: "isSelfClosing",
                value: function (t) {
                    return "self" === t.getAttribute("data-close")
                }
            }, {
                key: "onStartHandler",
                value: function (t) {
                    this.needsActivation(t.target) && (this.setTopPositions(), this.setNotification(t.target))
                }
            }, {
                key: "allNotifications",
                value: function () {
                    return Array.prototype.slice.call(document.querySelectorAll(this.selector))
                }
            }, {
                key: "setTopPositions",
                value: function () {
                    var t = this,
                        e = this.options.startTopPosition;
                    this.allNotifications().forEach(function (i) {
                        i.style.top = e + "px", e += i.offsetHeight + t.options.gap, t.needsResume(i) && t.addExitAnimation(i)
                    })
                }
            }, {
                key: "inView",
                value: function (t) {
                    return parseInt(getComputedStyle(t).top) < window.innerHeight
                }
            }, {
                key: "isPaused",
                value: function (t) {
                    return "true" === t.getAttribute("data-paused")
                }
            }, {
                key: "needsResume",
                value: function (t) {
                    return this.isPaused(t) && this.inView(t)
                }
            }, {
                key: "isNotification",
                value: function (t) {
                    return this.allNotifications().indexOf(t) > -1
                }
            }, {
                key: "needsActivation",
                value: function (t) {
                    return "active" !== t.getAttribute("data-notification") && this.isNotification(t)
                }
            }, {
                key: "setNotification",
                value: function (t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    e && (t.style.animationDelay = e), this.setListeners(t), t.setAttribute("data-notification", "active"), t.style.transition = this.options.topTransition
                }
            }, {
                key: "setListeners",
                value: function (t) {
                    var e = this;
                    t.addEventListener("animationend", function (t) {
                        e.removeMe(t)
                    });
                    var i = t.querySelector(this.options.closeButtonSelector);
                    this.options.closeSelfOnClick && this.isSelfClosing(t) && (i = i || t), i && i.addEventListener("click", function (t) {
                        e.close(t)
                    })
                }
            }, {
                key: "close",
                value: function (t) {
                    (this.isNotification(t.currentTarget) ? t.currentTarget : t.currentTarget.parentNode).style.animation = this.options.animationOutClose
                }
            }, {
                key: "removeMe",
                value: function (t) {
                    var e = t.currentTarget;
                    this.options.animationInName === t.animationName && this.isSelfClosing(e) ? this.addExitAnimation(e) : (this.options.animationOutClose.split(" ").indexOf(t.animationName) > -1 || this.options.animationOutSelf.split(" ").indexOf(t.animationName) > -1) && (e.parentNode.removeChild(e), this.setTopPositions())
                }
            }, {
                key: "addExitAnimation",
                value: function (t) {
                    if (this.inView(t)) {
                        t.setAttribute("data-paused", !1);
                        var e = this.options.delayFunction(this.allNotifications().indexOf(t), t);
                        t.style.animation = this.options.animationOutSelf, t.style.animationDelay = e + "s"
                    } else t.setAttribute("data-paused", !0)
                }
            }]), t
        }()
    }]).default
});