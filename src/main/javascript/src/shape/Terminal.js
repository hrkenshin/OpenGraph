/**
 * Shape 의 Edge 연결 포인트 정보
 *
 * @class
 * @requires OG.common.*, OG.geometry.*
 *
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.Terminal = function (position, direction, inout) {
	this.position = position;
	this.direction = direction || OG.Constants.TERMINAL_TYPE.E;
	this.inout = inout || OG.Constants.TERMINAL_TYPE.INOUT;
};
OG.shape.Terminal.prototype = new OG.shape.Terminal();
OG.shape.Terminal.prototype.constructor = OG.shape.Terminal;
OG.Terminal = OG.shape.Terminal;