/**
 * Shape 의 Edge 연결 포인트 정보
 *
 * @class
 * @requires OG.common.*, OG.geometry.*
 *
 * @param position {OG.geometry.Coordinate} 위치좌표값
 * @param direction {String} 연결위치 (C:Center, E:East, W:West, S:South, N:North)
 * @param inout {String} 연결모드 (IN, OUT, INOUT)
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.Terminal = function (position, direction, inout) {
	/**
	 * 위치좌표값
	 * @type OG.geometry.Coordinate
	 */
	this.position = position;

	/**
	 * 연결위치 (C:Center, E:East, W:West, S:South, N:North)
	 * @type String
	 */
	this.direction = direction || OG.Constants.TERMINAL_TYPE.E;

	/**
	 * 연결모드 (IN, OUT, INOUT)
	 * @type String
	 */
	this.inout = inout || OG.Constants.TERMINAL_TYPE.INOUT;
};
OG.shape.Terminal.prototype = new OG.shape.Terminal();
OG.shape.Terminal.prototype.constructor = OG.shape.Terminal;
OG.Terminal = OG.shape.Terminal;