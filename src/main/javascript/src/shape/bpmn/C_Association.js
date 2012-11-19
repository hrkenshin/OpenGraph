/**
 * BPMN : Annotation Association Connector Shape
 *
 * @class
 * @extends OG.shape.EdgeShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {Number[]} from 와이어 시작 좌표
 * @param {Number[]} to 와이어 끝 좌표
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.C_Association = function (from, to, label) {

	this.SHAPE_ID = 'OG.shape.bpmn.C_Association';

	this.from = from;
	this.to = to;

	this.label = label;

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

		this.geom = new OG.Line(this.from || [0, 0], this.to || [70, 0]);
		this.geom.style = new OG.geometry.Style({
			"edge-type"       : "straight",
			"arrow-start"     : "none",
			"arrow-end"       : "none",
			'stroke-dasharray': '.'
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
		return new OG.shape.bpmn.C_Association(this.from, this.to, this.label);
	};
};
OG.shape.bpmn.C_Association.prototype = new OG.shape.EdgeShape();
OG.shape.bpmn.C_Association.prototype.constructor = OG.shape.bpmn.C_Association;
OG.C_Association = OG.shape.bpmn.C_Association;