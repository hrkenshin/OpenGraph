/**
 * Rectangle Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.RectangleShape = function (label) {
	OG.shape.RectangleShape.superclass.call(this);

	this.SHAPE_ID = 'OG.shape.RectangleShape';
	this.label = label;
};
OG.shape.RectangleShape.prototype = new OG.shape.GeomShape();
OG.shape.RectangleShape.superclass = OG.shape.GeomShape;
OG.shape.RectangleShape.prototype.constructor = OG.shape.RectangleShape;
OG.RectangleShape = OG.shape.RectangleShape;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.RectangleShape.prototype.createShape = function () {
	if (this.geom) {
		return this.geom;
	}

	this.geom = new OG.geometry.Rectangle([0, 0], 100, 100);
	return this.geom;
};