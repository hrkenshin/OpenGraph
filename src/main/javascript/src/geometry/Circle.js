/**
 * Circle 공간 기하 객체(Spatial Geometry Object)
 *
 * @class
 * @extends OG.geometry.Ellipse
 * @requires OG.geometry.Coordinate, OG.geometry.Envelope, OG.geometry.Geometry
 *
 * @example
 * var geom = new OG.geometry.Circle([10, 10], 5);
 *
 * @param {OG.geometry.Coordinate} center Circle 중심 좌표
 * @param {Number} radius radius 반경
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.geometry.Circle = function (center, radius) {

	OG.geometry.Circle.superclass.call(this, center, radius, radius, 0);

	this.TYPE = OG.Constants.GEOM_TYPE.CIRCLE;
	this.style = new OG.geometry.Style();
};
OG.geometry.Circle.prototype = new OG.geometry.Ellipse();
OG.geometry.Circle.superclass = OG.geometry.Ellipse;
OG.geometry.Circle.prototype.constructor = OG.geometry.Circle;
OG.Circle = OG.geometry.Circle;

/**
 * 공간기하객체의 길이를 반환한다.
 *
 * @return {Number} 길이
 * @override
 */
OG.geometry.Circle.prototype.getLength = function () {
	var controlPoints = this.getControlPoints(),
		center = this.getCentroid(),
		radiusX = center.distance(controlPoints[1]);
	return 2 * Math.PI * radiusX;
};

/**
 * 객체 프라퍼티 정보를 JSON 스트링으로 반환한다.
 *
 * @return {String} 프라퍼티 정보
 * @override
 */
OG.geometry.Circle.prototype.toString = function () {
	var s = [],
		controlPoints = this.getControlPoints(),
		center = this.getCentroid(),
		radiusX = center.distance(controlPoints[1]),
		radiusY = center.distance(controlPoints[3]),
		angle = OG.Util.round(Math.atan2(controlPoints[1].y - center.y, controlPoints[1].x - center.x) * 180 / Math.PI);

	if (radiusX === radiusY) {
		s.push("type:'" + OG.Constants.GEOM_NAME[this.TYPE] + "'");
		s.push("center:" + center);
		s.push("radius:" + radiusX);
	} else {
		s.push("type:'" + OG.Constants.GEOM_NAME[OG.Constants.GEOM_TYPE.ELLIPSE] + "'");
		s.push("center:" + center);
		s.push("radiusX:" + radiusX);
		s.push("radiusY:" + radiusY);
		s.push("angle:" + angle);
	}

	return "{" + s.join() + "}";
};