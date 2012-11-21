/**
 * Rectangle 공간 기하 객체(Spatial Geometry Object)
 *
 * @class
 * @extends OG.geometry.Polygon
 * @requires OG.geometry.Coordinate, OG.geometry.Envelope, OG.geometry.Geometry
 *
 * @example
 * var geom = new OG.geometry.Rectangle([20, 5], 10, 10);
 *
 * @param {OG.geometry.Coordinate} upperLeft 좌상단좌표
 * @param {Number} width 너비
 * @param {Number} height 높이
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.geometry.Rectangle = function (upperLeft, width, height) {

	var _upperLeft = this.convertCoordinate(upperLeft),
		_lowerRight = this.convertCoordinate([_upperLeft.x + width, _upperLeft.y + height]);

	// 파라미터 유효성 체크
	if (_upperLeft.x > _lowerRight.x || _upperLeft.y > _lowerRight.y) {
		throw new OG.ParamError();
	}

	OG.geometry.Rectangle.superclass.call(this, [
		[_upperLeft.x, _upperLeft.y],
		[_upperLeft.x + (_lowerRight.x - _upperLeft.x), _upperLeft.y],
		[_lowerRight.x, _lowerRight.y],
		[_upperLeft.x, _upperLeft.y + (_lowerRight.y - _upperLeft.y)],
		[_upperLeft.x, _upperLeft.y]
	]);

	this.TYPE = OG.Constants.GEOM_TYPE.RECTANGLE;
	this.style = new OG.geometry.Style();
};
OG.geometry.Rectangle.prototype = new OG.geometry.Polygon();
OG.geometry.Rectangle.superclass = OG.geometry.Polygon;
OG.geometry.Rectangle.prototype.constructor = OG.geometry.Rectangle;
OG.Rectangle = OG.geometry.Rectangle;

/**
 * 객체 프라퍼티 정보를 JSON 스트링으로 반환한다.
 *
 * @return {String} 프라퍼티 정보
 * @override
 */
OG.geometry.Rectangle.prototype.toString = function () {
	var s = [],
		angle = OG.Util.round(Math.atan2(this.vertices[1].y - this.vertices[0].y,
			this.vertices[1].x - this.vertices[0].x) * 180 / Math.PI);

	s.push("type:'" + OG.Constants.GEOM_NAME[this.TYPE] + "'");
	s.push("upperLeft:" + this.vertices[0]);
	s.push("width:" + (this.vertices[0].distance(this.vertices[1])));
	s.push("height:" + (this.vertices[0].distance(this.vertices[3])));
	s.push("angle:" + angle);

	return "{" + s.join() + "}";
};