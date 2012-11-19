/**
 * 도형, 텍스트, 이미지 등의 드로잉 될 Object 의 정보를 저장하는 Shape 정보 최상위 인터페이스
 *
 * @class
 * @requires OG.common.*, OG.geometry.*
 *
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.shape.IShape = function () {
	this.TYPE = OG.Constants.NODE_TYPE.SHAPE;

	this.SHAPE_ID = 'OG.shape.IShape';

	this.geom = null;

	this.label = null;

	this.isCollapsed = false;

	/**
	 * Shape 간의 연결을 위한 Terminal 을 반환한다.
	 *
	 * @return {OG.Terminal[]} Terminal
	 * @abstract
	 */
	this.createTerminal = function () {
		return [];
	};

	/**
	 * 드로잉할 Shape 를 생성하여 반환한다.
	 *
	 * @return {*} Shape 정보
	 * @abstract
	 */
	this.createShape = function () {
		throw new OG.NotImplementedException("OG.shape.IShape.createShape");
	};

	/**
	 * Shape 을 복사하여 새로인 인스턴스로 반환한다.
	 *
	 * @return {OG.shape.IShape} 복사된 인스턴스
	 * @abstract
	 */
	this.clone = function () {
		throw new OG.NotImplementedException("OG.shape.IShape.clone");
	};
};
OG.shape.IShape.prototype = new OG.shape.IShape();
OG.shape.IShape.prototype.constructor = OG.shape.IShape;
OG.IShape = OG.shape.IShape;