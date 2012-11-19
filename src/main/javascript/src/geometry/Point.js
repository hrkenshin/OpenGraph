/**
 * Point 공간 기하 객체(Spatial Geometry Object)
 *
 * @class
 * @extends OG.geometry.Geometry
 * @requires OG.geometry.Coordinate, OG.geometry.Envelope, OG.geometry.Geometry
 *
 * @param {OG.geometry.Coordinate} coordinate 좌표값
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.geometry.Point = function (coordinate) {

	/**
	 * {Number} 공간 기하 객체 타입
	 */
	this.TYPE = OG.Constants.GEOM_TYPE.POINT;

	/**
	 * {Boolean} 닫힌 기하 객체 인지 여부
	 */
	this.IS_CLOSED = false;

	/**
	 * {OG.geometry.Style} 스타일 속성
	 */
	this.style = new OG.geometry.Style();

	/**
	 * {OG.geometry.Coordinate} 좌표값
	 */
	this.coordinate = this.convertCoordinate(coordinate);

	/**
	 * {OG.geometry.Coordinate[]} Line Vertex 좌표 Array
	 */
	this.vertices = [this.coordinate];

	/**
	 * 공간기하객체의 모든 꼭지점을 반환한다.
	 *
	 * @return {OG.geometry.Coordinate[]} 꼭지점 좌표 Array
	 * @override
	 */
	this.getVertices = function () {
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
	this.move = function (offsetX, offsetY) {
		this.getBoundary().move(offsetX, offsetY);
		this.coordinate.move(offsetX, offsetY);
		this.vertices = [this.coordinate];

		return this;
	};

	/**
	 * 주어진 중심좌표로 공간기하객체를 이동한다.
	 *
	 * @param {OG.geometry.Coordinate} 중심 좌표
	 */
	this.moveCentroid = function (target) {
		this.getBoundary().setUpperLeft(target);
		this.coordinate = new OG.geometry.Coordinate(target);
		this.vertices = [this.coordinate];
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
	this.resize = function (upper, lower, left, right) {
		var boundary = this.getBoundary();
		boundary.resize(upper, lower, left, right);

		this.coordinate = boundary.getCentroid();
		this.vertices = [this.coordinate];
		this.boundary = new OG.Envelope(this.coordinate, 0, 0);

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
	this.resizeBox = function (width, height) {
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
	this.rotate = function (angle, origin) {
		origin = origin || this.getCentroid();

		this.coordinate.rotate(angle, origin);
		this.vertices = [this.coordinate];
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
	this.fitToBoundary = function (envelope) {
		this.coordinate = envelope.getCentroid();
		this.vertices = [this.coordinate];
		this.boundary = new OG.Envelope(this.coordinate, 0, 0);

		return this;
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
		s.push("coordinate:" + this.coordinate);

		return "{" + s.join() + "}";
	};
};
OG.geometry.Point.prototype = new OG.geometry.Geometry();
OG.geometry.Point.prototype.constructor = OG.geometry.Point;
OG.Point = OG.geometry.Point;