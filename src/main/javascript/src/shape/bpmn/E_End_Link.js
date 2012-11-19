/**
 * BPMN : Link End Event Shape
 *
 * @class
 * @extends OG.shape.GeomShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_End_Link = function (label) {

	this.SHAPE_ID = 'OG.shape.bpmn.E_End_Link';

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

		geom2 = new OG.geometry.Polygon([
			[20, 40],
			[20, 60],
			[60, 60],
			[60, 80],
			[85, 50],
			[60, 20],
			[60, 40]
		]);
		geom2.style = new OG.geometry.Style({
			"fill"        : "black",
			"fill-opacity": 1
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
		return new OG.shape.bpmn.E_End_Link(this.label);
	};
};
OG.shape.bpmn.E_End_Link.prototype = new OG.shape.GeomShape();
OG.shape.bpmn.E_End_Link.prototype.constructor = OG.shape.bpmn.E_End_Link;
OG.E_End_Link = OG.shape.bpmn.E_End_Link;