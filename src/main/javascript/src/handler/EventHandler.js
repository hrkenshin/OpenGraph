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