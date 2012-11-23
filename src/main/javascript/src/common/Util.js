/**
 * 공통 유틸리티 Javascript 클래스
 *
 * @class
 *
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.common.Util = {

	isEmpty    : function (v, allowBlank) {
		return v === null || v === undefined || ((OG.Util.isArray(v) && !v.length)) || (!allowBlank ? v === '' : false);
	},
	isArray    : function (v) {
		return Object.prototype.toString.apply(v) === '[object Array]';
	},
	isDate     : function (v) {
		return Object.prototype.toString.apply(v) === '[object Date]';
	},
	isObject   : function (v) {
		return !!v && Object.prototype.toString.call(v) === '[object Object]';
	},
	isPrimitive: function (v) {
		return OG.Util.isString(v) || OG.Util.isNumber(v) || OG.Util.isBoolean(v);
	},
	isFunction : function (v) {
		return Object.prototype.toString.apply(v) === '[object Function]';
	},
	isNumber   : function (v) {
		return typeof v === 'number' && isFinite(v);
	},
	isString   : function (v) {
		return typeof v === 'string';
	},
	isBoolean  : function (v) {
		return typeof v === 'boolean';
	},
	isElement  : function (v) {
		return !!v && v.tagName ? true : false;
	},
	isDefined  : function (v) {
		return typeof v !== 'undefined';
	},

	isWebKit : function () {
		return (/webkit/).test(navigator.userAgent.toLowerCase());
	},
	isGecko  : function () {
		return !OG.Util.isWebKit() && (/gecko/).test(navigator.userAgent.toLowerCase());
	},
	isOpera  : function () {
		return (/opera/).test(navigator.userAgent.toLowerCase());
	},
	isChrome : function () {
		return (/\bchrome\b/).test(navigator.userAgent.toLowerCase());
	},
	isSafari : function () {
		return !OG.Util.isChrome() && (/safari/).test(navigator.userAgent.toLowerCase());
	},
	isFirefox: function () {
		return (/firefox/).test(navigator.userAgent.toLowerCase());
	},
	isIE     : function () {
		return !OG.Util.isOpera() && (/msie/).test(navigator.userAgent.toLowerCase());
	},
	isIE6    : function () {
		return OG.Util.isIE() && (/msie 6/).test(navigator.userAgent.toLowerCase());
	},
	isIE7    : function () {
		return OG.Util.isIE() && ((/msie 7/).test(navigator.userAgent.toLowerCase()) || document.documentMode === 7);
	},
	isIE8    : function () {
		return OG.Util.isIE() && ((/msie 8/).test(navigator.userAgent.toLowerCase()) || document.documentMode === 8);
	},
	isIE9    : function () {
		return OG.Util.isIE() && ((/msie 9/).test(navigator.userAgent.toLowerCase()) || document.documentMode === 9);
	},
	isWindows: function () {
		return (/windows|win32/).test(navigator.userAgent.toLowerCase());
	},
	isMac    : function () {
		return (/macintosh|mac os x/).test(navigator.userAgent.toLowerCase());
	},
	isLinux  : function () {
		return (/linux/).test(navigator.userAgent.toLowerCase());
	},

	trim: function (string) {
		return string === null || string === undefined ?
			string :
			string.replace(/^[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+|[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+$/g, "");
	},

	/**
	 * Object 를 복사한다.
	 *
	 * @param {Object} obj 복사할 Object
	 * @return {Object} 복사된 Object
	 * @static
	 */
	clone: function (obj) {
		if (obj === null || obj === undefined) {
			return obj;
		}

		// DOM nodes
		if (obj.nodeType && obj.cloneNode) {
			return obj.cloneNode(true);
		}

		var i, j, k, clone, key,
			type = Object.prototype.toString.call(obj),
			enumerables = ["hasOwnProperty", "valueOf", "isPrototypeOf", "propertyIsEnumerable",
				"toLocaleString", "toString", "constructor"];

		// Date
		if (type === "[object Date]") {
			return new Date(obj.getTime());
		}

		// Array, Object
		if (type === "[object Array]") {
			i = obj.length;

			clone = [];

			while (i--) {
				clone[i] = this.clone(obj[i]);
			}
		} else if (type === "[object Object]" && obj.constructor === Object) {
			// TODO : 보완필요
			clone = {};

			for (key in obj) {
				clone[key] = this.clone(obj[key]);
			}

			if (enumerables) {
				for (j = enumerables.length; j--;) {
					k = enumerables[j];
					clone[k] = obj[k];
				}
			}
		}

		return clone || obj;
	},

	/**
	 * 디폴트로 지정된 소숫점 자리수로 Round 한 값을 반환한다.
	 *
	 * @param {Number} val 반올림할 값
	 * @return {Number} 지정한 소숫점 자리수에 따른 반올림 값
	 */
	round: function (val) {
		return this.roundPrecision(val, OG.Constants.NUM_PRECISION);
	},

	/**
	 * 입력된 숫자값을 지정된 소숫점 자릿수로 Round해서 값을 리턴한다.
	 * @example
	 * OG.Util.roundPrecision(300.12345678, 3);
	 * Result ) 300.123
	 *
	 * @param {Number} val 반올림할 값
	 * @param {Number} precision 소숫점 자리수
	 * @return {Number} 지정한 소숫점 자리수에 따른 반올림 값
	 */
	roundPrecision: function (val, precision) {
		var p = Math.pow(10, precision);
		return Math.round(val * p) / p;
	},

	/**
	 *  Shape Move & Resize 이동 간격으로 Round 한 값을 반환한다.
	 *
	 * @param {Number} val 반올림할 값
	 * @param {Number} snapSize 이동간격
	 * @return {Number} 지정한 간격으로 반올림 값
	 */
	roundGrid: function (val, snapSize) {
		snapSize = snapSize || OG.Constants.MOVE_SNAP_SIZE;
		return OG.Util.round(val / snapSize) * snapSize;
	},

	/**
	 * Copies all the properties of config to obj.
	 *
	 * @param {Object} obj The receiver of the properties
	 * @param {Object} config The source of the properties
	 * @param {Object} defaults A different object that will also be applied for default values
	 * @return {Object} returns obj
	 */
	apply: function (obj, config, defaults) {
		// no "this" reference for friendly out of scope calls
		var p;
		if (defaults) {
			this.apply(obj, defaults);
		}
		if (obj && config && typeof config === 'object') {
			for (p in config) {
				obj[p] = config[p];
			}
		}
		return obj;
	},

	/**
	 * <p>Extends one class to create a subclass and optionally overrides members with the passed literal. This method
	 * also adds the function "override()" to the subclass that can be used to override members of the class.</p>
	 * For example, to create a subclass of Ext GridPanel:
	 * <pre><code>
	 MyGridPanel = Ext.extend(Ext.grid.GridPanel, {
	 constructor: function(config) {

	 //      Create configuration for this Grid.
	 var store = new Ext.data.Store({...});
	 var colModel = new Ext.grid.ColumnModel({...});

	 //      Create a new config object containing our computed properties
	 //      *plus* whatever was in the config parameter.
	 config = Ext.apply({
	 store: store,
	 colModel: colModel
	 }, config);

	 MyGridPanel.superclass.constructor.call(this, config);

	 //      Your postprocessing here
	 },

	 yourMethod: function() {
	 // etc.
	 }
	 });
	 </code></pre>
	 *
	 * <p>This function also supports a 3-argument call in which the subclass's constructor is
	 * passed as an argument. In this form, the parameters are as follows:</p>
	 * <div class="mdetail-params"><ul>
	 * <li><code>subclass</code> : Function <div class="sub-desc">The subclass constructor.</div></li>
	 * <li><code>superclass</code> : Function <div class="sub-desc">The constructor of class being extended</div></li>
	 * <li><code>overrides</code> : Object <div class="sub-desc">A literal with members which are copied into the subclass's
	 * prototype, and are therefore shared among all instances of the new class.</div></li>
	 * </ul></div>
	 *
	 * @param {Function} superclass The constructor of class being extended.
	 * @param {Object} overrides <p>A literal with members which are copied into the subclass's
	 * prototype, and are therefore shared between all instances of the new class.</p>
	 * <p>This may contain a special member named <tt><b>constructor</b></tt>. This is used
	 * to define the constructor of the new class, and is returned. If this property is
	 * <i>not</i> specified, a constructor is generated and returned which just calls the
	 * superclass's constructor passing on its parameters.</p>
	 * <p><b>It is essential that you call the superclass constructor in any provided constructor. See example code.</b></p>
	 * @return {Function} The subclass constructor from the <code>overrides</code> parameter, or a generated one if not provided.
	 */
	extend: (function () {
		// inline overrides
		var io = function (o) {
				var m;
				for (m in o) {
					this[m] = o[m];
				}
			},
			oc = Object.prototype.constructor;

		return function (sb, sp, overrides) {
			if (OG.Util.isObject(sp)) {
				overrides = sp;
				sp = sb;
				sb = overrides.constructor !== oc ? overrides.constructor : function () {
					sp.apply(this, arguments);
				};
			}
			var F = function () {
				},
				sbp,
				spp = sp.prototype;

			F.prototype = spp;
			sbp = sb.prototype = new F();
			sbp.constructor = sb;
			sb.superclass = spp;
			if (spp.constructor === oc) {
				spp.constructor = sp;
			}
			sb.override = function (o) {
				OG.Util.override(sb, o);
			};
			sbp.superclass = sbp.supr = (function () {
				return spp;
			}());
			sbp.override = io;
			OG.Util.override(sb, overrides);
			sb.extend = function (o) {
				return OG.Util.extend(sb, o);
			};
			return sb;
		};
	}()),

	/**
	 * Adds a list of functions to the prototype of an existing class, overwriting any existing methods with the same name.
	 * Usage:<pre><code>
	 Ext.override(MyClass, {
	 newMethod1: function(){
	 // etc.
	 },
	 newMethod2: function(foo){
	 // etc.
	 }
	 });
	 </code></pre>
	 * @param {Object} origclass The class to override
	 * @param {Object} overrides The list of functions to add to origClass.  This should be specified as an object literal
	 * containing one or more methods.
	 * @method override
	 */
	override: function (origclass, overrides) {
		if (overrides) {
			var p = origclass.prototype;
			OG.Util.apply(p, overrides);
			if ((/msie/).test(navigator.userAgent.toLowerCase()) && overrides.hasOwnProperty('toString')) {
				p.toString = overrides.toString;
			}
		}
	},

	xmlToJson: function (node) {
		var json = {},
			cloneNS = function (ns) {
				var nns = {};
				for (var n in ns) {
					if (ns.hasOwnProperty(n)) {
						nns[n] = ns[n];
					}
				}
				return nns;
			},
			process = function (node, obj, ns) {
				if (node.nodeType === 3) {
					if (!node.nodeValue.match(/[\S]+/)) return;
					if (obj["$"] instanceof Array) {
						obj["$"].push(node.nodeValue);
					} else if (obj["$"] instanceof Object) {
						obj["$"] = [obj["$"], node.nodeValue];
					} else {
						obj["$"] = node.nodeValue;
					}
				} else if (node.nodeType === 1) {
					var p = {};
					var nodeName = node.nodeName;
					for (var i = 0; node.attributes && i < node.attributes.length; i++) {
						var attr = node.attributes[i];
						var name = attr.nodeName;
						var value = attr.nodeValue;
						if (name === "xmlns") {
							ns["$"] = value;
						} else if (name.indexOf("xmlns:") === 0) {
							ns[name.substr(name.indexOf(":") + 1)] = value;
						} else {
							p["@" + name] = value;
						}
					}
					for (var prefix in ns) {
						if (ns.hasOwnProperty(prefix)) {
							p["@xmlns"] = p["@xmlns"] || {};
							p["@xmlns"][prefix] = ns[prefix];
						}
					}
					if (obj[nodeName] instanceof Array) {
						obj[nodeName].push(p);
					} else if (obj[nodeName] instanceof Object) {
						obj[nodeName] = [obj[nodeName], p];
					} else {
						obj[nodeName] = p;
					}
					for (var j = 0; j < node.childNodes.length; j++) {
						process(node.childNodes[j], p, cloneNS(ns));
					}
				} else if (node.nodeType === 9) {
					for (var k = 0; k < node.childNodes.length; k++) {
						process(node.childNodes[k], obj, cloneNS(ns));
					}
				}
			};
		process(node, json, {});
		return json;
	},

	jsonToXml: function (json) {
		if (typeof json !== "object") return null;
		var cloneNS = function (ns) {
			var nns = {};
			for (var n in ns) {
				if (ns.hasOwnProperty(n)) {
					nns[n] = ns[n];
				}
			}
			return nns;
		};

		var processLeaf = function (lname, child, ns) {
			var body = "";
			if (child instanceof Array) {
				for (var i = 0; i < child.length; i++) {
					body += processLeaf(lname, child[i], cloneNS(ns));
				}
				return body;
			} else if (typeof child === "object") {
				var el = "<" + lname;
				var attributes = "";
				var text = "";
				if (child["@xmlns"]) {
					var xmlns = child["@xmlns"];
					for (var prefix in xmlns) {
						if (xmlns.hasOwnProperty(prefix)) {
							if (prefix === "$") {
								if (ns[prefix] !== xmlns[prefix]) {
									attributes += " " + "xmlns=\"" + xmlns[prefix] + "\"";
									ns[prefix] = xmlns[prefix];
								}
							} else if (!ns[prefix] || (ns[prefix] !== xmlns[prefix])) {
								attributes += " xmlns:" + prefix + "=\"" + xmlns[prefix] + "\"";
								ns[prefix] = xmlns[prefix];
							}
						}
					}
				}
				for (var key in child) {
					if (child.hasOwnProperty(key) && key !== "@xmlns") {
						var obj = child[key];
						if (key === "$") {
							text += obj;
						} else if (key.indexOf("@") === 0) {
							attributes += " " + key.substring(1) + "=\"" + obj + "\"";
						} else {
							body += processLeaf(key, obj, cloneNS(ns));
						}
					}
				}
				body = text + body;
				return (body !== "") ? el + attributes + ">" + body + "</" + lname + ">" : el + attributes + "/>"
			}
		};
		for (var lname in json) {
			if (json.hasOwnProperty(lname) && lname.indexOf("@") == -1) {
				return '<?xml version="1.0" encoding="UTF-8"?>' + processLeaf(lname, json[lname], {});
			}
		}
		return null;
	},

	parseXML: function (xmlString) {
		var doc, parser;
		if (window.ActiveXObject) {
			doc = new ActiveXObject('Microsoft.XMLDOM');
			doc.async = 'false';
			doc.loadXML(xmlString);
		} else {
			parser = new DOMParser();
			doc = parser.parseFromString(xmlString, 'text/xml');
		}

		return doc;
	}
};
OG.Util = OG.common.Util;