/**
 * BPMN : Terminate Event Shape
 *
 * @class
 * @extends OG.shape.bpmn.E_End
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.E_Terminate = function (label) {

	this.SHAPE_ID = 'OG.shape.bpmn.E_Terminate';

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

		geom2 = new OG.geometry.Circle([50, 50], 30);
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
		return new OG.shape.bpmn.E_Terminate(this.label);
	};
};
OG.shape.bpmn.E_Terminate.prototype = new OG.shape.bpmn.E_End();
OG.shape.bpmn.E_Terminate.prototype.constructor = OG.shape.bpmn.E_Terminate;
OG.E_Terminate = OG.shape.bpmn.E_Terminate;