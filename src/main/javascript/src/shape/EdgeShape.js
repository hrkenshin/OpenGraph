/**
 * Line Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {Number[]} from 와이어 시작 좌표
 * @param {Number[]} to 와이어 끝 좌표
 * @param {String} label 라벨
 * @param {String} fromLabel 시작점 라벨
 * @param {String} toLabel 끝점 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.EdgeShape = function (from, to, label, fromLabel, toLabel) {
	this.TYPE = OG.Constants.SHAPE_TYPE.EDGE;

	this.SHAPE_ID = 'OG.shape.EdgeShape';

	this.from = from;
	this.to = to;

	this.label = label;
	this.fromLabel = fromLabel;
	this.toLabel = toLabel;

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

		this.geom = new OG.Line(from, to);
		return this.geom;
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @override
	 */
	this.clone = function () {
		return new OG.shape.EdgeShape(this.from, this.to, this.label, this.fromLabel, this.toLabel);
	};
};
OG.shape.EdgeShape.prototype = new OG.shape.IShape();
OG.shape.EdgeShape.prototype.constructor = OG.shape.EdgeShape;
OG.EdgeShape = OG.shape.EdgeShape;