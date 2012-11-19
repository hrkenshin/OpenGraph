TestCase("RectangleTest", {
	setUp: function () {
		this.rectangle = new OG.geometry.Rectangle([10, 10], 10, 10);
	},

	testGetBoundary: function () {
		var base = new OG.geometry.Envelope(new OG.geometry.Coordinate(10, 10), 10, 10),
			boundary = this.rectangle.getBoundary();

		assertTrue(base.isEquals(boundary));
	},

	testGetVertices: function () {
		assertEquals("[10,10],[20,10],[20,20],[10,20],[10,10]", this.rectangle.getVertices());
	},

	testMove: function () {
		var clonedGeometry = OG.Util.clone(this.rectangle),
			other = new OG.geometry.Rectangle([20, 5], 10, 10);
		clonedGeometry.move(10, -5);

		assertEquals("{type:'Rectangle',upperLeft:[20,5],width:10,height:10,angle:0}", clonedGeometry);
		assertTrue(clonedGeometry.isEquals(other));
	},

	testMoveCentroid: function () {
		var clonedGeometry = OG.Util.clone(this.rectangle),
			other = new OG.geometry.Rectangle([25, 25], 10, 10);
		clonedGeometry.moveCentroid([30, 30]);

		assertEquals("{type:'Rectangle',upperLeft:[25,25],width:10,height:10,angle:0}", clonedGeometry);
		assertTrue(clonedGeometry.isEquals(other));
	},

	testResize: function () {
		var clonedGeometry = OG.Util.clone(this.rectangle),
			other = new OG.geometry.Rectangle([0, 0], 30, 30);
		clonedGeometry.resize(10, 10, 10, 10);

		assertEquals("{type:'Rectangle',upperLeft:[0,0],width:30,height:30,angle:0}", clonedGeometry);
		assertTrue(clonedGeometry.isEquals(other));
	},

	testResizeBox: function () {
		var clonedGeometry = OG.Util.clone(this.rectangle),
			other = new OG.geometry.Rectangle([5, 5], 20, 20);
		clonedGeometry.resizeBox(20, 20);

		assertEquals("{type:'Rectangle',upperLeft:[5,5],width:20,height:20,angle:0}", clonedGeometry);
		assertTrue(clonedGeometry.isEquals(other));
	},

	testFitToBoundary: function () {
		var rectangle1 = new OG.geometry.Rectangle([10, 10], 10, 10),
			boundary = new OG.geometry.Envelope([50, 50], 50, 50);

		assertEquals("{type:'Rectangle',upperLeft:[50,50],width:50,height:50,angle:0}", rectangle1.fitToBoundary(boundary));
		assertException("OG.ParamError", function () {
			var rectangle = new OG.geometry.Rectangle([10, 10], -10, -10);
		});
	},

	testRotate: function () {
		var clonedGeometry = OG.Util.clone(this.rectangle);
		clonedGeometry.rotate(45);

		assertEquals("{type:'Rectangle',upperLeft:[15,8],width:10,height:10,angle:45}", clonedGeometry);
	}
});