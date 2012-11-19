
/** @namespace */
var OG = window.OG || {};

/** @namespace */
OG.common = {};

/** @namespace */
OG.geometry = {};

/** @namespace */
OG.graph = {};

/** @namespace */
OG.handler = {};

/** @namespace */
OG.layout = {};

/** @namespace */
OG.renderer = {};

/** @namespace */
OG.shape = {};

/** @namespace */
OG.shape.bpmn = {};

/**
 * 공통 상수 정의 Javascript 클래스
 *
 * @class
 *
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.common.Constants = {

	/**
	 * 캔버스 배경색
	 */
	CANVAS_BACKGROUND: "#f9f9f9",

	/**
	 * 공간 기하 객체 타입 정의
	 */
	GEOM_TYPE: {
		NULL        : 0,
		POINT       : 1,
		LINE        : 2,
		POLYLINE    : 3,
		POLYGON     : 4,
		RECTANGLE   : 5,
		CIRCLE      : 6,
		ELLIPSE     : 7,
		CURVE       : 8,
		BEZIER_CURVE: 9,
		COLLECTION  : 10
	},

	/**
	 * 공간 기하 객체 타입-이름 매핑
	 */
	GEOM_NAME: ["", "Point", "Line", "PolyLine", "Polygon", "Rectangle", "Circle", "Ellipse", "Curve", "BezierCurve", "Collection"],

	/**
	 * 숫자 반올림 소숫점 자리수
	 */
	NUM_PRECISION: 0,

	/**
	 * 캔버스 스케일(리얼 사이즈 : Scale = 1)
	 */
	SCALE: 1,

	/**
	 * 캔버스 최소 스케일
	 */
	SCALE_MIN: 0.1,

	/**
	 * 캔버스 최대 스케일
	 */
	SCALE_MAX: 10,

	/**
	 * 캔버스 노드 타입 정의
	 */
	NODE_TYPE: {
		ROOT : "ROOT",
		SHAPE: "SHAPE",
		ETC  : "ETC"
	},

	/**
	 * Shape 타입 정의
	 */
	SHAPE_TYPE: {
		GEOM : "GEOM",
		TEXT : "TEXT",
		HTML : "HTML",
		IMAGE: "IMAGE",
		EDGE : "EDGE",
		GROUP: "GROUP"
	},

	/**
	 * Edge 타입 정의
	 */
	EDGE_TYPE: {
		STRAIGHT: "straight",
		PLAIN   : "plain",
		BEZIER  : "bezier"
	},

	/**
	 * Edge 꺽은선 패딩 사이즈
	 */
	EDGE_PADDING: 20,

	/**
	 * 라벨의 패딩 사이즈
	 */
	LABEL_PADDING: 5,

	/**
	 * 라벨 에디터(textarea)의 디폴트 width
	 */
	LABEL_EDITOR_WIDTH: 70,

	/**
	 * 라벨 에디터(textarea)의 디폴트 height
	 */
	LABEL_EDITOR_HEIGHT: 16,

	/**
	 * 시작, 끝점 라벨의 offsetTop 값
	 */
	FROMTO_LABEL_OFFSET_TOP: 15,

	/**
	 * 라벨 ID의 suffix 정의
	 */
	LABEL_SUFFIX: "_LABEL",

	/**
	 * 라벨 에디터 ID의 suffix 정의
	 */
	LABEL_EDITOR_SUFFIX: "_LABEL_EDITOR",

	/**
	 * 시작점 라벨 ID의 suffix 정의
	 */
	FROM_LABEL_SUFFIX: '_FROMLABEL',

	/**
	 * 끝점 라벨 ID의 suffix 정의
	 */
	TO_LABEL_SUFFIX: '_TOLABEL',

	/**
	 * 디폴트 스타일 정의
	 */
	DEFAULT_STYLE: {
		SHAPE         : { cursor: "default" },
		GEOM          : { stroke: "black", fill: "white", "fill-opacity": 0, "label-position": "center" },
		TEXT          : { stroke: "none", "text-anchor": "middle" },
		HTML          : { "label-position": "bottom", "text-anchor": "middle", "vertical-align": "top" },
		IMAGE         : { "label-position": "bottom", "text-anchor": "middle", "vertical-align": "top" },
		EDGE          : { stroke: "black", fill: "none", "fill-opacity": 0, "stroke-width": 1, "stroke-opacity": 1, "edge-type": "plain", "edge-direction": "c c", "arrow-start": "none", "arrow-end": "classic-wide-long", "stroke-dasharray": "", "label-position": "center" },
		EDGE_SHADOW   : { stroke: "#00FF00", fill: "none", "fill-opacity": 0, "stroke-width": 1, "stroke-opacity": 1, "arrow-start": "none", "arrow-end": "none", "stroke-dasharray": "- " },
		EDGE_HIDDEN   : { stroke: "white", fill: "none", "fill-opacity": 0, "stroke-width": 5, "stroke-opacity": 0 },
		GROUP         : { stroke: "none", fill: "white", "fill-opacity": 0, "label-position": "bottom", "text-anchor": "middle", "vertical-align": "top" },
		GUIDE_BBOX    : { stroke: "#00FF00", fill: "none", "stroke-dasharray": "- ", "shape-rendering": "crispEdges" },
		GUIDE_UL      : { stroke: "black", fill: "#00FF00", cursor: "nwse-resize", "shape-rendering": "crispEdges" },
		GUIDE_UR      : { stroke: "black", fill: "#00FF00", cursor: "nesw-resize", "shape-rendering": "crispEdges" },
		GUIDE_LL      : { stroke: "black", fill: "#00FF00", cursor: "nesw-resize", "shape-rendering": "crispEdges" },
		GUIDE_LR      : { stroke: "black", fill: "#00FF00", cursor: "nwse-resize", "shape-rendering": "crispEdges" },
		GUIDE_LC      : { stroke: "black", fill: "#00FF00", cursor: "ew-resize", "shape-rendering": "crispEdges" },
		GUIDE_UC      : { stroke: "black", fill: "#00FF00", cursor: "ns-resize", "shape-rendering": "crispEdges" },
		GUIDE_RC      : { stroke: "black", fill: "#00FF00", cursor: "ew-resize", "shape-rendering": "crispEdges" },
		GUIDE_LWC     : { stroke: "black", fill: "#00FF00", cursor: "ns-resize", "shape-rendering": "crispEdges" },
		GUIDE_FROM    : { stroke: "black", fill: "#00FF00", cursor: "move", "shape-rendering": "crispEdges" },
		GUIDE_TO      : { stroke: "black", fill: "#00FF00", cursor: "move", "shape-rendering": "crispEdges" },
		GUIDE_CTL_H   : { stroke: "black", fill: "#00FF00", cursor: "ew-resize", "shape-rendering": "crispEdges" },
		GUIDE_CTL_V   : { stroke: "black", fill: "#00FF00", cursor: "ns-resize", "shape-rendering": "crispEdges" },
		GUIDE_SHADOW  : { stroke: "black", fill: "none", "stroke-dasharray": "- ", "shape-rendering": "crispEdges" },
		RUBBER_BAND   : { stroke: "#0000FF", opacity: 0.2, fill: "#0077FF" },
		TERMINAL      : { stroke: "#808080", "stroke-width": 1, fill: "r(0.5, 0.5)#FFFFFF-#808080", "fill-opacity": 0.5, cursor: "pointer" },
		TERMINAL_OVER : { stroke: "#0077FF", "stroke-width": 4, fill: "r(0.5, 0.5)#FFFFFF-#0077FF", "fill-opacity": 1, cursor: "pointer" },
		TERMINAL_BBOX : { stroke: "none", fill: "white", "fill-opacity": 0 },
		DROP_OVER_BBOX: { stroke: "#0077FF", fill: "none", opacity: 0.6, "shape-rendering": "crispEdges" },
		LABEL         : { "font-size": 12, "font-color": "black" },
		LABEL_EDITOR  : { position: "absolute", overflow: "visible", resize: "none", "text-align": "center", display: "block", padding: 0 },
		COLLAPSE      : { stroke: "black", fill: "white", "fill-opacity": 0, cursor: "pointer", "shape-rendering": "crispEdges" },
		COLLAPSE_BBOX : { stroke: "none", fill: "white", "fill-opacity": 0 }
	},

	/**
	 * Rectangle 모양의 마우스 드래그 선택 박스 영역
	 */
	RUBBER_BAND_ID: "OG_R_BAND",

	/**
	 * Move & Resize 용 가이드 ID 의 suffix 정의
	 */
	GUIDE_SUFFIX: {
		GUIDE: "_GUIDE",
		BBOX : "_GUIDE_BBOX",
		UL   : "_GUIDE_UL",
		UR   : "_GUIDE_UR",
		LL   : "_GUIDE_LL",
		LR   : "_GUIDE_LR",
		LC   : "_GUIDE_LC",
		UC   : "_GUIDE_UC",
		RC   : "_GUIDE_RC",
		LWC  : "_GUIDE_LWC",
		FROM : "_GUIDE_FROM",
		TO   : "_GUIDE_TO",
		CTL  : "_GUIDE_CTL_",
		CTL_H: "_GUIDE_CTL_H_",
		CTL_V: "_GUIDE_CTL_V_"
	},

	/**
	 * Move & Resize 용 가이드 콘트롤 Rect 사이즈
	 */
	GUIDE_RECT_SIZE: 8,

	/**
	 * Move & Resize 용 가이드 가로, 세로 최소 사이즈
	 */
	GUIDE_MIN_SIZE: 18,

	/**
	 * Collapse & Expand 용 가이드 ID의 suffix 정의
	 */
	COLLAPSE_SUFFIX     : "_COLLAPSE",
	COLLAPSE_BBOX_SUFFIX: "_COLLAPSE_BBOX",

	/**
	 * Collapse & Expand 용 가이드 Rect 사이즈
	 */
	COLLAPSE_SIZE: 10,

	/**
	 * Shape Move & Resize 시 이동 간격
	 */
	MOVE_SNAP_SIZE: 5,

	/**
	 * Edge 연결할때 Drop Over 가이드 ID의 suffix 정의
	 */
	DROP_OVER_BBOX_SUFFIX: "_DROP_OVER",

	/**
	 * Shape - Edge 와의 연결 포인트 터미널 ID의 suffix 정의
	 */
	TERMINAL_SUFFIX: {
		GROUP: "_TERMINAL",
		BOX  : "_TERMINAL_BOX"
	},

	/**
	 * Shape - Edge 와의 연결 포인트 터미널 유형 정의
	 */
	TERMINAL_TYPE: {
		C    : "C",
		E    : "E",
		W    : "W",
		S    : "S",
		N    : "N",
		IN   : "IN",
		OUT  : "OUT",
		INOUT: "INOUT"
	},

	/**
	 * 터미널 cross 사이즈
	 */
	TERMINAL_SIZE: 3,

	/**
	 * Shape 복사시 패딩 사이즈
	 */
	COPY_PASTE_PADDING: 20,

	/**
	 * Fit Canvas 시 패딩 사이즈
	 */
	FIT_CANVAS_PADDING: 20,

	/**
	 * 캔버스 영역 자동 확장 여부
	 */
	AUTO_EXTENSIONAL: true,

	/**
	 * 캔버스 영역 자동 확장시 증가 사이즈
	 */
	AUTO_EXTENSION_SIZE: 100,

	/**
	 * 클릭선택 가능여부
	 */
	SELECTABLE: true,

	/**
	 * 마우스드래그선택 가능여부
	 */
	DRAG_SELECTABLE: true,

	/**
	 * 이동 가능여부
	 */
	MOVABLE: true,

	/**
	 * 이동 가능여부(GEOM Shape)
	 */
	MOVABLE_GEOM: true,

	/**
	 * 이동 가능여부(TEXT Shape)
	 */
	MOVABLE_TEXT: true,

	/**
	 * 이동 가능여부(HTML Shape)
	 */
	MOVABLE_HTML: true,

	/**
	 * 이동 가능여부(IMAGE Shape)
	 */
	MOVABLE_IMAGE: true,

	/**
	 * 이동 가능여부(EDGE Shape)
	 */
	MOVABLE_EDGE: true,

	/**
	 * 이동 가능여부(GROUP Shape)
	 */
	MOVABLE_GROUP: true,

	/**
	 * 리사이즈 가능여부
	 */
	RESIZABLE: true,

	/**
	 * 리사이즈 가능여부(GEOM Shape)
	 */
	RESIZABLE_GEOM: true,

	/**
	 * 리사이즈 가능여부(TEXT Shape)
	 */
	RESIZABLE_TEXT: true,

	/**
	 * 리사이즈 가능여부(HTML Shape)
	 */
	RESIZABLE_HTML: true,

	/**
	 * 리사이즈 가능여부(IMAGE Shape)
	 */
	RESIZABLE_IMAGE: true,

	/**
	 * 리사이즈 가능여부(EDGE Shape)
	 */
	RESIZABLE_EDGE: true,

	/**
	 * 리사이즈 가능여부(GROUP Shape)
	 */
	RESIZABLE_GROUP: true,

	/**
	 * 연결 가능여부
	 */
	CONNECTABLE: true,

	/**
	 * Self 연결 가능여부
	 */
	SELF_CONNECTABLE: true,

	/**
	 * 드래그하여 연결시 대상 없을 경우 자동으로 Shape 복사하여 연결 처리 여부
	 */
	CONNECT_CLONEABLE: true,

	/**
	 * 드래그하여 연결시 연결대상 있는 경우에만 Edge 드로잉 처리 여부
	 */
	CONNECT_REQUIRED: true,

	/**
	 * 라벨 수정여부
	 */
	LABEL_EDITABLE: true,

	/**
	 * 라벨 수정여부(GEOM Shape)
	 */
	LABEL_EDITABLE_GEOM: true,

	/**
	 * 라벨 수정여부(TEXT Shape)
	 */
	LABEL_EDITABLE_TEXT: true,

	/**
	 * 라벨 수정여부(HTML Shape)
	 */
	LABEL_EDITABLE_HTML: true,

	/**
	 * 라벨 수정여부(IMAGE Shape)
	 */
	LABEL_EDITABLE_IMAGE: true,

	/**
	 * 라벨 수정여부(EDGE Shape)
	 */
	LABEL_EDITABLE_EDGE: true,

	/**
	 * 라벨 수정여부(GROUP Shape)
	 */
	LABEL_EDITABLE_GROUP: true,

	/**
	 * 그룹핑 가능여부
	 */
	GROUP_DROPABLE: true,

	/**
	 * 최소화 가능여부
	 */
	GROUP_COLLAPSIBLE: true,

	/**
	 * 이동, 리사이즈 드래그시 MOVE_SNAP_SIZE 적용 여부
	 */
	DRAG_GRIDABLE: true,

	/**
	 * 핫키 가능여부
	 */
	ENABLE_HOTKEY: true,

	/**
	 * 핫키 : DELETE 삭제 키 가능여부
	 */
	ENABLE_HOTKEY_DELETE: true,

	/**
	 * 핫키 : Ctrl+A 전체선택 키 가능여부
	 */
	ENABLE_HOTKEY_CTRL_A: true,

	/**
	 * 핫키 : Ctrl+C 복사 키 가능여부
	 */
	ENABLE_HOTKEY_CTRL_C: true,

	/**
	 * 핫키 : Ctrl+V 붙여넣기 키 가능여부
	 */
	ENABLE_HOTKEY_CTRL_V: true,

	/**
	 * 핫키 : Ctrl+D 복제하기 키 가능여부
	 */
	ENABLE_HOTKEY_CTRL_D: true,

	/**
	 * 핫키 : Ctrl+G 그룹 키 가능여부
	 */
	ENABLE_HOTKEY_CTRL_G: true,

	/**
	 * 핫키 : Ctrl+U 언그룹 키 가능여부
	 */
	ENABLE_HOTKEY_CTRL_U: true,

	/**
	 * 핫키 : 방향키 가능여부
	 */
	ENABLE_HOTKEY_ARROW: true,

	/**
	 * 핫키 : Shift + 방향키 가능여부
	 */
	ENABLE_HOTKEY_SHIFT_ARROW: true,

	/**
	 * 마우스 우클릭 메뉴 가능여부
	 */
	ENABLE_CONTEXTMENU: true
};
OG.Constants = OG.common.Constants;

// keyCode Definition
if (typeof KeyEvent === "undefined") {
	var KeyEvent = {
		DOM_VK_CANCEL       : 3,
		DOM_VK_HELP         : 6,
		DOM_VK_BACK_SPACE   : 8,
		DOM_VK_TAB          : 9,
		DOM_VK_CLEAR        : 12,
		DOM_VK_RETURN       : 13,
		DOM_VK_ENTER        : 14,
		DOM_VK_SHIFT        : 16,
		DOM_VK_CONTROL      : 17,
		DOM_VK_ALT          : 18,
		DOM_VK_PAUSE        : 19,
		DOM_VK_CAPS_LOCK    : 20,
		DOM_VK_ESCAPE       : 27,
		DOM_VK_SPACE        : 32,
		DOM_VK_PAGE_UP      : 33,
		DOM_VK_PAGE_DOWN    : 34,
		DOM_VK_END          : 35,
		DOM_VK_HOME         : 36,
		DOM_VK_LEFT         : 37,
		DOM_VK_UP           : 38,
		DOM_VK_RIGHT        : 39,
		DOM_VK_DOWN         : 40,
		DOM_VK_PRINTSCREEN  : 44,
		DOM_VK_INSERT       : 45,
		DOM_VK_DELETE       : 46,
		DOM_VK_0            : 48,
		DOM_VK_1            : 49,
		DOM_VK_2            : 50,
		DOM_VK_3            : 51,
		DOM_VK_4            : 52,
		DOM_VK_5            : 53,
		DOM_VK_6            : 54,
		DOM_VK_7            : 55,
		DOM_VK_8            : 56,
		DOM_VK_9            : 57,
		DOM_VK_SEMICOLON    : 59,
		DOM_VK_EQUALS       : 61,
		DOM_VK_A            : 65,
		DOM_VK_B            : 66,
		DOM_VK_C            : 67,
		DOM_VK_D            : 68,
		DOM_VK_E            : 69,
		DOM_VK_F            : 70,
		DOM_VK_G            : 71,
		DOM_VK_H            : 72,
		DOM_VK_I            : 73,
		DOM_VK_J            : 74,
		DOM_VK_K            : 75,
		DOM_VK_L            : 76,
		DOM_VK_M            : 77,
		DOM_VK_N            : 78,
		DOM_VK_O            : 79,
		DOM_VK_P            : 80,
		DOM_VK_Q            : 81,
		DOM_VK_R            : 82,
		DOM_VK_S            : 83,
		DOM_VK_T            : 84,
		DOM_VK_U            : 85,
		DOM_VK_V            : 86,
		DOM_VK_W            : 87,
		DOM_VK_X            : 88,
		DOM_VK_Y            : 89,
		DOM_VK_Z            : 90,
		DOM_VK_COMMAND      : 91,
		DOM_VK_CONTEXT_MENU : 93,
		DOM_VK_NUMPAD0      : 96,
		DOM_VK_NUMPAD1      : 97,
		DOM_VK_NUMPAD2      : 98,
		DOM_VK_NUMPAD3      : 99,
		DOM_VK_NUMPAD4      : 100,
		DOM_VK_NUMPAD5      : 101,
		DOM_VK_NUMPAD6      : 102,
		DOM_VK_NUMPAD7      : 103,
		DOM_VK_NUMPAD8      : 104,
		DOM_VK_NUMPAD9      : 105,
		DOM_VK_MULTIPLY     : 106,
		DOM_VK_ADD          : 107,
		DOM_VK_SEPARATOR    : 108,
		DOM_VK_SUBTRACT     : 109,
		DOM_VK_DECIMAL      : 110,
		DOM_VK_DIVIDE       : 111,
		DOM_VK_F1           : 112,
		DOM_VK_F2           : 113,
		DOM_VK_F3           : 114,
		DOM_VK_F4           : 115,
		DOM_VK_F5           : 116,
		DOM_VK_F6           : 117,
		DOM_VK_F7           : 118,
		DOM_VK_F8           : 119,
		DOM_VK_F9           : 120,
		DOM_VK_F10          : 121,
		DOM_VK_F11          : 122,
		DOM_VK_F12          : 123,
		DOM_VK_F13          : 124,
		DOM_VK_F14          : 125,
		DOM_VK_F15          : 126,
		DOM_VK_F16          : 127,
		DOM_VK_F17          : 128,
		DOM_VK_F18          : 129,
		DOM_VK_F19          : 130,
		DOM_VK_F20          : 131,
		DOM_VK_F21          : 132,
		DOM_VK_F22          : 133,
		DOM_VK_F23          : 134,
		DOM_VK_F24          : 135,
		DOM_VK_NUM_LOCK     : 144,
		DOM_VK_SCROLL_LOCK  : 145,
		DOM_VK_COMMA        : 188,
		DOM_VK_PERIOD       : 190,
		DOM_VK_SLASH        : 191,
		DOM_VK_BACK_QUOTE   : 192,
		DOM_VK_OPEN_BRACKET : 219,
		DOM_VK_BACK_SLASH   : 220,
		DOM_VK_CLOSE_BRACKET: 221,
		DOM_VK_QUOTE        : 222,
		DOM_VK_META         : 224
	};
}
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
/**
 * 곡선(Curve) 알고리즘을 구현한 Javascript 클래스
 *
 * @class
 *
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.common.CurveUtil = {
	/**
	 * 주어진 좌표 Array 에 대해 Cubic Catmull-Rom spline Curve 좌표를 계산하는 함수를 반환한다.
	 * 모든 좌표를 지나는 커브를 계산한다.
	 *
	 * @example
	 * var points = [[2, 2], [2, -2], [-2, 2], [-2, -2]],
	 *     cmRomSpline = OG.CurveUtil.CatmullRomSpline(points), t, curve = [];
	 *
	 * // t 는 0 ~ maxT 의 값으로, t 값의 증분값이 작을수록 세밀한 Curve 를 그린다.
	 * for(t = 0; t <= cmRomSpline.maxT; t += 0.1) {
	 *     curve.push([cmRomSpline.getX(t), cmRomSpline.getY(t)]);
	 * }
	 *
	 * @param {Array} points 좌표 Array (예, [[x1,y1], [x2,y2], [x3,y3], [x4,y4]])
	 * @return {Object} t 값에 의해 X, Y 좌표를 구하는 함수와 maxT 값을 반환
	 * @static
	 */
	CatmullRomSpline: function (points) {
		var coeffs = [], p,
			first = {},
			last = {}, // control point at the beginning and at the end

			makeFct = function (which) {

				return function (t, suspendedUpdate) {

					var len = points.length, s, c;

					if (len < 2) {
						return NaN;
					}

					t = t - 1;

					if (!suspendedUpdate && coeffs[which]) {
						suspendedUpdate = true;
					}

					if (!suspendedUpdate) {
						first[which] = 2 * points[0][which] - points[1][which];
						last[which] = 2 * points[len - 1][which] - points[len - 2][which];
						p = [first].concat(points, [last]);

						coeffs[which] = [];
						for (s = 0; s < len - 1; s++) {
							coeffs[which][s] = [
								2 * p[s + 1][which],
								-p[s][which] + p[s + 2][which],
								2 * p[s][which] - 5 * p[s + 1][which] + 4 * p[s + 2][which] - p[s + 3][which],
								-p[s][which] + 3 * p[s + 1][which] - 3 * p[s + 2][which] + p[s + 3][which]
							];
						}
					}
					len += 2;  // add the two control points
					if (isNaN(t)) {
						return NaN;
					}
					// This is necessay for our advanced plotting algorithm:
					if (t < 0) {
						return p[1][which];
					} else if (t >= len - 3) {
						return p[len - 2][which];
					}

					s = Math.floor(t);
					if (s === t) {
						return p[s][which];
					}
					t -= s;
					c = coeffs[which][s];
					return 0.5 * (((c[3] * t + c[2]) * t + c[1]) * t + c[0]);
				};
			};

		return {
			getX: makeFct(0),
			getY: makeFct(1),
			maxT: points.length + 1
		};
	},

	/**
	 * 주어진 좌표 Array (좌표1, 콘트롤포인트1, 콘트롤포인트2, 좌표2 ...) 에 대해 Cubic Bezier Curve 좌표를 계산하는 함수를 반환한다.
	 * Array 갯수는 3 * K + 1 이어야 한다.
	 * 예) 좌표1, 콘트롤포인트1, 콘트롤포인트2, 좌표2, 콘트롤포인트1, 콘트롤포인트2, 좌표3 ...
	 *
	 * @example
	 * var points = [[2, 1], [1, 3], [-1, -1], [-2, 1]],
	 *     bezier = OG.CurveUtil.Bezier(points), t, curve = [];
	 *
	 * // t 는 0 ~ maxT 의 값으로, t 값의 증분값이 작을수록 세밀한 Curve 를 그린다.
	 * for(t = 0; t <= bezier.maxT; t += 0.1) {
	 *     curve.push([bezier.getX(t), bezier.getY(t)]);
	 * }
	 *
	 * @param {Array} points 좌표 Array (예, [[x1,y1], [cp_x1,cp_y1], [cp_x2,cp_y2], [x2,y4]])
	 * @return {Object} t 값에 의해 X, Y 좌표를 구하는 함수와 maxT 값을 반환
	 * @static
	 */
	Bezier: function (points) {
		var len,
			makeFct = function (which) {
				return function (t, suspendedUpdate) {
					var z = Math.floor(t) * 3,
						t0 = t,
						t1 = 1 - t0;

					if (!suspendedUpdate && len) {
						suspendedUpdate = true;
					}

					if (!suspendedUpdate) {
						len = Math.floor(points.length / 3);
					}

					if (t < 0) {
						return points[0][which];
					}
					if (t >= len) {
						return points[points.length - 1][which];
					}
					if (isNaN(t)) {
						return NaN;
					}
					return t1 * t1 * (t1 * points[z][which] + 3 * t0 * points[z + 1][which]) +
						(3 * t1 * points[z + 2][which] + t0 * points[z + 3][which]) * t0 * t0;
				};
			};

		return {
			getX: makeFct(0),
			getY: makeFct(1),
			maxT: Math.floor(points.length / 3) + 1
		};
	},

	/**
	 * 주어진 좌표 Array (시작좌표, 콘트롤포인트1, 콘트롤포인트2, ..., 끝좌표) 에 대해 B-Spline Curve 좌표를 계산하는 함수를 반환한다.
	 *
	 * @example
	 * var points = [[2, 1], [1, 3], [-1, -1], [-2, 1]],
	 *     bspline = OG.CurveUtil.BSpline(points), t, curve = [];
	 *
	 * // t 는 0 ~ maxT 의 값으로, t 값의 증분값이 작을수록 세밀한 Curve 를 그린다.
	 * for(t = 0; t <= bspline.maxT; t += 0.1) {
	 *     curve.push([bspline.getX(t), bspline.getY(t)]);
	 * }
	 *
	 * @param {Array} points 좌표 Array (예, [[x1,y1], [x2,y2], [x3,y3], [x4,y4]])
	 * @param {Number} order Order of the B-spline curve.
	 * @return {Object} t 값에 의해 X, Y 좌표를 구하는 함수와 maxT 값을 반환
	 * @static
	 */
	BSpline: function (points, order) {
		var knots, N = [],
			_knotVector = function (n, k) {
				var j, kn = [];
				for (j = 0; j < n + k + 1; j++) {
					if (j < k) {
						kn[j] = 0.0;
					} else if (j <= n) {
						kn[j] = j - k + 1;
					} else {
						kn[j] = n - k + 2;
					}
				}
				return kn;
			},

			_evalBasisFuncs = function (t, kn, n, k, s) {
				var i, j, a, b, den,
					N = [];

				if (kn[s] <= t && t < kn[s + 1]) {
					N[s] = 1;
				} else {
					N[s] = 0;
				}
				for (i = 2; i <= k; i++) {
					for (j = s - i + 1; j <= s; j++) {
						if (j <= s - i + 1 || j < 0) {
							a = 0.0;
						} else {
							a = N[j];
						}
						if (j >= s) {
							b = 0.0;
						} else {
							b = N[j + 1];
						}
						den = kn[j + i - 1] - kn[j];
						if (den === 0) {
							N[j] = 0;
						} else {
							N[j] = (t - kn[j]) / den * a;
						}
						den = kn[j + i] - kn[j + 1];
						if (den !== 0) {
							N[j] += (kn[j + i] - t) / den * b;
						}
					}
				}
				return N;
			},
			makeFct = function (which) {
				return function (t, suspendedUpdate) {
					var len = points.length, y, j, s,
						n = len - 1,
						k = order;

					if (n <= 0) {
						return NaN;
					}
					if (n + 2 <= k) {
						k = n + 1;
					}
					if (t <= 0) {
						return points[0][which];
					}
					if (t >= n - k + 2) {
						return points[n][which];
					}

					knots = _knotVector(n, k);
					s = Math.floor(t) + k - 1;
					N = _evalBasisFuncs(t, knots, n, k, s);

					y = 0.0;
					for (j = s - k + 1; j <= s; j++) {
						if (j < len && j >= 0) {
							y += points[j][which] * N[j];
						}
					}
					return y;
				};
			};

		return {
			getX: makeFct(0),
			getY: makeFct(1),
			maxT: points.length - 2
		};
	}
};
OG.CurveUtil = OG.common.CurveUtil;
/**
 * 사용자 정의 예외 클래스 NotSupportedException
 *
 * @class
 *
 * @param {String} message 메시지
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.common.NotSupportedException = function (message) {
	/**
	 * {String} 예외명
	 */
	this.name = "OG.NotSupportedException";

	/**
	 * {String} 메시지
	 */
	this.message = message || "Not Supported!";
};
OG.NotSupportedException = OG.common.NotSupportedException;

/**
 * 사용자 정의 예외 클래스 NotImplementedException
 *
 * @class
 *
 * @param {String} message 메시지
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.common.NotImplementedException = function (message) {
	/**
	 * {String} 예외명
	 */
	this.name = "OG.NotImplementedException";

	/**
	 * {String} 메시지
	 */
	this.message = message || "Not Implemented!";
};
OG.NotImplementedException = OG.common.NotImplementedException;

/**
 * 사용자 정의 예외 클래스 ParamError
 *
 * @class
 *
 * @param {String} message 메시지
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.common.ParamError = function (message) {
	/**
	 * {String} 예외명
	 */
	this.name = "OG.ParamError";

	/**
	 * {String} 메시지
	 */
	this.message = message || "Invalid Parameter Error!";
};
OG.ParamError = OG.common.ParamError;
/**
 * HashMap 구현 Javascript 클래스
 *
 * @class
 *
 * @param {Object} jsonObject key:value 매핑 JSON 오브젝트
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.common.HashMap = function (jsonObject) {

	this.map = jsonObject || {};

	/**
	 * key : value 를 매핑한다.
	 *
	 * @param {String} key 키
	 * @param {Object} value 값
	 */
	this.put = function (key, value) {
		this.map[key] = value;
	};

	/**
	 * key 에 대한 value 를 반환한다.
	 *
	 * @param {String} key 키
	 * @return {Object} 값
	 */
	this.get = function (key) {
		return this.map[key];
	};

	/**
	 * 주어진 key 를 포함하는지 여부를 반환한다.
	 *
	 * @param {String} key 키
	 * @return {Boolean}
	 */
	this.containsKey = function (key) {
		return this.map.hasOwnProperty(key);
	};

	/**
	 * 주어진 value 를 포함하는지 여부를 반환한다.
	 *
	 * @param {Object} value 값
	 * @return {Boolean}
	 */
	this.containsValue = function (value) {
		var prop;
		for (prop in this.map) {
			if (this.map[prop] === value) {
				return true;
			}
		}
		return false;
	};

	/**
	 * Empty 여부를 반환한다.
	 *
	 * @return {Boolean}
	 */
	this.isEmpty = function () {
		return this.size() === 0;
	};

	/**
	 * 매핑정보를 클리어한다.
	 */
	this.clear = function () {
		var prop;
		for (prop in this.map) {
			delete this.map[prop];
		}
	};

	/**
	 * 주어진 key 의 매핑정보를 삭제한다.
	 *
	 * @param {String} key 키
	 */
	this.remove = function (key) {
		if (this.map[key]) {
			delete this.map[key];
		}
	};

	/**
	 * key 목록을 반환한다.
	 *
	 * @return {String[]} 키목록
	 */
	this.keys = function () {
		var keys = [], prop;
		for (prop in this.map) {
			keys.push(prop);
		}
		return keys;
	};

	/**
	 * value 목록을 반환한다.
	 *
	 * @return {Object[]} 값목록
	 */
	this.values = function () {
		var values = [], prop;
		for (prop in this.map) {
			values.push(this.map[prop]);
		}
		return values;
	};

	/**
	 * 매핑된 key:value 갯수를 반환한다.
	 *
	 * @return {Number}
	 */
	this.size = function () {
		var count = 0, prop;
		for (prop in this.map) {
			count++;
		}
		return count;
	};

	/**
	 * 객체 프라퍼티 정보를 JSON 스트링으로 반환한다.
	 *
	 * @return {String} 프라퍼티 정보
	 * @override
	 */
	this.toString = function () {
		var s = [], prop;
		for (prop in this.map) {
			s.push("'" + prop + "':'" + this.map[prop] + "'");
		}

		return "{" + s.join() + "}";
	};
};
OG.common.HashMap.prototype = new OG.common.HashMap();
OG.common.HashMap.prototype.constructor = OG.common.HashMap;
OG.HashMap = OG.common.HashMap;
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

/**
 * 스타일(StyleSheet) Property 정보 클래스
 *
 * @class
 * @extends OG.common.HashMap
 *
 * @param {OG.common.HashMap} style 키:값 매핑된 스타일 프라퍼티 정보
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.geometry.Style = function (style) {
	var DEFAULT_STYLE = {
		},
		_style = {};

	OG.Util.apply(_style, style, DEFAULT_STYLE);

	OG.geometry.Style.superclass.call(this, _style);
};
OG.geometry.Style.prototype = new OG.common.HashMap();
OG.geometry.Style.superclass = OG.common.HashMap;
OG.geometry.Style.prototype.constructor = OG.geometry.Style;
OG.Style = OG.geometry.Style;
/**
 * 2차원 좌표계에서의 좌표값
 *
 * @example
 * var coordinate1 = new OG.Coordinate(10, 10);
 * or
 * var coordinate2 = new OG.Coordinate([20, 20]);
 *
 * @class
 *
 * @param {Number} x x좌표
 * @param {Number} y y좌표
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.geometry.Coordinate = function (x, y) {

	/**
	 * {Number} x좌표
	 */
	this.x = undefined;

	/**
	 * {Number} y좌표
	 */
	this.y = undefined;

	// Array 좌표를 OG.geometry.Coordinate 로 변환
	if (arguments.length === 1 && x.constructor === Array) {
		this.x = x[0];
		this.y = x[1];
	} else if (arguments.length === 2 && typeof x === "number" && typeof y === "number") {
		this.x = x;
		this.y = y;
	} else if (arguments.length !== 0) {
		throw new OG.ParamError();
	}

	/**
	 * 주어진 좌표와의 거리를 계산한다.
	 *
	 * @example
	 * coordinate.distance([10, 10]);
	 * or
	 * coordinate.distance(new OG.Coordinate(10, 10));
	 *
	 *
	 * @param {OG.geometry.Coordinate,Number[]} coordinate 좌표값
	 * @return {Number} 좌표간의 거리값
	 */
	this.distance = function (coordinate) {
		if (coordinate.constructor === Array) {
			coordinate = new OG.geometry.Coordinate(coordinate[0], coordinate[1]);
		}

		var dx = this.x - coordinate.x, dy = this.y - coordinate.y;
		return OG.Util.round(Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)));
	};

	/**
	 * 가로, 세로 Offset 만큼 좌표를 이동한다.
	 *
	 * @param {Number} offsetX 가로 Offset
	 * @param {Number} offsetY 세로 Offset
	 * @return {OG.geometry.Coordinate} 이동된 좌표
	 */
	this.move = function (offsetX, offsetY) {
		this.x += offsetX;
		this.y += offsetY;

		return this;
	};

	/**
	 * 기준 좌표를 기준으로 주어진 각도 만큼 회전한다.
	 *
	 * @example
	 * coordinate.rotate(90, [10,10]);
	 * or
	 * coordinate.rotate(90, new OG.Coordinate(10, 10));
	 *
	 * @param {Number} angle 회전 각도
	 * @param {OG.geometry.Coordinate,Number[]} origin 기준 좌표
	 * @return {OG.geometry.Coordinate} 회전된 좌표
	 */
	this.rotate = function (angle, origin) {
		if (origin.constructor === Array) {
			origin = new OG.geometry.Coordinate(origin[0], origin[1]);
		}

		angle *= Math.PI / 180;
		var radius = this.distance(origin),
			theta = angle + Math.atan2(this.y - origin.y, this.x - origin.x);
		this.x = OG.Util.round(origin.x + (radius * Math.cos(theta)));
		this.y = OG.Util.round(origin.y + (radius * Math.sin(theta)));

		return this;
	};

	/**
	 * 주어진 좌표값과 같은지 비교한다.
	 *
	 * @example
	 * coordinate.isEquals([10, 10]);
	 * or
	 * coordinate.isEquals(new OG.Coordinate(10, 10));
	 *
	 * @param {OG.geometry.Coordinate,Number[]} coordinate 좌표값
	 * @return {Boolean} true:같음, false:다름
	 */
	this.isEquals = function (coordinate) {
		if (coordinate.constructor === Array) {
			coordinate = new OG.geometry.Coordinate(coordinate[0], coordinate[1]);
		}

		if (coordinate && coordinate instanceof OG.geometry.Coordinate) {
			if (this.x === coordinate.x && this.y === coordinate.y) {
				return true;
			}
		}

		return false;
	};

	/**
	 * 객체 프라퍼티 정보를 JSON 스트링으로 반환한다.
	 *
	 * @return {String} 프라퍼티 정보
	 * @override
	 */
	this.toString = function () {
		var s = [];
		s.push(this.x);
		s.push(this.y);

		return "[" + s.join() + "]";
	};
};
OG.geometry.Coordinate.prototype = new OG.geometry.Coordinate();
OG.geometry.Coordinate.prototype.constructor = OG.geometry.Coordinate;
OG.Coordinate = OG.geometry.Coordinate;
/**
 * 2차원 좌표계에서 Envelope 영역을 정의
 *
 * @example
 * var boundingBox = new OG.Envelope([50, 50], 200, 100);
 *
 * @class
 * @requires OG.geometry.Coordinate
 *
 * @param {OG.geometry.Coordinate,Number[]} upperLeft 기준 좌상단 좌표
 * @param {Number} width 너비
 * @param {Number} height 높이
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.geometry.Envelope = function (upperLeft, width, height) {
	var _upperLeft, _width = width, _height = height,
		_upperRight, _lowerLeft, _lowerRight, _leftCenter, _upperCenter, _rightCenter, _lowerCenter, _centroid,
		reset;

	// Array 좌표를 OG.geometry.Coordinate 로 변환
	if (upperLeft) {
		if (upperLeft.constructor === Array) {
			_upperLeft = new OG.geometry.Coordinate(upperLeft);
		} else {
			_upperLeft = new OG.geometry.Coordinate(upperLeft.x, upperLeft.y);
		}
	}

	/**
	 * 기준 좌상단 좌표를 반환한다.
	 *
	 * @return {OG.geometry.Coordinate} 좌상단 좌표
	 */
	this.getUpperLeft = function () {
		return _upperLeft;
	};

	/**
	 * 주어진 좌표로 기준 좌상단 좌표를 설정한다. 새로 설정된 값으로 이동된다.
	 *
	 * @param {OG.geometry.Coordinate,Number[]} upperLeft 좌상단 좌표
	 */
	this.setUpperLeft = function (upperLeft) {
		if (upperLeft.constructor === Array) {
			upperLeft = new OG.geometry.Coordinate(upperLeft[0], upperLeft[1]);
		}

		_upperLeft = upperLeft;
		reset();
	};

	/**
	 * 우상단 좌표를 반환한다.
	 *
	 * @return {OG.geometry.Coordinate} 우상단 좌표
	 */
	this.getUpperRight = function () {
		if (!_upperRight) {
			_upperRight = new OG.geometry.Coordinate(_upperLeft.x + _width, _upperLeft.y);
		}
		return _upperRight;
	};

	/**
	 * 우하단 좌표를 반환한다.
	 *
	 * @return {OG.geometry.Coordinate} 우하단 좌표
	 */
	this.getLowerRight = function () {
		if (!_lowerRight) {
			_lowerRight = new OG.geometry.Coordinate(_upperLeft.x + _width, _upperLeft.y + _height);
		}
		return _lowerRight;
	};

	/**
	 * 좌하단 좌표를 반환한다.
	 *
	 * @return {OG.geometry.Coordinate} 좌하단 좌표
	 */
	this.getLowerLeft = function () {
		if (!_lowerLeft) {
			_lowerLeft = new OG.geometry.Coordinate(_upperLeft.x, _upperLeft.y + _height);
		}
		return _lowerLeft;
	};

	/**
	 * 좌중간 좌표를 반환한다.
	 *
	 * @return {OG.geometry.Coordinate} 좌중간 좌표
	 */
	this.getLeftCenter = function () {
		if (!_leftCenter) {
			_leftCenter = new OG.geometry.Coordinate(_upperLeft.x, OG.Util.round(_upperLeft.y + _height / 2));
		}
		return _leftCenter;
	};

	/**
	 * 상단중간 좌표를 반환한다.
	 *
	 * @return {OG.geometry.Coordinate} 상단중간 좌표
	 */
	this.getUpperCenter = function () {
		if (!_upperCenter) {
			_upperCenter = new OG.geometry.Coordinate(OG.Util.round(_upperLeft.x + _width / 2), _upperLeft.y);
		}
		return _upperCenter;
	};

	/**
	 * 우중간 좌표를 반환한다.
	 *
	 * @return {OG.geometry.Coordinate} 우중간 좌표
	 */
	this.getRightCenter = function () {
		if (!_rightCenter) {
			_rightCenter = new OG.geometry.Coordinate(_upperLeft.x + _width, OG.Util.round(_upperLeft.y + _height / 2));
		}
		return _rightCenter;
	};

	/**
	 * 하단중간 좌표를 반환한다.
	 *
	 * @return {OG.geometry.Coordinate} 하단중간 좌표
	 */
	this.getLowerCenter = function () {
		if (!_lowerCenter) {
			_lowerCenter = new OG.geometry.Coordinate(OG.Util.round(_upperLeft.x + _width / 2), _upperLeft.y + _height);
		}
		return _lowerCenter;
	};

	/**
	 * Envelope 의 중심좌표를 반환한다.
	 *
	 * @return {OG.geometry.Coordinate} 중심좌표
	 */
	this.getCentroid = function () {
		if (!_centroid) {
			_centroid = new OG.geometry.Coordinate(OG.Util.round(_upperLeft.x + _width / 2),
				OG.Util.round(_upperLeft.y + _height / 2));
		}

		return _centroid;
	};

	/**
	 * 주어진 좌표로 중심 좌표를 설정한다. 새로 설정된 값으로 이동된다.
	 *
	 * @param {OG.geometry.Coordinate,Number[]} centroid 중심좌표
	 */
	this.setCentroid = function (centroid) {
		if (centroid.constructor === Array) {
			centroid = new OG.geometry.Coordinate(centroid[0], centroid[1]);
		}

		this.move(centroid.x - this.getCentroid().x, centroid.y - this.getCentroid().y);
	};

	/**
	 * Envelope 의 가로 사이즈를 반환한다.
	 *
	 * @return {Number} 너비
	 */
	this.getWidth = function () {
		return _width;
	};

	/**
	 * 주어진 값으로 Envelope 의 가로 사이즈를 설정한다.
	 *
	 * @param {Number} width 너비
	 */
	this.setWidth = function (width) {
		_width = width;
		reset();
	};

	/**
	 * Envelope 의 세로 사이즈를 반환한다.
	 *
	 * @return {Number} 높이
	 */
	this.getHeight = function () {
		return _height;
	};

	/**
	 * 주어진 값으로 Envelope 의 세로 사이즈를 설정한다.
	 *
	 * @param {Number} height 높이
	 */
	this.setHeight = function (height) {
		_height = height;
		reset();
	};

	/**
	 * Envelope 모든 꼭지점을 반환한다.
	 * 좌상단좌표부터 시계방향으로 꼭지점 Array 를 반환한다.
	 *
	 * @return {OG.geometry.Coordinate[]} 꼭지점 좌표 Array : [좌상단, 상단중간, 우상단, 우중간, 우하단, 하단중간, 좌하단, 좌중간, 좌상단]
	 */
	this.getVertices = function () {
		var vertices = [];

		vertices.push(this.getUpperLeft());
		vertices.push(this.getUpperCenter());
		vertices.push(this.getUpperRight());
		vertices.push(this.getRightCenter());
		vertices.push(this.getLowerRight());
		vertices.push(this.getLowerCenter());
		vertices.push(this.getLowerLeft());
		vertices.push(this.getLeftCenter());
		vertices.push(this.getUpperLeft());

		return vertices;
	};

	/**
	 * 주어진 좌표값이 Envelope 영역에 포함되는지 비교한다.
	 *
	 * @param {OG.geometry.Coordinate,Number[]} coordinate 좌표값
	 * @return {Boolean} true:포함, false:비포함
	 */
	this.isContains = function (coordinate) {
		if (coordinate.constructor === Array) {
			return coordinate[0] >= _upperLeft.x && coordinate[0] <= this.getLowerRight().x &&
				coordinate[1] >= _upperLeft.y && coordinate[1] <= this.getLowerRight().y;
		} else {
			return coordinate.x >= _upperLeft.x && coordinate.x <= this.getLowerRight().x &&
				coordinate.y >= _upperLeft.y && coordinate.y <= this.getLowerRight().y;
		}
	};

	/**
	 * 주어진 모든 좌표값이 Envelope 영역에 포함되는지 비교한다.
	 *
	 * @param {OG.geometry.Coordinate[]} coordinateArray 좌표값 Array
	 * @return {Boolean} true:포함, false:비포함
	 */
	this.isContainsAll = function (coordinateArray) {
		var i;
		for (i = 0; i < coordinateArray.length; i++) {
			if (!this.isContains(coordinateArray[i])) {
				return false;
			}
		}

		return true;
	};

	/**
	 * 크기는 고정한 채 가로, 세로 Offset 만큼 Envelope 을 이동한다.
	 *
	 * @param {Number} offsetX 가로 Offset
	 * @param {Number} offsetY 세로 Offset
	 * @return {OG.geometry.Envelope} 이동된 Envelope
	 */
	this.move = function (offsetX, offsetY) {
		_upperLeft.move(offsetX, offsetY);
		reset();

		return this;
	};

	/**
	 * 상, 하, 좌, 우 외곽선을 이동하여 Envelope 을 리사이즈 한다.
	 *
	 * @param {Number} upper 상단 라인 이동 Offset(위 방향으로 +)
	 * @param {Number} lower 하단 라인 이동 Offset(아래 방향으로 +)
	 * @param {Number} left 좌측 라인 이동 Offset(좌측 방향으로 +)
	 * @param {Number} right 우측 라인 이동 Offset(우측 방향으로 +)
	 * @return {OG.geometry.Envelope} 리사이즈된 Envelope
	 */
	this.resize = function (upper, lower, left, right) {
		upper = upper || 0;
		lower = lower || 0;
		left = left || 0;
		right = right || 0;

		if (_width + (left + right) < 0 || _height + (upper + lower) < 0) {
			throw new OG.ParamError();
		}

		_upperLeft.move(-1 * left, -1 * upper);
		_width += (left + right);
		_height += (upper + lower);
		reset();

		return this;
	};

	/**
	 * 주어진 Envelope 영역과 같은지 비교한다.
	 *
	 * @param {OG.geometry.Envelope} Envelope 영역
	 * @return {Boolean} true:같음, false:다름
	 */
	this.isEquals = function (envelope) {
		if (envelope && envelope instanceof OG.geometry.Envelope) {
			if (this.getUpperLeft().isEquals(envelope.getUpperLeft()) &&
				this.getWidth() === envelope.getWidth() &&
				this.getHeight() === envelope.getHeight()) {
				return true;
			}
		}

		return false;
	};

	/**
	 * 객체 프라퍼티 정보를 JSON 스트링으로 반환한다.
	 *
	 * @return {String} 프라퍼티 정보
	 * @override
	 */
	this.toString = function () {
		var s = [];
		s.push("upperLeft:" + this.getUpperLeft());
		s.push("width:" + this.getWidth());
		s.push("height:" + this.getHeight());
		s.push("upperRight:" + this.getUpperRight());
		s.push("lowerLeft:" + this.getLowerLeft());
		s.push("lowerRight:" + this.getLowerRight());
		s.push("leftCenter:" + this.getLeftCenter());
		s.push("upperCenter:" + this.getUpperCenter());
		s.push("rightCenter:" + this.getRightCenter());
		s.push("lowerCenter:" + this.getLowerCenter());
		s.push("centroid:" + this.getCentroid());

		return "{" + s.join() + "}";
	};

	/**
	 * _upperLeft, _width, _height 를 제외한 로컬 멤버 변수의 값을 리셋한다.
	 *
	 * @private
	 */
	reset = function () {
		_upperRight = null;
		_lowerLeft = null;
		_lowerRight = null;
		_leftCenter = null;
		_upperCenter = null;
		_rightCenter = null;
		_lowerCenter = null;
		_centroid = null;
	};
};
OG.geometry.Envelope.prototype = new OG.geometry.Envelope();
OG.geometry.Envelope.prototype.constructor = OG.geometry.Envelope;
OG.Envelope = OG.geometry.Envelope;
/**
 * 공간 기하 객체(Spatial Geometry Object)의 최상위 추상 클래스
 *
 * @class
 * @requires OG.geometry.Coordinate, OG.geometry.Envelope
 *
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.geometry.Geometry = function () {

	/**
	 * {Number} 공간 기하 객체 타입
	 */
	this.TYPE = OG.Constants.GEOM_TYPE.NULL;

	/**
	 * {Boolean} 닫힌 기하 객체 인지 여부
	 */
	this.IS_CLOSED = false;

	/**
	 * {OG.geometry.Style} 스타일 속성
	 */
	this.style = new OG.geometry.Style();

	/**
	 * {OG.geometry.Envelope} 공간기하객체를 포함하는 사각형의 Boundary 영역
	 */
	this.boundary = null;

	// 다른 Geometry 객체와의 Spatial Relation 을 테스트하는 함수들

	/**
	 * 주어진 Geometry 객체와 같은지 비교한다.
	 *
	 * @param {OG.geometry.Geometry} _geometry Geometry 객체
	 * @return {Boolean} true:같음, false:다름
	 */
	this.isEquals = function (_geometry) {
		return _geometry && _geometry.toString() === this.toString();
	};

	/**
	 * 주어진 공간기하객체를 포함하는지 비교한다.
	 *
	 * @param {OG.geometry.Geometry} _geometry Geometry 객체
	 * @return {Boolean} 포함하면 true
	 */
	this.isContains = function (_geometry) {
		throw new OG.NotImplementedException();
	};

	/**
	 * 주어진 공간기하객체에 포함되는지 비교한다.
	 *
	 * @param {OG.geometry.Geometry} _geometry Geometry 객체
	 * @return {Boolean} 포함되면 true
	 */
	this.isWithin = function (_geometry) {
		throw new OG.NotImplementedException();
	};

//	this.isDisjoint = function (_geometry) {
//		throw new OG.NotImplementedException();
//	};
//
//	this.isIntersects = function (_geometry) {
//		throw new OG.NotImplementedException();
//	};
//
//	this.isOverlaps = function (_geometry) {
//		throw new OG.NotImplementedException();
//	};
//
//	this.isTouches = function (_geometry) {
//		throw new OG.NotImplementedException();
//	};

	// 현 Geometry 객체의 Spatial Analysis 를 지원하는 함수들

	/**
	 * 공간기하객체를 포함하는 사각형의 Boundary 영역을 반환한다.
	 *
	 * @return {OG.geometry.Envelope} Envelope 영역
	 */
	this.getBoundary = function () {
		if (this.boundary === null) {
			var minX, minY, maxX, maxY, upperLeft, width, height,
				vertices = this.getVertices(), i;
			for (i = 0; i < vertices.length; i++) {
				if (i === 0) {
					minX = maxX = vertices[i].x;
					minY = maxY = vertices[i].y;
				}
				minX = vertices[i].x < minX ? vertices[i].x : minX;
				minY = vertices[i].y < minY ? vertices[i].y : minY;
				maxX = vertices[i].x > maxX ? vertices[i].x : maxX;
				maxY = vertices[i].y > maxY ? vertices[i].y : maxY;
			}
			upperLeft = new OG.geometry.Coordinate(minX, minY);
			width = maxX - minX;
			height = maxY - minY;

			this.boundary = new OG.geometry.Envelope(upperLeft, width, height);
		}

		return this.boundary;
	};

	/**
	 * 공간기하객체의 중심좌표를 반환한다.
	 *
	 * @return {OG.geometry.Coordinate} 중심좌표
	 */
	this.getCentroid = function () {
		return this.getBoundary().getCentroid();
	};

	/**
	 * 공간기하객체의 모든 꼭지점을 반환한다.
	 *
	 * @return {OG.geometry.Coordinate[]} 꼭지점 좌표 Array
	 * @abstract
	 */
	this.getVertices = function () {
		throw new OG.NotImplementedException();
	};

	/**
	 * 주어진 좌표와의 최단거리를 반환한다.
	 *
	 * @param {OG.geometry.Coordinate} _coordinate 좌표
	 * @return {Number} 최단거리
	 */
	this.minDistance = function (_coordinate) {
		var minDistance = Number.MAX_VALUE,
			distance = 0,
			vertices = this.getVertices(),
			i;

		_coordinate = this.convertCoordinate(_coordinate);

		if (vertices.length === 1) {
			return _coordinate.distance(vertices[0]);
		}

		for (i = 0; i < vertices.length - 1; i++) {
			distance = this.distanceToLine(_coordinate, [vertices[i], vertices[i + 1]]);
			if (distance < minDistance) {
				minDistance = distance;
			}
		}

		return minDistance;
	};

	/**
	 * 주어진 공간기하객체와의 중심점 간의 거리를 반환한다.
	 *
	 * @param {OG.geometry.Geometry} _geometry 공간 기하 객체
	 * @return {Number} 거리
	 */
	this.distance = function (_geometry) {
		return this.getCentroid().distance(_geometry.getCentroid());
	};

	/**
	 * 공간기하객체의 길이를 반환한다.
	 *
	 * @return {Number} 길이
	 */
	this.getLength = function () {
		var length = 0,
			vertices = this.getVertices(),
			i;
		for (i = 0; i < vertices.length - 1; i++) {
			length += vertices[i].distance(vertices[i + 1]);
		}

		return length;
	};

//	this.intersect = function (_geometry) {
//		throw new OG.NotImplementedException();
//	};
//
//	this.union = function (_geometry) {
//		throw new OG.NotImplementedException();
//	};

	// 현 Geometry 객체의 Spatial Transform 를 지원하는 함수들

	/**
	 * 가로, 세로 Offset 만큼 좌표를 이동한다.
	 *
	 * @param {Number} offsetX 가로 Offset
	 * @param {Number} offsetY 세로 Offset
	 * @return {OG.geometry.Geometry} 이동된 공간 기하 객체
	 * @abstract
	 */
	this.move = function (offsetX, offsetY) {
		throw new OG.NotImplementedException();
	};

	/**
	 * 주어진 중심좌표로 공간기하객체를 이동한다.
	 *
	 * @param {OG.geometry.Coordinate} 중심 좌표
	 */
	this.moveCentroid = function (target) {
		var origin = this.getCentroid();
		target = new OG.geometry.Coordinate(target);

		this.move(target.x - origin.x, target.y - origin.y);
	};

	/**
	 * 상, 하, 좌, 우 외곽선을 이동하여 Envelope 을 리사이즈 한다.
	 *
	 * @param {Number} upper 상단 라인 이동 Offset(위 방향으로 +)
	 * @param {Number} lower 하단 라인 이동 Offset(아래 방향으로 +)
	 * @param {Number} left 좌측 라인 이동 Offset(좌측 방향으로 +)
	 * @param {Number} right 우측 라인 이동 Offset(우측 방향으로 +)
	 * @return {OG.geometry.Geometry} 리사이즈된 공간 기하 객체
	 * @abstract
	 */
	this.resize = function (upper, lower, left, right) {
		throw new OG.NotImplementedException();
	};

	/**
	 * 중심좌표는 고정한 채 Bounding Box 의 width, height 를 리사이즈 한다.
	 *
	 * @param {Number} width 너비
	 * @param {Number} height 높이
	 * @return {OG.geometry.Geometry} 리사이즈된 공간 기하 객체
	 */
	this.resizeBox = function (width, height) {
		var boundary = this.getBoundary(),
			offsetWidth = OG.Util.round((width - boundary.getWidth()) / 2),
			offsetHeight = OG.Util.round((height - boundary.getHeight()) / 2);

		this.resize(offsetHeight, offsetHeight, offsetWidth, offsetWidth);

		return this;
	};

	/**
	 * 기준 좌표를 기준으로 주어진 각도 만큼 회전한다.
	 *
	 * @param {Number} angle 회전 각도
	 * @param {OG.geometry.Coordinate} origin 기준 좌표(default:중심좌표)
	 * @return {OG.geometry.Geometry} 회전된 공간 기하 객체
	 * @abstract
	 */
	this.rotate = function (angle, origin) {
		throw new OG.NotImplementedException();
	};

	/**
	 * 주어진 Boundary 영역 안으로 공간 기하 객체를 적용한다.(이동 & 리사이즈)
	 *
	 * @param {OG.geometry.Envelope} envelope Envelope 영역
	 * @return {OG.geometry.Geometry} 적용된 공간 기하 객체
	 */
	this.fitToBoundary = function (envelope) {
		var boundary = this.getBoundary(),
			upper = boundary.getUpperCenter().y - envelope.getUpperCenter().y,
			lower = envelope.getLowerCenter().y - boundary.getLowerCenter().y,
			left = boundary.getLeftCenter().x - envelope.getLeftCenter().x,
			right = envelope.getRightCenter().x - boundary.getRightCenter().x;

		this.resize(upper, lower, left, right);

		return this;
	};

	// 유틸리티 함수들

	/**
	 * 파라미터가 [x, y] 형식의 좌표 Array 이면 OG.geometry.Coordinate 인스턴스를 new 하여 반환한다.
	 *
	 * @param {OG.geometry.Coordinate,Number[]} coordinate [x, y] 형식의 좌표 Array 또는 OG.geometry.Coordinate 인스턴스
	 * @return {OG.geometry.Coordinate}
	 */
	this.convertCoordinate = function (coordinate) {
		// Array 좌표를 OG.geometry.Coordinate 로 변환
		if (coordinate) {
			if (coordinate.constructor === Array) {
				return new OG.geometry.Coordinate(coordinate);
			} else if (coordinate instanceof OG.geometry.Coordinate) {
				return new OG.geometry.Coordinate(coordinate.x, coordinate.y);
			} else {
				throw new OG.ParamError();
			}
		} else {
			return undefined;
		}
	};

	/**
	 * 포인트 P 로부터 라인 AB의 거리를 계산한다.
	 * Note: NON-ROBUST!
	 *
	 * @param {OG.geometry.Coordinate,Number[]} p 기준좌표
	 * @param {OG.geometry.Coordinate[]} line 라인 시작좌표, 끝좌표 Array
	 * @return {Number} 거리
	 */
	this.distanceToLine = function (p, line) {
		var A = this.convertCoordinate(line[0]),
			B = this.convertCoordinate(line[1]),
			r, s;
		p = this.convertCoordinate(p);

		// if start==end, then use pt distance
		if (A.isEquals(B)) {
			return p.distance(A);
		}

		// otherwise use comp.graphics.algorithms Frequently Asked Questions method
		//	(1)				AC dot AB
		//			   r = -----------
		//					||AB||^2
		//	r has the following meaning:
		//	r=0 P = A
		//	r=1 P = B
		//	r<0 P is on the backward extension of AB
		//	r>1 P is on the forward extension of AB
		//	0<r<1 P is interior to AB

		r = ((p.x - A.x) * (B.x - A.x) + (p.y - A.y) * (B.y - A.y)) /
			((B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y));

		if (r <= 0.0) {
			return p.distance(A);
		}
		if (r >= 1.0) {
			return p.distance(B);
		}

		// (2)
		//		 (Ay-Cy)(Bx-Ax)-(Ax-Cx)(By-Ay)
		//	s = -----------------------------
		//					L^2
		//
		//	Then the distance from C to P = |s|*L.

		s = ((A.y - p.y) * (B.x - A.x) - (A.x - p.x) * (B.y - A.y)) /
			((B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y));

		return OG.Util.round(Math.abs(s) *
			Math.sqrt(((B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y))));
	};

	/**
	 * 라인1 로부터 라인2 의 거리를 계산한다.
	 * Note: NON-ROBUST!
	 *
	 * @param {OG.geometry.Coordinate[]} line1 line1 라인 시작좌표, 끝좌표 Array
	 * @param {OG.geometry.Coordinate[]} line2 line2 라인 시작좌표, 끝좌표 Array
	 * @return {Number} 거리
	 */
	this.distanceLineToLine = function (line1, line2) {
		var A = this.convertCoordinate(line1[0]),
			B = this.convertCoordinate(line1[1]),
			C = this.convertCoordinate(line2[0]),
			D = this.convertCoordinate(line2[1]),
			r_top, r_bot, s_top, s_bot, s, r;

		// check for zero-length segments
		if (A.isEquals(B)) {
			return this.distanceToLine(A, [C, D]);
		}
		if (C.isEquals(D)) {
			return this.distanceToLine(D, [A, B]);
		}

		// AB and CD are line segments
		//   from comp.graphics.algo
		//
		//  Solving the above for r and s yields
		//				(Ay-Cy)(Dx-Cx)-(Ax-Cx)(Dy-Cy)
		//			r = ----------------------------- (eqn 1)
		//				(Bx-Ax)(Dy-Cy)-(By-Ay)(Dx-Cx)
		//
		//			(Ay-Cy)(Bx-Ax)-(Ax-Cx)(By-Ay)
		//		s = ----------------------------- (eqn 2)
		//			(Bx-Ax)(Dy-Cy)-(By-Ay)(Dx-Cx)
		//	Let P be the position vector of the intersection point, then
		//		P=A+r(B-A) or
		//		Px=Ax+r(Bx-Ax)
		//		Py=Ay+r(By-Ay)
		//	By examining the values of r & s, you can also determine some other
		//	limiting conditions:
		//		If 0<=r<=1 & 0<=s<=1, intersection exists
		//		r<0 or r>1 or s<0 or s>1 line segments do not intersect
		//		If the denominator in eqn 1 is zero, AB & CD are parallel
		//		If the numerator in eqn 1 is also zero, AB & CD are collinear.
		r_top = (A.y - C.y) * (D.x - C.x) - (A.x - C.x) * (D.y - C.y);
		r_bot = (B.x - A.x) * (D.y - C.y) - (B.y - A.y) * (D.x - C.x);
		s_top = (A.y - C.y) * (B.x - A.x) - (A.x - C.x) * (B.y - A.y);
		s_bot = (B.x - A.x) * (D.y - C.y) - (B.y - A.y) * (D.x - C.x);

		if ((r_bot === 0) || (s_bot === 0)) {
			return Math.min(this.distanceToLine(A, [C, D]),
				Math.min(this.distanceToLine(B, [C, D]),
					Math.min(this.distanceToLine(C, [A, B]), this.distanceToLine(D, [A, B]))));

		}
		s = s_top / s_bot;
		r = r_top / r_bot;

		if ((r < 0) || (r > 1) || (s < 0) || (s > 1)) {
			//no intersection
			return Math.min(this.distanceToLine(A, [C, D]),
				Math.min(this.distanceToLine(B, [C, D]),
					Math.min(this.distanceToLine(C, [A, B]), this.distanceToLine(D, [A, B]))));
		}

		//intersection exists
		return 0;
	};

	/**
	 * 주어진 라인과 교차하는 좌표를 반환한다.
	 *
	 * @param {OG.geometry.Coordinate[]} line 라인 시작좌표, 끝좌표 Array
	 * @return {OG.geometry.Coordinate[]}
	 */
	this.intersectToLine = function (line) {
		var vertices = this.getVertices(), result = [], point, i,
			contains = function (coordinateArray, coordinate) {
				var k;
				for (k = 0; k < coordinateArray.length; k++) {
					if (coordinateArray[k].isEquals(coordinate)) {
						return true;
					}
				}
				return false;
			};

		for (i = 0; i < vertices.length - 1; i++) {
			point = this.intersectLineToLine(line, [vertices[i], vertices[i + 1]]);
			if (point && !contains(result, point)) {
				result.push(point);
			}
		}

		return result;
	};

	/**
	 * 라인1 로부터 라인2 의 교차점을 계산한다.
	 *
	 * @param {OG.geometry.Coordinate[]} line1 line1 라인 시작좌표, 끝좌표 Array
	 * @param {OG.geometry.Coordinate[]} line2 line2 라인 시작좌표, 끝좌표 Array
	 * @return {OG.geometry.Coordinate} 교차점
	 */
	this.intersectLineToLine = function (line1, line2) {
		var A = this.convertCoordinate(line1[0]),
			B = this.convertCoordinate(line1[1]),
			C = this.convertCoordinate(line2[0]),
			D = this.convertCoordinate(line2[1]),
			result,
			resultText,
			r_top, r_bot, s_top, s_bot, r, s;

		// check for zero-length segments
		if (A.isEquals(B)) {
			return this.distanceToLine(A, [C, D]) === 0 ? A : undefined;
		}
		if (C.isEquals(D)) {
			return this.distanceToLine(C, [A, B]) === 0 ? C : undefined;
		}

		// AB and CD are line segments
		//   from comp.graphics.algo
		//
		//  Solving the above for r and s yields
		//				(Ay-Cy)(Dx-Cx)-(Ax-Cx)(Dy-Cy)
		//			r = ----------------------------- (eqn 1)
		//				(Bx-Ax)(Dy-Cy)-(By-Ay)(Dx-Cx)
		//
		//			(Ay-Cy)(Bx-Ax)-(Ax-Cx)(By-Ay)
		//		s = ----------------------------- (eqn 2)
		//			(Bx-Ax)(Dy-Cy)-(By-Ay)(Dx-Cx)
		//	Let P be the position vector of the intersection point, then
		//		P=A+r(B-A) or
		//		Px=Ax+r(Bx-Ax)
		//		Py=Ay+r(By-Ay)
		//	By examining the values of r & s, you can also determine some other
		//	limiting conditions:
		//		If 0<=r<=1 & 0<=s<=1, intersection exists
		//		r<0 or r>1 or s<0 or s>1 line segments do not intersect
		//		If the denominator in eqn 1 is zero, AB & CD are parallel
		//		If the numerator in eqn 1 is also zero, AB & CD are collinear.
		r_top = (A.y - C.y) * (D.x - C.x) - (A.x - C.x) * (D.y - C.y);
		r_bot = (B.x - A.x) * (D.y - C.y) - (B.y - A.y) * (D.x - C.x);
		s_top = (A.y - C.y) * (B.x - A.x) - (A.x - C.x) * (B.y - A.y);
		s_bot = (B.x - A.x) * (D.y - C.y) - (B.y - A.y) * (D.x - C.x);

		if (r_bot !== 0 && s_bot !== 0) {
			r = r_top / r_bot;
			s = s_top / s_bot;
			if (0 <= r && r <= 1 && 0 <= s && s <= 1) {
				resultText = "Intersection";
				result = new OG.Coordinate(OG.Util.round(A.x + r * (B.x - A.x)), OG.Util.round(A.y + r * (B.y - A.y)));
			} else {
				resultText = "No Intersection";
			}
		} else {
			if (r_top === 0 || s_top === 0) {
				resultText = "Coincident";
			} else {
				resultText = "Parallel";
			}
		}

		return result;
	};

	/**
	 * 라인1 로부터 라인2 의 교차점을 계산한다.
	 *
	 * @param {OG.geometry.Coordinate} center 중심점
	 * @param {Number} radius 반경
	 * @param {OG.geometry.Coordinate} from line 라인 시작좌표
	 * @param {OG.geometry.Coordinate} to line 라인 끝좌표
	 * @return {OG.geometry.Coordinate[]} 교차점
	 */
	this.intersectCircleToLine = function (center, radius, from, to) {
		var result = [],
			a = (to.x - from.x) * (to.x - from.x) +
				(to.y - from.y) * (to.y - from.y),
			b = 2 * ( (to.x - from.x) * (from.x - center.x) +
				(to.y - from.y) * (from.y - center.y)   ),
			cc = center.x * center.x + center.y * center.y + from.x * from.x + from.y * from.y -
				2 * (center.x * from.x + center.y * from.y) - radius * radius,
			deter = b * b - 4 * a * cc,
			resultText,
			lerp = function (from, to, t) {
				return new OG.Coordinate(
					OG.Util.round(from.x + (to.x - from.x) * t),
					OG.Util.round(from.y + (to.y - from.y) * t)
				);
			},
			e, u1, u2;

		if (deter < 0) {
			resultText = "Outside";
		} else if (deter === 0) {
			resultText = "Tangent";
			// NOTE: should calculate this point
		} else {
			e = Math.sqrt(deter);
			u1 = (-b + e) / (2 * a);
			u2 = (-b - e) / (2 * a);

			if ((u1 < 0 || u1 > 1) && (u2 < 0 || u2 > 1)) {
				if ((u1 < 0 && u2 < 0) || (u1 > 1 && u2 > 1)) {
					resultText = "Outside";
				} else {
					resultText = "Inside";
				}
			} else {
				resultText = "Intersection";

				if (0 <= u1 && u1 <= 1) {
					result.push(lerp(from, to, u1));
				}

				if (0 <= u2 && u2 <= 1) {
					result.push(lerp(from, to, u2));
				}
			}
		}

		return result;
	};

	/**
	 * 저장된 boundary 를 클리어하여 새로 계산하도록 한다.
	 */
	this.reset = function () {
		this.boundary = null;
	};
};
OG.geometry.Geometry.prototype = new OG.geometry.Geometry();
OG.geometry.Geometry.prototype.constructor = OG.geometry.Geometry;
/**
 * PolyLine 공간 기하 객체(Spatial Geometry Object)
 *
 * @class
 * @extends OG.geometry.Geometry
 * @requires OG.geometry.Coordinate, OG.geometry.Envelope, OG.geometry.Geometry
 *
 * @param {OG.geometry.Coordinate[]} vertices Line Vertex 좌표 Array
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.geometry.PolyLine = function (vertices) {

	var i;

	/**
	 * {Number} 공간 기하 객체 타입
	 */
	this.TYPE = OG.Constants.GEOM_TYPE.POLYLINE;

	/**
	 * {Boolean} 닫힌 기하 객체 인지 여부
	 */
	this.IS_CLOSED = false;

	/**
	 * {OG.geometry.Style} 스타일 속성
	 */
	this.style = new OG.geometry.Style();

	/**
	 * {OG.geometry.Coordinate[]} Line Vertex 좌표 Array
	 */
	this.vertices = [];

	// Array 좌표를 OG.geometry.Coordinate 로 변환
	if (vertices && vertices.length > 0) {
		for (i = 0; i < vertices.length; i++) {
			this.vertices.push(this.convertCoordinate(vertices[i]));
		}
	}

	/**
	 * 공간기하객체의 모든 꼭지점을 반환한다.
	 *
	 * @return {OG.geometry.Coordinate[]} 꼭지점 좌표 Array
	 * @override
	 */
	this.getVertices = function () {
		return this.vertices;
	};

	/**
	 * 가로, 세로 Offset 만큼 좌표를 이동한다.
	 *
	 * @param {Number} offsetX 가로 Offset
	 * @param {Number} offsetY 세로 Offset
	 * @return {OG.geometry.Geometry} 이동된 공간 기하 객체
	 * @override
	 */
	this.move = function (offsetX, offsetY) {
		this.getBoundary().move(offsetX, offsetY);
		for (i = 0; i < this.vertices.length; i++) {
			this.vertices[i].move(offsetX, offsetY);
		}

		return this;
	};

	/**
	 * 상, 하, 좌, 우 외곽선을 이동하여 Envelope 을 리사이즈 한다.
	 *
	 * @param {Number} upper 상단 라인 이동 Offset(위 방향으로 +)
	 * @param {Number} lower 하단 라인 이동 Offset(아래 방향으로 +)
	 * @param {Number} left 좌측 라인 이동 Offset(좌측 방향으로 +)
	 * @param {Number} right 우측 라인 이동 Offset(우측 방향으로 +)
	 * @return {OG.geometry.Geometry} 리사이즈된 공간 기하 객체
	 * @override
	 */
	this.resize = function (upper, lower, left, right) {
		var boundary = this.getBoundary(),
			offsetX = left + right,
			offsetY = upper + lower,
			width = boundary.getWidth() + offsetX,
			height = boundary.getHeight() + offsetY,
			rateWidth = boundary.getWidth() === 0 ? 1 : width / boundary.getWidth(),
			rateHeight = boundary.getHeight() === 0 ? 1 : height / boundary.getHeight(),
			upperLeft = boundary.getUpperLeft();

		if (width < 0 || height < 0) {
			throw new OG.ParamError();
		}

		for (i = 0; i < this.vertices.length; i++) {
			this.vertices[i].x = OG.Util.round((upperLeft.x - left) + (this.vertices[i].x - upperLeft.x) * rateWidth);
			this.vertices[i].y = OG.Util.round((upperLeft.y - upper) + (this.vertices[i].y - upperLeft.y) * rateHeight);
		}
		boundary.resize(upper, lower, left, right);

		return this;
	};

	/**
	 * 기준 좌표를 기준으로 주어진 각도 만큼 회전한다.
	 *
	 * @param {Number} angle 회전 각도
	 * @param {OG.geometry.Coordinate} origin 기준 좌표
	 * @return {OG.geometry.Geometry} 회전된 공간 기하 객체
	 * @override
	 */
	this.rotate = function (angle, origin) {
		origin = origin || this.getCentroid();
		for (i = 0; i < this.vertices.length; i++) {
			this.vertices[i].rotate(angle, origin);
		}
		this.reset();

		return this;
	};

	/**
	 * 객체 프라퍼티 정보를 JSON 스트링으로 반환한다.
	 *
	 * @return {String} 프라퍼티 정보
	 * @override
	 */
	this.toString = function () {
		var s = [];
		s.push("type:'" + OG.Constants.GEOM_NAME[this.TYPE] + "'");
		s.push("vertices:[" + this.vertices + "]");

		return "{" + s.join() + "}";
	};
};
OG.geometry.PolyLine.prototype = new OG.geometry.Geometry();
OG.geometry.PolyLine.prototype.constructor = OG.geometry.PolyLine;
OG.PolyLine = OG.geometry.PolyLine;
/**
 * Catmull-Rom Spline Curve 공간 기하 객체(Spatial Geometry Object)
 *
 * @class
 * @extends OG.geometry.Geometry
 * @requires OG.geometry.Coordinate, OG.geometry.Envelope, OG.geometry.Geometry, OG.common.CurveUtil
 *
 * @param {OG.geometry.Coordinate[]} controlPoints Curve Vertex 좌표 Array
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.geometry.Curve = function (controlPoints) {

	OG.geometry.Curve.superclass.call(this, controlPoints);

	var t, cmRomSpline = OG.CurveUtil.CatmullRomSpline(eval("[" + this.vertices.toString() + "]"));

	// t 는 0 ~ maxT 의 값으로, t 값의 증분값이 작을수록 세밀한 Curve 를 그린다.
	this.vertices = [];
	for (t = 0; t <= cmRomSpline.maxT; t += 0.1) {
		this.vertices.push(new OG.geometry.Coordinate(
			OG.Util.round(cmRomSpline.getX(t)),
			OG.Util.round(cmRomSpline.getY(t))
		));
	}

	/**
	 * {Number} 공간 기하 객체 타입
	 */
	this.TYPE = OG.Constants.GEOM_TYPE.CURVE;

	/**
	 * {Boolean} 닫힌 기하 객체 인지 여부
	 */
	this.IS_CLOSED = false;

	/**
	 * {OG.geometry.Style} 스타일 속성
	 */
	this.style = new OG.geometry.Style();

	/**
	 * 공간기하객체의 모든 꼭지점을 반환한다.
	 *
	 * @return {OG.geometry.Coordinate[]} 꼭지점 좌표 Array
	 * @override
	 */
	this.getVertices = function () {
		var vertices = [], i;
		for (i = 10; i <= this.vertices.length - 10; i++) {
			vertices.push(this.vertices[i]);
		}

		return vertices;
	};

	/**
	 * 콘트롤 포인트 목록을 반환한다.
	 *
	 * @return {OG.geometry.Coordinate[]} controlPoints Array
	 */
	this.getControlPoints = function () {
		var controlPoints = [], i;
		for (i = 10; i <= this.vertices.length - 10; i += 10) {
			controlPoints.push(this.vertices[i]);
		}

		return controlPoints;
	};

	/**
	 * 객체 프라퍼티 정보를 JSON 스트링으로 반환한다.
	 *
	 * @return {String} 프라퍼티 정보
	 * @override
	 */
	this.toString = function () {
		var s = [];
		s.push("type:'" + OG.Constants.GEOM_NAME[this.TYPE] + "'");
		s.push("vertices:[" + this.getVertices() + "]");
		s.push("controlPoints:[" + this.getControlPoints() + "]");

		return "{" + s.join() + "}";
	};
};
OG.geometry.Curve.prototype = new OG.geometry.PolyLine();
OG.geometry.Curve.superclass = OG.geometry.PolyLine;
OG.geometry.Curve.prototype.constructor = OG.geometry.Curve;
OG.Curve = OG.geometry.Curve;
/**
 * Ellipse 공간 기하 객체(Spatial Geometry Object)
 *
 * @class
 * @extends OG.geometry.Curve
 * @requires OG.geometry.Coordinate, OG.geometry.Envelope, OG.geometry.Geometry
 *
 * @param {OG.geometry.Coordinate} center Ellipse 중심 좌표
 * @param {Number} radiusX X축 반경
 * @param {Number} radiusY Y축 반경
 * @param {Number} angle X축 기울기
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.geometry.Ellipse = function (center, radiusX, radiusY, angle) {

	var _center = this.convertCoordinate(center),
		_angle = angle || 0,
		theta,
		i,
		controlPoints = [];

	if (_center) {
		for (i = -45; i <= 405; i += 45) {
			theta = Math.PI / 180 * i;
			controlPoints.push((new OG.geometry.Coordinate(
				OG.Util.round(_center.x + radiusX * Math.cos(theta)),
				OG.Util.round(_center.y + radiusY * Math.sin(theta))
			)).rotate(_angle, _center));
		}
	}

	OG.geometry.Ellipse.superclass.call(this, controlPoints);

	/**
	 * {Number} 공간 기하 객체 타입
	 */
	this.TYPE = OG.Constants.GEOM_TYPE.ELLIPSE;

	/**
	 * {Boolean} 닫힌 기하 객체 인지 여부
	 */
	this.IS_CLOSED = true;

	/**
	 * {OG.geometry.Style} 스타일 속성
	 */
	this.style = new OG.geometry.Style();

	/**
	 * 공간기하객체의 모든 꼭지점을 반환한다.
	 *
	 * @return {OG.geometry.Coordinate[]} 꼭지점 좌표 Array
	 * @override
	 */
	this.getVertices = function () {
		var vertices = [];
		for (i = 20; i < this.vertices.length - 20; i++) {
			vertices.push(this.vertices[i]);
		}

		return vertices;
	};

	/**
	 * 콘트롤 포인트 목록을 반환한다.
	 *
	 * @return {OG.geometry.Coordinate[]} controlPoints Array
	 */
	this.getControlPoints = function () {
		var controlPoints = [];
		for (i = 10; i <= this.vertices.length - 10; i += 10) {
			controlPoints.push(this.vertices[i]);
		}

		return controlPoints;
	};

	/**
	 * 공간기하객체의 길이를 반환한다.
	 *
	 * @return {Number} 길이
	 * @override
	 */
	this.getLength = function () {
		// π{5(a+b)/4 - ab/(a+b)}
		var controlPoints = this.getControlPoints(),
			radiusX = center.distance(controlPoints[1]),
			radiusY = center.distance(controlPoints[3]);
		return Math.PI * (5 * (radiusX + radiusY) / 4 - radiusX * radiusY / (radiusX + radiusY));
	};

	/**
	 * 객체 프라퍼티 정보를 JSON 스트링으로 반환한다.
	 *
	 * @return {String} 프라퍼티 정보
	 * @override
	 */
	this.toString = function () {
		var s = [],
			controlPoints = this.getControlPoints(),
			center = this.getCentroid(),
			radiusX = center.distance(controlPoints[1]),
			radiusY = center.distance(controlPoints[3]),
			angle = OG.Util.round(Math.atan2(controlPoints[1].y - center.y, controlPoints[1].x - center.x) * 180 / Math.PI);

		s.push("type:'" + OG.Constants.GEOM_NAME[this.TYPE] + "'");
		s.push("center:" + center);
		s.push("radiusX:" + radiusX);
		s.push("radiusY:" + radiusY);
		s.push("angle:" + angle);

		return "{" + s.join() + "}";
	};
};
OG.geometry.Ellipse.prototype = new OG.geometry.Curve();
OG.geometry.Ellipse.superclass = OG.geometry.Curve;
OG.geometry.Ellipse.prototype.constructor = OG.geometry.Ellipse;
OG.Ellipse = OG.geometry.Ellipse;
/**
 * Circle 공간 기하 객체(Spatial Geometry Object)
 *
 * @class
 * @extends OG.geometry.Ellipse
 * @requires OG.geometry.Coordinate, OG.geometry.Envelope, OG.geometry.Geometry
 *
 * @param {OG.geometry.Coordinate} center Circle 중심 좌표
 * @param {Number} radius radius 반경
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.geometry.Circle = function (center, radius) {

	OG.geometry.Circle.superclass.call(this, center, radius, radius, 0);

	/**
	 * {Number} 공간 기하 객체 타입
	 */
	this.TYPE = OG.Constants.GEOM_TYPE.CIRCLE;

	/**
	 * {Boolean} 닫힌 기하 객체 인지 여부
	 */
	this.IS_CLOSED = true;

	/**
	 * {OG.geometry.Style} 스타일 속성
	 */
	this.style = new OG.geometry.Style();

	/**
	 * 공간기하객체의 길이를 반환한다.
	 *
	 * @return {Number} 길이
	 * @override
	 */
	this.getLength = function () {
		var controlPoints = this.getControlPoints(),
			radiusX = center.distance(controlPoints[1]);
		return 2 * Math.PI * radiusX;
	};

	/**
	 * 객체 프라퍼티 정보를 JSON 스트링으로 반환한다.
	 *
	 * @return {String} 프라퍼티 정보
	 * @override
	 */
	this.toString = function () {
		var s = [],
			controlPoints = this.getControlPoints(),
			center = this.getCentroid(),
			radiusX = center.distance(controlPoints[1]),
			radiusY = center.distance(controlPoints[3]),
			angle = OG.Util.round(Math.atan2(controlPoints[1].y - center.y, controlPoints[1].x - center.x) * 180 / Math.PI);

		if (radiusX === radiusY) {
			s.push("type:'" + OG.Constants.GEOM_NAME[this.TYPE] + "'");
			s.push("center:" + center);
			s.push("radius:" + radiusX);
		} else {
			s.push("type:'" + OG.Constants.GEOM_NAME[OG.Constants.GEOM_TYPE.ELLIPSE] + "'");
			s.push("center:" + center);
			s.push("radiusX:" + radiusX);
			s.push("radiusY:" + radiusY);
			s.push("angle:" + angle);
		}

		return "{" + s.join() + "}";
	};
};
OG.geometry.Circle.prototype = new OG.geometry.Ellipse();
OG.geometry.Circle.superclass = OG.geometry.Ellipse;
OG.geometry.Circle.prototype.constructor = OG.geometry.Circle;
OG.Circle = OG.geometry.Circle;
/**
 * 공간 기하 객체(Spatial Geometry Object) Collection
 *
 * @class
 * @extends OG.geometry.Geometry
 * @requires OG.geometry.Coordinate, OG.geometry.Envelope, OG.geometry.Geometry
 *
 * @param geometries {OG.geometry.Geometry[]} 공간 기하 객체 Array
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.geometry.GeometryCollection = function (geometries) {

	var i, j;

	/**
	 * {Number} 공간 기하 객체 타입
	 */
	this.TYPE = OG.Constants.GEOM_TYPE.COLLECTION;

	/**
	 * {OG.geometry.Geometry[]} 공간 기하 객체 Array
	 */
	this.geometries = geometries;

	/**
	 * {Boolean} 닫힌 기하 객체 인지 여부
	 */
	this.IS_CLOSED = false;

	/**
	 * {OG.geometry.Style} 스타일 속성
	 */
	this.style = new OG.geometry.Style();

	/**
	 * 공간기하객체의 모든 꼭지점을 반환한다.
	 *
	 * @return {OG.geometry.Coordinate[]} 꼭지점 좌표 Array
	 * @override
	 */
	this.getVertices = function () {
		var vertices = [], _vertices;
		for (i = 0; i < this.geometries.length; i++) {
			_vertices = this.geometries[i].getVertices();
			for (j = 0; j < _vertices.length; j++) {
				vertices.push(_vertices[j]);
			}
		}

		return vertices;
	};

	/**
	 * 가로, 세로 Offset 만큼 좌표를 이동한다.
	 *
	 * @param {Number} offsetX 가로 Offset
	 * @param {Number} offsetY 세로 Offset
	 * @return {OG.geometry.Geometry} 이동된 공간 기하 객체
	 * @override
	 */
	this.move = function (offsetX, offsetY) {
		var i;
		this.getBoundary().move(offsetX, offsetY);
		for (i = 0; i < this.geometries.length; i++) {
			this.geometries[i].move(offsetX, offsetY);
			this.geometries[i].reset();
		}

		return this;
	};

	/**
	 * 상, 하, 좌, 우 외곽선을 이동하여 Envelope 을 리사이즈 한다.
	 *
	 * @param {Number} upper 상단 라인 이동 Offset(위 방향으로 +)
	 * @param {Number} lower 하단 라인 이동 Offset(아래 방향으로 +)
	 * @param {Number} left 좌측 라인 이동 Offset(좌측 방향으로 +)
	 * @param {Number} right 우측 라인 이동 Offset(우측 방향으로 +)
	 * @return {OG.geometry.Geometry} 리사이즈된 공간 기하 객체
	 * @override
	 */
	this.resize = function (upper, lower, left, right) {
		var boundary = this.getBoundary(),
			offsetX = left + right,
			offsetY = upper + lower,
			width = boundary.getWidth() + offsetX,
			height = boundary.getHeight() + offsetY,
			rateWidth = boundary.getWidth() === 0 ? 1 : width / boundary.getWidth(),
			rateHeight = boundary.getHeight() === 0 ? 1 : height / boundary.getHeight(),
			upperLeft = boundary.getUpperLeft(),
			vertices;

		if (width < 0 || height < 0) {
			throw new OG.ParamError();
		}

		for (i = 0; i < this.geometries.length; i++) {
			vertices = this.geometries[i].vertices;
			for (j = 0; j < vertices.length; j++) {
				vertices[j].x = OG.Util.round((upperLeft.x - left) + (vertices[j].x - upperLeft.x) * rateWidth);
				vertices[j].y = OG.Util.round((upperLeft.y - upper) + (vertices[j].y - upperLeft.y) * rateHeight);
			}
			this.geometries[i].reset();
		}
		boundary.resize(upper, lower, left, right);

		return this;
	};

	/**
	 * 중심좌표는 고정한 채 Bounding Box 의 width, height 를 리사이즈 한다.
	 *
	 * @param {Number} width 너비
	 * @param {Number} height 높이
	 */
	this.resizeBox = function (width, height) {
		var boundary = this.getBoundary(),
			offsetWidth = OG.Util.round((width - boundary.getWidth()) / 2),
			offsetHeight = OG.Util.round((height - boundary.getHeight()) / 2);

		this.resize(offsetHeight, offsetHeight, offsetWidth, offsetWidth);

		return this;
	};

	/**
	 * 기준 좌표를 기준으로 주어진 각도 만큼 회전한다.
	 *
	 * @param {Number} angle 회전 각도
	 * @param {OG.geometry.Coordinate} origin 기준 좌표(default:중심좌표)
	 * @return {OG.geometry.Geometry} 회전된 공간 기하 객체
	 * @override
	 */
	this.rotate = function (angle, origin) {
		origin = origin || this.getCentroid();
		for (i = 0; i < this.geometries.length; i++) {
			this.geometries[i].rotate(angle, origin);
			this.geometries[i].reset();
		}
		this.reset();

		return this;
	};

	/**
	 * 주어진 Boundary 영역 안으로 공간 기하 객체를 적용한다.(이동 & 리사이즈)
	 *
	 * @param {OG.geometry.Envelope} envelope Envelope 영역
	 * @return {OG.geometry.Geometry} 적용된 공간 기하 객체
	 * @override
	 */
	this.fitToBoundary = function (envelope) {
		var boundary = this.getBoundary(),
			upper = boundary.getUpperCenter().y - envelope.getUpperCenter().y,
			lower = envelope.getLowerCenter().y - boundary.getLowerCenter().y,
			left = boundary.getLeftCenter().x - envelope.getLeftCenter().x,
			right = envelope.getRightCenter().x - boundary.getRightCenter().x;

		this.resize(upper, lower, left, right);

		return this;
	};

	/**
	 * 객체 프라퍼티 정보를 JSON 스트링으로 반환한다.
	 *
	 * @return {String} 프라퍼티 정보
	 * @override
	 */
	this.toString = function () {
		var s = [];

		for (i = 0; i < this.geometries.length; i++) {
			s.push(this.geometries[i].toString());
		}

		return "{type:'" + OG.Constants.GEOM_NAME[this.TYPE] + "',geometries:[" + s.join() + "]}";
	};
};
OG.geometry.GeometryCollection.prototype = new OG.geometry.Geometry();
OG.geometry.GeometryCollection.prototype.constructor = OG.geometry.GeometryCollection;
OG.GeometryCollection = OG.geometry.GeometryCollection;
/**
 * Line 공간 기하 객체(Spatial Geometry Object)
 *
 * @class
 * @extends OG.geometry.Geometry
 * @requires OG.geometry.Coordinate, OG.geometry.Envelope, OG.geometry.Geometry
 *
 * @param {OG.geometry.Coordinate} from 라인 시작 좌표값
 * @param {OG.geometry.Coordinate} to 라인 끝 좌표값
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.geometry.Line = function (from, to) {

	var _from = this.convertCoordinate(from),
		_to = this.convertCoordinate(to);

	OG.geometry.Line.superclass.call(this, [
		[_from.x, _from.y],
		[_to.x, _to.y]
	]);

	/**
	 * {Number} 공간 기하 객체 타입
	 */
	this.TYPE = OG.Constants.GEOM_TYPE.LINE;

	/**
	 * {Boolean} 닫힌 기하 객체 인지 여부
	 */
	this.IS_CLOSED = false;

	/**
	 * {OG.geometry.Style} 스타일 속성
	 */
	this.style = new OG.geometry.Style();

	/**
	 * 객체 프라퍼티 정보를 JSON 스트링으로 반환한다.
	 *
	 * @return {String} 프라퍼티 정보
	 * @override
	 */
	this.toString = function () {
		var s = [];
		s.push("type:'" + OG.Constants.GEOM_NAME[this.TYPE] + "'");
		s.push("from:" + this.vertices[0]);
		s.push("to:" + this.vertices[1]);

		return "{" + s.join() + "}";
	};
};
OG.geometry.Line.prototype = new OG.geometry.PolyLine();
OG.geometry.Line.superclass = OG.geometry.PolyLine;
OG.geometry.Line.prototype.constructor = OG.geometry.Line;
OG.Line = OG.geometry.Line;
/**
 * Point 공간 기하 객체(Spatial Geometry Object)
 *
 * @class
 * @extends OG.geometry.Geometry
 * @requires OG.geometry.Coordinate, OG.geometry.Envelope, OG.geometry.Geometry
 *
 * @param {OG.geometry.Coordinate} coordinate 좌표값
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.geometry.Point = function (coordinate) {

	/**
	 * {Number} 공간 기하 객체 타입
	 */
	this.TYPE = OG.Constants.GEOM_TYPE.POINT;

	/**
	 * {Boolean} 닫힌 기하 객체 인지 여부
	 */
	this.IS_CLOSED = false;

	/**
	 * {OG.geometry.Style} 스타일 속성
	 */
	this.style = new OG.geometry.Style();

	/**
	 * {OG.geometry.Coordinate} 좌표값
	 */
	this.coordinate = this.convertCoordinate(coordinate);

	/**
	 * {OG.geometry.Coordinate[]} Line Vertex 좌표 Array
	 */
	this.vertices = [this.coordinate];

	/**
	 * 공간기하객체의 모든 꼭지점을 반환한다.
	 *
	 * @return {OG.geometry.Coordinate[]} 꼭지점 좌표 Array
	 * @override
	 */
	this.getVertices = function () {
		return this.vertices;
	};

	/**
	 * 가로, 세로 Offset 만큼 좌표를 이동한다.
	 *
	 * @param {Number} offsetX 가로 Offset
	 * @param {Number} offsetY 세로 Offset
	 * @return {OG.geometry.Geometry} 이동된 공간 기하 객체
	 * @override
	 */
	this.move = function (offsetX, offsetY) {
		this.getBoundary().move(offsetX, offsetY);
		this.coordinate.move(offsetX, offsetY);
		this.vertices = [this.coordinate];

		return this;
	};

	/**
	 * 주어진 중심좌표로 공간기하객체를 이동한다.
	 *
	 * @param {OG.geometry.Coordinate} 중심 좌표
	 */
	this.moveCentroid = function (target) {
		this.getBoundary().setUpperLeft(target);
		this.coordinate = new OG.geometry.Coordinate(target);
		this.vertices = [this.coordinate];
	};

	/**
	 * 상, 하, 좌, 우 외곽선을 이동하여 Envelope 을 리사이즈 한다.
	 *
	 * @param {Number} upper 상단 라인 이동 Offset(위 방향으로 +)
	 * @param {Number} lower 하단 라인 이동 Offset(아래 방향으로 +)
	 * @param {Number} left 좌측 라인 이동 Offset(좌측 방향으로 +)
	 * @param {Number} right 우측 라인 이동 Offset(우측 방향으로 +)
	 * @return {OG.geometry.Geometry} 리사이즈된 공간 기하 객체
	 * @override
	 */
	this.resize = function (upper, lower, left, right) {
		var boundary = this.getBoundary();
		boundary.resize(upper, lower, left, right);

		this.coordinate = boundary.getCentroid();
		this.vertices = [this.coordinate];
		this.boundary = new OG.Envelope(this.coordinate, 0, 0);

		return this;
	};

	/**
	 * 중심좌표는 고정한 채 Bounding Box 의 width, height 를 리사이즈 한다.
	 *
	 * @param {Number} width 너비
	 * @param {Number} height 높이
	 * @return {OG.geometry.Geometry} 리사이즈된 공간 기하 객체
	 * @override
	 */
	this.resizeBox = function (width, height) {
		return this;
	};

	/**
	 * 기준 좌표를 기준으로 주어진 각도 만큼 회전한다.
	 *
	 * @param {Number} angle 회전 각도
	 * @param {OG.geometry.Coordinate} origin 기준 좌표
	 * @return {OG.geometry.Geometry} 회전된 공간 기하 객체
	 * @override
	 */
	this.rotate = function (angle, origin) {
		origin = origin || this.getCentroid();

		this.coordinate.rotate(angle, origin);
		this.vertices = [this.coordinate];
		this.reset();

		return this;
	};

	/**
	 * 주어진 Boundary 영역 안으로 공간 기하 객체를 적용한다.(이동 & 리사이즈)
	 *
	 * @param {OG.geometry.Envelope} envelope Envelope 영역
	 * @return {OG.geometry.Geometry} 적용된 공간 기하 객체
	 * @override
	 */
	this.fitToBoundary = function (envelope) {
		this.coordinate = envelope.getCentroid();
		this.vertices = [this.coordinate];
		this.boundary = new OG.Envelope(this.coordinate, 0, 0);

		return this;
	};

	/**
	 * 객체 프라퍼티 정보를 JSON 스트링으로 반환한다.
	 *
	 * @return {String} 프라퍼티 정보
	 * @override
	 */
	this.toString = function () {
		var s = [];
		s.push("type:'" + OG.Constants.GEOM_NAME[this.TYPE] + "'");
		s.push("coordinate:" + this.coordinate);

		return "{" + s.join() + "}";
	};
};
OG.geometry.Point.prototype = new OG.geometry.Geometry();
OG.geometry.Point.prototype.constructor = OG.geometry.Point;
OG.Point = OG.geometry.Point;
/**
 * Polygon 공간 기하 객체(Spatial Geometry Object)
 *
 * @class
 * @extends OG.geometry.PolyLine
 * @requires OG.geometry.Coordinate, OG.geometry.Envelope, OG.geometry.Geometry
 *
 * @param {OG.geometry.Coordinate[]} vertices Line Vertex 좌표 Array
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.geometry.Polygon = function (vertices) {

	OG.geometry.Polygon.superclass.call(this, vertices);

	// Polygon 은 첫번째 좌표와 마지막 좌표가 같음
	if (this.vertices.length > 0 && !this.vertices[0].isEquals(this.vertices[this.vertices.length - 1])) {
		this.vertices.push(new OG.geometry.Coordinate(this.vertices[0].x, this.vertices[0].y));
	}

	/**
	 * {Number} 공간 기하 객체 타입
	 */
	this.TYPE = OG.Constants.GEOM_TYPE.POLYGON;

	/**
	 * {Boolean} 닫힌 기하 객체 인지 여부
	 */
	this.IS_CLOSED = true;

	/**
	 * {OG.geometry.Style} 스타일 속성
	 */
	this.style = new OG.geometry.Style();
};
OG.geometry.Polygon.prototype = new OG.geometry.PolyLine();
OG.geometry.Polygon.superclass = OG.geometry.PolyLine;
OG.geometry.Polygon.prototype.constructor = OG.geometry.Polygon;
OG.Polygon = OG.geometry.Polygon;
/**
 * Rectangle 공간 기하 객체(Spatial Geometry Object)
 *
 * @class
 * @extends OG.geometry.Geometry
 * @requires OG.geometry.Coordinate, OG.geometry.Envelope, OG.geometry.Geometry
 *
 * @param {OG.geometry.Coordinate} upperLeft 좌상단좌표
 * @param {Number} width 너비
 * @param {Number} height 높이
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.geometry.Rectangle = function (upperLeft, width, height) {

	var _upperLeft = this.convertCoordinate(upperLeft),
		_lowerRight = this.convertCoordinate([_upperLeft.x + width, _upperLeft.y + height]);

	// 파라미터 유효성 체크
	if (_upperLeft.x > _lowerRight.x || _upperLeft.y > _lowerRight.y) {
		throw new OG.ParamError();
	}

	OG.geometry.Rectangle.superclass.call(this, [
		[_upperLeft.x, _upperLeft.y],
		[_upperLeft.x + (_lowerRight.x - _upperLeft.x), _upperLeft.y],
		[_lowerRight.x, _lowerRight.y],
		[_upperLeft.x, _upperLeft.y + (_lowerRight.y - _upperLeft.y)],
		[_upperLeft.x, _upperLeft.y]
	]);

	/**
	 * {Number} 공간 기하 객체 타입
	 */
	this.TYPE = OG.Constants.GEOM_TYPE.RECTANGLE;

	/**
	 * {Boolean} 닫힌 기하 객체 인지 여부
	 */
	this.IS_CLOSED = true;

	/**
	 * {OG.geometry.Style} 스타일 속성
	 */
	this.style = new OG.geometry.Style();

	/**
	 * 객체 프라퍼티 정보를 JSON 스트링으로 반환한다.
	 *
	 * @return {String} 프라퍼티 정보
	 * @override
	 */
	this.toString = function () {
		var s = [],
			angle = OG.Util.round(Math.atan2(this.vertices[1].y - this.vertices[0].y,
				this.vertices[1].x - this.vertices[0].x) * 180 / Math.PI);

		s.push("type:'" + OG.Constants.GEOM_NAME[this.TYPE] + "'");
		s.push("upperLeft:" + this.vertices[0]);
		s.push("width:" + (this.vertices[0].distance(this.vertices[1])));
		s.push("height:" + (this.vertices[0].distance(this.vertices[3])));
		s.push("angle:" + angle);

		return "{" + s.join() + "}";
	};
};
OG.geometry.Rectangle.prototype = new OG.geometry.Polygon();
OG.geometry.Rectangle.superclass = OG.geometry.Polygon;
OG.geometry.Rectangle.prototype.constructor = OG.geometry.Rectangle;
OG.Rectangle = OG.geometry.Rectangle;
/**
 * 도형, 텍스트, 이미지 등의 드로잉 될 Object 의 정보를 저장하는 Shape 정보 최상위 인터페이스
 *
 * @class
 * @requires OG.common.*, OG.geometry.*
 *
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.IShape = function () {
	this.TYPE = OG.Constants.NODE_TYPE.SHAPE;

	this.SHAPE_ID = 'OG.shape.IShape';

	this.geom = null;

	this.label = null;

	this.isCollapsed = false;

	/**
	 * Shape 간의 연결을 위한 Terminal 을 반환한다.
	 *
	 * @return {OG.Terminal[]} Terminal
	 * @abstract
	 */
	this.createTerminal = function () {
		return [];
	};

	/**
	 * 드로잉할 Shape 를 생성하여 반환한다.
	 *
	 * @return {*} Shape 정보
	 * @abstract
	 */
	this.createShape = function () {
		throw new OG.NotImplementedException("OG.shape.IShape.createShape");
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @abstract
	 */
	this.clone = function () {
		throw new OG.NotImplementedException("OG.shape.IShape.clone");
	};
};
OG.shape.IShape.prototype = new OG.shape.IShape();
OG.shape.IShape.prototype.constructor = OG.shape.IShape;
OG.IShape = OG.shape.IShape;
/**
 * Shape 의 Edge 연결 포인트 정보
 *
 * @class
 * @requires OG.common.*, OG.geometry.*
 *
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.Terminal = function (position, direction, inout) {
	this.position = position;
	this.direction = direction || OG.Constants.TERMINAL_TYPE.E;
	this.inout = inout || OG.Constants.TERMINAL_TYPE.INOUT;
};
OG.shape.Terminal.prototype = new OG.shape.Terminal();
OG.shape.Terminal.prototype.constructor = OG.shape.Terminal;
OG.Terminal = OG.shape.Terminal;
/**
 * Geometry Shape
 *
 * @class
 * @extends OG.shape.IShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.GeomShape = function () {
	this.TYPE = OG.Constants.SHAPE_TYPE.GEOM;

	this.SHAPE_ID = 'OG.shape.GeomShape';

	/**
	 * Shape 간의 연결을 위한 Terminal 을 반환한다.
	 *
	 * @return {OG.Terminal[]} Terminal
	 * @override
	 */
	this.createTerminal = function () {
		if (!this.geom) {
			return [];
		}

		var envelope = this.geom.getBoundary();

		return [
			new OG.Terminal(envelope.getCentroid(), OG.Constants.TERMINAL_TYPE.C, OG.Constants.TERMINAL_TYPE.INOUT),
			new OG.Terminal(envelope.getRightCenter(), OG.Constants.TERMINAL_TYPE.E, OG.Constants.TERMINAL_TYPE.INOUT),
			new OG.Terminal(envelope.getLeftCenter(), OG.Constants.TERMINAL_TYPE.W, OG.Constants.TERMINAL_TYPE.INOUT),
			new OG.Terminal(envelope.getLowerCenter(), OG.Constants.TERMINAL_TYPE.S, OG.Constants.TERMINAL_TYPE.INOUT),
			new OG.Terminal(envelope.getUpperCenter(), OG.Constants.TERMINAL_TYPE.N, OG.Constants.TERMINAL_TYPE.INOUT)
		];
	};

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @abstract
	 */
	this.createShape = function () {
		throw new OG.NotImplementedException("OG.shape.IShape.createShape");
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @abstract
	 */
	this.clone = function () {
		throw new OG.NotImplementedException("OG.shape.IShape.clone");
	};
};
OG.shape.GeomShape.prototype = new OG.shape.IShape();
OG.shape.GeomShape.prototype.constructor = OG.shape.GeomShape;
OG.GeomShape = OG.shape.GeomShape;
/**
 * Text Shape
 *
 * @class
 * @extends OG.shape.IShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} text 텍스트
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.TextShape = function (text) {

	this.TYPE = OG.Constants.SHAPE_TYPE.TEXT;

	this.SHAPE_ID = 'OG.shape.TextShape';

	this.text = text || "Text Here";

	this.angle = 0;

	/**
	 * 드로잉할 텍스트를 반환한다.
	 *
	 * @return {String} 텍스트
	 * @override
	 */
	this.createShape = function () {
		return this.text;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.TextShape(this.text);
	};
};
OG.shape.TextShape.prototype = new OG.shape.IShape();
OG.shape.TextShape.prototype.constructor = OG.shape.TextShape;
OG.TextShape = OG.shape.TextShape;
/**
 * Image Shape
 *
 * @class
 * @extends OG.shape.IShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} image 이미지 URL
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.ImageShape = function (image, label) {

	this.TYPE = OG.Constants.SHAPE_TYPE.IMAGE;

	this.SHAPE_ID = 'OG.shape.ImageShape';

	this.image = image;

	this.angle = 0;

	this.label = label;

	/**
	 * Shape 간의 연결을 위한 Terminal 을 반환한다.
	 *
	 * @return {OG.Terminal[]} Terminal
	 * @override
	 */
	this.createTerminal = function () {
		if (!this.geom) {
			return [];
		}

		var envelope = this.geom.getBoundary();

		return [
			new OG.Terminal(envelope.getCentroid(), OG.Constants.TERMINAL_TYPE.C, OG.Constants.TERMINAL_TYPE.INOUT),
			new OG.Terminal(envelope.getRightCenter(), OG.Constants.TERMINAL_TYPE.E, OG.Constants.TERMINAL_TYPE.INOUT),
			new OG.Terminal(envelope.getLeftCenter(), OG.Constants.TERMINAL_TYPE.W, OG.Constants.TERMINAL_TYPE.INOUT),
			new OG.Terminal(envelope.getLowerCenter(), OG.Constants.TERMINAL_TYPE.S, OG.Constants.TERMINAL_TYPE.INOUT),
			new OG.Terminal(envelope.getUpperCenter(), OG.Constants.TERMINAL_TYPE.N, OG.Constants.TERMINAL_TYPE.INOUT)
		];
	};

	/**
	 * 드로잉할 이미지 URL을 반환한다.
	 *
	 * @return {String} 이미지 URL
	 * @override
	 */
	this.createShape = function () {
		return this.image;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.ImageShape(this.image, this.label);
	};
};
OG.shape.ImageShape.prototype = new OG.shape.IShape();
OG.shape.ImageShape.prototype.constructor = OG.shape.ImageShape;
OG.ImageShape = OG.shape.ImageShape;
/**
 * Line Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {Number[]} from 와이어 시작 좌표
 * @param {Number[]} to 와이어 끝 좌표
 * @param {String} label 라벨
 * @param {String} fromLabel 시작점 라벨
 * @param {String} toLabel 끝점 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.EdgeShape = function (from, to, label, fromLabel, toLabel) {
	this.TYPE = OG.Constants.SHAPE_TYPE.EDGE;

	this.SHAPE_ID = 'OG.shape.EdgeShape';

	this.from = from;
	this.to = to;

	this.label = label;
	this.fromLabel = fromLabel;
	this.toLabel = toLabel;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		if (this.geom) {
			return this.geom;
		}

		this.geom = new OG.Line(from, to);
		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.EdgeShape(this.from, this.to, this.label, this.fromLabel, this.toLabel);
	};
};
OG.shape.EdgeShape.prototype = new OG.shape.IShape();
OG.shape.EdgeShape.prototype.constructor = OG.shape.EdgeShape;
OG.EdgeShape = OG.shape.EdgeShape;
/**
 * Circle Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.CircleShape = function (label) {

	this.SHAPE_ID = 'OG.shape.CircleShape';

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		if (this.geom) {
			return this.geom;
		}

		this.geom = new OG.geometry.Circle([50, 50], 50);
		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.CircleShape(this.label);
	};
};
OG.shape.CircleShape.prototype = new OG.shape.GeomShape();
OG.shape.CircleShape.prototype.constructor = OG.shape.CircleShape;
OG.CircleShape = OG.shape.CircleShape;
/**
 * Ellipse Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.EllipseShape = function (label) {

	this.SHAPE_ID = 'OG.shape.EllipseShape';

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		if (this.geom) {
			return this.geom;
		}

		this.geom = new OG.geometry.Ellipse([50, 50], 50, 30);
		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.EllipseShape(this.label);
	};
};
OG.shape.EllipseShape.prototype = new OG.shape.GeomShape();
OG.shape.EllipseShape.prototype.constructor = OG.shape.EllipseShape;
OG.EllipseShape = OG.shape.EllipseShape;
/**
 * Group Shape
 *
 * @class
 * @extends OG.shape.IShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.GroupShape = function (label) {

	this.TYPE = OG.Constants.SHAPE_TYPE.GROUP;

	this.SHAPE_ID = 'OG.shape.GroupShape';

	this.label = label;

	/**
	 * Shape 간의 연결을 위한 Terminal 을 반환한다.
	 *
	 * @return {OG.Terminal[]} Terminal
	 * @override
	 */
	this.createTerminal = function () {
		if (!this.geom) {
			return [];
		}

		var envelope = this.geom.getBoundary();

		return [
			new OG.Terminal(envelope.getCentroid(), OG.Constants.TERMINAL_TYPE.C, OG.Constants.TERMINAL_TYPE.INOUT),
			new OG.Terminal(envelope.getRightCenter(), OG.Constants.TERMINAL_TYPE.E, OG.Constants.TERMINAL_TYPE.INOUT),
			new OG.Terminal(envelope.getLeftCenter(), OG.Constants.TERMINAL_TYPE.W, OG.Constants.TERMINAL_TYPE.INOUT),
			new OG.Terminal(envelope.getLowerCenter(), OG.Constants.TERMINAL_TYPE.S, OG.Constants.TERMINAL_TYPE.INOUT),
			new OG.Terminal(envelope.getUpperCenter(), OG.Constants.TERMINAL_TYPE.N, OG.Constants.TERMINAL_TYPE.INOUT)
		];
	};

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		if (this.geom) {
			return this.geom;
		}

		this.geom = new OG.geometry.Rectangle([0, 0], 100, 100);
		this.geom.style = new OG.geometry.Style({
			'stroke': 'none'
		});

		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.GroupShape(this.label);
	};
};
OG.shape.GroupShape.prototype = new OG.shape.IShape();
OG.shape.GroupShape.prototype.constructor = OG.shape.GroupShape;
OG.GroupShape = OG.shape.GroupShape;
/**
 * Horizontal Swimlane Shape
 *
 * @class
 * @extends OG.shape.GroupShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.HorizontalLaneShape = function (label) {

	this.TYPE = OG.Constants.SHAPE_TYPE.GROUP;

	this.SHAPE_ID = 'OG.shape.HorizontalLaneShape';

	this.label = label;

	/**
	 * Shape 간의 연결을 위한 Terminal 을 반환한다.
	 *
	 * @return {OG.Terminal[]} Terminal
	 * @override
	 */
	this.createTerminal = function () {
		if (!this.geom) {
			return [];
		}

		var envelope = this.geom.getBoundary();

		return [
			new OG.Terminal(envelope.getCentroid(), OG.Constants.TERMINAL_TYPE.C, OG.Constants.TERMINAL_TYPE.INOUT),
			new OG.Terminal(envelope.getRightCenter(), OG.Constants.TERMINAL_TYPE.E, OG.Constants.TERMINAL_TYPE.INOUT),
			new OG.Terminal(envelope.getLeftCenter(), OG.Constants.TERMINAL_TYPE.W, OG.Constants.TERMINAL_TYPE.INOUT),
			new OG.Terminal(envelope.getLowerCenter(), OG.Constants.TERMINAL_TYPE.S, OG.Constants.TERMINAL_TYPE.INOUT),
			new OG.Terminal(envelope.getUpperCenter(), OG.Constants.TERMINAL_TYPE.N, OG.Constants.TERMINAL_TYPE.INOUT)
		];
	};

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		if (this.geom) {
			return this.geom;
		}

		this.geom = new OG.geometry.Rectangle([0, 0], 100, 100);
		this.geom.style = new OG.geometry.Style({
			'label-direction': 'vertical',
			'vertical-align' : 'top'
		});

		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.HorizontalLaneShape(this.label);
	};
};
OG.shape.HorizontalLaneShape.prototype = new OG.shape.GroupShape();
OG.shape.HorizontalLaneShape.prototype.constructor = OG.shape.HorizontalLaneShape;
OG.HorizontalLaneShape = OG.shape.HorizontalLaneShape;
/**
 * ForeignObject HTML Shape
 *
 * @class
 * @extends OG.shape.IShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} html 임베드 HTML String
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.HtmlShape = function (html, label) {

	this.TYPE = OG.Constants.SHAPE_TYPE.HTML;

	this.SHAPE_ID = 'OG.shape.HtmlShape';

	this.html = html || "";

	this.label = label;

	this.angle = 0;

	/**
	 * Shape 간의 연결을 위한 Terminal 을 반환한다.
	 *
	 * @return {OG.Terminal[]} Terminal
	 * @override
	 */
	this.createTerminal = function () {
		if (!this.geom) {
			return [];
		}

		var envelope = this.geom.getBoundary();

		return [
			new OG.Terminal(envelope.getCentroid(), OG.Constants.TERMINAL_TYPE.C, OG.Constants.TERMINAL_TYPE.INOUT),
			new OG.Terminal(envelope.getRightCenter(), OG.Constants.TERMINAL_TYPE.E, OG.Constants.TERMINAL_TYPE.INOUT),
			new OG.Terminal(envelope.getLeftCenter(), OG.Constants.TERMINAL_TYPE.W, OG.Constants.TERMINAL_TYPE.INOUT),
			new OG.Terminal(envelope.getLowerCenter(), OG.Constants.TERMINAL_TYPE.S, OG.Constants.TERMINAL_TYPE.INOUT),
			new OG.Terminal(envelope.getUpperCenter(), OG.Constants.TERMINAL_TYPE.N, OG.Constants.TERMINAL_TYPE.INOUT)
		];
	};

	/**
	 * 드로잉할 임베드 HTML String을 반환한다.
	 *
	 * @return {String} 임베드 HTML String
	 * @override
	 */
	this.createShape = function () {
		return this.html;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.HtmlShape(this.html, this.label);
	};
};
OG.shape.HtmlShape.prototype = new OG.shape.IShape();
OG.shape.HtmlShape.prototype.constructor = OG.shape.HtmlShape;
OG.HtmlShape = OG.shape.HtmlShape;
/**
 * Rectangle Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.RectangleShape = function (label) {

	this.SHAPE_ID = 'OG.shape.RectangleShape';

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		if (this.geom) {
			return this.geom;
		}

		this.geom = new OG.geometry.Rectangle([0, 0], 100, 100);
		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.RectangleShape(this.label);
	};
};
OG.shape.RectangleShape.prototype = new OG.shape.GeomShape();
OG.shape.RectangleShape.prototype.constructor = OG.shape.RectangleShape;
OG.RectangleShape = OG.shape.RectangleShape;
/**
 * Vertical Swimlane Shape
 *
 * @class
 * @extends OG.shape.GroupShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.VerticalLaneShape = function (label) {

	this.TYPE = OG.Constants.SHAPE_TYPE.GROUP;

	this.SHAPE_ID = 'OG.shape.VerticalLaneShape';

	this.label = label;

	/**
	 * Shape 간의 연결을 위한 Terminal 을 반환한다.
	 *
	 * @return {OG.Terminal[]} Terminal
	 * @override
	 */
	this.createTerminal = function () {
		if (!this.geom) {
			return [];
		}

		var envelope = this.geom.getBoundary();

		return [
			new OG.Terminal(envelope.getCentroid(), OG.Constants.TERMINAL_TYPE.C, OG.Constants.TERMINAL_TYPE.INOUT),
			new OG.Terminal(envelope.getRightCenter(), OG.Constants.TERMINAL_TYPE.E, OG.Constants.TERMINAL_TYPE.INOUT),
			new OG.Terminal(envelope.getLeftCenter(), OG.Constants.TERMINAL_TYPE.W, OG.Constants.TERMINAL_TYPE.INOUT),
			new OG.Terminal(envelope.getLowerCenter(), OG.Constants.TERMINAL_TYPE.S, OG.Constants.TERMINAL_TYPE.INOUT),
			new OG.Terminal(envelope.getUpperCenter(), OG.Constants.TERMINAL_TYPE.N, OG.Constants.TERMINAL_TYPE.INOUT)
		];
	};

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		if (this.geom) {
			return this.geom;
		}

		this.geom = new OG.geometry.Rectangle([0, 0], 100, 100);
		this.geom.style = new OG.geometry.Style({
			'label-direction': 'horizontal',
			'vertical-align' : 'top'
		});

		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.VerticalLaneShape(this.label);
	};
};
OG.shape.VerticalLaneShape.prototype = new OG.shape.GroupShape();
OG.shape.VerticalLaneShape.prototype.constructor = OG.shape.VerticalLaneShape;
OG.VerticalLaneShape = OG.shape.VerticalLaneShape;
/**
 * BPMN : Subprocess Activity Shape
 *
 * @class
 * @extends OG.shape.GroupShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.A_Subprocess = function (label) {

	this.SHAPE_ID = 'OG.shape.bpmn.A_Subprocess';

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		if (this.geom) {
			return this.geom;
		}

		this.geom = new OG.geometry.Rectangle([0, 0], 100, 100);
		this.geom.style = new OG.geometry.Style({
			'stroke': 'black',
			"r"     : 6
		});

		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.bpmn.A_Subprocess(this.label);
	};
};
OG.shape.bpmn.A_Subprocess.prototype = new OG.shape.GroupShape();
OG.shape.bpmn.A_Subprocess.prototype.constructor = OG.shape.bpmn.A_Subprocess;
OG.A_Subprocess = OG.shape.bpmn.A_Subprocess;
/**
 * BPMN : Task Activity Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.A_Task = function (label) {

	this.SHAPE_ID = 'OG.shape.bpmn.A_Task';

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		if (this.geom) {
			return this.geom;
		}

		this.geom = new OG.geometry.Rectangle([0, 0], 100, 100);
		this.geom.style = new OG.geometry.Style({
			"r": 6
		});

		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.bpmn.A_Task(this.label);
	};
};
OG.shape.bpmn.A_Task.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.A_Task.prototype.constructor = OG.shape.bpmn.A_Task;
OG.A_Task = OG.shape.bpmn.A_Task;
/**
 * BPMN : Annotation Association Connector Shape
 *
 * @class
 * @extends OG.shape.EdgeShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {Number[]} from 와이어 시작 좌표
 * @param {Number[]} to 와이어 끝 좌표
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.C_Association = function (from, to, label) {

	this.SHAPE_ID = 'OG.shape.bpmn.C_Association';

	this.from = from;
	this.to = to;

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		if (this.geom) {
			return this.geom;
		}

		this.geom = new OG.Line(this.from || [0, 0], this.to || [70, 0]);
		this.geom.style = new OG.geometry.Style({
			"edge-type"       : "straight",
			"arrow-start"     : "none",
			"arrow-end"       : "none",
			'stroke-dasharray': '.'
		});

		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.bpmn.C_Association(this.from, this.to, this.label);
	};
};
OG.shape.bpmn.C_Association.prototype = new OG.shape.EdgeShape();
OG.shape.bpmn.C_Association.prototype.constructor = OG.shape.bpmn.C_Association;
OG.C_Association = OG.shape.bpmn.C_Association;
/**
 * BPMN : Conditional Connector Shape
 *
 * @class
 * @extends OG.shape.EdgeShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {Number[]} from 와이어 시작 좌표
 * @param {Number[]} to 와이어 끝 좌표
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.C_Conditional = function (from, to, label) {

	this.SHAPE_ID = 'OG.shape.bpmn.C_Conditional';

	this.from = from;
	this.to = to;

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		if (this.geom) {
			return this.geom;
		}

		this.geom = new OG.Line(this.from || [0, 0], this.to || [70, 0]);
		this.geom.style = new OG.geometry.Style({
			"edge-type"       : "straight",
			"arrow-start"     : "open_diamond-wide-long",
			"arrow-end"       : "open_block-wide-long"
		});

		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.bpmn.C_Conditional(this.from, this.to, this.label);
	};
};
OG.shape.bpmn.C_Conditional.prototype = new OG.shape.EdgeShape();
OG.shape.bpmn.C_Conditional.prototype.constructor = OG.shape.bpmn.C_Conditional;
OG.C_Conditional = OG.shape.bpmn.C_Conditional;
/**
 * BPMN : Data Association Connector Shape
 *
 * @class
 * @extends OG.shape.EdgeShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {Number[]} from 와이어 시작 좌표
 * @param {Number[]} to 와이어 끝 좌표
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.C_DataAssociation = function (from, to, label) {

	this.SHAPE_ID = 'OG.shape.bpmn.C_DataAssociation';

	this.from = from;
	this.to = to;

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		if (this.geom) {
			return this.geom;
		}

		this.geom = new OG.Line(this.from || [0, 0], this.to || [70, 0]);
		this.geom.style = new OG.geometry.Style({
			"edge-type"       : "straight",
			"arrow-start"     : "none",
			"arrow-end"       : "classic-wide-long",
			'stroke-dasharray': '.'
		});

		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.bpmn.C_DataAssociation(this.from, this.to, this.label);
	};
};
OG.shape.bpmn.C_DataAssociation.prototype = new OG.shape.EdgeShape();
OG.shape.bpmn.C_DataAssociation.prototype.constructor = OG.shape.bpmn.C_DataAssociation;
OG.C_DataAssociation = OG.shape.bpmn.C_DataAssociation;
/**
 * BPMN : Message Connector Shape
 *
 * @class
 * @extends OG.shape.EdgeShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {Number[]} from 와이어 시작 좌표
 * @param {Number[]} to 와이어 끝 좌표
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.C_Message = function (from, to, label) {

	this.SHAPE_ID = 'OG.shape.bpmn.C_Message';

	this.from = from;
	this.to = to;

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		if (this.geom) {
			return this.geom;
		}

		this.geom = new OG.Line(this.from || [0, 0], this.to || [80, 0]);
		this.geom.style = new OG.geometry.Style({
			"edge-type"       : "straight",
			"arrow-start"     : "open_oval-wide-long",
			"arrow-end"       : "open_block-wide-long",
			'stroke-dasharray': '.'
		});

		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.bpmn.C_Message(this.from, this.to, this.label);
	};
};
OG.shape.bpmn.C_Message.prototype = new OG.shape.EdgeShape();
OG.shape.bpmn.C_Message.prototype.constructor = OG.shape.bpmn.C_Message;
OG.C_Message = OG.shape.bpmn.C_Message;
/**
 * BPMN : Sequence Connector Shape
 *
 * @class
 * @extends OG.shape.EdgeShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {Number[]} from 와이어 시작 좌표
 * @param {Number[]} to 와이어 끝 좌표
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.C_Sequence = function (from, to, label) {

	this.SHAPE_ID = 'OG.shape.bpmn.C_Sequence';

	this.from = from;
	this.to = to;

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		if (this.geom) {
			return this.geom;
		}

		this.geom = new OG.Line(this.from || [0, 0], this.to || [80, 0]);
		this.geom.style = new OG.geometry.Style({
			"edge-type"   : "plain",
			"arrow-start" : "none",
			"arrow-end"   : "classic-wide-long"
		});

		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.bpmn.C_Sequence(this.from, this.to, this.label);
	};
};
OG.shape.bpmn.C_Sequence.prototype = new OG.shape.EdgeShape();
OG.shape.bpmn.C_Sequence.prototype.constructor = OG.shape.bpmn.C_Sequence;
OG.C_Sequence = OG.shape.bpmn.C_Sequence;
/**
 * BPMN : Data Object Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.D_Data = function (label) {

	this.SHAPE_ID = 'OG.shape.bpmn.D_Data';

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		if (this.geom) {
			return this.geom;
		}

		this.geom = new OG.PolyLine([[0, 0], [0, 100], [100, 100], [100, 20], [80, 0], [0, 0], [80, 0], [80, 20], [100, 20]]);

		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.bpmn.D_Data(this.label);
	};
};
OG.shape.bpmn.D_Data.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.D_Data.prototype.constructor = OG.shape.bpmn.D_Data;
OG.D_Data = OG.shape.bpmn.D_Data;
/**
 * BPMN : Data Store Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.D_Store = function (label) {

	this.SHAPE_ID = 'OG.shape.bpmn.D_Store';

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		var geom1, geom2, geom3, geom4, geom5, geomCollection = [];
		if (this.geom) {
			return this.geom;
		}

		geom1 = new OG.geometry.Ellipse([50, 10], 50, 10);
		geom2 = new OG.geometry.Line([0, 10], [0, 90]);
		geom3 = new OG.geometry.Line([100, 10], [100, 90]);
		geom4 = new OG.geometry.Curve([[100, 90], [96, 94], [85, 97], [50, 100], [15, 97], [4, 94], [0, 90]]);
		geom5 = new OG.geometry.Rectangle([0, 10], 100, 80);
		geom5.style = new OG.geometry.Style({
			"stroke": 'none'
		});

		geomCollection.push(geom1);
		geomCollection.push(geom2);
		geomCollection.push(geom3);
		geomCollection.push(geom4);
		geomCollection.push(geom5);

		this.geom = new OG.geometry.GeometryCollection(geomCollection);

		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.bpmn.D_Store(this.label);
	};
};
OG.shape.bpmn.D_Store.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.D_Store.prototype.constructor = OG.shape.bpmn.D_Store;
OG.D_Store = OG.shape.bpmn.D_Store;
/**
 * BPMN : End Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_End = function (label) {

	this.SHAPE_ID = 'OG.shape.bpmn.E_End';

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		if (this.geom) {
			return this.geom;
		}

		this.geom = new OG.geometry.Circle([50, 50], 50);
		this.geom.style = new OG.geometry.Style({
			"stroke-width"  : 3,
			'label-position': 'bottom'
		});

		return this.geom;
	};

	/**
	 * Shape 간의 연결을 위한 Terminal 을 반환한다.
	 *
	 * @return {OG.Terminal[]} Terminal
	 * @override
	 */
	this.createTerminal = function () {
		if (!this.geom) {
			return [];
		}

		var envelope = this.geom.getBoundary();

		return [
			new OG.Terminal(envelope.getCentroid(), OG.Constants.TERMINAL_TYPE.C, OG.Constants.TERMINAL_TYPE.IN),
			new OG.Terminal(envelope.getRightCenter(), OG.Constants.TERMINAL_TYPE.E, OG.Constants.TERMINAL_TYPE.IN),
			new OG.Terminal(envelope.getLeftCenter(), OG.Constants.TERMINAL_TYPE.W, OG.Constants.TERMINAL_TYPE.IN),
			new OG.Terminal(envelope.getLowerCenter(), OG.Constants.TERMINAL_TYPE.S, OG.Constants.TERMINAL_TYPE.IN),
			new OG.Terminal(envelope.getUpperCenter(), OG.Constants.TERMINAL_TYPE.N, OG.Constants.TERMINAL_TYPE.IN)
		];
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.bpmn.E_End(this.label);
	};
};
OG.shape.bpmn.E_End.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_End.prototype.constructor = OG.shape.bpmn.E_End;
OG.E_End = OG.shape.bpmn.E_End;
/**
 * BPMN : Cancel End Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_End_Cancel = function (label) {

	this.SHAPE_ID = 'OG.shape.bpmn.E_End_Cancel';

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		var geom1, geom2, geom3, geomCollection = [];
		if (this.geom) {
			return this.geom;
		}

		geom1 = new OG.geometry.Circle([50, 50], 50);
		geom1.style = new OG.geometry.Style({
			"stroke-width"  : 3
		});

		geom2 = new OG.geometry.Line([25, 25], [75, 75]);
		geom2.style = new OG.geometry.Style({
			"stroke-width": 5
		});

		geom3 = new OG.geometry.Line([25, 75], [75, 25]);
		geom3.style = new OG.geometry.Style({
			"stroke-width": 5
		});

		geomCollection.push(geom1);
		geomCollection.push(geom2);
		geomCollection.push(geom3);

		this.geom = new OG.geometry.GeometryCollection(geomCollection);
		this.geom.style = new OG.geometry.Style({
			'label-position': 'bottom'
		});

		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.bpmn.E_End_Cancel(this.label);
	};
};
OG.shape.bpmn.E_End_Cancel.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_End_Cancel.prototype.constructor = OG.shape.bpmn.E_End_Cancel;
OG.E_End_Cancel = OG.shape.bpmn.E_End_Cancel;
/**
 * BPMN : Compensation End Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_End_Compensation = function (label) {

	this.SHAPE_ID = 'OG.shape.bpmn.E_End_Compensation';

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		var geom1, geom2, geom3, geomCollection = [];
		if (this.geom) {
			return this.geom;
		}

		geom1 = new OG.geometry.Circle([50, 50], 50);
		geom1.style = new OG.geometry.Style({
			"stroke-width": 3
		});

		geom2 = new OG.geometry.Polygon([
			[15, 50],
			[45, 70],
			[45, 30]
		]);
		geom2.style = new OG.geometry.Style({
			"fill"        : "black",
			"fill-opacity": 1
		});

		geom3 = new OG.geometry.Polygon([
			[45, 50],
			[75, 70],
			[75, 30]
		]);
		geom3.style = new OG.geometry.Style({
			"fill"        : "black",
			"fill-opacity": 1
		});

		geomCollection.push(geom1);
		geomCollection.push(geom2);
		geomCollection.push(geom3);

		this.geom = new OG.geometry.GeometryCollection(geomCollection);
		this.geom.style = new OG.geometry.Style({
			'label-position': 'bottom'
		});

		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.bpmn.E_End_Compensation(this.label);
	};
};
OG.shape.bpmn.E_End_Compensation.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_End_Compensation.prototype.constructor = OG.shape.bpmn.E_End_Compensation;
OG.E_End_Compensation = OG.shape.bpmn.E_End_Compensation;
/**
 * BPMN : Error End Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_End_Error = function (label) {

	this.SHAPE_ID = 'OG.shape.bpmn.E_End_Error';

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		var geom1, geom2, geomCollection = [];
		if (this.geom) {
			return this.geom;
		}

		geom1 = new OG.geometry.Circle([50, 50], 50);
		geom1.style = new OG.geometry.Style({
			"stroke-width": 3
		});

		geom2 = new OG.geometry.PolyLine([
			[20, 75],
			[40, 40],
			[60, 60],
			[80, 20]
		]);
		geom2.style = new OG.geometry.Style({
			"stroke-width": 2
		});

		geomCollection.push(geom1);
		geomCollection.push(geom2);

		this.geom = new OG.geometry.GeometryCollection(geomCollection);
		this.geom.style = new OG.geometry.Style({
			'label-position': 'bottom'
		});

		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.bpmn.E_End_Error(this.label);
	};
};
OG.shape.bpmn.E_End_Error.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_End_Error.prototype.constructor = OG.shape.bpmn.E_End_Error;
OG.E_End_Error = OG.shape.bpmn.E_End_Error;
/**
 * BPMN : Link End Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_End_Link = function (label) {

	this.SHAPE_ID = 'OG.shape.bpmn.E_End_Link';

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		var geom1, geom2, geomCollection = [];
		if (this.geom) {
			return this.geom;
		}

		geom1 = new OG.geometry.Circle([50, 50], 50);
		geom1.style = new OG.geometry.Style({
			"stroke-width": 3
		});

		geom2 = new OG.geometry.Polygon([
			[20, 40],
			[20, 60],
			[60, 60],
			[60, 80],
			[85, 50],
			[60, 20],
			[60, 40]
		]);
		geom2.style = new OG.geometry.Style({
			"fill"        : "black",
			"fill-opacity": 1
		});

		geomCollection.push(geom1);
		geomCollection.push(geom2);

		this.geom = new OG.geometry.GeometryCollection(geomCollection);
		this.geom.style = new OG.geometry.Style({
			'label-position': 'bottom'
		});

		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.bpmn.E_End_Link(this.label);
	};
};
OG.shape.bpmn.E_End_Link.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_End_Link.prototype.constructor = OG.shape.bpmn.E_End_Link;
OG.E_End_Link = OG.shape.bpmn.E_End_Link;
/**
 * BPMN : Message End Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_End_Message = function (label) {

	this.SHAPE_ID = 'OG.shape.bpmn.E_End_Message';

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		var geom1, geom2, geomCollection = [];
		if (this.geom) {
			return this.geom;
		}

		geom1 = new OG.geometry.Circle([50, 50], 50);
		geom1.style = new OG.geometry.Style({
			"stroke-width"  : 3
		});

		geom2 = new OG.geometry.PolyLine([
			[20, 30],
			[20, 70],
			[80, 70],
			[80, 30],
			[20, 30],
			[50, 50],
			[80, 30]
		]);

		geomCollection.push(geom1);
		geomCollection.push(geom2);

		this.geom = new OG.geometry.GeometryCollection(geomCollection);
		this.geom.style = new OG.geometry.Style({
			'label-position': 'bottom'
		});

		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.bpmn.E_End_Message(this.label);
	};
};
OG.shape.bpmn.E_End_Message.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_End_Message.prototype.constructor = OG.shape.bpmn.E_End_Message;
OG.E_End_Message = OG.shape.bpmn.E_End_Message;
/**
 * BPMN : Multiple End Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_End_Multiple = function (label) {

	this.SHAPE_ID = 'OG.shape.bpmn.E_End_Multiple';

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		var geom1, geom2, geomCollection = [];
		if (this.geom) {
			return this.geom;
		}

		geom1 = new OG.geometry.Circle([50, 50], 50);
		geom1.style = new OG.geometry.Style({
			"stroke-width": 3
		});

		geom2 = new OG.geometry.Polygon([
			[50, 15],
			[39, 33],
			[20, 33],
			[29, 50],
			[19, 67],
			[40, 67],
			[50, 85],
			[60, 68],
			[80, 68],
			[70, 50],
			[79, 33],
			[60, 33]
		]);
		geom2.style = new OG.geometry.Style({
			"fill"        : "black",
			"fill-opacity": 1
		});

		geomCollection.push(geom1);
		geomCollection.push(geom2);

		this.geom = new OG.geometry.GeometryCollection(geomCollection);
		this.geom.style = new OG.geometry.Style({
			'label-position': 'bottom'
		});

		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.bpmn.E_End_Multiple(this.label);
	};
};
OG.shape.bpmn.E_End_Multiple.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_End_Multiple.prototype.constructor = OG.shape.bpmn.E_End_Multiple;
OG.E_End_Multiple = OG.shape.bpmn.E_End_Multiple;
/**
 * BPMN : Intermediate Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_Intermediate = function (label) {

	this.SHAPE_ID = 'OG.shape.bpmn.E_Intermediate';

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		var geomCollection = [];
		if (this.geom) {
			return this.geom;
		}

		geomCollection.push(new OG.geometry.Circle([50, 50], 50));
		geomCollection.push(new OG.geometry.Circle([50, 50], 42));

		this.geom = new OG.geometry.GeometryCollection(geomCollection);
		this.geom.style = new OG.geometry.Style({
			'label-position': 'bottom'
		});

		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.bpmn.E_Intermediate(this.label);
	};
};
OG.shape.bpmn.E_Intermediate.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Intermediate.prototype.constructor = OG.shape.bpmn.E_Intermediate;
OG.E_Intermediate = OG.shape.bpmn.E_Intermediate;
/**
 * BPMN : Compensation Intermediate Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_Intermediate_Compensation = function (label) {

	this.SHAPE_ID = 'OG.shape.bpmn.E_Intermediate_Compensation';

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		var geom1, geom2, geomCollection = [];
		if (this.geom) {
			return this.geom;
		}

		geom1 = new OG.geometry.Polygon([
			[15, 50],
			[45, 70],
			[45, 30]
		]);

		geom2 = new OG.geometry.Polygon([
			[45, 50],
			[75, 70],
			[75, 30]
		]);

		geomCollection.push(new OG.geometry.Circle([50, 50], 50));
		geomCollection.push(new OG.geometry.Circle([50, 50], 42));
		geomCollection.push(geom1);
		geomCollection.push(geom2);

		this.geom = new OG.geometry.GeometryCollection(geomCollection);
		this.geom.style = new OG.geometry.Style({
			'label-position': 'bottom'
		});

		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.bpmn.E_Intermediate_Compensation(this.label);
	};
};
OG.shape.bpmn.E_Intermediate_Compensation.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Intermediate_Compensation.prototype.constructor = OG.shape.bpmn.E_Intermediate_Compensation;
OG.E_Intermediate_Compensation = OG.shape.bpmn.E_Intermediate_Compensation;
/**
 * BPMN : Error Intermediate Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_Intermediate_Error = function (label) {

	this.SHAPE_ID = 'OG.shape.bpmn.E_Intermediate_Error';

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		var geom1, geomCollection = [];
		if (this.geom) {
			return this.geom;
		}

		geom1 = new OG.geometry.PolyLine([
			[20, 75],
			[40, 40],
			[60, 60],
			[80, 20]
		]);

		geomCollection.push(new OG.geometry.Circle([50, 50], 50));
		geomCollection.push(new OG.geometry.Circle([50, 50], 42));
		geomCollection.push(geom1);

		this.geom = new OG.geometry.GeometryCollection(geomCollection);
		this.geom.style = new OG.geometry.Style({
			'label-position': 'bottom'
		});

		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.bpmn.E_Intermediate_Error(this.label);
	};
};
OG.shape.bpmn.E_Intermediate_Error.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Intermediate_Error.prototype.constructor = OG.shape.bpmn.E_Intermediate_Error;
OG.E_Intermediate_Error = OG.shape.bpmn.E_Intermediate_Error;
/**
 * BPMN : Link Intermediate Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_Intermediate_Link = function (label) {

	this.SHAPE_ID = 'OG.shape.bpmn.E_Intermediate_Link';

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		var geom1, geomCollection = [];
		if (this.geom) {
			return this.geom;
		}

		geom1 = new OG.geometry.Polygon([
			[20, 40],
			[20, 60],
			[60, 60],
			[60, 80],
			[85, 50],
			[60, 20],
			[60, 40]
		]);

		geomCollection.push(new OG.geometry.Circle([50, 50], 50));
		geomCollection.push(new OG.geometry.Circle([50, 50], 42));
		geomCollection.push(geom1);

		this.geom = new OG.geometry.GeometryCollection(geomCollection);
		this.geom.style = new OG.geometry.Style({
			'label-position': 'bottom'
		});

		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.bpmn.E_Intermediate_Link(this.label);
	};
};
OG.shape.bpmn.E_Intermediate_Link.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Intermediate_Link.prototype.constructor = OG.shape.bpmn.E_Intermediate_Link;
OG.E_Intermediate_Link = OG.shape.bpmn.E_Intermediate_Link;
/**
 * BPMN : Message Intermediate Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_Intermediate_Message = function (label) {

	this.SHAPE_ID = 'OG.shape.bpmn.E_Intermediate_Message';

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		var geom1, geomCollection = [];
		if (this.geom) {
			return this.geom;
		}

		geom1 = new OG.geometry.PolyLine([
			[20, 30],
			[20, 70],
			[80, 70],
			[80, 30],
			[20, 30],
			[50, 50],
			[80, 30]
		]);

		geomCollection.push(new OG.geometry.Circle([50, 50], 50));
		geomCollection.push(new OG.geometry.Circle([50, 50], 42));
		geomCollection.push(geom1);

		this.geom = new OG.geometry.GeometryCollection(geomCollection);
		this.geom.style = new OG.geometry.Style({
			'label-position': 'bottom'
		});

		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.bpmn.E_Intermediate_Message(this.label);
	};
};
OG.shape.bpmn.E_Intermediate_Message.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Intermediate_Message.prototype.constructor = OG.shape.bpmn.E_Intermediate_Message;
OG.E_Intermediate_Message = OG.shape.bpmn.E_Intermediate_Message;
/**
 * BPMN : Multiple Intermediate Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_Intermediate_Multiple = function (label) {

	this.SHAPE_ID = 'OG.shape.bpmn.E_Intermediate_Multiple';

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		var geom1, geomCollection = [];
		if (this.geom) {
			return this.geom;
		}

		geom1 = new OG.geometry.Polygon([
			[50, 15],
			[39, 33],
			[20, 33],
			[29, 50],
			[19, 67],
			[40, 67],
			[50, 85],
			[60, 68],
			[80, 68],
			[70, 50],
			[79, 33],
			[60, 33]
		]);

		geomCollection.push(new OG.geometry.Circle([50, 50], 50));
		geomCollection.push(new OG.geometry.Circle([50, 50], 42));
		geomCollection.push(geom1);

		this.geom = new OG.geometry.GeometryCollection(geomCollection);
		this.geom.style = new OG.geometry.Style({
			'label-position': 'bottom'
		});

		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.bpmn.E_Intermediate_Multiple(this.label);
	};
};
OG.shape.bpmn.E_Intermediate_Multiple.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Intermediate_Multiple.prototype.constructor = OG.shape.bpmn.E_Intermediate_Multiple;
OG.E_Intermediate_Multiple = OG.shape.bpmn.E_Intermediate_Multiple;
/**
 * BPMN : Rule Intermediate Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_Intermediate_Rule = function (label) {

	this.SHAPE_ID = 'OG.shape.bpmn.E_Intermediate_Rule';

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		var geom1, geomCollection = [];
		if (this.geom) {
			return this.geom;
		}

		geom1 = new OG.geometry.Rectangle([25, 20], 50, 60);

		geomCollection.push(new OG.geometry.Circle([50, 50], 50));
		geomCollection.push(new OG.geometry.Circle([50, 50], 42));
		geomCollection.push(geom1);
		geomCollection.push(new OG.geometry.Line([30, 30], [70, 30]));
		geomCollection.push(new OG.geometry.Line([30, 45], [70, 45]));
		geomCollection.push(new OG.geometry.Line([30, 60], [70, 60]));
		geomCollection.push(new OG.geometry.Line([30, 70], [70, 70]));

		this.geom = new OG.geometry.GeometryCollection(geomCollection);
		this.geom.style = new OG.geometry.Style({
			'label-position': 'bottom'
		});

		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.bpmn.E_Intermediate_Rule(this.label);
	};
};
OG.shape.bpmn.E_Intermediate_Rule.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Intermediate_Rule.prototype.constructor = OG.shape.bpmn.E_Intermediate_Rule;
OG.E_Intermediate_Rule = OG.shape.bpmn.E_Intermediate_Rule;
/**
 * BPMN : Timer Intermediate Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_Intermediate_Timer = function (label) {

	this.SHAPE_ID = 'OG.shape.bpmn.E_Intermediate_Timer';

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		var geom1, geom2, geomCollection = [];
		if (this.geom) {
			return this.geom;
		}

		geom1 = new OG.geometry.Circle([50, 50], 32);

		geom2 = new OG.geometry.PolyLine([[50, 30], [50, 50], [70, 50]]);

		geomCollection.push(new OG.geometry.Circle([50, 50], 50));
		geomCollection.push(new OG.geometry.Circle([50, 50], 42));
		geomCollection.push(geom1);
		geomCollection.push(new OG.geometry.Line([50, 18], [50, 25]));
		geomCollection.push(new OG.geometry.Line([50, 82], [50, 75]));
		geomCollection.push(new OG.geometry.Line([18, 50], [25, 50]));
		geomCollection.push(new OG.geometry.Line([82, 50], [75, 50]));
		geomCollection.push(geom2);

		this.geom = new OG.geometry.GeometryCollection(geomCollection);
		this.geom.style = new OG.geometry.Style({
			'label-position': 'bottom'
		});

		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.bpmn.E_Intermediate_Timer(this.label);
	};
};
OG.shape.bpmn.E_Intermediate_Timer.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Intermediate_Timer.prototype.constructor = OG.shape.bpmn.E_Intermediate_Timer;
OG.E_Intermediate_Timer = OG.shape.bpmn.E_Intermediate_Timer;
/**
 * BPMN : Start Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_Start = function (label) {

	this.SHAPE_ID = 'OG.shape.bpmn.E_Start';

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		if (this.geom) {
			return this.geom;
		}

		this.geom = new OG.geometry.Circle([50, 50], 50);
		this.geom.style = new OG.geometry.Style({
			'label-position': 'bottom'
		});

		return this.geom;
	};

	/**
	 * Shape 간의 연결을 위한 Terminal 을 반환한다.
	 *
	 * @return {OG.Terminal[]} Terminal
	 * @override
	 */
	this.createTerminal = function () {
		if (!this.geom) {
			return [];
		}

		var envelope = this.geom.getBoundary();

		return [
			new OG.Terminal(envelope.getCentroid(), OG.Constants.TERMINAL_TYPE.C, OG.Constants.TERMINAL_TYPE.OUT),
			new OG.Terminal(envelope.getRightCenter(), OG.Constants.TERMINAL_TYPE.E, OG.Constants.TERMINAL_TYPE.OUT),
			new OG.Terminal(envelope.getLeftCenter(), OG.Constants.TERMINAL_TYPE.W, OG.Constants.TERMINAL_TYPE.OUT),
			new OG.Terminal(envelope.getLowerCenter(), OG.Constants.TERMINAL_TYPE.S, OG.Constants.TERMINAL_TYPE.OUT),
			new OG.Terminal(envelope.getUpperCenter(), OG.Constants.TERMINAL_TYPE.N, OG.Constants.TERMINAL_TYPE.OUT)
		];
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.bpmn.E_Start(this.label);
	};
};
OG.shape.bpmn.E_Start.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Start.prototype.constructor = OG.shape.bpmn.E_Start;
OG.E_Start = OG.shape.bpmn.E_Start;
/**
 * BPMN : Link Start Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_Start_Link = function (label) {

	this.SHAPE_ID = 'OG.shape.bpmn.E_Start_Link';

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		var geom1, geom2, geomCollection = [];
		if (this.geom) {
			return this.geom;
		}

		geom1 = new OG.geometry.Circle([50, 50], 50);
		geom1.style = new OG.geometry.Style({
			"stroke-width": 1
		});

		geom2 = new OG.geometry.Polygon([
			[20, 40],
			[20, 60],
			[60, 60],
			[60, 80],
			[85, 50],
			[60, 20],
			[60, 40]
		]);

		geomCollection.push(geom1);
		geomCollection.push(geom2);

		this.geom = new OG.geometry.GeometryCollection(geomCollection);
		this.geom.style = new OG.geometry.Style({
			'label-position': 'bottom'
		});

		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.bpmn.E_Start_Link(this.label);
	};
};
OG.shape.bpmn.E_Start_Link.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Start_Link.prototype.constructor = OG.shape.bpmn.E_Start_Link;
OG.E_Start_Link = OG.shape.bpmn.E_Start_Link;
/**
 * BPMN : Message Start Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_Start_Message = function (label) {

	this.SHAPE_ID = 'OG.shape.bpmn.E_Start_Message';

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		var geom1, geom2, geomCollection = [];
		if (this.geom) {
			return this.geom;
		}

		geom1 = new OG.geometry.Circle([50, 50], 50);

		geom2 = new OG.geometry.PolyLine([
			[20, 30],
			[20, 70],
			[80, 70],
			[80, 30],
			[20, 30],
			[50, 50],
			[80, 30]
		]);

		geomCollection.push(geom1);
		geomCollection.push(geom2);

		this.geom = new OG.geometry.GeometryCollection(geomCollection);
		this.geom.style = new OG.geometry.Style({
			'label-position': 'bottom'
		});

		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.bpmn.E_Start_Message(this.label);
	};
};
OG.shape.bpmn.E_Start_Message.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Start_Message.prototype.constructor = OG.shape.bpmn.E_Start_Message;
OG.E_Start_Message = OG.shape.bpmn.E_Start_Message;
/**
 * BPMN : Multiple Start Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_Start_Multiple = function (label) {

	this.SHAPE_ID = 'OG.shape.bpmn.E_Start_Multiple';

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		var geom1, geom2, geomCollection = [];
		if (this.geom) {
			return this.geom;
		}

		geom1 = new OG.geometry.Circle([50, 50], 50);

		geom2 = new OG.geometry.Polygon([
			[50, 15],
			[39, 33],
			[20, 33],
			[29, 50],
			[19, 67],
			[40, 67],
			[50, 85],
			[60, 68],
			[80, 68],
			[70, 50],
			[79, 33],
			[60, 33]
		]);

		geomCollection.push(geom1);
		geomCollection.push(geom2);

		this.geom = new OG.geometry.GeometryCollection(geomCollection);
		this.geom.style = new OG.geometry.Style({
			'label-position': 'bottom'
		});

		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.bpmn.E_Start_Multiple(this.label);
	};
};
OG.shape.bpmn.E_Start_Multiple.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Start_Multiple.prototype.constructor = OG.shape.bpmn.E_Start_Multiple;
OG.E_Start_Multiple = OG.shape.bpmn.E_Start_Multiple;
/**
 * BPMN : Rule Start Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_Start_Rule = function (label) {

	this.SHAPE_ID = 'OG.shape.bpmn.E_Start_Rule';

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		var geom1, geom2, geomCollection = [];
		if (this.geom) {
			return this.geom;
		}

		geom1 = new OG.geometry.Circle([50, 50], 50);
		geom1.style = new OG.geometry.Style({
			"stroke-width": 1
		});

		geom2 = new OG.geometry.Rectangle([25, 20], 50, 60);

		geomCollection.push(geom1);
		geomCollection.push(geom2);
		geomCollection.push(new OG.geometry.Line([30, 30], [70, 30]));
		geomCollection.push(new OG.geometry.Line([30, 45], [70, 45]));
		geomCollection.push(new OG.geometry.Line([30, 60], [70, 60]));
		geomCollection.push(new OG.geometry.Line([30, 70], [70, 70]));

		this.geom = new OG.geometry.GeometryCollection(geomCollection);
		this.geom.style = new OG.geometry.Style({
			'label-position': 'bottom'
		});

		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.bpmn.E_Start_Rule(this.label);
	};
};
OG.shape.bpmn.E_Start_Rule.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Start_Rule.prototype.constructor = OG.shape.bpmn.E_Start_Rule;
OG.E_Start_Rule = OG.shape.bpmn.E_Start_Rule;
/**
 * BPMN : Timer Start Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_Start_Timer = function (label) {

	this.SHAPE_ID = 'OG.shape.bpmn.E_Start_Timer';

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		var geom1, geom2, geom3, geomCollection = [];
		if (this.geom) {
			return this.geom;
		}

		geom1 = new OG.geometry.Circle([50, 50], 50);
		geom1.style = new OG.geometry.Style({
			"stroke-width": 1
		});

		geom2 = new OG.geometry.Circle([50, 50], 32);

		geom3 = new OG.geometry.PolyLine([[50, 30], [50, 50], [70, 50]]);

		geomCollection.push(geom1);
		geomCollection.push(geom2);
		geomCollection.push(new OG.geometry.Line([50, 18], [50, 25]));
		geomCollection.push(new OG.geometry.Line([50, 82], [50, 75]));
		geomCollection.push(new OG.geometry.Line([18, 50], [25, 50]));
		geomCollection.push(new OG.geometry.Line([82, 50], [75, 50]));
		geomCollection.push(geom3);

		this.geom = new OG.geometry.GeometryCollection(geomCollection);
		this.geom.style = new OG.geometry.Style({
			'label-position': 'bottom'
		});

		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.bpmn.E_Start_Timer(this.label);
	};
};
OG.shape.bpmn.E_Start_Timer.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Start_Timer.prototype.constructor = OG.shape.bpmn.E_Start_Timer;
OG.E_Start_Timer = OG.shape.bpmn.E_Start_Timer;
/**
 * BPMN : Terminate Event Shape
 *
 * @class
 * @extends OG.shape.bpmn.E_End
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_Terminate = function (label) {

	this.SHAPE_ID = 'OG.shape.bpmn.E_Terminate';

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		var geom1, geom2, geomCollection = [];
		if (this.geom) {
			return this.geom;
		}

		geom1 = new OG.geometry.Circle([50, 50], 50);
		geom1.style = new OG.geometry.Style({
			"stroke-width": 3
		});

		geom2 = new OG.geometry.Circle([50, 50], 30);
		geom2.style = new OG.geometry.Style({
			"fill"        : "black",
			"fill-opacity": 1
		});

		geomCollection.push(geom1);
		geomCollection.push(geom2);

		this.geom = new OG.geometry.GeometryCollection(geomCollection);
		this.geom.style = new OG.geometry.Style({
			'label-position': 'bottom'
		});

		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.bpmn.E_Terminate(this.label);
	};
};
OG.shape.bpmn.E_Terminate.prototype = new OG.shape.bpmn.E_End();
OG.shape.bpmn.E_Terminate.prototype.constructor = OG.shape.bpmn.E_Terminate;
OG.E_Terminate = OG.shape.bpmn.E_Terminate;
/**
 * BPMN : Complex Gateway Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.G_Complex = function (label) {

	this.SHAPE_ID = 'OG.shape.bpmn.G_Complex';

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		var geom1, geom2, geom3, geom4, geom5, geomCollection = [];
		if (this.geom) {
			return this.geom;
		}

		geom1 = new OG.geometry.Polygon([
			[0, 50],
			[50, 100],
			[100, 50],
			[50, 0]
		]);

		geom2 = new OG.geometry.Line([30, 30], [70, 70]);
		geom2.style = new OG.geometry.Style({
			"stroke-width": 3
		});

		geom3 = new OG.geometry.Line([30, 70], [70, 30]);
		geom3.style = new OG.geometry.Style({
			"stroke-width": 3
		});

		geom4 = new OG.geometry.Line([20, 50], [80, 50]);
		geom4.style = new OG.geometry.Style({
			"stroke-width": 3
		});

		geom5 = new OG.geometry.Line([50, 20], [50, 80]);
		geom5.style = new OG.geometry.Style({
			"stroke-width": 3
		});

		geomCollection.push(geom1);
		geomCollection.push(geom2);
		geomCollection.push(geom3);
		geomCollection.push(geom4);
		geomCollection.push(geom5);

		this.geom = new OG.geometry.GeometryCollection(geomCollection);

		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.bpmn.G_Complex(this.label);
	};
};
OG.shape.bpmn.G_Complex.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.G_Complex.prototype.constructor = OG.shape.bpmn.G_Complex;
OG.G_Complex = OG.shape.bpmn.G_Complex;
/**
 * BPMN : Exclusive Gateway Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.G_Exclusive = function (label) {

	this.SHAPE_ID = 'OG.shape.bpmn.G_Exclusive';

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		var geom1, geom2, geom3, geomCollection = [];
		if (this.geom) {
			return this.geom;
		}

		geom1 = new OG.geometry.Polygon([
			[0, 50],
			[50, 100],
			[100, 50],
			[50, 0]
		]);

		geom2 = new OG.geometry.Line([30, 30], [70, 70]);
		geom2.style = new OG.geometry.Style({
			"stroke-width": 5
		});

		geom3 = new OG.geometry.Line([30, 70], [70, 30]);
		geom3.style = new OG.geometry.Style({
			"stroke-width": 5
		});

		geomCollection.push(geom1);
		geomCollection.push(geom2);
		geomCollection.push(geom3);

		this.geom = new OG.geometry.GeometryCollection(geomCollection);

		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.bpmn.G_Exclusive(this.label);
	};
};
OG.shape.bpmn.G_Exclusive.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.G_Exclusive.prototype.constructor = OG.shape.bpmn.G_Exclusive;
OG.G_Exclusive = OG.shape.bpmn.G_Exclusive;
/**
 * BPMN : Gateway Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.G_Gateway = function (label) {

	this.SHAPE_ID = 'OG.shape.bpmn.G_Gateway';

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		if (this.geom) {
			return this.geom;
		}

		this.geom = new OG.geometry.Polygon([
			[0, 50],
			[50, 100],
			[100, 50],
			[50, 0]
		]);

		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.bpmn.G_Gateway(this.label);
	};
};
OG.shape.bpmn.G_Gateway.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.G_Gateway.prototype.constructor = OG.shape.bpmn.G_Gateway;
OG.G_Gateway = OG.shape.bpmn.G_Gateway;
/**
 * BPMN : Inclusive Gateway Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.G_Inclusive = function (label) {

	this.SHAPE_ID = 'OG.shape.bpmn.G_Inclusive';

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		var geom1, geom2, geomCollection = [];
		if (this.geom) {
			return this.geom;
		}

		geom1 = new OG.geometry.Polygon([
			[0, 50],
			[50, 100],
			[100, 50],
			[50, 0]
		]);

		geom2 = new OG.geometry.Circle([50, 50], 25);
		geom2.style = new OG.geometry.Style({
			"stroke-width": 3
		});

		geomCollection.push(geom1);
		geomCollection.push(geom2);

		this.geom = new OG.geometry.GeometryCollection(geomCollection);

		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.bpmn.G_Inclusive(this.label);
	};
};
OG.shape.bpmn.G_Inclusive.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.G_Inclusive.prototype.constructor = OG.shape.bpmn.G_Inclusive;
OG.G_Inclusive = OG.shape.bpmn.G_Inclusive;
/**
 * BPMN : Parallel Gateway Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.G_Parallel = function (label) {

	this.SHAPE_ID = 'OG.shape.bpmn.G_Parallel';

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		var geom1, geom2, geom3, geomCollection = [];
		if (this.geom) {
			return this.geom;
		}

		geom1 = new OG.geometry.Polygon([
			[0, 50],
			[50, 100],
			[100, 50],
			[50, 0]
		]);

		geom2 = new OG.geometry.Line([20, 50], [80, 50]);
		geom2.style = new OG.geometry.Style({
			"stroke-width": 5
		});

		geom3 = new OG.geometry.Line([50, 20], [50, 80]);
		geom3.style = new OG.geometry.Style({
			"stroke-width": 5
		});

		geomCollection.push(geom1);
		geomCollection.push(geom2);
		geomCollection.push(geom3);

		this.geom = new OG.geometry.GeometryCollection(geomCollection);

		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.bpmn.G_Parallel(this.label);
	};
};
OG.shape.bpmn.G_Parallel.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.G_Parallel.prototype.constructor = OG.shape.bpmn.G_Parallel;
OG.G_Parallel = OG.shape.bpmn.G_Parallel;
/**
 * BPMN : Annotation Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.M_Annotation = function (label) {

	this.SHAPE_ID = 'OG.shape.bpmn.M_Annotation';

	this.label = label || 'Annotation';

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		if (this.geom) {
			return this.geom;
		}

		var geom1, geom2, geomCollection = [];
		if (this.geom) {
			return this.geom;
		}

		geom1 = new OG.geometry.Rectangle([0, 0], 100, 100);
		geom1.style = new OG.geometry.Style({
			"stroke": 'none'
		});

		geom2 = new OG.geometry.PolyLine([[10, 0], [0, 0], [0, 100], [10, 100]]);
		geom2.style = new OG.geometry.Style({
			"stroke": 'black'
		});

		geomCollection.push(geom1);
		geomCollection.push(geom2);

		this.geom = new OG.geometry.GeometryCollection(geomCollection);
		this.geom.style = new OG.geometry.Style({
		});

		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.bpmn.M_Annotation(this.label);
	};
};
OG.shape.bpmn.M_Annotation.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.M_Annotation.prototype.constructor = OG.shape.bpmn.M_Annotation;
OG.M_Annotation = OG.shape.bpmn.M_Annotation;
/**
 * BPMN : Group Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.M_Group = function (label) {

	this.SHAPE_ID = 'OG.shape.bpmn.M_Group';

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		if (this.geom) {
			return this.geom;
		}

		this.geom = new OG.geometry.Rectangle([0, 0], 100, 100);
		this.geom.style = new OG.geometry.Style({
			'stroke-dasharray': '-',
			"r"               : 6
		});

		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.bpmn.M_Group(this.label);
	};
};
OG.shape.bpmn.M_Group.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.M_Group.prototype.constructor = OG.shape.bpmn.M_Group;
OG.M_Group = OG.shape.bpmn.M_Group;
/**
 * BPMN : Text Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.M_Text = function (label) {

	this.SHAPE_ID = 'OG.shape.bpmn.M_Text';

	this.label = label || 'Text';

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		if (this.geom) {
			return this.geom;
		}

		this.geom = new OG.geometry.Rectangle([0, 0], 100, 100);
		this.geom.style = new OG.geometry.Style({
			stroke: "none"
		});

		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.bpmn.M_Text(this.label);
	};
};
OG.shape.bpmn.M_Text.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.M_Text.prototype.constructor = OG.shape.bpmn.M_Text;
OG.M_Text = OG.shape.bpmn.M_Text;
/**
 * 도형의 Style 과 Shape 정보를 통해 캔버스에 렌더링 기능을 정의한 인터페이스
 *
 * @class
 * @requires OG.common.*, OG.geometry.*, OG.shape.*
 *
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.renderer.IRenderer = function () {
	/**
	 * Shape 을 캔버스에 위치 및 사이즈 지정하여 드로잉한다.
	 *
	 * @example
	 * renderer.drawShape([100, 100], new OG.CircleShape(), [50, 50], {stroke:'red'});
	 *
	 * @param {Number[]} position 드로잉할 위치 좌표(중앙 기준)
	 * @param {OG.shape.IShape} shape Shape
	 * @param {Number[]} size Shape Width, Height
	 * @param {OG.geometry.Style,Object} style 스타일
	 * @param {String} id Element ID 지정
	 * @return {Element} Group DOM Element with geometry
	 */
	this.drawShape = function (position, shape, size, style, id) {
		throw new OG.NotImplementedException();
	};

	/**
	 * Geometry 를 캔버스에 드로잉한다.
	 *
	 * @param {OG.geometry.Geometry} geometry 기하 객체
	 * @param {OG.geometry.Style,Object} style 스타일
	 * @return {Element} Group DOM Element with geometry
	 */
	this.drawGeom = function (geometry, style, id) {
		throw new OG.NotImplementedException();
	};

	/**
	 * Text 를 캔버스에 위치 및 사이즈 지정하여 드로잉한다.
	 * (스타일 'text-anchor': 'start' or 'middle' or 'end' 에 따라 위치 기준이 다름)
	 *
	 * @example
	 * renderer.drawText([100, 100], 'Hello', null, {'text-anchor':'start'});
	 *
	 * @param {Number[]} position 드로잉할 위치 좌표(스타일 'text-anchor': 'start' or 'middle' or 'end' 에 따라 기준이 다름)
	 * @param {String} text 텍스트
	 * @param {Number[]} size Text Width, Height, Angle
	 * @param {OG.geometry.Style,Object} style 스타일
	 * @param {String} id Element ID 지정
	 * @return {Element} DOM Element
	 */
	this.drawText = function (position, text, size, style, id) {
		throw new OG.NotImplementedException();
	};

	/**
	 * Image 를 캔버스에 위치 및 사이즈 지정하여 드로잉한다.
	 *
	 * @example
	 * renderer.drawImage([100, 100], 'img.jpg', [50, 50]);
	 *
	 * @param {Number[]} position 드로잉할 위치 좌표(좌상단 기준)
	 * @param {String} imgSrc 이미지경로
	 * @param {Number[]} size Image Width, Height, Angle
	 * @param {OG.geometry.Style,Object} style 스타일
	 * @param {String} id Element ID 지정
	 * @return {Element} DOM Element
	 */
	this.drawImage = function (position, imgSrc, size, style, id) {
		throw new OG.NotImplementedException();
	};

	/**
	 * 라인을 캔버스에 드로잉한다.
	 *
	 * @param {OG.geometry.Line} line 라인
	 * @param {OG.geometry.Style,Object} style 스타일
	 * @param {String} id Element ID 지정
	 * @param {Boolean} isSelf 셀프 연결 여부
	 * @return {Element} Group DOM Element with geometry
	 */
	this.drawEdge = function (line, style, id, isSelf) {
		throw new OG.NotImplementedException();
	};

	/**
	 * Shape 의 Label 을 캔버스에 위치 및 사이즈 지정하여 드로잉한다.
	 *
	 * @param {Element,String} shapeElement Shape DOM element or ID
	 * @param {String} text 텍스트
	 * @param {Object} style 스타일
	 * @return {Element} DOM Element
	 */
	this.drawLabel = function (shapeElement, text, style) {
		throw new OG.NotImplementedException();
	};

	/**
	 * Edge 의 from, to Label 을 캔버스에 위치 및 사이즈 지정하여 드로잉한다.
	 *
	 * @param {Element,String} shapeElement Shape DOM element or ID
	 * @param {String} text 텍스트
	 * @param {String} type 유형(FROM or TO)
	 * @return {Element} DOM Element
	 */
	this.drawEdgeLabel = function (shapeElement, text, type) {
		throw new OG.NotImplementedException();
	};

	/**
	 * Element 에 저장된 geom, angle, image, text 정보로 shape 을 redraw 한다.
	 *
	 * @param {Element} element Shape 엘리먼트
	 * @param {String[]} excludeEdgeId redraw 제외할 Edge ID
	 */
	this.redrawShape = function (element, excludeEdgeId) {
		throw new OG.NotImplementedException();
	};

	/**
	 * Edge Element 에 저장된 geom, style 정보로 Edge 를 redraw 한다.
	 * Edge 타입(straight, plain) 에 따른 경로를 새로 계산한다.
	 *
	 * @param {Element} edgeElement Edge Shape 엘리먼트
	 */
	this.redrawEdge = function (edgeElement) {
		throw new OG.NotImplementedException();
	};

	/**
	 * Shape 의 연결된 Edge 를 redraw 한다.(이동 또는 리사이즈시)
	 *
	 * @param {Element} element
	 * @param {String[]} excludeEdgeId redraw 제외할 Edge ID
	 */
	this.redrawConnectedEdge = function (element, excludeEdgeId) {
		throw new OG.NotImplementedException();
	};

	/**
	 * 두개의 터미널을 연결하고, 속성정보에 추가한다.
	 *
	 * @param {Element,Number[]} from 시작점
	 * @param {Element,Number[]} to 끝점
	 * @param {Element} edge Edge Shape
	 * @param {OG.geometry.Style,Object} style 스타일
	 * @param {String} label Label
	 * @return {Element} 연결된 Edge 엘리먼트
	 */
	this.connect = function (from, to, edge, style, label) {
		throw new OG.NotImplementedException();
	};

	/**
	 * 연결속성정보를 삭제한다. Edge 인 경우는 라인만 삭제하고, 일반 Shape 인 경우는 연결된 모든 Edge 를 삭제한다.
	 *
	 * @param {Element} element
	 */
	this.disconnect = function (element) {
		throw new OG.NotImplementedException();
	};

	/**
	 * ID에 해당하는 Element 의 Edge 연결시 Drop Over 가이드를 드로잉한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 */
	this.drawDropOverGuide = function (element) {
		throw new OG.NotImplementedException();
	};

	/**
	 * ID에 해당하는 Element 의 Move & Resize 용 가이드를 드로잉한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @return {Object}
	 */
	this.drawGuide = function (element) {
		throw new OG.NotImplementedException();
	};

	/**
	 * ID에 해당하는 Element 의 Move & Resize 용 가이드를 제거한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 */
	this.removeGuide = function (element) {
		throw new OG.NotImplementedException();
	};

	/**
	 * 모든 Move & Resize 용 가이드를 제거한다.
	 */
	this.removeAllGuide = function () {
		throw new OG.NotImplementedException();
	};

	/**
	 * ID에 해당하는 Edge Element 의 Move & Resize 용 가이드를 드로잉한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @return {Object}
	 */
	this.drawEdgeGuide = function (element) {
		throw new OG.NotImplementedException();
	};

	/**
	 * Rectangle 모양의 마우스 드래그 선택 박스 영역을 드로잉한다.
	 *
	 * @param {Number[]} position 드로잉할 위치 좌표(좌상단)
	 * @param {Number[]} size Text Width, Height, Angle
	 * @param {OG.geometry.Style,Object} style 스타일
	 * @return {Element} DOM Element
	 */
	this.drawRubberBand = function (position, size, style) {
		throw new OG.NotImplementedException();
	};

	/**
	 * Rectangle 모양의 마우스 드래그 선택 박스 영역을 제거한다.
	 *
	 * @param {Element} root first, rubberBand 정보를 저장한 엘리먼트
	 */
	this.removeRubberBand = function (root) {
		throw new OG.NotImplementedException();
	};

	/**
	 * Edge 연결용 터미널을 드로잉한다.
	 *
	 * @param {Element} element DOM Element
	 * @param {String} terminalType 터미널 연결 유형(IN or OUT or INOUT)
	 * @return {Element} terminal group element
	 */
	this.drawTerminal = function (element, terminalType) {
		throw new OG.NotImplementedException();
	};

	/**
	 *  Edge 연결용 터미널을 remove 한다.
	 *
	 * @param {Element} element DOM Element
	 */
	this.removeTerminal = function (element) {
		throw new OG.NotImplementedException();
	};

	/**
	 *  모든 Edge 연결용 터미널을 remove 한다.
	 */
	this.removeAllTerminal = function () {
		throw new OG.NotImplementedException();
	};

	/**
	 * ID에 해당하는 Element 의 Collapse 가이드를 드로잉한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @return {Element}
	 */
	this.drawCollapseGuide = function (element) {
		throw new OG.NotImplementedException();
	};

	/**
	 * ID에 해당하는 Element 의 Collapse 가이드를 제거한다.
	 *
	 * @param {Element} element
	 */
	this.removeCollapseGuide = function (element) {
		throw new OG.NotImplementedException();
	};

	/**
	 * 주어진 Shape 들을 그룹핑한다.
	 *
	 * @param {Element[]} elements
	 * @return {Element} Group Shape Element
	 */
	this.group = function (elements) {
		throw new OG.NotImplementedException();
	};

	/**
	 * 주어진 그룹들을 그룹해제한다.
	 *
	 * @param {Element[]} groupElements
	 * @return {Element[]} ungrouped Elements
	 */
	this.ungroup = function (groupElements) {
		throw new OG.NotImplementedException();
	};

	/**
	 * 주어진 Shape 들을 그룹에 추가한다.
	 *
	 * @param {Element} groupElement
	 * @param {Element[]} elements
	 */
	this.addToGroup = function (groupElement, elements) {
		throw new OG.NotImplementedException();
	};

	/**
	 * 주어진 Shape 이 그룹인 경우 collapse 한다.
	 *
	 * @param {Element} element
	 */
	this.collapse = function (element) {
		throw new OG.NotImplementedException();
	};

	/**
	 * 주어진 Shape 이 그룹인 경우 expand 한다.
	 *
	 * @param {Element} element
	 */
	this.expand = function (element) {
		throw new OG.NotImplementedException();
	};

	/**
	 * 드로잉된 모든 오브젝트를 클리어한다.
	 */
	this.clear = function () {
		throw new OG.NotImplementedException();
	};

	/**
	 * Shape 을 캔버스에서 관련된 모두를 삭제한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 */
	this.removeShape = function (element) {
		throw new OG.NotImplementedException();
	};

	/**
	 * ID에 해당하는 Element 를 캔버스에서 제거한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 */
	this.remove = function (element) {
		throw new OG.NotImplementedException();
	};

	/**
	 * 하위 엘리먼트만 제거한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 */
	this.removeChild = function (element) {
		throw new OG.NotImplementedException();
	};

	/**
	 * 랜더러 캔버스 Root Element 를 반환한다.
	 *
	 * @return {Element} Element
	 */
	this.getRootElement = function () {
		throw new OG.NotImplementedException();
	};

	/**
	 * 랜더러 캔버스 Root Group Element 를 반환한다.
	 *
	 * @return {Element} Element
	 */
	this.getRootGroup = function () {
		throw new OG.NotImplementedException();
	};

	/**
	 * 주어진 지점을 포함하는 Top Element 를 반환한다.
	 *
	 * @param {Number[]} position 위치 좌표
	 * @return {Element} Element
	 */
	this.getElementByPoint = function (position) {
		throw new OG.NotImplementedException();
	};

	/**
	 * 주어진 Boundary Box 영역에 포함되는 Shape(GEOM, TEXT, IMAGE) Element 를 반환한다.
	 *
	 * @param {OG.geometry.Envelope} envelope Boundary Box 영역
	 * @return {Element[]} Element
	 */
	this.getElementsByBBox = function (envelope) {
		throw new OG.NotImplementedException();
	};

	/**
	 * 엘리먼트에 속성값을 설정한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @param {Object} attribute 속성값
	 */
	this.setAttr = function (element, attribute) {
		throw new OG.NotImplementedException();
	};

	/**
	 * 엘리먼트 속성값을 반환한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @param {String} attrName 속성이름
	 * @return {Object} attribute 속성값
	 */
	this.getAttr = function (element, attrName) {
		throw new OG.NotImplementedException();
	};

	/**
	 * Shape 의 스타일을 변경한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @param {Object} style 스타일
	 */
	this.setShapeStyle = function (element, style) {
		throw new OG.NotImplementedException();
	};

	/**
	 * ID에 해당하는 Element 를 최상단 레이어로 이동한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 */
	this.toFront = function (element) {
		throw new OG.NotImplementedException();
	};

	/**
	 * ID에 해당하는 Element 를 최하단 레이어로 이동한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 */
	this.toBack = function (element) {
		throw new OG.NotImplementedException();
	};

	/**
	 * 랜더러 캔버스의 사이즈(Width, Height)를 반환한다.
	 *
	 * @return {Number[]} Canvas Width, Height
	 */
	this.getCanvasSize = function () {
		throw new OG.NotImplementedException();
	};

	/**
	 * 랜더러 캔버스의 사이즈(Width, Height)를 변경한다.
	 *
	 * @param {Number[]} size Canvas Width, Height
	 */
	this.setCanvasSize = function (size) {
		throw new OG.NotImplementedException();
	};

	/**
	 * 랜더러 캔버스의 사이즈(Width, Height)를 실제 존재하는 Shape 의 영역에 맞게 변경한다.
	 *
	 * @param {Number[]} minSize Canvas 최소 Width, Height
	 * @param {Boolean} fitScale 주어진 minSize 에 맞게 fit 여부(Default:false)
	 */
	this.fitCanvasSize = function (minSize, fitScale) {
		throw new OG.NotImplementedException();
	};

	/**
	 * 새로운 View Box 영역을 설정한다. (ZoomIn & ZoomOut 가능)
	 *
	 * @param @param {Number[]} position 위치 좌표(좌상단 기준)
	 * @param {Number[]} size Canvas Width, Height
	 * @param {Boolean} isFit Fit 여부
	 */
	this.setViewBox = function (position, size, isFit) {
		throw new OG.NotImplementedException();
	};

	/**
	 * Scale 을 반환한다. (리얼 사이즈 : Scale = 1)
	 *
	 * @param {Number} scale 스케일값
	 */
	this.getScale = function (scale) {
		throw new OG.NotImplementedException();
	};

	/**
	 * Scale 을 설정한다. (리얼 사이즈 : Scale = 1)
	 *
	 * @param {Number} scale 스케일값
	 */
	this.setScale = function (scale) {
		throw new OG.NotImplementedException();
	};

	/**
	 * ID에 해당하는 Element 를 캔버스에서 show 한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 */
	this.show = function (element) {
		throw new OG.NotImplementedException();
	};

	/**
	 * ID에 해당하는 Element 를 캔버스에서 hide 한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 */
	this.hide = function (element) {
		throw new OG.NotImplementedException();
	};

	/**
	 * Source Element 를 Target Element 아래에 append 한다.
	 *
	 * @param {Element,String} srcElement Element 또는 ID
	 * @param {Element,String} targetElement Element 또는 ID
	 * @return {Element} Source Element
	 */
	this.appendChild = function (srcElement, targetElement) {
		throw new OG.NotImplementedException();
	};

	/**
	 * Source Element 를 Target Element 이후에 insert 한다.
	 *
	 * @param {Element,String} srcElement Element 또는 ID
	 * @param {Element,String} targetElement Element 또는 ID
	 * @return {Element} Source Element
	 */
	this.insertAfter = function (srcElement, targetElement) {
		throw new OG.NotImplementedException();
	};

	/**
	 * Source Element 를 Target Element 이전에 insert 한다.
	 *
	 * @param {Element,String} srcElement Element 또는 ID
	 * @param {Element,String} targetElement Element 또는 ID
	 * @return {Element} Source Element
	 */
	this.insertBefore = function (srcElement, targetElement) {
		throw new OG.NotImplementedException();
	};

	/**
	 * 해당 Element 를 가로, 세로 Offset 만큼 이동한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @param {Number[]} offset [가로, 세로]
	 * @return {Element} Element
	 */
	this.move = function (element, offset) {
		throw new OG.NotImplementedException();
	};

	/**
	 * 주어진 중심좌표로 해당 Element 를 이동한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @param {Number[]} position [x, y]
	 * @return {Element} Element
	 */
	this.moveCentroid = function (element, position) {
		throw new OG.NotImplementedException();
	};

	/**
	 * 중심 좌표를 기준으로 주어진 각도 만큼 회전한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @param {Number} angle 각도
	 * @return {Element} Element
	 */
	this.rotate = function (element, angle) {
		throw new OG.NotImplementedException();
	};

	/**
	 * 상, 하, 좌, 우 외곽선을 이동한 만큼 리사이즈 한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @param {Number[]} offset [상, 하, 좌, 우] 각 방향으로 + 값
	 * @return {Element} Element
	 */
	this.resize = function (element, offset) {
		throw new OG.NotImplementedException();
	};

	/**
	 * 중심좌표는 고정한 채 Bounding Box 의 width, height 를 리사이즈 한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @param {Number[]} size [Width, Height]
	 * @return {Element} Element
	 */
	this.resizeBox = function (element, size) {
		throw new OG.NotImplementedException();
	};

	/**
	 * Edge 유형에 따라 Shape 과의 연결 지점을 찾아 반환한다.
	 *
	 * @param {String} edgeType Edge 유형(straight, plain..)
	 * @param {Element} element 연결할 Shape 엘리먼트
	 * @param {Number[]} from 시작좌표
	 * @param {Number[]} to 끝좌표
	 * @param {Boolean} 시작 연결지점 여부
	 * @return {Object} {position, direction}
	 */
	this.intersectionEdge = function (edgeType, element, from, to, isFrom) {
		throw new OG.NotImplementedException();
	};

	/**
	 * 노드 Element 를 복사한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @return {Element} Element
	 */
	this.clone = function (element) {
		throw new OG.NotImplementedException();
	};

	/**
	 * ID로 Node Element 를 반환한다.
	 *
	 * @param {String} id
	 * @return {Element} Element
	 */
	this.getElementById = function (id) {
		throw new OG.NotImplementedException();
	};

	/**
	 * Shape 타입에 해당하는 Node Element 들을 반환한다.
	 *
	 * @param {String} shapeType Shape 타입(GEOM, HTML, IMAGE, EDGE, GROUP), Null 이면 모든 타입
	 * @param {String} excludeType 제외 할 타입
	 * @return {Element[]} Element's Array
	 */
	this.getElementsByType = function (shapeType, excludeType) {
		throw new OG.NotImplementedException();
	};

	/**
	 * 해당 엘리먼트의 BoundingBox 영역 정보를 반환한다.
	 *
	 * @param {Element,String} element
	 * @return {Object} {width, height, x, y, x2, y2}
	 */
	this.getBBox = function (element) {
		throw new OG.NotImplementedException();
	};

	/**
	 * 부모노드기준으로 캔버스 루트 엘리먼트의 BoundingBox 영역 정보를 반환한다.
	 *
	 * @return {Object} {width, height, x, y, x2, y2}
	 */
	this.getRootBBox = function () {
		throw new OG.NotImplementedException();
	};

	/**
	 * 부모노드기준으로 캔버스 루트 엘리먼트의 실제 Shape 이 차지하는 BoundingBox 영역 정보를 반환한다.
	 *
	 * @return {Object} {width, height, x, y, x2, y2}
	 */
	this.getRealRootBBox = function () {
		throw new OG.NotImplementedException();
	};

	/**
	 * 캔버스의 컨테이너 DOM element 를 반환한다.
	 *
	 * @return {Element} 컨테이너
	 */
	this.getContainer = function () {
		throw new OG.NotImplementedException();
	};


	/**
	 * SVG 인지 여부를 반환한다.
	 *
	 * @return {Boolean} svg 여부
	 */
	this.isSVG = function () {
		throw new OG.NotImplementedException();
	};

	/**
	 * VML 인지 여부를 반환한다.
	 *
	 * @return {Boolean} vml 여부
	 */
	this.isVML = function () {
		throw new OG.NotImplementedException();
	};
};
OG.renderer.IRenderer.prototype = new OG.renderer.IRenderer();
OG.renderer.IRenderer.prototype.constructor = OG.renderer.IRenderer;
/**
 * Raphael 라이브러리를 이용하여 구현한 랜더러 캔버스 클래스
 * - 노드에 추가되는 속성 : _type, _shape, _selected, _from, _to, _fromedge, _toedge
 * - 노드에 저장되는 값 : shape : { geom, angle, image, text }
 *
 * @class
 * @extends OG.renderer.IRenderer
 * @requires OG.common.*, OG.geometry.*, OG.shape.*, raphael-2.1.0
 *
 * @param {HTMLElement,String} container 컨테이너 DOM element or ID
 * @param {Number[]} containerSize 컨테이너 Width, Height
 * @param {String} backgroundColor 캔버스 배경색
 * @param {String} backgroundImage 캔버스 배경이미지
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.renderer.RaphaelRenderer = function (container, containerSize, backgroundColor, backgroundImage) {
	var _PAPER = new Raphael(container, containerSize ? containerSize[0] : null, containerSize ? containerSize[1] : null),
		_ID_PREFIX = Math.round(Math.random() * 10000),
		_LAST_ID = 0,
		_ELE_MAP = new OG.HashMap(),
		_ROOT_GROUP,
		_ETC_GROUP,
		_RENDERER = this,
		_CANVAS_COLOR = backgroundColor || OG.Constants.CANVAS_BACKGROUND,
		genId,
		add,
		remove,
		removeChild,
		getREleById,
		drawGeometry,
		adjustEdgeDirection,
		findFromTerminal,
		findToTerminal,
		getShapeFromTerminal,
		drawLabel;

	/**
	 * ID를 generate 한다.
	 *
	 * @return {String} ID
	 * @private
	 */
	genId = function () {
		var id = "OG_" + _ID_PREFIX + "_" + _LAST_ID;
		_LAST_ID++;
		return id;
	};

	/**
	 * ID를 발급하고 ID:rElement 해쉬맵에 추가한다.
	 *
	 * @param {Raphael.Element} rElement 라파엘 엘리먼트
	 * @param {String} id 지정ID
	 * @param {String} nodeType Node 유형(ROOT, SHAPE ...)
	 * @param {String} shapeType Shape 유형(GEOM, TEXT, IMAGE, EDGE, GROUP ...)
	 * @return {Raphael.Element} rElement 라파엘 엘리먼트
	 * @private
	 */
	add = function (rElement, id, nodeType, shapeType) {
		rElement.id = id || genId();
		rElement.node.id = rElement.id;
		rElement.node.raphaelid = rElement.id;
		if (nodeType) {
			$(rElement.node).attr("_type", nodeType);
		}
		if (shapeType) {
			$(rElement.node).attr("_shape", shapeType);
		}
		_ELE_MAP.put(rElement.id, rElement);

		return rElement;
	};

	/**
	 * 라파엘 엘리먼트를 하위 엘리먼트 포함하여 제거한다.
	 *
	 * @param {Raphael.Element} rElement 라파엘 엘리먼트
	 * @private
	 */
	remove = function (rElement) {
		var childNodes, i;
		if (rElement) {
			childNodes = rElement.node.childNodes;
			for (i = childNodes.length - 1; i >= 0; i--) {
				remove(getREleById(childNodes[i].id));
			}
			_ELE_MAP.remove(rElement.id);
			rElement.remove();
		}
	};

	/**
	 * 하위 엘리먼트만 제거한다.
	 *
	 * @param {Raphael.Element} rElement 라파엘 엘리먼트
	 * @private
	 */
	removeChild = function (rElement) {
		var childNodes, i;
		if (rElement) {
			childNodes = rElement.node.childNodes;
			for (i = childNodes.length - 1; i >= 0; i--) {
				remove(getREleById(childNodes[i].id));
			}
		}
	};

	/**
	 * ID에 해당하는 RaphaelElement 를 반환한다.
	 *
	 * @param {String} id ID
	 * @return {Raphael.Element} RaphaelElement
	 * @private
	 */
	getREleById = function (id) {
		return _ELE_MAP.get(id);
	};

	/**
	 * Geometry 를 캔버스에 드로잉한다.(Recursive)
	 *
	 * @param {Element} groupElement Group DOM Element
	 * @param {OG.geometry.Geometry} geometry 기하 객체
	 * @param {OG.geometry.Style,Object} style 스타일
	 * @param {Object} parentStyle Geometry Collection 인 경우 상위 Geometry 스타일
	 * @return {Element}
	 * @private
	 */
	drawGeometry = function (groupElement, geometry, style, parentStyle) {
		var i = 0, pathStr = "", vertices, element, geomObj, _style = {},
			getRoundedPath = function (rectangle, radius) {
				var rectObj, rectVert, offset1, offset2, angle, array = [],
					getRoundedOffset = function (coord, dist, deg) {
						var theta = Math.PI / 180 * deg;
						return new OG.geometry.Coordinate(
							OG.Util.round(coord.x + dist * Math.cos(theta)),
							OG.Util.round(coord.y + dist * Math.sin(theta))
						);
					};

				rectObj = OG.JSON.decode(rectangle.toString());
				rectVert = rectangle.getVertices();
				angle = rectObj.angle;

				offset1 = getRoundedOffset(rectVert[0], radius, 90 + angle);
				offset2 = getRoundedOffset(rectVert[0], radius, angle);
				array = array.concat(["M", offset1.x, offset1.y, "Q", rectVert[0].x, rectVert[0].y, offset2.x, offset2.y]);

				offset1 = getRoundedOffset(rectVert[1], radius, 180 + angle);
				offset2 = getRoundedOffset(rectVert[1], radius, 90 + angle);
				array = array.concat(["L", offset1.x, offset1.y, "Q", rectVert[1].x, rectVert[1].y, offset2.x, offset2.y]);

				offset1 = getRoundedOffset(rectVert[2], radius, 270 + angle);
				offset2 = getRoundedOffset(rectVert[2], radius, 180 + angle);
				array = array.concat(["L", offset1.x, offset1.y, "Q", rectVert[2].x, rectVert[2].y, offset2.x, offset2.y]);

				offset1 = getRoundedOffset(rectVert[3], radius, angle);
				offset2 = getRoundedOffset(rectVert[3], radius, 270 + angle);
				array = array.concat(["L", offset1.x, offset1.y, "Q", rectVert[3].x, rectVert[3].y, offset2.x, offset2.y, "Z"]);

				return array.toString();
			};
		if (parentStyle) {
			OG.Util.apply(_style, (style instanceof OG.geometry.Style) ? style.map : style || {},
				OG.Util.apply({}, geometry.style.map, OG.Util.apply({}, parentStyle, OG.Constants.DEFAULT_STYLE.GEOM)));
		} else {
			OG.Util.apply(_style, (style instanceof OG.geometry.Style) ? style.map : style || {},
				OG.Util.apply({}, geometry.style.map, OG.Constants.DEFAULT_STYLE.GEOM));
		}

		geometry.style.map = _style;

		// 타입에 따라 드로잉
		switch (geometry.TYPE) {
		case OG.Constants.GEOM_TYPE.POINT:
			element = _PAPER.circle(geometry.coordinate.x, geometry.coordinate.y, 0.5);
			element.attr(_style);
			break;

		case OG.Constants.GEOM_TYPE.LINE:
		case OG.Constants.GEOM_TYPE.POLYLINE:
		case OG.Constants.GEOM_TYPE.POLYGON:
			pathStr = "";
			vertices = geometry.getVertices();
			for (i = 0; i < vertices.length; i++) {
				if (i === 0) {
					pathStr = "M" + vertices[i].x + " " + vertices[i].y;
				} else {
					pathStr += "L" + vertices[i].x + " " + vertices[i].y;
				}
			}
			element = _PAPER.path(pathStr);
			element.attr(_style);
			break;
		case OG.Constants.GEOM_TYPE.RECTANGLE:
			if ((_style.r || 0) === 0) {
				pathStr = "";
				vertices = geometry.getVertices();
				for (i = 0; i < vertices.length; i++) {
					if (i === 0) {
						pathStr = "M" + vertices[i].x + " " + vertices[i].y;
					} else {
						pathStr += "L" + vertices[i].x + " " + vertices[i].y;
					}
				}
			} else {
				pathStr = getRoundedPath(geometry, _style.r || 0);
			}

			element = _PAPER.path(pathStr);
			element.attr(_style);
			break;

		case OG.Constants.GEOM_TYPE.CIRCLE:
			geomObj = OG.JSON.decode(geometry.toString());
			if (geomObj.type === OG.Constants.GEOM_NAME[OG.Constants.GEOM_TYPE.CIRCLE]) {
				element = _PAPER.circle(geomObj.center[0], geomObj.center[1], geomObj.radius);
			} else if (geomObj.type === OG.Constants.GEOM_NAME[OG.Constants.GEOM_TYPE.ELLIPSE]) {
				if (geomObj.angle === 0) {
					element = _PAPER.ellipse(geomObj.center[0], geomObj.center[1], geomObj.radiusX, geomObj.radiusY);
				} else {
					pathStr = "";
					vertices = geometry.getControlPoints();
					pathStr = "M" + vertices[1].x + " " + vertices[1].y + "A" + geomObj.radiusX + " " + geomObj.radiusY
						+ " " + geomObj.angle + " 1 0 " + vertices[5].x + " " + vertices[5].y;
					pathStr += "M" + vertices[1].x + " " + vertices[1].y + "A" + geomObj.radiusX + " " + geomObj.radiusY
						+ " " + geomObj.angle + " 1 1 " + vertices[5].x + " " + vertices[5].y;
					element = _PAPER.path(pathStr);
				}
			}
			element.attr(_style);
			break;

		case OG.Constants.GEOM_TYPE.ELLIPSE:
			geomObj = OG.JSON.decode(geometry.toString());
			if (geomObj.angle === 0) {
				element = _PAPER.ellipse(geomObj.center[0], geomObj.center[1], geomObj.radiusX, geomObj.radiusY);
			} else {
				pathStr = "";
				vertices = geometry.getControlPoints();
				pathStr = "M" + vertices[1].x + " " + vertices[1].y + "A" + geomObj.radiusX + " " + geomObj.radiusY
					+ " " + geomObj.angle + " 1 0 " + vertices[5].x + " " + vertices[5].y;
				pathStr += "M" + vertices[1].x + " " + vertices[1].y + "A" + geomObj.radiusX + " " + geomObj.radiusY
					+ " " + geomObj.angle + " 1 1 " + vertices[5].x + " " + vertices[5].y;
				element = _PAPER.path(pathStr);
			}
			element.attr(_style);
			break;

		case OG.Constants.GEOM_TYPE.CURVE:
			pathStr = "";
			vertices = geometry.getControlPoints();
			for (i = 0; i < vertices.length; i++) {
				if (i === 0) {
					pathStr = "M" + vertices[i].x + " " + vertices[i].y;
				} else if (i === 1) {
					pathStr += "R" + vertices[i].x + " " + vertices[i].y;
				} else {
					pathStr += " " + vertices[i].x + " " + vertices[i].y;
				}
			}
			element = _PAPER.path(pathStr);
			element.attr(_style);
			break;

		case OG.Constants.GEOM_TYPE.COLLECTION:
			for (i = 0; i < geometry.geometries.length; i++) {
				// recursive call
				drawGeometry(groupElement, geometry.geometries[i], style, geometry.style.map);
			}
			break;
		}

		if (element) {
			add(element);
			groupElement.appendChild(element.node);

			return element.node;
		} else {
			return groupElement;
		}
	};


	/**
	 * 한쪽이상 끊긴 경우 Edge Direction 을 보정한다.
	 *
	 * @param {String} fromDrct 시작방향
	 * @param {String} toDrct 끝방향
	 * @param {Number[]} from 시작위치
	 * @param {Number[]} to 끝위치
	 * @return {String} edge-direction 보정된 edge-direction
	 */
	adjustEdgeDirection = function (fromDrct, toDrct, from, to) {
		var fromXY = {x: from[0], y: from[1]}, toXY = {x: to[0], y: to[1]};
		// 한쪽이 끊긴 경우 방향 보정
		if (fromDrct === "c" && toDrct === "c") {
			if (fromXY.x <= toXY.x && fromXY.y <= toXY.y) {
				if (Math.abs(toXY.x - fromXY.x) > Math.abs(toXY.y - fromXY.y)) {
					fromDrct = "e";
					toDrct = "w";
				} else {
					fromDrct = "s";
					toDrct = "n";
				}
			} else if (fromXY.x <= toXY.x && fromXY.y > toXY.y) {
				if (Math.abs(toXY.x - fromXY.x) > Math.abs(toXY.y - fromXY.y)) {
					fromDrct = "e";
					toDrct = "w";
				} else {
					fromDrct = "n";
					toDrct = "s";
				}
			} else if (fromXY.x > toXY.x && fromXY.y <= toXY.y) {
				if (Math.abs(toXY.x - fromXY.x) > Math.abs(toXY.y - fromXY.y)) {
					fromDrct = "w";
					toDrct = "e";
				} else {
					fromDrct = "s";
					toDrct = "n";
				}
			} else if (fromXY.x > toXY.x && fromXY.y > toXY.y) {
				if (Math.abs(toXY.x - fromXY.x) > Math.abs(toXY.y - fromXY.y)) {
					fromDrct = "w";
					toDrct = "e";
				} else {
					fromDrct = "n";
					toDrct = "s";
				}
			}
		} else if (fromDrct === "c" && toDrct !== "c") {
			if (fromXY.x <= toXY.x && fromXY.y <= toXY.y) {
				if (Math.abs(toXY.x - fromXY.x) > Math.abs(toXY.y - fromXY.y)) {
					fromDrct = "e";
				} else {
					fromDrct = "s";
				}
			} else if (fromXY.x <= toXY.x && fromXY.y > toXY.y) {
				if (Math.abs(toXY.x - fromXY.x) > Math.abs(toXY.y - fromXY.y)) {
					fromDrct = "e";
				} else {
					fromDrct = "n";
				}
			} else if (fromXY.x > toXY.x && fromXY.y <= toXY.y) {
				if (Math.abs(toXY.x - fromXY.x) > Math.abs(toXY.y - fromXY.y)) {
					fromDrct = "w";
				} else {
					fromDrct = "s";
				}
			} else if (fromXY.x > toXY.x && fromXY.y > toXY.y) {
				if (Math.abs(toXY.x - fromXY.x) > Math.abs(toXY.y - fromXY.y)) {
					fromDrct = "w";
				} else {
					fromDrct = "n";
				}
			}
		} else if (fromDrct !== "c" && toDrct === "c") {
			if (fromXY.x <= toXY.x && fromXY.y <= toXY.y) {
				if (Math.abs(toXY.x - fromXY.x) > Math.abs(toXY.y - fromXY.y)) {
					toDrct = "w";
				} else {
					toDrct = "n";
				}
			} else if (fromXY.x <= toXY.x && fromXY.y > toXY.y) {
				if (Math.abs(toXY.x - fromXY.x) > Math.abs(toXY.y - fromXY.y)) {
					toDrct = "w";
				} else {
					toDrct = "s";
				}
			} else if (fromXY.x > toXY.x && fromXY.y <= toXY.y) {
				if (Math.abs(toXY.x - fromXY.x) > Math.abs(toXY.y - fromXY.y)) {
					toDrct = "e";
				} else {
					toDrct = "n";
				}
			} else if (fromXY.x > toXY.x && fromXY.y > toXY.y) {
				if (Math.abs(toXY.x - fromXY.x) > Math.abs(toXY.y - fromXY.y)) {
					toDrct = "e";
				} else {
					toDrct = "s";
				}
			}
		}

		return fromDrct + " " + toDrct;
	};

	/**
	 * 시작, 끝 좌표에 따라 적절한 시작 터미널을 찾아 반환한다.
	 *
	 * @param {Element} element Shape 엘리먼트
	 * @param {Number[]} from 시작자표
	 * @param {Number[]} to 끝자표
	 * @return {Element} 터미널 엘리먼트
	 */
	findFromTerminal = function (element, from, to) {
		// 적절한 연결 터미널 찾기
		var fromXY = {x: from[0], y: from[1]}, toXY = {x: to[0], y: to[1]},
			terminalGroup = _RENDERER.drawTerminal(element),
			childTerminals = terminalGroup.terminal.childNodes, fromDrct, fromTerminal, i;
		if (Math.abs(toXY.x - fromXY.x) > Math.abs(toXY.y - fromXY.y)) {
			if (toXY.x > fromXY.x) {
				fromDrct = "e";
			} else {
				fromDrct = "w";
			}
		} else {
			if (toXY.y > fromXY.y) {
				fromDrct = "s";
			} else {
				fromDrct = "n";
			}
		}

		fromTerminal = childTerminals[0];
		for (i = 0; i < childTerminals.length; i++) {
			if (childTerminals[i].terminal && childTerminals[i].terminal.direction.toLowerCase() === fromDrct) {
				fromTerminal = childTerminals[i];
				break;
			}
		}

		return fromTerminal;
	};

	/**
	 * 시작, 끝 좌표에 따라 적절한 끝 터미널을 찾아 반환한다.
	 *
	 * @param {Element} element Shape 엘리먼트
	 * @param {Number[]} from 시작자표
	 * @param {Number[]} to 끝자표
	 * @return {Element} 터미널 엘리먼트
	 */
	findToTerminal = function (element, from, to) {
		// 적절한 연결 터미널 찾기
		var fromXY = {x: from[0], y: from[1]}, toXY = {x: to[0], y: to[1]},
			terminalGroup = _RENDERER.drawTerminal(element),
			childTerminals = terminalGroup.terminal.childNodes, toDrct, toTerminal, i;
		if (Math.abs(toXY.x - fromXY.x) > Math.abs(toXY.y - fromXY.y)) {
			if (toXY.x > fromXY.x) {
				toDrct = "w";
			} else {
				toDrct = "e";
			}
		} else {
			if (toXY.y > fromXY.y) {
				toDrct = "n";
			} else {
				toDrct = "s";
			}
		}

		toTerminal = childTerminals[0];
		for (i = 0; i < childTerminals.length; i++) {
			if (childTerminals[i].terminal && childTerminals[i].terminal.direction.toLowerCase() === toDrct) {
				toTerminal = childTerminals[i];
				break;
			}
		}

		return toTerminal;
	};

	/**
	 * 터미널로부터 부모 Shape element 를 찾아 반환한다.
	 *
	 * @param {Element,String} terminal 터미널 Element or ID
	 * @return {Element} Shape element
	 */
	getShapeFromTerminal = function (terminal) {
		var terminalId = OG.Util.isElement(terminal) ? terminal.id : terminal;
		if (terminalId) {
			return _RENDERER.getElementById(terminalId.substring(0, terminalId.indexOf(OG.Constants.TERMINAL_SUFFIX.GROUP)));
		} else {
			return null;
		}
	};

	/**
	 * Shape 의 Label 을 캔버스에 위치 및 사이즈 지정하여 드로잉한다.
	 *
	 * @param {Number[]} position 드로잉할 위치 좌표(중앙 기준)
	 * @param {String} text 텍스트
	 * @param {Number[]} size Text Width, Height, Angle
	 * @param {OG.geometry.Style,Object} style 스타일
	 * @param {String} id Element ID 지정
	 * @param {Boolean} isEdge 라인여부(라인인 경우 라벨이 가려지지 않도록)
	 * @return {Element} DOM Element
	 */
	drawLabel = function (position, text, size, style, id, isEdge) {
		var LABEL_PADDING = OG.Constants.LABEL_PADDING,
			width = size ? size[0] - LABEL_PADDING * 2 : null,
			height = size ? size[1] - LABEL_PADDING * 2 : null,
			angle = size ? size[2] || 0 : 0,
			group, element, rect, _style = {}, text_anchor, geom,
			bBox, left, top, x, y;
		OG.Util.apply(_style, (style instanceof OG.geometry.Style) ? style.map : style || {}, OG.Constants.DEFAULT_STYLE.TEXT);

		// ID 지정된 경우 존재하면 하위 노드 제거
		if (id === 0 || id) {
			group = getREleById(id);
			if (group) {
				removeChild(group);
			} else {
				group = _PAPER.group();
				add(group, id);
			}
		} else {
			group = _PAPER.group();
			add(group, id);
		}

		// text-anchor 리셋
		text_anchor = _style["text-anchor"] || 'middle';
		_style["text-anchor"] = 'middle';

		// Draw text
		element = _PAPER.text(position[0], position[1], text);
		element.attr(_style);

		// real size
		bBox = element.getBBox();

		// calculate width, height, left, top
		width = width ? (width > bBox.width ? width : bBox.width) : bBox.width;
		height = height ? (height > bBox.height ? height : bBox.height) : bBox.height;
		left = OG.Util.round(position[0] - width / 2);
		top = OG.Util.round(position[1] - height / 2);

		// Boundary Box
		geom = new OG.Rectangle([left, top], width, height);

		if (_style["label-direction"] === 'vertical') {
			// Text Horizontal Align
			switch (text_anchor) {
			case "start":
				y = geom.getBoundary().getLowerCenter().y;
				break;
			case "end":
				y = geom.getBoundary().getUpperCenter().y;
				break;
			case "middle":
				y = geom.getBoundary().getCentroid().y;
				break;
			default:
				y = geom.getBoundary().getCentroid().y;
				break;
			}

			// Text Vertical Align
			switch (_style["vertical-align"]) {
			case "top":
				x = OG.Util.round(geom.getBoundary().getLeftCenter().x + bBox.height / 2);
				break;
			case "bottom":
				x = OG.Util.round(geom.getBoundary().getRightCenter().x - bBox.height / 2);
				break;
			case "middle":
				x = geom.getBoundary().getCentroid().x;
				break;
			default:
				x = geom.getBoundary().getCentroid().x;
				break;
			}

			angle = -90;
		} else {
			// Text Horizontal Align
			switch (text_anchor) {
			case "start":
				x = geom.getBoundary().getLeftCenter().x;
				break;
			case "end":
				x = geom.getBoundary().getRightCenter().x;
				break;
			case "middle":
				x = geom.getBoundary().getCentroid().x;
				break;
			default:
				x = geom.getBoundary().getCentroid().x;
				break;
			}

			// Text Vertical Align
			switch (_style["vertical-align"]) {
			case "top":
				y = OG.Util.round(geom.getBoundary().getUpperCenter().y + bBox.height / 2);
				break;
			case "bottom":
				y = OG.Util.round(geom.getBoundary().getLowerCenter().y - bBox.height / 2);
				break;
			case "middle":
				y = geom.getBoundary().getCentroid().y;
				break;
			default:
				y = geom.getBoundary().getCentroid().y;
				break;
			}
		}

		// text align, font-color, font-size 적용
		element.attr({
			x             : x,
			y             : y,
			stroke        : "none",
			fill          : _style["font-color"] || OG.Constants.DEFAULT_STYLE.LABEL["font-color"],
			"font-size"   : _style["font-size"] || OG.Constants.DEFAULT_STYLE.LABEL["font-size"],
			"fill-opacity": 1
		});

		// angle 적용
		if (angle || _style["label-angle"]) {
			if (angle === 0) {
				angle = parseInt(_style["label-angle"], 10);
			}
			element.rotate(angle);
		}

		// text-anchor 적용
		element.attr({
			'text-anchor': text_anchor
		});

		// 라인인 경우 overwrap 용 rectangle
		if (isEdge && text) {
			// real size
			bBox = element.getBBox();

			rect = _PAPER.rect(bBox.x - LABEL_PADDING / 2, bBox.y - LABEL_PADDING / 2,
				bBox.width + LABEL_PADDING, bBox.height + LABEL_PADDING);
			rect.attr({stroke: "none", fill: _CANVAS_COLOR, 'fill-opacity': 1});
			add(rect);
			group.node.appendChild(rect.node);
		}

		// Add to group
		add(element);
		group.node.appendChild(element.node);

		return group.node;
	};

	// 최상위 그룹 엘리먼트 초기화
	_ROOT_GROUP = add(_PAPER.group(), null, OG.Constants.NODE_TYPE.ROOT);
	_ETC_GROUP = add(_PAPER.group(), null, OG.Constants.NODE_TYPE.ETC);
	_PAPER.id = "OG_" + _ID_PREFIX;
	_PAPER.canvas.id = "OG_" + _ID_PREFIX;

	$(_PAPER.canvas).css({
		"background-color"   : _CANVAS_COLOR,
		"user-select"        : "none",
		"-o-user-select"     : "none",
		"-moz-user-select"   : "none",
		"-khtml-user-select" : "none",
		"-webkit-user-select": "none"
	});
	if (backgroundImage) {
		$(_PAPER.canvas).css({"background-image": backgroundImage});
	}

	// container 에 keydown 이벤트 가능하도록
	$(_PAPER.canvas.parentNode).attr("tabindex", "0");
	$(_PAPER.canvas.parentNode).css({"outline": "none"});

	// container 의 position 을 static 인 경우 offset 이 깨지므로 relative 로 보정
	if ($(_PAPER.canvas.parentNode).css('position') === 'static') {
		$(_PAPER.canvas.parentNode).css({
			position: 'relative',
			left    : '0',
			top     : '0'
		});
	}

	/**
	 * Shape 을 캔버스에 위치 및 사이즈 지정하여 드로잉한다.
	 *
	 * @example
	 * renderer.drawShape([100, 100], new OG.CircleShape(), [50, 50], {stroke:'red'});
	 *
	 * @param {Number[]} position 드로잉할 위치 좌표(중앙 기준)
	 * @param {OG.shape.IShape} shape Shape
	 * @param {Number[]} size Shape Width, Height
	 * @param {OG.geometry.Style,Object} style 스타일
	 * @param {String} id Element ID 지정
	 * @return {Element} Group DOM Element with geometry
	 * @override
	 */
	this.drawShape = function (position, shape, size, style, id) {
		var width = size ? size[0] : 100,
			height = size ? size[1] : 100,
			groupNode, geometry, text, image, html;

		if (shape instanceof OG.shape.GeomShape) {
			geometry = shape.createShape();

			// 좌상단으로 이동 및 크기 조정
			geometry.moveCentroid(position);
			geometry.resizeBox(width, height);

			groupNode = this.drawGeom(geometry, style, id);
			shape.geom = groupNode.geom;
		} else if (shape instanceof OG.shape.TextShape) {
			text = shape.createShape();

			groupNode = this.drawText(position, text, size, style, id);
			shape.text = groupNode.text;
			shape.angle = groupNode.angle;
			shape.geom = groupNode.geom;
		} else if (shape instanceof OG.shape.ImageShape) {
			image = shape.createShape();

			groupNode = this.drawImage(position, image, size, style, id);
			shape.image = groupNode.image;
			shape.angle = groupNode.angle;
			shape.geom = groupNode.geom;
		} else if (shape instanceof OG.shape.HtmlShape) {
			html = shape.createShape();

			groupNode = this.drawHtml(position, html, size, style, id);
			shape.html = groupNode.html;
			shape.angle = groupNode.angle;
			shape.geom = groupNode.geom;
		} else if (shape instanceof OG.shape.EdgeShape) {
			geometry = shape.geom || shape.createShape();

			groupNode = this.drawEdge(geometry, style, id);
			shape.geom = groupNode.geom;
		} else if (shape instanceof OG.shape.GroupShape) {
			geometry = shape.createShape();

			// 좌상단으로 이동 및 크기 조정
			geometry.moveCentroid(position);
			geometry.resizeBox(width, height);

			groupNode = this.drawGroup(geometry, style, id);

			shape.geom = groupNode.geom;
		}

		if (shape.geom) {
			groupNode.shape = shape;
		}
		groupNode.shapeStyle = (style instanceof OG.geometry.Style) ? style.map : style;

		$(groupNode).attr("_shape_id", shape.SHAPE_ID);

		// Draw Label
		if (!(shape instanceof OG.shape.TextShape)) {
			this.drawLabel(groupNode);

			if (shape instanceof  OG.shape.EdgeShape) {
				this.drawEdgeLabel(groupNode, null, 'FROM');
				this.drawEdgeLabel(groupNode, null, 'TO');
			}
		}
		if (groupNode.geom) {
			if (OG.Util.isIE7()) {
				groupNode.removeAttribute("geom");
			} else {
				delete groupNode.geom;
			}
		}
		if (groupNode.text) {
			if (OG.Util.isIE7()) {
				groupNode.removeAttribute("text");
			} else {
				delete groupNode.text;
			}
		}
		if (groupNode.image) {
			if (OG.Util.isIE7()) {
				groupNode.removeAttribute("image");
			} else {
				delete groupNode.image;
			}
		}
		if (groupNode.angle) {
			if (OG.Util.isIE7()) {
				groupNode.removeAttribute("angle");
			} else {
				delete groupNode.angle;
			}
		}

		// drawShape event fire
		$(_PAPER.canvas).trigger('drawShape', [groupNode]);

		return groupNode;
	};

	/**
	 * Geometry 를 캔버스에 드로잉한다.
	 *
	 * @param {OG.geometry.Geometry} geometry 기하 객체
	 * @param {OG.geometry.Style,Object} style 스타일
	 * @return {Element} Group DOM Element with geometry
	 * @override
	 */
	this.drawGeom = function (geometry, style, id) {
		var group, _style = {};

		OG.Util.apply(_style, (style instanceof OG.geometry.Style) ? style.map : style || {});

		// ID 지정된 경우 존재하면 하위 노드 제거
		if (id === 0 || id) {
			group = getREleById(id);
			if (group) {
				removeChild(group);
			} else {
				group = _PAPER.group();
				add(group, id, OG.Constants.NODE_TYPE.SHAPE, OG.Constants.SHAPE_TYPE.GEOM);
				_ROOT_GROUP.node.appendChild(group.node);
			}
		} else {
			group = _PAPER.group();
			add(group, id, OG.Constants.NODE_TYPE.SHAPE, OG.Constants.SHAPE_TYPE.GEOM);
			_ROOT_GROUP.node.appendChild(group.node);
		}

		// Draw geometry
		drawGeometry(group.node, geometry, _style);
		group.node.geom = geometry;
		group.attr(OG.Constants.DEFAULT_STYLE.SHAPE);

		if (group.node.shape) {
			group.node.shape.geom = geometry;

			if (group.node.geom) {
				if (OG.Util.isIE7()) {
					group.node.removeAttribute("geom");
				} else {
					delete group.node.geom;
				}
			}
		}

		return group.node;
	};

	/**
	 * Text 를 캔버스에 위치 및 사이즈 지정하여 드로잉한다.
	 *
	 * @param {Number[]} position 드로잉할 위치 좌표(중앙 기준)
	 * @param {String} text 텍스트
	 * @param {Number[]} size Text Width, Height, Angle
	 * @param {OG.geometry.Style,Object} style 스타일
	 * @param {String} id Element ID 지정
	 * @return {Element} DOM Element
	 * @override
	 */
	this.drawText = function (position, text, size, style, id) {
		var width = size ? size[0] : null,
			height = size ? size[1] : null,
			angle = size ? size[2] || 0 : 0,
			group, element, _style = {}, geom,
			bBox, left, top, x, y;
		OG.Util.apply(_style, (style instanceof OG.geometry.Style) ? style.map : style || {}, OG.Constants.DEFAULT_STYLE.TEXT);

		// ID 지정된 경우 존재하면 하위 노드 제거
		if (id === 0 || id) {
			group = getREleById(id);
			if (group) {
				removeChild(group);
			} else {
				group = _PAPER.group();
				add(group, id, OG.Constants.NODE_TYPE.SHAPE, OG.Constants.SHAPE_TYPE.TEXT);
				_ROOT_GROUP.node.appendChild(group.node);
			}
		} else {
			group = _PAPER.group();
			add(group, id, OG.Constants.NODE_TYPE.SHAPE, OG.Constants.SHAPE_TYPE.TEXT);
			_ROOT_GROUP.node.appendChild(group.node);
		}

		// Draw text
		element = _PAPER.text(position[0], position[1], text);
		element.attr(_style);

		// real size
		bBox = element.getBBox();

		// calculate width, height, left, top
		width = width ? (width > bBox.width ? width : bBox.width) : bBox.width;
		height = height ? (height > bBox.height ? height : bBox.height) : bBox.height;
		left = OG.Util.round(position[0] - width / 2);
		top = OG.Util.round(position[1] - height / 2);

		// Boundary Box
		geom = new OG.Rectangle([left, top], width, height);
		geom.style.map = _style;

		// Text Horizontal Align
		switch (_style["text-anchor"]) {
		case "start":
			x = geom.getBoundary().getLeftCenter().x;
			break;
		case "end":
			x = geom.getBoundary().getRightCenter().x;
			break;
		case "middle":
			x = geom.getBoundary().getCentroid().x;
			break;
		default:
			x = geom.getBoundary().getCentroid().x;
			break;
		}

		// Text Vertical Align
		switch (_style["vertical-align"]) {
		case "top":
			y = OG.Util.round(geom.getBoundary().getUpperCenter().y + bBox.height / 2);
			break;
		case "bottom":
			y = OG.Util.round(geom.getBoundary().getLowerCenter().y - bBox.height / 2);
			break;
		case "middle":
			y = geom.getBoundary().getCentroid().y;
			break;
		default:
			y = geom.getBoundary().getCentroid().y;
			break;
		}

		// text align 적용
		element.attr({x: x, y: y});

		// font-color, font-size 적용
		element.attr({
			stroke     : "none",
			fill       : _style["font-color"] || OG.Constants.DEFAULT_STYLE.LABEL["font-color"],
			"font-size": _style["font-size"] || OG.Constants.DEFAULT_STYLE.LABEL["font-size"]
		});

		// angle 적용
		if (angle) {
			element.rotate(angle);
		}

		// Add to group
		add(element);
		group.node.appendChild(element.node);
		group.node.text = text;
		group.node.angle = angle;
		group.node.geom = geom;
		group.attr(OG.Constants.DEFAULT_STYLE.SHAPE);

		if (group.node.shape) {
			group.node.shape.text = text;
			group.node.shape.angle = angle;
			group.node.shape.geom = geom;

			if (group.node.text) {
				if (OG.Util.isIE7()) {
					group.node.removeAttribute("text");
				} else {
					delete group.node.text;
				}
			}
			if (group.node.angle) {
				if (OG.Util.isIE7()) {
					group.node.removeAttribute("angle");
				} else {
					delete group.node.angle;
				}
			}
			if (group.node.geom) {
				if (OG.Util.isIE7()) {
					group.node.removeAttribute("geom");
				} else {
					delete group.node.geom;
				}
			}
		}

		return group.node;
	};

	/**
	 * 임베드 HTML String 을 캔버스에 위치 및 사이즈 지정하여 드로잉한다.
	 *
	 * @param {Number[]} position 드로잉할 위치 좌표(중앙 기준)
	 * @param {String} html 임베드 HTML String
	 * @param {Number[]} size Image Width, Height, Angle
	 * @param {OG.geometry.Style,Object} style 스타일
	 * @param {String} id Element ID 지정
	 * @return {Element} DOM Element
	 * @override
	 */
	this.drawHtml = function (position, html, size, style, id) {
		var width = size ? size[0] : null,
			height = size ? size[1] : null,
			angle = size ? size[2] || 0 : 0,
			group, element, _style = {}, bBox, geom, left, top;
		OG.Util.apply(_style, (style instanceof OG.geometry.Style) ? style.map : style || {}, OG.Constants.DEFAULT_STYLE.HTML);

		// ID 지정된 경우 존재하면 하위 노드 제거
		if (id === 0 || id) {
			group = getREleById(id);
			if (group) {
				removeChild(group);
			} else {
				group = _PAPER.group();
				add(group, id, OG.Constants.NODE_TYPE.SHAPE, OG.Constants.SHAPE_TYPE.HTML);
				_ROOT_GROUP.node.appendChild(group.node);
			}
		} else {
			group = _PAPER.group();
			add(group, id, OG.Constants.NODE_TYPE.SHAPE, OG.Constants.SHAPE_TYPE.HTML);
			_ROOT_GROUP.node.appendChild(group.node);
		}

		// Draw foreign object
		element = _PAPER.foreignObject(html, position[0], position[1], width, height);
		element.attr(_style);

		// real size
		bBox = element.getBBox();

		// calculate width, height, left, top
		width = width || bBox.width;
		height = height || bBox.height;
		left = OG.Util.round(position[0] - width / 2);
		top = OG.Util.round(position[1] - height / 2);

		// text align 적용
		element.attr({x: left, y: top});

		geom = new OG.Rectangle([left, top], width, height);
		if (angle) {
			element.rotate(angle);
		}
		geom.style.map = _style;

		// Add to group
		add(element);
		group.node.appendChild(element.node);
		group.node.html = html;
		group.node.angle = angle;
		group.node.geom = geom;
		group.attr(OG.Constants.DEFAULT_STYLE.SHAPE);

		if (group.node.shape) {
			group.node.shape.html = html;
			group.node.shape.angle = angle;
			group.node.shape.geom = geom;

			if (group.node.html) {
				if (OG.Util.isIE7()) {
					group.node.removeAttribute("html");
				} else {
					delete group.node.html;
				}
			}
			if (group.node.angle) {
				if (OG.Util.isIE7()) {
					group.node.removeAttribute("angle");
				} else {
					delete group.node.angle;
				}
			}
			if (group.node.geom) {
				if (OG.Util.isIE7()) {
					group.node.removeAttribute("geom");
				} else {
					delete group.node.geom;
				}
			}
		}

		return group.node;
	};

	/**
	 * Image 를 캔버스에 위치 및 사이즈 지정하여 드로잉한다.
	 *
	 * @param {Number[]} position 드로잉할 위치 좌표(중앙 기준)
	 * @param {String} imgSrc 이미지경로
	 * @param {Number[]} size Image Width, Height, Angle
	 * @param {OG.geometry.Style,Object} style 스타일
	 * @param {String} id Element ID 지정
	 * @return {Element} DOM Element
	 * @override
	 */
	this.drawImage = function (position, imgSrc, size, style, id) {
		var width = size ? size[0] : null,
			height = size ? size[1] : null,
			angle = size ? size[2] || 0 : 0,
			group, element, _style = {}, bBox, geom, left, top;
		OG.Util.apply(_style, (style instanceof OG.geometry.Style) ? style.map : style || {}, OG.Constants.DEFAULT_STYLE.IMAGE);

		// ID 지정된 경우 존재하면 하위 노드 제거
		if (id === 0 || id) {
			group = getREleById(id);
			if (group) {
				removeChild(group);
			} else {
				group = _PAPER.group();
				add(group, id, OG.Constants.NODE_TYPE.SHAPE, OG.Constants.SHAPE_TYPE.IMAGE);
				_ROOT_GROUP.node.appendChild(group.node);
			}
		} else {
			group = _PAPER.group();
			add(group, id, OG.Constants.NODE_TYPE.SHAPE, OG.Constants.SHAPE_TYPE.IMAGE);
			_ROOT_GROUP.node.appendChild(group.node);
		}

		// Draw image
		element = _PAPER.image(imgSrc, position[0], position[1], width, height);
		element.attr(_style);

		// real size
		bBox = element.getBBox();

		// calculate width, height, left, top
		width = width || bBox.width;
		height = height || bBox.height;
		left = OG.Util.round(position[0] - width / 2);
		top = OG.Util.round(position[1] - height / 2);

		// text align 적용
		element.attr({x: left, y: top});

		geom = new OG.Rectangle([left, top], width, height);
		if (angle) {
			element.rotate(angle);
		}
		geom.style.map = _style;

		// Add to group
		add(element);
		group.node.appendChild(element.node);
		group.node.image = imgSrc;
		group.node.angle = angle;
		group.node.geom = geom;
		group.attr(OG.Constants.DEFAULT_STYLE.SHAPE);

		if (group.node.shape) {
			group.node.shape.image = imgSrc;
			group.node.shape.angle = angle;
			group.node.shape.geom = geom;

			if (group.node.image) {
				if (OG.Util.isIE7()) {
					group.node.removeAttribute("image");
				} else {
					delete group.node.image;
				}
			}
			if (group.node.angle) {
				if (OG.Util.isIE7()) {
					group.node.removeAttribute("angle");
				} else {
					delete group.node.angle;
				}
			}
			if (group.node.geom) {
				if (OG.Util.isIE7()) {
					group.node.removeAttribute("geom");
				} else {
					delete group.node.geom;
				}
			}
		}

		return group.node;
	};

	/**
	 * 라인을 캔버스에 드로잉한다.
	 * OG.geometry.Line 타입인 경우 EdgeType 에 따라 Path 를 자동으로 계산하며,
	 * OG.geometry.PolyLine 인 경우는 주어진 Path 그대로 drawing 한다.
	 *
	 * @param {OG.geometry.Line,OG.geometry.PolyLine} line 또는 polyLine
	 * @param {OG.geometry.Style,Object} style 스타일
	 * @param {String} id Element ID 지정
	 * @param {Boolean} isSelf 셀프 연결 여부
	 * @return {Element} Group DOM Element with geometry
	 * @override
	 */
	this.drawEdge = function (line, style, id, isSelf) {
		var group, _style = {},
			vertices = line.getVertices(),
			from = vertices[0], to = vertices[vertices.length - 1],
			points = [], edge, edge_direction,
			getArrayOfOrthogonal_1 = function (from, to, isHorizontal) {
				if (isHorizontal) {
					return [
						[from[0], from[1]],
						[to[0], from[1]],
						[to[0], to[1]]
					];
				} else {
					return [
						[from[0], from[1]],
						[from[0], to[1]],
						[to[0], to[1]]
					];
				}
			},
			getArrayOfOrthogonal_2 = function (from, to, isHorizontal) {
				if (isHorizontal) {
					return [
						[from[0], from[1]],
						[OG.Util.round((from[0] + to[0]) / 2), from[1]],
						[OG.Util.round((from[0] + to[0]) / 2), to[1]],
						[to[0], to[1]]
					];
				} else {
					return [
						[from[0], from[1]],
						[from[0], OG.Util.round((from[1] + to[1]) / 2)],
						[to[0], OG.Util.round((from[1] + to[1]) / 2)],
						[to[0], to[1]]
					];
				}
			};

		OG.Util.apply(_style, (style instanceof OG.geometry.Style) ? style.map : style || {},
			OG.Util.apply({}, line.style.map, OG.Constants.DEFAULT_STYLE.EDGE));

		// ID 지정된 경우 존재하면 하위 노드 제거
		if (id === 0 || id) {
			group = getREleById(id);
			if (group) {
				removeChild(group);
			} else {
				group = _PAPER.group();
				add(group, id, OG.Constants.NODE_TYPE.SHAPE, OG.Constants.SHAPE_TYPE.EDGE);
				_ROOT_GROUP.node.appendChild(group.node);
			}
		} else {
			group = _PAPER.group();
			add(group, id, OG.Constants.NODE_TYPE.SHAPE, OG.Constants.SHAPE_TYPE.EDGE);
			_ROOT_GROUP.node.appendChild(group.node);
		}

		if (isSelf) {
			points = [
				[from.x, from.y - OG.Constants.GUIDE_RECT_SIZE / 2],
				[from.x + OG.Constants.GUIDE_RECT_SIZE * 2, from.y - OG.Constants.GUIDE_RECT_SIZE],
				[from.x + OG.Constants.GUIDE_RECT_SIZE * 2, from.y + OG.Constants.GUIDE_RECT_SIZE],
				[from.x, from.y + OG.Constants.GUIDE_RECT_SIZE / 2]
			];
		} else if (line instanceof OG.geometry.Line) {
			// edgeType
			switch (_style["edge-type"].toLowerCase()) {
			case OG.Constants.EDGE_TYPE.STRAIGHT:
				points = [from, to];
				break;
			case OG.Constants.EDGE_TYPE.PLAIN:
				edge_direction = _style["edge-direction"].toLowerCase().split(" ");

				// 'c' 인 경우 위치 보정
				if (edge_direction[0] === "c" || edge_direction[1] === "c") {
					edge_direction = adjustEdgeDirection(edge_direction[0], edge_direction[1], [from.x, from.y], [to.x, to.y]).split(" ");
				}

				if (edge_direction[0] === "e") {
					switch (edge_direction[1]) {
					case "e":
						if (from.x <= to.x) {
							points = getArrayOfOrthogonal_1(
								[from.x, from.y],
								[to.x + OG.Constants.EDGE_PADDING, to.y],
								true
							);
							points.push([to.x, to.y]);
						} else {
							points = [
								[from.x, from.y]
							];
							points = points.concat(getArrayOfOrthogonal_1(
								[from.x + OG.Constants.EDGE_PADDING, from.y],
								[to.x, to.y],
								false
							));
						}
						break;
					case "w":
						if (from.x <= to.x) {
							points = getArrayOfOrthogonal_2(
								[from.x, from.y],
								[to.x, to.y],
								true
							);
						} else {
							points = [
								[from.x, from.y]
							];
							points = points.concat(getArrayOfOrthogonal_2(
								[from.x + OG.Constants.EDGE_PADDING, from.y],
								[to.x - OG.Constants.EDGE_PADDING, to.y],
								false
							));
							points.push([to.x, to.y]);
						}
						break;
					case "s":
						if (from.x <= to.x && from.y <= to.y) {
							points = getArrayOfOrthogonal_2(
								[from.x, from.y],
								[to.x, to.y + OG.Constants.EDGE_PADDING],
								true
							);
							points.push([to.x, to.y]);
						} else if (from.x <= to.x && from.y > to.y) {
							points = getArrayOfOrthogonal_1(
								[from.x, from.y],
								[to.x, to.y],
								true
							);
						} else if (from.x > to.x && from.y <= to.y) {
							points = [
								[from.x, from.y]
							];
							points = points.concat(getArrayOfOrthogonal_1(
								[from.x + OG.Constants.EDGE_PADDING, from.y],
								[to.x, to.y + OG.Constants.EDGE_PADDING],
								false
							));
							points.push([to.x, to.y]);
						} else if (from.x > to.x && from.y > to.y) {
							points = [
								[from.x, from.y]
							];
							points = points.concat(getArrayOfOrthogonal_2(
								[from.x + OG.Constants.EDGE_PADDING, from.y],
								[to.x, to.y],
								false
							));
						}
						break;
					case "n":
						if (from.x <= to.x && from.y <= to.y) {
							points = getArrayOfOrthogonal_1(
								[from.x, from.y],
								[to.x, to.y],
								true
							);
						} else if (from.x <= to.x && from.y > to.y) {
							points = [
								[from.x, from.y]
							];
							points = points.concat(getArrayOfOrthogonal_1(
								[from.x + OG.Constants.EDGE_PADDING, from.y],
								[to.x, to.y - OG.Constants.EDGE_PADDING],
								false
							));
							points.push([to.x, to.y]);
						} else if (from.x > to.x && from.y <= to.y) {
							points = [
								[from.x, from.y]
							];
							points = points.concat(getArrayOfOrthogonal_2(
								[from.x + OG.Constants.EDGE_PADDING, from.y],
								[to.x, to.y],
								false
							));
						} else if (from.x > to.x && from.y > to.y) {
							points = [
								[from.x, from.y]
							];
							points = points.concat(getArrayOfOrthogonal_1(
								[from.x + OG.Constants.EDGE_PADDING, from.y],
								[to.x, to.y - OG.Constants.EDGE_PADDING],
								false
							));
							points.push([to.x, to.y]);
						}
						break;
					}
				} else if (edge_direction[0] === "w") {
					switch (edge_direction[1]) {
					case "e":
						if (from.x <= to.x) {
							points = [
								[from.x, from.y]
							];
							points = points.concat(getArrayOfOrthogonal_2(
								[from.x - OG.Constants.EDGE_PADDING, from.y],
								[to.x + OG.Constants.EDGE_PADDING, to.y],
								false
							));
							points.push([to.x, to.y]);
						} else {
							points = getArrayOfOrthogonal_2(
								[from.x, from.y],
								[to.x, to.y],
								true
							);
						}
						break;
					case "w":
						if (from.x <= to.x) {
							points = [
								[from.x, from.y]
							];
							points = points.concat(getArrayOfOrthogonal_1(
								[from.x - OG.Constants.EDGE_PADDING, from.y],
								[to.x, to.y],
								false
							));

						} else {
							points = getArrayOfOrthogonal_1(
								[from.x, from.y],
								[to.x - OG.Constants.EDGE_PADDING, to.y],
								true
							);
							points.push([to.x, to.y]);
						}
						break;
					case "s":
						if (from.x <= to.x && from.y <= to.y) {
							points = [
								[from.x, from.y]
							];
							points = points.concat(getArrayOfOrthogonal_1(
								[from.x - OG.Constants.EDGE_PADDING, from.y],
								[to.x, to.y + OG.Constants.EDGE_PADDING],
								false
							));
							points.push([to.x, to.y]);
						} else if (from.x <= to.x && from.y > to.y) {
							points = [
								[from.x, from.y]
							];
							points = points.concat(getArrayOfOrthogonal_2(
								[from.x - OG.Constants.EDGE_PADDING, from.y],
								[to.x, to.y],
								false
							));
						} else if (from.x > to.x && from.y <= to.y) {
							points = getArrayOfOrthogonal_2(
								[from.x, from.y],
								[to.x, to.y + OG.Constants.EDGE_PADDING],
								true
							);
							points.push([to.x, to.y]);
						} else if (from.x > to.x && from.y > to.y) {
							points = getArrayOfOrthogonal_1(
								[from.x, from.y],
								[to.x, to.y],
								true
							);
						}
						break;
					case "n":
						if (from.x <= to.x && from.y <= to.y) {
							points = [
								[from.x, from.y]
							];
							points = points.concat(getArrayOfOrthogonal_2(
								[from.x - OG.Constants.EDGE_PADDING, from.y],
								[to.x, to.y],
								false
							));
						} else if (from.x <= to.x && from.y > to.y) {
							points = [
								[from.x, from.y]
							];
							points = points.concat(getArrayOfOrthogonal_1(
								[from.x - OG.Constants.EDGE_PADDING, from.y],
								[to.x, to.y - OG.Constants.EDGE_PADDING],
								false
							));
							points.push([to.x, to.y]);
						} else if (from.x > to.x && from.y <= to.y) {
							points = points.concat(getArrayOfOrthogonal_1(
								[from.x, from.y],
								[to.x, to.y],
								true
							));
						} else if (from.x > to.x && from.y > to.y) {
							points = getArrayOfOrthogonal_2(
								[from.x, from.y],
								[to.x, to.y - OG.Constants.EDGE_PADDING],
								true
							);
							points.push([to.x, to.y]);
						}
						break;
					}
				} else if (edge_direction[0] === "s") {
					switch (edge_direction[1]) {
					case "e":
						if (from.x <= to.x && from.y <= to.y) {
							points = getArrayOfOrthogonal_2(
								[from.x, from.y],
								[to.x + OG.Constants.EDGE_PADDING, to.y],
								false
							);
							points.push([to.x, to.y]);
						} else if (from.x <= to.x && from.y > to.y) {
							points = [
								[from.x, from.y]
							];
							points = points.concat(getArrayOfOrthogonal_1(
								[from.x, from.y + OG.Constants.EDGE_PADDING],
								[to.x + OG.Constants.EDGE_PADDING, to.y],
								true
							));
							points.push([to.x, to.y]);
						} else if (from.x > to.x && from.y <= to.y) {
							points = getArrayOfOrthogonal_1(
								[from.x, from.y],
								[to.x, to.y],
								false
							);
						} else if (from.x > to.x && from.y > to.y) {
							points = [
								[from.x, from.y]
							];
							points = points.concat(getArrayOfOrthogonal_2(
								[from.x, from.y + OG.Constants.EDGE_PADDING],
								[to.x, to.y],
								true
							));
						}
						break;
					case "w":
						if (from.x <= to.x && from.y <= to.y) {
							points = getArrayOfOrthogonal_1(
								[from.x, from.y],
								[to.x, to.y],
								false
							);
						} else if (from.x <= to.x && from.y > to.y) {
							points = [
								[from.x, from.y]
							];
							points = points.concat(getArrayOfOrthogonal_2(
								[from.x, from.y + OG.Constants.EDGE_PADDING],
								[to.x, to.y],
								true
							));
						} else if (from.x > to.x && from.y <= to.y) {
							points = getArrayOfOrthogonal_2(
								[from.x, from.y],
								[to.x - OG.Constants.EDGE_PADDING, to.y],
								false
							);
							points.push([to.x, to.y]);
						} else if (from.x > to.x && from.y > to.y) {
							points = [
								[from.x, from.y]
							];
							points = points.concat(getArrayOfOrthogonal_1(
								[from.x, from.y + OG.Constants.EDGE_PADDING],
								[to.x - OG.Constants.EDGE_PADDING, to.y],
								true
							));
							points.push([to.x, to.y]);
						}
						break;
					case "s":
						if (from.y <= to.y) {
							points = getArrayOfOrthogonal_1(
								[from.x, from.y],
								[to.x, to.y + OG.Constants.EDGE_PADDING],
								false
							);
							points.push([to.x, to.y]);
						} else {
							points = [
								[from.x, from.y]
							];
							points = points.concat(getArrayOfOrthogonal_1(
								[from.x, from.y + OG.Constants.EDGE_PADDING],
								[to.x, to.y],
								true
							));
						}
						break;
					case "n":
						if (from.y <= to.y) {
							points = getArrayOfOrthogonal_2(
								[from.x, from.y],
								[to.x, to.y],
								false
							);
						} else {
							points = [
								[from.x, from.y]
							];
							points = points.concat(getArrayOfOrthogonal_2(
								[from.x, from.y + OG.Constants.EDGE_PADDING],
								[to.x, to.y - OG.Constants.EDGE_PADDING],
								true
							));
							points.push([to.x, to.y]);
						}
						break;
					}
				} else if (edge_direction[0] === "n") {
					switch (edge_direction[1]) {
					case "e":
						if (from.x <= to.x && from.y <= to.y) {
							points = [
								[from.x, from.y]
							];
							points = points.concat(getArrayOfOrthogonal_1(
								[from.x, from.y - OG.Constants.EDGE_PADDING],
								[to.x + OG.Constants.EDGE_PADDING, to.y],
								true
							));
							points.push([to.x, to.y]);
						} else if (from.x <= to.x && from.y > to.y) {
							points = getArrayOfOrthogonal_2(
								[from.x, from.y],
								[to.x + OG.Constants.EDGE_PADDING, to.y],
								false
							);
							points.push([to.x, to.y]);
						} else if (from.x > to.x && from.y <= to.y) {
							points = [
								[from.x, from.y]
							];
							points = points.concat(getArrayOfOrthogonal_2(
								[from.x, from.y - OG.Constants.EDGE_PADDING],
								[to.x, to.y],
								true
							));
						} else if (from.x > to.x && from.y > to.y) {
							points = getArrayOfOrthogonal_1(
								[from.x, from.y],
								[to.x, to.y],
								false
							);
						}
						break;
					case "w":
						if (from.x <= to.x && from.y <= to.y) {
							points = [
								[from.x, from.y]
							];
							points = points.concat(getArrayOfOrthogonal_2(
								[from.x, from.y - OG.Constants.EDGE_PADDING],
								[to.x, to.y],
								true
							));
						} else if (from.x <= to.x && from.y > to.y) {
							points = getArrayOfOrthogonal_1(
								[from.x, from.y],
								[to.x, to.y],
								false
							);
						} else if (from.x > to.x && from.y <= to.y) {
							points = [
								[from.x, from.y]
							];
							points = points.concat(getArrayOfOrthogonal_1(
								[from.x, from.y - OG.Constants.EDGE_PADDING],
								[to.x - OG.Constants.EDGE_PADDING, to.y],
								true
							));
							points.push([to.x, to.y]);
						} else if (from.x > to.x && from.y > to.y) {
							points = getArrayOfOrthogonal_2(
								[from.x, from.y],
								[to.x - OG.Constants.EDGE_PADDING, to.y],
								false
							);
							points.push([to.x, to.y]);
						}
						break;
					case "s":
						if (from.y <= to.y) {
							points = [
								[from.x, from.y]
							];
							points = points.concat(getArrayOfOrthogonal_2(
								[from.x, from.y - OG.Constants.EDGE_PADDING],
								[to.x, to.y + OG.Constants.EDGE_PADDING],
								true
							));
							points.push([to.x, to.y]);
						} else {
							points = getArrayOfOrthogonal_2(
								[from.x, from.y],
								[to.x, to.y],
								false
							);
						}
						break;
					case "n":
						if (from.y <= to.y) {
							points = [
								[from.x, from.y]
							];
							points = points.concat(getArrayOfOrthogonal_1(
								[from.x, from.y - OG.Constants.EDGE_PADDING],
								[to.x, to.y],
								true
							));
						} else {
							points = getArrayOfOrthogonal_1(
								[from.x, from.y],
								[to.x, to.y - OG.Constants.EDGE_PADDING],
								false
							);
							points.push([to.x, to.y]);
						}
						break;
					}
				}
				break;
			case OG.Constants.EDGE_TYPE.BEZIER:
				// TODO : 베지어곡선
				break;
			}
		} else if (line instanceof OG.geometry.Curve) {
			points = line.getControlPoints();
		} else {
			points = vertices;
		}

		// Draw geometry
		if (isSelf) {
			edge = new OG.Curve(points);
		} else if (line instanceof OG.geometry.Curve) {
			edge = new OG.Curve(points);
		} else {
			edge = new OG.PolyLine(points);
		}

		// draw hidden edge
		drawGeometry(group.node, edge, OG.Constants.DEFAULT_STYLE.EDGE_HIDDEN);

		// draw Edge
		drawGeometry(group.node, edge, _style);
		group.node.geom = edge;
		group.attr(OG.Constants.DEFAULT_STYLE.SHAPE);

		if (group.node.shape) {
			group.node.shape.geom = edge;

			if (group.node.geom) {
				if (OG.Util.isIE7()) {
					group.node.removeAttribute("geom");
				} else {
					delete group.node.geom;
				}
			}
		}

		return group.node;
	};

	/**
	 * 그룹 Geometry 를 캔버스에 드로잉한다.
	 *
	 * @param {OG.geometry.Geometry} geometry 기하 객체
	 * @param {OG.geometry.Style,Object} style 스타일
	 * @return {Element} Group DOM Element with geometry
	 * @override
	 */
	this.drawGroup = function (geometry, style, id) {
		var group, geomElement, _style = {}, childNodes, i, boundary, titleLine, _tempStyle = {};

		OG.Util.apply(_style, (style instanceof OG.geometry.Style) ? style.map : style || {});

		// ID 지정된 경우 존재하면 하위 노드 제거, 하위에 Shape 은 삭제하지 않도록
		if (id === 0 || id) {
			group = getREleById(id);
			if (group) {
				childNodes = group.node.childNodes;
				for (i = childNodes.length - 1; i >= 0; i--) {
					if ($(childNodes[i]).attr("_type") !== OG.Constants.NODE_TYPE.SHAPE) {
						remove(getREleById(childNodes[i].id));
					}
				}
			} else {
				group = _PAPER.group();
				add(group, id, OG.Constants.NODE_TYPE.SHAPE, OG.Constants.SHAPE_TYPE.GROUP);
				_ROOT_GROUP.node.appendChild(group.node);
			}
		} else {
			group = _PAPER.group();
			add(group, id, OG.Constants.NODE_TYPE.SHAPE, OG.Constants.SHAPE_TYPE.GROUP);
			_ROOT_GROUP.node.appendChild(group.node);
		}

		// Draw geometry
		geomElement = drawGeometry(group.node, geometry, _style);
		group.node.geom = geometry;
		group.attr(OG.Constants.DEFAULT_STYLE.SHAPE);

		// 타이틀 라인 Drawing
		OG.Util.apply(_tempStyle, geometry.style.map, _style);
		if (_tempStyle['label-direction'] && _tempStyle['vertical-align'] === 'top') {
			boundary = geometry.getBoundary();
			if (_tempStyle['label-direction'] === 'vertical') {
				titleLine = new OG.geometry.Line(
					[boundary.getUpperLeft().x + 20, boundary.getUpperLeft().y],
					[boundary.getLowerLeft().x + 20, boundary.getLowerLeft().y]
				);
			} else {
				titleLine = new OG.geometry.Line(
					[boundary.getUpperLeft().x, boundary.getUpperLeft().y + 20],
					[boundary.getUpperRight().x, boundary.getUpperRight().y + 20]
				);
			}
			drawGeometry(group.node, titleLine, _style);
		}

		// 위치조정
		if (geomElement.id !== group.node.firstChild.id) {
			group.node.insertBefore(geomElement, group.node.firstChild);
		}

		if (group.node.shape) {
			if (!group.node.shape.isCollapsed || group.node.shape.isCollapsed === false) {
				group.node.shape.geom = geometry;
			}

			if (group.node.geom) {
				if (OG.Util.isIE7()) {
					group.node.removeAttribute("geom");
				} else {
					delete group.node.geom;
				}
			}
		}

		return group.node;
	};

	/**
	 * Shape 의 Label 을 캔버스에 위치 및 사이즈 지정하여 드로잉한다.
	 *
	 * @param {Element,String} shapeElement Shape DOM element or ID
	 * @param {String} text 텍스트
	 * @param {OG.geometry.Style,Object} style 스타일
	 * @return {Element} DOM Element
	 * @override
	 */
	this.drawLabel = function (shapeElement, text, style) {
		var rElement = getREleById(OG.Util.isElement(shapeElement) ? shapeElement.id : shapeElement),
			element, labelElement, envelope, _style = {}, position, size, beforeText,
			/**
			 * 라인(꺽은선)의 중심위치를 반환한다.
			 *
			 * @param {Element} element Edge 엘리먼트
			 * @return {OG.Coordinate}
			 */
				getCenterOfEdge = function (element) {
				var vertices, lineLength, distance = 0, i, intersectArray;

				// Edge Shape 인 경우 라인의 중간 지점 찾기
				vertices = element.shape.geom.getVertices();
				lineLength = element.shape.geom.getLength();

				for (i = 0; i < vertices.length - 1; i++) {
					distance += vertices[i].distance(vertices[i + 1]);
					if (distance > lineLength / 2) {
						intersectArray = element.shape.geom.intersectCircleToLine(
							vertices[i + 1], distance - lineLength / 2, vertices[i + 1], vertices[i]
						);

						break;
					}
				}

				return intersectArray[0];
			},
			centerOfEdge;

		OG.Util.apply(_style, (style instanceof OG.geometry.Style) ? style.map : style || {});

		if (rElement && rElement.node.shape) {
			element = rElement.node;
			envelope = element.shape.geom.getBoundary();

			beforeText = element.shape.label;
			OG.Util.apply(element.shape.geom.style.map, _style);
			element.shape.label = text === undefined ? element.shape.label : text;

			if (element.shape.label !== undefined) {
				if (element.shape instanceof OG.shape.EdgeShape) {
					centerOfEdge = getCenterOfEdge(element);
					position = [centerOfEdge.x, centerOfEdge.y];
					size = [0, 0];
				} else {
					// label-position 에 따라 위치 조정
					switch (element.shape.geom.style.get("label-position")) {
					case "left":
						position = [envelope.getCentroid().x - envelope.getWidth(), envelope.getCentroid().y];
						break;
					case "right":
						position = [envelope.getCentroid().x + envelope.getWidth(), envelope.getCentroid().y];
						break;
					case "top":
						position = [envelope.getCentroid().x, envelope.getCentroid().y - envelope.getHeight()];
						break;
					case "bottom":
						position = [envelope.getCentroid().x, envelope.getCentroid().y + envelope.getHeight()];
						break;
					default:
						position = [envelope.getCentroid().x, envelope.getCentroid().y];
						break;
					}
					size = [envelope.getWidth(), envelope.getHeight()];
				}

				labelElement = drawLabel(
					position,
					element.shape.label,
					size,
					element.shape.geom.style,
					element.id + OG.Constants.LABEL_SUFFIX,
					element.shape instanceof OG.shape.EdgeShape
				);
				element.appendChild(labelElement);

				// drawLabel event fire
				$(_PAPER.canvas).trigger('drawLabel', [element, text]);

				if (text !== beforeText) {
					// labelChanged event file
					$(_PAPER.canvas).trigger('labelChanged', [element, text, beforeText]);
				}
			}
		}

		return labelElement;
	};

	/**
	 * Edge 의 from, to Label 을 캔버스에 위치 및 사이즈 지정하여 드로잉한다.
	 *
	 * @param {Element,String} shapeElement Shape DOM element or ID
	 * @param {String} text 텍스트
	 * @param {String} type 유형(FROM or TO)
	 * @return {Element} DOM Element
	 * @override
	 */
	this.drawEdgeLabel = function (shapeElement, text, type) {
		var rElement = getREleById(OG.Util.isElement(shapeElement) ? shapeElement.id : shapeElement),
			element, vertices, labelElement, position, edgeLabel, suffix;

		if (rElement && rElement.node.shape) {
			element = rElement.node;

			if (element.shape instanceof OG.shape.EdgeShape) {
				vertices = element.shape.geom.getVertices();
				if (type === 'FROM') {
					position = [vertices[0].x, vertices[0].y + OG.Constants.FROMTO_LABEL_OFFSET_TOP];
					element.shape.fromLabel = text || element.shape.fromLabel;
					edgeLabel = element.shape.fromLabel;
					suffix = OG.Constants.FROM_LABEL_SUFFIX;
				} else {
					position = [vertices[vertices.length - 1].x, vertices[vertices.length - 1].y + OG.Constants.FROMTO_LABEL_OFFSET_TOP];
					element.shape.toLabel = text || element.shape.toLabel;
					edgeLabel = element.shape.toLabel;
					suffix = OG.Constants.TO_LABEL_SUFFIX;
				}

				if (edgeLabel) {
					labelElement = drawLabel(
						position,
						edgeLabel,
						[0, 0],
						element.shape.geom.style,
						element.id + suffix,
						false
					);
					element.appendChild(labelElement);
				}
			}
		}

		return labelElement;
	};

	/**
	 * Element 에 저장된 geom, angle, image, text 정보로 shape 을 redraw 한다.
	 *
	 * @param {Element} element Shape 엘리먼트
	 * @param {String[]} excludeEdgeId redraw 제외할 Edge ID
	 * @override
	 */
	this.redrawShape = function (element, excludeEdgeId) {
		var renderer = this, envelope, center, width, height, upperLeft,
			redrawChildConnectedEdge;

		redrawChildConnectedEdge = function (_collapseRootElement, _element) {
			var edgeIdArray, fromEdge, toEdge, _childNodes = _element.childNodes, otherShape, i, j, isNeedToRedraw;
			for (i = _childNodes.length - 1; i >= 0; i--) {
				if ($(_childNodes[i]).attr("_type") === OG.Constants.NODE_TYPE.SHAPE) {
					redrawChildConnectedEdge(_collapseRootElement, _childNodes[i]);

					isNeedToRedraw = false;
					edgeIdArray = $(_childNodes[i]).attr("_fromedge");
					if (edgeIdArray) {
						edgeIdArray = edgeIdArray.split(",");
						for (j = 0; j < edgeIdArray.length; j++) {
							fromEdge = renderer.getElementById(edgeIdArray[j]);
							if (fromEdge) {
								otherShape = getShapeFromTerminal($(fromEdge).attr("_from"));

								// otherShape 이 같은 collapse 범위내에 있는지 체크
								if ($(otherShape).parents("#" + _collapseRootElement.id).length === 0) {
									isNeedToRedraw = true;
								}
							}
						}
					}

					edgeIdArray = $(_childNodes[i]).attr("_toedge");
					if (edgeIdArray) {
						edgeIdArray = edgeIdArray.split(",");
						for (j = 0; j < edgeIdArray.length; j++) {
							toEdge = renderer.getElementById(edgeIdArray[j]);
							if (toEdge) {
								otherShape = getShapeFromTerminal($(toEdge).attr("_to"));

								// otherShape 이 같은 collapse 범위내에 있는지 체크
								if ($(otherShape).parents("#" + _collapseRootElement.id).length === 0) {
									isNeedToRedraw = true;
								}
							}
						}
					}

					// group 영역 밖의 연결된 otherShape 이 있는 경우 redrawConnectedEdge
					if (isNeedToRedraw === true) {
						renderer.redrawConnectedEdge(_childNodes[i]);
					}
				}
			}
		};

		if (element && element.shape.geom) {
			switch ($(element).attr("_shape")) {
			case OG.Constants.SHAPE_TYPE.GEOM:
				element = this.drawGeom(element.shape.geom, {}, element.id);
				this.redrawConnectedEdge(element, excludeEdgeId);
				this.drawLabel(element);
				break;
			case OG.Constants.SHAPE_TYPE.TEXT:
				envelope = element.shape.geom.getBoundary();
				center = envelope.getCentroid();
				width = envelope.getWidth();
				height = envelope.getHeight();
				element = this.drawText([center.x, center.y], element.shape.text,
					[width, height, element.shape.angle], element.shape.geom.style, element.id);
				this.redrawConnectedEdge(element, excludeEdgeId);
				break;
			case OG.Constants.SHAPE_TYPE.IMAGE:
				envelope = element.shape.geom.getBoundary();
				center = envelope.getCentroid();
				width = envelope.getWidth();
				height = envelope.getHeight();
				element = this.drawImage([center.x, center.y], element.shape.image,
					[width, height, element.shape.angle], element.shape.geom.style, element.id);
				this.redrawConnectedEdge(element, excludeEdgeId);
				this.drawLabel(element);
				break;
			case OG.Constants.SHAPE_TYPE.HTML:
				envelope = element.shape.geom.getBoundary();
				center = envelope.getCentroid();
				width = envelope.getWidth();
				height = envelope.getHeight();
				element = this.drawHtml([center.x, center.y], element.shape.html,
					[width, height, element.shape.angle], element.shape.geom.style, element.id);
				this.redrawConnectedEdge(element, excludeEdgeId);
				this.drawLabel(element);
				break;
			case OG.Constants.SHAPE_TYPE.EDGE:
				element = this.drawEdge(element.shape.geom, element.shape.geom.style, element.id);
				this.drawLabel(element);
				this.drawEdgeLabel(element, null, 'FROM');
				this.drawEdgeLabel(element, null, 'TO');
				break;
			case OG.Constants.SHAPE_TYPE.GROUP:
				if (element.shape.isCollapsed) {
					envelope = element.shape.geom.getBoundary();
					upperLeft = envelope.getUpperLeft();
					element = this.drawGroup(new OG.geometry.Rectangle(
						upperLeft, OG.Constants.COLLAPSE_SIZE * 3, OG.Constants.COLLAPSE_SIZE * 2),
						element.shape.geom.style, element.id);
					redrawChildConnectedEdge(element, element);
				} else {
					element = this.drawGroup(element.shape.geom, element.shape.geom.style, element.id);
					this.redrawConnectedEdge(element, excludeEdgeId);
					this.drawLabel(element);
				}
				break;
			}
		}

		// redrawShape event fire
		$(_PAPER.canvas).trigger('redrawShape', [element]);

		return element;
	};

	/**
	 * Edge Element 에 저장된 geom, style 정보로 Edge 를 redraw 한다.
	 * Edge 타입(straight, plain) 에 따른 경로를 새로 계산한다.
	 *
	 * @param {Element,String} edgeElement Element 또는 ID
	 * @override
	 */
	this.redrawEdge = function (edgeElement) {
		var edge, fromTerminalId, toTerminalId, fromShape, toShape, fromTerminalNum, toTerminalNum,
			fromTerminal, toTerminal, vertices, fromDrct, toDrct, fromXY, toXY,
			orgFromXY, orgToXY, orgFromDrct, orgToDrct, intersectionInfo, isSelf,
			collapsedParents, collapsedEnvelope, collapsedUpperLeft, collapsedGeom, collapsedPosition;

		edge = OG.Util.isElement(edgeElement) ? edgeElement : this.getElementById(edgeElement);

		// ex) OG_3312_1_TERMINAL_E_INOUT_0
		fromTerminalId = $(edge).attr("_from");
		toTerminalId = $(edge).attr("_to");

		if (fromTerminalId) {
			fromShape = getShapeFromTerminal(fromTerminalId);
			fromTerminalNum = parseInt(fromTerminalId.substring(fromTerminalId.lastIndexOf("_") + 1), 10);
			fromTerminal = fromShape.shape.createTerminal()[fromTerminalNum];
			fromDrct = fromTerminal.direction.toLowerCase();
			fromXY = fromTerminal.position;
		} else {
			vertices = edge.shape.geom.getVertices();
			fromDrct = "c";
			fromXY = vertices[0];
		}

		if (toTerminalId) {
			toShape = getShapeFromTerminal(toTerminalId);
			toTerminalNum = parseInt(toTerminalId.substring(toTerminalId.lastIndexOf("_") + 1), 10);
			toTerminal = toShape.shape.createTerminal()[toTerminalNum];
			toDrct = toTerminal.direction.toLowerCase();
			toXY = toTerminal.position;
		} else {
			vertices = edge.shape.geom.getVertices();
			toDrct = "c";
			toXY = vertices[vertices.length - 1];
		}

		// backup edge-direction
		orgFromXY = fromXY;
		orgToXY = toXY;
		orgFromDrct = fromDrct;
		orgToDrct = toDrct;

		// direction 이 c 인 경우에 대한 처리(센터 연결)
		if (fromShape && fromDrct === "c") {
			intersectionInfo = this.intersectionEdge(
				edge.shape.geom.style.get("edge-type"), fromShape, [orgFromXY.x, orgFromXY.y], [orgToXY.x, orgToXY.y], true
			);
			fromXY = intersectionInfo.position;
			fromDrct = intersectionInfo.direction;
		}
		if (toShape && toDrct === "c") {
			intersectionInfo = this.intersectionEdge(
				edge.shape.geom.style.get("edge-type"), toShape, [orgFromXY.x, orgFromXY.y], [orgToXY.x, orgToXY.y], false
			);
			toXY = intersectionInfo.position;
			toDrct = intersectionInfo.direction;
		}

		isSelf = fromShape && toShape && fromShape.id === toShape.id;
		if (isSelf) {
			fromXY = toXY = fromShape.shape.geom.getBoundary().getRightCenter();
		} else {
			// fromShape 이 collapsed 인지 체크
			if (fromShape) {
				collapsedParents = $(fromShape).parents("[_collapsed=true]");
				if (collapsedParents.length !== 0) {
					// collapsed 인 경우
					collapsedEnvelope = collapsedParents[collapsedParents.length - 1].shape.geom.getBoundary();
					collapsedUpperLeft = collapsedEnvelope.getUpperLeft();
					collapsedGeom = new OG.geometry.Rectangle(
						collapsedUpperLeft, OG.Constants.COLLAPSE_SIZE * 3, OG.Constants.COLLAPSE_SIZE * 2);

					switch (fromDrct.toUpperCase()) {
					case OG.Constants.TERMINAL_TYPE.E:
						collapsedPosition = collapsedGeom.getBoundary().getRightCenter();
						break;
					case OG.Constants.TERMINAL_TYPE.W:
						collapsedPosition = collapsedGeom.getBoundary().getLeftCenter();
						break;
					case OG.Constants.TERMINAL_TYPE.S:
						collapsedPosition = collapsedGeom.getBoundary().getLowerCenter();
						break;
					case OG.Constants.TERMINAL_TYPE.N:
						collapsedPosition = collapsedGeom.getBoundary().getUpperCenter();
						break;
					}
					if (collapsedPosition) {
						fromXY = [collapsedPosition.x, collapsedPosition.y];
					}
				}
			}

			// toShape 이 collapsed 인지 체크
			if (toShape) {
				collapsedParents = $(toShape).parents("[_collapsed=true]");
				if (collapsedParents.length !== 0) {
					// collapsed 인 경우
					collapsedEnvelope = collapsedParents[collapsedParents.length - 1].shape.geom.getBoundary();
					collapsedUpperLeft = collapsedEnvelope.getUpperLeft();
					collapsedGeom = new OG.geometry.Rectangle(
						collapsedUpperLeft, OG.Constants.COLLAPSE_SIZE * 3, OG.Constants.COLLAPSE_SIZE * 2);

					switch (toDrct.toUpperCase()) {
					case OG.Constants.TERMINAL_TYPE.E:
						collapsedPosition = collapsedGeom.getBoundary().getRightCenter();
						break;
					case OG.Constants.TERMINAL_TYPE.W:
						collapsedPosition = collapsedGeom.getBoundary().getLeftCenter();
						break;
					case OG.Constants.TERMINAL_TYPE.S:
						collapsedPosition = collapsedGeom.getBoundary().getLowerCenter();
						break;
					case OG.Constants.TERMINAL_TYPE.N:
						collapsedPosition = collapsedGeom.getBoundary().getUpperCenter();
						break;
					}
					if (collapsedPosition) {
						toXY = [collapsedPosition.x, collapsedPosition.y];
					}
				}
			}
		}

		// redraw edge
		edge = this.drawEdge(new OG.Line(fromXY, toXY),
			OG.Util.apply(edge.shape.geom.style.map, {"edge-direction": fromDrct + " " + toDrct}), edge.id, isSelf);

		// Draw Label
		this.drawLabel(edge);
		this.drawEdgeLabel(edge, null, 'FROM');
		this.drawEdgeLabel(edge, null, 'TO');

		// restore edge-direction
		OG.Util.apply(edge.shape.geom.style.map, {"edge-direction": orgFromDrct + " " + orgToDrct});
	};

	/**
	 * Shape 의 연결된 Edge 를 redraw 한다.(이동 또는 리사이즈시)
	 *
	 * @param {Element} element
	 * @param {String[]} excludeEdgeId redraw 제외할 Edge ID
	 * @override
	 */
	this.redrawConnectedEdge = function (element, excludeEdgeId) {
		var edgeId, renderer = this;

		edgeId = $(element).attr("_fromedge");
		if (edgeId) {
			$.each(edgeId.split(","), function (idx, item) {
				if (!excludeEdgeId || excludeEdgeId.toString().indexOf(item) < 0) {
					renderer.redrawEdge(item);
				}
			});
		}

		edgeId = $(element).attr("_toedge");
		if (edgeId) {
			$.each(edgeId.split(","), function (idx, item) {
				if (!excludeEdgeId || excludeEdgeId.toString().indexOf(item) < 0) {
					renderer.redrawEdge(item);
				}
			});
		}

		this.removeAllTerminal();
	};

	/**
	 * 두개의 터미널을 연결하고, 속성정보에 추가한다.
	 *
	 * @param {Element,Number[]} from 시작점
	 * @param {Element,Number[]} to 끝점
	 * @param {Element} edge Edge Shape
	 * @param {OG.geometry.Style,Object} style 스타일
	 * @param {String} label Label
	 * @return {Element} 연결된 Edge 엘리먼트
	 * @override
	 */
	this.connect = function (from, to, edge, style, label) {
		var _style = {}, fromShape, toShape, intersectionInfo, fromXY, toXY,
			orgFromXY, orgToXY, fromDrct, toDrct, orgFromDrct, orgToDrct, isSelf, beforeEvent,
			addAttrValues = function (element, name, value) {
				var attrValue = $(element).attr(name),
					array = attrValue ? attrValue.split(",") : [],
					newArray = [];
				$.each(array, function (idx, item) {
					if (item !== value) {
						newArray.push(item);
					}
				});
				newArray.push(value);

				$(element).attr(name, newArray.toString());
				return element;
			};

		OG.Util.apply(_style, (style instanceof OG.geometry.Style) ? style.map : style || {}, OG.Constants.DEFAULT_STYLE.EDGE);

		// 연결 시작, 끝 Shape
		if (OG.Util.isElement(from)) {
			fromShape = getShapeFromTerminal(from);
			fromXY = [from.terminal.position.x, from.terminal.position.y];
			fromDrct = from.terminal.direction.toLowerCase();
		} else {
			fromXY = from;
			fromDrct = "c";
		}
		if (OG.Util.isElement(to)) {
			toShape = getShapeFromTerminal(to);
			toXY = [to.terminal.position.x, to.terminal.position.y];
			toDrct = to.terminal.direction.toLowerCase();
		} else {
			toXY = to;
			toDrct = "c";
		}

		if (fromShape && toShape) {
			beforeEvent = jQuery.Event("beforeConnectShape", {edge: edge, fromShape: fromShape, toShape: toShape});
			$(_PAPER.canvas).trigger(beforeEvent);
			if (beforeEvent.isPropagationStopped()) {
				this.remove(edge);
				return false;
			}
		}

		// backup edge-direction
		orgFromXY = fromXY;
		orgToXY = toXY;
		orgFromDrct = fromDrct;
		orgToDrct = toDrct;

		// direction 이 c 인 경우에 대한 처리(센터 연결)
		if (fromShape && fromDrct === "c") {
			intersectionInfo = this.intersectionEdge(_style["edge-type"], fromShape, orgFromXY, orgToXY, true);
			fromXY = intersectionInfo.position;
			fromDrct = intersectionInfo.direction;
		}
		if (toShape && toDrct === "c") {
			intersectionInfo = this.intersectionEdge(_style["edge-type"], toShape, orgFromXY, orgToXY, false);
			toXY = intersectionInfo.position;
			toDrct = intersectionInfo.direction;
		}

		isSelf = fromShape && toShape && fromShape.id === toShape.id;
		if (isSelf) {
			fromXY = toXY = fromShape.shape.geom.getBoundary().getRightCenter();
		}

		// 라인 드로잉
		edge = this.drawEdge(new OG.Line(fromXY, toXY),
			OG.Util.apply(_style, {"edge-direction": fromDrct + " " + toDrct}), edge ? edge.id : null, isSelf);

		// Draw Label
		this.drawLabel(edge, label);
		this.drawEdgeLabel(edge, null, 'FROM');
		this.drawEdgeLabel(edge, null, 'TO');

		// restore edge-direction
		OG.Util.apply(edge.shape.geom.style.map, {"edge-direction": orgFromDrct + " " + orgToDrct});
		edge.shapeStyle = edge.shape.geom.style.map;

		// 이전 연결속성정보 삭제
		this.disconnect(edge);

		// 연결 노드 정보 설정
		if (OG.Util.isElement(from)) {
			$(edge).attr("_from", from.id);
			addAttrValues(fromShape, "_toedge", edge.id);
		}

		if (OG.Util.isElement(to)) {
			$(edge).attr("_to", to.id);
			addAttrValues(toShape, "_fromedge", edge.id);
		}

		this.removeAllTerminal();

		if (fromShape && toShape) {
			// connectShape event fire
			$(_PAPER.canvas).trigger('connectShape', [edge, fromShape, toShape]);
		}

		return edge;
	};

	/**
	 * 연결속성정보를 삭제한다. Edge 인 경우는 연결 속성정보만 삭제하고, 일반 Shape 인 경우는 연결된 모든 Edge 를 삭제한다.
	 *
	 * @param {Element} element
	 * @override
	 */
	this.disconnect = function (element) {
		var renderer = this, fromTerminalId, toTerminalId, fromShape, toShape, fromEdgeId, toEdgeId, fromEdge, toEdge,
			removeAttrValue = function (element, name, value) {
				var attrValue = $(element).attr(name),
					array = attrValue ? attrValue.split(",") : [],
					newArray = [];
				$.each(array, function (idx, item) {
					if (item !== value) {
						newArray.push(item);
					}
				});

				$(element).attr(name, newArray.toString());
				return element;
			};

		if (element) {
			if ($(element).attr("_shape") === OG.Constants.SHAPE_TYPE.EDGE) {
				// Edge 인 경우 연결된 Shape 의 연결 속성 정보를 삭제
				fromTerminalId = $(element).attr("_from");
				toTerminalId = $(element).attr("_to");

				if (fromTerminalId) {
					fromShape = getShapeFromTerminal(fromTerminalId);
					removeAttrValue(fromShape, "_toedge", element.id);
					$(element).removeAttr("_from");
				}

				if (toTerminalId) {
					toShape = getShapeFromTerminal(toTerminalId);
					removeAttrValue(toShape, "_fromedge", element.id);
					$(element).removeAttr("_to");
				}

				// disconnectShape event fire
				if (fromShape && toShape) {
					$(_PAPER.canvas).trigger('disconnectShape', [element, fromShape, toShape]);
				}
			} else {
				// 일반 Shape 인 경우 연결된 모든 Edge 와 속성 정보를 삭제
				fromEdgeId = $(element).attr("_fromedge");
				toEdgeId = $(element).attr("_toedge");

				if (fromEdgeId) {
					$.each(fromEdgeId.split(","), function (idx, item) {
						fromEdge = renderer.getElementById(item);

						fromTerminalId = $(fromEdge).attr("_from");
						if (fromTerminalId) {
							fromShape = getShapeFromTerminal(fromTerminalId);
							removeAttrValue(fromShape, "_toedge", item);
						}

						// disconnectShape event fire
						if (fromShape && element) {
							$(_PAPER.canvas).trigger('disconnectShape', [fromEdge, fromShape, element]);
						}

						renderer.remove(fromEdge);
					});
				}

				if (toEdgeId) {
					$.each(toEdgeId.split(","), function (idx, item) {
						toEdge = renderer.getElementById(item);

						toTerminalId = $(toEdge).attr("_to");
						if (toTerminalId) {
							toShape = getShapeFromTerminal(toTerminalId);
							removeAttrValue(toShape, "_fromedge", item);
						}

						// disconnectShape event fire
						if (element && toShape) {
							$(_PAPER.canvas).trigger('disconnectShape', [toEdge, element, toShape]);
						}

						renderer.remove(toEdge);
					});
				}
			}
		}
	};

	/**
	 * ID에 해당하는 Element 의 Edge 연결시 Drop Over 가이드를 드로잉한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @override
	 */
	this.drawDropOverGuide = function (element) {
		var rElement = getREleById(OG.Util.isElement(element) ? element.id : element),
			geometry = rElement ? rElement.node.shape.geom : null,
			envelope, _upperLeft, _bBoxRect,
			_size = OG.Constants.GUIDE_RECT_SIZE / 2,
			_hSize = _size / 2;

		if (rElement && geometry && $(element).attr("_shape") !== OG.Constants.SHAPE_TYPE.EDGE &&
			!getREleById(rElement.id + OG.Constants.DROP_OVER_BBOX_SUFFIX)) {
			envelope = geometry.getBoundary();
			_upperLeft = envelope.getUpperLeft();

			// guide line 랜더링
			_bBoxRect = _PAPER.rect(_upperLeft.x - _hSize, _upperLeft.y - _hSize, envelope.getWidth() + _size, envelope.getHeight() + _size);
			_bBoxRect.attr(OG.Util.apply({'stroke-width': _size}, OG.Constants.DEFAULT_STYLE.DROP_OVER_BBOX));
			add(_bBoxRect, rElement.id + OG.Constants.DROP_OVER_BBOX_SUFFIX);

			// layer 위치 조정
			_bBoxRect.insertAfter(rElement);
		}
	};

	/**
	 * ID에 해당하는 Element 의 Move & Resize 용 가이드를 드로잉한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @return {Object}
	 * @override
	 */
	this.drawGuide = function (element) {
		var rElement = getREleById(OG.Util.isElement(element) ? element.id : element),
			geometry = rElement ? rElement.node.shape.geom : null,
			envelope,
			group, guide,
			_bBoxRect,
			_upperLeft, _upperRight, _lowerLeft, _lowerRight, _leftCenter, _upperCenter, _rightCenter, _lowerCenter,
			_ulRect, _urRect, _llRect, _lrRect, _lcRect, _ucRect, _rcRect, _lwcRect,
			_size = OG.Constants.GUIDE_RECT_SIZE, _hSize = OG.Util.round(_size / 2);

		if (rElement && geometry) {
			// Edge 인 경우 따로 처리
			if ($(element).attr("_shape") === OG.Constants.SHAPE_TYPE.EDGE) {
				return this.drawEdgeGuide(element);
			} else {
				envelope = geometry.getBoundary();
				_upperLeft = envelope.getUpperLeft();
				_upperRight = envelope.getUpperRight();
				_lowerLeft = envelope.getLowerLeft();
				_lowerRight = envelope.getLowerRight();
				_leftCenter = envelope.getLeftCenter();
				_upperCenter = envelope.getUpperCenter();
				_rightCenter = envelope.getRightCenter();
				_lowerCenter = envelope.getLowerCenter();

				if (getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.GUIDE)) {
					// 가이드가 이미 존재하는 경우에는 bBox 만 삭제후 새로 draw
					// bBox remove -> redraw
					remove(getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.BBOX));
					_bBoxRect = _PAPER.rect(_upperLeft.x, _upperLeft.y, envelope.getWidth(), envelope.getHeight());
					_bBoxRect.attr(OG.Constants.DEFAULT_STYLE.GUIDE_BBOX);
					add(_bBoxRect, rElement.id + OG.Constants.GUIDE_SUFFIX.BBOX);
					_bBoxRect.insertBefore(rElement);

					_ulRect = getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.UL);
					_urRect = getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.UR);
					_llRect = getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.LL);
					_lrRect = getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.LR);
					_lcRect = getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.LC);
					_ucRect = getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.UC);
					_rcRect = getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.RC);
					_lwcRect = getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.LWC);

					_ulRect.attr({x: _upperLeft.x - _hSize, y: _upperLeft.y - _hSize});
					_urRect.attr({x: _upperRight.x - _hSize, y: _upperRight.y - _hSize});
					_llRect.attr({x: _lowerLeft.x - _hSize, y: _lowerLeft.y - _hSize});
					_lrRect.attr({x: _lowerRight.x - _hSize, y: _lowerRight.y - _hSize});
					_lcRect.attr({x: _leftCenter.x - _hSize, y: _leftCenter.y - _hSize});
					_ucRect.attr({x: _upperCenter.x - _hSize, y: _upperCenter.y - _hSize});
					_rcRect.attr({x: _rightCenter.x - _hSize, y: _rightCenter.y - _hSize});
					_lwcRect.attr({x: _lowerCenter.x - _hSize, y: _lowerCenter.y - _hSize});

					return null;
				}

				// group
				group = getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.GUIDE);
				if (group) {
					remove(group);
					remove(getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.BBOX));
				}
				group = _PAPER.group();

				// guide line 랜더링
				_bBoxRect = _PAPER.rect(_upperLeft.x, _upperLeft.y, envelope.getWidth(), envelope.getHeight());
				_ulRect = _PAPER.rect(_upperLeft.x - _hSize, _upperLeft.y - _hSize, _size, _size);
				_urRect = _PAPER.rect(_upperRight.x - _hSize, _upperRight.y - _hSize, _size, _size);
				_llRect = _PAPER.rect(_lowerLeft.x - _hSize, _lowerLeft.y - _hSize, _size, _size);
				_lrRect = _PAPER.rect(_lowerRight.x - _hSize, _lowerRight.y - _hSize, _size, _size);
				_lcRect = _PAPER.rect(_leftCenter.x - _hSize, _leftCenter.y - _hSize, _size, _size);
				_ucRect = _PAPER.rect(_upperCenter.x - _hSize, _upperCenter.y - _hSize, _size, _size);
				_rcRect = _PAPER.rect(_rightCenter.x - _hSize, _rightCenter.y - _hSize, _size, _size);
				_lwcRect = _PAPER.rect(_lowerCenter.x - _hSize, _lowerCenter.y - _hSize, _size, _size);

				_bBoxRect.attr(OG.Constants.DEFAULT_STYLE.GUIDE_BBOX);
				_ulRect.attr(OG.Constants.DEFAULT_STYLE.GUIDE_UL);
				_urRect.attr(OG.Constants.DEFAULT_STYLE.GUIDE_UR);
				_llRect.attr(OG.Constants.DEFAULT_STYLE.GUIDE_LL);
				_lrRect.attr(OG.Constants.DEFAULT_STYLE.GUIDE_LR);
				_lcRect.attr(OG.Constants.DEFAULT_STYLE.GUIDE_LC);
				_ucRect.attr(OG.Constants.DEFAULT_STYLE.GUIDE_UC);
				_rcRect.attr(OG.Constants.DEFAULT_STYLE.GUIDE_RC);
				_lwcRect.attr(OG.Constants.DEFAULT_STYLE.GUIDE_LWC);

				// add to Group
				group.appendChild(_ulRect);
				group.appendChild(_urRect);
				group.appendChild(_llRect);
				group.appendChild(_lrRect);
				group.appendChild(_lcRect);
				group.appendChild(_ucRect);
				group.appendChild(_rcRect);
				group.appendChild(_lwcRect);

				add(group, rElement.id + OG.Constants.GUIDE_SUFFIX.GUIDE);
				add(_bBoxRect, rElement.id + OG.Constants.GUIDE_SUFFIX.BBOX);
				add(_ulRect, rElement.id + OG.Constants.GUIDE_SUFFIX.UL);
				add(_urRect, rElement.id + OG.Constants.GUIDE_SUFFIX.UR);
				add(_llRect, rElement.id + OG.Constants.GUIDE_SUFFIX.LL);
				add(_lrRect, rElement.id + OG.Constants.GUIDE_SUFFIX.LR);
				add(_lcRect, rElement.id + OG.Constants.GUIDE_SUFFIX.LC);
				add(_ucRect, rElement.id + OG.Constants.GUIDE_SUFFIX.UC);
				add(_rcRect, rElement.id + OG.Constants.GUIDE_SUFFIX.RC);
				add(_lwcRect, rElement.id + OG.Constants.GUIDE_SUFFIX.LWC);

				// guide 정의
				guide = {
					bBox : _bBoxRect.node,
					group: group.node,
					ul   : _ulRect.node,
					ur   : _urRect.node,
					ll   : _llRect.node,
					lr   : _lrRect.node,
					lc   : _lcRect.node,
					uc   : _ucRect.node,
					rc   : _rcRect.node,
					lwc  : _lwcRect.node
				};

				// layer 위치 조정
				_bBoxRect.insertBefore(rElement);
				group.insertAfter(rElement);

				// selected 속성값 설정
				$(rElement.node).attr("_selected", "true");

				return guide;
			}
		}

		return null;
	};

	/**
	 * ID에 해당하는 Element 의 Move & Resize 용 가이드를 제거한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @override
	 */
	this.removeGuide = function (element) {
		var rElement = getREleById(OG.Util.isElement(element) ? element.id : element),
			guide = getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.GUIDE),
			bBox = getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.BBOX);

		rElement.node.removeAttribute("_selected");
		remove(guide);
		remove(bBox);
	};

	/**
	 * 모든 Move & Resize 용 가이드를 제거한다.
	 *
	 * @override
	 */
	this.removeAllGuide = function () {
		$(this.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (index, item) {
			if (OG.Util.isElement(item) && item.id) {
				_RENDERER.removeGuide(item);
			}
		});
	};

	/**
	 * ID에 해당하는 Edge Element 의 Move & Resize 용 가이드를 드로잉한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @return {Object}
	 * @override
	 */
	this.drawEdgeGuide = function (element) {
		var rElement = getREleById(OG.Util.isElement(element) ? element.id : element),
			geometry = rElement ? rElement.node.shape.geom : null,
			vertices, isSelf,
			group, guide, pathStr,
			_bBoxLine, _fromRect, _toRect, _controlRect, controlNode = [],
			_size = OG.Constants.GUIDE_RECT_SIZE, _hSize = OG.Util.round(_size / 2),
			i;

		if (rElement && geometry) {
			vertices = geometry.getVertices();

			isSelf = $(element).attr("_from") && $(element).attr("_to") && $(element).attr("_from") === $(element).attr("_to");

			if (getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.GUIDE)) {
				// 가이드가 이미 존재하는 경우에는 bBoxLine 만 삭제후 새로 draw 하고 나머지 guide 는 Update 한다.
				// bBoxLine remove -> redraw
				remove(getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.BBOX));
				pathStr = "";
				for (i = 0; i < vertices.length; i++) {
					if (i === 0) {
						pathStr = "M" + vertices[i].x + " " + vertices[i].y;
					} else {
						pathStr += "L" + vertices[i].x + " " + vertices[i].y;
					}
				}
				_bBoxLine = _PAPER.path(pathStr);
				_bBoxLine.attr(OG.Constants.DEFAULT_STYLE.GUIDE_BBOX);
				add(_bBoxLine, rElement.id + OG.Constants.GUIDE_SUFFIX.BBOX);
				_bBoxLine.insertBefore(rElement);

				// 시작지점 가이드 Update
				_fromRect = getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.FROM);
				_fromRect.attr({x: vertices[0].x - _hSize, y: vertices[0].y - _hSize});

				// 종료지점 가이드 Update
				_toRect = getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.TO);
				_toRect.attr({x: vertices[vertices.length - 1].x - _hSize, y: vertices[vertices.length - 1].y - _hSize});

				// 콘트롤 가이드 Update
				if (!isSelf) {
					for (i = 1; i < vertices.length - 2; i++) {
						if (vertices[i].x === vertices[i + 1].x) {
							_controlRect = getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.CTL_H + i);
							if (_controlRect) {
								_controlRect.attr({
									x: vertices[i].x - _hSize,
									y: OG.Util.round((vertices[i].y + vertices[i + 1].y) / 2) - _hSize
								});
							}
						} else {
							_controlRect = getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.CTL_V + i);
							if (_controlRect) {
								_controlRect.attr({
									x: OG.Util.round((vertices[i].x + vertices[i + 1].x) / 2) - _hSize,
									y: vertices[i].y - _hSize
								});
							}
						}
					}
				}

				return null;
			}

			// group
			group = getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.GUIDE);
			if (group) {
				remove(group);
				remove(getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.BBOX));
			}
			group = _PAPER.group();

			// 쉐도우 가이드
			pathStr = "";
			for (i = 0; i < vertices.length; i++) {
				if (i === 0) {
					pathStr = "M" + vertices[i].x + " " + vertices[i].y;
				} else {
					pathStr += "L" + vertices[i].x + " " + vertices[i].y;
				}
			}
			_bBoxLine = _PAPER.path(pathStr);
			_bBoxLine.attr(OG.Constants.DEFAULT_STYLE.GUIDE_BBOX);

			// 시작지점 가이드
			_fromRect = _PAPER.rect(vertices[0].x - _hSize, vertices[0].y - _hSize, _size, _size);
			_fromRect.attr(OG.Constants.DEFAULT_STYLE.GUIDE_FROM);
			group.appendChild(_fromRect);
			add(_fromRect, rElement.id + OG.Constants.GUIDE_SUFFIX.FROM);

			// 종료지점 가이드
			_toRect = _PAPER.rect(vertices[vertices.length - 1].x - _hSize, vertices[vertices.length - 1].y - _hSize, _size, _size);
			_toRect.attr(OG.Constants.DEFAULT_STYLE.GUIDE_TO);
			group.appendChild(_toRect);
			add(_toRect, rElement.id + OG.Constants.GUIDE_SUFFIX.TO);

			// 콘트롤 가이드
			if (!isSelf) {
				for (i = 1; i < vertices.length - 2; i++) {
					if (vertices[i].x === vertices[i + 1].x) {
						_controlRect = _PAPER.rect(vertices[i].x - _hSize,
							OG.Util.round((vertices[i].y + vertices[i + 1].y) / 2) - _hSize, _size, _size);
						_controlRect.attr(OG.Constants.DEFAULT_STYLE.GUIDE_CTL_H);
						add(_controlRect, rElement.id + OG.Constants.GUIDE_SUFFIX.CTL_H + i);
					} else {
						_controlRect = _PAPER.rect(OG.Util.round((vertices[i].x + vertices[i + 1].x) / 2) - _hSize,
							vertices[i].y - _hSize, _size, _size);
						_controlRect.attr(OG.Constants.DEFAULT_STYLE.GUIDE_CTL_V);
						add(_controlRect, rElement.id + OG.Constants.GUIDE_SUFFIX.CTL_V + i);
					}
					group.appendChild(_controlRect);
					controlNode.push(_controlRect.node);
				}
			}
			add(_bBoxLine, rElement.id + OG.Constants.GUIDE_SUFFIX.BBOX);
			add(group, rElement.id + OG.Constants.GUIDE_SUFFIX.GUIDE);

			// guide 정의
			guide = {
				bBox    : _bBoxLine.node,
				group   : group.node,
				from    : _fromRect.node,
				to      : _toRect.node,
				controls: controlNode
			};

			// layer 위치 조정
			_bBoxLine.insertBefore(rElement);
			group.insertAfter(rElement);

			// selected 속성값 설정
			$(rElement.node).attr("_selected", "true");

			return guide;
		}

		return null;
	};

	/**
	 * Rectangle 모양의 마우스 드래그 선택 박스 영역을 드로잉한다.
	 *
	 * @param {Number[]} position 드로잉할 위치 좌표(좌상단)
	 * @param {Number[]} size Text Width, Height, Angle
	 * @param {OG.geometry.Style,Object} style 스타일
	 * @return {Element} DOM Element
	 * @override
	 */
	this.drawRubberBand = function (position, size, style) {
		var x = position ? position[0] : 0,
			y = position ? position[1] : 0,
			width = size ? size[0] : 0,
			height = size ? size[1] : 0,
			rect = getREleById(OG.Constants.RUBBER_BAND_ID),
			_style = {};
		if (rect) {
			rect.attr({
				x     : x,
				y     : y,
				width : Math.abs(width),
				height: Math.abs(height)
			});
			return rect;
		}
		OG.Util.apply(_style, (style instanceof OG.geometry.Style) ? style.map : style || {}, OG.Constants.DEFAULT_STYLE.RUBBER_BAND);
		rect = _PAPER.rect(x, y, width, height).attr(_style);
		add(rect, OG.Constants.RUBBER_BAND_ID);
		_ETC_GROUP.node.appendChild(rect.node);

		return rect.node;
	};

	/**
	 * Rectangle 모양의 마우스 드래그 선택 박스 영역을 제거한다.
	 *
	 * @param {Element} root first, rubberBand 정보를 저장한 엘리먼트
	 * @override
	 */
	this.removeRubberBand = function (root) {
		this.setAttr(OG.Constants.RUBBER_BAND_ID, {x: 0, y: 0, width: 0, height: 0});
		$(root).removeData("dragBox_first");
		$(root).removeData("rubberBand");
	};

	/**
	 * Edge 연결용 터미널을 드로잉한다.
	 *
	 * @param {Element} element DOM Element
	 * @param {String} terminalType 터미널 연결 유형(IN or OUT or INOUT)
	 * @return {Element} terminal group element
	 * @override
	 */
	this.drawTerminal = function (element, terminalType) {
		var rElement = getREleById(OG.Util.isElement(element) ? element.id : element),
			terminals = rElement ? rElement.node.shape.createTerminal() : null,
			envelope = rElement ? rElement.node.shape.geom.getBoundary() : null,
			group, cross, rect, x, y, size = OG.Constants.TERMINAL_SIZE, rect_gap = size * 2;

		if (rElement && terminals && terminals.length > 0) {
			group = getREleById(rElement.id + OG.Constants.TERMINAL_SUFFIX.GROUP);
			rect = getREleById(rElement.id + OG.Constants.TERMINAL_SUFFIX.BOX);
			if (group || rect) {
				return {
					bBox    : rect.node,
					terminal: group.node
				};
			}

			// group
			group = _PAPER.group();

			// hidden box
			rect = _PAPER.rect(envelope.getUpperLeft().x - rect_gap, envelope.getUpperLeft().y - rect_gap,
				envelope.getWidth() + rect_gap * 2, envelope.getHeight() + rect_gap * 2);
			rect.attr(OG.Constants.DEFAULT_STYLE.TERMINAL_BBOX);
			add(rect, rElement.id + OG.Constants.TERMINAL_SUFFIX.BOX);

			// terminal
			$.each(terminals, function (idx, item) {
				if (!terminalType || item.inout.indexOf(terminalType) >= 0) {
					x = item.position.x;
					y = item.position.y;

					cross = _PAPER.circle(x, y, size);
					cross.attr(OG.Constants.DEFAULT_STYLE.TERMINAL);
					cross.node.terminal = item;

					group.appendChild(cross);
					add(cross, rElement.id + OG.Constants.TERMINAL_SUFFIX.GROUP + "_" + item.direction + "_" + item.inout + "_" + idx);
				}
			});

			add(group, rElement.id + OG.Constants.TERMINAL_SUFFIX.GROUP);

			// layer 위치 조정
			rect.insertBefore(rElement);
			group.insertAfter(rElement);

			return {
				bBox    : rect.node,
				terminal: group.node
			};
		}

		return null;
	};

	/**
	 *  Edge 연결용 터미널을 remove 한다.
	 *
	 * @param {Element} element DOM Element
	 * @override
	 */
	this.removeTerminal = function (element) {
		var rElement = getREleById(OG.Util.isElement(element) ? element.id : element),
			group, rect;

		if (rElement) {
			// group
			group = getREleById(rElement.id + OG.Constants.TERMINAL_SUFFIX.GROUP);
			if (group) {
				remove(group);
			}
			rect = getREleById(rElement.id + OG.Constants.TERMINAL_SUFFIX.BOX);
			if (rect) {
				remove(rect);
			}
		}
	};

	/**
	 *  모든 Edge 연결용 터미널을 remove 한다.
	 *
	 * @override
	 */
	this.removeAllTerminal = function () {
		var renderer = this;
		$.each(_ELE_MAP.keys(), function (idx, item) {
			renderer.removeTerminal(item);
		});
	};

	/**
	 * ID에 해당하는 Element 의 Collapse 가이드를 드로잉한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @return {Element}
	 * @override
	 */
	this.drawCollapseGuide = function (element) {
		var rElement = getREleById(OG.Util.isElement(element) ? element.id : element),
			geometry = rElement ? rElement.node.shape.geom : null,
			envelope, _upperLeft, _bBoxRect, _rect,
			_size = OG.Constants.COLLAPSE_SIZE,
			_hSize = _size / 2;

		if (rElement && geometry && $(element).attr("_shape") === OG.Constants.SHAPE_TYPE.GROUP) {
			_bBoxRect = getREleById(rElement.id + OG.Constants.COLLAPSE_BBOX_SUFFIX);
			if (_bBoxRect) {
				remove(_bBoxRect);
			}
			_rect = getREleById(rElement.id + OG.Constants.COLLAPSE_SUFFIX);
			if (_rect) {
				remove(_rect);
			}

			envelope = geometry.getBoundary();
			_upperLeft = envelope.getUpperLeft();

			// hidden box
			_bBoxRect = _PAPER.rect(envelope.getUpperLeft().x - _size, envelope.getUpperLeft().y - _size,
				envelope.getWidth() + _size * 2, envelope.getHeight() + _size * 2);
			_bBoxRect.attr(OG.Constants.DEFAULT_STYLE.COLLAPSE_BBOX);
			add(_bBoxRect, rElement.id + OG.Constants.COLLAPSE_BBOX_SUFFIX);

			if (rElement.node.shape.isCollapsed === true) {
				// expand 랜더링
				_rect = _PAPER.path(
					"M" + (_upperLeft.x + _hSize) + " " + (_upperLeft.y + _hSize) +
						"h" + _size + "v" + _size + "h" + (-1 * _size) + "v" + (-1 * _size) +
						"m1 " + _hSize + "h" + (_size - 2) + "M" +
						(_upperLeft.x + _hSize) + " " + (_upperLeft.y + _hSize) +
						"m" + _hSize + " 1v" + (_size - 2)
				);
			} else {
				// collapse 랜더링
				_rect = _PAPER.path("M" + (_upperLeft.x + _hSize) + " " +
					(_upperLeft.y + _hSize) + "h" + _size + "v" + _size + "h" + (-1 * _size) + "v" + (-1 * _size) +
					"m1 " + _hSize + "h" + (_size - 2));
			}

			_rect.attr(OG.Constants.DEFAULT_STYLE.COLLAPSE);
			add(_rect, rElement.id + OG.Constants.COLLAPSE_SUFFIX);

			// layer 위치 조정
			_bBoxRect.insertBefore(rElement);
			_rect.insertAfter(rElement);

			return {
				bBox    : _bBoxRect.node,
				collapse: _rect.node
			};
		}

		return null;
	};

	/**
	 * ID에 해당하는 Element 의 Collapse 가이드를 제거한다.
	 *
	 * @param {Element} element
	 * @override
	 */
	this.removeCollapseGuide = function (element) {
		var rElement = getREleById(OG.Util.isElement(element) ? element.id : element),
			_bBoxRect, _rect;

		if (rElement) {
			_bBoxRect = getREleById(rElement.id + OG.Constants.COLLAPSE_BBOX_SUFFIX);
			if (_bBoxRect) {
				remove(_bBoxRect);
			}
			_rect = getREleById(rElement.id + OG.Constants.COLLAPSE_SUFFIX);
			if (_rect) {
				remove(_rect);
			}
		}
	};

	/**
	 * 주어진 Shape 들을 그룹핑한다.
	 *
	 * @param {Element[]} elements
	 * @return {Element} Group Shape Element
	 * @override
	 */
	this.group = function (elements) {
		var groupShapeEle, geometryArray = [], geometryCollection, envelope, position, shape, size, i;

		if (elements && elements.length > 1) {
			// 그룹핑할 Shape 의 전체 영역 계산
			for (i = 0; i < elements.length; i++) {
				geometryArray.push(elements[i].shape.geom);
			}
			geometryCollection = new OG.GeometryCollection(geometryArray);
			envelope = geometryCollection.getBoundary();

			// 위치 및 사이즈 설정
			position = [envelope.getCentroid().x, envelope.getCentroid().y];
			shape = new OG.GroupShape();
			size = [envelope.getWidth(), envelope.getHeight()];

			// draw group
			groupShapeEle = this.drawShape(position, shape, size);

			// append child
			for (i = 0; i < elements.length; i++) {
				groupShapeEle.appendChild(elements[i]);
			}

			// group event fire
			$(_PAPER.canvas).trigger('group', [groupShapeEle]);
		}

		return groupShapeEle;
	};

	/**
	 * 주어진 그룹들을 그룹해제한다.
	 *
	 * @param {Element[]} groupElements
	 * @return {Element[]} ungrouped Elements
	 * @override
	 */
	this.ungroup = function (groupElements) {
		var ungroupElements = [], children, i, j;
		if (groupElements && groupElements.length > 0) {
			for (i = 0; i < groupElements.length; i++) {
				children = $(groupElements[i]).children("[_type='" + OG.Constants.NODE_TYPE.SHAPE + "']");
				for (j = 0; j < children.length; j++) {
					groupElements[i].parentNode.appendChild(children[j]);
					ungroupElements.push(children[j]);
				}
				this.removeShape(groupElements[i]);
			}

			// ungroup event fire
			$(_PAPER.canvas).trigger('ungroup', [ungroupElements]);
		}

		return ungroupElements;
	};

	/**
	 * 주어진 Shape 들을 그룹에 추가한다.
	 *
	 * @param {Element} groupElement
	 * @param {Element[]} elements
	 * @override
	 */
	this.addToGroup = function (groupElement, elements) {
		var i;
		for (i = 0; i < elements.length; i++) {
			groupElement.appendChild(elements[i]);
		}
	};

	/**
	 * 주어진 Shape 이 그룹인 경우 collapse 한다.
	 *
	 * @param {Element} element
	 * @override
	 */
	this.collapse = function (element) {
		var renderer = this, childNodes, i, hideChildEdge;

		hideChildEdge = function (_collapseRootElement, _element) {
			var edgeIdArray, fromEdge, toEdge, _childNodes = _element.childNodes, otherShape, i, j, isNeedToRedraw;
			for (i = _childNodes.length - 1; i >= 0; i--) {
				if ($(_childNodes[i]).attr("_type") === OG.Constants.NODE_TYPE.SHAPE) {
					hideChildEdge(_collapseRootElement, _childNodes[i]);

					isNeedToRedraw = false;
					edgeIdArray = $(_childNodes[i]).attr("_fromedge");
					if (edgeIdArray) {
						edgeIdArray = edgeIdArray.split(",");
						for (j = 0; j < edgeIdArray.length; j++) {
							fromEdge = renderer.getElementById(edgeIdArray[j]);
							if (fromEdge) {
								otherShape = getShapeFromTerminal($(fromEdge).attr("_from"));

								// otherShape 이 같은 collapse 범위내에 있는지 체크
								if ($(otherShape).parents("#" + _collapseRootElement.id).length !== 0) {
									renderer.hide(fromEdge);
								} else {
									isNeedToRedraw = true;
								}
							}
						}
					}

					edgeIdArray = $(_childNodes[i]).attr("_toedge");
					if (edgeIdArray) {
						edgeIdArray = edgeIdArray.split(",");
						for (j = 0; j < edgeIdArray.length; j++) {
							toEdge = renderer.getElementById(edgeIdArray[j]);
							if (toEdge) {
								otherShape = getShapeFromTerminal($(toEdge).attr("_to"));

								// otherShape 이 같은 collapse 범위내에 있는지 체크
								if ($(otherShape).parents("#" + _collapseRootElement.id).length !== 0) {
									renderer.hide(toEdge);
								} else {
									isNeedToRedraw = true;
								}
							}
						}
					}

					// group 영역 밖의 연결된 otherShape 이 있는 경우 redrawConnectedEdge
					if (isNeedToRedraw === true) {
						renderer.redrawConnectedEdge(_childNodes[i]);
					}
				}
			}
		};

		if (element.shape) {
			childNodes = element.childNodes;
			for (i = childNodes.length - 1; i >= 0; i--) {
				if ($(childNodes[i]).attr("_type") === OG.Constants.NODE_TYPE.SHAPE) {
					this.hide(childNodes[i]);
				}
			}
			element.shape.isCollapsed = true;
			$(element).attr("_collapsed", true);

			hideChildEdge(element, element);
			this.redrawShape(element);

			// collapsed event fire
			$(_PAPER.canvas).trigger('collapsed', [element]);
		}
	};

	/**
	 * 주어진 Shape 이 그룹인 경우 expand 한다.
	 *
	 * @param {Element} element
	 * @override
	 */
	this.expand = function (element) {
		var renderer = this, childNodes, i, showChildEdge;

		showChildEdge = function (_collapseRootElement, _element) {
			var edgeIdArray, fromEdge, toEdge, _childNodes = _element.childNodes, otherShape, i, j, isNeedToRedraw;
			for (i = _childNodes.length - 1; i >= 0; i--) {
				if ($(_childNodes[i]).attr("_type") === OG.Constants.NODE_TYPE.SHAPE) {
					showChildEdge(_collapseRootElement, _childNodes[i]);

					isNeedToRedraw = false;
					edgeIdArray = $(_childNodes[i]).attr("_fromedge");
					if (edgeIdArray) {
						edgeIdArray = edgeIdArray.split(",");
						for (j = 0; j < edgeIdArray.length; j++) {
							fromEdge = renderer.getElementById(edgeIdArray[j]);
							if (fromEdge) {
								otherShape = getShapeFromTerminal($(fromEdge).attr("_from"));

								// otherShape 이 같은 collapse 범위내에 있는지 체크
								if ($(otherShape).parents("#" + _collapseRootElement.id).length !== 0) {
									renderer.show(fromEdge);
								} else {
									isNeedToRedraw = true;
								}
							}
						}
					}

					edgeIdArray = $(_childNodes[i]).attr("_toedge");
					if (edgeIdArray) {
						edgeIdArray = edgeIdArray.split(",");
						for (j = 0; j < edgeIdArray.length; j++) {
							toEdge = renderer.getElementById(edgeIdArray[j]);
							if (toEdge) {
								otherShape = getShapeFromTerminal($(toEdge).attr("_to"));

								// otherShape 이 같은 collapse 범위내에 있는지 체크
								if ($(otherShape).parents("#" + _collapseRootElement.id).length !== 0) {
									renderer.show(toEdge);
								} else {
									isNeedToRedraw = true;
								}
							}
						}
					}

					// group 영역 밖의 연결된 otherShape 이 있는 경우 redrawConnectedEdge
					if (isNeedToRedraw === true) {
						renderer.redrawConnectedEdge(_childNodes[i]);
					}
				}
			}
		};

		if (element.shape) {
			childNodes = element.childNodes;
			for (i = childNodes.length - 1; i >= 0; i--) {
				if ($(childNodes[i]).attr("_type") === OG.Constants.NODE_TYPE.SHAPE) {
					this.show(childNodes[i]);
				}
			}
			element.shape.isCollapsed = false;
			$(element).attr("_collapsed", false);

			showChildEdge(element, element);
			this.redrawShape(element);

			// expanded event fire
			$(_PAPER.canvas).trigger('expanded', [element]);
		}
	};

	/**
	 * 드로잉된 모든 오브젝트를 클리어한다.
	 *
	 * @override
	 */
	this.clear = function () {
		_PAPER.clear();
		_ELE_MAP.clear();
		_ID_PREFIX = Math.round(Math.random() * 10000);
		_LAST_ID = 0;
		_ROOT_GROUP = add(_PAPER.group(), null, OG.Constants.NODE_TYPE.ROOT);
		_ETC_GROUP = add(_PAPER.group(), null, OG.Constants.NODE_TYPE.ETC);
	};

	/**
	 * Shape 을 캔버스에서 관련된 모두를 삭제한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @override
	 */
	this.removeShape = function (element) {
		var rElement = getREleById(OG.Util.isElement(element) ? element.id : element),
			childNodes, beforeEvent, i;
		childNodes = rElement.node.childNodes;

		beforeEvent = jQuery.Event("beforeRemoveShape", {element: rElement.node});
		$(_PAPER.canvas).trigger(beforeEvent);
		if (beforeEvent.isPropagationStopped()) {
			return false;
		}

		for (i = childNodes.length - 1; i >= 0; i--) {
			if ($(childNodes[i]).attr("_type") === OG.Constants.NODE_TYPE.SHAPE) {
				this.removeShape(childNodes[i]);
			}
		}

		this.disconnect(rElement.node);
		this.removeTerminal(rElement.node);
		this.removeGuide(rElement.node);
		this.removeCollapseGuide(rElement.node);
		this.remove(rElement.node);

		// removeShape event fire
		$(_PAPER.canvas).trigger('removeShape', [rElement.node]);
	};

	/**
	 * ID에 해당하는 Element 를 캔버스에서 제거한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @override
	 */
	this.remove = function (element) {
		var id = OG.Util.isElement(element) ? element.id : element,
			rElement = getREleById(id);
		remove(rElement);
	};

	/**
	 * 하위 엘리먼트만 제거한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @override
	 */
	this.removeChild = function (element) {
		var id = OG.Util.isElement(element) ? element.id : element,
			rElement = getREleById(id);
		removeChild(rElement);
	};

	/**
	 * 랜더러 캔버스 Root Element 를 반환한다.
	 *
	 * @return {Element} Element
	 * @override
	 */
	this.getRootElement = function () {
		return _PAPER.canvas;
	};

	/**
	 * 랜더러 캔버스 Root Group Element 를 반환한다.
	 *
	 * @return {Element} Element
	 * @override
	 */
	this.getRootGroup = function () {
		return _ROOT_GROUP.node;
	};

	/**
	 * 주어진 지점을 포함하는 Top Element 를 반환한다.
	 *
	 * @param {Number[]} position 위치 좌표
	 * @return {Element} Element
	 * @override
	 */
	this.getElementByPoint = function (position) {
		var element = _PAPER.getElementByPoint(position[0], position[1]);
		return element ? element.node.parentNode : null;
	};

	/**
	 * 주어진 Boundary Box 영역에 포함되는 Shape(GEOM, TEXT, IMAGE) Element 를 반환한다.
	 *
	 * @param {OG.geometry.Envelope} envelope Boundary Box 영역
	 * @return {Element[]} Element
	 * @override
	 */
	this.getElementsByBBox = function (envelope) {
		var elements = [];
		$(this.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "]").each(function (index, element) {
			if (element.shape.geom && envelope.isContainsAll(element.shape.geom.getVertices())) {
				elements.push(element);
			}
		});

		return elements;
	};

	/**
	 * 엘리먼트에 속성값을 설정한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @param {Object} attribute 속성값
	 * @override
	 */
	this.setAttr = function (element, attribute) {
		var rElement = getREleById(OG.Util.isElement(element) ? element.id : element);
		if (rElement) {
			rElement.attr(attribute);
		}
	};

	/**
	 * 엘리먼트 속성값을 반환한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @param {String} attrName 속성이름
	 * @return {Object} attribute 속성값
	 * @override
	 */
	this.getAttr = function (element, attrName) {
		var rElement = getREleById(OG.Util.isElement(element) ? element.id : element);
		if (rElement) {
			return rElement.attr(attrName);
		}
		return null;
	};

	/**
	 * Shape 의 스타일을 변경한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @param {Object} style 스타일
	 * @override
	 */
	this.setShapeStyle = function (element, style) {
		var rElement = getREleById(OG.Util.isElement(element) ? element.id : element);
		if (rElement && element.shape && element.shape.geom) {
			OG.Util.apply(element.shape.geom.style.map, style || {});
			element.shapeStyle = element.shapeStyle || {};
			OG.Util.apply(element.shapeStyle, style || {});
			this.redrawShape(element);
		}
	};

	/**
	 * ID에 해당하는 Element 를 최상단 레이어로 이동한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @override
	 */
	this.toFront = function (element) {
		var rElement = getREleById(OG.Util.isElement(element) ? element.id : element);
		if (rElement) {
			rElement.toFront();
		}
	};

	/**
	 * ID에 해당하는 Element 를 최하단 레이어로 이동한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @override
	 */
	this.toBack = function (element) {
		var rElement = getREleById(OG.Util.isElement(element) ? element.id : element);
		if (rElement) {
			rElement.toBack();
		}
	};

	/**
	 * 랜더러 캔버스의 사이즈(Width, Height)를 반환한다.
	 *
	 * @return {Number[]} Canvas Width, Height
	 * @override
	 */
	this.getCanvasSize = function () {
		return [_PAPER.width, _PAPER.height];
	};

	/**
	 * 랜더러 캔버스의 사이즈(Width, Height)를 변경한다.
	 *
	 * @param {Number[]} size Canvas Width, Height
	 * @override
	 */
	this.setCanvasSize = function (size) {
		_PAPER.setSize(size[0], size[1]);
	};

	/**
	 * 랜더러 캔버스의 사이즈(Width, Height)를 실제 존재하는 Shape 의 영역에 맞게 변경한다.
	 *
	 * @param {Number[]} minSize Canvas 최소 Width, Height
	 * @param {Boolean} fitScale 주어진 minSize 에 맞게 fit 여부(Default:false)
	 * @override
	 */
	this.fitCanvasSize = function (minSize, fitScale) {
		var realRootBBox = this.getRealRootBBox(), offsetX, offsetY, scale = 1,
			width = realRootBBox.width + OG.Constants.FIT_CANVAS_PADDING * 2,
			height = realRootBBox.height + OG.Constants.FIT_CANVAS_PADDING * 2;
		if (realRootBBox.width !== 0 && realRootBBox.height !== 0) {
			offsetX = realRootBBox.x > OG.Constants.FIT_CANVAS_PADDING ?
				-1 * (realRootBBox.x - OG.Constants.FIT_CANVAS_PADDING) : OG.Constants.FIT_CANVAS_PADDING - realRootBBox.x;
			offsetY = realRootBBox.y > OG.Constants.FIT_CANVAS_PADDING ?
				-1 * (realRootBBox.y - OG.Constants.FIT_CANVAS_PADDING) : OG.Constants.FIT_CANVAS_PADDING - realRootBBox.y;

			this.move(this.getRootGroup(), [offsetX, offsetY]);
			this.removeAllGuide();

			if (minSize && minSize.length === 2) {
				if (OG.Util.isDefined(fitScale) && fitScale === true) {
					scale = minSize[0] / width > minSize[1] / height ? minSize[1] / height : minSize[0] / width;
				}

				width = width < minSize[0] ? minSize[0] : width;
				height = height < minSize[1] ? minSize[1] : height;
			}
			this.setScale(OG.Util.roundPrecision(scale, 1));
			this.setCanvasSize([width, height]);
		}
	};

	/**
	 * 새로운 View Box 영역을 설정한다. (ZoomIn & ZoomOut 가능)
	 *
	 * @param @param {Number[]} position 위치 좌표(좌상단 기준)
	 * @param {Number[]} size Canvas Width, Height
	 * @param {Boolean} isFit Fit 여부
	 * @override
	 */
	this.setViewBox = function (position, size, isFit) {
		_PAPER.setViewBox(position[0], position[1], size[0], size[1], isFit);
	};

	/**
	 * Scale 을 반환한다. (리얼 사이즈 : Scale = 1)
	 *
	 * @param {Number} scale 스케일값
	 * @override
	 */
	this.getScale = function (scale) {
		return OG.Constants.SCALE;
	};

	/**
	 * Scale 을 설정한다. (리얼 사이즈 : Scale = 1)
	 *
	 * @param {Number} scale 스케일값
	 * @override
	 */
	this.setScale = function (scale) {
		if (OG.Constants.SCALE_MIN <= scale && scale <= OG.Constants.SCALE_MAX) {
			if (this.isVML()) {
				// TODO : VML 인 경우 처리
				$(_ROOT_GROUP.node).css({
					'width' : 21600 / scale,
					'height': 21600 / scale
				});

				$(_ROOT_GROUP.node).find('[_type=SHAPE]').each(function (idx, item) {
					$(item).css({
						'width' : 21600,
						'height': 21600
					});
				});
			} else {
				$(_ROOT_GROUP.node).attr('transform', 'scale(' + scale + ')');
				$(_ETC_GROUP.node).attr('transform', 'scale(' + scale + ')');
			}

			_PAPER.setSize(
				OG.Util.roundGrid(_PAPER.width / OG.Constants.SCALE * scale),
				OG.Util.roundGrid(_PAPER.height / OG.Constants.SCALE * scale)
			);

			OG.Constants.SCALE = scale;
		}
	};

	/**
	 * ID에 해당하는 Element 를 캔버스에서 show 한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @override
	 */
	this.show = function (element) {
		var rElement = getREleById(OG.Util.isElement(element) ? element.id : element);
		if (rElement) {
			rElement.show();
		}
	};

	/**
	 * ID에 해당하는 Element 를 캔버스에서 hide 한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @override
	 */
	this.hide = function (element) {
		var rElement = getREleById(OG.Util.isElement(element) ? element.id : element);
		if (rElement) {
			rElement.hide();
		}
	};

	/**
	 * Source Element 를 Target Element 아래에 append 한다.
	 *
	 * @param {Element,String} srcElement Element 또는 ID
	 * @param {Element,String} targetElement Element 또는 ID
	 * @return {Element} Source Element
	 * @override
	 */
	this.appendChild = function (srcElement, targetElement) {
		var srcRElement = getREleById(OG.Util.isElement(srcElement) ? srcElement.id : srcElement),
			targetRElement = getREleById(OG.Util.isElement(targetElement) ? targetElement.id : targetElement);

		targetRElement.appendChild(srcRElement);

		return srcRElement;
	};

	/**
	 * Source Element 를 Target Element 이후에 insert 한다.
	 *
	 * @param {Element,String} srcElement Element 또는 ID
	 * @param {Element,String} targetElement Element 또는 ID
	 * @return {Element} Source Element
	 * @override
	 */
	this.insertAfter = function (srcElement, targetElement) {
		var srcRElement = getREleById(OG.Util.isElement(srcElement) ? srcElement.id : srcElement),
			targetRElement = getREleById(OG.Util.isElement(targetElement) ? targetElement.id : targetElement);

		srcRElement.insertAfter(targetRElement);

		return srcRElement;
	};

	/**
	 * Source Element 를 Target Element 이전에 insert 한다.
	 *
	 * @param {Element,String} srcElement Element 또는 ID
	 * @param {Element,String} targetElement Element 또는 ID
	 * @return {Element} Source Element
	 * @override
	 */
	this.insertBefore = function (srcElement, targetElement) {
		var srcRElement = getREleById(OG.Util.isElement(srcElement) ? srcElement.id : srcElement),
			targetRElement = getREleById(OG.Util.isElement(targetElement) ? targetElement.id : targetElement);

		srcRElement.insertBefore(targetRElement);

		return srcRElement;
	};

	/**
	 * 해당 Element 를 가로, 세로 Offset 만큼 이동한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @param {Number[]} offset [가로, 세로]
	 * @param {String[]} excludeEdgeId redraw 제외할 Edge ID
	 * @return {Element} Element
	 * @override
	 */
	this.move = function (element, offset, excludeEdgeId) {
		var rElement = getREleById(OG.Util.isElement(element) ? element.id : element),
			type = rElement ? rElement.node.getAttribute("_type") : null,
			geometry, renderer = this;

		this.removeCollapseGuide(element);
		if (rElement && type) {
			$(rElement.node).children("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_shape=EDGE]").each(function (idx, item) {
				// recursive
				renderer.move(item, offset, excludeEdgeId);
			});
			$(rElement.node).children("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_shape!=EDGE]").each(function (idx, item) {
				// recursive
				renderer.move(item, offset, excludeEdgeId);
			});

			if (type !== OG.Constants.NODE_TYPE.ROOT && rElement.node.shape) {
				geometry = rElement.node.shape.geom;
				geometry.move(offset[0], offset[1]);

				this.redrawShape(rElement.node, excludeEdgeId);

				// moveShape event fire
				$(_PAPER.canvas).trigger('moveShape', [rElement.node, offset]);

				return rElement.node;
			} else {
				return element;
			}
		} else if (rElement) {
			rElement.transform("...t" + offset[0] + "," + offset[1]);

			// moveShape event fire
			$(_PAPER.canvas).trigger('moveShape', [rElement.node, offset]);

			return rElement.node;
		}

		return null;
	};

	/**
	 * 주어진 중심좌표로 해당 Element 를 이동한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @param {Number[]} position [x, y]
	 * @param {String[]} excludeEdgeId redraw 제외할 Edge ID
	 * @return {Element} Element
	 * @override
	 */
	this.moveCentroid = function (element, position, excludeEdgeId) {
		var rElement = getREleById(OG.Util.isElement(element) ? element.id : element),
			geometry = rElement ? rElement.node.shape.geom : null,
			bBox, center = {};

		if (rElement && geometry) {
			center = geometry.getCentroid();

			return this.move(element, [position[0] - center.x, position[1] - center.y], excludeEdgeId);
		} else if (rElement) {
			bBox = rElement.getBBox();
			center.x = bBox.x + OG.Util.round(bBox.width / 2);
			center.y = bBox.y + OG.Util.round(bBox.height / 2);

			return this.move(element, [position[0] - center.x, position[1] - center.y]);
		}
		this.removeCollapseGuide(element);

		return null;
	};

	/**
	 * 중심 좌표를 기준으로 주어진 각도 만큼 회전한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @param {Number} angle 각도
	 * @param {String[]} excludeEdgeId redraw 제외할 Edge ID
	 * @return {Element} Element
	 * @override
	 */
	this.rotate = function (element, angle, excludeEdgeId) {
		var rElement = getREleById(OG.Util.isElement(element) ? element.id : element),
			type = rElement ? rElement.node.getAttribute("_shape") : null,
			geometry = rElement ? rElement.node.shape.geom : null,
			shape, envelope, center, width, height;

		if (rElement && type && geometry) {
			if (type === OG.Constants.SHAPE_TYPE.IMAGE ||
				type === OG.Constants.SHAPE_TYPE.TEXT ||
				type === OG.Constants.SHAPE_TYPE.HTML) {
				shape = rElement.node.shape.clone();
				envelope = geometry.getBoundary();
				center = envelope.getCentroid();
				width = envelope.getWidth();
				height = envelope.getHeight();

				this.drawShape([center.x, center.y], shape, [width, height, angle], rElement.node.shapeStyle, rElement.node.id);
			} else {
				if (rElement.node.shape.angle) {
					geometry.rotate(-1 * rElement.node.shape.angle);
				}
				geometry.rotate(angle);
				rElement.node.shape.angle = angle;

				this.redrawShape(rElement.node, excludeEdgeId);
			}

			// rotateShape event fire
			$(_PAPER.canvas).trigger('rotateShape', [rElement.node, angle]);

			return rElement.node;
		} else if (rElement) {
			rElement.rotate(angle);

			// rotateShape event fire
			$(_PAPER.canvas).trigger('rotateShape', [rElement.node, angle]);

			return rElement.node;
		}

		return null;
	};

	/**
	 * 상, 하, 좌, 우 외곽선을 이동한 만큼 리사이즈 한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @param {Number[]} offset [상, 하, 좌, 우] 각 방향으로 + 값
	 * @param {String[]} excludeEdgeId redraw 제외할 Edge ID
	 * @return {Element} Element
	 * @override
	 */
	this.resize = function (element, offset, excludeEdgeId) {
		var rElement = getREleById(OG.Util.isElement(element) ? element.id : element),
			type = rElement ? rElement.node.getAttribute("_shape") : null,
			geometry = rElement ? rElement.node.shape.geom : null,
			bBox, offsetX, offsetY, width, height, hRate, vRate;

		this.removeCollapseGuide(element);
		if (rElement && type && geometry) {
			geometry.resize(offset[0], offset[1], offset[2], offset[3]);

			this.redrawShape(rElement.node, excludeEdgeId);

			// resizeShape event fire
			$(_PAPER.canvas).trigger('resizeShape', [rElement.node, offset]);

			return rElement.node;
		} else if (rElement) {
			bBox = rElement.getBBox();

			offsetX = offset[2] + offset[3];
			offsetY = offset[0] + offset[1];
			width = bBox.width + offsetX;
			height = bBox.height + offsetY;
			hRate = bBox.width === 0 ? 1 : width / bBox.width;
			vRate = bBox.height === 0 ? 1 : height / bBox.height;

			rElement.transform("...t" + (-1 * offset[2]) + "," + (-1 * offset[0]));
			rElement.transform("...s" + hRate + "," + vRate + "," + bBox.x + "," + bBox.y);

			// resizeShape event fire
			$(_PAPER.canvas).trigger('resizeShape', [rElement.node, offset]);

			return rElement.node;
		}

		return null;
	};

	/**
	 * 중심좌표는 고정한 채 Bounding Box 의 width, height 를 리사이즈 한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @param {Number[]} size [Width, Height]
	 * @return {Element} Element
	 * @override
	 */
	this.resizeBox = function (element, size) {
		var rElement = getREleById(OG.Util.isElement(element) ? element.id : element),
			geometry = rElement ? rElement.node.shape.geom : null,
			boundary, bBox, offsetWidth, offsetHeight;

		this.removeCollapseGuide(element);
		if (rElement && geometry) {
			boundary = geometry.getBoundary();
			offsetWidth = OG.Util.round((size[0] - boundary.getWidth()) / 2);
			offsetHeight = OG.Util.round((size[1] - boundary.getHeight()) / 2);

			return this.resize(element, [offsetHeight, offsetHeight, offsetWidth, offsetWidth]);
		} else if (rElement) {
			bBox = rElement.getBBox();
			offsetWidth = OG.Util.round((size[0] - bBox.width) / 2);
			offsetHeight = OG.Util.round((size[1] - bBox.height) / 2);

			return this.resize(element, [offsetHeight, offsetHeight, offsetWidth, offsetWidth]);
		}

		return null;
	};

	/**
	 * Edge 유형에 따라 Shape 과의 연결 지점을 찾아 반환한다.
	 *
	 * @param {String} edgeType Edge 유형(straight, plain..)
	 * @param {Element} element 연결할 Shape 엘리먼트
	 * @param {Number[]} from 시작좌표
	 * @param {Number[]} to 끝좌표
	 * @param {Boolean} 시작 연결지점 여부
	 * @return {Object} {position, direction}
	 * @override
	 */
	this.intersectionEdge = function (edgeType, element, from, to, isFrom) {
		var terminal, position, direction, intersectPoints, i, minDistance = Number.MAX_VALUE, distance,
			collapsedParents, collapsedEnvelope, collapsedUpperLeft, collapsedGeom, collapsedPosition;

		// element 가 collapsed 인지 체크
		if (element) {
			collapsedParents = $(element).parents("[_collapsed=true]");
			if (collapsedParents.length !== 0) {
				// collapsed 인 경우
				collapsedEnvelope = collapsedParents[collapsedParents.length - 1].shape.geom.getBoundary();
				collapsedUpperLeft = collapsedEnvelope.getUpperLeft();
				collapsedGeom = new OG.geometry.Rectangle(
					collapsedUpperLeft, OG.Constants.COLLAPSE_SIZE * 3, OG.Constants.COLLAPSE_SIZE * 2);
			}
		}

		switch (edgeType) {
		case OG.Constants.EDGE_TYPE.PLAIN:
			terminal = isFrom ? findFromTerminal(element, from, to) : findToTerminal(element, from, to);
			position = [terminal.terminal.position.x, terminal.terminal.position.y];
			direction = terminal.terminal.direction.toLowerCase();

			if (collapsedGeom) {
				switch (terminal.terminal.direction) {
				case OG.Constants.TERMINAL_TYPE.E:
					collapsedPosition = collapsedGeom.getBoundary().getRightCenter();
					break;
				case OG.Constants.TERMINAL_TYPE.W:
					collapsedPosition = collapsedGeom.getBoundary().getLeftCenter();
					break;
				case OG.Constants.TERMINAL_TYPE.S:
					collapsedPosition = collapsedGeom.getBoundary().getLowerCenter();
					break;
				case OG.Constants.TERMINAL_TYPE.N:
					collapsedPosition = collapsedGeom.getBoundary().getUpperCenter();
					break;
				}
				if (collapsedPosition) {
					position = [collapsedPosition.x, collapsedPosition.y];
				}
			}

			break;
		case OG.Constants.EDGE_TYPE.STRAIGHT:
			if (collapsedGeom) {
				collapsedPosition = collapsedGeom.getBoundary().getCentroid();
				if (isFrom === true) {
					from = [collapsedPosition.x, collapsedPosition.y];
				} else {
					to = [collapsedPosition.x, collapsedPosition.y];
				}
				intersectPoints = collapsedGeom.intersectToLine([from, to]);
			} else {
				intersectPoints = element.shape.geom.intersectToLine([from, to]);
			}
			position = isFrom ? from : to;
			direction = "c";
			for (i = 0; i < intersectPoints.length; i++) {
				distance = intersectPoints[i].distance(isFrom ? to : from);
				if (distance < minDistance) {
					minDistance = distance;
					position = [intersectPoints[i].x, intersectPoints[i].y];
					direction = "c";
				}
			}
			break;
		default:
			break;
		}

		return {
			position : position,
			direction: direction
		};
	};

	/**
	 * 노드 Element 를 복사한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @return {Element} Element
	 * @override
	 */
	this.clone = function (element) {
		// TODO : 오류 - group 인 경우 clone 처리 필요
		var rElement = getREleById(OG.Util.isElement(element) ? element.id : element), newElement;
		newElement = rElement.clone();
		add(newElement);
		_ROOT_GROUP.node.appendChild(newElement.node);

		return newElement.node;
	};

	/**
	 * ID로 Node Element 를 반환한다.
	 *
	 * @param {String} id
	 * @return {Element} Element
	 * @override
	 */
	this.getElementById = function (id) {
		var rElement = getREleById(id);
		return rElement ? rElement.node : null;
	};

	/**
	 * Shape 타입에 해당하는 Node Element 들을 반환한다.
	 *
	 * @param {String} shapeType Shape 타입(GEOM, HTML, IMAGE, EDGE, GROUP), Null 이면 모든 타입
	 * @param {String} excludeType 제외 할 타입
	 * @return {Element[]} Element's Array
	 * @override
	 */
	this.getElementsByType = function (shapeType, excludeType) {
		var root = this.getRootGroup();
		if (shapeType && excludeType) {
			return $(root).find("[_type=SHAPE][_shape=" + shapeType + "][_shape!=" + excludeType + "]");
		} else if (shapeType) {
			return $(root).find("[_type=SHAPE][_shape=" + shapeType + "]");
		} else if (excludeType) {
			return $(root).find("[_type=SHAPE][_shape!=" + excludeType + "]");
		} else {
			return $(root).find("[_type=SHAPE]");
		}
	};

	/**
	 * 해당 엘리먼트의 BoundingBox 영역 정보를 반환한다.
	 *
	 * @param {Element,String} element
	 * @return {Object} {width, height, x, y, x2, y2}
	 * @override
	 */
	this.getBBox = function (element) {
		var rElement = getREleById(OG.Util.isElement(element) ? element.id : element);
		return rElement.getBBox();
	};

	/**
	 * 부모노드기준으로 캔버스 루트 엘리먼트의 BoundingBox 영역 정보를 반환한다.
	 *
	 * @return {Object} {width, height, x, y, x2, y2}
	 * @override
	 */
	this.getRootBBox = function () {
		var container = _PAPER.canvas.parentNode,
			width = OG.Util.isFirefox() ? _PAPER.canvas.width.baseVal.value : _PAPER.canvas.scrollWidth,
			height = OG.Util.isFirefox() ? _PAPER.canvas.height.baseVal.value : _PAPER.canvas.scrollHeight,
			x = container.offsetLeft,
			y = container.offsetTop;

		return {
			width : width,
			height: height,
			x     : x,
			y     : y,
			x2    : x + width,
			y2    : y + height
		};
	};

	/**
	 * 부모노드기준으로 캔버스 루트 엘리먼트의 실제 Shape 이 차지하는 BoundingBox 영역 정보를 반환한다.
	 *
	 * @return {Object} {width, height, x, y, x2, y2}
	 * @override
	 */
	this.getRealRootBBox = function () {
		var minX = Number.MAX_VALUE, minY = Number.MAX_VALUE, maxX = Number.MIN_VALUE, maxY = Number.MIN_VALUE,
			shapeElements = this.getElementsByType(), shape, envelope, upperLeft, lowerRight, i,
			rootBBox = {
				width : 0,
				height: 0,
				x     : 0,
				y     : 0,
				x2    : 0,
				y2    : 0
			};

		for (i = 0; i < shapeElements.length; i++) {
			shape = shapeElements[i].shape;
			if (shape && shape.geom) {
				envelope = shape.geom.getBoundary();
				upperLeft = envelope.getUpperLeft();
				lowerRight = envelope.getLowerRight();

				minX = minX > upperLeft.x ? upperLeft.x : minX;
				minY = minY > upperLeft.y ? upperLeft.y : minY;
				maxX = maxX < lowerRight.x ? lowerRight.x : maxX;
				maxY = maxY < lowerRight.y ? lowerRight.y : maxY;

				rootBBox = {
					width : maxX - minX,
					height: maxY - minY,
					x     : minX,
					y     : minY,
					x2    : maxX,
					y2    : maxY
				};
			}
		}

		return rootBBox;
	};

	/**
	 * 캔버스의 컨테이너 DOM element 를 반환한다.
	 *
	 * @return {Element} 컨테이너
	 * @override
	 */
	this.getContainer = function () {
		return _PAPER.canvas.parentNode;
	};

	/**
	 * SVG 인지 여부를 반환한다.
	 *
	 * @return {Boolean} svg 여부
	 * @override
	 */
	this.isSVG = function () {
		return Raphael.svg;
	};

	/**
	 * VML 인지 여부를 반환한다.
	 *
	 * @return {Boolean} vml 여부
	 * @override
	 */
	this.isVML = function () {
		return Raphael.vml;
	};
};
OG.renderer.RaphaelRenderer.prototype = new OG.renderer.IRenderer();
OG.renderer.RaphaelRenderer.prototype.constructor = OG.renderer.RaphaelRenderer;
OG.RaphaelRenderer = OG.renderer.RaphaelRenderer;

/**
 * Event Handler
 *
 * @class
 * @requires OG.renderer.*
 *
 * @param {OG.renderer.IRenderer} renderer 렌더러
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.handler.EventHandler = function (renderer) {
	var _HANDLER = this, _RENDERER = renderer,
		setResizable, isParentSelected, deselectChildren, copyChildren, autoExtend,
		num = function (str) {
			return parseInt(str, 10);
		},
		grid = function (value, size) {
			return OG.Constants.DRAG_GRIDABLE ? OG.Util.roundGrid(value, size) : value;
		},
		getShapeFromTerminal = function (terminal) {
			var terminalId = OG.Util.isElement(terminal) ? terminal.id : terminal;
			return _RENDERER.getElementById(terminalId.substring(0, terminalId.indexOf(OG.Constants.TERMINAL_SUFFIX.GROUP)));
		},
		isContainsConnectedShape = function (edgeEle, bBoxArray) {
			var fromTerminalId, toTerminalId, fromShape, toShape, isContainsFrom = false, isContainsTo = false, i;

			fromTerminalId = $(edgeEle).attr("_from");
			toTerminalId = $(edgeEle).attr("_to");
			if (fromTerminalId) {
				fromShape = getShapeFromTerminal(fromTerminalId);
			}
			if (toTerminalId) {
				toShape = getShapeFromTerminal(toTerminalId);
			}

			for (i = 0; i < bBoxArray.length; i++) {
				if (fromShape && bBoxArray[i].id === fromShape.id) {
					isContainsFrom = true;
				}
				if (toShape && bBoxArray[i].id === toShape.id) {
					isContainsTo = true;
				}
			}

			return {
				none      : !isContainsFrom && !isContainsTo,
				all       : isContainsFrom && isContainsTo,
				any       : isContainsFrom || isContainsTo,
				either    : (isContainsFrom && !isContainsTo) || (!isContainsFrom && isContainsTo),
				attrEither: (fromTerminalId && !toTerminalId) || (!fromTerminalId && toTerminalId)
			};
		},
		getOffset = function (event) {
			var container = _RENDERER.getContainer();

			return {
				x: (event.pageX - $(container).offset().left + container.scrollLeft) / OG.Constants.SCALE,
				y: (event.pageY - $(container).offset().top + container.scrollTop) / OG.Constants.SCALE
			};
		},
		getMoveTargets = function () {
			var bBoxArray = [], box, newBBoxArray = [];
			$(_RENDERER.getRootElement()).find("[id$=" + OG.Constants.GUIDE_SUFFIX.BBOX + "]").each(function (index, item) {
				if (item.id) {
					box = _RENDERER.clone(item);
					_RENDERER.setAttr(box, OG.Constants.DEFAULT_STYLE.GUIDE_SHADOW);

					bBoxArray.push({
						id : item.id.replace(OG.Constants.GUIDE_SUFFIX.BBOX, ""),
						box: box
					});
				}
			});

			// Edge 인 경우 먼저 등록, 연결된 Shape 이 있는 경우 목록에서 제거
			$.each(bBoxArray, function (k, item) {
				var ele = _RENDERER.getElementById(item.id), isContainsResult;
				if ($(ele).attr("_shape") === OG.Constants.SHAPE_TYPE.EDGE) {
					isContainsResult = isContainsConnectedShape(ele, bBoxArray);
					if (isContainsResult.all || isContainsResult.none || (isContainsResult.either && isContainsResult.attrEither)) {
						newBBoxArray.push(item);
					} else {
						_RENDERER.remove(item.box);
						_RENDERER.removeGuide(ele);
					}
				}
			});

			// Edge 이외 목록에 등록
			$.each(bBoxArray, function (k, item) {
				var ele = _RENDERER.getElementById(item.id);
				if ($(ele).attr("_shape") !== OG.Constants.SHAPE_TYPE.EDGE) {
					newBBoxArray.push(item);
				}
			});

			return newBBoxArray;
		},
		moveElements = function (bBoxArray, dx, dy) {
			var excludeEdgeId = [], eleArray = [];

			$.each(bBoxArray, function (k, item) {
				var ele = _RENDERER.getElementById(item.id);
				if ($(ele).attr("_shape") === OG.Constants.SHAPE_TYPE.EDGE) {
					excludeEdgeId.push(item.id);
				}
			});

			$.each(bBoxArray, function (k, item) {
				var ele = _RENDERER.getElementById(item.id);

				// cloned box 삭제
				_RENDERER.remove(item.box);

				// 이동
				_RENDERER.move(ele, [dx, dy], excludeEdgeId);
				_RENDERER.drawGuide(ele);

				// Edge 인 경우 disconnect 처리(연결된 Shape 이 없는 경우)
				if ($(ele).attr("_shape") === OG.Constants.SHAPE_TYPE.EDGE) {
					if (isContainsConnectedShape(ele, bBoxArray).none) {
						_RENDERER.disconnect(ele);
					}
				}

				eleArray.push(ele);
			});

			return eleArray;
		},
		deleteSelectedShape = function () {
			$(_RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_shape=EDGE][_selected=true]").each(function (index, item) {
				if (item.id) {
					_RENDERER.removeShape(item);
				}
			});
			$(_RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (index, item) {
				if (item.id) {
					_RENDERER.removeShape(item);
				}
			});
		},
		selectShape = function (element) {
			if ($(element.parentNode).attr("_shape") !== OG.Constants.SHAPE_TYPE.GROUP) {
				var guide = _RENDERER.drawGuide(element);
				if (guide) {
					// enable event
					setResizable(element, guide, OG.Constants.SELECTABLE && OG.Constants.RESIZABLE);
					_RENDERER.removeTerminal(element);
				}
			}
		},
		selectAll = function () {
			$(_RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "]").each(function (index, element) {
				selectShape(element);
			});
		},
		copySelectedShape = function () {
			var root = _RENDERER.getRootGroup(), selectedElement = [];
			$(_RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (index, element) {
				selectedElement.push(element);
			});
			$(root).data("copied", selectedElement);
		},
		cutSelectedShape = function () {
			copySelectedShape();
			deleteSelectedShape();
		},
		pasteSelectedShape = function () {
			var root = _RENDERER.getRootGroup(),
				copiedElement = $(root).data("copied"),
				selectedElement = [];
			if (copiedElement) {
				$(_RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (index, item) {
					if (item.id) {
						_RENDERER.removeGuide(item);
					}
				});

				// TODO : 연결된 Shape 인 경우 연결성 유지토록
				$.each(copiedElement, function (idx, item) {
					// copy
					var boundary = item.shape.geom.getBoundary(), newShape, newElement, newGuide;
					newShape = item.shape.clone();

					if ($(item).attr("_shape") === OG.Constants.SHAPE_TYPE.EDGE) {
						newShape.geom = new OG.PolyLine(item.shape.geom.getVertices());
						newShape.geom.style = item.shape.geom.style;
						newShape.geom.move(OG.Constants.COPY_PASTE_PADDING, OG.Constants.COPY_PASTE_PADDING);
						newElement = _RENDERER.drawShape(
							null, newShape,
							null, item.shapeStyle
						);

					} else {
						newElement = _RENDERER.drawShape(
							[ boundary.getCentroid().x + OG.Constants.COPY_PASTE_PADDING, boundary.getCentroid().y + OG.Constants.COPY_PASTE_PADDING ],
							newShape, [boundary.getWidth(), boundary.getHeight()], item.shapeStyle
						);
					}

					// custom data
					newElement.data = item.data;

					// enable event
					newGuide = _RENDERER.drawGuide(newElement);
					_HANDLER.setClickSelectable(newElement, OG.Constants.SELECTABLE);
					_HANDLER.setMovable(newElement, OG.Constants.SELECTABLE && OG.Constants.MOVABLE);
					setResizable(newElement, newGuide, OG.Constants.SELECTABLE && OG.Constants.RESIZABLE);
					if (OG.Constants.GROUP_DROPABLE) {
						_HANDLER.enableDragAndDropGroup(newElement);
					}
					if (OG.Constants.GROUP_COLLAPSIBLE) {
						_HANDLER.enableCollapse(newElement);
					}
					if ($(newElement).attr("_shape") !== OG.Constants.SHAPE_TYPE.GROUP) {
						if (OG.Constants.CONNECTABLE) {
							_HANDLER.enableConnect(newElement);
						}
						if (OG.Constants.LABEL_EDITABLE) {
							_HANDLER.enableEditLabel(newElement);
						}
					}

					// copy children
					copyChildren(item, newElement);

					selectedElement.push(newElement);
				});
				$(root).data("copied", selectedElement);
			}
		},
		duplicateSelectedShape = function () {
			copySelectedShape();
			pasteSelectedShape();
		},
		groupSelectedShape = function () {
			var groupElement = _RENDERER.group($(_RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]")), guide;

			if (groupElement) {
				$(_RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (idx, item) {
					_RENDERER.removeGuide(item);
				});

				guide = _RENDERER.drawGuide(groupElement);
				if (guide) {
					// enable event
					_HANDLER.setClickSelectable(groupElement, OG.Constants.SELECTABLE);
					_HANDLER.setMovable(groupElement, OG.Constants.SELECTABLE && OG.Constants.MOVABLE);
					setResizable(groupElement, guide, OG.Constants.SELECTABLE && OG.Constants.RESIZABLE);
					if (OG.Constants.GROUP_DROPABLE) {
						_HANDLER.enableDragAndDropGroup(groupElement);
					}

					_RENDERER.removeAllTerminal();
					_RENDERER.toFront(guide.group);
				}
			}
		},
		ungroupSelectedShape = function () {
			var ungroupedElements = _RENDERER.ungroup($(_RENDERER.getRootElement()).find("[_shape=" + OG.Constants.SHAPE_TYPE.GROUP + "][_selected=true]")),
				guide;
			$.each(ungroupedElements, function (idx, item) {
				guide = _RENDERER.drawGuide(item);
				if (guide) {
					_RENDERER.removeAllTerminal();
					_RENDERER.toFront(guide.group);
				}
			});
		},
		rotateSelectedShape = function (angle) {
			var guide;
			$(_RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_shape=" + OG.Constants.SHAPE_TYPE.EDGE + "][_selected=true]").each(function (idx, edge) {
				_RENDERER.removeGuide(edge);
			});
			$(_RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (idx, item) {
				if (item.shape && item.shape.TYPE !== OG.Constants.SHAPE_TYPE.EDGE &&
					item.shape.TYPE !== OG.Constants.SHAPE_TYPE.GROUP) {
					_RENDERER.rotate(item, angle);

					_RENDERER.removeGuide(item);
					guide = _RENDERER.drawGuide(item);
					setResizable(item, guide, OG.Constants.SELECTABLE && OG.Constants.RESIZABLE);
					_RENDERER.toFront(guide.group);
				}
			});
		},
		setLineWidthSelectedShape = function (lineWidth) {
			$(_RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (idx, item) {
				_RENDERER.setShapeStyle(item, {"stroke-width": lineWidth});
			});
		},
		setLineColorSelectedShape = function (lineColor) {
			$(_RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (idx, item) {
				_RENDERER.setShapeStyle(item, {"stroke": lineColor});
			});
		},
		setLineTypeSelectedShape = function (lineType) {
			var guide;
			$(_RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_shape=" + OG.Constants.SHAPE_TYPE.EDGE + "][_selected=true]").each(function (idx, edge) {
				OG.Util.apply(edge.shape.geom.style.map, {"edge-type": lineType});
				edge.shapeStyle = edge.shapeStyle || {};
				OG.Util.apply(edge.shapeStyle, {"edge-type": lineType});

				_RENDERER.redrawEdge(edge);

				_RENDERER.removeGuide(edge);
				guide = _RENDERER.drawGuide(edge);
				setResizable(edge, guide, OG.Constants.SELECTABLE && OG.Constants.RESIZABLE);
				_RENDERER.toFront(guide.group);
			});
		},
		setLineStyleSelectedShape = function (lineStyle) {
			$(_RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (idx, item) {
				_RENDERER.setShapeStyle(item, {"stroke-dasharray": lineStyle});
			});
		},
		setArrowStartSelectedShape = function (arrowType) {
			$(_RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (idx, item) {
				_RENDERER.setShapeStyle(item, {"arrow-start": arrowType});
			});
		},
		setArrowEndSelectedShape = function (arrowType) {
			$(_RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (idx, item) {
				_RENDERER.setShapeStyle(item, {"arrow-end": arrowType});
			});
		},
		setFillColorSelectedShape = function (fillColor) {
			$(_RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (idx, item) {
				_RENDERER.setShapeStyle(item, {"fill": fillColor, "fill-opacity": 1});
			});
		},
		setFillOpacitySelectedShape = function (fillOpacity) {
			$(_RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (idx, item) {
				_RENDERER.setShapeStyle(item, {"fill-opacity": fillOpacity});
			});
		},
		setFontFamilySelectedShape = function (fontFamily) {
			$(_RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (idx, item) {
				_RENDERER.setShapeStyle(item, {"font-family": fontFamily});
			});
		},
		setFontSizeSelectedShape = function (fontSize) {
			$(_RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (idx, item) {
				_RENDERER.setShapeStyle(item, {"font-size": fontSize});
			});
		},
		setFontColorSelectedShape = function (fontColor) {
			$(_RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (idx, item) {
				_RENDERER.setShapeStyle(item, {"font-color": fontColor});
			});
		},
		setFontWeightSelectedShape = function (fontWeight) {
			$(_RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (idx, item) {
				_RENDERER.setShapeStyle(item, {"font-weight": fontWeight});
			});
		},
		setFontStyleSelectedShape = function (fontStyle) {
			$(_RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (idx, item) {
				_RENDERER.setShapeStyle(item, {"font-style": fontStyle});
			});
		},
		setTextDecorationSelectedShape = function (textDecoration) {
			$(_RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (idx, item) {
				_RENDERER.setShapeStyle(item, {"text-decoration": textDecoration});
			});
		},
		setLabelDirectionSelectedShape = function (labelDirection) {
			$(_RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (idx, item) {
				_RENDERER.setShapeStyle(item, {"label-direction": labelDirection});
			});
		},
		setLabelAngleSelectedShape = function (labelAngle) {
			$(_RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (idx, item) {
				_RENDERER.setShapeStyle(item, {"label-angle": labelAngle});
			});
		},
		setLabelPositionSelectedShape = function (labelPosition) {
			$(_RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (idx, item) {
				if (labelPosition === 'top') {
					_RENDERER.setShapeStyle(item, {
						"label-position": labelPosition,
						"text-anchor"   : "middle",
						"vertical-align": "bottom"
					});
				} else if (labelPosition === 'bottom') {
					_RENDERER.setShapeStyle(item, {
						"label-position": labelPosition,
						"text-anchor"   : "middle",
						"vertical-align": "top"
					});
				} else if (labelPosition === 'left') {
					_RENDERER.setShapeStyle(item, {
						"label-position": labelPosition,
						"text-anchor"   : "end",
						"vertical-align": "center"
					});
				} else if (labelPosition === 'right') {
					_RENDERER.setShapeStyle(item, {
						"label-position": labelPosition,
						"text-anchor"   : "start",
						"vertical-align": "center"
					});
				} else if (labelPosition === 'center') {
					_RENDERER.setShapeStyle(item, {
						"label-position": labelPosition,
						"text-anchor"   : "middle",
						"vertical-align": "center"
					});
				}
			});
		},
		setLabelVerticalSelectedShape = function (verticalAlign) {
			$(_RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (idx, item) {
				_RENDERER.setShapeStyle(item, {"vertical-align": verticalAlign});
			});
		},
		setLabelHorizontalSelectedShape = function (horizontalAlign) {
			$(_RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (idx, item) {
				_RENDERER.setShapeStyle(item, {"text-anchor": horizontalAlign});
			});
		},
		setLabelSelectedShape = function (label) {
			$(_RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (idx, item) {
				_RENDERER.drawLabel(item, label);
			});
		},
		setEdgeFromLabelSelectedShape = function (label) {
			$(_RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_shape=" + OG.Constants.SHAPE_TYPE.EDGE + "][_selected=true]").each(function (idx, item) {
				_RENDERER.drawEdgeLabel(item, label, 'FROM');
			});
		},
		setEdgeToLabelSelectedShape = function (label) {
			$(_RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_shape=" + OG.Constants.SHAPE_TYPE.EDGE + "][_selected=true]").each(function (idx, item) {
				_RENDERER.drawEdgeLabel(item, label, 'TO');
			});
		},
		zoomIn = function () {
			if (OG.Constants.SCALE + OG.Constants.SCALE * 0.1 <= OG.Constants.SCALE_MAX) {
				_RENDERER.setScale(OG.Constants.SCALE + OG.Constants.SCALE * 0.1);
			}
		},
		zoomOut = function () {
			if (OG.Constants.SCALE - OG.Constants.SCALE * 0.1 >= OG.Constants.SCALE_MIN) {
				_RENDERER.setScale(OG.Constants.SCALE - OG.Constants.SCALE * 0.1);
			}
		},
		fitWindow = function () {
			var container = _RENDERER.getContainer();
			_RENDERER.fitCanvasSize([container.clientWidth, container.clientHeight], true);
		};

	/**
	 * Shape 엘리먼트의 리사이즈 가능여부를 설정한다.
	 *
	 * @param {Element} element Shape 엘리먼트
	 * @param {Object} guide JSON 포맷 가이드 정보
	 * @param {Boolean} isResizable 가능여부
	 */
	setResizable = function (element, guide, isResizable) {
		var root = _RENDERER.getRootGroup();

		if (!element || !guide) {
			return;
		}

		if (isResizable) {
			if (($(element).attr("_shape") === OG.Constants.SHAPE_TYPE.GEOM && OG.Constants.RESIZABLE_GEOM) ||
				($(element).attr("_shape") === OG.Constants.SHAPE_TYPE.TEXT && OG.Constants.RESIZABLE_TEXT) ||
				($(element).attr("_shape") === OG.Constants.SHAPE_TYPE.HTML && OG.Constants.RESIZABLE_HTML) ||
				($(element).attr("_shape") === OG.Constants.SHAPE_TYPE.IMAGE && OG.Constants.RESIZABLE_IMAGE) ||
				($(element).attr("_shape") === OG.Constants.SHAPE_TYPE.EDGE && OG.Constants.RESIZABLE_EDGE) ||
				($(element).attr("_shape") === OG.Constants.SHAPE_TYPE.GROUP && OG.Constants.RESIZABLE_GROUP)) {

				if ($(element).attr("_shape") === OG.Constants.SHAPE_TYPE.EDGE) {
					// resize handle
					$(guide.from).draggable({
						start: function (event) {
							var vertices = element.shape.geom.getVertices(), _style = {},
								toTerminalId = $(element).attr("_to"), toShape,
								toTerminal = [vertices[vertices.length - 1].x, vertices[vertices.length - 1].y],
								edge = _RENDERER.drawEdge(new OG.PolyLine(vertices),
									OG.Util.apply(_style, OG.Constants.DEFAULT_STYLE.EDGE_SHADOW, element.shape.geom.style.map));

							if (toTerminalId) {
								toShape = getShapeFromTerminal(toTerminalId);
								_RENDERER.drawTerminal(toShape);
								toTerminal = _RENDERER.getElementById(toTerminalId);
							}

							$(root).data("to_terminal", toTerminal);
							$(root).data("edge", edge);
							$(root).data("dragged_guide", "from");

							_RENDERER.removeRubberBand(_RENDERER.getRootElement());
							$(_RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (n, selectedItem) {
								if (selectedItem.id && $(selectedItem).attr("_shape") !== OG.Constants.SHAPE_TYPE.EDGE) {
									_RENDERER.removeGuide(selectedItem);
								}
							});
						},
						drag : function (event) {
							var eventOffset = getOffset(event),
								edge = $(root).data("edge"),
								fromTerminal = $(root).data("edge_terminal"),
								toTerminal = $(root).data("to_terminal"),
								fromXY = fromTerminal ?
									[fromTerminal.terminal.position.x, fromTerminal.terminal.position.y] : [eventOffset.x, eventOffset.y],
								toXY = OG.Util.isElement(toTerminal) ?
									[toTerminal.terminal.position.x, toTerminal.terminal.position.y] : toTerminal,
								fromDrct = fromTerminal ? fromTerminal.terminal.direction.toLowerCase() : "c",
								toDrct = OG.Util.isElement(toTerminal) ? toTerminal.terminal.direction.toLowerCase() : "c",
								fromShape = fromTerminal ? getShapeFromTerminal(fromTerminal) : null,
								toShape = OG.Util.isElement(toTerminal) ? getShapeFromTerminal(toTerminal) : null,
								orgFromXY, orgToXY, intersectionInfo, isSelf;

							$(this).css({"position": "", "left": "", "top": ""});

							// backup edge-direction
							orgFromXY = fromXY;
							orgToXY = toXY;

							// direction 이 c 인 경우에 대한 처리(센터 연결)
							if (fromShape && fromDrct === "c") {
								intersectionInfo = _RENDERER.intersectionEdge(
									edge.geom.style.get("edge-type"), fromShape, [orgFromXY[0], orgFromXY[1]], [orgToXY[0], orgToXY[1]], true
								);
								fromXY = intersectionInfo.position;
								fromDrct = intersectionInfo.direction;
							}
							if (toShape && toDrct === "c") {
								intersectionInfo = _RENDERER.intersectionEdge(
									edge.geom.style.get("edge-type"), toShape, [orgFromXY[0], orgFromXY[1]], [orgToXY[0], orgToXY[1]], false
								);
								toXY = intersectionInfo.position;
								toDrct = intersectionInfo.direction;
							}

							isSelf = fromShape && toShape && fromShape.id === toShape.id;
							if (isSelf) {
								fromXY = toXY = fromShape.shape.geom.getBoundary().getRightCenter();
							}

							if (!isSelf || OG.Constants.SELF_CONNECTABLE) {
								_RENDERER.drawEdge(new OG.Line(fromXY, toXY),
									OG.Util.apply(edge.geom.style.map, {"edge-direction": fromDrct + " " + toDrct}), edge.id, isSelf);
							}
						},
						stop : function (event) {
							var eventOffset = getOffset(event),
								fromTerminal = $(root).data("edge_terminal") || [eventOffset.x, eventOffset.y],
								toTerminal = $(root).data("to_terminal"),
								fromShape = OG.Util.isElement(fromTerminal) ? getShapeFromTerminal(fromTerminal) : null,
								toShape = OG.Util.isElement(toTerminal) ? getShapeFromTerminal(toTerminal) : null,
								edge = $(root).data("edge"), isSelf;

							$(this).css({"position": "absolute", "left": "0px", "top": "0px"});

							// clear
							$(root).removeData("to_terminal");
							$(root).removeData("edge");
							$(root).removeData("edge_terminal");
							$(root).removeData("dragged_guide");
							_RENDERER.remove(edge);
							_RENDERER.removeGuide(element);
							if (fromShape) {
								_RENDERER.remove(fromShape.id + OG.Constants.DROP_OVER_BBOX_SUFFIX);
							}

							isSelf = fromShape && toShape && fromShape.id === toShape.id;

							if (!isSelf || OG.Constants.SELF_CONNECTABLE) {
								// draw
								element = _RENDERER.connect(fromTerminal, toTerminal, element, element.shape.geom.style);
								if (element) {
									guide = _RENDERER.drawGuide(element);
									if (element && guide) {
										setResizable(element, guide, true);
										_RENDERER.toFront(guide.group);
									}
								}
							}
						}
					});

					$(guide.to).draggable({
						start: function (event) {
							var vertices = element.shape.geom.getVertices(), _style = {},
								fromTerminalId = $(element).attr("_from"), fromShape,
								fromTerminal = [vertices[0].x, vertices[0].y],
								edge = _RENDERER.drawEdge(new OG.PolyLine(vertices),
									OG.Util.apply(_style, OG.Constants.DEFAULT_STYLE.EDGE_SHADOW, element.shape.geom.style.map));

							if (fromTerminalId) {
								fromShape = getShapeFromTerminal(fromTerminalId);
								_RENDERER.drawTerminal(fromShape);
								fromTerminal = _RENDERER.getElementById(fromTerminalId);
							}

							$(root).data("from_terminal", fromTerminal);
							$(root).data("edge", edge);
							$(root).data("dragged_guide", "to");

							_RENDERER.removeRubberBand(_RENDERER.getRootElement());
							$(_RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (n, selectedItem) {
								if (selectedItem.id && $(selectedItem).attr("_shape") !== OG.Constants.SHAPE_TYPE.EDGE) {
									_RENDERER.removeGuide(selectedItem);
								}
							});
						},
						drag : function (event) {
							var eventOffset = getOffset(event),
								edge = $(root).data("edge"),
								fromTerminal = $(root).data("from_terminal"),
								toTerminal = $(root).data("edge_terminal"),
								fromXY = OG.Util.isElement(fromTerminal) ?
									[fromTerminal.terminal.position.x, fromTerminal.terminal.position.y] : fromTerminal,
								toXY = toTerminal ?
									[toTerminal.terminal.position.x, toTerminal.terminal.position.y] : [eventOffset.x, eventOffset.y],
								fromDrct = OG.Util.isElement(fromTerminal) ? fromTerminal.terminal.direction.toLowerCase() : "c",
								toDrct = toTerminal ? toTerminal.terminal.direction.toLowerCase() : "c",
								fromShape = OG.Util.isElement(fromTerminal) ? getShapeFromTerminal(fromTerminal) : null,
								toShape = toTerminal ? getShapeFromTerminal(toTerminal) : null,
								orgFromXY, orgToXY, intersectionInfo, isSelf;

							$(this).css({"position": "", "left": "", "top": ""});

							// backup edge-direction
							orgFromXY = fromXY;
							orgToXY = toXY;

							// direction 이 c 인 경우에 대한 처리(센터 연결)
							if (fromShape && fromDrct === "c") {
								intersectionInfo = _RENDERER.intersectionEdge(
									edge.geom.style.get("edge-type"), fromShape, [orgFromXY[0], orgFromXY[1]], [orgToXY[0], orgToXY[1]], true
								);
								fromXY = intersectionInfo.position;
								fromDrct = intersectionInfo.direction;
							}
							if (toShape && toDrct === "c") {
								intersectionInfo = _RENDERER.intersectionEdge(
									edge.geom.style.get("edge-type"), toShape, [orgFromXY[0], orgFromXY[1]], [orgToXY[0], orgToXY[1]], false
								);
								toXY = intersectionInfo.position;
								toDrct = intersectionInfo.direction;
							}

							isSelf = (fromShape !== null) && (toShape !== null) && fromShape.id === toShape.id;
							if (isSelf) {
								fromXY = toXY = toShape.shape.geom.getBoundary().getRightCenter();
							}

							if (!isSelf || OG.Constants.SELF_CONNECTABLE) {
								_RENDERER.drawEdge(new OG.Line(fromXY, toXY),
									OG.Util.apply(edge.geom.style.map, {"edge-direction": fromDrct + " " + toDrct}), edge.id, isSelf);
							}
						},
						stop : function (event) {
							var eventOffset = getOffset(event),
								fromTerminal = $(root).data("from_terminal"),
								toTerminal = $(root).data("edge_terminal") || [eventOffset.x, eventOffset.y],
								fromShape = OG.Util.isElement(fromTerminal) ? getShapeFromTerminal(fromTerminal) : null,
								toShape = OG.Util.isElement(toTerminal) ? getShapeFromTerminal(toTerminal) : null,
								edge = $(root).data("edge"), isSelf;

							$(this).css({"position": "absolute", "left": "0px", "top": "0px"});

							// clear
							$(root).removeData("from_terminal");
							$(root).removeData("edge");
							$(root).removeData("edge_terminal");
							$(root).removeData("dragged_guide");
							_RENDERER.remove(edge);
							_RENDERER.removeGuide(element);
							if (toShape) {
								_RENDERER.remove(toShape.id + OG.Constants.DROP_OVER_BBOX_SUFFIX);
							}

							isSelf = fromShape && toShape && fromShape.id === toShape.id;

							if (!isSelf || OG.Constants.SELF_CONNECTABLE) {
								// draw
								element = _RENDERER.connect(fromTerminal, toTerminal, element, element.shape.geom.style);
								if (element) {
									guide = _RENDERER.drawGuide(element);
									if (guide) {
										setResizable(element, guide, true);
										_RENDERER.toFront(guide.group);
									}
								}
							}
						}
					});

					$.each(guide.controls, function (idx, item) {
						$(item).draggable({
							start: function (event) {
								var eventOffset = getOffset(event);
								$(this).data("start", {x: eventOffset.x, y: eventOffset.y});
								$(this).data("offset", {
									x: eventOffset.x - num(_RENDERER.getAttr(item, "x")),
									y: eventOffset.y - num(_RENDERER.getAttr(item, "y"))
								});
								_RENDERER.remove(guide.bBox);
								_RENDERER.removeRubberBand(_RENDERER.getRootElement());
							},
							drag : function (event) {
								var eventOffset = getOffset(event),
									start = $(this).data("start"),
									offset = $(this).data("offset"),
									newX = eventOffset.x - offset.x,
									newY = eventOffset.y - offset.y,
									vertices = element.shape.geom.getVertices(),
									isHorizontal = item.id.indexOf(OG.Constants.GUIDE_SUFFIX.CTL_H) >= 0,
									num = isHorizontal ?
										parseInt(item.id.replace(element.id + OG.Constants.GUIDE_SUFFIX.CTL_H, ""), 10) :
										parseInt(item.id.replace(element.id + OG.Constants.GUIDE_SUFFIX.CTL_V, ""), 10);

								$(this).css({"position": "", "left": "", "top": ""});

								if (isHorizontal) {
									vertices[num].x = newX;
									vertices[num + 1].x = newX;
								} else {
									vertices[num].y = newY;
									vertices[num + 1].y = newY;
								}

								element = _RENDERER.drawEdge(new OG.PolyLine(vertices), element.shape.geom.style, element.id);
								_RENDERER.drawGuide(element);

								_RENDERER.removeAllTerminal();

								// Draw Label
								_RENDERER.drawLabel(element);
								_RENDERER.drawEdgeLabel(element, null, 'FROM');
								_RENDERER.drawEdgeLabel(element, null, 'TO');
							},
							stop : function (event) {
								var eventOffset = getOffset(event),
									start = $(this).data("start"),
									offset = $(this).data("offset"),
									newX = eventOffset.x - offset.x,
									newY = eventOffset.y - offset.y,
									vertices = element.shape.geom.getVertices(),
									isHorizontal = item.id.indexOf(OG.Constants.GUIDE_SUFFIX.CTL_H) >= 0,
									num = isHorizontal ?
										parseInt(item.id.replace(element.id + OG.Constants.GUIDE_SUFFIX.CTL_H, ""), 10) :
										parseInt(item.id.replace(element.id + OG.Constants.GUIDE_SUFFIX.CTL_V, ""), 10);

								$(this).css({"position": "absolute", "left": "0px", "top": "0px"});

								if (isHorizontal) {
									vertices[num].x = newX;
									vertices[num + 1].x = newX;
								} else {
									vertices[num].y = newY;
									vertices[num + 1].y = newY;
								}

								element = _RENDERER.drawEdge(new OG.PolyLine(vertices), element.shape.geom.style, element.id);
								_RENDERER.drawGuide(element);

								// Draw Label
								_RENDERER.drawLabel(element);
								_RENDERER.drawEdgeLabel(element, null, 'FROM');
								_RENDERER.drawEdgeLabel(element, null, 'TO');
							}
						});
					});
				} else {
					// resize handle
					$(guide.rc).draggable({
						start: function (event) {
							var eventOffset = getOffset(event);
							$(this).data("start", {x: eventOffset.x, y: eventOffset.y});
							$(this).data("offset", {
								x: eventOffset.x - num(_RENDERER.getAttr(guide.rc, "x")),
								y: eventOffset.y - num(_RENDERER.getAttr(guide.rc, "y"))
							});
							_RENDERER.removeRubberBand(_RENDERER.getRootElement());
						},
						drag : function (event) {
							var eventOffset = getOffset(event),
								start = $(this).data("start"),
								offset = $(this).data("offset"),
								newX = grid(eventOffset.x - offset.x),
								newWidth = grid(newX - num(_RENDERER.getAttr(guide.lc, "x")));
							$(this).css({"position": "", "left": "", "top": ""});
							if (newWidth >= OG.Constants.GUIDE_MIN_SIZE) {
								_RENDERER.setAttr(guide.rc, {x: newX});
								_RENDERER.setAttr(guide.ur, {x: newX});
								_RENDERER.setAttr(guide.lr, {x: newX});
								_RENDERER.setAttr(guide.uc, {x: OG.Util.round((num(_RENDERER.getAttr(guide.lc, "x")) + newX) / 2)});
								_RENDERER.setAttr(guide.lwc, {x: OG.Util.round((num(_RENDERER.getAttr(guide.lc, "x")) + newX) / 2)});
								_RENDERER.setAttr(guide.bBox, {width: newWidth});
							}
							_RENDERER.removeAllTerminal();
						},
						stop : function (event) {
							var eventOffset = getOffset(event),
								start = $(this).data("start"),
								dx = eventOffset.x - start.x;
							$(this).css({"position": "absolute", "left": "0px", "top": "0px"});
							if (element && element.shape.geom) {
								// resizing
								if (element.shape.geom.getBoundary().getWidth() + dx < OG.Constants.GUIDE_MIN_SIZE) {
									dx = OG.Constants.GUIDE_MIN_SIZE - element.shape.geom.getBoundary().getWidth();
								}
								_RENDERER.resize(element, [0, 0, 0, grid(dx)]);
								_RENDERER.drawGuide(element);
							}
						}
					});

					$(guide.lwc).draggable({
						start: function (event) {
							var eventOffset = getOffset(event);
							$(this).data("start", {x: eventOffset.x, y: eventOffset.y});
							$(this).data("offset", {
								x: eventOffset.x - num(_RENDERER.getAttr(guide.lwc, "x")),
								y: eventOffset.y - num(_RENDERER.getAttr(guide.lwc, "y"))
							});
							_RENDERER.removeRubberBand(_RENDERER.getRootElement());
						},
						drag : function (event) {
							var eventOffset = getOffset(event),
								start = $(this).data("start"),
								offset = $(this).data("offset"),
								newY = grid(eventOffset.y - offset.y),
								newHeight = grid(newY - num(_RENDERER.getAttr(guide.uc, "y")));
							$(this).css({"position": "", "left": "", "top": ""});
							if (newHeight >= OG.Constants.GUIDE_MIN_SIZE) {
								_RENDERER.setAttr(guide.lwc, {y: newY});
								_RENDERER.setAttr(guide.ll, {y: newY});
								_RENDERER.setAttr(guide.lr, {y: newY});
								_RENDERER.setAttr(guide.lc, {y: OG.Util.round((num(_RENDERER.getAttr(guide.uc, "y")) + newY) / 2)});
								_RENDERER.setAttr(guide.rc, {y: OG.Util.round((num(_RENDERER.getAttr(guide.uc, "y")) + newY) / 2)});
								_RENDERER.setAttr(guide.bBox, {height: newHeight});
							}
							_RENDERER.removeAllTerminal();
						},
						stop : function (event) {
							var eventOffset = getOffset(event),
								start = $(this).data("start"),
								dy = eventOffset.y - start.y;
							$(this).css({"position": "absolute", "left": "0px", "top": "0px"});
							if (element && element.shape.geom) {
								// resizing
								if (element.shape.geom.getBoundary().getHeight() + dy < OG.Constants.GUIDE_MIN_SIZE) {
									dy = OG.Constants.GUIDE_MIN_SIZE - element.shape.geom.getBoundary().getHeight();
								}
								_RENDERER.resize(element, [0, grid(dy), 0, 0]);
								_RENDERER.drawGuide(element);
							}
						}
					});

					$(guide.lr).draggable({
						start: function (event) {
							var eventOffset = getOffset(event);
							$(this).data("start", {x: eventOffset.x, y: eventOffset.y});
							$(this).data("offset", {
								x: eventOffset.x - num(_RENDERER.getAttr(guide.lr, "x")),
								y: eventOffset.y - num(_RENDERER.getAttr(guide.lr, "y"))
							});
							_RENDERER.removeRubberBand(_RENDERER.getRootElement());
						},
						drag : function (event) {
							var eventOffset = getOffset(event),
								start = $(this).data("start"),
								offset = $(this).data("offset"),
								newX = grid(eventOffset.x - offset.x),
								newWidth = grid(newX - num(_RENDERER.getAttr(guide.lc, "x"))),
								newY = grid(eventOffset.y - offset.y),
								newHeight = grid(newY - num(_RENDERER.getAttr(guide.uc, "y")));
							$(this).css({"position": "", "left": "", "top": ""});
							if (newWidth >= OG.Constants.GUIDE_MIN_SIZE) {
								_RENDERER.setAttr(guide.rc, {x: newX});
								_RENDERER.setAttr(guide.ur, {x: newX});
								_RENDERER.setAttr(guide.lr, {x: newX});
								_RENDERER.setAttr(guide.uc, {x: OG.Util.round((num(_RENDERER.getAttr(guide.lc, "x")) + newX) / 2)});
								_RENDERER.setAttr(guide.lwc, {x: OG.Util.round((num(_RENDERER.getAttr(guide.lc, "x")) + newX) / 2)});
								_RENDERER.setAttr(guide.bBox, {width: newWidth});
							}
							if (newHeight >= OG.Constants.GUIDE_MIN_SIZE) {
								_RENDERER.setAttr(guide.lwc, {y: newY});
								_RENDERER.setAttr(guide.ll, {y: newY});
								_RENDERER.setAttr(guide.lr, {y: newY});
								_RENDERER.setAttr(guide.lc, {y: OG.Util.round((num(_RENDERER.getAttr(guide.uc, "y")) + newY) / 2)});
								_RENDERER.setAttr(guide.rc, {y: OG.Util.round((num(_RENDERER.getAttr(guide.uc, "y")) + newY) / 2)});
								_RENDERER.setAttr(guide.bBox, {height: newHeight});
							}
							_RENDERER.removeAllTerminal();
						},
						stop : function (event) {
							var eventOffset = getOffset(event),
								start = $(this).data("start"),
								dx = eventOffset.x - start.x,
								dy = eventOffset.y - start.y;
							$(this).css({"position": "absolute", "left": "0px", "top": "0px"});
							if (element && element.shape.geom) {
								// resizing
								if (element.shape.geom.getBoundary().getWidth() + dx < OG.Constants.GUIDE_MIN_SIZE) {
									dx = OG.Constants.GUIDE_MIN_SIZE - element.shape.geom.getBoundary().getWidth();
								}
								if (element.shape.geom.getBoundary().getHeight() + dy < OG.Constants.GUIDE_MIN_SIZE) {
									dy = OG.Constants.GUIDE_MIN_SIZE - element.shape.geom.getBoundary().getHeight();
								}
								_RENDERER.resize(element, [0, grid(dy), 0, grid(dx)]);
								_RENDERER.drawGuide(element);
							}
							_RENDERER.removeAllTerminal();
						}
					});

					$(guide.lc).draggable({
						start: function (event) {
							var eventOffset = getOffset(event);
							$(this).data("start", {x: eventOffset.x, y: eventOffset.y});
							$(this).data("offset", {
								x: eventOffset.x - num(_RENDERER.getAttr(guide.lc, "x")),
								y: eventOffset.y - num(_RENDERER.getAttr(guide.lc, "y"))
							});
							_RENDERER.removeRubberBand(_RENDERER.getRootElement());
						},
						drag : function (event) {
							var eventOffset = getOffset(event),
								start = $(this).data("start"),
								offset = $(this).data("offset"),
								newX = grid(eventOffset.x - offset.x),
								newWidth = grid(num(_RENDERER.getAttr(guide.rc, "x")) - newX);
							$(this).css({"position": "", "left": "", "top": ""});
							if (newWidth >= OG.Constants.GUIDE_MIN_SIZE) {
								_RENDERER.setAttr(guide.lc, {x: newX});
								_RENDERER.setAttr(guide.ul, {x: newX});
								_RENDERER.setAttr(guide.ll, {x: newX});
								_RENDERER.setAttr(guide.uc, {x: OG.Util.round((num(_RENDERER.getAttr(guide.rc, "x")) + newX) / 2)});
								_RENDERER.setAttr(guide.lwc, {x: OG.Util.round((num(_RENDERER.getAttr(guide.rc, "x")) + newX) / 2)});
								_RENDERER.setAttr(guide.bBox, {x: OG.Util.round(newX + num(_RENDERER.getAttr(guide.lc, "width")) / 2), width: newWidth});
							}
							_RENDERER.removeAllTerminal();
						},
						stop : function (event) {
							var eventOffset = getOffset(event),
								start = $(this).data("start"),
								dx = start.x - eventOffset.x;
							$(this).css({"position": "absolute", "left": "0px", "top": "0px"});
							if (element && element.shape.geom) {
								// resizing
								if (element.shape.geom.getBoundary().getWidth() + dx < OG.Constants.GUIDE_MIN_SIZE) {
									dx = OG.Constants.GUIDE_MIN_SIZE - element.shape.geom.getBoundary().getWidth();
								}
								_RENDERER.resize(element, [0, 0, grid(dx), 0]);
								_RENDERER.drawGuide(element);
							}
						}
					});

					$(guide.ll).draggable({
						start: function (event) {
							var eventOffset = getOffset(event);
							$(this).data("start", {x: eventOffset.x, y: eventOffset.y});
							$(this).data("offset", {
								x: eventOffset.x - num(_RENDERER.getAttr(guide.ll, "x")),
								y: eventOffset.y - num(_RENDERER.getAttr(guide.ll, "y"))
							});

							_RENDERER.removeRubberBand(_RENDERER.getRootElement());
						},
						drag : function (event) {
							var eventOffset = getOffset(event),
								start = $(this).data("start"),
								offset = $(this).data("offset"),
								newX = grid(eventOffset.x - offset.x),
								newY = grid(eventOffset.y - offset.y),
								newWidth = grid(num(_RENDERER.getAttr(guide.rc, "x")) - newX),
								newHeight = grid(newY - num(_RENDERER.getAttr(guide.uc, "y")));
							$(this).css({"position": "", "left": "", "top": ""});
							if (newWidth >= OG.Constants.GUIDE_MIN_SIZE) {
								_RENDERER.setAttr(guide.lc, {x: newX});
								_RENDERER.setAttr(guide.ul, {x: newX});
								_RENDERER.setAttr(guide.ll, {x: newX});
								_RENDERER.setAttr(guide.uc, {x: OG.Util.round((num(_RENDERER.getAttr(guide.rc, "x")) + newX) / 2)});
								_RENDERER.setAttr(guide.lwc, {x: OG.Util.round((num(_RENDERER.getAttr(guide.rc, "x")) + newX) / 2)});
								_RENDERER.setAttr(guide.bBox, {x: OG.Util.round(newX + num(_RENDERER.getAttr(guide.lc, "width")) / 2), width: newWidth});
							}
							if (newHeight >= OG.Constants.GUIDE_MIN_SIZE) {
								_RENDERER.setAttr(guide.lwc, {y: newY});
								_RENDERER.setAttr(guide.ll, {y: newY});
								_RENDERER.setAttr(guide.lr, {y: newY});
								_RENDERER.setAttr(guide.lc, {y: OG.Util.round((num(_RENDERER.getAttr(guide.uc, "y")) + newY) / 2)});
								_RENDERER.setAttr(guide.rc, {y: OG.Util.round((num(_RENDERER.getAttr(guide.uc, "y")) + newY) / 2)});
								_RENDERER.setAttr(guide.bBox, {height: newHeight});
							}
							_RENDERER.removeAllTerminal();
						},
						stop : function (event) {
							var eventOffset = getOffset(event),
								start = $(this).data("start"),
								dx = start.x - eventOffset.x,
								dy = eventOffset.y - start.y;
							$(this).css({"position": "absolute", "left": "0px", "top": "0px"});
							if (element && element.shape.geom) {
								// resizing
								if (element.shape.geom.getBoundary().getWidth() + dx < OG.Constants.GUIDE_MIN_SIZE) {
									dx = OG.Constants.GUIDE_MIN_SIZE - element.shape.geom.getBoundary().getWidth();
								}
								if (element.shape.geom.getBoundary().getHeight() + dy < OG.Constants.GUIDE_MIN_SIZE) {
									dy = OG.Constants.GUIDE_MIN_SIZE - element.shape.geom.getBoundary().getHeight();
								}
								_RENDERER.resize(element, [0, grid(dy), grid(dx), 0]);
								_RENDERER.drawGuide(element);
							}
						}
					});

					$(guide.uc).draggable({
						start: function (event) {
							var eventOffset = getOffset(event);
							$(this).data("start", {x: eventOffset.x, y: eventOffset.y});
							$(this).data("offset", {
								x: eventOffset.x - num(_RENDERER.getAttr(guide.uc, "x")),
								y: eventOffset.y - num(_RENDERER.getAttr(guide.uc, "y"))
							});

							_RENDERER.removeRubberBand(_RENDERER.getRootElement());
						},
						drag : function (event) {
							var eventOffset = getOffset(event),
								start = $(this).data("start"),
								offset = $(this).data("offset"),
								newY = grid(eventOffset.y - offset.y),
								newHeight = grid(num(_RENDERER.getAttr(guide.lwc, "y")) - newY);
							$(this).css({"position": "", "left": "", "top": ""});
							if (newHeight >= OG.Constants.GUIDE_MIN_SIZE) {
								_RENDERER.setAttr(guide.uc, {y: newY});
								_RENDERER.setAttr(guide.ul, {y: newY});
								_RENDERER.setAttr(guide.ur, {y: newY});
								_RENDERER.setAttr(guide.lc, {y: OG.Util.round((num(_RENDERER.getAttr(guide.lwc, "y")) + newY) / 2)});
								_RENDERER.setAttr(guide.rc, {y: OG.Util.round((num(_RENDERER.getAttr(guide.lwc, "y")) + newY) / 2)});
								_RENDERER.setAttr(guide.bBox, {y: OG.Util.round(newY + num(_RENDERER.getAttr(guide.uc, "width")) / 2), height: newHeight});
							}
							_RENDERER.removeAllTerminal();
						},
						stop : function (event) {
							var eventOffset = getOffset(event),
								start = $(this).data("start"),
								dy = start.y - eventOffset.y;
							$(this).css({"position": "absolute", "left": "0px", "top": "0px"});
							if (element && element.shape.geom) {
								// resizing
								if (element.shape.geom.getBoundary().getHeight() + dy < OG.Constants.GUIDE_MIN_SIZE) {
									dy = OG.Constants.GUIDE_MIN_SIZE - element.shape.geom.getBoundary().getHeight();
								}
								_RENDERER.resize(element, [grid(dy), 0, 0, 0]);
								_RENDERER.drawGuide(element);
							}
						}
					});

					$(guide.ul).draggable({
						start: function (event) {
							var eventOffset = getOffset(event);
							$(this).data("start", {x: eventOffset.x, y: eventOffset.y});
							$(this).data("offset", {
								x: eventOffset.x - num(_RENDERER.getAttr(guide.ul, "x")),
								y: eventOffset.y - num(_RENDERER.getAttr(guide.ul, "y"))
							});

							_RENDERER.removeRubberBand(_RENDERER.getRootElement());
						},
						drag : function (event) {
							var eventOffset = getOffset(event),
								start = $(this).data("start"),
								offset = $(this).data("offset"),
								newX = grid(eventOffset.x - offset.x),
								newY = grid(eventOffset.y - offset.y),
								newWidth = grid(num(_RENDERER.getAttr(guide.rc, "x")) - newX),
								newHeight = grid(num(_RENDERER.getAttr(guide.lwc, "y")) - newY);
							$(this).css({"position": "", "left": "", "top": ""});
							if (newWidth >= OG.Constants.GUIDE_MIN_SIZE) {
								_RENDERER.setAttr(guide.lc, {x: newX});
								_RENDERER.setAttr(guide.ul, {x: newX});
								_RENDERER.setAttr(guide.ll, {x: newX});
								_RENDERER.setAttr(guide.uc, {x: OG.Util.round((num(_RENDERER.getAttr(guide.rc, "x")) + newX) / 2)});
								_RENDERER.setAttr(guide.lwc, {x: OG.Util.round((num(_RENDERER.getAttr(guide.rc, "x")) + newX) / 2)});
								_RENDERER.setAttr(guide.bBox, {x: OG.Util.round(newX + num(_RENDERER.getAttr(guide.lc, "width")) / 2), width: newWidth});
							}
							if (newHeight >= OG.Constants.GUIDE_MIN_SIZE) {
								_RENDERER.setAttr(guide.uc, {y: newY});
								_RENDERER.setAttr(guide.ul, {y: newY});
								_RENDERER.setAttr(guide.ur, {y: newY});
								_RENDERER.setAttr(guide.lc, {y: OG.Util.round((num(_RENDERER.getAttr(guide.lwc, "y")) + newY) / 2)});
								_RENDERER.setAttr(guide.rc, {y: OG.Util.round((num(_RENDERER.getAttr(guide.lwc, "y")) + newY) / 2)});
								_RENDERER.setAttr(guide.bBox, {y: OG.Util.round(newY + num(_RENDERER.getAttr(guide.uc, "height")) / 2), height: newHeight});
							}
							_RENDERER.removeAllTerminal();
						},
						stop : function (event) {
							var eventOffset = getOffset(event),
								start = $(this).data("start"),
								dx = start.x - eventOffset.x,
								dy = start.y - eventOffset.y;
							$(this).css({"position": "absolute", "left": "0px", "top": "0px"});
							if (element && element.shape.geom) {
								// resizing
								if (element.shape.geom.getBoundary().getWidth() + dx < OG.Constants.GUIDE_MIN_SIZE) {
									dx = OG.Constants.GUIDE_MIN_SIZE - element.shape.geom.getBoundary().getWidth();
								}
								if (element.shape.geom.getBoundary().getHeight() + dy < OG.Constants.GUIDE_MIN_SIZE) {
									dy = OG.Constants.GUIDE_MIN_SIZE - element.shape.geom.getBoundary().getHeight();
								}
								_RENDERER.resize(element, [grid(dy), 0, grid(dx), 0]);
								_RENDERER.drawGuide(element);
							}
						}
					});

					$(guide.ur).draggable({
						start: function (event) {
							var eventOffset = getOffset(event);
							$(this).data("start", {x: eventOffset.x, y: eventOffset.y});
							$(this).data("offset", {
								x: eventOffset.x - num(_RENDERER.getAttr(guide.ur, "x")),
								y: eventOffset.y - num(_RENDERER.getAttr(guide.ur, "y"))
							});

							_RENDERER.removeRubberBand(_RENDERER.getRootElement());
						},
						drag : function (event) {
							var eventOffset = getOffset(event),
								start = $(this).data("start"),
								offset = $(this).data("offset"),
								newX = grid(eventOffset.x - offset.x),
								newY = grid(eventOffset.y - offset.y),
								newWidth = grid(newX - num(_RENDERER.getAttr(guide.lc, "x"))),
								newHeight = grid(num(_RENDERER.getAttr(guide.lwc, "y")) - newY);
							$(this).css({"position": "", "left": "", "top": ""});
							if (newWidth >= OG.Constants.GUIDE_MIN_SIZE) {
								_RENDERER.setAttr(guide.rc, {x: newX});
								_RENDERER.setAttr(guide.ur, {x: newX});
								_RENDERER.setAttr(guide.lr, {x: newX});
								_RENDERER.setAttr(guide.uc, {x: OG.Util.round((num(_RENDERER.getAttr(guide.lc, "x")) + newX) / 2)});
								_RENDERER.setAttr(guide.lwc, {x: OG.Util.round((num(_RENDERER.getAttr(guide.lc, "x")) + newX) / 2)});
								_RENDERER.setAttr(guide.bBox, {width: newWidth});
							}
							if (newHeight >= OG.Constants.GUIDE_MIN_SIZE) {
								_RENDERER.setAttr(guide.uc, {y: newY});
								_RENDERER.setAttr(guide.ul, {y: newY});
								_RENDERER.setAttr(guide.ur, {y: newY});
								_RENDERER.setAttr(guide.lc, {y: OG.Util.round((num(_RENDERER.getAttr(guide.lwc, "y")) + newY) / 2)});
								_RENDERER.setAttr(guide.rc, {y: OG.Util.round((num(_RENDERER.getAttr(guide.lwc, "y")) + newY) / 2)});
								_RENDERER.setAttr(guide.bBox, {y: OG.Util.round(newY + num(_RENDERER.getAttr(guide.uc, "width")) / 2), height: newHeight});
							}
							_RENDERER.removeAllTerminal();
						},
						stop : function (event) {
							var eventOffset = getOffset(event),
								start = $(this).data("start"),
								dx = eventOffset.x - start.x,
								dy = start.y - eventOffset.y;
							$(this).css({"position": "absolute", "left": "0px", "top": "0px"});
							if (element && element.shape.geom) {
								// resizing
								if (element.shape.geom.getBoundary().getWidth() + dx < OG.Constants.GUIDE_MIN_SIZE) {
									dx = OG.Constants.GUIDE_MIN_SIZE - element.shape.geom.getBoundary().getWidth();
								}
								if (element.shape.geom.getBoundary().getHeight() + dy < OG.Constants.GUIDE_MIN_SIZE) {
									dy = OG.Constants.GUIDE_MIN_SIZE - element.shape.geom.getBoundary().getHeight();
								}
								_RENDERER.resize(element, [grid(dy), 0, 0, grid(dx)]);
								_RENDERER.drawGuide(element);
							}
						}
					});
				}
			}
		} else {
			if ($(element).attr("_shape") === OG.Constants.SHAPE_TYPE.EDGE) {
				_RENDERER.setAttr(guide.from, {cursor: 'default'});
				_RENDERER.setAttr(guide.to, {cursor: 'default'});
				$.each(guide.controls, function (idx, item) {
					_RENDERER.setAttr(item, {cursor: 'default'});
				});
			} else {
				_RENDERER.setAttr(guide.ul, {cursor: 'default'});
				_RENDERER.setAttr(guide.ur, {cursor: 'default'});
				_RENDERER.setAttr(guide.ll, {cursor: 'default'});
				_RENDERER.setAttr(guide.lr, {cursor: 'default'});
				_RENDERER.setAttr(guide.lc, {cursor: 'default'});
				_RENDERER.setAttr(guide.uc, {cursor: 'default'});
				_RENDERER.setAttr(guide.rc, {cursor: 'default'});
				_RENDERER.setAttr(guide.lwc, {cursor: 'default'});
			}
		}
	};

	/**
	 * 선택되어진 Shape 부모노드가 하나라도 있다면 true 를 반환한다.
	 *
	 * @param {Element} element
	 * @return {Boolean}
	 */
	isParentSelected = function (element) {
		var parentNode = element.parentNode;
		if (parentNode) {
			if (isParentSelected(parentNode)) {
				return true;
			}

			if ($(parentNode).attr("_type") === OG.Constants.NODE_TYPE.SHAPE &&
				$(parentNode).attr("_selected") === "true") {
				return true;
			}
		}

		return false;
	};

	/**
	 * 하위 Shape 자식노드를 모두 deselect 처리한다.
	 *
	 * @param {Element} element
	 */
	deselectChildren = function (element) {
		var children = element.childNodes;
		$.each(children, function (idx, item) {
			if ($(item).attr("_type") === OG.Constants.NODE_TYPE.SHAPE) {
				if (item.childNodes.length > 0) {
					deselectChildren(item);
				}

				if ($(item).attr("_selected") === "true") {
					_RENDERER.removeGuide(item);
					$(item).draggable("destroy");
				}
			}
		});
	};

	/**
	 * 그룹 Shape 인 경우 포함된 하위 Shape 들을 복사한다.
	 *
	 * @param {Element} element 원본 부모 Shape 엘리먼트
	 * @param {Element} newCopiedElement 복사된 부모 Shape 엘리먼트
	 */
	copyChildren = function (element, newCopiedElement) {
		var children = element.childNodes;
		$.each(children, function (idx, item) {
			if ($(item).attr("_type") === OG.Constants.NODE_TYPE.SHAPE) {
				// copy
				var boundary = item.shape.geom.getBoundary(), newShape, newElement, newGuide;
				newShape = item.shape.clone();

				if ($(item).attr("_shape") === OG.Constants.SHAPE_TYPE.EDGE) {
					newShape.geom = new OG.PolyLine(item.shape.geom.getVertices());
					newShape.geom.style = item.shape.geom.style;
					newShape.geom.move(OG.Constants.COPY_PASTE_PADDING, OG.Constants.COPY_PASTE_PADDING);
					newElement = _RENDERER.drawShape(
						null, newShape,
						null, item.shapeStyle
					);

				} else {
					newElement = _RENDERER.drawShape(
						[ boundary.getCentroid().x + OG.Constants.COPY_PASTE_PADDING, boundary.getCentroid().y + OG.Constants.COPY_PASTE_PADDING ],
						newShape, [boundary.getWidth(), boundary.getHeight()], item.shapeStyle
					);
				}

				// custom data
				newElement.data = item.data;

				// append child
				newCopiedElement.appendChild(newElement);

				// enable event
				_HANDLER.setClickSelectable(newElement, OG.Constants.SELECTABLE);
				_HANDLER.setMovable(newElement, OG.Constants.SELECTABLE && OG.Constants.MOVABLE);
				if (OG.Constants.GROUP_DROPABLE) {
					_HANDLER.enableDragAndDropGroup(newElement);
				}
				if (OG.Constants.GROUP_COLLAPSIBLE) {
					_HANDLER.enableCollapse(newElement);
				}
				if ($(newElement).attr("_shape") !== OG.Constants.SHAPE_TYPE.GROUP) {
					if (OG.Constants.CONNECTABLE) {
						_HANDLER.enableConnect(newElement);
					}
					if (OG.Constants.LABEL_EDITABLE) {
						_HANDLER.enableEditLabel(newElement);
					}
				}

				// recursive call
				if (item.childNodes.length > 0) {
					copyChildren(item, newElement);
				}
			}
		});
	};

	/**
	 * Canvas 영역을 벗어나서 드래그되는 경우 Canvas 확장한다.
	 *
	 * @param {Number} currentX
	 * @param {Number} currentY
	 */
	autoExtend = function (currentX, currentY) {
		var rootBBox = _RENDERER.getRootBBox();

		// Canvas 영역을 벗어나서 드래그되는 경우 Canvas 확장
		if (OG.Constants.AUTO_EXTENSIONAL && rootBBox.width < currentX * OG.Constants.SCALE) {
			_RENDERER.setCanvasSize([ rootBBox.width + OG.Constants.AUTO_EXTENSION_SIZE, rootBBox.height]);
		}
		if (OG.Constants.AUTO_EXTENSIONAL && rootBBox.height < currentY * OG.Constants.SCALE) {
			_RENDERER.setCanvasSize([ rootBBox.width, rootBBox.height + OG.Constants.AUTO_EXTENSION_SIZE]);
		}
	};

	this.setResizable = setResizable;
	this.deleteSelectedShape = deleteSelectedShape;
	this.selectShape = selectShape;
	this.selectAll = selectAll;
	this.copySelectedShape = copySelectedShape;
	this.cutSelectedShape = cutSelectedShape;
	this.pasteSelectedShape = pasteSelectedShape;
	this.duplicateSelectedShape = duplicateSelectedShape;
	this.groupSelectedShape = groupSelectedShape;
	this.ungroupSelectedShape = ungroupSelectedShape;
	this.rotateSelectedShape = rotateSelectedShape;
	this.setLineWidthSelectedShape = setLineWidthSelectedShape;
	this.setLineColorSelectedShape = setLineColorSelectedShape;
	this.setLineTypeSelectedShape = setLineTypeSelectedShape;
	this.setLineStyleSelectedShape = setLineStyleSelectedShape;
	this.setArrowStartSelectedShape = setArrowStartSelectedShape;
	this.setArrowEndSelectedShape = setArrowEndSelectedShape;
	this.setFillColorSelectedShape = setFillColorSelectedShape;
	this.setFillOpacitySelectedShape = setFillOpacitySelectedShape;
	this.setFontFamilySelectedShape = setFontFamilySelectedShape;
	this.setFontSizeSelectedShape = setFontSizeSelectedShape;
	this.setFontColorSelectedShape = setFontColorSelectedShape;
	this.setFontWeightSelectedShape = setFontWeightSelectedShape;
	this.setFontStyleSelectedShape = setFontStyleSelectedShape;
	this.setTextDecorationSelectedShape = setTextDecorationSelectedShape;
	this.setLabelDirectionSelectedShape = setLabelDirectionSelectedShape;
	this.setLabelAngleSelectedShape = setLabelAngleSelectedShape;
	this.setLabelPositionSelectedShape = setLabelPositionSelectedShape;
	this.setLabelVerticalSelectedShape = setLabelVerticalSelectedShape;
	this.setLabelHorizontalSelectedShape = setLabelHorizontalSelectedShape;
	this.setLabelSelectedShape = setLabelSelectedShape;
	this.setEdgeFromLabelSelectedShape = setEdgeFromLabelSelectedShape;
	this.setEdgeToLabelSelectedShape = setEdgeToLabelSelectedShape;
	this.zoomIn = zoomIn;
	this.zoomOut = zoomOut;
	this.fitWindow = fitWindow;

	/**
	 * 주어진 Shape Element 의 라벨을 수정 가능하도록 한다.
	 *
	 * @param {Element} element Shape Element
	 */
	this.enableEditLabel = function (element) {
		if (($(element).attr("_shape") === OG.Constants.SHAPE_TYPE.GEOM && OG.Constants.LABEL_EDITABLE_GEOM) ||
			($(element).attr("_shape") === OG.Constants.SHAPE_TYPE.TEXT && OG.Constants.LABEL_EDITABLE_TEXT) ||
			($(element).attr("_shape") === OG.Constants.SHAPE_TYPE.HTML && OG.Constants.LABEL_EDITABLE_HTML) ||
			($(element).attr("_shape") === OG.Constants.SHAPE_TYPE.IMAGE && OG.Constants.LABEL_EDITABLE_IMAGE) ||
			($(element).attr("_shape") === OG.Constants.SHAPE_TYPE.EDGE && OG.Constants.LABEL_EDITABLE_EDGE) ||
			($(element).attr("_shape") === OG.Constants.SHAPE_TYPE.GROUP && OG.Constants.LABEL_EDITABLE_GROUP)) {

			$(element).bind({
				dblclick: function (event) {
					var container = _RENDERER.getContainer(),
						envelope = element.shape.geom.getBoundary(),
						upperLeft = envelope.getUpperLeft(),
						bBox,
						left = (upperLeft.x - 1) * OG.Constants.SCALE,
						top = (upperLeft.y - 1) * OG.Constants.SCALE,
						width = envelope.getWidth() * OG.Constants.SCALE,
						height = envelope.getHeight() * OG.Constants.SCALE,
						editorId = element.id + OG.Constants.LABEL_EDITOR_SUFFIX,
						labelEditor,
						textAlign = "center",
						fromLabel,
						toLabel,
						/**
						 * 라인(꺽은선)의 중심위치를 반환한다.
						 *
						 * @param {Element} element Edge 엘리먼트
						 * @return {OG.Coordinate}
						 */
							getCenterOfEdge = function (element) {
							var vertices, lineLength, distance = 0, i, intersectArray;

							// Edge Shape 인 경우 라인의 중간 지점 찾기
							vertices = element.shape.geom.getVertices();
							lineLength = element.shape.geom.getLength();

							for (i = 0; i < vertices.length - 1; i++) {
								distance += vertices[i].distance(vertices[i + 1]);
								if (distance > lineLength / 2) {
									intersectArray = element.shape.geom.intersectCircleToLine(
										vertices[i + 1], distance - lineLength / 2, vertices[i + 1], vertices[i]
									);

									break;
								}
							}

							return intersectArray[0];
						},
						centerOfEdge;

					// textarea
					$(container).append("<textarea id='" + element.id + OG.Constants.LABEL_EDITOR_SUFFIX + "'></textarea>");
					labelEditor = $("#" + editorId);

					// text-align 스타일 적용
					switch (element.shape.geom.style.get("text-anchor")) {
					case "start":
						textAlign = "left";
						break;
					case "middle":
						textAlign = "center";
						break;
					case "end":
						textAlign = "right";
						break;
					default:
						textAlign = "center";
						break;
					}

					if ($(element).attr("_shape") === OG.Constants.SHAPE_TYPE.HTML) {
						// Html Shape
						$(labelEditor).css(OG.Util.apply(OG.Constants.DEFAULT_STYLE.LABEL_EDITOR, {
							left: left, top: top, width: width, height: height, "text-align": 'left', overflow: "hidden", resize: "none"
						}));
						$(labelEditor).focus();
						$(labelEditor).val(element.shape.html);

						$(labelEditor).bind({
							focusout: function () {
								element.shape.html = this.value;
								if (element.shape.html) {
									_RENDERER.redrawShape(element);
									this.parentNode.removeChild(this);
								} else {
									_RENDERER.removeShape(element);
									this.parentNode.removeChild(this);
								}
							}
						});
					} else if ($(element).attr("_shape") === OG.Constants.SHAPE_TYPE.TEXT) {
						// Text Shape
						$(labelEditor).css(OG.Util.apply(OG.Constants.DEFAULT_STYLE.LABEL_EDITOR, {
							left: left, top: top, width: width, height: height, "text-align": textAlign, overflow: "hidden", resize: "none"
						}));
						$(labelEditor).focus();
						$(labelEditor).val(element.shape.text);

						$(labelEditor).bind({
							focusout: function () {
								element.shape.text = this.value;
								if (element.shape.text) {
									_RENDERER.redrawShape(element);
									this.parentNode.removeChild(this);
								} else {
									_RENDERER.removeShape(element);
									this.parentNode.removeChild(this);
								}
							}
						});
					} else if ($(element).attr("_shape") === OG.Constants.SHAPE_TYPE.EDGE) {
						// Edge Shape
						if (element.shape.label && _RENDERER.isSVG()) {
							$(element).children('[id$=_LABEL]').each(function (idx, item) {
								$(item).find("text").each(function (idx2, item2) {
									bBox = _RENDERER.getBBox(item2);
									left = bBox.x - 10;
									top = bBox.y;
									width = bBox.width + 20;
									height = bBox.height;
								});
							});
						} else {
							centerOfEdge = getCenterOfEdge(element);
							left = centerOfEdge.x - OG.Constants.LABEL_EDITOR_WIDTH / 2;
							top = centerOfEdge.y - OG.Constants.LABEL_EDITOR_HEIGHT / 2;
							width = OG.Constants.LABEL_EDITOR_WIDTH;
							height = OG.Constants.LABEL_EDITOR_HEIGHT;
						}

						// 시작점 라벨인 경우
						$(event.srcElement).parents('[id$=_FROMLABEL]').each(function (idx, item) {
							$(item).find("text").each(function (idx2, item2) {
								bBox = _RENDERER.getBBox(item2);
								left = bBox.x - 10;
								top = bBox.y;
								width = bBox.width + 20;
								height = bBox.height;
								fromLabel = element.shape.fromLabel;
							});
						});

						// 끝점 라벨인 경우
						$(event.srcElement).parents('[id$=_TOLABEL]').each(function (idx, item) {
							$(item).find("text").each(function (idx2, item2) {
								bBox = _RENDERER.getBBox(item2);
								left = bBox.x - 10;
								top = bBox.y;
								width = bBox.width + 20;
								height = bBox.height;
								toLabel = element.shape.toLabel;
							});
						});

						$(labelEditor).css(OG.Util.apply(OG.Constants.DEFAULT_STYLE.LABEL_EDITOR, {
							left    : left * OG.Constants.SCALE,
							top     : top * OG.Constants.SCALE,
							width   : width * OG.Constants.SCALE,
							height  : height * OG.Constants.SCALE,
							overflow: "hidden",
							resize  : "none"
						}));
						$(labelEditor).focus();

						if (fromLabel || toLabel) {
							$(labelEditor).val(fromLabel ? element.shape.fromLabel : element.shape.toLabel);
						} else {
							$(labelEditor).val(element.shape.label);
						}

						$(labelEditor).bind({
							focusout: function () {
								if (fromLabel) {
									_RENDERER.drawEdgeLabel(element, this.value, 'FROM');
								} else if (toLabel) {
									_RENDERER.drawEdgeLabel(element, this.value, 'TO');
								} else {
									_RENDERER.drawLabel(element, this.value);
								}

								this.parentNode.removeChild(this);
							}
						});
					} else {
						$(labelEditor).css(OG.Util.apply(OG.Constants.DEFAULT_STYLE.LABEL_EDITOR, {
							left: left, top: top, width: width, height: height, "text-align": textAlign, overflow: "hidden", resize: "none"
						}));
						$(labelEditor).focus();
						$(labelEditor).val(element.shape.label);

						$(labelEditor).bind({
							focusout: function () {
								_RENDERER.drawLabel(element, this.value);
								this.parentNode.removeChild(this);
							}
						});
					}
				}
			});
		}
	};

	/**
	 * 주어진 Shape Element 를 연결가능하도록 한다.
	 *
	 * @param {Element} element Shape Element
	 */
	this.enableConnect = function (element) {
		var terminalGroup, root = _RENDERER.getRootGroup();
		if (element && $(element).attr("_shape") !== OG.Constants.SHAPE_TYPE.GROUP) {
			$(element).bind({
				mouseover: function () {
					terminalGroup = _RENDERER.drawTerminal(element,
						$(root).data("dragged_guide") === "to" ? OG.Constants.TERMINAL_TYPE.IN : OG.Constants.TERMINAL_TYPE.OUT);

					if (terminalGroup && terminalGroup.terminal && terminalGroup.terminal.childNodes.length > 0) {
						// 센터 연결 터미널 찾기
						if ($(root).data("edge")) {
							$.each(terminalGroup.terminal.childNodes, function (idx, item) {
								var fromTerminal = $(root).data("from_terminal"),
									fromShape = fromTerminal && OG.Util.isElement(fromTerminal) ? getShapeFromTerminal(fromTerminal) : null,
									isSelf = element && fromShape && element.id === fromShape.id;

								if (item.terminal && item.terminal.direction.toLowerCase() === "c"
									&& (($(root).data("dragged_guide") === "to" && item.terminal.inout.indexOf(OG.Constants.TERMINAL_TYPE.IN) >= 0) ||
									($(root).data("dragged_guide") === "from" && item.terminal.inout.indexOf(OG.Constants.TERMINAL_TYPE.OUT) >= 0))
									&& (!isSelf || OG.Constants.SELF_CONNECTABLE)) {
									_RENDERER.drawDropOverGuide(element);
									$(root).data("edge_terminal", item);
									return false;
								}
							});
						}

						$(terminalGroup.bBox).bind({
							mouseout: function () {
								if (!$(root).data("edge")) {
									_RENDERER.removeTerminal(element);
								}
							}
						});

						$.each(terminalGroup.terminal.childNodes, function (idx, item) {
							if (item.terminal) {
								$(item).bind({
									mouseover: function (event) {
										var fromTerminal = $(root).data("from_terminal"),
											fromShape = fromTerminal && OG.Util.isElement(fromTerminal) ? getShapeFromTerminal(fromTerminal) : null,
											isSelf = element && fromShape && element.id === fromShape.id;

										if ((($(root).data("dragged_guide") === "to" && item.terminal.inout.indexOf(OG.Constants.TERMINAL_TYPE.IN) >= 0) ||
											($(root).data("dragged_guide") === "from" && item.terminal.inout.indexOf(OG.Constants.TERMINAL_TYPE.OUT) >= 0) ||
											(!$(root).data("dragged_guide") && item.terminal.inout.indexOf(OG.Constants.TERMINAL_TYPE.OUT) >= 0))
											&& (!isSelf || OG.Constants.SELF_CONNECTABLE)) {
											_RENDERER.setAttr(item, OG.Constants.DEFAULT_STYLE.TERMINAL_OVER);
											$(root).data("edge_terminal", item);
										}
									},
									mouseout : function () {
										_RENDERER.setAttr(item, OG.Constants.DEFAULT_STYLE.TERMINAL);
										$(root).removeData("edge_terminal");
									}
								});

								$(item).draggable({
									start: function (event) {
										var x = item.terminal.position.x, y = item.terminal.position.y,
											edge = _RENDERER.drawShape(null, new OG.EdgeShape([x, y], [x, y]), null,
												OG.Constants.DEFAULT_STYLE.EDGE_SHADOW);

										$(root).data("edge", edge);
										$(root).data("from_terminal", item);
										$(root).data("dragged_guide", "to");

										_RENDERER.removeRubberBand(_RENDERER.getRootElement());
										$(_RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (n, selectedItem) {
											if (selectedItem.id) {
												_RENDERER.removeGuide(selectedItem);
											}
										});
									},
									drag : function (event) {
										var eventOffset = getOffset(event),
											edge = $(root).data("edge"),
											fromTerminal = $(root).data("from_terminal"),
											toTerminal = $(root).data("edge_terminal"),
											fromXY = [fromTerminal.terminal.position.x, fromTerminal.terminal.position.y],
											toXY = toTerminal ?
												[toTerminal.terminal.position.x, toTerminal.terminal.position.y] :
												[eventOffset.x, eventOffset.y],
											fromDrct = fromTerminal.terminal.direction.toLowerCase(),
											toDrct = toTerminal ? toTerminal.terminal.direction.toLowerCase() : "c",
											toShape = toTerminal ? getShapeFromTerminal(toTerminal) : null,
											orgFromXY, orgToXY, intersectionInfo, isSelf;

										$(this).css({"position": "", "left": "", "top": ""});

										// backup edge-direction
										orgFromXY = fromXY;
										orgToXY = toXY;

										// direction 이 c 인 경우에 대한 처리(센터 연결)
										if (!element.shape.geom.getBoundary().isContains(toXY) && fromDrct === "c") {
											intersectionInfo = _RENDERER.intersectionEdge(
												edge.shape.geom.style.get("edge-type"), element, [orgFromXY[0], orgFromXY[1]], [orgToXY[0], orgToXY[1]], true
											);
											fromXY = intersectionInfo.position;
											fromDrct = intersectionInfo.direction;
										}
										if (toShape && toDrct === "c") {
											intersectionInfo = _RENDERER.intersectionEdge(
												edge.shape.geom.style.get("edge-type"), toShape, [orgFromXY[0], orgFromXY[1]], [orgToXY[0], orgToXY[1]], false
											);
											toXY = intersectionInfo.position;
											toDrct = intersectionInfo.direction;
										}

										isSelf = element && toShape && element.id === toShape.id;
										if (isSelf) {
											fromXY = toXY = element.shape.geom.getBoundary().getRightCenter();
										}

										if (!isSelf || OG.Constants.SELF_CONNECTABLE) {
											_RENDERER.drawEdge(new OG.Line(fromXY, toXY),
												OG.Util.apply(edge.shape.geom.style.map, {"edge-direction": fromDrct + " " + toDrct}), edge.id, isSelf);
										}
									},
									stop : function (event) {
										var to = getOffset(event),
											edge = $(root).data("edge"),
											fromTerminal = $(root).data("from_terminal"),
											toTerminal = $(root).data("edge_terminal") || [to.x, to.y],
											toShape = OG.Util.isElement(toTerminal) ? getShapeFromTerminal(toTerminal) : null,
											boundary, clonedElement, terminalGroup, childTerminals, guide, i, isSelf;

										$(this).css({"position": "absolute", "left": "0px", "top": "0px"});

										// 연결대상이 없으면 복사후 연결
										if (!$(root).data("edge_terminal") && OG.Constants.CONNECT_CLONEABLE) {
											boundary = element.shape.geom.getBoundary();
											clonedElement = _RENDERER.drawShape([to.x, to.y], element.shape.clone(),
												[boundary.getWidth(), boundary.getHeight()], element.shapeStyle);

											// enable event
											_HANDLER.setClickSelectable(clonedElement, OG.Constants.SELECTABLE);
											_HANDLER.setMovable(clonedElement, OG.Constants.SELECTABLE && OG.Constants.MOVABLE);
											if (OG.Constants.GROUP_DROPABLE) {
												_HANDLER.enableDragAndDropGroup(clonedElement);
											}
											if (OG.Constants.GROUP_COLLAPSIBLE) {
												_HANDLER.enableCollapse(clonedElement);
											}
											if ($(clonedElement).attr("_shape") !== OG.Constants.SHAPE_TYPE.GROUP) {
												if (OG.Constants.CONNECTABLE) {
													_HANDLER.enableConnect(clonedElement);
												}
												if (OG.Constants.LABEL_EDITABLE) {
													_HANDLER.enableEditLabel(clonedElement);
												}
											}

											// 센터 연결 터미널 찾기
											terminalGroup = _RENDERER.drawTerminal(clonedElement, OG.Constants.TERMINAL_TYPE.IN);
											childTerminals = terminalGroup.terminal.childNodes;
											toTerminal = childTerminals[0];
											for (i = 0; i < childTerminals.length; i++) {
												if (childTerminals[i].terminal && childTerminals[i].terminal.direction.toLowerCase() === "c") {
													toTerminal = childTerminals[i];
													break;
												}
											}
										}

										isSelf = element && toShape && element.id === toShape.id;

										if (toTerminal && (OG.Util.isElement(toTerminal) || !OG.Constants.CONNECT_REQUIRED)
											&& (!isSelf || OG.Constants.SELF_CONNECTABLE)) {
											// connect
											edge = _RENDERER.connect(fromTerminal, toTerminal, edge);
											if (edge) {
												guide = _RENDERER.drawGuide(edge);

												if (edge && guide) {
													// enable event
													_HANDLER.setClickSelectable(edge, OG.Constants.SELECTABLE);
													_HANDLER.setMovable(edge, OG.Constants.SELECTABLE && OG.Constants.MOVABLE);
													setResizable(edge, guide, OG.Constants.SELECTABLE && OG.Constants.RESIZABLE);
													if ($(edge).attr("_shape") !== OG.Constants.SHAPE_TYPE.GROUP) {
														if (OG.Constants.LABEL_EDITABLE) {
															_HANDLER.enableEditLabel(edge);
														}
													}

													_RENDERER.toFront(guide.group);
												}
											}
										} else {
											_RENDERER.removeShape(edge);
										}

										// clear
										$(root).removeData("edge");
										$(root).removeData("from_terminal");
										$(root).removeData("edge_terminal");
										$(root).removeData("dragged_guide");
										if (toShape) {
											_RENDERER.remove(toShape.id + OG.Constants.DROP_OVER_BBOX_SUFFIX);
										}
									}
								});
							}
						});
					} else {
						_RENDERER.removeTerminal(element);
					}
				},
				mouseout : function (event) {
					if ($(element).attr("_shape") !== OG.Constants.SHAPE_TYPE.EDGE && $(root).data("edge")) {
						_RENDERER.remove(element.id + OG.Constants.DROP_OVER_BBOX_SUFFIX);
						$(root).removeData("edge_terminal");
					}
				}
			});
		}
	};

	/**
	 * 주어진 Shape Element 를 Drag & Drop 으로 그룹핑 가능하도록 한다.
	 *
	 * @param {Element} element Shape Element
	 */
	this.enableDragAndDropGroup = function (element) {
		var root = _RENDERER.getRootGroup(), isSelf;
		if (element && $(element).attr("_shape") === OG.Constants.SHAPE_TYPE.GROUP) {
			$(element).bind({
				mouseover: function () {
					// Drag & Drop 하여 그룹핑하는 경우 가이드 표시
					if ($(root).data("bBoxArray")) {
						isSelf = false;
						$.each($(root).data("bBoxArray"), function (idx, item) {
							if (element.id === item.id) {
								isSelf = true;
							}
						});

						if (!isSelf) {
							$(root).data("groupTarget", element);
							_RENDERER.drawDropOverGuide(element);
						}
					}
				},
				mouseout : function (event) {
					// Drag & Drop 하여 그룹핑하는 경우 가이드 제거
					_RENDERER.remove(element.id + OG.Constants.DROP_OVER_BBOX_SUFFIX);
					$(root).removeData("groupTarget");
				}
			});
		}
	};

	/**
	 * 주어진 Shape Element 를 Collapse/Expand 가능하도록 한다.
	 *
	 * @param {Element} element Shape Element
	 */
	this.enableCollapse = function (element) {
		var collapseObj, clickHandle;

		clickHandle = function (_element, _collapsedOjb) {
			if (_collapsedOjb && _collapsedOjb.bBox && _collapsedOjb.collapse) {
				$(_collapsedOjb.collapse).bind("click", function (event) {
					if (_element.shape.isCollapsed === true) {
						_RENDERER.expand(_element);
						_collapsedOjb = _RENDERER.drawCollapseGuide(_element);
						clickHandle(_element, _collapsedOjb);
					} else {
						_RENDERER.collapse(_element);
						_collapsedOjb = _RENDERER.drawCollapseGuide(_element);
						clickHandle(_element, _collapsedOjb);
					}
				});

				$(_collapsedOjb.bBox).bind("mouseout", function (event) {
					_RENDERER.remove(_element.id + OG.Constants.COLLAPSE_BBOX);
					_RENDERER.remove(_element.id + OG.Constants.COLLAPSE_SUFFIX);
				});
			}
		};

		if (element && $(element).attr("_shape") === OG.Constants.SHAPE_TYPE.GROUP) {
			$(element).bind({
				mouseover: function () {
					collapseObj = _RENDERER.drawCollapseGuide(this);
					if (collapseObj && collapseObj.bBox && collapseObj.collapse) {
						clickHandle(element, collapseObj);
					}
				}
			});
		}
	};


	/**
	 * Shape 엘리먼트의 이동 가능여부를 설정한다.
	 *
	 * @param {Element} element Shape 엘리먼트
	 * @param {Boolean} isMovable 가능여부
	 */
	this.setMovable = function (element, isMovable) {
		var root = _RENDERER.getRootGroup();

		if (!element) {
			return;
		}

		if (isMovable) {
			if (($(element).attr("_shape") === OG.Constants.SHAPE_TYPE.GEOM && OG.Constants.MOVABLE_GEOM) ||
				($(element).attr("_shape") === OG.Constants.SHAPE_TYPE.TEXT && OG.Constants.MOVABLE_TEXT) ||
				($(element).attr("_shape") === OG.Constants.SHAPE_TYPE.HTML && OG.Constants.MOVABLE_HTML) ||
				($(element).attr("_shape") === OG.Constants.SHAPE_TYPE.IMAGE && OG.Constants.MOVABLE_IMAGE) ||
				($(element).attr("_shape") === OG.Constants.SHAPE_TYPE.EDGE && OG.Constants.MOVABLE_EDGE) ||
				($(element).attr("_shape") === OG.Constants.SHAPE_TYPE.GROUP && OG.Constants.MOVABLE_GROUP)) {

				// move handle
				$(element).draggable({
					start: function (event) {
						var eventOffset = getOffset(event), guide;

						// 선택되지 않은 Shape 을 drag 시 다른 모든 Shape 은 deselect 처리
						if (_RENDERER.getElementById(element.id + OG.Constants.GUIDE_SUFFIX.GUIDE) === null) {
							$(_RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (index, item) {
								if (OG.Util.isElement(item) && item.id) {
									_RENDERER.removeGuide(item);
								}
							});
							_RENDERER.removeAllTerminal();
						}

						// redraw guide
						_RENDERER.removeGuide(element);
						guide = _RENDERER.drawGuide(element);

						$(this).data("start", {x: eventOffset.x, y: eventOffset.y});
						$(this).data("offset", {
							x: eventOffset.x - num(_RENDERER.getAttr(guide.bBox, "x")),
							y: eventOffset.y - num(_RENDERER.getAttr(guide.bBox, "y"))
						});

						$(root).data("bBoxArray", getMoveTargets());
						_RENDERER.removeRubberBand(_RENDERER.getRootElement());
						_RENDERER.removeAllTerminal();
					},
					drag : function (event) {
						var eventOffset = getOffset(event),
							start = $(this).data("start"),
							bBoxArray = $(root).data("bBoxArray"),
							dx = grid(eventOffset.x - start.x),
							dy = grid(eventOffset.y - start.y);

						// Canvas 영역을 벗어나서 드래그되는 경우 Canvas 확장
						autoExtend(eventOffset.x, eventOffset.y);

						$(this).css({"position": "", "left": "", "top": ""});
						$.each(bBoxArray, function (k, item) {
							_RENDERER.setAttr(item.box, {transform: "t" + dx + "," + dy});
						});
						_RENDERER.removeAllTerminal();
					},
					stop : function (event) {
						var eventOffset = getOffset(event),
							start = $(this).data("start"),
							bBoxArray = $(root).data("bBoxArray"),
							dx = grid(eventOffset.x - start.x),
							dy = grid(eventOffset.y - start.y),
							groupTarget = $(root).data("groupTarget"),
							eleArray,
							guide;

						// 이동 처리
						$(this).css({"position": "", "left": "", "top": ""});
						eleArray = moveElements(bBoxArray, dx, dy);

						// group target 이 있는 경우 grouping 처리
						if (groupTarget && OG.Util.isElement(groupTarget)) {
							// grouping
							_RENDERER.addToGroup(groupTarget, eleArray);

							// guide
							$.each(eleArray, function (k, item) {
								_RENDERER.removeGuide(item);
							});
							guide = _RENDERER.drawGuide(groupTarget);
							// enable event
							setResizable(groupTarget, guide, OG.Constants.SELECTABLE && OG.Constants.RESIZABLE);
							_RENDERER.toFront(guide.group);

							_RENDERER.remove(groupTarget.id + OG.Constants.DROP_OVER_BBOX_SUFFIX);
							$(root).removeData("groupTarget");
						} else {
							// ungrouping
							_RENDERER.addToGroup(root, eleArray);

							// guide
							$.each(eleArray, function (k, item) {
								_RENDERER.removeGuide(item);
								guide = _RENDERER.drawGuide(item);
								// enable event
								setResizable(item, guide, OG.Constants.SELECTABLE && OG.Constants.RESIZABLE);
								_RENDERER.toFront(guide.group);
							});
						}

						$(root).removeData("bBoxArray");
					}
				});
				_RENDERER.setAttr(element, {cursor: 'move'});
				OG.Util.apply(element.shape.geom.style.map, {cursor: 'move'});
			}
		} else {
			$(element).draggable("destroy");
			_RENDERER.setAttr(element, {cursor: OG.Constants.SELECTABLE ? 'pointer' : OG.Constants.DEFAULT_STYLE.SHAPE.cursor});
			OG.Util.apply(element.shape.geom.style.map, {cursor: OG.Constants.SELECTABLE ? 'pointer' : OG.Constants.DEFAULT_STYLE.SHAPE.cursor});
		}
	};

	/**
	 * 주어진 Shape Element 를 마우스 클릭하여 선택가능하도록 한다.
	 * 선택가능해야 리사이즈가 가능하다.
	 *
	 * @param {Element} element Shape Element
	 * @param {Boolean} isSelectable 선택가능여부
	 */
	this.setClickSelectable = function (element, isSelectable) {
		if (isSelectable) {
			// 마우스 클릭하여 선택 처리
			$(element).bind("click", function (event) {
				var guide;

				$(_RENDERER.getContainer()).focus();

				if (element.shape) {
					if (!event.shiftKey && !event.ctrlKey) {
						$(_RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (index, item) {
							if (item.id) {
								_RENDERER.removeGuide(item);
							}
						});
					}

					if ($(element).attr("_selected") === "true") {
						if (event.shiftKey || event.ctrlKey) {
							_RENDERER.removeGuide(element);
						}
					} else {
						deselectChildren(element);
						if (!isParentSelected(element)) {
							guide = _RENDERER.drawGuide(element);
							if (guide) {
								// enable event
								setResizable(element, guide, OG.Constants.SELECTABLE && OG.Constants.RESIZABLE);
								_RENDERER.removeAllTerminal();
								_RENDERER.toFront(guide.group);
							}
						}
					}

					return false;
				}
			});

			// 마우스 우클릭하여 선택 처리
			if (OG.Constants.ENABLE_CONTEXTMENU) {
				$(element).bind("contextmenu", function (event) {
					var guide;
					if (element.shape) {
						if ($(element).attr("_selected") !== "true") {
							$(_RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (index, item) {
								if (item.id) {
									_RENDERER.removeGuide(item);
								}
							});

							deselectChildren(element);
							if (!isParentSelected(element)) {
								guide = _RENDERER.drawGuide(element);
								if (guide) {
									// enable event
									setResizable(element, guide, OG.Constants.SELECTABLE && OG.Constants.RESIZABLE);
									_RENDERER.removeAllTerminal();
									_RENDERER.toFront(guide.group);
								}
							}
						}

						return true;
					}
				});
			}

			if (isSelectable && OG.Constants.MOVABLE) {
				_RENDERER.setAttr(element, {cursor: 'move'});
				OG.Util.apply(element.shape.geom.style.map, {cursor: 'move'});
			} else {
				_RENDERER.setAttr(element, {cursor: 'pointer'});
				OG.Util.apply(element.shape.geom.style.map, {cursor: 'pointer'});
			}
		} else {
			$(element).click("destroy");
			_RENDERER.setAttr(element, {cursor: OG.Constants.DEFAULT_STYLE.SHAPE.cursor});
			OG.Util.apply(element.shape.geom.style.map, {cursor: OG.Constants.DEFAULT_STYLE.SHAPE.cursor});
		}
	};

	/**
	 * 마우스 드래그 영역지정 선택가능여부를 설정한다.
	 * 선택가능해야 리사이즈가 가능하다.
	 *
	 * @param {Boolean} isSelectable 선택가능여부
	 */
	this.setDragSelectable = function (isSelectable) {
		var rootEle = _RENDERER.getRootElement();

		// 배경클릭한 경우 deselect 하도록
		$(rootEle).bind("click", function (event) {
			var dragBox = $(this).data("dragBox");
			$(_RENDERER.getContainer()).focus();
			if (!dragBox || (dragBox && dragBox.width < 1 && dragBox.height < 1)) {
				$(_RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "][_selected=true]").each(function (index, item) {
					if (OG.Util.isElement(item) && item.id) {
						_RENDERER.removeGuide(item);
					}
				});
				_RENDERER.removeAllTerminal();
			}
		});

		if (isSelectable) {
			// 마우스 영역 드래그하여 선택 처리
			$(rootEle).bind("mousedown", function (event) {
				var eventOffset = getOffset(event);
				$(this).data("dragBox_first", { x: eventOffset.x, y: eventOffset.y});
				_RENDERER.drawRubberBand([eventOffset.x, eventOffset.y]);
			});
			$(rootEle).bind("mousemove", function (event) {
				var first = $(this).data("dragBox_first"),
					eventOffset, width, height, x, y;
				if (first) {
					eventOffset = getOffset(event);
					width = eventOffset.x - first.x;
					height = eventOffset.y - first.y;
					x = width <= 0 ? first.x + width : first.x;
					y = height <= 0 ? first.y + height : first.y;
					_RENDERER.drawRubberBand([x, y], [Math.abs(width), Math.abs(height)]);
				}
			});
			$(rootEle).bind("mouseup", function (event) {
				var first = $(this).data("dragBox_first"),
					eventOffset, width, height, x, y, envelope, guide;
				_RENDERER.removeRubberBand(rootEle);
				if (first) {
					eventOffset = getOffset(event);
					width = eventOffset.x - first.x;
					height = eventOffset.y - first.y;
					x = width <= 0 ? first.x + width : first.x;
					y = height <= 0 ? first.y + height : first.y;
					envelope = new OG.Envelope([x, y], Math.abs(width), Math.abs(height));
					$(_RENDERER.getRootElement()).find("[_type=" + OG.Constants.NODE_TYPE.SHAPE + "]").each(function (index, element) {
						if (element.shape.geom && envelope.isContainsAll(element.shape.geom.getVertices())) {
							deselectChildren(element);
							if (!isParentSelected(element)) {
								guide = _RENDERER.drawGuide(element);
								if (guide) {
									// enable event
									setResizable(element, guide, OG.Constants.SELECTABLE && OG.Constants.RESIZABLE);
									_RENDERER.removeAllTerminal();
								}
							}
						}
					});

					$(this).data("dragBox", {width: width, height: height, x: x, y: y});
				}
			});

			$(rootEle).bind("contextmenu", function (event) {
				_RENDERER.removeRubberBand(rootEle);
			});
		} else {
			$(rootEle).unbind("mousedown");
			$(rootEle).unbind("mousemove");
			$(rootEle).unbind("mouseup");
			$(rootEle).unbind("contextmenu");
		}
	};

	/**
	 * HotKey 사용 가능여부를 설정한다. (Delete, Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+G, Ctrl+U)
	 *
	 * @param {Boolean} isEnableHotKey 핫키가능여부
	 */
	this.setEnableHotKey = function (isEnableHotKey) {
		if (isEnableHotKey) {
			// delete, ctrl+A
			$(_RENDERER.getContainer()).bind("keydown", function (event) {
				// Delete : 삭제
				if (OG.Constants.ENABLE_HOTKEY_DELETE && event.keyCode === KeyEvent.DOM_VK_DELETE) {
					deleteSelectedShape();
				}

				// Ctrl+A : 전체선택
				if (OG.Constants.ENABLE_HOTKEY_CTRL_A && OG.Constants.SELECTABLE && event.ctrlKey && event.keyCode === KeyEvent.DOM_VK_A) {
					selectAll();
				}

				// Ctrl+C : 복사
				if (OG.Constants.ENABLE_HOTKEY_CTRL_C && event.ctrlKey && event.keyCode === KeyEvent.DOM_VK_C) {
					copySelectedShape();
				}

				// Ctrl+V: 붙여넣기
				if (OG.Constants.ENABLE_HOTKEY_CTRL_V && event.ctrlKey && event.keyCode === KeyEvent.DOM_VK_V) {
					pasteSelectedShape();
				}

				// Ctrl+D: 복제하기
				if (OG.Constants.ENABLE_HOTKEY_CTRL_D && event.ctrlKey && event.keyCode === KeyEvent.DOM_VK_D) {
					duplicateSelectedShape();
				}

				// Ctrl+G : 그룹
				if (OG.Constants.ENABLE_HOTKEY_CTRL_G && event.ctrlKey && event.keyCode === KeyEvent.DOM_VK_G) {
					groupSelectedShape();
				}

				// Ctrl+U : 언그룹
				if (OG.Constants.ENABLE_HOTKEY_CTRL_U && event.ctrlKey && event.keyCode === KeyEvent.DOM_VK_U) {
					ungroupSelectedShape();
				}

				if (OG.Constants.ENABLE_HOTKEY_SHIFT_ARROW) {
					// Shift+화살표 : 이동
					if (event.shiftKey && event.keyCode === KeyEvent.DOM_VK_LEFT) {
						moveElements(getMoveTargets(), -1 * (OG.Constants.DRAG_GRIDABLE ? OG.Constants.MOVE_SNAP_SIZE : 1), 0);
					}
					if (event.shiftKey && event.keyCode === KeyEvent.DOM_VK_RIGHT) {
						moveElements(getMoveTargets(), (OG.Constants.DRAG_GRIDABLE ? OG.Constants.MOVE_SNAP_SIZE : 1), 0);
					}
					if (event.shiftKey && event.keyCode === KeyEvent.DOM_VK_UP) {
						moveElements(getMoveTargets(), 0, -1 * (OG.Constants.DRAG_GRIDABLE ? OG.Constants.MOVE_SNAP_SIZE : 1));
					}
					if (event.shiftKey && event.keyCode === KeyEvent.DOM_VK_DOWN) {
						moveElements(getMoveTargets(), 0, (OG.Constants.DRAG_GRIDABLE ? OG.Constants.MOVE_SNAP_SIZE : 1));
					}
				}
				if (OG.Constants.ENABLE_HOTKEY_ARROW) {
					// 화살표 : 이동
					if (!event.shiftKey && event.keyCode === KeyEvent.DOM_VK_LEFT) {
						moveElements(getMoveTargets(), -1 * OG.Constants.MOVE_SNAP_SIZE, 0);
					}
					if (!event.shiftKey && event.keyCode === KeyEvent.DOM_VK_RIGHT) {
						moveElements(getMoveTargets(), OG.Constants.MOVE_SNAP_SIZE, 0);
					}
					if (!event.shiftKey && event.keyCode === KeyEvent.DOM_VK_UP) {
						moveElements(getMoveTargets(), 0, -1 * OG.Constants.MOVE_SNAP_SIZE);
					}
					if (!event.shiftKey && event.keyCode === KeyEvent.DOM_VK_DOWN) {
						moveElements(getMoveTargets(), 0, OG.Constants.MOVE_SNAP_SIZE);
					}
				}
			});
		} else {
			$(_RENDERER.getContainer()).unbind("keydown");
		}
	};

	/**
	 * 캔버스에 마우스 우클릭 메뉴를 가능하게 한다.
	 */
	this.enableRootContextMenu = function () {
		$.contextMenu({
			selector: '#' + _RENDERER.getRootElement().id,
			build   : function ($trigger, e) {
				var root = _RENDERER.getRootGroup(), copiedElement = $(root).data("copied");
				$(_RENDERER.getContainer()).focus();
				return {
					items: {
						'selectAll': {
							name: 'Select All', callback: selectAll
						},
						'sep1'     : '---------',
						'paste'    : {
							name: 'Paste', callback: pasteSelectedShape, disabled: (copiedElement ? false : true)
						},
						'sep2'     : '---------',
						'view'     : {
							name : 'View',
							items: {
								'view_actualSize': {
									name: 'Actual Size', callback: function () {
										_RENDERER.setScale(1);
									}
								},
								'sep2_1'         : '---------',
								'view_fitWindow' : {
									name: 'Fit Window', callback: fitWindow
								},
								'sep2_2'         : '---------',
								'view_25'        : {
									name: '25%', callback: function () {
										_RENDERER.setScale(0.25);
									}
								},
								'view_50'        : {
									name: '50%', callback: function () {
										_RENDERER.setScale(0.5);
									}
								},
								'view_75'        : {
									name: '75%', callback: function () {
										_RENDERER.setScale(0.75);
									}
								},
								'view_100'       : {
									name: '100%', callback: function () {
										_RENDERER.setScale(1);
									}
								},
								'view_150'       : {
									name: '150%', callback: function () {
										_RENDERER.setScale(1.5);
									}
								},
								'view_200'       : {
									name: '200%', callback: function () {
										_RENDERER.setScale(2);
									}
								},
								'view_300'       : {
									name: '300%', callback: function () {
										_RENDERER.setScale(3);
									}
								},
								'view_400'       : {
									name: '400%', callback: function () {
										_RENDERER.setScale(4);
									}
								},
								'sep2_3'         : '---------',
								'view_zoomin'    : {
									name: 'Zoom In', callback: zoomIn
								},
								'view_zoomout'   : {
									name: 'Zoom Out', callback: zoomOut
								}
							}
						}
					}
				};
			}
		});
	};

	/**
	 * Shape 에 마우스 우클릭 메뉴를 가능하게 한다.
	 */
	this.enableShapeContextMenu = function () {
		$.contextMenu({
			selector: '#' + _RENDERER.getRootElement().id + ' [_type=SHAPE]',
			build   : function ($trigger, e) {
				$(_RENDERER.getContainer()).focus();
				return {
					items: {
						'delete'     : {
							name: 'Delete', callback: deleteSelectedShape
						},
						'sep1'       : '---------',
						'cut'        : {
							name: 'Cut', callback: cutSelectedShape
						},
						'copy'       : {
							name: 'Copy', callback: copySelectedShape
						},
						'sep2'       : '---------',
						'duplicate'  : {
							name: 'Duplicate', callback: duplicateSelectedShape
						},
						'sep3'       : '---------',
						'group'      : {
							name: 'Group', callback: groupSelectedShape
						},
						'unGroup'    : {
							name: 'UnGroup', callback: ungroupSelectedShape
						},
						'sep4'       : '---------',
						'shapeRotate': {
							name : 'Rotate',
							items: {
								'rotate_select': {
									name    : 'Select',
									type    : 'select',
									options : {'0': '0', '45': '45', '90': '90', '135': '135', '180': '180', '-45': '-45', '-90': '-90', '-135': '-135', '-180': '-180'},
									selected: '0',
									events  : {
										change: function (e) {
											rotateSelectedShape(e.target.value);
										}
									}
								},
								'sep5_6_1'     : '---------',
								'rotate_custom': {
									name  : 'Custom',
									type  : 'text',
									events: {
										keyup: function (e) {
											if (e.target.value !== '') {
												rotateSelectedShape(e.target.value);
											}
										}
									}
								}
							}
						},
						'sep5'       : '---------',
						'format'     : {
							name : 'Format',
							items: {
								'fillColor'  : {
									name : 'Fill Color',
									items: {
										'fillColor_select': {
											name    : 'Select',
											type    : 'select',
											options : {'': '', 'white': 'white', 'gray': 'gray', 'blue': 'blue', 'red': 'red', 'yellow': 'yellow', 'orange': 'orange', 'green': 'green', 'black': 'black'},
											selected: '',
											events  : {
												change: function (e) {
													if (e.target.value !== '') {
														setFillColorSelectedShape(e.target.value);
													}
												}
											}
										},
										'sep5_1_1'        : '---------',
										'fillColor_custom': {
											name  : 'Custom',
											type  : 'text',
											events: {
												keyup: function (e) {
													if (e.target.value !== '') {
														setFillColorSelectedShape(e.target.value);
													}
												}
											}
										}
									}
								},
								'fillOpacity': {
									name : 'Fill Opacity',
									items: {
										'fillOpacity_select': {
											name    : 'Select',
											type    : 'select',
											options : {'': '', '0.0': '0%', '0.1': '10%', '0.2': '20%', '0.3': '30%', '0.4': '40%', '0.5': '50%', '0.6': '60%', '0.7': '70%', '0.8': '80%', '0.9': '90%', '1.0': '100%'},
											selected: '',
											events  : {
												change: function (e) {
													if (e.target.value !== '') {
														setFillOpacitySelectedShape(e.target.value);
													}
												}
											}
										}
									}
								},
								'sep5_1'     : '---------',
								'lineType'   : {
									name : 'Line Type',
									items: {
										'lineType_straight': {
											name  : 'Straight',
											type  : 'radio',
											radio : 'lineType',
											value : 'straight',
											events: {
												change: function (e) {
													setLineTypeSelectedShape(e.target.value);
												}
											}
										},
										'lineType_plain'   : {
											name  : 'Plain',
											type  : 'radio',
											radio : 'lineType',
											value : 'plain',
											events: {
												change: function (e) {
													setLineTypeSelectedShape(e.target.value);
												}
											}
										}
									}
								},
								'lineStyle'  : {
									name : 'Line Style',
									items: {
										'lineStyle_1' : {
											name  : '──────',
											type  : 'radio',
											radio : 'lineStyle',
											value : '',
											events: {
												change: function (e) {
													setLineStyleSelectedShape(e.target.value);
												}
											}
										},
										'lineStyle_2' : {
											name  : '---------',
											type  : 'radio',
											radio : 'lineStyle',
											value : '-',
											events: {
												change: function (e) {
													setLineStyleSelectedShape(e.target.value);
												}
											}
										},
										'lineStyle_3' : {
											name  : '············',
											type  : 'radio',
											radio : 'lineStyle',
											value : '.',
											events: {
												change: function (e) {
													setLineStyleSelectedShape(e.target.value);
												}
											}
										},
										'lineStyle_4' : {
											name  : '-·-·-·-·-·',
											type  : 'radio',
											radio : 'lineStyle',
											value : '-.',
											events: {
												change: function (e) {
													setLineStyleSelectedShape(e.target.value);
												}
											}
										},
										'lineStyle_5' : {
											name  : '-··-··-··-',
											type  : 'radio',
											radio : 'lineStyle',
											value : '-..',
											events: {
												change: function (e) {
													setLineStyleSelectedShape(e.target.value);
												}
											}
										},
										'lineStyle_6' : {
											name  : '· · · · · ·',
											type  : 'radio',
											radio : 'lineStyle',
											value : '. ',
											events: {
												change: function (e) {
													setLineStyleSelectedShape(e.target.value);
												}
											}
										},
										'lineStyle_7' : {
											name  : '- - - - -',
											type  : 'radio',
											radio : 'lineStyle',
											value : '- ',
											events: {
												change: function (e) {
													setLineStyleSelectedShape(e.target.value);
												}
											}
										},
										'lineStyle_8' : {
											name  : '─ ─ ─ ─',
											type  : 'radio',
											radio : 'lineStyle',
											value : '--',
											events: {
												change: function (e) {
													setLineStyleSelectedShape(e.target.value);
												}
											}
										},
										'lineStyle_9' : {
											name  : '- ·- ·- ·-',
											type  : 'radio',
											radio : 'lineStyle',
											value : '- .',
											events: {
												change: function (e) {
													setLineStyleSelectedShape(e.target.value);
												}
											}
										},
										'lineStyle_10': {
											name  : '--·--·--·-',
											type  : 'radio',
											radio : 'lineStyle',
											value : '--.',
											events: {
												change: function (e) {
													setLineStyleSelectedShape(e.target.value);
												}
											}
										},
										'lineStyle_11': {
											name  : '--··--··--',
											type  : 'radio',
											radio : 'lineStyle',
											value : '--..',
											events: {
												change: function (e) {
													setLineStyleSelectedShape(e.target.value);
												}
											}
										}
									}
								},
								'lineColor'  : {
									name : 'Line Color',
									items: {
										'lineColor_select': {
											name    : 'Select',
											type    : 'select',
											options : {'': '', 'white': 'white', 'gray': 'gray', 'blue': 'blue', 'red': 'red', 'yellow': 'yellow', 'orange': 'orange', 'green': 'green', 'black': 'black'},
											selected: '',
											events  : {
												change: function (e) {
													if (e.target.value !== '') {
														setLineColorSelectedShape(e.target.value);
													}
												}
											}
										},
										'sep5_4_1'        : '---------',
										'lineColor_custom': {
											name  : 'Custom',
											type  : 'text',
											events: {
												keyup: function (e) {
													if (e.target.value !== '') {
														setLineColorSelectedShape(e.target.value);
													}
												}
											}
										}
									}
								},
								'lineWidth'  : {
									name : 'Line Width',
									items: {
										'lineWidth_select': {
											name    : 'Select',
											type    : 'select',
											options : {0: '', 1: '1px', 2: '2px', 3: '3px', 4: '4px', 5: '5px', 6: '6px', 8: '8px', 10: '10px', 12: '12px', 16: '16px', 24: '24px'},
											selected: 0,
											events  : {
												change: function (e) {
													if (e.target.value !== 0) {
														setLineWidthSelectedShape(e.target.value);
													}
												}
											}
										},
										'sep5_5_1'        : '---------',
										'lineWidth_custom': {
											name  : 'Custom',
											type  : 'text',
											events: {
												keyup: function (e) {
													if (e.target.value !== '') {
														setLineWidthSelectedShape(e.target.value);
													}
												}
											}
										}
									}
								}
							}
						},
						'sep6'       : '---------',
						'text'       : {
							name : 'Text',
							items: {
								'fontFamily'       : {
									name : 'Font Family',
									items: {
										'fontFamily_1'     : {
											name  : '<span style="font-family: Arial">Arial</span>',
											type  : 'radio',
											radio : 'fontFamily',
											value : 'Arial',
											events: {
												change: function (e) {
													setFontFamilySelectedShape(e.target.value);
												}
											}
										},
										'fontFamily_2'     : {
											name  : '<span style="font-family: \'Comic Sans MS\'">Comic Sans MS</span>',
											type  : 'radio',
											radio : 'fontFamily',
											value : 'Comic Sans MS',
											events: {
												change: function (e) {
													setFontFamilySelectedShape(e.target.value);
												}
											}
										},
										'fontFamily_3'     : {
											name  : '<span style="font-family: \'Courier New\'">Courier New</span>',
											type  : 'radio',
											radio : 'fontFamily',
											value : 'Courier New',
											events: {
												change: function (e) {
													setFontFamilySelectedShape(e.target.value);
												}
											}
										},
										'fontFamily_4'     : {
											name  : '<span style="font-family: Garamond">Garamond</span>',
											type  : 'radio',
											radio : 'fontFamily',
											value : 'Garamond',
											events: {
												change: function (e) {
													setFontFamilySelectedShape(e.target.value);
												}
											}
										},
										'fontFamily_5'     : {
											name  : '<span style="font-family: Georgia">Georgia</span>',
											type  : 'radio',
											radio : 'fontFamily',
											value : 'Georgia',
											events: {
												change: function (e) {
													setFontFamilySelectedShape(e.target.value);
												}
											}
										},
										'fontFamily_6'     : {
											name  : '<span style="font-family: \'Lucida Console\'">Lucida Console</span>',
											type  : 'radio',
											radio : 'fontFamily',
											value : 'Lucida Console',
											events: {
												change: function (e) {
													setFontFamilySelectedShape(e.target.value);
												}
											}
										},
										'fontFamily_7'     : {
											name  : '<span style="font-family: \'MS Gothic\'">MS Gothic</span>',
											type  : 'radio',
											radio : 'fontFamily',
											value : 'MS Gothic',
											events: {
												change: function (e) {
													setFontFamilySelectedShape(e.target.value);
												}
											}
										},
										'fontFamily_8'     : {
											name  : '<span style="font-family: \'MS Sans Serif\'">MS Sans Serif</span>',
											type  : 'radio',
											radio : 'fontFamily',
											value : 'MS Sans Serif',
											events: {
												change: function (e) {
													setFontFamilySelectedShape(e.target.value);
												}
											}
										},
										'fontFamily_9'     : {
											name  : '<span style="font-family: Verdana">Verdana</span>',
											type  : 'radio',
											radio : 'fontFamily',
											value : 'Verdana',
											events: {
												change: function (e) {
													setFontFamilySelectedShape(e.target.value);
												}
											}
										},
										'fontFamily_10'    : {
											name  : '<span style="font-family: \'Times New Roman\'">Times New Roman</span>',
											type  : 'radio',
											radio : 'fontFamily',
											value : 'Times New Roman',
											events: {
												change: function (e) {
													setFontFamilySelectedShape(e.target.value);
												}
											}
										},
										'sep6_1_1'         : '---------',
										'fontFamily_custom': {
											name  : 'Custom',
											type  : 'text',
											events: {
												keyup: function (e) {
													if (e.target.value !== '') {
														setFontFamilySelectedShape(e.target.value);
													}
												}
											}
										}
									}
								},
								'fontColor'        : {
									name : 'Font Color',
									items: {
										'fontColor_select': {
											name    : 'Select',
											type    : 'select',
											options : {'': '', 'white': 'white', 'gray': 'gray', 'blue': 'blue', 'red': 'red', 'yellow': 'yellow', 'orange': 'orange', 'green': 'green', 'black': 'black'},
											selected: '',
											events  : {
												change: function (e) {
													if (e.target.value !== '') {
														setFontColorSelectedShape(e.target.value);
													}
												}
											}
										},
										'sep6_1_2'        : '---------',
										'fontColor_custom': {
											name  : 'Custom',
											type  : 'text',
											events: {
												keyup: function (e) {
													if (e.target.value !== '') {
														setFontColorSelectedShape(e.target.value);
													}
												}
											}
										}
									}
								},
								'fontSize'         : {
									name : 'Font Size',
									items: {
										'fontSize_select': {
											name    : 'Select',
											type    : 'select',
											options : {'': '', '6': '6', '8': '8', '9': '9', '10': '10', '11': '11', '12': '12', '14': '14', '18': '18', '24': '24', '36': '36', '48': '48', '72': '72'},
											selected: '',
											events  : {
												change: function (e) {
													if (e.target.value !== '') {
														setFontSizeSelectedShape(e.target.value);
													}
												}
											}
										},
										'sep6_1_3'       : '---------',
										'fontSize_custom': {
											name  : 'Custom',
											type  : 'text',
											events: {
												keyup: function (e) {
													if (e.target.value !== '') {
														setFontSizeSelectedShape(e.target.value);
													}
												}
											}
										}
									}
								},
								'sep6_1'           : '---------',
								'fontWeight_bold'  : {
									name  : '<span style="font-weight: bold">Bold</span>',
									type  : 'checkbox',
									events: {
										change: function (e) {
											if (e.target.checked) {
												setFontWeightSelectedShape('bold');
											} else {
												setFontWeightSelectedShape('normal');
											}
										}
									}
								},
								'fontWeight_italic': {
									name  : '<span style="font-style: italic">Italic</span>',
									type  : 'checkbox',
									events: {
										change: function (e) {
											if (e.target.checked) {
												setFontStyleSelectedShape('italic');
											} else {
												setFontStyleSelectedShape('normal');
											}
										}
									}
								},
//								// TODO : 라파엘이 text-decoration 을 지원안함
//								'fontWeight_underline': {
//									name  : '<span style="text-decoration: underline">Underline</span>',
//									type  : 'checkbox',
//									events: {
//										change: function (e) {
//											if (e.target.checked) {
//												setTextDecorationSelectedShape('underline');
//											} else {
//												setTextDecorationSelectedShape('none');
//											}
//										}
//									}
//								},
								'sep6_2'           : '---------',
								'position'         : {
									name : 'Text Position',
									items: {
										'position_left'  : {
											name  : 'Left',
											type  : 'radio',
											radio : 'position',
											value : 'left',
											events: {
												change: function (e) {
													setLabelPositionSelectedShape(e.target.value);
												}
											}
										},
										'position_center': {
											name  : 'Center',
											type  : 'radio',
											radio : 'position',
											value : 'center',
											events: {
												change: function (e) {
													setLabelPositionSelectedShape(e.target.value);
												}
											}
										},
										'position_right' : {
											name  : 'Right',
											type  : 'radio',
											radio : 'position',
											value : 'right',
											events: {
												change: function (e) {
													setLabelPositionSelectedShape(e.target.value);
												}
											}
										},
										'position_top'   : {
											name  : 'Top',
											type  : 'radio',
											radio : 'position',
											value : 'top',
											events: {
												change: function (e) {
													setLabelPositionSelectedShape(e.target.value);
												}
											}
										},
										'position_bottom': {
											name  : 'Bottom',
											type  : 'radio',
											radio : 'position',
											value : 'bottom',
											events: {
												change: function (e) {
													setLabelPositionSelectedShape(e.target.value);
												}
											}
										}
									}
								},
								'vertical'         : {
									name : 'Vertical Align',
									items: {
										'vertical_top'   : {
											name  : 'Top',
											type  : 'radio',
											radio : 'vertical',
											value : 'top',
											events: {
												change: function (e) {
													setLabelVerticalSelectedShape(e.target.value);
												}
											}
										},
										'vertical_middle': {
											name  : 'Middle',
											type  : 'radio',
											radio : 'vertical',
											value : 'middle',
											events: {
												change: function (e) {
													setLabelVerticalSelectedShape(e.target.value);
												}
											}
										},
										'vertical_bottom': {
											name  : 'Bottom',
											type  : 'radio',
											radio : 'vertical',
											value : 'bottom',
											events: {
												change: function (e) {
													setLabelVerticalSelectedShape(e.target.value);
												}
											}
										}
									}
								},
								'horizontal'       : {
									name : 'Horizontal Align',
									items: {
										'vertical_start'   : {
											name  : 'Left',
											type  : 'radio',
											radio : 'horizontal',
											value : 'start',
											events: {
												change: function (e) {
													setLabelHorizontalSelectedShape(e.target.value);
												}
											}
										},
										'horizontal_middle': {
											name  : 'Middle',
											type  : 'radio',
											radio : 'horizontal',
											value : 'middle',
											events: {
												change: function (e) {
													setLabelHorizontalSelectedShape(e.target.value);
												}
											}
										},
										'horizontal_end'   : {
											name  : 'Right',
											type  : 'radio',
											radio : 'horizontal',
											value : 'end',
											events: {
												change: function (e) {
													setLabelHorizontalSelectedShape(e.target.value);
												}
											}
										}
									}
								},
								'sep6_5'           : '---------',
								'textRotate'       : {
									name : 'Text Rotate',
									items: {
										'textRotate_select': {
											name    : 'Select',
											type    : 'select',
											options : {'0': '0', '45': '45', '90': '90', '135': '135', '180': '180', '-45': '-45', '-90': '-90', '-135': '-135', '-180': '-180'},
											selected: '0',
											events  : {
												change: function (e) {
													setLabelAngleSelectedShape(e.target.value);
												}
											}
										},
										'sep6_6_1'         : '---------',
										'textRotate_custom': {
											name  : 'Custom',
											type  : 'text',
											events: {
												keyup: function (e) {
													if (e.target.value !== '') {
														setLabelAngleSelectedShape(e.target.value);
													}
												}
											}
										}
									}
								}
							}
						},
						'sep7'       : '---------',
						'label'      : {
							name : 'Label',
							items: {
								'label_shape': {
									name  : 'Cell Label',
									type  : 'text',
									events: {
										keyup: function (e) {
											setLabelSelectedShape(e.target.value);
										}
									}
								},
								'sep7_1'     : '---------',
								'label_from' : {
									name  : 'Edge From',
									type  : 'text',
									events: {
										keyup: function (e) {
											setEdgeFromLabelSelectedShape(e.target.value);
										}
									}
								},
								'label_to'   : {
									name  : 'Edge To',
									type  : 'text',
									events: {
										keyup: function (e) {
											setEdgeToLabelSelectedShape(e.target.value);
										}
									}
								}
							}
						}
					}
				};
			}
		});
	};
};
OG.handler.EventHandler.prototype = new OG.handler.EventHandler();
OG.handler.EventHandler.prototype.constructor = OG.handler.EventHandler;
OG.EventHandler = OG.handler.EventHandler;
/**
 * OpenGraph 캔버스 클래스
 *
 * @class
 * @requires OG.common.*, OG.geometry.*, OG.shape.*, OG.renderer.*, OG.handler.*, OG.layout.*, raphael-2.1.0
 *
 * @param {HTMLElement,String} container 컨테이너 DOM element or ID
 * @param {Number[]} containerSize 컨테이너 Width, Height
 * @param {String} backgroundColor 캔버스 배경색
 * @param {String} backgroundImage 캔버스 배경이미지
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.graph.Canvas = function (container, containerSize, backgroundColor, backgroundImage) {
	var _RENDERER = container ? new OG.RaphaelRenderer(container, containerSize, backgroundColor, backgroundImage) : null,
		_HANDLER = new OG.EventHandler(_RENDERER),
		_CONTAINER = OG.Util.isElement(container) ? container : document.getElementById(container);

	/**
	 * Canvas 의 설정값을 초기화한다.
	 *
	 * <pre>
	 * - selectable         : 클릭선택 가능여부(디폴트 true)
	 * - dragSelectable     : 마우스드래그선택 가능여부(디폴트 true)
	 * - movable            : 이동 가능여부(디폴트 true)
	 * - resizable          : 리사이즈 가능여부(디폴트 true)
	 * - connectable        : 연결 가능여부(디폴트 true)
	 * - selfConnectable    : Self 연결 가능여부(디폴트 true)
	 * - connectCloneable   : 드래그하여 연결시 대상 없을 경우 자동으로 Shape 복사하여 연결 처리 여부(디폴트 true)
	 * - connectRequired    : 드래그하여 연결시 연결대상 있는 경우에만 Edge 드로잉 처리 여부(디폴트 true)
	 * - labelEditable      : 라벨 수정여부(디폴트 true)
	 * - groupDropable      : 그룹핑 가능여부(디폴트 true)
	 * - collapsible        : 최소화 가능여부(디폴트 true)
	 * - enableHotKey       : 핫키 가능여부(디폴트 true)
	 * </pre>
	 *
	 * @param {Object} config JSON 포맷의 configuration
	 */
	this.initConfig = function (config) {
		if (config) {
			OG.Constants.SELECTABLE = config.selectable === undefined ? OG.Constants.SELECTABLE : config.selectable;
			OG.Constants.DRAG_SELECTABLE = config.dragSelectable === undefined ? OG.Constants.DRAG_SELECTABLE : config.dragSelectable;
			OG.Constants.MOVABLE = config.movable === undefined ? OG.Constants.MOVABLE : config.movable;
			OG.Constants.RESIZABLE = config.resizable === undefined ? OG.Constants.RESIZABLE : config.resizable;
			OG.Constants.CONNECTABLE = config.connectable === undefined ? OG.Constants.CONNECTABLE : config.connectable;
			OG.Constants.SELF_CONNECTABLE = config.selfConnectable === undefined ? OG.Constants.SELF_CONNECTABLE : config.selfConnectable;
			OG.Constants.CONNECT_CLONEABLE = config.connectCloneable === undefined ? OG.Constants.CONNECT_CLONEABLE : config.connectCloneable;
			OG.Constants.CONNECT_REQUIRED = config.connectRequired === undefined ? OG.Constants.CONNECT_REQUIRED : config.connectRequired;
			OG.Constants.LABEL_EDITABLE = config.labelEditable === undefined ? OG.Constants.LABEL_EDITABLE : config.labelEditable;
			OG.Constants.GROUP_DROPABLE = config.groupDropable === undefined ? OG.Constants.GROUP_DROPABLE : config.groupDropable;
			OG.Constants.GROUP_COLLAPSIBLE = config.collapsible === undefined ? OG.Constants.GROUP_COLLAPSIBLE : config.collapsible;
			OG.Constants.ENABLE_HOTKEY = config.enableHotKey === undefined ? OG.Constants.ENABLE_HOTKEY : config.enableHotKey;
		}

		_HANDLER.setDragSelectable(OG.Constants.SELECTABLE && OG.Constants.DRAG_SELECTABLE);
		_HANDLER.setEnableHotKey(OG.Constants.ENABLE_HOTKEY);
		if (OG.Constants.ENABLE_CONTEXTMENU) {
			_HANDLER.enableRootContextMenu();
			_HANDLER.enableShapeContextMenu();
		}

		this.CONFIG_INITIALIZED = true;
	};

	/**
	 * 랜더러를 반환한다.
	 *
	 * @return {OG.RaphaelRenderer}
	 */
	this.getRenderer = function () {
		return _RENDERER;
	};

	/**
	 * 컨테이너 DOM element 를 반환한다.
	 *
	 * @return {HTMLElement}
	 */
	this.getContainer = function () {
		return _CONTAINER;
	};

	/**
	 * 이벤트 핸들러를 반환한다.
	 *
	 * @return {OG.EventHandler}
	 */
	this.getEventHandler = function () {
		return _HANDLER;
	};

	/**
	 * Shape 을 캔버스에 위치 및 사이즈 지정하여 드로잉한다.
	 *
	 * @example
	 * canvas.drawShape([100, 100], new OG.CircleShape(), [50, 50], {stroke:'red'});
	 *
	 * @param {Number[]} position 드로잉할 위치 좌표(중앙 기준)
	 * @param {OG.shape.IShape} shape Shape
	 * @param {Number[]} size Shape Width, Height
	 * @param {OG.geometry.Style,Object} style 스타일 (Optional)
	 * @param {String} id Element ID 지정 (Optional)
	 * @param {String} parentId 부모 Element ID 지정 (Optional)
	 * @return {Element} Group DOM Element with geometry
	 */
	this.drawShape = function (position, shape, size, style, id, parentId, gridable) {
		// MOVE_SNAP_SIZE 적용
		if (OG.Constants.DRAG_GRIDABLE && (!OG.Util.isDefined(gridable) || gridable === true)) {
			if (position) {
				position[0] = OG.Util.roundGrid(position[0]);
				position[1] = OG.Util.roundGrid(position[1]);
			}
			if (size) {
				size[0] = OG.Util.roundGrid(size[0], OG.Constants.MOVE_SNAP_SIZE * 2);
				size[1] = OG.Util.roundGrid(size[1], OG.Constants.MOVE_SNAP_SIZE * 2);
			}
		}

		var element = _RENDERER.drawShape(position, shape, size, style, id);

		if (position && (shape.TYPE === OG.Constants.SHAPE_TYPE.EDGE)) {
			element = _RENDERER.move(element, position);
		}

		if (parentId && _RENDERER.getElementById(parentId)) {
			_RENDERER.appendChild(element, parentId);
		}

		if (!this.CONFIG_INITIALIZED) {
			this.initConfig();
		}

		_HANDLER.setClickSelectable(element, OG.Constants.SELECTABLE);
		_HANDLER.setMovable(element, OG.Constants.SELECTABLE && OG.Constants.MOVABLE);

		if (OG.Constants.CONNECTABLE) {
			_HANDLER.enableConnect(element);
		}

		if (OG.Constants.LABEL_EDITABLE) {
			_HANDLER.enableEditLabel(element);
		}

		if (OG.Constants.GROUP_DROPABLE) {
			_HANDLER.enableDragAndDropGroup(element);
		}

		if (OG.Constants.GROUP_COLLAPSIBLE) {
			_HANDLER.enableCollapse(element);
		}

		return element;
	};

	/**
	 * Shape 의 스타일을 변경한다.
	 *
	 * @param {Element} shapeElement Shape DOM element
	 * @param {Object} style 스타일
	 */
	this.setShapeStyle = function (shapeElement, style) {
		_RENDERER.setShapeStyle(shapeElement, style);
	};

	/**
	 * Shape 의 Label 을 캔버스에 위치 및 사이즈 지정하여 드로잉한다.
	 *
	 * @param {Element,String} shapeElement Shape DOM element or ID
	 * @param {String} text 텍스트
	 * @param {OG.geometry.Style,Object} style 스타일
	 * @return {Element} DOM Element
	 * @override
	 */
	this.drawLabel = function (shapeElement, text, style) {
		return _RENDERER.drawLabel(shapeElement, text, style);
	};

	/**
	 * Shape 의 연결된 Edge 를 redraw 한다.(이동 또는 리사이즈시)
	 *
	 * @param {Element} element
	 * @param {String[]} excludeEdgeId redraw 제외할 Edge ID
	 */
	this.redrawConnectedEdge = function (element, excludeEdgeId) {
		_RENDERER.redrawConnectedEdge(element, excludeEdgeId);
	};

	/**
	 * 두개의 Shape 을 Edge 로 연결한다.
	 *
	 * @param {Element} fromElement from Shape Element
	 * @param {Element} toElement to Shape Element
	 * @param {OG.geometry.Style,Object} style 스타일
	 * @param {String} label Label
	 * @return {Element} 연결된 Edge 엘리먼트
	 */
	this.connect = function (fromElement, toElement, style, label) {
		var terminalGroup, childTerminals, fromTerminal, toTerminal, i, edge, guide;

		// from Shape 센터 연결 터미널 찾기
		terminalGroup = _RENDERER.drawTerminal(fromElement, OG.Constants.TERMINAL_TYPE.OUT);
		childTerminals = terminalGroup.terminal.childNodes;
		fromTerminal = childTerminals[0];
		for (i = 0; i < childTerminals.length; i++) {
			if (childTerminals[i].terminal && childTerminals[i].terminal.direction.toLowerCase() === "c") {
				fromTerminal = childTerminals[i];
				break;
			}
		}
		_RENDERER.removeTerminal(fromElement);

		// to Shape 센터 연결 터미널 찾기
		terminalGroup = _RENDERER.drawTerminal(toElement, OG.Constants.TERMINAL_TYPE.IN);
		childTerminals = terminalGroup.terminal.childNodes;
		toTerminal = childTerminals[0];
		for (i = 0; i < childTerminals.length; i++) {
			if (childTerminals[i].terminal && childTerminals[i].terminal.direction.toLowerCase() === "c") {
				toTerminal = childTerminals[i];
				break;
			}
		}
		_RENDERER.removeTerminal(toElement);

		// draw edge
		edge = _RENDERER.drawShape(null, new OG.EdgeShape(fromTerminal.terminal.position, toTerminal.terminal.position));

		// connect
		edge = _RENDERER.connect(fromTerminal, toTerminal, edge, style, label);

		if (edge) {
			guide = _RENDERER.drawGuide(edge);

			if (edge && guide) {
				// enable event
				_HANDLER.setClickSelectable(edge, OG.Constants.SELECTABLE);
				_HANDLER.setMovable(edge, OG.Constants.SELECTABLE && OG.Constants.MOVABLE);
				_HANDLER.setResizable(edge, guide, OG.Constants.SELECTABLE && OG.Constants.RESIZABLE);
				if ($(edge).attr("_shape") !== OG.Constants.SHAPE_TYPE.GROUP) {
					if (OG.Constants.LABEL_EDITABLE) {
						_HANDLER.enableEditLabel(edge);
					}
				}
				_RENDERER.toFront(guide.group);
			}
		}

		return edge;
	};

	/**
	 * 연결속성정보를 삭제한다. Edge 인 경우는 라인만 삭제하고, 일반 Shape 인 경우는 연결된 모든 Edge 를 삭제한다.
	 *
	 * @param {Element} element
	 */
	this.disconnect = function (element) {
		_RENDERER.disconnect(element);
	};

	/**
	 * 주어진 Shape 들을 그룹핑한다.
	 *
	 * @param {Element[]} elements
	 * @return {Element} Group Shape Element
	 */
	this.group = function (elements) {
		var group = _RENDERER.group(elements);

		// enable event
		_HANDLER.setClickSelectable(group, OG.Constants.SELECTABLE);
		_HANDLER.setMovable(group, OG.Constants.SELECTABLE && OG.Constants.MOVABLE);
		if ($(group).attr("_shape") !== OG.Constants.SHAPE_TYPE.GROUP) {
			if (OG.Constants.LABEL_EDITABLE) {
				_HANDLER.enableEditLabel(group);
			}
		}

		return group;
	};

	/**
	 * 주어진 그룹들을 그룹해제한다.
	 *
	 * @param {Element[]} groupElements
	 * @return {Element[]} ungrouped Elements
	 */
	this.ungroup = function (groupElements) {
		return _RENDERER.ungroup(groupElements);
	};

	/**
	 * 주어진 Shape 들을 그룹에 추가한다.
	 *
	 * @param {Element} groupElement
	 * @param {Element[]} elements
	 */
	this.addToGroup = function (groupElement, elements) {
		_RENDERER.addToGroup(groupElement, elements);
	};

	/**
	 * 주어진 Shape 이 그룹인 경우 collapse 한다.
	 *
	 * @param {Element} element
	 */
	this.collapse = function (element) {
		_RENDERER.collapse(element);
	};

	/**
	 * 주어진 Shape 이 그룹인 경우 expand 한다.
	 *
	 * @param {Element} element
	 */
	this.expand = function (element) {
		_RENDERER.expand(element);
	};

	/**
	 * 드로잉된 모든 오브젝트를 클리어한다.
	 */
	this.clear = function () {
		_RENDERER.clear();
	};

	/**
	 * Shape 을 캔버스에서 관련된 모두를 삭제한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 */
	this.removeShape = function (element) {
		_RENDERER.removeShape(element);
	};

	/**
	 * 하위 엘리먼트만 제거한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 */
	this.removeChild = function (element) {
		_RENDERER.removeChild(element);
	};

	/**
	 * ID에 해당하는 Element 의 Move & Resize 용 가이드를 제거한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 */
	this.removeGuide = function (element) {
		_RENDERER.removeGuide(element);
	};

	/**
	 * 모든 Move & Resize 용 가이드를 제거한다.
	 */
	this.removeAllGuide = function () {
		_RENDERER.removeAllGuide();
	};

	/**
	 * 랜더러 캔버스 Root Element 를 반환한다.
	 *
	 * @return {Element} Element
	 */
	this.getRootElement = function () {
		return _RENDERER.getRootElement();
	};

	/**
	 * 랜더러 캔버스 Root Group Element 를 반환한다.
	 *
	 * @return {Element} Element
	 */
	this.getRootGroup = function () {
		return _RENDERER.getRootGroup();
	};

	/**
	 * 주어진 지점을 포함하는 Top Element 를 반환한다.
	 *
	 * @param {Number[]} position 위치 좌표
	 * @return {Element} Element
	 */
	this.getElementByPoint = function (position) {
		return _RENDERER.getElementByPoint(position);
	};

	/**
	 * 주어진 Boundary Box 영역에 포함되는 Shape(GEOM, TEXT, IMAGE) Element 를 반환한다.
	 *
	 * @param {OG.geometry.Envelope} envelope Boundary Box 영역
	 * @return {Element[]} Element
	 */
	this.getElementsByBBox = function (envelope) {
		return _RENDERER.getElementsByBBox(envelope);
	};

	/**
	 * 엘리먼트에 속성값을 설정한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @param {Object} attribute 속성값
	 */
	this.setAttr = function (element, attribute) {
		_RENDERER.setAttr(element, attribute);
	};

	/**
	 * 엘리먼트 속성값을 반환한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @param {String} attrName 속성이름
	 * @return {Object} attribute 속성값
	 */
	this.getAttr = function (element, attrName) {
		return _RENDERER.getAttr(element, attrName);
	};

	/**
	 * ID에 해당하는 Element 를 최상단 레이어로 이동한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 */
	this.toFront = function (element) {
		_RENDERER.toFront(element);
	};

	/**
	 * ID에 해당하는 Element 를 최하단 레이어로 이동한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 */
	this.toBack = function (element) {
		_RENDERER.toBack(element);
	};

	/**
	 * 랜더러 캔버스의 사이즈(Width, Height)를 반환한다.
	 *
	 * @return {Number[]} Canvas Width, Height
	 */
	this.getCanvasSize = function () {
		_RENDERER.getCanvasSize();
	};

	/**
	 * 랜더러 캔버스의 사이즈(Width, Height)를 변경한다.
	 *
	 * @param {Number[]} size Canvas Width, Height
	 */
	this.setCanvasSize = function (size) {
		_RENDERER.setCanvasSize(size);
	};

	/**
	 * 랜더러 캔버스의 사이즈(Width, Height)를 실제 존재하는 Shape 의 영역에 맞게 변경한다.
	 *
	 * @param {Number[]} minSize Canvas 최소 Width, Height
	 * @param {Boolean} fitScale 주어진 minSize 에 맞게 fit 여부(Default:false)
	 */
	this.fitCanvasSize = function (minSize, fitScale) {
		_RENDERER.fitCanvasSize(minSize, fitScale);
	};

	/**
	 * 새로운 View Box 영역을 설정한다. (ZoomIn & ZoomOut 가능)
	 *
	 * @param @param {Number[]} position 위치 좌표(좌상단 기준)
	 * @param {Number[]} size Canvas Width, Height
	 * @param {Boolean} isFit Fit 여부
	 */
	this.setViewBox = function (position, size, isFit) {
		_RENDERER.setViewBox(position, size, isFit);
	};

	/**
	 * Scale 을 반환한다. (리얼 사이즈 : Scale = 1)
	 *
	 */
	this.getScale = function () {
		_RENDERER.getScale();
	};

	/**
	 * Scale 을 설정한다. (리얼 사이즈 : Scale = 1)
	 *
	 * @param {Number} scale 스케일값
	 */
	this.setScale = function (scale) {
		_RENDERER.setScale(scale);
	};

	/**
	 * ID에 해당하는 Element 를 캔버스에서 show 한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 */
	this.show = function (element) {
		_RENDERER.show(element);
	};

	/**
	 * ID에 해당하는 Element 를 캔버스에서 hide 한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 */
	this.hide = function (element) {
		_RENDERER.hide(element);
	};

	/**
	 * Source Element 를 Target Element 아래에 append 한다.
	 *
	 * @param {Element,String} srcElement Element 또는 ID
	 * @param {Element,String} targetElement Element 또는 ID
	 * @return {Element} Source Element
	 */
	this.appendChild = function (srcElement, targetElement) {
		return _RENDERER.appendChild(srcElement, targetElement);
	};

	/**
	 * Source Element 를 Target Element 이후에 insert 한다.
	 *
	 * @param {Element,String} srcElement Element 또는 ID
	 * @param {Element,String} targetElement Element 또는 ID
	 * @return {Element} Source Element
	 */
	this.insertAfter = function (srcElement, targetElement) {
		return _RENDERER.insertAfter(srcElement, targetElement);
	};

	/**
	 * Source Element 를 Target Element 이전에 insert 한다.
	 *
	 * @param {Element,String} srcElement Element 또는 ID
	 * @param {Element,String} targetElement Element 또는 ID
	 * @return {Element} Source Element
	 */
	this.insertBefore = function (srcElement, targetElement) {
		return _RENDERER.insertBefore(srcElement, targetElement);
	};

	/**
	 * 해당 Element 를 가로, 세로 Offset 만큼 이동한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @param {Number[]} offset [가로, 세로]
	 * @param {String[]} excludeEdgeId redraw 제외할 Edge ID
	 * @return {Element} Element
	 */
	this.move = function (element, offset, excludeEdgeId) {
		return _RENDERER.move(element, offset, excludeEdgeId);
	};

	/**
	 * 주어진 중심좌표로 해당 Element 를 이동한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @param {Number[]} position [x, y]
	 * @param {String[]} excludeEdgeId redraw 제외할 Edge ID
	 * @return {Element} Element
	 */
	this.moveCentroid = function (element, position, excludeEdgeId) {
		return _RENDERER.moveCentroid(element, position, excludeEdgeId);
	};

	/**
	 * 중심 좌표를 기준으로 주어진 각도 만큼 회전한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @param {Number} angle 각도
	 * @param {String[]} excludeEdgeId redraw 제외할 Edge ID
	 * @return {Element} Element
	 */
	this.rotate = function (element, angle, excludeEdgeId) {
		return _RENDERER.rotate(element, angle, excludeEdgeId);
	};

	/**
	 * 상, 하, 좌, 우 외곽선을 이동한 만큼 리사이즈 한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @param {Number[]} offset [상, 하, 좌, 우] 각 방향으로 + 값
	 * @param {String[]} excludeEdgeId redraw 제외할 Edge ID
	 * @return {Element} Element
	 */
	this.resize = function (element, offset, excludeEdgeId) {
		return _RENDERER.resize(element, offset, excludeEdgeId);
	};

	/**
	 * 중심좌표는 고정한 채 Bounding Box 의 width, height 를 리사이즈 한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @param {Number[]} size [Width, Height]
	 * @return {Element} Element
	 */
	this.resizeBox = function (element, size) {
		return _RENDERER.resizeBox(element, size);
	};

	/**
	 * 노드 Element 를 복사한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @return {Element} Element
	 */
	this.clone = function (element) {
		return _RENDERER.clone(element);
	};

	/**
	 * ID로 Node Element 를 반환한다.
	 *
	 * @param {String} id
	 * @return {Element} Element
	 */
	this.getElementById = function (id) {
		return _RENDERER.getElementById(id);
	};

	/**
	 * Shape 타입에 해당하는 Node Element 들을 반환한다.
	 *
	 * @param {String} shapeType Shape 타입(GEOM, HTML, IMAGE, EDGE, GROUP), Null 이면 모든 타입
	 * @param {String} excludeType 제외 할 타입
	 * @return {Element[]} Element's Array
	 */
	this.getElementsByType = function (shapeType, excludeType) {
		return _RENDERER.getElementsByType(shapeType, excludeType);
	};

	/**
	 * Shape ID에 해당하는 Node Element 들을 반환한다.
	 *
	 * @param {String} shapeId Shape ID
	 * @return {Element[]} Element's Array
	 */
	this.getElementsByShapeId = function (shapeId) {
		var root = this.getRootGroup();
		return $(root).find("[_type=SHAPE][_shape_id='" + shapeId + "']");
	};

	/**
	 * 해당 엘리먼트의 BoundingBox 영역 정보를 반환한다.
	 *
	 * @param {Element,String} element
	 * @return {Object} {width, height, x, y, x2, y2}
	 */
	this.getBBox = function (element) {
		return _RENDERER.getBBox(element);
	};

	/**
	 * 부모노드기준으로 캔버스 루트 엘리먼트의 BoundingBox 영역 정보를 반환한다.
	 *
	 * @return {Object} {width, height, x, y, x2, y2}
	 */
	this.getRootBBox = function () {
		return _RENDERER.getRootBBox();
	};

	/**
	 * 부모노드기준으로 캔버스 루트 엘리먼트의 실제 Shape 이 차지하는 BoundingBox 영역 정보를 반환한다.
	 *
	 * @return {Object} {width, height, x, y, x2, y2}
	 */
	this.getRealRootBBox = function () {
		return _RENDERER.getRealRootBBox();
	};

	/**
	 * SVG 인지 여부를 반환한다.
	 *
	 * @return {Boolean} svg 여부
	 */
	this.isSVG = function () {
		return _RENDERER.isSVG();
	};

	/**
	 * VML 인지 여부를 반환한다.
	 *
	 * @return {Boolean} vml 여부
	 */
	this.isVML = function () {
		return _RENDERER.isVML();
	};

	/**
	 * 주어진 Shape 엘리먼트에 커스텀 데이타를 저장한다.
	 *
	 * @param {Element,String} shapeElement Shape DOM Element or ID
	 * @param {Object} data JSON 포맷의 Object
	 */
	this.setCustomData = function (shapeElement, data) {
		var element = OG.Util.isElement(shapeElement) ? shapeElement : document.getElementById(shapeElement);
		element.data = data;
	};

	/**
	 * 주어진 Shape 엘리먼트에 저장된 커스텀 데이터를 반환한다.
	 *
	 * @param {Element,String} shapeElement Shape DOM Element or ID
	 * @return {Object} JSON 포맷의 Object
	 */
	this.getCustomData = function (shapeElement) {
		var element = OG.Util.isElement(shapeElement) ? shapeElement : document.getElementById(shapeElement);
		return element.data;
	};

	/**
	 *    Canvas 에 그려진 Shape 들을 OpenGraph XML 문자열로 export 한다.
	 *
	 * @return {String} XML 문자열
	 */
	this.toXML = function () {
		return OG.Util.jsonToXml(this.toJSON());
	};

	/**
	 * Canvas 에 그려진 Shape 들을 OpenGraph JSON 객체로 export 한다.
	 *
	 * @return {Object} JSON 포맷의 Object
	 */
	this.toJSON = function () {
		var CANVAS = this,
			rootBBox = _RENDERER.getRootBBox(),
			rootGroup = _RENDERER.getRootGroup(),
			jsonObj = { opengraph: {
				'@width' : rootBBox.width,
				'@height': rootBBox.height,
				cell     : []
			}},
			childShape;

		childShape = function (node, isRoot) {
			$(node).children("[_type=SHAPE]").each(function (idx, item) {
				var shape = item.shape,
					style = item.shapeStyle,
					geom = shape.geom,
					envelope = geom.getBoundary(),
					cell = {},
					vertices,
					from,
					to;

				cell['@id'] = $(item).attr('id');
				if (!isRoot) {
					cell['@parent'] = $(node).attr('id');
				}
				cell['@shapeType'] = shape.TYPE;
				cell['@shapeId'] = shape.SHAPE_ID;
				cell['@x'] = envelope.getCentroid().x;
				cell['@y'] = envelope.getCentroid().y;
				cell['@width'] = envelope.getWidth();
				cell['@height'] = envelope.getHeight();
				if (style) {
					cell['@style'] = escape(OG.JSON.encode(style));
				}

				if ($(item).attr('_from')) {
					cell['@from'] = $(item).attr('_from');
				} else if (shape.TYPE !== OG.Constants.SHAPE_TYPE.EDGE) {
					cell['@from'] = CANVAS.getPrevShapeIds(item).toString();
				}
				if ($(item).attr('_to')) {
					cell['@to'] = $(item).attr('_to');
				} else if (shape.TYPE !== OG.Constants.SHAPE_TYPE.EDGE) {
					cell['@to'] = CANVAS.getNextShapeIds(item).toString();
				}
				if ($(item).attr('_fromedge')) {
					cell['@fromEdge'] = $(item).attr('_fromedge');
				}
				if ($(item).attr('_toedge')) {
					cell['@toEdge'] = $(item).attr('_toedge');
				}
				if (shape.label) {
					cell['@label'] = escape(shape.label);
				}
				if (shape.fromLabel) {
					cell['@fromLabel'] = escape(shape.fromLabel);
				}
				if (shape.toLabel) {
					cell['@toLabel'] = escape(shape.toLabel);
				}
				if (shape.angle && shape.angle !== 0) {
					cell['@angle'] = shape.angle;
				}
				if (shape instanceof OG.shape.ImageShape) {
					cell['@value'] = shape.image;
				} else if (shape instanceof OG.shape.HtmlShape) {
					cell['@value'] = escape(shape.html);
				} else if (shape instanceof OG.shape.TextShape) {
					cell['@value'] = escape(shape.text);
				} else if (shape instanceof OG.shape.EdgeShape) {
					vertices = geom.getVertices();
					from = vertices[0];
					to = vertices[vertices.length - 1];
					cell['@value'] = from + ',' + to;
				}
				if (geom) {
					cell['@geom'] = escape(geom.toString());
				}
				if (item.data) {
					cell['@data'] = escape(OG.JSON.encode(item.data));
				}

				jsonObj.opengraph.cell.push(cell);

				childShape(item, false);
			});
		};

		if (rootGroup.data) {
			jsonObj.opengraph['@data'] = escape(OG.JSON.encode(rootGroup.data));
		}

		childShape(rootGroup, true);

		return jsonObj;
	};

	/**
	 * OpenGraph XML 문자열로 부터 Shape 을 드로잉한다.
	 *
	 * @param {String, Element} xml XML 문자열 또는 DOM Element
	 * @return {Object} {width, height, x, y, x2, y2}
	 */
	this.loadXML = function (xml) {
		if (!OG.Util.isElement(xml)) {
			xml = OG.Util.parseXML(xml);
		}
		return this.loadJSON(OG.Util.xmlToJson(xml));
	};

	/**
	 * JSON 객체로 부터 Shape 을 드로잉한다.
	 *
	 * @param {Object} json JSON 포맷의 Object
	 * @return {Object} {width, height, x, y, x2, y2}
	 */
	this.loadJSON = function (json) {
		var canvasWidth, canvasHeight, rootGroup,
			minX = Number.MAX_VALUE, minY = Number.MAX_VALUE, maxX = Number.MIN_VALUE, maxY = Number.MIN_VALUE,
			i, cell, shape, id, parent, shapeType, shapeId, x, y, width, height, style, geom, from, to,
			fromEdge, toEdge, label, fromLabel, toLabel, angle, value, data, element;

		_RENDERER.clear();

		if (json && json.opengraph && json.opengraph.cell && OG.Util.isArray(json.opengraph.cell)) {
			canvasWidth = json.opengraph['@width'];
			canvasHeight = json.opengraph['@height'];

			data = json.opengraph['@data'];
			if (data) {
				rootGroup = this.getRootGroup();
				rootGroup.data = OG.JSON.decode(unescape(data));
			}

			cell = json.opengraph.cell;
			for (i = 0; i < cell.length; i++) {
				id = cell[i]['@id'];
				parent = cell[i]['@parent'];
				shapeType = cell[i]['@shapeType'];
				shapeId = cell[i]['@shapeId'];
				x = parseInt(cell[i]['@x'], 10);
				y = parseInt(cell[i]['@y'], 10);
				width = parseInt(cell[i]['@width'], 10);
				height = parseInt(cell[i]['@height'], 10);
				style = unescape(cell[i]['@style']);
				geom = unescape(cell[i]['@geom']);

				from = cell[i]['@from'];
				to = cell[i]['@to'];
				fromEdge = cell[i]['@fromEdge'];
				toEdge = cell[i]['@toEdge'];
				label = cell[i]['@label'];
				fromLabel = cell[i]['@fromLabel'];
				toLabel = cell[i]['@toLabel'];
				angle = cell[i]['@angle'];
				value = cell[i]['@value'];
				data = cell[i]['@data'];

				label = label ? unescape(label) : label;

				minX = (minX > (x - width / 2)) ? (x - width / 2) : minX;
				minY = (minY > (y - height / 2)) ? (y - height / 2) : minY;
				maxX = (maxX < (x + width / 2)) ? (x + width / 2) : maxX;
				maxY = (maxY < (y + height / 2)) ? (y + height / 2) : maxY;

				switch (shapeType) {
				case OG.Constants.SHAPE_TYPE.GEOM:
				case OG.Constants.SHAPE_TYPE.GROUP:
					shape = eval('new ' + shapeId + '()');
					if (label) {
						shape.label = label;
					}
					element = this.drawShape([x, y], shape, [width, height], OG.JSON.decode(style), id, parent, false);
					break;
				case OG.Constants.SHAPE_TYPE.EDGE:
					shape = eval('new ' + shapeId + '(' + value + ')');
					if (label) {
						shape.label = label;
					}
					if (fromLabel) {
						shape.fromLabel = unescape(fromLabel);
					}
					if (toLabel) {
						shape.toLabel = unescape(toLabel);
					}
					if (geom) {
						geom = OG.JSON.decode(geom);
						if (geom.type === OG.Constants.GEOM_NAME[OG.Constants.GEOM_TYPE.POLYLINE]) {
							geom = new OG.geometry.PolyLine(geom.vertices);
							shape.geom = geom;
						} else if (geom.type === OG.Constants.GEOM_NAME[OG.Constants.GEOM_TYPE.CURVE]) {
							geom = new OG.geometry.Curve(geom.controlPoints);
							shape.geom = geom;
						}
					}
					element = this.drawShape(null, shape, null, OG.JSON.decode(style), id, parent, false);
					break;
				case OG.Constants.SHAPE_TYPE.HTML:
					shape = eval('new ' + shapeId + '()');
					if (value) {
						shape.html = unescape(value);
					}
					if (label) {
						shape.label = label;
					}
					element = this.drawShape([x, y], shape, [width, height, angle], OG.JSON.decode(style), id, parent, false);
					break;
				case OG.Constants.SHAPE_TYPE.IMAGE:
					shape = eval('new ' + shapeId + '(\'' + value + '\')');
					if (label) {
						shape.label = label;
					}
					element = this.drawShape([x, y], shape, [width, height, angle], OG.JSON.decode(style), id, parent, false);
					break;
				case OG.Constants.SHAPE_TYPE.TEXT:
					shape = eval('new ' + shapeId + '()');
					if (value) {
						shape.text = unescape(value);
					}
					element = this.drawShape([x, y], shape, [width, height, angle], OG.JSON.decode(style), id, parent, false);
					break;
				}

				if (from) {
					$(element).attr('_from', from);
				}
				if (to) {
					$(element).attr('_to', to);
				}
				if (fromEdge) {
					$(element).attr('_fromedge', fromEdge);
				}
				if (toEdge) {
					$(element).attr('_toedge', toEdge);
				}
				if (data) {
					element.data = OG.JSON.decode(unescape(data));
				}
			}

			this.setCanvasSize([canvasWidth, canvasHeight]);

			return {
				width : maxX - minX,
				height: maxY - minY,
				x     : minX,
				y     : minY,
				x2    : maxX,
				y2    : maxY
			};
		}

		return {
			width : 0,
			height: 0,
			x     : 0,
			y     : 0,
			x2    : 0,
			y2    : 0
		};
	};

	/**
	 * 연결된 이전 Edge Element 들을 반환한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @return {Element[]} Previous Element's Array
	 */
	this.getPrevEdges = function (element) {
		var prevEdgeIds = $(element).attr('_fromedge'),
			edgeArray = [],
			edgeIds, edge, i;

		if (prevEdgeIds) {
			edgeIds = prevEdgeIds.split(',');
			for (i = 0; i < edgeIds.length; i++) {
				edge = this.getElementById(edgeIds[i]);
				if (edge) {
					edgeArray.push(edge);
				}
			}
		}

		return edgeArray;
	};

	/**
	 * 연결된 이후 Edge Element 들을 반환한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @return {Element[]} Previous Element's Array
	 */
	this.getNextEdges = function (element) {
		var nextEdgeIds = $(element).attr('_toedge'),
			edgeArray = [],
			edgeIds, edge, i;

		if (nextEdgeIds) {
			edgeIds = nextEdgeIds.split(',');
			for (i = 0; i < edgeIds.length; i++) {
				edge = this.getElementById(edgeIds[i]);
				if (edge) {
					edgeArray.push(edge);
				}
			}
		}

		return edgeArray;
	};

	/**
	 * 연결된 이전 노드 Element 들을 반환한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @return {Element[]} Previous Element's Array
	 */
	this.getPrevShapes = function (element) {
		var prevEdges = this.getPrevEdges(element),
			shapeArray = [],
			prevShapeId, shape, i;

		for (i = 0; i < prevEdges.length; i++) {
			prevShapeId = $(prevEdges[i]).attr('_from');
			if (prevShapeId) {
				prevShapeId = prevShapeId.substring(0, prevShapeId.indexOf(OG.Constants.TERMINAL_SUFFIX.GROUP));
				shape = this.getElementById(prevShapeId);
				if (shape) {
					shapeArray.push(shape);
				}
			}
		}

		return shapeArray;
	};

	/**
	 * 연결된 이전 노드 Element ID들을 반환한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @return {String[]} Previous Element Id's Array
	 */
	this.getPrevShapeIds = function (element) {
		var prevEdges = this.getPrevEdges(element),
			shapeArray = [],
			prevShapeId, i;

		for (i = 0; i < prevEdges.length; i++) {
			prevShapeId = $(prevEdges[i]).attr('_from');
			if (prevShapeId) {
				prevShapeId = prevShapeId.substring(0, prevShapeId.indexOf(OG.Constants.TERMINAL_SUFFIX.GROUP));
				shapeArray.push(prevShapeId);
			}
		}

		return shapeArray;
	};

	/**
	 * 연결된 이후 노드 Element 들을 반환한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @return {Element[]} Previous Element's Array
	 */
	this.getNextShapes = function (element) {
		var nextEdges = this.getNextEdges(element),
			shapeArray = [],
			nextShapeId, shape, i;

		for (i = 0; i < nextEdges.length; i++) {
			nextShapeId = $(nextEdges[i]).attr('_to');
			if (nextShapeId) {
				nextShapeId = nextShapeId.substring(0, nextShapeId.indexOf(OG.Constants.TERMINAL_SUFFIX.GROUP));
				shape = this.getElementById(nextShapeId);
				if (shape) {
					shapeArray.push(shape);
				}
			}
		}

		return shapeArray;
	};

	/**
	 * 연결된 이후 노드 Element ID들을 반환한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @return {String[]} Previous Element Id's Array
	 */
	this.getNextShapeIds = function (element) {
		var nextEdges = this.getNextEdges(element),
			shapeArray = [],
			nextShapeId, i;

		for (i = 0; i < nextEdges.length; i++) {
			nextShapeId = $(nextEdges[i]).attr('_to');
			if (nextShapeId) {
				nextShapeId = nextShapeId.substring(0, nextShapeId.indexOf(OG.Constants.TERMINAL_SUFFIX.GROUP));
				shapeArray.push(nextShapeId);
			}
		}

		return shapeArray;
	};

	/**
	 * Shape 이 처음 Draw 되었을 때의 이벤트 리스너
	 *
	 * @param {Function} callbackFunc 콜백함수(event, shapeElement)
	 */
	this.onDrawShape = function (callbackFunc) {
		$(this.getRootElement()).bind('drawShape', function (event, shapeElement) {
			callbackFunc(event, shapeElement);
		});
	};

	/**
	 * 라벨이 Draw 되었을 때의 이벤트 리스너
	 *
	 * @param {Function} callbackFunc 콜백함수(event, shapeElement, labelText)
	 */
	this.onDrawLabel = function (callbackFunc) {
		$(this.getRootElement()).bind('drawLabel', function (event, shapeElement, labelText) {
			callbackFunc(event, shapeElement, labelText);
		});
	};

	/**
	 * 라벨이 Change 되었을 때의 이벤트 리스너
	 *
	 * @param {Function} callbackFunc 콜백함수(event, shapeElement, afterText, beforeText)
	 */
	this.onLabelChanged = function (callbackFunc) {
		$(this.getRootElement()).bind('labelChanged', function (event, shapeElement, afterText, beforeText) {
			callbackFunc(event, shapeElement, afterText, beforeText);
		});
	};

	/**
	 * Shape 이 Redraw 되었을 때의 이벤트 리스너
	 *
	 * @param {Function} callbackFunc 콜백함수(event, shapeElement)
	 */
	this.onRedrawShape = function (callbackFunc) {
		$(this.getRootElement()).bind('redrawShape', function (event, shapeElement) {
			callbackFunc(event, shapeElement);
		});
	};

	/**
	 * Shape 이 Remove 될 때의 이벤트 리스너
	 *
	 * @param {Function} callbackFunc 콜백함수(event, shapeElement)
	 */
	this.onRemoveShape = function (callbackFunc) {
		$(this.getRootElement()).bind('removeShape', function (event, shapeElement) {
			callbackFunc(event, shapeElement);
		});
	};

	/**
	 * Shape 이 Rotate 될 때의 이벤트 리스너
	 *
	 * @param {Function} callbackFunc 콜백함수(event, element, angle)
	 */
	this.onRotateShape = function (callbackFunc) {
		$(this.getRootElement()).bind('rotateShape', function (event, element, angle) {
			callbackFunc(event, element, angle);
		});
	};

	/**
	 * Shape 이 Move 되었을 때의 이벤트 리스너
	 *
	 * @param {Function} callbackFunc 콜백함수(event, shapeElement, offset)
	 */
	this.onMoveShape = function (callbackFunc) {
		$(this.getRootElement()).bind('moveShape', function (event, shapeElement, offset) {
			callbackFunc(event, shapeElement, offset);
		});
	};

	/**
	 * Shape 이 Resize 되었을 때의 이벤트 리스너
	 *
	 * @param {Function} callbackFunc 콜백함수(event, shapeElement, offset)
	 */
	this.onResizeShape = function (callbackFunc) {
		$(this.getRootElement()).bind('resizeShape', function (event, shapeElement, offset) {
			callbackFunc(event, shapeElement, offset);
		});
	};

	/**
	 * Shape 이 Connect 되기전 이벤트 리스너
	 *
	 * @param {Function} callbackFunc 콜백함수(event, edgeElement, fromElement, toElement)
	 */
	this.onBeforeConnectShape = function (callbackFunc) {
		$(this.getRootElement()).bind('beforeConnectShape', function (event) {
			if (callbackFunc(event, event.edge, event.fromShape, event.toShape) === false) {
				event.stopPropagation();
			}
		});
	};

	/**
	 * Shape 이 Remove 되기전 이벤트 리스너
	 *
	 * @param {Function} callbackFunc 콜백함수(event, element)
	 */
	this.onBeforeRemoveShape = function (callbackFunc) {
		$(this.getRootElement()).bind('beforeRemoveShape', function (event) {
			if (callbackFunc(event, event.element) === false) {
				event.stopPropagation();
			}
		});
	};

	/**
	 * Shape 이 Connect 되었을 때의 이벤트 리스너
	 *
	 * @param {Function} callbackFunc 콜백함수(event, edgeElement, fromElement, toElement)
	 */
	this.onConnectShape = function (callbackFunc) {
		$(this.getRootElement()).bind('connectShape', function (event, edgeElement, fromElement, toElement) {
			callbackFunc(event, edgeElement, fromElement, toElement);
		});
	};

	/**
	 * Shape 이 Disconnect 되었을 때의 이벤트 리스너
	 *
	 * @param {Function} callbackFunc 콜백함수(event, edgeElement, fromElement, toElement)
	 */
	this.onDisconnectShape = function (callbackFunc) {
		$(this.getRootElement()).bind('disconnectShape', function (event, edgeElement, fromElement, toElement) {
			callbackFunc(event, edgeElement, fromElement, toElement);
		});
	};

	/**
	 * Shape 이 Grouping 되었을 때의 이벤트 리스너
	 *
	 * @param {Function} callbackFunc 콜백함수(event, groupElement)
	 */
	this.onGroup = function (callbackFunc) {
		$(this.getRootElement()).bind('group', function (event, groupElement) {
			callbackFunc(event, groupElement);
		});
	};

	/**
	 * Shape 이 UnGrouping 되었을 때의 이벤트 리스너
	 *
	 * @param {Function} callbackFunc 콜백함수(event, ungroupedElements)
	 */
	this.onUnGroup = function (callbackFunc) {
		$(this.getRootElement()).bind('ungroup', function (event, ungroupedElements) {
			callbackFunc(event, ungroupedElements);
		});
	};

	/**
	 * Group 이 Collapse 되었을 때의 이벤트 리스너
	 *
	 * @param {Function} callbackFunc 콜백함수(event, element)
	 */
	this.onCollapsed = function (callbackFunc) {
		$(this.getRootElement()).bind('collapsed', function (event, element) {
			callbackFunc(event, element);
		});
	};

	/**
	 * Group 이 Expand 되었을 때의 이벤트 리스너
	 *
	 * @param {Function} callbackFunc 콜백함수(event, element)
	 */
	this.onExpanded = function (callbackFunc) {
		$(this.getRootElement()).bind('expanded', function (event, element) {
			callbackFunc(event, element);
		});
	};
};
OG.graph.Canvas.prototype = new OG.graph.Canvas();
OG.graph.Canvas.prototype.constructor = OG.graph.Canvas;
OG.Canvas = OG.graph.Canvas;
