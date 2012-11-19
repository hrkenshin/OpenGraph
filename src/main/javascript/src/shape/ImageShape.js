/**
 * Image Shape
 *
 * @class
 * @extends OG.shape.IShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} image 이미지 URL
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.ImageShape = function (image, label) {

	this.TYPE = OG.Constants.SHAPE_TYPE.IMAGE;

	this.SHAPE_ID = 'OG.shape.ImageShape';

	this.image = image;

	this.angle = 0;

	this.label = label;

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
	 * 드로잉할 이미지 URL을 반환한다.
	 *
	 * @return {String} 이미지 URL
	 * @override
	 */
	this.createShape = function () {
		return this.image;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.ImageShape(this.image, this.label);
	};
};
OG.shape.ImageShape.prototype = new OG.shape.IShape();
OG.shape.ImageShape.prototype.constructor = OG.shape.ImageShape;
OG.ImageShape = OG.shape.ImageShape;