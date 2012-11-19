/**
 * 곡선(Curve) 알고리즘을 구현한 Javascript 클래스
 *
 * @class
 *
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
OG.common.CurveUtil = {
	/**
	 * 주어진 좌표 Array 에 대해 Cubic Catmull-Rom spline Curve 좌표를 계산하는 함수를 반환한다.
	 * 모든 좌표를 지나는 커브를 계산한다.
	 *
	 * @example
	 * var points = [[2, 2], [2, -2], [-2, 2], [-2, -2]],
	 *     cmRomSpline = OG.CurveUtil.CatmullRomSpline(points), t, curve = [];
	 *
	 * // t 는 0 ~ maxT 의 값으로, t 값의 증분값이 작을수록 세밀한 Curve 를 그린다.
	 * for(t = 0; t <= cmRomSpline.maxT; t += 0.1) {
	 *     curve.push([cmRomSpline.getX(t), cmRomSpline.getY(t)]);
	 * }
	 *
	 * @param {Array} points 좌표 Array (예, [[x1,y1], [x2,y2], [x3,y3], [x4,y4]])
	 * @return {Object} t 값에 의해 X, Y 좌표를 구하는 함수와 maxT 값을 반환
	 * @static
	 */
	CatmullRomSpline: function (points) {
		var coeffs = [], p,
			first = {},
			last = {}, // control point at the beginning and at the end

			makeFct = function (which) {

				return function (t, suspendedUpdate) {

					var len = points.length, s, c;

					if (len < 2) {
						return NaN;
					}

					t = t - 1;

					if (!suspendedUpdate && coeffs[which]) {
						suspendedUpdate = true;
					}

					if (!suspendedUpdate) {
						first[which] = 2 * points[0][which] - points[1][which];
						last[which] = 2 * points[len - 1][which] - points[len - 2][which];
						p = [first].concat(points, [last]);

						coeffs[which] = [];
						for (s = 0; s < len - 1; s++) {
							coeffs[which][s] = [
								2 * p[s + 1][which],
								-p[s][which] + p[s + 2][which],
								2 * p[s][which] - 5 * p[s + 1][which] + 4 * p[s + 2][which] - p[s + 3][which],
								-p[s][which] + 3 * p[s + 1][which] - 3 * p[s + 2][which] + p[s + 3][which]
							];
						}
					}
					len += 2;  // add the two control points
					if (isNaN(t)) {
						return NaN;
					}
					// This is necessay for our advanced plotting algorithm:
					if (t < 0) {
						return p[1][which];
					} else if (t >= len - 3) {
						return p[len - 2][which];
					}

					s = Math.floor(t);
					if (s === t) {
						return p[s][which];
					}
					t -= s;
					c = coeffs[which][s];
					return 0.5 * (((c[3] * t + c[2]) * t + c[1]) * t + c[0]);
				};
			};

		return {
			getX: makeFct(0),
			getY: makeFct(1),
			maxT: points.length + 1
		};
	},

	/**
	 * 주어진 좌표 Array (좌표1, 콘트롤포인트1, 콘트롤포인트2, 좌표2 ...) 에 대해 Cubic Bezier Curve 좌표를 계산하는 함수를 반환한다.
	 * Array 갯수는 3 * K + 1 이어야 한다.
	 * 예) 좌표1, 콘트롤포인트1, 콘트롤포인트2, 좌표2, 콘트롤포인트1, 콘트롤포인트2, 좌표3 ...
	 *
	 * @example
	 * var points = [[2, 1], [1, 3], [-1, -1], [-2, 1]],
	 *     bezier = OG.CurveUtil.Bezier(points), t, curve = [];
	 *
	 * // t 는 0 ~ maxT 의 값으로, t 값의 증분값이 작을수록 세밀한 Curve 를 그린다.
	 * for(t = 0; t <= bezier.maxT; t += 0.1) {
	 *     curve.push([bezier.getX(t), bezier.getY(t)]);
	 * }
	 *
	 * @param {Array} points 좌표 Array (예, [[x1,y1], [cp_x1,cp_y1], [cp_x2,cp_y2], [x2,y4]])
	 * @return {Object} t 값에 의해 X, Y 좌표를 구하는 함수와 maxT 값을 반환
	 * @static
	 */
	Bezier: function (points) {
		var len,
			makeFct = function (which) {
				return function (t, suspendedUpdate) {
					var z = Math.floor(t) * 3,
						t0 = t,
						t1 = 1 - t0;

					if (!suspendedUpdate && len) {
						suspendedUpdate = true;
					}

					if (!suspendedUpdate) {
						len = Math.floor(points.length / 3);
					}

					if (t < 0) {
						return points[0][which];
					}
					if (t >= len) {
						return points[points.length - 1][which];
					}
					if (isNaN(t)) {
						return NaN;
					}
					return t1 * t1 * (t1 * points[z][which] + 3 * t0 * points[z + 1][which]) +
						(3 * t1 * points[z + 2][which] + t0 * points[z + 3][which]) * t0 * t0;
				};
			};

		return {
			getX: makeFct(0),
			getY: makeFct(1),
			maxT: Math.floor(points.length / 3) + 1
		};
	},

	/**
	 * 주어진 좌표 Array (시작좌표, 콘트롤포인트1, 콘트롤포인트2, ..., 끝좌표) 에 대해 B-Spline Curve 좌표를 계산하는 함수를 반환한다.
	 *
	 * @example
	 * var points = [[2, 1], [1, 3], [-1, -1], [-2, 1]],
	 *     bspline = OG.CurveUtil.BSpline(points), t, curve = [];
	 *
	 * // t 는 0 ~ maxT 의 값으로, t 값의 증분값이 작을수록 세밀한 Curve 를 그린다.
	 * for(t = 0; t <= bspline.maxT; t += 0.1) {
	 *     curve.push([bspline.getX(t), bspline.getY(t)]);
	 * }
	 *
	 * @param {Array} points 좌표 Array (예, [[x1,y1], [x2,y2], [x3,y3], [x4,y4]])
	 * @param {Number} order Order of the B-spline curve.
	 * @return {Object} t 값에 의해 X, Y 좌표를 구하는 함수와 maxT 값을 반환
	 * @static
	 */
	BSpline: function (points, order) {
		var knots, N = [],
			_knotVector = function (n, k) {
				var j, kn = [];
				for (j = 0; j < n + k + 1; j++) {
					if (j < k) {
						kn[j] = 0.0;
					} else if (j <= n) {
						kn[j] = j - k + 1;
					} else {
						kn[j] = n - k + 2;
					}
				}
				return kn;
			},

			_evalBasisFuncs = function (t, kn, n, k, s) {
				var i, j, a, b, den,
					N = [];

				if (kn[s] <= t && t < kn[s + 1]) {
					N[s] = 1;
				} else {
					N[s] = 0;
				}
				for (i = 2; i <= k; i++) {
					for (j = s - i + 1; j <= s; j++) {
						if (j <= s - i + 1 || j < 0) {
							a = 0.0;
						} else {
							a = N[j];
						}
						if (j >= s) {
							b = 0.0;
						} else {
							b = N[j + 1];
						}
						den = kn[j + i - 1] - kn[j];
						if (den === 0) {
							N[j] = 0;
						} else {
							N[j] = (t - kn[j]) / den * a;
						}
						den = kn[j + i] - kn[j + 1];
						if (den !== 0) {
							N[j] += (kn[j + i] - t) / den * b;
						}
					}
				}
				return N;
			},
			makeFct = function (which) {
				return function (t, suspendedUpdate) {
					var len = points.length, y, j, s,
						n = len - 1,
						k = order;

					if (n <= 0) {
						return NaN;
					}
					if (n + 2 <= k) {
						k = n + 1;
					}
					if (t <= 0) {
						return points[0][which];
					}
					if (t >= n - k + 2) {
						return points[n][which];
					}

					knots = _knotVector(n, k);
					s = Math.floor(t) + k - 1;
					N = _evalBasisFuncs(t, knots, n, k, s);

					y = 0.0;
					for (j = s - k + 1; j <= s; j++) {
						if (j < len && j >= 0) {
							y += points[j][which] * N[j];
						}
					}
					return y;
				};
			};

		return {
			getX: makeFct(0),
			getY: makeFct(1),
			maxT: points.length - 2
		};
	}
};
OG.CurveUtil = OG.common.CurveUtil;