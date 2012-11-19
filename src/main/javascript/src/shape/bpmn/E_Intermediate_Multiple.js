/**
 * BPMN : Multiple Intermediate Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_Intermediate_Multiple = function (label) {

	this.SHAPE_ID = 'OG.shape.bpmn.E_Intermediate_Multiple';

	this.label = label;

	/**
	 * 드로잉할 Shape 을 생성하여 반환한다.
	 *
	 * @return {OG.geometry.Geometry} Shape 정보
	 * @override
	 */
	this.createShape = function () {
		var geom1, geomCollection = [];
		if (this.geom) {
			return this.geom;
		}

		geom1 = new OG.geometry.Polygon([
			[50, 15],
			[39, 33],
			[20, 33],
			[29, 50],
			[19, 67],
			[40, 67],
			[50, 85],
			[60, 68],
			[80, 68],
			[70, 50],
			[79, 33],
			[60, 33]
		]);

		geomCollection.push(new OG.geometry.Circle([50, 50], 50));
		geomCollection.push(new OG.geometry.Circle([50, 50], 42));
		geomCollection.push(geom1);

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
		return new OG.shape.bpmn.E_Intermediate_Multiple(this.label);
	};
};
OG.shape.bpmn.E_Intermediate_Multiple.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_Intermediate_Multiple.prototype.constructor = OG.shape.bpmn.E_Intermediate_Multiple;
OG.E_Intermediate_Multiple = OG.shape.bpmn.E_Intermediate_Multiple;