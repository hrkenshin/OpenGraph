/**
 * Line 공간 기하 객체(Spatial Geometry Object)
 *
 * @class
 * @extends OG.geometry.PolyLine
 * @requires OG.geometry.Coordinate, OG.geometry.Envelope, OG.geometry.Geometry
 *
 * @example
 * var geom = new OG.geometry.Line([20, 5], [30, 15]);
 *
 * @param {OG.geometry.Coordinate} from 라인 시작 좌표값
 * @param {OG.geometry.Coordinate} to 라인 끝 좌표값
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.geometry.Line = function (from, to) {

	var _from = this.convertCoordinate(from),
		_to = this.convertCoordinate(to);

	OG.geometry.Line.superclass.call(this, [
		[_from.x, _from.y],
		[_to.x, _to.y]
	]);

	this.TYPE = OG.Constants.GEOM_TYPE.LINE;
	this.style = new OG.geometry.Style();
};
OG.geometry.Line.prototype = new OG.geometry.PolyLine();
OG.geometry.Line.superclass = OG.geometry.PolyLine;
OG.geometry.Line.prototype.constructor = OG.geometry.Line;
OG.Line = OG.geometry.Line;


/**
 * 객체 프라퍼티 정보를 JSON 스트링으로 반환한다.
 *
 * @return {String} 프라퍼티 정보
 * @override
 */
OG.geometry.Line.prototype.toString = function () {
	var s = [];
	s.push("type:'" + OG.Constants.GEOM_NAME[this.TYPE] + "'");
	s.push("from:" + this.vertices[0]);
	s.push("to:" + this.vertices[1]);

	return "{" + s.join() + "}";
};