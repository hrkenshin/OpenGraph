/**
 * Text Shape
 *
 * @class
 * @extends OG.shape.IShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} text 텍스트
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.TextShape = function (text) {
	OG.shape.TextShape.superclass.call(this);

	this.TYPE = OG.Constants.SHAPE_TYPE.TEXT;
	this.SHAPE_ID = 'OG.shape.TextShape';

	/**
	 * 드로잉할 텍스트
	 * @type String
	 */
	this.text = text || "Text Here";

	/**
	 * 회전각도
	 * @type Number
	 */
	this.angle = 0;
};
OG.shape.TextShape.prototype = new OG.shape.IShape();
OG.shape.TextShape.superclass = OG.shape.IShape;
OG.shape.TextShape.prototype.constructor = OG.shape.TextShape;
OG.TextShape = OG.shape.TextShape;

/**
 * 드로잉할 텍스트를 반환한다.
 *
 * @return {String} 텍스트
 * @override
 */
OG.shape.TextShape.prototype.createShape = function () {
	return this.text;
};

/**
 * Shape 간의 연결을 위한 Terminal 을 반환한다.
 *
 * @return {OG.Terminal[]} Terminal
 * @override
 */
OG.shape.TextShape.prototype.createTerminal = function () {
	return [];
};

/**
 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
 *
 * @return {OG.shape.IShape} 복사된 인스턴스
 * @override
 */
OG.shape.TextShape.prototype.clone = function () {
	var shape = eval('new ' + this.SHAPE_ID + '()');
	shape.text = this.text;
	shape.angle = this.angle;

	return shape;
};