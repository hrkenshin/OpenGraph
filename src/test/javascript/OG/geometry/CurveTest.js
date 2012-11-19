TestCase("CurveTest", {
	setUp: function () {
		this.curve = new OG.geometry.Curve([
			[2, 1],
			[1, 3],
			[-1, -1],
			[-2, 1]
		]);
	},

	testGetBoundary: function () {
		var base = new OG.geometry.Envelope([-2, -1], 4, 4),
			boundary = this.curve.getBoundary();

		assertTrue(base.isEquals(boundary));
	},

	testGetVertices: function () {
		var vertices = this.curve.getVertices();

		assertEquals("[2,1]", vertices[0]);
		assertEquals("[-2,1]", vertices[vertices.length - 1]);
	},

	testMove: function () {
		var clonedGeometry = OG.Util.clone(this.curve), vertices;

		clonedGeometry.move(10, -5);

		vertices = clonedGeometry.getVertices();

		assertEquals("[12,-4]", vertices[0]);
		assertEquals("[8,-4]", vertices[vertices.length - 1]);
	}
});