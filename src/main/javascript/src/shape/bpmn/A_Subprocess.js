/**
 * BPMN : Subprocess Activity Shape
 *
 * @class
 * @extends OG.shape.GroupShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.A_Subprocess = function (label) {

	this.SHAPE_ID = 'OG.shape.bpmn.A_Subprocess';

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

		this.geom = new OG.geometry.Rectangle([0, 0], 100, 100);
		this.geom.style = new OG.geometry.Style({
			'stroke': 'black',
			"r"     : 6
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
		return new OG.shape.bpmn.A_Subprocess(this.label);
	};
};
OG.shape.bpmn.A_Subprocess.prototype = new OG.shape.GroupShape();
OG.shape.bpmn.A_Subprocess.prototype.constructor = OG.shape.bpmn.A_Subprocess;
OG.A_Subprocess = OG.shape.bpmn.A_Subprocess;