/**
 * Circle Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.CircleShape = function (label) {
	OG.shape.CircleShape.superclass.call(this);

	this.SHAPE_ID = 'OG.shape.CircleShape';
	this.label = label;
};
OG.shape.CircleShape.prototype = new OG.shape.GeomShape();
OG.shape.CircleShape.superclass = OG.shape.GeomShape;
OG.shape.CircleShape.prototype.constructor = OG.shape.CircleShape;
OG.CircleShape = OG.shape.CircleShape;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.CircleShape.prototype.createShape = function () {
	if (this.geom) {
		return this.geom;
	}

	this.geom = new OG.geometry.Circle([50, 50], 50);
	return this.geom;
};