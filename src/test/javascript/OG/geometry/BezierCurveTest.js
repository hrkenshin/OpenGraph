TestCase("BezierCurveTest", {
	setUp: function () {
		this.curve = new OG.geometry.BezierCurve([
			[100, 100],
			[200, 100],
			[100, 200],
			[200, 200]
		]);
	},

	testGetBoundary: function () {
		var base = new OG.geometry.Envelope([100, 100], 100, 100),
			boundary = this.curve.getBoundary();

		assertTrue(base.isEquals(boundary));
	},

	testGetControlPoints: function () {
		var vertices = this.curve.getControlPoints();

		assertEquals("[100,100],[200,100],[100,200],[200,200]", vertices);
	},

	testGetVertices: function () {
		var vertices = this.curve.getVertices();

		assertEquals("[100,100]", vertices[0]);
		assertEquals("[200,200]", vertices[vertices.length - 1]);
	},

	testMove: function () {
		var clonedGeometry = OG.Util.clone(this.curve), vertices;

		clonedGeometry.move(100, -100);

		vertices = clonedGeometry.getVertices();

		assertEquals("[200,0]", vertices[0]);
		assertEquals("[300,100]", vertices[vertices.length - 1]);
	}
});