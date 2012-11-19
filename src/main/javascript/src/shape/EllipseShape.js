/**
 * Ellipse Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.EllipseShape = function (label) {

	this.SHAPE_ID = 'OG.shape.EllipseShape';

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		if (this.geom) {
			return this.geom;
		}

		this.geom = new OG.geometry.Ellipse([50, 50], 50, 30);
		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.EllipseShape(this.label);
	};
};
OG.shape.EllipseShape.prototype = new OG.shape.GeomShape();
OG.shape.EllipseShape.prototype.constructor = OG.shape.EllipseShape;
OG.EllipseShape = OG.shape.EllipseShape;