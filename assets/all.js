function initSounds() {
	$("#sound-toggle").click(function(t) {
		t.preventDefault(), $(this).hasClass("on") ? ($(this).removeClass("on"), $(this).html("Sound Off"), soundOn = !1) : ($(this).addClass("on"), $(this).html("Sound On"), soundOn = !0)
	})
}
function editorFunctions() {
	$(".video-link").click(function(t) {
		t.preventDefault();
		var e = $(this).data("video");
		ga("send", "event", {
			eventCategory: "button",
			eventAction: "videoPlay",
			eventLabel: e
		});
		var i = '<div class="video-container"><iframe width="560" height="315" src="https://www.youtube.com/embed/' + e + '?autoplay=1" frameborder="0" allowfullscreen></iframe></div>';
		$.featherlight(i, {})
	})
}
function reactToKeypress(t) {
	soundOn && !intro && playAudio()
}
function playAudio() {}
function changeBackground() {
	hideAll(), 8 == e.which || 46 == e.which ? $(".type-red").css({
		opacity: 0
	}).show().css({
		opacity: .3
	}).fadeOut(300) : ($(".img" + currentBG).stop().fadeIn(300, function() {
		$(this).fadeOut(2e3)
	}), currentBG++, currentBG > $(".type-img").length && (currentBG = 1))
}
function hideAll() {
	$(".type-red").hide();
	for (var t = $(".type-img").length, e = 1; t >= e; e++) $(".img" + e).hide()
}
function resizeMe() {
	WW = $(window).width(), WH = $(window).height();
	var t = 548;
	t > WH ? ($(".editor").height(t), $("#top").height(t), $("html,body").css("overflow-y", "auto")) : ($(".editor").height(WH), $("#top").height(WH))
}
var fabric = fabric || {
	version: "1.5.0"
};
if ("undefined" != typeof exports && (exports.fabric = fabric), "undefined" != typeof document && "undefined" != typeof window ? (fabric.document = document, fabric.window = window, window.fabric = fabric) : (fabric.document = require("jsdom").jsdom("<!DOCTYPE html><html><head></head><body></body></html>"), fabric.document.createWindow ? fabric.window = fabric.document.createWindow() : fabric.window = fabric.document.parentWindow), fabric.isTouchSupported = "ontouchstart" in fabric.document.documentElement, fabric.isLikelyNode = "undefined" != typeof Buffer && "undefined" == typeof window, fabric.DPI = 96, fabric.reNum = "(?:[-+]?(?:\\d+|\\d*\\.\\d+)(?:e[-+]?\\d+)?)", fabric.devicePixelRatio = fabric.window.devicePixelRatio || fabric.window.webkitDevicePixelRatio || fabric.window.mozDevicePixelRatio || 1, "object" != typeof JSON && (JSON = {}), function() {
	"use strict";

	function f(t) {
		return 10 > t ? "0" + t : t
	}
	function quote(t) {
		return escapable.lastIndex = 0, escapable.test(t) ? '"' + t.replace(escapable, function(t) {
			var e = meta[t];
			return "string" == typeof e ? e : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
		}) + '"' : '"' + t + '"'
	}
	function str(t, e) {
		var i, n, r, o, s, a = gap,
			c = e[t];
		switch (c && "object" == typeof c && "function" == typeof c.toJSON && (c = c.toJSON(t)), "function" == typeof rep && (c = rep.call(e, t, c)), typeof c) {
			case "string":
				return quote(c);
			case "number":
				return isFinite(c) ? String(c) : "null";
			case "boolean":
			case "null":
				return String(c);
			case "object":
				if (!c) return "null";
				if (gap += indent, s = [], "[object Array]" === Object.prototype.toString.apply(c)) {
					for (o = c.length, i = 0; o > i; i += 1) s[i] = str(i, c) || "null";
					return r = 0 === s.length ? "[]" : gap ? "[\n" + gap + s.join(",\n" + gap) + "\n" + a + "]" : "[" + s.join(",") + "]", gap = a, r
				}
				if (rep && "object" == typeof rep) for (o = rep.length, i = 0; o > i; i += 1) "string" == typeof rep[i] && (n = rep[i], r = str(n, c), r && s.push(quote(n) + (gap ? ": " : ":") + r));
				else for (n in c) Object.prototype.hasOwnProperty.call(c, n) && (r = str(n, c), r && s.push(quote(n) + (gap ? ": " : ":") + r));
				return r = 0 === s.length ? "{}" : gap ? "{\n" + gap + s.join(",\n" + gap) + "\n" + a + "}" : "{" + s.join(",") + "}", gap = a, r
		}
	}
	"function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
		return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
	}, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
		return this.valueOf()
	});
	var cx, escapable, gap, indent, meta, rep;
	"function" != typeof JSON.stringify && (escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, meta = {
		"\b": "\\b",
		"	": "\\t",
		"\n": "\\n",
		"\f": "\\f",
		"\r": "\\r",
		'"': '\\"',
		"\\": "\\\\"
	}, JSON.stringify = function(t, e, i) {
		var n;
		if (gap = "", indent = "", "number" == typeof i) for (n = 0; i > n; n += 1) indent += " ";
		else "string" == typeof i && (indent = i);
		if (rep = e, e && "function" != typeof e && ("object" != typeof e || "number" != typeof e.length)) throw new Error("JSON.stringify");
		return str("", {
			"": t
		})
	}), "function" != typeof JSON.parse && (cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, JSON.parse = function(text, reviver) {
		function walk(t, e) {
			var i, n, r = t[e];
			if (r && "object" == typeof r) for (i in r) Object.prototype.hasOwnProperty.call(r, i) && (n = walk(r, i), void 0 !== n ? r[i] = n : delete r[i]);
			return reviver.call(t, e, r)
		}
		var j;
		if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(t) {
			return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
		})), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
			"": j
		}, "") : j;
		throw new SyntaxError("JSON.parse")
	})
}(), "undefined" == typeof eventjs) var eventjs = {};
if (function(t) {
	"use strict";
	t.modifyEventListener = !1, t.modifySelectors = !1, t.configure = function(e) {
		isFinite(e.modifyEventListener) && (t.modifyEventListener = e.modifyEventListener), isFinite(e.modifySelectors) && (t.modifySelectors = e.modifySelectors), d === !1 && t.modifyEventListener && p(), g === !1 && t.modifySelectors && v()
	}, t.add = function(t, e, n, r) {
		return i(t, e, n, r, "add")
	}, t.remove = function(t, e, n, r) {
		return i(t, e, n, r, "remove")
	}, t.returnFalse = function(t) {
		return !1
	}, t.stop = function(t) {
		t && (t.stopPropagation && t.stopPropagation(), t.cancelBubble = !0, t.cancelBubbleCount = 0)
	}, t.prevent = function(t) {
		t && (t.preventDefault ? t.preventDefault() : t.preventManipulation ? t.preventManipulation() : t.returnValue = !1)
	}, t.cancel = function(e) {
		t.stop(e), t.prevent(e)
	}, t.blur = function() {
		var t = document.activeElement;
		if (t) {
			var e = document.activeElement.nodeName;
			("INPUT" === e || "TEXTAREA" === e || "true" === t.contentEditable) && t.blur && t.blur()
		}
	}, t.getEventSupport = function(t, e) {
		if ("string" == typeof t && (e = t, t = window), e = "on" + e, e in t) return !0;
		if (t.setAttribute || (t = document.createElement("div")), t.setAttribute && t.removeAttribute) {
			t.setAttribute(e, "");
			var i = "function" == typeof t[e];
			return "undefined" != typeof t[e] && (t[e] = null), t.removeAttribute(e), i
		}
	};
	var e = function(t) {
		if (!t || "object" != typeof t) return t;
		var i = new t.constructor;
		for (var n in t) t[n] && "object" == typeof t[n] ? i[n] = e(t[n]) : i[n] = t[n];
		return i
	}, i = function(o, s, h, d, p, g) {
		if (d = d || {}, "[object Object]" === String(o)) {
			var v = o;
			if (o = v.target, delete v.target, !v.type || !v.listener) {
				for (var m in v) {
					var b = v[m];
					"function" != typeof b && (d[m] = b)
				}
				var y = {};
				for (var _ in v) {
					var m = _.split(","),
						w = v[_],
						x = {};
					for (var S in d) x[S] = d[S];
					if ("function" == typeof w) var h = w;
					else {
						if ("function" != typeof w.listener) continue;
						var h = w.listener;
						for (var S in w) "function" != typeof w[S] && (x[S] = w[S])
					}
					for (var C = 0; C < m.length; C++) y[_] = eventjs.add(o, m[C], h, x, p)
				}
				return y
			}
			s = v.type, delete v.type, h = v.listener, delete v.listener;
			for (var _ in v) d[_] = v[_]
		}
		if (o && s && h) {
			if ("string" == typeof o && "ready" === s) {
				if (!window.eventjs_stallOnReady) {
					var k = (new Date).getTime(),
						T = d.timeout,
						E = d.interval || 1e3 / 60,
						O = window.setInterval(function() {
							(new Date).getTime() - k > T && window.clearInterval(O), document.querySelector(o) && (window.clearInterval(O), setTimeout(h, 1))
						}, E);
					return
				}
				s = "load", o = window
			}
			if ("string" == typeof o) {
				if (o = document.querySelectorAll(o), 0 === o.length) return r("Missing target on listener!", arguments);
				1 === o.length && (o = o[0])
			}
			var j, A = {};
			if (o.length > 0 && o !== window) {
				for (var I = 0, P = o.length; P > I; I++) j = i(o[I], s, h, e(d), p), j && (A[I] = j);
				return n(A)
			}
			if ("string" == typeof s && (s = s.toLowerCase(), -1 !== s.indexOf(" ") ? s = s.split(" ") : -1 !== s.indexOf(",") && (s = s.split(","))), "string" != typeof s) {
				if ("number" == typeof s.length) for (var L = 0, M = s.length; M > L; L++) j = i(o, s[L], h, e(d), p), j && (A[s[L]] = j);
				else for (var _ in s) j = "function" == typeof s[_] ? i(o, _, s[_], e(d), p) : i(o, _, s[_].listener, e(s[_]), p), j && (A[_] = j);
				return n(A)
			}
			if (0 === s.indexOf("on") && (s = s.substr(2)), "object" != typeof o) return r("Target is not defined!", arguments);
			if ("function" != typeof h) return r("Listener is not a function!", arguments);
			var D = d.useCapture || !1,
				R = l(o) + "." + l(h) + "." + (D ? 1 : 0);
			if (t.Gesture && t.Gesture._gestureHandlers[s]) {
				if (R = s + R, "remove" === p) {
					if (!c[R]) return;
					c[R].remove(), delete c[R]
				} else if ("add" === p) {
					if (c[R]) return c[R].add(), c[R];
					if (d.useCall && !t.modifyEventListener) {
						var F = h;
						h = function(t, e) {
							for (var i in e) t[i] = e[i];
							return F.call(o, t)
						}
					}
					d.gesture = s, d.target = o, d.listener = h, d.fromOverwrite = g, c[R] = t.proxy[s](d)
				}
				return c[R]
			}
			for (var B, U = a(s), C = 0; C < U.length; C++) if (s = U[C], B = s + "." + R, "remove" === p) {
				if (!c[B]) continue;
				o[f](s, h, D), delete c[B]
			} else if ("add" === p) {
				if (c[B]) return c[B];
				o[u](s, h, D), c[B] = {
					id: B,
					type: s,
					target: o,
					listener: h,
					remove: function() {
						for (var e = 0; e < U.length; e++) t.remove(o, U[e], h, d)
					}
				}
			}
			return c[B]
		}
	}, n = function(t) {
		return {
			remove: function() {
				for (var e in t) t[e].remove()
			},
			add: function() {
				for (var e in t) t[e].add()
			}
		}
	}, r = function(t, e) {
		"undefined" != typeof console && "undefined" != typeof console.error && console.error(t, e)
	}, o = {
		msPointer: ["MSPointerDown", "MSPointerMove", "MSPointerUp"],
		touch: ["touchstart", "touchmove", "touchend"],
		mouse: ["mousedown", "mousemove", "mouseup"]
	}, s = {
		MSPointerDown: 0,
		MSPointerMove: 1,
		MSPointerUp: 2,
		touchstart: 0,
		touchmove: 1,
		touchend: 2,
		mousedown: 0,
		mousemove: 1,
		mouseup: 2
	}, a = (function() {
		t.supports = {}, window.navigator.msPointerEnabled && (t.supports.msPointer = !0), t.getEventSupport("touchstart") && (t.supports.touch = !0), t.getEventSupport("mousedown") && (t.supports.mouse = !0)
	}(), function() {
		return function(e) {
			var i = document.addEventListener ? "" : "on",
				n = s[e];
			if (isFinite(n)) {
				var r = [];
				for (var a in t.supports) r.push(i + o[a][n]);
				return r
			}
			return [i + e]
		}
	}()),
		c = {}, h = 0,
		l = function(t) {
			return t === window ? "#window" : t === document ? "#document" : (t.uniqueID || (t.uniqueID = "e" + h++), t.uniqueID)
		}, u = document.addEventListener ? "addEventListener" : "attachEvent",
		f = document.removeEventListener ? "removeEventListener" : "detachEvent";
	t.createPointerEvent = function(e, i, n) {
		var r = i.gesture,
			o = i.target,
			s = e.changedTouches || t.proxy.getCoords(e);
		if (s.length) {
			var a = s[0];
			i.pointers = n ? [] : s, i.pageX = a.pageX, i.pageY = a.pageY, i.x = i.pageX, i.y = i.pageY
		}
		var c = document.createEvent("Event");
		c.initEvent(r, !0, !0), c.originalEvent = e;
		for (var h in i) "target" !== h && (c[h] = i[h]);
		var l = c.type;
		t.Gesture && t.Gesture._gestureHandlers[l] && i.oldListener.call(o, c, i, !1)
	};
	var d = !1,
		p = function() {
			if (window.HTMLElement) {
				var e = function(e) {
					var n = function(n) {
						var r = n + "EventListener",
							o = e[r];
						e[r] = function(e, r, s) {
							if (t.Gesture && t.Gesture._gestureHandlers[e]) {
								var c = s;
								"object" == typeof s ? c.useCall = !0 : c = {
									useCall: !0,
									useCapture: s
								}, i(this, e, r, c, n, !0)
							} else for (var h = a(e), l = 0; l < h.length; l++) o.call(this, h[l], r, s)
						}
					};
					n("add"), n("remove")
				};
				navigator.userAgent.match(/Firefox/) ? (e(HTMLDivElement.prototype), e(HTMLCanvasElement.prototype)) : e(HTMLElement.prototype), e(document), e(window)
			}
		}, g = !1,
		v = function() {
			var t = NodeList.prototype;
			t.removeEventListener = function(t, e, i) {
				for (var n = 0, r = this.length; r > n; n++) this[n].removeEventListener(t, e, i)
			}, t.addEventListener = function(t, e, i) {
				for (var n = 0, r = this.length; r > n; n++) this[n].addEventListener(t, e, i)
			}
		};
	return t
}(eventjs), "undefined" == typeof eventjs) var eventjs = {};
if ("undefined" == typeof eventjs.proxy && (eventjs.proxy = {}), eventjs.proxy = function(t) {
	"use strict";
	t.pointerSetup = function(t, e) {
		t.target = t.target || window, t.doc = t.target.ownerDocument || t.target, t.minFingers = t.minFingers || t.fingers || 1, t.maxFingers = t.maxFingers || t.fingers || 1 / 0, t.position = t.position || "relative", delete t.fingers, e = e || {}, e.enabled = !0, e.gesture = t.gesture, e.target = t.target, e.env = t.env, eventjs.modifyEventListener && t.fromOverwrite && (t.oldListener = t.listener, t.listener = eventjs.createPointerEvent);
		var i = 0,
			n = 0 === e.gesture.indexOf("pointer") && eventjs.modifyEventListener ? "pointer" : "mouse";
		return t.oldListener && (e.oldListener = t.oldListener), e.listener = t.listener, e.proxy = function(i) {
			e.defaultListener = t.listener, t.listener = i, i(t.event, e)
		}, e.add = function() {
			e.enabled !== !0 && (t.onPointerDown && eventjs.add(t.target, n + "down", t.onPointerDown), t.onPointerMove && eventjs.add(t.doc, n + "move", t.onPointerMove), t.onPointerUp && eventjs.add(t.doc, n + "up", t.onPointerUp), e.enabled = !0)
		}, e.remove = function() {
			e.enabled !== !1 && (t.onPointerDown && eventjs.remove(t.target, n + "down", t.onPointerDown), t.onPointerMove && eventjs.remove(t.doc, n + "move", t.onPointerMove), t.onPointerUp && eventjs.remove(t.doc, n + "up", t.onPointerUp), e.reset(), e.enabled = !1)
		}, e.pause = function(e) {
			!t.onPointerMove || e && !e.move || eventjs.remove(t.doc, n + "move", t.onPointerMove), !t.onPointerUp || e && !e.up || eventjs.remove(t.doc, n + "up", t.onPointerUp), i = t.fingers, t.fingers = 0
		}, e.resume = function(e) {
			!t.onPointerMove || e && !e.move || eventjs.add(t.doc, n + "move", t.onPointerMove), !t.onPointerUp || e && !e.up || eventjs.add(t.doc, n + "up", t.onPointerUp), t.fingers = i
		}, e.reset = function() {
			t.tracker = {}, t.fingers = 0
		}, e
	};
	var e = eventjs.supports;
	eventjs.isMouse = !! e.mouse, eventjs.isMSPointer = !! e.touch, eventjs.isTouch = !! e.msPointer, t.pointerStart = function(e, i, n) {
		var r = (e.type || "mousedown").toUpperCase();
		0 === r.indexOf("MOUSE") ? (eventjs.isMouse = !0, eventjs.isTouch = !1, eventjs.isMSPointer = !1) : 0 === r.indexOf("TOUCH") ? (eventjs.isMouse = !1, eventjs.isTouch = !0, eventjs.isMSPointer = !1) : 0 === r.indexOf("MSPOINTER") && (eventjs.isMouse = !1, eventjs.isTouch = !1, eventjs.isMSPointer = !0);
		var o = function(t, e) {
			var i = n.bbox,
				r = a[e] = {};
			switch (n.position) {
				case "absolute":
					r.offsetX = 0, r.offsetY = 0;
					break;
				case "differenceFromLast":
					r.offsetX = t.pageX, r.offsetY = t.pageY;
					break;
				case "difference":
					r.offsetX = t.pageX, r.offsetY = t.pageY;
					break;
				case "move":
					r.offsetX = t.pageX - i.x1, r.offsetY = t.pageY - i.y1;
					break;
				default:
					r.offsetX = i.x1 - i.scrollLeft, r.offsetY = i.y1 - i.scrollTop
			}
			var o = t.pageX - r.offsetX,
				s = t.pageY - r.offsetY;
			r.rotation = 0, r.scale = 1, r.startTime = r.moveTime = (new Date).getTime(), r.move = {
				x: o,
				y: s
			}, r.start = {
				x: o,
				y: s
			}, n.fingers++
		};
		n.event = e, i.defaultListener && (n.listener = i.defaultListener, delete i.defaultListener);
		for (var s = !n.fingers, a = n.tracker, c = e.changedTouches || t.getCoords(e), h = c.length, l = 0; h > l; l++) {
			var u = c[l],
				f = u.identifier || 1 / 0;
			if (n.fingers) {
				if (n.fingers >= n.maxFingers) {
					var d = [];
					for (var f in n.tracker) d.push(f);
					return i.identifier = d.join(","), s
				}
				var p = 0;
				for (var g in a) {
					if (a[g].up) {
						delete a[g], o(u, f), n.cancel = !0;
						break
					}
					p++
				}
				if (a[f]) continue;
				o(u, f)
			} else a = n.tracker = {}, i.bbox = n.bbox = t.getBoundingBox(n.target), n.fingers = 0, n.cancel = !1, o(u, f)
		}
		var d = [];
		for (var f in n.tracker) d.push(f);
		return i.identifier = d.join(","), s
	}, t.pointerEnd = function(t, e, i, n) {
		for (var r = t.touches || [], o = r.length, s = {}, a = 0; o > a; a++) {
			var c = r[a],
				h = c.identifier;
			s[h || 1 / 0] = !0
		}
		for (var h in i.tracker) {
			var l = i.tracker[h];
			s[h] || l.up || (n && n({
				pageX: l.pageX,
				pageY: l.pageY,
				changedTouches: [{
					pageX: l.pageX,
					pageY: l.pageY,
					identifier: "Infinity" === h ? 1 / 0 : h
				}]
			}, "up"), l.up = !0, i.fingers--)
		}
		if (0 !== i.fingers) return !1;
		var u = [];
		i.gestureFingers = 0;
		for (var h in i.tracker) i.gestureFingers++, u.push(h);
		return e.identifier = u.join(","), !0
	}, t.getCoords = function(e) {
		return "undefined" != typeof e.pageX ? t.getCoords = function(t) {
			return Array({
				type: "mouse",
				x: t.pageX,
				y: t.pageY,
				pageX: t.pageX,
				pageY: t.pageY,
				identifier: t.pointerId || 1 / 0
			})
		} : t.getCoords = function(t) {
			var e = document.documentElement;
			return t = t || window.event, Array({
				type: "mouse",
				x: t.clientX + e.scrollLeft,
				y: t.clientY + e.scrollTop,
				pageX: t.clientX + e.scrollLeft,
				pageY: t.clientY + e.scrollTop,
				identifier: 1 / 0
			})
		}, t.getCoords(e)
	}, t.getCoord = function(e) {
		if ("ontouchstart" in window) {
			var i = 0,
				n = 0;
			t.getCoord = function(t) {
				var e = t.changedTouches;
				return e && e.length ? {
					x: i = e[0].pageX,
					y: n = e[0].pageY
				} : {
					x: i,
					y: n
				}
			}
		} else "undefined" != typeof e.pageX && "undefined" != typeof e.pageY ? t.getCoord = function(t) {
			return {
				x: t.pageX,
				y: t.pageY
			}
		} : t.getCoord = function(t) {
			var e = document.documentElement;
			return t = t || window.event, {
				x: t.clientX + e.scrollLeft,
				y: t.clientY + e.scrollTop
			}
		};
		return t.getCoord(e)
	};
	var i = function(t, e) {
		var i = parseFloat(t.getPropertyValue(e), 10);
		return isFinite(i) ? i : 0
	};
	return t.getBoundingBox = function(t) {
		(t === window || t === document) && (t = document.body);
		var e = {}, n = t.getBoundingClientRect();
		e.width = n.width, e.height = n.height, e.x1 = n.left, e.y1 = n.top, e.scaleX = n.width / t.offsetWidth || 1, e.scaleY = n.height / t.offsetHeight || 1, e.scrollLeft = 0, e.scrollTop = 0;
		var r = window.getComputedStyle(t),
			o = "border-box" === r.getPropertyValue("box-sizing");
		if (o === !1) {
			var s = i(r, "border-left-width"),
				a = i(r, "border-right-width"),
				c = i(r, "border-bottom-width"),
				h = i(r, "border-top-width");
			e.border = [s, a, h, c], e.x1 += s, e.y1 += h, e.width -= a + s, e.height -= c + h
		}
		e.x2 = e.x1 + e.width, e.y2 = e.y1 + e.height;
		for (var l = r.getPropertyValue("position"), u = "fixed" === l ? t : t.parentNode; null !== u && u !== document.body && void 0 !== u.scrollTop;) {
			var r = window.getComputedStyle(u),
				l = r.getPropertyValue("position");
			if ("absolute" === l);
			else {
				if ("fixed" === l) {
					e.scrollTop -= u.parentNode.scrollTop, e.scrollLeft -= u.parentNode.scrollLeft;
					break
				}
				e.scrollLeft += u.scrollLeft, e.scrollTop += u.scrollTop
			}
			u = u.parentNode
		}
		return e.scrollBodyLeft = void 0 !== window.pageXOffset ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft, e.scrollBodyTop = void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop, e.scrollLeft -= e.scrollBodyLeft, e.scrollTop -= e.scrollBodyTop, e
	},
	function() {
		var e, i = navigator.userAgent.toLowerCase(),
			n = -1 !== i.indexOf("macintosh");
		e = n && -1 !== i.indexOf("khtml") ? {
			91: !0,
			93: !0
		} : n && -1 !== i.indexOf("firefox") ? {
			224: !0
		} : {
			17: !0
		}, (t.metaTrackerReset = function() {
			eventjs.fnKey = t.fnKey = !1, eventjs.metaKey = t.metaKey = !1, eventjs.escKey = t.escKey = !1, eventjs.ctrlKey = t.ctrlKey = !1, eventjs.shiftKey = t.shiftKey = !1, eventjs.altKey = t.altKey = !1
		})(), t.metaTracker = function(i) {
			var n = "keydown" === i.type;
			27 === i.keyCode && (eventjs.escKey = t.escKey = n), e[i.keyCode] && (eventjs.metaKey = t.metaKey = n), eventjs.ctrlKey = t.ctrlKey = i.ctrlKey, eventjs.shiftKey = t.shiftKey = i.shiftKey, eventjs.altKey = t.altKey = i.altKey
		}
	}(), t
}(eventjs.proxy), "undefined" == typeof eventjs) var eventjs = {};
if (eventjs.MutationObserver = function() {
	var t = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
		e = !t && function() {
			var t = document.createElement("p"),
				e = !1,
				i = function() {
					e = !0
				};
			if (t.addEventListener) t.addEventListener("DOMAttrModified", i, !1);
			else {
				if (!t.attachEvent) return !1;
				t.attachEvent("onDOMAttrModified", i)
			}
			return t.setAttribute("id", "target"), e
		}();
	return function(i, n) {
		if (t) {
			var r = {
				subtree: !1,
				attributes: !0
			}, o = new t(function(t) {
				t.forEach(function(t) {
					n.call(t.target, t.attributeName)
				})
			});
			o.observe(i, r)
		} else e ? eventjs.add(i, "DOMAttrModified", function(t) {
			n.call(i, t.attrName)
		}) : "onpropertychange" in document.body && eventjs.add(i, "propertychange", function(t) {
			n.call(i, window.event.propertyName)
		})
	}
}(), "undefined" == typeof eventjs) var eventjs = {};
if ("undefined" == typeof eventjs.proxy && (eventjs.proxy = {}), eventjs.proxy = function(t) {
	"use strict";
	return t.click = function(e) {
		e.gesture = e.gesture || "click", e.maxFingers = e.maxFingers || e.fingers || 1, e.onPointerDown = function(n) {
			t.pointerStart(n, i, e) && eventjs.add(e.target, "mouseup", e.onPointerUp)
		}, e.onPointerUp = function(n) {
			if (t.pointerEnd(n, i, e)) {
				eventjs.remove(e.target, "mouseup", e.onPointerUp);
				var r = n.changedTouches || t.getCoords(n),
					o = r[0],
					s = e.bbox,
					a = t.getBoundingBox(e.target),
					c = o.pageY - a.scrollBodyTop,
					h = o.pageX - a.scrollBodyLeft;
				if (h > s.x1 && c > s.y1 && h < s.x2 && c < s.y2 && s.scrollTop === a.scrollTop) {
					for (var l in e.tracker) break;
					var u = e.tracker[l];
					i.x = u.start.x, i.y = u.start.y, e.listener(n, i)
				}
			}
		};
		var i = t.pointerSetup(e);
		return i.state = "click", eventjs.add(e.target, "mousedown", e.onPointerDown), i
	}, eventjs.Gesture = eventjs.Gesture || {}, eventjs.Gesture._gestureHandlers = eventjs.Gesture._gestureHandlers || {}, eventjs.Gesture._gestureHandlers.click = t.click, t
}(eventjs.proxy), "undefined" == typeof eventjs) var eventjs = {};
if ("undefined" == typeof eventjs.proxy && (eventjs.proxy = {}), eventjs.proxy = function(t) {
	"use strict";
	return t.dbltap = t.dblclick = function(e) {
		e.gesture = e.gesture || "dbltap", e.maxFingers = e.maxFingers || e.fingers || 1;
		var i, n, r, o, s, a = 700;
		e.onPointerDown = function(h) {
			var l = h.changedTouches || t.getCoords(h);
			i && !n ? (s = l[0], n = (new Date).getTime() - i) : (o = l[0], i = (new Date).getTime(), n = 0, clearTimeout(r), r = setTimeout(function() {
				i = 0
			}, a)), t.pointerStart(h, c, e) && (eventjs.add(e.target, "mousemove", e.onPointerMove).listener(h), eventjs.add(e.target, "mouseup", e.onPointerUp))
		}, e.onPointerMove = function(a) {
			if (i && !n) {
				var c = a.changedTouches || t.getCoords(a);
				s = c[0]
			}
			var h = e.bbox,
				l = s.pageX - h.x1,
				u = s.pageY - h.y1;
			l > 0 && l < h.width && u > 0 && u < h.height && Math.abs(s.pageX - o.pageX) <= 25 && Math.abs(s.pageY - o.pageY) <= 25 || (eventjs.remove(e.target, "mousemove", e.onPointerMove), clearTimeout(r), i = n = 0)
		}, e.onPointerUp = function(o) {
			if (t.pointerEnd(o, c, e) && (eventjs.remove(e.target, "mousemove", e.onPointerMove), eventjs.remove(e.target, "mouseup", e.onPointerUp)), i && n) {
				if (a >= n) {
					c.state = e.gesture;
					for (var s in e.tracker) break;
					var h = e.tracker[s];
					c.x = h.start.x, c.y = h.start.y, e.listener(o, c)
				}
				clearTimeout(r), i = n = 0
			}
		};
		var c = t.pointerSetup(e);
		return c.state = "dblclick", eventjs.add(e.target, "mousedown", e.onPointerDown), c
	}, eventjs.Gesture = eventjs.Gesture || {}, eventjs.Gesture._gestureHandlers = eventjs.Gesture._gestureHandlers || {}, eventjs.Gesture._gestureHandlers.dbltap = t.dbltap, eventjs.Gesture._gestureHandlers.dblclick = t.dblclick, t
}(eventjs.proxy), "undefined" == typeof eventjs) var eventjs = {};
if ("undefined" == typeof eventjs.proxy && (eventjs.proxy = {}), eventjs.proxy = function(t) {
	"use strict";
	return t.dragElement = function(e, i) {
		t.drag({
			event: i,
			target: e,
			position: "move",
			listener: function(t, i) {
				e.style.left = i.x + "px", e.style.top = i.y + "px", eventjs.prevent(t)
			}
		})
	}, t.drag = function(e) {
		e.gesture = "drag", e.onPointerDown = function(n) {
			t.pointerStart(n, i, e) && (e.monitor || (eventjs.add(e.doc, "mousemove", e.onPointerMove), eventjs.add(e.doc, "mouseup", e.onPointerUp))), e.onPointerMove(n, "down")
		}, e.onPointerMove = function(n, r) {
			if (!e.tracker) return e.onPointerDown(n);
			for (var o = (e.bbox, n.changedTouches || t.getCoords(n)), s = o.length, a = 0; s > a; a++) {
				var c = o[a],
					h = c.identifier || 1 / 0,
					l = e.tracker[h];
				l && (l.pageX = c.pageX, l.pageY = c.pageY, i.state = r || "move", i.identifier = h, i.start = l.start, i.fingers = e.fingers, "differenceFromLast" === e.position ? (i.x = l.pageX - l.offsetX, i.y = l.pageY - l.offsetY, l.offsetX = l.pageX, l.offsetY = l.pageY) : (i.x = l.pageX - l.offsetX, i.y = l.pageY - l.offsetY), e.listener(n, i))
			}
		}, e.onPointerUp = function(n) {
			t.pointerEnd(n, i, e, e.onPointerMove) && (e.monitor || (eventjs.remove(e.doc, "mousemove", e.onPointerMove), eventjs.remove(e.doc, "mouseup", e.onPointerUp)))
		};
		var i = t.pointerSetup(e);
		return e.event ? e.onPointerDown(e.event) : (eventjs.add(e.target, "mousedown", e.onPointerDown), e.monitor && (eventjs.add(e.doc, "mousemove", e.onPointerMove), eventjs.add(e.doc, "mouseup", e.onPointerUp))), i
	}, eventjs.Gesture = eventjs.Gesture || {}, eventjs.Gesture._gestureHandlers = eventjs.Gesture._gestureHandlers || {}, eventjs.Gesture._gestureHandlers.drag = t.drag, t
}(eventjs.proxy), "undefined" == typeof eventjs) var eventjs = {};
if ("undefined" == typeof eventjs.proxy && (eventjs.proxy = {}), eventjs.proxy = function(t) {
	"use strict";
	var e = Math.PI / 180,
		i = function(t, e) {
			var i = 0,
				n = 0,
				r = 0;
			for (var o in e) {
				var s = e[o];
				s.up || (i += s.move.x, n += s.move.y, r++)
			}
			return t.x = i /= r, t.y = n /= r, t
		};
	return t.gesture = function(n) {
		n.gesture = n.gesture || "gesture", n.minFingers = n.minFingers || n.fingers || 2, n.onPointerDown = function(e) {
			var o = n.fingers;
			if (t.pointerStart(e, r, n) && (eventjs.add(n.doc, "mousemove", n.onPointerMove), eventjs.add(n.doc, "mouseup", n.onPointerUp)), n.fingers === n.minFingers && o !== n.fingers) {
				r.fingers = n.minFingers, r.scale = 1, r.rotation = 0, r.state = "start";
				var s = "";
				for (var a in n.tracker) s += a;
				r.identifier = parseInt(s), i(r, n.tracker), n.listener(e, r)
			}
		}, n.onPointerMove = function(o, s) {
			for (var a = n.bbox, c = n.tracker, h = o.changedTouches || t.getCoords(o), l = h.length, u = 0; l > u; u++) {
				var f = h[u],
					d = f.identifier || 1 / 0,
					p = c[d];
				p && (p.move.x = f.pageX - a.x1, p.move.y = f.pageY - a.y1)
			}
			if (!(n.fingers < n.minFingers)) {
				var h = [],
					g = 0,
					v = 0;
				i(r, c);
				for (var d in c) {
					var f = c[d];
					if (!f.up) {
						var m = f.start;
						if (!m.distance) {
							var b = m.x - r.x,
								y = m.y - r.y;
							m.distance = Math.sqrt(b * b + y * y), m.angle = Math.atan2(b, y) / e
						}
						var b = f.move.x - r.x,
							y = f.move.y - r.y,
							_ = Math.sqrt(b * b + y * y);
						g += _ / m.distance;
						var w = Math.atan2(b, y) / e,
							x = (m.angle - w + 360) % 360 - 180;
						f.DEG2 = f.DEG1, f.DEG1 = x > 0 ? x : -x, "undefined" != typeof f.DEG2 && (x > 0 ? f.rotation += f.DEG1 - f.DEG2 : f.rotation -= f.DEG1 - f.DEG2, v += f.rotation), h.push(f.move)
					}
				}
				r.touches = h, r.fingers = n.fingers, r.scale = g / n.fingers, r.rotation = v / n.fingers, r.state = "change", n.listener(o, r)
			}
		}, n.onPointerUp = function(e) {
			var i = n.fingers;
			t.pointerEnd(e, r, n) && (eventjs.remove(n.doc, "mousemove", n.onPointerMove), eventjs.remove(n.doc, "mouseup", n.onPointerUp)), i === n.minFingers && n.fingers < n.minFingers && (r.fingers = n.fingers, r.state = "end", n.listener(e, r))
		};
		var r = t.pointerSetup(n);
		return eventjs.add(n.target, "mousedown", n.onPointerDown), r
	}, eventjs.Gesture = eventjs.Gesture || {}, eventjs.Gesture._gestureHandlers = eventjs.Gesture._gestureHandlers || {}, eventjs.Gesture._gestureHandlers.gesture = t.gesture, t
}(eventjs.proxy), "undefined" == typeof eventjs) var eventjs = {};
if ("undefined" == typeof eventjs.proxy && (eventjs.proxy = {}), eventjs.proxy = function(t) {
	"use strict";
	return t.pointerdown = t.pointermove = t.pointerup = function(e) {
		if (e.gesture = e.gesture || "pointer", !e.target.isPointerEmitter) {
			var i = !0;
			e.onPointerDown = function(t) {
				i = !1, n.gesture = "pointerdown", e.listener(t, n)
			}, e.onPointerMove = function(t) {
				n.gesture = "pointermove", e.listener(t, n, i)
			}, e.onPointerUp = function(t) {
				i = !0, n.gesture = "pointerup", e.listener(t, n, !0)
			};
			var n = t.pointerSetup(e);
			return eventjs.add(e.target, "mousedown", e.onPointerDown), eventjs.add(e.target, "mousemove", e.onPointerMove), eventjs.add(e.doc, "mouseup", e.onPointerUp), e.target.isPointerEmitter = !0, n
		}
	}, eventjs.Gesture = eventjs.Gesture || {}, eventjs.Gesture._gestureHandlers = eventjs.Gesture._gestureHandlers || {}, eventjs.Gesture._gestureHandlers.pointerdown = t.pointerdown, eventjs.Gesture._gestureHandlers.pointermove = t.pointermove, eventjs.Gesture._gestureHandlers.pointerup = t.pointerup, t
}(eventjs.proxy), "undefined" == typeof eventjs) var eventjs = {};
if ("undefined" == typeof eventjs.proxy && (eventjs.proxy = {}), eventjs.proxy = function(t) {
	"use strict";
	return t.shake = function(t) {
		var e = {
			gesture: "devicemotion",
			acceleration: {},
			accelerationIncludingGravity: {},
			target: t.target,
			listener: t.listener,
			remove: function() {
				window.removeEventListener("devicemotion", h, !1)
			}
		}, i = 4,
			n = 1e3,
			r = 200,
			o = 3,
			s = (new Date).getTime(),
			a = {
				x: 0,
				y: 0,
				z: 0
			}, c = {
				x: {
					count: 0,
					value: 0
				},
				y: {
					count: 0,
					value: 0
				},
				z: {
					count: 0,
					value: 0
				}
			}, h = function(h) {
				var l = .8,
					u = h.accelerationIncludingGravity;
				if (a.x = l * a.x + (1 - l) * u.x, a.y = l * a.y + (1 - l) * u.y, a.z = l * a.z + (1 - l) * u.z, e.accelerationIncludingGravity = a, e.acceleration.x = u.x - a.x, e.acceleration.y = u.y - a.y, e.acceleration.z = u.z - a.z, "devicemotion" === t.gesture) return void t.listener(h, e);
				for (var f = "xyz", d = (new Date).getTime(), p = 0, g = f.length; g > p; p++) {
					var v = f[p],
						m = e.acceleration[v],
						b = c[v],
						y = Math.abs(m);
					if (!(n > d - s) && y > i) {
						var _ = d * m / y,
							w = Math.abs(_ + b.value);
						b.value && r > w ? (b.value = _, b.count++, b.count === o && (t.listener(h, e), s = d, b.value = 0, b.count = 0)) : (b.value = _, b.count = 1)
					}
				}
			};
		return window.addEventListener ? (window.addEventListener("devicemotion", h, !1), e) : void 0
	}, eventjs.Gesture = eventjs.Gesture || {}, eventjs.Gesture._gestureHandlers = eventjs.Gesture._gestureHandlers || {}, eventjs.Gesture._gestureHandlers.shake = t.shake, t
}(eventjs.proxy), "undefined" == typeof eventjs) var eventjs = {};
if ("undefined" == typeof eventjs.proxy && (eventjs.proxy = {}), eventjs.proxy = function(t) {
	"use strict";
	var e = Math.PI / 180;
	return t.swipe = function(i) {
		i.snap = i.snap || 90, i.threshold = i.threshold || 1, i.gesture = i.gesture || "swipe", i.onPointerDown = function(e) {
			t.pointerStart(e, n, i) && (eventjs.add(i.doc, "mousemove", i.onPointerMove).listener(e), eventjs.add(i.doc, "mouseup", i.onPointerUp))
		}, i.onPointerMove = function(e) {
			for (var n = e.changedTouches || t.getCoords(e), r = n.length, o = 0; r > o; o++) {
				var s = n[o],
					a = s.identifier || 1 / 0,
					c = i.tracker[a];
				c && (c.move.x = s.pageX, c.move.y = s.pageY, c.moveTime = (new Date).getTime())
			}
		}, i.onPointerUp = function(r) {
			if (t.pointerEnd(r, n, i)) {
				eventjs.remove(i.doc, "mousemove", i.onPointerMove), eventjs.remove(i.doc, "mouseup", i.onPointerUp);
				var o, s, a, c, h = {
					x: 0,
					y: 0
				}, l = 0,
					u = 0,
					f = 0;
				for (var d in i.tracker) {
					var p = i.tracker[d],
						g = p.move.x - p.start.x,
						v = p.move.y - p.start.y;
					l += p.move.x, u += p.move.y, h.x += p.start.x, h.y += p.start.y, f++;
					var m = Math.sqrt(g * g + v * v),
						b = p.moveTime - p.startTime,
						c = Math.atan2(g, v) / e + 180,
						s = b ? m / b : 0;
					if ("undefined" == typeof a) a = c, o = s;
					else {
						if (!(Math.abs(c - a) <= 20)) return;
						a = (a + c) / 2, o = (o + s) / 2
					}
				}
				var y = i.gestureFingers;
				i.minFingers <= y && i.maxFingers >= y && o > i.threshold && (h.x /= f, h.y /= f, n.start = h, n.x = l / f, n.y = u / f, n.angle = -(((a / i.snap + .5 >> 0) * i.snap || 360) - 360), n.velocity = o, n.fingers = y, n.state = "swipe", i.listener(r, n))
			}
		};
		var n = t.pointerSetup(i);
		return eventjs.add(i.target, "mousedown", i.onPointerDown), n
	}, eventjs.Gesture = eventjs.Gesture || {}, eventjs.Gesture._gestureHandlers = eventjs.Gesture._gestureHandlers || {}, eventjs.Gesture._gestureHandlers.swipe = t.swipe, t
}(eventjs.proxy), "undefined" == typeof eventjs) var eventjs = {};
if ("undefined" == typeof eventjs.proxy && (eventjs.proxy = {}), eventjs.proxy = function(t) {
	"use strict";
	return t.longpress = function(e) {
		return e.gesture = "longpress", t.tap(e)
	}, t.tap = function(e) {
		e.delay = e.delay || 500, e.timeout = e.timeout || 250, e.driftDeviance = e.driftDeviance || 10, e.gesture = e.gesture || "tap";
		var i, n;
		e.onPointerDown = function(o) {
			if (t.pointerStart(o, r, e)) {
				if (i = (new Date).getTime(), eventjs.add(e.doc, "mousemove", e.onPointerMove).listener(o), eventjs.add(e.doc, "mouseup", e.onPointerUp), "longpress" !== e.gesture) return;
				n = setTimeout(function() {
					if (!(o.cancelBubble && ++o.cancelBubbleCount > 1)) {
						var t = 0;
						for (var i in e.tracker) {
							var n = e.tracker[i];
							if (n.end === !0) return;
							if (e.cancel) return;
							t++
						}
						e.minFingers <= t && e.maxFingers >= t && (r.state = "start", r.fingers = t, r.x = n.start.x, r.y = n.start.y, e.listener(o, r))
					}
				}, e.delay)
			}
		}, e.onPointerMove = function(i) {
			for (var n = e.bbox, r = i.changedTouches || t.getCoords(i), o = r.length, s = 0; o > s; s++) {
				var a = r[s],
					c = a.identifier || 1 / 0,
					h = e.tracker[c];
				if (h) {
					var l = a.pageX - n.x1,
						u = a.pageY - n.y1,
						f = l - h.start.x,
						d = u - h.start.y,
						p = Math.sqrt(f * f + d * d);
					if (!(l > 0 && l < n.width && u > 0 && u < n.height && p <= e.driftDeviance)) return eventjs.remove(e.doc, "mousemove", e.onPointerMove), void(e.cancel = !0)
				}
			}
		}, e.onPointerUp = function(o) {
			if (t.pointerEnd(o, r, e)) {
				if (clearTimeout(n), eventjs.remove(e.doc, "mousemove", e.onPointerMove), eventjs.remove(e.doc, "mouseup", e.onPointerUp), o.cancelBubble && ++o.cancelBubbleCount > 1) return;
				if ("longpress" === e.gesture) return void("start" === r.state && (r.state = "end", e.listener(o, r)));
				if (e.cancel) return;
				if ((new Date).getTime() - i > e.timeout) return;
				var s = e.gestureFingers;
				e.minFingers <= s && e.maxFingers >= s && (r.state = "tap", r.fingers = e.gestureFingers, e.listener(o, r))
			}
		};
		var r = t.pointerSetup(e);
		return eventjs.add(e.target, "mousedown", e.onPointerDown), r
	}, eventjs.Gesture = eventjs.Gesture || {}, eventjs.Gesture._gestureHandlers = eventjs.Gesture._gestureHandlers || {}, eventjs.Gesture._gestureHandlers.tap = t.tap, eventjs.Gesture._gestureHandlers.longpress = t.longpress, t
}(eventjs.proxy), "undefined" == typeof eventjs) var eventjs = {};
if ("undefined" == typeof eventjs.proxy && (eventjs.proxy = {}), eventjs.proxy = function(t) {
	"use strict";
	return t.wheelPreventElasticBounce = function(t) {
		t && ("string" == typeof t && (t = document.querySelector(t)), eventjs.add(t, "wheel", function(t, e) {
			e.preventElasticBounce(), eventjs.stop(t)
		}))
	}, t.wheel = function(t) {
		var e, i = t.timeout || 150,
			n = 0,
			r = {
				gesture: "wheel",
				state: "start",
				wheelDelta: 0,
				target: t.target,
				listener: t.listener,
				preventElasticBounce: function(t) {
					var e = this.target,
						i = e.scrollTop,
						n = i + e.offsetHeight,
						r = e.scrollHeight;
					n === r && this.wheelDelta <= 0 ? eventjs.cancel(t) : 0 === i && this.wheelDelta >= 0 && eventjs.cancel(t), eventjs.stop(t)
				},
				add: function() {
					t.target[s](c, o, !1)
				},
				remove: function() {
					t.target[a](c, o, !1)
				}
			}, o = function(o) {
				o = o || window.event, r.state = n++ ? "change" : "start", r.wheelDelta = o.detail ? -20 * o.detail : o.wheelDelta, t.listener(o, r), clearTimeout(e), e = setTimeout(function() {
					n = 0, r.state = "end", r.wheelDelta = 0, t.listener(o, r)
				}, i)
			}, s = document.addEventListener ? "addEventListener" : "attachEvent",
			a = document.removeEventListener ? "removeEventListener" : "detachEvent",
			c = eventjs.getEventSupport("mousewheel") ? "mousewheel" : "DOMMouseScroll";
		return t.target[s](c, o, !1), r
	}, eventjs.Gesture = eventjs.Gesture || {}, eventjs.Gesture._gestureHandlers = eventjs.Gesture._gestureHandlers || {}, eventjs.Gesture._gestureHandlers.wheel = t.wheel, t
}(eventjs.proxy), "undefined" == typeof Event) var Event = {};
"undefined" == typeof Event.proxy && (Event.proxy = {}), Event.proxy = function(t) {
	"use strict";
	return t.orientation = function(t) {
		var e = {
			gesture: "orientationchange",
			previous: null,
			current: window.orientation,
			target: t.target,
			listener: t.listener,
			remove: function() {
				window.removeEventListener("orientationchange", i, !1)
			}
		}, i = function(i) {
			return e.previous = e.current, e.current = window.orientation, null !== e.previous && e.previous != e.current ? void t.listener(i, e) : void 0
		};
		return window.DeviceOrientationEvent && window.addEventListener("orientationchange", i, !1), e
	}, Event.Gesture = Event.Gesture || {}, Event.Gesture._gestureHandlers = Event.Gesture._gestureHandlers || {}, Event.Gesture._gestureHandlers.orientation = t.orientation, t
}(Event.proxy),
function() {
	function t(t, e) {
		this.__eventListeners[t] && (e ? fabric.util.removeFromArray(this.__eventListeners[t], e) : this.__eventListeners[t].length = 0)
	}
	function e(t, e) {
		if (this.__eventListeners || (this.__eventListeners = {}), 1 === arguments.length) for (var i in t) this.on(i, t[i]);
		else this.__eventListeners[t] || (this.__eventListeners[t] = []), this.__eventListeners[t].push(e);
		return this
	}
	function i(e, i) {
		if (this.__eventListeners) {
			if (0 === arguments.length) this.__eventListeners = {};
			else if (1 === arguments.length && "object" == typeof arguments[0]) for (var n in e) t.call(this, n, e[n]);
			else t.call(this, e, i);
			return this
		}
	}
	function n(t, e) {
		if (this.__eventListeners) {
			var i = this.__eventListeners[t];
			if (i) {
				for (var n = 0, r = i.length; r > n; n++) i[n].call(this, e || {});
				return this
			}
		}
	}
	fabric.Observable = {
		observe: e,
		stopObserving: i,
		fire: n,
		on: e,
		off: i,
		trigger: n
	}
}(), fabric.Collection = {
	add: function() {
		this._objects.push.apply(this._objects, arguments);
		for (var t = 0, e = arguments.length; e > t; t++) this._onObjectAdded(arguments[t]);
		return this.renderOnAddRemove && this.renderAll(), this
	},
	insertAt: function(t, e, i) {
		var n = this.getObjects();
		return i ? n[e] = t : n.splice(e, 0, t), this._onObjectAdded(t), this.renderOnAddRemove && this.renderAll(), this
	},
	remove: function() {
		for (var t, e = this.getObjects(), i = 0, n = arguments.length; n > i; i++) t = e.indexOf(arguments[i]), -1 !== t && (e.splice(t, 1), this._onObjectRemoved(arguments[i]));
		return this.renderOnAddRemove && this.renderAll(), this
	},
	forEachObject: function(t, e) {
		for (var i = this.getObjects(), n = i.length; n--;) t.call(e, i[n], n, i);
		return this
	},
	getObjects: function(t) {
		return "undefined" == typeof t ? this._objects : this._objects.filter(function(e) {
			return e.type === t
		})
	},
	item: function(t) {
		return this.getObjects()[t]
	},
	isEmpty: function() {
		return 0 === this.getObjects().length
	},
	size: function() {
		return this.getObjects().length
	},
	contains: function(t) {
		return this.getObjects().indexOf(t) > -1
	},
	complexity: function() {
		return this.getObjects().reduce(function(t, e) {
			return t += e.complexity ? e.complexity() : 0
		}, 0)
	}
},
function(t) {
	var e = Math.sqrt,
		i = Math.atan2,
		n = Math.PI / 180;
	fabric.util = {
		removeFromArray: function(t, e) {
			var i = t.indexOf(e);
			return -1 !== i && t.splice(i, 1), t
		},
		getRandomInt: function(t, e) {
			return Math.floor(Math.random() * (e - t + 1)) + t
		},
		degreesToRadians: function(t) {
			return t * n
		},
		radiansToDegrees: function(t) {
			return t / n
		},
		rotatePoint: function(t, e, i) {
			t.subtractEquals(e);
			var n = Math.sin(i),
				r = Math.cos(i),
				o = t.x * r - t.y * n,
				s = t.x * n + t.y * r;
			return new fabric.Point(o, s).addEquals(e)
		},
		transformPoint: function(t, e, i) {
			return i ? new fabric.Point(e[0] * t.x + e[2] * t.y, e[1] * t.x + e[3] * t.y) : new fabric.Point(e[0] * t.x + e[2] * t.y + e[4], e[1] * t.x + e[3] * t.y + e[5])
		},
		invertTransform: function(t) {
			var e = 1 / (t[0] * t[3] - t[1] * t[2]),
				i = [e * t[3], -e * t[1], -e * t[2], e * t[0]],
				n = fabric.util.transformPoint({
					x: t[4],
					y: t[5]
				}, i, !0);
			return i[4] = -n.x, i[5] = -n.y, i
		},
		toFixed: function(t, e) {
			return parseFloat(Number(t).toFixed(e))
		},
		parseUnit: function(t, e) {
			var i = /\D{0,2}$/.exec(t),
				n = parseFloat(t);
			switch (e || (e = fabric.Text.DEFAULT_SVG_FONT_SIZE), i[0]) {
				case "mm":
					return n * fabric.DPI / 25.4;
				case "cm":
					return n * fabric.DPI / 2.54;
				case "in":
					return n * fabric.DPI;
				case "pt":
					return n * fabric.DPI / 72;
				case "pc":
					return n * fabric.DPI / 72 * 12;
				case "em":
					return n * e;
				default:
					return n
			}
		},
		falseFunction: function() {
			return !1
		},
		getKlass: function(t, e) {
			return t = fabric.util.string.camelize(t.charAt(0).toUpperCase() + t.slice(1)), fabric.util.resolveNamespace(e)[t]
		},
		resolveNamespace: function(e) {
			if (!e) return fabric;
			for (var i = e.split("."), n = i.length, r = t || fabric.window, o = 0; n > o; ++o) r = r[i[o]];
			return r
		},
		loadImage: function(t, e, i, n) {
			if (!t) return void(e && e.call(i, t));
			var r = fabric.util.createImage();
			r.onload = function() {
				e && e.call(i, r), r = r.onload = r.onerror = null
			}, r.onerror = function() {
				fabric.log("Error loading " + r.src), e && e.call(i, null, !0), r = r.onload = r.onerror = null
			}, 0 !== t.indexOf("data") && "undefined" != typeof n && (r.crossOrigin = n), r.src = t
		},
		enlivenObjects: function(t, e, i, n) {
			function r() {
				++s === a && e && e(o)
			}
			t = t || [];
			var o = [],
				s = 0,
				a = t.length;
			return a ? void t.forEach(function(t, e) {
				if (!t || !t.type) return void r();
				var s = fabric.util.getKlass(t.type, i);
				s.async ? s.fromObject(t, function(i, s) {
					s || (o[e] = i, n && n(t, o[e])), r()
				}) : (o[e] = s.fromObject(t), n && n(t, o[e]), r())
			}) : void(e && e(o))
		},
		groupSVGElements: function(t, e, i) {
			var n;
			return n = new fabric.PathGroup(t, e), "undefined" != typeof i && n.setSourcePath(i), n
		},
		populateWithProperties: function(t, e, i) {
			if (i && "[object Array]" === Object.prototype.toString.call(i)) for (var n = 0, r = i.length; r > n; n++) i[n] in t && (e[i[n]] = t[i[n]])
		},
		drawDashedLine: function(t, n, r, o, s, a) {
			var c = o - n,
				h = s - r,
				l = e(c * c + h * h),
				u = i(h, c),
				f = a.length,
				d = 0,
				p = !0;
			for (t.save(), t.translate(n, r), t.moveTo(0, 0), t.rotate(u), n = 0; l > n;) n += a[d++ % f], n > l && (n = l), t[p ? "lineTo" : "moveTo"](n, 0), p = !p;
			t.restore()
		},
		createCanvasElement: function(t) {
			return t || (t = fabric.document.createElement("canvas")), t.getContext || "undefined" == typeof G_vmlCanvasManager || G_vmlCanvasManager.initElement(t), t
		},
		createImage: function() {
			return fabric.isLikelyNode ? new(require("canvas").Image) : fabric.document.createElement("img")
		},
		createAccessors: function(t) {
			for (var e = t.prototype, i = e.stateProperties.length; i--;) {
				var n = e.stateProperties[i],
					r = n.charAt(0).toUpperCase() + n.slice(1),
					o = "set" + r,
					s = "get" + r;
				e[s] || (e[s] = function(t) {
					return new Function('return this.get("' + t + '")')
				}(n)), e[o] || (e[o] = function(t) {
					return new Function("value", 'return this.set("' + t + '", value)')
				}(n))
			}
		},
		clipContext: function(t, e) {
			e.save(), e.beginPath(), t.clipTo(e), e.clip()
		},
		multiplyTransformMatrices: function(t, e) {
			return [t[0] * e[0] + t[2] * e[1], t[1] * e[0] + t[3] * e[1], t[0] * e[2] + t[2] * e[3], t[1] * e[2] + t[3] * e[3], t[0] * e[4] + t[2] * e[5] + t[4], t[1] * e[4] + t[3] * e[5] + t[5]]
		},
		getFunctionBody: function(t) {
			return (String(t).match(/function[^{]*\{([\s\S]*)\}/) || {})[1]
		},
		isTransparent: function(t, e, i, n) {
			n > 0 && (e > n ? e -= n : e = 0, i > n ? i -= n : i = 0);
			for (var r = !0, o = t.getImageData(e, i, 2 * n || 1, 2 * n || 1), s = 3, a = o.data.length; a > s; s += 4) {
				var c = o.data[s];
				if (r = 0 >= c, r === !1) break
			}
			return o = null, r
		}
	}
}("undefined" != typeof exports ? exports : this),
function() {
	function t(t, n, o, s, c, h, l) {
		var u = a.call(arguments);
		if (r[u]) return r[u];
		var f = Math.PI,
			d = l * f / 180,
			p = Math.sin(d),
			g = Math.cos(d),
			v = 0,
			m = 0;
		o = Math.abs(o), s = Math.abs(s);
		var b = -g * t * .5 - p * n * .5,
			y = -g * n * .5 + p * t * .5,
			_ = o * o,
			w = s * s,
			x = y * y,
			S = b * b,
			C = _ * w - _ * x - w * S,
			k = 0;
		if (0 > C) {
			var T = Math.sqrt(1 - C / (_ * w));
			o *= T, s *= T
		} else k = (c === h ? -1 : 1) * Math.sqrt(C / (_ * x + w * S));
		var E = k * o * y / s,
			O = -k * s * b / o,
			j = g * E - p * O + .5 * t,
			A = p * E + g * O + .5 * n,
			I = i(1, 0, (b - E) / o, (y - O) / s),
			P = i((b - E) / o, (y - O) / s, (-b - E) / o, (-y - O) / s);
		0 === h && P > 0 ? P -= 2 * f : 1 === h && 0 > P && (P += 2 * f);
		for (var L = Math.ceil(Math.abs(P / f * 2)), M = [], D = P / L, R = 8 / 3 * Math.sin(D / 4) * Math.sin(D / 4) / Math.sin(D / 2), F = I + D, B = 0; L > B; B++) M[B] = e(I, F, g, p, o, s, j, A, R, v, m), v = M[B][4], m = M[B][5], I = F, F += D;
		return r[u] = M, M
	}
	function e(t, e, i, n, r, s, c, h, l, u, f) {
		var d = a.call(arguments);
		if (o[d]) return o[d];
		var p = Math.cos(t),
			g = Math.sin(t),
			v = Math.cos(e),
			m = Math.sin(e),
			b = i * r * v - n * s * m + c,
			y = n * r * v + i * s * m + h,
			_ = u + l * (-i * r * g - n * s * p),
			w = f + l * (-n * r * g + i * s * p),
			x = b + l * (i * r * m + n * s * v),
			S = y + l * (n * r * m - i * s * v);
		return o[d] = [_, w, x, S, b, y], o[d]
	}
	function i(t, e, i, n) {
		var r = Math.atan2(e, t),
			o = Math.atan2(n, i);
		return o >= r ? o - r : 2 * Math.PI - (r - o)
	}
	function n(t, e, i, n, r, o, c, h) {
		var l = a.call(arguments);
		if (s[l]) return s[l];
		var u, f, d, p, g, v, m, b, y = Math.sqrt,
			_ = Math.min,
			w = Math.max,
			x = Math.abs,
			S = [],
			C = [
				[],
				[]
			];
		f = 6 * t - 12 * i + 6 * r, u = -3 * t + 9 * i - 9 * r + 3 * c, d = 3 * i - 3 * t;
		for (var k = 0; 2 > k; ++k) if (k > 0 && (f = 6 * e - 12 * n + 6 * o, u = -3 * e + 9 * n - 9 * o + 3 * h, d = 3 * n - 3 * e), x(u) < 1e-12) {
			if (x(f) < 1e-12) continue;
			p = -d / f, p > 0 && 1 > p && S.push(p)
		} else m = f * f - 4 * d * u, 0 > m || (b = y(m), g = (-f + b) / (2 * u), g > 0 && 1 > g && S.push(g), v = (-f - b) / (2 * u), v > 0 && 1 > v && S.push(v));
		for (var T, E, O, j = S.length, A = j; j--;) p = S[j], O = 1 - p, T = O * O * O * t + 3 * O * O * p * i + 3 * O * p * p * r + p * p * p * c, C[0][j] = T, E = O * O * O * e + 3 * O * O * p * n + 3 * O * p * p * o + p * p * p * h, C[1][j] = E;
		C[0][A] = t, C[1][A] = e, C[0][A + 1] = c, C[1][A + 1] = h;
		var I = [{
			x: _.apply(null, C[0]),
			y: _.apply(null, C[1])
		}, {
			x: w.apply(null, C[0]),
			y: w.apply(null, C[1])
		}];
		return s[l] = I, I
	}
	var r = {}, o = {}, s = {}, a = Array.prototype.join;
	fabric.util.drawArc = function(e, i, n, r) {
		for (var o = r[0], s = r[1], a = r[2], c = r[3], h = r[4], l = r[5], u = r[6], f = [
			[],
			[],
			[],
			[]
		], d = t(l - i, u - n, o, s, c, h, a), p = 0, g = d.length; g > p; p++) f[p][0] = d[p][0] + i, f[p][1] = d[p][1] + n, f[p][2] = d[p][2] + i, f[p][3] = d[p][3] + n, f[p][4] = d[p][4] + i, f[p][5] = d[p][5] + n, e.bezierCurveTo.apply(e, f[p])
	}, fabric.util.getBoundsOfArc = function(e, i, r, o, s, a, c, h, l) {
		for (var u = 0, f = 0, d = [], p = [], g = t(h - e, l - i, r, o, a, c, s), v = [
			[],
			[]
		], m = 0, b = g.length; b > m; m++) d = n(u, f, g[m][0], g[m][1], g[m][2], g[m][3], g[m][4], g[m][5]), v[0].x = d[0].x + e, v[0].y = d[0].y + i, v[1].x = d[1].x + e, v[1].y = d[1].y + i, p.push(v[0]), p.push(v[1]), u = g[m][4], f = g[m][5];
		return p
	}, fabric.util.getBoundsOfCurve = n
}(),
function() {
	function t(t, e) {
		for (var i = r.call(arguments, 2), n = [], o = 0, s = t.length; s > o; o++) n[o] = i.length ? t[o][e].apply(t[o], i) : t[o][e].call(t[o]);
		return n
	}
	function e(t, e) {
		return n(t, e, function(t, e) {
			return t >= e
		})
	}
	function i(t, e) {
		return n(t, e, function(t, e) {
			return e > t
		})
	}
	function n(t, e, i) {
		if (t && 0 !== t.length) {
			var n = t.length - 1,
				r = e ? t[n][e] : t[n];
			if (e) for (; n--;) i(t[n][e], r) && (r = t[n][e]);
			else for (; n--;) i(t[n], r) && (r = t[n]);
			return r
		}
	}
	var r = Array.prototype.slice;
	Array.prototype.indexOf || (Array.prototype.indexOf = function(t) {
		if (void 0 === this || null === this) throw new TypeError;
		var e = Object(this),
			i = e.length >>> 0;
		if (0 === i) return -1;
		var n = 0;
		if (arguments.length > 0 && (n = Number(arguments[1]), n !== n ? n = 0 : 0 !== n && n !== Number.POSITIVE_INFINITY && n !== Number.NEGATIVE_INFINITY && (n = (n > 0 || -1) * Math.floor(Math.abs(n)))), n >= i) return -1;
		for (var r = n >= 0 ? n : Math.max(i - Math.abs(n), 0); i > r; r++) if (r in e && e[r] === t) return r;
		return -1
	}), Array.prototype.forEach || (Array.prototype.forEach = function(t, e) {
		for (var i = 0, n = this.length >>> 0; n > i; i++) i in this && t.call(e, this[i], i, this)
	}), Array.prototype.map || (Array.prototype.map = function(t, e) {
		for (var i = [], n = 0, r = this.length >>> 0; r > n; n++) n in this && (i[n] = t.call(e, this[n], n, this));
		return i
	}), Array.prototype.every || (Array.prototype.every = function(t, e) {
		for (var i = 0, n = this.length >>> 0; n > i; i++) if (i in this && !t.call(e, this[i], i, this)) return !1;
		return !0
	}), Array.prototype.some || (Array.prototype.some = function(t, e) {
		for (var i = 0, n = this.length >>> 0; n > i; i++) if (i in this && t.call(e, this[i], i, this)) return !0;
		return !1
	}), Array.prototype.filter || (Array.prototype.filter = function(t, e) {
		for (var i, n = [], r = 0, o = this.length >>> 0; o > r; r++) r in this && (i = this[r], t.call(e, i, r, this) && n.push(i));
		return n
	}), Array.prototype.reduce || (Array.prototype.reduce = function(t) {
		var e, i = this.length >>> 0,
			n = 0;
		if (arguments.length > 1) e = arguments[1];
		else for (;;) {
			if (n in this) {
				e = this[n++];
				break
			}
			if (++n >= i) throw new TypeError
		}
		for (; i > n; n++) n in this && (e = t.call(null, e, this[n], n, this));
		return e
	}), fabric.util.array = {
		invoke: t,
		min: i,
		max: e
	}
}(),
function() {
	function t(t, e) {
		for (var i in e) t[i] = e[i];
		return t
	}
	function e(e) {
		return t({}, e)
	}
	fabric.util.object = {
		extend: t,
		clone: e
	}
}(),
function() {
	function t(t) {
		return t.replace(/-+(.)?/g, function(t, e) {
			return e ? e.toUpperCase() : ""
		})
	}
	function e(t, e) {
		return t.charAt(0).toUpperCase() + (e ? t.slice(1) : t.slice(1).toLowerCase())
	}
	function i(t) {
		return t.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
	}
	String.prototype.trim || (String.prototype.trim = function() {
		return this.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, "")
	}), fabric.util.string = {
		camelize: t,
		capitalize: e,
		escapeXml: i
	}
}(),
function() {
	var t = Array.prototype.slice,
		e = Function.prototype.apply,
		i = function() {};
	Function.prototype.bind || (Function.prototype.bind = function(n) {
		var r, o = this,
			s = t.call(arguments, 1);
		return r = s.length ? function() {
			return e.call(o, this instanceof i ? this : n, s.concat(t.call(arguments)))
		} : function() {
			return e.call(o, this instanceof i ? this : n, arguments)
		}, i.prototype = this.prototype, r.prototype = new i, r
	})
}(),
function() {
	function t() {}
	function e(t) {
		var e = this.constructor.superclass.prototype[t];
		return arguments.length > 1 ? e.apply(this, n.call(arguments, 1)) : e.call(this)
	}
	function i() {
		function i() {
			this.initialize.apply(this, arguments)
		}
		var o = null,
			a = n.call(arguments, 0);
		"function" == typeof a[0] && (o = a.shift()), i.superclass = o, i.subclasses = [], o && (t.prototype = o.prototype, i.prototype = new t, o.subclasses.push(i));
		for (var c = 0, h = a.length; h > c; c++) s(i, a[c], o);
		return i.prototype.initialize || (i.prototype.initialize = r), i.prototype.constructor = i, i.prototype.callSuper = e, i
	}
	var n = Array.prototype.slice,
		r = function() {}, o = function() {
			for (var t in {
				toString: 1
			}) if ("toString" === t) return !1;
			return !0
		}(),
		s = function(t, e, i) {
			for (var n in e) n in t.prototype && "function" == typeof t.prototype[n] && (e[n] + "").indexOf("callSuper") > -1 ? t.prototype[n] = function(t) {
				return function() {
					var n = this.constructor.superclass;
					this.constructor.superclass = i;
					var r = e[t].apply(this, arguments);
					return this.constructor.superclass = n, "initialize" !== t ? r : void 0
				}
			}(n) : t.prototype[n] = e[n], o && (e.toString !== Object.prototype.toString && (t.prototype.toString = e.toString), e.valueOf !== Object.prototype.valueOf && (t.prototype.valueOf = e.valueOf))
		};
	fabric.util.createClass = i
}(),
function() {
	function t(t) {
		var e, i, n = Array.prototype.slice.call(arguments, 1),
			r = n.length;
		for (i = 0; r > i; i++) if (e = typeof t[n[i]], !/^(?:function|object|unknown)$/.test(e)) return !1;
		return !0
	}
	function e(t, e) {
		return {
			handler: e,
			wrappedHandler: i(t, e)
		}
	}
	function i(t, e) {
		return function(i) {
			e.call(s(t), i || fabric.window.event)
		}
	}
	function n(t, e) {
		return function(i) {
			if (g[t] && g[t][e]) for (var n = g[t][e], r = 0, o = n.length; o > r; r++) n[r].call(this, i || fabric.window.event)
		}
	}
	function r(t) {
		t || (t = fabric.window.event);
		var e = t.target || (typeof t.srcElement !== c ? t.srcElement : null),
			i = fabric.util.getScrollLeftTop(e);
		return {
			x: v(t) + i.left,
			y: m(t) + i.top
		}
	}
	function o(t, e, i) {
		var n = "touchend" === t.type ? "changedTouches" : "touches";
		return t[n] && t[n][0] ? t[n][0][e] - (t[n][0][e] - t[n][0][i]) || t[i] : t[i]
	}
	var s, a, c = "unknown",
		h = function() {
			var t = 0;
			return function(e) {
				return e.__uniqueID || (e.__uniqueID = "uniqueID__" + t++)
			}
		}();
	! function() {
		var t = {};
		s = function(e) {
			return t[e]
		}, a = function(e, i) {
			t[e] = i
		}
	}();
	var l, u, f = t(fabric.document.documentElement, "addEventListener", "removeEventListener") && t(fabric.window, "addEventListener", "removeEventListener"),
		d = t(fabric.document.documentElement, "attachEvent", "detachEvent") && t(fabric.window, "attachEvent", "detachEvent"),
		p = {}, g = {};
	f ? (l = function(t, e, i) {
		t.addEventListener(e, i, !1)
	}, u = function(t, e, i) {
		t.removeEventListener(e, i, !1)
	}) : d ? (l = function(t, i, n) {
		var r = h(t);
		a(r, t), p[r] || (p[r] = {}), p[r][i] || (p[r][i] = []);
		var o = e(r, n);
		p[r][i].push(o), t.attachEvent("on" + i, o.wrappedHandler)
	}, u = function(t, e, i) {
		var n, r = h(t);
		if (p[r] && p[r][e]) for (var o = 0, s = p[r][e].length; s > o; o++) n = p[r][e][o], n && n.handler === i && (t.detachEvent("on" + e, n.wrappedHandler), p[r][e][o] = null)
	}) : (l = function(t, e, i) {
		var r = h(t);
		if (g[r] || (g[r] = {}), !g[r][e]) {
			g[r][e] = [];
			var o = t["on" + e];
			o && g[r][e].push(o), t["on" + e] = n(r, e)
		}
		g[r][e].push(i)
	}, u = function(t, e, i) {
		var n = h(t);
		if (g[n] && g[n][e]) for (var r = g[n][e], o = 0, s = r.length; s > o; o++) r[o] === i && r.splice(o, 1)
	}), fabric.util.addListener = l, fabric.util.removeListener = u;
	var v = function(t) {
		return typeof t.clientX !== c ? t.clientX : 0
	}, m = function(t) {
		return typeof t.clientY !== c ? t.clientY : 0
	};
	fabric.isTouchSupported && (v = function(t) {
		return o(t, "pageX", "clientX")
	}, m = function(t) {
		return o(t, "pageY", "clientY")
	}), fabric.util.getPointer = r, fabric.util.object.extend(fabric.util, fabric.Observable)
}(),
function() {
	function t(t, e) {
		var i = t.style;
		if (!i) return t;
		if ("string" == typeof e) return t.style.cssText += ";" + e, e.indexOf("opacity") > -1 ? o(t, e.match(/opacity:\s*(\d?\.?\d*)/)[1]) : t;
		for (var n in e) if ("opacity" === n) o(t, e[n]);
		else {
			var r = "float" === n || "cssFloat" === n ? "undefined" == typeof i.styleFloat ? "cssFloat" : "styleFloat" : n;
			i[r] = e[n]
		}
		return t
	}
	var e = fabric.document.createElement("div"),
		i = "string" == typeof e.style.opacity,
		n = "string" == typeof e.style.filter,
		r = /alpha\s*\(\s*opacity\s*=\s*([^\)]+)\)/,
		o = function(t) {
			return t
		};
	i ? o = function(t, e) {
		return t.style.opacity = e, t
	} : n && (o = function(t, e) {
		var i = t.style;
		return t.currentStyle && !t.currentStyle.hasLayout && (i.zoom = 1), r.test(i.filter) ? (e = e >= .9999 ? "" : "alpha(opacity=" + 100 * e + ")", i.filter = i.filter.replace(r, e)) : i.filter += " alpha(opacity=" + 100 * e + ")", t
	}), fabric.util.setStyle = t
}(),
function() {
	function t(t) {
		return "string" == typeof t ? fabric.document.getElementById(t) : t
	}
	function e(t, e) {
		var i = fabric.document.createElement(t);
		for (var n in e) "class" === n ? i.className = e[n] : "for" === n ? i.htmlFor = e[n] : i.setAttribute(n, e[n]);
		return i
	}
	function i(t, e) {
		t && -1 === (" " + t.className + " ").indexOf(" " + e + " ") && (t.className += (t.className ? " " : "") + e)
	}
	function n(t, i, n) {
		return "string" == typeof i && (i = e(i, n)), t.parentNode && t.parentNode.replaceChild(i, t), i.appendChild(t), i
	}
	function r(t) {
		for (var e = 0, i = 0, n = fabric.document.documentElement, r = fabric.document.body || {
			scrollLeft: 0,
			scrollTop: 0
		}; t && t.parentNode && (t = t.parentNode, t === fabric.document ? (e = r.scrollLeft || n.scrollLeft || 0, i = r.scrollTop || n.scrollTop || 0) : (e += t.scrollLeft || 0, i += t.scrollTop || 0), 1 !== t.nodeType || "fixed" !== fabric.util.getElementStyle(t, "position")););
		return {
			left: e,
			top: i
		}
	}
	function o(t) {
		var e, i, n = t && t.ownerDocument,
			o = {
				left: 0,
				top: 0
			}, s = {
				left: 0,
				top: 0
			}, a = {
				borderLeftWidth: "left",
				borderTopWidth: "top",
				paddingLeft: "left",
				paddingTop: "top"
			};
		if (!n) return s;
		for (var c in a) s[a[c]] += parseInt(l(t, c), 10) || 0;
		return e = n.documentElement, "undefined" != typeof t.getBoundingClientRect && (o = t.getBoundingClientRect()), i = r(t), {
			left: o.left + i.left - (e.clientLeft || 0) + s.left,
			top: o.top + i.top - (e.clientTop || 0) + s.top
		}
	}
	var s, a = Array.prototype.slice,
		c = function(t) {
			return a.call(t, 0)
		};
	try {
		s = c(fabric.document.childNodes) instanceof Array
	} catch (h) {}
	s || (c = function(t) {
		for (var e = new Array(t.length), i = t.length; i--;) e[i] = t[i];
		return e
	});
	var l;
	l = fabric.document.defaultView && fabric.document.defaultView.getComputedStyle ? function(t, e) {
		var i = fabric.document.defaultView.getComputedStyle(t, null);
		return i ? i[e] : void 0
	} : function(t, e) {
		var i = t.style[e];
		return !i && t.currentStyle && (i = t.currentStyle[e]), i
	},
	function() {
		function t(t) {
			return "undefined" != typeof t.onselectstart && (t.onselectstart = fabric.util.falseFunction), n ? t.style[n] = "none" : "string" == typeof t.unselectable && (t.unselectable = "on"), t
		}
		function e(t) {
			return "undefined" != typeof t.onselectstart && (t.onselectstart = null), n ? t.style[n] = "" : "string" == typeof t.unselectable && (t.unselectable = ""), t
		}
		var i = fabric.document.documentElement.style,
			n = "userSelect" in i ? "userSelect" : "MozUserSelect" in i ? "MozUserSelect" : "WebkitUserSelect" in i ? "WebkitUserSelect" : "KhtmlUserSelect" in i ? "KhtmlUserSelect" : "";
		fabric.util.makeElementUnselectable = t, fabric.util.makeElementSelectable = e
	}(),
	function() {
		function t(t, e) {
			var i = fabric.document.getElementsByTagName("head")[0],
				n = fabric.document.createElement("script"),
				r = !0;
			n.onload = n.onreadystatechange = function(t) {
				if (r) {
					if ("string" == typeof this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState) return;
					r = !1, e(t || fabric.window.event), n = n.onload = n.onreadystatechange = null
				}
			}, n.src = t, i.appendChild(n)
		}
		fabric.util.getScript = t
	}(), fabric.util.getById = t, fabric.util.toArray = c, fabric.util.makeElement = e, fabric.util.addClass = i, fabric.util.wrapElement = n, fabric.util.getScrollLeftTop = r, fabric.util.getElementOffset = o, fabric.util.getElementStyle = l
}(),
function() {
	function t(t, e) {
		return t + (/\?/.test(t) ? "&" : "?") + e
	}
	function e() {}
	function i(i, r) {
		r || (r = {});
		var o, s = r.method ? r.method.toUpperCase() : "GET",
			a = r.onComplete || function() {}, c = n();
		return c.onreadystatechange = function() {
			4 === c.readyState && (a(c), c.onreadystatechange = e)
		}, "GET" === s && (o = null, "string" == typeof r.parameters && (i = t(i, r.parameters))), c.open(s, i, !0), ("POST" === s || "PUT" === s) && c.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), c.send(o), c
	}
	var n = function() {
		for (var t = [function() {
			return new ActiveXObject("Microsoft.XMLHTTP")
		}, function() {
			return new ActiveXObject("Msxml2.XMLHTTP")
		}, function() {
			return new ActiveXObject("Msxml2.XMLHTTP.3.0")
		}, function() {
			return new XMLHttpRequest
		}], e = t.length; e--;) try {
			var i = t[e]();
			if (i) return t[e]
		} catch (n) {}
	}();
	fabric.util.request = i
}(), fabric.log = function() {}, fabric.warn = function() {}, "undefined" != typeof console && ["log", "warn"].forEach(function(t) {
	"undefined" != typeof console[t] && "function" == typeof console[t].apply && (fabric[t] = function() {
		return console[t].apply(console, arguments)
	})
}),
function() {
	function t(t) {
		e(function(i) {
			t || (t = {});
			var n, r = i || +new Date,
				o = t.duration || 500,
				s = r + o,
				a = t.onChange || function() {}, c = t.abort || function() {
					return !1
				}, h = t.easing || function(t, e, i, n) {
					return -i * Math.cos(t / n * (Math.PI / 2)) + i + e
				}, l = "startValue" in t ? t.startValue : 0,
				u = "endValue" in t ? t.endValue : 100,
				f = t.byValue || u - l;
			t.onStart && t.onStart(),
			function d(i) {
				n = i || +new Date;
				var u = n > s ? o : n - r;
				return c() ? void(t.onComplete && t.onComplete()) : (a(h(u, l, f, o)), n > s ? void(t.onComplete && t.onComplete()) : void e(d))
			}(r)
		})
	}
	function e() {
		return i.apply(fabric.window, arguments)
	}
	var i = fabric.window.requestAnimationFrame || fabric.window.webkitRequestAnimationFrame || fabric.window.mozRequestAnimationFrame || fabric.window.oRequestAnimationFrame || fabric.window.msRequestAnimationFrame || function(t) {
			fabric.window.setTimeout(t, 1e3 / 60)
		};
	fabric.util.animate = t, fabric.util.requestAnimFrame = e
}(),
function() {
	function t(t, e, i, n) {
		return t < Math.abs(e) ? (t = e, n = i / 4) : n = i / (2 * Math.PI) * Math.asin(e / t), {
			a: t,
			c: e,
			p: i,
			s: n
		}
	}
	function e(t, e, i) {
		return t.a * Math.pow(2, 10 * (e -= 1)) * Math.sin(2 * (e * i - t.s) * Math.PI / t.p)
	}
	function i(t, e, i, n) {
		return i * ((t = t / n - 1) * t * t + 1) + e
	}
	function n(t, e, i, n) {
		return t /= n / 2, 1 > t ? i / 2 * t * t * t + e : i / 2 * ((t -= 2) * t * t + 2) + e
	}
	function r(t, e, i, n) {
		return i * (t /= n) * t * t * t + e
	}
	function o(t, e, i, n) {
		return -i * ((t = t / n - 1) * t * t * t - 1) + e
	}
	function s(t, e, i, n) {
		return t /= n / 2, 1 > t ? i / 2 * t * t * t * t + e : -i / 2 * ((t -= 2) * t * t * t - 2) + e
	}
	function a(t, e, i, n) {
		return i * (t /= n) * t * t * t * t + e
	}
	function c(t, e, i, n) {
		return i * ((t = t / n - 1) * t * t * t * t + 1) + e
	}
	function h(t, e, i, n) {
		return t /= n / 2, 1 > t ? i / 2 * t * t * t * t * t + e : i / 2 * ((t -= 2) * t * t * t * t + 2) + e
	}
	function l(t, e, i, n) {
		return -i * Math.cos(t / n * (Math.PI / 2)) + i + e
	}
	function u(t, e, i, n) {
		return i * Math.sin(t / n * (Math.PI / 2)) + e
	}
	function f(t, e, i, n) {
		return -i / 2 * (Math.cos(Math.PI * t / n) - 1) + e
	}
	function d(t, e, i, n) {
		return 0 === t ? e : i * Math.pow(2, 10 * (t / n - 1)) + e
	}
	function p(t, e, i, n) {
		return t === n ? e + i : i * (-Math.pow(2, -10 * t / n) + 1) + e
	}
	function g(t, e, i, n) {
		return 0 === t ? e : t === n ? e + i : (t /= n / 2, 1 > t ? i / 2 * Math.pow(2, 10 * (t - 1)) + e : i / 2 * (-Math.pow(2, -10 * --t) + 2) + e)
	}
	function v(t, e, i, n) {
		return -i * (Math.sqrt(1 - (t /= n) * t) - 1) + e
	}
	function m(t, e, i, n) {
		return i * Math.sqrt(1 - (t = t / n - 1) * t) + e
	}
	function b(t, e, i, n) {
		return t /= n / 2, 1 > t ? -i / 2 * (Math.sqrt(1 - t * t) - 1) + e : i / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + e
	}
	function y(i, n, r, o) {
		var s = 1.70158,
			a = 0,
			c = r;
		if (0 === i) return n;
		if (i /= o, 1 === i) return n + r;
		a || (a = .3 * o);
		var h = t(c, r, a, s);
		return -e(h, i, o) + n
	}
	function _(e, i, n, r) {
		var o = 1.70158,
			s = 0,
			a = n;
		if (0 === e) return i;
		if (e /= r, 1 === e) return i + n;
		s || (s = .3 * r);
		var c = t(a, n, s, o);
		return c.a * Math.pow(2, -10 * e) * Math.sin(2 * (e * r - c.s) * Math.PI / c.p) + c.c + i
	}
	function w(i, n, r, o) {
		var s = 1.70158,
			a = 0,
			c = r;
		if (0 === i) return n;
		if (i /= o / 2, 2 === i) return n + r;
		a || (a = .3 * o * 1.5);
		var h = t(c, r, a, s);
		return 1 > i ? -.5 * e(h, i, o) + n : h.a * Math.pow(2, -10 * (i -= 1)) * Math.sin(2 * (i * o - h.s) * Math.PI / h.p) * .5 + h.c + n
	}
	function x(t, e, i, n, r) {
		return void 0 === r && (r = 1.70158), i * (t /= n) * t * ((r + 1) * t - r) + e
	}
	function S(t, e, i, n, r) {
		return void 0 === r && (r = 1.70158), i * ((t = t / n - 1) * t * ((r + 1) * t + r) + 1) + e
	}
	function C(t, e, i, n, r) {
		return void 0 === r && (r = 1.70158), t /= n / 2, 1 > t ? i / 2 * t * t * (((r *= 1.525) + 1) * t - r) + e : i / 2 * ((t -= 2) * t * (((r *= 1.525) + 1) * t + r) + 2) + e
	}
	function k(t, e, i, n) {
		return i - T(n - t, 0, i, n) + e
	}
	function T(t, e, i, n) {
		return (t /= n) < 1 / 2.75 ? 7.5625 * i * t * t + e : 2 / 2.75 > t ? i * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + e : 2.5 / 2.75 > t ? i * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + e : i * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + e
	}
	function E(t, e, i, n) {
		return n / 2 > t ? .5 * k(2 * t, 0, i, n) + e : .5 * T(2 * t - n, 0, i, n) + .5 * i + e
	}
	fabric.util.ease = {
		easeInQuad: function(t, e, i, n) {
			return i * (t /= n) * t + e
		},
		easeOutQuad: function(t, e, i, n) {
			return -i * (t /= n) * (t - 2) + e
		},
		easeInOutQuad: function(t, e, i, n) {
			return t /= n / 2, 1 > t ? i / 2 * t * t + e : -i / 2 * (--t * (t - 2) - 1) + e
		},
		easeInCubic: function(t, e, i, n) {
			return i * (t /= n) * t * t + e
		},
		easeOutCubic: i,
		easeInOutCubic: n,
		easeInQuart: r,
		easeOutQuart: o,
		easeInOutQuart: s,
		easeInQuint: a,
		easeOutQuint: c,
		easeInOutQuint: h,
		easeInSine: l,
		easeOutSine: u,
		easeInOutSine: f,
		easeInExpo: d,
		easeOutExpo: p,
		easeInOutExpo: g,
		easeInCirc: v,
		easeOutCirc: m,
		easeInOutCirc: b,
		easeInElastic: y,
		easeOutElastic: _,
		easeInOutElastic: w,
		easeInBack: x,
		easeOutBack: S,
		easeInOutBack: C,
		easeInBounce: k,
		easeOutBounce: T,
		easeInOutBounce: E
	}
}(),
function(t) {
	"use strict";

	function e(t, e) {
		this.x = t, this.y = e
	}
	var i = t.fabric || (t.fabric = {});
	return i.Point ? void i.warn("fabric.Point is already defined") : (i.Point = e, void(e.prototype = {
		constructor: e,
		add: function(t) {
			return new e(this.x + t.x, this.y + t.y)
		},
		addEquals: function(t) {
			return this.x += t.x, this.y += t.y, this
		},
		scalarAdd: function(t) {
			return new e(this.x + t, this.y + t)
		},
		scalarAddEquals: function(t) {
			return this.x += t, this.y += t, this
		},
		subtract: function(t) {
			return new e(this.x - t.x, this.y - t.y)
		},
		subtractEquals: function(t) {
			return this.x -= t.x, this.y -= t.y, this
		},
		scalarSubtract: function(t) {
			return new e(this.x - t, this.y - t)
		},
		scalarSubtractEquals: function(t) {
			return this.x -= t, this.y -= t, this
		},
		multiply: function(t) {
			return new e(this.x * t, this.y * t)
		},
		multiplyEquals: function(t) {
			return this.x *= t, this.y *= t, this
		},
		divide: function(t) {
			return new e(this.x / t, this.y / t)
		},
		divideEquals: function(t) {
			return this.x /= t, this.y /= t, this
		},
		eq: function(t) {
			return this.x === t.x && this.y === t.y
		},
		lt: function(t) {
			return this.x < t.x && this.y < t.y
		},
		lte: function(t) {
			return this.x <= t.x && this.y <= t.y
		},
		gt: function(t) {
			return this.x > t.x && this.y > t.y
		},
		gte: function(t) {
			return this.x >= t.x && this.y >= t.y
		},
		lerp: function(t, i) {
			return new e(this.x + (t.x - this.x) * i, this.y + (t.y - this.y) * i)
		},
		distanceFrom: function(t) {
			var e = this.x - t.x,
				i = this.y - t.y;
			return Math.sqrt(e * e + i * i)
		},
		midPointFrom: function(t) {
			return new e(this.x + (t.x - this.x) / 2, this.y + (t.y - this.y) / 2)
		},
		min: function(t) {
			return new e(Math.min(this.x, t.x), Math.min(this.y, t.y))
		},
		max: function(t) {
			return new e(Math.max(this.x, t.x), Math.max(this.y, t.y))
		},
		toString: function() {
			return this.x + "," + this.y
		},
		setXY: function(t, e) {
			this.x = t, this.y = e
		},
		setFromPoint: function(t) {
			this.x = t.x, this.y = t.y
		},
		swap: function(t) {
			var e = this.x,
				i = this.y;
			this.x = t.x, this.y = t.y, t.x = e, t.y = i
		}
	}))
}("undefined" != typeof exports ? exports : this),
function(t) {
	"use strict";

	function e(t) {
		this.status = t, this.points = []
	}
	var i = t.fabric || (t.fabric = {});
	return i.Intersection ? void i.warn("fabric.Intersection is already defined") : (i.Intersection = e, i.Intersection.prototype = {
		appendPoint: function(t) {
			this.points.push(t)
		},
		appendPoints: function(t) {
			this.points = this.points.concat(t)
		}
	}, i.Intersection.intersectLineLine = function(t, n, r, o) {
		var s, a = (o.x - r.x) * (t.y - r.y) - (o.y - r.y) * (t.x - r.x),
			c = (n.x - t.x) * (t.y - r.y) - (n.y - t.y) * (t.x - r.x),
			h = (o.y - r.y) * (n.x - t.x) - (o.x - r.x) * (n.y - t.y);
		if (0 !== h) {
			var l = a / h,
				u = c / h;
			l >= 0 && 1 >= l && u >= 0 && 1 >= u ? (s = new e("Intersection"), s.points.push(new i.Point(t.x + l * (n.x - t.x), t.y + l * (n.y - t.y)))) : s = new e
		} else s = new e(0 === a || 0 === c ? "Coincident" : "Parallel");
		return s
	}, i.Intersection.intersectLinePolygon = function(t, i, n) {
		for (var r = new e, o = n.length, s = 0; o > s; s++) {
			var a = n[s],
				c = n[(s + 1) % o],
				h = e.intersectLineLine(t, i, a, c);
			r.appendPoints(h.points)
		}
		return r.points.length > 0 && (r.status = "Intersection"), r
	}, i.Intersection.intersectPolygonPolygon = function(t, i) {
		for (var n = new e, r = t.length, o = 0; r > o; o++) {
			var s = t[o],
				a = t[(o + 1) % r],
				c = e.intersectLinePolygon(s, a, i);
			n.appendPoints(c.points)
		}
		return n.points.length > 0 && (n.status = "Intersection"), n
	}, void(i.Intersection.intersectPolygonRectangle = function(t, n, r) {
		var o = n.min(r),
			s = n.max(r),
			a = new i.Point(s.x, o.y),
			c = new i.Point(o.x, s.y),
			h = e.intersectLinePolygon(o, a, t),
			l = e.intersectLinePolygon(a, s, t),
			u = e.intersectLinePolygon(s, c, t),
			f = e.intersectLinePolygon(c, o, t),
			d = new e;
		return d.appendPoints(h.points), d.appendPoints(l.points), d.appendPoints(u.points), d.appendPoints(f.points), d.points.length > 0 && (d.status = "Intersection"), d
	}))
}("undefined" != typeof exports ? exports : this),
function(t) {
	"use strict";

	function e(t) {
		t ? this._tryParsingColor(t) : this.setSource([0, 0, 0, 1])
	}
	function i(t, e, i) {
		return 0 > i && (i += 1), i > 1 && (i -= 1), 1 / 6 > i ? t + 6 * (e - t) * i : .5 > i ? e : 2 / 3 > i ? t + (e - t) * (2 / 3 - i) * 6 : t
	}
	var n = t.fabric || (t.fabric = {});
	return n.Color ? void n.warn("fabric.Color is already defined.") : (n.Color = e, n.Color.prototype = {
		_tryParsingColor: function(t) {
			var i;
			return t in e.colorNameMap && (t = e.colorNameMap[t]), "transparent" === t ? void this.setSource([255, 255, 255, 0]) : (i = e.sourceFromHex(t), i || (i = e.sourceFromRgb(t)), i || (i = e.sourceFromHsl(t)), void(i && this.setSource(i)))
		},
		_rgbToHsl: function(t, e, i) {
			t /= 255, e /= 255, i /= 255;
			var r, o, s, a = n.util.array.max([t, e, i]),
				c = n.util.array.min([t, e, i]);
			if (s = (a + c) / 2, a === c) r = o = 0;
			else {
				var h = a - c;
				switch (o = s > .5 ? h / (2 - a - c) : h / (a + c), a) {
					case t:
						r = (e - i) / h + (i > e ? 6 : 0);
						break;
					case e:
						r = (i - t) / h + 2;
						break;
					case i:
						r = (t - e) / h + 4
				}
				r /= 6
			}
			return [Math.round(360 * r), Math.round(100 * o), Math.round(100 * s)]
		},
		getSource: function() {
			return this._source
		},
		setSource: function(t) {
			this._source = t
		},
		toRgb: function() {
			var t = this.getSource();
			return "rgb(" + t[0] + "," + t[1] + "," + t[2] + ")"
		},
		toRgba: function() {
			var t = this.getSource();
			return "rgba(" + t[0] + "," + t[1] + "," + t[2] + "," + t[3] + ")"
		},
		toHsl: function() {
			var t = this.getSource(),
				e = this._rgbToHsl(t[0], t[1], t[2]);
			return "hsl(" + e[0] + "," + e[1] + "%," + e[2] + "%)"
		},
		toHsla: function() {
			var t = this.getSource(),
				e = this._rgbToHsl(t[0], t[1], t[2]);
			return "hsla(" + e[0] + "," + e[1] + "%," + e[2] + "%," + t[3] + ")"
		},
		toHex: function() {
			var t, e, i, n = this.getSource();
			return t = n[0].toString(16), t = 1 === t.length ? "0" + t : t, e = n[1].toString(16), e = 1 === e.length ? "0" + e : e, i = n[2].toString(16), i = 1 === i.length ? "0" + i : i, t.toUpperCase() + e.toUpperCase() + i.toUpperCase()
		},
		getAlpha: function() {
			return this.getSource()[3]
		},
		setAlpha: function(t) {
			var e = this.getSource();
			return e[3] = t, this.setSource(e), this
		},
		toGrayscale: function() {
			var t = this.getSource(),
				e = parseInt((.3 * t[0] + .59 * t[1] + .11 * t[2]).toFixed(0), 10),
				i = t[3];
			return this.setSource([e, e, e, i]), this
		},
		toBlackWhite: function(t) {
			var e = this.getSource(),
				i = (.3 * e[0] + .59 * e[1] + .11 * e[2]).toFixed(0),
				n = e[3];
			return t = t || 127, i = Number(i) < Number(t) ? 0 : 255, this.setSource([i, i, i, n]), this
		},
		overlayWith: function(t) {
			t instanceof e || (t = new e(t));
			for (var i = [], n = this.getAlpha(), r = .5, o = this.getSource(), s = t.getSource(), a = 0; 3 > a; a++) i.push(Math.round(o[a] * (1 - r) + s[a] * r));
			return i[3] = n, this.setSource(i), this
		}
	}, n.Color.reRGBa = /^rgba?\(\s*(\d{1,3}(?:\.\d+)?\%?)\s*,\s*(\d{1,3}(?:\.\d+)?\%?)\s*,\s*(\d{1,3}(?:\.\d+)?\%?)\s*(?:\s*,\s*(\d+(?:\.\d+)?)\s*)?\)$/, n.Color.reHSLa = /^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3}\%)\s*,\s*(\d{1,3}\%)\s*(?:\s*,\s*(\d+(?:\.\d+)?)\s*)?\)$/, n.Color.reHex = /^#?([0-9a-f]{6}|[0-9a-f]{3})$/i, n.Color.colorNameMap = {
		aqua: "#00FFFF",
		black: "#000000",
		blue: "#0000FF",
		fuchsia: "#FF00FF",
		gray: "#808080",
		green: "#008000",
		lime: "#00FF00",
		maroon: "#800000",
		navy: "#000080",
		olive: "#808000",
		orange: "#FFA500",
		purple: "#800080",
		red: "#FF0000",
		silver: "#C0C0C0",
		teal: "#008080",
		white: "#FFFFFF",
		yellow: "#FFFF00"
	}, n.Color.fromRgb = function(t) {
		return e.fromSource(e.sourceFromRgb(t))
	}, n.Color.sourceFromRgb = function(t) {
		var i = t.match(e.reRGBa);
		if (i) {
			var n = parseInt(i[1], 10) / (/%$/.test(i[1]) ? 100 : 1) * (/%$/.test(i[1]) ? 255 : 1),
				r = parseInt(i[2], 10) / (/%$/.test(i[2]) ? 100 : 1) * (/%$/.test(i[2]) ? 255 : 1),
				o = parseInt(i[3], 10) / (/%$/.test(i[3]) ? 100 : 1) * (/%$/.test(i[3]) ? 255 : 1);
			return [parseInt(n, 10), parseInt(r, 10), parseInt(o, 10), i[4] ? parseFloat(i[4]) : 1]
		}
	}, n.Color.fromRgba = e.fromRgb, n.Color.fromHsl = function(t) {
		return e.fromSource(e.sourceFromHsl(t))
	}, n.Color.sourceFromHsl = function(t) {
		var n = t.match(e.reHSLa);
		if (n) {
			var r, o, s, a = (parseFloat(n[1]) % 360 + 360) % 360 / 360,
				c = parseFloat(n[2]) / (/%$/.test(n[2]) ? 100 : 1),
				h = parseFloat(n[3]) / (/%$/.test(n[3]) ? 100 : 1);
			if (0 === c) r = o = s = h;
			else {
				var l = .5 >= h ? h * (c + 1) : h + c - h * c,
					u = 2 * h - l;
				r = i(u, l, a + 1 / 3), o = i(u, l, a), s = i(u, l, a - 1 / 3)
			}
			return [Math.round(255 * r), Math.round(255 * o), Math.round(255 * s), n[4] ? parseFloat(n[4]) : 1]
		}
	}, n.Color.fromHsla = e.fromHsl, n.Color.fromHex = function(t) {
		return e.fromSource(e.sourceFromHex(t))
	}, n.Color.sourceFromHex = function(t) {
		if (t.match(e.reHex)) {
			var i = t.slice(t.indexOf("#") + 1),
				n = 3 === i.length,
				r = n ? i.charAt(0) + i.charAt(0) : i.substring(0, 2),
				o = n ? i.charAt(1) + i.charAt(1) : i.substring(2, 4),
				s = n ? i.charAt(2) + i.charAt(2) : i.substring(4, 6);
			return [parseInt(r, 16), parseInt(o, 16), parseInt(s, 16), 1]
		}
	}, void(n.Color.fromSource = function(t) {
		var i = new e;
		return i.setSource(t), i
	}))
}("undefined" != typeof exports ? exports : this),
function() {
	function t(t, e, i) {
		var n, r = 0,
			o = 1,
			s = "";
		for (var a in e) n = parseFloat(e[a], 10), o = "string" == typeof e[a] && /^\d+%$/.test(e[a]) ? .01 : 1, "x1" === a || "x2" === a || "r2" === a ? (o *= "objectBoundingBox" === i ? t.width : 1, r = "objectBoundingBox" === i ? t.left || 0 : 0) : ("y1" === a || "y2" === a) && (o *= "objectBoundingBox" === i ? t.height : 1,
		r = "objectBoundingBox" === i ? t.top || 0 : 0), e[a] = n * o + r;
		if ("ellipse" === t.type && null !== e.r2 && "objectBoundingBox" === i && t.rx !== t.ry) {
			var c = t.ry / t.rx;
			s = " scale(1, " + c + ")", e.y1 && (e.y1 /= c), e.y2 && (e.y2 /= c)
		}
		return s
	}
	fabric.Gradient = fabric.util.createClass({
		offsetX: 0,
		offsetY: 0,
		initialize: function(t) {
			t || (t = {});
			var e = {};
			this.id = fabric.Object.__uid++, this.type = t.type || "linear", e = {
				x1: t.coords.x1 || 0,
				y1: t.coords.y1 || 0,
				x2: t.coords.x2 || 0,
				y2: t.coords.y2 || 0
			}, "radial" === this.type && (e.r1 = t.coords.r1 || 0, e.r2 = t.coords.r2 || 0), this.coords = e, this.colorStops = t.colorStops.slice(), t.gradientTransform && (this.gradientTransform = t.gradientTransform), this.offsetX = t.offsetX || this.offsetX, this.offsetY = t.offsetY || this.offsetY
		},
		addColorStop: function(t) {
			for (var e in t) {
				var i = new fabric.Color(t[e]);
				this.colorStops.push({
					offset: e,
					color: i.toRgb(),
					opacity: i.getAlpha()
				})
			}
			return this
		},
		toObject: function() {
			return {
				type: this.type,
				coords: this.coords,
				colorStops: this.colorStops,
				offsetX: this.offsetX,
				offsetY: this.offsetY
			}
		},
		toLive: function(t, e) {
			var i, n, r = fabric.util.object.clone(this.coords);
			if (this.type) {
				if (e.group && "path-group" === e.group.type) for (n in r) "x1" === n || "x2" === n ? r[n] += -this.offsetX + e.width / 2 : ("y1" === n || "y2" === n) && (r[n] += -this.offsetY + e.height / 2);
				"linear" === this.type ? i = t.createLinearGradient(r.x1, r.y1, r.x2, r.y2) : "radial" === this.type && (i = t.createRadialGradient(r.x1, r.y1, r.r1, r.x2, r.y2, r.r2));
				for (var o = 0, s = this.colorStops.length; s > o; o++) {
					var a = this.colorStops[o].color,
						c = this.colorStops[o].opacity,
						h = this.colorStops[o].offset;
					"undefined" != typeof c && (a = new fabric.Color(a).setAlpha(c).toRgba()), i.addColorStop(parseFloat(h), a)
				}
				return i
			}
		}
	}), fabric.util.object.extend(fabric.Gradient, {
		forObject: function(e, i) {
			return i || (i = {}), t(e, i.coords, "userSpaceOnUse"), new fabric.Gradient(i)
		}
	})
}(), fabric.Pattern = fabric.util.createClass({
	repeat: "repeat",
	offsetX: 0,
	offsetY: 0,
	initialize: function(t) {
		if (t || (t = {}), this.id = fabric.Object.__uid++, t.source) if ("string" == typeof t.source) if ("undefined" != typeof fabric.util.getFunctionBody(t.source)) this.source = new Function(fabric.util.getFunctionBody(t.source));
		else {
			var e = this;
			this.source = fabric.util.createImage(), fabric.util.loadImage(t.source, function(t) {
				e.source = t
			})
		} else this.source = t.source;
		t.repeat && (this.repeat = t.repeat), t.offsetX && (this.offsetX = t.offsetX), t.offsetY && (this.offsetY = t.offsetY)
	},
	toObject: function() {
		var t;
		return "function" == typeof this.source ? t = String(this.source) : "string" == typeof this.source.src ? t = this.source.src : "object" == typeof this.source && this.source.toDataURL && (t = this.source.toDataURL()), {
			source: t,
			repeat: this.repeat,
			offsetX: this.offsetX,
			offsetY: this.offsetY
		}
	},
	toLive: function(t) {
		var e = "function" == typeof this.source ? this.source() : this.source;
		if (!e) return "";
		if ("undefined" != typeof e.src) {
			if (!e.complete) return "";
			if (0 === e.naturalWidth || 0 === e.naturalHeight) return ""
		}
		return t.createPattern(e, this.repeat)
	}
}),
function(t) {
	"use strict";
	var e = t.fabric || (t.fabric = {});
	e.util.toFixed;
	return e.Shadow ? void e.warn("fabric.Shadow is already defined.") : (e.Shadow = e.util.createClass({
		color: "rgb(0,0,0)",
		blur: 0,
		offsetX: 0,
		offsetY: 0,
		affectStroke: !1,
		includeDefaultValues: !0,
		initialize: function(t) {
			"string" == typeof t && (t = this._parseShadow(t));
			for (var i in t) this[i] = t[i];
			this.id = e.Object.__uid++
		},
		_parseShadow: function(t) {
			var i = t.trim(),
				n = e.Shadow.reOffsetsAndBlur.exec(i) || [],
				r = i.replace(e.Shadow.reOffsetsAndBlur, "") || "rgb(0,0,0)";
			return {
				color: r.trim(),
				offsetX: parseInt(n[1], 10) || 0,
				offsetY: parseInt(n[2], 10) || 0,
				blur: parseInt(n[3], 10) || 0
			}
		},
		toString: function() {
			return [this.offsetX, this.offsetY, this.blur, this.color].join("px ")
		},
		toObject: function() {
			if (this.includeDefaultValues) return {
				color: this.color,
				blur: this.blur,
				offsetX: this.offsetX,
				offsetY: this.offsetY
			};
			var t = {}, i = e.Shadow.prototype;
			return this.color !== i.color && (t.color = this.color), this.blur !== i.blur && (t.blur = this.blur), this.offsetX !== i.offsetX && (t.offsetX = this.offsetX), this.offsetY !== i.offsetY && (t.offsetY = this.offsetY), t
		}
	}), void(e.Shadow.reOffsetsAndBlur = /(?:\s|^)(-?\d+(?:px)?(?:\s?|$))?(-?\d+(?:px)?(?:\s?|$))?(\d+(?:px)?)?(?:\s?|$)(?:$|\s)/))
}("undefined" != typeof exports ? exports : this),
function() {
	"use strict";
	if (fabric.StaticCanvas) return void fabric.warn("fabric.StaticCanvas is already defined.");
	var t = fabric.util.object.extend,
		e = fabric.util.getElementOffset,
		i = fabric.util.removeFromArray,
		n = new Error("Could not initialize `canvas` element");
	fabric.StaticCanvas = fabric.util.createClass({
		initialize: function(t, e) {
			e || (e = {}), this._initStatic(t, e), fabric.StaticCanvas.activeInstance = this
		},
		backgroundColor: "",
		backgroundImage: null,
		overlayColor: "",
		overlayImage: null,
		includeDefaultValues: !0,
		stateful: !0,
		renderOnAddRemove: !0,
		clipTo: null,
		controlsAboveOverlay: !1,
		allowTouchScrolling: !1,
		imageSmoothingEnabled: !0,
		preserveObjectStacking: !1,
		viewportTransform: [1, 0, 0, 1, 0, 0],
		onBeforeScaleRotate: function() {},
		enableRetinaScaling: !0,
		_initStatic: function(t, e) {
			this._objects = [], this._createLowerCanvas(t), this._initOptions(e), this._setImageSmoothing(), this.interactive || this._initRetinaScaling(), e.overlayImage && this.setOverlayImage(e.overlayImage, this.renderAll.bind(this)), e.backgroundImage && this.setBackgroundImage(e.backgroundImage, this.renderAll.bind(this)), e.backgroundColor && this.setBackgroundColor(e.backgroundColor, this.renderAll.bind(this)), e.overlayColor && this.setOverlayColor(e.overlayColor, this.renderAll.bind(this)), this.calcOffset()
		},
		_initRetinaScaling: function() {
			1 !== fabric.devicePixelRatio && this.enableRetinaScaling && (this.lowerCanvasEl.setAttribute("width", this.width * fabric.devicePixelRatio), this.lowerCanvasEl.setAttribute("height", this.height * fabric.devicePixelRatio), this.contextContainer.scale(fabric.devicePixelRatio, fabric.devicePixelRatio))
		},
		calcOffset: function() {
			return this._offset = e(this.lowerCanvasEl), this
		},
		setOverlayImage: function(t, e, i) {
			return this.__setBgOverlayImage("overlayImage", t, e, i)
		},
		setBackgroundImage: function(t, e, i) {
			return this.__setBgOverlayImage("backgroundImage", t, e, i)
		},
		setOverlayColor: function(t, e) {
			return this.__setBgOverlayColor("overlayColor", t, e)
		},
		setBackgroundColor: function(t, e) {
			return this.__setBgOverlayColor("backgroundColor", t, e)
		},
		_setImageSmoothing: function() {
			var t = this.getContext();
			return "undefined" != typeof t.imageSmoothingEnabled ? void(t.imageSmoothingEnabled = this.imageSmoothingEnabled) : (t.webkitImageSmoothingEnabled = this.imageSmoothingEnabled, t.mozImageSmoothingEnabled = this.imageSmoothingEnabled, t.msImageSmoothingEnabled = this.imageSmoothingEnabled, void(t.oImageSmoothingEnabled = this.imageSmoothingEnabled))
		},
		__setBgOverlayImage: function(t, e, i, n) {
			return "string" == typeof e ? fabric.util.loadImage(e, function(e) {
				this[t] = new fabric.Image(e, n), i && i()
			}, this, n && n.crossOrigin) : (n && e.setOptions(n), this[t] = e, i && i()), this
		},
		__setBgOverlayColor: function(t, e, i) {
			if (e && e.source) {
				var n = this;
				fabric.util.loadImage(e.source, function(r) {
					n[t] = new fabric.Pattern({
						source: r,
						repeat: e.repeat,
						offsetX: e.offsetX,
						offsetY: e.offsetY
					}), i && i()
				})
			} else this[t] = e, i && i();
			return this
		},
		_createCanvasElement: function() {
			var t = fabric.document.createElement("canvas");
			if (t.style || (t.style = {}), !t) throw n;
			return this._initCanvasElement(t), t
		},
		_initCanvasElement: function(t) {
			if (fabric.util.createCanvasElement(t), "undefined" == typeof t.getContext) throw n
		},
		_initOptions: function(t) {
			for (var e in t) this[e] = t[e];
			this.width = this.width || parseInt(this.lowerCanvasEl.width, 10) || 0, this.height = this.height || parseInt(this.lowerCanvasEl.height, 10) || 0, this.lowerCanvasEl.style && (this.lowerCanvasEl.width = this.width, this.lowerCanvasEl.height = this.height, this.lowerCanvasEl.style.width = this.width + "px", this.lowerCanvasEl.style.height = this.height + "px", this.viewportTransform = this.viewportTransform.slice())
		},
		_createLowerCanvas: function(t) {
			this.lowerCanvasEl = fabric.util.getById(t) || this._createCanvasElement(), this._initCanvasElement(this.lowerCanvasEl), fabric.util.addClass(this.lowerCanvasEl, "lower-canvas"), this.interactive && this._applyCanvasStyle(this.lowerCanvasEl), this.contextContainer = this.lowerCanvasEl.getContext("2d")
		},
		getWidth: function() {
			return this.width
		},
		getHeight: function() {
			return this.height
		},
		setWidth: function(t, e) {
			return this.setDimensions({
				width: t
			}, e)
		},
		setHeight: function(t, e) {
			return this.setDimensions({
				height: t
			}, e)
		},
		setDimensions: function(t, e) {
			var i;
			e = e || {};
			for (var n in t) i = t[n], e.cssOnly || (this._setBackstoreDimension(n, t[n]), i += "px"), e.backstoreOnly || this._setCssDimension(n, i);
			return this._setImageSmoothing(), this.calcOffset(), e.cssOnly || this.renderAll(), this
		},
		_setBackstoreDimension: function(t, e) {
			return this.lowerCanvasEl[t] = e, this.upperCanvasEl && (this.upperCanvasEl[t] = e), this.cacheCanvasEl && (this.cacheCanvasEl[t] = e), this[t] = e, this
		},
		_setCssDimension: function(t, e) {
			return this.lowerCanvasEl.style[t] = e, this.upperCanvasEl && (this.upperCanvasEl.style[t] = e), this.wrapperEl && (this.wrapperEl.style[t] = e), this
		},
		getZoom: function() {
			return Math.sqrt(this.viewportTransform[0] * this.viewportTransform[3])
		},
		setViewportTransform: function(t) {
			var e = this.getActiveGroup();
			this.viewportTransform = t, this.renderAll();
			for (var i = 0, n = this._objects.length; n > i; i++) this._objects[i].setCoords();
			return e && e.setCoords(), this
		},
		zoomToPoint: function(t, e) {
			var i = t;
			t = fabric.util.transformPoint(t, fabric.util.invertTransform(this.viewportTransform)), this.viewportTransform[0] = e, this.viewportTransform[3] = e;
			var n = fabric.util.transformPoint(t, this.viewportTransform);
			this.viewportTransform[4] += i.x - n.x, this.viewportTransform[5] += i.y - n.y, this.renderAll();
			for (var r = 0, o = this._objects.length; o > r; r++) this._objects[r].setCoords();
			return this
		},
		setZoom: function(t) {
			return this.zoomToPoint(new fabric.Point(0, 0), t), this
		},
		absolutePan: function(t) {
			this.viewportTransform[4] = -t.x, this.viewportTransform[5] = -t.y, this.renderAll();
			for (var e = 0, i = this._objects.length; i > e; e++) this._objects[e].setCoords();
			return this
		},
		relativePan: function(t) {
			return this.absolutePan(new fabric.Point(-t.x - this.viewportTransform[4], -t.y - this.viewportTransform[5]))
		},
		getElement: function() {
			return this.lowerCanvasEl
		},
		getActiveObject: function() {
			return null
		},
		getActiveGroup: function() {
			return null
		},
		_draw: function(t, e) {
			if (e) {
				t.save();
				var i = this.viewportTransform;
				t.transform(i[0], i[1], i[2], i[3], i[4], i[5]), this._shouldRenderObject(e) && e.render(t), t.restore(), this.controlsAboveOverlay || e._renderControls(t)
			}
		},
		_shouldRenderObject: function(t) {
			return t ? t !== this.getActiveGroup() || !this.preserveObjectStacking : !1
		},
		_onObjectAdded: function(t) {
			this.stateful && t.setupState(), t._set("canvas", this), t.setCoords(), this.fire("object:added", {
				target: t
			}), t.fire("added")
		},
		_onObjectRemoved: function(t) {
			this.getActiveObject() === t && (this.fire("before:selection:cleared", {
				target: t
			}), this._discardActiveObject(), this.fire("selection:cleared")), this.fire("object:removed", {
				target: t
			}), t.fire("removed")
		},
		clearContext: function(t) {
			return t.clearRect(0, 0, this.width, this.height), this
		},
		getContext: function() {
			return this.contextContainer
		},
		clear: function() {
			return this._objects.length = 0, this.discardActiveGroup && this.discardActiveGroup(), this.discardActiveObject && this.discardActiveObject(), this.clearContext(this.contextContainer), this.contextTop && this.clearContext(this.contextTop), this.fire("canvas:cleared"), this.renderAll(), this
		},
		renderAll: function(t) {
			var e = this[t === !0 && this.interactive ? "contextTop" : "contextContainer"],
				i = this.getActiveGroup();
			return this.contextTop && this.selection && !this._groupSelector && this.clearContext(this.contextTop), t || this.clearContext(e), this.fire("before:render"), this.clipTo && fabric.util.clipContext(this, e), this._renderBackground(e), this._renderObjects(e, i), this._renderActiveGroup(e, i), this.clipTo && e.restore(), this._renderOverlay(e), this.controlsAboveOverlay && this.interactive && this.drawControls(e), this.fire("after:render"), this
		},
		_renderObjects: function(t, e) {
			var i, n;
			if (!e || this.preserveObjectStacking) for (i = 0, n = this._objects.length; n > i; ++i) this._draw(t, this._objects[i]);
			else for (i = 0, n = this._objects.length; n > i; ++i) this._objects[i] && !e.contains(this._objects[i]) && this._draw(t, this._objects[i])
		},
		_renderActiveGroup: function(t, e) {
			if (e) {
				var i = [];
				this.forEachObject(function(t) {
					e.contains(t) && i.push(t)
				}), e._set("_objects", i.reverse()), this._draw(t, e)
			}
		},
		_renderBackground: function(t) {
			this.backgroundColor && (t.fillStyle = this.backgroundColor.toLive ? this.backgroundColor.toLive(t) : this.backgroundColor, t.fillRect(this.backgroundColor.offsetX || 0, this.backgroundColor.offsetY || 0, this.width, this.height)), this.backgroundImage && this._draw(t, this.backgroundImage)
		},
		_renderOverlay: function(t) {
			this.overlayColor && (t.fillStyle = this.overlayColor.toLive ? this.overlayColor.toLive(t) : this.overlayColor, t.fillRect(this.overlayColor.offsetX || 0, this.overlayColor.offsetY || 0, this.width, this.height)), this.overlayImage && this._draw(t, this.overlayImage)
		},
		renderTop: function() {
			var t = this.contextTop || this.contextContainer;
			this.clearContext(t), this.selection && this._groupSelector && this._drawSelection();
			var e = this.getActiveGroup();
			return e && e.render(t), this._renderOverlay(t), this.fire("after:render"), this
		},
		getCenter: function() {
			return {
				top: this.getHeight() / 2,
				left: this.getWidth() / 2
			}
		},
		centerObjectH: function(t) {
			return this._centerObject(t, new fabric.Point(this.getCenter().left, t.getCenterPoint().y)), this.renderAll(), this
		},
		centerObjectV: function(t) {
			return this._centerObject(t, new fabric.Point(t.getCenterPoint().x, this.getCenter().top)), this.renderAll(), this
		},
		centerObject: function(t) {
			var e = this.getCenter();
			return this._centerObject(t, new fabric.Point(e.left, e.top)), this.renderAll(), this
		},
		_centerObject: function(t, e) {
			return t.setPositionByOrigin(e, "center", "center"), this
		},
		toDatalessJSON: function(t) {
			return this.toDatalessObject(t)
		},
		toObject: function(t) {
			return this._toObjectMethod("toObject", t)
		},
		toDatalessObject: function(t) {
			return this._toObjectMethod("toDatalessObject", t)
		},
		_toObjectMethod: function(e, i) {
			var n = {
				objects: this._toObjects(e, i)
			};
			return t(n, this.__serializeBgOverlay()), fabric.util.populateWithProperties(this, n, i), n
		},
		_toObjects: function(t, e) {
			return this.getObjects().map(function(i) {
				return this._toObject(i, t, e)
			}, this)
		},
		_toObject: function(t, e, i) {
			var n;
			this.includeDefaultValues || (n = t.includeDefaultValues, t.includeDefaultValues = !1);
			var r = this._realizeGroupTransformOnObject(t),
				o = t[e](i);
			return this.includeDefaultValues || (t.includeDefaultValues = n), this._unwindGroupTransformOnObject(t, r), o
		},
		_realizeGroupTransformOnObject: function(t) {
			var e = ["angle", "flipX", "flipY", "height", "left", "scaleX", "scaleY", "top", "width"];
			if (t.group && t.group === this.getActiveGroup()) {
				var i = {};
				return e.forEach(function(e) {
					i[e] = t[e]
				}), this.getActiveGroup().realizeTransform(t), i
			}
			return null
		},
		_unwindGroupTransformOnObject: function(t, e) {
			e && t.set(e)
		},
		__serializeBgOverlay: function() {
			var t = {
				background: this.backgroundColor && this.backgroundColor.toObject ? this.backgroundColor.toObject() : this.backgroundColor
			};
			return this.overlayColor && (t.overlay = this.overlayColor.toObject ? this.overlayColor.toObject() : this.overlayColor), this.backgroundImage && (t.backgroundImage = this.backgroundImage.toObject()), this.overlayImage && (t.overlayImage = this.overlayImage.toObject()), t
		},
		sendToBack: function(t) {
			return i(this._objects, t), this._objects.unshift(t), this.renderAll && this.renderAll()
		},
		bringToFront: function(t) {
			return i(this._objects, t), this._objects.push(t), this.renderAll && this.renderAll()
		},
		sendBackwards: function(t, e) {
			var n = this._objects.indexOf(t);
			if (0 !== n) {
				var r = this._findNewLowerIndex(t, n, e);
				i(this._objects, t), this._objects.splice(r, 0, t), this.renderAll && this.renderAll()
			}
			return this
		},
		_findNewLowerIndex: function(t, e, i) {
			var n;
			if (i) {
				n = e;
				for (var r = e - 1; r >= 0; --r) {
					var o = t.intersectsWithObject(this._objects[r]) || t.isContainedWithinObject(this._objects[r]) || this._objects[r].isContainedWithinObject(t);
					if (o) {
						n = r;
						break
					}
				}
			} else n = e - 1;
			return n
		},
		bringForward: function(t, e) {
			var n = this._objects.indexOf(t);
			if (n !== this._objects.length - 1) {
				var r = this._findNewUpperIndex(t, n, e);
				i(this._objects, t), this._objects.splice(r, 0, t), this.renderAll && this.renderAll()
			}
			return this
		},
		_findNewUpperIndex: function(t, e, i) {
			var n;
			if (i) {
				n = e;
				for (var r = e + 1; r < this._objects.length; ++r) {
					var o = t.intersectsWithObject(this._objects[r]) || t.isContainedWithinObject(this._objects[r]) || this._objects[r].isContainedWithinObject(t);
					if (o) {
						n = r;
						break
					}
				}
			} else n = e + 1;
			return n
		},
		moveTo: function(t, e) {
			return i(this._objects, t), this._objects.splice(e, 0, t), this.renderAll && this.renderAll()
		},
		dispose: function() {
			return this.clear(), this.interactive && this.removeListeners(), this
		},
		toString: function() {
			return "#<fabric.Canvas (" + this.complexity() + "): { objects: " + this.getObjects().length + " }>"
		}
	}), t(fabric.StaticCanvas.prototype, fabric.Observable), t(fabric.StaticCanvas.prototype, fabric.Collection), t(fabric.StaticCanvas.prototype, fabric.DataURLExporter), t(fabric.StaticCanvas, {
		EMPTY_JSON: '{"objects": [], "background": "white"}',
		supports: function(t) {
			var e = fabric.util.createCanvasElement();
			if (!e || !e.getContext) return null;
			var i = e.getContext("2d");
			if (!i) return null;
			switch (t) {
				case "getImageData":
					return "undefined" != typeof i.getImageData;
				case "setLineDash":
					return "undefined" != typeof i.setLineDash;
				case "toDataURL":
					return "undefined" != typeof e.toDataURL;
				case "toDataURLWithQuality":
					try {
						return e.toDataURL("image/jpeg", 0), !0
					} catch (n) {}
					return !1;
				default:
					return null
			}
		}
	}), fabric.StaticCanvas.prototype.toJSON = fabric.StaticCanvas.prototype.toObject
}(),
function() {
	var t = fabric.util.getPointer,
		e = fabric.util.degreesToRadians,
		i = fabric.util.radiansToDegrees,
		n = Math.atan2,
		r = Math.abs,
		o = .5;
	fabric.Canvas = fabric.util.createClass(fabric.StaticCanvas, {
		initialize: function(t, e) {
			e || (e = {}), this._initStatic(t, e), this._initInteractive(), this._createCacheCanvas(), fabric.Canvas.activeInstance = this
		},
		uniScaleTransform: !1,
		centeredScaling: !1,
		centeredRotation: !1,
		interactive: !0,
		selection: !0,
		selectionColor: "rgba(100, 100, 255, 0.3)",
		selectionDashArray: [],
		selectionBorderColor: "rgba(255, 255, 255, 0.3)",
		selectionLineWidth: 1,
		hoverCursor: "move",
		moveCursor: "move",
		defaultCursor: "default",
		freeDrawingCursor: "crosshair",
		rotationCursor: "crosshair",
		containerClass: "canvas-container",
		perPixelTargetFind: !1,
		targetFindTolerance: 0,
		skipTargetFind: !1,
		isDrawingMode: !1,
		_initInteractive: function() {
			this._currentTransform = null, this._groupSelector = null, this._initWrapperElement(), this._createUpperCanvas(), this._initEventListeners(), this._initRetinaScaling(), this.freeDrawingBrush = fabric.PencilBrush && new fabric.PencilBrush(this), this.calcOffset()
		},
		_resetCurrentTransform: function(t) {
			var e = this._currentTransform;
			e.target.set({
				scaleX: e.original.scaleX,
				scaleY: e.original.scaleY,
				left: e.original.left,
				top: e.original.top
			}), this._shouldCenterTransform(t, e.target) ? "rotate" === e.action ? this._setOriginToCenter(e.target) : ("center" !== e.originX && ("right" === e.originX ? e.mouseXSign = -1 : e.mouseXSign = 1), "center" !== e.originY && ("bottom" === e.originY ? e.mouseYSign = -1 : e.mouseYSign = 1), e.originX = "center", e.originY = "center") : (e.originX = e.original.originX, e.originY = e.original.originY)
		},
		containsPoint: function(t, e) {
			var i = this.getPointer(t, !0),
				n = this._normalizePointer(e, i);
			return e.containsPoint(n) || e._findTargetCorner(i)
		},
		_normalizePointer: function(t, e) {
			var i, n = this.getActiveGroup(),
				r = e.x,
				o = e.y,
				s = n && "group" !== t.type && n.contains(t);
			return s && (i = fabric.util.transformPoint(n.getCenterPoint(), this.viewportTransform, !0), r -= i.x, o -= i.y, r /= n.scaleX, o /= n.scaleY), {
				x: r,
				y: o
			}
		},
		isTargetTransparent: function(t, e, i) {
			var n = t.hasBorders,
				r = t.transparentCorners;
			t.hasBorders = t.transparentCorners = !1, this._draw(this.contextCache, t), t.hasBorders = n, t.transparentCorners = r;
			var o = fabric.util.isTransparent(this.contextCache, e, i, this.targetFindTolerance);
			return this.clearContext(this.contextCache), o
		},
		_shouldClearSelection: function(t, e) {
			var i = this.getActiveGroup(),
				n = this.getActiveObject();
			return !e || e && i && !i.contains(e) && i !== e && !t.shiftKey || e && !e.evented || e && !e.selectable && n && n !== e
		},
		_shouldCenterTransform: function(t, e) {
			if (e) {
				var i, n = this._currentTransform;
				return "scale" === n.action || "scaleX" === n.action || "scaleY" === n.action ? i = this.centeredScaling || e.centeredScaling : "rotate" === n.action && (i = this.centeredRotation || e.centeredRotation), i ? !t.altKey : t.altKey
			}
		},
		_getOriginFromCorner: function(t, e) {
			var i = {
				x: t.originX,
				y: t.originY
			};
			return "ml" === e || "tl" === e || "bl" === e ? i.x = "right" : ("mr" === e || "tr" === e || "br" === e) && (i.x = "left"), "tl" === e || "mt" === e || "tr" === e ? i.y = "bottom" : ("bl" === e || "mb" === e || "br" === e) && (i.y = "top"), i
		},
		_getActionFromCorner: function(t, e) {
			var i = "drag";
			return e && (i = "ml" === e || "mr" === e ? "scaleX" : "mt" === e || "mb" === e ? "scaleY" : "mtr" === e ? "rotate" : "scale"), i
		},
		_setupCurrentTransform: function(t, i) {
			if (i) {
				var n = this.getPointer(t),
					r = i._findTargetCorner(this.getPointer(t, !0)),
					o = this._getActionFromCorner(i, r),
					s = this._getOriginFromCorner(i, r);
				this._currentTransform = {
					target: i,
					action: o,
					scaleX: i.scaleX,
					scaleY: i.scaleY,
					offsetX: n.x - i.left,
					offsetY: n.y - i.top,
					originX: s.x,
					originY: s.y,
					ex: n.x,
					ey: n.y,
					left: i.left,
					top: i.top,
					theta: e(i.angle),
					width: i.width * i.scaleX,
					mouseXSign: 1,
					mouseYSign: 1
				}, this._currentTransform.original = {
					left: i.left,
					top: i.top,
					scaleX: i.scaleX,
					scaleY: i.scaleY,
					originX: s.x,
					originY: s.y
				}, this._resetCurrentTransform(t)
			}
		},
		_translateObject: function(t, e) {
			var i = this._currentTransform.target;
			i.get("lockMovementX") || i.set("left", t - this._currentTransform.offsetX), i.get("lockMovementY") || i.set("top", e - this._currentTransform.offsetY)
		},
		_scaleObject: function(t, e, i) {
			var n = this._currentTransform,
				r = n.target,
				o = r.get("lockScalingX"),
				s = r.get("lockScalingY"),
				a = r.get("lockScalingFlip");
			if (!o || !s) {
				var c = r.translateToOriginPoint(r.getCenterPoint(), n.originX, n.originY),
					h = r.toLocalPoint(new fabric.Point(t, e), n.originX, n.originY);
				this._setLocalMouse(h, n), this._setObjectScale(h, n, o, s, i, a), r.setPositionByOrigin(c, n.originX, n.originY)
			}
		},
		_setObjectScale: function(t, e, i, n, r, o) {
			var s = e.target,
				a = !1,
				c = !1,
				h = s._getNonTransformedDimensions();
			e.newScaleX = t.x / h.x, e.newScaleY = t.y / h.y, o && e.newScaleX <= 0 && e.newScaleX < s.scaleX && (a = !0), o && e.newScaleY <= 0 && e.newScaleY < s.scaleY && (c = !0), "equally" !== r || i || n ? r ? "x" !== r || s.get("lockUniScaling") ? "y" !== r || s.get("lockUniScaling") || c || n || s.set("scaleY", e.newScaleY) : a || i || s.set("scaleX", e.newScaleX) : (a || i || s.set("scaleX", e.newScaleX), c || n || s.set("scaleY", e.newScaleY)) : a || c || this._scaleObjectEqually(t, s, e), a || c || this._flipObject(e, r)
		},
		_scaleObjectEqually: function(t, e, i) {
			var n = t.y + t.x,
				r = e._getNonTransformedDimensions(),
				o = r.y * i.original.scaleY + r.x * i.original.scaleX;
			i.newScaleX = i.original.scaleX * n / o, i.newScaleY = i.original.scaleY * n / o, e.set("scaleX", i.newScaleX), e.set("scaleY", i.newScaleY)
		},
		_flipObject: function(t, e) {
			t.newScaleX < 0 && "y" !== e && ("left" === t.originX ? t.originX = "right" : "right" === t.originX && (t.originX = "left")), t.newScaleY < 0 && "x" !== e && ("top" === t.originY ? t.originY = "bottom" : "bottom" === t.originY && (t.originY = "top"))
		},
		_setLocalMouse: function(t, e) {
			var i = e.target;
			"right" === e.originX ? t.x *= -1 : "center" === e.originX && (t.x *= 2 * e.mouseXSign, t.x < 0 && (e.mouseXSign = -e.mouseXSign)), "bottom" === e.originY ? t.y *= -1 : "center" === e.originY && (t.y *= 2 * e.mouseYSign, t.y < 0 && (e.mouseYSign = -e.mouseYSign)), r(t.x) > i.padding ? t.x < 0 ? t.x += i.padding : t.x -= i.padding : t.x = 0, r(t.y) > i.padding ? t.y < 0 ? t.y += i.padding : t.y -= i.padding : t.y = 0
		},
		_rotateObject: function(t, e) {
			var r = this._currentTransform;
			if (!r.target.get("lockRotation")) {
				var o = n(r.ey - r.top, r.ex - r.left),
					s = n(e - r.top, t - r.left),
					a = i(s - o + r.theta);
				0 > a && (a = 360 + a), r.target.angle = a % 360
			}
		},
		setCursor: function(t) {
			this.upperCanvasEl.style.cursor = t
		},
		_resetObjectTransform: function(t) {
			t.scaleX = 1, t.scaleY = 1, t.setAngle(0)
		},
		_drawSelection: function() {
			var t = this.contextTop,
				e = this._groupSelector,
				i = e.left,
				n = e.top,
				s = r(i),
				a = r(n);
			if (t.fillStyle = this.selectionColor, t.fillRect(e.ex - (i > 0 ? 0 : -i), e.ey - (n > 0 ? 0 : -n), s, a), t.lineWidth = this.selectionLineWidth, t.strokeStyle = this.selectionBorderColor, this.selectionDashArray.length > 1) {
				var c = e.ex + o - (i > 0 ? 0 : s),
					h = e.ey + o - (n > 0 ? 0 : a);
				t.beginPath(), fabric.util.drawDashedLine(t, c, h, c + s, h, this.selectionDashArray), fabric.util.drawDashedLine(t, c, h + a - 1, c + s, h + a - 1, this.selectionDashArray), fabric.util.drawDashedLine(t, c, h, c, h + a, this.selectionDashArray), fabric.util.drawDashedLine(t, c + s - 1, h, c + s - 1, h + a, this.selectionDashArray), t.closePath(), t.stroke()
			} else t.strokeRect(e.ex + o - (i > 0 ? 0 : s), e.ey + o - (n > 0 ? 0 : a), s, a)
		},
		_isLastRenderedObject: function(t) {
			return this.controlsAboveOverlay && this.lastRenderedObjectWithControlsAboveOverlay && this.lastRenderedObjectWithControlsAboveOverlay.visible && this.containsPoint(t, this.lastRenderedObjectWithControlsAboveOverlay) && this.lastRenderedObjectWithControlsAboveOverlay._findTargetCorner(this.getPointer(t, !0))
		},
		findTarget: function(t, e) {
			if (!this.skipTargetFind) {
				if (this._isLastRenderedObject(t)) return this.lastRenderedObjectWithControlsAboveOverlay;
				var i = this.getActiveGroup();
				if (i && !e && this.containsPoint(t, i)) return i;
				var n = this._searchPossibleTargets(t, e);
				return this._fireOverOutEvents(n, t), n
			}
		},
		_fireOverOutEvents: function(t, e) {
			t ? this._hoveredTarget !== t && (this._hoveredTarget && (this.fire("mouse:out", {
				target: this._hoveredTarget,
				e: e
			}), this._hoveredTarget.fire("mouseout")), this.fire("mouse:over", {
				target: t,
				e: e
			}), t.fire("mouseover"), this._hoveredTarget = t) : this._hoveredTarget && (this.fire("mouse:out", {
				target: this._hoveredTarget,
				e: e
			}), this._hoveredTarget.fire("mouseout"), this._hoveredTarget = null)
		},
		_checkTarget: function(t, e, i) {
			if (e && e.visible && e.evented && this.containsPoint(t, e)) {
				if (!this.perPixelTargetFind && !e.perPixelTargetFind || e.isEditing) return !0;
				var n = this.isTargetTransparent(e, i.x, i.y);
				if (!n) return !0
			}
		},
		_searchPossibleTargets: function(t, e) {
			for (var i, n = this.getPointer(t, !0), r = this._objects.length; r--;) if ((!this._objects[r].group || e) && this._checkTarget(t, this._objects[r], n)) {
				this.relatedTarget = this._objects[r], i = this._objects[r];
				break
			}
			return i
		},
		getPointer: function(e, i, n) {
			n || (n = this.upperCanvasEl);
			var r, o = t(e),
				s = n.getBoundingClientRect(),
				a = s.width || 0,
				c = s.height || 0;
			return a && c || ("top" in s && "bottom" in s && (c = Math.abs(s.top - s.bottom)), "right" in s && "left" in s && (a = Math.abs(s.right - s.left))), this.calcOffset(), o.x = o.x - this._offset.left, o.y = o.y - this._offset.top, i || (o = fabric.util.transformPoint(o, fabric.util.invertTransform(this.viewportTransform))), r = 0 === a || 0 === c ? {
				width: 1,
				height: 1
			} : {
				width: n.width / a,
				height: n.height / c
			}, {
				x: o.x * r.width,
				y: o.y * r.height
			}
		},
		_createUpperCanvas: function() {
			var t = this.lowerCanvasEl.className.replace(/\s*lower-canvas\s*/, "");
			this.upperCanvasEl = this._createCanvasElement(), fabric.util.addClass(this.upperCanvasEl, "upper-canvas " + t), this.wrapperEl.appendChild(this.upperCanvasEl), this._copyCanvasStyle(this.lowerCanvasEl, this.upperCanvasEl), this._applyCanvasStyle(this.upperCanvasEl), this.contextTop = this.upperCanvasEl.getContext("2d")
		},
		_createCacheCanvas: function() {
			this.cacheCanvasEl = this._createCanvasElement(), this.cacheCanvasEl.setAttribute("width", this.width), this.cacheCanvasEl.setAttribute("height", this.height), this.contextCache = this.cacheCanvasEl.getContext("2d")
		},
		_initWrapperElement: function() {
			this.wrapperEl = fabric.util.wrapElement(this.lowerCanvasEl, "div", {
				"class": this.containerClass
			}), fabric.util.setStyle(this.wrapperEl, {
				width: this.getWidth() + "px",
				height: this.getHeight() + "px",
				position: "relative"
			}), fabric.util.makeElementUnselectable(this.wrapperEl)
		},
		_applyCanvasStyle: function(t) {
			var e = this.getWidth() || t.width,
				i = this.getHeight() || t.height;
			fabric.util.setStyle(t, {
				position: "absolute",
				width: e + "px",
				height: i + "px",
				left: 0,
				top: 0
			}), t.width = e, t.height = i, fabric.util.makeElementUnselectable(t)
		},
		_copyCanvasStyle: function(t, e) {
			e.style.cssText = t.style.cssText
		},
		getSelectionContext: function() {
			return this.contextTop
		},
		getSelectionElement: function() {
			return this.upperCanvasEl
		},
		_setActiveObject: function(t) {
			this._activeObject && this._activeObject.set("active", !1), this._activeObject = t, t.set("active", !0)
		},
		setActiveObject: function(t, e) {
			return this._setActiveObject(t), this.renderAll(), this.fire("object:selected", {
				target: t,
				e: e
			}), t.fire("selected", {
				e: e
			}), this
		},
		getActiveObject: function() {
			return this._activeObject
		},
		_discardActiveObject: function() {
			this._activeObject && this._activeObject.set("active", !1), this._activeObject = null
		},
		discardActiveObject: function(t) {
			return this._discardActiveObject(), this.renderAll(), this.fire("selection:cleared", {
				e: t
			}), this
		},
		_setActiveGroup: function(t) {
			this._activeGroup = t, t && t.set("active", !0)
		},
		setActiveGroup: function(t, e) {
			return this._setActiveGroup(t), t && (this.fire("object:selected", {
				target: t,
				e: e
			}), t.fire("selected", {
				e: e
			})), this
		},
		getActiveGroup: function() {
			return this._activeGroup
		},
		_discardActiveGroup: function() {
			var t = this.getActiveGroup();
			t && t.destroy(), this.setActiveGroup(null)
		},
		discardActiveGroup: function(t) {
			return this._discardActiveGroup(), this.fire("selection:cleared", {
				e: t
			}), this
		},
		deactivateAll: function() {
			for (var t = this.getObjects(), e = 0, i = t.length; i > e; e++) t[e].set("active", !1);
			return this._discardActiveGroup(), this._discardActiveObject(), this
		},
		deactivateAllWithDispatch: function(t) {
			var e = this.getActiveGroup() || this.getActiveObject();
			return e && this.fire("before:selection:cleared", {
				target: e,
				e: t
			}), this.deactivateAll(), e && this.fire("selection:cleared", {
				e: t
			}), this
		},
		drawControls: function(t) {
			var e = this.getActiveGroup();
			e ? this._drawGroupControls(t, e) : this._drawObjectsControls(t)
		},
		_drawGroupControls: function(t, e) {
			e._renderControls(t)
		},
		_drawObjectsControls: function(t) {
			for (var e = 0, i = this._objects.length; i > e; ++e) this._objects[e] && this._objects[e].active && (this._objects[e]._renderControls(t), this.lastRenderedObjectWithControlsAboveOverlay = this._objects[e])
		}
	});
	for (var s in fabric.StaticCanvas) "prototype" !== s && (fabric.Canvas[s] = fabric.StaticCanvas[s]);
	fabric.isTouchSupported && (fabric.Canvas.prototype._setCursorFromEvent = function() {}), fabric.Element = fabric.Canvas
}(),
function() {
	var t = {
		mt: 0,
		tr: 1,
		mr: 2,
		br: 3,
		mb: 4,
		bl: 5,
		ml: 6,
		tl: 7
	}, e = fabric.util.addListener,
		i = fabric.util.removeListener;
	fabric.util.object.extend(fabric.Canvas.prototype, {
		cursorMap: ["n-resize", "ne-resize", "e-resize", "se-resize", "s-resize", "sw-resize", "w-resize", "nw-resize"],
		_initEventListeners: function() {
			this._bindEvents(), e(fabric.window, "resize", this._onResize), e(this.upperCanvasEl, "mousedown", this._onMouseDown), e(this.upperCanvasEl, "mousemove", this._onMouseMove), e(this.upperCanvasEl, "mousewheel", this._onMouseWheel), e(this.upperCanvasEl, "touchstart", this._onMouseDown), e(this.upperCanvasEl, "touchmove", this._onMouseMove), "undefined" != typeof eventjs && "add" in eventjs && (eventjs.add(this.upperCanvasEl, "gesture", this._onGesture), eventjs.add(this.upperCanvasEl, "drag", this._onDrag), eventjs.add(this.upperCanvasEl, "orientation", this._onOrientationChange), eventjs.add(this.upperCanvasEl, "shake", this._onShake), eventjs.add(this.upperCanvasEl, "longpress", this._onLongPress))
		},
		_bindEvents: function() {
			this._onMouseDown = this._onMouseDown.bind(this), this._onMouseMove = this._onMouseMove.bind(this), this._onMouseUp = this._onMouseUp.bind(this), this._onResize = this._onResize.bind(this), this._onGesture = this._onGesture.bind(this), this._onDrag = this._onDrag.bind(this), this._onShake = this._onShake.bind(this), this._onLongPress = this._onLongPress.bind(this), this._onOrientationChange = this._onOrientationChange.bind(this), this._onMouseWheel = this._onMouseWheel.bind(this)
		},
		removeListeners: function() {
			i(fabric.window, "resize", this._onResize), i(this.upperCanvasEl, "mousedown", this._onMouseDown), i(this.upperCanvasEl, "mousemove", this._onMouseMove), i(this.upperCanvasEl, "mousewheel", this._onMouseWheel), i(this.upperCanvasEl, "touchstart", this._onMouseDown), i(this.upperCanvasEl, "touchmove", this._onMouseMove), "undefined" != typeof eventjs && "remove" in eventjs && (eventjs.remove(this.upperCanvasEl, "gesture", this._onGesture), eventjs.remove(this.upperCanvasEl, "drag", this._onDrag), eventjs.remove(this.upperCanvasEl, "orientation", this._onOrientationChange), eventjs.remove(this.upperCanvasEl, "shake", this._onShake), eventjs.remove(this.upperCanvasEl, "longpress", this._onLongPress))
		},
		_onGesture: function(t, e) {
			this.__onTransformGesture && this.__onTransformGesture(t, e)
		},
		_onDrag: function(t, e) {
			this.__onDrag && this.__onDrag(t, e)
		},
		_onMouseWheel: function(t, e) {
			this.__onMouseWheel && this.__onMouseWheel(t, e)
		},
		_onOrientationChange: function(t, e) {
			this.__onOrientationChange && this.__onOrientationChange(t, e)
		},
		_onShake: function(t, e) {
			this.__onShake && this.__onShake(t, e)
		},
		_onLongPress: function(t, e) {
			this.__onLongPress && this.__onLongPress(t, e)
		},
		_onMouseDown: function(t) {
			this.__onMouseDown(t), e(fabric.document, "touchend", this._onMouseUp), e(fabric.document, "touchmove", this._onMouseMove), i(this.upperCanvasEl, "mousemove", this._onMouseMove), i(this.upperCanvasEl, "touchmove", this._onMouseMove), "touchstart" === t.type ? i(this.upperCanvasEl, "mousedown", this._onMouseDown) : (e(fabric.document, "mouseup", this._onMouseUp),
			e(fabric.document, "mousemove", this._onMouseMove))
		},
		_onMouseUp: function(t) {
			if (this.__onMouseUp(t), i(fabric.document, "mouseup", this._onMouseUp), i(fabric.document, "touchend", this._onMouseUp), i(fabric.document, "mousemove", this._onMouseMove), i(fabric.document, "touchmove", this._onMouseMove), e(this.upperCanvasEl, "mousemove", this._onMouseMove), e(this.upperCanvasEl, "touchmove", this._onMouseMove), "touchend" === t.type) {
				var n = this;
				setTimeout(function() {
					e(n.upperCanvasEl, "mousedown", n._onMouseDown)
				}, 400)
			}
		},
		_onMouseMove: function(t) {
			!this.allowTouchScrolling && t.preventDefault && t.preventDefault(), this.__onMouseMove(t)
		},
		_onResize: function() {
			this.calcOffset()
		},
		_shouldRender: function(t, e) {
			var i = this.getActiveGroup() || this.getActiveObject();
			return !!(t && (t.isMoving || t !== i) || !t && i || !t && !i && !this._groupSelector || e && this._previousPointer && this.selection && (e.x !== this._previousPointer.x || e.y !== this._previousPointer.y))
		},
		__onMouseUp: function(t) {
			var e;
			if (this.isDrawingMode && this._isCurrentlyDrawing) return void this._onMouseUpInDrawingMode(t);
			this._currentTransform ? (this._finalizeCurrentTransform(), e = this._currentTransform.target) : e = this.findTarget(t, !0);
			var i = this._shouldRender(e, this.getPointer(t));
			this._maybeGroupObjects(t), e && (e.isMoving = !1), i && this.renderAll(), this._handleCursorAndEvent(t, e)
		},
		_handleCursorAndEvent: function(t, e) {
			this._setCursorFromEvent(t, e);
			var i = this;
			setTimeout(function() {
				i._setCursorFromEvent(t, e)
			}, 50), this.fire("mouse:up", {
				target: e,
				e: t
			}), e && e.fire("mouseup", {
				e: t
			})
		},
		_finalizeCurrentTransform: function() {
			var t = this._currentTransform,
				e = t.target;
			e._scaling && (e._scaling = !1), e.setCoords(), this.stateful && e.hasStateChanged() && (this.fire("object:modified", {
				target: e
			}), e.fire("modified")), this._restoreOriginXY(e)
		},
		_restoreOriginXY: function(t) {
			if (this._previousOriginX && this._previousOriginY) {
				var e = t.translateToOriginPoint(t.getCenterPoint(), this._previousOriginX, this._previousOriginY);
				t.originX = this._previousOriginX, t.originY = this._previousOriginY, t.left = e.x, t.top = e.y, this._previousOriginX = null, this._previousOriginY = null
			}
		},
		_onMouseDownInDrawingMode: function(t) {
			this._isCurrentlyDrawing = !0, this.discardActiveObject(t).renderAll(), this.clipTo && fabric.util.clipContext(this, this.contextTop);
			var e = fabric.util.invertTransform(this.viewportTransform),
				i = fabric.util.transformPoint(this.getPointer(t, !0), e);
			this.freeDrawingBrush.onMouseDown(i), this.fire("mouse:down", {
				e: t
			});
			var n = this.findTarget(t);
			"undefined" != typeof n && n.fire("mousedown", {
				e: t,
				target: n
			})
		},
		_onMouseMoveInDrawingMode: function(t) {
			if (this._isCurrentlyDrawing) {
				var e = fabric.util.invertTransform(this.viewportTransform),
					i = fabric.util.transformPoint(this.getPointer(t, !0), e);
				this.freeDrawingBrush.onMouseMove(i)
			}
			this.setCursor(this.freeDrawingCursor), this.fire("mouse:move", {
				e: t
			});
			var n = this.findTarget(t);
			"undefined" != typeof n && n.fire("mousemove", {
				e: t,
				target: n
			})
		},
		_onMouseUpInDrawingMode: function(t) {
			this._isCurrentlyDrawing = !1, this.clipTo && this.contextTop.restore(), this.freeDrawingBrush.onMouseUp(), this.fire("mouse:up", {
				e: t
			});
			var e = this.findTarget(t);
			"undefined" != typeof e && e.fire("mouseup", {
				e: t,
				target: e
			})
		},
		__onMouseDown: function(t) {
			var e = "which" in t ? 1 === t.which : 1 === t.button;
			if (e || fabric.isTouchSupported) {
				if (this.isDrawingMode) return void this._onMouseDownInDrawingMode(t);
				if (!this._currentTransform) {
					var i = this.findTarget(t),
						n = this.getPointer(t, !0);
					this._previousPointer = n;
					var r = this._shouldRender(i, n),
						o = this._shouldGroup(t, i);
					this._shouldClearSelection(t, i) ? this._clearSelection(t, i, n) : o && (this._handleGrouping(t, i), i = this.getActiveGroup()), i && i.selectable && !o && (this._beforeTransform(t, i), this._setupCurrentTransform(t, i)), r && this.renderAll(), this.fire("mouse:down", {
						target: i,
						e: t
					}), i && i.fire("mousedown", {
						e: t
					})
				}
			}
		},
		_beforeTransform: function(t, e) {
			this.stateful && e.saveState(), e._findTargetCorner(this.getPointer(t)) && this.onBeforeScaleRotate(e), e !== this.getActiveGroup() && e !== this.getActiveObject() && (this.deactivateAll(), this.setActiveObject(e, t))
		},
		_clearSelection: function(t, e, i) {
			this.deactivateAllWithDispatch(t), e && e.selectable ? this.setActiveObject(e, t) : this.selection && (this._groupSelector = {
				ex: i.x,
				ey: i.y,
				top: 0,
				left: 0
			})
		},
		_setOriginToCenter: function(t) {
			this._previousOriginX = this._currentTransform.target.originX, this._previousOriginY = this._currentTransform.target.originY;
			var e = t.getCenterPoint();
			t.originX = "center", t.originY = "center", t.left = e.x, t.top = e.y, this._currentTransform.left = t.left, this._currentTransform.top = t.top
		},
		_setCenterToOrigin: function(t) {
			var e = t.translateToOriginPoint(t.getCenterPoint(), this._previousOriginX, this._previousOriginY);
			t.originX = this._previousOriginX, t.originY = this._previousOriginY, t.left = e.x, t.top = e.y, this._previousOriginX = null, this._previousOriginY = null
		},
		__onMouseMove: function(t) {
			var e, i;
			if (this.isDrawingMode) return void this._onMouseMoveInDrawingMode(t);
			if (!("undefined" != typeof t.touches && t.touches.length > 1)) {
				var n = this._groupSelector;
				n ? (i = this.getPointer(t, !0), n.left = i.x - n.ex, n.top = i.y - n.ey, this.renderTop()) : this._currentTransform ? this._transformObject(t) : (e = this.findTarget(t), !e || e && !e.selectable ? this.setCursor(this.defaultCursor) : this._setCursorFromEvent(t, e)), this.fire("mouse:move", {
					target: e,
					e: t
				}), e && e.fire("mousemove", {
					e: t
				})
			}
		},
		_transformObject: function(t) {
			var e = this.getPointer(t),
				i = this._currentTransform;
			i.reset = !1, i.target.isMoving = !0, this._beforeScaleTransform(t, i), this._performTransformAction(t, i, e), this.renderAll()
		},
		_performTransformAction: function(t, e, i) {
			var n = i.x,
				r = i.y,
				o = e.target,
				s = e.action;
			"rotate" === s ? (this._rotateObject(n, r), this._fire("rotating", o, t)) : "scale" === s ? (this._onScale(t, e, n, r), this._fire("scaling", o, t)) : "scaleX" === s ? (this._scaleObject(n, r, "x"), this._fire("scaling", o, t)) : "scaleY" === s ? (this._scaleObject(n, r, "y"), this._fire("scaling", o, t)) : (this._translateObject(n, r), this._fire("moving", o, t), this.setCursor(this.moveCursor))
		},
		_fire: function(t, e, i) {
			this.fire("object:" + t, {
				target: e,
				e: i
			}), e.fire(t, {
				e: i
			})
		},
		_beforeScaleTransform: function(t, e) {
			if ("scale" === e.action || "scaleX" === e.action || "scaleY" === e.action) {
				var i = this._shouldCenterTransform(t, e.target);
				(i && ("center" !== e.originX || "center" !== e.originY) || !i && "center" === e.originX && "center" === e.originY) && (this._resetCurrentTransform(t), e.reset = !0)
			}
		},
		_onScale: function(t, e, i, n) {
			!t.shiftKey && !this.uniScaleTransform || e.target.get("lockUniScaling") ? (e.reset || "scale" !== e.currentAction || this._resetCurrentTransform(t, e.target), e.currentAction = "scaleEqually", this._scaleObject(i, n, "equally")) : (e.currentAction = "scale", this._scaleObject(i, n))
		},
		_setCursorFromEvent: function(t, e) {
			if (!e || !e.selectable) return this.setCursor(this.defaultCursor), !1;
			var i = this.getActiveGroup(),
				n = e._findTargetCorner && (!i || !i.contains(e)) && e._findTargetCorner(this.getPointer(t, !0));
			return n ? this._setCornerCursor(n, e) : this.setCursor(e.hoverCursor || this.hoverCursor), !0
		},
		_setCornerCursor: function(e, i) {
			if (e in t) this.setCursor(this._getRotatedCornerCursor(e, i));
			else {
				if ("mtr" !== e || !i.hasRotatingPoint) return this.setCursor(this.defaultCursor), !1;
				this.setCursor(this.rotationCursor)
			}
		},
		_getRotatedCornerCursor: function(e, i) {
			var n = Math.round(i.getAngle() % 360 / 45);
			return 0 > n && (n += 8), n += t[e], n %= 8, this.cursorMap[n]
		}
	})
}(),
function() {
	var t = Math.min,
		e = Math.max;
	fabric.util.object.extend(fabric.Canvas.prototype, {
		_shouldGroup: function(t, e) {
			var i = this.getActiveObject();
			return t.shiftKey && (this.getActiveGroup() || i && i !== e) && this.selection
		},
		_handleGrouping: function(t, e) {
			(e !== this.getActiveGroup() || (e = this.findTarget(t, !0), e && !e.isType("group"))) && (this.getActiveGroup() ? this._updateActiveGroup(e, t) : this._createActiveGroup(e, t), this._activeGroup && this._activeGroup.saveCoords())
		},
		_updateActiveGroup: function(t, e) {
			var i = this.getActiveGroup();
			if (i.contains(t)) {
				if (i.removeWithUpdate(t), this._resetObjectTransform(i), t.set("active", !1), 1 === i.size()) return this.discardActiveGroup(e), void this.setActiveObject(i.item(0))
			} else i.addWithUpdate(t), this._resetObjectTransform(i);
			this.fire("selection:created", {
				target: i,
				e: e
			}), i.set("active", !0)
		},
		_createActiveGroup: function(t, e) {
			if (this._activeObject && t !== this._activeObject) {
				var i = this._createGroup(t);
				i.addWithUpdate(), this.setActiveGroup(i), this._activeObject = null, this.fire("selection:created", {
					target: i,
					e: e
				})
			}
			t.set("active", !0)
		},
		_createGroup: function(t) {
			var e = this.getObjects(),
				i = e.indexOf(this._activeObject) < e.indexOf(t),
				n = i ? [this._activeObject, t] : [t, this._activeObject];
			return new fabric.Group(n, {
				canvas: this
			})
		},
		_groupSelectedObjects: function(t) {
			var e = this._collectObjects();
			1 === e.length ? this.setActiveObject(e[0], t) : e.length > 1 && (e = new fabric.Group(e.reverse(), {
				canvas: this
			}), e.addWithUpdate(), this.setActiveGroup(e, t), e.saveCoords(), this.fire("selection:created", {
				target: e
			}), this.renderAll())
		},
		_collectObjects: function() {
			for (var i, n = [], r = this._groupSelector.ex, o = this._groupSelector.ey, s = r + this._groupSelector.left, a = o + this._groupSelector.top, c = new fabric.Point(t(r, s), t(o, a)), h = new fabric.Point(e(r, s), e(o, a)), l = r === s && o === a, u = this._objects.length; u-- && (i = this._objects[u], !(i && i.selectable && i.visible && (i.intersectsWithRect(c, h) || i.isContainedWithinRect(c, h) || i.containsPoint(c) || i.containsPoint(h)) && (i.set("active", !0), n.push(i), l))););
			return n
		},
		_maybeGroupObjects: function(t) {
			this.selection && this._groupSelector && this._groupSelectedObjects(t);
			var e = this.getActiveGroup();
			e && (e.setObjectsCoords().setCoords(), e.isMoving = !1, this.setCursor(this.defaultCursor)), this._groupSelector = null, this._currentTransform = null
		}
	})
}(), fabric.util.object.extend(fabric.StaticCanvas.prototype, {
	toDataURL: function(t) {
		t || (t = {});
		var e = t.format || "png",
			i = t.quality || 1,
			n = t.multiplier || 1,
			r = {
				left: t.left,
				top: t.top,
				width: t.width,
				height: t.height
			};
		return 1 !== n ? this.__toDataURLWithMultiplier(e, i, r, n) : this.__toDataURL(e, i, r)
	},
	__toDataURL: function(t, e, i) {
		this.renderAll(!0);
		var n = this.upperCanvasEl || this.lowerCanvasEl,
			r = this.__getCroppedCanvas(n, i);
		"jpg" === t && (t = "jpeg");
		var o = fabric.StaticCanvas.supports("toDataURLWithQuality") ? (r || n).toDataURL("image/" + t, e) : (r || n).toDataURL("image/" + t);
		return this.contextTop && this.clearContext(this.contextTop), this.renderAll(), r && (r = null), o
	},
	__getCroppedCanvas: function(t, e) {
		var i, n, r = "left" in e || "top" in e || "width" in e || "height" in e;
		return r && (i = fabric.util.createCanvasElement(), n = i.getContext("2d"), i.width = e.width || this.width, i.height = e.height || this.height, n.drawImage(t, -e.left || 0, -e.top || 0)), i
	},
	__toDataURLWithMultiplier: function(t, e, i, n) {
		var r = this.getWidth(),
			o = this.getHeight(),
			s = r * n,
			a = o * n,
			c = this.getActiveObject(),
			h = this.getActiveGroup(),
			l = this.contextTop || this.contextContainer;
		n > 1 && this.setWidth(s).setHeight(a), l.scale(n, n), i.left && (i.left *= n), i.top && (i.top *= n), i.width ? i.width *= n : 1 > n && (i.width = s), i.height ? i.height *= n : 1 > n && (i.height = a), h ? this._tempRemoveBordersControlsFromGroup(h) : c && this.deactivateAll && this.deactivateAll(), this.renderAll(!0);
		var u = this.__toDataURL(t, e, i);
		return this.width = r, this.height = o, l.scale(1 / n, 1 / n), this.setWidth(r).setHeight(o), h ? this._restoreBordersControlsOnGroup(h) : c && this.setActiveObject && this.setActiveObject(c), this.contextTop && this.clearContext(this.contextTop), this.renderAll(), u
	},
	toDataURLWithMultiplier: function(t, e, i) {
		return this.toDataURL({
			format: t,
			multiplier: e,
			quality: i
		})
	},
	_tempRemoveBordersControlsFromGroup: function(t) {
		t.origHasControls = t.hasControls, t.origBorderColor = t.borderColor, t.hasControls = !0, t.borderColor = "rgba(0,0,0,0)", t.forEachObject(function(t) {
			t.origBorderColor = t.borderColor, t.borderColor = "rgba(0,0,0,0)"
		})
	},
	_restoreBordersControlsOnGroup: function(t) {
		t.hideControls = t.origHideControls, t.borderColor = t.origBorderColor, t.forEachObject(function(t) {
			t.borderColor = t.origBorderColor, delete t.origBorderColor
		})
	}
}),
function() {
	var t = fabric.util.degreesToRadians,
		e = fabric.util.radiansToDegrees;
	fabric.util.object.extend(fabric.Canvas.prototype, {
		__onTransformGesture: function(t, e) {
			if (!this.isDrawingMode && t.touches && 2 === t.touches.length && "gesture" === e.gesture) {
				var i = this.findTarget(t);
				"undefined" != typeof i && (this.__gesturesParams = {
					e: t,
					self: e,
					target: i
				}, this.__gesturesRenderer()), this.fire("touch:gesture", {
					target: i,
					e: t,
					self: e
				})
			}
		},
		__gesturesParams: null,
		__gesturesRenderer: function() {
			if (null !== this.__gesturesParams && null !== this._currentTransform) {
				var t = this.__gesturesParams.self,
					e = this._currentTransform,
					i = this.__gesturesParams.e;
				e.action = "scale", e.originX = e.originY = "center", this._setOriginToCenter(e.target), this._scaleObjectBy(t.scale, i), 0 !== t.rotation && (e.action = "rotate", this._rotateObjectByAngle(t.rotation, i)), this.renderAll(), e.action = "drag"
			}
		},
		__onDrag: function(t, e) {
			this.fire("touch:drag", {
				e: t,
				self: e
			})
		},
		__onOrientationChange: function(t, e) {
			this.fire("touch:orientation", {
				e: t,
				self: e
			})
		},
		__onShake: function(t, e) {
			this.fire("touch:shake", {
				e: t,
				self: e
			})
		},
		__onLongPress: function(t, e) {
			this.fire("touch:longpress", {
				e: t,
				self: e
			})
		},
		_scaleObjectBy: function(t, e) {
			var i = this._currentTransform,
				n = i.target,
				r = n.get("lockScalingX"),
				o = n.get("lockScalingY");
			if (!r || !o) {
				n._scaling = !0;
				var s = n.translateToOriginPoint(n.getCenterPoint(), i.originX, i.originY),
					a = n._getNonTransformedDimensions();
				this._setObjectScale(new fabric.Point(i.scaleX * t * a.x, i.scaleY * t * a.y), i, r, o, null, n.get("lockScalingFlip")), n.setPositionByOrigin(s, i.originX, i.originY), this._fire("scaling", n, e)
			}
		},
		_rotateObjectByAngle: function(i, n) {
			var r = this._currentTransform;
			r.target.get("lockRotation") || (r.target.angle = e(t(i) + r.theta), this._fire("rotating", r.target, n))
		}
	})
}(),
function(t) {
	"use strict";
	var e = t.fabric || (t.fabric = {}),
		i = e.util.object.extend,
		n = e.util.toFixed,
		r = e.util.string.capitalize,
		o = e.util.degreesToRadians,
		s = e.StaticCanvas.supports("setLineDash");
	e.Object || (e.Object = e.util.createClass({
		type: "object",
		originX: "left",
		originY: "top",
		top: 0,
		left: 0,
		width: 0,
		height: 0,
		scaleX: 1,
		scaleY: 1,
		flipX: !1,
		flipY: !1,
		opacity: 1,
		angle: 0,
		cornerSize: 12,
		transparentCorners: !0,
		hoverCursor: null,
		padding: 0,
		borderColor: "rgba(102,153,255,0.75)",
		cornerColor: "rgba(102,153,255,0.5)",
		centeredScaling: !1,
		centeredRotation: !0,
		fill: "rgb(0,0,0)",
		fillRule: "nonzero",
		globalCompositeOperation: "source-over",
		backgroundColor: "",
		stroke: null,
		strokeWidth: 1,
		strokeDashArray: null,
		strokeLineCap: "butt",
		strokeLineJoin: "miter",
		strokeMiterLimit: 10,
		shadow: null,
		borderOpacityWhenMoving: .4,
		borderScaleFactor: 1,
		transformMatrix: null,
		minScaleLimit: .01,
		selectable: !0,
		evented: !0,
		visible: !0,
		hasControls: !0,
		hasBorders: !0,
		hasRotatingPoint: !0,
		rotatingPointOffset: 40,
		perPixelTargetFind: !1,
		includeDefaultValues: !0,
		clipTo: null,
		lockMovementX: !1,
		lockMovementY: !1,
		lockRotation: !1,
		lockScalingX: !1,
		lockScalingY: !1,
		lockUniScaling: !1,
		lockScalingFlip: !1,
		stateProperties: "top left width height scaleX scaleY flipX flipY originX originY transformMatrix stroke strokeWidth strokeDashArray strokeLineCap strokeLineJoin strokeMiterLimit angle opacity fill fillRule globalCompositeOperation shadow clipTo visible backgroundColor alignX alignY meetOrSlice".split(" "),
		initialize: function(t) {
			t && this.setOptions(t)
		},
		_initGradient: function(t) {
			!t.fill || !t.fill.colorStops || t.fill instanceof e.Gradient || this.set("fill", new e.Gradient(t.fill)), !t.stroke || !t.stroke.colorStops || t.stroke instanceof e.Gradient || this.set("stroke", new e.Gradient(t.stroke))
		},
		_initPattern: function(t) {
			!t.fill || !t.fill.source || t.fill instanceof e.Pattern || this.set("fill", new e.Pattern(t.fill)), !t.stroke || !t.stroke.source || t.stroke instanceof e.Pattern || this.set("stroke", new e.Pattern(t.stroke))
		},
		_initClipping: function(t) {
			if (t.clipTo && "string" == typeof t.clipTo) {
				var i = e.util.getFunctionBody(t.clipTo);
				"undefined" != typeof i && (this.clipTo = new Function("ctx", i))
			}
		},
		setOptions: function(t) {
			for (var e in t) this.set(e, t[e]);
			this._initGradient(t), this._initPattern(t), this._initClipping(t)
		},
		transform: function(t, e) {
			this.group && this.canvas.preserveObjectStacking && this.group === this.canvas._activeGroup && this.group.transform(t);
			var i = e ? this._getLeftTopCoords() : this.getCenterPoint();
			t.translate(i.x, i.y), t.rotate(o(this.angle)), t.scale(this.scaleX * (this.flipX ? -1 : 1), this.scaleY * (this.flipY ? -1 : 1))
		},
		toObject: function(t) {
			var i = e.Object.NUM_FRACTION_DIGITS,
				r = {
					type: this.type,
					originX: this.originX,
					originY: this.originY,
					left: n(this.left, i),
					top: n(this.top, i),
					width: n(this.width, i),
					height: n(this.height, i),
					fill: this.fill && this.fill.toObject ? this.fill.toObject() : this.fill,
					stroke: this.stroke && this.stroke.toObject ? this.stroke.toObject() : this.stroke,
					strokeWidth: n(this.strokeWidth, i),
					strokeDashArray: this.strokeDashArray,
					strokeLineCap: this.strokeLineCap,
					strokeLineJoin: this.strokeLineJoin,
					strokeMiterLimit: n(this.strokeMiterLimit, i),
					scaleX: n(this.scaleX, i),
					scaleY: n(this.scaleY, i),
					angle: n(this.getAngle(), i),
					flipX: this.flipX,
					flipY: this.flipY,
					opacity: n(this.opacity, i),
					shadow: this.shadow && this.shadow.toObject ? this.shadow.toObject() : this.shadow,
					visible: this.visible,
					clipTo: this.clipTo && String(this.clipTo),
					backgroundColor: this.backgroundColor,
					fillRule: this.fillRule,
					globalCompositeOperation: this.globalCompositeOperation,
					transformMatrix: this.transformMatrix
				};
			return this.includeDefaultValues || (r = this._removeDefaultValues(r)), e.util.populateWithProperties(this, r, t), r
		},
		toDatalessObject: function(t) {
			return this.toObject(t)
		},
		_removeDefaultValues: function(t) {
			var i = e.util.getKlass(t.type).prototype,
				n = i.stateProperties;
			return n.forEach(function(e) {
				t[e] === i[e] && delete t[e];
				var n = "[object Array]" === Object.prototype.toString.call(t[e]) && "[object Array]" === Object.prototype.toString.call(i[e]);
				n && 0 === t[e].length && 0 === i[e].length && delete t[e]
			}), t
		},
		toString: function() {
			return "#<fabric." + r(this.type) + ">"
		},
		get: function(t) {
			return this[t]
		},
		_setObject: function(t) {
			for (var e in t) this._set(e, t[e])
		},
		set: function(t, e) {
			return "object" == typeof t ? this._setObject(t) : "function" == typeof e && "clipTo" !== t ? this._set(t, e(this.get(t))) : this._set(t, e), this
		},
		_set: function(t, i) {
			var r = "scaleX" === t || "scaleY" === t;
			return r && (i = this._constrainScale(i)), "scaleX" === t && 0 > i ? (this.flipX = !this.flipX, i *= -1) : "scaleY" === t && 0 > i ? (this.flipY = !this.flipY, i *= -1) : "width" === t || "height" === t ? this.minScaleLimit = n(Math.min(.1, 1 / Math.max(this.width, this.height)), 2) : "shadow" !== t || !i || i instanceof e.Shadow || (i = new e.Shadow(i)), this[t] = i, this
		},
		setOnGroup: function() {},
		toggle: function(t) {
			var e = this.get(t);
			return "boolean" == typeof e && this.set(t, !e), this
		},
		setSourcePath: function(t) {
			return this.sourcePath = t, this
		},
		getViewportTransform: function() {
			return this.canvas && this.canvas.viewportTransform ? this.canvas.viewportTransform : [1, 0, 0, 1, 0, 0]
		},
		render: function(t, i) {
			0 === this.width && 0 === this.height || !this.visible || (t.save(), this._setupCompositeOperation(t), i || this.transform(t), this._setStrokeStyles(t), this._setFillStyles(t), this.transformMatrix && t.transform.apply(t, this.transformMatrix), this._setOpacity(t), this._setShadow(t), this.clipTo && e.util.clipContext(this, t), this._render(t, i), this.clipTo && t.restore(), t.restore())
		},
		_setOpacity: function(t) {
			this.group && this.group._setOpacity(t), t.globalAlpha *= this.opacity
		},
		_setStrokeStyles: function(t) {
			this.stroke && (t.lineWidth = this.strokeWidth, t.lineCap = this.strokeLineCap, t.lineJoin = this.strokeLineJoin, t.miterLimit = this.strokeMiterLimit, t.strokeStyle = this.stroke.toLive ? this.stroke.toLive(t, this) : this.stroke)
		},
		_setFillStyles: function(t) {
			this.fill && (t.fillStyle = this.fill.toLive ? this.fill.toLive(t, this) : this.fill)
		},
		_renderControls: function(t, i) {
			if (this.active && !i) {
				var n = this.getViewportTransform();
				t.save();
				var r;
				this.group && (r = e.util.transformPoint(this.group.getCenterPoint(), n), t.translate(r.x, r.y), t.rotate(o(this.group.angle))), r = e.util.transformPoint(this.getCenterPoint(), n, null != this.group), this.group && (r.x *= this.group.scaleX, r.y *= this.group.scaleY), t.translate(r.x, r.y), t.rotate(o(this.angle)), this.drawBorders(t), this.drawControls(t), t.restore()
			}
		},
		_setShadow: function(t) {
			if (this.shadow) {
				var e = this.canvas && this.canvas.viewportTransform[0] || 1,
					i = this.canvas && this.canvas.viewportTransform[3] || 1;
				t.shadowColor = this.shadow.color, t.shadowBlur = this.shadow.blur * (e + i) * (this.scaleX + this.scaleY) / 4, t.shadowOffsetX = this.shadow.offsetX * e * this.scaleX, t.shadowOffsetY = this.shadow.offsetY * i * this.scaleY
			}
		},
		_removeShadow: function(t) {
			this.shadow && (t.shadowColor = "", t.shadowBlur = t.shadowOffsetX = t.shadowOffsetY = 0)
		},
		_renderFill: function(t) {
			if (this.fill) {
				if (t.save(), this.fill.gradientTransform) {
					var e = this.fill.gradientTransform;
					t.transform.apply(t, e)
				}
				this.fill.toLive && t.translate(-this.width / 2 + this.fill.offsetX || 0, -this.height / 2 + this.fill.offsetY || 0), "evenodd" === this.fillRule ? t.fill("evenodd") : t.fill(), t.restore()
			}
		},
		_renderStroke: function(t) {
			if (this.stroke && 0 !== this.strokeWidth) {
				if (this.shadow && !this.shadow.affectStroke && this._removeShadow(t), t.save(), this.strokeDashArray) 1 & this.strokeDashArray.length && this.strokeDashArray.push.apply(this.strokeDashArray, this.strokeDashArray), s ? (t.setLineDash(this.strokeDashArray), this._stroke && this._stroke(t)) : this._renderDashedStroke && this._renderDashedStroke(t), t.stroke();
				else {
					if (this.stroke.gradientTransform) {
						var e = this.stroke.gradientTransform;
						t.transform.apply(t, e)
					}
					this._stroke ? this._stroke(t) : t.stroke()
				}
				t.restore()
			}
		},
		clone: function(t, i) {
			return this.constructor.fromObject ? this.constructor.fromObject(this.toObject(i), t) : new e.Object(this.toObject(i))
		},
		cloneAsImage: function(t) {
			var i = this.toDataURL();
			return e.util.loadImage(i, function(i) {
				t && t(new e.Image(i))
			}), this
		},
		toDataURL: function(t) {
			t || (t = {});
			var i = e.util.createCanvasElement(),
				n = this.getBoundingRect();
			i.width = n.width, i.height = n.height, e.util.wrapElement(i, "div");
			var r = new e.StaticCanvas(i);
			"jpg" === t.format && (t.format = "jpeg"), "jpeg" === t.format && (r.backgroundColor = "#fff");
			var o = {
				active: this.get("active"),
				left: this.getLeft(),
				top: this.getTop()
			};
			this.set("active", !1), this.setPositionByOrigin(new e.Point(i.width / 2, i.height / 2), "center", "center");
			var s = this.canvas;
			r.add(this);
			var a = r.toDataURL(t);
			return this.set(o).setCoords(), this.canvas = s, r.dispose(), r = null, a
		},
		isType: function(t) {
			return this.type === t
		},
		complexity: function() {
			return 0
		},
		toJSON: function(t) {
			return this.toObject(t)
		},
		setGradient: function(t, i) {
			i || (i = {});
			var n = {
				colorStops: []
			};
			n.type = i.type || (i.r1 || i.r2 ? "radial" : "linear"), n.coords = {
				x1: i.x1,
				y1: i.y1,
				x2: i.x2,
				y2: i.y2
			}, (i.r1 || i.r2) && (n.coords.r1 = i.r1, n.coords.r2 = i.r2);
			for (var r in i.colorStops) {
				var o = new e.Color(i.colorStops[r]);
				n.colorStops.push({
					offset: r,
					color: o.toRgb(),
					opacity: o.getAlpha()
				})
			}
			return this.set(t, e.Gradient.forObject(this, n))
		},
		setPatternFill: function(t) {
			return this.set("fill", new e.Pattern(t))
		},
		setShadow: function(t) {
			return this.set("shadow", t ? new e.Shadow(t) : null)
		},
		setColor: function(t) {
			return this.set("fill", t), this
		},
		setAngle: function(t) {
			var e = ("center" !== this.originX || "center" !== this.originY) && this.centeredRotation;
			return e && this._setOriginToCenter(), this.set("angle", t), e && this._resetOrigin(), this
		},
		centerH: function() {
			return this.canvas.centerObjectH(this), this
		},
		centerV: function() {
			return this.canvas.centerObjectV(this), this
		},
		center: function() {
			return this.canvas.centerObject(this), this
		},
		remove: function() {
			return this.canvas.remove(this), this
		},
		getLocalPointer: function(t, i) {
			i = i || this.canvas.getPointer(t);
			var n = new e.Point(i.x, i.y),
				r = this._getLeftTopCoords();
			return this.angle && (n = e.util.rotatePoint(n, r, e.util.degreesToRadians(-this.angle))), {
				x: n.x - r.x,
				y: n.y - r.y
			}
		},
		_setupCompositeOperation: function(t) {
			this.globalCompositeOperation && (t.globalCompositeOperation = this.globalCompositeOperation)
		}
	}), e.util.createAccessors(e.Object), e.Object.prototype.rotate = e.Object.prototype.setAngle, i(e.Object.prototype, e.Observable), e.Object.NUM_FRACTION_DIGITS = 2, e.Object.__uid = 0)
}("undefined" != typeof exports ? exports : this),
function() {
	var t = fabric.util.degreesToRadians,
		e = {
			left: -.5,
			center: 0,
			right: .5
		}, i = {
			top: -.5,
			center: 0,
			bottom: .5
		};
	fabric.util.object.extend(fabric.Object.prototype, {
		translateToGivenOrigin: function(t, n, r, o, s) {
			var a, c = t.x,
				h = t.y,
				l = e[o] - e[n],
				u = i[s] - i[r];
			return (l || u) && (a = this._getTransformedDimensions(), c = t.x + l * a.x, h = t.y + u * a.y), new fabric.Point(c, h)
		},
		translateToCenterPoint: function(e, i, n) {
			var r = this.translateToGivenOrigin(e, i, n, "center", "center");
			return this.angle ? fabric.util.rotatePoint(r, e, t(this.angle)) : r
		},
		translateToOriginPoint: function(e, i, n) {
			var r = this.translateToGivenOrigin(e, "center", "center", i, n);
			return this.angle ? fabric.util.rotatePoint(r, e, t(this.angle)) : r
		},
		getCenterPoint: function() {
			var t = new fabric.Point(this.left, this.top);
			return this.translateToCenterPoint(t, this.originX, this.originY)
		},
		getPointByOrigin: function(t, e) {
			var i = this.getCenterPoint();
			return this.translateToOriginPoint(i, t, e)
		},
		toLocalPoint: function(e, i, n) {
			var r, o, s = this.getCenterPoint();
			return r = i && n ? this.translateToGivenOrigin(s, "center", "center", i, n) : new fabric.Point(this.left, this.top), o = new fabric.Point(e.x, e.y), this.angle && (o = fabric.util.rotatePoint(o, s, -t(this.angle))), o.subtractEquals(r)
		},
		setPositionByOrigin: function(t, e, i) {
			var n = this.translateToCenterPoint(t, e, i),
				r = this.translateToOriginPoint(n, this.originX, this.originY);
			this.set("left", r.x), this.set("top", r.y)
		},
		adjustPosition: function(i) {
			var n = t(this.angle),
				r = this.getWidth(),
				o = Math.cos(n) * r,
				s = Math.sin(n) * r;
			this.left += o * (e[i] - e[this.originX]), this.top += s * (e[i] - e[this.originX]), this.setCoords(), this.originX = i
		},
		_setOriginToCenter: function() {
			this._originalOriginX = this.originX, this._originalOriginY = this.originY;
			var t = this.getCenterPoint();
			this.originX = "center", this.originY = "center", this.left = t.x, this.top = t.y
		},
		_resetOrigin: function() {
			var t = this.translateToOriginPoint(this.getCenterPoint(), this._originalOriginX, this._originalOriginY);
			this.originX = this._originalOriginX, this.originY = this._originalOriginY, this.left = t.x, this.top = t.y, this._originalOriginX = null, this._originalOriginY = null
		},
		_getLeftTopCoords: function() {
			return this.translateToOriginPoint(this.getCenterPoint(), "left", "top")
		}
	})
}(),
function() {
	var t = fabric.util.degreesToRadians;
	fabric.util.object.extend(fabric.Object.prototype, {
		oCoords: null,
		intersectsWithRect: function(t, e) {
			var i = this.oCoords,
				n = new fabric.Point(i.tl.x, i.tl.y),
				r = new fabric.Point(i.tr.x, i.tr.y),
				o = new fabric.Point(i.bl.x, i.bl.y),
				s = new fabric.Point(i.br.x, i.br.y),
				a = fabric.Intersection.intersectPolygonRectangle([n, r, s, o], t, e);
			return "Intersection" === a.status
		},
		intersectsWithObject: function(t) {
			function e(t) {
				return {
					tl: new fabric.Point(t.tl.x, t.tl.y),
					tr: new fabric.Point(t.tr.x, t.tr.y),
					bl: new fabric.Point(t.bl.x, t.bl.y),
					br: new fabric.Point(t.br.x, t.br.y)
				}
			}
			var i = e(this.oCoords),
				n = e(t.oCoords),
				r = fabric.Intersection.intersectPolygonPolygon([i.tl, i.tr, i.br, i.bl], [n.tl, n.tr, n.br, n.bl]);
			return "Intersection" === r.status
		},
		isContainedWithinObject: function(t) {
			var e = t.getBoundingRect(),
				i = new fabric.Point(e.left, e.top),
				n = new fabric.Point(e.left + e.width, e.top + e.height);
			return this.isContainedWithinRect(i, n)
		},
		isContainedWithinRect: function(t, e) {
			var i = this.getBoundingRect();
			return i.left >= t.x && i.left + i.width <= e.x && i.top >= t.y && i.top + i.height <= e.y
		},
		containsPoint: function(t) {
			var e = this._getImageLines(this.oCoords),
				i = this._findCrossPoints(t, e);
			return 0 !== i && i % 2 === 1
		},
		_getImageLines: function(t) {
			return {
				topline: {
					o: t.tl,
					d: t.tr
				},
				rightline: {
					o: t.tr,
					d: t.br
				},
				bottomline: {
					o: t.br,
					d: t.bl
				},
				leftline: {
					o: t.bl,
					d: t.tl
				}
			}
		},
		_findCrossPoints: function(t, e) {
			var i, n, r, o, s, a, c, h = 0;
			for (var l in e) if (c = e[l], !(c.o.y < t.y && c.d.y < t.y || c.o.y >= t.y && c.d.y >= t.y || (c.o.x === c.d.x && c.o.x >= t.x ? (s = c.o.x, a = t.y) : (i = 0, n = (c.d.y - c.o.y) / (c.d.x - c.o.x), r = t.y - i * t.x, o = c.o.y - n * c.o.x, s = -(r - o) / (i - n), a = r + i * s), s >= t.x && (h += 1), 2 !== h))) break;
			return h
		},
		getBoundingRectWidth: function() {
			return this.getBoundingRect().width
		},
		getBoundingRectHeight: function() {
			return this.getBoundingRect().height
		},
		getBoundingRect: function() {
			this.oCoords || this.setCoords();
			var t = [this.oCoords.tl.x, this.oCoords.tr.x, this.oCoords.br.x, this.oCoords.bl.x],
				e = fabric.util.array.min(t),
				i = fabric.util.array.max(t),
				n = Math.abs(e - i),
				r = [this.oCoords.tl.y, this.oCoords.tr.y, this.oCoords.br.y, this.oCoords.bl.y],
				o = fabric.util.array.min(r),
				s = fabric.util.array.max(r),
				a = Math.abs(o - s);
			return {
				left: e,
				top: o,
				width: n,
				height: a
			}
		},
		getWidth: function() {
			return this.width * this.scaleX
		},
		getHeight: function() {
			return this.height * this.scaleY
		},
		_constrainScale: function(t) {
			return Math.abs(t) < this.minScaleLimit ? 0 > t ? -this.minScaleLimit : this.minScaleLimit : t
		},
		scale: function(t) {
			return t = this._constrainScale(t), 0 > t && (this.flipX = !this.flipX, this.flipY = !this.flipY, t *= -1), this.scaleX = t, this.scaleY = t, this.setCoords(), this
		},
		scaleToWidth: function(t) {
			var e = this.getBoundingRectWidth() / this.getWidth();
			return this.scale(t / this.width / e)
		},
		scaleToHeight: function(t) {
			var e = this.getBoundingRectHeight() / this.getHeight();
			return this.scale(t / this.height / e)
		},
		setCoords: function() {
			var e = t(this.angle),
				i = this.getViewportTransform(),
				n = function(t) {
					return fabric.util.transformPoint(t, i)
				}, r = this._calculateCurrentDimensions(!1),
				o = r.x,
				s = r.y;
			0 > o && (o = Math.abs(o));
			var a = Math.sqrt(Math.pow(o / 2, 2) + Math.pow(s / 2, 2)),
				c = Math.atan(isFinite(s / o) ? s / o : 0),
				h = Math.cos(c + e) * a,
				l = Math.sin(c + e) * a,
				u = Math.sin(e),
				f = Math.cos(e),
				d = this.getCenterPoint(),
				p = new fabric.Point(o, s),
				g = new fabric.Point(d.x - h, d.y - l),
				v = new fabric.Point(g.x + p.x * f, g.y + p.x * u),
				m = n(new fabric.Point(g.x - p.y * u, g.y + p.y * f)),
				b = n(new fabric.Point(v.x - p.y * u, v.y + p.y * f)),
				y = n(g),
				_ = n(v),
				w = new fabric.Point((y.x + m.x) / 2, (y.y + m.y) / 2),
				x = new fabric.Point((_.x + y.x) / 2, (_.y + y.y) / 2),
				S = new fabric.Point((b.x + _.x) / 2, (b.y + _.y) / 2),
				C = new fabric.Point((b.x + m.x) / 2, (b.y + m.y) / 2),
				k = new fabric.Point(x.x + u * this.rotatingPointOffset, x.y - f * this.rotatingPointOffset);
			return this.oCoords = {
				tl: y,
				tr: _,
				br: b,
				bl: m,
				ml: w,
				mt: x,
				mr: S,
				mb: C,
				mtr: k
			}, this._setCornerCoords && this._setCornerCoords(), this
		},
		_calcDimensionsTransformMatrix: function() {
			return [this.scaleX, 0, 0, this.scaleY, 0, 0]
		}
	})
}(), fabric.util.object.extend(fabric.Object.prototype, {
	sendToBack: function() {
		return this.group ? fabric.StaticCanvas.prototype.sendToBack.call(this.group, this) : this.canvas.sendToBack(this), this
	},
	bringToFront: function() {
		return this.group ? fabric.StaticCanvas.prototype.bringToFront.call(this.group, this) : this.canvas.bringToFront(this), this
	},
	sendBackwards: function(t) {
		return this.group ? fabric.StaticCanvas.prototype.sendBackwards.call(this.group, this, t) : this.canvas.sendBackwards(this, t), this
	},
	bringForward: function(t) {
		return this.group ? fabric.StaticCanvas.prototype.bringForward.call(this.group, this, t) : this.canvas.bringForward(this, t), this
	},
	moveTo: function(t) {
		return this.group ? fabric.StaticCanvas.prototype.moveTo.call(this.group, this, t) : this.canvas.moveTo(this, t), this
	}
}), fabric.util.object.extend(fabric.Object.prototype, {
	hasStateChanged: function() {
		return this.stateProperties.some(function(t) {
			return this.get(t) !== this.originalState[t]
		}, this)
	},
	saveState: function(t) {
		return this.stateProperties.forEach(function(t) {
			this.originalState[t] = this.get(t)
		}, this), t && t.stateProperties && t.stateProperties.forEach(function(t) {
			this.originalState[t] = this.get(t)
		}, this), this
	},
	setupState: function() {
		return this.originalState = {}, this.saveState(), this
	}
}),
function() {
	var t = fabric.util.degreesToRadians,
		e = function() {
			return "undefined" != typeof G_vmlCanvasManager
		};
	fabric.util.object.extend(fabric.Object.prototype, {
		_controlsVisibility: null,
		_findTargetCorner: function(t) {
			if (!this.hasControls || !this.active) return !1;
			var e, i, n = t.x,
				r = t.y;
			for (var o in this.oCoords) if (this.isControlVisible(o) && ("mtr" !== o || this.hasRotatingPoint) && (!this.get("lockUniScaling") || "mt" !== o && "mr" !== o && "mb" !== o && "ml" !== o) && (i = this._getImageLines(this.oCoords[o].corner), e = this._findCrossPoints({
				x: n,
				y: r
			}, i), 0 !== e && e % 2 === 1)) return this.__corner = o, o;
			return !1
		},
		_setCornerCoords: function() {
			var e, i, n = this.oCoords,
				r = t(45 - this.angle),
				o = Math.sqrt(2 * Math.pow(this.cornerSize, 2)) / 2,
				s = o * Math.cos(r),
				a = o * Math.sin(r);
			for (var c in n) e = n[c].x, i = n[c].y, n[c].corner = {
				tl: {
					x: e - a,
					y: i - s
				},
				tr: {
					x: e + s,
					y: i - a
				},
				bl: {
					x: e - s,
					y: i + a
				},
				br: {
					x: e + a,
					y: i + s
				}
			}
		},
		_getNonTransformedDimensions: function() {
			var t = this.strokeWidth,
				e = this.width,
				i = this.height,
				n = "round" === this.strokeLineCap || "square" === this.strokeLineCap,
				r = "line" === this.type && 0 === this.width,
				o = "line" === this.type && 0 === this.height,
				s = r || o,
				a = n && o || !s,
				c = n && r || !s;
			return r ? e = t : o && (i = t), a && (e += 0 > e ? -t : t), c && (i += 0 > i ? -t : t), {
				x: e,
				y: i
			}
		},
		_getTransformedDimensions: function(t) {
			t || (t = this._getNonTransformedDimensions());
			var e = this._calcDimensionsTransformMatrix();
			return fabric.util.transformPoint(t, e, !0)
		},
		_calculateCurrentDimensions: function(t) {
			var e = this.getViewportTransform(),
				i = this._getTransformedDimensions(),
				n = i.x,
				r = i.y;
			return n += 2 * this.padding, r += 2 * this.padding, t ? fabric.util.transformPoint(new fabric.Point(n, r), e, !0) : {
				x: n,
				y: r
			}
		},
		drawBorders: function(t) {
			if (!this.hasBorders) return this;
			t.save(), t.globalAlpha = this.isMoving ? this.borderOpacityWhenMoving : 1,
			t.strokeStyle = this.borderColor, t.lineWidth = 1 / this.borderScaleFactor;
			var e = this._calculateCurrentDimensions(!0),
				i = e.x,
				n = e.y;
			if (this.group && (i *= this.group.scaleX, n *= this.group.scaleY), t.strokeRect(~~ - (i / 2) - .5, ~~ - (n / 2) - .5, ~~i + 1, ~~n + 1), this.hasRotatingPoint && this.isControlVisible("mtr") && !this.get("lockRotation") && this.hasControls) {
				var r = -n / 2;
				t.beginPath(), t.moveTo(0, r), t.lineTo(0, r - this.rotatingPointOffset), t.closePath(), t.stroke()
			}
			return t.restore(), this
		},
		drawControls: function(t) {
			if (!this.hasControls) return this;
			var e = this._calculateCurrentDimensions(!0),
				i = e.x,
				n = e.y,
				r = -(i / 2),
				o = -(n / 2),
				s = this.cornerSize / 2,
				a = this.transparentCorners ? "strokeRect" : "fillRect";
			return t.save(), t.lineWidth = 1, t.globalAlpha = this.isMoving ? this.borderOpacityWhenMoving : 1, t.strokeStyle = t.fillStyle = this.cornerColor, this._drawControl("tl", t, a, r - s, o - s), this._drawControl("tr", t, a, r + i - s, o - s), this._drawControl("bl", t, a, r - s, o + n - s), this._drawControl("br", t, a, r + i - s, o + n - s), this.get("lockUniScaling") || (this._drawControl("mt", t, a, r + i / 2 - s, o - s), this._drawControl("mb", t, a, r + i / 2 - s, o + n - s), this._drawControl("mr", t, a, r + i - s, o + n / 2 - s), this._drawControl("ml", t, a, r - s, o + n / 2 - s)), this.hasRotatingPoint && this._drawControl("mtr", t, a, r + i / 2 - s, o - this.rotatingPointOffset - s), t.restore(), this
		},
		_drawControl: function(t, i, n, r, o) {
			if (this.isControlVisible(t)) {
				var s = this.cornerSize;
				e() || this.transparentCorners || i.clearRect(r, o, s, s), i[n](r, o, s, s)
			}
		},
		isControlVisible: function(t) {
			return this._getControlsVisibility()[t]
		},
		setControlVisible: function(t, e) {
			return this._getControlsVisibility()[t] = e, this
		},
		setControlsVisibility: function(t) {
			t || (t = {});
			for (var e in t) this.setControlVisible(e, t[e]);
			return this
		},
		_getControlsVisibility: function() {
			return this._controlsVisibility || (this._controlsVisibility = {
				tl: !0,
				tr: !0,
				br: !0,
				bl: !0,
				ml: !0,
				mt: !0,
				mr: !0,
				mb: !0,
				mtr: !0
			}), this._controlsVisibility
		}
	})
}(), fabric.util.object.extend(fabric.StaticCanvas.prototype, {
	FX_DURATION: 500,
	fxCenterObjectH: function(t, e) {
		e = e || {};
		var i = function() {}, n = e.onComplete || i,
			r = e.onChange || i,
			o = this;
		return fabric.util.animate({
			startValue: t.get("left"),
			endValue: this.getCenter().left,
			duration: this.FX_DURATION,
			onChange: function(e) {
				t.set("left", e), o.renderAll(), r()
			},
			onComplete: function() {
				t.setCoords(), n()
			}
		}), this
	},
	fxCenterObjectV: function(t, e) {
		e = e || {};
		var i = function() {}, n = e.onComplete || i,
			r = e.onChange || i,
			o = this;
		return fabric.util.animate({
			startValue: t.get("top"),
			endValue: this.getCenter().top,
			duration: this.FX_DURATION,
			onChange: function(e) {
				t.set("top", e), o.renderAll(), r()
			},
			onComplete: function() {
				t.setCoords(), n()
			}
		}), this
	},
	fxRemove: function(t, e) {
		e = e || {};
		var i = function() {}, n = e.onComplete || i,
			r = e.onChange || i,
			o = this;
		return fabric.util.animate({
			startValue: t.get("opacity"),
			endValue: 0,
			duration: this.FX_DURATION,
			onStart: function() {
				t.set("active", !1)
			},
			onChange: function(e) {
				t.set("opacity", e), o.renderAll(), r()
			},
			onComplete: function() {
				o.remove(t), n()
			}
		}), this
	}
}), fabric.util.object.extend(fabric.Object.prototype, {
	animate: function() {
		if (arguments[0] && "object" == typeof arguments[0]) {
			var t, e, i = [];
			for (t in arguments[0]) i.push(t);
			for (var n = 0, r = i.length; r > n; n++) t = i[n], e = n !== r - 1, this._animate(t, arguments[0][t], arguments[1], e)
		} else this._animate.apply(this, arguments);
		return this
	},
	_animate: function(t, e, i, n) {
		var r, o = this;
		e = e.toString(), i = i ? fabric.util.object.clone(i) : {}, ~t.indexOf(".") && (r = t.split("."));
		var s = r ? this.get(r[0])[r[1]] : this.get(t);
		"from" in i || (i.from = s), e = ~e.indexOf("=") ? s + parseFloat(e.replace("=", "")) : parseFloat(e), fabric.util.animate({
			startValue: i.from,
			endValue: e,
			byValue: i.by,
			easing: i.easing,
			duration: i.duration,
			abort: i.abort && function() {
				return i.abort.call(o)
			},
			onChange: function(e) {
				r ? o[r[0]][r[1]] = e : o.set(t, e), n || i.onChange && i.onChange()
			},
			onComplete: function() {
				n || (o.setCoords(), i.onComplete && i.onComplete())
			}
		})
	}
}),
function(t) {
	"use strict";

	function e(t, e) {
		var i = t.origin,
			n = t.axis1,
			r = t.axis2,
			o = t.dimension,
			s = e.nearest,
			a = e.center,
			c = e.farthest;
		return function() {
			switch (this.get(i)) {
				case s:
					return Math.min(this.get(n), this.get(r));
				case a:
					return Math.min(this.get(n), this.get(r)) + .5 * this.get(o);
				case c:
					return Math.max(this.get(n), this.get(r))
			}
		}
	}
	var i = t.fabric || (t.fabric = {}),
		n = i.util.object.extend,
		r = {
			x1: 1,
			x2: 1,
			y1: 1,
			y2: 1
		}, o = i.StaticCanvas.supports("setLineDash");
	return i.Line ? void i.warn("fabric.Line is already defined") : (i.Line = i.util.createClass(i.Object, {
		type: "line",
		x1: 0,
		y1: 0,
		x2: 0,
		y2: 0,
		initialize: function(t, e) {
			e = e || {}, t || (t = [0, 0, 0, 0]), this.callSuper("initialize", e), this.set("x1", t[0]), this.set("y1", t[1]), this.set("x2", t[2]), this.set("y2", t[3]), this._setWidthHeight(e)
		},
		_setWidthHeight: function(t) {
			t || (t = {}), this.width = Math.abs(this.x2 - this.x1), this.height = Math.abs(this.y2 - this.y1), this.left = "left" in t ? t.left : this._getLeftToOriginX(), this.top = "top" in t ? t.top : this._getTopToOriginY()
		},
		_set: function(t, e) {
			return this.callSuper("_set", t, e), "undefined" != typeof r[t] && this._setWidthHeight(), this
		},
		_getLeftToOriginX: e({
			origin: "originX",
			axis1: "x1",
			axis2: "x2",
			dimension: "width"
		}, {
			nearest: "left",
			center: "center",
			farthest: "right"
		}),
		_getTopToOriginY: e({
			origin: "originY",
			axis1: "y1",
			axis2: "y2",
			dimension: "height"
		}, {
			nearest: "top",
			center: "center",
			farthest: "bottom"
		}),
		_render: function(t, e) {
			if (t.beginPath(), e) {
				var i = this.getCenterPoint();
				t.translate(i.x - this.strokeWidth / 2, i.y - this.strokeWidth / 2)
			}
			if (!this.strokeDashArray || this.strokeDashArray && o) {
				var n = this.calcLinePoints();
				t.moveTo(n.x1, n.y1), t.lineTo(n.x2, n.y2)
			}
			t.lineWidth = this.strokeWidth;
			var r = t.strokeStyle;
			t.strokeStyle = this.stroke || t.fillStyle, this.stroke && this._renderStroke(t), t.strokeStyle = r
		},
		_renderDashedStroke: function(t) {
			var e = this.calcLinePoints();
			t.beginPath(), i.util.drawDashedLine(t, e.x1, e.y1, e.x2, e.y2, this.strokeDashArray), t.closePath()
		},
		toObject: function(t) {
			return n(this.callSuper("toObject", t), this.calcLinePoints())
		},
		calcLinePoints: function() {
			var t = this.x1 <= this.x2 ? -1 : 1,
				e = this.y1 <= this.y2 ? -1 : 1,
				i = t * this.width * .5,
				n = e * this.height * .5,
				r = t * this.width * -.5,
				o = e * this.height * -.5;
			return {
				x1: i,
				x2: r,
				y1: n,
				y2: o
			}
		},
		complexity: function() {
			return 1
		}
	}), void(i.Line.fromObject = function(t) {
		var e = [t.x1, t.y1, t.x2, t.y2];
		return new i.Line(e, t)
	}))
}("undefined" != typeof exports ? exports : this),
function(t) {
	"use strict";
	var e = t.fabric || (t.fabric = {}),
		i = Math.PI,
		n = e.util.object.extend;
	return e.Circle ? void e.warn("fabric.Circle is already defined.") : (e.Circle = e.util.createClass(e.Object, {
		type: "circle",
		radius: 0,
		startAngle: 0,
		endAngle: 2 * i,
		initialize: function(t) {
			t = t || {}, this.callSuper("initialize", t), this.set("radius", t.radius || 0), this.startAngle = t.startAngle || this.startAngle, this.endAngle = t.endAngle || this.endAngle
		},
		_set: function(t, e) {
			return this.callSuper("_set", t, e), "radius" === t && this.setRadius(e), this
		},
		toObject: function(t) {
			return n(this.callSuper("toObject", t), {
				radius: this.get("radius"),
				startAngle: this.startAngle,
				endAngle: this.endAngle
			})
		},
		_render: function(t, e) {
			t.beginPath(), t.arc(e ? this.left + this.radius : 0, e ? this.top + this.radius : 0, this.radius, this.startAngle, this.endAngle, !1), this._renderFill(t), this._renderStroke(t)
		},
		getRadiusX: function() {
			return this.get("radius") * this.get("scaleX")
		},
		getRadiusY: function() {
			return this.get("radius") * this.get("scaleY")
		},
		setRadius: function(t) {
			return this.radius = t, this.set("width", 2 * t).set("height", 2 * t)
		},
		complexity: function() {
			return 1
		}
	}), void(e.Circle.fromObject = function(t) {
		return new e.Circle(t)
	}))
}("undefined" != typeof exports ? exports : this),
function(t) {
	"use strict";
	var e = t.fabric || (t.fabric = {});
	return e.Triangle ? void e.warn("fabric.Triangle is already defined") : (e.Triangle = e.util.createClass(e.Object, {
		type: "triangle",
		initialize: function(t) {
			t = t || {}, this.callSuper("initialize", t), this.set("width", t.width || 100).set("height", t.height || 100)
		},
		_render: function(t) {
			var e = this.width / 2,
				i = this.height / 2;
			t.beginPath(), t.moveTo(-e, i), t.lineTo(0, -i), t.lineTo(e, i), t.closePath(), this._renderFill(t), this._renderStroke(t)
		},
		_renderDashedStroke: function(t) {
			var i = this.width / 2,
				n = this.height / 2;
			t.beginPath(), e.util.drawDashedLine(t, -i, n, 0, -n, this.strokeDashArray), e.util.drawDashedLine(t, 0, -n, i, n, this.strokeDashArray), e.util.drawDashedLine(t, i, n, -i, n, this.strokeDashArray), t.closePath()
		},
		complexity: function() {
			return 1
		}
	}), void(e.Triangle.fromObject = function(t) {
		return new e.Triangle(t)
	}))
}("undefined" != typeof exports ? exports : this),
function(t) {
	"use strict";
	var e = t.fabric || (t.fabric = {}),
		i = 2 * Math.PI,
		n = e.util.object.extend;
	return e.Ellipse ? void e.warn("fabric.Ellipse is already defined.") : (e.Ellipse = e.util.createClass(e.Object, {
		type: "ellipse",
		rx: 0,
		ry: 0,
		initialize: function(t) {
			t = t || {}, this.callSuper("initialize", t), this.set("rx", t.rx || 0), this.set("ry", t.ry || 0)
		},
		_set: function(t, e) {
			switch (this.callSuper("_set", t, e), t) {
				case "rx":
					this.rx = e, this.set("width", 2 * e);
					break;
				case "ry":
					this.ry = e, this.set("height", 2 * e)
			}
			return this
		},
		getRx: function() {
			return this.get("rx") * this.get("scaleX")
		},
		getRy: function() {
			return this.get("ry") * this.get("scaleY")
		},
		toObject: function(t) {
			return n(this.callSuper("toObject", t), {
				rx: this.get("rx"),
				ry: this.get("ry")
			})
		},
		_render: function(t, e) {
			t.beginPath(), t.save(), t.transform(1, 0, 0, this.ry / this.rx, 0, 0), t.arc(e ? this.left + this.rx : 0, e ? (this.top + this.ry) * this.rx / this.ry : 0, this.rx, 0, i, !1), t.restore(), this._renderFill(t), this._renderStroke(t)
		},
		complexity: function() {
			return 1
		}
	}), void(e.Ellipse.fromObject = function(t) {
		return new e.Ellipse(t)
	}))
}("undefined" != typeof exports ? exports : this),
function(t) {
	"use strict";
	var e = t.fabric || (t.fabric = {}),
		i = e.util.object.extend;
	if (e.Rect) return void e.warn("fabric.Rect is already defined");
	var n = e.Object.prototype.stateProperties.concat();
	n.push("rx", "ry", "x", "y"), e.Rect = e.util.createClass(e.Object, {
		stateProperties: n,
		type: "rect",
		rx: 0,
		ry: 0,
		strokeDashArray: null,
		initialize: function(t) {
			t = t || {}, this.callSuper("initialize", t), this._initRxRy()
		},
		_initRxRy: function() {
			this.rx && !this.ry ? this.ry = this.rx : this.ry && !this.rx && (this.rx = this.ry)
		},
		_render: function(t, e) {
			if (1 === this.width && 1 === this.height) return void t.fillRect(0, 0, 1, 1);
			var i = this.rx ? Math.min(this.rx, this.width / 2) : 0,
				n = this.ry ? Math.min(this.ry, this.height / 2) : 0,
				r = this.width,
				o = this.height,
				s = e ? this.left : -this.width / 2,
				a = e ? this.top : -this.height / 2,
				c = 0 !== i || 0 !== n,
				h = .4477152502;
			t.beginPath(), t.moveTo(s + i, a), t.lineTo(s + r - i, a), c && t.bezierCurveTo(s + r - h * i, a, s + r, a + h * n, s + r, a + n), t.lineTo(s + r, a + o - n), c && t.bezierCurveTo(s + r, a + o - h * n, s + r - h * i, a + o, s + r - i, a + o), t.lineTo(s + i, a + o), c && t.bezierCurveTo(s + h * i, a + o, s, a + o - h * n, s, a + o - n), t.lineTo(s, a + n), c && t.bezierCurveTo(s, a + h * n, s + h * i, a, s + i, a), t.closePath(), this._renderFill(t), this._renderStroke(t)
		},
		_renderDashedStroke: function(t) {
			var i = -this.width / 2,
				n = -this.height / 2,
				r = this.width,
				o = this.height;
			t.beginPath(), e.util.drawDashedLine(t, i, n, i + r, n, this.strokeDashArray), e.util.drawDashedLine(t, i + r, n, i + r, n + o, this.strokeDashArray), e.util.drawDashedLine(t, i + r, n + o, i, n + o, this.strokeDashArray), e.util.drawDashedLine(t, i, n + o, i, n, this.strokeDashArray), t.closePath()
		},
		toObject: function(t) {
			var e = i(this.callSuper("toObject", t), {
				rx: this.get("rx") || 0,
				ry: this.get("ry") || 0
			});
			return this.includeDefaultValues || this._removeDefaultValues(e), e
		},
		complexity: function() {
			return 1
		}
	}), e.Rect.fromObject = function(t) {
		return new e.Rect(t)
	}
}("undefined" != typeof exports ? exports : this),
function(t) {
	"use strict";
	var e = t.fabric || (t.fabric = {});
	return e.Polyline ? void e.warn("fabric.Polyline is already defined") : (e.Polyline = e.util.createClass(e.Object, {
		type: "polyline",
		points: null,
		minX: 0,
		minY: 0,
		initialize: function(t, i) {
			return e.Polygon.prototype.initialize.call(this, t, i)
		},
		_calcDimensions: function() {
			return e.Polygon.prototype._calcDimensions.call(this)
		},
		_applyPointOffset: function() {
			return e.Polygon.prototype._applyPointOffset.call(this)
		},
		toObject: function(t) {
			return e.Polygon.prototype.toObject.call(this, t)
		},
		_render: function(t) {
			e.Polygon.prototype.commonRender.call(this, t) && (this._renderFill(t), this._renderStroke(t))
		},
		_renderDashedStroke: function(t) {
			var i, n;
			t.beginPath();
			for (var r = 0, o = this.points.length; o > r; r++) i = this.points[r], n = this.points[r + 1] || i, e.util.drawDashedLine(t, i.x, i.y, n.x, n.y, this.strokeDashArray)
		},
		complexity: function() {
			return this.get("points").length
		}
	}), void(e.Polyline.fromObject = function(t) {
		var i = t.points;
		return new e.Polyline(i, t, !0)
	}))
}("undefined" != typeof exports ? exports : this),
function(t) {
	"use strict";
	var e = t.fabric || (t.fabric = {}),
		i = e.util.object.extend,
		n = e.util.array.min,
		r = e.util.array.max;
	e.util.toFixed;
	return e.Polygon ? void e.warn("fabric.Polygon is already defined") : (e.Polygon = e.util.createClass(e.Object, {
		type: "polygon",
		points: null,
		minX: 0,
		minY: 0,
		initialize: function(t, e) {
			e = e || {}, this.points = t || [], this.callSuper("initialize", e), this._calcDimensions(), "top" in e || (this.top = this.minY), "left" in e || (this.left = this.minX)
		},
		_calcDimensions: function() {
			var t = this.points,
				e = n(t, "x"),
				i = n(t, "y"),
				o = r(t, "x"),
				s = r(t, "y");
			this.width = o - e || 0, this.height = s - i || 0, this.minX = e || 0, this.minY = i || 0
		},
		_applyPointOffset: function() {
			this.points.forEach(function(t) {
				t.x -= this.minX + this.width / 2, t.y -= this.minY + this.height / 2
			}, this)
		},
		toObject: function(t) {
			return i(this.callSuper("toObject", t), {
				points: this.points.concat()
			})
		},
		_render: function(t) {
			this.commonRender(t) && (this._renderFill(t), (this.stroke || this.strokeDashArray) && (t.closePath(), this._renderStroke(t)))
		},
		commonRender: function(t) {
			var e, i = this.points.length;
			if (!i || isNaN(this.points[i - 1].y)) return !1;
			t.beginPath(), this._applyPointOffset && (this.group && "path-group" === this.group.type || this._applyPointOffset(), this._applyPointOffset = null), t.moveTo(this.points[0].x, this.points[0].y);
			for (var n = 0; i > n; n++) e = this.points[n], t.lineTo(e.x, e.y);
			return !0
		},
		_renderDashedStroke: function(t) {
			e.Polyline.prototype._renderDashedStroke.call(this, t), t.closePath()
		},
		complexity: function() {
			return this.points.length
		}
	}), void(e.Polygon.fromObject = function(t) {
		return new e.Polygon(t.points, t, !0)
	}))
}("undefined" != typeof exports ? exports : this),
function(t) {
	"use strict";
	var e = t.fabric || (t.fabric = {}),
		i = e.util.array.min,
		n = e.util.array.max,
		r = e.util.object.extend,
		o = Object.prototype.toString,
		s = e.util.drawArc,
		a = {
			m: 2,
			l: 2,
			h: 1,
			v: 1,
			c: 6,
			s: 4,
			q: 4,
			t: 2,
			a: 7
		}, c = {
			m: "l",
			M: "L"
		};
	return e.Path ? void e.warn("fabric.Path is already defined") : (e.Path = e.util.createClass(e.Object, {
		type: "path",
		path: null,
		minX: 0,
		minY: 0,
		initialize: function(t, e) {
			e = e || {}, this.setOptions(e), t || (t = []);
			var i = "[object Array]" === o.call(t);
			this.path = i ? t : t.match && t.match(/[mzlhvcsqta][^mzlhvcsqta]*/gi), this.path && (i || (this.path = this._parsePath()), this._setPositionDimensions(e), e.sourcePath && this.setSourcePath(e.sourcePath))
		},
		_setPositionDimensions: function(t) {
			var e = this._parseDimensions();
			this.minX = e.left, this.minY = e.top, this.width = e.width, this.height = e.height, "undefined" == typeof t.left && (this.left = e.left + ("center" === this.originX ? this.width / 2 : "right" === this.originX ? this.width : 0)), "undefined" == typeof t.top && (this.top = e.top + ("center" === this.originY ? this.height / 2 : "bottom" === this.originY ? this.height : 0)), this.pathOffset = this.pathOffset || {
				x: this.minX + this.width / 2,
				y: this.minY + this.height / 2
			}
		},
		_render: function(t) {
			var e, i, n, r = null,
				o = 0,
				a = 0,
				c = 0,
				h = 0,
				l = 0,
				u = 0,
				f = -this.pathOffset.x,
				d = -this.pathOffset.y;
			this.group && "path-group" === this.group.type && (f = 0, d = 0), t.beginPath();
			for (var p = 0, g = this.path.length; g > p; ++p) {
				switch (e = this.path[p], e[0]) {
					case "l":
						c += e[1], h += e[2], t.lineTo(c + f, h + d);
						break;
					case "L":
						c = e[1], h = e[2], t.lineTo(c + f, h + d);
						break;
					case "h":
						c += e[1], t.lineTo(c + f, h + d);
						break;
					case "H":
						c = e[1], t.lineTo(c + f, h + d);
						break;
					case "v":
						h += e[1], t.lineTo(c + f, h + d);
						break;
					case "V":
						h = e[1], t.lineTo(c + f, h + d);
						break;
					case "m":
						c += e[1], h += e[2], o = c, a = h, t.moveTo(c + f, h + d);
						break;
					case "M":
						c = e[1], h = e[2], o = c, a = h, t.moveTo(c + f, h + d);
						break;
					case "c":
						i = c + e[5], n = h + e[6], l = c + e[3], u = h + e[4], t.bezierCurveTo(c + e[1] + f, h + e[2] + d, l + f, u + d, i + f, n + d), c = i, h = n;
						break;
					case "C":
						c = e[5], h = e[6], l = e[3], u = e[4], t.bezierCurveTo(e[1] + f, e[2] + d, l + f, u + d, c + f, h + d);
						break;
					case "s":
						i = c + e[3], n = h + e[4], null === r[0].match(/[CcSs]/) ? (l = c, u = h) : (l = 2 * c - l, u = 2 * h - u), t.bezierCurveTo(l + f, u + d, c + e[1] + f, h + e[2] + d, i + f, n + d), l = c + e[1], u = h + e[2], c = i, h = n;
						break;
					case "S":
						i = e[3], n = e[4], null === r[0].match(/[CcSs]/) ? (l = c, u = h) : (l = 2 * c - l, u = 2 * h - u), t.bezierCurveTo(l + f, u + d, e[1] + f, e[2] + d, i + f, n + d), c = i, h = n, l = e[1], u = e[2];
						break;
					case "q":
						i = c + e[3], n = h + e[4], l = c + e[1], u = h + e[2], t.quadraticCurveTo(l + f, u + d, i + f, n + d), c = i, h = n;
						break;
					case "Q":
						i = e[3], n = e[4], t.quadraticCurveTo(e[1] + f, e[2] + d, i + f, n + d), c = i, h = n, l = e[1], u = e[2];
						break;
					case "t":
						i = c + e[1], n = h + e[2], null === r[0].match(/[QqTt]/) ? (l = c, u = h) : (l = 2 * c - l, u = 2 * h - u), t.quadraticCurveTo(l + f, u + d, i + f, n + d), c = i, h = n;
						break;
					case "T":
						i = e[1], n = e[2], null === r[0].match(/[QqTt]/) ? (l = c, u = h) : (l = 2 * c - l, u = 2 * h - u), t.quadraticCurveTo(l + f, u + d, i + f, n + d), c = i, h = n;
						break;
					case "a":
						s(t, c + f, h + d, [e[1], e[2], e[3], e[4], e[5], e[6] + c + f, e[7] + h + d]), c += e[6], h += e[7];
						break;
					case "A":
						s(t, c + f, h + d, [e[1], e[2], e[3], e[4], e[5], e[6] + f, e[7] + d]), c = e[6], h = e[7];
						break;
					case "z":
					case "Z":
						c = o, h = a, t.closePath()
				}
				r = e
			}
			this._renderFill(t), this._renderStroke(t)
		},
		toString: function() {
			return "#<fabric.Path (" + this.complexity() + '): { "top": ' + this.top + ', "left": ' + this.left + " }>"
		},
		toObject: function(t) {
			var e = r(this.callSuper("toObject", t), {
				path: this.path.map(function(t) {
					return t.slice()
				}),
				pathOffset: this.pathOffset
			});
			return this.sourcePath && (e.sourcePath = this.sourcePath), this.transformMatrix && (e.transformMatrix = this.transformMatrix), e
		},
		toDatalessObject: function(t) {
			var e = this.toObject(t);
			return this.sourcePath && (e.path = this.sourcePath), delete e.sourcePath, e
		},
		complexity: function() {
			return this.path.length
		},
		_parsePath: function() {
			for (var t, e, i, n, r, o = [], s = [], h = /([-+]?((\d+\.\d+)|((\d+)|(\.\d+)))(?:e[-+]?\d+)?)/gi, l = 0, u = this.path.length; u > l; l++) {
				for (t = this.path[l], n = t.slice(1).trim(), s.length = 0; i = h.exec(n);) s.push(i[0]);
				r = [t.charAt(0)];
				for (var f = 0, d = s.length; d > f; f++) e = parseFloat(s[f]), isNaN(e) || r.push(e);
				var p = r[0],
					g = a[p.toLowerCase()],
					v = c[p] || p;
				if (r.length - 1 > g) for (var m = 1, b = r.length; b > m; m += g) o.push([p].concat(r.slice(m, m + g))), p = v;
				else o.push(r)
			}
			return o
		},
		_parseDimensions: function() {
			for (var t, r, o, s, a = [], c = [], h = null, l = 0, u = 0, f = 0, d = 0, p = 0, g = 0, v = 0, m = this.path.length; m > v; ++v) {
				switch (t = this.path[v], t[0]) {
					case "l":
						f += t[1], d += t[2], s = [];
						break;
					case "L":
						f = t[1], d = t[2], s = [];
						break;
					case "h":
						f += t[1], s = [];
						break;
					case "H":
						f = t[1], s = [];
						break;
					case "v":
						d += t[1], s = [];
						break;
					case "V":
						d = t[1], s = [];
						break;
					case "m":
						f += t[1], d += t[2], l = f, u = d, s = [];
						break;
					case "M":
						f = t[1], d = t[2], l = f, u = d, s = [];
						break;
					case "c":
						r = f + t[5], o = d + t[6], p = f + t[3], g = d + t[4], s = e.util.getBoundsOfCurve(f, d, f + t[1], d + t[2], p, g, r, o), f = r, d = o;
						break;
					case "C":
						f = t[5], d = t[6], p = t[3], g = t[4], s = e.util.getBoundsOfCurve(f, d, t[1], t[2], p, g, f, d);
						break;
					case "s":
						r = f + t[3], o = d + t[4], null === h[0].match(/[CcSs]/) ? (p = f, g = d) : (p = 2 * f - p, g = 2 * d - g), s = e.util.getBoundsOfCurve(f, d, p, g, f + t[1], d + t[2], r, o), p = f + t[1], g = d + t[2], f = r, d = o;
						break;
					case "S":
						r = t[3], o = t[4], null === h[0].match(/[CcSs]/) ? (p = f, g = d) : (p = 2 * f - p, g = 2 * d - g), s = e.util.getBoundsOfCurve(f, d, p, g, t[1], t[2], r, o), f = r, d = o, p = t[1], g = t[2];
						break;
					case "q":
						r = f + t[3], o = d + t[4], p = f + t[1], g = d + t[2], s = e.util.getBoundsOfCurve(f, d, p, g, p, g, r, o), f = r, d = o;
						break;
					case "Q":
						p = t[1], g = t[2], s = e.util.getBoundsOfCurve(f, d, p, g, p, g, t[3], t[4]), f = t[3], d = t[4];
						break;
					case "t":
						r = f + t[1], o = d + t[2], null === h[0].match(/[QqTt]/) ? (p = f, g = d) : (p = 2 * f - p, g = 2 * d - g), s = e.util.getBoundsOfCurve(f, d, p, g, p, g, r, o), f = r, d = o;
						break;
					case "T":
						r = t[1], o = t[2], null === h[0].match(/[QqTt]/) ? (p = f, g = d) : (p = 2 * f - p, g = 2 * d - g), s = e.util.getBoundsOfCurve(f, d, p, g, p, g, r, o), f = r, d = o;
						break;
					case "a":
						s = e.util.getBoundsOfArc(f, d, t[1], t[2], t[3], t[4], t[5], t[6] + f, t[7] + d), f += t[6], d += t[7];
						break;
					case "A":
						s = e.util.getBoundsOfArc(f, d, t[1], t[2], t[3], t[4], t[5], t[6], t[7]), f = t[6], d = t[7];
						break;
					case "z":
					case "Z":
						f = l, d = u
				}
				h = t, s.forEach(function(t) {
					a.push(t.x), c.push(t.y)
				}), a.push(f), c.push(d)
			}
			var b = i(a) || 0,
				y = i(c) || 0,
				_ = n(a) || 0,
				w = n(c) || 0,
				x = _ - b,
				S = w - y,
				C = {
					left: b,
					top: y,
					width: x,
					height: S
				};
			return C
		}
	}), e.Path.fromObject = function(t, i) {
		"string" == typeof t.path ? e.loadSVGFromURL(t.path, function(n) {
			var r = n[0],
				o = t.path;
			delete t.path, e.util.object.extend(r, t), r.setSourcePath(o), i(r)
		}) : i(new e.Path(t.path, t))
	}, void(e.Path.async = !0))
}("undefined" != typeof exports ? exports : this),
function(t) {
	"use strict";
	var e = t.fabric || (t.fabric = {}),
		i = e.util.object.extend,
		n = e.util.array.invoke,
		r = e.Object.prototype.toObject;
	return e.PathGroup ? void e.warn("fabric.PathGroup is already defined") : (e.PathGroup = e.util.createClass(e.Path, {
		type: "path-group",
		fill: "",
		initialize: function(t, e) {
			e = e || {}, this.paths = t || [];
			for (var i = this.paths.length; i--;) this.paths[i].group = this;
			e.toBeParsed && (this.parseDimensionsFromPaths(e), delete e.toBeParsed), this.setOptions(e), this.setCoords(), e.sourcePath && this.setSourcePath(e.sourcePath)
		},
		parseDimensionsFromPaths: function(t) {
			for (var i, n, r, o, s, a, c = [], h = [], l = this.paths.length; l--;) {
				r = this.paths[l], o = r.height + r.strokeWidth, s = r.width + r.strokeWidth, i = [{
					x: r.left,
					y: r.top
				}, {
					x: r.left + s,
					y: r.top
				}, {
					x: r.left,
					y: r.top + o
				}, {
					x: r.left + s,
					y: r.top + o
				}], a = this.paths[l].transformMatrix;
				for (var u = 0; u < i.length; u++) n = i[u], a && (n = e.util.transformPoint(n, a, !1)), c.push(n.x), h.push(n.y)
			}
			t.width = Math.max.apply(null, c), t.height = Math.max.apply(null, h)
		},
		render: function(t) {
			if (this.visible) {
				t.save(), this.transformMatrix && t.transform.apply(t, this.transformMatrix), this.transform(t), this._setShadow(t), this.clipTo && e.util.clipContext(this, t), t.translate(-this.width / 2, -this.height / 2);
				for (var i = 0, n = this.paths.length; n > i; ++i) this.paths[i].render(t, !0);
				this.clipTo && t.restore(), t.restore()
			}
		},
		_set: function(t, e) {
			if ("fill" === t && e && this.isSameColor()) for (var i = this.paths.length; i--;) this.paths[i]._set(t, e);
			return this.callSuper("_set", t, e)
		},
		toObject: function(t) {
			var e = i(r.call(this, t), {
				paths: n(this.getObjects(), "toObject", t)
			});
			return this.sourcePath && (e.sourcePath = this.sourcePath), e
		},
		toDatalessObject: function(t) {
			var e = this.toObject(t);
			return this.sourcePath && (e.paths = this.sourcePath), e
		},
		toString: function() {
			return "#<fabric.PathGroup (" + this.complexity() + "): { top: " + this.top + ", left: " + this.left + " }>"
		},
		isSameColor: function() {
			var t = (this.getObjects()[0].get("fill") || "").toLowerCase();
			return this.getObjects().every(function(e) {
				return (e.get("fill") || "").toLowerCase() === t
			})
		},
		complexity: function() {
			return this.paths.reduce(function(t, e) {
				return t + (e && e.complexity ? e.complexity() : 0)
			}, 0)
		},
		getObjects: function() {
			return this.paths
		}
	}), e.PathGroup.fromObject = function(t, i) {
		"string" == typeof t.paths ? e.loadSVGFromURL(t.paths, function(n) {
			var r = t.paths;
			delete t.paths;
			var o = e.util.groupSVGElements(n, t, r);
			i(o)
		}) : e.util.enlivenObjects(t.paths, function(n) {
			delete t.paths, i(new e.PathGroup(n, t))
		})
	}, void(e.PathGroup.async = !0))
}("undefined" != typeof exports ? exports : this),
function(t) {
	"use strict";
	var e = t.fabric || (t.fabric = {}),
		i = e.util.object.extend,
		n = e.util.array.min,
		r = e.util.array.max,
		o = e.util.array.invoke;
	if (!e.Group) {
		var s = {
			lockMovementX: !0,
			lockMovementY: !0,
			lockRotation: !0,
			lockScalingX: !0,
			lockScalingY: !0,
			lockUniScaling: !0
		};
		e.Group = e.util.createClass(e.Object, e.Collection, {
			type: "group",
			strokeWidth: 0,
			initialize: function(t, e, i) {
				e = e || {}, this._objects = [], i && this.callSuper("initialize", e), this._objects = t || [];
				for (var n = this._objects.length; n--;) this._objects[n].group = this;
				this.originalState = {}, e.originX && (this.originX = e.originX), e.originY && (this.originY = e.originY), i ? this._updateObjectsCoords(!0) : (this._calcBounds(), this._updateObjectsCoords(), this.callSuper("initialize", e)), this.setCoords(), this.saveCoords()
			},
			_updateObjectsCoords: function(t) {
				for (var e = this._objects.length; e--;) this._updateObjectCoords(this._objects[e], t)
			},
			_updateObjectCoords: function(t, e) {
				if (t.__origHasControls = t.hasControls, t.hasControls = !1, !e) {
					var i = t.getLeft(),
						n = t.getTop(),
						r = this.getCenterPoint();
					t.set({
						originalLeft: i,
						originalTop: n,
						left: i - r.x,
						top: n - r.y
					}), t.setCoords()
				}
			},
			toString: function() {
				return "#<fabric.Group: (" + this.complexity() + ")>"
			},
			addWithUpdate: function(t) {
				return this._restoreObjectsState(), t && (this._objects.push(t), t.group = this, t._set("canvas", this.canvas)), this.forEachObject(this._setObjectActive, this), this._calcBounds(), this._updateObjectsCoords(), this
			},
			_setObjectActive: function(t) {
				t.set("active", !0), t.group = this
			},
			removeWithUpdate: function(t) {
				return this._moveFlippedObject(t), this._restoreObjectsState(), this.forEachObject(this._setObjectActive, this), this.remove(t), this._calcBounds(), this._updateObjectsCoords(), this
			},
			_onObjectAdded: function(t) {
				t.group = this, t._set("canvas", this.canvas)
			},
			_onObjectRemoved: function(t) {
				delete t.group, t.set("active", !1)
			},
			delegatedProperties: {
				fill: !0,
				opacity: !0,
				fontFamily: !0,
				fontWeight: !0,
				fontSize: !0,
				fontStyle: !0,
				lineHeight: !0,
				textDecoration: !0,
				textAlign: !0,
				backgroundColor: !0
			},
			_set: function(t, e) {
				var i = this._objects.length;
				if (this.delegatedProperties[t] || "canvas" === t) for (; i--;) this._objects[i].set(t, e);
				else for (; i--;) this._objects[i].setOnGroup(t, e);
				this.callSuper("_set", t, e)
			},
			toObject: function(t) {
				return i(this.callSuper("toObject", t), {
					objects: o(this._objects, "toObject", t)
				})
			},
			render: function(t) {
				if (this.visible) {
					t.save(), this.transformMatrix && t.transform.apply(t, this.transformMatrix), this.transform(t), this.clipTo && e.util.clipContext(this, t);
					for (var i = 0, n = this._objects.length; n > i; i++) this._renderObject(this._objects[i], t);
					this.clipTo && t.restore(), t.restore()
				}
			},
			_renderControls: function(t, e) {
				this.callSuper("_renderControls", t, e);
				for (var i = 0, n = this._objects.length; n > i; i++) this._objects[i]._renderControls(t)
			},
			_renderObject: function(t, e) {
				if (t.visible) {
					var i = t.hasRotatingPoint;
					t.hasRotatingPoint = !1, t.render(e), t.hasRotatingPoint = i
				}
			},
			_restoreObjectsState: function() {
				return this._objects.forEach(this._restoreObjectState, this), this
			},
			realizeTransform: function(t) {
				return this._moveFlippedObject(t), this._setObjectPosition(t), t
			},
			_moveFlippedObject: function(t) {
				var e = t.get("originX"),
					i = t.get("originY"),
					n = t.getCenterPoint();
				t.set({
					originX: "center",
					originY: "center",
					left: n.x,
					top: n.y
				}), this._toggleFlipping(t);
				var r = t.getPointByOrigin(e, i);
				return t.set({
					originX: e,
					originY: i,
					left: r.x,
					top: r.y
				}), this
			},
			_toggleFlipping: function(t) {
				this.flipX && (t.toggle("flipX"), t.set("left", -t.get("left")), t.setAngle(-t.getAngle())), this.flipY && (t.toggle("flipY"), t.set("top", -t.get("top")), t.setAngle(-t.getAngle()))
			},
			_restoreObjectState: function(t) {
				return this._setObjectPosition(t), t.setCoords(), t.hasControls = t.__origHasControls, delete t.__origHasControls, t.set("active", !1), t.setCoords(), delete t.group, this
			},
			_setObjectPosition: function(t) {
				var e = this.getCenterPoint(),
					i = this._getRotatedLeftTop(t);
				t.set({
					angle: t.getAngle() + this.getAngle(),
					left: e.x + i.left,
					top: e.y + i.top,
					scaleX: t.get("scaleX") * this.get("scaleX"),
					scaleY: t.get("scaleY") * this.get("scaleY")
				})
			},
			_getRotatedLeftTop: function(t) {
				var e = this.getAngle() * (Math.PI / 180);
				return {
					left: -Math.sin(e) * t.getTop() * this.get("scaleY") + Math.cos(e) * t.getLeft() * this.get("scaleX"),
					top: Math.cos(e) * t.getTop() * this.get("scaleY") + Math.sin(e) * t.getLeft() * this.get("scaleX")
				}
			},
			destroy: function() {
				return this._objects.forEach(this._moveFlippedObject, this), this._restoreObjectsState()
			},
			saveCoords: function() {
				return this._originalLeft = this.get("left"), this._originalTop = this.get("top"), this
			},
			hasMoved: function() {
				return this._originalLeft !== this.get("left") || this._originalTop !== this.get("top")
			},
			setObjectsCoords: function() {
				return this.forEachObject(function(t) {
					t.setCoords()
				}), this
			},
			_calcBounds: function(t) {
				for (var e, i, n, r = [], o = [], s = ["tr", "br", "bl", "tl"], a = 0, c = this._objects.length, h = s.length; c > a; ++a) for (e = this._objects[a], e.setCoords(), n = 0; h > n; n++) i = s[n], r.push(e.oCoords[i].x), o.push(e.oCoords[i].y);
				this.set(this._getBounds(r, o, t))
			},
			_getBounds: function(t, i, o) {
				var s = e.util.invertTransform(this.getViewportTransform()),
					a = e.util.transformPoint(new e.Point(n(t), n(i)), s),
					c = e.util.transformPoint(new e.Point(r(t), r(i)), s),
					h = {
						width: c.x - a.x || 0,
						height: c.y - a.y || 0
					};
				return o || (h.left = a.x || 0, h.top = a.y || 0, "center" === this.originX && (h.left += h.width / 2), "right" === this.originX && (h.left += h.width), "center" === this.originY && (h.top += h.height / 2), "bottom" === this.originY && (h.top += h.height)), h
			},
			get: function(t) {
				if (t in s) {
					if (this[t]) return this[t];
					for (var e = 0, i = this._objects.length; i > e; e++) if (this._objects[e][t]) return !0;
					return !1
				}
				return t in this.delegatedProperties ? this._objects[0] && this._objects[0].get(t) : this[t]
			}
		}), e.Group.fromObject = function(t, i) {
			e.util.enlivenObjects(t.objects, function(n) {
				delete t.objects, i && i(new e.Group(n, t, !0))
			})
		}, e.Group.async = !0
	}
}("undefined" != typeof exports ? exports : this),
function(t) {
	"use strict";
	var e = fabric.util.object.extend;
	return t.fabric || (t.fabric = {}), t.fabric.Image ? void fabric.warn("fabric.Image is already defined.") : (fabric.Image = fabric.util.createClass(fabric.Object, {
		type: "image",
		crossOrigin: "",
		alignX: "none",
		alignY: "none",
		meetOrSlice: "meet",
		_lastScaleX: 1,
		_lastScaleY: 1,
		initialize: function(t, e) {
			e || (e = {}), this.filters = [], this.resizeFilters = [], this.callSuper("initialize", e), this._initElement(t, e)
		},
		getElement: function() {
			return this._element
		},
		setElement: function(t, e, i) {
			return this._element = t, this._originalElement = t, this._initConfig(i), 0 !== this.filters.length ? this.applyFilters(e) : e && e(), this
		},
		setCrossOrigin: function(t) {
			return this.crossOrigin = t, this._element.crossOrigin = t, this
		},
		getOriginalSize: function() {
			var t = this.getElement();
			return {
				width: t.width,
				height: t.height
			}
		},
		_stroke: function(t) {
			t.save(), this._setStrokeStyles(t), t.beginPath(), t.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height), t.closePath(), t.restore()
		},
		_renderDashedStroke: function(t) {
			var e = -this.width / 2,
				i = -this.height / 2,
				n = this.width,
				r = this.height;
			t.save(), this._setStrokeStyles(t), t.beginPath(), fabric.util.drawDashedLine(t, e, i, e + n, i, this.strokeDashArray), fabric.util.drawDashedLine(t, e + n, i, e + n, i + r, this.strokeDashArray), fabric.util.drawDashedLine(t, e + n, i + r, e, i + r, this.strokeDashArray), fabric.util.drawDashedLine(t, e, i + r, e, i, this.strokeDashArray), t.closePath(), t.restore()
		},
		toObject: function(t) {
			var i = [];
			this.filters.forEach(function(t) {
				t && i.push(t.toObject())
			});
			var n = e(this.callSuper("toObject", t), {
				src: this._originalElement.src || this._originalElement._src,
				filters: i,
				crossOrigin: this.crossOrigin,
				alignX: this.alignX,
				alignY: this.alignY,
				meetOrSlice: this.meetOrSlice
			});
			return this.resizeFilters.length > 0 && (n.resizeFilters = this.resizeFilters.map(function(t) {
				return t && t.toObject()
			})), this.includeDefaultValues || this._removeDefaultValues(n), n
		},
		getSrc: function() {
			return this.getElement() ? this.getElement().src || this.getElement()._src : void 0
		},
		setSrc: function(t, e, i) {
			fabric.util.loadImage(t, function(t) {
				return this.setElement(t, e, i)
			}, this, i && i.crossOrigin)
		},
		toString: function() {
			return '#<fabric.Image: { src: "' + this.getSrc() + '" }>'
		},
		clone: function(t, e) {
			this.constructor.fromObject(this.toObject(e), t)
		},
		applyFilters: function(t, e, i, n) {
			if (e = e || this.filters, i = i || this._originalElement) {
				var r = i,
					o = fabric.util.createCanvasElement(),
					s = fabric.util.createImage(),
					a = this;
				return o.width = r.width, o.height = r.height, o.getContext("2d").drawImage(r, 0, 0, r.width, r.height), 0 === e.length ? (this._element = i, t && t(), o) : (e.forEach(function(t) {
					t && t.applyTo(o, t.scaleX || a.scaleX, t.scaleY || a.scaleY), !n && t && "Resize" === t.type && (a.width *= t.scaleX, a.height *= t.scaleY)
				}), s.width = o.width, s.height = o.height, fabric.isLikelyNode ? (s.src = o.toBuffer(void 0, fabric.Image.pngCompression), a._element = s, !n && (a._filteredEl = s), t && t()) : (s.onload = function() {
					a._element = s, !n && (a._filteredEl = s), t && t(), s.onload = o = r = null
				}, s.src = o.toDataURL("image/png")), o)
			}
		},
		_render: function(t, e) {
			var i, n, r, o = this._findMargins();
			i = e ? this.left : -this.width / 2, n = e ? this.top : -this.height / 2, "slice" === this.meetOrSlice && (t.beginPath(), t.rect(i, n, this.width, this.height), t.clip()), this.isMoving === !1 && this.resizeFilters.length && this._needsResize() ? (this._lastScaleX = this.scaleX, this._lastScaleY = this.scaleY, r = this.applyFilters(null, this.resizeFilters, this._filteredEl || this._originalElement, !0)) : r = this._element, r && t.drawImage(r, i + o.marginX, n + o.marginY, o.width, o.height), this._renderStroke(t)
		},
		_needsResize: function() {
			return this.scaleX !== this._lastScaleX || this.scaleY !== this._lastScaleY
		},
		_findMargins: function() {
			var t, e, i = this.width,
				n = this.height,
				r = 0,
				o = 0;
			return ("none" !== this.alignX || "none" !== this.alignY) && (t = [this.width / this._element.width, this.height / this._element.height], e = "meet" === this.meetOrSlice ? Math.min.apply(null, t) : Math.max.apply(null, t), i = this._element.width * e, n = this._element.height * e, "Mid" === this.alignX && (r = (this.width - i) / 2), "Max" === this.alignX && (r = this.width - i), "Mid" === this.alignY && (o = (this.height - n) / 2), "Max" === this.alignY && (o = this.height - n)), {
				width: i,
				height: n,
				marginX: r,
				marginY: o
			}
		},
		_resetWidthHeight: function() {
			var t = this.getElement();
			this.set("width", t.width), this.set("height", t.height)
		},
		_initElement: function(t, e) {
			this.setElement(fabric.util.getById(t), null, e), fabric.util.addClass(this.getElement(), fabric.Image.CSS_CANVAS)
		},
		_initConfig: function(t) {
			t || (t = {}),
			this.setOptions(t), this._setWidthHeight(t), this._element && this.crossOrigin && (this._element.crossOrigin = this.crossOrigin)
		},
		_initFilters: function(t, e) {
			t && t.length ? fabric.util.enlivenObjects(t, function(t) {
				e && e(t)
			}, "fabric.Image.filters") : e && e()
		},
		_setWidthHeight: function(t) {
			this.width = "width" in t ? t.width : this.getElement() ? this.getElement().width || 0 : 0, this.height = "height" in t ? t.height : this.getElement() ? this.getElement().height || 0 : 0
		},
		complexity: function() {
			return 1
		}
	}), fabric.Image.CSS_CANVAS = "canvas-img", fabric.Image.prototype.getSvgSrc = fabric.Image.prototype.getSrc, fabric.Image.fromObject = function(t, e) {
		fabric.util.loadImage(t.src, function(i) {
			fabric.Image.prototype._initFilters.call(t, t.filters, function(n) {
				t.filters = n || [], fabric.Image.prototype._initFilters.call(t, t.resizeFilters, function(n) {
					t.resizeFilters = n || [];
					var r = new fabric.Image(i, t);
					e && e(r)
				})
			})
		}, null, t.crossOrigin)
	}, fabric.Image.fromURL = function(t, e, i) {
		fabric.util.loadImage(t, function(t) {
			e && e(new fabric.Image(t, i))
		}, null, i && i.crossOrigin)
	}, fabric.Image.async = !0, void(fabric.Image.pngCompression = 1))
}("undefined" != typeof exports ? exports : this), fabric.Image.filters = fabric.Image.filters || {}, fabric.Image.filters.BaseFilter = fabric.util.createClass({
	type: "BaseFilter",
	initialize: function(t) {
		t && this.setOptions(t)
	},
	setOptions: function(t) {
		for (var e in t) this[e] = t[e]
	},
	toObject: function() {
		return {
			type: this.type
		}
	},
	toJSON: function() {
		return this.toObject()
	}
}),
function(t) {
	"use strict";
	var e = t.fabric || (t.fabric = {}),
		i = e.util.object.extend;
	e.Image.filters.Brightness = e.util.createClass(e.Image.filters.BaseFilter, {
		type: "Brightness",
		initialize: function(t) {
			t = t || {}, this.brightness = t.brightness || 0
		},
		applyTo: function(t) {
			for (var e = t.getContext("2d"), i = e.getImageData(0, 0, t.width, t.height), n = i.data, r = this.brightness, o = 0, s = n.length; s > o; o += 4) n[o] += r, n[o + 1] += r, n[o + 2] += r;
			e.putImageData(i, 0, 0)
		},
		toObject: function() {
			return i(this.callSuper("toObject"), {
				brightness: this.brightness
			})
		}
	}), e.Image.filters.Brightness.fromObject = function(t) {
		return new e.Image.filters.Brightness(t)
	}
}("undefined" != typeof exports ? exports : this),
function(t) {
	"use strict";
	var e = t.fabric || (t.fabric = {}),
		i = e.util.object.extend;
	e.Image.filters.Convolute = e.util.createClass(e.Image.filters.BaseFilter, {
		type: "Convolute",
		initialize: function(t) {
			t = t || {}, this.opaque = t.opaque, this.matrix = t.matrix || [0, 0, 0, 0, 1, 0, 0, 0, 0];
			var i = e.util.createCanvasElement();
			this.tmpCtx = i.getContext("2d")
		},
		_createImageData: function(t, e) {
			return this.tmpCtx.createImageData(t, e)
		},
		applyTo: function(t) {
			for (var e = this.matrix, i = t.getContext("2d"), n = i.getImageData(0, 0, t.width, t.height), r = Math.round(Math.sqrt(e.length)), o = Math.floor(r / 2), s = n.data, a = n.width, c = n.height, h = a, l = c, u = this._createImageData(h, l), f = u.data, d = this.opaque ? 1 : 0, p = 0; l > p; p++) for (var g = 0; h > g; g++) {
				for (var v = p, m = g, b = 4 * (p * h + g), y = 0, _ = 0, w = 0, x = 0, S = 0; r > S; S++) for (var C = 0; r > C; C++) {
					var k = v + S - o,
						T = m + C - o;
					if (!(0 > k || k > c || 0 > T || T > a)) {
						var E = 4 * (k * a + T),
							O = e[S * r + C];
						y += s[E] * O, _ += s[E + 1] * O, w += s[E + 2] * O, x += s[E + 3] * O
					}
				}
				f[b] = y, f[b + 1] = _, f[b + 2] = w, f[b + 3] = x + d * (255 - x)
			}
			i.putImageData(u, 0, 0)
		},
		toObject: function() {
			return i(this.callSuper("toObject"), {
				opaque: this.opaque,
				matrix: this.matrix
			})
		}
	}), e.Image.filters.Convolute.fromObject = function(t) {
		return new e.Image.filters.Convolute(t)
	}
}("undefined" != typeof exports ? exports : this),
function(t) {
	"use strict";
	var e = t.fabric || (t.fabric = {}),
		i = e.util.object.extend;
	e.Image.filters.GradientTransparency = e.util.createClass(e.Image.filters.BaseFilter, {
		type: "GradientTransparency",
		initialize: function(t) {
			t = t || {}, this.threshold = t.threshold || 100
		},
		applyTo: function(t) {
			for (var e = t.getContext("2d"), i = e.getImageData(0, 0, t.width, t.height), n = i.data, r = this.threshold, o = n.length, s = 0, a = n.length; a > s; s += 4) n[s + 3] = r + 255 * (o - s) / o;
			e.putImageData(i, 0, 0)
		},
		toObject: function() {
			return i(this.callSuper("toObject"), {
				threshold: this.threshold
			})
		}
	}), e.Image.filters.GradientTransparency.fromObject = function(t) {
		return new e.Image.filters.GradientTransparency(t)
	}
}("undefined" != typeof exports ? exports : this),
function(t) {
	"use strict";
	var e = t.fabric || (t.fabric = {});
	e.Image.filters.Grayscale = e.util.createClass(e.Image.filters.BaseFilter, {
		type: "Grayscale",
		applyTo: function(t) {
			for (var e, i = t.getContext("2d"), n = i.getImageData(0, 0, t.width, t.height), r = n.data, o = n.width * n.height * 4, s = 0; o > s;) e = (r[s] + r[s + 1] + r[s + 2]) / 3, r[s] = e, r[s + 1] = e, r[s + 2] = e, s += 4;
			i.putImageData(n, 0, 0)
		}
	}), e.Image.filters.Grayscale.fromObject = function() {
		return new e.Image.filters.Grayscale
	}
}("undefined" != typeof exports ? exports : this),
function(t) {
	"use strict";
	var e = t.fabric || (t.fabric = {});
	e.Image.filters.Invert = e.util.createClass(e.Image.filters.BaseFilter, {
		type: "Invert",
		applyTo: function(t) {
			var e, i = t.getContext("2d"),
				n = i.getImageData(0, 0, t.width, t.height),
				r = n.data,
				o = r.length;
			for (e = 0; o > e; e += 4) r[e] = 255 - r[e], r[e + 1] = 255 - r[e + 1], r[e + 2] = 255 - r[e + 2];
			i.putImageData(n, 0, 0)
		}
	}), e.Image.filters.Invert.fromObject = function() {
		return new e.Image.filters.Invert
	}
}("undefined" != typeof exports ? exports : this),
function(t) {
	"use strict";
	var e = t.fabric || (t.fabric = {}),
		i = e.util.object.extend;
	e.Image.filters.Mask = e.util.createClass(e.Image.filters.BaseFilter, {
		type: "Mask",
		initialize: function(t) {
			t = t || {}, this.mask = t.mask, this.channel = [0, 1, 2, 3].indexOf(t.channel) > -1 ? t.channel : 0
		},
		applyTo: function(t) {
			if (this.mask) {
				var i, n = t.getContext("2d"),
					r = n.getImageData(0, 0, t.width, t.height),
					o = r.data,
					s = this.mask.getElement(),
					a = e.util.createCanvasElement(),
					c = this.channel,
					h = r.width * r.height * 4;
				a.width = s.width, a.height = s.height, a.getContext("2d").drawImage(s, 0, 0, s.width, s.height);
				var l = a.getContext("2d").getImageData(0, 0, s.width, s.height),
					u = l.data;
				for (i = 0; h > i; i += 4) o[i + 3] = u[i + c];
				n.putImageData(r, 0, 0)
			}
		},
		toObject: function() {
			return i(this.callSuper("toObject"), {
				mask: this.mask.toObject(),
				channel: this.channel
			})
		}
	}), e.Image.filters.Mask.fromObject = function(t, i) {
		e.util.loadImage(t.mask.src, function(n) {
			t.mask = new e.Image(n, t.mask), i && i(new e.Image.filters.Mask(t))
		})
	}, e.Image.filters.Mask.async = !0
}("undefined" != typeof exports ? exports : this),
function(t) {
	"use strict";
	var e = t.fabric || (t.fabric = {}),
		i = e.util.object.extend;
	e.Image.filters.Noise = e.util.createClass(e.Image.filters.BaseFilter, {
		type: "Noise",
		initialize: function(t) {
			t = t || {}, this.noise = t.noise || 0
		},
		applyTo: function(t) {
			for (var e, i = t.getContext("2d"), n = i.getImageData(0, 0, t.width, t.height), r = n.data, o = this.noise, s = 0, a = r.length; a > s; s += 4) e = (.5 - Math.random()) * o, r[s] += e, r[s + 1] += e, r[s + 2] += e;
			i.putImageData(n, 0, 0)
		},
		toObject: function() {
			return i(this.callSuper("toObject"), {
				noise: this.noise
			})
		}
	}), e.Image.filters.Noise.fromObject = function(t) {
		return new e.Image.filters.Noise(t)
	}
}("undefined" != typeof exports ? exports : this),
function(t) {
	"use strict";
	var e = t.fabric || (t.fabric = {}),
		i = e.util.object.extend;
	e.Image.filters.Pixelate = e.util.createClass(e.Image.filters.BaseFilter, {
		type: "Pixelate",
		initialize: function(t) {
			t = t || {}, this.blocksize = t.blocksize || 4
		},
		applyTo: function(t) {
			var e, i, n, r, o, s, a, c = t.getContext("2d"),
				h = c.getImageData(0, 0, t.width, t.height),
				l = h.data,
				u = h.height,
				f = h.width;
			for (i = 0; u > i; i += this.blocksize) for (n = 0; f > n; n += this.blocksize) {
				e = 4 * i * f + 4 * n, r = l[e], o = l[e + 1], s = l[e + 2], a = l[e + 3];
				for (var d = i, p = i + this.blocksize; p > d; d++) for (var g = n, v = n + this.blocksize; v > g; g++) e = 4 * d * f + 4 * g, l[e] = r, l[e + 1] = o, l[e + 2] = s, l[e + 3] = a
			}
			c.putImageData(h, 0, 0)
		},
		toObject: function() {
			return i(this.callSuper("toObject"), {
				blocksize: this.blocksize
			})
		}
	}), e.Image.filters.Pixelate.fromObject = function(t) {
		return new e.Image.filters.Pixelate(t)
	}
}("undefined" != typeof exports ? exports : this),
function(t) {
	"use strict";
	var e = t.fabric || (t.fabric = {}),
		i = e.util.object.extend;
	e.Image.filters.RemoveWhite = e.util.createClass(e.Image.filters.BaseFilter, {
		type: "RemoveWhite",
		initialize: function(t) {
			t = t || {}, this.threshold = t.threshold || 30, this.distance = t.distance || 20
		},
		applyTo: function(t) {
			for (var e, i, n, r = t.getContext("2d"), o = r.getImageData(0, 0, t.width, t.height), s = o.data, a = this.threshold, c = this.distance, h = 255 - a, l = Math.abs, u = 0, f = s.length; f > u; u += 4) e = s[u], i = s[u + 1], n = s[u + 2], e > h && i > h && n > h && l(e - i) < c && l(e - n) < c && l(i - n) < c && (s[u + 3] = 1);
			r.putImageData(o, 0, 0)
		},
		toObject: function() {
			return i(this.callSuper("toObject"), {
				threshold: this.threshold,
				distance: this.distance
			})
		}
	}), e.Image.filters.RemoveWhite.fromObject = function(t) {
		return new e.Image.filters.RemoveWhite(t)
	}
}("undefined" != typeof exports ? exports : this),
function(t) {
	"use strict";
	var e = t.fabric || (t.fabric = {});
	e.Image.filters.Sepia = e.util.createClass(e.Image.filters.BaseFilter, {
		type: "Sepia",
		applyTo: function(t) {
			var e, i, n = t.getContext("2d"),
				r = n.getImageData(0, 0, t.width, t.height),
				o = r.data,
				s = o.length;
			for (e = 0; s > e; e += 4) i = .3 * o[e] + .59 * o[e + 1] + .11 * o[e + 2], o[e] = i + 100, o[e + 1] = i + 50, o[e + 2] = i + 255;
			n.putImageData(r, 0, 0)
		}
	}), e.Image.filters.Sepia.fromObject = function() {
		return new e.Image.filters.Sepia
	}
}("undefined" != typeof exports ? exports : this),
function(t) {
	"use strict";
	var e = t.fabric || (t.fabric = {});
	e.Image.filters.Sepia2 = e.util.createClass(e.Image.filters.BaseFilter, {
		type: "Sepia2",
		applyTo: function(t) {
			var e, i, n, r, o = t.getContext("2d"),
				s = o.getImageData(0, 0, t.width, t.height),
				a = s.data,
				c = a.length;
			for (e = 0; c > e; e += 4) i = a[e], n = a[e + 1], r = a[e + 2], a[e] = (.393 * i + .769 * n + .189 * r) / 1.351, a[e + 1] = (.349 * i + .686 * n + .168 * r) / 1.203, a[e + 2] = (.272 * i + .534 * n + .131 * r) / 2.14;
			o.putImageData(s, 0, 0)
		}
	}), e.Image.filters.Sepia2.fromObject = function() {
		return new e.Image.filters.Sepia2
	}
}("undefined" != typeof exports ? exports : this),
function(t) {
	"use strict";
	var e = t.fabric || (t.fabric = {}),
		i = e.util.object.extend;
	e.Image.filters.Tint = e.util.createClass(e.Image.filters.BaseFilter, {
		type: "Tint",
		initialize: function(t) {
			t = t || {}, this.color = t.color || "#000000", this.opacity = "undefined" != typeof t.opacity ? t.opacity : new e.Color(this.color).getAlpha()
		},
		applyTo: function(t) {
			var i, n, r, o, s, a, c, h, l, u = t.getContext("2d"),
				f = u.getImageData(0, 0, t.width, t.height),
				d = f.data,
				p = d.length;
			for (l = new e.Color(this.color).getSource(), n = l[0] * this.opacity, r = l[1] * this.opacity, o = l[2] * this.opacity, h = 1 - this.opacity, i = 0; p > i; i += 4) s = d[i], a = d[i + 1], c = d[i + 2], d[i] = n + s * h, d[i + 1] = r + a * h, d[i + 2] = o + c * h;
			u.putImageData(f, 0, 0)
		},
		toObject: function() {
			return i(this.callSuper("toObject"), {
				color: this.color,
				opacity: this.opacity
			})
		}
	}), e.Image.filters.Tint.fromObject = function(t) {
		return new e.Image.filters.Tint(t)
	}
}("undefined" != typeof exports ? exports : this),
function(t) {
	"use strict";
	var e = t.fabric || (t.fabric = {}),
		i = e.util.object.extend;
	e.Image.filters.Multiply = e.util.createClass(e.Image.filters.BaseFilter, {
		type: "Multiply",
		initialize: function(t) {
			t = t || {}, this.color = t.color || "#000000"
		},
		applyTo: function(t) {
			var i, n, r = t.getContext("2d"),
				o = r.getImageData(0, 0, t.width, t.height),
				s = o.data,
				a = s.length;
			for (n = new e.Color(this.color).getSource(), i = 0; a > i; i += 4) s[i] *= n[0] / 255, s[i + 1] *= n[1] / 255, s[i + 2] *= n[2] / 255;
			r.putImageData(o, 0, 0)
		},
		toObject: function() {
			return i(this.callSuper("toObject"), {
				color: this.color
			})
		}
	}), e.Image.filters.Multiply.fromObject = function(t) {
		return new e.Image.filters.Multiply(t)
	}
}("undefined" != typeof exports ? exports : this),
function(t) {
	"use strict";
	var e = t.fabric;
	e.Image.filters.Blend = e.util.createClass({
		type: "Blend",
		initialize: function(t) {
			t = t || {}, this.color = t.color || "#000", this.image = t.image || !1, this.mode = t.mode || "multiply", this.alpha = t.alpha || 1
		},
		applyTo: function(t) {
			var i, n, r, o, s, a, c, h, l, u, f = t.getContext("2d"),
				d = f.getImageData(0, 0, t.width, t.height),
				p = d.data,
				g = !1;
			if (this.image) {
				g = !0;
				var v = e.util.createCanvasElement();
				v.width = this.image.width, v.height = this.image.height;
				var m = new e.StaticCanvas(v);
				m.add(this.image);
				var b = m.getContext("2d");
				u = b.getImageData(0, 0, m.width, m.height).data
			} else u = new e.Color(this.color).getSource(), i = u[0] * this.alpha, n = u[1] * this.alpha, r = u[2] * this.alpha;
			for (var y = 0, _ = p.length; _ > y; y += 4) switch (o = p[y], s = p[y + 1], a = p[y + 2], g && (i = u[y] * this.alpha, n = u[y + 1] * this.alpha, r = u[y + 2] * this.alpha), this.mode) {
				case "multiply":
					p[y] = o * i / 255, p[y + 1] = s * n / 255, p[y + 2] = a * r / 255;
					break;
				case "screen":
					p[y] = 1 - (1 - o) * (1 - i), p[y + 1] = 1 - (1 - s) * (1 - n), p[y + 2] = 1 - (1 - a) * (1 - r);
					break;
				case "add":
					p[y] = Math.min(255, o + i), p[y + 1] = Math.min(255, s + n), p[y + 2] = Math.min(255, a + r);
					break;
				case "diff":
				case "difference":
					p[y] = Math.abs(o - i), p[y + 1] = Math.abs(s - n), p[y + 2] = Math.abs(a - r);
					break;
				case "subtract":
					c = o - i, h = s - n, l = a - r, p[y] = 0 > c ? 0 : c, p[y + 1] = 0 > h ? 0 : h, p[y + 2] = 0 > l ? 0 : l;
					break;
				case "darken":
					p[y] = Math.min(o, i), p[y + 1] = Math.min(s, n), p[y + 2] = Math.min(a, r);
					break;
				case "lighten":
					p[y] = Math.max(o, i), p[y + 1] = Math.max(s, n), p[y + 2] = Math.max(a, r)
			}
			f.putImageData(d, 0, 0)
		},
		toObject: function() {
			return {
				color: this.color,
				image: this.image,
				mode: this.mode,
				alpha: this.alpha
			}
		}
	}), e.Image.filters.Blend.fromObject = function(t) {
		return new e.Image.filters.Blend(t)
	}
}("undefined" != typeof exports ? exports : this),
function(t) {
	"use strict";
	var e = t.fabric || (t.fabric = {}),
		i = Math.pow,
		n = Math.floor,
		r = Math.sqrt,
		o = Math.abs,
		s = Math.max,
		a = Math.round,
		c = Math.sin,
		h = Math.ceil;
	e.Image.filters.Resize = e.util.createClass(e.Image.filters.BaseFilter, {
		type: "Resize",
		resizeType: "hermite",
		scaleX: 0,
		scaleY: 0,
		lanczosLobes: 3,
		applyTo: function(t, e, i) {
			this.rcpScaleX = 1 / e, this.rcpScaleY = 1 / i;
			var n, r = t.width,
				o = t.height,
				s = a(r * e),
				c = a(o * i);
			"sliceHack" === this.resizeType && (n = this.sliceByTwo(t, r, o, s, c)), "hermite" === this.resizeType && (n = this.hermiteFastResize(t, r, o, s, c)), "bilinear" === this.resizeType && (n = this.bilinearFiltering(t, r, o, s, c)), "lanczos" === this.resizeType && (n = this.lanczosResize(t, r, o, s, c)), t.width = s, t.height = c, t.getContext("2d").putImageData(n, 0, 0)
		},
		sliceByTwo: function(t, i, r, o, a) {
			var c, h = t.getContext("2d"),
				l = .5,
				u = .5,
				f = 1,
				d = 1,
				p = !1,
				g = !1,
				v = i,
				m = r,
				b = e.util.createCanvasElement(),
				y = b.getContext("2d");
			for (o = n(o), a = n(a), b.width = s(o, i), b.height = s(a, r), o > i && (l = 2, f = -1), a > r && (u = 2, d = -1), c = h.getImageData(0, 0, i, r), t.width = s(o, i), t.height = s(a, r), h.putImageData(c, 0, 0); !p || !g;) i = v, r = m, o * f < n(v * l * f) ? v = n(v * l) : (v = o, p = !0), a * d < n(m * u * d) ? m = n(m * u) : (m = a, g = !0), c = h.getImageData(0, 0, i, r), y.putImageData(c, 0, 0), h.clearRect(0, 0, v, m), h.drawImage(b, 0, 0, i, r, 0, 0, v, m);
			return h.getImageData(0, 0, o, a)
		},
		lanczosResize: function(t, e, s, a, l) {
			function u(t) {
				return function(e) {
					if (e > t) return 0;
					if (e *= Math.PI, o(e) < 1e-16) return 1;
					var i = e / t;
					return c(e) * c(i) / e / i
				}
			}
			function f(t) {
				var c, h, u, d, p, O, j, A, I, P, L;
				for (T.x = (t + .5) * y, E.x = n(T.x), c = 0; l > c; c++) {
					for (T.y = (c + .5) * _, E.y = n(T.y), p = 0, O = 0, j = 0, A = 0, I = 0, h = E.x - S; h <= E.x + S; h++) if (!(0 > h || h >= e)) {
						P = n(1e3 * o(h - T.x)), k[P] || (k[P] = {});
						for (var M = E.y - C; M <= E.y + C; M++) 0 > M || M >= s || (L = n(1e3 * o(M - T.y)), k[P][L] || (k[P][L] = b(r(i(P * w, 2) + i(L * x, 2)) / 1e3)), u = k[P][L], u > 0 && (d = 4 * (M * e + h), p += u, O += u * v[d], j += u * v[d + 1], A += u * v[d + 2], I += u * v[d + 3]))
					}
					d = 4 * (c * a + t), m[d] = O / p, m[d + 1] = j / p, m[d + 2] = A / p, m[d + 3] = I / p
				}
				return ++t < a ? f(t) : g
			}
			var d = t.getContext("2d"),
				p = d.getImageData(0, 0, e, s),
				g = d.getImageData(0, 0, a, l),
				v = p.data,
				m = g.data,
				b = u(this.lanczosLobes),
				y = this.rcpScaleX,
				_ = this.rcpScaleY,
				w = 2 / this.rcpScaleX,
				x = 2 / this.rcpScaleY,
				S = h(y * this.lanczosLobes / 2),
				C = h(_ * this.lanczosLobes / 2),
				k = {}, T = {}, E = {};
			return f(0)
		},
		bilinearFiltering: function(t, e, i, r, o) {
			var s, a, c, h, l, u, f, d, p, g, v, m, b, y = 0,
				_ = this.rcpScaleX,
				w = this.rcpScaleY,
				x = t.getContext("2d"),
				S = 4 * (e - 1),
				C = x.getImageData(0, 0, e, i),
				k = C.data,
				T = x.getImageData(0, 0, r, o),
				E = T.data;
			for (f = 0; o > f; f++) for (d = 0; r > d; d++) for (l = n(_ * d), u = n(w * f), p = _ * d - l, g = w * f - u, b = 4 * (u * e + l), v = 0; 4 > v; v++) s = k[b + v], a = k[b + 4 + v], c = k[b + S + v], h = k[b + S + 4 + v], m = s * (1 - p) * (1 - g) + a * p * (1 - g) + c * g * (1 - p) + h * p * g, E[y++] = m;
			return T
		},
		hermiteFastResize: function(t, e, i, s, a) {
			for (var c = this.rcpScaleX, l = this.rcpScaleY, u = h(c / 2), f = h(l / 2), d = t.getContext("2d"), p = d.getImageData(0, 0, e, i), g = p.data, v = d.getImageData(0, 0, s, a), m = v.data, b = 0; a > b; b++) for (var y = 0; s > y; y++) {
				for (var _ = 4 * (y + b * s), w = 0, x = 0, S = 0, C = 0, k = 0, T = 0, E = 0, O = (b + .5) * l, j = n(b * l);
				(b + 1) * l > j; j++) for (var A = o(O - (j + .5)) / f, I = (y + .5) * c, P = A * A, L = n(y * c);
				(y + 1) * c > L; L++) {
					var M = o(I - (L + .5)) / u,
						D = r(P + M * M);
					D > 1 && -1 > D || (w = 2 * D * D * D - 3 * D * D + 1, w > 0 && (M = 4 * (L + j * e), E += w * g[M + 3], S += w, g[M + 3] < 255 && (w = w * g[M + 3] / 250), C += w * g[M], k += w * g[M + 1], T += w * g[M + 2], x += w))
				}
				m[_] = C / x, m[_ + 1] = k / x, m[_ + 2] = T / x, m[_ + 3] = E / S
			}
			return v
		},
		toObject: function() {
			return {
				type: this.type,
				scaleX: this.scaleX,
				scaleY: this.scaleY,
				resizeType: this.resizeType,
				lanczosLobes: this.lanczosLobes
			}
		}
	}), e.Image.filters.Resize.fromObject = function(t) {
		return new e.Image.filters.Resize(t)
	}
}("undefined" != typeof exports ? exports : this),
function(t) {
	"use strict";
	var e = t.fabric || (t.fabric = {}),
		i = e.util.object.extend,
		n = e.util.object.clone,
		r = (e.util.toFixed, e.StaticCanvas.supports("setLineDash"));
	e.Object.NUM_FRACTION_DIGITS;
	if (e.Text) return void e.warn("fabric.Text is already defined");
	var o = e.Object.prototype.stateProperties.concat();
	o.push("fontFamily", "fontWeight", "fontSize", "text", "textDecoration", "textAlign", "fontStyle", "lineHeight", "textBackgroundColor"), e.Text = e.util.createClass(e.Object, {
		_dimensionAffectingProps: {
			fontSize: !0,
			fontWeight: !0,
			fontFamily: !0,
			fontStyle: !0,
			lineHeight: !0,
			stroke: !0,
			strokeWidth: !0,
			text: !0,
			textAlign: !0
		},
		_reNewline: /\r?\n/,
		_reSpacesAndTabs: /[ \t\r]+/g,
		type: "text",
		fontSize: 40,
		fontWeight: "normal",
		fontFamily: "Times New Roman",
		textDecoration: "",
		textAlign: "left",
		fontStyle: "",
		lineHeight: 1.16,
		textBackgroundColor: "",
		stateProperties: o,
		stroke: null,
		shadow: null,
		_fontSizeFraction: .25,
		_fontSizeMult: 1.13,
		initialize: function(t, e) {
			e = e || {}, this.text = t, this.__skipDimension = !0, this.setOptions(e), this.__skipDimension = !1, this._initDimensions()
		},
		_initDimensions: function(t) {
			if (!this.__skipDimension) {
				t || (t = e.util.createCanvasElement().getContext("2d"), this._setTextStyles(t)), this._textLines = this._splitTextIntoLines(), this._clearCache();
				var i = this.textAlign;
				this.textAlign = "left", this.width = this._getTextWidth(t), this.textAlign = i, this.height = this._getTextHeight(t)
			}
		},
		toString: function() {
			return "#<fabric.Text (" + this.complexity() + '): { "text": "' + this.text + '", "fontFamily": "' + this.fontFamily + '" }>'
		},
		_render: function(t) {
			this.clipTo && e.util.clipContext(this, t), t.save(), this._setOpacity(t), this._setShadow(t), this._setupCompositeOperation(t), this._renderTextBackground(t), this._renderText(t), this._renderTextDecoration(t), t.restore(), this.clipTo && t.restore()
		},
		_renderText: function(t) {
			this._translateForTextAlign(t), this._renderTextFill(t), this._renderTextStroke(t)
		},
		_translateForTextAlign: function(t) {
			"left" !== this.textAlign && "justify" !== this.textAlign && t.translate("center" === this.textAlign || "stretch" === this.textAlign ? this.width / 2 : this.width, 0)
		},
		_setTextStyles: function(t) {
			t.textBaseline = "alphabetic", this.skipTextAlign || (t.textAlign = this.textAlign), t.font = this._getFontDeclaration()
		},
		_getTextHeight: function() {
			return this._textLines.length * this._getHeightOfLine()
		},
		_getTextWidth: function(t) {
			for (var e = this._getLineWidth(t, 0), i = 1, n = this._textLines.length; n > i; i++) {
				var r = this._getLineWidth(t, i);
				r > e && (e = r)
			}
			return e
		},
		_renderChars: function(t, e, i, n, r, o) {
			var s = t.slice(0, -4);
			if (this[s].toLive) {
				var a = -this.width / 2 + this[s].offsetX || 0,
					c = -this.height / 2 + this[s].offsetY || 0;
				e.save(), e.translate(a, c), n -= a, r -= c
			}
			o > 0 ? e[t](i, n, r, o) : e[t](i, n, r), this[s].toLive && e.restore()
		},
		_getWidthOfWords: function(t, e) {
			return t.measureText(e.replace(/\s+/g, "")).width
		},
		_getLeftOffset: function() {
			return -this.width / 2
		},
		_getTopOffset: function() {
			return -this.height / 2
		},
		_renderTextFill: function(t) {
			if (this.fill || this._skipFillStrokeCheck) for (var e = 0, i = 0, n = this._textLines.length; n > i; i++) {
				var r = this._getHeightOfLine(t, i),
					o = r / this.lineHeight;
				this._renderTextLine("fillText", t, this._textLines[i], this._getLeftOffset(), this._getTopOffset() + e + o, i), e += r
			}
		},
		_renderTextLine: function(t, e, i, n, r, o) {
			if (r -= this.fontSize * this._fontSizeFraction, "justify" == this.textAlign) {
				var s = this._getLineWidth(e, o),
					a = this.width;
				if (a >= s) for (var c = i.split(/\s+/), h = this._getWidthOfWords(e, i, o), l = a - h, u = c.length - 1, f = l / u, d = 0, p = 0, g = c.length; g > p; p++) this._renderChars(t, e, c[p], n + d, r, o), d += e.measureText(c[p]).width + f;
				else this._renderChars(t, e, i, n, r, o)
			} else if ("stretch" == this.textAlign && this.fixedLineWidth > 0) {
				var v = i.split(""),
					h = e.measureText(i).width,
					l = this.fixedLineWidth - h,
					u = v.length - 1,
					f = l / u,
					d = -this.fixedLineWidth / 2;
				if (f > 0) for (var p = 0, g = v.length; g > p; p++) this._renderChars(t, e, v[p], n + d, r, o), d += e.measureText(v[p]).width + f;
				else this._renderChars(t, e, i, n + d, r, o, this.fixedLineWidth)
			} else this._renderChars(t, e, i, n, r, o, this.fixedLineWidth)
		},
		_renderTextStroke: function(t) {
			if (this.stroke && 0 !== this.strokeWidth || this._skipFillStrokeCheck) {
				var e = 0;
				this.shadow && !this.shadow.affectStroke && this._removeShadow(t), t.save(), this.strokeDashArray && (1 & this.strokeDashArray.length && this.strokeDashArray.push.apply(this.strokeDashArray, this.strokeDashArray), r && t.setLineDash(this.strokeDashArray)), t.beginPath();
				for (var i = 0, n = this._textLines.length; n > i; i++) {
					var o = this._getHeightOfLine(t, i),
						s = o / this.lineHeight;
					this._renderTextLine("strokeText", t, this._textLines[i], this._getLeftOffset(), this._getTopOffset() + e + s, i), e += o
				}
				t.closePath(), t.restore()
			}
		},
		_getHeightOfLine: function() {
			return this.fontSize * this._fontSizeMult * this.lineHeight
		},
		_renderTextBackground: function(t) {
			this._renderTextBoxBackground(t), this._renderTextLinesBackground(t)
		},
		_renderTextBoxBackground: function(t) {
			this.backgroundColor && (t.save(), t.fillStyle = this.backgroundColor, t.fillRect(this._getLeftOffset(), this._getTopOffset(), this.width, this.height), t.restore())
		},
		_renderTextLinesBackground: function(t) {
			var e = 0,
				i = this._getHeightOfLine();
			if (this.textBackgroundColor) {
				t.save(), t.fillStyle = this.textBackgroundColor;
				for (var n = 0, r = this._textLines.length; r > n; n++) {
					if ("" !== this._textLines[n]) {
						var o = this._getLineWidth(t, n),
							s = this._getLineLeftOffset(o);
						t.fillRect(this._getLeftOffset() + s, this._getTopOffset() + e, o, this.fontSize * this._fontSizeMult)
					}
					e += i
				}
				t.restore()
			}
		},
		_getLineLeftOffset: function(t) {
			return "stretch" === this.textAlign ? (this.fixedLineWidth - t) / 2 : "center" === this.textAlign ? (this.width - t) / 2 : "right" === this.textAlign ? this.width - t : 0
		},
		_clearCache: function() {
			this.__lineWidths = [], this.__lineHeights = [], this.__lineOffsets = []
		},
		_shouldClearCache: function() {
			var t = !1;
			if (this._forceClearCache) return this._forceClearCache = !1, !0;
			for (var e in this._dimensionAffectingProps) this["__" + e] !== this[e] && (this["__" + e] = this[e], t = !0);
			return t
		},
		_getLineWidth: function(t, e) {
			return this.__lineWidths[e] ? this.__lineWidths[e] : (this.__lineWidths[e] = this.fixedLineWidth > 0 ? this.fixedLineWidth : t.measureText(this._textLines[e]).width, this.__lineWidths[e])
		},
		_renderTextDecoration: function(t) {
			function e(e) {
				var r, o, s, a, c = 0;
				for (r = 0, o = n._textLines.length; o > r; r++) {
					var h = n._getLineWidth(t, r),
						l = n._getLineLeftOffset(h),
						u = n._getHeightOfLine(t, r);
					for (s = 0, a = e.length; a > s; s++) t.fillRect(n._getLeftOffset() + l, c + (n._fontSizeMult - 1 + e[s]) * n.fontSize - i, h, n.fontSize / 15);
					c += u
				}
			}
			if (this.textDecoration) {
				var i = this.height / 2,
					n = this,
					r = [];
				this.textDecoration.indexOf("underline") > -1 && r.push(.85), this.textDecoration.indexOf("line-through") > -1 && r.push(.43), this.textDecoration.indexOf("overline") > -1 && r.push(-.12), r.length > 0 && e(r)
			}
		},
		_getFontDeclaration: function() {
			return [e.isLikelyNode ? this.fontWeight : this.fontStyle, e.isLikelyNode ? this.fontStyle : this.fontWeight, this.fontSize + "px", e.isLikelyNode ? '"' + this.fontFamily + '"' : this.fontFamily].join(" ")
		},
		render: function(t, e) {
			this.visible && (t.save(), this._setTextStyles(t), this._shouldClearCache() && this._initDimensions(t), e || this.transform(t), this._setStrokeStyles(t), this._setFillStyles(t), this.transformMatrix && t.transform.apply(t, this.transformMatrix), this.group && "path-group" === this.group.type && t.translate(this.left, this.top), this._render(t), t.restore())
		},
		_splitTextIntoLines: function() {
			return this.text.split(this._reNewline)
		},
		toObject: function(t) {
			var e = i(this.callSuper("toObject", t), {
				text: this.text,
				fontSize: this.fontSize,
				fontWeight: this.fontWeight,
				fontFamily: this.fontFamily,
				fontStyle: this.fontStyle,
				lineHeight: this.lineHeight,
				textDecoration: this.textDecoration,
				textAlign: this.textAlign,
				textBackgroundColor: this.textBackgroundColor
			});
			return this.includeDefaultValues || this._removeDefaultValues(e), e
		},
		_set: function(t, e) {
			this.callSuper("_set", t, e), t in this._dimensionAffectingProps && (this._initDimensions(), this.setCoords())
		},
		complexity: function() {
			return 1
		}
	}), e.Text.fromObject = function(t) {
		return new e.Text(t.text, n(t))
	}, e.util.createAccessors(e.Text)
}("undefined" != typeof exports ? exports : this),
function() {
	var t = fabric.util.object.clone;
	fabric.IText = fabric.util.createClass(fabric.Text, fabric.Observable, {
		type: "i-text",
		selectionStart: 0,
		selectionEnd: 0,
		selectionColor: "rgba(17,119,255,0.3)",
		isEditing: !1,
		editable: !0,
		editingBorderColor: "rgba(102,153,255,0.25)",
		cursorWidth: 2,
		cursorHeightPercent: 1,
		cursorDeltaX: 0,
		cursorDeltaY: 0,
		cursorColor: "#333",
		cursorDelay: 1e3,
		cursorDuration: 600,
		styles: null,
		caching: !0,
		multiline: !0,
		capitalize: !1,
		_skipFillStrokeCheck: !1,
		_reSpace: /\s|\n/,
		_currentCursorOpacity: 0,
		_selectionDirection: null,
		_abortCursorAnimation: !1,
		_charWidthsCache: {},
		initialize: function(t, e) {
			this.styles = e ? e.styles || {} : {}, this.callSuper("initialize", t, e), this.initBehavior()
		},
		_clearCache: function() {
			this.callSuper("_clearCache"), this.__maxFontHeights = [], this.__widthOfSpace = []
		},
		isEmptyStyles: function() {
			if (!this.styles) return !0;
			var t = this.styles;
			for (var e in t) for (var i in t[e]) for (var n in t[e][i]) return !1;
			return !0
		},
		setSelectionStart: function(t) {
			t = Math.max(t, 0), this.selectionStart !== t && (this.fire("selection:changed"), this.canvas && this.canvas.fire("text:selection:changed", {
				target: this
			}), this.selectionStart = t), this._updateTextarea()
		},
		setSelectionEnd: function(t) {
			t = Math.min(t, this.text.length), this.selectionEnd !== t && (this.fire("selection:changed"), this.canvas && this.canvas.fire("text:selection:changed", {
				target: this
			}), this.selectionEnd = t), this._updateTextarea()
		},
		getSelectionStyles: function(t, e) {
			if (2 === arguments.length) {
				for (var i = [], n = t; e > n; n++) i.push(this.getSelectionStyles(n));
				return i
			}
			var r = this.get2DCursorLocation(t),
				o = this._getStyleDeclaration(r.lineIndex, r.charIndex);
			return o || {}
		},
		setSelectionStyles: function(t) {
			if (this.selectionStart === this.selectionEnd) this._extendStyles(this.selectionStart, t);
			else for (var e = this.selectionStart; e < this.selectionEnd; e++) this._extendStyles(e, t);
			return this._forceClearCache = !0, this
		},
		_extendStyles: function(t, e) {
			var i = this.get2DCursorLocation(t);
			this._getLineStyle(i.lineIndex) || this._setLineStyle(i.lineIndex, {}), this._getStyleDeclaration(i.lineIndex, i.charIndex) || this._setStyleDeclaration(i.lineIndex, i.charIndex, {}), fabric.util.object.extend(this._getStyleDeclaration(i.lineIndex, i.charIndex), e)
		},
		_render: function(t) {
			this.callSuper("_render", t), this.ctx = t, this.isEditing && this.renderCursorOrSelection()
		},
		renderCursorOrSelection: function() {
			if (this.active) {
				var t, e, i = this.text.split("");
				this.canvas.contextTop ? (e = this.canvas.contextTop, e.save(), e.transform.apply(e, this.canvas.viewportTransform), this.transform(e), this.transformMatrix && e.transform.apply(e, this.transformMatrix)) : (e = this.ctx, e.save()), this.selectionStart === this.selectionEnd ? (t = this._getCursorBoundaries(i, "cursor"), this.renderCursor(t, e)) : (t = this._getCursorBoundaries(i, "selection"), this.renderSelection(i, t, e)), e.restore()
			}
		},
		get2DCursorLocation: function(t) {
			"undefined" == typeof t && (t = this.selectionStart);
			for (var e = this._textLines.length, i = 0; e > i; i++) {
				if (t <= this._textLines[i].length) return {
					lineIndex: i,
					charIndex: t
				};
				t -= this._textLines[i].length + 1
			}
			return {
				lineIndex: i - 1,
				charIndex: this._textLines[i - 1].length < t ? this._textLines[i - 1].length : t
			}
		},
		getCurrentCharStyle: function(t, e) {
			var i = this._getStyleDeclaration(t, 0 === e ? 0 : e - 1);
			return {
				fontSize: i && i.fontSize || this.fontSize,
				fill: i && i.fill || this.fill,
				textBackgroundColor: i && i.textBackgroundColor || this.textBackgroundColor,
				textDecoration: i && i.textDecoration || this.textDecoration,
				fontFamily: i && i.fontFamily || this.fontFamily,
				fontWeight: i && i.fontWeight || this.fontWeight,
				fontStyle: i && i.fontStyle || this.fontStyle,
				stroke: i && i.stroke || this.stroke,
				strokeWidth: i && i.strokeWidth || this.strokeWidth
			}
		},
		getCurrentCharFontSize: function(t, e) {
			var i = this._getStyleDeclaration(t, 0 === e ? 0 : e - 1);
			return i && i.fontSize ? i.fontSize : this.fontSize
		},
		getCurrentCharColor: function(t, e) {
			var i = this._getStyleDeclaration(t, 0 === e ? 0 : e - 1);
			return i && i.fill ? i.fill : this.cursorColor
		},
		_getCursorBoundaries: function(t, e) {
			var i = Math.round(this._getLeftOffset()),
				n = this._getTopOffset(),
				r = this._getCursorBoundariesOffsets(t, e);
			return {
				left: i,
				top: n,
				leftOffset: r.left + r.lineLeft,
				topOffset: r.top
			}
		},
		_getCursorBoundariesOffsets: function(t, e) {
			for (var i = 0, n = 0, r = 0, o = 0, s = 0, a = 0; a < this.selectionStart; a++) "\n" === t[a] ? (s = 0, o += this._getHeightOfLine(this.ctx, n), n++, r = 0) : (s += this._getWidthOfChar(this.ctx, t[a], n, r), r++), i = this._getCachedLineOffset(n);
			return "cursor" === e && (o += (1 - this._fontSizeFraction) * this._getHeightOfLine(this.ctx, n) / this.lineHeight - this.getCurrentCharFontSize(n, r) * (1 - this._fontSizeFraction)), {
				top: o,
				left: s,
				lineLeft: i
			}
		},
		_getCachedLineOffset: function(t) {
			var e = this._getLineWidth(this.ctx, t);
			return this.__lineOffsets[t] || (this.__lineOffsets[t] = this._getLineLeftOffset(e))
		},
		renderCursor: function(t, e) {
			var i = this.get2DCursorLocation(),
				n = i.lineIndex,
				r = i.charIndex,
				o = this.getCurrentCharFontSize(n, r),
				s = 0 === n && 0 === r ? this._getCachedLineOffset(n) : t.leftOffset;
			e.fillStyle = this.getCurrentCharColor(n, r), e.globalAlpha = this.__isMousedown ? 1 : this._currentCursorOpacity, "stretch" == this.textAlign && this.fixedLineWidth > 0 ? (t.left = 0, s = 0, s = this.text.length <= 0 ? -this.fixedLineWidth / 2 : this.fixedLineWidth / 2) : this.fixedLineWidth > 0 && s > this.fixedLineWidth && (t.left = 0, s = this.fixedLineWidth / 2), e.fillRect(t.left + s + this.cursorDeltaX, t.top + t.topOffset + (1 - this.cursorHeightPercent) / 2 * o + this.cursorDeltaY, this.cursorWidth / this.scaleX, this.cursorHeightPercent * o / this.scaleY)
		},
		renderSelection: function(t, e, i) {
			if ("stretch" !== this.textAlign) {
				i.fillStyle = this.selectionColor;
				for (var n = this.get2DCursorLocation(this.selectionStart), r = this.get2DCursorLocation(this.selectionEnd), o = n.lineIndex, s = r.lineIndex, a = o; s >= a; a++) {
					var c = this._getCachedLineOffset(a) || 0,
						h = this._getHeightOfLine(this.ctx, a),
						l = 0,
						u = this._textLines[a];
					if (a === o) for (var f = 0, d = u.length; d > f; f++) f >= n.charIndex && (a !== s || f < r.charIndex) && (l += this._getWidthOfChar(i, u[f], a, f)), f < n.charIndex && (c += this._getWidthOfChar(i, u[f], a, f));
					else if (a > o && s > a) l += this._getLineWidth(i, a) || 5;
					else if (a === s) for (var p = 0, g = r.charIndex; g > p; p++) l += this._getWidthOfChar(i, u[p], a, p);
					i.fillRect(e.left + c, e.top + e.topOffset, l, h), e.topOffset += h
				}
			}
		},
		_renderChars: function(t, e, i, n, r, o, s) {
			if (this.isEmptyStyles()) return this._renderCharsFast(t, e, i, n, r, s);
			this.skipTextAlign = !0, n -= "center" === this.textAlign ? this.width / 2 : "right" === this.textAlign ? this.width : 0;
			var a, c = this._getHeightOfLine(e, o),
				h = this._getCachedLineOffset(o),
				l = "";
			n += h || 0, e.save(), r -= c / this.lineHeight * this._fontSizeFraction;
			for (var u = 0, f = i.length; f >= u; u++) {
				a = a || this.getCurrentCharStyle(o, u);
				var d = this.getCurrentCharStyle(o, u + 1);
				(this._hasStyleChanged(a, d) || u === f) && (this._renderChar(t, e, o, u - 1, l, n, r, c), l = "", a = d), l += i[u]
			}
			e.restore()
		},
		_renderCharsFast: function(t, e, i, n, r, o) {
			this.skipTextAlign = !1, "fillText" === t && this.fill && this.callSuper("_renderChars", t, e, i, n, r, o), "strokeText" === t && (this.stroke && this.strokeWidth > 0 || this.skipFillStrokeCheck) && this.callSuper("_renderChars", t, e, i, n, r, o)
		},
		_renderChar: function(t, e, i, n, r, o, s, a) {
			var c, h, l = this._getStyleDeclaration(i, n),
				u = this._fontSizeFraction * a / this.lineHeight;
			if (l) {
				var f = l.stroke || this.stroke,
					d = l.fill || this.fill;
				e.save(), c = this._applyCharStylesGetWidth(e, r, i, n, l), h = this._getHeightOfChar(e, r, i, n), d && e.fillText(r, o, s), f && e.strokeText(r, o, s), this._renderCharDecoration(e, l, o, s, u, c, h), e.restore(), e.translate(c, 0)
			} else "strokeText" === t && this.stroke && e[t](r, o, s), "fillText" === t && this.fill && e[t](r, o, s), c = this._applyCharStylesGetWidth(e, r, i, n), this._renderCharDecoration(e, null, o, s, u, c, this.fontSize), e.translate(e.measureText(r).width, 0)
		},
		_hasStyleChanged: function(t, e) {
			return t.fill !== e.fill || t.fontSize !== e.fontSize || t.textBackgroundColor !== e.textBackgroundColor || t.textDecoration !== e.textDecoration || t.fontFamily !== e.fontFamily || t.fontWeight !== e.fontWeight || t.fontStyle !== e.fontStyle || t.stroke !== e.stroke || t.strokeWidth !== e.strokeWidth
		},
		_renderCharDecoration: function(t, e, i, n, r, o, s) {
			var a = e ? e.textDecoration || this.textDecoration : this.textDecoration;
			a && (a.indexOf("underline") > -1 && t.fillRect(i, n + s / 10, o, s / 15), a.indexOf("line-through") > -1 && t.fillRect(i, n - s * (this._fontSizeFraction + this._fontSizeMult - 1) + s / 15, o, s / 15), a.indexOf("overline") > -1 && t.fillRect(i, n - (this._fontSizeMult - this._fontSizeFraction) * s, o, s / 15))
		},
		_renderTextLine: function(t, e, i, n, r, o) {
			this.isEmptyStyles() || (r += this.fontSize * (this._fontSizeFraction + .03)), this.callSuper("_renderTextLine", t, e, i, n, r, o)
		},
		_renderTextDecoration: function(t) {
			return this.isEmptyStyles() ? this.callSuper("_renderTextDecoration", t) : void 0
		},
		_renderTextLinesBackground: function(t) {
			if (this.textBackgroundColor || this.styles) {
				t.save(), this.textBackgroundColor && (t.fillStyle = this.textBackgroundColor);
				for (var e = 0, i = 0, n = this._textLines.length; n > i; i++) {
					var r = this._getHeightOfLine(t, i);
					if ("" !== this._textLines[i]) {
						var o = this._getLineWidth(t, i),
							s = this._getCachedLineOffset(i);
						if (this.textBackgroundColor && (t.fillStyle = this.textBackgroundColor, t.fillRect(this._getLeftOffset() + s, this._getTopOffset() + e, o, r / this.lineHeight)), this._getLineStyle(i)) for (var a = 0, c = this._textLines[i].length; c > a; a++) {
							var h = this._getStyleDeclaration(i, a);
							if (h && h.textBackgroundColor) {
								var l = this._textLines[i][a];
								t.fillStyle = h.textBackgroundColor, t.fillRect(this._getLeftOffset() + s + this._getWidthOfCharsAt(t, i, a), this._getTopOffset() + e, this._getWidthOfChar(t, l, i, a) + 1, r / this.lineHeight)
							}
						}
						e += r
					} else e += r
				}
				t.restore()
			}
		},
		_getCacheProp: function(t, e) {
			return t + e.fontFamily + e.fontSize + e.fontWeight + e.fontStyle + e.shadow
		},
		_applyCharStylesGetWidth: function(e, i, n, r, o) {
			var s = o || this._getStyleDeclaration(n, r);
			s = s ? t(s) : {}, this._applyFontStyles(s);
			var a = this._getCacheProp(i, s);
			if (this.isEmptyStyles() && this._charWidthsCache[a] && this.caching) return this._charWidthsCache[a];
			"string" == typeof s.shadow && (s.shadow = new fabric.Shadow(s.shadow));
			var c = s.fill || this.fill;
			return e.fillStyle = c.toLive ? c.toLive(e, this) : c, s.stroke && (e.strokeStyle = s.stroke && s.stroke.toLive ? s.stroke.toLive(e, this) : s.stroke), e.lineWidth = s.strokeWidth || this.strokeWidth, e.font = this._getFontDeclaration.call(s), this._setShadow.call(s, e), this.caching ? (this._charWidthsCache[a] || (this._charWidthsCache[a] = e.measureText(i).width), this._charWidthsCache[a]) : e.measureText(i).width
		},
		_applyFontStyles: function(t) {
			t.fontFamily || (t.fontFamily = this.fontFamily), t.fontSize || (t.fontSize = this.fontSize), t.fontWeight || (t.fontWeight = this.fontWeight), t.fontStyle || (t.fontStyle = this.fontStyle)
		},
		_getStyleDeclaration: function(e, i, n) {
			return n ? this.styles[e] && this.styles[e][i] ? t(this.styles[e][i]) : {} : this.styles[e] && this.styles[e][i] ? this.styles[e][i] : null
		},
		_setStyleDeclaration: function(t, e, i) {
			this.styles[t][e] = i
		},
		_deleteStyleDeclaration: function(t, e) {
			delete this.styles[t][e]
		},
		_getLineStyle: function(t) {
			return this.styles[t]
		},
		_setLineStyle: function(t, e) {
			this.styles[t] = e
		},
		_deleteLineStyle: function(t) {
			delete this.styles[t]
		},
		_getWidthOfChar: function(t, e, i, n) {
			if ("justify" === this.textAlign && this._reSpacesAndTabs.test(e)) return this._getWidthOfSpace(t, i);
			var r = this._getStyleDeclaration(i, n, !0);
			this._applyFontStyles(r);
			var o = this._getCacheProp(e, r);
			if (this._charWidthsCache[o] && this.caching) return this._charWidthsCache[o];
			if (t) {
				t.save();
				var s = this._applyCharStylesGetWidth(t, e, i, n);
				return t.restore(), s
			}
		},
		_getHeightOfChar: function(t, e, i, n) {
			var r = this._getStyleDeclaration(i, n);
			return r && r.fontSize ? r.fontSize : this.fontSize
		},
		_getHeightOfCharAt: function(t, e, i) {
			var n = this._textLines[e][i];
			return this._getHeightOfChar(t, n, e, i)
		},
		_getWidthOfCharsAt: function(t, e, i) {
			var n, r, o = 0;
			for (n = 0; i > n; n++) r = this._textLines[e][n], o += this._getWidthOfChar(t, r, e, n);
			return o
		},
		_getLineWidth: function(t, e) {
			return this.__lineWidths[e] ? this.__lineWidths[e] : (this.__lineWidths[e] = this._getWidthOfCharsAt(t, e, this._textLines[e].length), this.__lineWidths[e])
		},
		_getWidthOfSpace: function(t, e) {
			if (this.__widthOfSpace[e]) return this.__widthOfSpace[e];
			var i = this._textLines[e],
				n = this._getWidthOfWords(t, i, e),
				r = this.width - n,
				o = i.length - i.replace(this._reSpacesAndTabs, "").length,
				s = r / o;
			return this.__widthOfSpace[e] = s, s
		},
		_getWidthOfWords: function(t, e, i) {
			for (var n = 0, r = 0; r < e.length; r++) {
				var o = e[r];
				o.match(/\s/) || (n += this._getWidthOfChar(t, o, i, r))
			}
			return n
		},
		_getHeightOfLine: function(t, e) {
			if (this.__lineHeights[e]) return this.__lineHeights[e];
			for (var i = this._textLines[e], n = this._getHeightOfChar(t, i[0], e, 0), r = 1, o = i.length; o > r; r++) {
				var s = this._getHeightOfChar(t, i[r], e, r);
				s > n && (n = s)
			}
			return this.__maxFontHeights[e] = n, this.__lineHeights[e] = n * this.lineHeight * this._fontSizeMult, this.__lineHeights[e]
		},
		_getTextHeight: function(t) {
			for (var e = 0, i = 0, n = this._textLines.length; n > i; i++) e += this._getHeightOfLine(t, i);
			return e
		},
		_renderTextBoxBackground: function(t) {
			this.backgroundColor && (t.save(), t.fillStyle = this.backgroundColor, t.fillRect(this._getLeftOffset(), this._getTopOffset(), this.width, this.height), t.restore())
		},
		toObject: function(e) {
			return fabric.util.object.extend(this.callSuper("toObject", e), {
				styles: t(this.styles)
			})
		}
	}), fabric.IText.fromObject = function(e) {
		return new fabric.IText(e.text, t(e))
	}
}(),
function() {
	var t = fabric.util.object.clone;
	fabric.util.object.extend(fabric.IText.prototype, {
		initBehavior: function() {
			this.initAddedHandler(), this.initRemovedHandler(), this.initCursorSelectionHandlers(), this.initDoubleClickSimulation()
		},
		initSelectedHandler: function() {
			this.on("selected", function() {
				var t = this;
				setTimeout(function() {
					t.selected = !0
				}, 100)
			})
		},
		initAddedHandler: function() {
			var t = this;
			this.on("added", function() {
				this.canvas && !this.canvas._hasITextHandlers && (this.canvas._hasITextHandlers = !0, this._initCanvasHandlers()), t.canvas && (t.canvas._iTextInstances = t.canvas._iTextInstances || [], t.canvas._iTextInstances.push(t))
			})
		},
		initRemovedHandler: function() {
			var t = this;
			this.on("removed", function() {
				t.canvas && (t.canvas._iTextInstances = t.canvas._iTextInstances || [], fabric.util.removeFromArray(t.canvas._iTextInstances, t))
			})
		},
		_initCanvasHandlers: function() {
			var t = this;
			this.canvas.on("selection:cleared", function() {
				fabric.IText.prototype.exitEditingOnOthers(t.canvas)
			}), this.canvas.on("mouse:up", function() {
				t.canvas._iTextInstances && t.canvas._iTextInstances.forEach(function(t) {
					t.__isMousedown = !1
				})
			}), this.canvas.on("object:selected", function() {
				fabric.IText.prototype.exitEditingOnOthers(t.canvas)
			})
		},
		_tick: function() {
			this._currentTickState = this._animateCursor(this, 1, this.cursorDuration, "_onTickComplete")
		},
		_animateCursor: function(t, e, i, n) {
			var r;
			return r = {
				isAborted: !1,
				abort: function() {
					this.isAborted = !0
				}
			}, t.animate("_currentCursorOpacity", e, {
				duration: i,
				onComplete: function() {
					r.isAborted || t[n]()
				},
				onChange: function() {
					t.canvas && (t.canvas.clearContext(t.canvas.contextTop || t.ctx), t.renderCursorOrSelection())
				},
				abort: function() {
					return r.isAborted
				}
			}), r
		},
		_onTickComplete: function() {
			var t = this;
			this._cursorTimeout1 && clearTimeout(this._cursorTimeout1), this._cursorTimeout1 = setTimeout(function() {
				t._currentTickCompleteState = t._animateCursor(t, 0, this.cursorDuration / 2, "_tick")
			}, 100)
		},
		initDelayedCursor: function(t) {
			var e = this,
				i = t ? 0 : this.cursorDelay;
			this._currentTickState && this._currentTickState.abort(), this._currentTickCompleteState && this._currentTickCompleteState.abort(), clearTimeout(this._cursorTimeout1), this._currentCursorOpacity = 1, this.canvas && (this.canvas.clearContext(this.canvas.contextTop || this.ctx), this.renderCursorOrSelection()), this._cursorTimeout2 && clearTimeout(this._cursorTimeout2), this._cursorTimeout2 = setTimeout(function() {
				e._tick()
			}, i)
		},
		abortCursorAnimation: function() {
			this._currentTickState && this._currentTickState.abort(), this._currentTickCompleteState && this._currentTickCompleteState.abort(), clearTimeout(this._cursorTimeout1), clearTimeout(this._cursorTimeout2), this._currentCursorOpacity = 0, this.canvas && this.canvas.clearContext(this.canvas.contextTop || this.ctx)
		},
		selectAll: function() {
			this.setSelectionStart(0), this.setSelectionEnd(this.text.length)
		},
		getSelectedText: function() {
			return this.text.slice(this.selectionStart, this.selectionEnd)
		},
		findWordBoundaryLeft: function(t) {
			var e = 0,
				i = t - 1;
			if (this._reSpace.test(this.text.charAt(i))) for (; this._reSpace.test(this.text.charAt(i));) e++, i--;
			for (;
			/\S/.test(this.text.charAt(i)) && i > -1;) e++, i--;
			return t - e
		},
		findWordBoundaryRight: function(t) {
			var e = 0,
				i = t;
			if (this._reSpace.test(this.text.charAt(i))) for (; this._reSpace.test(this.text.charAt(i));) e++, i++;
			for (;
			/\S/.test(this.text.charAt(i)) && i < this.text.length;) e++, i++;
			return t + e
		},
		findLineBoundaryLeft: function(t) {
			for (var e = 0, i = t - 1; !/\n/.test(this.text.charAt(i)) && i > -1;) e++, i--;
			return t - e
		},
		findLineBoundaryRight: function(t) {
			for (var e = 0, i = t; !/\n/.test(this.text.charAt(i)) && i < this.text.length;) e++, i++;
			return t + e
		},
		getNumNewLinesInSelectedText: function() {
			for (var t = this.getSelectedText(), e = 0, i = 0, n = t.length; n > i; i++) "\n" === t[i] && e++;
			return e
		},
		searchWordBoundary: function(t, e) {
			for (var i = this._reSpace.test(this.text.charAt(t)) ? t - 1 : t, n = this.text.charAt(i), r = /[ \n\.,;!\?\-]/; !r.test(n) && i > 0 && i < this.text.length;) i += e, n = this.text.charAt(i);
			return r.test(n) && "\n" !== n && (i += 1 === e ? 0 : 1), i
		},
		selectWord: function(t) {
			var e = this.searchWordBoundary(t, -1),
				i = this.searchWordBoundary(t, 1);
			this.setSelectionStart(e), this.setSelectionEnd(i)
		},
		selectLine: function(t) {
			var e = this.findLineBoundaryLeft(t),
				i = this.findLineBoundaryRight(t);
			this.setSelectionStart(e), this.setSelectionEnd(i)
		},
		enterEditing: function() {
			return !this.isEditing && this.editable ? (this.canvas && this.exitEditingOnOthers(this.canvas), this.isEditing = !0, this.initHiddenTextarea(), this.hiddenTextarea.focus(), this._updateTextarea(), this._saveEditingProps(), this._setEditingProps(), this._tick(), this.fire("editing:entered"), this.canvas ? (this.canvas.renderAll(), this.canvas.fire("text:editing:entered", {
				target: this
			}), this.initMouseMoveHandler(), this) : this) : void 0
		},
		exitEditingOnOthers: function(t) {
			t._iTextInstances && t._iTextInstances.forEach(function(t) {
				t.selected = !1, t.isEditing && t.exitEditing()
			})
		},
		initMouseMoveHandler: function() {
			var t = this;
			this.canvas.on("mouse:move", function(e) {
				if (t.__isMousedown && t.isEditing) {
					var i = t.getSelectionStartFromPointer(e.e);
					i >= t.__selectionStartOnMouseDown ? (t.setSelectionStart(t.__selectionStartOnMouseDown), t.setSelectionEnd(i)) : (t.setSelectionStart(i), t.setSelectionEnd(t.__selectionStartOnMouseDown))
				}
			})
		},
		_setEditingProps: function() {
			this.hoverCursor = "text", this.canvas && (this.canvas.defaultCursor = this.canvas.moveCursor = "text"), this.borderColor = this.editingBorderColor, this.hasControls = this.selectable = !1, this.lockMovementX = this.lockMovementY = !0
		},
		_updateTextarea: function() {
			this.hiddenTextarea && (this.hiddenTextarea.value = this.text, this.hiddenTextarea.selectionStart = this.selectionStart, this.hiddenTextarea.selectionEnd = this.selectionEnd)
		},
		_saveEditingProps: function() {
			this._savedProps = {
				hasControls: this.hasControls,
				borderColor: this.borderColor,
				lockMovementX: this.lockMovementX,
				lockMovementY: this.lockMovementY,
				hoverCursor: this.hoverCursor,
				defaultCursor: this.canvas && this.canvas.defaultCursor,
				moveCursor: this.canvas && this.canvas.moveCursor
			}
		},
		_restoreEditingProps: function() {
			this._savedProps && (this.hoverCursor = this._savedProps.overCursor, this.hasControls = this._savedProps.hasControls, this.borderColor = this._savedProps.borderColor, this.lockMovementX = this._savedProps.lockMovementX, this.lockMovementY = this._savedProps.lockMovementY, this.canvas && (this.canvas.defaultCursor = this._savedProps.defaultCursor, this.canvas.moveCursor = this._savedProps.moveCursor))
		},
		exitEditing: function() {
			return this.selected = !1, this.isEditing = !1, this.selectable = !0, this.selectionEnd = this.selectionStart, this.hiddenTextarea && this.canvas && this.hiddenTextarea.parentNode.removeChild(this.hiddenTextarea), this.hiddenTextarea = null, this.abortCursorAnimation(), this._restoreEditingProps(), this._currentCursorOpacity = 0, this.fire("editing:exited"), this.canvas && this.canvas.fire("text:editing:exited", {
				target: this
			}), this
		},
		_removeExtraneousStyles: function() {
			for (var t in this.styles) this._textLines[t] || delete this.styles[t]
		},
		_removeCharsFromTo: function(t, e) {
			for (; e !== t;) this._removeSingleCharAndStyle(t + 1), e--;
			this.setSelectionStart(t)
		},
		_removeSingleCharAndStyle: function(t) {
			var e = "\n" === this.text[t - 1],
				i = e ? t : t - 1;
			this.removeStyleObject(e, i), this.text = this.text.slice(0, t - 1) + this.text.slice(t), this._textLines = this._splitTextIntoLines()
		},
		insertChars: function(t, e) {
			var i;
			this.selectionEnd - this.selectionStart > 1 && (this._removeCharsFromTo(this.selectionStart, this.selectionEnd), this.setSelectionEnd(this.selectionStart));
			for (var n = 0, r = t.length; r > n && !(this.maxLength > 0 && this.text.length >= this.maxLength); n++) e && (i = fabric.copiedTextStyle[n]), this.insertChar(t[n], r - 1 > n, i)
		},
		insertChar: function(t, e, i) {
			var n = "\n" === this.text[this.selectionStart];
			(this.multiline !== !1 || "\n" !== t) && (this.capitalize === !0 && (t = t.toUpperCase()), this.text = this.text.slice(0, this.selectionStart) + t + this.text.slice(this.selectionEnd), this._textLines = this._splitTextIntoLines(), this.insertStyleObjects(t, n, i), this.setSelectionStart(this.selectionStart + 1), this.setSelectionEnd(this.selectionStart), e || (this.canvas && this.canvas.renderAll(), this.setCoords(), this.fire("changed"), this.canvas && this.canvas.fire("text:changed", {
				target: this
			})))
		},
		insertNewlineStyleObject: function(e, i, n) {
			this.shiftLineStyles(e, 1), this.styles[e + 1] || (this.styles[e + 1] = {});
			var r = {}, o = {};
			if (this.styles[e] && this.styles[e][i - 1] && (r = this.styles[e][i - 1]), n) o[0] = t(r), this.styles[e + 1] = o;
			else {
				for (var s in this.styles[e]) parseInt(s, 10) >= i && (o[parseInt(s, 10) - i] = this.styles[e][s], delete this.styles[e][s]);
				this.styles[e + 1] = o
			}
			this._forceClearCache = !0
		},
		insertCharStyleObject: function(e, i, n) {
			var r = this.styles[e],
				o = t(r);
			0 !== i || n || (i = 1);
			for (var s in o) {
				var a = parseInt(s, 10);
				a >= i && (r[a + 1] = o[a], o[a - 1] || delete r[a])
			}
			this.styles[e][i] = n || t(r[i - 1]), this._forceClearCache = !0
		},
		insertStyleObjects: function(t, e, i) {
			var n = this.get2DCursorLocation(),
				r = n.lineIndex,
				o = n.charIndex;
			this._getLineStyle(r) || this._setLineStyle(r, {}), "\n" === t ? this.insertNewlineStyleObject(r, o, e) : this.insertCharStyleObject(r, o, i)
		},
		shiftLineStyles: function(e, i) {
			var n = t(this.styles);
			for (var r in this.styles) {
				var o = parseInt(r, 10);
				o > e && (this.styles[o + i] = n[o], n[o - i] || delete this.styles[o])
			}
		},
		removeStyleObject: function(e, i) {
			var n = this.get2DCursorLocation(i),
				r = n.lineIndex,
				o = n.charIndex;
			if (e) {
				var s = this._textLines[r - 1],
					a = s ? s.length : 0;
				this.styles[r - 1] || (this.styles[r - 1] = {});
				for (o in this.styles[r]) this.styles[r - 1][parseInt(o, 10) + a] = this.styles[r][o];
				this.shiftLineStyles(r, -1)
			} else {
				var c = this.styles[r];
				c && delete c[o];
				var h = t(c);
				for (var l in h) {
					var u = parseInt(l, 10);
					u >= o && 0 !== u && (c[u - 1] = h[u], delete c[u])
				}
			}
		},
		insertNewline: function() {
			this.insertChars("\n")
		}
	})
}(), fabric.util.object.extend(fabric.IText.prototype, {
	initDoubleClickSimulation: function() {
		this.__lastClickTime = +new Date, this.__lastLastClickTime = +new Date, this.__lastPointer = {}, this.on("mousedown", this.onMouseDown.bind(this))
	},
	onMouseDown: function(t) {
		this.__newClickTime = +new Date;
		var e = this.canvas.getPointer(t.e);
		this.isTripleClick(e) ? (this.fire("tripleclick", t), this._stopEvent(t.e)) : this.isDoubleClick(e) && (this.fire("dblclick", t), this._stopEvent(t.e)), this.__lastLastClickTime = this.__lastClickTime, this.__lastClickTime = this.__newClickTime, this.__lastPointer = e, this.__lastIsEditing = this.isEditing, this.__lastSelected = this.selected
	},
	isDoubleClick: function(t) {
		return this.__newClickTime - this.__lastClickTime < 500 && this.__lastPointer.x === t.x && this.__lastPointer.y === t.y && this.__lastIsEditing
	},
	isTripleClick: function(t) {
		return this.__newClickTime - this.__lastClickTime < 500 && this.__lastClickTime - this.__lastLastClickTime < 500 && this.__lastPointer.x === t.x && this.__lastPointer.y === t.y
	},
	_stopEvent: function(t) {
		t.preventDefault && t.preventDefault(), t.stopPropagation && t.stopPropagation()
	},
	initCursorSelectionHandlers: function() {
		this.initSelectedHandler(), this.initMousedownHandler(), this.initMouseupHandler(), this.initClicks()
	},
	initClicks: function() {
		this.on("dblclick", function(t) {
			this.selectWord(this.getSelectionStartFromPointer(t.e))
		}), this.on("tripleclick", function(t) {
			this.selectLine(this.getSelectionStartFromPointer(t.e))
		})
	},
	initMousedownHandler: function() {
		this.on("mousedown", function(t) {
			var e = this.canvas.getPointer(t.e);
			this.__mousedownX = e.x, this.__mousedownY = e.y, this.__isMousedown = !0, this.hiddenTextarea && this.canvas && this.canvas.wrapperEl.appendChild(this.hiddenTextarea), this.selected && this.setCursorByClick(t.e), this.isEditing && (this.__selectionStartOnMouseDown = this.selectionStart, this.initDelayedCursor(!0))
		})
	},
	_isObjectMoved: function(t) {
		var e = this.canvas.getPointer(t);
		return this.__mousedownX !== e.x || this.__mousedownY !== e.y
	},
	initMouseupHandler: function() {
		this.on("mouseup", function(t) {
			this.__isMousedown = !1, this._isObjectMoved(t.e) || (this.__lastSelected && (this.enterEditing(), this.initDelayedCursor(!0)), this.selected = !0)
		})
	},
	setCursorByClick: function(t) {
		var e = this.getSelectionStartFromPointer(t);
		t.shiftKey ? e < this.selectionStart ? (this.setSelectionEnd(this.selectionStart), this.setSelectionStart(e)) : this.setSelectionEnd(e) : (this.setSelectionStart(e), this.setSelectionEnd(e))
	},
	getSelectionStartFromPointer: function(t) {
		for (var e, i, n = this.getLocalPointer(t), r = 0, o = 0, s = 0, a = 0, c = 0, h = this._textLines.length; h > c; c++) {
			i = this._textLines[c], s += this._getHeightOfLine(this.ctx, c) * this.scaleY;
			var l = this._getLineWidth(this.ctx, c),
				u = this._getLineLeftOffset(l);
			o = u * this.scaleX, this.flipX && (this._textLines[c] = i.reverse().join(""));
			for (var f = 0, d = i.length; d > f; f++) {
				if (r = o, o += this._getWidthOfChar(this.ctx, i[f], c, this.flipX ? d - f : f) * this.scaleX, !(s <= n.y || o <= n.x)) return this._getNewSelectionStartFromOffset(n, r, o, a + c, d);
				a++
			}
			if (n.y < s) return this._getNewSelectionStartFromOffset(n, r, o, a + c - 1, d)
		}
		return "undefined" == typeof e ? this.text.length : void 0
	},
	_getNewSelectionStartFromOffset: function(t, e, i, n, r) {
		var o = t.x - e,
			s = i - t.x,
			a = s > o ? 0 : 1,
			c = n + a;
		return this.flipX && (c = r - c), c > this.text.length && (c = this.text.length), c
	}
}), fabric.util.object.extend(fabric.IText.prototype, {
	initHiddenTextarea: function() {
		this.hiddenTextarea = fabric.document.createElement("textarea"), this.hiddenTextarea.setAttribute("autocapitalize", "off"), this.maxLength > 0 && this.hiddenTextarea.setAttribute("maxlength", this.maxLength), this.hiddenTextarea.className = "fabric-hidden-input", this.hiddenTextarea.style.cssText = "opacity: 0; width: 0; height: 0; z-index: -999;", fabric.document.body.appendChild(this.hiddenTextarea), fabric.util.addListener(this.hiddenTextarea, "keydown", this.onKeyDown.bind(this)), fabric.util.addListener(this.hiddenTextarea, "input", this.onInput.bind(this)), fabric.util.addListener(this.hiddenTextarea, "copy", this.copy.bind(this)), fabric.util.addListener(this.hiddenTextarea, "paste", this.paste.bind(this)), !this._clickHandlerInitialized && this.canvas && (fabric.util.addListener(this.canvas.upperCanvasEl, "click", this.onClick.bind(this)), this._clickHandlerInitialized = !0)
	},
	_keysMap: {
		8: "removeChars",
		9: "exitEditing",
		27: "exitEditing",
		13: "insertNewline",
		33: "moveCursorUp",
		34: "moveCursorDown",
		35: "moveCursorRight",
		36: "moveCursorLeft",
		37: "moveCursorLeft",
		38: "moveCursorUp",
		39: "moveCursorRight",
		40: "moveCursorDown",
		46: "forwardDelete"
	},
	_ctrlKeysMap: {
		65: "selectAll",
		88: "cut"
	},
	onClick: function() {
		this.hiddenTextarea && this.hiddenTextarea.focus()
	},
	onKeyDown: function(t) {
		if (this.isEditing) {
			if (t.keyCode in this._keysMap) this[this._keysMap[t.keyCode]](t);
			else {
				if (!(t.keyCode in this._ctrlKeysMap && (t.ctrlKey || t.metaKey))) return;
				this[this._ctrlKeysMap[t.keyCode]](t)
			}
			t.stopImmediatePropagation(), t.preventDefault(), this.canvas && this.canvas.renderAll()
		}
	},
	forwardDelete: function(t) {
		if (this.selectionStart === this.selectionEnd) {
			if (this.selectionStart === this.text.length) return;
			this.moveCursorRight(t)
		}
		this.removeChars(t)
	},
	copy: function(t) {
		var e = this.getSelectedText(),
			i = this._getClipboardData(t);
		i && i.setData("text", e), fabric.copiedText = e, fabric.copiedTextStyle = this.getSelectionStyles(this.selectionStart, this.selectionEnd)
	},
	paste: function(t) {
		var e = null,
			i = this._getClipboardData(t),
			n = !0;
		i ? (e = i.getData("text").replace(/\r/g, ""), fabric.copiedTextStyle && fabric.copiedText === e || (n = !1)) : e = fabric.copiedText, e && this.insertChars(e, n), this._cancelOnInput = !0
	},
	cut: function(t) {
		this.selectionStart !== this.selectionEnd && (this.copy(), this.removeChars(t))
	},
	_getClipboardData: function(t) {
		return t && (t.clipboardData || fabric.window.clipboardData)
	},
	onInput: function(t) {
		if (!this.isEditing || this._cancelOnInput) return void(this._cancelOnInput = !1);
		var e = this.selectionStart || 0,
			i = this.text.length,
			n = this.hiddenTextarea.value.length,
			r = n - i,
			o = this.hiddenTextarea.value.slice(e, e + r);
		this.insertChars(o), t.stopPropagation()
	},
	getDownCursorOffset: function(t, e) {
		var i, n, r = e ? this.selectionEnd : this.selectionStart,
			o = this.get2DCursorLocation(r),
			s = o.lineIndex,
			a = this._textLines[s].slice(0, o.charIndex),
			c = this._textLines[s].slice(o.charIndex),
			h = this._textLines[s + 1] || "";
		if (s === this._textLines.length - 1 || t.metaKey || 34 === t.keyCode) return this.text.length - r;
		var l = this._getLineWidth(this.ctx, s);
		n = this._getLineLeftOffset(l);
		for (var u = n, f = 0, d = a.length; d > f; f++) i = a[f], u += this._getWidthOfChar(this.ctx, i, s, f);
		var p = this._getIndexOnNextLine(o, h, u);
		return c.length + 1 + p
	},
	_getIndexOnNextLine: function(t, e, i) {
		for (var n, r = t.lineIndex + 1, o = this._getLineWidth(this.ctx, r), s = this._getLineLeftOffset(o), a = s, c = 0, h = 0, l = e.length; l > h; h++) {
			var u = e[h],
				f = this._getWidthOfChar(this.ctx, u, r, h);
			if (a += f, a > i) {
				n = !0;
				var d = a - f,
					p = a,
					g = Math.abs(d - i),
					v = Math.abs(p - i);
				c = g > v ? h + 1 : h;
				break
			}
		}
		return n || (c = e.length), c
	},
	moveCursorDown: function(t) {
		this.abortCursorAnimation(), this._currentCursorOpacity = 1;
		var e = this.getDownCursorOffset(t, "right" === this._selectionDirection);
		t.shiftKey ? this.moveCursorDownWithShift(e) : this.moveCursorDownWithoutShift(e), this.initDelayedCursor()
	},
	moveCursorDownWithoutShift: function(t) {
		this._selectionDirection = "right", this.setSelectionStart(this.selectionStart + t), this.setSelectionEnd(this.selectionStart)
	},
	swapSelectionPoints: function() {
		var t = this.selectionEnd;
		this.setSelectionEnd(this.selectionStart), this.setSelectionStart(t)
	},
	moveCursorDownWithShift: function(t) {
		this.selectionEnd === this.selectionStart && (this._selectionDirection = "right"), "right" === this._selectionDirection ? this.setSelectionEnd(this.selectionEnd + t) : this.setSelectionStart(this.selectionStart + t), this.selectionEnd < this.selectionStart && "left" === this._selectionDirection && (this.swapSelectionPoints(), this._selectionDirection = "right"), this.selectionEnd > this.text.length && this.setSelectionEnd(this.text.length)
	},
	getUpCursorOffset: function(t, e) {
		var i = e ? this.selectionEnd : this.selectionStart,
			n = this.get2DCursorLocation(i),
			r = n.lineIndex;
		if (0 === r || t.metaKey || 33 === t.keyCode) return i;
		for (var o, s = this._textLines[r].slice(0, n.charIndex), a = this._textLines[r - 1] || "", c = this._getLineWidth(this.ctx, n.lineIndex), h = this._getLineLeftOffset(c), l = h, u = 0, f = s.length; f > u; u++) o = s[u], l += this._getWidthOfChar(this.ctx, o, r, u);
		var d = this._getIndexOnPrevLine(n, a, l);
		return a.length - d + s.length
	},
	_getIndexOnPrevLine: function(t, e, i) {
		for (var n, r = t.lineIndex - 1, o = this._getLineWidth(this.ctx, r), s = this._getLineLeftOffset(o), a = s, c = 0, h = 0, l = e.length; l > h; h++) {
			var u = e[h],
				f = this._getWidthOfChar(this.ctx, u, r, h);
			if (a += f, a > i) {
				n = !0;
				var d = a - f,
					p = a,
					g = Math.abs(d - i),
					v = Math.abs(p - i);
				c = g > v ? h : h - 1;
				break
			}
		}
		return n || (c = e.length - 1), c
	},
	moveCursorUp: function(t) {
		this.abortCursorAnimation(), this._currentCursorOpacity = 1;
		var e = this.getUpCursorOffset(t, "right" === this._selectionDirection);
		t.shiftKey ? this.moveCursorUpWithShift(e) : this.moveCursorUpWithoutShift(e), this.initDelayedCursor()
	},
	moveCursorUpWithShift: function(t) {
		this.selectionEnd === this.selectionStart && (this._selectionDirection = "left"), "right" === this._selectionDirection ? this.setSelectionEnd(this.selectionEnd - t) : this.setSelectionStart(this.selectionStart - t), this.selectionEnd < this.selectionStart && "right" === this._selectionDirection && (this.swapSelectionPoints(), this._selectionDirection = "left")
	},
	moveCursorUpWithoutShift: function(t) {
		this.selectionStart === this.selectionEnd && this.setSelectionStart(this.selectionStart - t), this.setSelectionEnd(this.selectionStart), this._selectionDirection = "left"
	},
	moveCursorLeft: function(t) {
		(0 !== this.selectionStart || 0 !== this.selectionEnd) && (this.abortCursorAnimation(), this._currentCursorOpacity = 1, t.shiftKey ? this.moveCursorLeftWithShift(t) : this.moveCursorLeftWithoutShift(t), this.initDelayedCursor())
	},
	_move: function(t, e, i) {
		var n = "selectionStart" === e ? "setSelectionStart" : "setSelectionEnd";
		t.altKey ? this[n](this["findWordBoundary" + i](this[e])) : t.metaKey || 35 === t.keyCode || 36 === t.keyCode ? this[n](this["findLineBoundary" + i](this[e])) : this[n](this[e] + ("Left" === i ? -1 : 1))
	},
	_moveLeft: function(t, e) {
		this._move(t, e, "Left")
	},
	_moveRight: function(t, e) {
		this._move(t, e, "Right")
	},
	moveCursorLeftWithoutShift: function(t) {
		this._selectionDirection = "left", this.selectionEnd === this.selectionStart && this._moveLeft(t, "selectionStart"), this.setSelectionEnd(this.selectionStart)
	},
	moveCursorLeftWithShift: function(t) {
		"right" === this._selectionDirection && this.selectionStart !== this.selectionEnd ? this._moveLeft(t, "selectionEnd") : (this._selectionDirection = "left", this._moveLeft(t, "selectionStart"))
	},
	moveCursorRight: function(t) {
		this.selectionStart >= this.text.length && this.selectionEnd >= this.text.length || (this.abortCursorAnimation(), this._currentCursorOpacity = 1, t.shiftKey ? this.moveCursorRightWithShift(t) : this.moveCursorRightWithoutShift(t), this.initDelayedCursor())
	},
	moveCursorRightWithShift: function(t) {
		"left" === this._selectionDirection && this.selectionStart !== this.selectionEnd ? this._moveRight(t, "selectionStart") : (this._selectionDirection = "right", this._moveRight(t, "selectionEnd"))
	},
	moveCursorRightWithoutShift: function(t) {
		this._selectionDirection = "right", this.selectionStart === this.selectionEnd ? (this._moveRight(t, "selectionStart"), this.setSelectionEnd(this.selectionStart)) : (this.setSelectionEnd(this.selectionEnd + this.getNumNewLinesInSelectedText()), this.setSelectionStart(this.selectionEnd))
	},
	removeChars: function(t) {
		this.selectionStart === this.selectionEnd ? this._removeCharsNearCursor(t) : this._removeCharsFromTo(this.selectionStart, this.selectionEnd), this.setSelectionEnd(this.selectionStart), this._removeExtraneousStyles(), this.canvas && this.canvas.renderAll(), this.setCoords(), this.fire("changed"), this.canvas && this.canvas.fire("text:changed", {
			target: this
		})
	},
	_removeCharsNearCursor: function(t) {
		if (0 !== this.selectionStart) if (t.metaKey) {
			var e = this.findLineBoundaryLeft(this.selectionStart);
			this._removeCharsFromTo(e, this.selectionStart), this.setSelectionStart(e)
		} else if (t.altKey) {
			var i = this.findWordBoundaryLeft(this.selectionStart);
			this._removeCharsFromTo(i, this.selectionStart), this.setSelectionStart(i)
		} else this._removeSingleCharAndStyle(this.selectionStart), this.setSelectionStart(this.selectionStart - 1)
	}
}),
function(t) {
	"use strict";
	var e = t.fabric || (t.fabric = {}),
		i = e.util.object.clone;
	e.Textbox = e.util.createClass(e.IText, e.Observable, {
		type: "textbox",
		minWidth: 20,
		dynamicMinWidth: 0,
		__cachedLines: null,
		initialize: function(t, i) {
			this.ctx = e.util.createCanvasElement().getContext("2d"), this.callSuper("initialize", t, i), this.set({
				lockUniScaling: !1,
				lockScalingY: !0,
				lockScalingFlip: !0,
				hasBorders: !0
			}), this.setControlsVisibility(e.Textbox.getTextboxControlVisibility()), this._dimensionAffectingProps.width = !0
		},
		_initDimensions: function(t) {
			this.__skipDimension || (t || (t = e.util.createCanvasElement().getContext("2d"), this._setTextStyles(t)), this.dynamicMinWidth = 0, this._textLines = this._splitTextIntoLines(), this.dynamicMinWidth > this.width && this._set("width", this.dynamicMinWidth), this._clearCache(), this.height = this._getTextHeight(t), this._setLineWidths())
		},
		_setLineWidths: function() {
			for (var t = 0, e = this._textLines.length; e > t; t++) this.__lineWidths[t] = this.width
		},
		_generateStyleMap: function() {
			for (var t = 0, e = 0, i = 0, n = {}, r = 0; r < this._textLines.length; r++) "\n" === this.text[i] ? (e = 0, i++, t++) : " " === this.text[i] && (e++, i++), n[r] = {
				line: t,
				offset: e
			}, i += this._textLines[r].length, e += this._textLines[r].length;
			return n
		},
		_getStyleDeclaration: function(t, e, n) {
			if (this._styleMap) {
				var r = this._styleMap[t];
				t = r.line, e = r.offset + e
			}
			return n ? this.styles[t] && this.styles[t][e] ? i(this.styles[t][e]) : {} : this.styles[t] && this.styles[t][e] ? this.styles[t][e] : null
		},
		_setStyleDeclaration: function(t, e, i) {
			var n = this._styleMap[t];
			t = n.line, e = n.offset + e, this.styles[t][e] = i
		},
		_deleteStyleDeclaration: function(t, e) {
			var i = this._styleMap[t];
			t = i.line, e = i.offset + e, delete this.styles[t][e]
		},
		_getLineStyle: function(t) {
			var e = this._styleMap[t];
			return this.styles[e.line]
		},
		_setLineStyle: function(t, e) {
			var i = this._styleMap[t];
			this.styles[i.line] = e
		},
		_deleteLineStyle: function(t) {
			var e = this._styleMap[t];
			delete this.styles[e.line]
		},
		_wrapText: function(t, e) {
			var i, n = e.split(this._reNewline),
				r = [];
			for (i = 0; i < n.length; i++) r = r.concat(this._wrapLine(t, n[i], i));
			return r
		},
		_measureText: function(t, e, i, n) {
			var r, o = 0;
			n = n || 0;
			for (var s = 0; s < e.length; s++) this.styles && this.styles[i] && (r = this.styles[i][s + n]) ? (t.save(), o += this._applyCharStylesGetWidth(t, e[s], i, s, r), t.restore()) : o += this._applyCharStylesGetWidth(t, e[s], i, s, {});
			return o
		},
		_wrapLine: function(t, e, i) {
			var n = this.width,
				r = this._measureText(t, e, i, 0);
			if (n > r) return -1 === e.indexOf(" ") && r > this.dynamicMinWidth && (this.dynamicMinWidth = r), [e];
			for (var o = [], s = "", a = e.split(" "), c = 0, h = "", l = 0, u = 0; a.length > 0;) h = "" === s ? "" : " ", l = this._measureText(t, a[0], i, s.length + h.length + c), r = "" === s ? l : this._measureText(t, s + h + a[0], i, c), n > r || "" === s && l >= n ? s += h + a.shift() : (c += s.length + 1, o.push(s), s = ""), 0 === a.length && o.push(s), l > u && (u = l);
			return u > this.dynamicMinWidth && (this.dynamicMinWidth = u), o
		},
		_splitTextIntoLines: function() {
			this.ctx.save(), this._setTextStyles(this.ctx);
			var t = this._wrapText(this.ctx, this.text);
			return this.ctx.restore(), this._textLines = t, this._styleMap = this._generateStyleMap(), t
		},
		setOnGroup: function(t, e) {
			"scaleX" === t && (this.set("scaleX", Math.abs(1 / e)), this.set("width", this.get("width") * e / ("undefined" == typeof this.__oldScaleX ? 1 : this.__oldScaleX)), this.__oldScaleX = e)
		},
		get2DCursorLocation: function(t) {
			"undefined" == typeof t && (t = this.selectionStart);
			for (var e = this._textLines.length, i = 0, n = 0; e > n; n++) {
				var r = this._textLines[n],
					o = r.length;
				if (i + o >= t) return {
					lineIndex: n,
					charIndex: t - i
				};
				i += o, ("\n" === this.text[i] || " " === this.text[i]) && i++
			}
			return {
				lineIndex: e - 1,
				charIndex: this._textLines[e - 1].length
			}
		},
		_getCursorBoundariesOffsets: function(t, e) {
			for (var i = 0, n = 0, r = this.get2DCursorLocation(), o = this._textLines[r.lineIndex].split(""), s = this._getCachedLineOffset(r.lineIndex), a = 0; a < r.charIndex; a++) n += this._getWidthOfChar(this.ctx, o[a], r.lineIndex, a);
			for (a = 0; a < r.lineIndex; a++) i += this._getHeightOfLine(this.ctx, a);
			return "cursor" === e && (i += (1 - this._fontSizeFraction) * this._getHeightOfLine(this.ctx, r.lineIndex) / this.lineHeight - this.getCurrentCharFontSize(r.lineIndex, r.charIndex) * (1 - this._fontSizeFraction)), {
				top: i,
				left: n,
				lineLeft: s
			}
		},
		getMinWidth: function() {
			return Math.max(this.minWidth, this.dynamicMinWidth)
		},
		toObject: function(t) {
			return e.util.object.extend(this.callSuper("toObject", t), {
				minWidth: this.minWidth
			})
		}
	}), e.Textbox.fromObject = function(t) {
		return new e.Textbox(t.text, i(t))
	}, e.Textbox.getTextboxControlVisibility = function() {
		return {
			tl: !1,
			tr: !1,
			br: !1,
			bl: !1,
			ml: !0,
			mt: !1,
			mr: !0,
			mb: !1,
			mtr: !0
		}
	}, e.Textbox.instances = []
}("undefined" != typeof exports ? exports : this),
function() {
	var t = fabric.Canvas.prototype._setObjectScale;
	fabric.Canvas.prototype._setObjectScale = function(e, i, n, r, o, s) {
		var a = i.target;
		if (a instanceof fabric.Textbox) {
			var c = a.width * (e.x / i.scaleX / (a.width + a.strokeWidth));
			c >= a.getMinWidth() && a.set("width", c)
		} else t.call(fabric.Canvas.prototype, e, i, n, r, o, s)
	}, fabric.Group.prototype._refreshControlsVisibility = function() {
		if ("undefined" != typeof fabric.Textbox) for (var t = this._objects.length; t--;) if (this._objects[t] instanceof fabric.Textbox) return void this.setControlsVisibility(fabric.Textbox.getTextboxControlVisibility())
	};
	var e = fabric.util.object.clone;
	fabric.util.object.extend(fabric.Textbox.prototype, {
		_removeExtraneousStyles: function() {
			for (var t in this._styleMap) this._textLines[t] || delete this.styles[this._styleMap[t].line]
		},
		insertCharStyleObject: function(t, e, i) {
			var n = this._styleMap[t];
			t = n.line, e = n.offset + e, fabric.IText.prototype.insertCharStyleObject.apply(this, [t, e, i])
		},
		insertNewlineStyleObject: function(t, e, i) {
			var n = this._styleMap[t];
			t = n.line, e = n.offset + e, fabric.IText.prototype.insertNewlineStyleObject.apply(this, [t, e, i])
		},
		shiftLineStyles: function(t, i) {
			var n = e(this.styles),
				r = this._styleMap[t];
			t = r.line;
			for (var o in this.styles) {
				var s = parseInt(o, 10);
				s > t && (this.styles[s + i] = n[s], n[s - i] || delete this.styles[s])
			}
		},
		_getTextOnPreviousLine: function(t) {
			for (var e = this._textLines[t - 1]; this._styleMap[t - 2] && this._styleMap[t - 2].line === this._styleMap[t - 1].line;) e = this._textLines[t - 2] + e, t--;
			return e
		},
		removeStyleObject: function(t, i) {
			var n = this.get2DCursorLocation(i),
				r = this._styleMap[n.lineIndex],
				o = r.line,
				s = r.offset + n.charIndex;
			if (t) {
				var a = this._getTextOnPreviousLine(n.lineIndex),
					c = a ? a.length : 0;
				this.styles[o - 1] || (this.styles[o - 1] = {});
				for (s in this.styles[o]) this.styles[o - 1][parseInt(s, 10) + c] = this.styles[o][s];
				this.shiftLineStyles(n.lineIndex, -1)
			} else {
				var h = this.styles[o];
				h && delete h[s];
				var l = e(h);
				for (var u in l) {
					var f = parseInt(u, 10);
					f >= s && 0 !== f && (h[f - 1] = l[f], delete h[f])
				}
			}
		}
	})
}(),
function() {
	var t = fabric.IText.prototype._getNewSelectionStartFromOffset;
	fabric.IText.prototype._getNewSelectionStartFromOffset = function(e, i, n, r, o) {
		r = t.call(this, e, i, n, r, o);
		for (var s = 0, a = 0, c = 0; c < this._textLines.length && (s += this._textLines[c].length, !(s + a >= r)); c++)("\n" === this.text[s + a] || " " === this.text[s + a]) && a++;
		return r - c + a
	}
}(),
function(t) {
	"use strict";
	var e = t.HTMLCanvasElement && t.HTMLCanvasElement.prototype,
		i = t.Blob && function() {
			try {
				return Boolean(new Blob)
			} catch (t) {
				return !1
			}
		}(),
		n = i && t.Uint8Array && function() {
			try {
				return 100 === new Blob([new Uint8Array(100)]).size
			} catch (t) {
				return !1
			}
		}(),
		r = t.BlobBuilder || t.WebKitBlobBuilder || t.MozBlobBuilder || t.MSBlobBuilder,
		o = (i || r) && t.atob && t.ArrayBuffer && t.Uint8Array && function(t) {
			var e, o, s, a, c, h;
			for (e = t.split(",")[0].indexOf("base64") >= 0 ? atob(t.split(",")[1]) : decodeURIComponent(t.split(",")[1]), o = new ArrayBuffer(e.length), s = new Uint8Array(o), a = 0; a < e.length; a += 1) s[a] = e.charCodeAt(a);
			return c = t.split(",")[0].split(":")[1].split(";")[0], i ? new Blob([n ? s : o], {
				type: c
			}) : (h = new r, h.append(o), h.getBlob(c))
		};
	t.HTMLCanvasElement && !e.toBlob && (e.mozGetAsFile ? e.toBlob = function(t, i, n) {
		t(n && e.toDataURL && o ? o(this.toDataURL(i, n)) : this.mozGetAsFile("blob", i))
	} : e.toDataURL && o && (e.toBlob = function(t, e, i) {
		t(o(this.toDataURL(e, i)))
	})), "function" == typeof define && define.amd ? define(function() {
		return o
	}) : t.dataURLtoBlob = o
}(this);
var saveAs = saveAs || function(t) {
		"use strict";
		if ("undefined" == typeof navigator || !/MSIE [1-9]\./.test(navigator.userAgent)) {
			var e = t.document,
				i = function() {
					return t.URL || t.webkitURL || t
				}, n = e.createElementNS("http://www.w3.org/1999/xhtml", "a"),
				r = "download" in n,
				o = function(i) {
					var n = e.createEvent("MouseEvents");
					n.initMouseEvent("click", !0, !1, t, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), i.dispatchEvent(n)
				}, s = t.webkitRequestFileSystem,
				a = t.requestFileSystem || s || t.mozRequestFileSystem,
				c = function(e) {
					(t.setImmediate || t.setTimeout)(function() {
						throw e
					}, 0)
				}, h = "application/octet-stream",
				l = 0,
				u = 500,
				f = function(e) {
					var n = function() {
						"string" == typeof e ? i().revokeObjectURL(e) : e.remove()
					};
					t.chrome ? n() : setTimeout(n, u)
				}, d = function(t, e, i) {
					e = [].concat(e);
					for (var n = e.length; n--;) {
						var r = t["on" + e[n]];
						if ("function" == typeof r) try {
							r.call(t, i || t)
						} catch (o) {
							c(o)
						}
					}
				}, p = function(t) {
					return /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type) ? new Blob(["\ufeff", t], {
						type: t.type
					}) : t
				}, g = function(e, c) {
					e = p(e);
					var u, g, v, m = this,
						b = e.type,
						y = !1,
						_ = function() {
							d(m, "writestart progress write writeend".split(" "))
						}, w = function() {
							if ((y || !u) && (u = i().createObjectURL(e)), g) g.location.href = u;
							else {
								var n = t.open(u, "_blank");
								n || (t.location.href = u)
							}
							m.readyState = m.DONE, _(), f(u)
						}, x = function(t) {
							return function() {
								return m.readyState !== m.DONE ? t.apply(this, arguments) : void 0
							}
						}, S = {
							create: !0,
							exclusive: !1
						};
					return m.readyState = m.INIT, c || (c = "download"), r ? (u = i().createObjectURL(e), n.href = u, n.download = c, o(n), m.readyState = m.DONE, _(), void f(u)) : (t.chrome && b && b !== h && (v = e.slice || e.webkitSlice, e = v.call(e, 0, e.size, h), y = !0), s && "download" !== c && (c += ".download"), (b === h || s) && (g = t), a ? (l += e.size, void a(t.TEMPORARY, l, x(function(t) {
						t.root.getDirectory("saved", S, x(function(t) {
							var i = function() {
								t.getFile(c, S, x(function(t) {
									t.createWriter(x(function(i) {
										i.onwriteend = function(e) {
											g.location.href = t.toURL(), m.readyState = m.DONE, d(m, "writeend", e), f(t)
										}, i.onerror = function() {
											var t = i.error;
											t.code !== t.ABORT_ERR && w()
										}, "writestart progress write abort".split(" ").forEach(function(t) {
											i["on" + t] = m["on" + t]
										}), i.write(e), m.abort = function() {
											i.abort(), m.readyState = m.DONE
										}, m.readyState = m.WRITING
									}), w)
								}), w)
							};
							t.getFile(c, {
								create: !1
							}, x(function(t) {
								t.remove(), i()
							}), x(function(t) {
								t.code === t.NOT_FOUND_ERR ? i() : w()
							}))
						}), w)
					}), w)) : void w())
				}, v = g.prototype,
				m = function(t, e) {
					return new g(t, e)
				};
			return "undefined" != typeof navigator && navigator.msSaveOrOpenBlob ? function(t, e) {
				return navigator.msSaveOrOpenBlob(p(t), e)
			} : (v.abort = function() {
				var t = this;
				t.readyState = t.DONE, d(t, "abort")
			}, v.readyState = v.INIT = 0, v.WRITING = 1, v.DONE = 2, v.error = v.onwritestart = v.onprogress = v.onwrite = v.onabort = v.onerror = v.onwriteend = null, m)
		}
	}("undefined" != typeof self && self || "undefined" != typeof window && window || this.content);
"undefined" != typeof module && module.exports ? module.exports.saveAs = saveAs : "undefined" != typeof define && null !== define && null != define.amd && define([], function() {
	return saveAs
}),
function(t) {
	if ("function" == typeof define && define.amd) define([], t);
	else if ("object" == typeof exports) {
		var e = require("fs");
		module.exports = t(), module.exports.css = function() {
			return e.readFileSync(__dirname + "/nouislider.min.css", "utf8")
		}
	} else window.noUiSlider = t()
}(function() {
	"use strict";

	function t(t) {
		return t.filter(function(t) {
			return this[t] ? !1 : this[t] = !0
		}, {})
	}
	function e(t, e) {
		return Math.round(t / e) * e
	}
	function i(t) {
		var e = t.getBoundingClientRect(),
			i = t.ownerDocument,
			n = i.defaultView || i.parentWindow,
			r = i.documentElement,
			o = n.pageXOffset;
		return /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) && (o = 0), {
			top: e.top + n.pageYOffset - r.clientTop,
			left: e.left + o - r.clientLeft
		}
	}
	function n(t) {
		return "number" == typeof t && !isNaN(t) && isFinite(t)
	}
	function r(t) {
		var e = Math.pow(10, 7);
		return Number((Math.round(t * e) / e).toFixed(7))
	}
	function o(t, e, i) {
		h(t, e), setTimeout(function() {
			l(t, e)
		}, i)
	}
	function s(t) {
		return Math.max(Math.min(t, 100), 0)
	}
	function a(t) {
		return Array.isArray(t) ? t : [t]
	}
	function c(t) {
		var e = t.split(".");
		return e.length > 1 ? e[1].length : 0
	}
	function h(t, e) {
		t.classList ? t.classList.add(e) : t.className += " " + e
	}
	function l(t, e) {
		t.classList ? t.classList.remove(e) : t.className = t.className.replace(new RegExp("(^|\\b)" + e.split(" ").join("|") + "(\\b|$)", "gi"), " ")
	}
	function u(t, e) {
		t.classList ? t.classList.contains(e) : new RegExp("(^| )" + e + "( |$)", "gi").test(t.className)
	}
	function f(t, e) {
		return 100 / (e - t)
	}
	function d(t, e) {
		return 100 * e / (t[1] - t[0])
	}
	function p(t, e) {
		return d(t, t[0] < 0 ? e + Math.abs(t[0]) : e - t[0])
	}
	function g(t, e) {
		return e * (t[1] - t[0]) / 100 + t[0]
	}
	function v(t, e) {
		for (var i = 1; t >= e[i];) i += 1;
		return i
	}
	function m(t, e, i) {
		if (i >= t.slice(-1)[0]) return 100;
		var n, r, o, s, a = v(i, t);
		return n = t[a - 1], r = t[a], o = e[a - 1], s = e[a], o + p([n, r], i) / f(o, s)
	}
	function b(t, e, i) {
		if (i >= 100) return t.slice(-1)[0];
		var n, r, o, s, a = v(i, e);
		return n = t[a - 1], r = t[a], o = e[a - 1], s = e[a], g([n, r], (i - o) * f(o, s))
	}
	function y(t, i, n, r) {
		if (100 === r) return r;
		var o, s, a = v(r, t);
		return n ? (o = t[a - 1], s = t[a], r - o > (s - o) / 2 ? s : o) : i[a - 1] ? t[a - 1] + e(r - t[a - 1], i[a - 1]) : r
	}
	function _(t, e, i) {
		var r;
		if ("number" == typeof e && (e = [e]), "[object Array]" !== Object.prototype.toString.call(e)) throw new Error("noUiSlider: 'range' contains invalid value.");
		if (r = "min" === t ? 0 : "max" === t ? 100 : parseFloat(t), !n(r) || !n(e[0])) throw new Error("noUiSlider: 'range' value isn't numeric.");
		i.xPct.push(r), i.xVal.push(e[0]), r ? i.xSteps.push(isNaN(e[1]) ? !1 : e[1]) : isNaN(e[1]) || (i.xSteps[0] = e[1])
	}
	function w(t, e, i) {
		return e ? void(i.xSteps[t] = d([i.xVal[t], i.xVal[t + 1]], e) / f(i.xPct[t], i.xPct[t + 1])) : !0
	}
	function x(t, e, i, n) {
		this.xPct = [], this.xVal = [], this.xSteps = [n || !1], this.xNumSteps = [!1], this.snap = e, this.direction = i;
		var r, o = [];
		for (r in t) t.hasOwnProperty(r) && o.push([t[r], r]);
		for (o.sort(function(t, e) {
			return t[0] - e[0]
		}), r = 0; r < o.length; r++) _(o[r][1], o[r][0], this);
		for (this.xNumSteps = this.xSteps.slice(0), r = 0; r < this.xNumSteps.length; r++) w(r, this.xNumSteps[r], this)
	}
	function S(t, e) {
		if (!n(e)) throw new Error("noUiSlider: 'step' is not numeric.");
		t.singleStep = e
	}
	function C(t, e) {
		if ("object" != typeof e || Array.isArray(e)) throw new Error("noUiSlider: 'range' is not an object.");
		if (void 0 === e.min || void 0 === e.max) throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
		t.spectrum = new x(e, t.snap, t.dir, t.singleStep)
	}
	function k(t, e) {
		if (e = a(e), !Array.isArray(e) || !e.length || e.length > 2) throw new Error("noUiSlider: 'start' option is incorrect.");
		t.handles = e.length, t.start = e
	}
	function T(t, e) {
		if (t.snap = e, "boolean" != typeof e) throw new Error("noUiSlider: 'snap' option must be a boolean.")
	}
	function E(t, e) {
		if (t.animate = e, "boolean" != typeof e) throw new Error("noUiSlider: 'animate' option must be a boolean.")
	}
	function O(t, e) {
		if ("lower" === e && 1 === t.handles) t.connect = 1;
		else if ("upper" === e && 1 === t.handles) t.connect = 2;
		else if (e === !0 && 2 === t.handles) t.connect = 3;
		else {
			if (e !== !1) throw new Error("noUiSlider: 'connect' option doesn't match handle count.");
			t.connect = 0
		}
	}
	function j(t, e) {
		switch (e) {
			case "horizontal":
				t.ort = 0;
				break;
			case "vertical":
				t.ort = 1;
				break;
			default:
				throw new Error("noUiSlider: 'orientation' option is invalid.")
		}
	}
	function A(t, e) {
		if (!n(e)) throw new Error("noUiSlider: 'margin' option must be numeric.");
		if (t.margin = t.spectrum.getMargin(e), !t.margin) throw new Error("noUiSlider: 'margin' option is only supported on linear sliders.")
	}
	function I(t, e) {
		if (!n(e)) throw new Error("noUiSlider: 'limit' option must be numeric.");
		if (t.limit = t.spectrum.getMargin(e), !t.limit) throw new Error("noUiSlider: 'limit' option is only supported on linear sliders.")
	}
	function P(t, e) {
		switch (e) {
			case "ltr":
				t.dir = 0;
				break;
			case "rtl":
				t.dir = 1, t.connect = [0, 2, 1, 3][t.connect];
				break;
			default:
				throw new Error("noUiSlider: 'direction' option was not recognized.")
		}
	}
	function L(t, e) {
		if ("string" != typeof e) throw new Error("noUiSlider: 'behaviour' must be a string containing options.");
		var i = e.indexOf("tap") >= 0,
			n = e.indexOf("drag") >= 0,
			r = e.indexOf("fixed") >= 0,
			o = e.indexOf("snap") >= 0;
		t.events = {
			tap: i || o,
			drag: n,
			fixed: r,
			snap: o
		}
	}
	function M(t, e) {
		if (t.format = e, "function" == typeof e.to && "function" == typeof e.from) return !0;
		throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.")
	}
	function D(t) {
		var e, i = {
			margin: 0,
			limit: 0,
			animate: !0,
			format: H
		};
		e = {
			step: {
				r: !1,
				t: S
			},
			start: {
				r: !0,
				t: k
			},
			connect: {
				r: !0,
				t: O
			},
			direction: {
				r: !0,
				t: P
			},
			snap: {
				r: !1,
				t: T
			},
			animate: {
				r: !1,
				t: E
			},
			range: {
				r: !0,
				t: C
			},
			orientation: {
				r: !1,
				t: j
			},
			margin: {
				r: !1,
				t: A
			},
			limit: {
				r: !1,
				t: I
			},
			behaviour: {
				r: !0,
				t: L
			},
			format: {
				r: !1,
				t: M
			}
		};
		var n = {
			connect: !1,
			direction: "ltr",
			behaviour: "tap",
			orientation: "horizontal"
		};
		return Object.keys(n).forEach(function(e) {
			void 0 === t[e] && (t[e] = n[e])
		}), Object.keys(e).forEach(function(n) {
			var r = e[n];
			if (void 0 === t[n]) {
				if (r.r) throw new Error("noUiSlider: '" + n + "' is required.");
				return !0
			}
			r.t(i, t[n])
		}), i.pips = t.pips, i.style = i.ort ? "top" : "left", i
	}
	function R(t, e, i) {
		var n = t + e[0],
			r = t + e[1];
		return i ? (0 > n && (r += Math.abs(n)), r > 100 && (n -= r - 100), [s(n), s(r)]) : [n, r]
	}
	function F(t) {
		t.preventDefault();
		var e, i, n = 0 === t.type.indexOf("touch"),
			r = 0 === t.type.indexOf("mouse"),
			o = 0 === t.type.indexOf("pointer"),
			s = t;
		return 0 === t.type.indexOf("MSPointer") && (o = !0), n && (e = t.changedTouches[0].pageX, i = t.changedTouches[0].pageY), (r || o) && (e = t.clientX + window.pageXOffset, i = t.clientY + window.pageYOffset), s.points = [e, i], s.cursor = r || o, s
	}
	function B(t, e) {
		var i = document.createElement("div"),
			n = document.createElement("div"),
			r = ["-lower", "-upper"];
		return t && r.reverse(), h(n, G[3]), h(n, G[3] + r[e]), h(i, G[2]), i.appendChild(n), i
	}
	function U(t, e, i) {
		switch (t) {
			case 1:
				h(e, G[7]), h(i[0], G[6]);
				break;
			case 3:
				h(i[1], G[6]);
			case 2:
				h(i[0], G[7]);
			case 0:
				h(e, G[6])
		}
	}
	function z(t, e, i) {
		var n, r = [];
		for (n = 0; t > n; n += 1) r.push(i.appendChild(B(e, n)));
		return r
	}
	function N(t, e, i) {
		h(i, G[0]), h(i, G[8 + t]), h(i, G[4 + e]);
		var n = document.createElement("div");
		return h(n, G[1]), i.appendChild(n), n
	}
	function Y(e, n) {
		function r(t, e, i) {
			if ("range" === t || "steps" === t) return B.xVal;
			if ("count" === t) {
				var n, r = 100 / (e - 1),
					o = 0;
				for (e = [];
				(n = o++ * r) <= 100;) e.push(n);
				t = "positions"
			}
			return "positions" === t ? e.map(function(t) {
				return B.fromStepping(i ? B.getStep(t) : t)
			}) : "values" === t ? i ? e.map(function(t) {
				return B.fromStepping(B.getStep(B.toStepping(t)))
			}) : e : void 0
		}
		function f(e, i, n) {
			var r = B.direction,
				o = {}, s = B.xVal[0],
				a = B.xVal[B.xVal.length - 1],
				c = !1,
				h = !1,
				l = 0;
			return B.direction = 0, n = t(n.slice().sort(function(t, e) {
				return t - e
			})), n[0] !== s && (n.unshift(s), c = !0), n[n.length - 1] !== a && (n.push(a), h = !0), n.forEach(function(t, r) {
				var s, a, u, f, d, p, g, v, m, b, y = t,
					_ = n[r + 1];
				if ("steps" === i && (s = B.xNumSteps[r]), s || (s = _ - y), y !== !1 && void 0 !== _) for (a = y; _ >= a; a += s) {
					for (f = B.toStepping(a), d = f - l, v = d / e, m = Math.round(v), b = d / m, u = 1; m >= u; u += 1) p = l + u * b, o[p.toFixed(5)] = ["x", 0];
					g = n.indexOf(a) > -1 ? 1 : "steps" === i ? 2 : 0, !r && c && (g = 0), a === _ && h || (o[f.toFixed(5)] = [a, g]), l = f
				}
			}), B.direction = r, o
		}
		function d(t, e, i) {
			function r(t) {
				return ["-normal", "-large", "-sub"][t]
			}
			function o(t, e, i) {
				return 'class="' + e + " " + e + "-" + a + " " + e + r(i[1]) + '" style="' + n.style + ": " + t + '%"'
			}
			function s(t, n) {
				B.direction && (t = 100 - t), n[1] = n[1] && e ? e(n[0], n[1]) : n[1], c.innerHTML += "<div " + o(t, "noUi-marker", n) + "></div>", n[1] && (c.innerHTML += "<div " + o(t, "noUi-value", n) + ">" + i.to(n[0]) + "</div>")
			}
			var a = ["horizontal", "vertical"][n.ort],
				c = document.createElement("div");
			return h(c, "noUi-pips"), h(c, "noUi-pips-" + a), Object.keys(t).forEach(function(e) {
				s(e, t[e])
			}), c
		}
		function p(t) {
			var e = t.mode,
				i = t.density || 1,
				n = t.filter || !1,
				o = t.values || !1,
				s = t.stepped || !1,
				a = r(e, o, s),
				c = f(i, e, a),
				h = t.format || {
					to: Math.round
				};
			return M.appendChild(d(c, n, h))
		}
		function g() {
			return P["offset" + ["Width", "Height"][n.ort]]
		}
		function v(t, e) {
			void 0 !== e && (e = Math.abs(e - n.dir)), Object.keys(X).forEach(function(i) {
				var n = i.split(".")[0];
				t === n && X[i].forEach(function(t) {
					t(a(E()), e, m(Array.prototype.slice.call(Y)))
				})
			})
		}
		function m(t) {
			return 1 === t.length ? t[0] : n.dir ? t.reverse() : t
		}
		function b(t, e, i, r) {
			var o = function(e) {
				return M.hasAttribute("disabled") ? !1 : u(M, G[14]) ? !1 : (e = F(e), t === W.start && void 0 !== e.buttons && e.buttons > 1 ? !1 : (e.calcPoint = e.points[n.ort], void i(e, r)))
			}, s = [];
			return t.split(" ").forEach(function(t) {
				e.addEventListener(t, o, !1), s.push([t, o])
			}), s
		}
		function y(t, e) {
			var i, n, r = e.handles || L,
				o = !1,
				s = 100 * (t.calcPoint - e.start) / g(),
				a = r[0] === L[0] ? 0 : 1;
			if (i = R(s, e.positions, r.length > 1), o = C(r[0], i[a], 1 === r.length), r.length > 1) {
				if (o = C(r[1], i[a ? 0 : 1], !1) || o) for (n = 0; n < e.handles.length; n++) v("slide", n)
			} else o && v("slide", a)
		}
		function _(t, e) {
			var i = P.getElementsByClassName(G[15]),
				n = e.handles[0] === L[0] ? 0 : 1;
			i.length && l(i[0], G[15]), t.cursor && (document.body.style.cursor = "", document.body.removeEventListener("selectstart", document.body.noUiListener));
			var r = document.documentElement;
			r.noUiListeners.forEach(function(t) {
				r.removeEventListener(t[0], t[1])
			}), l(M, G[12]), v("set", n), v("change", n)
		}
		function w(t, e) {
			var i = document.documentElement;
			if (1 === e.handles.length && (h(e.handles[0].children[0], G[15]), e.handles[0].hasAttribute("disabled"))) return !1;
			t.stopPropagation();
			var n = b(W.move, i, y, {
				start: t.calcPoint,
				handles: e.handles,
				positions: [D[0], D[L.length - 1]]
			}),
				r = b(W.end, i, _, {
					handles: e.handles
				});
			if (i.noUiListeners = n.concat(r), t.cursor) {
				document.body.style.cursor = getComputedStyle(t.target).cursor, L.length > 1 && h(M, G[12]);
				var o = function() {
					return !1
				};
				document.body.noUiListener = o, document.body.addEventListener("selectstart", o, !1)
			}
		}
		function x(t) {
			var e, r, s = t.calcPoint,
				a = 0;
			return t.stopPropagation(), L.forEach(function(t) {
				a += i(t)[n.style]
			}), e = a / 2 > s || 1 === L.length ? 0 : 1, s -= i(P)[n.style], r = 100 * s / g(), n.events.snap || o(M, G[14], 300), L[e].hasAttribute("disabled") ? !1 : (C(L[e], r), v("slide", e), v("set", e), v("change", e), void(n.events.snap && w(t, {
				handles: [L[a]]
			})))
		}
		function S(t) {
			var e, i;
			if (!t.fixed) for (e = 0; e < L.length; e += 1) b(W.start, L[e].children[0], w, {
				handles: [L[e]]
			});
			t.tap && b(W.start, P, x, {
				handles: L
			}), t.drag && (i = [P.getElementsByClassName(G[7])[0]], h(i[0], G[10]), t.fixed && i.push(L[i[0] === L[0] ? 1 : 0].children[0]), i.forEach(function(t) {
				b(W.start, t, w, {
					handles: L
				})
			}))
		}
		function C(t, e, i) {
			var r = t !== L[0] ? 1 : 0,
				o = D[0] + n.margin,
				a = D[1] - n.margin,
				c = D[0] + n.limit,
				u = D[1] - n.limit;
			return L.length > 1 && (e = r ? Math.max(e, o) : Math.min(e, a)), i !== !1 && n.limit && L.length > 1 && (e = r ? Math.min(e, c) : Math.max(e, u)), e = B.getStep(e), e = s(parseFloat(e.toFixed(7))), e === D[r] ? !1 : (t.style[n.style] = e + "%", t.previousSibling || (l(t, G[17]), e > 50 && h(t, G[17])), D[r] = e, Y[r] = B.fromStepping(e), v("update", r), !0)
		}
		function k(t, e) {
			var i, r, o;
			for (n.limit && (t += 1), i = 0; t > i; i += 1) r = i % 2, o = e[r], null !== o && o !== !1 && ("number" == typeof o && (o = String(o)), o = n.format.from(o), (o === !1 || isNaN(o) || C(L[r], B.toStepping(o), i === 3 - n.dir) === !1) && v("update", r))
		}
		function T(t) {
			var e, i, r = a(t);
			for (n.dir && n.handles > 1 && r.reverse(), n.animate && -1 !== D[0] && o(M, G[14], 300), e = L.length > 1 ? 3 : 1, 1 === r.length && (e = 1), k(e, r), i = 0; i < L.length; i++) v("set", i)
		}
		function E() {
			var t, e = [];
			for (t = 0; t < n.handles; t += 1) e[t] = n.format.to(Y[t]);
			return m(e)
		}
		function O() {
			G.forEach(function(t) {
				t && l(M, t)
			}), M.innerHTML = "", delete M.noUiSlider
		}
		function j() {
			var t = D.map(function(t, e) {
				var i = B.getApplicableStep(t),
					n = c(String(i[2])),
					r = Y[e],
					o = 100 === t ? null : i[2],
					s = Number((r - i[2]).toFixed(n)),
					a = 0 === t ? null : s >= i[1] ? i[2] : i[0] || !1;
				return [a, o]
			});
			return m(t)
		}
		function A(t, e) {
			X[t] = X[t] || [], X[t].push(e), "update" === t.split(".")[0] && L.forEach(function(t, e) {
				v("update", e)
			})
		}
		function I(t) {
			var e = t.split(".")[0],
				i = t.substring(e.length);
			Object.keys(X).forEach(function(t) {
				var n = t.split(".")[0],
					r = t.substring(n.length);
				e && e !== n || i && i !== r || delete X[t]
			})
		}
		var P, L, M = e,
			D = [-1, -1],
			B = n.spectrum,
			Y = [],
			X = {};
		if (M.noUiSlider) throw new Error("Slider was already initialized.");
		return P = N(n.dir, n.ort, M), L = z(n.handles, n.dir, P), U(n.connect, M, L), S(n.events), n.pips && p(n.pips), {
			destroy: O,
			steps: j,
			on: A,
			off: I,
			get: E,
			set: T
		}
	}
	function X(t, e) {
		if (!t.nodeName) throw new Error("noUiSlider.create requires a single element.");
		var i = D(e, t),
			n = Y(t, i);
		n.set(i.start), t.noUiSlider = n
	}
	var W = window.navigator.pointerEnabled ? {
		start: "pointerdown",
		move: "pointermove",
		end: "pointerup"
	} : window.navigator.msPointerEnabled ? {
		start: "MSPointerDown",
		move: "MSPointerMove",
		end: "MSPointerUp"
	} : {
		start: "mousedown touchstart",
		move: "mousemove touchmove",
		end: "mouseup touchend"
	}, G = ["noUi-target", "noUi-base", "noUi-origin", "noUi-handle", "noUi-horizontal", "noUi-vertical", "noUi-background", "noUi-connect", "noUi-ltr", "noUi-rtl", "noUi-dragable", "", "noUi-state-drag", "", "noUi-state-tap", "noUi-active", "", "noUi-stacking"];
	x.prototype.getMargin = function(t) {
		return 2 === this.xPct.length ? d(this.xVal, t) : !1
	}, x.prototype.toStepping = function(t) {
		return t = m(this.xVal, this.xPct, t), this.direction && (t = 100 - t), t
	}, x.prototype.fromStepping = function(t) {
		return this.direction && (t = 100 - t), r(b(this.xVal, this.xPct, t))
	}, x.prototype.getStep = function(t) {
		return this.direction && (t = 100 - t), t = y(this.xPct, this.xSteps, this.snap, t), this.direction && (t = 100 - t), t
	}, x.prototype.getApplicableStep = function(t) {
		var e = v(t, this.xPct),
			i = 100 === t ? 2 : 1;
		return [this.xNumSteps[e - 2], this.xVal[e - i], this.xNumSteps[e - i]]
	}, x.prototype.convert = function(t) {
		return this.getStep(this.toStepping(t))
	};
	var H = {
		to: function(t) {
			return t.toFixed(2)
		},
		from: Number
	};
	return {
		create: X
	}
}), ! function(t) {
	"use strict";

	function e(t, i) {
		if (!(this instanceof e)) {
			var n = new e(t, i);
			return n.open(), n
		}
		this.id = e.id++, this.setup(t, i), this.chainCallbacks(e._callbackChain)
	}
	if ("undefined" == typeof t) return void("console" in window && window.console.info("Too much lightness, Featherlight needs jQuery."));
	var i = [],
		n = function(e) {
			return i = t.grep(i, function(t) {
				return t !== e && t.$instance.closest("body").length > 0
			})
		}, r = function(t, e) {
			var i = {}, n = new RegExp("^" + e + "([A-Z])(.*)");
			for (var r in t) {
				var o = r.match(n);
				if (o) {
					var s = (o[1] + o[2].replace(/([A-Z])/g, "-$1")).toLowerCase();
					i[s] = t[r]
				}
			}
			return i
		}, o = {
			keyup: "onKeyUp",
			resize: "onResize"
		}, s = function(i) {
			t.each(e.opened().reverse(), function() {
				return i.isDefaultPrevented() || !1 !== this[o[i.type]](i) ? void 0 : (i.preventDefault(), i.stopPropagation(), !1)
			})
		}, a = function(i) {
			if (i !== e._globalHandlerInstalled) {
				e._globalHandlerInstalled = i;
				var n = t.map(o, function(t, i) {
					return i + "." + e.prototype.namespace
				}).join(" ");
				t(window)[i ? "on" : "off"](n, s)
			}
		};
	e.prototype = {
		constructor: e,
		namespace: "featherlight",
		targetAttr: "data-featherlight",
		variant: null,
		resetCss: !1,
		background: null,
		openTrigger: "click",
		closeTrigger: "click",
		filter: null,
		root: "body",
		openSpeed: 250,
		closeSpeed: 250,
		closeOnClick: "background",
		closeOnEsc: !0,
		closeIcon: "&#10005;",
		loading: "",
		persist: !1,
		otherClose: null,
		beforeOpen: t.noop,
		beforeContent: t.noop,
		beforeClose: t.noop,
		afterOpen: t.noop,
		afterContent: t.noop,
		afterClose: t.noop,
		onKeyUp: t.noop,
		onResize: t.noop,
		type: null,
		contentFilters: ["jquery", "image", "html", "ajax", "iframe", "text"],
		setup: function(e, i) {
			"object" != typeof e || e instanceof t != 0 || i || (i = e, e = void 0);
			var n = t.extend(this, i, {
				target: e
			}),
				r = n.resetCss ? n.namespace + "-reset" : n.namespace,
				o = t(n.background || ['<div class="' + r + "-loading " + r + '">', '<div class="' + r + '-content">', '<span class="' + r + "-close-icon " + n.namespace + '-close">', n.closeIcon, "</span>", '<div class="' + n.namespace + '-inner">' + n.loading + "</div>", "</div>", "</div>"].join("")),
				s = "." + n.namespace + "-close" + (n.otherClose ? "," + n.otherClose : "");
			return n.$instance = o.clone().addClass(n.variant), n.$instance.on(n.closeTrigger + "." + n.namespace, function(e) {
				var i = t(e.target);
				("background" === n.closeOnClick && i.is("." + n.namespace) || "anywhere" === n.closeOnClick || i.closest(s).length) && (e.preventDefault(), n.close())
			}), this
		},
		getContent: function() {
			if (this.persist !== !1 && this.$content) return this.$content;
			var e = this,
				i = this.constructor.contentFilters,
				n = function(t) {
					return e.$currentTarget && e.$currentTarget.attr(t)
				}, r = n(e.targetAttr),
				o = e.target || r || "",
				s = i[e.type];
			if (!s && o in i && (s = i[o], o = e.target && r), o = o || n("href") || "", !s) for (var a in i) e[a] && (s = i[a], o = e[a]);
			if (!s) {
				var c = o;
				if (o = null, t.each(e.contentFilters, function() {
					return s = i[this], s.test && (o = s.test(c)), !o && s.regex && c.match && c.match(s.regex) && (o = c), !o
				}), !o) return "console" in window && window.console.error("Featherlight: no content filter found " + (c ? ' for "' + c + '"' : " (no target specified)")), !1
			}
			return s.process.call(e, o)
		},
		setContent: function(e) {
			var i = this;
			return (e.is("iframe") || t("iframe", e).length > 0) && i.$instance.addClass(i.namespace + "-iframe"), i.$instance.removeClass(i.namespace + "-loading"), i.$instance.find("." + i.namespace + "-inner").not(e).slice(1).remove().end().replaceWith(t.contains(i.$instance[0], e[0]) ? "" : e), i.$content = e.addClass(i.namespace + "-inner"), i
		},
		open: function(e) {
			var n = this;
			if (n.$instance.hide().appendTo(n.root), !(e && e.isDefaultPrevented() || n.beforeOpen(e) === !1)) {
				e && e.preventDefault();
				var r = n.getContent();
				if (r) return i.push(n), a(!0), n.$instance.fadeIn(n.openSpeed), n.beforeContent(e), t.when(r).always(function(t) {
					n.setContent(t), n.afterContent(e)
				}).then(n.$instance.promise()).done(function() {
					n.afterOpen(e)
				})
			}
			return n.$instance.detach(), t.Deferred().reject().promise()
		},
		close: function(e) {
			var i = this,
				r = t.Deferred();
			return i.beforeClose(e) === !1 ? r.reject() : (0 === n(i).length && a(!1), i.$instance.fadeOut(i.closeSpeed, function() {
				i.$instance.detach(), i.afterClose(e), r.resolve()
			})), r.promise()
		},
		chainCallbacks: function(e) {
			for (var i in e) this[i] = t.proxy(e[i], this, t.proxy(this[i], this))
		}
	}, t.extend(e, {
		id: 0,
		autoBind: "[data-featherlight]",
		defaults: e.prototype,
		contentFilters: {
			jquery: {
				regex: /^[#.]\w/,
				test: function(e) {
					return e instanceof t && e
				},
				process: function(e) {
					return this.persist !== !1 ? t(e) : t(e).clone(!0)
				}
			},
			image: {
				regex: /\.(png|jpg|jpeg|gif|tiff|bmp)(\?\S*)?$/i,
				process: function(e) {
					var i = this,
						n = t.Deferred(),
						r = new Image,
						o = t('<img src="' + e + '" alt="" class="' + i.namespace + '-image" />');
					return r.onload = function() {
						o.naturalWidth = r.width, o.naturalHeight = r.height, n.resolve(o)
					}, r.onerror = function() {
						n.reject(o)
					}, r.src = e, n.promise()
				}
			},
			html: {
				regex: /^\s*<[\w!][^<]*>/,
				process: function(e) {
					return t(e)
				}
			},
			ajax: {
				regex: /./,
				process: function(e) {
					var i = t.Deferred(),
						n = t("<div></div>").load(e, function(t, e) {
							"error" !== e && i.resolve(n.contents()), i.fail()
						});
					return i.promise()
				}
			},
			iframe: {
				process: function(e) {
					var i = new t.Deferred,
						n = t("<iframe/>").hide().attr("src", e).css(r(this, "iframe")).on("load", function() {
							i.resolve(n.show())
						}).appendTo(this.$instance.find("." + this.namespace + "-content"));
					return i.promise()
				}
			},
			text: {
				process: function(e) {
					return t("<div>", {
						text: e
					})
				}
			}
		},
		functionAttributes: ["beforeOpen", "afterOpen", "beforeContent", "afterContent", "beforeClose", "afterClose"],
		readElementConfig: function(e, i) {
			var n = this,
				r = new RegExp("^data-" + i + "-(.*)"),
				o = {};
			return e && e.attributes && t.each(e.attributes, function() {
				var e = this.name.match(r);
				if (e) {
					var i = this.value,
						s = t.camelCase(e[1]);
					if (t.inArray(s, n.functionAttributes) >= 0) i = new Function(i);
					else try {
						i = t.parseJSON(i)
					} catch (a) {}
					o[s] = i
				}
			}), o
		},
		extend: function(e, i) {
			var n = function() {
				this.constructor = e
			};
			return n.prototype = this.prototype, e.prototype = new n, e.__super__ = this.prototype, t.extend(e, this, i), e.defaults = e.prototype, e
		},
		attach: function(e, i, n) {
			var r = this;
			"object" != typeof i || i instanceof t != 0 || n || (n = i, i = void 0), n = t.extend({}, n);
			var o, s = n.namespace || r.defaults.namespace,
				a = t.extend({}, r.defaults, r.readElementConfig(e[0], s), n);
			return e.on(a.openTrigger + "." + a.namespace, a.filter, function(s) {
				var c = t.extend({
					$source: e,
					$currentTarget: t(this)
				}, r.readElementConfig(e[0], a.namespace), r.readElementConfig(this, a.namespace), n),
					h = o || t(this).data("featherlight-persisted") || new r(i, c);
				"shared" === h.persist ? o = h : h.persist !== !1 && t(this).data("featherlight-persisted", h), h.open(s)
			}), e
		},
		current: function() {
			var t = this.opened();
			return t[t.length - 1] || null
		},
		opened: function() {
			var e = this;
			return n(), t.grep(i, function(t) {
				return t instanceof e
			})
		},
		close: function() {
			var t = this.current();
			return t ? t.close() : void 0
		},
		_onReady: function() {
			var e = this;
			e.autoBind && (e.attach(t(document), {
				filter: e.autoBind
			}), t(e.autoBind).filter("[data-featherlight-filter]").each(function() {
				e.attach(t(this))
			}))
		},
		_callbackChain: {
			onKeyUp: function(t, e) {
				return 27 === e.keyCode ? (this.closeOnEsc && this.$instance.find("." + this.namespace + "-close:first").click(), !1) : t(e)
			},
			onResize: function(t, e) {
				if (this.$content.naturalWidth) {
					var i = this.$content.naturalWidth,
						n = this.$content.naturalHeight;
					this.$content.css("width", "").css("height", "");
					var r = Math.max(i / parseInt(this.$content.parent().css("width"), 10), n / parseInt(this.$content.parent().css("height"), 10));
					r > 1 && this.$content.css("width", "" + i / r + "px").css("height", "" + n / r + "px")
				}
				return t(e)
			},
			afterContent: function(t, e) {
				var i = t(e);
				return this.onResize(e), i
			}
		}
	}), t.featherlight = e, t.fn.featherlight = function(t, i) {
		return e.attach(this, t, i)
	}, t(document).ready(function() {
		e._onReady()
	})
}(jQuery),
function(t) {
	if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
	else if ("function" == typeof define && define.amd) define([], t);
	else {
		var e;
		e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, e.inkjet = t()
	}
}(function() {
	return function t(e, i, n) {
		function r(s, a) {
			if (!i[s]) {
				if (!e[s]) {
					var c = "function" == typeof require && require;
					if (!a && c) return c(s, !0);
					if (o) return o(s, !0);
					var h = new Error("Cannot find module '" + s + "'");
					throw h.code = "MODULE_NOT_FOUND", h
				}
				var l = i[s] = {
					exports: {}
				};
				e[s][0].call(l.exports, function(t) {
					var i = e[s][1][t];
					return r(i ? i : t)
				}, l, l.exports, t, e, i, n)
			}
			return i[s].exports
		}
		for (var o = "function" == typeof require && require, s = 0; s < n.length; s++) r(n[s]);
		return r
	}({
		1: [function(t, e, i) {
			"use strict";

			function n(e, i, n) {
				"function" == typeof i && (n = i, i = {});
				try {
					if (e = h.toUint8Array(e), c) {
						var r = t("webworkify")(v);
						r.onmessage = function(t) {
							var e = t.data,
								i = e.err ? new Error(e.err) : void 0;
							n(i, e.result)
						};
						var o = {
							buf: e,
							options: i
						};
						i.transferable ? r.postMessage(o, [e]) : r.postMessage(o)
					} else u(e, i, n)
				} catch (s) {
					n(s)
				}
			}
			function r(e, i, n) {
				"function" == typeof i && (n = i, i = {});
				try {
					if (e = h.toArrayLike(e), !i.hasOwnProperty("width") || !i.hasOwnProperty("height")) return n(new Error("Provide width & height of the buffer"));
					if (c) {
						var r = t("webworkify")(m);
						r.onmessage = function(t) {
							var e = t.data,
								i = e.err ? new Error(e.err) : void 0;
							n(i, e.result)
						};
						var o = {
							buf: e,
							options: i
						};
						i.transferable ? r.postMessage(o, [e]) : r.postMessage(o)
					} else f(e, i, n)
				} catch (s) {
					n(s)
				}
			}
			function o(e, i, n) {
				"function" == typeof i && (n = i, i = {});
				try {
					if (e = h.toArrayBuffer(e), c) {
						var r = t("webworkify")(g);
						r.onmessage = function(t) {
							var e = t.data,
								i = e.err ? new Error(e.err) : void 0;
							n(i, e.result)
						};
						var o = {
							buf: e
						};
						i.transferable ? r.postMessage(o, [e]) : r.postMessage(o)
					} else l(e, i, n)
				} catch (s) {
					n(s)
				}
			}
			function s(t, e) {
				try {
					t = h.toBuffer(t), d.lookup(t, e)
				} catch (i) {
					e(i)
				}
			}
			function a(t, e) {
				try {
					t = h.toBuffer(t), p.collect(t, e)
				} catch (i) {
					e(i)
				}
			}
			var c = t("./lib/has-worker").HAS_WORKER,
				h = t("./lib/buffer-utils"),
				l = t("./lib/exif"),
				u = t("./lib/decode"),
				f = t("./lib/encode"),
				d = t("./lib/magic"),
				p = t("./lib/info"),
				g = t("./lib/exif-worker"),
				v = t("./lib/decode-worker"),
				m = t("./lib/encode-worker");
			e.exports.decode = n, e.exports.encode = r, e.exports.exif = o, e.exports.magic = s, e.exports.info = a
		}, {
			"./lib/buffer-utils": 5,
			"./lib/decode": 7,
			"./lib/decode-worker": 6,
			"./lib/encode": 9,
			"./lib/encode-worker": 8,
			"./lib/exif": 11,
			"./lib/exif-worker": 10,
			"./lib/has-worker": 12,
			"./lib/info": 13,
			"./lib/magic": 15,
			webworkify: 70
		}],
		2: [function(t, e, i) {
			(function() {
				("undefined" != typeof i && null !== i ? i : this).ExifReader = function() {
					function t() {
						var t = this;
						this._getTagValueAt = {
							1: function(e) {
								return t._getByteAt(e)
							},
							2: function(e) {
								return t._getAsciiAt(e)
							},
							3: function(e) {
								return t._getShortAt(e)
							},
							4: function(e) {
								return t._getLongAt(e)
							},
							5: function(e) {
								return t._getRationalAt(e)
							},
							7: function(e) {
								return t._getUndefinedAt(e)
							},
							9: function(e) {
								return t._getSlongAt(e)
							},
							10: function(e) {
								return t._getSrationalAt(e)
							}
						}, this._tiffHeaderOffset = 0
					}
					return t.prototype._MIN_DATA_BUFFER_LENGTH = 2, t.prototype._JPEG_ID_SIZE = 2, t.prototype._JPEG_ID = 65496, t.prototype._APP_MARKER_SIZE = 2, t.prototype._APP0_MARKER = 65504, t.prototype._APP1_MARKER = 65505, t.prototype._APP15_MARKER = 65519, t.prototype._APP_ID_OFFSET = 4, t.prototype._BYTES_Exif = 1165519206, t.prototype._TIFF_HEADER_OFFSET = 10, t.prototype._BYTE_ORDER_BIG_ENDIAN = 18761, t.prototype._BYTE_ORDER_LITTLE_ENDIAN = 19789, t.prototype.load = function(t) {
						return this.loadView(new DataView(t))
					}, t.prototype.loadView = function(t) {
						return this._dataView = t, this._tags = {}, this._checkImageHeader(), this._readTags(), this._dataView = null
					}, t.prototype._checkImageHeader = function() {
						if (this._dataView.byteLength < this._MIN_DATA_BUFFER_LENGTH || this._dataView.getUint16(0, !1) !== this._JPEG_ID) throw new Error("Invalid image format");
						if (this._parseAppMarkers(this._dataView), !this._hasExifData()) throw new Error("No Exif data")
					}, t.prototype._parseAppMarkers = function(t) {
						var e, i, n;
						for (e = this._JPEG_ID_SIZE, n = [];;) {
							if (t.byteLength < e + this._APP_ID_OFFSET + 5) break;
							if (this._isApp1ExifMarker(t, e)) i = t.getUint16(e + this._APP_MARKER_SIZE, !1), this._tiffHeaderOffset = e + this._TIFF_HEADER_OFFSET;
							else {
								if (!this._isAppMarker(t, e)) break;
								i = t.getUint16(e + this._APP_MARKER_SIZE, !1)
							}
							n.push(e += this._APP_MARKER_SIZE + i)
						}
						return n
					}, t.prototype._isApp1ExifMarker = function(t, e) {
						return t.getUint16(e, !1) === this._APP1_MARKER && t.getUint32(e + this._APP_ID_OFFSET, !1) === this._BYTES_Exif && 0 === t.getUint8(e + this._APP_ID_OFFSET + 4, !1)
					}, t.prototype._isAppMarker = function(t, e) {
						var i;
						return i = t.getUint16(e, !1), i >= this._APP0_MARKER && i <= this._APP15_MARKER
					}, t.prototype._hasExifData = function() {
						return 0 !== this._tiffHeaderOffset
					}, t.prototype._readTags = function() {
						return this._setByteOrder(), this._read0thIfd(), this._readExifIfd(), this._readGpsIfd(), this._readInteroperabilityIfd()
					}, t.prototype._setByteOrder = function() {
						if (this._dataView.getUint16(this._tiffHeaderOffset) === this._BYTE_ORDER_BIG_ENDIAN) return this._littleEndian = !0;
						if (this._dataView.getUint16(this._tiffHeaderOffset) === this._BYTE_ORDER_LITTLE_ENDIAN) return this._littleEndian = !1;
						throw new Error("Illegal byte order value. Faulty image.")
					}, t.prototype._read0thIfd = function() {
						var t;
						return t = this._getIfdOffset(), this._readIfd("0th", t)
					}, t.prototype._getIfdOffset = function() {
						return this._tiffHeaderOffset + this._getLongAt(this._tiffHeaderOffset + 4)
					}, t.prototype._readExifIfd = function() {
						var t;
						return null != this._tags["Exif IFD Pointer"] ? (t = this._tiffHeaderOffset + this._tags["Exif IFD Pointer"].value, this._readIfd("exif", t)) : void 0
					}, t.prototype._readGpsIfd = function() {
						var t;
						return null != this._tags["GPS Info IFD Pointer"] ? (t = this._tiffHeaderOffset + this._tags["GPS Info IFD Pointer"].value, this._readIfd("gps", t)) : void 0
					}, t.prototype._readInteroperabilityIfd = function() {
						var t;
						return null != this._tags["Interoperability IFD Pointer"] ? (t = this._tiffHeaderOffset + this._tags["Interoperability IFD Pointer"].value, this._readIfd("interoperability", t)) : void 0
					}, t.prototype._readIfd = function(t, e) {
						var i, n, r, o, s;
						for (n = this._getShortAt(e), e += 2, s = [], i = o = 0; n >= 0 ? n > o : o > n; i = n >= 0 ? ++o : --o) r = this._readTag(t, e), void 0 !== r && (this._tags[r.name] = {
							value: r.value,
							description: r.description
						}), s.push(e += 12);
						return s
					}, t.prototype._readTag = function(t, e) {
						var i, n, r, o, s, a, c;
						return i = this._getShortAt(e), s = this._getShortAt(e + 2), n = this._getLongAt(e + 4), void 0 === this._typeSizes[s] ? void 0 : (this._typeSizes[s] * n <= 4 ? a = this._getTagValue(e + 8, s, n) : (c = this._getLongAt(e + 8), a = this._getTagValue(this._tiffHeaderOffset + c, s, n)), s === this._tagTypes.ASCII && (a = this._splitNullSeparatedAsciiString(a)), null != this._tagNames[t][i] ? (null != this._tagNames[t][i].name && null != this._tagNames[t][i].description ? (o = this._tagNames[t][i].name, r = this._tagNames[t][i].description(a)) : (o = this._tagNames[t][i], r = a instanceof Array ? a.join(", ") : a), {
							name: o,
							value: a,
							description: r
						}) : {
							name: "undefined-" + i,
							value: a,
							description: a
						})
					}, t.prototype._getTagValue = function(t, e, i) {
						var n, r, o;
						return r = function() {
							var r, s;
							for (s = [], o = r = 0; i >= 0 ? i > r : r > i; o = i >= 0 ? ++r : --r) n = this._getTagValueAt[e](t), t += this._typeSizes[e], s.push(n);
							return s
						}.call(this), 1 === r.length ? r = r[0] : e === this._tagTypes.ASCII && (r = this._getAsciiValue(r)), r
					}, t.prototype._getAsciiValue = function(t) {
						var e, i;
						return i = function() {
							var i, n, r;
							for (r = [], i = 0, n = t.length; n > i; i++) e = t[i], r.push(String.fromCharCode(e));
							return r
						}()
					}, t.prototype._getByteAt = function(t) {
						return this._dataView.getUint8(t)
					}, t.prototype._getAsciiAt = function(t) {
						return this._dataView.getUint8(t)
					}, t.prototype._getShortAt = function(t) {
						return this._dataView.getUint16(t, this._littleEndian)
					}, t.prototype._getLongAt = function(t) {
						return this._dataView.getUint32(t, this._littleEndian)
					}, t.prototype._getRationalAt = function(t) {
						return this._getLongAt(t) / this._getLongAt(t + 4)
					}, t.prototype._getUndefinedAt = function(t) {
						return this._getByteAt(t)
					}, t.prototype._getSlongAt = function(t) {
						return this._dataView.getInt32(t, this._littleEndian)
					}, t.prototype._getSrationalAt = function(t) {
						return this._getSlongAt(t) / this._getSlongAt(t + 4)
					}, t.prototype._splitNullSeparatedAsciiString = function(t) {
						var e, i, n, r, o;
						for (n = [], i = 0, r = 0, o = t.length; o > r; r++) e = t[r], "\x00" !== e ? (null == n[i] && (n[i] = ""), n[i] += e) : i++;
						return n
					}, t.prototype._typeSizes = {
						1: 1,
						2: 1,
						3: 2,
						4: 4,
						5: 8,
						7: 1,
						9: 4,
						10: 8
					}, t.prototype._tagTypes = {
						BYTE: 1,
						ASCII: 2,
						SHORT: 3,
						LONG: 4,
						RATIONAL: 5,
						UNDEFINED: 7,
						SLONG: 9,
						SRATIONAL: 10
					}, t.prototype._tagNames = {
						"0th": {
							256: "ImageWidth",
							257: "ImageLength",
							258: "BitsPerSample",
							259: "Compression",
							262: "PhotometricInterpretation",
							270: "ImageDescription",
							271: "Make",
							272: "Model",
							273: "StripOffsets",
							274: {
								name: "Orientation",
								description: function(t) {
									switch (t) {
										case 1:
											return "top-left";
										case 2:
											return "top-right";
										case 3:
											return "bottom-right";
										case 4:
											return "bottom-left";
										case 5:
											return "left-top";
										case 6:
											return "right-top";
										case 7:
											return "right-bottom";
										case 8:
											return "left-bottom";
										default:
											return "Undefined"
									}
								}
							},
							277: "SamplesPerPixel",
							278: "RowsPerStrip",
							279: "StripByteCounts",
							282: "XResolution",
							283: "YResolution",
							284: "PlanarConfiguration",
							296: {
								name: "ResolutionUnit",
								description: function(t) {
									switch (t) {
										case 2:
											return "inches";
										case 3:
											return "centimeters";
										default:
											return "Unknown"
									}
								}
							},
							301: "TransferFunction",
							305: "Software",
							306: "DateTime",
							315: "Artist",
							318: "WhitePoint",
							319: "PrimaryChromaticities",
							513: "JPEGInterchangeFormat",
							514: "JPEGInterchangeFormatLength",
							529: "YCbCrCoefficients",
							530: "YCbCrSubSampling",
							531: {
								name: "YCbCrPositioning",
								description: function(t) {
									switch (t) {
										case 1:
											return "centered";
										case 2:
											return "co-sited";
										default:
											return "undefied " + t
									}
								}
							},
							532: "ReferenceBlackWhite",
							33432: {
								name: "Copyright",
								description: function(t) {
									return t.join("; ")
								}
							},
							34665: "Exif IFD Pointer",
							34853: "GPS Info IFD Pointer"
						},
						exif: {
							33434: "ExposureTime",
							33437: "FNumber",
							34850: {
								name: "ExposureProgram",
								description: function(t) {
									switch (t) {
										case 0:
											return "Undefined";
										case 1:
											return "Manual";
										case 2:
											return "Normal program";
										case 3:
											return "Aperture priority";
										case 4:
											return "Shutter priority";
										case 5:
											return "Creative program";
										case 6:
											return "Action program";
										case 7:
											return "Portrait mode";
										case 8:
											return "Landscape mode";
										default:
											return "Unknown"
									}
								}
							},
							34852: "SpectralSensitivity",
							34855: "ISOSpeedRatings",
							34856: {
								name: "OECF",
								description: function(t) {
									return "[Raw OECF table data]"
								}
							},
							36864: {
								name: "ExifVersion",
								description: function(t) {
									var e, i, n, r;
									for (i = "", n = 0, r = t.length; r > n; n++) e = t[n], i += String.fromCharCode(e);
									return i
								}
							},
							36867: "DateTimeOriginal",
							36868: "DateTimeDigitized",
							37121: {
								name: "ComponentsConfiguration",
								description: function(t) {
									var e, i, n, r;
									for (i = "", n = 0, r = t.length; r > n; n++) switch (e = t[n]) {
										case 49:
											i += "Y";
											break;
										case 50:
											i += "Cb";
											break;
										case 51:
											i += "Cr";
											break;
										case 52:
											i += "R";
											break;
										case 53:
											i += "G";
											break;
										case 54:
											i += "B"
									}
									return i
								}
							},
							37122: "CompressedBitsPerPixel",
							37377: "ShutterSpeedValue",
							37378: "ApertureValue",
							37379: "BrightnessValue",
							37380: "ExposureBiasValue",
							37381: "MaxApertureValue",
							37382: "SubjectDistance",
							37383: {
								name: "MeteringMode",
								description: function(t) {
									switch (t) {
										case 1:
											return "Average";
										case 2:
											return "CenterWeightedAverage";
										case 3:
											return "Spot";
										case 4:
											return "MultiSpot";
										case 5:
											return "Pattern";
										case 6:
											return "Partial";
										case 255:
											return "Other";
										default:
											return "Unknown"
									}
								}
							},
							37384: {
								name: "LightSource",
								description: function(t) {
									switch (t) {
										case 1:
											return "Daylight";
										case 2:
											return "Fluorescent";
										case 3:
											return "Tungsten (incandescent light)";
										case 4:
											return "Flash";
										case 9:
											return "Fine weather";
										case 10:
											return "Cloudy weather";
										case 11:
											return "Shade";
										case 12:
											return "Daylight fluorescent (D 5700 – 7100K)";
										case 13:
											return "Day white fluorescent (N 4600 – 5400K)";
										case 14:
											return "Cool white fluorescent (W 3900 – 4500K)";
										case 15:
											return "White fluorescent (WW 3200 – 3700K)";
										case 17:
											return "Standard light A";
										case 18:
											return "Standard light B";
										case 19:
											return "Standard light C";
										case 20:
											return "D55";
										case 21:
											return "D65";
										case 22:
											return "D75";
										case 23:
											return "D50";
										case 24:
											return "ISO studio tungsten";
										case 255:
											return "Other light source";
										default:
											return "Unknown"
									}
								}
							},
							37385: {
								name: "Flash",
								description: function(t) {
									switch (t) {
										case 0:
											return "Flash did not fire";
										case 1:
											return "Flash fired";
										case 5:
											return "Strobe return light not detected";
										case 7:
											return "Strobe return light detected";
										case 9:
											return "Flash fired, compulsory flash mode";
										case 13:
											return "Flash fired, compulsory flash mode, return light not detected";
										case 15:
											return "Flash fired, compulsory flash mode, return light detected";
										case 16:
											return "Flash did not fire, compulsory flash mode";
										case 24:
											return "Flash did not fire, auto mode";
										case 25:
											return "Flash fired, auto mode";
										case 29:
											return "Flash fired, auto mode, return light not detected";
										case 31:
											return "Flash fired, auto mode, return light detected";
										case 32:
											return "No flash function";
										case 65:
											return "Flash fired, red-eye reduction mode";
										case 69:
											return "Flash fired, red-eye reduction mode, return light not detected";
										case 71:
											return "Flash fired, red-eye reduction mode, return light detected";
										case 73:
											return "Flash fired, compulsory flash mode, red-eye reduction mode";
										case 77:
											return "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected";
										case 79:
											return "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected";
										case 89:
											return "Flash fired, auto mode, red-eye reduction mode";
										case 93:
											return "Flash fired, auto mode, return light not detected, red-eye reduction mode";
										case 95:
											return "Flash fired, auto mode, return light detected, red-eye reduction mode";
										default:
											return "Unknown"
									}
								}
							},
							37386: "FocalLength",
							37396: {
								name: "SubjectArea",
								description: function(t) {
									switch (t.length) {
										case 2:
											return "Location; X: " + t[0] + ", Y: " + t[1];
										case 3:
											return "Circle; X: " + t[0] + ", Y: " + t[1] + ", diameter: " + t[2];
										case 4:
											return "Rectangle; X: " + t[0] + ", Y: " + t[1] + ", width: " + t[2] + ", height: " + t[3];
										default:
											return "Unknown"
									}
								}
							},
							37500: {
								name: "MakerNote",
								description: function(t) {
									return "[Raw maker note data]"
								}
							},
							37510: {
								name: "UserComment",
								description: function(t) {
									switch (t.slice(0, 8).map(function(t) {
										return String.fromCharCode(t)
									}).join("")) {
										case "ASCII\x00\x00\x00":
											return t.slice(8, t.length).map(function(t) {
												return String.fromCharCode(t)
											}).join("");
										case "JIS\x00\x00\x00\x00\x00":
											return "[JIS encoded text]";
										case "UNICODE\x00":
											return "[Unicode encoded text]";
										case "\x00\x00\x00\x00\x00\x00\x00\x00":
											return "[Undefined encoding]"
									}
								}
							},
							37520: "SubSecTime",
							37521: "SubSecTimeOriginal",
							37522: "SubSecTimeDigitized",
							40960: {
								name: "FlashpixVersion",
								description: function(t) {
									var e, i, n, r;
									for (i = "", n = 0, r = t.length; r > n; n++) e = t[n], i += String.fromCharCode(e);
									return i
								}
							},
							40961: {
								name: "ColorSpace",
								description: function(t) {
									switch (t) {
										case 1:
											return "sRGB";
										case 65535:
											return "Uncalibrated";
										default:
											return "Unknown"
									}
								}
							},
							40962: "PixelXDimension",
							40963: "PixelYDimension",
							40964: "RelatedSoundFile",
							40965: "Interoperability IFD Pointer",
							41483: "FlashEnergy",
							41484: {
								name: "SpatialFrequencyResponse",
								description: function(t) {
									return "[Raw SFR table data]"
								}
							},
							41486: "FocalPlaneXResolution",
							41487: "FocalPlaneYResolution",
							41488: {
								name: "FocalPlaneResolutionUnit",
								description: function(t) {
									switch (t) {
										case 2:
											return "inches";
										case 3:
											return "centimeters";
										default:
											return "Unknown"
									}
								}
							},
							41492: {
								name: "SubjectLocation",
								description: function(t) {
									return "X: " + t[0] + ", Y: " + t[1]
								}
							},
							41493: "ExposureIndex",
							41495: {
								name: "SensingMethod",
								description: function(t) {
									switch (t) {
										case 1:
											return "Undefined";
										case 2:
											return "One-chip color area sensor";
										case 3:
											return "Two-chip color area sensor";
										case 4:
											return "Three-chip color area sensor";
										case 5:
											return "Color sequential area sensor";
										case 7:
											return "Trilinear sensor";
										case 8:
											return "Color sequential linear sensor";
										default:
											return "Unknown"
									}
								}
							},
							41728: {
								name: "FileSource",
								description: function(t) {
									switch (t) {
										case 3:
											return "DSC";
										default:
											return "Unknown"
									}
								}
							},
							41729: {
								name: "SceneType",
								description: function(t) {
									switch (t) {
										case 1:
											return "A directly photographed image";
										default:
											return "Unknown"
									}
								}
							},
							41730: {
								name: "CFAPattern",
								description: function(t) {
									return "[Raw CFA pattern table data]"
								}
							},
							41985: {
								name: "CustomRendered",
								description: function(t) {
									switch (t) {
										case 0:
											return "Normal process";
										case 1:
											return "Custom process";
										default:
											return "Unknown"
									}
								}
							},
							41986: {
								name: "ExposureMode",
								description: function(t) {
									switch (t) {
										case 0:
											return "Auto exposure";
										case 1:
											return "Manual exposure";
										case 2:
											return "Auto bracket";
										default:
											return "Unknown"
									}
								}
							},
							41987: {
								name: "WhiteBalance",
								description: function(t) {
									switch (t) {
										case 0:
											return "Auto white balance";
										case 1:
											return "Manual white balance";
										default:
											return "Unknown"
									}
								}
							},
							41988: {
								name: "DigitalZoomRatio",
								description: function(t) {
									switch (t) {
										case 0:
											return "Digital zoom was not used";
										default:
											return t
									}
								}
							},
							41989: {
								name: "FocalLengthIn35mmFilm",
								description: function(t) {
									switch (t) {
										case 0:
											return "Unknown";
										default:
											return t
									}
								}
							},
							41990: {
								name: "SceneCaptureType",
								description: function(t) {
									switch (t) {
										case 0:
											return "Standard";
										case 1:
											return "Landscape";
										case 2:
											return "Portrait";
										case 3:
											return "Night scene";
										default:
											return "Unknown"
									}
								}
							},
							41991: {
								name: "GainControl",
								description: function(t) {
									switch (t) {
										case 0:
											return "None";
										case 1:
											return "Low gain up";
										case 2:
											return "High gain up";
										case 3:
											return "Low gain down";
										case 4:
											return "High gain down";
										default:
											return "Unknown"
									}
								}
							},
							41992: {
								name: "Contrast",
								description: function(t) {
									switch (t) {
										case 0:
											return "Normal";
										case 1:
											return "Soft";
										case 2:
											return "Hard";
										default:
											return "Unknown"
									}
								}
							},
							41993: {
								name: "Saturation",
								description: function(t) {
									switch (t) {
										case 0:
											return "Normal";
										case 1:
											return "Low saturation";
										case 2:
											return "High saturation";
										default:
											return "Unknown"
									}
								}
							},
							41994: {
								name: "Sharpness",
								description: function(t) {
									switch (t) {
										case 0:
											return "Normal";
										case 1:
											return "Soft";
										case 2:
											return "Hard";
										default:
											return "Unknown"
									}
								}
							},
							41995: {
								name: "DeviceSettingDescription",
								description: function(t) {
									return "[Raw device settings table data]"
								}
							},
							41996: {
								name: "SubjectDistanceRange",
								description: function(t) {
									switch (t) {
										case 1:
											return "Macro";
										case 2:
											return "Close view";
										case 3:
											return "Distant view";
										default:
											return "Unknown"
									}
								}
							},
							42016: "ImageUniqueID"
						},
						gps: {
							0: {
								name: "GPSVersionID",
								description: function(t) {
									var e, i;
									return t[0] === (e = t[1]) && 2 === e && t[2] === (i = t[3]) && 0 === i ? "Version 2.2" : "Unknown"
								}
							},
							1: {
								name: "GPSLatitudeRef",
								description: function(t) {
									switch (t.join("")) {
										case "N":
											return "North latitude";
										case "S":
											return "South latitude";
										default:
											return "Unknown"
									}
								}
							},
							2: {
								name: "GPSLatitude",
								description: function(t) {
									return t[0] + t[1] / 60 + t[2] / 3600
								}
							},
							3: {
								name: "GPSLongitudeRef",
								description: function(t) {
									switch (t.join("")) {
										case "E":
											return "East longitude";
										case "W":
											return "West longitude";
										default:
											return "Unknown"
									}
								}
							},
							4: {
								name: "GPSLongitude",
								description: function(t) {
									return t[0] + t[1] / 60 + t[2] / 3600
								}
							},
							5: {
								name: "GPSAltitudeRef",
								description: function(t) {
									switch (t) {
										case 0:
											return "Sea level";
										case 1:
											return "Sea level reference (negative value)";
										default:
											return "Unknown"
									}
								}
							},
							6: {
								name: "GPSAltitude",
								description: function(t) {
									return t + " m"
								}
							},
							7: {
								name: "GPSTimeStamp",
								description: function(t) {
									var e;
									return e = function(t) {
										var e;
										return function() {
											var i, n, r;
											for (r = [], e = i = 0, n = 2 - ("" + Math.floor(t)).length; n >= 0 ? n > i : i > n; e = n >= 0 ? ++i : --i) r.push("0");
											return r
										}() + t
									}, t.map(e).join(":")
								}
							},
							8: "GPSSatellites",
							9: {
								name: "GPSStatus",
								description: function(t) {
									switch (t.join("")) {
										case "A":
											return "Measurement in progress";
										case "V":
											return "Measurement Interoperability";
										default:
											return "Unknown"
									}
								}
							},
							10: {
								name: "GPSMeasureMode",
								description: function(t) {
									switch (t.join("")) {
										case "2":
											return "2-dimensional measurement";
										case "3":
											return "3-dimensional measurement";
										default:
											return "Unknown"
									}
								}
							},
							11: "GPSDOP",
							12: {
								name: "GPSSpeedRef",
								description: function(t) {
									switch (t.join("")) {
										case "K":
											return "Kilometers per hour";
										case "M":
											return "Miles per hour";
										case "N":
											return "Knots";
										default:
											return "Unknown"
									}
								}
							},
							13: "GPSSpeed",
							14: {
								name: "GPSTrackRef",
								description: function(t) {
									switch (t.join("")) {
										case "T":
											return "True direction";
										case "M":
											return "Magnetic direction";
										default:
											return "Unknown"
									}
								}
							},
							15: "GPSTrack",
							16: {
								name: "GPSImgDirectionRef",
								description: function(t) {
									switch (t.join("")) {
										case "T":
											return "True direction";
										case "M":
											return "Magnetic direction";
										default:
											return "Unknown"
									}
								}
							},
							17: "GPSImgDirection",
							18: "GPSMapDatum",
							19: {
								name: "GPSDestLatitudeRef",
								description: function(t) {
									switch (t.join("")) {
										case "N":
											return "North latitude";
										case "S":
											return "South latitude";
										default:
											return "Unknown"
									}
								}
							},
							20: {
								name: "GPSDestLatitude",
								description: function(t) {
									return t[0] + t[1] / 60 + t[2] / 3600
								}
							},
							21: {
								name: "GPSDestLongitudeRef",
								description: function(t) {
									switch (t.join("")) {
										case "E":
											return "East longitude";
										case "W":
											return "West longitude";
										default:
											return "Unknown"
									}
								}
							},
							22: {
								name: "GPSDestLongitude",
								description: function(t) {
									return t[0] + t[1] / 60 + t[2] / 3600
								}
							},
							23: {
								name: "GPSDestBearingRef",
								description: function(t) {
									switch (t.join("")) {
										case "T":
											return "True direction";
										case "M":
											return "Magnetic direction";
										default:
											return "Unknown"
									}
								}
							},
							24: "GPSDestBearing",
							25: {
								name: "GPSDestDistanceRef",
								description: function(t) {
									switch (t.join("")) {
										case "K":
											return "Kilometers";
										case "M":
											return "Miles";
										case "N":
											return "Knots";
										default:
											return "Unknown"
									}
								}
							},
							26: "GPSDestDistance",
							27: {
								name: "GPSProcessingMethod",
								description: function(t) {
									if (0 === t) return "Undefined";
									switch (t.slice(0, 8).map(function(t) {
										return String.fromCharCode(t)
									}).join("")) {
										case "ASCII\x00\x00\x00":
											return t.slice(8, t.length).map(function(t) {
												return String.fromCharCode(t)
											}).join("");
										case "JIS\x00\x00\x00\x00\x00":
											return "[JIS encoded text]";
										case "UNICODE\x00":
											return "[Unicode encoded text]";
										case "\x00\x00\x00\x00\x00\x00\x00\x00":
											return "[Undefined encoding]"
									}
								}
							},
							28: {
								name: "GPSAreaInformation",
								description: function(t) {
									if (0 === t) return "Undefined";
									switch (t.slice(0, 8).map(function(t) {
										return String.fromCharCode(t)
									}).join("")) {
										case "ASCII\x00\x00\x00":
											return t.slice(8, t.length).map(function(t) {
												return String.fromCharCode(t)
											}).join("");
										case "JIS\x00\x00\x00\x00\x00":
											return "[JIS encoded text]";
										case "UNICODE\x00":
											return "[Unicode encoded text]";
										case "\x00\x00\x00\x00\x00\x00\x00\x00":
											return "[Undefined encoding]"
									}
								}
							},
							29: "GPSDateStamp",
							30: {
								name: "GPSDifferential",
								description: function(t) {
									switch (t) {
										case 0:
											return "Measurement without differential correction";
										case 1:
											return "Differential correction applied";
										default:
											return "Unknown"
									}
								}
							}
						},
						interoperability: {
							1: "InteroperabilityIndex",
							2: "UnknownInteroperabilityTag0x0002",
							4097: "UnknownInteroperabilityTag0x1001",
							4098: "UnknownInteroperabilityTag0x1002"
						}
					}, t.prototype.getTagValue = function(t) {
						return null != this._tags[t] ? this._tags[t].value : void 0
					}, t.prototype.getTagDescription = function(t) {
						return null != this._tags[t] ? this._tags[t].description : void 0
					}, t.prototype.getAllTags = function() {
						return this._tags
					}, t.prototype.deleteTag = function(t) {
						return delete this._tags[t]
					}, t
				}()
			}).call(this)
		}, {}],
		3: [function(t, e, i) {
			function n(t) {
				function e(t) {
					for (var e = [16, 11, 10, 16, 24, 40, 51, 61, 12, 12, 14, 19, 26, 58, 60, 55, 14, 13, 16, 24, 40, 57, 69, 56, 14, 17, 22, 29, 51, 87, 80, 62, 18, 22, 37, 56, 68, 109, 103, 77, 24, 35, 55, 64, 81, 104, 113, 92, 49, 64, 78, 87, 103, 121, 120, 101, 72, 92, 95, 98, 112, 100, 103, 99], i = 0; 64 > i; i++) {
						var n = C((e[i] * t + 50) / 100);
						1 > n ? n = 1 : n > 255 && (n = 255), k[N[i]] = n
					}
					for (var r = [17, 18, 24, 47, 99, 99, 99, 99, 18, 21, 26, 66, 99, 99, 99, 99, 24, 26, 56, 99, 99, 99, 99, 99, 47, 66, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99], o = 0; 64 > o; o++) {
						var s = C((r[o] * t + 50) / 100);
						1 > s ? s = 1 : s > 255 && (s = 255), T[N[o]] = s
					}
					for (var a = [1, 1.387039845, 1.306562965, 1.175875602, 1, .785694958, .5411961, .275899379], c = 0, h = 0; 8 > h; h++) for (var l = 0; 8 > l; l++) E[c] = 1 / (k[N[c]] * a[h] * a[l] * 8), O[c] = 1 / (T[N[c]] * a[h] * a[l] * 8), c++
				}
				function i(t, e) {
					for (var i = 0, n = 0, r = new Array, o = 1; 16 >= o; o++) {
						for (var s = 1; s <= t[o]; s++) r[e[n]] = [], r[e[n]][0] = i, r[e[n]][1] = o, n++, i++;
						i *= 2
					}
					return r
				}
				function n() {
					y = i(Y, X), _ = i(H, q), w = i(W, G), x = i(V, Z)
				}
				function r() {
					for (var t = 1, e = 2, i = 1; 15 >= i; i++) {
						for (var n = t; e > n; n++) A[32767 + n] = i, j[32767 + n] = [], j[32767 + n][1] = i, j[32767 + n][0] = n;
						for (var r = -(e - 1); - t >= r; r++) A[32767 + r] = i, j[32767 + r] = [], j[32767 + r][1] = i, j[32767 + r][0] = e - 1 + r;
						t <<= 1, e <<= 1
					}
				}
				function o() {
					for (var t = 0; 256 > t; t++) z[t] = 19595 * t, z[t + 256 >> 0] = 38470 * t, z[t + 512 >> 0] = 7471 * t + 32768, z[t + 768 >> 0] = -11059 * t, z[t + 1024 >> 0] = -21709 * t, z[t + 1280 >> 0] = 32768 * t + 8421375, z[t + 1536 >> 0] = -27439 * t, z[t + 1792 >> 0] = -5329 * t
				}
				function s(t) {
					for (var e = t[0], i = t[1] - 1; i >= 0;) e & 1 << i && (M |= 1 << D), i--, D--, 0 > D && (255 == M ? (a(255), a(0)) : a(M), D = 7, M = 0)
				}
				function a(t) {
					L.push(t)
				}
				function c(t) {
					a(t >> 8 & 255), a(255 & t)
				}
				function h(t, e) {
					var i, n, r, o, s, a, c, h, l, u = 0,
						f = 8,
						d = 64;
					for (l = 0; f > l; ++l) {
						i = t[u], n = t[u + 1], r = t[u + 2], o = t[u + 3], s = t[u + 4], a = t[u + 5], c = t[u + 6], h = t[u + 7];
						var p = i + h,
							g = i - h,
							v = n + c,
							m = n - c,
							b = r + a,
							y = r - a,
							_ = o + s,
							w = o - s,
							x = p + _,
							S = p - _,
							C = v + b,
							k = v - b;
						t[u] = x + C, t[u + 4] = x - C;
						var T = .707106781 * (k + S);
						t[u + 2] = S + T, t[u + 6] = S - T, x = w + y, C = y + m, k = m + g;
						var E = .382683433 * (x - k),
							O = .5411961 * x + E,
							j = 1.306562965 * k + E,
							A = .707106781 * C,
							P = g + A,
							L = g - A;
						t[u + 5] = L + O, t[u + 3] = L - O, t[u + 1] = P + j, t[u + 7] = P - j, u += 8
					}
					for (u = 0, l = 0; f > l; ++l) {
						i = t[u], n = t[u + 8], r = t[u + 16], o = t[u + 24], s = t[u + 32], a = t[u + 40], c = t[u + 48], h = t[u + 56];
						var M = i + h,
							D = i - h,
							R = n + c,
							F = n - c,
							B = r + a,
							U = r - a,
							z = o + s,
							N = o - s,
							Y = M + z,
							X = M - z,
							W = R + B,
							G = R - B;
						t[u] = Y + W, t[u + 32] = Y - W;
						var H = .707106781 * (G + X);
						t[u + 16] = X + H, t[u + 48] = X - H, Y = N + U, W = U + F, G = F + D;
						var q = .382683433 * (Y - G),
							V = .5411961 * Y + q,
							Z = 1.306562965 * G + q,
							$ = .707106781 * W,
							K = D + $,
							J = D - $;
						t[u + 40] = J + V, t[u + 24] = J - V, t[u + 8] = K + Z, t[u + 56] = K - Z, u++
					}
					var Q;
					for (l = 0; d > l; ++l) Q = t[l] * e[l], I[l] = Q > 0 ? Q + .5 | 0 : Q - .5 | 0;
					return I
				}
				function l() {
					c(65504), c(16), a(74), a(70), a(73), a(70), a(0), a(1), a(1), a(0), c(1), c(1), a(0), a(0)
				}
				function u(t, e) {
					c(65472), c(17), a(8), c(e), c(t), a(3), a(1), a(17), a(0), a(2), a(17), a(1), a(3), a(17), a(1)
				}
				function f() {
					c(65499), c(132), a(0);
					for (var t = 0; 64 > t; t++) a(k[t]);
					a(1);
					for (var e = 0; 64 > e; e++) a(T[e])
				}
				function d() {
					c(65476), c(418), a(0);
					for (var t = 0; 16 > t; t++) a(Y[t + 1]);
					for (var e = 0; 11 >= e; e++) a(X[e]);
					a(16);
					for (var i = 0; 16 > i; i++) a(W[i + 1]);
					for (var n = 0; 161 >= n; n++) a(G[n]);
					a(1);
					for (var r = 0; 16 > r; r++) a(H[r + 1]);
					for (var o = 0; 11 >= o; o++) a(q[o]);
					a(17);
					for (var s = 0; 16 > s; s++) a(V[s + 1]);
					for (var h = 0; 161 >= h; h++) a(Z[h])
				}
				function p() {
					c(65498), c(12), a(3), a(1), a(0), a(2), a(17), a(3), a(17), a(0), a(63), a(0)
				}
				function g(t, e, i, n, r) {
					for (var o, a = r[0], c = r[240], l = 16, u = 63, f = 64, d = h(t, e), p = 0; f > p; ++p) P[N[p]] = d[p];
					var g = P[0] - i;
					i = P[0], 0 == g ? s(n[0]) : (o = 32767 + g, s(n[A[o]]), s(j[o]));
					for (var v = 63; v > 0 && 0 == P[v]; v--);
					if (0 == v) return s(a), i;
					for (var m, b = 1; v >= b;) {
						for (var y = b; 0 == P[b] && v >= b; ++b);
						var _ = b - y;
						if (_ >= l) {
							m = _ >> 4;
							for (var w = 1; m >= w; ++w) s(c);
							_ = 15 & _
						}
						o = 32767 + P[b], s(r[(_ << 4) + A[o]]), s(j[o]), b++
					}
					return v != u && s(a), i
				}
				function v() {
					for (var t = String.fromCharCode, e = 0; 256 > e; e++) U[e] = t(e)
				}
				function m(t) {
					if (0 >= t && (t = 1), t > 100 && (t = 100), S != t) {
						var i = 0;
						i = 50 > t ? Math.floor(5e3 / t) : Math.floor(200 - 2 * t), e(i), S = t
					}
				}
				function b() {
					var e = (new Date).getTime();
					t || (t = 50), v(), n(), r(), o(), m(t);
					(new Date).getTime() - e
				}
				var y, _, w, x, S, C = (Math.round, Math.floor),
					k = new Array(64),
					T = new Array(64),
					E = new Array(64),
					O = new Array(64),
					j = new Array(65535),
					A = new Array(65535),
					I = new Array(64),
					P = new Array(64),
					L = [],
					M = 0,
					D = 7,
					R = new Array(64),
					F = new Array(64),
					B = new Array(64),
					U = new Array(256),
					z = new Array(2048),
					N = [0, 1, 5, 6, 14, 15, 27, 28, 2, 4, 7, 13, 16, 26, 29, 42, 3, 8, 12, 17, 25, 30, 41, 43, 9, 11, 18, 24, 31, 40, 44, 53, 10, 19, 23, 32, 39, 45, 52, 54, 20, 22, 33, 38, 46, 51, 55, 60, 21, 34, 37, 47, 50, 56, 59, 61, 35, 36, 48, 49, 57, 58, 62, 63],
					Y = [0, 0, 1, 5, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
					X = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
					W = [0, 0, 2, 1, 3, 3, 2, 4, 3, 5, 5, 4, 4, 0, 0, 1, 125],
					G = [1, 2, 3, 0, 4, 17, 5, 18, 33, 49, 65, 6, 19, 81, 97, 7, 34, 113, 20, 50, 129, 145, 161, 8, 35, 66, 177, 193, 21, 82, 209, 240, 36, 51, 98, 114, 130, 9, 10, 22, 23, 24, 25, 26, 37, 38, 39, 40, 41, 42, 52, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250],
					H = [0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
					q = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
					V = [0, 0, 2, 1, 2, 4, 4, 3, 4, 7, 5, 4, 4, 0, 1, 2, 119],
					Z = [0, 1, 2, 3, 17, 4, 5, 33, 49, 6, 18, 65, 81, 7, 97, 113, 19, 34, 50, 129, 8, 20, 66, 145, 161, 177, 193, 9, 35, 51, 82, 240, 21, 98, 114, 209, 10, 22, 36, 52, 225, 37, 241, 23, 24, 25, 26, 38, 39, 40, 41, 42, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 130, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 226, 227, 228, 229, 230, 231, 232, 233, 234, 242, 243, 244, 245, 246, 247, 248, 249, 250];
				this.encode = function(t, e) {
					(new Date).getTime();
					e && m(e), L = new Array, M = 0, D = 7, c(65496), l(), f(), u(t.width, t.height), d(), p();
					var i = 0,
						n = 0,
						r = 0;
					M = 0, D = 7, this.encode.displayName = "_encode_";
					for (var o, a, h, v, b, S, C, k, T, j = t.data, A = t.width, I = t.height, P = 4 * A, U = 0; I > U;) {
						for (o = 0; P > o;) {
							for (b = P * U + o, S = b, C = -1, k = 0, T = 0; 64 > T; T++) k = T >> 3, C = 4 * (7 & T), S = b + k * P + C, U + k >= I && (S -= P * (U + 1 + k - I)), o + C >= P && (S -= o + C - P + 4), a = j[S++], h = j[S++], v = j[S++], R[T] = (z[a] + z[h + 256 >> 0] + z[v + 512 >> 0] >> 16) - 128, F[T] = (z[a + 768 >> 0] + z[h + 1024 >> 0] + z[v + 1280 >> 0] >> 16) - 128, B[T] = (z[a + 1280 >> 0] + z[h + 1536 >> 0] + z[v + 1792 >> 0] >> 16) - 128;
							i = g(R, E, i, y, w), n = g(F, O, n, _, x), r = g(B, O, r, _, x), o += 32
						}
						U += 8
					}
					if (D >= 0) {
						var N = [];
						N[1] = D + 1, N[0] = (1 << D + 1) - 1, s(N)
					}
					return c(65497), new Uint8Array(L)
				}, b()
			}
			function r(t, e) {
				"undefined" == typeof e && (e = 50);
				var i = new n(e),
					r = i.encode(t, e);
				return {
					data: r,
					width: t.width,
					height: t.height
				}
			}
			e.exports = r
		}, {}],
		4: [function(t, e, i) {
			function n(t, e) {
				if (0 === t.indexOf("data:")) {
					for (var i = t.indexOf("base64,") + 7, n = atob(t.substring(i)), r = new Uint8Array(n.length), o = n.length - 1; o >= 0; o--) r[o] = n.charCodeAt(o);
					return void e(r.buffer)
				}
				var s = new XMLHttpRequest;
				s.open("GET", t, !0), s.responseType = "arraybuffer", s.onload = function() {
					e(s.response)
				}, s.send(null)
			}
			var r = function() {
				function t() {
					this._src = null, this._parser = new o.JpegImage, this.onload = null
				}
				return t.prototype = {
					get src() {
						return this._src
					}, set src(t) {
						this.load(t)
					}, get width() {
						return this._parser.width
					}, get height() {
						return this._parser.height
					}, load: function(t) {
						this._src = t, n(t, function(t) {
							this.parse(new Uint8Array(t)), this.onload && this.onload()
						}.bind(this))
					},
					parse: function(t) {
						this._parser.parse(t)
					},
					getData: function(t, e) {
						return this._parser.getData(t, e, !1)
					},
					copyToImageData: function(t) {
						if (2 === this._parser.numComponents || this._parser.numComponents > 4) throw new Error("Unsupported amount of components");
						var e, i, n = t.width,
							r = t.height,
							o = n * r * 4,
							s = t.data;
						if (1 !== this._parser.numComponents) {
							var a = this._parser.getData(n, r, !0);
							for (e = 0, i = 0; o > e;) s[e++] = a[i++], s[e++] = a[i++], s[e++] = a[i++], s[e++] = 255
						} else {
							var c = this._parser.getData(n, r, !1);
							for (e = 0, i = 0; o > e;) {
								var h = c[i++];
								s[e++] = h, s[e++] = h, s[e++] = h, s[e++] = 255
							}
						}
					}
				}, t
			}();
			e.exports = {
				JpegImage: r,
				JpegDecoder: s,
				JpxDecoder: a,
				Jbig2Decoder: c
			};
			var o;
			! function(t) {
				"use strict";

				function e(t) {
					for (var e = 1, i = 0; t > e;) e <<= 1, i++;
					return i
				}
				function i(t, e) {
					return t[e] << 24 >> 24
				}
				function n(t, e) {
					return t[e] << 8 | t[e + 1]
				}
				function r(t, e) {
					return (t[e] << 24 | t[e + 1] << 16 | t[e + 2] << 8 | t[e + 3]) >>> 0
				}
				function o(t, e, i) {
					return Object.defineProperty(t, e, {
						value: i,
						enumerable: !0,
						configurable: !0,
						writable: !1
					}), i
				}
				var s = function() {
					function t() {}
					function e(t, e) {
						for (var i, n, r = 0, o = [], s = 16; s > 0 && !t[s - 1];) s--;
						o.push({
							children: [],
							index: 0
						});
						var a, c = o[0];
						for (i = 0; s > i; i++) {
							for (n = 0; n < t[i]; n++) {
								for (c = o.pop(), c.children[c.index] = e[r]; c.index > 0;) c = o.pop();
								for (c.index++, o.push(c); o.length <= i;) o.push(a = {
									children: [],
									index: 0
								}), c.children[c.index] = a.children, c = a;
								r++
							}
							s > i + 1 && (o.push(a = {
								children: [],
								index: 0
							}), c.children[c.index] = a.children, c = a)
						}
						return o[0].children
					}
					function i(t, e, i) {
						return 64 * ((t.blocksPerLine + 1) * e + i)
					}
					function n(t, e, n, r, o, s, c, h, l) {
						function u() {
							if (L > 0) return L--, P >> L & 1;
							if (P = t[e++], 255 === P) {
								var i = t[e++];
								if (i) throw "unexpected marker: " + (P << 8 | i).toString(16)
							}
							return L = 7, P >>> 7
						}
						function f(t) {
							for (var e = t;;) {
								if (e = e[u()], "number" == typeof e) return e;
								if ("object" != typeof e) throw "invalid huffman sequence"
							}
						}
						function d(t) {
							for (var e = 0; t > 0;) e = e << 1 | u(), t--;
							return e
						}
						function p(t) {
							if (1 === t) return 1 === u() ? 1 : -1;
							var e = d(t);
							return e >= 1 << t - 1 ? e : e + (-1 << t) + 1
						}
						function g(t, e) {
							var i = f(t.huffmanTableDC),
								n = 0 === i ? 0 : p(i);
							t.blockData[e] = t.pred += n;
							for (var r = 1; 64 > r;) {
								var o = f(t.huffmanTableAC),
									s = 15 & o,
									c = o >> 4;
								if (0 !== s) {
									r += c;
									var h = a[r];
									t.blockData[e + h] = p(s), r++
								} else {
									if (15 > c) break;
									r += 16
								}
							}
						}
						function v(t, e) {
							var i = f(t.huffmanTableDC),
								n = 0 === i ? 0 : p(i) << l;
							t.blockData[e] = t.pred += n
						}
						function m(t, e) {
							t.blockData[e] |= u() << l
						}
						function b(t, e) {
							if (M > 0) return void M--;
							for (var i = s, n = c; n >= i;) {
								var r = f(t.huffmanTableAC),
									o = 15 & r,
									h = r >> 4;
								if (0 !== o) {
									i += h;
									var u = a[i];
									t.blockData[e + u] = p(o) * (1 << l), i++
								} else {
									if (15 > h) {
										M = d(h) + (1 << h) - 1;
										break
									}
									i += 16
								}
							}
						}
						function y(t, e) {
							for (var i, n, r = s, o = c, h = 0; o >= r;) {
								var g = a[r];
								switch (D) {
									case 0:
										if (n = f(t.huffmanTableAC), i = 15 & n, h = n >> 4, 0 === i) 15 > h ? (M = d(h) + (1 << h), D = 4) : (h = 16, D = 1);
										else {
											if (1 !== i) throw "invalid ACn encoding";
											x = p(i), D = h ? 2 : 3
										}
										continue;
									case 1:
									case 2:
										t.blockData[e + g] ? t.blockData[e + g] += u() << l : (h--, 0 === h && (D = 2 === D ? 3 : 0));
										break;
									case 3:
										t.blockData[e + g] ? t.blockData[e + g] += u() << l : (t.blockData[e + g] = x << l, D = 0);
										break;
									case 4:
										t.blockData[e + g] && (t.blockData[e + g] += u() << l)
								}
								r++
							}
							4 === D && (M--, 0 === M && (D = 0))
						}
						function _(t, e, n, r, o) {
							var s = n / j | 0,
								a = n % j,
								c = s * t.v + r,
								h = a * t.h + o,
								l = i(t, c, h);
							e(t, l)
						}
						function w(t, e, n) {
							var r = n / t.blocksPerLine | 0,
								o = n % t.blocksPerLine,
								s = i(t, r, o);
							e(t, s)
						}
						var x, S, C, k, T, E, O, j = (n.precision, n.samplesPerLine, n.scanLines, n.mcusPerLine),
							A = n.progressive,
							I = (n.maxH, n.maxV, e),
							P = 0,
							L = 0,
							M = 0,
							D = 0,
							R = r.length;
						O = A ? 0 === s ? 0 === h ? v : m : 0 === h ? b : y : g;
						var F, B, U = 0;
						B = 1 === R ? r[0].blocksPerLine * r[0].blocksPerColumn : j * n.mcusPerColumn, o || (o = B);
						for (var z, N; B > U;) {
							for (C = 0; R > C; C++) r[C].pred = 0;
							if (M = 0, 1 === R) for (S = r[0], E = 0; o > E; E++) w(S, O, U), U++;
							else for (E = 0; o > E; E++) {
								for (C = 0; R > C; C++) for (S = r[C], z = S.h, N = S.v, k = 0; N > k; k++) for (T = 0; z > T; T++) _(S, O, U, k, T);
								U++
							}
							if (L = 0, F = t[e] << 8 | t[e + 1], 65280 >= F) throw "marker was not found";
							if (!(F >= 65488 && 65495 >= F)) break;
							e += 2
						}
						return e - I
					}
					function r(t, e, i) {
						for (var n, r, o, s, a, v, m, b, y, _, w, x, S, C, k, T, E, O = t.quantizationTable, j = t.blockData, A = 0; 64 > A; A += 8) y = j[e + A], _ = j[e + A + 1], w = j[e + A + 2], x = j[e + A + 3], S = j[e + A + 4], C = j[e + A + 5], k = j[e + A + 6], T = j[e + A + 7], y *= O[A], 0 !== (_ | w | x | S | C | k | T) ? (_ *= O[A + 1], w *= O[A + 2], x *= O[A + 3], S *= O[A + 4], C *= O[A + 5], k *= O[A + 6], T *= O[A + 7], n = p * y + 128 >> 8, r = p * S + 128 >> 8, o = w, s = k, a = g * (_ - T) + 128 >> 8, b = g * (_ + T) + 128 >> 8, v = x << 4, m = C << 4, n = n + r + 1 >> 1, r = n - r, E = o * d + s * f + 128 >> 8, o = o * f - s * d + 128 >> 8, s = E, a = a + m + 1 >> 1, m = a - m, b = b + v + 1 >> 1, v = b - v, n = n + s + 1 >> 1, s = n - s, r = r + o + 1 >> 1, o = r - o, E = a * u + b * l + 2048 >> 12, a = a * l - b * u + 2048 >> 12, b = E, E = v * h + m * c + 2048 >> 12, v = v * c - m * h + 2048 >> 12, m = E, i[A] = n + b, i[A + 7] = n - b, i[A + 1] = r + m, i[A + 6] = r - m, i[A + 2] = o + v, i[A + 5] = o - v, i[A + 3] = s + a, i[A + 4] = s - a) : (E = p * y + 512 >> 10, i[A] = E, i[A + 1] = E, i[A + 2] = E, i[A + 3] = E, i[A + 4] = E, i[A + 5] = E, i[A + 6] = E, i[A + 7] = E);
						for (var I = 0; 8 > I; ++I) y = i[I], _ = i[I + 8], w = i[I + 16], x = i[I + 24], S = i[I + 32], C = i[I + 40], k = i[I + 48], T = i[I + 56], 0 !== (_ | w | x | S | C | k | T) ? (n = p * y + 2048 >> 12, r = p * S + 2048 >> 12, o = w, s = k, a = g * (_ - T) + 2048 >> 12, b = g * (_ + T) + 2048 >> 12, v = x, m = C, n = (n + r + 1 >> 1) + 4112, r = n - r, E = o * d + s * f + 2048 >> 12, o = o * f - s * d + 2048 >> 12, s = E, a = a + m + 1 >> 1, m = a - m, b = b + v + 1 >> 1, v = b - v, n = n + s + 1 >> 1, s = n - s, r = r + o + 1 >> 1, o = r - o, E = a * u + b * l + 2048 >> 12, a = a * l - b * u + 2048 >> 12, b = E, E = v * h + m * c + 2048 >> 12, v = v * c - m * h + 2048 >> 12, m = E, y = n + b, T = n - b, _ = r + m, k = r - m, w = o + v, C = o - v, x = s + a, S = s - a, y = 16 > y ? 0 : y >= 4080 ? 255 : y >> 4, _ = 16 > _ ? 0 : _ >= 4080 ? 255 : _ >> 4, w = 16 > w ? 0 : w >= 4080 ? 255 : w >> 4, x = 16 > x ? 0 : x >= 4080 ? 255 : x >> 4, S = 16 > S ? 0 : S >= 4080 ? 255 : S >> 4, C = 16 > C ? 0 : C >= 4080 ? 255 : C >> 4, k = 16 > k ? 0 : k >= 4080 ? 255 : k >> 4, T = 16 > T ? 0 : T >= 4080 ? 255 : T >> 4, j[e + I] = y, j[e + I + 8] = _, j[e + I + 16] = w, j[e + I + 24] = x, j[e + I + 32] = S, j[e + I + 40] = C, j[e + I + 48] = k, j[e + I + 56] = T) : (E = p * y + 8192 >> 14, E = -2040 > E ? 0 : E >= 2024 ? 255 : E + 2056 >> 4, j[e + I] = E, j[e + I + 8] = E, j[e + I + 16] = E, j[e + I + 24] = E, j[e + I + 32] = E, j[e + I + 40] = E, j[e + I + 48] = E, j[e + I + 56] = E)
					}
					function o(t, e) {
						for (var n = e.blocksPerLine, o = e.blocksPerColumn, s = new Int16Array(64), a = 0; o > a; a++) for (var c = 0; n > c; c++) {
							var h = i(e, a, c);
							r(e, h, s)
						}
						return e.blockData
					}
					function s(t) {
						return 0 >= t ? 0 : t >= 255 ? 255 : t
					}
					var a = new Uint8Array([0, 1, 8, 16, 9, 2, 3, 10, 17, 24, 32, 25, 18, 11, 4, 5, 12, 19, 26, 33, 40, 48, 41, 34, 27, 20, 13, 6, 7, 14, 21, 28, 35, 42, 49, 56, 57, 50, 43, 36, 29, 22, 15, 23, 30, 37, 44, 51, 58, 59, 52, 45, 38, 31, 39, 46, 53, 60, 61, 54, 47, 55, 62, 63]),
						c = 4017,
						h = 799,
						l = 3406,
						u = 2276,
						f = 1567,
						d = 3784,
						p = 5793,
						g = 2896;
					return t.prototype = {
						parse: function(t) {
							function i() {
								var e = t[l] << 8 | t[l + 1];
								return l += 2, e
							}
							function r() {
								var e = i(),
									n = t.subarray(l, l + e - 2);
								return l += n.length, n
							}
							function s(t) {
								for (var e = Math.ceil(t.samplesPerLine / 8 / t.maxH), i = Math.ceil(t.scanLines / 8 / t.maxV), n = 0; n < t.components.length; n++) {
									B = t.components[n];
									var r = Math.ceil(Math.ceil(t.samplesPerLine / 8) * B.h / t.maxH),
										o = Math.ceil(Math.ceil(t.scanLines / 8) * B.v / t.maxV),
										s = e * B.h,
										a = i * B.v,
										c = 64 * a * (s + 1);
									B.blockData = new Int16Array(c), B.blocksPerLine = r, B.blocksPerColumn = o
								}
								t.mcusPerLine = e, t.mcusPerColumn = i
							}
							var c, h, l = 0,
								u = (t.length, null),
								f = null,
								d = [],
								p = [],
								g = [],
								v = i();
							if (65496 !== v) throw "SOI not found";
							for (v = i(); 65497 !== v;) {
								var m, b, y;
								switch (v) {
									case 65504:
									case 65505:
									case 65506:
									case 65507:
									case 65508:
									case 65509:
									case 65510:
									case 65511:
									case 65512:
									case 65513:
									case 65514:
									case 65515:
									case 65516:
									case 65517:
									case 65518:
									case 65519:
									case 65534:
										var _ = r();
										65504 === v && 74 === _[0] && 70 === _[1] && 73 === _[2] && 70 === _[3] && 0 === _[4] && (u = {
											version: {
												major: _[5],
												minor: _[6]
											},
											densityUnits: _[7],
											xDensity: _[8] << 8 | _[9],
											yDensity: _[10] << 8 | _[11],
											thumbWidth: _[12],
											thumbHeight: _[13],
											thumbData: _.subarray(14, 14 + 3 * _[12] * _[13])
										}), 65518 === v && 65 === _[0] && 100 === _[1] && 111 === _[2] && 98 === _[3] && 101 === _[4] && (f = {
											version: _[5] << 8 | _[6],
											flags0: _[7] << 8 | _[8],
											flags1: _[9] << 8 | _[10],
											transformCode: _[11]
										});
										break;
									case 65499:
										for (var w, x = i(), S = x + l - 2; S > l;) {
											var C = t[l++],
												k = new Uint16Array(64);
											if (C >> 4 === 0) for (b = 0; 64 > b; b++) w = a[b], k[w] = t[l++];
											else {
												if (C >> 4 !== 1) throw "DQT: invalid table spec";
												for (b = 0; 64 > b; b++) w = a[b], k[w] = i()
											}
											d[15 & C] = k
										}
										break;
									case 65472:
									case 65473:
									case 65474:
										if (c) throw "Only single frame JPEGs supported";
										i(), c = {}, c.extended = 65473 === v, c.progressive = 65474 === v, c.precision = t[l++], c.scanLines = i(), c.samplesPerLine = i(), c.components = [], c.componentIds = {};
										var T, E = t[l++],
											O = 0,
											j = 0;
										for (m = 0; E > m; m++) {
											T = t[l];
											var A = t[l + 1] >> 4,
												I = 15 & t[l + 1];
											A > O && (O = A), I > j && (j = I);
											var P = t[l + 2];
											y = c.components.push({
												h: A,
												v: I,
												quantizationTable: d[P]
											}), c.componentIds[T] = y - 1, l += 3
										}
										c.maxH = O, c.maxV = j, s(c);
										break;
									case 65476:
										var L = i();
										for (m = 2; L > m;) {
											var M = t[l++],
												D = new Uint8Array(16),
												R = 0;
											for (b = 0; 16 > b; b++, l++) R += D[b] = t[l];
											var F = new Uint8Array(R);
											for (b = 0; R > b; b++, l++) F[b] = t[l];
											m += 17 + R, (M >> 4 === 0 ? g : p)[15 & M] = e(D, F)
										}
										break;
									case 65501:
										i(), h = i();
										break;
									case 65498:
										var B, U = (i(), t[l++]),
											z = [];
										for (m = 0; U > m; m++) {
											var N = c.componentIds[t[l++]];
											B = c.components[N];
											var Y = t[l++];
											B.huffmanTableDC = g[Y >> 4], B.huffmanTableAC = p[15 & Y], z.push(B)
										}
										var X = t[l++],
											W = t[l++],
											G = t[l++],
											H = n(t, l, c, z, h, X, W, G >> 4, 15 & G);
										l += H;
										break;
									case 65535:
										255 !== t[l] && l--;
										break;
									default:
										if (255 === t[l - 3] && t[l - 2] >= 192 && t[l - 2] <= 254) {
											l -= 3;
											break
										}
										throw "unknown JPEG marker " + v.toString(16)
								}
								v = i()
							}
							for (this.width = c.samplesPerLine, this.height = c.scanLines, this.jfif = u, this.adobe = f, this.components = [], m = 0; m < c.components.length; m++) B = c.components[m], this.components.push({
								output: o(c, B),
								scaleX: B.h / c.maxH,
								scaleY: B.v / c.maxV,
								blocksPerLine: B.blocksPerLine,
								blocksPerColumn: B.blocksPerColumn
							});
							this.numComponents = this.components.length
						},
						_getLinearizedBlockData: function(t, e) {
							var i, n, r, o, s, a, c, h, l, u, f, d = this.width / t,
								p = this.height / e,
								g = 0,
								v = this.components.length,
								m = t * e * v,
								b = new Uint8Array(m),
								y = new Uint32Array(t),
								_ = 4294967288;
							for (c = 0; v > c; c++) {
								for (i = this.components[c], n = i.scaleX * d, r = i.scaleY * p, g = c, f = i.output, o = i.blocksPerLine + 1 << 3, s = 0; t > s; s++) h = 0 | s * n, y[s] = (h & _) << 3 | 7 & h;
								for (a = 0; e > a; a++) for (h = 0 | a * r, u = o * (h & _) | (7 & h) << 3, s = 0; t > s; s++) b[g] = f[u + y[s]], g += v
							}
							var w = this.decodeTransform;
							if (w) for (c = 0; m > c;) for (h = 0, l = 0; v > h; h++, c++, l += 2) b[c] = (b[c] * w[l] >> 8) + w[l + 1];
							return b
						},
						_isColorConversionNeeded: function() {
							return this.adobe && this.adobe.transformCode ? !0 : 3 === this.numComponents ? !0 : !1
						},
						_convertYccToRgb: function(t) {
							for (var e, i, n, r = 0, o = t.length; o > r; r += 3) e = t[r], i = t[r + 1], n = t[r + 2], t[r] = s(e - 179.456 + 1.402 * n), t[r + 1] = s(e + 135.459 - .344 * i - .714 * n), t[r + 2] = s(e - 226.816 + 1.772 * i);
							return t
						},
						_convertYcckToRgb: function(t) {
							for (var e, i, n, r, o = 0, a = 0, c = t.length; c > a; a += 4) {
								e = t[a], i = t[a + 1], n = t[a + 2], r = t[a + 3];
								var h = -122.67195406894 + i * (-660635669420364e-19 * i + .000437130475926232 * n - 54080610064599e-18 * e + .00048449797120281 * r - .154362151871126) + n * (-.000957964378445773 * n + .000817076911346625 * e - .00477271405408747 * r + 1.53380253221734) + e * (.000961250184130688 * e - .00266257332283933 * r + .48357088451265) + r * (-.000336197177618394 * r + .484791561490776),
									l = 107.268039397724 + i * (219927104525741e-19 * i - .000640992018297945 * n + .000659397001245577 * e + .000426105652938837 * r - .176491792462875) + n * (-.000778269941513683 * n + .00130872261408275 * e + .000770482631801132 * r - .151051492775562) + e * (.00126935368114843 * e - .00265090189010898 * r + .25802910206845) + r * (-.000318913117588328 * r - .213742400323665),
									u = -20.810012546947 + i * (-.000570115196973677 * i - 263409051004589e-19 * n + .0020741088115012 * e - .00288260236853442 * r + .814272968359295) + n * (-153496057440975e-19 * n - .000132689043961446 * e + .000560833691242812 * r - .195152027534049) + e * (.00174418132927582 * e - .00255243321439347 * r + .116935020465145) + r * (-.000343531996510555 * r + .24165260232407);
								t[o++] = s(h), t[o++] = s(l), t[o++] = s(u)
							}
							return t
						},
						_convertYcckToCmyk: function(t) {
							for (var e, i, n, r = 0, o = t.length; o > r; r += 4) e = t[r], i = t[r + 1], n = t[r + 2], t[r] = s(434.456 - e - 1.402 * n), t[r + 1] = s(119.541 - e + .344 * i + .714 * n), t[r + 2] = s(481.816 - e - 1.772 * i);
							return t
						},
						_convertCmykToRgb: function(t) {
							for (var e, i, n, r, o = 0, s = -16581375, a = 1 / 255 / 255, c = 0, h = t.length; h > c; c += 4) {
								e = t[c], i = t[c + 1], n = t[c + 2], r = t[c + 3];
								var l = e * (-4.387332384609988 * e + 54.48615194189176 * i + 18.82290502165302 * n + 212.25662451639585 * r - 72734.4411664936) + i * (1.7149763477362134 * i - 5.6096736904047315 * n - 17.873870861415444 * r - 1401.7366389350734) + n * (-2.5217340131683033 * n - 21.248923337353073 * r + 4465.541406466231) - r * (21.86122147463605 * r + 48317.86113160301),
									u = e * (8.841041422036149 * e + 60.118027045597366 * i + 6.871425592049007 * n + 31.159100130055922 * r - 20220.756542821975) + i * (-15.310361306967817 * i + 17.575251261109482 * n + 131.35250912493976 * r - 48691.05921601825) + n * (4.444339102852739 * n + 9.8632861493405 * r - 6341.191035517494) - r * (20.737325471181034 * r + 47890.15695978492),
									f = e * (.8842522430003296 * e + 8.078677503112928 * i + 30.89978309703729 * n - .23883238689178934 * r - 3616.812083916688) + i * (10.49593273432072 * i + 63.02378494754052 * n + 50.606957656360734 * r - 28620.90484698408) + n * (.03296041114873217 * n + 115.60384449646641 * r - 49363.43385999684) - r * (22.33816807309886 * r + 45932.16563550634);
								t[o++] = l >= 0 ? 255 : s >= l ? 0 : 255 + l * a | 0, t[o++] = u >= 0 ? 255 : s >= u ? 0 : 255 + u * a | 0, t[o++] = f >= 0 ? 255 : s >= f ? 0 : 255 + f * a | 0
							}
							return t
						},
						getData: function(t, e, i) {
							if (this.numComponents > 4) throw "Unsupported color mode";
							var n = this._getLinearizedBlockData(t, e);
							if (3 === this.numComponents) return this._convertYccToRgb(n);
							if (4 === this.numComponents) {
								if (this._isColorConversionNeeded()) return i ? this._convertYcckToRgb(n) : this._convertYcckToCmyk(n);
								if (i) return this._convertCmykToRgb(n)
							}
							return n
						}
					}, t
				}(),
					a = function() {
						function t(t, e, i) {
							this.data = t, this.bp = e, this.dataEnd = i, this.chigh = t[e], this.clow = 0, this.byteIn(), this.chigh = this.chigh << 7 & 65535 | this.clow >> 9 & 127, this.clow = this.clow << 7 & 65535, this.ct -= 7, this.a = 32768
						}
						var e = [{
							qe: 22017,
							nmps: 1,
							nlps: 1,
							switchFlag: 1
						}, {
							qe: 13313,
							nmps: 2,
							nlps: 6,
							switchFlag: 0
						}, {
							qe: 6145,
							nmps: 3,
							nlps: 9,
							switchFlag: 0
						}, {
							qe: 2753,
							nmps: 4,
							nlps: 12,
							switchFlag: 0
						}, {
							qe: 1313,
							nmps: 5,
							nlps: 29,
							switchFlag: 0
						}, {
							qe: 545,
							nmps: 38,
							nlps: 33,
							switchFlag: 0
						}, {
							qe: 22017,
							nmps: 7,
							nlps: 6,
							switchFlag: 1
						}, {
							qe: 21505,
							nmps: 8,
							nlps: 14,
							switchFlag: 0
						}, {
							qe: 18433,
							nmps: 9,
							nlps: 14,
							switchFlag: 0
						}, {
							qe: 14337,
							nmps: 10,
							nlps: 14,
							switchFlag: 0
						}, {
							qe: 12289,
							nmps: 11,
							nlps: 17,
							switchFlag: 0
						}, {
							qe: 9217,
							nmps: 12,
							nlps: 18,
							switchFlag: 0
						}, {
							qe: 7169,
							nmps: 13,
							nlps: 20,
							switchFlag: 0
						}, {
							qe: 5633,
							nmps: 29,
							nlps: 21,
							switchFlag: 0
						}, {
							qe: 22017,
							nmps: 15,
							nlps: 14,
							switchFlag: 1
						}, {
							qe: 21505,
							nmps: 16,
							nlps: 14,
							switchFlag: 0
						}, {
							qe: 20737,
							nmps: 17,
							nlps: 15,
							switchFlag: 0
						}, {
							qe: 18433,
							nmps: 18,
							nlps: 16,
							switchFlag: 0
						}, {
							qe: 14337,
							nmps: 19,
							nlps: 17,
							switchFlag: 0
						}, {
							qe: 13313,
							nmps: 20,
							nlps: 18,
							switchFlag: 0
						}, {
							qe: 12289,
							nmps: 21,
							nlps: 19,
							switchFlag: 0
						}, {
							qe: 10241,
							nmps: 22,
							nlps: 19,
							switchFlag: 0
						}, {
							qe: 9217,
							nmps: 23,
							nlps: 20,
							switchFlag: 0
						}, {
							qe: 8705,
							nmps: 24,
							nlps: 21,
							switchFlag: 0
						}, {
							qe: 7169,
							nmps: 25,
							nlps: 22,
							switchFlag: 0
						}, {
							qe: 6145,
							nmps: 26,
							nlps: 23,
							switchFlag: 0
						}, {
							qe: 5633,
							nmps: 27,
							nlps: 24,
							switchFlag: 0
						}, {
							qe: 5121,
							nmps: 28,
							nlps: 25,
							switchFlag: 0
						}, {
							qe: 4609,
							nmps: 29,
							nlps: 26,
							switchFlag: 0
						}, {
							qe: 4353,
							nmps: 30,
							nlps: 27,
							switchFlag: 0
						}, {
							qe: 2753,
							nmps: 31,
							nlps: 28,
							switchFlag: 0
						}, {
							qe: 2497,
							nmps: 32,
							nlps: 29,
							switchFlag: 0
						}, {
							qe: 2209,
							nmps: 33,
							nlps: 30,
							switchFlag: 0
						}, {
							qe: 1313,
							nmps: 34,
							nlps: 31,
							switchFlag: 0
						}, {
							qe: 1089,
							nmps: 35,
							nlps: 32,
							switchFlag: 0
						}, {
							qe: 673,
							nmps: 36,
							nlps: 33,
							switchFlag: 0
						}, {
							qe: 545,
							nmps: 37,
							nlps: 34,
							switchFlag: 0
						}, {
							qe: 321,
							nmps: 38,
							nlps: 35,
							switchFlag: 0
						}, {
							qe: 273,
							nmps: 39,
							nlps: 36,
							switchFlag: 0
						}, {
							qe: 133,
							nmps: 40,
							nlps: 37,
							switchFlag: 0
						}, {
							qe: 73,
							nmps: 41,
							nlps: 38,
							switchFlag: 0
						}, {
							qe: 37,
							nmps: 42,
							nlps: 39,
							switchFlag: 0
						}, {
							qe: 21,
							nmps: 43,
							nlps: 40,
							switchFlag: 0
						}, {
							qe: 9,
							nmps: 44,
							nlps: 41,
							switchFlag: 0
						}, {
							qe: 5,
							nmps: 45,
							nlps: 42,
							switchFlag: 0
						}, {
							qe: 1,
							nmps: 45,
							nlps: 43,
							switchFlag: 0
						}, {
							qe: 22017,
							nmps: 46,
							nlps: 46,
							switchFlag: 0
						}];
						return t.prototype = {
							byteIn: function() {
								var t = this.data,
									e = this.bp;
								if (255 === t[e]) {
									var i = t[e + 1];
									i > 143 ? (this.clow += 65280, this.ct = 8) : (e++, this.clow += t[e] << 9, this.ct = 7, this.bp = e)
								} else e++, this.clow += e < this.dataEnd ? t[e] << 8 : 65280, this.ct = 8, this.bp = e;
								this.clow > 65535 && (this.chigh += this.clow >> 16, this.clow &= 65535)
							},
							readBit: function(t, i) {
								var n, r = t[i] >> 1,
									o = 1 & t[i],
									s = e[r],
									a = s.qe,
									c = this.a - a;
								if (this.chigh < a) a > c ? (c = a, n = o, r = s.nmps) : (c = a, n = 1 ^ o, 1 === s.switchFlag && (o = n), r = s.nlps);
								else {
									if (this.chigh -= a, 0 !== (32768 & c)) return this.a = c, o;
									a > c ? (n = 1 ^ o, 1 === s.switchFlag && (o = n), r = s.nlps) : (n = o, r = s.nmps)
								}
								do 0 === this.ct && this.byteIn(), c <<= 1, this.chigh = this.chigh << 1 & 65535 | this.clow >> 15 & 1, this.clow = this.clow << 1 & 65535, this.ct--;
								while (0 === (32768 & c));
								return this.a = c, t[i] = r << 1 | o, n
							}
						}, t
					}(),
					c = function() {
						function t() {
							this.failOnCorruptedImage = !1
						}
						function i(t, e) {
							t.x0 = Math.ceil(e.XOsiz / t.XRsiz), t.x1 = Math.ceil(e.Xsiz / t.XRsiz), t.y0 = Math.ceil(e.YOsiz / t.YRsiz), t.y1 = Math.ceil(e.Ysiz / t.YRsiz), t.width = t.x1 - t.x0, t.height = t.y1 - t.y0
						}
						function o(t, e) {
							for (var i, n = t.SIZ, r = [], o = Math.ceil((n.Xsiz - n.XTOsiz) / n.XTsiz), s = Math.ceil((n.Ysiz - n.YTOsiz) / n.YTsiz), a = 0; s > a; a++) for (var c = 0; o > c; c++) i = {}, i.tx0 = Math.max(n.XTOsiz + c * n.XTsiz, n.XOsiz), i.ty0 = Math.max(n.YTOsiz + a * n.YTsiz, n.YOsiz), i.tx1 = Math.min(n.XTOsiz + (c + 1) * n.XTsiz, n.Xsiz), i.ty1 = Math.min(n.YTOsiz + (a + 1) * n.YTsiz, n.Ysiz), i.width = i.tx1 - i.tx0, i.height = i.ty1 - i.ty0, i.components = [], r.push(i);
							t.tiles = r;
							for (var h = n.Csiz, l = 0, u = h; u > l; l++) for (var f = e[l], d = 0, p = r.length; p > d; d++) {
								var g = {};
								i = r[d], g.tcx0 = Math.ceil(i.tx0 / f.XRsiz), g.tcy0 = Math.ceil(i.ty0 / f.YRsiz), g.tcx1 = Math.ceil(i.tx1 / f.XRsiz), g.tcy1 = Math.ceil(i.ty1 / f.YRsiz), g.width = g.tcx1 - g.tcx0, g.height = g.tcy1 - g.tcy0, i.components[l] = g
							}
						}
						function s(t, e, i) {
							var n = e.codingStyleParameters,
								r = {};
							return n.entropyCoderWithCustomPrecincts ? (r.PPx = n.precinctsSizes[i].PPx, r.PPy = n.precinctsSizes[i].PPy) : (r.PPx = 15, r.PPy = 15), r.xcb_ = i > 0 ? Math.min(n.xcb, r.PPx - 1) : Math.min(n.xcb, r.PPx), r.ycb_ = i > 0 ? Math.min(n.ycb, r.PPy - 1) : Math.min(n.ycb, r.PPy), r
						}
						function c(t, e, i) {
							var n = 1 << i.PPx,
								r = 1 << i.PPy,
								o = 0 === e.resLevel,
								s = 1 << i.PPx + (o ? 0 : -1),
								a = 1 << i.PPy + (o ? 0 : -1),
								c = e.trx1 > e.trx0 ? Math.ceil(e.trx1 / n) - Math.floor(e.trx0 / n) : 0,
								h = e.try1 > e.try0 ? Math.ceil(e.try1 / r) - Math.floor(e.try0 / r) : 0,
								l = c * h;
							e.precinctParameters = {
								precinctWidth: n,
								precinctHeight: r,
								numprecinctswide: c,
								numprecinctshigh: h,
								numprecincts: l,
								precinctWidthInSubband: s,
								precinctHeightInSubband: a
							}
						}
						function h(t, e, i) {
							var n, r, o, s, a = i.xcb_,
								c = i.ycb_,
								h = 1 << a,
								l = 1 << c,
								u = e.tbx0 >> a,
								f = e.tby0 >> c,
								d = e.tbx1 + h - 1 >> a,
								p = e.tby1 + l - 1 >> c,
								g = e.resolution.precinctParameters,
								v = [],
								m = [];
							for (r = f; p > r; r++) for (n = u; d > n; n++) {
								o = {
									cbx: n,
									cby: r,
									tbx0: h * n,
									tby0: l * r,
									tbx1: h * (n + 1),
									tby1: l * (r + 1)
								}, o.tbx0_ = Math.max(e.tbx0, o.tbx0), o.tby0_ = Math.max(e.tby0, o.tby0), o.tbx1_ = Math.min(e.tbx1, o.tbx1), o.tby1_ = Math.min(e.tby1, o.tby1);
								var b = Math.floor((o.tbx0_ - e.tbx0) / g.precinctWidthInSubband),
									y = Math.floor((o.tby0_ - e.tby0) / g.precinctHeightInSubband);
								if (s = b + y * g.numprecinctswide, o.precinctNumber = s, o.subbandType = e.type, o.Lblock = 3, !(o.tbx1_ <= o.tbx0_ || o.tby1_ <= o.tby0_)) {
									v.push(o);
									var _ = m[s];
									void 0 !== _ ? (n < _.cbxMin ? _.cbxMin = n : n > _.cbxMax && (_.cbxMax = n), r < _.cbyMin ? _.cbxMin = r : r > _.cbyMax && (_.cbyMax = r)) : m[s] = _ = {
										cbxMin: n,
										cbyMin: r,
										cbxMax: n,
										cbyMax: r
									}, o.precinct = _
								}
							}
							e.codeblockParameters = {
								codeblockWidth: a,
								codeblockHeight: c,
								numcodeblockwide: d - u + 1,
								numcodeblockhigh: p - f + 1
							}, e.codeblocks = v, e.precincts = m
						}
						function l(t, e, i) {
							for (var n = [], r = t.subbands, o = 0, s = r.length; s > o; o++) for (var a = r[o], c = a.codeblocks, h = 0, l = c.length; l > h; h++) {
								var u = c[h];
								u.precinctNumber === e && n.push(u)
							}
							return {
								layerNumber: i,
								codeblocks: n
							}
						}
						function d(t) {
							for (var e = t.SIZ, i = t.currentTile.index, n = t.tiles[i], r = n.codingStyleDefaultParameters.layersCount, o = e.Csiz, s = 0, a = 0; o > a; a++) s = Math.max(s, n.components[a].codingStyleParameters.decompositionLevelsCount);
							var c = 0,
								h = 0,
								u = 0,
								f = 0;
							this.nextPacket = function() {
								for (; r > c; c++) {
									for (; s >= h; h++) {
										for (; o > u; u++) {
											var t = n.components[u];
											if (!(h > t.codingStyleParameters.decompositionLevelsCount)) {
												for (var e = t.resolutions[h], i = e.precinctParameters.numprecincts; i > f;) {
													var a = l(e, f, c);
													return f++, a
												}
												f = 0
											}
										}
										u = 0
									}
									h = 0
								}
								throw new Error("JPX Error: Out of packets")
							}
						}
						function p(t) {
							for (var e = t.SIZ, i = t.currentTile.index, n = t.tiles[i], r = n.codingStyleDefaultParameters.layersCount, o = e.Csiz, s = 0, a = 0; o > a; a++) s = Math.max(s, n.components[a].codingStyleParameters.decompositionLevelsCount);
							var c = 0,
								h = 0,
								u = 0,
								f = 0;
							this.nextPacket = function() {
								for (; s >= c; c++) {
									for (; r > h; h++) {
										for (; o > u; u++) {
											var t = n.components[u];
											if (!(c > t.codingStyleParameters.decompositionLevelsCount)) {
												for (var e = t.resolutions[c], i = e.precinctParameters.numprecincts; i > f;) {
													var a = l(e, f, h);
													return f++, a
												}
												f = 0
											}
										}
										u = 0
									}
									h = 0
								}
								throw new Error("JPX Error: Out of packets")
							}
						}
						function g(t) {
							var e, i, n, r, o = t.SIZ,
								s = t.currentTile.index,
								a = t.tiles[s],
								c = a.codingStyleDefaultParameters.layersCount,
								h = o.Csiz,
								u = 0;
							for (n = 0; h > n; n++) {
								var f = a.components[n];
								u = Math.max(u, f.codingStyleParameters.decompositionLevelsCount)
							}
							var d = new Int32Array(u + 1);
							for (i = 0; u >= i; ++i) {
								var p = 0;
								for (n = 0; h > n; ++n) {
									var g = a.components[n].resolutions;
									i < g.length && (p = Math.max(p, g[i].precinctParameters.numprecincts))
								}
								d[i] = p
							}
							e = 0, i = 0, n = 0, r = 0, this.nextPacket = function() {
								for (; u >= i; i++) {
									for (; r < d[i]; r++) {
										for (; h > n; n++) {
											var t = a.components[n];
											if (!(i > t.codingStyleParameters.decompositionLevelsCount)) {
												var o = t.resolutions[i],
													s = o.precinctParameters.numprecincts;
												if (!(r >= s)) {
													for (; c > e;) {
														var f = l(o, r, e);
														return e++, f
													}
													e = 0
												}
											}
										}
										n = 0
									}
									r = 0
								}
								throw new Error("JPX Error: Out of packets")
							}
						}
						function v(t) {
							var e = t.SIZ,
								i = t.currentTile.index,
								n = t.tiles[i],
								r = n.codingStyleDefaultParameters.layersCount,
								o = e.Csiz,
								s = y(n),
								a = s,
								c = 0,
								h = 0,
								u = 0,
								f = 0,
								d = 0;
							this.nextPacket = function() {
								for (; d < a.maxNumHigh; d++) {
									for (; f < a.maxNumWide; f++) {
										for (; o > u; u++) {
											for (var t = n.components[u], e = t.codingStyleParameters.decompositionLevelsCount; e >= h; h++) {
												var i = t.resolutions[h],
													p = s.components[u].resolutions[h],
													g = b(f, d, p, a, i);
												if (null !== g) {
													for (; r > c;) {
														var v = l(i, g, c);
														return c++, v
													}
													c = 0
												}
											}
											h = 0
										}
										u = 0
									}
									f = 0
								}
								throw new Error("JPX Error: Out of packets")
							}
						}
						function m(t) {
							var e = t.SIZ,
								i = t.currentTile.index,
								n = t.tiles[i],
								r = n.codingStyleDefaultParameters.layersCount,
								o = e.Csiz,
								s = y(n),
								a = 0,
								c = 0,
								h = 0,
								u = 0,
								f = 0;
							this.nextPacket = function() {
								for (; o > h; ++h) {
									for (var t = n.components[h], e = s.components[h], i = t.codingStyleParameters.decompositionLevelsCount; f < e.maxNumHigh; f++) {
										for (; u < e.maxNumWide; u++) {
											for (; i >= c; c++) {
												var d = t.resolutions[c],
													p = e.resolutions[c],
													g = b(u, f, p, e, d);
												if (null !== g) {
													for (; r > a;) {
														var v = l(d, g, a);
														return a++, v
													}
													a = 0
												}
											}
											c = 0
										}
										u = 0
									}
									f = 0
								}
								throw new Error("JPX Error: Out of packets")
							}
						}
						function b(t, e, i, n, r) {
							var o = t * n.minWidth,
								s = e * n.minHeight;
							if (o % i.width !== 0 || s % i.height !== 0) return null;
							var a = s / i.width * r.precinctParameters.numprecinctswide;
							return o / i.height + a
						}
						function y(t) {
							for (var e = t.components.length, i = Number.MAX_VALUE, n = Number.MAX_VALUE, r = 0, o = 0, s = new Array(e), a = 0; e > a; a++) {
								for (var c = t.components[a], h = c.codingStyleParameters.decompositionLevelsCount, l = new Array(h + 1), u = Number.MAX_VALUE, f = Number.MAX_VALUE, d = 0, p = 0, g = 1, v = h; v >= 0; --v) {
									var m = c.resolutions[v],
										b = g * m.precinctParameters.precinctWidth,
										y = g * m.precinctParameters.precinctHeight;
									u = Math.min(u, b), f = Math.min(f, y), d = Math.max(d, m.precinctParameters.numprecinctswide), p = Math.max(p, m.precinctParameters.numprecinctshigh), l[v] = {
										width: b,
										height: y
									}, g <<= 1
								}
								i = Math.min(i, u), n = Math.min(n, f), r = Math.max(r, d), o = Math.max(o, p), s[a] = {
									resolutions: l,
									minWidth: u,
									minHeight: f,
									maxNumWide: d,
									maxNumHigh: p
								}
							}
							return {
								components: s,
								minWidth: i,
								minHeight: n,
								maxNumWide: r,
								maxNumHigh: o
							}
						}
						function _(t) {
							for (var e = t.SIZ, i = t.currentTile.index, n = t.tiles[i], r = e.Csiz, o = 0; r > o; o++) {
								for (var a = n.components[o], l = a.codingStyleParameters.decompositionLevelsCount, u = [], f = [], b = 0; l >= b; b++) {
									var y = s(t, a, b),
										_ = {}, w = 1 << l - b;
									_.trx0 = Math.ceil(a.tcx0 / w), _.try0 = Math.ceil(a.tcy0 / w), _.trx1 = Math.ceil(a.tcx1 / w), _.try1 = Math.ceil(a.tcy1 / w), _.resLevel = b, c(t, _, y), u.push(_);
									var x;
									if (0 === b) x = {}, x.type = "LL", x.tbx0 = Math.ceil(a.tcx0 / w), x.tby0 = Math.ceil(a.tcy0 / w), x.tbx1 = Math.ceil(a.tcx1 / w), x.tby1 = Math.ceil(a.tcy1 / w), x.resolution = _, h(t, x, y), f.push(x), _.subbands = [x];
									else {
										var S = 1 << l - b + 1,
											C = [];
										x = {}, x.type = "HL", x.tbx0 = Math.ceil(a.tcx0 / S - .5), x.tby0 = Math.ceil(a.tcy0 / S), x.tbx1 = Math.ceil(a.tcx1 / S - .5), x.tby1 = Math.ceil(a.tcy1 / S), x.resolution = _, h(t, x, y), f.push(x), C.push(x), x = {}, x.type = "LH", x.tbx0 = Math.ceil(a.tcx0 / S), x.tby0 = Math.ceil(a.tcy0 / S - .5), x.tbx1 = Math.ceil(a.tcx1 / S), x.tby1 = Math.ceil(a.tcy1 / S - .5), x.resolution = _, h(t, x, y), f.push(x), C.push(x), x = {}, x.type = "HH", x.tbx0 = Math.ceil(a.tcx0 / S - .5), x.tby0 = Math.ceil(a.tcy0 / S - .5), x.tbx1 = Math.ceil(a.tcx1 / S - .5), x.tby1 = Math.ceil(a.tcy1 / S - .5), x.resolution = _, h(t, x, y), f.push(x), C.push(x), _.subbands = C
									}
								}
								a.resolutions = u, a.subbands = f
							}
							var k = n.codingStyleDefaultParameters.progressionOrder;
							switch (k) {
								case 0:
									n.packetsIterator = new d(t);
									break;
								case 1:
									n.packetsIterator = new p(t);
									break;
								case 2:
									n.packetsIterator = new g(t);
									break;
								case 3:
									n.packetsIterator = new v(t);
									break;
								case 4:
									n.packetsIterator = new m(t);
									break;
								default:
									throw new Error("JPX Error: Unsupported progression order " + k)
							}
						}
						function w(t, i, n, r) {
							function o(t) {
								for (; t > f;) {
									var e = i[n + u];
									u++, d ? (l = l << 7 | e, f += 7, d = !1) : (l = l << 8 | e, f += 8), 255 === e && (d = !0)
								}
								return f -= t, l >>> f & (1 << t) - 1
							}
							function s(t) {
								return 255 === i[n + u - 1] && i[n + u] === t ? (a(1), !0) : 255 === i[n + u] && i[n + u + 1] === t ? (a(2), !0) : !1
							}
							function a(t) {
								u += t
							}
							function c() {
								f = 0, d && (u++, d = !1)
							}
							function h() {
								if (0 === o(1)) return 1;
								if (0 === o(1)) return 2;
								var t = o(2);
								return 3 > t ? t + 3 : (t = o(5), 31 > t ? t + 6 : (t = o(7), t + 37))
							}
							for (var l, u = 0, f = 0, d = !1, p = t.currentTile.index, g = t.tiles[p], v = t.COD.sopMarkerUsed, m = t.COD.ephMarkerUsed, b = g.packetsIterator; r > u;) {
								c(), v && s(145) && a(4);
								var y = b.nextPacket();
								if (o(1)) {
									for (var _, w = y.layerNumber, x = [], S = 0, C = y.codeblocks.length; C > S; S++) {
										_ = y.codeblocks[S];
										var k, T = _.precinct,
											j = _.cbx - T.cbxMin,
											A = _.cby - T.cbyMin,
											I = !1,
											P = !1;
										if (void 0 !== _.included) I = !! o(1);
										else {
											T = _.precinct;
											var L, M;
											if (void 0 !== T.inclusionTree) L = T.inclusionTree;
											else {
												var D = T.cbxMax - T.cbxMin + 1,
													R = T.cbyMax - T.cbyMin + 1;
												L = new O(D, R, w), M = new E(D, R), T.inclusionTree = L, T.zeroBitPlanesTree = M
											}
											if (L.reset(j, A, w)) for (;;) {
												if (!o(1)) {
													L.incrementValue(w);
													break
												}
												if (k = !L.nextLevel()) {
													_.included = !0, I = P = !0;
													break
												}
											}
										}
										if (I) {
											if (P) {
												for (M = T.zeroBitPlanesTree, M.reset(j, A);;) if (o(1)) {
													if (k = !M.nextLevel()) break
												} else M.incrementValue();
												_.zeroBitPlanes = M.value
											}
											for (var F = h(); o(1);) _.Lblock++;
											var B = e(F),
												U = (1 << B > F ? B - 1 : B) + _.Lblock,
												z = o(U);
											x.push({
												codeblock: _,
												codingpasses: F,
												dataLength: z
											})
										}
									}
									for (c(), m && s(146); x.length > 0;) {
										var N = x.shift();
										_ = N.codeblock, void 0 === _.data && (_.data = []), _.data.push({
											data: i,
											start: n + u,
											end: n + u + N.dataLength,
											codingpasses: N.codingpasses
										}), u += N.dataLength
									}
								}
							}
							return u
						}
						function x(t, e, i, n, r, o, s, c) {
							for (var h = n.tbx0, l = n.tby0, u = n.tbx1 - n.tbx0, f = n.codeblocks, d = "H" === n.type.charAt(0) ? 1 : 0, p = "H" === n.type.charAt(1) ? e : 0, g = 0, v = f.length; v > g; ++g) {
								var m = f[g],
									b = m.tbx1_ - m.tbx0_,
									y = m.tby1_ - m.tby0_;
								if (0 !== b && 0 !== y && void 0 !== m.data) {
									var _, w;
									_ = new j(b, y, m.subbandType, m.zeroBitPlanes, o), w = 2;
									var x, S, C, k = m.data,
										T = 0,
										E = 0;
									for (x = 0, S = k.length; S > x; x++) C = k[x], T += C.end - C.start, E += C.codingpasses;
									var O = new Uint8Array(T),
										A = 0;
									for (x = 0, S = k.length; S > x; x++) {
										C = k[x];
										var I = C.data.subarray(C.start, C.end);
										O.set(I, A), A += I.length
									}
									var P = new a(O, 0, T);
									for (_.setDecoder(P), x = 0; E > x; x++) {
										switch (w) {
											case 0:
												_.runSignificancePropogationPass();
												break;
											case 1:
												_.runMagnitudeRefinementPass();
												break;
											case 2:
												_.runCleanupPass(), c && _.checkSegmentationSymbol()
										}
										w = (w + 1) % 3
									}
									var L, M, D, R = m.tbx0_ - h + (m.tby0_ - l) * u,
										F = _.coefficentsSign,
										B = _.coefficentsMagnitude,
										U = _.bitsDecoded,
										z = s ? 0 : .5;
									A = 0;
									var N = "LL" !== n.type;
									for (x = 0; y > x; x++) {
										var Y = R / u | 0,
											X = 2 * Y * (e - u) + d + p;
										for (L = 0; b > L; L++) {
											if (M = B[A], 0 !== M) {
												M = (M + z) * r, 0 !== F[A] && (M = -M), D = U[A];
												var W = N ? X + (R << 1) : R;
												s && D >= o ? t[W] = M : t[W] = M * (1 << o - D)
											}
											R++, A++
										}
										R += u - b
									}
								}
							}
						}
						function S(t, e, i) {
							for (var n = e.components[i], r = n.codingStyleParameters, o = n.quantizationParameters, s = r.decompositionLevelsCount, a = o.SPqcds, c = o.scalarExpounded, h = o.guardBits, l = r.segmentationSymbolUsed, u = t.components[i].precision, f = r.reversibleTransformation, d = f ? new P : new I, p = [], g = 0, v = 0; s >= v; v++) {
								for (var m = n.resolutions[v], b = m.trx1 - m.trx0, y = m.try1 - m.try0, _ = new Float32Array(b * y), w = 0, S = m.subbands.length; S > w; w++) {
									var C, k;
									c ? (C = a[g].mu, k = a[g].epsilon, g++) : (C = a[0].mu, k = a[0].epsilon + (v > 0 ? 1 - v : 0));
									var E = m.subbands[w],
										O = T[E.type],
										j = f ? 1 : Math.pow(2, u + O - k) * (1 + C / 2048),
										A = h + k - 1;
									x(_, b, y, E, j, A, f, l)
								}
								p.push({
									width: b,
									height: y,
									items: _
								})
							}
							var L = d.calculate(p, n.tcx0, n.tcy0);
							return {
								left: n.tcx0,
								top: n.tcy0,
								width: L.width,
								height: L.height,
								items: L.items
							}
						}
						function C(t) {
							for (var e = t.SIZ, i = t.components, n = e.Csiz, r = [], o = 0, s = t.tiles.length; s > o; o++) {
								var a, c = t.tiles[o],
									h = [];
								for (a = 0; n > a; a++) h[a] = S(t, c, a);
								var l, u, f, d, p, g, v, m, b, y, _, w, x, C, k, T = h[0],
									E = new Uint8Array(T.items.length * n),
									O = {
										left: T.left,
										top: T.top,
										width: T.width,
										height: T.height,
										items: E
									}, j = 0;
								if (c.codingStyleDefaultParameters.multipleComponentTransform) {
									var A = 4 === n,
										I = h[0].items,
										P = h[1].items,
										L = h[2].items,
										M = A ? h[3].items : null;
									l = i[0].precision - 8, u = (128 << l) + .5, f = 255 * (1 << l), p = .5 * f, d = -p;
									var D = c.components[0],
										R = n - 3;
									if (v = I.length, D.codingStyleParameters.reversibleTransformation) for (g = 0; v > g; g++, j += R) m = I[g] + u, b = P[g], y = L[g], w = m - (y + b >> 2), _ = w + y, x = w + b, E[j++] = 0 >= _ ? 0 : _ >= f ? 255 : _ >> l, E[j++] = 0 >= w ? 0 : w >= f ? 255 : w >> l, E[j++] = 0 >= x ? 0 : x >= f ? 255 : x >> l;
									else for (g = 0; v > g; g++, j += R) m = I[g] + u, b = P[g], y = L[g], _ = m + 1.402 * y, w = m - .34413 * b - .71414 * y, x = m + 1.772 * b, E[j++] = 0 >= _ ? 0 : _ >= f ? 255 : _ >> l, E[j++] = 0 >= w ? 0 : w >= f ? 255 : w >> l, E[j++] = 0 >= x ? 0 : x >= f ? 255 : x >> l;
									if (A) for (g = 0, j = 3; v > g; g++, j += 4) C = M[g], E[j] = d >= C ? 0 : C >= p ? 255 : C + u >> l
								} else for (a = 0; n > a; a++) {
									var F = h[a].items;
									for (l = i[a].precision - 8, u = (128 << l) + .5, f = 127.5 * (1 << l), d = -f, j = a, g = 0, v = F.length; v > g; g++) k = F[g], E[j] = d >= k ? 0 : k >= f ? 255 : k + u >> l, j += n
								}
								r.push(O)
							}
							return r
						}
						function k(t, e) {
							for (var i = t.SIZ, n = i.Csiz, r = t.tiles[e], o = 0; n > o; o++) {
								var s = r.components[o],
									a = void 0 !== t.currentTile.QCC[o] ? t.currentTile.QCC[o] : t.currentTile.QCD;
								s.quantizationParameters = a;
								var c = void 0 !== t.currentTile.COC[o] ? t.currentTile.COC[o] : t.currentTile.COD;
								s.codingStyleParameters = c
							}
							r.codingStyleDefaultParameters = t.currentTile.COD
						}
						var T = {
							LL: 0,
							LH: 1,
							HL: 1,
							HH: 2
						};
						t.prototype = {
							parse: function(t) {
								var e = n(t, 0);
								if (65359 === e) return void this.parseCodestream(t, 0, t.length);
								for (var i = 0, o = t.length; o > i;) {
									var s = 8,
										a = r(t, i),
										c = r(t, i + 4);
									if (i += s, 1 === a && (a = 4294967296 * r(t, i) + r(t, i + 4), i += 8, s += 8), 0 === a && (a = o - i + s), s > a) throw new Error("JPX Error: Invalid box field size");
									var h = a - s,
										l = !0;
									switch (c) {
										case 1785737832:
											l = !1;
											break;
										case 1668246642:
											var d = t[i];
											t[i + 1], t[i + 2];
											if (1 === d) {
												var p = r(t, i + 3);
												switch (p) {
													case 16:
													case 17:
													case 18:
														break;
													default:
														u("Unknown colorspace " + p)
												}
											} else 2 === d && f("ICC profile not supported");
											break;
										case 1785737827:
											this.parseCodestream(t, i, i + h);
											break;
										case 1783636e3:
											218793738 !== r(t, i) && u("Invalid JP2 signature");
											break;
										case 1783634458:
										case 1718909296:
										case 1920099697:
										case 1919251232:
										case 1768449138:
											break;
										default:
											var g = String.fromCharCode(c >> 24 & 255, c >> 16 & 255, c >> 8 & 255, 255 & c);
											u("Unsupported header type " + c + " (" + g + ")")
									}
									l && (i += h)
								}
							},
							parseImageProperties: function(t) {
								for (var e = t.getByte(); e >= 0;) {
									var i = e;
									e = t.getByte();
									var n = i << 8 | e;
									if (65361 === n) {
										t.skip(4);
										var r = t.getInt32() >>> 0,
											o = t.getInt32() >>> 0,
											s = t.getInt32() >>> 0,
											a = t.getInt32() >>> 0;
										t.skip(16);
										var c = t.getUint16();
										return this.width = r - s, this.height = o - a, this.componentsCount = c, void(this.bitsPerComponent = 8)
									}
								}
								throw new Error("JPX Error: No size marker found in JPX stream")
							},
							parseCodestream: function(t, e, s) {
								var a = {};
								try {
									for (var c = !1, h = e; s > h + 1;) {
										var l = n(t, h);
										h += 2;
										var f, d, p, g, v, m, b = 0;
										switch (l) {
											case 65359:
												a.mainHeader = !0;
												break;
											case 65497:
												break;
											case 65361:
												b = n(t, h);
												var y = {};
												y.Xsiz = r(t, h + 4), y.Ysiz = r(t, h + 8), y.XOsiz = r(t, h + 12), y.YOsiz = r(t, h + 16), y.XTsiz = r(t, h + 20), y.YTsiz = r(t, h + 24), y.XTOsiz = r(t, h + 28), y.YTOsiz = r(t, h + 32);
												var x = n(t, h + 36);
												y.Csiz = x;
												var S = [];
												f = h + 38;
												for (var T = 0; x > T; T++) {
													var E = {
														precision: (127 & t[f]) + 1,
														isSigned: !! (128 & t[f]),
														XRsiz: t[f + 1],
														YRsiz: t[f + 1]
													};
													i(E, y), S.push(E)
												}
												a.SIZ = y, a.components = S, o(a, S), a.QCC = [], a.COC = [];
												break;
											case 65372:
												b = n(t, h);
												var O = {};
												switch (f = h + 2, d = t[f++], 31 & d) {
													case 0:
														g = 8, v = !0;
														break;
													case 1:
														g = 16, v = !1;
														break;
													case 2:
														g = 16, v = !0;
														break;
													default:
														throw new Error("JPX Error: Invalid SQcd value " + d)
												}
												for (O.noQuantization = 8 === g, O.scalarExpounded = v, O.guardBits = d >> 5, p = []; b + h > f;) {
													var j = {};
													8 === g ? (j.epsilon = t[f++] >> 3, j.mu = 0) : (j.epsilon = t[f] >> 3, j.mu = (7 & t[f]) << 8 | t[f + 1], f += 2), p.push(j)
												}
												O.SPqcds = p, a.mainHeader ? a.QCD = O : (a.currentTile.QCD = O, a.currentTile.QCC = []);
												break;
											case 65373:
												b = n(t, h);
												var A = {};
												f = h + 2;
												var I;
												switch (a.SIZ.Csiz < 257 ? I = t[f++] : (I = n(t, f), f += 2), d = t[f++], 31 & d) {
													case 0:
														g = 8, v = !0;
														break;
													case 1:
														g = 16, v = !1;
														break;
													case 2:
														g = 16, v = !0;
														break;
													default:
														throw new Error("JPX Error: Invalid SQcd value " + d)
												}
												for (A.noQuantization = 8 === g, A.scalarExpounded = v, A.guardBits = d >> 5, p = []; b + h > f;) j = {}, 8 === g ? (j.epsilon = t[f++] >> 3, j.mu = 0) : (j.epsilon = t[f] >> 3, j.mu = (7 & t[f]) << 8 | t[f + 1], f += 2), p.push(j);
												A.SPqcds = p, a.mainHeader ? a.QCC[I] = A : a.currentTile.QCC[I] = A;
												break;
											case 65362:
												b = n(t, h);
												var P = {};
												f = h + 2;
												var L = t[f++];
												P.entropyCoderWithCustomPrecincts = !! (1 & L), P.sopMarkerUsed = !! (2 & L), P.ephMarkerUsed = !! (4 & L), P.progressionOrder = t[f++], P.layersCount = n(t, f), f += 2, P.multipleComponentTransform = t[f++], P.decompositionLevelsCount = t[f++], P.xcb = (15 & t[f++]) + 2, P.ycb = (15 & t[f++]) + 2;
												var M = t[f++];
												if (P.selectiveArithmeticCodingBypass = !! (1 & M), P.resetContextProbabilities = !! (2 & M), P.terminationOnEachCodingPass = !! (4 & M), P.verticalyStripe = !! (8 & M), P.predictableTermination = !! (16 & M), P.segmentationSymbolUsed = !! (32 & M), P.reversibleTransformation = t[f++], P.entropyCoderWithCustomPrecincts) {
													for (var D = []; b + h > f;) {
														var R = t[f++];
														D.push({
															PPx: 15 & R,
															PPy: R >> 4
														})
													}
													P.precinctsSizes = D
												}
												var F = [];
												if (P.selectiveArithmeticCodingBypass && F.push("selectiveArithmeticCodingBypass"), P.resetContextProbabilities && F.push("resetContextProbabilities"), P.terminationOnEachCodingPass && F.push("terminationOnEachCodingPass"), P.verticalyStripe && F.push("verticalyStripe"), P.predictableTermination && F.push("predictableTermination"), F.length > 0) throw c = !0, new Error("JPX Error: Unsupported COD options (" + F.join(", ") + ")");
												a.mainHeader ? a.COD = P : (a.currentTile.COD = P, a.currentTile.COC = []);
												break;
											case 65424:
												b = n(t, h), m = {}, m.index = n(t, h + 2), m.length = r(t, h + 4), m.dataEnd = m.length + h - 2, m.partIndex = t[h + 8], m.partsCount = t[h + 9], a.mainHeader = !1, 0 === m.partIndex && (m.COD = a.COD, m.COC = a.COC.slice(0), m.QCD = a.QCD, m.QCC = a.QCC.slice(0)), a.currentTile = m;
												break;
											case 65427:
												m = a.currentTile, 0 === m.partIndex && (k(a, m.index), _(a)), b = m.dataEnd - h, w(a, t, h, b);
												break;
											case 65365:
											case 65367:
											case 65368:
											case 65380:
												b = n(t, h);
												break;
											case 65363:
												throw new Error("JPX Error: Codestream code 0xFF53 (COC) is not implemented");
											default:
												throw new Error("JPX Error: Unknown codestream code: " + l.toString(16))
										}
										h += b
									}
								} catch (B) {
									if (c || this.failOnCorruptedImage) throw B;
									u("Trying to recover from " + B.message)
								}
								this.tiles = C(a), this.width = a.SIZ.Xsiz - a.SIZ.XOsiz, this.height = a.SIZ.Ysiz - a.SIZ.YOsiz, this.componentsCount = a.SIZ.Csiz
							}
						};
						var E = function() {
							function t(t, i) {
								var n = e(Math.max(t, i)) + 1;
								this.levels = [];
								for (var r = 0; n > r; r++) {
									var o = {
										width: t,
										height: i,
										items: []
									};
									this.levels.push(o), t = Math.ceil(t / 2), i = Math.ceil(i / 2)
								}
							}
							return t.prototype = {
								reset: function(t, e) {
									for (var i, n = 0, r = 0; n < this.levels.length;) {
										i = this.levels[n];
										var o = t + e * i.width;
										if (void 0 !== i.items[o]) {
											r = i.items[o];
											break
										}
										i.index = o, t >>= 1, e >>= 1, n++
									}
									n--, i = this.levels[n], i.items[i.index] = r, this.currentLevel = n, delete this.value
								},
								incrementValue: function() {
									var t = this.levels[this.currentLevel];
									t.items[t.index]++
								},
								nextLevel: function() {
									var t = this.currentLevel,
										e = this.levels[t],
										i = e.items[e.index];
									return t--, 0 > t ? (this.value = i, !1) : (this.currentLevel = t, e = this.levels[t], e.items[e.index] = i, !0)
								}
							}, t
						}(),
							O = function() {
								function t(t, i, n) {
									var r = e(Math.max(t, i)) + 1;
									this.levels = [];
									for (var o = 0; r > o; o++) {
										for (var s = new Uint8Array(t * i), a = 0, c = s.length; c > a; a++) s[a] = n;
										var h = {
											width: t,
											height: i,
											items: s
										};
										this.levels.push(h), t = Math.ceil(t / 2), i = Math.ceil(i / 2)
									}
								}
								return t.prototype = {
									reset: function(t, e, i) {
										for (var n = 0; n < this.levels.length;) {
											var r = this.levels[n],
												o = t + e * r.width;
											r.index = o;
											var s = r.items[o];
											if (255 === s) break;
											if (s > i) return this.currentLevel = n, this.propagateValues(), !1;
											t >>= 1, e >>= 1, n++
										}
										return this.currentLevel = n - 1, !0
									},
									incrementValue: function(t) {
										var e = this.levels[this.currentLevel];
										e.items[e.index] = t + 1, this.propagateValues()
									},
									propagateValues: function() {
										for (var t = this.currentLevel, e = this.levels[t], i = e.items[e.index]; --t >= 0;) e = this.levels[t], e.items[e.index] = i
									},
									nextLevel: function() {
										var t = this.currentLevel,
											e = this.levels[t],
											i = e.items[e.index];
										return e.items[e.index] = 255, t--, 0 > t ? !1 : (this.currentLevel = t, e = this.levels[t], e.items[e.index] = i, !0)
									}
								}, t
							}(),
							j = function() {
								function t(t, e, i, s, a) {
									this.width = t, this.height = e, this.contextLabelTable = "HH" === i ? o : "HL" === i ? r : n;
									var c = t * e;
									this.neighborsSignificance = new Uint8Array(c), this.coefficentsSign = new Uint8Array(c), this.coefficentsMagnitude = a > 14 ? new Uint32Array(c) : a > 6 ? new Uint16Array(c) : new Uint8Array(c), this.processingFlags = new Uint8Array(c);
									var h = new Uint8Array(c);
									if (0 !== s) for (var l = 0; c > l; l++) h[l] = s;
									this.bitsDecoded = h, this.reset()
								}
								var e = 17,
									i = 18,
									n = new Uint8Array([0, 5, 8, 0, 3, 7, 8, 0, 4, 7, 8, 0, 0, 0, 0, 0, 1, 6, 8, 0, 3, 7, 8, 0, 4, 7, 8, 0, 0, 0, 0, 0, 2, 6, 8, 0, 3, 7, 8, 0, 4, 7, 8, 0, 0, 0, 0, 0, 2, 6, 8, 0, 3, 7, 8, 0, 4, 7, 8, 0, 0, 0, 0, 0, 2, 6, 8, 0, 3, 7, 8, 0, 4, 7, 8]),
									r = new Uint8Array([0, 3, 4, 0, 5, 7, 7, 0, 8, 8, 8, 0, 0, 0, 0, 0, 1, 3, 4, 0, 6, 7, 7, 0, 8, 8, 8, 0, 0, 0, 0, 0, 2, 3, 4, 0, 6, 7, 7, 0, 8, 8, 8, 0, 0, 0, 0, 0, 2, 3, 4, 0, 6, 7, 7, 0, 8, 8, 8, 0, 0, 0, 0, 0, 2, 3, 4, 0, 6, 7, 7, 0, 8, 8, 8]),
									o = new Uint8Array([0, 1, 2, 0, 1, 2, 2, 0, 2, 2, 2, 0, 0, 0, 0, 0, 3, 4, 5, 0, 4, 5, 5, 0, 5, 5, 5, 0, 0, 0, 0, 0, 6, 7, 7, 0, 7, 7, 7, 0, 7, 7, 7, 0, 0, 0, 0, 0, 8, 8, 8, 0, 8, 8, 8, 0, 8, 8, 8, 0, 0, 0, 0, 0, 8, 8, 8, 0, 8, 8, 8, 0, 8, 8, 8]);
								return t.prototype = {
									setDecoder: function(t) {
										this.decoder = t
									},
									reset: function() {
										this.contexts = new Int8Array(19), this.contexts[0] = 8, this.contexts[e] = 92, this.contexts[i] = 6
									},
									setNeighborsSignificance: function(t, e, i) {
										var n, r = this.neighborsSignificance,
											o = this.width,
											s = this.height,
											a = e > 0,
											c = o > e + 1;
										t > 0 && (n = i - o, a && (r[n - 1] += 16), c && (r[n + 1] += 16), r[n] += 4), s > t + 1 && (n = i + o, a && (r[n - 1] += 16), c && (r[n + 1] += 16), r[n] += 4), a && (r[i - 1] += 1), c && (r[i + 1] += 1), r[i] |= 128
									},
									runSignificancePropogationPass: function() {
										for (var t = this.decoder, e = this.width, i = this.height, n = this.coefficentsMagnitude, r = this.coefficentsSign, o = this.neighborsSignificance, s = this.processingFlags, a = this.contexts, c = this.contextLabelTable, h = this.bitsDecoded, l = -2, u = 1, f = 2, d = 0; i > d; d += 4) for (var p = 0; e > p; p++) for (var g = d * e + p, v = 0; 4 > v; v++, g += e) {
											var m = d + v;
											if (m >= i) break;
											if (s[g] &= l, !n[g] && o[g]) {
												var b = c[o[g]],
													y = t.readBit(a, b);
												if (y) {
													var _ = this.decodeSignBit(m, p, g);
													r[g] = _, n[g] = 1, this.setNeighborsSignificance(m, p, g), s[g] |= f
												}
												h[g]++, s[g] |= u
											}
										}
									},
									decodeSignBit: function(t, e, i) {
										var n, r, o, s, a, c, h = this.width,
											l = this.height,
											u = this.coefficentsMagnitude,
											f = this.coefficentsSign;
										s = e > 0 && 0 !== u[i - 1], h > e + 1 && 0 !== u[i + 1] ? (o = f[i + 1], s ? (r = f[i - 1], n = 1 - o - r) : n = 1 - o - o) : s ? (r = f[i - 1], n = 1 - r - r) : n = 0;
										var d = 3 * n;
										return s = t > 0 && 0 !== u[i - h], l > t + 1 && 0 !== u[i + h] ? (o = f[i + h], s ? (r = f[i - h], n = 1 - o - r + d) : n = 1 - o - o + d) : s ? (r = f[i - h], n = 1 - r - r + d) : n = d, n >= 0 ? (a = 9 + n, c = this.decoder.readBit(this.contexts, a)) : (a = 9 - n, c = 1 ^ this.decoder.readBit(this.contexts, a)), c
									},
									runMagnitudeRefinementPass: function() {
										for (var t, e = this.decoder, i = this.width, n = this.height, r = this.coefficentsMagnitude, o = this.neighborsSignificance, s = this.contexts, a = this.bitsDecoded, c = this.processingFlags, h = 1, l = 2, u = i * n, f = 4 * i, d = 0; u > d; d = t) {
											t = Math.min(u, d + f);
											for (var p = 0; i > p; p++) for (var g = d + p; t > g; g += i) if (r[g] && 0 === (c[g] & h)) {
												var v = 16;
												if (0 !== (c[g] & l)) {
													c[g] ^= l;
													var m = 127 & o[g];
													v = 0 === m ? 15 : 14
												}
												var b = e.readBit(s, v);
												r[g] = r[g] << 1 | b, a[g]++, c[g] |= h
											}
										}
									},
									runCleanupPass: function() {
										for (var t, n = this.decoder, r = this.width, o = this.height, s = this.neighborsSignificance, a = this.coefficentsMagnitude, c = this.coefficentsSign, h = this.contexts, l = this.contextLabelTable, u = this.bitsDecoded, f = this.processingFlags, d = 1, p = 2, g = r, v = 2 * r, m = 3 * r, b = 0; o > b; b = t) {
											t = Math.min(b + 4, o);
											for (var y = b * r, _ = o > b + 3, w = 0; r > w; w++) {
												var x, S = y + w,
													C = _ && 0 === f[S] && 0 === f[S + g] && 0 === f[S + v] && 0 === f[S + m] && 0 === s[S] && 0 === s[S + g] && 0 === s[S + v] && 0 === s[S + m],
													k = 0,
													T = S,
													E = b;
												if (C) {
													var O = n.readBit(h, i);
													if (!O) {
														u[S]++, u[S + g]++, u[S + v]++, u[S + m]++;
														continue
													}
													k = n.readBit(h, e) << 1 | n.readBit(h, e), 0 !== k && (E = b + k, T += k * r), x = this.decodeSignBit(E, w, T), c[T] = x, a[T] = 1, this.setNeighborsSignificance(E, w, T), f[T] |= p, T = S;
													for (var j = b; E >= j; j++, T += r) u[T]++;
													k++
												}
												for (E = b + k; t > E; E++, T += r) if (!a[T] && 0 === (f[T] & d)) {
													var A = l[s[T]],
														I = n.readBit(h, A);
													1 === I && (x = this.decodeSignBit(E, w, T), c[T] = x, a[T] = 1, this.setNeighborsSignificance(E, w, T), f[T] |= p), u[T]++
												}
											}
										}
									},
									checkSegmentationSymbol: function() {
										var t = this.decoder,
											i = this.contexts,
											n = t.readBit(i, e) << 3 | t.readBit(i, e) << 2 | t.readBit(i, e) << 1 | t.readBit(i, e);
										if (10 !== n) throw new Error("JPX Error: Invalid segmentation symbol")
									}
								}, t
							}(),
							A = function() {
								function t() {}
								return t.prototype.calculate = function(t, e, i) {
									for (var n = t[0], r = 1, o = t.length; o > r; r++) n = this.iterate(n, t[r], e, i);
									return n
								}, t.prototype.extend = function(t, e, i) {
									var n = e - 1,
										r = e + 1,
										o = e + i - 2,
										s = e + i;
									t[n--] = t[r++], t[s++] = t[o--], t[n--] = t[r++], t[s++] = t[o--], t[n--] = t[r++], t[s++] = t[o--], t[n] = t[r], t[s] = t[o]
								}, t.prototype.iterate = function(t, e, i, n) {
									var r, o, s, a, c, h, l = t.width,
										u = t.height,
										f = t.items,
										d = e.width,
										p = e.height,
										g = e.items;
									for (s = 0, r = 0; u > r; r++) for (a = 2 * r * d, o = 0; l > o; o++, s++, a += 2) g[a] = f[s];
									f = t.items = null;
									var v = 4,
										m = new Float32Array(d + 2 * v);
									if (1 === d) {
										if (0 !== (1 & i)) for (h = 0, s = 0; p > h; h++, s += d) g[s] *= .5
									} else for (h = 0, s = 0; p > h; h++, s += d) m.set(g.subarray(s, s + d), v), this.extend(m, v, d), this.filter(m, v, d), g.set(m.subarray(v, v + d), s);
									var b = 16,
										y = [];
									for (r = 0; b > r; r++) y.push(new Float32Array(p + 2 * v));
									var _, w = 0;
									if (t = v + p, 1 === p) {
										if (0 !== (1 & n)) for (c = 0; d > c; c++) g[c] *= .5
									} else for (c = 0; d > c; c++) {
										if (0 === w) {
											for (b = Math.min(d - c, b), s = c, a = v; t > a; s += d, a++) for (_ = 0; b > _; _++) y[_][a] = g[s + _];
											w = b
										}
										w--;
										var x = y[w];
										if (this.extend(x, v, p), this.filter(x, v, p), 0 === w) for (s = c - b + 1, a = v; t > a; s += d, a++) for (_ = 0; b > _; _++) g[s + _] = y[_][a]
									}
									return {
										width: d,
										height: p,
										items: g
									}
								}, t
							}(),
							I = function() {
								function t() {
									A.call(this)
								}
								return t.prototype = Object.create(A.prototype), t.prototype.filter = function(t, e, i) {
									var n = i >> 1;
									e = 0 | e;
									var r, o, s, a, c = -1.586134342059924,
										h = -.052980118572961,
										l = .882911075530934,
										u = .443506852043971,
										f = 1.230174104914001,
										d = 1 / f;
									for (r = e - 3, o = n + 4; o--; r += 2) t[r] *= d;
									for (r = e - 2, s = u * t[r - 1], o = n + 3; o-- && (a = u * t[r + 1], t[r] = f * t[r] - s - a, o--); r += 2) r += 2, s = u * t[r + 1], t[r] = f * t[r] - s - a;
									for (r = e - 1, s = l * t[r - 1], o = n + 2; o-- && (a = l * t[r + 1], t[r] -= s + a, o--); r += 2) r += 2, s = l * t[r + 1], t[r] -= s + a;
									for (r = e, s = h * t[r - 1], o = n + 1; o-- && (a = h * t[r + 1], t[r] -= s + a, o--); r += 2) r += 2, s = h * t[r + 1], t[r] -= s + a;
									if (0 !== n) for (r = e + 1, s = c * t[r - 1], o = n; o-- && (a = c * t[r + 1], t[r] -= s + a, o--); r += 2) r += 2, s = c * t[r + 1], t[r] -= s + a
								}, t
							}(),
							P = function() {
								function t() {
									A.call(this)
								}
								return t.prototype = Object.create(A.prototype), t.prototype.filter = function(t, e, i) {
									var n = i >> 1;
									e = 0 | e;
									var r, o;
									for (r = e, o = n + 1; o--; r += 2) t[r] -= t[r - 1] + t[r + 1] + 2 >> 2;
									for (r = e + 1, o = n; o--; r += 2) t[r] += t[r - 1] + t[r + 1] >> 1
								}, t
							}();
						return t
					}(),
					h = function() {
						function t() {}
						function s(t, e, i) {
							this.data = t, this.start = e, this.end = i
						}
						function c(t, e, i) {
							function n(t) {
								for (var e = 0, n = 0; t > n; n++) {
									var s = i.readBit(r, o);
									o = 256 > o ? o << 1 | s : 511 & (o << 1 | s) | 256, e = e << 1 | s
								}
								return e >>> 0
							}
							var r = t.getContexts(e),
								o = 1,
								s = n(1),
								a = n(1) ? n(1) ? n(1) ? n(1) ? n(1) ? n(32) + 4436 : n(12) + 340 : n(8) + 84 : n(6) + 20 : n(4) + 4 : n(2);
							return 0 === s ? a : a > 0 ? -a : null
						}
						function h(t, e, i) {
							for (var n = t.getContexts("IAID"), r = 1, o = 0; i > o; o++) {
								var s = e.readBit(n, r);
								r = r << 1 | s
							}
							return 31 > i ? r & (1 << i) - 1 : 2147483647 & r
						}
						function u(t, e, i) {
							var n, r, o, s, a, c, h, l = i.decoder,
								u = i.contextCache.getContexts("GB"),
								f = [],
								d = 31735;
							for (r = 0; e > r; r++) for (a = f[r] = new Uint8Array(t), c = 1 > r ? a : f[r - 1], h = 2 > r ? a : f[r - 2], n = h[0] << 13 | h[1] << 12 | h[2] << 11 | c[0] << 7 | c[1] << 6 | c[2] << 5 | c[3] << 4, o = 0; t > o; o++) a[o] = s = l.readBit(u, n), n = (n & d) << 1 | (t > o + 3 ? h[o + 3] << 11 : 0) | (t > o + 4 ? c[o + 4] << 4 : 0) | s;
							return f
						}
						function f(t, e, i, n, r, o, s, a) {
							if (t && l("JBIG2 error: MMR encoding is not supported"), 0 === n && !o && !r && 4 === s.length && 3 === s[0].x && -1 === s[0].y && -3 === s[1].x && -1 === s[1].y && 2 === s[2].x && -2 === s[2].y && -2 === s[3].x && -2 === s[3].y) return u(e, i, a);
							var c = !! o,
								h = k[n].concat(s);
							h.sort(function(t, e) {
								return t.y - e.y || t.x - e.x
							});
							var f, d, p = h.length,
								g = new Int8Array(p),
								v = new Int8Array(p),
								m = [],
								b = 0,
								y = 0,
								_ = 0,
								w = 0;
							for (d = 0; p > d; d++) g[d] = h[d].x, v[d] = h[d].y, y = Math.min(y, h[d].x), _ = Math.max(_, h[d].x), w = Math.min(w, h[d].y), p - 1 > d && h[d].y === h[d + 1].y && h[d].x === h[d + 1].x - 1 ? b |= 1 << p - 1 - d : m.push(d);
							var x = m.length,
								S = new Int8Array(x),
								C = new Int8Array(x),
								T = new Uint16Array(x);
							for (f = 0; x > f; f++) d = m[f], S[f] = h[d].x, C[f] = h[d].y, T[f] = 1 << p - 1 - d;
							for (var O, j, A, I, P, L = -y, M = -w, D = e - _, R = E[n], F = new Uint8Array(e), B = [], U = a.decoder, z = a.contextCache.getContexts("GB"), N = 0, Y = 0, X = 0; i > X; X++) {
								if (r) {
									var W = U.readBit(z, R);
									if (N ^= W) {
										B.push(F);
										continue
									}
								}
								for (F = new Uint8Array(F), B.push(F), O = 0; e > O; O++) if (c && o[X][O]) F[O] = 0;
								else {
									if (O >= L && D > O && X >= M) for (Y = Y << 1 & b, d = 0; x > d; d++) j = X + C[d], A = O + S[d], I = B[j][A], I && (I = T[d], Y |= I);
									else for (Y = 0, P = p - 1, d = 0; p > d; d++, P--) A = O + g[d], A >= 0 && e > A && (j = X + v[d], j >= 0 && (I = B[j][A], I && (Y |= I << P)));
									var G = U.readBit(z, Y);
									F[O] = G
								}
							}
							return B
						}
						function d(t, e, i, n, r, o, s, a, c) {
							var h = T[i].coding;
							0 === i && (h = h.concat([a[0]]));
							var u, f = h.length,
								d = new Int32Array(f),
								p = new Int32Array(f);
							for (u = 0; f > u; u++) d[u] = h[u].x, p[u] = h[u].y;
							var g = T[i].reference;
							0 === i && (g = g.concat([a[1]]));
							var v = g.length,
								m = new Int32Array(v),
								b = new Int32Array(v);
							for (u = 0; v > u; u++) m[u] = g[u].x, b[u] = g[u].y;
							for (var y = n[0].length, _ = n.length, w = O[i], x = [], S = c.decoder, C = c.contextCache.getContexts("GR"), k = 0, E = 0; e > E; E++) {
								if (s) {
									var j = S.readBit(C, w);
									k ^= j, k && l("JBIG2 error: prediction is not supported")
								}
								var A = new Uint8Array(t);
								x.push(A);
								for (var I = 0; t > I; I++) {
									var P, L, M = 0;
									for (u = 0; f > u; u++) P = E + p[u], L = I + d[u], 0 > P || 0 > L || L >= t ? M <<= 1 : M = M << 1 | x[P][L];
									for (u = 0; v > u; u++) P = E + b[u] + o, L = I + m[u] + r, 0 > P || P >= _ || 0 > L || L >= y ? M <<= 1 : M = M << 1 | n[P][L];
									var D = S.readBit(C, M);
									A[I] = D
								}
							}
							return x
						}
						function p(t, i, n, r, o, s, a, u, p, v, m) {
							t && l("JBIG2 error: huffman is not supported");
							for (var b = [], y = 0, _ = e(n.length + r), w = m.decoder, x = m.contextCache; b.length < r;) {
								var S = c(x, "IADH", w);
								y += S;
								for (var C = 0, k = 0;;) {
									var T = c(x, "IADW", w);
									if (null === T) break;
									C += T, k += C;
									var E;
									if (i) {
										var O = c(x, "IAAI", w);
										if (O > 1) E = g(t, i, C, y, 0, O, 1, n.concat(b), _, 0, 0, 1, 0, s, p, v, m);
										else {
											var j = h(x, w, _),
												A = c(x, "IARDX", w),
												I = c(x, "IARDY", w),
												P = j < n.length ? n[j] : b[j - n.length];
											E = d(C, y, p, P, A, I, !1, v, m)
										}
									} else E = f(!1, C, y, a, !1, null, u, m);
									b.push(E)
								}
							}
							for (var L = [], M = [], D = !1, R = n.length + r; M.length < R;) {
								for (var F = c(x, "IAEX", w); F--;) M.push(D);
								D = !D
							}
							for (var B = 0, U = n.length; U > B; B++) M[B] && L.push(n[B]);
							for (var z = 0; r > z; B++, z++) M[B] && L.push(b[z]);
							return L
						}
						function g(t, e, i, n, r, o, s, a, u, f, p, g, v, m, b, y, _) {
							t && l("JBIG2 error: huffman is not supported");
							var w, x, S = [];
							for (w = 0; n > w; w++) {
								if (x = new Uint8Array(i), r) for (var C = 0; i > C; C++) x[C] = r;
								S.push(x)
							}
							var k = _.decoder,
								T = _.contextCache,
								E = -c(T, "IADT", k),
								O = 0;
							for (w = 0; o > w;) {
								var j = c(T, "IADT", k);
								E += j;
								var A = c(T, "IAFS", k);
								O += A;
								for (var I = O;;) {
									var P = 1 === s ? 0 : c(T, "IAIT", k),
										L = s * E + P,
										M = h(T, k, u),
										D = e && c(T, "IARI", k),
										R = a[M],
										F = R[0].length,
										B = R.length;
									if (D) {
										var U = c(T, "IARDW", k),
											z = c(T, "IARDH", k),
											N = c(T, "IARDX", k),
											Y = c(T, "IARDY", k);
										F += U, B += z, R = d(F, B, b, R, (U >> 1) + N, (z >> 1) + Y, !1, y, _)
									}
									var X, W, G, H = L - (1 & g ? 0 : B),
										q = I - (2 & g ? F : 0);
									if (f) {
										for (X = 0; B > X; X++) if (x = S[q + X]) {
											G = R[X];
											var V = Math.min(i - H, F);
											switch (v) {
												case 0:
													for (W = 0; V > W; W++) x[H + W] |= G[W];
													break;
												case 2:
													for (W = 0; V > W; W++) x[H + W] ^= G[W];
													break;
												default:
													l("JBIG2 error: operator " + v + " is not supported")
											}
										}
										I += B - 1
									} else {
										for (W = 0; B > W; W++) if (x = S[H + W]) switch (G = R[W], v) {
											case 0:
												for (X = 0; F > X; X++) x[q + X] |= G[X];
												break;
											case 2:
												for (X = 0; F > X; X++) x[q + X] ^= G[X];
												break;
											default:
												l("JBIG2 error: operator " + v + " is not supported")
										}
										I += F - 1
									}
									w++;
									var Z = c(T, "IADS", k);
									if (null === Z) break;
									I += Z + p
								}
							}
							return S
						}
						function v(t, e) {
							var i = {};
							i.number = r(t, e);
							var o = t[e + 4],
								s = 63 & o;
							C[s] || l("JBIG2 error: invalid segment type: " + s), i.type = s, i.typeName = C[s], i.deferredNonRetain = !! (128 & o);
							var a = !! (64 & o),
								c = t[e + 5],
								h = c >> 5 & 7,
								u = [31 & c],
								f = e + 6;
							if (7 === c) {
								h = 536870911 & r(t, f - 1), f += 3;
								var d = h + 7 >> 3;
								for (u[0] = t[f++]; --d > 0;) u.push(t[f++])
							} else(5 === c || 6 === c) && l("JBIG2 error: invalid referred-to flags");
							i.retainBits = u;
							var p, g, v = i.number <= 256 ? 1 : i.number <= 65536 ? 2 : 4,
								m = [];
							for (p = 0; h > p; p++) {
								var y = 1 === v ? t[f] : 2 === v ? n(t, f) : r(t, f);
								m.push(y), f += v
							}
							if (i.referredTo = m, a ? (i.pageAssociation = r(t, f), f += 4) : i.pageAssociation = t[f++], i.length = r(t, f), f += 4, 4294967295 === i.length) if (38 === s) {
								var _ = b(t, f),
									w = t[f + j],
									x = !! (1 & w),
									S = 6,
									k = new Uint8Array(S);
								for (x || (k[0] = 255, k[1] = 172), k[2] = _.height >>> 24 & 255, k[3] = _.height >> 16 & 255, k[4] = _.height >> 8 & 255, k[5] = 255 & _.height, p = f, g = t.length; g > p; p++) {
									for (var T = 0; S > T && k[T] === t[p + T];) T++;
									if (T === S) {
										i.length = p + S;
										break
									}
								}
								4294967295 === i.length && l("JBIG2 error: segment end was not found")
							} else l("JBIG2 error: invalid unknown segment length");
							return i.headerEnd = f, i
						}
						function m(t, e, i, n) {
							for (var r = [], o = i; n > o;) {
								var s = v(e, o);
								o = s.headerEnd;
								var a = {
									header: s,
									data: e
								};
								if (t.randomAccess || (a.start = o, o += s.length, a.end = o), r.push(a), 51 === s.type) break
							}
							if (t.randomAccess) for (var c = 0, h = r.length; h > c; c++) r[c].start = o, o += r[c].header.length, r[c].end = o;
							return r
						}
						function b(t, e) {
							return {
								width: r(t, e),
								height: r(t, e + 4),
								x: r(t, e + 8),
								y: r(t, e + 12),
								combinationOperator: 7 & t[e + 16]
							}
						}
						function y(t, e) {
							var o, s, a, c, h = t.header,
								u = t.data,
								f = t.start,
								d = t.end;
							switch (h.type) {
								case 0:
									var p = {}, g = n(u, f);
									if (p.huffman = !! (1 & g), p.refinement = !! (2 & g), p.huffmanDHSelector = g >> 2 & 3, p.huffmanDWSelector = g >> 4 & 3, p.bitmapSizeSelector = g >> 6 & 1, p.aggregationInstancesSelector = g >> 7 & 1, p.bitmapCodingContextUsed = !! (256 & g), p.bitmapCodingContextRetained = !! (512 & g), p.template = g >> 10 & 3, p.refinementTemplate = g >> 12 & 1, f += 2, !p.huffman) {
										for (c = 0 === p.template ? 4 : 1, s = [], a = 0; c > a; a++) s.push({
											x: i(u, f),
											y: i(u, f + 1)
										}), f += 2;
										p.at = s
									}
									if (p.refinement && !p.refinementTemplate) {
										for (s = [], a = 0; 2 > a; a++) s.push({
											x: i(u, f),
											y: i(u, f + 1)
										}), f += 2;
										p.refinementAt = s
									}
									p.numberOfExportedSymbols = r(u, f), f += 4, p.numberOfNewSymbols = r(u, f), f += 4, o = [p, h.number, h.referredTo, u, f, d];
									break;
								case 6:
								case 7:
									var v = {};
									v.info = b(u, f), f += j;
									var m = n(u, f);
									if (f += 2, v.huffman = !! (1 & m), v.refinement = !! (2 & m), v.stripSize = 1 << (m >> 2 & 3), v.referenceCorner = m >> 4 & 3, v.transposed = !! (64 & m), v.combinationOperator = m >> 7 & 3, v.defaultPixelValue = m >> 9 & 1, v.dsOffset = m << 17 >> 27, v.refinementTemplate = m >> 15 & 1, v.huffman) {
										var y = n(u, f);
										f += 2, v.huffmanFS = 3 & y, v.huffmanDS = y >> 2 & 3, v.huffmanDT = y >> 4 & 3, v.huffmanRefinementDW = y >> 6 & 3, v.huffmanRefinementDH = y >> 8 & 3, v.huffmanRefinementDX = y >> 10 & 3, v.huffmanRefinementDY = y >> 12 & 3, v.huffmanRefinementSizeSelector = !! (14 & y)
									}
									if (v.refinement && !v.refinementTemplate) {
										for (s = [], a = 0; 2 > a; a++) s.push({
											x: i(u, f),
											y: i(u, f + 1)
										}), f += 2;
										v.refinementAt = s
									}
									v.numberOfSymbolInstances = r(u, f), f += 4, v.huffman && l("JBIG2 error: huffman is not supported"), o = [v, h.referredTo, u, f, d];
									break;
								case 38:
								case 39:
									var _ = {};
									_.info = b(u, f), f += j;
									var w = u[f++];
									if (_.mmr = !! (1 & w), _.template = w >> 1 & 3, _.prediction = !! (8 & w), !_.mmr) {
										for (c = 0 === _.template ? 4 : 1, s = [], a = 0; c > a; a++) s.push({
											x: i(u, f),
											y: i(u, f + 1)
										}), f += 2;
										_.at = s
									}
									o = [_, u, f, d];
									break;
								case 48:
									var x = {
										width: r(u, f),
										height: r(u, f + 4),
										resolutionX: r(u, f + 8),
										resolutionY: r(u, f + 12)
									};
									4294967295 === x.height && delete x.height;
									var S = u[f + 16];
									n(u, f + 17);
									x.lossless = !! (1 & S), x.refinement = !! (2 & S), x.defaultPixelValue = S >> 2 & 1, x.combinationOperator = S >> 3 & 3, x.requiresBuffer = !! (32 & S), x.combinationOperatorOverride = !! (64 & S), o = [x];
									break;
								case 49:
									break;
								case 50:
									break;
								case 51:
									break;
								case 62:
									break;
								default:
									l("JBIG2 error: segment type " + h.typeName + "(" + h.type + ") is not implemented")
							}
							var C = "on" + h.typeName;
							C in e && e[C].apply(e, o)
						}
						function _(t, e) {
							for (var i = 0, n = t.length; n > i; i++) y(t[i], e)
						}
						function w(t) {
							for (var e = new x, i = 0, n = t.length; n > i; i++) {
								var r = t[i],
									o = m({}, r.data, r.start, r.end);
								_(o, e)
							}
							return e
						}
						function x() {}
						function S() {}
						t.prototype = {
							getContexts: function(t) {
								return t in this ? this[t] : this[t] = new Int8Array(65536)
							}
						}, s.prototype = {
							get decoder() {
								var t = new a(this.data, this.start, this.end);
								return o(this, "decoder", t)
							}, get contextCache() {
								var e = new t;
								return o(this, "contextCache", e)
							}
						};
						var C = ["SymbolDictionary", null, null, null, "IntermediateTextRegion", null, "ImmediateTextRegion", "ImmediateLosslessTextRegion", null, null, null, null, null, null, null, null, "patternDictionary", null, null, null, "IntermediateHalftoneRegion", null, "ImmediateHalftoneRegion", "ImmediateLosslessHalftoneRegion", null, null, null, null, null, null, null, null, null, null, null, null, "IntermediateGenericRegion", null, "ImmediateGenericRegion", "ImmediateLosslessGenericRegion", "IntermediateGenericRefinementRegion", null, "ImmediateGenericRefinementRegion", "ImmediateLosslessGenericRefinementRegion", null, null, null, null, "PageInformation", "EndOfPage", "EndOfStripe", "EndOfFile", "Profiles", "Tables", null, null, null, null, null, null, null, null, "Extension"],
							k = [
								[{
									x: -1,
									y: -2
								}, {
									x: 0,
									y: -2
								}, {
									x: 1,
									y: -2
								}, {
									x: -2,
									y: -1
								}, {
									x: -1,
									y: -1
								}, {
									x: 0,
									y: -1
								}, {
									x: 1,
									y: -1
								}, {
									x: 2,
									y: -1
								}, {
									x: -4,
									y: 0
								}, {
									x: -3,
									y: 0
								}, {
									x: -2,
									y: 0
								}, {
									x: -1,
									y: 0
								}],
								[{
									x: -1,
									y: -2
								}, {
									x: 0,
									y: -2
								}, {
									x: 1,
									y: -2
								}, {
									x: 2,
									y: -2
								}, {
									x: -2,
									y: -1
								}, {
									x: -1,
									y: -1
								}, {
									x: 0,
									y: -1
								}, {
									x: 1,
									y: -1
								}, {
									x: 2,
									y: -1
								}, {
									x: -3,
									y: 0
								}, {
									x: -2,
									y: 0
								}, {
									x: -1,
									y: 0
								}],
								[{
									x: -1,
									y: -2
								}, {
									x: 0,
									y: -2
								}, {
									x: 1,
									y: -2
								}, {
									x: -2,
									y: -1
								}, {
									x: -1,
									y: -1
								}, {
									x: 0,
									y: -1
								}, {
									x: 1,
									y: -1
								}, {
									x: -2,
									y: 0
								}, {
									x: -1,
									y: 0
								}],
								[{
									x: -3,
									y: -1
								}, {
									x: -2,
									y: -1
								}, {
									x: -1,
									y: -1
								}, {
									x: 0,
									y: -1
								}, {
									x: 1,
									y: -1
								}, {
									x: -4,
									y: 0
								}, {
									x: -3,
									y: 0
								}, {
									x: -2,
									y: 0
								}, {
									x: -1,
									y: 0
								}]
							],
							T = [{
								coding: [{
									x: 0,
									y: -1
								}, {
									x: 1,
									y: -1
								}, {
									x: -1,
									y: 0
								}],
								reference: [{
									x: 0,
									y: -1
								}, {
									x: 1,
									y: -1
								}, {
									x: -1,
									y: 0
								}, {
									x: 0,
									y: 0
								}, {
									x: 1,
									y: 0
								}, {
									x: -1,
									y: 1
								}, {
									x: 0,
									y: 1
								}, {
									x: 1,
									y: 1
								}]
							}, {
								coding: [{
									x: -1,
									y: -1
								}, {
									x: 0,
									y: -1
								}, {
									x: 1,
									y: -1
								}, {
									x: -1,
									y: 0
								}],
								reference: [{
									x: 0,
									y: -1
								}, {
									x: -1,
									y: 0
								}, {
									x: 0,
									y: 0
								}, {
									x: 1,
									y: 0
								}, {
									x: 0,
									y: 1
								}, {
									x: 1,
									y: 1
								}]
							}],
							E = [39717, 1941, 229, 405],
							O = [32, 8],
							j = 17;
						return x.prototype = {
							onPageInformation: function(t) {
								this.currentPageInfo = t;
								var e = t.width + 7 >> 3,
									i = new Uint8Array(e * t.height);
								if (t.defaultPixelValue) for (var n = 0, r = i.length; r > n; n++) i[n] = 255;
								this.buffer = i
							},
							drawBitmap: function(t, e) {
								var i, n, r, o, s = this.currentPageInfo,
									a = t.width,
									c = t.height,
									h = s.width + 7 >> 3,
									u = s.combinationOperatorOverride ? t.combinationOperator : s.combinationOperator,
									f = this.buffer,
									d = 128 >> (7 & t.x),
									p = t.y * h + (t.x >> 3);
								switch (u) {
									case 0:
										for (i = 0; c > i; i++) {
											for (r = d, o = p, n = 0; a > n; n++) e[i][n] && (f[o] |= r), r >>= 1, r || (r = 128, o++);
											p += h
										}
										break;
									case 2:
										for (i = 0; c > i; i++) {
											for (r = d, o = p, n = 0; a > n; n++) e[i][n] && (f[o] ^= r), r >>= 1, r || (r = 128, o++);
											p += h
										}
										break;
									default:
										l("JBIG2 error: operator " + u + " is not supported")
								}
							},
							onImmediateGenericRegion: function(t, e, i, n) {
								var r = t.info,
									o = new s(e, i, n),
									a = f(t.mmr, r.width, r.height, t.template, t.prediction, null, t.at, o);
								this.drawBitmap(r, a)
							},
							onImmediateLosslessGenericRegion: function() {
								this.onImmediateGenericRegion.apply(this, arguments)
							},
							onSymbolDictionary: function(t, e, i, n, r, o) {
								var a;
								t.huffman && l("JBIG2 error: huffman is not supported");
								var c = this.symbols;
								c || (this.symbols = c = {});
								for (var h = [], u = 0, f = i.length; f > u; u++) h = h.concat(c[i[u]]);
								var d = new s(n, r, o);
								c[e] = p(t.huffman, t.refinement, h, t.numberOfNewSymbols, t.numberOfExportedSymbols, a, t.template, t.at, t.refinementTemplate, t.refinementAt, d)
							},
							onImmediateTextRegion: function(t, i, n, r, o) {
								for (var a, c = t.info, h = this.symbols, l = [], u = 0, f = i.length; f > u; u++) l = l.concat(h[i[u]]);
								var d = e(l.length),
									p = new s(n, r, o),
									v = g(t.huffman, t.refinement, c.width, c.height, t.defaultPixelValue, t.numberOfSymbolInstances, t.stripSize, l, d, t.transposed, t.dsOffset, t.referenceCorner, t.combinationOperator, a, t.refinementTemplate, t.refinementAt, p);
								this.drawBitmap(c, v)
							},
							onImmediateLosslessTextRegion: function() {
								this.onImmediateTextRegion.apply(this, arguments)
							}
						}, S.prototype = {
							parseChunks: function(t) {
								return w(t)
							}
						}, S
					}(),
					l = function() {
						throw console.error.apply(console, arguments), new Error("PDFJS error: " + arguments[0])
					}, u = function() {
						console.warn.apply(console, arguments)
					}, f = function() {
						console.info.apply(console, arguments)
					};
				h.prototype.parse = function(t) {
					var e = 0,
						i = t.length;
					(151 !== t[e] || 74 !== t[e + 1] || 66 !== t[e + 2] || 50 !== t[e + 3] || 13 !== t[e + 4] || 10 !== t[e + 5] || 26 !== t[e + 6] || 10 !== t[e + 7]) && l("JBIG2 error: invalid header");
					var n = {};
					e += 8;
					var o = t[e++];
					n.randomAccess = !(1 & o), 2 & o || (n.numberOfPages = r(t, e), e += 4);
					for (var s = this.parseChunks([{
						data: t,
						start: e,
						end: i
					}]), a = s.currentPageInfo.width, c = s.currentPageInfo.height, h = s.buffer, t = new Uint8Array(a * c), u = 0, f = 0, d = 0; c > d; d++) for (var p, g = 0, v = 0; a > v; v++) g || (g = 128, p = h[f++]), t[u++] = p & g ? 0 : 255, g >>= 1;
					this.width = a, this.height = c, this.data = t
				}, t.JpegImage = s, t.JpxImage = c, t.Jbig2Image = h
			}(o || (o = {}));
			var s = o.JpegImage,
				a = o.JpxImage,
				c = o.Jbig2Image
		}, {}],
		5: [function(t, e, i) {
			(function(t) {
				"use strict";

				function i(e) {
					return e instanceof ArrayBuffer ? a(e) : t.isBuffer(e) ? e : e instanceof Uint8Array ? new t(e) : e
				}
				function n(e) {
					return e instanceof ArrayBuffer ? e : t.isBuffer(e) ? s(e) : e instanceof Uint8Array ? s(e) : e
				}
				function r(e) {
					return e instanceof Uint8Array ? e : e instanceof ArrayBuffer ? new Uint8Array(e) : t.isBuffer(e) ? new Uint8Array(e) : e
				}
				function o(e) {
					return e instanceof Uint8Array ? e : e instanceof ArrayBuffer ? new Uint8Array(e) : t.isBuffer(e) ? e : e
				}
				function s(t) {
					for (var e = new ArrayBuffer(t.length), i = new Uint8Array(e), n = 0; n < t.length; ++n) i[n] = t[n];
					return e
				}
				function a(e) {
					return new t(new Uint8Array(e))
				}
				e.exports.toBuffer = i, e.exports.toArrayBuffer = n, e.exports.toUint8Array = r, e.exports.toArrayLike = o, e.exports.bufferToArrayBuffer = s, e.exports.arrayBufferToBuffer = a
			}).call(this, t("buffer").Buffer)
		}, {
			buffer: 31
		}],
		6: [function(t, e, i) {
			"use strict";
			e.exports = function(e) {
				var i = t("./decode");
				e.onmessage = function(t) {
					var n = t.data;
					i(n.buf, n.options, function(t, i) {
						if (t) {
							var n = t instanceof Error ? t.message : t;
							e.postMessage({
								err: n
							})
						} else e.postMessage({
							result: i
						})
					})
				}
			}
		}, {
			"./decode": 7
		}],
		7: [function(t, e, i) {
			"use strict";

			function n(t, e, i) {
				function n(t, e, i) {
					var n = {
						width: e,
						height: i,
						data: new Uint8Array(e * i * 4)
					};
					return t.copyToImageData(n), n.data
				}
				try {
					var o = new r;
					o.parse(t);
					var s = e.width || o.width,
						a = e.height || o.height,
						c = n(o, s, a),
						h = {
							width: s,
							height: a,
							data: c
						};
					i(null, h)
				} catch (l) {
					"string" == typeof l && (l = new Error(l)), i(l)
				}
			}
			var r = t("./backend/jpg").JpegImage;
			e.exports = n
		}, {
			"./backend/jpg": 4
		}],
		8: [function(t, e, i) {
			"use strict";
			e.exports = function(e) {
				var i = t("./encode");
				e.onmessage = function(t) {
					var n = t.data;
					i(n.buf, n.options, function(t, i) {
						if (t) {
							var n = t instanceof Error ? t.message : t;
							e.postMessage({
								err: n
							})
						} else e.postMessage({
							result: i
						})
					})
				}
			}
		}, {
			"./encode": 9
		}],
		9: [function(t, e, i) {
			"use strict";

			function n(t, e, i) {
				try {
					var n = {
						data: t,
						width: e.width,
						height: e.height
					}, o = r(n, e.quality);
					i(null, o)
				} catch (s) {
					i(s)
				}
			}
			var r = t("./backend/encoder");
			e.exports = n
		}, {
			"./backend/encoder": 3
		}],
		10: [function(t, e, i) {
			"use strict";
			e.exports = function(e) {
				var i = t("./exif");
				e.onmessage = function(t) {
					var n = t.data;
					i(n.buf, {}, function(t, i) {
						if (t) {
							var n = t instanceof Error ? t.message : t;
							e.postMessage({
								err: n
							})
						} else e.postMessage({
							result: i
						})
					})
				}
			}
		}, {
			"./exif": 11
		}],
		11: [function(t, e, i) {
			"use strict";

			function n(t, e, i) {
				try {
					var n = new r;
					n.load(t), e.hasOwnProperty("hasMakerNote") && e.hasMakerNote || n.deleteTag("MakerNote");
					var o = n.getAllTags();
					i(null, o)
				} catch (s) {
					i(s)
				}
			}
			var r = t("./backend/ExifReader").ExifReader;
			e.exports = n
		}, {
			"./backend/ExifReader": 2
		}],
		12: [function(t, e, i) {
			"use strict";
			var n = "undefined" != typeof window && "Worker" in window;
			if (n) try {
				var r = t("webworkify")(function() {});
				r.terminate()
			} catch (o) {
				n = !1
			}
			e.exports.HAS_WORKER = n
		}, {
			webworkify: 70
		}],
		13: [function(t, e, i) {
			"use strict";

			function n(t, e) {
				setTimeout(function() {
					var i = r(t);
					i ? e(null, {
						type: i.type,
						mimeType: i.mimeType,
						extension: i.format.toLowerCase(),
						width: i.width,
						height: i.height
					}) : e()
				}, 0)
			}
			var r = t("imageinfo");
			e.exports.collect = n
		}, {
			imageinfo: 57
		}],
		14: [function(t, e, i) {
			e.exports = {
				474946383961: {
					mimeType: "image/gif",
					extension: "gif"
				},
				474946383761: {
					mimeType: "image/gif",
					extension: "gif"
				},
				"89504e470d0a1a0a": {
					mimeType: "image/png",
					extension: "png"
				},
				ffd8ff: {
					mimeType: "image/jpeg",
					extension: "jpg"
				},
				57454250: {
					mimeType: "image/webp",
					extension: "webp"
				},
				"49492a00": {
					mimeType: "image/tiff",
					extension: "tiff"
				},
				"4d4d002a": {
					mimeType: "image/tiff",
					extension: "tiff"
				},
				"424d": {
					mimeType: "image/bmp",
					extension: "bmp"
				},
				"000000146674797069736f6d": {
					mimeType: "video/mp4",
					extension: "mp4"
				},
				"000000186674797033677035": {
					mimeType: "video/mp4",
					extension: "mp4"
				},
				"000000146674797071742020": {
					mimeType: "video/quicktime",
					extension: "mov"
				},
				"1a45dfa3": {
					mimeType: "video/webm",
					extension: "webm"
				},
				25504446: {
					mimeType: "application/pdf",
					extension: "pdf"
				}
			}
		}, {}],
		15: [function(t, e, i) {
			"use strict";

			function n(t, e) {
				setTimeout(function() {
					var i = 24,
						n = t.slice(0, i).toString("hex"),
						a = Object.keys(o),
						c = r(a, function(t) {
							return s("%s <---- %s", n, t), -1 != n.indexOf(t)
						});
					c ? e(null, o[c]) : e()
				}, 0)
			}
			var r = t("lodash.find"),
				o = t("./magic-db"),
				s = t("debug")("inkjet:magic");
			e.exports.lookup = n
		}, {
			"./magic-db": 14,
			debug: 54,
			"lodash.find": 58
		}],
		16: [function(t, e, i) {
			function n(t, e) {
				return d.isUndefined(e) ? "" + e : d.isNumber(e) && !isFinite(e) ? e.toString() : d.isFunction(e) || d.isRegExp(e) ? e.toString() : e
			}
			function r(t, e) {
				return d.isString(t) ? t.length < e ? t : t.slice(0, e) : t
			}
			function o(t) {
				return r(JSON.stringify(t.actual, n), 128) + " " + t.operator + " " + r(JSON.stringify(t.expected, n), 128)
			}
			function s(t, e, i, n, r) {
				throw new v.AssertionError({
					message: i,
					actual: t,
					expected: e,
					operator: n,
					stackStartFunction: r
				})
			}
			function a(t, e) {
				t || s(t, !0, e, "==", v.ok)
			}
			function c(t, e) {
				if (t === e) return !0;
				if (d.isBuffer(t) && d.isBuffer(e)) {
					if (t.length != e.length) return !1;
					for (var i = 0; i < t.length; i++) if (t[i] !== e[i]) return !1;
					return !0
				}
				return d.isDate(t) && d.isDate(e) ? t.getTime() === e.getTime() : d.isRegExp(t) && d.isRegExp(e) ? t.source === e.source && t.global === e.global && t.multiline === e.multiline && t.lastIndex === e.lastIndex && t.ignoreCase === e.ignoreCase : d.isObject(t) || d.isObject(e) ? l(t, e) : t == e
			}
			function h(t) {
				return "[object Arguments]" == Object.prototype.toString.call(t)
			}
			function l(t, e) {
				if (d.isNullOrUndefined(t) || d.isNullOrUndefined(e)) return !1;
				if (t.prototype !== e.prototype) return !1;
				if (d.isPrimitive(t) || d.isPrimitive(e)) return t === e;
				var i = h(t),
					n = h(e);
				if (i && !n || !i && n) return !1;
				if (i) return t = p.call(t), e = p.call(e), c(t, e);
				var r, o, s = m(t),
					a = m(e);
				if (s.length != a.length) return !1;
				for (s.sort(), a.sort(), o = s.length - 1; o >= 0; o--) if (s[o] != a[o]) return !1;
				for (o = s.length - 1; o >= 0; o--) if (r = s[o], !c(t[r], e[r])) return !1;
				return !0
			}
			function u(t, e) {
				return t && e ? "[object RegExp]" == Object.prototype.toString.call(e) ? e.test(t) : t instanceof e ? !0 : e.call({}, t) === !0 ? !0 : !1 : !1
			}
			function f(t, e, i, n) {
				var r;
				d.isString(i) && (n = i, i = null);
				try {
					e()
				} catch (o) {
					r = o
				}
				if (n = (i && i.name ? " (" + i.name + ")." : ".") + (n ? " " + n : "."), t && !r && s(r, i, "Missing expected exception" + n), !t && u(r, i) && s(r, i, "Got unwanted exception" + n), t && r && i && !u(r, i) || !t && r) throw r
			}
			var d = t("util/"),
				p = Array.prototype.slice,
				g = Object.prototype.hasOwnProperty,
				v = e.exports = a;
			v.AssertionError = function(t) {
				this.name = "AssertionError", this.actual = t.actual, this.expected = t.expected, this.operator = t.operator, t.message ? (this.message = t.message, this.generatedMessage = !1) : (this.message = o(this), this.generatedMessage = !0);
				var e = t.stackStartFunction || s;
				if (Error.captureStackTrace) Error.captureStackTrace(this, e);
				else {
					var i = new Error;
					if (i.stack) {
						var n = i.stack,
							r = e.name,
							a = n.indexOf("\n" + r);
						if (a >= 0) {
							var c = n.indexOf("\n", a + 1);
							n = n.substring(c + 1)
						}
						this.stack = n
					}
				}
			}, d.inherits(v.AssertionError, Error), v.fail = s, v.ok = a, v.equal = function(t, e, i) {
				t != e && s(t, e, i, "==", v.equal)
			}, v.notEqual = function(t, e, i) {
				t == e && s(t, e, i, "!=", v.notEqual)
			}, v.deepEqual = function(t, e, i) {
				c(t, e) || s(t, e, i, "deepEqual", v.deepEqual)
			}, v.notDeepEqual = function(t, e, i) {
				c(t, e) && s(t, e, i, "notDeepEqual", v.notDeepEqual)
			}, v.strictEqual = function(t, e, i) {
				t !== e && s(t, e, i, "===", v.strictEqual)
			}, v.notStrictEqual = function(t, e, i) {
				t === e && s(t, e, i, "!==", v.notStrictEqual)
			}, v["throws"] = function(t, e, i) {
				f.apply(this, [!0].concat(p.call(arguments)))
			}, v.doesNotThrow = function(t, e) {
				f.apply(this, [!1].concat(p.call(arguments)))
			}, v.ifError = function(t) {
				if (t) throw t
			};
			var m = Object.keys || function(t) {
					var e = [];
					for (var i in t) g.call(t, i) && e.push(i);
					return e
				}
		}, {
			"util/": 53
		}],
		17: [function(t, e, i) {}, {}],
		18: [function(t, e, i) {
			"use strict";
			var n = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
			i.assign = function(t) {
				for (var e = Array.prototype.slice.call(arguments, 1); e.length;) {
					var i = e.shift();
					if (i) {
						if ("object" != typeof i) throw new TypeError(i + "must be non-object");
						for (var n in i) i.hasOwnProperty(n) && (t[n] = i[n])
					}
				}
				return t
			}, i.shrinkBuf = function(t, e) {
				return t.length === e ? t : t.subarray ? t.subarray(0, e) : (t.length = e, t)
			};
			var r = {
				arraySet: function(t, e, i, n, r) {
					if (e.subarray && t.subarray) return void t.set(e.subarray(i, i + n), r);
					for (var o = 0; n > o; o++) t[r + o] = e[i + o]
				},
				flattenChunks: function(t) {
					var e, i, n, r, o, s;
					for (n = 0, e = 0, i = t.length; i > e; e++) n += t[e].length;
					for (s = new Uint8Array(n), r = 0, e = 0, i = t.length; i > e; e++) o = t[e], s.set(o, r), r += o.length;
					return s
				}
			}, o = {
				arraySet: function(t, e, i, n, r) {
					for (var o = 0; n > o; o++) t[r + o] = e[i + o]
				},
				flattenChunks: function(t) {
					return [].concat.apply([], t)
				}
			};
			i.setTyped = function(t) {
				t ? (i.Buf8 = Uint8Array, i.Buf16 = Uint16Array, i.Buf32 = Int32Array, i.assign(i, r)) : (i.Buf8 = Array, i.Buf16 = Array, i.Buf32 = Array, i.assign(i, o))
			}, i.setTyped(n)
		}, {}],
		19: [function(t, e, i) {
			"use strict";

			function n(t, e, i, n) {
				for (var r = 65535 & t | 0, o = t >>> 16 & 65535 | 0, s = 0; 0 !== i;) {
					s = i > 2e3 ? 2e3 : i, i -= s;
					do r = r + e[n++] | 0, o = o + r | 0;
					while (--s);
					r %= 65521, o %= 65521
				}
				return r | o << 16 | 0
			}
			e.exports = n
		}, {}],
		20: [function(t, e, i) {
			e.exports = {
				Z_NO_FLUSH: 0,
				Z_PARTIAL_FLUSH: 1,
				Z_SYNC_FLUSH: 2,
				Z_FULL_FLUSH: 3,
				Z_FINISH: 4,
				Z_BLOCK: 5,
				Z_TREES: 6,
				Z_OK: 0,
				Z_STREAM_END: 1,
				Z_NEED_DICT: 2,
				Z_ERRNO: -1,
				Z_STREAM_ERROR: -2,
				Z_DATA_ERROR: -3,
				Z_BUF_ERROR: -5,
				Z_NO_COMPRESSION: 0,
				Z_BEST_SPEED: 1,
				Z_BEST_COMPRESSION: 9,
				Z_DEFAULT_COMPRESSION: -1,
				Z_FILTERED: 1,
				Z_HUFFMAN_ONLY: 2,
				Z_RLE: 3,
				Z_FIXED: 4,
				Z_DEFAULT_STRATEGY: 0,
				Z_BINARY: 0,
				Z_TEXT: 1,
				Z_UNKNOWN: 2,
				Z_DEFLATED: 8
			}
		}, {}],
		21: [function(t, e, i) {
			"use strict";

			function n() {
				for (var t, e = [], i = 0; 256 > i; i++) {
					t = i;
					for (var n = 0; 8 > n; n++) t = 1 & t ? 3988292384 ^ t >>> 1 : t >>> 1;
					e[i] = t
				}
				return e
			}
			function r(t, e, i, n) {
				var r = o,
					s = n + i;
				t = -1 ^ t;
				for (var a = n; s > a; a++) t = t >>> 8 ^ r[255 & (t ^ e[a])];
				return -1 ^ t
			}
			var o = n();
			e.exports = r
		}, {}],
		22: [function(t, e, i) {
			"use strict";

			function n(t, e) {
				return t.msg = P[e], e
			}
			function r(t) {
				return (t << 1) - (t > 4 ? 9 : 0)
			}
			function o(t) {
				for (var e = t.length; --e >= 0;) t[e] = 0
			}
			function s(t) {
				var e = t.state,
					i = e.pending;
				i > t.avail_out && (i = t.avail_out), 0 !== i && (O.arraySet(t.output, e.pending_buf, e.pending_out, i, t.next_out), t.next_out += i, e.pending_out += i, t.total_out += i, t.avail_out -= i, e.pending -= i, 0 === e.pending && (e.pending_out = 0))
			}
			function a(t, e) {
				j._tr_flush_block(t, t.block_start >= 0 ? t.block_start : -1, t.strstart - t.block_start, e), t.block_start = t.strstart, s(t.strm)
			}
			function c(t, e) {
				t.pending_buf[t.pending++] = e
			}
			function h(t, e) {
				t.pending_buf[t.pending++] = e >>> 8 & 255, t.pending_buf[t.pending++] = 255 & e
			}
			function l(t, e, i, n) {
				var r = t.avail_in;
				return r > n && (r = n), 0 === r ? 0 : (t.avail_in -= r, O.arraySet(e, t.input, t.next_in, r, i), 1 === t.state.wrap ? t.adler = A(t.adler, e, r, i) : 2 === t.state.wrap && (t.adler = I(t.adler, e, r, i)), t.next_in += r, t.total_in += r, r)
			}
			function u(t, e) {
				var i, n, r = t.max_chain_length,
					o = t.strstart,
					s = t.prev_length,
					a = t.nice_match,
					c = t.strstart > t.w_size - ht ? t.strstart - (t.w_size - ht) : 0,
					h = t.window,
					l = t.w_mask,
					u = t.prev,
					f = t.strstart + ct,
					d = h[o + s - 1],
					p = h[o + s];
				t.prev_length >= t.good_match && (r >>= 2), a > t.lookahead && (a = t.lookahead);
				do if (i = e, h[i + s] === p && h[i + s - 1] === d && h[i] === h[o] && h[++i] === h[o + 1]) {
					o += 2, i++;
					do;
					while (h[++o] === h[++i] && h[++o] === h[++i] && h[++o] === h[++i] && h[++o] === h[++i] && h[++o] === h[++i] && h[++o] === h[++i] && h[++o] === h[++i] && h[++o] === h[++i] && f > o);
					if (n = ct - (f - o), o = f - ct, n > s) {
						if (t.match_start = e, s = n, n >= a) break;
						d = h[o + s - 1], p = h[o + s]
					}
				}
				while ((e = u[e & l]) > c && 0 !== --r);
				return s <= t.lookahead ? s : t.lookahead
			}
			function f(t) {
				var e, i, n, r, o, s = t.w_size;
				do {
					if (r = t.window_size - t.lookahead - t.strstart, t.strstart >= s + (s - ht)) {
						O.arraySet(t.window, t.window, s, s, 0), t.match_start -= s, t.strstart -= s, t.block_start -= s, i = t.hash_size, e = i;
						do n = t.head[--e], t.head[e] = n >= s ? n - s : 0;
						while (--i);
						i = s, e = i;
						do n = t.prev[--e], t.prev[e] = n >= s ? n - s : 0;
						while (--i);
						r += s
					}
					if (0 === t.strm.avail_in) break;
					if (i = l(t.strm, t.window, t.strstart + t.lookahead, r), t.lookahead += i, t.lookahead + t.insert >= at) for (o = t.strstart - t.insert, t.ins_h = t.window[o], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[o + 1]) & t.hash_mask; t.insert && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[o + at - 1]) & t.hash_mask, t.prev[o & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = o, o++, t.insert--, !(t.lookahead + t.insert < at)););
				} while (t.lookahead < ht && 0 !== t.strm.avail_in)
			}
			function d(t, e) {
				var i = 65535;
				for (i > t.pending_buf_size - 5 && (i = t.pending_buf_size - 5);;) {
					if (t.lookahead <= 1) {
						if (f(t), 0 === t.lookahead && e === L) return bt;
						if (0 === t.lookahead) break
					}
					t.strstart += t.lookahead, t.lookahead = 0;
					var n = t.block_start + i;
					if ((0 === t.strstart || t.strstart >= n) && (t.lookahead = t.strstart - n, t.strstart = n, a(t, !1), 0 === t.strm.avail_out)) return bt;
					if (t.strstart - t.block_start >= t.w_size - ht && (a(t, !1), 0 === t.strm.avail_out)) return bt
				}
				return t.insert = 0, e === R ? (a(t, !0), 0 === t.strm.avail_out ? _t : wt) : t.strstart > t.block_start && (a(t, !1), 0 === t.strm.avail_out) ? bt : bt
			}
			function p(t, e) {
				for (var i, n;;) {
					if (t.lookahead < ht) {
						if (f(t), t.lookahead < ht && e === L) return bt;
						if (0 === t.lookahead) break
					}
					if (i = 0, t.lookahead >= at && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + at - 1]) & t.hash_mask, i = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), 0 !== i && t.strstart - i <= t.w_size - ht && (t.match_length = u(t, i)), t.match_length >= at) if (n = j._tr_tally(t, t.strstart - t.match_start, t.match_length - at), t.lookahead -= t.match_length, t.match_length <= t.max_lazy_match && t.lookahead >= at) {
						t.match_length--;
						do t.strstart++, t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + at - 1]) & t.hash_mask, i = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart;
						while (0 !== --t.match_length);
						t.strstart++
					} else t.strstart += t.match_length, t.match_length = 0, t.ins_h = t.window[t.strstart], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 1]) & t.hash_mask;
					else n = j._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++;
					if (n && (a(t, !1), 0 === t.strm.avail_out)) return bt
				}
				return t.insert = t.strstart < at - 1 ? t.strstart : at - 1, e === R ? (a(t, !0), 0 === t.strm.avail_out ? _t : wt) : t.last_lit && (a(t, !1), 0 === t.strm.avail_out) ? bt : yt
			}
			function g(t, e) {
				for (var i, n, r;;) {
					if (t.lookahead < ht) {
						if (f(t), t.lookahead < ht && e === L) return bt;
						if (0 === t.lookahead) break
					}
					if (i = 0, t.lookahead >= at && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + at - 1]) & t.hash_mask, i = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), t.prev_length = t.match_length, t.prev_match = t.match_start, t.match_length = at - 1, 0 !== i && t.prev_length < t.max_lazy_match && t.strstart - i <= t.w_size - ht && (t.match_length = u(t, i), t.match_length <= 5 && (t.strategy === W || t.match_length === at && t.strstart - t.match_start > 4096) && (t.match_length = at - 1)), t.prev_length >= at && t.match_length <= t.prev_length) {
						r = t.strstart + t.lookahead - at, n = j._tr_tally(t, t.strstart - 1 - t.prev_match, t.prev_length - at), t.lookahead -= t.prev_length - 1, t.prev_length -= 2;
						do ++t.strstart <= r && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + at - 1]) & t.hash_mask, i = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart);
						while (0 !== --t.prev_length);
						if (t.match_available = 0, t.match_length = at - 1, t.strstart++, n && (a(t, !1), 0 === t.strm.avail_out)) return bt
					} else if (t.match_available) {
						if (n = j._tr_tally(t, 0, t.window[t.strstart - 1]), n && a(t, !1), t.strstart++, t.lookahead--, 0 === t.strm.avail_out) return bt
					} else t.match_available = 1, t.strstart++, t.lookahead--
				}
				return t.match_available && (n = j._tr_tally(t, 0, t.window[t.strstart - 1]), t.match_available = 0), t.insert = t.strstart < at - 1 ? t.strstart : at - 1, e === R ? (a(t, !0), 0 === t.strm.avail_out ? _t : wt) : t.last_lit && (a(t, !1), 0 === t.strm.avail_out) ? bt : yt
			}
			function v(t, e) {
				for (var i, n, r, o, s = t.window;;) {
					if (t.lookahead <= ct) {
						if (f(t), t.lookahead <= ct && e === L) return bt;
						if (0 === t.lookahead) break
					}
					if (t.match_length = 0, t.lookahead >= at && t.strstart > 0 && (r = t.strstart - 1, n = s[r], n === s[++r] && n === s[++r] && n === s[++r])) {
						o = t.strstart + ct;
						do;
						while (n === s[++r] && n === s[++r] && n === s[++r] && n === s[++r] && n === s[++r] && n === s[++r] && n === s[++r] && n === s[++r] && o > r);
						t.match_length = ct - (o - r), t.match_length > t.lookahead && (t.match_length = t.lookahead)
					}
					if (t.match_length >= at ? (i = j._tr_tally(t, 1, t.match_length - at), t.lookahead -= t.match_length, t.strstart += t.match_length, t.match_length = 0) : (i = j._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++), i && (a(t, !1), 0 === t.strm.avail_out)) return bt
				}
				return t.insert = 0, e === R ? (a(t, !0), 0 === t.strm.avail_out ? _t : wt) : t.last_lit && (a(t, !1), 0 === t.strm.avail_out) ? bt : yt
			}
			function m(t, e) {
				for (var i;;) {
					if (0 === t.lookahead && (f(t), 0 === t.lookahead)) {
						if (e === L) return bt;
						break
					}
					if (t.match_length = 0, i = j._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++, i && (a(t, !1), 0 === t.strm.avail_out)) return bt
				}
				return t.insert = 0, e === R ? (a(t, !0), 0 === t.strm.avail_out ? _t : wt) : t.last_lit && (a(t, !1), 0 === t.strm.avail_out) ? bt : yt
			}
			function b(t) {
				t.window_size = 2 * t.w_size, o(t.head), t.max_lazy_match = E[t.level].max_lazy, t.good_match = E[t.level].good_length, t.nice_match = E[t.level].nice_length, t.max_chain_length = E[t.level].max_chain, t.strstart = 0, t.block_start = 0, t.lookahead = 0, t.insert = 0, t.match_length = t.prev_length = at - 1, t.match_available = 0, t.ins_h = 0
			}
			function y() {
				this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = $, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new O.Buf16(2 * ot), this.dyn_dtree = new O.Buf16(2 * (2 * nt + 1)), this.bl_tree = new O.Buf16(2 * (2 * rt + 1)), o(this.dyn_ltree), o(this.dyn_dtree), o(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new O.Buf16(st + 1), this.heap = new O.Buf16(2 * it + 1), o(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new O.Buf16(2 * it + 1), o(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0
			}
			function _(t) {
				var e;
				return t && t.state ? (t.total_in = t.total_out = 0, t.data_type = Z, e = t.state, e.pending = 0, e.pending_out = 0, e.wrap < 0 && (e.wrap = -e.wrap), e.status = e.wrap ? ut : vt, t.adler = 2 === e.wrap ? 0 : 1, e.last_flush = L, j._tr_init(e), B) : n(t, z)
			}
			function w(t) {
				var e = _(t);
				return e === B && b(t.state), e
			}
			function x(t, e) {
				return t && t.state ? 2 !== t.state.wrap ? z : (t.state.gzhead = e, B) : z
			}
			function S(t, e, i, r, o, s) {
				if (!t) return z;
				var a = 1;
				if (e === X && (e = 6), 0 > r ? (a = 0, r = -r) : r > 15 && (a = 2, r -= 16), 1 > o || o > K || i !== $ || 8 > r || r > 15 || 0 > e || e > 9 || 0 > s || s > q) return n(t, z);
				8 === r && (r = 9);
				var c = new y;
				return t.state = c, c.strm = t, c.wrap = a, c.gzhead = null, c.w_bits = r, c.w_size = 1 << c.w_bits, c.w_mask = c.w_size - 1, c.hash_bits = o + 7, c.hash_size = 1 << c.hash_bits, c.hash_mask = c.hash_size - 1, c.hash_shift = ~~ ((c.hash_bits + at - 1) / at), c.window = new O.Buf8(2 * c.w_size), c.head = new O.Buf16(c.hash_size), c.prev = new O.Buf16(c.w_size), c.lit_bufsize = 1 << o + 6, c.pending_buf_size = 4 * c.lit_bufsize, c.pending_buf = new O.Buf8(c.pending_buf_size), c.d_buf = c.lit_bufsize >> 1, c.l_buf = 3 * c.lit_bufsize, c.level = e, c.strategy = s, c.method = i, w(t)
			}
			function C(t, e) {
				return S(t, e, $, J, Q, V)
			}
			function k(t, e) {
				var i, a, l, u;
				if (!t || !t.state || e > F || 0 > e) return t ? n(t, z) : z;
				if (a = t.state, !t.output || !t.input && 0 !== t.avail_in || a.status === mt && e !== R) return n(t, 0 === t.avail_out ? Y : z);
				if (a.strm = t, i = a.last_flush, a.last_flush = e, a.status === ut) if (2 === a.wrap) t.adler = 0, c(a, 31), c(a, 139), c(a, 8), a.gzhead ? (c(a, (a.gzhead.text ? 1 : 0) + (a.gzhead.hcrc ? 2 : 0) + (a.gzhead.extra ? 4 : 0) + (a.gzhead.name ? 8 : 0) + (a.gzhead.comment ? 16 : 0)), c(a, 255 & a.gzhead.time), c(a, a.gzhead.time >> 8 & 255), c(a, a.gzhead.time >> 16 & 255), c(a, a.gzhead.time >> 24 & 255), c(a, 9 === a.level ? 2 : a.strategy >= G || a.level < 2 ? 4 : 0), c(a, 255 & a.gzhead.os), a.gzhead.extra && a.gzhead.extra.length && (c(a, 255 & a.gzhead.extra.length), c(a, a.gzhead.extra.length >> 8 & 255)), a.gzhead.hcrc && (t.adler = I(t.adler, a.pending_buf, a.pending, 0)), a.gzindex = 0, a.status = ft) : (c(a, 0), c(a, 0), c(a, 0), c(a, 0), c(a, 0), c(a, 9 === a.level ? 2 : a.strategy >= G || a.level < 2 ? 4 : 0), c(a, xt), a.status = vt);
				else {
					var f = $ + (a.w_bits - 8 << 4) << 8,
						d = -1;
					d = a.strategy >= G || a.level < 2 ? 0 : a.level < 6 ? 1 : 6 === a.level ? 2 : 3, f |= d << 6, 0 !== a.strstart && (f |= lt), f += 31 - f % 31, a.status = vt, h(a, f), 0 !== a.strstart && (h(a, t.adler >>> 16), h(a, 65535 & t.adler)), t.adler = 1
				}
				if (a.status === ft) if (a.gzhead.extra) {
					for (l = a.pending; a.gzindex < (65535 & a.gzhead.extra.length) && (a.pending !== a.pending_buf_size || (a.gzhead.hcrc && a.pending > l && (t.adler = I(t.adler, a.pending_buf, a.pending - l, l)), s(t), l = a.pending, a.pending !== a.pending_buf_size));) c(a, 255 & a.gzhead.extra[a.gzindex]), a.gzindex++;
					a.gzhead.hcrc && a.pending > l && (t.adler = I(t.adler, a.pending_buf, a.pending - l, l)), a.gzindex === a.gzhead.extra.length && (a.gzindex = 0, a.status = dt)
				} else a.status = dt;
				if (a.status === dt) if (a.gzhead.name) {
					l = a.pending;
					do {
						if (a.pending === a.pending_buf_size && (a.gzhead.hcrc && a.pending > l && (t.adler = I(t.adler, a.pending_buf, a.pending - l, l)), s(t), l = a.pending, a.pending === a.pending_buf_size)) {
							u = 1;
							break
						}
						u = a.gzindex < a.gzhead.name.length ? 255 & a.gzhead.name.charCodeAt(a.gzindex++) : 0, c(a, u)
					} while (0 !== u);
					a.gzhead.hcrc && a.pending > l && (t.adler = I(t.adler, a.pending_buf, a.pending - l, l)), 0 === u && (a.gzindex = 0, a.status = pt)
				} else a.status = pt;
				if (a.status === pt) if (a.gzhead.comment) {
					l = a.pending;
					do {
						if (a.pending === a.pending_buf_size && (a.gzhead.hcrc && a.pending > l && (t.adler = I(t.adler, a.pending_buf, a.pending - l, l)), s(t), l = a.pending, a.pending === a.pending_buf_size)) {
							u = 1;
							break
						}
						u = a.gzindex < a.gzhead.comment.length ? 255 & a.gzhead.comment.charCodeAt(a.gzindex++) : 0, c(a, u)
					} while (0 !== u);
					a.gzhead.hcrc && a.pending > l && (t.adler = I(t.adler, a.pending_buf, a.pending - l, l)), 0 === u && (a.status = gt)
				} else a.status = gt;
				if (a.status === gt && (a.gzhead.hcrc ? (a.pending + 2 > a.pending_buf_size && s(t), a.pending + 2 <= a.pending_buf_size && (c(a, 255 & t.adler), c(a, t.adler >> 8 & 255), t.adler = 0, a.status = vt)) : a.status = vt), 0 !== a.pending) {
					if (s(t), 0 === t.avail_out) return a.last_flush = -1, B
				} else if (0 === t.avail_in && r(e) <= r(i) && e !== R) return n(t, Y);
				if (a.status === mt && 0 !== t.avail_in) return n(t, Y);
				if (0 !== t.avail_in || 0 !== a.lookahead || e !== L && a.status !== mt) {
					var p = a.strategy === G ? m(a, e) : a.strategy === H ? v(a, e) : E[a.level].func(a, e);
					if ((p === _t || p === wt) && (a.status = mt), p === bt || p === _t) return 0 === t.avail_out && (a.last_flush = -1), B;
					if (p === yt && (e === M ? j._tr_align(a) : e !== F && (j._tr_stored_block(a, 0, 0, !1), e === D && (o(a.head), 0 === a.lookahead && (a.strstart = 0, a.block_start = 0, a.insert = 0))), s(t), 0 === t.avail_out)) return a.last_flush = -1, B
				}
				return e !== R ? B : a.wrap <= 0 ? U : (2 === a.wrap ? (c(a, 255 & t.adler), c(a, t.adler >> 8 & 255), c(a, t.adler >> 16 & 255), c(a, t.adler >> 24 & 255), c(a, 255 & t.total_in), c(a, t.total_in >> 8 & 255), c(a, t.total_in >> 16 & 255), c(a, t.total_in >> 24 & 255)) : (h(a, t.adler >>> 16),
				h(a, 65535 & t.adler)), s(t), a.wrap > 0 && (a.wrap = -a.wrap), 0 !== a.pending ? B : U)
			}
			function T(t) {
				var e;
				return t && t.state ? (e = t.state.status, e !== ut && e !== ft && e !== dt && e !== pt && e !== gt && e !== vt && e !== mt ? n(t, z) : (t.state = null, e === vt ? n(t, N) : B)) : z
			}
			var E, O = t("../utils/common"),
				j = t("./trees"),
				A = t("./adler32"),
				I = t("./crc32"),
				P = t("./messages"),
				L = 0,
				M = 1,
				D = 3,
				R = 4,
				F = 5,
				B = 0,
				U = 1,
				z = -2,
				N = -3,
				Y = -5,
				X = -1,
				W = 1,
				G = 2,
				H = 3,
				q = 4,
				V = 0,
				Z = 2,
				$ = 8,
				K = 9,
				J = 15,
				Q = 8,
				tt = 29,
				et = 256,
				it = et + 1 + tt,
				nt = 30,
				rt = 19,
				ot = 2 * it + 1,
				st = 15,
				at = 3,
				ct = 258,
				ht = ct + at + 1,
				lt = 32,
				ut = 42,
				ft = 69,
				dt = 73,
				pt = 91,
				gt = 103,
				vt = 113,
				mt = 666,
				bt = 1,
				yt = 2,
				_t = 3,
				wt = 4,
				xt = 3,
				St = function(t, e, i, n, r) {
					this.good_length = t, this.max_lazy = e, this.nice_length = i, this.max_chain = n, this.func = r
				};
			E = [new St(0, 0, 0, 0, d), new St(4, 4, 8, 4, p), new St(4, 5, 16, 8, p), new St(4, 6, 32, 32, p), new St(4, 4, 16, 16, g), new St(8, 16, 32, 32, g), new St(8, 16, 128, 128, g), new St(8, 32, 128, 256, g), new St(32, 128, 258, 1024, g), new St(32, 258, 258, 4096, g)], i.deflateInit = C, i.deflateInit2 = S, i.deflateReset = w, i.deflateResetKeep = _, i.deflateSetHeader = x, i.deflate = k, i.deflateEnd = T, i.deflateInfo = "pako deflate (from Nodeca project)"
		}, {
			"../utils/common": 18,
			"./adler32": 19,
			"./crc32": 21,
			"./messages": 26,
			"./trees": 27
		}],
		23: [function(t, e, i) {
			"use strict";
			var n = 30,
				r = 12;
			e.exports = function(t, e) {
				var i, o, s, a, c, h, l, u, f, d, p, g, v, m, b, y, _, w, x, S, C, k, T, E, O;
				i = t.state, o = t.next_in, E = t.input, s = o + (t.avail_in - 5), a = t.next_out, O = t.output, c = a - (e - t.avail_out), h = a + (t.avail_out - 257), l = i.dmax, u = i.wsize, f = i.whave, d = i.wnext, p = i.window, g = i.hold, v = i.bits, m = i.lencode, b = i.distcode, y = (1 << i.lenbits) - 1, _ = (1 << i.distbits) - 1;
				t: do {
					15 > v && (g += E[o++] << v, v += 8, g += E[o++] << v, v += 8), w = m[g & y];
					e: for (;;) {
						if (x = w >>> 24, g >>>= x, v -= x, x = w >>> 16 & 255, 0 === x) O[a++] = 65535 & w;
						else {
							if (!(16 & x)) {
								if (0 === (64 & x)) {
									w = m[(65535 & w) + (g & (1 << x) - 1)];
									continue e
								}
								if (32 & x) {
									i.mode = r;
									break t
								}
								t.msg = "invalid literal/length code", i.mode = n;
								break t
							}
							S = 65535 & w, x &= 15, x && (x > v && (g += E[o++] << v, v += 8), S += g & (1 << x) - 1, g >>>= x, v -= x), 15 > v && (g += E[o++] << v, v += 8, g += E[o++] << v, v += 8), w = b[g & _];
							i: for (;;) {
								if (x = w >>> 24, g >>>= x, v -= x, x = w >>> 16 & 255, !(16 & x)) {
									if (0 === (64 & x)) {
										w = b[(65535 & w) + (g & (1 << x) - 1)];
										continue i
									}
									t.msg = "invalid distance code", i.mode = n;
									break t
								}
								if (C = 65535 & w, x &= 15, x > v && (g += E[o++] << v, v += 8, x > v && (g += E[o++] << v, v += 8)), C += g & (1 << x) - 1, C > l) {
									t.msg = "invalid distance too far back", i.mode = n;
									break t
								}
								if (g >>>= x, v -= x, x = a - c, C > x) {
									if (x = C - x, x > f && i.sane) {
										t.msg = "invalid distance too far back", i.mode = n;
										break t
									}
									if (k = 0, T = p, 0 === d) {
										if (k += u - x, S > x) {
											S -= x;
											do O[a++] = p[k++];
											while (--x);
											k = a - C, T = O
										}
									} else if (x > d) {
										if (k += u + d - x, x -= d, S > x) {
											S -= x;
											do O[a++] = p[k++];
											while (--x);
											if (k = 0, S > d) {
												x = d, S -= x;
												do O[a++] = p[k++];
												while (--x);
												k = a - C, T = O
											}
										}
									} else if (k += d - x, S > x) {
										S -= x;
										do O[a++] = p[k++];
										while (--x);
										k = a - C, T = O
									}
									for (; S > 2;) O[a++] = T[k++], O[a++] = T[k++], O[a++] = T[k++], S -= 3;
									S && (O[a++] = T[k++], S > 1 && (O[a++] = T[k++]))
								} else {
									k = a - C;
									do O[a++] = O[k++], O[a++] = O[k++], O[a++] = O[k++], S -= 3;
									while (S > 2);
									S && (O[a++] = O[k++], S > 1 && (O[a++] = O[k++]))
								}
								break
							}
						}
						break
					}
				} while (s > o && h > a);
				S = v >> 3, o -= S, v -= S << 3, g &= (1 << v) - 1, t.next_in = o, t.next_out = a, t.avail_in = s > o ? 5 + (s - o) : 5 - (o - s), t.avail_out = h > a ? 257 + (h - a) : 257 - (a - h), i.hold = g, i.bits = v
			}
		}, {}],
		24: [function(t, e, i) {
			"use strict";

			function n(t) {
				return (t >>> 24 & 255) + (t >>> 8 & 65280) + ((65280 & t) << 8) + ((255 & t) << 24)
			}
			function r() {
				this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new m.Buf16(320), this.work = new m.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0
			}
			function o(t) {
				var e;
				return t && t.state ? (e = t.state, t.total_in = t.total_out = e.total = 0, t.msg = "", e.wrap && (t.adler = 1 & e.wrap), e.mode = R, e.last = 0, e.havedict = 0, e.dmax = 32768, e.head = null, e.hold = 0, e.bits = 0, e.lencode = e.lendyn = new m.Buf32(pt), e.distcode = e.distdyn = new m.Buf32(gt), e.sane = 1, e.back = -1, O) : I
			}
			function s(t) {
				var e;
				return t && t.state ? (e = t.state, e.wsize = 0, e.whave = 0, e.wnext = 0, o(t)) : I
			}
			function a(t, e) {
				var i, n;
				return t && t.state ? (n = t.state, 0 > e ? (i = 0, e = -e) : (i = (e >> 4) + 1, 48 > e && (e &= 15)), e && (8 > e || e > 15) ? I : (null !== n.window && n.wbits !== e && (n.window = null), n.wrap = i, n.wbits = e, s(t))) : I
			}
			function c(t, e) {
				var i, n;
				return t ? (n = new r, t.state = n, n.window = null, i = a(t, e), i !== O && (t.state = null), i) : I
			}
			function h(t) {
				return c(t, mt)
			}
			function l(t) {
				if (bt) {
					var e;
					for (g = new m.Buf32(512), v = new m.Buf32(32), e = 0; 144 > e;) t.lens[e++] = 8;
					for (; 256 > e;) t.lens[e++] = 9;
					for (; 280 > e;) t.lens[e++] = 7;
					for (; 288 > e;) t.lens[e++] = 8;
					for (w(S, t.lens, 0, 288, g, 0, t.work, {
						bits: 9
					}), e = 0; 32 > e;) t.lens[e++] = 5;
					w(C, t.lens, 0, 32, v, 0, t.work, {
						bits: 5
					}), bt = !1
				}
				t.lencode = g, t.lenbits = 9, t.distcode = v, t.distbits = 5
			}
			function u(t, e, i, n) {
				var r, o = t.state;
				return null === o.window && (o.wsize = 1 << o.wbits, o.wnext = 0, o.whave = 0, o.window = new m.Buf8(o.wsize)), n >= o.wsize ? (m.arraySet(o.window, e, i - o.wsize, o.wsize, 0), o.wnext = 0, o.whave = o.wsize) : (r = o.wsize - o.wnext, r > n && (r = n), m.arraySet(o.window, e, i - n, r, o.wnext), n -= r, n ? (m.arraySet(o.window, e, i - n, n, 0), o.wnext = n, o.whave = o.wsize) : (o.wnext += r, o.wnext === o.wsize && (o.wnext = 0), o.whave < o.wsize && (o.whave += r))), 0
			}
			function f(t, e) {
				var i, r, o, s, a, c, h, f, d, p, g, v, pt, gt, vt, mt, bt, yt, _t, wt, xt, St, Ct, kt, Tt = 0,
					Et = new m.Buf8(4),
					Ot = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
				if (!t || !t.state || !t.output || !t.input && 0 !== t.avail_in) return I;
				i = t.state, i.mode === q && (i.mode = V), a = t.next_out, o = t.output, h = t.avail_out, s = t.next_in, r = t.input, c = t.avail_in, f = i.hold, d = i.bits, p = c, g = h, St = O;
				t: for (;;) switch (i.mode) {
					case R:
						if (0 === i.wrap) {
							i.mode = V;
							break
						}
						for (; 16 > d;) {
							if (0 === c) break t;
							c--, f += r[s++] << d, d += 8
						}
						if (2 & i.wrap && 35615 === f) {
							i.check = 0, Et[0] = 255 & f, Et[1] = f >>> 8 & 255, i.check = y(i.check, Et, 2, 0), f = 0, d = 0, i.mode = F;
							break
						}
						if (i.flags = 0, i.head && (i.head.done = !1), !(1 & i.wrap) || (((255 & f) << 8) + (f >> 8)) % 31) {
							t.msg = "incorrect header check", i.mode = ut;
							break
						}
						if ((15 & f) !== D) {
							t.msg = "unknown compression method", i.mode = ut;
							break
						}
						if (f >>>= 4, d -= 4, xt = (15 & f) + 8, 0 === i.wbits) i.wbits = xt;
						else if (xt > i.wbits) {
							t.msg = "invalid window size", i.mode = ut;
							break
						}
						i.dmax = 1 << xt, t.adler = i.check = 1, i.mode = 512 & f ? G : q, f = 0, d = 0;
						break;
					case F:
						for (; 16 > d;) {
							if (0 === c) break t;
							c--, f += r[s++] << d, d += 8
						}
						if (i.flags = f, (255 & i.flags) !== D) {
							t.msg = "unknown compression method", i.mode = ut;
							break
						}
						if (57344 & i.flags) {
							t.msg = "unknown header flags set", i.mode = ut;
							break
						}
						i.head && (i.head.text = f >> 8 & 1), 512 & i.flags && (Et[0] = 255 & f, Et[1] = f >>> 8 & 255, i.check = y(i.check, Et, 2, 0)), f = 0, d = 0, i.mode = B;
					case B:
						for (; 32 > d;) {
							if (0 === c) break t;
							c--, f += r[s++] << d, d += 8
						}
						i.head && (i.head.time = f), 512 & i.flags && (Et[0] = 255 & f, Et[1] = f >>> 8 & 255, Et[2] = f >>> 16 & 255, Et[3] = f >>> 24 & 255, i.check = y(i.check, Et, 4, 0)), f = 0, d = 0, i.mode = U;
					case U:
						for (; 16 > d;) {
							if (0 === c) break t;
							c--, f += r[s++] << d, d += 8
						}
						i.head && (i.head.xflags = 255 & f, i.head.os = f >> 8), 512 & i.flags && (Et[0] = 255 & f, Et[1] = f >>> 8 & 255, i.check = y(i.check, Et, 2, 0)), f = 0, d = 0, i.mode = z;
					case z:
						if (1024 & i.flags) {
							for (; 16 > d;) {
								if (0 === c) break t;
								c--, f += r[s++] << d, d += 8
							}
							i.length = f, i.head && (i.head.extra_len = f), 512 & i.flags && (Et[0] = 255 & f, Et[1] = f >>> 8 & 255, i.check = y(i.check, Et, 2, 0)), f = 0, d = 0
						} else i.head && (i.head.extra = null);
						i.mode = N;
					case N:
						if (1024 & i.flags && (v = i.length, v > c && (v = c), v && (i.head && (xt = i.head.extra_len - i.length, i.head.extra || (i.head.extra = new Array(i.head.extra_len)), m.arraySet(i.head.extra, r, s, v, xt)), 512 & i.flags && (i.check = y(i.check, r, v, s)), c -= v, s += v, i.length -= v), i.length)) break t;
						i.length = 0, i.mode = Y;
					case Y:
						if (2048 & i.flags) {
							if (0 === c) break t;
							v = 0;
							do xt = r[s + v++], i.head && xt && i.length < 65536 && (i.head.name += String.fromCharCode(xt));
							while (xt && c > v);
							if (512 & i.flags && (i.check = y(i.check, r, v, s)), c -= v, s += v, xt) break t
						} else i.head && (i.head.name = null);
						i.length = 0, i.mode = X;
					case X:
						if (4096 & i.flags) {
							if (0 === c) break t;
							v = 0;
							do xt = r[s + v++], i.head && xt && i.length < 65536 && (i.head.comment += String.fromCharCode(xt));
							while (xt && c > v);
							if (512 & i.flags && (i.check = y(i.check, r, v, s)), c -= v, s += v, xt) break t
						} else i.head && (i.head.comment = null);
						i.mode = W;
					case W:
						if (512 & i.flags) {
							for (; 16 > d;) {
								if (0 === c) break t;
								c--, f += r[s++] << d, d += 8
							}
							if (f !== (65535 & i.check)) {
								t.msg = "header crc mismatch", i.mode = ut;
								break
							}
							f = 0, d = 0
						}
						i.head && (i.head.hcrc = i.flags >> 9 & 1, i.head.done = !0), t.adler = i.check = 0, i.mode = q;
						break;
					case G:
						for (; 32 > d;) {
							if (0 === c) break t;
							c--, f += r[s++] << d, d += 8
						}
						t.adler = i.check = n(f), f = 0, d = 0, i.mode = H;
					case H:
						if (0 === i.havedict) return t.next_out = a, t.avail_out = h, t.next_in = s, t.avail_in = c, i.hold = f, i.bits = d, A;
						t.adler = i.check = 1, i.mode = q;
					case q:
						if (e === T || e === E) break t;
					case V:
						if (i.last) {
							f >>>= 7 & d, d -= 7 & d, i.mode = ct;
							break
						}
						for (; 3 > d;) {
							if (0 === c) break t;
							c--, f += r[s++] << d, d += 8
						}
						switch (i.last = 1 & f, f >>>= 1, d -= 1, 3 & f) {
							case 0:
								i.mode = Z;
								break;
							case 1:
								if (l(i), i.mode = et, e === E) {
									f >>>= 2, d -= 2;
									break t
								}
								break;
							case 2:
								i.mode = J;
								break;
							case 3:
								t.msg = "invalid block type", i.mode = ut
						}
						f >>>= 2, d -= 2;
						break;
					case Z:
						for (f >>>= 7 & d, d -= 7 & d; 32 > d;) {
							if (0 === c) break t;
							c--, f += r[s++] << d, d += 8
						}
						if ((65535 & f) !== (f >>> 16 ^ 65535)) {
							t.msg = "invalid stored block lengths", i.mode = ut;
							break
						}
						if (i.length = 65535 & f, f = 0, d = 0, i.mode = $, e === E) break t;
					case $:
						i.mode = K;
					case K:
						if (v = i.length) {
							if (v > c && (v = c), v > h && (v = h), 0 === v) break t;
							m.arraySet(o, r, s, v, a), c -= v, s += v, h -= v, a += v, i.length -= v;
							break
						}
						i.mode = q;
						break;
					case J:
						for (; 14 > d;) {
							if (0 === c) break t;
							c--, f += r[s++] << d, d += 8
						}
						if (i.nlen = (31 & f) + 257, f >>>= 5, d -= 5, i.ndist = (31 & f) + 1, f >>>= 5, d -= 5, i.ncode = (15 & f) + 4, f >>>= 4, d -= 4, i.nlen > 286 || i.ndist > 30) {
							t.msg = "too many length or distance symbols", i.mode = ut;
							break
						}
						i.have = 0, i.mode = Q;
					case Q:
						for (; i.have < i.ncode;) {
							for (; 3 > d;) {
								if (0 === c) break t;
								c--, f += r[s++] << d, d += 8
							}
							i.lens[Ot[i.have++]] = 7 & f, f >>>= 3, d -= 3
						}
						for (; i.have < 19;) i.lens[Ot[i.have++]] = 0;
						if (i.lencode = i.lendyn, i.lenbits = 7, Ct = {
							bits: i.lenbits
						}, St = w(x, i.lens, 0, 19, i.lencode, 0, i.work, Ct), i.lenbits = Ct.bits, St) {
							t.msg = "invalid code lengths set", i.mode = ut;
							break
						}
						i.have = 0, i.mode = tt;
					case tt:
						for (; i.have < i.nlen + i.ndist;) {
							for (; Tt = i.lencode[f & (1 << i.lenbits) - 1], vt = Tt >>> 24, mt = Tt >>> 16 & 255, bt = 65535 & Tt, !(d >= vt);) {
								if (0 === c) break t;
								c--, f += r[s++] << d, d += 8
							}
							if (16 > bt) f >>>= vt, d -= vt, i.lens[i.have++] = bt;
							else {
								if (16 === bt) {
									for (kt = vt + 2; kt > d;) {
										if (0 === c) break t;
										c--, f += r[s++] << d, d += 8
									}
									if (f >>>= vt, d -= vt, 0 === i.have) {
										t.msg = "invalid bit length repeat", i.mode = ut;
										break
									}
									xt = i.lens[i.have - 1], v = 3 + (3 & f), f >>>= 2, d -= 2
								} else if (17 === bt) {
									for (kt = vt + 3; kt > d;) {
										if (0 === c) break t;
										c--, f += r[s++] << d, d += 8
									}
									f >>>= vt, d -= vt, xt = 0, v = 3 + (7 & f), f >>>= 3, d -= 3
								} else {
									for (kt = vt + 7; kt > d;) {
										if (0 === c) break t;
										c--, f += r[s++] << d, d += 8
									}
									f >>>= vt, d -= vt, xt = 0, v = 11 + (127 & f), f >>>= 7, d -= 7
								}
								if (i.have + v > i.nlen + i.ndist) {
									t.msg = "invalid bit length repeat", i.mode = ut;
									break
								}
								for (; v--;) i.lens[i.have++] = xt
							}
						}
						if (i.mode === ut) break;
						if (0 === i.lens[256]) {
							t.msg = "invalid code -- missing end-of-block", i.mode = ut;
							break
						}
						if (i.lenbits = 9, Ct = {
							bits: i.lenbits
						}, St = w(S, i.lens, 0, i.nlen, i.lencode, 0, i.work, Ct), i.lenbits = Ct.bits, St) {
							t.msg = "invalid literal/lengths set", i.mode = ut;
							break
						}
						if (i.distbits = 6, i.distcode = i.distdyn, Ct = {
							bits: i.distbits
						}, St = w(C, i.lens, i.nlen, i.ndist, i.distcode, 0, i.work, Ct), i.distbits = Ct.bits, St) {
							t.msg = "invalid distances set", i.mode = ut;
							break
						}
						if (i.mode = et, e === E) break t;
					case et:
						i.mode = it;
					case it:
						if (c >= 6 && h >= 258) {
							t.next_out = a, t.avail_out = h, t.next_in = s, t.avail_in = c, i.hold = f, i.bits = d, _(t, g), a = t.next_out, o = t.output, h = t.avail_out, s = t.next_in, r = t.input, c = t.avail_in, f = i.hold, d = i.bits, i.mode === q && (i.back = -1);
							break
						}
						for (i.back = 0; Tt = i.lencode[f & (1 << i.lenbits) - 1], vt = Tt >>> 24, mt = Tt >>> 16 & 255, bt = 65535 & Tt, !(d >= vt);) {
							if (0 === c) break t;
							c--, f += r[s++] << d, d += 8
						}
						if (mt && 0 === (240 & mt)) {
							for (yt = vt, _t = mt, wt = bt; Tt = i.lencode[wt + ((f & (1 << yt + _t) - 1) >> yt)], vt = Tt >>> 24, mt = Tt >>> 16 & 255, bt = 65535 & Tt, !(d >= yt + vt);) {
								if (0 === c) break t;
								c--, f += r[s++] << d, d += 8
							}
							f >>>= yt, d -= yt, i.back += yt
						}
						if (f >>>= vt, d -= vt, i.back += vt, i.length = bt, 0 === mt) {
							i.mode = at;
							break
						}
						if (32 & mt) {
							i.back = -1, i.mode = q;
							break
						}
						if (64 & mt) {
							t.msg = "invalid literal/length code", i.mode = ut;
							break
						}
						i.extra = 15 & mt, i.mode = nt;
					case nt:
						if (i.extra) {
							for (kt = i.extra; kt > d;) {
								if (0 === c) break t;
								c--, f += r[s++] << d, d += 8
							}
							i.length += f & (1 << i.extra) - 1, f >>>= i.extra, d -= i.extra, i.back += i.extra
						}
						i.was = i.length, i.mode = rt;
					case rt:
						for (; Tt = i.distcode[f & (1 << i.distbits) - 1], vt = Tt >>> 24, mt = Tt >>> 16 & 255, bt = 65535 & Tt, !(d >= vt);) {
							if (0 === c) break t;
							c--, f += r[s++] << d, d += 8
						}
						if (0 === (240 & mt)) {
							for (yt = vt, _t = mt, wt = bt; Tt = i.distcode[wt + ((f & (1 << yt + _t) - 1) >> yt)], vt = Tt >>> 24, mt = Tt >>> 16 & 255, bt = 65535 & Tt, !(d >= yt + vt);) {
								if (0 === c) break t;
								c--, f += r[s++] << d, d += 8
							}
							f >>>= yt, d -= yt, i.back += yt
						}
						if (f >>>= vt, d -= vt, i.back += vt, 64 & mt) {
							t.msg = "invalid distance code", i.mode = ut;
							break
						}
						i.offset = bt, i.extra = 15 & mt, i.mode = ot;
					case ot:
						if (i.extra) {
							for (kt = i.extra; kt > d;) {
								if (0 === c) break t;
								c--, f += r[s++] << d, d += 8
							}
							i.offset += f & (1 << i.extra) - 1, f >>>= i.extra, d -= i.extra, i.back += i.extra
						}
						if (i.offset > i.dmax) {
							t.msg = "invalid distance too far back", i.mode = ut;
							break
						}
						i.mode = st;
					case st:
						if (0 === h) break t;
						if (v = g - h, i.offset > v) {
							if (v = i.offset - v, v > i.whave && i.sane) {
								t.msg = "invalid distance too far back", i.mode = ut;
								break
							}
							v > i.wnext ? (v -= i.wnext, pt = i.wsize - v) : pt = i.wnext - v, v > i.length && (v = i.length), gt = i.window
						} else gt = o, pt = a - i.offset, v = i.length;
						v > h && (v = h), h -= v, i.length -= v;
						do o[a++] = gt[pt++];
						while (--v);
						0 === i.length && (i.mode = it);
						break;
					case at:
						if (0 === h) break t;
						o[a++] = i.length, h--, i.mode = it;
						break;
					case ct:
						if (i.wrap) {
							for (; 32 > d;) {
								if (0 === c) break t;
								c--, f |= r[s++] << d, d += 8
							}
							if (g -= h, t.total_out += g, i.total += g, g && (t.adler = i.check = i.flags ? y(i.check, o, g, a - g) : b(i.check, o, g, a - g)), g = h, (i.flags ? f : n(f)) !== i.check) {
								t.msg = "incorrect data check", i.mode = ut;
								break
							}
							f = 0, d = 0
						}
						i.mode = ht;
					case ht:
						if (i.wrap && i.flags) {
							for (; 32 > d;) {
								if (0 === c) break t;
								c--, f += r[s++] << d, d += 8
							}
							if (f !== (4294967295 & i.total)) {
								t.msg = "incorrect length check", i.mode = ut;
								break
							}
							f = 0, d = 0
						}
						i.mode = lt;
					case lt:
						St = j;
						break t;
					case ut:
						St = P;
						break t;
					case ft:
						return L;
					case dt:
					default:
						return I
				}
				return t.next_out = a,
				t.avail_out = h,
				t.next_in = s,
				t.avail_in = c,
				i.hold = f,
				i.bits = d,
				(i.wsize || g !== t.avail_out && i.mode < ut && (i.mode < ct || e !== k)) && u(t, t.output, t.next_out, g - t.avail_out) ? (i.mode = ft, L) : (p -= t.avail_in, g -= t.avail_out, t.total_in += p, t.total_out += g, i.total += g, i.wrap && g && (t.adler = i.check = i.flags ? y(i.check, o, g, t.next_out - g) : b(i.check, o, g, t.next_out - g)), t.data_type = i.bits + (i.last ? 64 : 0) + (i.mode === q ? 128 : 0) + (i.mode === et || i.mode === $ ? 256 : 0), (0 === p && 0 === g || e === k) && St === O && (St = M), St)
			}
			function d(t) {
				if (!t || !t.state) return I;
				var e = t.state;
				return e.window && (e.window = null), t.state = null, O
			}
			function p(t, e) {
				var i;
				return t && t.state ? (i = t.state, 0 === (2 & i.wrap) ? I : (i.head = e, e.done = !1, O)) : I
			}
			var g, v, m = t("../utils/common"),
				b = t("./adler32"),
				y = t("./crc32"),
				_ = t("./inffast"),
				w = t("./inftrees"),
				x = 0,
				S = 1,
				C = 2,
				k = 4,
				T = 5,
				E = 6,
				O = 0,
				j = 1,
				A = 2,
				I = -2,
				P = -3,
				L = -4,
				M = -5,
				D = 8,
				R = 1,
				F = 2,
				B = 3,
				U = 4,
				z = 5,
				N = 6,
				Y = 7,
				X = 8,
				W = 9,
				G = 10,
				H = 11,
				q = 12,
				V = 13,
				Z = 14,
				$ = 15,
				K = 16,
				J = 17,
				Q = 18,
				tt = 19,
				et = 20,
				it = 21,
				nt = 22,
				rt = 23,
				ot = 24,
				st = 25,
				at = 26,
				ct = 27,
				ht = 28,
				lt = 29,
				ut = 30,
				ft = 31,
				dt = 32,
				pt = 852,
				gt = 592,
				vt = 15,
				mt = vt,
				bt = !0;
			i.inflateReset = s, i.inflateReset2 = a, i.inflateResetKeep = o, i.inflateInit = h, i.inflateInit2 = c, i.inflate = f, i.inflateEnd = d, i.inflateGetHeader = p, i.inflateInfo = "pako inflate (from Nodeca project)"
		}, {
			"../utils/common": 18,
			"./adler32": 19,
			"./crc32": 21,
			"./inffast": 23,
			"./inftrees": 25
		}],
		25: [function(t, e, i) {
			"use strict";
			var n = t("../utils/common"),
				r = 15,
				o = 852,
				s = 592,
				a = 0,
				c = 1,
				h = 2,
				l = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
				u = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78],
				f = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0],
				d = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
			e.exports = function(t, e, i, p, g, v, m, b) {
				var y, _, w, x, S, C, k, T, E, O = b.bits,
					j = 0,
					A = 0,
					I = 0,
					P = 0,
					L = 0,
					M = 0,
					D = 0,
					R = 0,
					F = 0,
					B = 0,
					U = null,
					z = 0,
					N = new n.Buf16(r + 1),
					Y = new n.Buf16(r + 1),
					X = null,
					W = 0;
				for (j = 0; r >= j; j++) N[j] = 0;
				for (A = 0; p > A; A++) N[e[i + A]]++;
				for (L = O, P = r; P >= 1 && 0 === N[P]; P--);
				if (L > P && (L = P), 0 === P) return g[v++] = 20971520, g[v++] = 20971520, b.bits = 1, 0;
				for (I = 1; P > I && 0 === N[I]; I++);
				for (I > L && (L = I), R = 1, j = 1; r >= j; j++) if (R <<= 1, R -= N[j], 0 > R) return -1;
				if (R > 0 && (t === a || 1 !== P)) return -1;
				for (Y[1] = 0, j = 1; r > j; j++) Y[j + 1] = Y[j] + N[j];
				for (A = 0; p > A; A++) 0 !== e[i + A] && (m[Y[e[i + A]]++] = A);
				if (t === a ? (U = X = m, C = 19) : t === c ? (U = l, z -= 257, X = u, W -= 257, C = 256) : (U = f, X = d, C = -1), B = 0, A = 0, j = I, S = v, M = L, D = 0, w = -1, F = 1 << L, x = F - 1, t === c && F > o || t === h && F > s) return 1;
				for (var G = 0;;) {
					G++, k = j - D, m[A] < C ? (T = 0, E = m[A]) : m[A] > C ? (T = X[W + m[A]], E = U[z + m[A]]) : (T = 96, E = 0), y = 1 << j - D, _ = 1 << M, I = _;
					do _ -= y, g[S + (B >> D) + _] = k << 24 | T << 16 | E | 0;
					while (0 !== _);
					for (y = 1 << j - 1; B & y;) y >>= 1;
					if (0 !== y ? (B &= y - 1, B += y) : B = 0, A++, 0 === --N[j]) {
						if (j === P) break;
						j = e[i + m[A]]
					}
					if (j > L && (B & x) !== w) {
						for (0 === D && (D = L), S += I, M = j - D, R = 1 << M; P > M + D && (R -= N[M + D], !(0 >= R));) M++, R <<= 1;
						if (F += 1 << M, t === c && F > o || t === h && F > s) return 1;
						w = B & x, g[w] = L << 24 | M << 16 | S - v | 0
					}
				}
				return 0 !== B && (g[S + B] = j - D << 24 | 64 << 16 | 0), b.bits = L, 0
			}
		}, {
			"../utils/common": 18
		}],
		26: [function(t, e, i) {
			"use strict";
			e.exports = {
				2: "need dictionary",
				1: "stream end",
				0: "",
				"-1": "file error",
				"-2": "stream error",
				"-3": "data error",
				"-4": "insufficient memory",
				"-5": "buffer error",
				"-6": "incompatible version"
			}
		}, {}],
		27: [function(t, e, i) {
			"use strict";

			function n(t) {
				for (var e = t.length; --e >= 0;) t[e] = 0
			}
			function r(t) {
				return 256 > t ? st[t] : st[256 + (t >>> 7)]
			}
			function o(t, e) {
				t.pending_buf[t.pending++] = 255 & e, t.pending_buf[t.pending++] = e >>> 8 & 255
			}
			function s(t, e, i) {
				t.bi_valid > q - i ? (t.bi_buf |= e << t.bi_valid & 65535, o(t, t.bi_buf), t.bi_buf = e >> q - t.bi_valid, t.bi_valid += i - q) : (t.bi_buf |= e << t.bi_valid & 65535, t.bi_valid += i)
			}
			function a(t, e, i) {
				s(t, i[2 * e], i[2 * e + 1])
			}
			function c(t, e) {
				var i = 0;
				do i |= 1 & t, t >>>= 1, i <<= 1;
				while (--e > 0);
				return i >>> 1
			}
			function h(t) {
				16 === t.bi_valid ? (o(t, t.bi_buf), t.bi_buf = 0, t.bi_valid = 0) : t.bi_valid >= 8 && (t.pending_buf[t.pending++] = 255 & t.bi_buf, t.bi_buf >>= 8, t.bi_valid -= 8)
			}
			function l(t, e) {
				var i, n, r, o, s, a, c = e.dyn_tree,
					h = e.max_code,
					l = e.stat_desc.static_tree,
					u = e.stat_desc.has_stree,
					f = e.stat_desc.extra_bits,
					d = e.stat_desc.extra_base,
					p = e.stat_desc.max_length,
					g = 0;
				for (o = 0; H >= o; o++) t.bl_count[o] = 0;
				for (c[2 * t.heap[t.heap_max] + 1] = 0, i = t.heap_max + 1; G > i; i++) n = t.heap[i], o = c[2 * c[2 * n + 1] + 1] + 1, o > p && (o = p, g++), c[2 * n + 1] = o, n > h || (t.bl_count[o]++, s = 0, n >= d && (s = f[n - d]), a = c[2 * n], t.opt_len += a * (o + s), u && (t.static_len += a * (l[2 * n + 1] + s)));
				if (0 !== g) {
					do {
						for (o = p - 1; 0 === t.bl_count[o];) o--;
						t.bl_count[o]--, t.bl_count[o + 1] += 2, t.bl_count[p]--, g -= 2
					} while (g > 0);
					for (o = p; 0 !== o; o--) for (n = t.bl_count[o]; 0 !== n;) r = t.heap[--i], r > h || (c[2 * r + 1] !== o && (t.opt_len += (o - c[2 * r + 1]) * c[2 * r], c[2 * r + 1] = o), n--)
				}
			}
			function u(t, e, i) {
				var n, r, o = new Array(H + 1),
					s = 0;
				for (n = 1; H >= n; n++) o[n] = s = s + i[n - 1] << 1;
				for (r = 0; e >= r; r++) {
					var a = t[2 * r + 1];
					0 !== a && (t[2 * r] = c(o[a]++, a))
				}
			}
			function f() {
				var t, e, i, n, r, o = new Array(H + 1);
				for (i = 0, n = 0; z - 1 > n; n++) for (ct[n] = i, t = 0; t < 1 << Q[n]; t++) at[i++] = n;
				for (at[i - 1] = n, r = 0, n = 0; 16 > n; n++) for (ht[n] = r, t = 0; t < 1 << tt[n]; t++) st[r++] = n;
				for (r >>= 7; X > n; n++) for (ht[n] = r << 7, t = 0; t < 1 << tt[n] - 7; t++) st[256 + r++] = n;
				for (e = 0; H >= e; e++) o[e] = 0;
				for (t = 0; 143 >= t;) rt[2 * t + 1] = 8, t++, o[8]++;
				for (; 255 >= t;) rt[2 * t + 1] = 9, t++, o[9]++;
				for (; 279 >= t;) rt[2 * t + 1] = 7, t++, o[7]++;
				for (; 287 >= t;) rt[2 * t + 1] = 8, t++, o[8]++;
				for (u(rt, Y + 1, o), t = 0; X > t; t++) ot[2 * t + 1] = 5, ot[2 * t] = c(t, 5);
				lt = new dt(rt, Q, N + 1, Y, H), ut = new dt(ot, tt, 0, X, H), ft = new dt(new Array(0), et, 0, W, V)
			}
			function d(t) {
				var e;
				for (e = 0; Y > e; e++) t.dyn_ltree[2 * e] = 0;
				for (e = 0; X > e; e++) t.dyn_dtree[2 * e] = 0;
				for (e = 0; W > e; e++) t.bl_tree[2 * e] = 0;
				t.dyn_ltree[2 * Z] = 1, t.opt_len = t.static_len = 0, t.last_lit = t.matches = 0
			}
			function p(t) {
				t.bi_valid > 8 ? o(t, t.bi_buf) : t.bi_valid > 0 && (t.pending_buf[t.pending++] = t.bi_buf), t.bi_buf = 0, t.bi_valid = 0
			}
			function g(t, e, i, n) {
				p(t), n && (o(t, i), o(t, ~i)), A.arraySet(t.pending_buf, t.window, e, i, t.pending), t.pending += i
			}
			function v(t, e, i, n) {
				var r = 2 * e,
					o = 2 * i;
				return t[r] < t[o] || t[r] === t[o] && n[e] <= n[i]
			}
			function m(t, e, i) {
				for (var n = t.heap[i], r = i << 1; r <= t.heap_len && (r < t.heap_len && v(e, t.heap[r + 1], t.heap[r], t.depth) && r++, !v(e, n, t.heap[r], t.depth));) t.heap[i] = t.heap[r], i = r, r <<= 1;
				t.heap[i] = n
			}
			function b(t, e, i) {
				var n, o, c, h, l = 0;
				if (0 !== t.last_lit) do n = t.pending_buf[t.d_buf + 2 * l] << 8 | t.pending_buf[t.d_buf + 2 * l + 1], o = t.pending_buf[t.l_buf + l], l++, 0 === n ? a(t, o, e) : (c = at[o], a(t, c + N + 1, e), h = Q[c], 0 !== h && (o -= ct[c], s(t, o, h)), n--, c = r(n), a(t, c, i), h = tt[c], 0 !== h && (n -= ht[c], s(t, n, h)));
				while (l < t.last_lit);
				a(t, Z, e)
			}
			function y(t, e) {
				var i, n, r, o = e.dyn_tree,
					s = e.stat_desc.static_tree,
					a = e.stat_desc.has_stree,
					c = e.stat_desc.elems,
					h = -1;
				for (t.heap_len = 0, t.heap_max = G, i = 0; c > i; i++) 0 !== o[2 * i] ? (t.heap[++t.heap_len] = h = i, t.depth[i] = 0) : o[2 * i + 1] = 0;
				for (; t.heap_len < 2;) r = t.heap[++t.heap_len] = 2 > h ? ++h : 0, o[2 * r] = 1, t.depth[r] = 0, t.opt_len--, a && (t.static_len -= s[2 * r + 1]);
				for (e.max_code = h, i = t.heap_len >> 1; i >= 1; i--) m(t, o, i);
				r = c;
				do i = t.heap[1], t.heap[1] = t.heap[t.heap_len--], m(t, o, 1), n = t.heap[1], t.heap[--t.heap_max] = i, t.heap[--t.heap_max] = n, o[2 * r] = o[2 * i] + o[2 * n], t.depth[r] = (t.depth[i] >= t.depth[n] ? t.depth[i] : t.depth[n]) + 1, o[2 * i + 1] = o[2 * n + 1] = r, t.heap[1] = r++, m(t, o, 1);
				while (t.heap_len >= 2);
				t.heap[--t.heap_max] = t.heap[1], l(t, e), u(o, h, t.bl_count)
			}
			function _(t, e, i) {
				var n, r, o = -1,
					s = e[1],
					a = 0,
					c = 7,
					h = 4;
				for (0 === s && (c = 138, h = 3), e[2 * (i + 1) + 1] = 65535, n = 0; i >= n; n++) r = s, s = e[2 * (n + 1) + 1], ++a < c && r === s || (h > a ? t.bl_tree[2 * r] += a : 0 !== r ? (r !== o && t.bl_tree[2 * r]++, t.bl_tree[2 * $]++) : 10 >= a ? t.bl_tree[2 * K]++ : t.bl_tree[2 * J]++, a = 0, o = r, 0 === s ? (c = 138, h = 3) : r === s ? (c = 6, h = 3) : (c = 7, h = 4))
			}
			function w(t, e, i) {
				var n, r, o = -1,
					c = e[1],
					h = 0,
					l = 7,
					u = 4;
				for (0 === c && (l = 138, u = 3), n = 0; i >= n; n++) if (r = c, c = e[2 * (n + 1) + 1], !(++h < l && r === c)) {
					if (u > h) {
						do a(t, r, t.bl_tree);
						while (0 !== --h)
					} else 0 !== r ? (r !== o && (a(t, r, t.bl_tree), h--), a(t, $, t.bl_tree), s(t, h - 3, 2)) : 10 >= h ? (a(t, K, t.bl_tree), s(t, h - 3, 3)) : (a(t, J, t.bl_tree), s(t, h - 11, 7));
					h = 0, o = r, 0 === c ? (l = 138, u = 3) : r === c ? (l = 6, u = 3) : (l = 7, u = 4)
				}
			}
			function x(t) {
				var e;
				for (_(t, t.dyn_ltree, t.l_desc.max_code), _(t, t.dyn_dtree, t.d_desc.max_code), y(t, t.bl_desc), e = W - 1; e >= 3 && 0 === t.bl_tree[2 * it[e] + 1]; e--);
				return t.opt_len += 3 * (e + 1) + 5 + 5 + 4, e
			}
			function S(t, e, i, n) {
				var r;
				for (s(t, e - 257, 5), s(t, i - 1, 5), s(t, n - 4, 4), r = 0; n > r; r++) s(t, t.bl_tree[2 * it[r] + 1], 3);
				w(t, t.dyn_ltree, e - 1), w(t, t.dyn_dtree, i - 1)
			}
			function C(t) {
				var e, i = 4093624447;
				for (e = 0; 31 >= e; e++, i >>>= 1) if (1 & i && 0 !== t.dyn_ltree[2 * e]) return P;
				if (0 !== t.dyn_ltree[18] || 0 !== t.dyn_ltree[20] || 0 !== t.dyn_ltree[26]) return L;
				for (e = 32; N > e; e++) if (0 !== t.dyn_ltree[2 * e]) return L;
				return P
			}
			function k(t) {
				gt || (f(), gt = !0), t.l_desc = new pt(t.dyn_ltree, lt), t.d_desc = new pt(t.dyn_dtree, ut), t.bl_desc = new pt(t.bl_tree, ft), t.bi_buf = 0, t.bi_valid = 0, d(t)
			}
			function T(t, e, i, n) {
				s(t, (D << 1) + (n ? 1 : 0), 3), g(t, e, i, !0)
			}
			function E(t) {
				s(t, R << 1, 3), a(t, Z, rt), h(t)
			}
			function O(t, e, i, n) {
				var r, o, a = 0;
				t.level > 0 ? (t.strm.data_type === M && (t.strm.data_type = C(t)), y(t, t.l_desc), y(t, t.d_desc), a = x(t), r = t.opt_len + 3 + 7 >>> 3, o = t.static_len + 3 + 7 >>> 3, r >= o && (r = o)) : r = o = i + 5, r >= i + 4 && -1 !== e ? T(t, e, i, n) : t.strategy === I || o === r ? (s(t, (R << 1) + (n ? 1 : 0), 3), b(t, rt, ot)) : (s(t, (F << 1) + (n ? 1 : 0), 3), S(t, t.l_desc.max_code + 1, t.d_desc.max_code + 1, a + 1), b(t, t.dyn_ltree, t.dyn_dtree)), d(t), n && p(t)
			}
			function j(t, e, i) {
				return t.pending_buf[t.d_buf + 2 * t.last_lit] = e >>> 8 & 255, t.pending_buf[t.d_buf + 2 * t.last_lit + 1] = 255 & e, t.pending_buf[t.l_buf + t.last_lit] = 255 & i, t.last_lit++, 0 === e ? t.dyn_ltree[2 * i]++ : (t.matches++, e--, t.dyn_ltree[2 * (at[i] + N + 1)]++, t.dyn_dtree[2 * r(e)]++), t.last_lit === t.lit_bufsize - 1
			}
			var A = t("../utils/common"),
				I = 4,
				P = 0,
				L = 1,
				M = 2,
				D = 0,
				R = 1,
				F = 2,
				B = 3,
				U = 258,
				z = 29,
				N = 256,
				Y = N + 1 + z,
				X = 30,
				W = 19,
				G = 2 * Y + 1,
				H = 15,
				q = 16,
				V = 7,
				Z = 256,
				$ = 16,
				K = 17,
				J = 18,
				Q = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0],
				tt = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
				et = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
				it = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
				nt = 512,
				rt = new Array(2 * (Y + 2));
			n(rt);
			var ot = new Array(2 * X);
			n(ot);
			var st = new Array(nt);
			n(st);
			var at = new Array(U - B + 1);
			n(at);
			var ct = new Array(z);
			n(ct);
			var ht = new Array(X);
			n(ht);
			var lt, ut, ft, dt = function(t, e, i, n, r) {
				this.static_tree = t, this.extra_bits = e, this.extra_base = i, this.elems = n, this.max_length = r, this.has_stree = t && t.length
			}, pt = function(t, e) {
				this.dyn_tree = t, this.max_code = 0, this.stat_desc = e
			}, gt = !1;
			i._tr_init = k, i._tr_stored_block = T, i._tr_flush_block = O, i._tr_tally = j, i._tr_align = E
		}, {
			"../utils/common": 18
		}],
		28: [function(t, e, i) {
			"use strict";

			function n() {
				this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0
			}
			e.exports = n
		}, {}],
		29: [function(t, e, i) {
			(function(e, n) {
				function r(t) {
					if (t < i.DEFLATE || t > i.UNZIP) throw new TypeError("Bad argument");
					this.mode = t, this.init_done = !1, this.write_in_progress = !1, this.pending_close = !1, this.windowBits = 0, this.level = 0, this.memLevel = 0, this.strategy = 0, this.dictionary = null
				}
				function o(t, e) {
					for (var i = 0; i < t.length; i++) this[e + i] = t[i]
				}
				var s = t("pako/lib/zlib/messages"),
					a = t("pako/lib/zlib/zstream"),
					c = t("pako/lib/zlib/deflate.js"),
					h = t("pako/lib/zlib/inflate.js"),
					l = t("pako/lib/zlib/constants");
				for (var u in l) i[u] = l[u];
				i.NONE = 0, i.DEFLATE = 1, i.INFLATE = 2, i.GZIP = 3, i.GUNZIP = 4, i.DEFLATERAW = 5, i.INFLATERAW = 6, i.UNZIP = 7, r.prototype.init = function(t, e, n, r, o) {
					switch (this.windowBits = t, this.level = e, this.memLevel = n, this.strategy = r, (this.mode === i.GZIP || this.mode === i.GUNZIP) && (this.windowBits += 16), this.mode === i.UNZIP && (this.windowBits += 32), (this.mode === i.DEFLATERAW || this.mode === i.INFLATERAW) && (this.windowBits = -this.windowBits), this.strm = new a, this.mode) {
						case i.DEFLATE:
						case i.GZIP:
						case i.DEFLATERAW:
							var s = c.deflateInit2(this.strm, this.level, i.Z_DEFLATED, this.windowBits, this.memLevel, this.strategy);
							break;
						case i.INFLATE:
						case i.GUNZIP:
						case i.INFLATERAW:
						case i.UNZIP:
							var s = h.inflateInit2(this.strm, this.windowBits);
							break;
						default:
							throw new Error("Unknown mode " + this.mode)
					}
					return s !== i.Z_OK ? void this._error(s) : (this.write_in_progress = !1, void(this.init_done = !0))
				}, r.prototype.params = function() {
					throw new Error("deflateParams Not supported")
				}, r.prototype._writeCheck = function() {
					if (!this.init_done) throw new Error("write before init");
					if (this.mode === i.NONE) throw new Error("already finalized");
					if (this.write_in_progress) throw new Error("write already in progress");
					if (this.pending_close) throw new Error("close is pending")
				}, r.prototype.write = function(t, i, n, r, o, s, a) {
					this._writeCheck(), this.write_in_progress = !0;
					var c = this;
					return e.nextTick(function() {
						c.write_in_progress = !1;
						var e = c._write(t, i, n, r, o, s, a);
						c.callback(e[0], e[1]), c.pending_close && c.close()
					}), this
				}, r.prototype.writeSync = function(t, e, i, n, r, o, s) {
					return this._writeCheck(), this._write(t, e, i, n, r, o, s)
				}, r.prototype._write = function(t, e, r, s, a, l, u) {
					if (this.write_in_progress = !0, t !== i.Z_NO_FLUSH && t !== i.Z_PARTIAL_FLUSH && t !== i.Z_SYNC_FLUSH && t !== i.Z_FULL_FLUSH && t !== i.Z_FINISH && t !== i.Z_BLOCK) throw new Error("Invalid flush value");
					null == e && (e = new n(0), s = 0, r = 0), a._set ? a.set = a._set : a.set = o;
					var f = this.strm;
					switch (f.avail_in = s, f.input = e, f.next_in = r, f.avail_out = u, f.output = a, f.next_out = l, this.mode) {
						case i.DEFLATE:
						case i.GZIP:
						case i.DEFLATERAW:
							var d = c.deflate(f, t);
							break;
						case i.UNZIP:
						case i.INFLATE:
						case i.GUNZIP:
						case i.INFLATERAW:
							var d = h.inflate(f, t);
							break;
						default:
							throw new Error("Unknown mode " + this.mode)
					}
					return d !== i.Z_STREAM_END && d !== i.Z_OK && this._error(d), this.write_in_progress = !1, [f.avail_in, f.avail_out]
				}, r.prototype.close = function() {
					return this.write_in_progress ? void(this.pending_close = !0) : (this.pending_close = !1, this.mode === i.DEFLATE || this.mode === i.GZIP || this.mode === i.DEFLATERAW ? c.deflateEnd(this.strm) : h.inflateEnd(this.strm), void(this.mode = i.NONE))
				}, r.prototype.reset = function() {
					switch (this.mode) {
						case i.DEFLATE:
						case i.DEFLATERAW:
							var t = c.deflateReset(this.strm);
							break;
						case i.INFLATE:
						case i.INFLATERAW:
							var t = h.inflateReset(this.strm)
					}
					t !== i.Z_OK && this._error(t)
				}, r.prototype._error = function(t) {
					this.onerror(s[t] + ": " + this.strm.msg, t), this.write_in_progress = !1, this.pending_close && this.close()
				}, i.Zlib = r
			}).call(this, t("_process"), t("buffer").Buffer)
		}, {
			_process: 38,
			buffer: 31,
			"pako/lib/zlib/constants": 20,
			"pako/lib/zlib/deflate.js": 22,
			"pako/lib/zlib/inflate.js": 24,
			"pako/lib/zlib/messages": 26,
			"pako/lib/zlib/zstream": 28
		}],
		30: [function(t, e, i) {
			(function(e, n) {
				function r(t, e, i) {
					function r() {
						for (var e; null !== (e = t.read());) a.push(e), c += e.length;
						t.once("readable", r)
					}
					function o(e) {
						t.removeListener("end", s), t.removeListener("readable", r), i(e)
					}
					function s() {
						var e = n.concat(a, c);
						a = [], i(null, e), t.close()
					}
					var a = [],
						c = 0;
					t.on("error", o), t.on("end", s), t.end(e), r()
				}
				function o(t, e) {
					if ("string" == typeof e && (e = new n(e)), !n.isBuffer(e)) throw new TypeError("Not a string or buffer");
					var i = g.Z_FINISH;
					return t._processChunk(e, i)
				}
				function s(t) {
					return this instanceof s ? void d.call(this, t, g.DEFLATE) : new s(t)
				}
				function a(t) {
					return this instanceof a ? void d.call(this, t, g.INFLATE) : new a(t)
				}
				function c(t) {
					return this instanceof c ? void d.call(this, t, g.GZIP) : new c(t)
				}
				function h(t) {
					return this instanceof h ? void d.call(this, t, g.GUNZIP) : new h(t)
				}
				function l(t) {
					return this instanceof l ? void d.call(this, t, g.DEFLATERAW) : new l(t)
				}
				function u(t) {
					return this instanceof u ? void d.call(this, t, g.INFLATERAW) : new u(t)
				}
				function f(t) {
					return this instanceof f ? void d.call(this, t, g.UNZIP) : new f(t)
				}
				function d(t, e) {
					if (this._opts = t = t || {}, this._chunkSize = t.chunkSize || i.Z_DEFAULT_CHUNK, p.call(this, t), t.flush && t.flush !== g.Z_NO_FLUSH && t.flush !== g.Z_PARTIAL_FLUSH && t.flush !== g.Z_SYNC_FLUSH && t.flush !== g.Z_FULL_FLUSH && t.flush !== g.Z_FINISH && t.flush !== g.Z_BLOCK) throw new Error("Invalid flush flag: " + t.flush);
					if (this._flushFlag = t.flush || g.Z_NO_FLUSH, t.chunkSize && (t.chunkSize < i.Z_MIN_CHUNK || t.chunkSize > i.Z_MAX_CHUNK)) throw new Error("Invalid chunk size: " + t.chunkSize);
					if (t.windowBits && (t.windowBits < i.Z_MIN_WINDOWBITS || t.windowBits > i.Z_MAX_WINDOWBITS)) throw new Error("Invalid windowBits: " + t.windowBits);
					if (t.level && (t.level < i.Z_MIN_LEVEL || t.level > i.Z_MAX_LEVEL)) throw new Error("Invalid compression level: " + t.level);
					if (t.memLevel && (t.memLevel < i.Z_MIN_MEMLEVEL || t.memLevel > i.Z_MAX_MEMLEVEL)) throw new Error("Invalid memLevel: " + t.memLevel);
					if (t.strategy && t.strategy != i.Z_FILTERED && t.strategy != i.Z_HUFFMAN_ONLY && t.strategy != i.Z_RLE && t.strategy != i.Z_FIXED && t.strategy != i.Z_DEFAULT_STRATEGY) throw new Error("Invalid strategy: " + t.strategy);
					if (t.dictionary && !n.isBuffer(t.dictionary)) throw new Error("Invalid dictionary: it should be a Buffer instance");
					this._binding = new g.Zlib(e);
					var r = this;
					this._hadError = !1, this._binding.onerror = function(t, e) {
						r._binding = null, r._hadError = !0;
						var n = new Error(t);
						n.errno = e, n.code = i.codes[e], r.emit("error", n)
					};
					var o = i.Z_DEFAULT_COMPRESSION;
					"number" == typeof t.level && (o = t.level);
					var s = i.Z_DEFAULT_STRATEGY;
					"number" == typeof t.strategy && (s = t.strategy), this._binding.init(t.windowBits || i.Z_DEFAULT_WINDOWBITS, o, t.memLevel || i.Z_DEFAULT_MEMLEVEL, s, t.dictionary), this._buffer = new n(this._chunkSize), this._offset = 0, this._closed = !1, this._level = o, this._strategy = s, this.once("end", this.close)
				}
				var p = t("_stream_transform"),
					g = t("./binding"),
					v = t("util"),
					m = t("assert").ok;
				g.Z_MIN_WINDOWBITS = 8, g.Z_MAX_WINDOWBITS = 15, g.Z_DEFAULT_WINDOWBITS = 15, g.Z_MIN_CHUNK = 64, g.Z_MAX_CHUNK = 1 / 0, g.Z_DEFAULT_CHUNK = 16384, g.Z_MIN_MEMLEVEL = 1, g.Z_MAX_MEMLEVEL = 9, g.Z_DEFAULT_MEMLEVEL = 8, g.Z_MIN_LEVEL = -1, g.Z_MAX_LEVEL = 9, g.Z_DEFAULT_LEVEL = g.Z_DEFAULT_COMPRESSION, Object.keys(g).forEach(function(t) {
					t.match(/^Z/) && (i[t] = g[t])
				}), i.codes = {
					Z_OK: g.Z_OK,
					Z_STREAM_END: g.Z_STREAM_END,
					Z_NEED_DICT: g.Z_NEED_DICT,
					Z_ERRNO: g.Z_ERRNO,
					Z_STREAM_ERROR: g.Z_STREAM_ERROR,
					Z_DATA_ERROR: g.Z_DATA_ERROR,
					Z_MEM_ERROR: g.Z_MEM_ERROR,
					Z_BUF_ERROR: g.Z_BUF_ERROR,
					Z_VERSION_ERROR: g.Z_VERSION_ERROR
				}, Object.keys(i.codes).forEach(function(t) {
					i.codes[i.codes[t]] = t
				}), i.Deflate = s, i.Inflate = a, i.Gzip = c, i.Gunzip = h, i.DeflateRaw = l, i.InflateRaw = u, i.Unzip = f, i.createDeflate = function(t) {
					return new s(t)
				}, i.createInflate = function(t) {
					return new a(t)
				}, i.createDeflateRaw = function(t) {
					return new l(t)
				}, i.createInflateRaw = function(t) {
					return new u(t)
				}, i.createGzip = function(t) {
					return new c(t)
				}, i.createGunzip = function(t) {
					return new h(t)
				}, i.createUnzip = function(t) {
					return new f(t)
				}, i.deflate = function(t, e, i) {
					return "function" == typeof e && (i = e, e = {}), r(new s(e), t, i)
				}, i.deflateSync = function(t, e) {
					return o(new s(e), t)
				}, i.gzip = function(t, e, i) {
					return "function" == typeof e && (i = e, e = {}), r(new c(e), t, i)
				}, i.gzipSync = function(t, e) {
					return o(new c(e), t)
				}, i.deflateRaw = function(t, e, i) {
					return "function" == typeof e && (i = e, e = {}), r(new l(e), t, i)
				}, i.deflateRawSync = function(t, e) {
					return o(new l(e), t)
				}, i.unzip = function(t, e, i) {
					return "function" == typeof e && (i = e, e = {}), r(new f(e), t, i)
				}, i.unzipSync = function(t, e) {
					return o(new f(e), t)
				}, i.inflate = function(t, e, i) {
					return "function" == typeof e && (i = e, e = {}), r(new a(e), t, i)
				}, i.inflateSync = function(t, e) {
					return o(new a(e), t)
				}, i.gunzip = function(t, e, i) {
					return "function" == typeof e && (i = e, e = {}), r(new h(e), t, i)
				}, i.gunzipSync = function(t, e) {
					return o(new h(e), t)
				}, i.inflateRaw = function(t, e, i) {
					return "function" == typeof e && (i = e, e = {}), r(new u(e), t, i)
				}, i.inflateRawSync = function(t, e) {
					return o(new u(e), t)
				}, v.inherits(d, p), d.prototype.params = function(t, n, r) {
					if (t < i.Z_MIN_LEVEL || t > i.Z_MAX_LEVEL) throw new RangeError("Invalid compression level: " + t);
					if (n != i.Z_FILTERED && n != i.Z_HUFFMAN_ONLY && n != i.Z_RLE && n != i.Z_FIXED && n != i.Z_DEFAULT_STRATEGY) throw new TypeError("Invalid strategy: " + n);
					if (this._level !== t || this._strategy !== n) {
						var o = this;
						this.flush(g.Z_SYNC_FLUSH, function() {
							o._binding.params(t, n), o._hadError || (o._level = t, o._strategy = n, r && r())
						})
					} else e.nextTick(r)
				}, d.prototype.reset = function() {
					return this._binding.reset()
				}, d.prototype._flush = function(t) {
					this._transform(new n(0), "", t)
				}, d.prototype.flush = function(t, i) {
					var r = this._writableState;
					if (("function" == typeof t || void 0 === t && !i) && (i = t, t = g.Z_FULL_FLUSH), r.ended) i && e.nextTick(i);
					else if (r.ending) i && this.once("end", i);
					else if (r.needDrain) {
						var o = this;
						this.once("drain", function() {
							o.flush(i)
						})
					} else this._flushFlag = t, this.write(new n(0), "", i)
				}, d.prototype.close = function(t) {
					if (t && e.nextTick(t), !this._closed) {
						this._closed = !0, this._binding.close();
						var i = this;
						e.nextTick(function() {
							i.emit("close")
						})
					}
				}, d.prototype._transform = function(t, e, i) {
					var r, o = this._writableState,
						s = o.ending || o.ended,
						a = s && (!t || o.length === t.length);
					if (null === !t && !n.isBuffer(t)) return i(new Error("invalid input"));
					a ? r = g.Z_FINISH : (r = this._flushFlag, t.length >= o.length && (this._flushFlag = this._opts.flush || g.Z_NO_FLUSH));
					this._processChunk(t, r, i)
				}, d.prototype._processChunk = function(t, e, i) {
					function r(l, d) {
						if (!c._hadError) {
							var p = s - d;
							if (m(p >= 0, "have should not go down"), p > 0) {
								var g = c._buffer.slice(c._offset, c._offset + p);
								c._offset += p, h ? c.push(g) : (u.push(g), f += g.length)
							}
							if ((0 === d || c._offset >= c._chunkSize) && (s = c._chunkSize, c._offset = 0, c._buffer = new n(c._chunkSize)), 0 === d) {
								if (a += o - l, o = l, !h) return !0;
								var v = c._binding.write(e, t, a, o, c._buffer, c._offset, c._chunkSize);
								return v.callback = r, void(v.buffer = t)
							}
							return h ? void i() : !1
						}
					}
					var o = t && t.length,
						s = this._chunkSize - this._offset,
						a = 0,
						c = this,
						h = "function" == typeof i;
					if (!h) {
						var l, u = [],
							f = 0;
						this.on("error", function(t) {
							l = t
						});
						do var d = this._binding.writeSync(e, t, a, o, this._buffer, this._offset, s);
						while (!this._hadError && r(d[0], d[1]));
						if (this._hadError) throw l;
						var p = n.concat(u, f);
						return this.close(), p
					}
					var g = this._binding.write(e, t, a, o, this._buffer, this._offset, s);
					g.buffer = t, g.callback = r
				}, v.inherits(s, d), v.inherits(a, d), v.inherits(c, d), v.inherits(h, d), v.inherits(l, d), v.inherits(u, d), v.inherits(f, d)
			}).call(this, t("_process"), t("buffer").Buffer)
		}, {
			"./binding": 29,
			_process: 38,
			_stream_transform: 48,
			assert: 16,
			buffer: 31,
			util: 53
		}],
		31: [function(t, e, i) {
			function n(t, e) {
				var i = this;
				if (!(i instanceof n)) return new n(t, e);
				var r, o = typeof t;
				if ("number" === o) r = +t;
				else if ("string" === o) r = n.byteLength(t, e);
				else {
					if ("object" !== o || null === t) throw new TypeError("must start with number, buffer, array or string");
					"Buffer" === t.type && R(t.data) && (t = t.data), r = +t.length
				}
				if (r > F) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + F.toString(16) + " bytes");
				0 > r ? r = 0 : r >>>= 0, n.TYPED_ARRAY_SUPPORT ? i = n._augment(new Uint8Array(r)) : (i.length = r, i._isBuffer = !0);
				var s;
				if (n.TYPED_ARRAY_SUPPORT && "number" == typeof t.byteLength) i._set(t);
				else if (T(t)) if (n.isBuffer(t)) for (s = 0; r > s; s++) i[s] = t.readUInt8(s);
				else for (s = 0; r > s; s++) i[s] = (t[s] % 256 + 256) % 256;
				else if ("string" === o) i.write(t, 0, e);
				else if ("number" === o && !n.TYPED_ARRAY_SUPPORT) for (s = 0; r > s; s++) i[s] = 0;
				return r > 0 && r <= n.poolSize && (i.parent = B), i
			}
			function r(t, e) {
				if (!(this instanceof r)) return new r(t, e);
				var i = new n(t, e);
				return delete i.parent, i
			}
			function o(t, e, i, n) {
				i = Number(i) || 0;
				var r = t.length - i;
				n ? (n = Number(n), n > r && (n = r)) : n = r;
				var o = e.length;
				if (o % 2 !== 0) throw new Error("Invalid hex string");
				n > o / 2 && (n = o / 2);
				for (var s = 0; n > s; s++) {
					var a = parseInt(e.substr(2 * s, 2), 16);
					if (isNaN(a)) throw new Error("Invalid hex string");
					t[i + s] = a
				}
				return s
			}
			function s(t, e, i, n) {
				var r = P(O(e, t.length - i), t, i, n);
				return r
			}
			function a(t, e, i, n) {
				var r = P(j(e), t, i, n);
				return r
			}
			function c(t, e, i, n) {
				return a(t, e, i, n)
			}
			function h(t, e, i, n) {
				var r = P(I(e), t, i, n);
				return r
			}
			function l(t, e, i, n) {
				var r = P(A(e, t.length - i), t, i, n);
				return r
			}
			function u(t, e, i) {
				return 0 === e && i === t.length ? M.fromByteArray(t) : M.fromByteArray(t.slice(e, i))
			}
			function f(t, e, i) {
				var n = "",
					r = "";
				i = Math.min(t.length, i);
				for (var o = e; i > o; o++) t[o] <= 127 ? (n += L(r) + String.fromCharCode(t[o]), r = "") : r += "%" + t[o].toString(16);
				return n + L(r)
			}
			function d(t, e, i) {
				var n = "";
				i = Math.min(t.length, i);
				for (var r = e; i > r; r++) n += String.fromCharCode(127 & t[r]);
				return n
			}
			function p(t, e, i) {
				var n = "";
				i = Math.min(t.length, i);
				for (var r = e; i > r; r++) n += String.fromCharCode(t[r]);
				return n
			}
			function g(t, e, i) {
				var n = t.length;
				(!e || 0 > e) && (e = 0), (!i || 0 > i || i > n) && (i = n);
				for (var r = "", o = e; i > o; o++) r += E(t[o]);
				return r
			}
			function v(t, e, i) {
				for (var n = t.slice(e, i), r = "", o = 0; o < n.length; o += 2) r += String.fromCharCode(n[o] + 256 * n[o + 1]);
				return r
			}
			function m(t, e, i) {
				if (t % 1 !== 0 || 0 > t) throw new RangeError("offset is not uint");
				if (t + e > i) throw new RangeError("Trying to access beyond buffer length")
			}
			function b(t, e, i, r, o, s) {
				if (!n.isBuffer(t)) throw new TypeError("buffer must be a Buffer instance");
				if (e > o || s > e) throw new RangeError("value is out of bounds");
				if (i + r > t.length) throw new RangeError("index out of range")
			}
			function y(t, e, i, n) {
				0 > e && (e = 65535 + e + 1);
				for (var r = 0, o = Math.min(t.length - i, 2); o > r; r++) t[i + r] = (e & 255 << 8 * (n ? r : 1 - r)) >>> 8 * (n ? r : 1 - r)
			}
			function _(t, e, i, n) {
				0 > e && (e = 4294967295 + e + 1);
				for (var r = 0, o = Math.min(t.length - i, 4); o > r; r++) t[i + r] = e >>> 8 * (n ? r : 3 - r) & 255
			}
			function w(t, e, i, n, r, o) {
				if (e > r || o > e) throw new RangeError("value is out of bounds");
				if (i + n > t.length) throw new RangeError("index out of range");
				if (0 > i) throw new RangeError("index out of range")
			}
			function x(t, e, i, n, r) {
				return r || w(t, e, i, 4, 3.4028234663852886e38, -3.4028234663852886e38), D.write(t, e, i, n, 23, 4), i + 4
			}
			function S(t, e, i, n, r) {
				return r || w(t, e, i, 8, 1.7976931348623157e308, -1.7976931348623157e308), D.write(t, e, i, n, 52, 8), i + 8
			}
			function C(t) {
				if (t = k(t).replace(z, ""), t.length < 2) return "";
				for (; t.length % 4 !== 0;) t += "=";
				return t
			}
			function k(t) {
				return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
			}
			function T(t) {
				return R(t) || n.isBuffer(t) || t && "object" == typeof t && "number" == typeof t.length
			}
			function E(t) {
				return 16 > t ? "0" + t.toString(16) : t.toString(16)
			}
			function O(t, e) {
				e = e || 1 / 0;
				for (var i, n = t.length, r = null, o = [], s = 0; n > s; s++) {
					if (i = t.charCodeAt(s), i > 55295 && 57344 > i) {
						if (!r) {
							if (i > 56319) {
								(e -= 3) > -1 && o.push(239, 191, 189);
								continue
							}
							if (s + 1 === n) {
								(e -= 3) > -1 && o.push(239, 191, 189);
								continue
							}
							r = i;
							continue
						}
						if (56320 > i) {
							(e -= 3) > -1 && o.push(239, 191, 189), r = i;
							continue
						}
						i = r - 55296 << 10 | i - 56320 | 65536, r = null
					} else r && ((e -= 3) > -1 && o.push(239, 191, 189), r = null);
					if (128 > i) {
						if ((e -= 1) < 0) break;
						o.push(i)
					} else if (2048 > i) {
						if ((e -= 2) < 0) break;
						o.push(i >> 6 | 192, 63 & i | 128)
					} else if (65536 > i) {
						if ((e -= 3) < 0) break;
						o.push(i >> 12 | 224, i >> 6 & 63 | 128, 63 & i | 128)
					} else {
						if (!(2097152 > i)) throw new Error("Invalid code point");
						if ((e -= 4) < 0) break;
						o.push(i >> 18 | 240, i >> 12 & 63 | 128, i >> 6 & 63 | 128, 63 & i | 128)
					}
				}
				return o
			}
			function j(t) {
				for (var e = [], i = 0; i < t.length; i++) e.push(255 & t.charCodeAt(i));
				return e
			}
			function A(t, e) {
				for (var i, n, r, o = [], s = 0; s < t.length && !((e -= 2) < 0); s++) i = t.charCodeAt(s), n = i >> 8, r = i % 256, o.push(r), o.push(n);
				return o
			}
			function I(t) {
				return M.toByteArray(C(t))
			}
			function P(t, e, i, n) {
				for (var r = 0; n > r && !(r + i >= e.length || r >= t.length); r++) e[r + i] = t[r];
				return r
			}
			function L(t) {
				try {
					return decodeURIComponent(t)
				} catch (e) {
					return String.fromCharCode(65533)
				}
			}
			var M = t("base64-js"),
				D = t("ieee754"),
				R = t("is-array");
			i.Buffer = n, i.SlowBuffer = r, i.INSPECT_MAX_BYTES = 50, n.poolSize = 8192;
			var F = 1073741823,
				B = {};
			n.TYPED_ARRAY_SUPPORT = function() {
				try {
					var t = new ArrayBuffer(0),
						e = new Uint8Array(t);
					return e.foo = function() {
						return 42
					}, 42 === e.foo() && "function" == typeof e.subarray && 0 === new Uint8Array(1).subarray(1, 1).byteLength
				} catch (i) {
					return !1
				}
			}(), n.isBuffer = function(t) {
				return !(null == t || !t._isBuffer)
			}, n.compare = function(t, e) {
				if (!n.isBuffer(t) || !n.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
				if (t === e) return 0;
				for (var i = t.length, r = e.length, o = 0, s = Math.min(i, r); s > o && t[o] === e[o]; o++);
				return o !== s && (i = t[o], r = e[o]), r > i ? -1 : i > r ? 1 : 0
			}, n.isEncoding = function(t) {
				switch (String(t).toLowerCase()) {
					case "hex":
					case "utf8":
					case "utf-8":
					case "ascii":
					case "binary":
					case "base64":
					case "raw":
					case "ucs2":
					case "ucs-2":
					case "utf16le":
					case "utf-16le":
						return !0;
					default:
						return !1
				}
			}, n.concat = function(t, e) {
				if (!R(t)) throw new TypeError("list argument must be an Array of Buffers.");
				if (0 === t.length) return new n(0);
				if (1 === t.length) return t[0];
				var i;
				if (void 0 === e) for (e = 0, i = 0; i < t.length; i++) e += t[i].length;
				var r = new n(e),
					o = 0;
				for (i = 0; i < t.length; i++) {
					var s = t[i];
					s.copy(r, o), o += s.length
				}
				return r
			}, n.byteLength = function(t, e) {
				var i;
				switch (t += "", e || "utf8") {
					case "ascii":
					case "binary":
					case "raw":
						i = t.length;
						break;
					case "ucs2":
					case "ucs-2":
					case "utf16le":
					case "utf-16le":
						i = 2 * t.length;
						break;
					case "hex":
						i = t.length >>> 1;
						break;
					case "utf8":
					case "utf-8":
						i = O(t).length;
						break;
					case "base64":
						i = I(t).length;
						break;
					default:
						i = t.length
				}
				return i
			}, n.prototype.length = void 0, n.prototype.parent = void 0, n.prototype.toString = function(t, e, i) {
				var n = !1;
				if (e >>>= 0, i = void 0 === i || i === 1 / 0 ? this.length : i >>> 0, t || (t = "utf8"), 0 > e && (e = 0), i > this.length && (i = this.length), e >= i) return "";
				for (;;) switch (t) {
					case "hex":
						return g(this, e, i);
					case "utf8":
					case "utf-8":
						return f(this, e, i);
					case "ascii":
						return d(this, e, i);
					case "binary":
						return p(this, e, i);
					case "base64":
						return u(this, e, i);
					case "ucs2":
					case "ucs-2":
					case "utf16le":
					case "utf-16le":
						return v(this, e, i);
					default:
						if (n) throw new TypeError("Unknown encoding: " + t);
						t = (t + "").toLowerCase(), n = !0
				}
			}, n.prototype.equals = function(t) {
				if (!n.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
				return this === t ? !0 : 0 === n.compare(this, t)
			}, n.prototype.inspect = function() {
				var t = "",
					e = i.INSPECT_MAX_BYTES;
				return this.length > 0 && (t = this.toString("hex", 0, e).match(/.{2}/g).join(" "), this.length > e && (t += " ... ")), "<Buffer " + t + ">"
			}, n.prototype.compare = function(t) {
				if (!n.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
				return this === t ? 0 : n.compare(this, t)
			}, n.prototype.indexOf = function(t, e) {
				function i(t, e, i) {
					for (var n = -1, r = 0; i + r < t.length; r++) if (t[i + r] === e[-1 === n ? 0 : r - n]) {
						if (-1 === n && (n = r), r - n + 1 === e.length) return i + n
					} else n = -1;
					return -1
				}
				if (e > 2147483647 ? e = 2147483647 : -2147483648 > e && (e = -2147483648), e >>= 0, 0 === this.length) return -1;
				if (e >= this.length) return -1;
				if (0 > e && (e = Math.max(this.length + e, 0)), "string" == typeof t) return 0 === t.length ? -1 : String.prototype.indexOf.call(this, t, e);
				if (n.isBuffer(t)) return i(this, t, e);
				if ("number" == typeof t) return n.TYPED_ARRAY_SUPPORT && "function" === Uint8Array.prototype.indexOf ? Uint8Array.prototype.indexOf.call(this, t, e) : i(this, [t], e);
				throw new TypeError("val must be string, number or Buffer")
			}, n.prototype.get = function(t) {
				return console.log(".get() is deprecated. Access using array indexes instead."), this.readUInt8(t)
			}, n.prototype.set = function(t, e) {
				return console.log(".set() is deprecated. Access using array indexes instead."), this.writeUInt8(t, e)
			}, n.prototype.write = function(t, e, i, n) {
				if (isFinite(e)) isFinite(i) || (n = i, i = void 0);
				else {
					var r = n;
					n = e, e = i, i = r
				}
				if (e = Number(e) || 0, 0 > i || 0 > e || e > this.length) throw new RangeError("attempt to write outside buffer bounds");
				var u = this.length - e;
				i ? (i = Number(i), i > u && (i = u)) : i = u, n = String(n || "utf8").toLowerCase();
				var f;
				switch (n) {
					case "hex":
						f = o(this, t, e, i);
						break;
					case "utf8":
					case "utf-8":
						f = s(this, t, e, i);
						break;
					case "ascii":
						f = a(this, t, e, i);
						break;
					case "binary":
						f = c(this, t, e, i);
						break;
					case "base64":
						f = h(this, t, e, i);
						break;
					case "ucs2":
					case "ucs-2":
					case "utf16le":
					case "utf-16le":
						f = l(this, t, e, i);
						break;
					default:
						throw new TypeError("Unknown encoding: " + n)
				}
				return f
			}, n.prototype.toJSON = function() {
				return {
					type: "Buffer",
					data: Array.prototype.slice.call(this._arr || this, 0)
				}
			}, n.prototype.slice = function(t, e) {
				var i = this.length;
				t = ~~t, e = void 0 === e ? i : ~~e, 0 > t ? (t += i, 0 > t && (t = 0)) : t > i && (t = i), 0 > e ? (e += i, 0 > e && (e = 0)) : e > i && (e = i), t > e && (e = t);
				var r;
				if (n.TYPED_ARRAY_SUPPORT) r = n._augment(this.subarray(t, e));
				else {
					var o = e - t;
					r = new n(o, void 0);
					for (var s = 0; o > s; s++) r[s] = this[s + t]
				}
				return r.length && (r.parent = this.parent || this), r
			}, n.prototype.readUIntLE = function(t, e, i) {
				t >>>= 0, e >>>= 0, i || m(t, e, this.length);
				for (var n = this[t], r = 1, o = 0; ++o < e && (r *= 256);) n += this[t + o] * r;
				return n
			}, n.prototype.readUIntBE = function(t, e, i) {
				t >>>= 0, e >>>= 0, i || m(t, e, this.length);
				for (var n = this[t + --e], r = 1; e > 0 && (r *= 256);) n += this[t + --e] * r;
				return n
			}, n.prototype.readUInt8 = function(t, e) {
				return e || m(t, 1, this.length), this[t]
			}, n.prototype.readUInt16LE = function(t, e) {
				return e || m(t, 2, this.length), this[t] | this[t + 1] << 8
			}, n.prototype.readUInt16BE = function(t, e) {
				return e || m(t, 2, this.length), this[t] << 8 | this[t + 1]
			}, n.prototype.readUInt32LE = function(t, e) {
				return e || m(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
			}, n.prototype.readUInt32BE = function(t, e) {
				return e || m(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
			}, n.prototype.readIntLE = function(t, e, i) {
				t >>>= 0, e >>>= 0, i || m(t, e, this.length);
				for (var n = this[t], r = 1, o = 0; ++o < e && (r *= 256);) n += this[t + o] * r;
				return r *= 128, n >= r && (n -= Math.pow(2, 8 * e)), n
			}, n.prototype.readIntBE = function(t, e, i) {
				t >>>= 0, e >>>= 0, i || m(t, e, this.length);
				for (var n = e, r = 1, o = this[t + --n]; n > 0 && (r *= 256);) o += this[t + --n] * r;
				return r *= 128, o >= r && (o -= Math.pow(2, 8 * e)), o
			}, n.prototype.readInt8 = function(t, e) {
				return e || m(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
			}, n.prototype.readInt16LE = function(t, e) {
				e || m(t, 2, this.length);
				var i = this[t] | this[t + 1] << 8;
				return 32768 & i ? 4294901760 | i : i
			}, n.prototype.readInt16BE = function(t, e) {
				e || m(t, 2, this.length);
				var i = this[t + 1] | this[t] << 8;
				return 32768 & i ? 4294901760 | i : i
			}, n.prototype.readInt32LE = function(t, e) {
				return e || m(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
			}, n.prototype.readInt32BE = function(t, e) {
				return e || m(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
			}, n.prototype.readFloatLE = function(t, e) {
				return e || m(t, 4, this.length), D.read(this, t, !0, 23, 4)
			}, n.prototype.readFloatBE = function(t, e) {
				return e || m(t, 4, this.length), D.read(this, t, !1, 23, 4)
			}, n.prototype.readDoubleLE = function(t, e) {
				return e || m(t, 8, this.length), D.read(this, t, !0, 52, 8)
			}, n.prototype.readDoubleBE = function(t, e) {
				return e || m(t, 8, this.length), D.read(this, t, !1, 52, 8)
			}, n.prototype.writeUIntLE = function(t, e, i, n) {
				t = +t, e >>>= 0, i >>>= 0, n || b(this, t, e, i, Math.pow(2, 8 * i), 0);
				var r = 1,
					o = 0;
				for (this[e] = 255 & t; ++o < i && (r *= 256);) this[e + o] = t / r >>> 0 & 255;
				return e + i
			}, n.prototype.writeUIntBE = function(t, e, i, n) {
				t = +t, e >>>= 0, i >>>= 0, n || b(this, t, e, i, Math.pow(2, 8 * i), 0);
				var r = i - 1,
					o = 1;
				for (this[e + r] = 255 & t; --r >= 0 && (o *= 256);) this[e + r] = t / o >>> 0 & 255;
				return e + i
			}, n.prototype.writeUInt8 = function(t, e, i) {
				return t = +t, e >>>= 0, i || b(this, t, e, 1, 255, 0), n.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), this[e] = t, e + 1
			}, n.prototype.writeUInt16LE = function(t, e, i) {
				return t = +t, e >>>= 0, i || b(this, t, e, 2, 65535, 0), n.TYPED_ARRAY_SUPPORT ? (this[e] = t, this[e + 1] = t >>> 8) : y(this, t, e, !0), e + 2
			}, n.prototype.writeUInt16BE = function(t, e, i) {
				return t = +t, e >>>= 0, i || b(this, t, e, 2, 65535, 0), n.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = t) : y(this, t, e, !1), e + 2
			}, n.prototype.writeUInt32LE = function(t, e, i) {
				return t = +t, e >>>= 0, i || b(this, t, e, 4, 4294967295, 0), n.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = t) : _(this, t, e, !0), e + 4
			}, n.prototype.writeUInt32BE = function(t, e, i) {
				return t = +t, e >>>= 0, i || b(this, t, e, 4, 4294967295, 0), n.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = t) : _(this, t, e, !1), e + 4
			}, n.prototype.writeIntLE = function(t, e, i, n) {
				t = +t, e >>>= 0, n || b(this, t, e, i, Math.pow(2, 8 * i - 1) - 1, -Math.pow(2, 8 * i - 1));
				var r = 0,
					o = 1,
					s = 0 > t ? 1 : 0;
				for (this[e] = 255 & t; ++r < i && (o *= 256);) this[e + r] = (t / o >> 0) - s & 255;
				return e + i
			}, n.prototype.writeIntBE = function(t, e, i, n) {
				t = +t, e >>>= 0, n || b(this, t, e, i, Math.pow(2, 8 * i - 1) - 1, -Math.pow(2, 8 * i - 1));
				var r = i - 1,
					o = 1,
					s = 0 > t ? 1 : 0;
				for (this[e + r] = 255 & t; --r >= 0 && (o *= 256);) this[e + r] = (t / o >> 0) - s & 255;
				return e + i
			}, n.prototype.writeInt8 = function(t, e, i) {
				return t = +t, e >>>= 0, i || b(this, t, e, 1, 127, -128), n.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), 0 > t && (t = 255 + t + 1), this[e] = t, e + 1
			}, n.prototype.writeInt16LE = function(t, e, i) {
				return t = +t, e >>>= 0, i || b(this, t, e, 2, 32767, -32768), n.TYPED_ARRAY_SUPPORT ? (this[e] = t, this[e + 1] = t >>> 8) : y(this, t, e, !0), e + 2
			}, n.prototype.writeInt16BE = function(t, e, i) {
				return t = +t, e >>>= 0, i || b(this, t, e, 2, 32767, -32768), n.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = t) : y(this, t, e, !1), e + 2
			}, n.prototype.writeInt32LE = function(t, e, i) {
				return t = +t, e >>>= 0, i || b(this, t, e, 4, 2147483647, -2147483648), n.TYPED_ARRAY_SUPPORT ? (this[e] = t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24) : _(this, t, e, !0), e + 4
			}, n.prototype.writeInt32BE = function(t, e, i) {
				return t = +t, e >>>= 0, i || b(this, t, e, 4, 2147483647, -2147483648), 0 > t && (t = 4294967295 + t + 1), n.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = t) : _(this, t, e, !1), e + 4
			}, n.prototype.writeFloatLE = function(t, e, i) {
				return x(this, t, e, !0, i)
			}, n.prototype.writeFloatBE = function(t, e, i) {
				return x(this, t, e, !1, i)
			}, n.prototype.writeDoubleLE = function(t, e, i) {
				return S(this, t, e, !0, i)
			}, n.prototype.writeDoubleBE = function(t, e, i) {
				return S(this, t, e, !1, i)
			}, n.prototype.copy = function(t, e, i, r) {
				if (i || (i = 0), r || 0 === r || (r = this.length), e >= t.length && (e = t.length), e || (e = 0), r > 0 && i > r && (r = i), r === i) return 0;
				if (0 === t.length || 0 === this.length) return 0;
				if (0 > e) throw new RangeError("targetStart out of bounds");
				if (0 > i || i >= this.length) throw new RangeError("sourceStart out of bounds");
				if (0 > r) throw new RangeError("sourceEnd out of bounds");
				r > this.length && (r = this.length), t.length - e < r - i && (r = t.length - e + i);
				var o = r - i;
				if (1e3 > o || !n.TYPED_ARRAY_SUPPORT) for (var s = 0; o > s; s++) t[s + e] = this[s + i];
				else t._set(this.subarray(i, i + o), e);
				return o
			}, n.prototype.fill = function(t, e, i) {
				if (t || (t = 0), e || (e = 0), i || (i = this.length), e > i) throw new RangeError("end < start");
				if (i !== e && 0 !== this.length) {
					if (0 > e || e >= this.length) throw new RangeError("start out of bounds");
					if (0 > i || i > this.length) throw new RangeError("end out of bounds");
					var n;
					if ("number" == typeof t) for (n = e; i > n; n++) this[n] = t;
					else {
						var r = O(t.toString()),
							o = r.length;
						for (n = e; i > n; n++) this[n] = r[n % o]
					}
					return this
				}
			}, n.prototype.toArrayBuffer = function() {
				if ("undefined" != typeof Uint8Array) {
					if (n.TYPED_ARRAY_SUPPORT) return new n(this).buffer;
					for (var t = new Uint8Array(this.length), e = 0, i = t.length; i > e; e += 1) t[e] = this[e];
					return t.buffer
				}
				throw new TypeError("Buffer.toArrayBuffer not supported in this browser")
			};
			var U = n.prototype;
			n._augment = function(t) {
				return t.constructor = n, t._isBuffer = !0, t._set = t.set, t.get = U.get, t.set = U.set, t.write = U.write, t.toString = U.toString, t.toLocaleString = U.toString, t.toJSON = U.toJSON, t.equals = U.equals, t.compare = U.compare, t.indexOf = U.indexOf, t.copy = U.copy, t.slice = U.slice, t.readUIntLE = U.readUIntLE, t.readUIntBE = U.readUIntBE, t.readUInt8 = U.readUInt8, t.readUInt16LE = U.readUInt16LE, t.readUInt16BE = U.readUInt16BE, t.readUInt32LE = U.readUInt32LE, t.readUInt32BE = U.readUInt32BE, t.readIntLE = U.readIntLE, t.readIntBE = U.readIntBE, t.readInt8 = U.readInt8, t.readInt16LE = U.readInt16LE, t.readInt16BE = U.readInt16BE, t.readInt32LE = U.readInt32LE, t.readInt32BE = U.readInt32BE, t.readFloatLE = U.readFloatLE, t.readFloatBE = U.readFloatBE, t.readDoubleLE = U.readDoubleLE, t.readDoubleBE = U.readDoubleBE, t.writeUInt8 = U.writeUInt8, t.writeUIntLE = U.writeUIntLE, t.writeUIntBE = U.writeUIntBE, t.writeUInt16LE = U.writeUInt16LE, t.writeUInt16BE = U.writeUInt16BE, t.writeUInt32LE = U.writeUInt32LE, t.writeUInt32BE = U.writeUInt32BE, t.writeIntLE = U.writeIntLE, t.writeIntBE = U.writeIntBE, t.writeInt8 = U.writeInt8, t.writeInt16LE = U.writeInt16LE, t.writeInt16BE = U.writeInt16BE, t.writeInt32LE = U.writeInt32LE, t.writeInt32BE = U.writeInt32BE, t.writeFloatLE = U.writeFloatLE, t.writeFloatBE = U.writeFloatBE, t.writeDoubleLE = U.writeDoubleLE, t.writeDoubleBE = U.writeDoubleBE, t.fill = U.fill, t.inspect = U.inspect, t.toArrayBuffer = U.toArrayBuffer, t
			};
			var z = /[^+\/0-9A-z\-]/g
		}, {
			"base64-js": 32,
			ieee754: 33,
			"is-array": 34
		}],
		32: [function(t, e, i) {
			var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
			! function(t) {
				"use strict";

				function e(t) {
					var e = t.charCodeAt(0);
					return e === s || e === u ? 62 : e === a || e === f ? 63 : c > e ? -1 : c + 10 > e ? e - c + 26 + 26 : l + 26 > e ? e - l : h + 26 > e ? e - h + 26 : void 0
				}
				function i(t) {
					function i(t) {
						h[u++] = t
					}
					var n, r, s, a, c, h;
					if (t.length % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
					var l = t.length;
					c = "=" === t.charAt(l - 2) ? 2 : "=" === t.charAt(l - 1) ? 1 : 0, h = new o(3 * t.length / 4 - c), s = c > 0 ? t.length - 4 : t.length;
					var u = 0;
					for (n = 0, r = 0; s > n; n += 4, r += 3) a = e(t.charAt(n)) << 18 | e(t.charAt(n + 1)) << 12 | e(t.charAt(n + 2)) << 6 | e(t.charAt(n + 3)), i((16711680 & a) >> 16), i((65280 & a) >> 8), i(255 & a);
					return 2 === c ? (a = e(t.charAt(n)) << 2 | e(t.charAt(n + 1)) >> 4, i(255 & a)) : 1 === c && (a = e(t.charAt(n)) << 10 | e(t.charAt(n + 1)) << 4 | e(t.charAt(n + 2)) >> 2, i(a >> 8 & 255), i(255 & a)), h
				}
				function r(t) {
					function e(t) {
						return n.charAt(t)
					}
					function i(t) {
						return e(t >> 18 & 63) + e(t >> 12 & 63) + e(t >> 6 & 63) + e(63 & t)
					}
					var r, o, s, a = t.length % 3,
						c = "";
					for (r = 0, s = t.length - a; s > r; r += 3) o = (t[r] << 16) + (t[r + 1] << 8) + t[r + 2], c += i(o);
					switch (a) {
						case 1:
							o = t[t.length - 1], c += e(o >> 2), c += e(o << 4 & 63), c += "==";
							break;
						case 2:
							o = (t[t.length - 2] << 8) + t[t.length - 1], c += e(o >> 10), c += e(o >> 4 & 63), c += e(o << 2 & 63), c += "="
					}
					return c
				}
				var o = "undefined" != typeof Uint8Array ? Uint8Array : Array,
					s = "+".charCodeAt(0),
					a = "/".charCodeAt(0),
					c = "0".charCodeAt(0),
					h = "a".charCodeAt(0),
					l = "A".charCodeAt(0),
					u = "-".charCodeAt(0),
					f = "_".charCodeAt(0);
				t.toByteArray = i, t.fromByteArray = r
			}("undefined" == typeof i ? this.base64js = {} : i)
		}, {}],
		33: [function(t, e, i) {
			i.read = function(t, e, i, n, r) {
				var o, s, a = 8 * r - n - 1,
					c = (1 << a) - 1,
					h = c >> 1,
					l = -7,
					u = i ? r - 1 : 0,
					f = i ? -1 : 1,
					d = t[e + u];
				for (u += f, o = d & (1 << -l) - 1, d >>= -l, l += a; l > 0; o = 256 * o + t[e + u], u += f, l -= 8);
				for (s = o & (1 << -l) - 1, o >>= -l, l += n; l > 0; s = 256 * s + t[e + u], u += f, l -= 8);
				if (0 === o) o = 1 - h;
				else {
					if (o === c) return s ? NaN : (d ? -1 : 1) * (1 / 0);
					s += Math.pow(2, n), o -= h
				}
				return (d ? -1 : 1) * s * Math.pow(2, o - n)
			}, i.write = function(t, e, i, n, r, o) {
				var s, a, c, h = 8 * o - r - 1,
					l = (1 << h) - 1,
					u = l >> 1,
					f = 23 === r ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
					d = n ? 0 : o - 1,
					p = n ? 1 : -1,
					g = 0 > e || 0 === e && 0 > 1 / e ? 1 : 0;
				for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (a = isNaN(e) ? 1 : 0, s = l) : (s = Math.floor(Math.log(e) / Math.LN2), e * (c = Math.pow(2, -s)) < 1 && (s--, c *= 2), e += s + u >= 1 ? f / c : f * Math.pow(2, 1 - u), e * c >= 2 && (s++, c /= 2), s + u >= l ? (a = 0, s = l) : s + u >= 1 ? (a = (e * c - 1) * Math.pow(2, r), s += u) : (a = e * Math.pow(2, u - 1) * Math.pow(2, r), s = 0)); r >= 8; t[i + d] = 255 & a, d += p, a /= 256, r -= 8);
				for (s = s << r | a, h += r; h > 0; t[i + d] = 255 & s, d += p, s /= 256, h -= 8);
				t[i + d - p] |= 128 * g
			}
		}, {}],
		34: [function(t, e, i) {
			var n = Array.isArray,
				r = Object.prototype.toString;
			e.exports = n || function(t) {
				return !!t && "[object Array]" == r.call(t)
			}
		}, {}],
		35: [function(t, e, i) {
			function n() {
				this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
			}
			function r(t) {
				return "function" == typeof t
			}
			function o(t) {
				return "number" == typeof t
			}
			function s(t) {
				return "object" == typeof t && null !== t
			}
			function a(t) {
				return void 0 === t
			}
			e.exports = n, n.EventEmitter = n, n.prototype._events = void 0, n.prototype._maxListeners = void 0, n.defaultMaxListeners = 10, n.prototype.setMaxListeners = function(t) {
				if (!o(t) || 0 > t || isNaN(t)) throw TypeError("n must be a positive number");
				return this._maxListeners = t, this
			}, n.prototype.emit = function(t) {
				var e, i, n, o, c, h;
				if (this._events || (this._events = {}), "error" === t && (!this._events.error || s(this._events.error) && !this._events.error.length)) {
					if (e = arguments[1], e instanceof Error) throw e;
					throw TypeError('Uncaught, unspecified "error" event.')
				}
				if (i = this._events[t], a(i)) return !1;
				if (r(i)) switch (arguments.length) {
					case 1:
						i.call(this);
						break;
					case 2:
						i.call(this, arguments[1]);
						break;
					case 3:
						i.call(this, arguments[1], arguments[2]);
						break;
					default:
						for (n = arguments.length, o = new Array(n - 1), c = 1; n > c; c++) o[c - 1] = arguments[c];
						i.apply(this, o)
				} else if (s(i)) {
					for (n = arguments.length, o = new Array(n - 1), c = 1; n > c; c++) o[c - 1] = arguments[c];
					for (h = i.slice(), n = h.length, c = 0; n > c; c++) h[c].apply(this, o)
				}
				return !0
			}, n.prototype.addListener = function(t, e) {
				var i;
				if (!r(e)) throw TypeError("listener must be a function");
				if (this._events || (this._events = {}), this._events.newListener && this.emit("newListener", t, r(e.listener) ? e.listener : e), this._events[t] ? s(this._events[t]) ? this._events[t].push(e) : this._events[t] = [this._events[t], e] : this._events[t] = e, s(this._events[t]) && !this._events[t].warned) {
					var i;
					i = a(this._maxListeners) ? n.defaultMaxListeners : this._maxListeners, i && i > 0 && this._events[t].length > i && (this._events[t].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[t].length), "function" == typeof console.trace && console.trace())
				}
				return this
			}, n.prototype.on = n.prototype.addListener, n.prototype.once = function(t, e) {
				function i() {
					this.removeListener(t, i), n || (n = !0, e.apply(this, arguments))
				}
				if (!r(e)) throw TypeError("listener must be a function");
				var n = !1;
				return i.listener = e, this.on(t, i), this
			}, n.prototype.removeListener = function(t, e) {
				var i, n, o, a;
				if (!r(e)) throw TypeError("listener must be a function");
				if (!this._events || !this._events[t]) return this;
				if (i = this._events[t], o = i.length, n = -1, i === e || r(i.listener) && i.listener === e) delete this._events[t], this._events.removeListener && this.emit("removeListener", t, e);
				else if (s(i)) {
					for (a = o; a-- > 0;) if (i[a] === e || i[a].listener && i[a].listener === e) {
						n = a;
						break
					}
					if (0 > n) return this;
					1 === i.length ? (i.length = 0, delete this._events[t]) : i.splice(n, 1), this._events.removeListener && this.emit("removeListener", t, e)
				}
				return this
			}, n.prototype.removeAllListeners = function(t) {
				var e, i;
				if (!this._events) return this;
				if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[t] && delete this._events[t], this;
				if (0 === arguments.length) {
					for (e in this._events) "removeListener" !== e && this.removeAllListeners(e);
					return this.removeAllListeners("removeListener"), this._events = {}, this
				}
				if (i = this._events[t], r(i)) this.removeListener(t, i);
				else for (; i.length;) this.removeListener(t, i[i.length - 1]);
				return delete this._events[t], this
			}, n.prototype.listeners = function(t) {
				var e;
				return e = this._events && this._events[t] ? r(this._events[t]) ? [this._events[t]] : this._events[t].slice() : []
			}, n.listenerCount = function(t, e) {
				var i;
				return i = t._events && t._events[e] ? r(t._events[e]) ? 1 : t._events[e].length : 0
			}
		}, {}],
		36: [function(t, e, i) {
			"function" == typeof Object.create ? e.exports = function(t, e) {
				t.super_ = e, t.prototype = Object.create(e.prototype, {
					constructor: {
						value: t,
						enumerable: !1,
						writable: !0,
						configurable: !0
					}
				})
			} : e.exports = function(t, e) {
				t.super_ = e;
				var i = function() {};
				i.prototype = e.prototype, t.prototype = new i, t.prototype.constructor = t
			}
		}, {}],
		37: [function(t, e, i) {
			e.exports = Array.isArray || function(t) {
				return "[object Array]" == Object.prototype.toString.call(t)
			}
		}, {}],
		38: [function(t, e, i) {
			function n() {
				if (!a) {
					a = !0;
					for (var t, e = s.length; e;) {
						t = s, s = [];
						for (var i = -1; ++i < e;) t[i]();
						e = s.length
					}
					a = !1
				}
			}
			function r() {}
			var o = e.exports = {}, s = [],
				a = !1;
			o.nextTick = function(t) {
				s.push(t), a || setTimeout(n, 0)
			}, o.title = "browser", o.browser = !0, o.env = {}, o.argv = [], o.version = "", o.versions = {}, o.on = r, o.addListener = r, o.once = r, o.off = r, o.removeListener = r, o.removeAllListeners = r, o.emit = r, o.binding = function(t) {
				throw new Error("process.binding is not supported")
			}, o.cwd = function() {
				return "/"
			}, o.chdir = function(t) {
				throw new Error("process.chdir is not supported")
			}, o.umask = function() {
				return 0
			}
		}, {}],
		39: [function(t, e, i) {
			e.exports = t("./lib/_stream_duplex.js")
		}, {
			"./lib/_stream_duplex.js": 40
		}],
		40: [function(t, e, i) {
			(function(i) {
				function n(t) {
					return this instanceof n ? (c.call(this, t), h.call(this, t), t && t.readable === !1 && (this.readable = !1), t && t.writable === !1 && (this.writable = !1), this.allowHalfOpen = !0, t && t.allowHalfOpen === !1 && (this.allowHalfOpen = !1), void this.once("end", r)) : new n(t)
				}
				function r() {
					this.allowHalfOpen || this._writableState.ended || i.nextTick(this.end.bind(this))
				}
				function o(t, e) {
					for (var i = 0, n = t.length; n > i; i++) e(t[i], i)
				}
				e.exports = n;
				var s = Object.keys || function(t) {
						var e = [];
						for (var i in t) e.push(i);
						return e
					}, a = t("core-util-is");
				a.inherits = t("inherits");
				var c = t("./_stream_readable"),
					h = t("./_stream_writable");
				a.inherits(n, c), o(s(h.prototype), function(t) {
					n.prototype[t] || (n.prototype[t] = h.prototype[t])
				})
			}).call(this, t("_process"))
		}, {
			"./_stream_readable": 42,
			"./_stream_writable": 44,
			_process: 38,
			"core-util-is": 45,
			inherits: 36
		}],
		41: [function(t, e, i) {
			function n(t) {
				return this instanceof n ? void r.call(this, t) : new n(t)
			}
			e.exports = n;
			var r = t("./_stream_transform"),
				o = t("core-util-is");
			o.inherits = t("inherits"), o.inherits(n, r), n.prototype._transform = function(t, e, i) {
				i(null, t)
			}
		}, {
			"./_stream_transform": 43,
			"core-util-is": 45,
			inherits: 36
		}],
		42: [function(t, e, i) {
			(function(i) {
				function n(e, i) {
					var n = t("./_stream_duplex");
					e = e || {};
					var r = e.highWaterMark,
						o = e.objectMode ? 16 : 16384;
					this.highWaterMark = r || 0 === r ? r : o, this.highWaterMark = ~~this.highWaterMark, this.buffer = [], this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.objectMode = !! e.objectMode, i instanceof n && (this.objectMode = this.objectMode || !! e.readableObjectMode), this.defaultEncoding = e.defaultEncoding || "utf8", this.ranOut = !1, this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, e.encoding && (O || (O = t("string_decoder/").StringDecoder), this.decoder = new O(e.encoding), this.encoding = e.encoding)
				}
				function r(e) {
					t("./_stream_duplex");
					return this instanceof r ? (this._readableState = new n(e, this), this.readable = !0, void T.call(this)) : new r(e)
				}
				function o(t, e, i, n, r) {
					var o = h(e, i);
					if (o) t.emit("error", o);
					else if (E.isNullOrUndefined(i)) e.reading = !1, e.ended || l(t, e);
					else if (e.objectMode || i && i.length > 0) if (e.ended && !r) {
						var a = new Error("stream.push() after EOF");
						t.emit("error", a)
					} else if (e.endEmitted && r) {
						var a = new Error("stream.unshift() after end event");
						t.emit("error", a)
					} else !e.decoder || r || n || (i = e.decoder.write(i)), r || (e.reading = !1), e.flowing && 0 === e.length && !e.sync ? (t.emit("data", i), t.read(0)) : (e.length += e.objectMode ? 1 : i.length, r ? e.buffer.unshift(i) : e.buffer.push(i), e.needReadable && u(t)), d(t, e);
					else r || (e.reading = !1);
					return s(e)
				}
				function s(t) {
					return !t.ended && (t.needReadable || t.length < t.highWaterMark || 0 === t.length)
				}
				function a(t) {
					if (t >= A) t = A;
					else {
						t--;
						for (var e = 1; 32 > e; e <<= 1) t |= t >> e;
						t++
					}
					return t
				}
				function c(t, e) {
					return 0 === e.length && e.ended ? 0 : e.objectMode ? 0 === t ? 0 : 1 : isNaN(t) || E.isNull(t) ? e.flowing && e.buffer.length ? e.buffer[0].length : e.length : 0 >= t ? 0 : (t > e.highWaterMark && (e.highWaterMark = a(t)), t > e.length ? e.ended ? e.length : (e.needReadable = !0, 0) : t)
				}
				function h(t, e) {
					var i = null;
					return E.isBuffer(e) || E.isString(e) || E.isNullOrUndefined(e) || t.objectMode || (i = new TypeError("Invalid non-string/buffer chunk")), i
				}
				function l(t, e) {
					if (e.decoder && !e.ended) {
						var i = e.decoder.end();
						i && i.length && (e.buffer.push(i), e.length += e.objectMode ? 1 : i.length)
					}
					e.ended = !0, u(t)
				}
				function u(t) {
					var e = t._readableState;
					e.needReadable = !1, e.emittedReadable || (j("emitReadable", e.flowing), e.emittedReadable = !0, e.sync ? i.nextTick(function() {
						f(t)
					}) : f(t))
				}
				function f(t) {
					j("emit readable"), t.emit("readable"), b(t)
				}
				function d(t, e) {
					e.readingMore || (e.readingMore = !0, i.nextTick(function() {
						p(t, e)
					}))
				}
				function p(t, e) {
					for (var i = e.length; !e.reading && !e.flowing && !e.ended && e.length < e.highWaterMark && (j("maybeReadMore read 0"), t.read(0), i !== e.length);) i = e.length;
					e.readingMore = !1
				}
				function g(t) {
					return function() {
						var e = t._readableState;
						j("pipeOnDrain", e.awaitDrain), e.awaitDrain && e.awaitDrain--, 0 === e.awaitDrain && k.listenerCount(t, "data") && (e.flowing = !0, b(t))
					}
				}
				function v(t, e) {
					e.resumeScheduled || (e.resumeScheduled = !0, i.nextTick(function() {
						m(t, e)
					}))
				}
				function m(t, e) {
					e.resumeScheduled = !1, t.emit("resume"), b(t), e.flowing && !e.reading && t.read(0)
				}
				function b(t) {
					var e = t._readableState;
					if (j("flow", e.flowing), e.flowing) do var i = t.read();
					while (null !== i && e.flowing)
				}
				function y(t, e) {
					var i, n = e.buffer,
						r = e.length,
						o = !! e.decoder,
						s = !! e.objectMode;
					if (0 === n.length) return null;
					if (0 === r) i = null;
					else if (s) i = n.shift();
					else if (!t || t >= r) i = o ? n.join("") : C.concat(n, r), n.length = 0;
					else if (t < n[0].length) {
						var a = n[0];
						i = a.slice(0, t), n[0] = a.slice(t)
					} else if (t === n[0].length) i = n.shift();
					else {
						i = o ? "" : new C(t);
						for (var c = 0, h = 0, l = n.length; l > h && t > c; h++) {
							var a = n[0],
								u = Math.min(t - c, a.length);
							o ? i += a.slice(0, u) : a.copy(i, c, 0, u), u < a.length ? n[0] = a.slice(u) : n.shift(), c += u
						}
					}
					return i
				}
				function _(t) {
					var e = t._readableState;
					if (e.length > 0) throw new Error("endReadable called on non-empty stream");
					e.endEmitted || (e.ended = !0, i.nextTick(function() {
						e.endEmitted || 0 !== e.length || (e.endEmitted = !0, t.readable = !1, t.emit("end"))
					}))
				}
				function w(t, e) {
					for (var i = 0, n = t.length; n > i; i++) e(t[i], i)
				}
				function x(t, e) {
					for (var i = 0, n = t.length; n > i; i++) if (t[i] === e) return i;
					return -1
				}
				e.exports = r;
				var S = t("isarray"),
					C = t("buffer").Buffer;
				r.ReadableState = n;
				var k = t("events").EventEmitter;
				k.listenerCount || (k.listenerCount = function(t, e) {
					return t.listeners(e).length
				});
				var T = t("stream"),
					E = t("core-util-is");
				E.inherits = t("inherits");
				var O, j = t("util");
				j = j && j.debuglog ? j.debuglog("stream") : function() {}, E.inherits(r, T), r.prototype.push = function(t, e) {
					var i = this._readableState;
					return E.isString(t) && !i.objectMode && (e = e || i.defaultEncoding, e !== i.encoding && (t = new C(t, e), e = "")), o(this, i, t, e, !1)
				}, r.prototype.unshift = function(t) {
					var e = this._readableState;
					return o(this, e, t, "", !0)
				}, r.prototype.setEncoding = function(e) {
					return O || (O = t("string_decoder/").StringDecoder), this._readableState.decoder = new O(e), this._readableState.encoding = e, this
				};
				var A = 8388608;
				r.prototype.read = function(t) {
					j("read", t);
					var e = this._readableState,
						i = t;
					if ((!E.isNumber(t) || t > 0) && (e.emittedReadable = !1), 0 === t && e.needReadable && (e.length >= e.highWaterMark || e.ended)) return j("read: emitReadable", e.length, e.ended), 0 === e.length && e.ended ? _(this) : u(this), null;
					if (t = c(t, e), 0 === t && e.ended) return 0 === e.length && _(this), null;
					var n = e.needReadable;
					j("need readable", n), (0 === e.length || e.length - t < e.highWaterMark) && (n = !0, j("length less than watermark", n)), (e.ended || e.reading) && (n = !1, j("reading or ended", n)), n && (j("do read"), e.reading = !0, e.sync = !0, 0 === e.length && (e.needReadable = !0), this._read(e.highWaterMark), e.sync = !1), n && !e.reading && (t = c(i, e));
					var r;
					return r = t > 0 ? y(t, e) : null, E.isNull(r) && (e.needReadable = !0, t = 0), e.length -= t, 0 !== e.length || e.ended || (e.needReadable = !0), i !== t && e.ended && 0 === e.length && _(this), E.isNull(r) || this.emit("data", r), r
				}, r.prototype._read = function(t) {
					this.emit("error", new Error("not implemented"))
				}, r.prototype.pipe = function(t, e) {
					function n(t) {
						j("onunpipe"), t === u && o()
					}
					function r() {
						j("onend"), t.end()
					}
					function o() {
						j("cleanup"), t.removeListener("close", c), t.removeListener("finish", h), t.removeListener("drain", v), t.removeListener("error", a), t.removeListener("unpipe", n), u.removeListener("end", r), u.removeListener("end", o), u.removeListener("data", s), !f.awaitDrain || t._writableState && !t._writableState.needDrain || v()
					}
					function s(e) {
						j("ondata");
						var i = t.write(e);
						!1 === i && (j("false write response, pause", u._readableState.awaitDrain), u._readableState.awaitDrain++, u.pause())
					}
					function a(e) {
						j("onerror", e), l(), t.removeListener("error", a), 0 === k.listenerCount(t, "error") && t.emit("error", e)
					}
					function c() {
						t.removeListener("finish", h), l()
					}
					function h() {
						j("onfinish"), t.removeListener("close", c), l()
					}
					function l() {
						j("unpipe"), u.unpipe(t)
					}
					var u = this,
						f = this._readableState;
					switch (f.pipesCount) {
						case 0:
							f.pipes = t;
							break;
						case 1:
							f.pipes = [f.pipes, t];
							break;
						default:
							f.pipes.push(t)
					}
					f.pipesCount += 1, j("pipe count=%d opts=%j", f.pipesCount, e);
					var d = (!e || e.end !== !1) && t !== i.stdout && t !== i.stderr,
						p = d ? r : o;
					f.endEmitted ? i.nextTick(p) : u.once("end", p), t.on("unpipe", n);
					var v = g(u);
					return t.on("drain", v), u.on("data", s), t._events && t._events.error ? S(t._events.error) ? t._events.error.unshift(a) : t._events.error = [a, t._events.error] : t.on("error", a), t.once("close", c), t.once("finish", h), t.emit("pipe", u), f.flowing || (j("pipe resume"), u.resume()), t
				}, r.prototype.unpipe = function(t) {
					var e = this._readableState;
					if (0 === e.pipesCount) return this;
					if (1 === e.pipesCount) return t && t !== e.pipes ? this : (t || (t = e.pipes), e.pipes = null, e.pipesCount = 0, e.flowing = !1, t && t.emit("unpipe", this), this);
					if (!t) {
						var i = e.pipes,
							n = e.pipesCount;
						e.pipes = null, e.pipesCount = 0, e.flowing = !1;
						for (var r = 0; n > r; r++) i[r].emit("unpipe", this);
						return this
					}
					var r = x(e.pipes, t);
					return -1 === r ? this : (e.pipes.splice(r, 1), e.pipesCount -= 1, 1 === e.pipesCount && (e.pipes = e.pipes[0]), t.emit("unpipe", this), this)
				}, r.prototype.on = function(t, e) {
					var n = T.prototype.on.call(this, t, e);
					if ("data" === t && !1 !== this._readableState.flowing && this.resume(), "readable" === t && this.readable) {
						var r = this._readableState;
						if (!r.readableListening) if (r.readableListening = !0, r.emittedReadable = !1, r.needReadable = !0, r.reading) r.length && u(this, r);
						else {
							var o = this;
							i.nextTick(function() {
								j("readable nexttick read 0"), o.read(0)
							})
						}
					}
					return n
				}, r.prototype.addListener = r.prototype.on, r.prototype.resume = function() {
					var t = this._readableState;
					return t.flowing || (j("resume"), t.flowing = !0, t.reading || (j("resume read 0"), this.read(0)), v(this, t)), this
				}, r.prototype.pause = function() {
					return j("call pause flowing=%j", this._readableState.flowing), !1 !== this._readableState.flowing && (j("pause"), this._readableState.flowing = !1, this.emit("pause")), this
				}, r.prototype.wrap = function(t) {
					var e = this._readableState,
						i = !1,
						n = this;
					t.on("end", function() {
						if (j("wrapped end"), e.decoder && !e.ended) {
							var t = e.decoder.end();
							t && t.length && n.push(t)
						}
						n.push(null)
					}), t.on("data", function(r) {
						if (j("wrapped data"), e.decoder && (r = e.decoder.write(r)), r && (e.objectMode || r.length)) {
							var o = n.push(r);
							o || (i = !0, t.pause())
						}
					});
					for (var r in t) E.isFunction(t[r]) && E.isUndefined(this[r]) && (this[r] = function(e) {
						return function() {
							return t[e].apply(t, arguments)
						}
					}(r));
					var o = ["error", "close", "destroy", "pause", "resume"];
					return w(o, function(e) {
						t.on(e, n.emit.bind(n, e))
					}), n._read = function(e) {
						j("wrapped _read", e), i && (i = !1, t.resume())
					}, n
				}, r._fromList = y
			}).call(this, t("_process"))
		}, {
			"./_stream_duplex": 40,
			_process: 38,
			buffer: 31,
			"core-util-is": 45,
			events: 35,
			inherits: 36,
			isarray: 37,
			stream: 50,
			"string_decoder/": 51,
			util: 17
		}],
		43: [function(t, e, i) {
			function n(t, e) {
				this.afterTransform = function(t, i) {
					return r(e, t, i)
				}, this.needTransform = !1, this.transforming = !1, this.writecb = null, this.writechunk = null
			}
			function r(t, e, i) {
				var n = t._transformState;
				n.transforming = !1;
				var r = n.writecb;
				if (!r) return t.emit("error", new Error("no writecb in Transform class"));
				n.writechunk = null, n.writecb = null, c.isNullOrUndefined(i) || t.push(i), r && r(e);
				var o = t._readableState;
				o.reading = !1, (o.needReadable || o.length < o.highWaterMark) && t._read(o.highWaterMark)
			}
			function o(t) {
				if (!(this instanceof o)) return new o(t);
				a.call(this, t), this._transformState = new n(t, this);
				var e = this;
				this._readableState.needReadable = !0, this._readableState.sync = !1, this.once("prefinish", function() {
					c.isFunction(this._flush) ? this._flush(function(t) {
						s(e, t)
					}) : s(e)
				})
			}
			function s(t, e) {
				if (e) return t.emit("error", e);
				var i = t._writableState,
					n = t._transformState;
				if (i.length) throw new Error("calling transform done when ws.length != 0");
				if (n.transforming) throw new Error("calling transform done when still transforming");
				return t.push(null)
			}
			e.exports = o;
			var a = t("./_stream_duplex"),
				c = t("core-util-is");
			c.inherits = t("inherits"), c.inherits(o, a), o.prototype.push = function(t, e) {
				return this._transformState.needTransform = !1, a.prototype.push.call(this, t, e)
			}, o.prototype._transform = function(t, e, i) {
				throw new Error("not implemented")
			}, o.prototype._write = function(t, e, i) {
				var n = this._transformState;
				if (n.writecb = i, n.writechunk = t, n.writeencoding = e, !n.transforming) {
					var r = this._readableState;
					(n.needTransform || r.needReadable || r.length < r.highWaterMark) && this._read(r.highWaterMark)
				}
			}, o.prototype._read = function(t) {
				var e = this._transformState;
				c.isNull(e.writechunk) || !e.writecb || e.transforming ? e.needTransform = !0 : (e.transforming = !0, this._transform(e.writechunk, e.writeencoding, e.afterTransform))
			}
		}, {
			"./_stream_duplex": 40,
			"core-util-is": 45,
			inherits: 36
		}],
		44: [function(t, e, i) {
			(function(i) {
				function n(t, e, i) {
					this.chunk = t, this.encoding = e, this.callback = i
				}
				function r(e, i) {
					var n = t("./_stream_duplex");
					e = e || {};
					var r = e.highWaterMark,
						o = e.objectMode ? 16 : 16384;
					this.highWaterMark = r || 0 === r ? r : o, this.objectMode = !! e.objectMode, i instanceof n && (this.objectMode = this.objectMode || !! e.writableObjectMode), this.highWaterMark = ~~this.highWaterMark, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1;
					var s = e.decodeStrings === !1;
					this.decodeStrings = !s, this.defaultEncoding = e.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(t) {
						d(i, t)
					}, this.writecb = null, this.writelen = 0, this.buffer = [], this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1
				}
				function o(e) {
					var i = t("./_stream_duplex");
					return this instanceof o || this instanceof i ? (this._writableState = new r(e, this), this.writable = !0, void S.call(this)) : new o(e)
				}
				function s(t, e, n) {
					var r = new Error("write after end");
					t.emit("error", r), i.nextTick(function() {
						n(r)
					})
				}
				function a(t, e, n, r) {
					var o = !0;
					if (!(x.isBuffer(n) || x.isString(n) || x.isNullOrUndefined(n) || e.objectMode)) {
						var s = new TypeError("Invalid non-string/buffer chunk");
						t.emit("error", s), i.nextTick(function() {
							r(s)
						}), o = !1
					}
					return o
				}
				function c(t, e, i) {
					return !t.objectMode && t.decodeStrings !== !1 && x.isString(e) && (e = new w(e, i)), e
				}
				function h(t, e, i, r, o) {
					i = c(e, i, r), x.isBuffer(i) && (r = "buffer");
					var s = e.objectMode ? 1 : i.length;
					e.length += s;
					var a = e.length < e.highWaterMark;
					return a || (e.needDrain = !0), e.writing || e.corked ? e.buffer.push(new n(i, r, o)) : l(t, e, !1, s, i, r, o), a
				}
				function l(t, e, i, n, r, o, s) {
					e.writelen = n, e.writecb = s, e.writing = !0, e.sync = !0, i ? t._writev(r, e.onwrite) : t._write(r, o, e.onwrite), e.sync = !1
				}
				function u(t, e, n, r, o) {
					n ? i.nextTick(function() {
						e.pendingcb--, o(r)
					}) : (e.pendingcb--, o(r)), t._writableState.errorEmitted = !0, t.emit("error", r)
				}
				function f(t) {
					t.writing = !1, t.writecb = null, t.length -= t.writelen, t.writelen = 0
				}
				function d(t, e) {
					var n = t._writableState,
						r = n.sync,
						o = n.writecb;
					if (f(n), e) u(t, n, r, e, o);
					else {
						var s = m(t, n);
						s || n.corked || n.bufferProcessing || !n.buffer.length || v(t, n), r ? i.nextTick(function() {
							p(t, n, s, o)
						}) : p(t, n, s, o)
					}
				}
				function p(t, e, i, n) {
					i || g(t, e), e.pendingcb--, n(), y(t, e)
				}
				function g(t, e) {
					0 === e.length && e.needDrain && (e.needDrain = !1, t.emit("drain"))
				}
				function v(t, e) {
					if (e.bufferProcessing = !0, t._writev && e.buffer.length > 1) {
						for (var i = [], n = 0; n < e.buffer.length; n++) i.push(e.buffer[n].callback);
						e.pendingcb++, l(t, e, !0, e.length, e.buffer, "", function(t) {
							for (var n = 0; n < i.length; n++) e.pendingcb--, i[n](t)
						}), e.buffer = []
					} else {
						for (var n = 0; n < e.buffer.length; n++) {
							var r = e.buffer[n],
								o = r.chunk,
								s = r.encoding,
								a = r.callback,
								c = e.objectMode ? 1 : o.length;
							if (l(t, e, !1, c, o, s, a), e.writing) {
								n++;
								break
							}
						}
						n < e.buffer.length ? e.buffer = e.buffer.slice(n) : e.buffer.length = 0
					}
					e.bufferProcessing = !1
				}
				function m(t, e) {
					return e.ending && 0 === e.length && !e.finished && !e.writing
				}
				function b(t, e) {
					e.prefinished || (e.prefinished = !0, t.emit("prefinish"))
				}
				function y(t, e) {
					var i = m(t, e);
					return i && (0 === e.pendingcb ? (b(t, e), e.finished = !0, t.emit("finish")) : b(t, e)), i
				}
				function _(t, e, n) {
					e.ending = !0, y(t, e), n && (e.finished ? i.nextTick(n) : t.once("finish", n)), e.ended = !0
				}
				e.exports = o;
				var w = t("buffer").Buffer;
				o.WritableState = r;
				var x = t("core-util-is");
				x.inherits = t("inherits");
				var S = t("stream");
				x.inherits(o, S), o.prototype.pipe = function() {
					this.emit("error", new Error("Cannot pipe. Not readable."))
				}, o.prototype.write = function(t, e, i) {
					var n = this._writableState,
						r = !1;
					return x.isFunction(e) && (i = e, e = null), x.isBuffer(t) ? e = "buffer" : e || (e = n.defaultEncoding), x.isFunction(i) || (i = function() {}), n.ended ? s(this, n, i) : a(this, n, t, i) && (n.pendingcb++, r = h(this, n, t, e, i)), r
				}, o.prototype.cork = function() {
					var t = this._writableState;
					t.corked++
				}, o.prototype.uncork = function() {
					var t = this._writableState;
					t.corked && (t.corked--, t.writing || t.corked || t.finished || t.bufferProcessing || !t.buffer.length || v(this, t))
				}, o.prototype._write = function(t, e, i) {
					i(new Error("not implemented"))
				}, o.prototype._writev = null, o.prototype.end = function(t, e, i) {
					var n = this._writableState;
					x.isFunction(t) ? (i = t, t = null, e = null) : x.isFunction(e) && (i = e, e = null), x.isNullOrUndefined(t) || this.write(t, e), n.corked && (n.corked = 1, this.uncork()), n.ending || n.finished || _(this, n, i)
				}
			}).call(this, t("_process"))
		}, {
			"./_stream_duplex": 40,
			_process: 38,
			buffer: 31,
			"core-util-is": 45,
			inherits: 36,
			stream: 50
		}],
		45: [function(t, e, i) {
			(function(t) {
				function e(t) {
					return Array.isArray(t)
				}
				function n(t) {
					return "boolean" == typeof t
				}
				function r(t) {
					return null === t
				}
				function o(t) {
					return null == t
				}
				function s(t) {
					return "number" == typeof t
				}
				function a(t) {
					return "string" == typeof t
				}
				function c(t) {
					return "symbol" == typeof t
				}
				function h(t) {
					return void 0 === t
				}
				function l(t) {
					return u(t) && "[object RegExp]" === m(t)
				}
				function u(t) {
					return "object" == typeof t && null !== t
				}
				function f(t) {
					return u(t) && "[object Date]" === m(t)
				}
				function d(t) {
					return u(t) && ("[object Error]" === m(t) || t instanceof Error)
				}
				function p(t) {
					return "function" == typeof t
				}
				function g(t) {
					return null === t || "boolean" == typeof t || "number" == typeof t || "string" == typeof t || "symbol" == typeof t || "undefined" == typeof t
				}
				function v(e) {
					return t.isBuffer(e)
				}
				function m(t) {
					return Object.prototype.toString.call(t)
				}
				i.isArray = e, i.isBoolean = n, i.isNull = r, i.isNullOrUndefined = o, i.isNumber = s, i.isString = a, i.isSymbol = c, i.isUndefined = h, i.isRegExp = l, i.isObject = u, i.isDate = f, i.isError = d, i.isFunction = p, i.isPrimitive = g, i.isBuffer = v
			}).call(this, t("buffer").Buffer)
		}, {
			buffer: 31
		}],
		46: [function(t, e, i) {
			e.exports = t("./lib/_stream_passthrough.js")
		}, {
			"./lib/_stream_passthrough.js": 41
		}],
		47: [function(t, e, i) {
			i = e.exports = t("./lib/_stream_readable.js"), i.Stream = t("stream"), i.Readable = i, i.Writable = t("./lib/_stream_writable.js"), i.Duplex = t("./lib/_stream_duplex.js"), i.Transform = t("./lib/_stream_transform.js"), i.PassThrough = t("./lib/_stream_passthrough.js")
		}, {
			"./lib/_stream_duplex.js": 40,
			"./lib/_stream_passthrough.js": 41,
			"./lib/_stream_readable.js": 42,
			"./lib/_stream_transform.js": 43,
			"./lib/_stream_writable.js": 44,
			stream: 50
		}],
		48: [function(t, e, i) {
			e.exports = t("./lib/_stream_transform.js")
		}, {
			"./lib/_stream_transform.js": 43
		}],
		49: [function(t, e, i) {
			e.exports = t("./lib/_stream_writable.js")
		}, {
			"./lib/_stream_writable.js": 44
		}],
		50: [function(t, e, i) {
			function n() {
				r.call(this)
			}
			e.exports = n;
			var r = t("events").EventEmitter,
				o = t("inherits");
			o(n, r), n.Readable = t("readable-stream/readable.js"), n.Writable = t("readable-stream/writable.js"), n.Duplex = t("readable-stream/duplex.js"), n.Transform = t("readable-stream/transform.js"), n.PassThrough = t("readable-stream/passthrough.js"), n.Stream = n, n.prototype.pipe = function(t, e) {
				function i(e) {
					t.writable && !1 === t.write(e) && h.pause && h.pause()
				}
				function n() {
					h.readable && h.resume && h.resume()
				}
				function o() {
					l || (l = !0, t.end())
				}
				function s() {
					l || (l = !0, "function" == typeof t.destroy && t.destroy())
				}
				function a(t) {
					if (c(), 0 === r.listenerCount(this, "error")) throw t
				}
				function c() {
					h.removeListener("data", i), t.removeListener("drain", n), h.removeListener("end", o), h.removeListener("close", s), h.removeListener("error", a), t.removeListener("error", a), h.removeListener("end", c), h.removeListener("close", c), t.removeListener("close", c)
				}
				var h = this;
				h.on("data", i), t.on("drain", n), t._isStdio || e && e.end === !1 || (h.on("end", o), h.on("close", s));
				var l = !1;
				return h.on("error", a), t.on("error", a), h.on("end", c), h.on("close", c), t.on("close", c), t.emit("pipe", h), t
			}
		}, {
			events: 35,
			inherits: 36,
			"readable-stream/duplex.js": 39,
			"readable-stream/passthrough.js": 46,
			"readable-stream/readable.js": 47,
			"readable-stream/transform.js": 48,
			"readable-stream/writable.js": 49
		}],
		51: [function(t, e, i) {
			function n(t) {
				if (t && !c(t)) throw new Error("Unknown encoding: " + t)
			}
			function r(t) {
				return t.toString(this.encoding)
			}
			function o(t) {
				this.charReceived = t.length % 2, this.charLength = this.charReceived ? 2 : 0
			}
			function s(t) {
				this.charReceived = t.length % 3, this.charLength = this.charReceived ? 3 : 0
			}
			var a = t("buffer").Buffer,
				c = a.isEncoding || function(t) {
					switch (t && t.toLowerCase()) {
						case "hex":
						case "utf8":
						case "utf-8":
						case "ascii":
						case "binary":
						case "base64":
						case "ucs2":
						case "ucs-2":
						case "utf16le":
						case "utf-16le":
						case "raw":
							return !0;
						default:
							return !1
					}
				}, h = i.StringDecoder = function(t) {
					switch (this.encoding = (t || "utf8").toLowerCase().replace(/[-_]/, ""), n(t), this.encoding) {
						case "utf8":
							this.surrogateSize = 3;
							break;
						case "ucs2":
						case "utf16le":
							this.surrogateSize = 2, this.detectIncompleteChar = o;
							break;
						case "base64":
							this.surrogateSize = 3, this.detectIncompleteChar = s;
							break;
						default:
							return void(this.write = r)
					}
					this.charBuffer = new a(6), this.charReceived = 0, this.charLength = 0
				};
			h.prototype.write = function(t) {
				for (var e = ""; this.charLength;) {
					var i = t.length >= this.charLength - this.charReceived ? this.charLength - this.charReceived : t.length;
					if (t.copy(this.charBuffer, this.charReceived, 0, i), this.charReceived += i, this.charReceived < this.charLength) return "";
					t = t.slice(i, t.length), e = this.charBuffer.slice(0, this.charLength).toString(this.encoding);
					var n = e.charCodeAt(e.length - 1);
					if (!(n >= 55296 && 56319 >= n)) {
						if (this.charReceived = this.charLength = 0, 0 === t.length) return e;
						break
					}
					this.charLength += this.surrogateSize, e = ""
				}
				this.detectIncompleteChar(t);
				var r = t.length;
				this.charLength && (t.copy(this.charBuffer, 0, t.length - this.charReceived, r), r -= this.charReceived), e += t.toString(this.encoding, 0, r);
				var r = e.length - 1,
					n = e.charCodeAt(r);
				if (n >= 55296 && 56319 >= n) {
					var o = this.surrogateSize;
					return this.charLength += o, this.charReceived += o, this.charBuffer.copy(this.charBuffer, o, 0, o), t.copy(this.charBuffer, 0, 0, o), e.substring(0, r)
				}
				return e
			}, h.prototype.detectIncompleteChar = function(t) {
				for (var e = t.length >= 3 ? 3 : t.length; e > 0; e--) {
					var i = t[t.length - e];
					if (1 == e && i >> 5 == 6) {
						this.charLength = 2;
						break
					}
					if (2 >= e && i >> 4 == 14) {
						this.charLength = 3;
						break
					}
					if (3 >= e && i >> 3 == 30) {
						this.charLength = 4;
						break
					}
				}
				this.charReceived = e
			}, h.prototype.end = function(t) {
				var e = "";
				if (t && t.length && (e = this.write(t)), this.charReceived) {
					var i = this.charReceived,
						n = this.charBuffer,
						r = this.encoding;
					e += n.slice(0, i).toString(r)
				}
				return e
			}
		}, {
			buffer: 31
		}],
		52: [function(t, e, i) {
			e.exports = function(t) {
				return t && "object" == typeof t && "function" == typeof t.copy && "function" == typeof t.fill && "function" == typeof t.readUInt8
			}
		}, {}],
		53: [function(t, e, i) {
			(function(e, n) {
				function r(t, e) {
					var n = {
						seen: [],
						stylize: s
					};
					return arguments.length >= 3 && (n.depth = arguments[2]), arguments.length >= 4 && (n.colors = arguments[3]), g(e) ? n.showHidden = e : e && i._extend(n, e), w(n.showHidden) && (n.showHidden = !1), w(n.depth) && (n.depth = 2), w(n.colors) && (n.colors = !1), w(n.customInspect) && (n.customInspect = !0), n.colors && (n.stylize = o), c(n, t, n.depth)
				}
				function o(t, e) {
					var i = r.styles[e];
					return i ? "[" + r.colors[i][0] + "m" + t + "[" + r.colors[i][1] + "m" : t
				}
				function s(t, e) {
					return t
				}
				function a(t) {
					var e = {};
					return t.forEach(function(t, i) {
						e[t] = !0
					}), e
				}
				function c(t, e, n) {
					if (t.customInspect && e && T(e.inspect) && e.inspect !== i.inspect && (!e.constructor || e.constructor.prototype !== e)) {
						var r = e.inspect(n, t);
						return y(r) || (r = c(t, r, n)), r
					}
					var o = h(t, e);
					if (o) return o;
					var s = Object.keys(e),
						g = a(s);
					if (t.showHidden && (s = Object.getOwnPropertyNames(e)), k(e) && (s.indexOf("message") >= 0 || s.indexOf("description") >= 0)) return l(e);
					if (0 === s.length) {
						if (T(e)) {
							var v = e.name ? ": " + e.name : "";
							return t.stylize("[Function" + v + "]", "special")
						}
						if (x(e)) return t.stylize(RegExp.prototype.toString.call(e), "regexp");
						if (C(e)) return t.stylize(Date.prototype.toString.call(e), "date");
						if (k(e)) return l(e)
					}
					var m = "",
						b = !1,
						_ = ["{", "}"];
					if (p(e) && (b = !0, _ = ["[", "]"]), T(e)) {
						var w = e.name ? ": " + e.name : "";
						m = " [Function" + w + "]"
					}
					if (x(e) && (m = " " + RegExp.prototype.toString.call(e)), C(e) && (m = " " + Date.prototype.toUTCString.call(e)), k(e) && (m = " " + l(e)), 0 === s.length && (!b || 0 == e.length)) return _[0] + m + _[1];
					if (0 > n) return x(e) ? t.stylize(RegExp.prototype.toString.call(e), "regexp") : t.stylize("[Object]", "special");
					t.seen.push(e);
					var S;
					return S = b ? u(t, e, n, g, s) : s.map(function(i) {
						return f(t, e, n, g, i, b)
					}), t.seen.pop(), d(S, m, _)
				}
				function h(t, e) {
					if (w(e)) return t.stylize("undefined", "undefined");
					if (y(e)) {
						var i = "'" + JSON.stringify(e).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
						return t.stylize(i, "string")
					}
					return b(e) ? t.stylize("" + e, "number") : g(e) ? t.stylize("" + e, "boolean") : v(e) ? t.stylize("null", "null") : void 0
				}
				function l(t) {
					return "[" + Error.prototype.toString.call(t) + "]"
				}
				function u(t, e, i, n, r) {
					for (var o = [], s = 0, a = e.length; a > s; ++s) I(e, String(s)) ? o.push(f(t, e, i, n, String(s), !0)) : o.push("");
					return r.forEach(function(r) {
						r.match(/^\d+$/) || o.push(f(t, e, i, n, r, !0))
					}), o
				}
				function f(t, e, i, n, r, o) {
					var s, a, h;
					if (h = Object.getOwnPropertyDescriptor(e, r) || {
						value: e[r]
					}, h.get ? a = h.set ? t.stylize("[Getter/Setter]", "special") : t.stylize("[Getter]", "special") : h.set && (a = t.stylize("[Setter]", "special")), I(n, r) || (s = "[" + r + "]"), a || (t.seen.indexOf(h.value) < 0 ? (a = v(i) ? c(t, h.value, null) : c(t, h.value, i - 1), a.indexOf("\n") > -1 && (a = o ? a.split("\n").map(function(t) {
						return "  " + t
					}).join("\n").substr(2) : "\n" + a.split("\n").map(function(t) {
						return "   " + t
					}).join("\n"))) : a = t.stylize("[Circular]", "special")), w(s)) {
						if (o && r.match(/^\d+$/)) return a;
						s = JSON.stringify("" + r), s.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (s = s.substr(1, s.length - 2), s = t.stylize(s, "name")) : (s = s.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), s = t.stylize(s, "string"))
					}
					return s + ": " + a
				}
				function d(t, e, i) {
					var n = 0,
						r = t.reduce(function(t, e) {
							return n++, e.indexOf("\n") >= 0 && n++, t + e.replace(/\u001b\[\d\d?m/g, "").length + 1
						}, 0);
					return r > 60 ? i[0] + ("" === e ? "" : e + "\n ") + " " + t.join(",\n  ") + " " + i[1] : i[0] + e + " " + t.join(", ") + " " + i[1]
				}
				function p(t) {
					return Array.isArray(t)
				}
				function g(t) {
					return "boolean" == typeof t
				}
				function v(t) {
					return null === t
				}
				function m(t) {
					return null == t
				}
				function b(t) {
					return "number" == typeof t
				}
				function y(t) {
					return "string" == typeof t
				}
				function _(t) {
					return "symbol" == typeof t
				}
				function w(t) {
					return void 0 === t
				}
				function x(t) {
					return S(t) && "[object RegExp]" === O(t)
				}
				function S(t) {
					return "object" == typeof t && null !== t
				}
				function C(t) {
					return S(t) && "[object Date]" === O(t)
				}
				function k(t) {
					return S(t) && ("[object Error]" === O(t) || t instanceof Error)
				}
				function T(t) {
					return "function" == typeof t
				}
				function E(t) {
					return null === t || "boolean" == typeof t || "number" == typeof t || "string" == typeof t || "symbol" == typeof t || "undefined" == typeof t
				}
				function O(t) {
					return Object.prototype.toString.call(t)
				}
				function j(t) {
					return 10 > t ? "0" + t.toString(10) : t.toString(10)
				}
				function A() {
					var t = new Date,
						e = [j(t.getHours()), j(t.getMinutes()), j(t.getSeconds())].join(":");
					return [t.getDate(), D[t.getMonth()], e].join(" ")
				}
				function I(t, e) {
					return Object.prototype.hasOwnProperty.call(t, e)
				}
				var P = /%[sdj%]/g;
				i.format = function(t) {
					if (!y(t)) {
						for (var e = [], i = 0; i < arguments.length; i++) e.push(r(arguments[i]));
						return e.join(" ")
					}
					for (var i = 1, n = arguments, o = n.length, s = String(t).replace(P, function(t) {
						if ("%%" === t) return "%";
						if (i >= o) return t;
						switch (t) {
							case "%s":
								return String(n[i++]);
							case "%d":
								return Number(n[i++]);
							case "%j":
								try {
									return JSON.stringify(n[i++])
								} catch (e) {
									return "[Circular]"
								}
							default:
								return t
						}
					}), a = n[i]; o > i; a = n[++i]) s += v(a) || !S(a) ? " " + a : " " + r(a);
					return s
				}, i.deprecate = function(t, r) {
					function o() {
						if (!s) {
							if (e.throwDeprecation) throw new Error(r);
							e.traceDeprecation ? console.trace(r) : console.error(r), s = !0
						}
						return t.apply(this, arguments)
					}
					if (w(n.process)) return function() {
						return i.deprecate(t, r).apply(this, arguments)
					};
					if (e.noDeprecation === !0) return t;
					var s = !1;
					return o
				};
				var L, M = {};
				i.debuglog = function(t) {
					if (w(L) && (L = e.env.NODE_DEBUG || ""), t = t.toUpperCase(), !M[t]) if (new RegExp("\\b" + t + "\\b", "i").test(L)) {
						var n = e.pid;
						M[t] = function() {
							var e = i.format.apply(i, arguments);
							console.error("%s %d: %s", t, n, e)
						}
					} else M[t] = function() {};
					return M[t]
				}, i.inspect = r, r.colors = {
					bold: [1, 22],
					italic: [3, 23],
					underline: [4, 24],
					inverse: [7, 27],
					white: [37, 39],
					grey: [90, 39],
					black: [30, 39],
					blue: [34, 39],
					cyan: [36, 39],
					green: [32, 39],
					magenta: [35, 39],
					red: [31, 39],
					yellow: [33, 39]
				}, r.styles = {
					special: "cyan",
					number: "yellow",
					"boolean": "yellow",
					undefined: "grey",
					"null": "bold",
					string: "green",
					date: "magenta",
					regexp: "red"
				}, i.isArray = p, i.isBoolean = g, i.isNull = v, i.isNullOrUndefined = m, i.isNumber = b, i.isString = y, i.isSymbol = _, i.isUndefined = w, i.isRegExp = x, i.isObject = S, i.isDate = C, i.isError = k, i.isFunction = T, i.isPrimitive = E, i.isBuffer = t("./support/isBuffer");
				var D = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
				i.log = function() {
					console.log("%s - %s", A(), i.format.apply(i, arguments))
				}, i.inherits = t("inherits"), i._extend = function(t, e) {
					if (!e || !S(e)) return t;
					for (var i = Object.keys(e), n = i.length; n--;) t[i[n]] = e[i[n]];
					return t
				}
			}).call(this, t("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
		}, {
			"./support/isBuffer": 52,
			_process: 38,
			inherits: 36
		}],
		54: [function(t, e, i) {
			function n() {
				return "WebkitAppearance" in document.documentElement.style || window.console && (console.firebug || console.exception && console.table) || navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31
			}
			function r() {
				var t = arguments,
					e = this.useColors;
				if (t[0] = (e ? "%c" : "") + this.namespace + (e ? " %c" : " ") + t[0] + (e ? "%c " : " ") + "+" + i.humanize(this.diff), !e) return t;
				var n = "color: " + this.color;
				t = [t[0], n, "color: inherit"].concat(Array.prototype.slice.call(t, 1));
				var r = 0,
					o = 0;
				return t[0].replace(/%[a-z%]/g, function(t) {
					"%%" !== t && (r++, "%c" === t && (o = r))
				}), t.splice(o, 0, n), t
			}
			function o() {
				return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
			}
			function s(t) {
				try {
					null == t ? h.removeItem("debug") : h.debug = t
				} catch (e) {}
			}
			function a() {
				var t;
				try {
					t = h.debug
				} catch (e) {}
				return t
			}
			function c() {
				try {
					return window.localStorage
				} catch (t) {}
			}
			i = e.exports = t("./debug"), i.log = o, i.formatArgs = r, i.save = s, i.load = a, i.useColors = n;
			var h;
			h = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : c(), i.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"], i.formatters.j = function(t) {
				return JSON.stringify(t)
			}, i.enable(a())
		}, {
			"./debug": 55
		}],
		55: [function(t, e, i) {
			function n() {
				return i.colors[l++ % i.colors.length]
			}
			function r(t) {
				function e() {}
				function r() {
					var t = r,
						e = +new Date,
						o = e - (h || e);
					t.diff = o, t.prev = h, t.curr = e, h = e, null == t.useColors && (t.useColors = i.useColors()), null == t.color && t.useColors && (t.color = n());
					var s = Array.prototype.slice.call(arguments);
					s[0] = i.coerce(s[0]), "string" != typeof s[0] && (s = ["%o"].concat(s));
					var a = 0;
					s[0] = s[0].replace(/%([a-z%])/g, function(e, n) {
						if ("%%" === e) return e;
						a++;
						var r = i.formatters[n];
						if ("function" == typeof r) {
							var o = s[a];
							e = r.call(t, o), s.splice(a, 1), a--
						}
						return e
					}), "function" == typeof i.formatArgs && (s = i.formatArgs.apply(t, s));
					var c = r.log || i.log || console.log.bind(console);
					c.apply(t, s)
				}
				e.enabled = !1, r.enabled = !0;
				var o = i.enabled(t) ? r : e;
				return o.namespace = t, o
			}
			function o(t) {
				i.save(t);
				for (var e = (t || "").split(/[\s,]+/), n = e.length, r = 0; n > r; r++) e[r] && (t = e[r].replace(/\*/g, ".*?"), "-" === t[0] ? i.skips.push(new RegExp("^" + t.substr(1) + "$")) : i.names.push(new RegExp("^" + t + "$")))
			}
			function s() {
				i.enable("")
			}
			function a(t) {
				var e, n;
				for (e = 0, n = i.skips.length; n > e; e++) if (i.skips[e].test(t)) return !1;
				for (e = 0, n = i.names.length; n > e; e++) if (i.names[e].test(t)) return !0;
				return !1
			}
			function c(t) {
				return t instanceof Error ? t.stack || t.message : t
			}
			i = e.exports = r, i.coerce = c, i.disable = s, i.enable = o, i.enabled = a, i.humanize = t("ms"), i.names = [], i.skips = [], i.formatters = {};
			var h, l = 0
		}, {
			ms: 56
		}],
		56: [function(t, e, i) {
			function n(t) {
				var e = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(t);
				if (e) {
					var i = parseFloat(e[1]),
						n = (e[2] || "ms").toLowerCase();
					switch (n) {
						case "years":
						case "year":
						case "yrs":
						case "yr":
						case "y":
							return i * u;
						case "days":
						case "day":
						case "d":
							return i * l;
						case "hours":
						case "hour":
						case "hrs":
						case "hr":
						case "h":
							return i * h;
						case "minutes":
						case "minute":
						case "mins":
						case "min":
						case "m":
							return i * c;
						case "seconds":
						case "second":
						case "secs":
						case "sec":
						case "s":
							return i * a;
						case "milliseconds":
						case "millisecond":
						case "msecs":
						case "msec":
						case "ms":
							return i
					}
				}
			}
			function r(t) {
				return t >= l ? Math.round(t / l) + "d" : t >= h ? Math.round(t / h) + "h" : t >= c ? Math.round(t / c) + "m" : t >= a ? Math.round(t / a) + "s" : t + "ms"
			}
			function o(t) {
				return s(t, l, "day") || s(t, h, "hour") || s(t, c, "minute") || s(t, a, "second") || t + " ms"
			}
			function s(t, e, i) {
				return e > t ? void 0 : 1.5 * e > t ? Math.floor(t / e) + " " + i : Math.ceil(t / e) + " " + i + "s"
			}
			var a = 1e3,
				c = 60 * a,
				h = 60 * c,
				l = 24 * h,
				u = 365.25 * l;
			e.exports = function(t, e) {
				return e = e || {}, "string" == typeof t ? n(t) : e["long"] ? o(t) : r(t)
			}
		}, {}],
		57: [function(t, e, i) {
			(function(i) {
				function n(t, e, i) {
					if (t.readUInt32) return t.readUInt32(e, i);
					var n;
					if (i) {
						if (t.readUInt32BE) return t.readUInt32BE(e);
						n = (t[e] << 24) + (t[e + 1] << 16) + (t[e + 2] << 8) + t[e + 3]
					} else {
						if (t.readUInt32LE) return t.readUInt32LE(e);
						n = t[e] + (t[e + 1] << 8) + (t[e + 2] << 16) + (t[e + 3] << 24)
					}
					return n
				}
				function r(t, e, i) {
					if (t.readUInt16) return t.readUInt16(e, i);
					var n;
					if (i) {
						if (t.readUInt16BE) return t.readUInt16BE(e);
						n = (t[e] << 8) + t[e + 1]
					} else {
						if (t.readUInt16LE) return t.readUInt16LE(e);
						n = t[e] + (t[e + 1] << 8)
					}
					return n
				}
				function o(t, e, i) {
					i > 7 && (e += Math.floor(i / 8), i %= 8);
					var n = t[e];
					7 > i && (n >>>= 7 - i);
					var r = 1 & n;
					return r
				}
				function s(t, e, n, r, s) {
					var a = 0,
						c = !1;
					s && (o(t, e, n) > 0 && (c = !0), r--, n++);
					for (var h = [], l = 0; r > l; l++) {
						var u = o(t, e, n + l);
						l > 0 && (r - l) % 8 == 0 && (h.push(a), a = 0), a <<= 1, a |= u
					}
					return h.push(a), a = new i(h), a.negative = c ? !0 : !1, a
				}
				function a(t) {
					var e = [73, 72, 68, 82],
						i = 12;
					return u(t, i, e) ? (i += 4, {
						type: "image",
						format: "PNG",
						mimeType: "image/png",
						width: n(t, i, !0),
						height: n(t, i + 4, !0)
					}) : !1
				}
				function c(t) {
					for (var e = 2, i = t.length, n = [255, [192, 194]]; i > e;) {
						if (u(t, e, n)) return e += 5, {
							type: "image",
							format: "JPG",
							mimeType: "image/jpeg",
							width: r(t, e + 2, !0),
							height: r(t, e, !0)
						};
						e += 2;
						var o = r(t, e, !0);
						e += o
					}
				}
				function h(t) {
					var e = 6;
					return {
						type: "image",
						format: "GIF",
						mimeType: "image/gif",
						width: r(t, e, !1),
						height: r(t, e + 2, !1)
					}
				}
				function l(e) {
					var i, n = 8,
						o = 0;
					if (67 === e[0]) try {
						e = t("zlib").inflate(e.slice(8, 100)), n = 0
					} catch (a) {
						return {
							type: "flash",
							format: "SWF",
							mimeType: "application/x-shockwave-flash",
							width: null,
							height: null
						}
					}
					var c = s(e, n, o, 5)[0];
					o += 5, i = s(e, n, o, c, !0);
					var h = (c > 9 ? r(i, 0, !0) : i[0]) * (i.negative ? -1 : 1);
					o += c, i = s(e, n, o, c, !0);
					var l = (c > 9 ? r(i, 0, !0) : i[0]) * (i.negative ? -1 : 1);
					o += c, i = s(e, n, o, c, !0);
					var u = (c > 9 ? r(i, 0, !0) : i[0]) * (i.negative ? -1 : 1);
					o += c, i = s(e, n, o, c, !0);
					var f = (c > 9 ? r(i, 0, !0) : i[0]) * (i.negative ? -1 : 1);
					return {
						type: "flash",
						format: "SWF",
						mimeType: "application/x-shockwave-flash",
						width: Math.ceil((l - h) / 20),
						height: Math.ceil((f - u) / 20)
					}
				}
				function u(t, e, i) {
					for (var n = i.length, r = 0; n > r; r++) {
						var o = t[r + e],
							s = i[r],
							a = !1;
						if ("number" == typeof s) a = s === o;
						else for (var c in s) {
							var h = s[c];
							h === o && (a = !0)
						}
						if (!a) return !1
					}
					return !0
				}
				e.exports = function(t, e) {
					var i = [137, 80, 78, 71, 13, 10, 26, 10],
						n = [255, 216, 255],
						r = [71, 73, 70, 56, [55, 57], 97],
						o = [
							[70, 67], 87, 83];
					return u(t, 0, i) ? a(t) : u(t, 0, n) ? c(t) : u(t, 0, r) ? h(t) : u(t, 0, o) ? l(t) : !1
				}
			}).call(this, t("buffer").Buffer)
		}, {
			buffer: 31,
			zlib: 30
		}],
		58: [function(t, e, i) {
			function n(t, e) {
				return function(i, n, o) {
					if (n = r(n, o, 3), c(i)) {
						var h = a(i, n, e);
						return h > -1 ? i[h] : void 0
					}
					return s(i, n, t)
				}
			}
			var r = t("lodash._basecallback"),
				o = t("lodash._baseeach"),
				s = t("lodash._basefind"),
				a = t("lodash._basefindindex"),
				c = t("lodash.isarray"),
				h = (t("lodash.keys"), n(o));
			e.exports = h
		}, {
			"lodash._basecallback": 59,
			"lodash._baseeach": 63,
			"lodash._basefind": 64,
			"lodash._basefindindex": 65,
			"lodash.isarray": 66,
			"lodash.keys": 67
		}],
		59: [function(t, e, i) {
			function n(t, e, i) {
				var n = typeof t;
				return "function" == n ? "undefined" == typeof e ? t : p(t, e, i) : null == t ? f : "object" == n ? o(t) : "undefined" == typeof e ? a(t + "") : s(t + "", e)
			}
			function r(t, e, i, n, r) {
				for (var o = -1, s = e.length, a = !r; ++o < s;) if (a && n[o] ? i[o] !== t[e[o]] : !(e[o] in t)) return !1;
				for (o = -1; ++o < s;) {
					var c = e[o],
						h = t[c],
						l = i[o];
					if (a && n[o]) var u = "undefined" != typeof h || c in t;
					else u = r ? r(h, l, c) : void 0, "undefined" == typeof u && (u = d(l, h, r, !0));
					if (!u) return !1
				}
				return !0
			}
			function o(t) {
				var e = g(t),
					i = e.length;
				if (!i) return u(!0);
				if (1 == i) {
					var n = e[0],
						o = t[n];
					if (c(o)) return function(t) {
						return null != t && t[n] === o && ("undefined" != typeof o || n in h(t))
					}
				}
				for (var s = Array(i), a = Array(i); i--;) o = t[e[i]], s[i] = o, a[i] = c(o);
				return function(t) {
					return null != t && r(h(t), e, s, a)
				}
			}
			function s(t, e) {
				return c(e) ? function(i) {
					return null != i && i[t] === e && ("undefined" != typeof e || t in h(i))
				} : function(i) {
					return null != i && d(e, i[t], null, !0)
				}
			}
			function a(t) {
				return function(e) {
					return null == e ? void 0 : e[t]
				}
			}
			function c(t) {
				return t === t && (0 === t ? 1 / t > 0 : !l(t))
			}
			function h(t) {
				return l(t) ? t : Object(t)
			}
			function l(t) {
				var e = typeof t;
				return "function" == e || !! t && "object" == e
			}
			function u(t) {
				return function() {
					return t
				}
			}
			function f(t) {
				return t
			}
			var d = t("lodash._baseisequal"),
				p = t("lodash._bindcallback"),
				g = t("lodash.keys");
			e.exports = n
		}, {
			"lodash._baseisequal": 60,
			"lodash._bindcallback": 62,
			"lodash.keys": 67
		}],
		60: [function(t, e, i) {
			function n(t, e, i, o, s, a) {
				if (t === e) return 0 !== t || 1 / t == 1 / e;
				var c = typeof t,
					h = typeof e;
				return "function" != c && "object" != c && "function" != h && "object" != h || null == t || null == e ? t !== t && e !== e : r(t, e, n, i, o, s, a)
			}
			function r(t, e, i, n, r, l, d) {
				var p = c(t),
					g = c(e),
					m = f,
					y = f;
				p || (m = S.call(t), m == u ? m = b : m != b && (p = h(t))), g || (y = S.call(e), y == u ? y = b : y != b && (g = h(e)));
				var _ = m == b || r && m == v,
					w = y == b || r && y == v,
					C = m == y;
				if (C && !p && !_) return s(t, e, m);
				if (r) {
					if (!(C || _ && w)) return !1
				} else {
					var k = _ && x.call(t, "__wrapped__"),
						T = w && x.call(e, "__wrapped__");
					if (k || T) return i(k ? t.value() : t, T ? e.value() : e, n, r, l, d);
					if (!C) return !1
				}
				l || (l = []), d || (d = []);
				for (var E = l.length; E--;) if (l[E] == t) return d[E] == e;
				l.push(t), d.push(e);
				var O = (p ? o : a)(t, e, i, n, r, l, d);
				return l.pop(), d.pop(), O
			}
			function o(t, e, i, n, r, o, s) {
				var a = -1,
					c = t.length,
					h = e.length,
					l = !0;
				if (c != h && !(r && h > c)) return !1;
				for (; l && ++a < c;) {
					var u = t[a],
						f = e[a];
					if (l = void 0, n && (l = r ? n(f, u, a) : n(u, f, a)), "undefined" == typeof l) if (r) for (var d = h; d-- && (f = e[d], !(l = u && u === f || i(u, f, n, r, o, s))););
					else l = u && u === f || i(u, f, n, r, o, s)
				}
				return !!l
			}
			function s(t, e, i) {
				switch (i) {
					case d:
					case p:
						return +t == +e;
					case g:
						return t.name == e.name && t.message == e.message;
					case m:
						return t != +t ? e != +e : 0 == t ? 1 / t == 1 / e : t == +e;
					case y:
					case _:
						return t == e + ""
				}
				return !1
			}
			function a(t, e, i, n, r, o, s) {
				var a = l(t),
					c = a.length,
					h = l(e),
					u = h.length;
				if (c != u && !r) return !1;
				for (var f = r, d = -1; ++d < c;) {
					var p = a[d],
						g = r ? p in e : x.call(e, p);
					if (g) {
						var v = t[p],
							m = e[p];
						g = void 0, n && (g = r ? n(m, v, p) : n(v, m, p)), "undefined" == typeof g && (g = v && v === m || i(v, m, n, r, o, s))
					}
					if (!g) return !1;
					f || (f = "constructor" == p)
				}
				if (!f) {
					var b = t.constructor,
						y = e.constructor;
					if (b != y && "constructor" in t && "constructor" in e && !("function" == typeof b && b instanceof b && "function" == typeof y && y instanceof y)) return !1
				}
				return !0
			}
			var c = t("lodash.isarray"),
				h = t("lodash.istypedarray"),
				l = t("lodash.keys"),
				u = "[object Arguments]",
				f = "[object Array]",
				d = "[object Boolean]",
				p = "[object Date]",
				g = "[object Error]",
				v = "[object Function]",
				m = "[object Number]",
				b = "[object Object]",
				y = "[object RegExp]",
				_ = "[object String]",
				w = Object.prototype,
				x = w.hasOwnProperty,
				S = w.toString;
			e.exports = n
		}, {
			"lodash.isarray": 66,
			"lodash.istypedarray": 61,
			"lodash.keys": 67
		}],
		61: [function(t, e, i) {
			function n(t) {
				return !!t && "object" == typeof t
			}
			function r(t) {
				return "number" == typeof t && t > -1 && t % 1 == 0 && P >= t
			}
			function o(t) {
				return n(t) && r(t.length) && !! j[I.call(t)]
			}
			var s = "[object Arguments]",
				a = "[object Array]",
				c = "[object Boolean]",
				h = "[object Date]",
				l = "[object Error]",
				u = "[object Function]",
				f = "[object Map]",
				d = "[object Number]",
				p = "[object Object]",
				g = "[object RegExp]",
				v = "[object Set]",
				m = "[object String]",
				b = "[object WeakMap]",
				y = "[object ArrayBuffer]",
				_ = "[object Float32Array]",
				w = "[object Float64Array]",
				x = "[object Int8Array]",
				S = "[object Int16Array]",
				C = "[object Int32Array]",
				k = "[object Uint8Array]",
				T = "[object Uint8ClampedArray]",
				E = "[object Uint16Array]",
				O = "[object Uint32Array]",
				j = {};
			j[_] = j[w] = j[x] = j[S] = j[C] = j[k] = j[T] = j[E] = j[O] = !0, j[s] = j[a] = j[y] = j[c] = j[h] = j[l] = j[u] = j[f] = j[d] = j[p] = j[g] = j[v] = j[m] = j[b] = !1;
			var A = Object.prototype,
				I = A.toString,
				P = Math.pow(2, 53) - 1;
			e.exports = o
		}, {}],
		62: [function(t, e, i) {
			function n(t, e, i) {
				if ("function" != typeof t) return r;
				if ("undefined" == typeof e) return t;
				switch (i) {
					case 1:
						return function(i) {
							return t.call(e, i)
						};
					case 3:
						return function(i, n, r) {
							return t.call(e, i, n, r)
						};
					case 4:
						return function(i, n, r, o) {
							return t.call(e, i, n, r, o)
						};
					case 5:
						return function(i, n, r, o, s) {
							return t.call(e, i, n, r, o, s)
						}
				}
				return function() {
					return t.apply(e, arguments)
				}
			}
			function r(t) {
				return t
			}
			e.exports = n
		}, {}],
		63: [function(t, e, i) {
			function n(t, e) {
				return f(t, e, h)
			}
			function r(t, e) {
				return function(i, n) {
					var r = i ? i.length : 0;
					if (!s(r)) return t(i, n);
					for (var o = e ? r : -1, c = a(i);
					(e ? o-- : ++o < r) && n(c[o], o, c) !== !1;);
					return i
				}
			}
			function o(t) {
				return function(e, i, n) {
					for (var r = a(e), o = n(e), s = o.length, c = t ? s : -1; t ? c-- : ++c < s;) {
						var h = o[c];
						if (i(r[h], h, r) === !1) break
					}
					return e
				}
			}
			function s(t) {
				return "number" == typeof t && t > -1 && t % 1 == 0 && l >= t
			}
			function a(t) {
				return c(t) ? t : Object(t)
			}
			function c(t) {
				var e = typeof t;
				return "function" == e || !! t && "object" == e
			}
			var h = t("lodash.keys"),
				l = Math.pow(2, 53) - 1,
				u = r(n),
				f = o();
			e.exports = u
		}, {
			"lodash.keys": 67
		}],
		64: [function(t, e, i) {
			function n(t, e, i, n) {
				var r;
				return i(t, function(t, i, o) {
					return e(t, i, o) ? (r = n ? i : t, !1) : void 0
				}), r
			}
			e.exports = n
		}, {}],
		65: [function(t, e, i) {
			function n(t, e, i) {
				for (var n = t.length, r = i ? n : -1; i ? r-- : ++r < n;) if (e(t[r], r, t)) return r;
				return -1
			}
			e.exports = n
		}, {}],
		66: [function(t, e, i) {
			function n(t) {
				return "string" == typeof t ? t : null == t ? "" : t + ""
			}
			function r(t) {
				return !!t && "object" == typeof t
			}
			function o(t) {
				return "number" == typeof t && t > -1 && t % 1 == 0 && b >= t
			}
			function s(t) {
				return null == t ? !1 : g.call(t) == h ? v.test(p.call(t)) : r(t) && l.test(t)
			}
			function a(t) {
				return t = n(t), t && f.test(t) ? t.replace(u, "\\$&") : t
			}
			var c = "[object Array]",
				h = "[object Function]",
				l = /^\[object .+?Constructor\]$/,
				u = /[.*+?^${}()|[\]\/\\]/g,
				f = RegExp(u.source),
				d = Object.prototype,
				p = Function.prototype.toString,
				g = d.toString,
				v = RegExp("^" + a(g).replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
				m = s(m = Array.isArray) && m,
				b = Math.pow(2, 53) - 1,
				y = m || function(t) {
					return r(t) && o(t.length) && g.call(t) == c
				};
			e.exports = y
		}, {}],
		67: [function(t, e, i) {
			function n(t, e) {
				return t = +t, e = null == e ? g : e, t > -1 && t % 1 == 0 && e > t
			}
			function r(t) {
				return "number" == typeof t && t > -1 && t % 1 == 0 && g >= t
			}
			function o(t) {
				for (var e = a(t), i = e.length, o = i && t.length, s = o && r(o) && (h(t) || v.nonEnumArgs && c(t)), l = -1, u = []; ++l < i;) {
					var d = e[l];
					(s && n(d, o) || f.call(t, d)) && u.push(d)
				}
				return u
			}
			function s(t) {
				var e = typeof t;
				return "function" == e || !! t && "object" == e
			}
			function a(t) {
				if (null == t) return [];
				s(t) || (t = Object(t));
				var e = t.length;
				e = e && r(e) && (h(t) || v.nonEnumArgs && c(t)) && e || 0;
				for (var i = t.constructor, o = -1, a = "function" == typeof i && i.prototype === t, l = Array(e), u = e > 0; ++o < e;) l[o] = o + "";
				for (var d in t) u && n(d, e) || "constructor" == d && (a || !f.call(t, d)) || l.push(d);
				return l
			}
			var c = t("lodash.isarguments"),
				h = t("lodash.isarray"),
				l = t("lodash.isnative"),
				u = Object.prototype,
				f = u.hasOwnProperty,
				d = u.propertyIsEnumerable,
				p = l(p = Object.keys) && p,
				g = Math.pow(2, 53) - 1,
				v = {};
			! function(t) {
				try {
					v.nonEnumArgs = !d.call(arguments, 1)
				} catch (e) {
					v.nonEnumArgs = !0
				}
			}(0, 0);
			var m = p ? function(t) {
					if (t) var e = t.constructor,
						i = t.length;
					return "function" == typeof e && e.prototype === t || "function" != typeof t && i && r(i) ? o(t) : s(t) ? p(t) : []
				} : o;
			e.exports = m
		}, {
			"lodash.isarguments": 68,
			"lodash.isarray": 66,
			"lodash.isnative": 69
		}],
		68: [function(t, e, i) {
			function n(t) {
				return !!t && "object" == typeof t
			}
			function r(t) {
				return "number" == typeof t && t > -1 && t % 1 == 0 && h >= t
			}
			function o(t) {
				var e = n(t) ? t.length : void 0;
				return r(e) && c.call(t) == s
			}
			var s = "[object Arguments]",
				a = Object.prototype,
				c = a.toString,
				h = Math.pow(2, 53) - 1;
			e.exports = o
		}, {}],
		69: [function(t, e, i) {
			function n(t) {
				return "string" == typeof t ? t : null == t ? "" : t + ""
			}
			function r(t) {
				return !!t && "object" == typeof t
			}
			function o(t) {
				return null == t ? !1 : d.call(t) == a ? p.test(f.call(t)) : r(t) && c.test(t)
			}
			function s(t) {
				return t = n(t), t && l.test(t) ? t.replace(h, "\\$&") : t
			}
			var a = "[object Function]",
				c = /^\[object .+?Constructor\]$/,
				h = /[.*+?^${}()|[\]\/\\]/g,
				l = RegExp(h.source),
				u = Object.prototype,
				f = Function.prototype.toString,
				d = u.toString,
				p = RegExp("^" + s(d).replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
			e.exports = o
		}, {}],
		70: [function(t, e, i) {
			var n = arguments[3],
				r = arguments[4],
				o = arguments[5],
				s = JSON.stringify;
			e.exports = function(t) {
				for (var e, i = Object.keys(o), a = 0, c = i.length; c > a; a++) {
					var h = i[a];
					if (o[h].exports === t) {
						e = h;
						break
					}
				}
				if (!e) {
					e = Math.floor(Math.pow(16, 8) * Math.random()).toString(16);
					for (var l = {}, a = 0, c = i.length; c > a; a++) {
						var h = i[a];
						l[h] = h
					}
					r[e] = [Function(["require", "module", "exports"], "(" + t + ")(self)"), l]
				}
				var u = Math.floor(Math.pow(16, 8) * Math.random()).toString(16),
					f = {};
				f[e] = e, r[u] = [Function(["require"], "require(" + s(e) + ")(self)"), f];
				var d = "(" + n + ")({" + Object.keys(r).map(function(t) {
					return s(t) + ":[" + r[t][0] + "," + s(r[t][1]) + "]"
				}).join(",") + "},{},[" + s(u) + "])",
					p = window.URL || window.webkitURL || window.mozURL || window.msURL;
				return new Worker(p.createObjectURL(new Blob([d], {
					type: "text/javascript"
				})))
			}
		}, {}]
	}, {}, [1])(1)
}),
function() {
	"use strict";

	function t(e, n) {
		function r(t, e) {
			return function() {
				return t.apply(e, arguments)
			}
		}
		var o;
		if (n = n || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = n.touchBoundary || 10, this.layer = e, this.tapDelay = n.tapDelay || 200, this.tapTimeout = n.tapTimeout || 700, !t.notNeeded(e)) {
			for (var s = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], a = this, c = 0, h = s.length; h > c; c++) a[s[c]] = r(a[s[c]], a);
			i && (e.addEventListener("mouseover", this.onMouse, !0), e.addEventListener("mousedown", this.onMouse, !0), e.addEventListener("mouseup", this.onMouse, !0)), e.addEventListener("click", this.onClick, !0), e.addEventListener("touchstart", this.onTouchStart, !1), e.addEventListener("touchmove", this.onTouchMove, !1), e.addEventListener("touchend", this.onTouchEnd, !1), e.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (e.removeEventListener = function(t, i, n) {
				var r = Node.prototype.removeEventListener;
				"click" === t ? r.call(e, t, i.hijacked || i, n) : r.call(e, t, i, n)
			}, e.addEventListener = function(t, i, n) {
				var r = Node.prototype.addEventListener;
				"click" === t ? r.call(e, t, i.hijacked || (i.hijacked = function(t) {
					t.propagationStopped || i(t)
				}), n) : r.call(e, t, i, n)
			}), "function" == typeof e.onclick && (o = e.onclick, e.addEventListener("click", function(t) {
				o(t)
			}, !1), e.onclick = null)
		}
	}
	var e = navigator.userAgent.indexOf("Windows Phone") >= 0,
		i = navigator.userAgent.indexOf("Android") > 0 && !e,
		n = /iP(ad|hone|od)/.test(navigator.userAgent) && !e,
		r = n && /OS 4_\d(_\d)?/.test(navigator.userAgent),
		o = n && /OS [6-7]_\d/.test(navigator.userAgent),
		s = navigator.userAgent.indexOf("BB10") > 0;
	t.prototype.needsClick = function(t) {
		switch (t.nodeName.toLowerCase()) {
			case "button":
			case "select":
			case "textarea":
				if (t.disabled) return !0;
				break;
			case "input":
				if (n && "file" === t.type || t.disabled) return !0;
				break;
			case "label":
			case "iframe":
			case "video":
				return !0
		}
		return /\bneedsclick\b/.test(t.className)
	}, t.prototype.needsFocus = function(t) {
		switch (t.nodeName.toLowerCase()) {
			case "textarea":
				return !0;
			case "select":
				return !i;
			case "input":
				switch (t.type) {
					case "button":
					case "checkbox":
					case "file":
					case "image":
					case "radio":
					case "submit":
						return !1
				}
				return !t.disabled && !t.readOnly;
			default:
				return /\bneedsfocus\b/.test(t.className)
		}
	}, t.prototype.sendClick = function(t, e) {
		var i, n;
		document.activeElement && document.activeElement !== t && document.activeElement.blur(), n = e.changedTouches[0], i = document.createEvent("MouseEvents"), i.initMouseEvent(this.determineEventType(t), !0, !0, window, 1, n.screenX, n.screenY, n.clientX, n.clientY, !1, !1, !1, !1, 0, null), i.forwardedTouchEvent = !0, t.dispatchEvent(i)
	}, t.prototype.determineEventType = function(t) {
		return i && "select" === t.tagName.toLowerCase() ? "mousedown" : "click"
	}, t.prototype.focus = function(t) {
		var e;
		n && t.setSelectionRange && 0 !== t.type.indexOf("date") && "time" !== t.type && "month" !== t.type ? (e = t.value.length, t.setSelectionRange(e, e)) : t.focus()
	}, t.prototype.updateScrollParent = function(t) {
		var e, i;
		if (e = t.fastClickScrollParent, !e || !e.contains(t)) {
			i = t;
			do {
				if (i.scrollHeight > i.offsetHeight) {
					e = i, t.fastClickScrollParent = i;
					break
				}
				i = i.parentElement
			} while (i)
		}
		e && (e.fastClickLastScrollTop = e.scrollTop)
	}, t.prototype.getTargetElementFromEventTarget = function(t) {
		return t.nodeType === Node.TEXT_NODE ? t.parentNode : t
	}, t.prototype.onTouchStart = function(t) {
		var e, i, o;
		if (t.targetTouches.length > 1) return !0;
		if (e = this.getTargetElementFromEventTarget(t.target), i = t.targetTouches[0], n) {
			if (o = window.getSelection(), o.rangeCount && !o.isCollapsed) return !0;
			if (!r) {
				if (i.identifier && i.identifier === this.lastTouchIdentifier) return t.preventDefault(), !1;
				this.lastTouchIdentifier = i.identifier, this.updateScrollParent(e)
			}
		}
		return this.trackingClick = !0, this.trackingClickStart = t.timeStamp, this.targetElement = e, this.touchStartX = i.pageX, this.touchStartY = i.pageY, t.timeStamp - this.lastClickTime < this.tapDelay && t.preventDefault(), !0
	}, t.prototype.touchHasMoved = function(t) {
		var e = t.changedTouches[0],
			i = this.touchBoundary;
		return Math.abs(e.pageX - this.touchStartX) > i || Math.abs(e.pageY - this.touchStartY) > i ? !0 : !1
	}, t.prototype.onTouchMove = function(t) {
		return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(t.target) || this.touchHasMoved(t)) && (this.trackingClick = !1, this.targetElement = null), !0) : !0
	}, t.prototype.findControl = function(t) {
		return void 0 !== t.control ? t.control : t.htmlFor ? document.getElementById(t.htmlFor) : t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
	}, t.prototype.onTouchEnd = function(t) {
		var e, s, a, c, h, l = this.targetElement;
		if (!this.trackingClick) return !0;
		if (t.timeStamp - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0, !0;
		if (t.timeStamp - this.trackingClickStart > this.tapTimeout) return !0;
		if (this.cancelNextClick = !1, this.lastClickTime = t.timeStamp, s = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, o && (h = t.changedTouches[0], l = document.elementFromPoint(h.pageX - window.pageXOffset, h.pageY - window.pageYOffset) || l, l.fastClickScrollParent = this.targetElement.fastClickScrollParent), a = l.tagName.toLowerCase(), "label" === a) {
			if (e = this.findControl(l)) {
				if (this.focus(l), i) return !1;
				l = e
			}
		} else if (this.needsFocus(l)) return t.timeStamp - s > 100 || n && window.top !== window && "input" === a ? (this.targetElement = null, !1) : (this.focus(l), this.sendClick(l, t), n && "select" === a || (this.targetElement = null, t.preventDefault()), !1);
		return n && !r && (c = l.fastClickScrollParent, c && c.fastClickLastScrollTop !== c.scrollTop) ? !0 : (this.needsClick(l) || (t.preventDefault(), this.sendClick(l, t)), !1)
	}, t.prototype.onTouchCancel = function() {
		this.trackingClick = !1, this.targetElement = null
	}, t.prototype.onMouse = function(t) {
		return this.targetElement ? t.forwardedTouchEvent ? !0 : t.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick) ? (t.stopImmediatePropagation ? t.stopImmediatePropagation() : t.propagationStopped = !0, t.stopPropagation(), t.preventDefault(), !1) : !0 : !0
	}, t.prototype.onClick = function(t) {
		var e;
		return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === t.target.type && 0 === t.detail ? !0 : (e = this.onMouse(t), e || (this.targetElement = null), e)
	}, t.prototype.destroy = function() {
		var t = this.layer;
		i && (t.removeEventListener("mouseover", this.onMouse, !0), t.removeEventListener("mousedown", this.onMouse, !0), t.removeEventListener("mouseup", this.onMouse, !0)), t.removeEventListener("click", this.onClick, !0), t.removeEventListener("touchstart", this.onTouchStart, !1), t.removeEventListener("touchmove", this.onTouchMove, !1), t.removeEventListener("touchend", this.onTouchEnd, !1), t.removeEventListener("touchcancel", this.onTouchCancel, !1)
	}, t.notNeeded = function(t) {
		var e, n, r, o;
		if ("undefined" == typeof window.ontouchstart) return !0;
		if (n = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
			if (!i) return !0;
			if (e = document.querySelector("meta[name=viewport]")) {
				if (-1 !== e.content.indexOf("user-scalable=no")) return !0;
				if (n > 31 && document.documentElement.scrollWidth <= window.outerWidth) return !0
			}
		}
		if (s && (r = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/), r[1] >= 10 && r[2] >= 3 && (e = document.querySelector("meta[name=viewport]")))) {
			if (-1 !== e.content.indexOf("user-scalable=no")) return !0;
			if (document.documentElement.scrollWidth <= window.outerWidth) return !0
		}
		return "none" === t.style.msTouchAction || "manipulation" === t.style.touchAction ? !0 : (o = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1], o >= 27 && (e = document.querySelector("meta[name=viewport]"), e && (-1 !== e.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth)) ? !0 : "none" === t.style.touchAction || "manipulation" === t.style.touchAction ? !0 : !1)
	}, t.attach = function(e, i) {
		return new t(e, i)
	}, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() {
		return t
	}) : "undefined" != typeof module && module.exports ? (module.exports = t.attach, module.exports.FastClick = t) : window.FastClick = t
}();
var Maths;
String.prototype.toTitleCase = function() {
	return this.replace(/\w\S*/g, function(t) {
		return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase()
	})
}, String.prototype.contains = function(t) {
	return -1 !== this.indexOf(t)
}, Maths = {
	clamp: function(t, e, i) {
		return null == e && (e = 0), null == i && (i = 1), t > i ? i : e > t ? e : t
	},
	normalizeFromRange: function(t, e, i) {
		return (t - e) / (i - e)
	},
	mapToRange: function(t, e, i) {
		return e + (i - e) * t
	}
};
var Editor, GrayscaleContrastFilter;
Editor = function() {
	function t(t, i) {
		var r, o, s;
		this.photoAdded = !1, this.values = {
			photo: 0,
			contrast: .25,
			invert: 0
		}, this.canvas = new fabric.Canvas(t.get(0)), this.canvas.selection = !1, this.canvasUpdateFunction = function(t) {
			return function() {
				return t.canvas.renderAll()
			}
		}(this), this.cityText = "", this.controls = i, o = this, $("body").hasClass("lang-cs") && (n = "cs"), $("body").hasClass("lang-ct") && (n = "ct"), $("body").hasClass("lang-de") && (n = "de"), $("body").hasClass("lang-ja") && (n = "ja"), $("body").hasClass("lang-fr") && (n = "fr"), (null != (r = window.location.search) ? r.indexOf("skip=1") : void 0) > -1 ? ($("#slides").hide(), this.logActionToAnalytics("restart"), e = [" "]) : $("#slides").show(), i.find(".download").click(function(t) {
			return function() {
				return t.downloadLocal()
			}
		}(this)), i.find(".restart").click(function(t) {
			return function() {
				return location.href = "/?skip=1"
			}
		}(this)), i.find(".donthave").click(function(t) {
			return function() {
				return $(".donthave").hide(), t.setMode("nophoto").done(function() {})
			}
		}(this)), i.find(".share").click(function(t) {
			return function() {
				return t.share()
			}
		}(this)), $(".upload").click(function(t) {
			var e;
			return e = $("input[type=file]"), $("html").is(".ios") ? e.trigger(t).click() : e.click()
		}), i.find("input[type=file]").change(function() {
			return o.setPhoto.call(o, this.files[0])
		}), i.find("form.editor-invert-control").change(function() {
			return o.setValue.call(o, parseInt($(this).find(":checked").val()))
		}), this.controlsRadios = i.find(".editor-types input[type=radio]").change(function() {
			return o.setParameter.call(o, $(this).val())
		}), s = $(".editor-range-control .range")[0], noUiSlider.create(s, {
			start: 0,
			range: {
				min: 0,
				max: 1
			},
			connect: "lower"
		}), this.controlsRange = s.noUiSlider, this.controlsRange.on("change", function(t) {
			return o.setValue.call(o, parseFloat(t[0]), "change")
		}), this.controlsRange.on("update", function(t) {
			return o.setValue.call(o, parseFloat(t[0]), "update")
		}), this.initializeTextMode(), this.setMode("intro")
	}
	var e, i, n;
	return e = ["INGLEWOOD", "BROOKLYN", "COLLEGE PARK", "COMPTON"], $("body").hasClass("lang-cs") && (e = ["BEIJING", "KAIFENG", "ZUNYI"], $(".slide4").remove(), $(".slide5").remove()), $("body").hasClass("lang-ja") && (e = ["NAGOYA", "OKAYAMA", "YOKOHAMA"], $(".slide4").remove(), $(".slide5").remove()), i = /fuck|fcking|nigger|nigga|asshole|cocksucker|blowjob|clit|gangbang|wetback|faggot/i, n = "en", t.prototype.initializeTextMode = function(t) {
		var n, r, o, s;
		if (null == this.logoText) return o = new fabric.Pattern({
			source: document.getElementById("img-pattern-grime"),
			repeat: "repeat"
		}), this.logoFrame = new fabric.Image(document.getElementById("img-logo-frame"), {
			selectable: !1,
			evented: !1
		}), this.canvas.add(this.logoFrame), this.logoFrame.scaleToHeight(this.canvas.height), this.logoFrame.center(), s = 556, r = 300, n = "knockout", this.logoText = new fabric.IText(e[0], {
			originX: "center",
			textAlign: "center",
			fill: o,
			left: this.canvas.width / 2,
			top: s,
			lineHeight: 1,
			fontSize: r,
			fontFamily: n,
			editable: !1,
			cursorWidth: 8,
			cursorColor: "#ed1c24",
			hoverCursor: "text",
			hasBorders: !1,
			hasControls: !1,
			hasRotatingPoint: !1,
			lockMovementX: !0,
			lockMovementY: !0,
			lockRotation: !0,
			lockScalingX: !0,
			lockScalingY: !0,
			selectionColor: "rgba(255,255,255,0.9)",
			caching: !1,
			width: 740,
			fixedLineWidth: 740,
			multiline: !1,
			capitalize: !0,
			cursorHeightPercent: .7,
			cursorDeltaX: 0,
			cursorDeltaY: -12,
			maxLength: 15
		}), this.canvas.add(this.logoText), this.logoText.on("changed", function(t) {
			return function(e) {
				var n, r;
				return n = t.logoText.text, "" !== n ? ($(".upload").addClass("showanimation"), $(".donthave").animate({
					opacity: 1
				}, function(t) {})) : ($(".upload").removeClass("showanimation"), $(".donthave").animate({
					opacity: 0
				})), r = n.replace(/\s+/g, ""), i.test(r) ? t.typeTextClear() : (window.reactToKeypress(n.length < t.cityText.length), t.cityText = n)
			}
		}(this)), this.canvas.on("selection:cleared", function(t) {
			return function() {
				return t.focusTextField()
			}
		}(this)), this.focusTextField(), null != t ? t.resolve() : void 0
	}, t.prototype.initializePhotoMode = function(t, e) {
		return null == t && (t = null), null == e && (e = !0), null == this.logo ? (this.canvas.off("selection:cleared"), this.logoText.off("editing:exited"), this.logoText.off("changed"), this.logoText.exitEditing(), this.canvas.discardActiveObject(), this.watermark = new fabric.Image(document.getElementById("img-beats-watermark"), {
			originX: "center",
			originY: "center",
			selectable: !1,
			evented: !1,
			left: this.canvas.width / 2,
			top: .9 * this.canvas.height
		}), fabric.util.loadImage(this.canvas.toDataURL(), function(i) {
			return function(n) {
				var r, o, s, a;
				return i.canvas.remove(i.logoText), i.canvas.remove(i.logoFrame), i.logo = new fabric.Image(n), i.logo.set({
					selectable: !1,
					evented: !1,
					originX: "center",
					originY: "center",
					left: i.canvas.width / 2,
					top: i.canvas.height / 2
				}), i.canvas.add(i.logo), i.photo = new fabric.Image(document.getElementById("img-bg"), {
					selectable: !1,
					evented: !1,
					width: i.canvas.width,
					height: i.canvas.height
				}), i.canvas.insertAt(i.photo, 0), r = 2e3, i.photoAdded ? (s = .4, a = .64 * i.canvas.height) : (s = .6, a = 410), e ? (o = {
					duration: r,
					easing: fabric.util.ease.easeOutExpo
				}, i.logo.animate("scaleX", s, o), i.logo.animate("scaleY", s, o), i.logo.animate("top", a, o)) : (i.logo.set({
					scaleX: s,
					scaleY: s,
					top: a
				}), i.canvas.renderAll()), i.photoAdded ? (s = .7, a = .92 * i.canvas.height) : (s = 1, a = .9 * i.canvas.height), e ? (o = {
					duration: r,
					easing: fabric.util.ease.easeOutExpo
				}, i.watermark.animate("scaleX", s, o), i.watermark.animate("scaleY", s, o), o.onChange = function() {
					return i.canvas.renderAll()
				}, i.watermark.animate("top", a, o)) : (i.watermark.set({
					scaleX: s,
					scaleY: s,
					top: a
				}), i.canvas.renderAll()), i.canvas.backgroundColor = "black", i.canvas.add(i.watermark), null != t ? t.resolve() : void 0
			}
		}(this))) : void 0
	}, t.prototype.initializeIntroMode = function(t) {
		return this.typeTextSeries(e).always(function(t) {
			return function() {
				return $("#slides").delay(100).fadeOut(600, function() {
					return $(this).remove()
				}), t.setMode("text").done(function() {
					return t.logoText.setText(""), t.logoText.set({
						editable: !0
					}), t.focusTextField()
				})
			}
		}(this)), null != t ? t.resolve() : void 0
	}, t.prototype.fixOrderingOnLoad = function() {
		return this.canvas.discardActiveObject(), null != this.photo && this.canvas.sendToBack(this.photo), null != this.logo && this.canvas.bringToFront(this.logo), null != this.watermark ? this.canvas.bringToFront(this.watermark) : void 0
	}, t.prototype.finalizeForDoneMode = function(t) {
		var e;
		return e = $.Deferred(), e.always(function(e) {
			return function() {
				var i, n, r, o;
				for (e.canvas.discardActiveObject(), o = [e.photo, e.logo, e.logoText], i = 0, n = o.length; n > i; i++) r = o[i], null != r && r.set({
					selectable: !1,
					evented: !1,
					editable: !1
				});
				return e.canvas.renderAll(), null != t ? t.resolve() : void 0
			}
		}(this)), "photo" !== this.mode ? this.initializePhotoMode(e, !1) : e.resolve(), t
	}, t.prototype.setMode = function(t) {
		var e, i;
		switch (e = new $.Deferred, i = this.mode, "intro" !== t && ($("#bottom").show(), $("#down").show(), $("#legal").show()), t) {
			case "nophoto":
				this.finalizeForDoneMode(e);
				break;
			case "intro":
				this.initializeIntroMode(e);
				break;
			case "photo":
				this.initializePhotoMode(e);
				break;
			case "done":
				this.finalizeForDoneMode(e);
				break;
			default:
				e.resolve()
		}
		return window.setTimeout(function() {
			return $(".editor").removeClass().addClass("editor mode-" + t)
		}, 1e3), this.mode = t, e
	}, t.prototype.focusTextField = function() {
		var t, e;
		return "i-text" === (null != (t = this.canvas.getActiveObject()) ? t.type : void 0) && (null != (e = this.logoText) ? e.isEditing : void 0) ? $("textarea").trigger("focus") : (this.canvas.setActiveObject(this.logoText), this.logoText.enterEditing())
	}, t.prototype.typeTextSeries = function(t) {
		return this.typeTextSeriesDeferred = $.Deferred(), this.typeTextSeriesArray = t, this.typeTextSeriesNext(!0), this.typeTextSeriesDeferred
	}, t.prototype.typeTextSeriesNext = function(t) {
		var e, i;
		if (!this.typeTextCanceling) return i = this.typeTextSeriesArray.shift(), e = 500, null != i ? window.setTimeout(function(e) {
			return function() {
				var n;
				return t || (n = $("#slides .slide").first(), n.fadeOut(200, function() {
					return $(this).remove()
				})), e.typeTextImmediate(i).done(e.typeTextSeriesNext.bind(e))
			}
		}(this), e) : window.setTimeout(function(t) {
			return function() {
				return t.typeTextSeriesDeferred.resolve()
			}
		}(this), e)
	}, t.prototype.typeTextClear = function() {
		return this.logoText.isEditing && this.logoText.exitEditing(), this.logoText.setSelectionStart(0), this.logoText.setSelectionEnd(0), this.logoText.setText(""), this.logoText._clearCache(), this.logoText.enterEditing(), this.canvasUpdateFunction()
	}, t.prototype.typeTextImmediate = function(t) {
		return this.typeTextDeferred = $.Deferred(), this.logoText.setText(t), this.canvas.renderAll(), this.typeTextDeferred.resolve()
	}, t.prototype.typeText = function(t) {
		return null != this.logoText && (this.typeTextDeferred = $.Deferred()) ? (this.typeTextClear(), this.autoTypeChars = t.split(""), this.typeTextQueueUpdate(), this.typeTextDeferred) : void 0
	}, t.prototype.typeTextStop = function() {
		var t, e;
		return this.typeTextCanceling = !0, window.clearTimeout(this.interval), this.typeTextClear(), this.canvas.renderAll(), null != (t = this.typeTextDeferred) && t.reject(), null != (e = this.typeTextSeriesDeferred) ? e.reject() : void 0
	}, t.prototype.typeTextQueueUpdate = function() {
		var t;
		return t = 10 + 20 * Math.random(), this.interval = window.setTimeout(this.typeTextUpdate.bind(this), t)
	}, t.prototype.typeTextUpdate = function() {
		var t;
		if (!this.typeTextCanceling) return t = this.autoTypeChars.shift(), null == t || null == this.logoText ? this.typeTextDeferred.resolve() : (this.logoText.insertChar(t), this.typeTextQueueUpdate())
	}, t.prototype.captureImageDeferred = function(t, e) {
		var i, n, r;
		return null == t && (t = "image/jpeg"), null == e && (e = .8), n = this.canvas.backgroundColor, this.canvas.backgroundColor = "black", this.canvas.discardActiveObject(), this.canvas.renderAll(), i = $.Deferred(), r = function(t) {
			return function(e) {
				return t.canvas.backgroundColor = n, i.resolve(e)
			}
		}(this), this.canvas.lowerCanvasEl.toBlob(r, t, e), i
	}, t.prototype.logActionToAnalytics = function(t) {
		return "function" == typeof ga ? ga("send", "event", "action", t) : void 0
	}, t.prototype.downloadLocal = function() {
		return this.logActionToAnalytics("download"), $(".editor-image-controls").slideUp(), this.captureImageDeferred().done(function(t) {
			return saveAs(t, "StraightOuttaSomewhere.jpg")
		})
	}, t.prototype.share = function() {
		var t;
		if (!this.isSharingBusy) return this.isSharingBusy = !0, $(".editor-image-controls").slideUp(), this.logActionToAnalytics("share"), null != this.permalink ? this.popupSharing() : (t = this.getLoader(), this.captureImageDeferred().done(function(e) {
			return function(i) {
				var r;
				return e.cityText = e.cityText.toTitleCase(), r = new Uploader(i, e.cityText), r.start().done(function(i) {
					var r, o, s, a, c, h, l;
					return t.resolve(), "en" === n ? e.permalink = window.location.origin + i : e.permalink = window.location.origin + i + "/" + n, console.log("Ready to share!", e.permalink), o = $("#share-popup-src").addClass("ready"), a = e.cityText, s = o.find("a.twitter"), "en" === n && (h = "I'm #StraightOutta {CITY}. Where you from? #BeatsByDre"), ("uk" === n || "en_gb" === n) && (h = "I'm #StraightOutta {CITY}. Where you from? #BeatsByDreUK"), "de" === n && (h = "I'm #StraightOutta {CITY}. Where you from? #BeatsByDreDE"), "fr" === n && (h = "I'm #StraightOutta {CITY}. Where you from? #BeatsByDreFR"), "ct" === n && (h = "未來有無限可能，但我們都有一個不變的起點！我是#StraightOutta {CITY}，你來自哪裡？@BeatsbyDre"), "cs" === n && (h = "未来有无限可能，但我们都有一个不变的起点！我是#StraightOutta {CITY}，你来自哪里？ @BeatsbyDre"), "ja" === n && (h = "やっぱり {CITY} 最高！だから #StraightOutta で地元をレペゼン。みんなはどこ出身？#BeatsbyDre"), h = encodeURIComponent(h.replace("{CITY}", a)), l = "https://twitter.com/intent/tweet?text=" + h + "&url=" + encodeURI(e.permalink), s.attr({
						href: l
					}), s.click(function() {
						return e.logActionToAnalytics("share_twitter")
					}), r = o.find("a.facebook"), c = window.location.origin + "/close.html", l = "https://www.facebook.com/dialog/share?app_id=415295758676714&display=popup&href=" + encodeURI(e.permalink) + "&redirect_uri=" + encodeURI(c), r.attr({
						href: l
					}), r.click(function() {
						return e.logActionToAnalytics("share_facebook")
					}), e.popupSharing()
				})
			}
		}(this)))
	}, t.prototype.popupSharing = function() {
		return $.featherlight($("#share-popup-src"), {
			variant: "featherlight-share",
			afterOpen: function() {
				return $(".share-popup").find("a").click(function(t) {
					var e, i, n;
					return t.preventDefault(), e = $(this), n = e.data("popwidth"), i = e.data("popheight"), window.open($(this).attr("href"), "share", "width=" + n + ",height=" + i + ",centerscreen=true")
				})
			},
			afterClose: function(t) {
				return function() {
					return t.isSharingBusy = !1
				}
			}(this)
		})
	}, t.prototype.setPhoto = function(t) {
		var e, i;
		if (null != t) return this.logActionToAnalytics("add-photo"), e = this.getLoader(), i = new FileReader, i.onload = function(i) {
			return function(n) {
				var r, o, s, a, c;
				if (s = new Image, o = n.target.result, s.src = o, r = s.width / s.height, s.width === (c = s.height) && 0 === c) return e.reject(), console.error("Load fail. Retrying."), void window.setTimeout(i.setPhoto.call(i, t), 1e3);
				try {
					a = i.dataUrlToBinary(o, 65568)
				} catch (h) {
					n = h, console.error(n)
				}
				return i.photoAdded = !0, i.setMode("photo").done(function() {
					return i.downscalePhotoIfNeededDeferred(s).done(function(t) {
						return null != i.photo && (i.photo.off("selected"), i.photo.off("moving"), i.canvas.remove(i.photo)), i.photo = t, i.photo.set({
							selectable: !0,
							originX: "center",
							originY: "center",
							centeredScaling: !0,
							hasRotatingPoint: !1,
							lockRotation: !0,
							lockScalingFlip: !0,
							lockUniScaling: !0,
							lockMovementX: !1,
							lockMovementY: !1,
							lockScalingX: !0,
							lockScalingY: !0,
							hasBorders: !1,
							hasControls: !1,
							width: i.canvas.width,
							height: i.canvas.height,
							padding: 0
						}), r > 1 ? i.photo.width = i.canvas.width * r : i.photo.height = i.canvas.height / r, i.photo.filters.push(new GrayscaleContrastFilter({
							contrast: i.values.contrast
						})), i.photo.applyFilters(function() {
							return i.canvas.insertAt(i.photo, 0), i.photo.center(), i.photo.on("selected", function() {
								return i.setParameter("photo", !0)
							}), i.photo.on("moving", function() {
								return i.constrainPhotoMove()
							}), i.setParameter("photo", !0), e.resolve()
						}), null != a ? inkjet.exif(a, function(t, e) {
							if (null != (null != e ? e.Orientation : void 0)) {
								switch (e.Orientation.value) {
									case 8:
										i.photo.setAngle(-90);
										break;
									case 3:
										i.photo.setAngle(-180);
										break;
									case 6:
										i.photo.setAngle(90)
								}
								if (0 !== i.photo.angle) return i.canvas.renderAll()
							}
						}) : void 0
					})
				})
			}
		}(this), i.readAsDataURL(t)
	}, t.prototype.dataUrlToBinary = function(t, e) {
		var i, n, r, o, s, a, c, h, l, u;
		for (i = ";base64,", c = t.split(i), n = c[1], e > 0 && (u = 4 * Math.ceil(4 * e / 3 / 4), n = n.substr(0, u)), h = window.atob(n), a = h.length, r = new Uint8Array(a), o = s = 0, l = a; l >= 0 ? l >= s : s >= l; o = l >= 0 ? ++s : --s) r[o] = h.charCodeAt(o);
		return r
	}, t.prototype.downscalePhotoIfNeededDeferred = function(t) {
		var e, i, n, r, o, s, a;
		return s = $.Deferred(), i = 1, n = this.canvas.width * i, e = this.canvas.height * i, r = t.width / t.height, t.width > n && t.height > e ? (console.warn("Scaling down image"), a = document.createElement("canvas"), a.width = n, a.height = e, r > 1 ? a.width = n * r : a.heigth = e / r, o = a.getContext("2d"), o.drawImage(t, 0, 0, a.width, a.height), fabric.Image.fromURL(a.toDataURL(), function(t) {
			return function(t) {
				return s.resolve(t)
			}
		}(this))) : s.resolve(new fabric.Image(t)), s
	}, t.prototype.setParameter = function(t, e) {
		return null == e && (e = !1), e && this.parameter !== t && $("#control-" + t).click(), this.controls.removeClass().addClass("editor-controls").addClass(t), this.parameter = t, this.controlsRange.set(this.values[this.parameter]), e ? void 0 : "photo" === this.parameter && null != this.photo ? this.canvas.setActiveObject(this.photo) : this.canvas.discardActiveObject()
	}, t.prototype.setValue = function(t, e) {
		var i, n, r, o;
		switch (this.values[this.parameter] = t, this.parameter) {
			case "photo":
				null != (i = this.photo) && i.scale(t + 1), this.constrainPhotoMove();
				break;
			case "contrast":
				"update" !== e && (null != (n = this.photo) && null != (r = n.filters[0]) && (r.contrast = t), null != (o = this.photo) && o.applyFilters(function(t) {
					return function() {
						return t.canvas.renderAll()
					}
				}(this)));
				break;
			case "invert":
				0 >= t ? this.logo.filters = this.watermark.filters = [] : 0 === this.logo.filters.length && (this.logo.filters = this.watermark.filters = [new fabric.Image.filters.Invert]), this.watermark.applyFilters(function(t) {
					return function() {
						return t.logo.applyFilters(function() {
							return t.canvas.renderAll()
						})
					}
				}(this))
		}
		return this.canvas.renderAll()
	}, t.prototype.constrainPhotoMove = function() {
		var t;
		return this.photo.setCoords(), t = this.photo.getBoundingRect(), this.photo.setLeft(Math.min(0, Math.max(this.canvas.width - t.width, t.left)) + t.width / 2), this.photo.setTop(Math.min(0, Math.max(this.canvas.height - t.height, t.top)) + t.height / 2)
	}, t.prototype.getLoader = function() {
		var t;
		return $("#loader").show(), t = $.Deferred(), t.always(function() {
			return $("#loader").hide()
		}), t
	}, t
}(), GrayscaleContrastFilter = fabric.util.createClass(fabric.Image.filters.BaseFilter, {
	type: "Contrast",
	initialize: function(t) {
		return t = t || {}, this.contrast = t.contrast || 0
	},
	applyTo: function(t) {
		var e, i, n, r, o, s, a, c, h;
		for (i = t.getContext("2d"), s = i.getImageData(0, 0, t.width, t.height), n = .5 + 2 * this.contrast, r = s.data, c = a = 0, h = r.length / 4; h >= 0 ? h >= a : a >= h; c = h >= 0 ? ++a : --a) o = 4 * c, e = (r[o] + r[o + 1] + r[o + 2]) / 3, e = (e - 128) * n + 128, r[o] = r[o + 1] = r[o + 2] = e;
		return i.putImageData(s, 0, 0)
	},
	toObject: function() {
		return extend(this.callSuper("toObject"), {
			contrast: this.contrast
		})
	}
}), GrayscaleContrastFilter.fromObject = function(t) {
	return new GrayscaleContrastFilter(t)
}, $(window).load(function() {
	return Editor._instance = new Editor($("#canvas"), $(".editor-controls"))
});
var S3Upload, Uploader;
Uploader = function() {
	function t(t, e) {
		null == e && (e = "Compton"), this.blob = t, this.city = e, this.guid = this.getGuid(), this.filetype = "image/jpg", this.filename = this.guid + ".jpg", this.imageUrl = null, this.shareUrl = null
	}
	return t.prototype.start = function() {
		return this.allTasks = $.Deferred(), this.saveImage(), this.allTasks
	}, t.prototype.saveImage = function() {
		var t;
		return t = new S3Upload({
			s3_object_name: this.filename,
			s3_sign_put_url: "/upload/sign_s3"
		}), t.onFinishS3Put = function(t) {
			return function(e) {
				return t.imageUrl = e, t.saveEntry()
			}
		}(this), t.uploadFile(this.blob)
	}, t.prototype.saveEntry = function() {
		var t;
		return t = {
			id: this.guid,
			url: this.imageUrl,
			city: this.city
		}, $.post("/upload/save", t, function(t) {
			return function(e) {
				return t.shareUrl = "/s/" + e, t.allTasks.resolve(t.shareUrl)
			}
		}(this))
	}, t.prototype.getGuid = function() {
		var t;
		return t = function() {
			return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
		}, t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t()
	}, t
}(), S3Upload = function() {
	function t(t) {
		var e;
		null == t && (t = {});
		for (e in t) this[e] = t[e];
		null != this.file_dom_selector && this.handleFileSelect(document.getElementById(this.file_dom_selector))
	}
	return t.prototype.s3_object_name = "default_name", t.prototype.s3_sign_put_url = "/signS3put", t.prototype.file_dom_selector = null, t.prototype.with_credentials = !1, t.prototype.onFinishS3Put = function(t) {
		return console.log("base.onFinishS3Put()", t)
	}, t.prototype.onProgress = function(t, e) {
		return console.log("base.onProgress()", t, e);
	}, t.prototype.onError = function(t) {
		return console.log("base.onError()", t)
	}, t.prototype.handleFileSelect = function(t) {
		var e, i, n, r, o;
		for (this.onProgress(0, "Upload started."), i = t.files, o = [], n = 0, r = i.length; r > n; n++) e = i[n], o.push(this.uploadFile(e));
		return o
	}, t.prototype.createCORSRequest = function(t, e) {
		var i;
		return i = new XMLHttpRequest, null != i.withCredentials ? i.open(t, e, !0) : "undefined" != typeof XDomainRequest ? (i = new XDomainRequest, i.open(t, e)) : i = null, i
	}, t.prototype.executeOnSignedUrl = function(t, e) {
		var i, n;
		return i = this, n = new XMLHttpRequest, n.withCredentials = this.with_credentials, n.open("GET", this.s3_sign_put_url + "?s3_object_type=" + t.type + "&s3_object_name=" + this.s3_object_name, !0), n.overrideMimeType("text/plain; charset=x-user-defined"), n.onreadystatechange = function(t) {
			var n, r;
			if (4 === this.readyState && 200 === this.status) {
				try {
					r = JSON.parse(this.responseText)
				} catch (o) {
					return n = o, i.onError('Signing server returned some ugly/empty JSON: "' + this.responseText + '"'), !1
				}
				return e(r.signed_request, r.url)
			}
			return 4 === this.readyState && 200 !== this.status ? i.onError("Could not contact request signing server. Status = " + this.status) : void 0
		}, n.send()
	}, t.prototype.uploadToS3 = function(t, e, i) {
		var n, r;
		return n = this, r = this.createCORSRequest("PUT", e), r ? (r.onload = function() {
			return 200 === r.status ? (n.onProgress(100, "Upload completed."), n.onFinishS3Put(i)) : n.onError("Upload error: " + r.status)
		}, r.onerror = function() {
			return n.onError("XHR error.")
		}, r.upload.onprogress = function(t) {
			var e;
			return t.lengthComputable ? (e = Math.round(t.loaded / t.total * 100), n.onProgress(e, 100 === e ? "Finalizing." : "Uploading.")) : void 0
		}) : this.onError("CORS not supported"), r.setRequestHeader("Content-Type", t.type), r.setRequestHeader("x-amz-acl", "public-read"), r.send(t)
	}, t.prototype.uploadFile = function(t) {
		var e;
		return e = this, this.executeOnSignedUrl(t, function(i, n) {
			return e.uploadToS3(t, i, n)
		})
	}, t
}();
var WW, WH, currentBG = 1,
	intro = !0,
	soundOn = !0,
	currentSound = 1,
	numSounds = 6,
	mySound1, mySound2, mySound3, mySound4, mySound5, mySound6;
$(document).ready(function() {
	/iPad|iPhone|iPod/.test(navigator.userAgent) && $("html").addClass("ios"), FastClick.attach(document.body), editorFunctions(), initSounds(), resizeMe(), $(window).on("resize", resizeMe)
});
var hostname = window.location.hostname;
jQuery("#bottom a").click(function(t) {
	-1 == jQuery(this).attr("href").indexOf(hostname) && ga("send", "event", {
		eventCategory: "Outbound Links",
		eventAction: "OnClick",
		eventLabel: jQuery(this).attr("href")
	})
});
