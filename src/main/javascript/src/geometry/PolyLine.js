/**
 * PolyLine 공간 기하 객체(Spatial Geometry Object)
 *
 * @class
 * @extends OG.geometry.Geometry
 * @requires OG.geometry.Coordinate, OG.geometry.Envelope, OG.geometry.Geometry
 *
 * @example
 * var geom = new OG.geometry.PolyLine([[20, 5], [30, 15], [40, 25], [50, 15]]);
 *
 * @param {OG.geometry.Coordinate[]} vertices Line Vertex 좌표 Array
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.geometry.PolyLine = function (vertices) {

	var i;

	this.TYPE = OG.Constants.GEOM_TYPE.POLYLINE;
	this.style = new OG.geometry.Style();

	/**
	 * Line Vertex 좌표 Array
	 * @type OG.geometry.Coordinate[]
	 */
	this.vertices = [];

	// Array 좌표를 OG.geometry.Coordinate 로 변환
	if (vertices && vertices.length > 0) {
		for (i = 0; i < vertices.length; i++) {
			this.vertices.push(this.convertCoordinate(vertices[i]));
		}
	}
};
OG.geometry.PolyLine.prototype = new OG.geometry.Geometry();
OG.geometry.PolyLine.superclass = OG.geometry.Geometry;
OG.geometry.PolyLine.prototype.constructor = OG.geometry.PolyLine;
OG.PolyLine = OG.geometry.PolyLine;

/**
 * 공간기하객체의 모든 꼭지점을 반환한다.
 *
 * @return {OG.geometry.Coordinate[]} 꼭지점 좌표 Array
 * @override
 */
OG.geometry.PolyLine.prototype.getVertices = function () {
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
OG.geometry.PolyLine.prototype.move = function (offsetX, offsetY) {
	var i;
	this.getBoundary().move(offsetX, offsetY);
	for (i = 0; i < this.vertices.length; i++) {
		this.vertices[i].move(offsetX, offsetY);
	}

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
OG.geometry.PolyLine.prototype.resize = function (upper, lower, left, right) {
	var boundary = this.getBoundary(),
		offsetX = left + right,
		offsetY = upper + lower,
		width = boundary.getWidth() + offsetX,
		height = boundary.getHeight() + offsetY,
		rateWidth = boundary.getWidth() === 0 ? 1 : width / boundary.getWidth(),
		rateHeight = boundary.getHeight() === 0 ? 1 : height / boundary.getHeight(),
		upperLeft = boundary.getUpperLeft(),
		i;

	if (width < 0 || height < 0) {
		throw new OG.ParamError();
	}

	for (i = 0; i < this.vertices.length; i++) {
		this.vertices[i].x = OG.Util.round((upperLeft.x - left) + (this.vertices[i].x - upperLeft.x) * rateWidth);
		this.vertices[i].y = OG.Util.round((upperLeft.y - upper) + (this.vertices[i].y - upperLeft.y) * rateHeight);
	}
	boundary.resize(upper, lower, left, right);

	return this;
};

/**
 * 기준 좌표를 기준으로 주어진 각도 만큼 회전한다.
 *
 * @param {Number} angle 회전 각도
 * @param {OG.geometry.Coordinate} origin 기준 좌표
 * @return {OG.geometry.Geometry} 회전된 공간 기하 객체
 * @override
 */
OG.geometry.PolyLine.prototype.rotate = function (angle, origin) {
	var i;
	origin = origin || this.getCentroid();
	for (i = 0; i < this.vertices.length; i++) {
		this.vertices[i].rotate(angle, origin);
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
OG.geometry.PolyLine.prototype.toString = function () {
	var s = [];
	s.push("type:'" + OG.Constants.GEOM_NAME[this.TYPE] + "'");
	s.push("vertices:[" + this.vertices + "]");

	return "{" + s.join() + "}";
};