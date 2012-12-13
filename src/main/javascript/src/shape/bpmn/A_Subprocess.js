/**
 * BPMN : Subprocess Activity Shape
 *
 * @class
 * @extends OG.shape.GroupShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} label 라벨 [Optional]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.bpmn.A_Subprocess = function (label) {
	OG.shape.bpmn.A_Subprocess.superclass.call(this, label);

	this.SHAPE_ID = 'OG.shape.bpmn.A_Subprocess';
};
OG.shape.bpmn.A_Subprocess.prototype = new OG.shape.GroupShape();
OG.shape.bpmn.A_Subprocess.superclass = OG.shape.GroupShape;
OG.shape.bpmn.A_Subprocess.prototype.constructor = OG.shape.bpmn.A_Subprocess;
OG.A_Subprocess = OG.shape.bpmn.A_Subprocess;

/**
 * 드로잉할 Shape 을 생성하여 반환한다.
 *
 * @return {OG.geometry.Geometry} Shape 정보
 * @override
 */
OG.shape.bpmn.A_Subprocess.prototype.createShape = function () {
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