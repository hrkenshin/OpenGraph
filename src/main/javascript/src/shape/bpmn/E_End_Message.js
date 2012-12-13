/**
 * BPMN : Message End Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_End_Message = function (label) {
	OG.shape.bpmn.E_End_Message.superclass.call(this);

	this.SHAPE_ID = 'OG.shape.bpmn.E_End_Message';
	this.label = label;
};
OG.shape.bpmn.E_End_Message.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_End_Message.superclass = OG.shape.GeomShape;
OG.shape.bpmn.E_End_Message.prototype.constructor = OG.shape.bpmn.E_End_Message;
OG.E_End_Message = OG.shape.bpmn.E_End_Message;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.E_End_Message.prototype.createShape = function () {
	var geom1, geom2, geomCollection = [];
	if (this.geom) {
		return this.geom;
	}

	geom1 = new OG.geometry.Circle([50, 50], 50);
	geom1.style = new OG.geometry.Style({
		"stroke-width": 3
	});

	geom2 = new OG.geometry.PolyLine([
		[20, 30],
		[20, 70],
		[80, 70],
		[80, 30],
		[20, 30],
		[50, 50],
		[80, 30]
	]);

	geomCollection.push(geom1);
	geomCollection.push(geom2);

	this.geom = new OG.geometry.GeometryCollection(geomCollection);
	this.geom.style = new OG.geometry.Style({
		'label-position': 'bottom'
	});

	return this.geom;
};