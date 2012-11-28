/**
 * Cubic Bezier Curve 공간 기하 객체(Spatial Geometry Object)
 * 콘트롤포인트1, 콘트롤포인트2에 의해 시작좌표, 끝좌표를 지나는 곡선을 나타낸다.
 *
 * @class
 * @extends OG.geometry.PolyLine
 * @requires OG.geometry.Coordinate, OG.geometry.Envelope, OG.geometry.Geometry, OG.common.CurveUtil
 *
 * @example
 * var geom = new OG.geometry.BezierCurve([[200, 100], [100, 300], [-100, -100], [-200, 100]]);
 *
 * @param {OG.geometry.Coordinate[]} controlPoints [from, control_point1, control_point2, to]
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.geometry.BezierCurve = function (controlPoints) {
	var bezier, t, i;

	if (!controlPoints && controlPoints.length !== 4) {
		throw new OG.ParamError();
	}

	/**
	 * Bezier Curve 콘트롤 좌표 Array
	 * @type OG.geometry.Coordinate[]
	 */
	this.controlPoints = [];

	// Array 좌표를 OG.geometry.Coordinate 로 변환
	if (controlPoints && controlPoints.length > 0) {
		for (i = 0; i < controlPoints.length; i++) {
			this.controlPoints.push(this.convertCoordinate(controlPoints[i]));
		}
	}

	// Bezier Curve
	bezier = OG.CurveUtil.Bezier(eval("[" + this.controlPoints.toString() + "]"));

	// t 는 0 ~ maxT 의 값으로, t 값의 증분값이 작을수록 세밀한 BezierCurve 를 그린다.
	this.vertices = [];
	for (t = 0; t <= bezier.maxT; t += 0.02) {
		this.vertices.push(new OG.geometry.Coordinate(
			OG.Util.round(bezier.getX(t)),
			OG.Util.round(bezier.getY(t))
		));
	}

	this.TYPE = OG.Constants.GEOM_TYPE.BEZIER_CURVE;
	this.style = new OG.geometry.Style();
};
OG.geometry.BezierCurve.prototype = new OG.geometry.PolyLine();
OG.geometry.BezierCurve.superclass = OG.geometry.PolyLine;
OG.geometry.BezierCurve.prototype.constructor = OG.geometry.BezierCurve;
OG.BezierCurve = OG.geometry.BezierCurve;

/**
 * 콘트롤 포인트 목록을 반환한다.
 *
 * @return {OG.geometry.Coordinate[]} controlPoints Array
 */
OG.geometry.BezierCurve.prototype.getControlPoints = function () {
	return this.controlPoints;
};

/**
 * 공간기하객체의 모든 꼭지점을 반환한다.
 *
 * @return {OG.geometry.Coordinate[]} 꼭지점 좌표 Array
 * @override
 */
OG.geometry.BezierCurve.prototype.getVertices = function () {
	var bezier, t, i;
	if (!this.vertices) {
		// Bezier Curve
		bezier = OG.CurveUtil.Bezier(eval("[" + this.controlPoints.toString() + "]"));

		// t 는 0 ~ maxT 의 값으로, t 값의 증분값이 작을수록 세밀한 BezierCurve 를 그린다.
		this.vertices = [];
		for (t = 0; t <= bezier.maxT; t += 0.02) {
			this.vertices.push(new OG.geometry.Coordinate(
				OG.Util.round(bezier.getX(t)),
				OG.Util.round(bezier.getY(t))
			));
		}
	}

	return this.vertices;
};

/**
 * 가로, 세로 Offset 만큼 좌표를 이동한다.
 *
 * @param {Number} offsetX 가로 Offset
 * @param {Number} offsetY 세로 Offset
 * @return {OG.geometry.Geometry} 이동된 공간 기하 객체
 * @override
 */
OG.geometry.BezierCurve.prototype.move = function (offsetX, offsetY) {
	var i;
	for (i = 0; i < this.controlPoints.length; i++) {
		this.controlPoints[i].move(offsetX, offsetY);
	}
	this.reset();

	return this;
};

/**
 * 상, 하, 좌, 우 외곽선을 이동하여 Envelope 을 리사이즈 한다.
 *
 * @param {Number} upper 상단 라인 이동 Offset(위 방향으로 +)
 * @param {Number} lower 하단 라인 이동 Offset(아래 방향으로 +)
 * @param {Number} left 좌측 라인 이동 Offset(좌측 방향으로 +)
 * @param {Number} right 우측 라인 이동 Offset(우측 방향으로 +)
 * @return {OG.geometry.Geometry} 리사이즈된 공간 기하 객체
 * @override
 */
OG.geometry.BezierCurve.prototype.resize = function (upper, lower, left, right) {
	throw new OG.NotSupportedException('OG.geometry.BezierCurve.resize() Not Supported!');
};

/**
 * 기준 좌표를 기준으로 주어진 각도 만큼 회전한다.
 *
 * @param {Number} angle 회전 각도
 * @param {OG.geometry.Coordinate} origin 기준 좌표
 * @return {OG.geometry.Geometry} 회전된 공간 기하 객체
 * @override
 */
OG.geometry.BezierCurve.prototype.rotate = function (angle, origin) {
	var i;
	origin = origin || this.getCentroid();
	for (i = 0; i < this.controlPoints.length; i++) {
		this.controlPoints[i].rotate(angle, origin);
	}
	this.reset();

	return this;
};

/**
 * 객체 프라퍼티 정보를 JSON 스트링으로 반환한다.
 *
 * @return {String} 프라퍼티 정보
 * @override
 */
OG.geometry.BezierCurve.prototype.toString = function () {
	var s = [];
	s.push("type:'" + OG.Constants.GEOM_NAME[this.TYPE] + "'");
	s.push("vertices:[" + this.getVertices() + "]");
	s.push("controlPoints:[" + this.getControlPoints() + "]");

	return "{" + s.join() + "}";
};

/**
 * 저장된 boundary 를 클리어하여 새로 계산하도록 한다.
 * @override
 */
OG.geometry.BezierCurve.prototype.reset = function () {
	this.boundary = null;
	this.vertices = null;
};