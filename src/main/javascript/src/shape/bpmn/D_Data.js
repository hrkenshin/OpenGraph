/**
 * BPMN : Data Object Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.D_Data = function (label) {
	OG.shape.bpmn.D_Data.superclass.call(this);

	this.SHAPE_ID = 'OG.shape.bpmn.D_Data';
	this.label = label;
};
OG.shape.bpmn.D_Data.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.D_Data.superclass = OG.shape.GeomShape;
OG.shape.bpmn.D_Data.prototype.constructor = OG.shape.bpmn.D_Data;
OG.D_Data = OG.shape.bpmn.D_Data;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.D_Data.prototype.createShape = function () {
	if (this.geom) {
		return this.geom;
	}

	this.geom = new OG.PolyLine([
		[0, 0],
		[0, 100],
		[100, 100],
		[100, 20],
		[80, 0],
		[0, 0],
		[80, 0],
		[80, 20],
		[100, 20]
	]);

	return this.geom;
};