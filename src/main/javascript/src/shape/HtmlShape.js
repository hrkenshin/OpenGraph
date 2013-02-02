/**
 * ForeignObject HTML Shape
 *
 * @class
 * @extends OG.shape.IShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} html 임베드 HTML String
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.HtmlShape = function (html, label) {
	OG.shape.HtmlShape.superclass.call(this);

	this.TYPE = OG.Constants.SHAPE_TYPE.HTML;
	this.SHAPE_ID = 'OG.shape.HtmlShape';
	this.label = label;

	/**
	 * 드로잉할 임베드 HTML String
	 * @type String
	 */
	this.html = html || "";

	/**
	 * 회전각도
	 * @type Number
	 */
	this.angle = 0;
};
OG.shape.HtmlShape.prototype = new OG.shape.IShape();
OG.shape.HtmlShape.superclass = OG.shape.IShape;
OG.shape.HtmlShape.prototype.constructor = OG.shape.HtmlShape;
OG.HtmlShape = OG.shape.HtmlShape;

/**
 * 드로잉할 임베드 HTML String을 반환한다.
 *
 * @return {String} 임베드 HTML String
 * @override
 */
OG.shape.HtmlShape.prototype.createShape = function () {
	return this.html;
};

/**
 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
 *
 * @return {OG.shape.IShape} 복사된 인스턴스
 * @override
 */
OG.shape.HtmlShape.prototype.clone = function () {
	var shape = eval('new ' + this.SHAPE_ID + '()');
	shape.html = this.html;
	shape.label = this.label;
	shape.angle = this.angle;

	return shape;
};