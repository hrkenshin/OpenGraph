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
		bezierCurve,
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

		case OG.Constants.GEOM_TYPE.BEZIER_CURVE:
			pathStr = "";
			vertices = geometry.getControlPoints();
			for (i = 0; i < vertices.length; i++) {
				if (i === 0) {
					pathStr = "M" + vertices[i].x + " " + vertices[i].y;
				} else if (i === 1) {
					pathStr += "C" + vertices[i].x + " " + vertices[i].y;
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
	 * 시작좌표, 끝좌표를 연결하는 베지어 곡선의 콘트롤 포인트를 반환한다.
	 *
	 * @param {Number[]} from 시작좌표
	 * @param {Number[]} to 끝좌표
	 * @param {String} fromDirection 방향(E,W,S,N)
	 * @param {String} toDirection 방향(E,W,S,N)
	 * @return {Number[][]} [시작좌표, 콘트롤포인트1, 콘트롤포인트2, 끝좌표]
	 */
	bezierCurve = function (from, to, fromDirection, toDirection) {
		var coefficient = 100, direction1 = [1, 0], direction2 = [-1, 0],
			distance, d1, d2, bezierPoints = [];

		distance = Math.sqrt(Math.pow(from[0] - to[0], 2) + Math.pow(from[1] - to[1], 2));
		if (distance < coefficient) {
			coefficient = distance / 2;
		}

		switch (fromDirection.toLowerCase()) {
		case "e":
			direction1 = [1, 0];
			break;
		case "w":
			direction1 = [-1, 0];
			break;
		case "s":
			direction1 = [0, 1];
			break;
		case "n":
			direction1 = [0, -1];
			break;
		default:
			direction1 = [1, 0];
			break;
		}

		switch (toDirection.toLowerCase()) {
		case "e":
			direction2 = [1, 0];
			break;
		case "w":
			direction2 = [-1, 0];
			break;
		case "s":
			direction2 = [0, 1];
			break;
		case "n":
			direction2 = [0, -1];
			break;
		default:
			direction2 = [-1, 0];
			break;
		}

		// Calculating the direction vectors d1 and d2
		d1 = [direction1[0] * coefficient, direction1[1] * coefficient];
		d2 = [direction2[0] * coefficient, direction2[1] * coefficient];

		// Bezier Curve Poinsts(from, control_point1, control_point2, to)
		bezierPoints[0] = from;
		bezierPoints[1] = [from[0] + d1[0], from[1] + d1[1]];
		bezierPoints[2] = [to[0] + d2[0], to[1] + d2[1]];
		bezierPoints[3] = to;

		return bezierPoints;
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
				edge_direction = _style["edge-direction"].toLowerCase().split(" ");

				// 'c' 인 경우 위치 보정
				if (edge_direction[0] === "c" || edge_direction[1] === "c") {
					edge_direction = adjustEdgeDirection(edge_direction[0], edge_direction[1], [from.x, from.y], [to.x, to.y]).split(" ");
				}

				points = bezierCurve([from.x, from.y], [to.x, to.y], edge_direction[0], edge_direction[1]);
				break;
			}
		} else if (line instanceof OG.geometry.Curve) {
			points = line.getControlPoints();
		} else if (line instanceof OG.geometry.BezierCurve) {
			points = line.getControlPoints();
		} else {
			points = vertices;
		}

		// Draw geometry
		if (isSelf) {
			edge = new OG.Curve(points);
		} else if (line instanceof OG.geometry.Curve) {
			edge = new OG.Curve(points);
		} else if (line instanceof OG.geometry.BezierCurve) {
			edge = new OG.BezierCurve(points);
		} else {
			if (_style["edge-type"].toLowerCase() === OG.Constants.EDGE_TYPE.BEZIER) {
				edge = new OG.BezierCurve(points);
			} else {
				edge = new OG.PolyLine(points);
			}
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
			element, labelElement, envelope, _style = {}, position, size, beforeText, beforeEvent,
			/**
			 * 라인(꺽은선)의 중심위치를 반환한다.
			 *
			 * @param {Element} element Edge 엘리먼트
			 * @return {OG.Coordinate}
			 */
				getCenterOfEdge = function (element) {
				var vertices, from, to, lineLength, distance = 0, i, intersectArray;

				if (element.shape.geom.style.get("edge-type") === OG.Constants.EDGE_TYPE.BEZIER) {
					vertices = element.shape.geom.getControlPoints();
					from = vertices[0];
					to = vertices[vertices.length - 1];
					return new OG.geometry.Coordinate(OG.Util.round((from.x + to.x) / 2), OG.Util.round((from.y + to.y) / 2));
				} else {
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
				}
			},
			centerOfEdge;

		OG.Util.apply(_style, (style instanceof OG.geometry.Style) ? style.map : style || {});

		if (rElement && rElement.node.shape) {
			text = OG.Util.trim(text);
			element = rElement.node;
			envelope = element.shape.geom.getBoundary();
			beforeText = element.shape.label;

			// beforeLabelChange event fire
			if (text !== undefined && text !== beforeText) {
				beforeEvent = jQuery.Event("beforeLabelChange", {element: element, afterText: text, beforeText: beforeText});
				$(_PAPER.canvas).trigger(beforeEvent);
				if (beforeEvent.isPropagationStopped()) {
					return false;
				}
				text = beforeEvent.afterText;
			}

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
				if (text !== undefined) {
					$(_PAPER.canvas).trigger('drawLabel', [element, text]);
				}

				if (text !== undefined && text !== beforeText) {
					// labelChanged event fire
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
			text = OG.Util.trim(text);
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
			_size = OG.Constants.GUIDE_RECT_SIZE, _hSize = OG.Util.round(_size / 2), _style = {},
			i;

		if (rElement && geometry) {
			OG.Util.apply(_style, geometry.style.map, OG.Constants.DEFAULT_STYLE.EDGE);

			vertices = _style["edge-type"] === OG.Constants.EDGE_TYPE.BEZIER ? geometry.getControlPoints() : geometry.getVertices();

			isSelf = $(element).attr("_from") && $(element).attr("_to") && $(element).attr("_from") === $(element).attr("_to");

			if (getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.GUIDE)) {
				// 가이드가 이미 존재하는 경우에는 bBoxLine 만 삭제후 새로 draw 하고 나머지 guide 는 Update 한다.
				// bBoxLine remove -> redraw
				remove(getREleById(rElement.id + OG.Constants.GUIDE_SUFFIX.BBOX));
				pathStr = "";
				if (_style["edge-type"] === OG.Constants.EDGE_TYPE.BEZIER) {
					for (i = 0; i < vertices.length; i++) {
						if (i === 0) {
							pathStr = "M" + vertices[i].x + " " + vertices[i].y;
						} else if (i === 1) {
							pathStr += "C" + vertices[i].x + " " + vertices[i].y;
						} else {
							pathStr += " " + vertices[i].x + " " + vertices[i].y;
						}
					}
				} else {
					for (i = 0; i < vertices.length; i++) {
						if (i === 0) {
							pathStr = "M" + vertices[i].x + " " + vertices[i].y;
						} else {
							pathStr += "L" + vertices[i].x + " " + vertices[i].y;
						}
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
				if (!isSelf && _style["edge-type"] !== OG.Constants.EDGE_TYPE.BEZIER) {
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
			if (_style["edge-type"] === OG.Constants.EDGE_TYPE.BEZIER) {
				for (i = 0; i < vertices.length; i++) {
					if (i === 0) {
						pathStr = "M" + vertices[i].x + " " + vertices[i].y;
					} else if (i === 1) {
						pathStr += "C" + vertices[i].x + " " + vertices[i].y;
					} else {
						pathStr += " " + vertices[i].x + " " + vertices[i].y;
					}
				}
			} else {
				for (i = 0; i < vertices.length; i++) {
					if (i === 0) {
						pathStr = "M" + vertices[i].x + " " + vertices[i].y;
					} else {
						pathStr += "L" + vertices[i].x + " " + vertices[i].y;
					}
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
			if (!isSelf && _style["edge-type"] !== OG.Constants.EDGE_TYPE.BEZIER) {
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
		case OG.Constants.EDGE_TYPE.BEZIER:
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

	/**
	 * 연결된 이전 Edge Element 들을 반환한다.
	 *
	 * @param {Element,String} element Element 또는 ID
	 * @return {Element[]} Previous Element's Array
	 * @override
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
	 * @override
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
	 * @override
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
	 * @override
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
	 * @override
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
	 * @override
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
};
OG.renderer.RaphaelRenderer.prototype = new OG.renderer.IRenderer();
OG.renderer.RaphaelRenderer.prototype.constructor = OG.renderer.RaphaelRenderer;
OG.RaphaelRenderer = OG.renderer.RaphaelRenderer;
