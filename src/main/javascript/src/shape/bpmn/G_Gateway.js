/**
 * BPMN : Gateway Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.G_Gateway = function (label) {
	OG.shape.bpmn.G_Gateway.superclass.call(this);

	this.SHAPE_ID = 'OG.shape.bpmn.G_Gateway';
	this.label = label;
};
OG.shape.bpmn.G_Gateway.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.G_Gateway.superclass = OG.shape.GeomShape;
OG.shape.bpmn.G_Gateway.prototype.constructor = OG.shape.bpmn.G_Gateway;
OG.G_Gateway = OG.shape.bpmn.G_Gateway;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.G_Gateway.prototype.createShape = function () {
	if (this.geom) {
		return this.geom;
	}

	this.geom = new OG.geometry.Polygon([
		[0, 50],
		[50, 100],
		[100, 50],
		[50, 0]
	]);

	return this.geom;
};