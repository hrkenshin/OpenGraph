/**
 * Polygon 공간 기하 객체(Spatial Geometry Object)
 *
 * @class
 * @extends OG.geometry.PolyLine
 * @requires OG.geometry.Coordinate, OG.geometry.Envelope, OG.geometry.Geometry
 *
 * @param {OG.geometry.Coordinate[]} vertices Line Vertex 좌표 Array
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.geometry.Polygon = function (vertices) {

	OG.geometry.Polygon.superclass.call(this, vertices);

	// Polygon 은 첫번째 좌표와 마지막 좌표가 같음
	if (this.vertices.length > 0 && !this.vertices[0].isEquals(this.vertices[this.vertices.length - 1])) {
		this.vertices.push(new OG.geometry.Coordinate(this.vertices[0].x, this.vertices[0].y));
	}

	/**
	 * {Number} 공간 기하 객체 타입
	 */
	this.TYPE = OG.Constants.GEOM_TYPE.POLYGON;

	/**
	 * {Boolean} 닫힌 기하 객체 인지 여부
	 */
	this.IS_CLOSED = true;

	/**
	 * {OG.geometry.Style} 스타일 속성
	 */
	this.style = new OG.geometry.Style();
};
OG.geometry.Polygon.prototype = new OG.geometry.PolyLine();
OG.geometry.Polygon.superclass = OG.geometry.PolyLine;
OG.geometry.Polygon.prototype.constructor = OG.geometry.Polygon;
OG.Polygon = OG.geometry.Polygon;