/**
 * 공간 기하 객체(Spatial Geometry Object)의 최상위 추상 클래스
 *
 * @class
 * @requires OG.geometry.Coordinate, OG.geometry.Envelope
 *
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.geometry.Geometry = function () {

	/**
	 * {Number} 공간 기하 객체 타입
	 */
	this.TYPE = OG.Constants.GEOM_TYPE.NULL;

	/**
	 * {Boolean} 닫힌 기하 객체 인지 여부
	 */
	this.IS_CLOSED = false;

	/**
	 * {OG.geometry.Style} 스타일 속성
	 */
	this.style = new OG.geometry.Style();

	/**
	 * {OG.geometry.Envelope} 공간기하객체를 포함하는 사각형의 Boundary 영역
	 */
	this.boundary = null;

	// 다른 Geometry 객체와의 Spatial Relation 을 테스트하는 함수들

	/**
	 * 주어진 Geometry 객체와 같은지 비교한다.
	 *
	 * @param {OG.geometry.Geometry} _geometry Geometry 객체
	 * @return {Boolean} true:같음, false:다름
	 */
	this.isEquals = function (_geometry) {
		return _geometry && _geometry.toString() === this.toString();
	};

	/**
	 * 주어진 공간기하객체를 포함하는지 비교한다.
	 *
	 * @param {OG.geometry.Geometry} _geometry Geometry 객체
	 * @return {Boolean} 포함하면 true
	 */
	this.isContains = function (_geometry) {
		throw new OG.NotImplementedException();
	};

	/**
	 * 주어진 공간기하객체에 포함되는지 비교한다.
	 *
	 * @param {OG.geometry.Geometry} _geometry Geometry 객체
	 * @return {Boolean} 포함되면 true
	 */
	this.isWithin = function (_geometry) {
		throw new OG.NotImplementedException();
	};

//	this.isDisjoint = function (_geometry) {
//		throw new OG.NotImplementedException();
//	};
//
//	this.isIntersects = function (_geometry) {
//		throw new OG.NotImplementedException();
//	};
//
//	this.isOverlaps = function (_geometry) {
//		throw new OG.NotImplementedException();
//	};
//
//	this.isTouches = function (_geometry) {
//		throw new OG.NotImplementedException();
//	};

	// 현 Geometry 객체의 Spatial Analysis 를 지원하는 함수들

	/**
	 * 공간기하객체를 포함하는 사각형의 Boundary 영역을 반환한다.
	 *
	 * @return {OG.geometry.Envelope} Envelope 영역
	 */
	this.getBoundary = function () {
		if (this.boundary === null) {
			var minX, minY, maxX, maxY, upperLeft, width, height,
				vertices = this.getVertices(), i;
			for (i = 0; i < vertices.length; i++) {
				if (i === 0) {
					minX = maxX = vertices[i].x;
					minY = maxY = vertices[i].y;
				}
				minX = vertices[i].x < minX ? vertices[i].x : minX;
				minY = vertices[i].y < minY ? vertices[i].y : minY;
				maxX = vertices[i].x > maxX ? vertices[i].x : maxX;
				maxY = vertices[i].y > maxY ? vertices[i].y : maxY;
			}
			upperLeft = new OG.geometry.Coordinate(minX, minY);
			width = maxX - minX;
			height = maxY - minY;

			this.boundary = new OG.geometry.Envelope(upperLeft, width, height);
		}

		return this.boundary;
	};

	/**
	 * 공간기하객체의 중심좌표를 반환한다.
	 *
	 * @return {OG.geometry.Coordinate} 중심좌표
	 */
	this.getCentroid = function () {
		return this.getBoundary().getCentroid();
	};

	/**
	 * 공간기하객체의 모든 꼭지점을 반환한다.
	 *
	 * @return {OG.geometry.Coordinate[]} 꼭지점 좌표 Array
	 * @abstract
	 */
	this.getVertices = function () {
		throw new OG.NotImplementedException();
	};

	/**
	 * 주어진 좌표와의 최단거리를 반환한다.
	 *
	 * @param {OG.geometry.Coordinate} _coordinate 좌표
	 * @return {Number} 최단거리
	 */
	this.minDistance = function (_coordinate) {
		var minDistance = Number.MAX_VALUE,
			distance = 0,
			vertices = this.getVertices(),
			i;

		_coordinate = this.convertCoordinate(_coordinate);

		if (vertices.length === 1) {
			return _coordinate.distance(vertices[0]);
		}

		for (i = 0; i < vertices.length - 1; i++) {
			distance = this.distanceToLine(_coordinate, [vertices[i], vertices[i + 1]]);
			if (distance < minDistance) {
				minDistance = distance;
			}
		}

		return minDistance;
	};

	/**
	 * 주어진 공간기하객체와의 중심점 간의 거리를 반환한다.
	 *
	 * @param {OG.geometry.Geometry} _geometry 공간 기하 객체
	 * @return {Number} 거리
	 */
	this.distance = function (_geometry) {
		return this.getCentroid().distance(_geometry.getCentroid());
	};

	/**
	 * 공간기하객체의 길이를 반환한다.
	 *
	 * @return {Number} 길이
	 */
	this.getLength = function () {
		var length = 0,
			vertices = this.getVertices(),
			i;
		for (i = 0; i < vertices.length - 1; i++) {
			length += vertices[i].distance(vertices[i + 1]);
		}

		return length;
	};

//	this.intersect = function (_geometry) {
//		throw new OG.NotImplementedException();
//	};
//
//	this.union = function (_geometry) {
//		throw new OG.NotImplementedException();
//	};

	// 현 Geometry 객체의 Spatial Transform 를 지원하는 함수들

	/**
	 * 가로, 세로 Offset 만큼 좌표를 이동한다.
	 *
	 * @param {Number} offsetX 가로 Offset
	 * @param {Number} offsetY 세로 Offset
	 * @return {OG.geometry.Geometry} 이동된 공간 기하 객체
	 * @abstract
	 */
	this.move = function (offsetX, offsetY) {
		throw new OG.NotImplementedException();
	};

	/**
	 * 주어진 중심좌표로 공간기하객체를 이동한다.
	 *
	 * @param {OG.geometry.Coordinate} 중심 좌표
	 */
	this.moveCentroid = function (target) {
		var origin = this.getCentroid();
		target = new OG.geometry.Coordinate(target);

		this.move(target.x - origin.x, target.y - origin.y);
	};

	/**
	 * 상, 하, 좌, 우 외곽선을 이동하여 Envelope 을 리사이즈 한다.
	 *
	 * @param {Number} upper 상단 라인 이동 Offset(위 방향으로 +)
	 * @param {Number} lower 하단 라인 이동 Offset(아래 방향으로 +)
	 * @param {Number} left 좌측 라인 이동 Offset(좌측 방향으로 +)
	 * @param {Number} right 우측 라인 이동 Offset(우측 방향으로 +)
	 * @return {OG.geometry.Geometry} 리사이즈된 공간 기하 객체
	 * @abstract
	 */
	this.resize = function (upper, lower, left, right) {
		throw new OG.NotImplementedException();
	};

	/**
	 * 중심좌표는 고정한 채 Bounding Box 의 width, height 를 리사이즈 한다.
	 *
	 * @param {Number} width 너비
	 * @param {Number} height 높이
	 * @return {OG.geometry.Geometry} 리사이즈된 공간 기하 객체
	 */
	this.resizeBox = function (width, height) {
		var boundary = this.getBoundary(),
			offsetWidth = OG.Util.round((width - boundary.getWidth()) / 2),
			offsetHeight = OG.Util.round((height - boundary.getHeight()) / 2);

		this.resize(offsetHeight, offsetHeight, offsetWidth, offsetWidth);

		return this;
	};

	/**
	 * 기준 좌표를 기준으로 주어진 각도 만큼 회전한다.
	 *
	 * @param {Number} angle 회전 각도
	 * @param {OG.geometry.Coordinate} origin 기준 좌표(default:중심좌표)
	 * @return {OG.geometry.Geometry} 회전된 공간 기하 객체
	 * @abstract
	 */
	this.rotate = function (angle, origin) {
		throw new OG.NotImplementedException();
	};

	/**
	 * 주어진 Boundary 영역 안으로 공간 기하 객체를 적용한다.(이동 & 리사이즈)
	 *
	 * @param {OG.geometry.Envelope} envelope Envelope 영역
	 * @return {OG.geometry.Geometry} 적용된 공간 기하 객체
	 */
	this.fitToBoundary = function (envelope) {
		var boundary = this.getBoundary(),
			upper = boundary.getUpperCenter().y - envelope.getUpperCenter().y,
			lower = envelope.getLowerCenter().y - boundary.getLowerCenter().y,
			left = boundary.getLeftCenter().x - envelope.getLeftCenter().x,
			right = envelope.getRightCenter().x - boundary.getRightCenter().x;

		this.resize(upper, lower, left, right);

		return this;
	};

	// 유틸리티 함수들

	/**
	 * 파라미터가 [x, y] 형식의 좌표 Array 이면 OG.geometry.Coordinate 인스턴스를 new 하여 반환한다.
	 *
	 * @param {OG.geometry.Coordinate,Number[]} coordinate [x, y] 형식의 좌표 Array 또는 OG.geometry.Coordinate 인스턴스
	 * @return {OG.geometry.Coordinate}
	 */
	this.convertCoordinate = function (coordinate) {
		// Array 좌표를 OG.geometry.Coordinate 로 변환
		if (coordinate) {
			if (coordinate.constructor === Array) {
				return new OG.geometry.Coordinate(coordinate);
			} else if (coordinate instanceof OG.geometry.Coordinate) {
				return new OG.geometry.Coordinate(coordinate.x, coordinate.y);
			} else {
				throw new OG.ParamError();
			}
		} else {
			return undefined;
		}
	};

	/**
	 * 포인트 P 로부터 라인 AB의 거리를 계산한다.
	 * Note: NON-ROBUST!
	 *
	 * @param {OG.geometry.Coordinate,Number[]} p 기준좌표
	 * @param {OG.geometry.Coordinate[]} line 라인 시작좌표, 끝좌표 Array
	 * @return {Number} 거리
	 */
	this.distanceToLine = function (p, line) {
		var A = this.convertCoordinate(line[0]),
			B = this.convertCoordinate(line[1]),
			r, s;
		p = this.convertCoordinate(p);

		// if start==end, then use pt distance
		if (A.isEquals(B)) {
			return p.distance(A);
		}

		// otherwise use comp.graphics.algorithms Frequently Asked Questions method
		//	(1)				AC dot AB
		//			   r = -----------
		//					||AB||^2
		//	r has the following meaning:
		//	r=0 P = A
		//	r=1 P = B
		//	r<0 P is on the backward extension of AB
		//	r>1 P is on the forward extension of AB
		//	0<r<1 P is interior to AB

		r = ((p.x - A.x) * (B.x - A.x) + (p.y - A.y) * (B.y - A.y)) /
			((B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y));

		if (r <= 0.0) {
			return p.distance(A);
		}
		if (r >= 1.0) {
			return p.distance(B);
		}

		// (2)
		//		 (Ay-Cy)(Bx-Ax)-(Ax-Cx)(By-Ay)
		//	s = -----------------------------
		//					L^2
		//
		//	Then the distance from C to P = |s|*L.

		s = ((A.y - p.y) * (B.x - A.x) - (A.x - p.x) * (B.y - A.y)) /
			((B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y));

		return OG.Util.round(Math.abs(s) *
			Math.sqrt(((B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y))));
	};

	/**
	 * 라인1 로부터 라인2 의 거리를 계산한다.
	 * Note: NON-ROBUST!
	 *
	 * @param {OG.geometry.Coordinate[]} line1 line1 라인 시작좌표, 끝좌표 Array
	 * @param {OG.geometry.Coordinate[]} line2 line2 라인 시작좌표, 끝좌표 Array
	 * @return {Number} 거리
	 */
	this.distanceLineToLine = function (line1, line2) {
		var A = this.convertCoordinate(line1[0]),
			B = this.convertCoordinate(line1[1]),
			C = this.convertCoordinate(line2[0]),
			D = this.convertCoordinate(line2[1]),
			r_top, r_bot, s_top, s_bot, s, r;

		// check for zero-length segments
		if (A.isEquals(B)) {
			return this.distanceToLine(A, [C, D]);
		}
		if (C.isEquals(D)) {
			return this.distanceToLine(D, [A, B]);
		}

		// AB and CD are line segments
		//   from comp.graphics.algo
		//
		//  Solving the above for r and s yields
		//				(Ay-Cy)(Dx-Cx)-(Ax-Cx)(Dy-Cy)
		//			r = ----------------------------- (eqn 1)
		//				(Bx-Ax)(Dy-Cy)-(By-Ay)(Dx-Cx)
		//
		//			(Ay-Cy)(Bx-Ax)-(Ax-Cx)(By-Ay)
		//		s = ----------------------------- (eqn 2)
		//			(Bx-Ax)(Dy-Cy)-(By-Ay)(Dx-Cx)
		//	Let P be the position vector of the intersection point, then
		//		P=A+r(B-A) or
		//		Px=Ax+r(Bx-Ax)
		//		Py=Ay+r(By-Ay)
		//	By examining the values of r & s, you can also determine some other
		//	limiting conditions:
		//		If 0<=r<=1 & 0<=s<=1, intersection exists
		//		r<0 or r>1 or s<0 or s>1 line segments do not intersect
		//		If the denominator in eqn 1 is zero, AB & CD are parallel
		//		If the numerator in eqn 1 is also zero, AB & CD are collinear.
		r_top = (A.y - C.y) * (D.x - C.x) - (A.x - C.x) * (D.y - C.y);
		r_bot = (B.x - A.x) * (D.y - C.y) - (B.y - A.y) * (D.x - C.x);
		s_top = (A.y - C.y) * (B.x - A.x) - (A.x - C.x) * (B.y - A.y);
		s_bot = (B.x - A.x) * (D.y - C.y) - (B.y - A.y) * (D.x - C.x);

		if ((r_bot === 0) || (s_bot === 0)) {
			return Math.min(this.distanceToLine(A, [C, D]),
				Math.min(this.distanceToLine(B, [C, D]),
					Math.min(this.distanceToLine(C, [A, B]), this.distanceToLine(D, [A, B]))));

		}
		s = s_top / s_bot;
		r = r_top / r_bot;

		if ((r < 0) || (r > 1) || (s < 0) || (s > 1)) {
			//no intersection
			return Math.min(this.distanceToLine(A, [C, D]),
				Math.min(this.distanceToLine(B, [C, D]),
					Math.min(this.distanceToLine(C, [A, B]), this.distanceToLine(D, [A, B]))));
		}

		//intersection exists
		return 0;
	};

	/**
	 * 주어진 라인과 교차하는 좌표를 반환한다.
	 *
	 * @param {OG.geometry.Coordinate[]} line 라인 시작좌표, 끝좌표 Array
	 * @return {OG.geometry.Coordinate[]}
	 */
	this.intersectToLine = function (line) {
		var vertices = this.getVertices(), result = [], point, i,
			contains = function (coordinateArray, coordinate) {
				var k;
				for (k = 0; k < coordinateArray.length; k++) {
					if (coordinateArray[k].isEquals(coordinate)) {
						return true;
					}
				}
				return false;
			};

		for (i = 0; i < vertices.length - 1; i++) {
			point = this.intersectLineToLine(line, [vertices[i], vertices[i + 1]]);
			if (point && !contains(result, point)) {
				result.push(point);
			}
		}

		return result;
	};

	/**
	 * 라인1 로부터 라인2 의 교차점을 계산한다.
	 *
	 * @param {OG.geometry.Coordinate[]} line1 line1 라인 시작좌표, 끝좌표 Array
	 * @param {OG.geometry.Coordinate[]} line2 line2 라인 시작좌표, 끝좌표 Array
	 * @return {OG.geometry.Coordinate} 교차점
	 */
	this.intersectLineToLine = function (line1, line2) {
		var A = this.convertCoordinate(line1[0]),
			B = this.convertCoordinate(line1[1]),
			C = this.convertCoordinate(line2[0]),
			D = this.convertCoordinate(line2[1]),
			result,
			resultText,
			r_top, r_bot, s_top, s_bot, r, s;

		// check for zero-length segments
		if (A.isEquals(B)) {
			return this.distanceToLine(A, [C, D]) === 0 ? A : undefined;
		}
		if (C.isEquals(D)) {
			return this.distanceToLine(C, [A, B]) === 0 ? C : undefined;
		}

		// AB and CD are line segments
		//   from comp.graphics.algo
		//
		//  Solving the above for r and s yields
		//				(Ay-Cy)(Dx-Cx)-(Ax-Cx)(Dy-Cy)
		//			r = ----------------------------- (eqn 1)
		//				(Bx-Ax)(Dy-Cy)-(By-Ay)(Dx-Cx)
		//
		//			(Ay-Cy)(Bx-Ax)-(Ax-Cx)(By-Ay)
		//		s = ----------------------------- (eqn 2)
		//			(Bx-Ax)(Dy-Cy)-(By-Ay)(Dx-Cx)
		//	Let P be the position vector of the intersection point, then
		//		P=A+r(B-A) or
		//		Px=Ax+r(Bx-Ax)
		//		Py=Ay+r(By-Ay)
		//	By examining the values of r & s, you can also determine some other
		//	limiting conditions:
		//		If 0<=r<=1 & 0<=s<=1, intersection exists
		//		r<0 or r>1 or s<0 or s>1 line segments do not intersect
		//		If the denominator in eqn 1 is zero, AB & CD are parallel
		//		If the numerator in eqn 1 is also zero, AB & CD are collinear.
		r_top = (A.y - C.y) * (D.x - C.x) - (A.x - C.x) * (D.y - C.y);
		r_bot = (B.x - A.x) * (D.y - C.y) - (B.y - A.y) * (D.x - C.x);
		s_top = (A.y - C.y) * (B.x - A.x) - (A.x - C.x) * (B.y - A.y);
		s_bot = (B.x - A.x) * (D.y - C.y) - (B.y - A.y) * (D.x - C.x);

		if (r_bot !== 0 && s_bot !== 0) {
			r = r_top / r_bot;
			s = s_top / s_bot;
			if (0 <= r && r <= 1 && 0 <= s && s <= 1) {
				resultText = "Intersection";
				result = new OG.Coordinate(OG.Util.round(A.x + r * (B.x - A.x)), OG.Util.round(A.y + r * (B.y - A.y)));
			} else {
				resultText = "No Intersection";
			}
		} else {
			if (r_top === 0 || s_top === 0) {
				resultText = "Coincident";
			} else {
				resultText = "Parallel";
			}
		}

		return result;
	};

	/**
	 * 라인1 로부터 라인2 의 교차점을 계산한다.
	 *
	 * @param {OG.geometry.Coordinate} center 중심점
	 * @param {Number} radius 반경
	 * @param {OG.geometry.Coordinate} from line 라인 시작좌표
	 * @param {OG.geometry.Coordinate} to line 라인 끝좌표
	 * @return {OG.geometry.Coordinate[]} 교차점
	 */
	this.intersectCircleToLine = function (center, radius, from, to) {
		var result = [],
			a = (to.x - from.x) * (to.x - from.x) +
				(to.y - from.y) * (to.y - from.y),
			b = 2 * ( (to.x - from.x) * (from.x - center.x) +
				(to.y - from.y) * (from.y - center.y)   ),
			cc = center.x * center.x + center.y * center.y + from.x * from.x + from.y * from.y -
				2 * (center.x * from.x + center.y * from.y) - radius * radius,
			deter = b * b - 4 * a * cc,
			resultText,
			lerp = function (from, to, t) {
				return new OG.Coordinate(
					OG.Util.round(from.x + (to.x - from.x) * t),
					OG.Util.round(from.y + (to.y - from.y) * t)
				);
			},
			e, u1, u2;

		if (deter < 0) {
			resultText = "Outside";
		} else if (deter === 0) {
			resultText = "Tangent";
			// NOTE: should calculate this point
		} else {
			e = Math.sqrt(deter);
			u1 = (-b + e) / (2 * a);
			u2 = (-b - e) / (2 * a);

			if ((u1 < 0 || u1 > 1) && (u2 < 0 || u2 > 1)) {
				if ((u1 < 0 && u2 < 0) || (u1 > 1 && u2 > 1)) {
					resultText = "Outside";
				} else {
					resultText = "Inside";
				}
			} else {
				resultText = "Intersection";

				if (0 <= u1 && u1 <= 1) {
					result.push(lerp(from, to, u1));
				}

				if (0 <= u2 && u2 <= 1) {
					result.push(lerp(from, to, u2));
				}
			}
		}

		return result;
	};

	/**
	 * 저장된 boundary 를 클리어하여 새로 계산하도록 한다.
	 */
	this.reset = function () {
		this.boundary = null;
	};
};
OG.geometry.Geometry.prototype = new OG.geometry.Geometry();
OG.geometry.Geometry.prototype.constructor = OG.geometry.Geometry;