/**
 * Edge Shape
 *
 * @class
 * @extends OG.shape.IShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {Number[]} from 와이어 시작 좌표
 * @param {Number[]} to 와이어 끝 좌표
 * @param {String} label 라벨 [Optional]
 * @param {String} fromLabel 시작점 라벨 [Optional]
 * @param {String} toLabel 끝점 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.EdgeShape = function (from, to, label, fromLabel, toLabel) {
	OG.shape.EdgeShape.superclass.call(this);

	this.TYPE = OG.Constants.SHAPE_TYPE.EDGE;
	this.SHAPE_ID = 'OG.shape.EdgeShape';

	/**
	 * Edge 시작 좌표
	 * @type Number[]
	 */
	this.from = from;

	/**
	 * Edge 끝 좌표
	 * @type Number[]
	 */
	this.to = to;

	this.label = label;

	/**
	 * Edge 시작점 라벨
	 * @type String
	 */
	this.fromLabel = fromLabel;

	/**
	 * Edge 끝점 라벨
	 * @type String
	 */
	this.toLabel = toLabel;
};
OG.shape.EdgeShape.prototype = new OG.shape.IShape();
OG.shape.EdgeShape.superclass = OG.shape.IShape;
OG.shape.EdgeShape.prototype.constructor = OG.shape.EdgeShape;
OG.EdgeShape = OG.shape.EdgeShape;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.EdgeShape.prototype.createShape = function () {
	if (this.geom) {
		return this.geom;
	}

	this.geom = new OG.Line(this.from, this.to);
	return this.geom;
};

/**
 * Shape 간의 연결을 위한 Terminal 을 반환한다.
 *
 * @return {OG.Terminal[]} Terminal
 * @override
 */
OG.shape.EdgeShape.prototype.createTerminal = function () {
	return [];
};

/**
 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
 *
 * @return {OG.shape.IShape} 복사된 인스턴스
 * @override
 */
OG.shape.EdgeShape.prototype.clone = function () {
	var shape = eval('new ' + this.SHAPE_ID + '()');
	shape.from = this.from;
	shape.to = this.to;
	shape.label = this.label;
	shape.fromLabel = this.fromLabel;
	shape.toLabel = this.toLabel;

	return shape;
};