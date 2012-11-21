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
	 * 예외명
	 * @type String
	 */
	this.name = "OG.NotSupportedException";

	/**
	 * 메시지
	 * @type String
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
	 * 예외명
	 * @type String
	 */
	this.name = "OG.NotImplementedException";

	/**
	 * 메시지
	 * @type String
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
	 * 예외명
	 * @type String
	 */
	this.name = "OG.ParamError";

	/**
	 * 메시지
	 * @type String
	 */
	this.message = message || "Invalid Parameter Error!";
};
OG.ParamError = OG.common.ParamError;