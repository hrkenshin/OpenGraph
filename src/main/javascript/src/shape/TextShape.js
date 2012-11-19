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

	this.TYPE = OG.Constants.SHAPE_TYPE.TEXT;

	this.SHAPE_ID = 'OG.shape.TextShape';

	this.text = text || "Text Here";

	this.angle = 0;

	/**
	 * 드로잉할 텍스트를 반환한다.
	 *
	 * @return {String} 텍스트
	 * @override
	 */
	this.createShape = function () {
		return this.text;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.TextShape(this.text);
	};
};
OG.shape.TextShape.prototype = new OG.shape.IShape();
OG.shape.TextShape.prototype.constructor = OG.shape.TextShape;
OG.TextShape = OG.shape.TextShape;