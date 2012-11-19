/**
 * Modified version of Douglas Crockford"s json.js that doesn"t
 * mess with the Object prototype
 * http://www.json.org/js.html
 *
 * @class
 *
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.common.JSON = new (function () {
	var useHasOwn = !!{}.hasOwnProperty,
		USE_NATIVE_JSON = false,
		isNative = (function () {
			var useNative = null;

			return function () {
				if (useNative === null) {
					useNative = USE_NATIVE_JSON && window.JSON && JSON.toString() === '[object JSON]';
				}

				return useNative;
			};
		}()),
		m = {
			"\b": '\\b',
			"\t": '\\t',
			"\n": '\\n',
			"\f": '\\f',
			"\r": '\\r',
			'"' : '\\"',
			"\\": '\\\\'
		},
		pad = function (n) {
			return n < 10 ? "0" + n : n;
		},
		doDecode = function (json) {
			return eval("(" + json + ')');
		},
		encodeString = function (s) {
			if (/["\\\x00-\x1f]/.test(s)) {
				return '"' + s.replace(/([\x00-\x1f\\"])/g, function (a, b) {
					var c = m[b];
					if (c) {
						return c;
					}
					c = b.charCodeAt();
					return "\\u00" +
						Math.floor(c / 16).toString(16) +
						(c % 16).toString(16);
				}) + '"';
			}
			return '"' + s + '"';
		},
		encodeArray = function (o) {
			var a = ["["], b, i, l = o.length, v;
			for (i = 0; i < l; i += 1) {
				v = o[i];
				switch (typeof v) {
				case "undefined":
				case "function":
				case "unknown":
					break;
				default:
					if (b) {
						a.push(',');
					}
					a.push(v === null ? "null" : OG.common.JSON.encode(v));
					b = true;
				}
			}
			a.push("]");
			return a.join("");
		},
		doEncode = function (o) {
			if (!OG.Util.isDefined(o) || o === null) {
				return "null";
			} else if (OG.Util.isArray(o)) {
				return encodeArray(o);
			} else if (OG.Util.isDate(o)) {
				return OG.common.JSON.encodeDate(o);
			} else if (OG.Util.isString(o)) {
				return encodeString(o);
			} else if (typeof o === "number") {
				//don't use isNumber here, since finite checks happen inside isNumber
				return isFinite(o) ? String(o) : "null";
			} else if (OG.Util.isBoolean(o)) {
				return String(o);
			} else {
				var a = ["{"], b, i, v;
				for (i in o) {
					// don't encode DOM objects
					if (!o.getElementsByTagName) {
						if (!useHasOwn || o.hasOwnProperty(i)) {
							v = o[i];
							switch (typeof v) {
							case "undefined":
							case "function":
							case "unknown":
								break;
							default:
								if (b) {
									a.push(',');
								}
								a.push(doEncode(i), ":",
									v === null ? "null" : doEncode(v));
								b = true;
							}
						}
					}
				}
				a.push("}");
				return a.join("");
			}
		};

	/**
	 * <p>Encodes a Date. This returns the actual string which is inserted into the JSON string as the literal expression.
	 * <b>The returned value includes enclosing double quotation marks.</b></p>
	 * <p>The default return format is "yyyy-mm-ddThh:mm:ss".</p>
	 * <p>To override this:</p><pre><code>
	 OG.common.JSON.encodeDate = function(d) {
	 return d.format('"Y-m-d"');
	 };
	 </code></pre>
	 * @param {Date} d The Date to encode
	 * @return {String} The string literal to use in a JSON string.
	 */
	this.encodeDate = function (o) {
		return '"' + o.getFullYear() + "-" +
			pad(o.getMonth() + 1) + "-" +
			pad(o.getDate()) + "T" +
			pad(o.getHours()) + ":" +
			pad(o.getMinutes()) + ":" +
			pad(o.getSeconds()) + '"';
	};

	/**
	 * Encodes an Object, Array or other value
	 * @param {Mixed} o The variable to encode
	 * @return {String} The JSON string
	 */
	this.encode = (function () {
		var ec;
		return function (o) {
			if (!ec) {
				// setup encoding function on first access
				ec = isNative() ? JSON.stringify : doEncode;
			}
			return ec(o);
		};
	}());


	/**
	 * Decodes (parses) a JSON string to an object. If the JSON is invalid, this function throws a SyntaxError unless the safe option is set.
	 * @param {String} json The JSON string
	 * @return {Object} The resulting object
	 */
	this.decode = (function () {
		var dc;
		return function (json) {
			if (!dc) {
				// setup decoding function on first access
				dc = isNative() ? JSON.parse : doDecode;
			}
			return dc(json);
		};
	}());

})();
OG.JSON = OG.common.JSON;
