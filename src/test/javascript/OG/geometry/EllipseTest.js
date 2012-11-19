TestCase("EllipseTest", {
	setUp: function () {
		this.ellipse = new OG.geometry.Ellipse([10, 10], 10, 5);
	},

	testGetBoundary: function () {
		var base = new OG.geometry.Envelope(new OG.geometry.Coordinate(0, 5), 20, 10),
			boundary = this.ellipse.getBoundary();

		assertTrue(base.isEquals(boundary));
	},

	testGetVertices: function () {
		var clonedGeometry = OG.Util.clone(this.ellipse),
			vertices = clonedGeometry.getVertices();

		assertEquals("[20,10]", vertices[0]);
		assertEquals("[10,15]", vertices[20]);
		assertEquals("[0,10]", vertices[40]);
		assertEquals("[10,5]", vertices[60]);
		assertEquals("[20,10]", vertices[80]);
	},

	testMove: function () {
		var clonedGeometry = OG.Util.clone(this.ellipse),
			other = new OG.geometry.Ellipse([20, 5], 10, 5);
		clonedGeometry.move(10, -5);

		assertEquals("{type:'Ellipse',center:[20,5],radiusX:10,radiusY:5,angle:0}", clonedGeometry);
		assertTrue(clonedGeometry.isEquals(other));
	},

	testMoveCentroid: function () {
		var clonedGeometry = OG.Util.clone(this.ellipse),
			other = new OG.geometry.Ellipse([30, 30], 10, 5);
		clonedGeometry.moveCentroid([30, 30]);

		assertEquals("{type:'Ellipse',center:[30,30],radiusX:10,radiusY:5,angle:0}", clonedGeometry);
		assertTrue(clonedGeometry.isEquals(other));
	},

	testResize: function () {
		var clonedGeometry = OG.Util.clone(this.ellipse),
			other = new OG.geometry.Ellipse([10, 10], 20, 15);
		clonedGeometry.resize(10, 10, 10, 10);

		assertEquals("{type:'Ellipse',center:[10,10],radiusX:20,radiusY:15,angle:0}", clonedGeometry);
		assertTrue(clonedGeometry.isEquals(other));
	},

	testResizeBox: function () {
		var clonedGeometry = OG.Util.clone(this.ellipse),
			other = new OG.geometry.Ellipse([10, 10], 20, 10);

		clonedGeometry.resizeBox(40, 20);

		assertEquals("{type:'Ellipse',center:[10,10],radiusX:20,radiusY:10,angle:0}", clonedGeometry);
		assertTrue(clonedGeometry.isEquals(other));
	},

	testRotate: function () {
		var clonedGeometry = OG.Util.clone(this.ellipse),
			other = new OG.geometry.Ellipse([30, 30], 10, 5, 180);
		clonedGeometry.rotate(180, [20, 20]);

		assertEquals("{type:'Ellipse',center:[30,30],radiusX:10,radiusY:5,angle:180}", clonedGeometry);
		assertTrue(clonedGeometry.isEquals(other));
	},

	testFitToBoundary: function () {
		var ellipse1 = new OG.geometry.Ellipse([10, 10], 10, 20),
			ellipse2 = new OG.geometry.Ellipse([10, 5], 5, 5),
			ellipse3 = new OG.geometry.Ellipse([50, 10], 50, 100),
			ellipse4 = new OG.geometry.Ellipse([10, 20], 100, 50),
			boundary = new OG.geometry.Envelope([50, 50], 50, 50);

		assertEquals("{type:'Ellipse',center:[75,75],radiusX:25,radiusY:25,angle:0}", ellipse1.fitToBoundary(boundary));
		assertEquals("{type:'Ellipse',center:[75,75],radiusX:25,radiusY:25,angle:0}", ellipse2.fitToBoundary(boundary));
		assertEquals("{type:'Ellipse',center:[75,75],radiusX:25,radiusY:25,angle:0}", ellipse3.fitToBoundary(boundary));
		assertEquals("{type:'Ellipse',center:[75,75],radiusX:25,radiusY:25,angle:0}", ellipse4.fitToBoundary(boundary));
	}
});