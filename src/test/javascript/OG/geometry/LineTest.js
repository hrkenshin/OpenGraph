TestCase("LineTest", {
	setUp: function () {
		this.from = new OG.geometry.Coordinate(10, 10);
		this.to = new OG.geometry.Coordinate(20, 20);
		this.line = new OG.geometry.Line(this.from, this.to);
	},

	testGetBoundary: function () {
		var base = new OG.geometry.Envelope(new OG.geometry.Coordinate(10, 10), 10, 10),
			boundary = this.line.getBoundary();

		assertTrue(base.isEquals(boundary));
	},

	testMove: function () {
		var clonedGeometry = OG.Util.clone(this.line),
			other = new OG.geometry.Line([20, 5], [30, 15]);
		clonedGeometry.move(10, -5);

		assertEquals("{type:'Line',from:[20,5],to:[30,15]}", clonedGeometry);
		assertTrue(clonedGeometry.isEquals(other));
	},

	testMoveCentroid: function () {
		var clonedGeometry = OG.Util.clone(this.line),
			other = new OG.geometry.Line([15, 5], [25, 15]);
		clonedGeometry.moveCentroid([20, 10]);

		assertEquals("{type:'Line',from:[15,5],to:[25,15]}", clonedGeometry);
		assertTrue(clonedGeometry.isEquals(other));
	},

	testResize: function () {
		var clonedGeometry = OG.Util.clone(this.line);
		clonedGeometry.resize(10, 20, 10, 5);

		assertEquals("{type:'Line',from:[0,0],to:[25,40]}", clonedGeometry);
	},

	testResizeBox: function () {
		var clonedGeometry = OG.Util.clone(this.line);
		clonedGeometry.resizeBox(20, 30);

		assertEquals("{type:'Line',from:[5,0],to:[25,30]}", clonedGeometry);
	},

	testRotate: function () {
		var clonedGeometry = OG.Util.clone(this.line),
			other = new OG.geometry.Line(new OG.geometry.Coordinate(30, 30), [20, 20]);
		clonedGeometry.rotate(180, new OG.geometry.Coordinate(20, 20));

		assertEquals("{type:'Line',from:[30,30],to:[20,20]}", clonedGeometry);
		assertTrue(clonedGeometry.isEquals(other));
	},

	testFitToBoundary: function () {
		var line1 = new OG.geometry.Line([10, 10], [20, 20]),
			line2 = new OG.geometry.Line([10, 10], [20, 0]),
			line3 = new OG.geometry.Line([10, 10], [0, 20]),
			line4 = new OG.geometry.Line([10, 10], [0, 0]),
			boundary = new OG.geometry.Envelope([50, 50], 50, 50);

		assertEquals("{type:'Line',from:[50,50],to:[100,100]}", line1.fitToBoundary(boundary));
		assertEquals("{type:'Line',from:[50,100],to:[100,50]}", line2.fitToBoundary(boundary));
		assertEquals("{type:'Line',from:[100,50],to:[50,100]}", line3.fitToBoundary(boundary));
		assertEquals("{type:'Line',from:[100,100],to:[50,50]}", line4.fitToBoundary(boundary));
	}
});