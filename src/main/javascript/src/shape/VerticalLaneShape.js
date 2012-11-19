/**
 * Vertical Swimlane Shape
 *
 * @class
 * @extends OG.shape.GroupShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.VerticalLaneShape = function (label) {

	this.TYPE = OG.Constants.SHAPE_TYPE.GROUP;

	this.SHAPE_ID = 'OG.shape.VerticalLaneShape';

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
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		if (this.geom) {
			return this.geom;
		}

		this.geom = new OG.geometry.Rectangle([0, 0], 100, 100);
		this.geom.style = new OG.geometry.Style({
			'label-direction': 'horizontal',
			'vertical-align' : 'top'
		});

		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.VerticalLaneShape(this.label);
	};
};
OG.shape.VerticalLaneShape.prototype = new OG.shape.GroupShape();
OG.shape.VerticalLaneShape.prototype.constructor = OG.shape.VerticalLaneShape;
OG.VerticalLaneShape = OG.shape.VerticalLaneShape;