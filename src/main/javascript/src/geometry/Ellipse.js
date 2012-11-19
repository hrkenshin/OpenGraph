/**
 * Ellipse 공간 기하 객체(Spatial Geometry Object)
 *
 * @class
 * @extends OG.geometry.Curve
 * @requires OG.geometry.Coordinate, OG.geometry.Envelope, OG.geometry.Geometry
 *
 * @param {OG.geometry.Coordinate} center Ellipse 중심 좌표
 * @param {Number} radiusX X축 반경
 * @param {Number} radiusY Y축 반경
 * @param {Number} angle X축 기울기
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.geometry.Ellipse = function (center, radiusX, radiusY, angle) {

	var _center = this.convertCoordinate(center),
		_angle = angle || 0,
		theta,
		i,
		controlPoints = [];

	if (_center) {
		for (i = -45; i <= 405; i += 45) {
			theta = Math.PI / 180 * i;
			controlPoints.push((new OG.geometry.Coordinate(
				OG.Util.round(_center.x + radiusX * Math.cos(theta)),
				OG.Util.round(_center.y + radiusY * Math.sin(theta))
			)).rotate(_angle, _center));
		}
	}

	OG.geometry.Ellipse.superclass.call(this, controlPoints);

	/**
	 * {Number} 공간 기하 객체 타입
	 */
	this.TYPE = OG.Constants.GEOM_TYPE.ELLIPSE;

	/**
	 * {Boolean} 닫힌 기하 객체 인지 여부
	 */
	this.IS_CLOSED = true;

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
		var vertices = [];
		for (i = 20; i < this.vertices.length - 20; i++) {
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
		var controlPoints = [];
		for (i = 10; i <= this.vertices.length - 10; i += 10) {
			controlPoints.push(this.vertices[i]);
		}

		return controlPoints;
	};

	/**
	 * 공간기하객체의 길이를 반환한다.
	 *
	 * @return {Number} 길이
	 * @override
	 */
	this.getLength = function () {
		// π{5(a+b)/4 - ab/(a+b)}
		var controlPoints = this.getControlPoints(),
			radiusX = center.distance(controlPoints[1]),
			radiusY = center.distance(controlPoints[3]);
		return Math.PI * (5 * (radiusX + radiusY) / 4 - radiusX * radiusY / (radiusX + radiusY));
	};

	/**
	 * 객체 프라퍼티 정보를 JSON 스트링으로 반환한다.
	 *
	 * @return {String} 프라퍼티 정보
	 * @override
	 */
	this.toString = function () {
		var s = [],
			controlPoints = this.getControlPoints(),
			center = this.getCentroid(),
			radiusX = center.distance(controlPoints[1]),
			radiusY = center.distance(controlPoints[3]),
			angle = OG.Util.round(Math.atan2(controlPoints[1].y - center.y, controlPoints[1].x - center.x) * 180 / Math.PI);

		s.push("type:'" + OG.Constants.GEOM_NAME[this.TYPE] + "'");
		s.push("center:" + center);
		s.push("radiusX:" + radiusX);
		s.push("radiusY:" + radiusY);
		s.push("angle:" + angle);

		return "{" + s.join() + "}";
	};
};
OG.geometry.Ellipse.prototype = new OG.geometry.Curve();
OG.geometry.Ellipse.superclass = OG.geometry.Curve;
OG.geometry.Ellipse.prototype.constructor = OG.geometry.Ellipse;
OG.Ellipse = OG.geometry.Ellipse;