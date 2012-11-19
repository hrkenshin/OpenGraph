TestCase("PointTest", {
	setUp: function () {
		this.point = new OG.geometry.Point(new OG.geometry.Coordinate(10, 10));
	},

	testGetBoundary: function () {
		var base = new OG.geometry.Envelope(new OG.geometry.Coordinate(10, 10), 0, 0),
			boundary = this.point.getBoundary();

		assertTrue(base.isEquals(boundary));
	},

	testMove: function () {
		var clonedGeometry = OG.Util.clone(this.point),
			other = new OG.geometry.Point([20, 5]);
		clonedGeometry.move(10, -5);

		assertEquals("{type:'Point',coordinate:[20,5]}", clonedGeometry);
		assertTrue(clonedGeometry.isEquals(other));
	},

	testMoveCentroid: function () {
		var clonedGeometry = OG.Util.clone(this.point),
			other = new OG.geometry.Point([10, -5]);
		clonedGeometry.moveCentroid([10, -5]);

		assertEquals("{type:'Point',coordinate:[10,-5]}", clonedGeometry);
		assertTrue(clonedGeometry.isEquals(other));
	},

	testResize: function () {
		var clonedGeometry = OG.Util.clone(this.point);

		assertEquals("{type:'Point',coordinate:[25,18]}", clonedGeometry.resize(-5, 10, -10, 20));
	},

	testResizeBox: function () {
		var clonedGeometry = OG.Util.clone(this.point);
		assertEquals("{type:'Point',coordinate:[10,10]}", clonedGeometry.resizeBox(10, 10));
	},

	testRotate: function () {
		var clonedGeometry = OG.Util.clone(this.point),
			other = new OG.geometry.Point([30, 30]);
		clonedGeometry.rotate(180, new OG.geometry.Coordinate(20, 20));

		assertEquals("{type:'Point',coordinate:[30,30]}", clonedGeometry);
		assertTrue(clonedGeometry.isEquals(other));
	},

	testFitToBoundary: function () {
		var clonedGeometry = OG.Util.clone(this.point),
			boundary = new OG.geometry.Envelope([50, 50], 50, 50);

		clonedGeometry.fitToBoundary(boundary);

		assertEquals("[75,75]", clonedGeometry.getCentroid());
		assertTrue(boundary.getCentroid().isEquals(clonedGeometry.getCentroid()));
	}
});