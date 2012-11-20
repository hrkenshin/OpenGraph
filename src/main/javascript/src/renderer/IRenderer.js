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

	/**
	 * 연결된 이전 Edge Element 들을 반환한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @return {Element[]} Previous Element's Array
	 */
	this.getPrevEdges = function (element) {
		throw new OG.NotImplementedException();
	};

	/**
	 * 연결된 이후 Edge Element 들을 반환한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @return {Element[]} Previous Element's Array
	 */
	this.getNextEdges = function (element) {
		throw new OG.NotImplementedException();
	};

	/**
	 * 연결된 이전 노드 Element 들을 반환한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @return {Element[]} Previous Element's Array
	 */
	this.getPrevShapes = function (element) {
		throw new OG.NotImplementedException();
	};

	/**
	 * 연결된 이전 노드 Element ID들을 반환한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @return {String[]} Previous Element Id's Array
	 */
	this.getPrevShapeIds = function (element) {
		throw new OG.NotImplementedException();
	};

	/**
	 * 연결된 이후 노드 Element 들을 반환한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @return {Element[]} Previous Element's Array
	 */
	this.getNextShapes = function (element) {
		throw new OG.NotImplementedException();
	};

	/**
	 * 연결된 이후 노드 Element ID들을 반환한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @return {String[]} Previous Element Id's Array
	 */
	this.getNextShapeIds = function (element) {
		throw new OG.NotImplementedException();
	};
};
OG.renderer.IRenderer.prototype = new OG.renderer.IRenderer();
OG.renderer.IRenderer.prototype.constructor = OG.renderer.IRenderer;