TestCase("PolyLineTest", {
	setUp: function () {
		this.coordinate1 = new OG.geometry.Coordinate(10, 10);
		this.coordinate2 = new OG.geometry.Coordinate(20, 20);
		this.coordinate3 = new OG.geometry.Coordinate(30, 30);
		this.coordinate4 = new OG.geometry.Coordinate(40, 20);
		this.coordinate5 = new OG.geometry.Coordinate(50, 10);
		this.vertices = [];
		this.vertices.push(this.coordinate1);
		this.vertices.push(this.coordinate2);
		this.vertices.push(this.coordinate3);
		this.vertices.push(this.coordinate4);
		this.vertices.push(this.coordinate5);
		this.polyLine = new OG.geometry.PolyLine(this.vertices);
	},

	testGetBoundary: function () {
		var base = new OG.geometry.Envelope([10, 10], 40, 20),
			boundary = this.polyLine.getBoundary();

		assertTrue(base.isEquals(boundary));
	},

	testGetVertices: function () {
		assertEquals("[10,10],[20,20],[30,30],[40,20],[50,10]", this.polyLine.getVertices());
	},

	testMove: function () {
		var clonedGeometry = OG.Util.clone(this.polyLine),
			other = new OG.geometry.PolyLine([
				[20, 5],
				[30, 15],
				[40, 25],
				[50, 15],
				[60, 5]
			]);

		clonedGeometry.move(10, -5);

		assertEquals("{type:'PolyLine',vertices:[[20,5],[30,15],[40,25],[50,15],[60,5]]}", clonedGeometry);
		assertTrue(clonedGeometry.isEquals(other));
	},

	testMoveCentroid: function () {
		var clonedGeometry = OG.Util.clone(this.polyLine),
			other = new OG.geometry.PolyLine([
				[10, 20],
				[20, 30],
				[30, 40],
				[40, 30],
				[50, 20]
			]);

		clonedGeometry.moveCentroid([30, 30]);

		assertEquals("{type:'PolyLine',vertices:[[10,20],[20,30],[30,40],[40,30],[50,20]]}", clonedGeometry);
		assertTrue(clonedGeometry.isEquals(other));
	},

	testResize: function () {
		var clonedGeometry = OG.Util.clone(this.polyLine),
			polyLine1 = new OG.geometry.PolyLine([
				[0, 0],
				[20, 10],
				[30, 10]
			]),
			polyLine2 = new OG.geometry.PolyLine([
				[10, 10],
				[20, 10],
				[30, 10]
			]);
		clonedGeometry.resize(10, 10, 10, 10);
		polyLine1.resize(10, -10, 10, -10);
		polyLine2.resize(10, 10, 10, 10);

		assertEquals("{type:'PolyLine',vertices:[[0,0],[15,20],[30,40],[45,20],[60,0]]}", clonedGeometry);
		assertEquals("{type:'PolyLine',vertices:[[-10,-10],[10,0],[20,0]]}", polyLine1);
		assertEquals("{type:'PolyLine',vertices:[[0,0],[20,0],[40,0]]}", polyLine2);
	},

	testResizeBox: function () {
		var clonedGeometry = OG.Util.clone(this.polyLine);
		clonedGeometry.resizeBox(20, 40);

		assertEquals("{type:'PolyLine',vertices:[[20,0],[25,20],[30,40],[35,20],[40,0]]}", clonedGeometry);
	},

	testRotate: function () {
		var clonedGeometry = OG.Util.clone(this.polyLine),
			other = new OG.geometry.PolyLine([
				[30, 30],
				[20, 20],
				[10, 10],
				[0, 20],
				[-10, 30]
			]);
		clonedGeometry.rotate(180, new OG.geometry.Coordinate(20, 20));

		assertEquals("{type:'PolyLine',vertices:[[30,30],[20,20],[10,10],[0,20],[-10,30]]}", clonedGeometry);
		assertTrue(clonedGeometry.isEquals(other));
	},

	testFitToBoundary: function () {
		var clonedGeometry = OG.Util.clone(this.polyLine),
			polyLine1 = new OG.geometry.PolyLine([
				[0, 0],
				[20, 10],
				[30, 10]
			]),
			polyLine2 = new OG.geometry.PolyLine([
				[10, 10],
				[20, 10],
				[30, 10]
			]),
			boundary = new OG.geometry.Envelope([50, 50], 50, 50);

		assertEquals("{type:'PolyLine',vertices:[[50,50],[63,75],[75,100],[88,75],[100,50]]}", clonedGeometry.fitToBoundary(boundary));
		assertEquals("{type:'PolyLine',vertices:[[50,50],[83,100],[100,100]]}", polyLine1.fitToBoundary(boundary));
		assertEquals("{type:'PolyLine',vertices:[[50,50],[75,50],[100,50]]}", polyLine2.fitToBoundary(boundary));
	},

	testMinDistance: function () {
		var clonedGeometry = OG.Util.clone(this.polyLine);

		assertEquals(0, clonedGeometry.minDistance([10, 10]));
		assertEquals(10, clonedGeometry.minDistance([10, 0]));
		assertEquals(7, clonedGeometry.minDistance([10, 20]));
		assertEquals(14, clonedGeometry.minDistance([30, 10]));
	},

	testIntersectToLine: function () {
		var clonedGeometry = OG.Util.clone(this.polyLine);
		assertEquals("[20,20],[40,20]", clonedGeometry.intersectToLine([[10, 20], [50, 20]]));
		assertEquals("", clonedGeometry.intersectToLine([[0, 0], [10, 20]]));
	},

	testGetLength: function () {
		var clonedGeometry = OG.Util.clone(this.polyLine);
		assertEquals(56, clonedGeometry.getLength());
	}
});