TestCase("CircleTest", {
	setUp: function () {
		this.circle = new OG.geometry.Circle([10, 10], 5);
	},

	testGetBoundary: function () {
		var clonedGeometry = OG.Util.clone(this.circle),
			base = new OG.geometry.Envelope(new OG.geometry.Coordinate(5, 5), 10, 10),
			boundary = clonedGeometry.getBoundary();

		assertTrue(base.isEquals(boundary));

		clonedGeometry.resize(5, 10, 15, 20);
		assertTrue(base.resize(5, 10, 15, 20).isEquals(clonedGeometry.getBoundary()));
	},

	testGetVertices: function () {
		var clonedGeometry = OG.Util.clone(this.circle),
			vertices = clonedGeometry.getVertices();

		assertEquals("[15,10]", vertices[0]);
		assertEquals("[10,15]", vertices[20]);
		assertEquals("[5,10]", vertices[40]);
		assertEquals("[10,5]", vertices[60]);
		assertEquals("[15,10]", vertices[80]);
	},

	testGetControlPoints: function () {
		var clonedGeometry = OG.Util.clone(this.circle),
			vertices = clonedGeometry.getControlPoints();

		assertEquals("[15,10]", vertices[1]);
		assertEquals("[10,15]", vertices[3]);
		assertEquals("[5,10]", vertices[5]);
		assertEquals("[10,5]", vertices[7]);
		assertEquals("[15,10]", vertices[9]);
	},

	testMove: function () {
		var clonedGeometry = OG.Util.clone(this.circle),
			other = new OG.geometry.Circle([20, 5], 5);
		clonedGeometry.move(10, -5);

		assertEquals("{type:'Circle',center:[20,5],radius:5}", clonedGeometry);
		assertTrue(clonedGeometry.isEquals(other));
	},

	testMoveCentroid: function () {
		var clonedGeometry = OG.Util.clone(this.circle),
			other = new OG.geometry.Circle([30, 30], 5);
		clonedGeometry.moveCentroid([30, 30]);

		assertEquals("{type:'Circle',center:[30,30],radius:5}", clonedGeometry);
		assertTrue(clonedGeometry.isEquals(other));
	},

	testResize: function () {
		var clonedGeometry = OG.Util.clone(this.circle),
			other = new OG.geometry.Circle([10, 10], 15);
		clonedGeometry.resize(10, 10, 10, 10);

		assertEquals("{type:'Circle',center:[10,10],radius:15}", clonedGeometry);
		assertTrue(clonedGeometry.isEquals(other));
	},

	testResizeBox: function() {
		var clonedGeometry = OG.Util.clone(this.circle),
			other = new OG.geometry.Circle([10, 10], 20);
		clonedGeometry.resizeBox(40, 40);

		assertEquals("{type:'Circle',center:[10,10],radius:20}", clonedGeometry);
		assertTrue(clonedGeometry.isEquals(other));
	},

	testRotate: function () {
		var clonedGeometry = OG.Util.clone(this.circle),
			other = new OG.geometry.Circle([30, 30], 5);
		clonedGeometry.rotate(180, [20, 20]);

		assertEquals("{type:'Circle',center:[30,30],radius:5}", clonedGeometry);
		assertTrue(clonedGeometry.isEquals(other));
	},

	testFitToBoundary: function () {
		var circle1 = new OG.geometry.Circle([10, 10], 10),
			circle2 = new OG.geometry.Circle([10, 5], 5),
			circle3 = new OG.geometry.Circle([50, 10], 50),
			circle4 = new OG.geometry.Circle([10, 20], 100),
			boundary = new OG.geometry.Envelope([50, 50], 50, 50);

		assertEquals("{type:'Circle',center:[75,75],radius:25}", circle1.fitToBoundary(boundary));
		assertEquals("{type:'Circle',center:[75,75],radius:25}", circle2.fitToBoundary(boundary));
		assertEquals("{type:'Circle',center:[75,75],radius:25}", circle3.fitToBoundary(boundary));
		assertEquals("{type:'Circle',center:[75,75],radius:25}", circle4.fitToBoundary(boundary));
	}
});