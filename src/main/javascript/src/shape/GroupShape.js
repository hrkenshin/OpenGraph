/**
 * Group Shape
 *
 * @class
 * @extends OG.shape.IShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.GroupShape = function (label) {
	this.TYPE = OG.Constants.SHAPE_TYPE.GROUP;
	this.SHAPE_ID = 'OG.shape.GroupShape';
	this.label = label;
};
OG.shape.GroupShape.prototype = new OG.shape.IShape();
OG.shape.GroupShape.superclass = OG.shape.IShape;
OG.shape.GroupShape.prototype.constructor = OG.shape.GroupShape;
OG.GroupShape = OG.shape.GroupShape;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.GroupShape.prototype.createShape = function () {
	if (this.geom) {
		return this.geom;
	}

	this.geom = new OG.geometry.Rectangle([0, 0], 100, 100);
	this.geom.style = new OG.geometry.Style({
		'stroke': 'none'
	});

	return this.geom;
};

/**
 * Shape 간의 연결을 위한 Terminal 을 반환한다.
 *
 * @return {OG.Terminal[]} Terminal
 * @override
 */
OG.shape.GroupShape.prototype.createTerminal = function () {
	return [];
};

/**
 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
 *
 * @return {OG.shape.IShape} 복사된 인스턴스
 * @override
 */
OG.shape.GroupShape.prototype.clone = function () {
	var shape = eval('new ' + this.SHAPE_ID + '()');
	shape.label = this.label;

	return shape;
};