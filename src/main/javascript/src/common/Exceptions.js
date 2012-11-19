/**
 * 사용자 정의 예외 클래스 NotSupportedException
 *
 * @class
 *
 * @param {String} message 메시지
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.common.NotSupportedException = function (message) {
	/**
	 * {String} 예외명
	 */
	this.name = "OG.NotSupportedException";

	/**
	 * {String} 메시지
	 */
	this.message = message || "Not Supported!";
};
OG.NotSupportedException = OG.common.NotSupportedException;

/**
 * 사용자 정의 예외 클래스 NotImplementedException
 *
 * @class
 *
 * @param {String} message 메시지
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.common.NotImplementedException = function (message) {
	/**
	 * {String} 예외명
	 */
	this.name = "OG.NotImplementedException";

	/**
	 * {String} 메시지
	 */
	this.message = message || "Not Implemented!";
};
OG.NotImplementedException = OG.common.NotImplementedException;

/**
 * 사용자 정의 예외 클래스 ParamError
 *
 * @class
 *
 * @param {String} message 메시지
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.common.ParamError = function (message) {
	/**
	 * {String} 예외명
	 */
	this.name = "OG.ParamError";

	/**
	 * {String} 메시지
	 */
	this.message = message || "Invalid Parameter Error!";
};
OG.ParamError = OG.common.ParamError;