/**
 * Geometry Shape
 *
 * @class
 * @extends OG.shape.IShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.GeomShape = function () {
	this.TYPE = OG.Constants.SHAPE_TYPE.GEOM;

	this.SHAPE_ID = 'OG.shape.GeomShape';

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
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @abstract
	 */
	this.createShape = function () {
		throw new OG.NotImplementedException("OG.shape.IShape.createShape");
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @abstract
	 */
	this.clone = function () {
		throw new OG.NotImplementedException("OG.shape.IShape.clone");
	};
};
OG.shape.GeomShape.prototype = new OG.shape.IShape();
OG.shape.GeomShape.prototype.constructor = OG.shape.GeomShape;
OG.GeomShape = OG.shape.GeomShape;