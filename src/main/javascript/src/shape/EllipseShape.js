/**
 * Ellipse Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.EllipseShape = function (label) {
	OG.shape.EllipseShape.superclass.call(this);

	this.SHAPE_ID = 'OG.shape.EllipseShape';
	this.label = label;
};
OG.shape.EllipseShape.prototype = new OG.shape.GeomShape();
OG.shape.EllipseShape.superclass = OG.shape.GeomShape;
OG.shape.EllipseShape.prototype.constructor = OG.shape.EllipseShape;
OG.EllipseShape = OG.shape.EllipseShape;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.EllipseShape.prototype.createShape = function () {
	if (this.geom) {
		return this.geom;
	}

	this.geom = new OG.geometry.Ellipse([50, 50], 50, 30);
	return this.geom;
};