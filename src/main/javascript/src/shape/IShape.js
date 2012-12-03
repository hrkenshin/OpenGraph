/**
 * 도형, 텍스트, 이미지 등의 드로잉 될 Object 의 정보를 저장하는 Shape 정보 최상위 인터페이스
 *
 * @class
 * @requires OG.common.*, OG.geometry.*
 *
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.IShape = function () {
	/**
	 * Shape 유형(GEOM, TEXT, HTML, IMAGE, EDGE, GROUP)
	 * @type String
	 */
	this.TYPE = null;

	/**
	 * Shape 을 구분하는 Shape ID(Shape 클래스명과 일치)
	 * @type String
	 */
	this.SHAPE_ID = null;

	/**
	 * Shape 모양을 나타내는 공간기하객체(Geometry)
	 * @type OG.geometry.Geometry
	 */
	this.geom = null;

	/**
	 * Shape 라벨 텍스트
	 * @type String
	 */
	this.label = null;

	/**
	 * Shape 의 Collapse 여부
	 * @type Boolean
	 */
	this.isCollapsed = false;
};
OG.shape.IShape.prototype = {
	/**
	 * Shape 간의 연결을 위한 Terminal 을 반환한다.
	 *
	 * @return {OG.Terminal[]} Terminal
	 */
	createTerminal: function () {
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
	},

	/**
	 * 드로잉할 Shape 를 생성하여 반환한다.
	 *
	 * @return {*} Shape 정보
	 * @abstract
	 */
	createShape: function () {
		throw new OG.NotImplementedException("OG.shape.IShape.createShape");
	},

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @abstract
	 */
	clone: function () {
		throw new OG.NotImplementedException("OG.shape.IShape.clone");
	}
};
OG.shape.IShape.prototype.constructor = OG.shape.IShape;
OG.IShape = OG.shape.IShape;