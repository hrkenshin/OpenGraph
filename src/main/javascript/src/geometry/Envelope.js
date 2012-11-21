/**
 * 2차원 좌표계에서 Envelope 영역을 정의
 *
 * @class
 * @requires OG.geometry.Coordinate
 *
 * @example
 * var boundingBox = new OG.geometry.Envelope([50, 50], 200, 100);
 *
 * @param {OG.geometry.Coordinate,Number[]} upperLeft 기준 좌상단 좌표
 * @param {Number} width 너비
 * @param {Number} height 높이
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.geometry.Envelope = function (upperLeft, width, height) {

	/**
	 * @type OG.geometry.Coordinate
	 * @private
	 */
	this._upperLeft = null;

	/**
	 * @type Number
	 * @private
	 */
	this._width = width;

	/**
	 * @type Number
	 * @private
	 */
	this._height = height;

	/**
	 * @type OG.geometry.Coordinate
	 * @private
	 */
	this._upperRight = null;

	/**
	 * @type OG.geometry.Coordinate
	 * @private
	 */
	this._lowerLeft = null;

	/**
	 * @type OG.geometry.Coordinate
	 * @private
	 */
	this._lowerRight = null;

	/**
	 * @type OG.geometry.Coordinate
	 * @private
	 */
	this._leftCenter = null;

	/**
	 * @type OG.geometry.Coordinate
	 * @private
	 */
	this._leftCenter = null;

	/**
	 * @type OG.geometry.Coordinate
	 * @private
	 */
	this._upperCenter = null;

	/**
	 * @type OG.geometry.Coordinate
	 * @private
	 */
	this._rightCenter = null;

	/**
	 * @type OG.geometry.Coordinate
	 * @private
	 */
	this._lowerCenter = null;

	/**
	 * @type OG.geometry.Coordinate
	 * @private
	 */
	this._centroid = null;

	// Array 좌표를 OG.geometry.Coordinate 로 변환
	if (upperLeft) {
		if (upperLeft.constructor === Array) {
			this._upperLeft = new OG.geometry.Coordinate(upperLeft);
		} else {
			this._upperLeft = new OG.geometry.Coordinate(upperLeft.x, upperLeft.y);
		}
	}
};
OG.geometry.Envelope.prototype = {
	/**
	 * 기준 좌상단 좌표를 반환한다.
	 *
	 * @return {OG.geometry.Coordinate} 좌상단 좌표
	 */
	getUpperLeft: function () {
		return this._upperLeft;
	},

	/**
	 * 주어진 좌표로 기준 좌상단 좌표를 설정한다. 새로 설정된 값으로 이동된다.
	 *
	 * @param {OG.geometry.Coordinate,Number[]} upperLeft 좌상단 좌표
	 */
	setUpperLeft: function (upperLeft) {
		if (upperLeft.constructor === Array) {
			upperLeft = new OG.geometry.Coordinate(upperLeft[0], upperLeft[1]);
		}

		this._upperLeft = upperLeft;
		this._reset();
	},

	/**
	 * 우상단 좌표를 반환한다.
	 *
	 * @return {OG.geometry.Coordinate} 우상단 좌표
	 */
	getUpperRight: function () {
		if (!this._upperRight) {
			this._upperRight = new OG.geometry.Coordinate(this._upperLeft.x + this._width, this._upperLeft.y);
		}
		return this._upperRight;
	},

	/**
	 * 우하단 좌표를 반환한다.
	 *
	 * @return {OG.geometry.Coordinate} 우하단 좌표
	 */
	getLowerRight: function () {
		if (!this._lowerRight) {
			this._lowerRight = new OG.geometry.Coordinate(this._upperLeft.x + this._width, this._upperLeft.y + this._height);
		}
		return this._lowerRight;
	},

	/**
	 * 좌하단 좌표를 반환한다.
	 *
	 * @return {OG.geometry.Coordinate} 좌하단 좌표
	 */
	getLowerLeft: function () {
		if (!this._lowerLeft) {
			this._lowerLeft = new OG.geometry.Coordinate(this._upperLeft.x, this._upperLeft.y + this._height);
		}
		return this._lowerLeft;
	},

	/**
	 * 좌중간 좌표를 반환한다.
	 *
	 * @return {OG.geometry.Coordinate} 좌중간 좌표
	 */
	getLeftCenter: function () {
		if (!this._leftCenter) {
			this._leftCenter = new OG.geometry.Coordinate(this._upperLeft.x, OG.Util.round(this._upperLeft.y + this._height / 2));
		}
		return this._leftCenter;
	},

	/**
	 * 상단중간 좌표를 반환한다.
	 *
	 * @return {OG.geometry.Coordinate} 상단중간 좌표
	 */
	getUpperCenter: function () {
		if (!this._upperCenter) {
			this._upperCenter = new OG.geometry.Coordinate(OG.Util.round(this._upperLeft.x + this._width / 2), this._upperLeft.y);
		}
		return this._upperCenter;
	},

	/**
	 * 우중간 좌표를 반환한다.
	 *
	 * @return {OG.geometry.Coordinate} 우중간 좌표
	 */
	getRightCenter: function () {
		if (!this._rightCenter) {
			this._rightCenter = new OG.geometry.Coordinate(this._upperLeft.x + this._width, OG.Util.round(this._upperLeft.y + this._height / 2));
		}
		return this._rightCenter;
	},

	/**
	 * 하단중간 좌표를 반환한다.
	 *
	 * @return {OG.geometry.Coordinate} 하단중간 좌표
	 */
	getLowerCenter: function () {
		if (!this._lowerCenter) {
			this._lowerCenter = new OG.geometry.Coordinate(OG.Util.round(this._upperLeft.x + this._width / 2), this._upperLeft.y + this._height);
		}
		return this._lowerCenter;
	},

	/**
	 * Envelope 의 중심좌표를 반환한다.
	 *
	 * @return {OG.geometry.Coordinate} 중심좌표
	 */
	getCentroid: function () {
		if (!this._centroid) {
			this._centroid = new OG.geometry.Coordinate(OG.Util.round(this._upperLeft.x + this._width / 2),
				OG.Util.round(this._upperLeft.y + this._height / 2));
		}

		return this._centroid;
	},

	/**
	 * 주어진 좌표로 중심 좌표를 설정한다. 새로 설정된 값으로 이동된다.
	 *
	 * @param {OG.geometry.Coordinate,Number[]} centroid 중심좌표
	 */
	setCentroid: function (centroid) {
		if (centroid.constructor === Array) {
			centroid = new OG.geometry.Coordinate(centroid[0], centroid[1]);
		}

		this.move(centroid.x - this.getCentroid().x, centroid.y - this.getCentroid().y);
	},

	/**
	 * Envelope 의 가로 사이즈를 반환한다.
	 *
	 * @return {Number} 너비
	 */
	getWidth: function () {
		return this._width;
	},

	/**
	 * 주어진 값으로 Envelope 의 가로 사이즈를 설정한다.
	 *
	 * @param {Number} width 너비
	 */
	setWidth: function (width) {
		this._width = width;
		this._reset();
	},

	/**
	 * Envelope 의 세로 사이즈를 반환한다.
	 *
	 * @return {Number} 높이
	 */
	getHeight: function () {
		return this._height;
	},

	/**
	 * 주어진 값으로 Envelope 의 세로 사이즈를 설정한다.
	 *
	 * @param {Number} height 높이
	 */
	setHeight: function (height) {
		this._height = height;
		this._reset();
	},

	/**
	 * Envelope 모든 꼭지점을 반환한다.
	 * 좌상단좌표부터 시계방향으로 꼭지점 Array 를 반환한다.
	 *
	 * @return {OG.geometry.Coordinate[]} 꼭지점 좌표 Array : [좌상단, 상단중간, 우상단, 우중간, 우하단, 하단중간, 좌하단, 좌중간, 좌상단]
	 */
	getVertices: function () {
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
	},

	/**
	 * 주어진 좌표값이 Envelope 영역에 포함되는지 비교한다.
	 *
	 * @param {OG.geometry.Coordinate,Number[]} coordinate 좌표값
	 * @return {Boolean} true:포함, false:비포함
	 */
	isContains: function (coordinate) {
		if (coordinate.constructor === Array) {
			return coordinate[0] >= this._upperLeft.x && coordinate[0] <= this.getLowerRight().x &&
				coordinate[1] >= this._upperLeft.y && coordinate[1] <= this.getLowerRight().y;
		} else {
			return coordinate.x >= this._upperLeft.x && coordinate.x <= this.getLowerRight().x &&
				coordinate.y >= this._upperLeft.y && coordinate.y <= this.getLowerRight().y;
		}
	},

	/**
	 * 주어진 모든 좌표값이 Envelope 영역에 포함되는지 비교한다.
	 *
	 * @param {OG.geometry.Coordinate[]} coordinateArray 좌표값 Array
	 * @return {Boolean} true:포함, false:비포함
	 */
	isContainsAll: function (coordinateArray) {
		var i;
		for (i = 0; i < coordinateArray.length; i++) {
			if (!this.isContains(coordinateArray[i])) {
				return false;
			}
		}

		return true;
	},

	/**
	 * 크기는 고정한 채 가로, 세로 Offset 만큼 Envelope 을 이동한다.
	 *
	 * @param {Number} offsetX 가로 Offset
	 * @param {Number} offsetY 세로 Offset
	 * @return {OG.geometry.Envelope} 이동된 Envelope
	 */
	move: function (offsetX, offsetY) {
		this._upperLeft.move(offsetX, offsetY);
		this._reset();

		return this;
	},

	/**
	 * 상, 하, 좌, 우 외곽선을 이동하여 Envelope 을 리사이즈 한다.
	 *
	 * @param {Number} upper 상단 라인 이동 Offset(위 방향으로 +)
	 * @param {Number} lower 하단 라인 이동 Offset(아래 방향으로 +)
	 * @param {Number} left 좌측 라인 이동 Offset(좌측 방향으로 +)
	 * @param {Number} right 우측 라인 이동 Offset(우측 방향으로 +)
	 * @return {OG.geometry.Envelope} 리사이즈된 Envelope
	 */
	resize: function (upper, lower, left, right) {
		upper = upper || 0;
		lower = lower || 0;
		left = left || 0;
		right = right || 0;

		if (this._width + (left + right) < 0 || this._height + (upper + lower) < 0) {
			throw new OG.ParamError();
		}

		this._upperLeft.move(-1 * left, -1 * upper);
		this._width += (left + right);
		this._height += (upper + lower);
		this._reset();

		return this;
	},

	/**
	 * 주어진 Envelope 영역과 같은지 비교한다.
	 *
	 * @param {OG.geometry.Envelope} Envelope 영역
	 * @return {Boolean} true:같음, false:다름
	 */
	isEquals: function (envelope) {
		if (envelope && envelope instanceof OG.geometry.Envelope) {
			if (this.getUpperLeft().isEquals(envelope.getUpperLeft()) &&
				this.getWidth() === envelope.getWidth() &&
				this.getHeight() === envelope.getHeight()) {
				return true;
			}
		}

		return false;
	},

	/**
	 * 객체 프라퍼티 정보를 JSON 스트링으로 반환한다.
	 *
	 * @return {String} 프라퍼티 정보
	 * @override
	 */
	toString: function () {
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
	},

	/**
	 * _upperLeft, _width, _height 를 제외한 private 멤버 변수의 값을 리셋한다.
	 *
	 * @private
	 */
	_reset: function () {
		this._upperRight = null;
		this._lowerLeft = null;
		this._lowerRight = null;
		this._leftCenter = null;
		this._upperCenter = null;
		this._rightCenter = null;
		this._lowerCenter = null;
		this._centroid = null;
	}
};
OG.geometry.Envelope.prototype.constructor = OG.geometry.Envelope;
OG.Envelope = OG.geometry.Envelope;