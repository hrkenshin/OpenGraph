/**
 * 2차원 좌표계에서의 좌표값
 *
 * @example
 * var coordinate1 = new OG.Coordinate(10, 10);
 * or
 * var coordinate2 = new OG.Coordinate([20, 20]);
 *
 * @class
 *
 * @param {Number} x x좌표
 * @param {Number} y y좌표
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.geometry.Coordinate = function (x, y) {

	/**
	 * {Number} x좌표
	 */
	this.x = undefined;

	/**
	 * {Number} y좌표
	 */
	this.y = undefined;

	// Array 좌표를 OG.geometry.Coordinate 로 변환
	if (arguments.length === 1 && x.constructor === Array) {
		this.x = x[0];
		this.y = x[1];
	} else if (arguments.length === 2 && typeof x === "number" && typeof y === "number") {
		this.x = x;
		this.y = y;
	} else if (arguments.length !== 0) {
		throw new OG.ParamError();
	}

	/**
	 * 주어진 좌표와의 거리를 계산한다.
	 *
	 * @example
	 * coordinate.distance([10, 10]);
	 * or
	 * coordinate.distance(new OG.Coordinate(10, 10));
	 *
	 *
	 * @param {OG.geometry.Coordinate,Number[]} coordinate 좌표값
	 * @return {Number} 좌표간의 거리값
	 */
	this.distance = function (coordinate) {
		if (coordinate.constructor === Array) {
			coordinate = new OG.geometry.Coordinate(coordinate[0], coordinate[1]);
		}

		var dx = this.x - coordinate.x, dy = this.y - coordinate.y;
		return OG.Util.round(Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)));
	};

	/**
	 * 가로, 세로 Offset 만큼 좌표를 이동한다.
	 *
	 * @param {Number} offsetX 가로 Offset
	 * @param {Number} offsetY 세로 Offset
	 * @return {OG.geometry.Coordinate} 이동된 좌표
	 */
	this.move = function (offsetX, offsetY) {
		this.x += offsetX;
		this.y += offsetY;

		return this;
	};

	/**
	 * 기준 좌표를 기준으로 주어진 각도 만큼 회전한다.
	 *
	 * @example
	 * coordinate.rotate(90, [10,10]);
	 * or
	 * coordinate.rotate(90, new OG.Coordinate(10, 10));
	 *
	 * @param {Number} angle 회전 각도
	 * @param {OG.geometry.Coordinate,Number[]} origin 기준 좌표
	 * @return {OG.geometry.Coordinate} 회전된 좌표
	 */
	this.rotate = function (angle, origin) {
		if (origin.constructor === Array) {
			origin = new OG.geometry.Coordinate(origin[0], origin[1]);
		}

		angle *= Math.PI / 180;
		var radius = this.distance(origin),
			theta = angle + Math.atan2(this.y - origin.y, this.x - origin.x);
		this.x = OG.Util.round(origin.x + (radius * Math.cos(theta)));
		this.y = OG.Util.round(origin.y + (radius * Math.sin(theta)));

		return this;
	};

	/**
	 * 주어진 좌표값과 같은지 비교한다.
	 *
	 * @example
	 * coordinate.isEquals([10, 10]);
	 * or
	 * coordinate.isEquals(new OG.Coordinate(10, 10));
	 *
	 * @param {OG.geometry.Coordinate,Number[]} coordinate 좌표값
	 * @return {Boolean} true:같음, false:다름
	 */
	this.isEquals = function (coordinate) {
		if (coordinate.constructor === Array) {
			coordinate = new OG.geometry.Coordinate(coordinate[0], coordinate[1]);
		}

		if (coordinate && coordinate instanceof OG.geometry.Coordinate) {
			if (this.x === coordinate.x && this.y === coordinate.y) {
				return true;
			}
		}

		return false;
	};

	/**
	 * 객체 프라퍼티 정보를 JSON 스트링으로 반환한다.
	 *
	 * @return {String} 프라퍼티 정보
	 * @override
	 */
	this.toString = function () {
		var s = [];
		s.push(this.x);
		s.push(this.y);

		return "[" + s.join() + "]";
	};
};
OG.geometry.Coordinate.prototype = new OG.geometry.Coordinate();
OG.geometry.Coordinate.prototype.constructor = OG.geometry.Coordinate;
OG.Coordinate = OG.geometry.Coordinate;