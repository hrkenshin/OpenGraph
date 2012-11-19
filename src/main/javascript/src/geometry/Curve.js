/**
 * Catmull-Rom Spline Curve 공간 기하 객체(Spatial Geometry Object)
 *
 * @class
 * @extends OG.geometry.Geometry
 * @requires OG.geometry.Coordinate, OG.geometry.Envelope, OG.geometry.Geometry, OG.common.CurveUtil
 *
 * @param {OG.geometry.Coordinate[]} controlPoints Curve Vertex 좌표 Array
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.geometry.Curve = function (controlPoints) {

	OG.geometry.Curve.superclass.call(this, controlPoints);

	var t, cmRomSpline = OG.CurveUtil.CatmullRomSpline(eval("[" + this.vertices.toString() + "]"));

	// t 는 0 ~ maxT 의 값으로, t 값의 증분값이 작을수록 세밀한 Curve 를 그린다.
	this.vertices = [];
	for (t = 0; t <= cmRomSpline.maxT; t += 0.1) {
		this.vertices.push(new OG.geometry.Coordinate(
			OG.Util.round(cmRomSpline.getX(t)),
			OG.Util.round(cmRomSpline.getY(t))
		));
	}

	/**
	 * {Number} 공간 기하 객체 타입
	 */
	this.TYPE = OG.Constants.GEOM_TYPE.CURVE;

	/**
	 * {Boolean} 닫힌 기하 객체 인지 여부
	 */
	this.IS_CLOSED = false;

	/**
	 * {OG.geometry.Style} 스타일 속성
	 */
	this.style = new OG.geometry.Style();

	/**
	 * 공간기하객체의 모든 꼭지점을 반환한다.
	 *
	 * @return {OG.geometry.Coordinate[]} 꼭지점 좌표 Array
	 * @override
	 */
	this.getVertices = function () {
		var vertices = [], i;
		for (i = 10; i <= this.vertices.length - 10; i++) {
			vertices.push(this.vertices[i]);
		}

		return vertices;
	};

	/**
	 * 콘트롤 포인트 목록을 반환한다.
	 *
	 * @return {OG.geometry.Coordinate[]} controlPoints Array
	 */
	this.getControlPoints = function () {
		var controlPoints = [], i;
		for (i = 10; i <= this.vertices.length - 10; i += 10) {
			controlPoints.push(this.vertices[i]);
		}

		return controlPoints;
	};

	/**
	 * 객체 프라퍼티 정보를 JSON 스트링으로 반환한다.
	 *
	 * @return {String} 프라퍼티 정보
	 * @override
	 */
	this.toString = function () {
		var s = [];
		s.push("type:'" + OG.Constants.GEOM_NAME[this.TYPE] + "'");
		s.push("vertices:[" + this.getVertices() + "]");
		s.push("controlPoints:[" + this.getControlPoints() + "]");

		return "{" + s.join() + "}";
	};
};
OG.geometry.Curve.prototype = new OG.geometry.PolyLine();
OG.geometry.Curve.superclass = OG.geometry.PolyLine;
OG.geometry.Curve.prototype.constructor = OG.geometry.Curve;
OG.Curve = OG.geometry.Curve;