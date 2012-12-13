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
	OG.shape.VerticalLaneShape.superclass.call(this, label);

	this.SHAPE_ID = 'OG.shape.VerticalLaneShape';
};
OG.shape.VerticalLaneShape.prototype = new OG.shape.GroupShape();
OG.shape.VerticalLaneShape.superclass = OG.shape.GroupShape;
OG.shape.VerticalLaneShape.prototype.constructor = OG.shape.VerticalLaneShape;
OG.VerticalLaneShape = OG.shape.VerticalLaneShape;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.VerticalLaneShape.prototype.createShape = function () {
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