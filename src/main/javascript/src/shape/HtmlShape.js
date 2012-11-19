/**
 * ForeignObject HTML Shape
 *
 * @class
 * @extends OG.shape.IShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} html 임베드 HTML String
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.HtmlShape = function (html, label) {

	this.TYPE = OG.Constants.SHAPE_TYPE.HTML;

	this.SHAPE_ID = 'OG.shape.HtmlShape';

	this.html = html || "";

	this.label = label;

	this.angle = 0;

	/**
	 * Shape 간의 연결을 위한 Terminal 을 반환한다.
	 *
	 * @return {OG.Terminal[]} Terminal
	 * @override
	 */
	this.createTerminal = function () {
		if (!this.geom) {
			return [];
		}

		var envelope = this.geom.getBoundary();

		return [
			new OG.Terminal(envelope.getCentroid(), OG.Constants.TERMINAL_TYPE.C, OG.Constants.TERMINAL_TYPE.INOUT),
			new OG.Terminal(envelope.getRightCenter(), OG.Constants.TERMINAL_TYPE.E, OG.Constants.TERMINAL_TYPE.INOUT),
			new OG.Terminal(envelope.getLeftCenter(), OG.Constants.TERMINAL_TYPE.W, OG.Constants.TERMINAL_TYPE.INOUT),
			new OG.Terminal(envelope.getLowerCenter(), OG.Constants.TERMINAL_TYPE.S, OG.Constants.TERMINAL_TYPE.INOUT),
			new OG.Terminal(envelope.getUpperCenter(), OG.Constants.TERMINAL_TYPE.N, OG.Constants.TERMINAL_TYPE.INOUT)
		];
	};

	/**
	 * 드로잉할 임베드 HTML String을 반환한다.
	 *
	 * @return {String} 임베드 HTML String
	 * @override
	 */
	this.createShape = function () {
		return this.html;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.HtmlShape(this.html, this.label);
	};
};
OG.shape.HtmlShape.prototype = new OG.shape.IShape();
OG.shape.HtmlShape.prototype.constructor = OG.shape.HtmlShape;
OG.HtmlShape = OG.shape.HtmlShape;