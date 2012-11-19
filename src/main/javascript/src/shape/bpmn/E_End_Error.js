/**
 * BPMN : Error End Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_End_Error = function (label) {

	this.SHAPE_ID = 'OG.shape.bpmn.E_End_Error';

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		var geom1, geom2, geomCollection = [];
		if (this.geom) {
			return this.geom;
		}

		geom1 = new OG.geometry.Circle([50, 50], 50);
		geom1.style = new OG.geometry.Style({
			"stroke-width": 3
		});

		geom2 = new OG.geometry.PolyLine([
			[20, 75],
			[40, 40],
			[60, 60],
			[80, 20]
		]);
		geom2.style = new OG.geometry.Style({
			"stroke-width": 2
		});

		geomCollection.push(geom1);
		geomCollection.push(geom2);

		this.geom = new OG.geometry.GeometryCollection(geomCollection);
		this.geom.style = new OG.geometry.Style({
			'label-position': 'bottom'
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
		return new OG.shape.bpmn.E_End_Error(this.label);
	};
};
OG.shape.bpmn.E_End_Error.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_End_Error.prototype.constructor = OG.shape.bpmn.E_End_Error;
OG.E_End_Error = OG.shape.bpmn.E_End_Error;