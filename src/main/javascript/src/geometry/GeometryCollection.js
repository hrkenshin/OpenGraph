/**
 * 공간 기하 객체(Spatial Geometry Object) Collection
 *
 * @class
 * @extends OG.geometry.Geometry
 * @requires OG.geometry.Coordinate, OG.geometry.Envelope, OG.geometry.Geometry
 *
 * @example
 * var geom1 = new OG.geometry.Point([20, 5]),
 *     geom2 = new OG.geometry.Line([20, 5], [30, 15]),
 *     geom3 = new OG.geometry.PolyLine([[20, 5], [30, 15], [40, 25], [50, 15]]);
 *
 * var collection = new OG.geometry.GeometryCollection([geom1, geom2, geom3]);
 *
 * @param geometries {OG.geometry.Geometry[]} 공간 기하 객체 Array
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.geometry.GeometryCollection = function (geometries) {

	this.TYPE = OG.Constants.GEOM_TYPE.COLLECTION;
	this.style = new OG.geometry.Style();

	/**
	 * 공간 기하 객체 Array
	 * @type OG.geometry.Geometry[]
	 */
	this.geometries = geometries;
};
OG.geometry.GeometryCollection.prototype = new OG.geometry.Geometry();
OG.geometry.GeometryCollection.superclass = OG.geometry.Geometry;
OG.geometry.GeometryCollection.prototype.constructor = OG.geometry.GeometryCollection;
OG.GeometryCollection = OG.geometry.GeometryCollection;

/**
 * 공간기하객체의 모든 꼭지점을 반환한다.
 *
 * @return {OG.geometry.Coordinate[]} 꼭지점 좌표 Array
 * @override
 */
OG.geometry.GeometryCollection.prototype.getVertices = function () {
	var vertices = [], _vertices, i, j;
	for (i = 0; i < this.geometries.length; i++) {
		_vertices = this.geometries[i].getVertices();
		for (j = 0; j < _vertices.length; j++) {
			vertices.push(_vertices[j]);
		}
	}

	return vertices;
};

/**
 * 가로, 세로 Offset 만큼 좌표를 이동한다.
 *
 * @param {Number} offsetX 가로 Offset
 * @param {Number} offsetY 세로 Offset
 * @return {OG.geometry.Geometry} 이동된 공간 기하 객체
 * @override
 */
OG.geometry.GeometryCollection.prototype.move = function (offsetX, offsetY) {
	var i;
	this.getBoundary().move(offsetX, offsetY);
	for (i = 0; i < this.geometries.length; i++) {
		this.geometries[i].move(offsetX, offsetY);
		this.geometries[i].reset();
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
OG.geometry.GeometryCollection.prototype.resize = function (upper, lower, left, right) {
	var boundary = this.getBoundary(),
		offsetX = left + right,
		offsetY = upper + lower,
		width = boundary.getWidth() + offsetX,
		height = boundary.getHeight() + offsetY,
		rateWidth = boundary.getWidth() === 0 ? 1 : width / boundary.getWidth(),
		rateHeight = boundary.getHeight() === 0 ? 1 : height / boundary.getHeight(),
		upperLeft = boundary.getUpperLeft(),
		vertices, i, j;

	if (width < 0 || height < 0) {
		throw new OG.ParamError();
	}

	for (i = 0; i < this.geometries.length; i++) {
		vertices = this.geometries[i].vertices;
		for (j = 0; j < vertices.length; j++) {
			vertices[j].x = OG.Util.round((upperLeft.x - left) + (vertices[j].x - upperLeft.x) * rateWidth);
			vertices[j].y = OG.Util.round((upperLeft.y - upper) + (vertices[j].y - upperLeft.y) * rateHeight);
		}
		this.geometries[i].reset();
	}
	boundary.resize(upper, lower, left, right);

	return this;
};

/**
 * 중심좌표는 고정한 채 Bounding Box 의 width, height 를 리사이즈 한다.
 *
 * @param {Number} width 너비
 * @param {Number} height 높이
 * @return {OG.geometry.Geometry} 리사이즈된 공간 기하 객체
 * @override
 */
OG.geometry.GeometryCollection.prototype.resizeBox = function (width, height) {
	var boundary = this.getBoundary(),
		offsetWidth = OG.Util.round((width - boundary.getWidth()) / 2),
		offsetHeight = OG.Util.round((height - boundary.getHeight()) / 2);

	this.resize(offsetHeight, offsetHeight, offsetWidth, offsetWidth);

	return this;
};

/**
 * 기준 좌표를 기준으로 주어진 각도 만큼 회전한다.
 *
 * @param {Number} angle 회전 각도
 * @param {OG.geometry.Coordinate} origin 기준 좌표(default:중심좌표)
 * @return {OG.geometry.Geometry} 회전된 공간 기하 객체
 * @override
 */
OG.geometry.GeometryCollection.prototype.rotate = function (angle, origin) {
	var i;
	origin = origin || this.getCentroid();
	for (i = 0; i < this.geometries.length; i++) {
		this.geometries[i].rotate(angle, origin);
		this.geometries[i].reset();
	}
	this.reset();

	return this;
};

/**
 * 주어진 Boundary 영역 안으로 공간 기하 객체를 적용한다.(이동 & 리사이즈)
 *
 * @param {OG.geometry.Envelope} envelope Envelope 영역
 * @return {OG.geometry.Geometry} 적용된 공간 기하 객체
 * @override
 */
OG.geometry.GeometryCollection.prototype.fitToBoundary = function (envelope) {
	var boundary = this.getBoundary(),
		upper = boundary.getUpperCenter().y - envelope.getUpperCenter().y,
		lower = envelope.getLowerCenter().y - boundary.getLowerCenter().y,
		left = boundary.getLeftCenter().x - envelope.getLeftCenter().x,
		right = envelope.getRightCenter().x - boundary.getRightCenter().x;

	this.resize(upper, lower, left, right);

	return this;
};

/**
 * 객체 프라퍼티 정보를 JSON 스트링으로 반환한다.
 *
 * @return {String} 프라퍼티 정보
 * @override
 */
OG.geometry.GeometryCollection.prototype.toString = function () {
	var s = [], i;

	for (i = 0; i < this.geometries.length; i++) {
		s.push(this.geometries[i].toString());
	}

	return "{type:'" + OG.Constants.GEOM_NAME[this.TYPE] + "',geometries:[" + s.join() + "]}";
};