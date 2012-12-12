/**
 * OpenGraph 캔버스 클래스
 *
 * @class
 * @requires OG.common.*, OG.geometry.*, OG.shape.*, OG.renderer.*, OG.handler.*, OG.layout.*, raphael-2.1.0
 *
 * @example
 * var canvas = new OG.Canvas('canvas', [1000, 800], 'white', 'url(./images/grid.gif)');
 *
 * var circleShape = canvas.drawShape([100, 100], new OG.CircleShape(), [100, 100]);
 * var ellipseShape = canvas.drawShape([300, 200], new OG.EllipseShape('label'), [100, 50]);
 *
 * var edge = canvas.connect(circleShape, ellipseShape);
 *
 * @param {HTMLElement,String} container 컨테이너 DOM element or ID
 * @param {Number[]} containerSize 컨테이너 Width, Height
 * @param {String} backgroundColor 캔버스 배경색
 * @param {String} backgroundImage 캔버스 배경이미지
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.graph.Canvas = function (container, containerSize, backgroundColor, backgroundImage) {
	this._RENDERER = container ? new OG.RaphaelRenderer(container, containerSize, backgroundColor, backgroundImage) : null;
	this._HANDLER = new OG.EventHandler(this._RENDERER);
	this._CONTAINER = OG.Util.isElement(container) ? container : document.getElementById(container);
};

OG.graph.Canvas.prototype = {

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
	initConfig: function (config) {
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

		this._HANDLER.setDragSelectable(OG.Constants.SELECTABLE && OG.Constants.DRAG_SELECTABLE);
		this._HANDLER.setEnableHotKey(OG.Constants.ENABLE_HOTKEY);
		if (OG.Constants.ENABLE_CONTEXTMENU) {
			this._HANDLER.enableRootContextMenu();
			this._HANDLER.enableShapeContextMenu();
		}

		this.CONFIG_INITIALIZED = true;
	},

	/**
	 * 랜더러를 반환한다.
	 *
	 * @return {OG.RaphaelRenderer}
	 */
	getRenderer: function () {
		return this._RENDERER;
	},

	/**
	 * 컨테이너 DOM element 를 반환한다.
	 *
	 * @return {HTMLElement}
	 */
	getContainer: function () {
		return this._CONTAINER;
	},

	/**
	 * 이벤트 핸들러를 반환한다.
	 *
	 * @return {OG.EventHandler}
	 */
	getEventHandler: function () {
		return this._HANDLER;
	},

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
	drawShape: function (position, shape, size, style, id, parentId, gridable) {
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

		var element = this._RENDERER.drawShape(position, shape, size, style, id);

		if (position && (shape.TYPE === OG.Constants.SHAPE_TYPE.EDGE)) {
			element = this._RENDERER.move(element, position);
		}

		if (parentId && this._RENDERER.getElementById(parentId)) {
			this._RENDERER.appendChild(element, parentId);
		}

		if (!this.CONFIG_INITIALIZED) {
			this.initConfig();
		}

		this._HANDLER.setClickSelectable(element, OG.Constants.SELECTABLE);
		this._HANDLER.setMovable(element, OG.Constants.SELECTABLE && OG.Constants.MOVABLE);

		if (OG.Constants.CONNECTABLE) {
			this._HANDLER.enableConnect(element);
		}

		if (OG.Constants.LABEL_EDITABLE) {
			this._HANDLER.enableEditLabel(element);
		}

		if (OG.Constants.GROUP_DROPABLE) {
			this._HANDLER.enableDragAndDropGroup(element);
		}

		if (OG.Constants.GROUP_COLLAPSIBLE) {
			this._HANDLER.enableCollapse(element);
		}

		return element;
	},

	/**
	 * Shape 의 스타일을 변경한다.
	 *
	 * @param {Element} shapeElement Shape DOM element
	 * @param {Object} style 스타일
	 */
	setShapeStyle: function (shapeElement, style) {
		this._RENDERER.setShapeStyle(shapeElement, style);
	},

	/**
	 * Shape 의 Label 을 캔버스에 위치 및 사이즈 지정하여 드로잉한다.
	 *
	 * @param {Element,String} shapeElement Shape DOM element or ID
	 * @param {String} text 텍스트
	 * @param {OG.geometry.Style,Object} style 스타일
	 * @return {Element} DOM Element
	 * @override
	 */
	drawLabel: function (shapeElement, text, style) {
		return this._RENDERER.drawLabel(shapeElement, text, style);
	},

	/**
	 * Shape 의 연결된 Edge 를 redraw 한다.(이동 또는 리사이즈시)
	 *
	 * @param {Element} element
	 * @param {String[]} excludeEdgeId redraw 제외할 Edge ID
	 */
	redrawConnectedEdge: function (element, excludeEdgeId) {
		this._RENDERER.redrawConnectedEdge(element, excludeEdgeId);
	},

	/**
	 * 두개의 Shape 을 Edge 로 연결한다.
	 *
	 * @param {Element} fromElement from Shape Element
	 * @param {Element} toElement to Shape Element
	 * @param {OG.geometry.Style,Object} style 스타일
	 * @param {String} label Label
	 * @return {Element} 연결된 Edge 엘리먼트
	 */
	connect: function (fromElement, toElement, style, label) {
		var terminalGroup, childTerminals, fromTerminal, toTerminal, i, edge, guide;

		// from Shape 센터 연결 터미널 찾기
		terminalGroup = this._RENDERER.drawTerminal(fromElement, OG.Constants.TERMINAL_TYPE.OUT);
		childTerminals = terminalGroup.terminal.childNodes;
		fromTerminal = childTerminals[0];
		for (i = 0; i < childTerminals.length; i++) {
			if (childTerminals[i].terminal && childTerminals[i].terminal.direction.toLowerCase() === "c") {
				fromTerminal = childTerminals[i];
				break;
			}
		}
		this._RENDERER.removeTerminal(fromElement);

		// to Shape 센터 연결 터미널 찾기
		terminalGroup = this._RENDERER.drawTerminal(toElement, OG.Constants.TERMINAL_TYPE.IN);
		childTerminals = terminalGroup.terminal.childNodes;
		toTerminal = childTerminals[0];
		for (i = 0; i < childTerminals.length; i++) {
			if (childTerminals[i].terminal && childTerminals[i].terminal.direction.toLowerCase() === "c") {
				toTerminal = childTerminals[i];
				break;
			}
		}
		this._RENDERER.removeTerminal(toElement);

		// draw edge
		edge = this._RENDERER.drawShape(null, new OG.EdgeShape(fromTerminal.terminal.position, toTerminal.terminal.position));

		// connect
		edge = this._RENDERER.connect(fromTerminal, toTerminal, edge, style, label);

		if (edge) {
			guide = this._RENDERER.drawGuide(edge);

			if (edge && guide) {
				// enable event
				this._HANDLER.setClickSelectable(edge, OG.Constants.SELECTABLE);
				this._HANDLER.setMovable(edge, OG.Constants.SELECTABLE && OG.Constants.MOVABLE);
				this._HANDLER.setResizable(edge, guide, OG.Constants.SELECTABLE && OG.Constants.RESIZABLE);
				if ($(edge).attr("_shape") !== OG.Constants.SHAPE_TYPE.GROUP) {
					if (OG.Constants.LABEL_EDITABLE) {
						this._HANDLER.enableEditLabel(edge);
					}
				}
				this._RENDERER.toFront(guide.group);
			}
		}

		return edge;
	},

	/**
	 * 연결속성정보를 삭제한다. Edge 인 경우는 라인만 삭제하고, 일반 Shape 인 경우는 연결된 모든 Edge 를 삭제한다.
	 *
	 * @param {Element} element
	 */
	disconnect: function (element) {
		this._RENDERER.disconnect(element);
	},

	/**
	 * 주어진 Shape 들을 그룹핑한다.
	 *
	 * @param {Element[]} elements
	 * @return {Element} Group Shape Element
	 */
	group: function (elements) {
		var group = this._RENDERER.group(elements);

		// enable event
		this._HANDLER.setClickSelectable(group, OG.Constants.SELECTABLE);
		this._HANDLER.setMovable(group, OG.Constants.SELECTABLE && OG.Constants.MOVABLE);
		if ($(group).attr("_shape") !== OG.Constants.SHAPE_TYPE.GROUP) {
			if (OG.Constants.LABEL_EDITABLE) {
				this._HANDLER.enableEditLabel(group);
			}
		}

		return group;
	},

	/**
	 * 주어진 그룹들을 그룹해제한다.
	 *
	 * @param {Element[]} groupElements
	 * @return {Element[]} ungrouped Elements
	 */
	ungroup: function (groupElements) {
		return this._RENDERER.ungroup(groupElements);
	},

	/**
	 * 주어진 Shape 들을 그룹에 추가한다.
	 *
	 * @param {Element} groupElement
	 * @param {Element[]} elements
	 */
	addToGroup: function (groupElement, elements) {
		this._RENDERER.addToGroup(groupElement, elements);
	},

	/**
	 * 주어진 Shape 이 그룹인 경우 collapse 한다.
	 *
	 * @param {Element} element
	 */
	collapse: function (element) {
		this._RENDERERDERER.collapse(element);
	},

	/**
	 * 주어진 Shape 이 그룹인 경우 expand 한다.
	 *
	 * @param {Element} element
	 */
	expand: function (element) {
		this._RENDERER.expand(element);
	},

	/**
	 * 드로잉된 모든 오브젝트를 클리어한다.
	 */
	clear: function () {
		this._RENDERER.clear();
	},

	/**
	 * Shape 을 캔버스에서 관련된 모두를 삭제한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 */
	removeShape: function (element) {
		this._RENDERER.removeShape(element);
	},

	/**
	 * 하위 엘리먼트만 제거한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 */
	removeChild: function (element) {
		this._RENDERER.removeChild(element);
	},

	/**
	 * ID에 해당하는 Element 의 Move & Resize 용 가이드를 제거한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 */
	removeGuide: function (element) {
		this._RENDERER.removeGuide(element);
	},

	/**
	 * 모든 Move & Resize 용 가이드를 제거한다.
	 */
	removeAllGuide: function () {
		this._RENDERER.removeAllGuide();
	},

	/**
	 * 랜더러 캔버스 Root Element 를 반환한다.
	 *
	 * @return {Element} Element
	 */
	getRootElement: function () {
		return this._RENDERER.getRootElement();
	},

	/**
	 * 랜더러 캔버스 Root Group Element 를 반환한다.
	 *
	 * @return {Element} Element
	 */
	getRootGroup: function () {
		return this._RENDERER.getRootGroup();
	},

	/**
	 * 주어진 지점을 포함하는 Top Element 를 반환한다.
	 *
	 * @param {Number[]} position 위치 좌표
	 * @return {Element} Element
	 */
	getElementByPoint: function (position) {
		return this._RENDERER.getElementByPoint(position);
	},

	/**
	 * 주어진 Boundary Box 영역에 포함되는 Shape(GEOM, TEXT, IMAGE) Element 를 반환한다.
	 *
	 * @param {OG.geometry.Envelope} envelope Boundary Box 영역
	 * @return {Element[]} Element
	 */
	getElementsByBBox: function (envelope) {
		return this._RENDERER.getElementsByBBox(envelope);
	},

	/**
	 * 엘리먼트에 속성값을 설정한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @param {Object} attribute 속성값
	 */
	setAttr: function (element, attribute) {
		this._RENDERER.setAttr(element, attribute);
	},

	/**
	 * 엘리먼트 속성값을 반환한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @param {String} attrName 속성이름
	 * @return {Object} attribute 속성값
	 */
	getAttr: function (element, attrName) {
		return this._RENDERER.getAttr(element, attrName);
	},

	/**
	 * ID에 해당하는 Element 를 최상단 레이어로 이동한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 */
	toFront: function (element) {
		this._RENDERER.toFront(element);
	},

	/**
	 * ID에 해당하는 Element 를 최하단 레이어로 이동한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 */
	toBack: function (element) {
		this._RENDERER.toBack(element);
	},

	/**
	 * 랜더러 캔버스의 사이즈(Width, Height)를 반환한다.
	 *
	 * @return {Number[]} Canvas Width, Height
	 */
	getCanvasSize: function () {
		this._RENDERER.getCanvasSize();
	},

	/**
	 * 랜더러 캔버스의 사이즈(Width, Height)를 변경한다.
	 *
	 * @param {Number[]} size Canvas Width, Height
	 */
	setCanvasSize: function (size) {
		this._RENDERER.setCanvasSize(size);
	},

	/**
	 * 랜더러 캔버스의 사이즈(Width, Height)를 실제 존재하는 Shape 의 영역에 맞게 변경한다.
	 *
	 * @param {Number[]} minSize Canvas 최소 Width, Height
	 * @param {Boolean} fitScale 주어진 minSize 에 맞게 fit 여부(Default:false)
	 */
	fitCanvasSize: function (minSize, fitScale) {
		this._RENDERER.fitCanvasSize(minSize, fitScale);
	},

	/**
	 * 새로운 View Box 영역을 설정한다. (ZoomIn & ZoomOut 가능)
	 *
	 * @param @param {Number[]} position 위치 좌표(좌상단 기준)
	 * @param {Number[]} size Canvas Width, Height
	 * @param {Boolean} isFit Fit 여부
	 */
	setViewBox: function (position, size, isFit) {
		this._RENDERER.setViewBox(position, size, isFit);
	},

	/**
	 * Scale 을 반환한다. (리얼 사이즈 : Scale = 1)
	 *
	 */
	getScale: function () {
		this._RENDERER.getScale();
	},

	/**
	 * Scale 을 설정한다. (리얼 사이즈 : Scale = 1)
	 *
	 * @param {Number} scale 스케일값
	 */
	setScale: function (scale) {
		this._RENDERER.setScale(scale);
	},

	/**
	 * ID에 해당하는 Element 를 캔버스에서 show 한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 */
	show: function (element) {
		this._RENDERER.show(element);
	},

	/**
	 * ID에 해당하는 Element 를 캔버스에서 hide 한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 */
	hide: function (element) {
		this._RENDERER.hide(element);
	},

	/**
	 * Source Element 를 Target Element 아래에 append 한다.
	 *
	 * @param {Element,String} srcElement Element 또는 ID
	 * @param {Element,String} targetElement Element 또는 ID
	 * @return {Element} Source Element
	 */
	appendChild: function (srcElement, targetElement) {
		return this._RENDERER.appendChild(srcElement, targetElement);
	},

	/**
	 * Source Element 를 Target Element 이후에 insert 한다.
	 *
	 * @param {Element,String} srcElement Element 또는 ID
	 * @param {Element,String} targetElement Element 또는 ID
	 * @return {Element} Source Element
	 */
	insertAfter: function (srcElement, targetElement) {
		return this._RENDERER.insertAfter(srcElement, targetElement);
	},

	/**
	 * Source Element 를 Target Element 이전에 insert 한다.
	 *
	 * @param {Element,String} srcElement Element 또는 ID
	 * @param {Element,String} targetElement Element 또는 ID
	 * @return {Element} Source Element
	 */
	insertBefore: function (srcElement, targetElement) {
		return this._RENDERER.insertBefore(srcElement, targetElement);
	},

	/**
	 * 해당 Element 를 가로, 세로 Offset 만큼 이동한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @param {Number[]} offset [가로, 세로]
	 * @param {String[]} excludeEdgeId redraw 제외할 Edge ID
	 * @return {Element} Element
	 */
	move: function (element, offset, excludeEdgeId) {
		return this._RENDERER.move(element, offset, excludeEdgeId);
	},

	/**
	 * 주어진 중심좌표로 해당 Element 를 이동한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @param {Number[]} position [x, y]
	 * @param {String[]} excludeEdgeId redraw 제외할 Edge ID
	 * @return {Element} Element
	 */
	moveCentroid: function (element, position, excludeEdgeId) {
		return this._RENDERER.moveCentroid(element, position, excludeEdgeId);
	},

	/**
	 * 중심 좌표를 기준으로 주어진 각도 만큼 회전한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @param {Number} angle 각도
	 * @param {String[]} excludeEdgeId redraw 제외할 Edge ID
	 * @return {Element} Element
	 */
	rotate: function (element, angle, excludeEdgeId) {
		return this._RENDERER.rotate(element, angle, excludeEdgeId);
	},

	/**
	 * 상, 하, 좌, 우 외곽선을 이동한 만큼 리사이즈 한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @param {Number[]} offset [상, 하, 좌, 우] 각 방향으로 + 값
	 * @param {String[]} excludeEdgeId redraw 제외할 Edge ID
	 * @return {Element} Element
	 */
	resize: function (element, offset, excludeEdgeId) {
		return this._RENDERER.resize(element, offset, excludeEdgeId);
	},

	/**
	 * 중심좌표는 고정한 채 Bounding Box 의 width, height 를 리사이즈 한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @param {Number[]} size [Width, Height]
	 * @return {Element} Element
	 */
	resizeBox: function (element, size) {
		return this._RENDERER.resizeBox(element, size);
	},

	/**
	 * 노드 Element 를 복사한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @return {Element} Element
	 */
	clone: function (element) {
		return this._RENDERER.clone(element);
	},

	/**
	 * ID로 Node Element 를 반환한다.
	 *
	 * @param {String} id
	 * @return {Element} Element
	 */
	getElementById: function (id) {
		return this._RENDERER.getElementById(id);
	},

	/**
	 * Shape 타입에 해당하는 Node Element 들을 반환한다.
	 *
	 * @param {String} shapeType Shape 타입(GEOM, HTML, IMAGE, EDGE, GROUP), Null 이면 모든 타입
	 * @param {String} excludeType 제외 할 타입
	 * @return {Element[]} Element's Array
	 */
	getElementsByType: function (shapeType, excludeType) {
		return this._RENDERER.getElementsByType(shapeType, excludeType);
	},

	/**
	 * Shape ID에 해당하는 Node Element 들을 반환한다.
	 *
	 * @param {String} shapeId Shape ID
	 * @return {Element[]} Element's Array
	 */
	getElementsByShapeId: function (shapeId) {
		var root = this.getRootGroup();
		return $(root).find("[_type=SHAPE][_shape_id='" + shapeId + "']");
	},

	/**
	 * Edge 엘리먼트와 연결된 fromShape, toShape 엘리먼트를 반환한다.
	 *
	 * @param {Element,String} edgeElement Element 또는 ID
	 * @return {Object}
	 */
	getRelatedElementsFromEdge: function (edgeElement) {
		var edge = OG.Util.isElement(edgeElement) ? edgeElement : this.getElementById(edgeElement),
			getShapeFromTerminal = function (terminal) {
				var terminalId = OG.Util.isElement(terminal) ? terminal.id : terminal;
				if (terminalId) {
					return this._RENDERER.getElementById(terminalId.substring(0, terminalId.indexOf(OG.Constants.TERMINAL_SUFFIX.GROUP)));
				} else {
					return null;
				}
			};


		if ($(edge).attr('_shape') === OG.Constants.SHAPE_TYPE.EDGE) {
			return {
				from: getShapeFromTerminal($(edgeElement).attr('_from')),
				to  : getShapeFromTerminal($(edgeElement).attr('_to'))
			};
		} else {
			return {
				from: null,
				to  : null
			};
		}
	},

	/**
	 * 해당 엘리먼트의 BoundingBox 영역 정보를 반환한다.
	 *
	 * @param {Element,String} element
	 * @return {Object} {width, height, x, y, x2, y2}
	 */
	getBBox: function (element) {
		return this._RENDERER.getBBox(element);
	},

	/**
	 * 부모노드기준으로 캔버스 루트 엘리먼트의 BoundingBox 영역 정보를 반환한다.
	 *
	 * @return {Object} {width, height, x, y, x2, y2}
	 */
	getRootBBox: function () {
		return this._RENDERER.getRootBBox();
	},

	/**
	 * 부모노드기준으로 캔버스 루트 엘리먼트의 실제 Shape 이 차지하는 BoundingBox 영역 정보를 반환한다.
	 *
	 * @return {Object} {width, height, x, y, x2, y2}
	 */
	getRealRootBBox: function () {
		return this._RENDERER.getRealRootBBox();
	},

	/**
	 * SVG 인지 여부를 반환한다.
	 *
	 * @return {Boolean} svg 여부
	 */
	isSVG: function () {
		return this._RENDERER.isSVG();
	},

	/**
	 * VML 인지 여부를 반환한다.
	 *
	 * @return {Boolean} vml 여부
	 */
	isVML: function () {
		return this._RENDERER.isVML();
	},

	/**
	 * 주어진 Shape 엘리먼트에 커스텀 데이타를 저장한다.
	 *
	 * @param {Element,String} shapeElement Shape DOM Element or ID
	 * @param {Object} data JSON 포맷의 Object
	 */
	setCustomData: function (shapeElement, data) {
		var element = OG.Util.isElement(shapeElement) ? shapeElement : document.getElementById(shapeElement);
		element.data = data;
	},

	/**
	 * 주어진 Shape 엘리먼트에 저장된 커스텀 데이터를 반환한다.
	 *
	 * @param {Element,String} shapeElement Shape DOM Element or ID
	 * @return {Object} JSON 포맷의 Object
	 */
	getCustomData: function (shapeElement) {
		var element = OG.Util.isElement(shapeElement) ? shapeElement : document.getElementById(shapeElement);
		return element.data;
	},

	/**
	 *    Canvas 에 그려진 Shape 들을 OpenGraph XML 문자열로 export 한다.
	 *
	 * @return {String} XML 문자열
	 */
	toXML: function () {
		return OG.Util.jsonToXml(this.toJSON());
	},

	/**
	 * Canvas 에 그려진 Shape 들을 OpenGraph JSON 객체로 export 한다.
	 *
	 * @return {Object} JSON 포맷의 Object
	 */
	toJSON: function () {
		var CANVAS = this,
			rootBBox = this._RENDERER.getRootBBox(),
			rootGroup = this._RENDERER.getRootGroup(),
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
					to,
					prevShapeIds,
					nextShapeIds;

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

				if (shape.TYPE === OG.Constants.SHAPE_TYPE.EDGE) {
					if ($(item).attr('_from')) {
						cell['@from'] = $(item).attr('_from');
					}
					if ($(item).attr('_to')) {
						cell['@to'] = $(item).attr('_to');
					}
				} else {
					prevShapeIds = CANVAS.getPrevShapeIds(item);
					nextShapeIds = CANVAS.getNextShapeIds(item);
					if (prevShapeIds.length > 0) {
						cell['@from'] = prevShapeIds.toString();
					}
					if (nextShapeIds.length > 0) {
						cell['@to'] = nextShapeIds.toString();
					}
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
	},

	/**
	 * OpenGraph XML 문자열로 부터 Shape 을 드로잉한다.
	 *
	 * @param {String, Element} xml XML 문자열 또는 DOM Element
	 * @return {Object} {width, height, x, y, x2, y2}
	 */
	loadXML: function (xml) {
		if (!OG.Util.isElement(xml)) {
			xml = OG.Util.parseXML(xml);
		}
		return this.loadJSON(OG.Util.xmlToJson(xml));
	},

	/**
	 * JSON 객체로 부터 Shape 을 드로잉한다.
	 *
	 * @param {Object} json JSON 포맷의 Object
	 * @return {Object} {width, height, x, y, x2, y2}
	 */
	loadJSON: function (json) {
		var canvasWidth, canvasHeight, rootGroup,
			minX = Number.MAX_VALUE, minY = Number.MAX_VALUE, maxX = Number.MIN_VALUE, maxY = Number.MIN_VALUE,
			i, cell, shape, id, parent, shapeType, shapeId, x, y, width, height, style, geom, from, to,
			fromEdge, toEdge, label, fromLabel, toLabel, angle, value, data, element;

		this._RENDERER.clear();

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
	},

	/**
	 * 연결된 이전 Edge Element 들을 반환한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @return {Element[]} Previous Element's Array
	 */
	getPrevEdges: function (element) {
		return this._RENDERER.getPrevEdges(element);
	},

	/**
	 * 연결된 이후 Edge Element 들을 반환한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @return {Element[]} Previous Element's Array
	 */
	getNextEdges: function (element) {
		return this._RENDERER.getNextEdges(element);
	},

	/**
	 * 연결된 이전 노드 Element 들을 반환한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @return {Element[]} Previous Element's Array
	 */
	getPrevShapes: function (element) {
		return this._RENDERER.getPrevShapes(element);
	},

	/**
	 * 연결된 이전 노드 Element ID들을 반환한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @return {String[]} Previous Element Id's Array
	 */
	getPrevShapeIds: function (element) {
		return this._RENDERER.getPrevShapeIds(element);
	},

	/**
	 * 연결된 이후 노드 Element 들을 반환한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @return {Element[]} Previous Element's Array
	 */
	getNextShapes: function (element) {
		return this._RENDERER.getNextShapes(element);
	},

	/**
	 * 연결된 이후 노드 Element ID들을 반환한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @return {String[]} Previous Element Id's Array
	 */
	getNextShapeIds: function (element) {
		return this._RENDERER.getNextShapeIds(element);
	},

	/**
	 * Shape 이 처음 Draw 되었을 때의 이벤트 리스너
	 *
	 * @param {Function} callbackFunc 콜백함수(event, shapeElement)
	 */
	onDrawShape: function (callbackFunc) {
		$(this.getRootElement()).bind('drawShape', function (event, shapeElement) {
			callbackFunc(event, shapeElement);
		});
	},

	/**
	 * 라벨이 Draw 되었을 때의 이벤트 리스너
	 *
	 * @param {Function} callbackFunc 콜백함수(event, shapeElement, labelText)
	 */
	onDrawLabel: function (callbackFunc) {
		$(this.getRootElement()).bind('drawLabel', function (event, shapeElement, labelText) {
			callbackFunc(event, shapeElement, labelText);
		});
	},

	/**
	 * 라벨이 Change 되었을 때의 이벤트 리스너
	 *
	 * @param {Function} callbackFunc 콜백함수(event, shapeElement, afterText, beforeText)
	 */
	onLabelChanged: function (callbackFunc) {
		$(this.getRootElement()).bind('labelChanged', function (event, shapeElement, afterText, beforeText) {
			callbackFunc(event, shapeElement, afterText, beforeText);
		});
	},

	/**
	 * 라벨이 Change 되기전 이벤트 리스너
	 *
	 * @param {Function} callbackFunc 콜백함수(event, shapeElement, afterText, beforeText)
	 */
	onBeforeLabelChange: function (callbackFunc) {
		$(this.getRootElement()).bind('beforeLabelChange', function (event) {
			if (callbackFunc(event, event.element, event.afterText, event.beforeText) === false) {
				event.stopPropagation();
			}
		});
	},

	/**
	 * Shape 이 Redraw 되었을 때의 이벤트 리스너
	 *
	 * @param {Function} callbackFunc 콜백함수(event, shapeElement)
	 */
	onRedrawShape: function (callbackFunc) {
		$(this.getRootElement()).bind('redrawShape', function (event, shapeElement) {
			callbackFunc(event, shapeElement);
		});
	},

	/**
	 * Shape 이 Remove 될 때의 이벤트 리스너
	 *
	 * @param {Function} callbackFunc 콜백함수(event, shapeElement)
	 */
	onRemoveShape: function (callbackFunc) {
		$(this.getRootElement()).bind('removeShape', function (event, shapeElement) {
			callbackFunc(event, shapeElement);
		});
	},

	/**
	 * Shape 이 Rotate 될 때의 이벤트 리스너
	 *
	 * @param {Function} callbackFunc 콜백함수(event, element, angle)
	 */
	onRotateShape: function (callbackFunc) {
		$(this.getRootElement()).bind('rotateShape', function (event, element, angle) {
			callbackFunc(event, element, angle);
		});
	},

	/**
	 * Shape 이 Move 되었을 때의 이벤트 리스너
	 *
	 * @param {Function} callbackFunc 콜백함수(event, shapeElement, offset)
	 */
	onMoveShape: function (callbackFunc) {
		$(this.getRootElement()).bind('moveShape', function (event, shapeElement, offset) {
			callbackFunc(event, shapeElement, offset);
		});
	},

	/**
	 * Shape 이 Resize 되었을 때의 이벤트 리스너
	 *
	 * @param {Function} callbackFunc 콜백함수(event, shapeElement, offset)
	 */
	onResizeShape: function (callbackFunc) {
		$(this.getRootElement()).bind('resizeShape', function (event, shapeElement, offset) {
			callbackFunc(event, shapeElement, offset);
		});
	},

	/**
	 * Shape 이 Connect 되기전 이벤트 리스너
	 *
	 * @param {Function} callbackFunc 콜백함수(event, edgeElement, fromElement, toElement)
	 */
	onBeforeConnectShape: function (callbackFunc) {
		$(this.getRootElement()).bind('beforeConnectShape', function (event) {
			if (callbackFunc(event, event.edge, event.fromShape, event.toShape) === false) {
				event.stopPropagation();
			}
		});
	},

	/**
	 * Shape 이 Remove 되기전 이벤트 리스너
	 *
	 * @param {Function} callbackFunc 콜백함수(event, element)
	 */
	onBeforeRemoveShape: function (callbackFunc) {
		$(this.getRootElement()).bind('beforeRemoveShape', function (event) {
			if (callbackFunc(event, event.element) === false) {
				event.stopPropagation();
			}
		});
	},

	/**
	 * Shape 이 Connect 되었을 때의 이벤트 리스너
	 *
	 * @param {Function} callbackFunc 콜백함수(event, edgeElement, fromElement, toElement)
	 */
	onConnectShape: function (callbackFunc) {
		$(this.getRootElement()).bind('connectShape', function (event, edgeElement, fromElement, toElement) {
			callbackFunc(event, edgeElement, fromElement, toElement);
		});
	},

	/**
	 * Shape 이 Disconnect 되었을 때의 이벤트 리스너
	 *
	 * @param {Function} callbackFunc 콜백함수(event, edgeElement, fromElement, toElement)
	 */
	onDisconnectShape: function (callbackFunc) {
		$(this.getRootElement()).bind('disconnectShape', function (event, edgeElement, fromElement, toElement) {
			callbackFunc(event, edgeElement, fromElement, toElement);
		});
	},

	/**
	 * Shape 이 Grouping 되었을 때의 이벤트 리스너
	 *
	 * @param {Function} callbackFunc 콜백함수(event, groupElement)
	 */
	onGroup: function (callbackFunc) {
		$(this.getRootElement()).bind('group', function (event, groupElement) {
			callbackFunc(event, groupElement);
		});
	},

	/**
	 * Shape 이 UnGrouping 되었을 때의 이벤트 리스너
	 *
	 * @param {Function} callbackFunc 콜백함수(event, ungroupedElements)
	 */
	onUnGroup: function (callbackFunc) {
		$(this.getRootElement()).bind('ungroup', function (event, ungroupedElements) {
			callbackFunc(event, ungroupedElements);
		});
	},

	/**
	 * Group 이 Collapse 되었을 때의 이벤트 리스너
	 *
	 * @param {Function} callbackFunc 콜백함수(event, element)
	 */
	onCollapsed: function (callbackFunc) {
		$(this.getRootElement()).bind('collapsed', function (event, element) {
			callbackFunc(event, element);
		});
	},

	/**
	 * Group 이 Expand 되었을 때의 이벤트 리스너
	 *
	 * @param {Function} callbackFunc 콜백함수(event, element)
	 */
	onExpanded: function (callbackFunc) {
		$(this.getRootElement()).bind('expanded', function (event, element) {
			callbackFunc(event, element);
		});
	}
};
OG.graph.Canvas.prototype.constructor = OG.graph.Canvas;
OG.Canvas = OG.graph.Canvas;