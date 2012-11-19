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