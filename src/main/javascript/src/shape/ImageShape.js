/**
 * Image Shape
 *
 * @class
 * @extends OG.shape.IShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} image 이미지 URL
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.ImageShape = function (image, label) {
	OG.shape.ImageShape.superclass.call(this);

	this.TYPE = OG.Constants.SHAPE_TYPE.IMAGE;
	this.SHAPE_ID = 'OG.shape.ImageShape';
	this.label = label;

	/**
	 * 드로잉할 이미지 URL
	 * @type String
	 */
	this.image = image;

	/**
	 * 회전각도
	 * @type Number
	 */
	this.angle = 0;
};
OG.shape.ImageShape.prototype = new OG.shape.IShape();
OG.shape.ImageShape.superclass = OG.shape.IShape;
OG.shape.ImageShape.prototype.constructor = OG.shape.ImageShape;
OG.ImageShape = OG.shape.ImageShape;

/**
 * 드로잉할 이미지 URL을 반환한다.
 *
 * @return {String} 이미지 URL
 * @override
 */
OG.shape.ImageShape.prototype.createShape = function () {
	return this.image;
};

/**
 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
 *
 * @return {OG.shape.IShape} 복사된 인스턴스
 * @override
 */
OG.shape.ImageShape.prototype.clone = function () {
	var shape = eval('new ' + this.SHAPE_ID + '()');
	shape.image = this.image;
	shape.label = this.label;
	shape.angle = this.angle;

	return shape;
};