/**
 * Horizontal Swimlane Shape
 *
 * @class
 * @extends OG.shape.GroupShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.HorizontalLaneShape = function (label) {
	OG.shape.HorizontalLaneShape.superclass.call(this, label);

	this.SHAPE_ID = 'OG.shape.HorizontalLaneShape';
};
OG.shape.HorizontalLaneShape.prototype = new OG.shape.GroupShape();
OG.shape.HorizontalLaneShape.superclass = OG.shape.GroupShape;
OG.shape.HorizontalLaneShape.prototype.constructor = OG.shape.HorizontalLaneShape;
OG.HorizontalLaneShape = OG.shape.HorizontalLaneShape;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.HorizontalLaneShape.prototype.createShape = function () {
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