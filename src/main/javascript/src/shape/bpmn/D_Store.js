/**
 * BPMN : Data Store Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.D_Store = function (label) {
	OG.shape.bpmn.D_Store.superclass.call(this);

	this.SHAPE_ID = 'OG.shape.bpmn.D_Store';
	this.label = label;
};
OG.shape.bpmn.D_Store.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.D_Store.superclass = OG.shape.GeomShape;
OG.shape.bpmn.D_Store.prototype.constructor = OG.shape.bpmn.D_Store;
OG.D_Store = OG.shape.bpmn.D_Store;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.D_Store.prototype.createShape = function () {
	var geom1, geom2, geom3, geom4, geom5, geomCollection = [];
	if (this.geom) {
		return this.geom;
	}

	geom1 = new OG.geometry.Ellipse([50, 10], 50, 10);
	geom2 = new OG.geometry.Line([0, 10], [0, 90]);
	geom3 = new OG.geometry.Line([100, 10], [100, 90]);
	geom4 = new OG.geometry.Curve([
		[100, 90],
		[96, 94],
		[85, 97],
		[50, 100],
		[15, 97],
		[4, 94],
		[0, 90]
	]);
	geom5 = new OG.geometry.Rectangle([0, 10], 100, 80);
	geom5.style = new OG.geometry.Style({
		"stroke": 'none'
	});

	geomCollection.push(geom1);
	geomCollection.push(geom2);
	geomCollection.push(geom3);
	geomCollection.push(geom4);
	geomCollection.push(geom5);

	this.geom = new OG.geometry.GeometryCollection(geomCollection);

	return this.geom;
};