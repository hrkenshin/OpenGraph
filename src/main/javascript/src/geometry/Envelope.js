/**
 * 2차원 좌표계에서 Envelope 영역을 정의
 *
 * @example
 * var boundingBox = new OG.Envelope([50, 50], 200, 100);
 *
 * @class
 * @requires OG.geometry.Coordinate
 *
 * @param {OG.geometry.Coordinate,Number[]} upperLeft 기준 좌상단 좌표
 * @param {Number} width 너비
 * @param {Number} height 높이
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.geometry.Envelope = function (upperLeft, width, height) {
	var _upperLeft, _width = width, _height = height,
		_upperRight, _lowerLeft, _lowerRight, _leftCenter, _upperCenter, _rightCenter, _lowerCenter, _centroid,
		reset;

	// Array 좌표를 OG.geometry.Coordinate 로 변환
	if (upperLeft) {
		if (upperLeft.constructor === Array) {
			_upperLeft = new OG.geometry.Coordinate(upperLeft);
		} else {
			_upperLeft = new OG.geometry.Coordinate(upperLeft.x, upperLeft.y);
		}
	}

	/**
	 * 기준 좌상단 좌표를 반환한다.
	 *
	 * @return {OG.geometry.Coordinate} 좌상단 좌표
	 */
	this.getUpperLeft = function () {
		return _upperLeft;
	};

	/**
	 * 주어진 좌표로 기준 좌상단 좌표를 설정한다. 새로 설정된 값으로 이동된다.
	 *
	 * @param {OG.geometry.Coordinate,Number[]} upperLeft 좌상단 좌표
	 */
	this.setUpperLeft = function (upperLeft) {
		if (upperLeft.constructor === Array) {
			upperLeft = new OG.geometry.Coordinate(upperLeft[0], upperLeft[1]);
		}

		_upperLeft = upperLeft;
		reset();
	};

	/**
	 * 우상단 좌표를 반환한다.
	 *
	 * @return {OG.geometry.Coordinate} 우상단 좌표
	 */
	this.getUpperRight = function () {
		if (!_upperRight) {
			_upperRight = new OG.geometry.Coordinate(_upperLeft.x + _width, _upperLeft.y);
		}
		return _upperRight;
	};

	/**
	 * 우하단 좌표를 반환한다.
	 *
	 * @return {OG.geometry.Coordinate} 우하단 좌표
	 */
	this.getLowerRight = function () {
		if (!_lowerRight) {
			_lowerRight = new OG.geometry.Coordinate(_upperLeft.x + _width, _upperLeft.y + _height);
		}
		return _lowerRight;
	};

	/**
	 * 좌하단 좌표를 반환한다.
	 *
	 * @return {OG.geometry.Coordinate} 좌하단 좌표
	 */
	this.getLowerLeft = function () {
		if (!_lowerLeft) {
			_lowerLeft = new OG.geometry.Coordinate(_upperLeft.x, _upperLeft.y + _height);
		}
		return _lowerLeft;
	};

	/**
	 * 좌중간 좌표를 반환한다.
	 *
	 * @return {OG.geometry.Coordinate} 좌중간 좌표
	 */
	this.getLeftCenter = function () {
		if (!_leftCenter) {
			_leftCenter = new OG.geometry.Coordinate(_upperLeft.x, OG.Util.round(_upperLeft.y + _height / 2));
		}
		return _leftCenter;
	};

	/**
	 * 상단중간 좌표를 반환한다.
	 *
	 * @return {OG.geometry.Coordinate} 상단중간 좌표
	 */
	this.getUpperCenter = function () {
		if (!_upperCenter) {
			_upperCenter = new OG.geometry.Coordinate(OG.Util.round(_upperLeft.x + _width / 2), _upperLeft.y);
		}
		return _upperCenter;
	};

	/**
	 * 우중간 좌표를 반환한다.
	 *
	 * @return {OG.geometry.Coordinate} 우중간 좌표
	 */
	this.getRightCenter = function () {
		if (!_rightCenter) {
			_rightCenter = new OG.geometry.Coordinate(_upperLeft.x + _width, OG.Util.round(_upperLeft.y + _height / 2));
		}
		return _rightCenter;
	};

	/**
	 * 하단중간 좌표를 반환한다.
	 *
	 * @return {OG.geometry.Coordinate} 하단중간 좌표
	 */
	this.getLowerCenter = function () {
		if (!_lowerCenter) {
			_lowerCenter = new OG.geometry.Coordinate(OG.Util.round(_upperLeft.x + _width / 2), _upperLeft.y + _height);
		}
		return _lowerCenter;
	};

	/**
	 * Envelope 의 중심좌표를 반환한다.
	 *
	 * @return {OG.geometry.Coordinate} 중심좌표
	 */
	this.getCentroid = function () {
		if (!_centroid) {
			_centroid = new OG.geometry.Coordinate(OG.Util.round(_upperLeft.x + _width / 2),
				OG.Util.round(_upperLeft.y + _height / 2));
		}

		return _centroid;
	};

	/**
	 * 주어진 좌표로 중심 좌표를 설정한다. 새로 설정된 값으로 이동된다.
	 *
	 * @param {OG.geometry.Coordinate,Number[]} centroid 중심좌표
	 */
	this.setCentroid = function (centroid) {
		if (centroid.constructor === Array) {
			centroid = new OG.geometry.Coordinate(centroid[0], centroid[1]);
		}

		this.move(centroid.x - this.getCentroid().x, centroid.y - this.getCentroid().y);
	};

	/**
	 * Envelope 의 가로 사이즈를 반환한다.
	 *
	 * @return {Number} 너비
	 */
	this.getWidth = function () {
		return _width;
	};

	/**
	 * 주어진 값으로 Envelope 의 가로 사이즈를 설정한다.
	 *
	 * @param {Number} width 너비
	 */
	this.setWidth = function (width) {
		_width = width;
		reset();
	};

	/**
	 * Envelope 의 세로 사이즈를 반환한다.
	 *
	 * @return {Number} 높이
	 */
	this.getHeight = function () {
		return _height;
	};

	/**
	 * 주어진 값으로 Envelope 의 세로 사이즈를 설정한다.
	 *
	 * @param {Number} height 높이
	 */
	this.setHeight = function (height) {
		_height = height;
		reset();
	};

	/**
	 * Envelope 모든 꼭지점을 반환한다.
	 * 좌상단좌표부터 시계방향으로 꼭지점 Array 를 반환한다.
	 *
	 * @return {OG.geometry.Coordinate[]} 꼭지점 좌표 Array : [좌상단, 상단중간, 우상단, 우중간, 우하단, 하단중간, 좌하단, 좌중간, 좌상단]
	 */
	this.getVertices = function () {
		var vertices = [];

		vertices.push(this.getUpperLeft());
		vertices.push(this.getUpperCenter());
		vertices.push(this.getUpperRight());
		vertices.push(this.getRightCenter());
		vertices.push(this.getLowerRight());
		vertices.push(this.getLowerCenter());
		vertices.push(this.getLowerLeft());
		vertices.push(this.getLeftCenter());
		vertices.push(this.getUpperLeft());

		return vertices;
	};

	/**
	 * 주어진 좌표값이 Envelope 영역에 포함되는지 비교한다.
	 *
	 * @param {OG.geometry.Coordinate,Number[]} coordinate 좌표값
	 * @return {Boolean} true:포함, false:비포함
	 */
	this.isContains = function (coordinate) {
		if (coordinate.constructor === Array) {
			return coordinate[0] >= _upperLeft.x && coordinate[0] <= this.getLowerRight().x &&
				coordinate[1] >= _upperLeft.y && coordinate[1] <= this.getLowerRight().y;
		} else {
			return coordinate.x >= _upperLeft.x && coordinate.x <= this.getLowerRight().x &&
				coordinate.y >= _upperLeft.y && coordinate.y <= this.getLowerRight().y;
		}
	};

	/**
	 * 주어진 모든 좌표값이 Envelope 영역에 포함되는지 비교한다.
	 *
	 * @param {OG.geometry.Coordinate[]} coordinateArray 좌표값 Array
	 * @return {Boolean} true:포함, false:비포함
	 */
	this.isContainsAll = function (coordinateArray) {
		var i;
		for (i = 0; i < coordinateArray.length; i++) {
			if (!this.isContains(coordinateArray[i])) {
				return false;
			}
		}

		return true;
	};

	/**
	 * 크기는 고정한 채 가로, 세로 Offset 만큼 Envelope 을 이동한다.
	 *
	 * @param {Number} offsetX 가로 Offset
	 * @param {Number} offsetY 세로 Offset
	 * @return {OG.geometry.Envelope} 이동된 Envelope
	 */
	this.move = function (offsetX, offsetY) {
		_upperLeft.move(offsetX, offsetY);
		reset();

		return this;
	};

	/**
	 * 상, 하, 좌, 우 외곽선을 이동하여 Envelope 을 리사이즈 한다.
	 *
	 * @param {Number} upper 상단 라인 이동 Offset(위 방향으로 +)
	 * @param {Number} lower 하단 라인 이동 Offset(아래 방향으로 +)
	 * @param {Number} left 좌측 라인 이동 Offset(좌측 방향으로 +)
	 * @param {Number} right 우측 라인 이동 Offset(우측 방향으로 +)
	 * @return {OG.geometry.Envelope} 리사이즈된 Envelope
	 */
	this.resize = function (upper, lower, left, right) {
		upper = upper || 0;
		lower = lower || 0;
		left = left || 0;
		right = right || 0;

		if (_width + (left + right) < 0 || _height + (upper + lower) < 0) {
			throw new OG.ParamError();
		}

		_upperLeft.move(-1 * left, -1 * upper);
		_width += (left + right);
		_height += (upper + lower);
		reset();

		return this;
	};

	/**
	 * 주어진 Envelope 영역과 같은지 비교한다.
	 *
	 * @param {OG.geometry.Envelope} Envelope 영역
	 * @return {Boolean} true:같음, false:다름
	 */
	this.isEquals = function (envelope) {
		if (envelope && envelope instanceof OG.geometry.Envelope) {
			if (this.getUpperLeft().isEquals(envelope.getUpperLeft()) &&
				this.getWidth() === envelope.getWidth() &&
				this.getHeight() === envelope.getHeight()) {
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
		s.push("upperLeft:" + this.getUpperLeft());
		s.push("width:" + this.getWidth());
		s.push("height:" + this.getHeight());
		s.push("upperRight:" + this.getUpperRight());
		s.push("lowerLeft:" + this.getLowerLeft());
		s.push("lowerRight:" + this.getLowerRight());
		s.push("leftCenter:" + this.getLeftCenter());
		s.push("upperCenter:" + this.getUpperCenter());
		s.push("rightCenter:" + this.getRightCenter());
		s.push("lowerCenter:" + this.getLowerCenter());
		s.push("centroid:" + this.getCentroid());

		return "{" + s.join() + "}";
	};

	/**
	 * _upperLeft, _width, _height 를 제외한 로컬 멤버 변수의 값을 리셋한다.
	 *
	 * @private
	 */
	reset = function () {
		_upperRight = null;
		_lowerLeft = null;
		_lowerRight = null;
		_leftCenter = null;
		_upperCenter = null;
		_rightCenter = null;
		_lowerCenter = null;
		_centroid = null;
	};
};
OG.geometry.Envelope.prototype = new OG.geometry.Envelope();
OG.geometry.Envelope.prototype.constructor = OG.geometry.Envelope;
OG.Envelope = OG.geometry.Envelope;