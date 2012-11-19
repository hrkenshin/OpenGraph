TestCase("GeometryTest", {
	setUp: function () {
		this.geometry = new OG.geometry.Geometry();
	},

	testDistanceToLine: function () {
		assertEquals(10, this.geometry.distanceToLine([0, 0], [[0, 10], [20, 20]]));
		assertEquals(10, this.geometry.distanceToLine([10, 0], [[0, 10], [20, 10]]));
		assertEquals(14, this.geometry.distanceToLine([0, 0], [[10, 10], [20, 10]]));
	},

	testDistanceLineToLine: function () {
		assertEquals(10, this.geometry.distanceLineToLine([[0, 0], [20, 0]], [[5, 10], [20, 20]]));
		assertEquals(0, this.geometry.distanceLineToLine([[0, 0], [20, 0]], [[10, -10], [10, 20]]));
		assertEquals(14, this.geometry.distanceLineToLine([[0, 0], [20, 0]], [[30, 10], [40, 10]]));
		assertEquals(14, this.geometry.distanceLineToLine([[0, 0], [20, 0]], [[20, 20], [40, 0]]));
	},

	testIntersectLineToLine: function () {
		assertEquals("[10,0]", this.geometry.intersectLineToLine([[0, 0], [20, 0]], [[10, 10], [10, -10]]));
		assertUndefined(this.geometry.intersectLineToLine([[0, 0], [20, 0]], [[0, 10], [20, 10]]));
		assertUndefined(this.geometry.intersectLineToLine([[0, 0], [20, 0]], [[0, 10], [20, 20]]));
		assertEquals("[5,10]", this.geometry.intersectLineToLine([[5, 10], [5, 10]], [[0, 0], [10, 20]]));
		assertUndefined(this.geometry.intersectLineToLine([[5, 5], [5, 5]], [[0, 10], [20, 5]]));
	},

	testIntersectCircleToLine: function () {
		var center = new OG.Coordinate(100, 100),
			radius = 50,
			from = new OG.Coordinate(100, 100),
			to = new OG.Coordinate(500, 100);

		assertEquals("[150,100]", this.geometry.intersectCircleToLine(center, radius, from, to));
	}
});