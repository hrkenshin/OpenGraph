TestCase("CoordinateTest", {
	setUp: function () {
		this.coordinate1 = new OG.geometry.Coordinate(10, 10);
		this.coordinate2 = new OG.geometry.Coordinate(13, 14);
		this.coordinate3 = new OG.geometry.Coordinate([10, 10]);
		this.coordinate4 = {
			x: 10,
			y: 10
		};
	},

	testIsEquals: function () {
		assertFalse(this.coordinate1.isEquals(this.coordinate2));
		assertTrue(this.coordinate1.isEquals(this.coordinate3));
		assertFalse(this.coordinate1.isEquals(this.coordinate4));
	},

	testDistance: function () {
		assertEquals(5, this.coordinate1.distance(this.coordinate2));
		assertEquals(0, this.coordinate1.distance(this.coordinate3));
	},

	testMove: function () {
		var coordinate = new OG.geometry.Coordinate(10, 10),
			moved = new OG.geometry.Coordinate(20, 5);
		coordinate.move(10, -5);

		assertTrue(coordinate.isEquals(moved));
	},

	testRotate: function () {
		var coordinate = new OG.geometry.Coordinate(10, 10),
			origin = new OG.geometry.Coordinate(20, 10);
		coordinate.rotate(180, origin);

		assertEquals(30, Math.round(coordinate.x));
		assertEquals(10, Math.round(coordinate.y));

		coordinate.rotate(180, [20, 10]);

		assertEquals(10, Math.round(coordinate.x));
		assertEquals(10, Math.round(coordinate.y));
	}
});