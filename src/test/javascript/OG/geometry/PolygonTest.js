TestCase("PolygonTest", {
	setUp: function () {
		this.coordinate1 = new OG.geometry.Coordinate(10, 10);
		this.coordinate2 = new OG.geometry.Coordinate(20, 20);
		this.coordinate3 = new OG.geometry.Coordinate(30, 30);
		this.coordinate4 = new OG.geometry.Coordinate(40, 20);
		this.coordinate5 = new OG.geometry.Coordinate(50, 10);
		this.coordinate6 = new OG.geometry.Coordinate(10, 10);
		this.vertices = [];
		this.vertices.push(this.coordinate1);
		this.vertices.push(this.coordinate2);
		this.vertices.push(this.coordinate3);
		this.vertices.push(this.coordinate4);
		this.vertices.push(this.coordinate5);
		this.vertices.push(this.coordinate6);
		this.polygon = new OG.geometry.Polygon(this.vertices);
	},

	testGetBoundary: function () {
		var base = new OG.geometry.Envelope([10, 10], 40, 20),
			boundary = this.polygon.getBoundary();

		assertTrue(base.isEquals(boundary));
	},

	testMove: function () {
		var clonedGeometry = OG.Util.clone(this.polygon),
			other = new OG.geometry.Polygon([
				[20, 5],
				[30, 15],
				[40, 25],
				[50, 15],
				[60, 5],
				[20, 5]
			]);

		clonedGeometry.move(10, -5);

		assertEquals("{type:'Polygon',vertices:[[20,5],[30,15],[40,25],[50,15],[60,5],[20,5]]}", clonedGeometry);
		assertTrue(clonedGeometry.isEquals(other));
	},

	testMoveCentroid: function () {
		var clonedGeometry = OG.Util.clone(this.polygon),
			other = new OG.geometry.Polygon([
				[10, 20],
				[20, 30],
				[30, 40],
				[40, 30],
				[50, 20],
				[10, 20]
			]);

		clonedGeometry.moveCentroid([30, 30]);

		assertEquals("{type:'Polygon',vertices:[[10,20],[20,30],[30,40],[40,30],[50,20],[10,20]]}", clonedGeometry);
		assertTrue(clonedGeometry.isEquals(other));
	},

	testResize: function () {
		var clonedGeometry = OG.Util.clone(this.polygon),
			polygon1 = new OG.geometry.Polygon([
				[0, 0],
				[20, 10],
				[30, 10],
				[0, 0]
			]),
			polygon2 = new OG.geometry.Polygon([
				[10, 10],
				[20, 10],
				[30, 10],
				[10, 10]
			]);
		clonedGeometry.resize(10, 10, 10, 10);
		polygon1.resize(10, -10, 10, -10);
		polygon2.resize(10, 10, 10, 10);

		assertEquals("{type:'Polygon',vertices:[[0,0],[15,20],[30,40],[45,20],[60,0],[0,0]]}", clonedGeometry);
		assertEquals("{type:'Polygon',vertices:[[-10,-10],[10,0],[20,0],[-10,-10]]}", polygon1);
		assertEquals("{type:'Polygon',vertices:[[0,0],[20,0],[40,0],[0,0]]}", polygon2);
	},

	testResizeBox: function () {
		var clonedGeometry = OG.Util.clone(this.polygon);
		clonedGeometry.resizeBox(20, 40);

		assertEquals("{type:'Polygon',vertices:[[20,0],[25,20],[30,40],[35,20],[40,0],[20,0]]}", clonedGeometry);
	},

	testRotate: function () {
		var clonedGeometry = OG.Util.clone(this.polygon),
			other = new OG.geometry.Polygon([
				[30, 30],
				[20, 20],
				[10, 10],
				[0, 20],
				[-10, 30]
			]);
		clonedGeometry.rotate(180, new OG.geometry.Coordinate(20, 20));

		assertEquals("{type:'Polygon',vertices:[[30,30],[20,20],[10,10],[0,20],[-10,30],[30,30]]}", clonedGeometry);
		assertTrue(clonedGeometry.isEquals(other));
	},

	testFitToBoundary: function () {
		var clonedGeometry = OG.Util.clone(this.polygon),
			polygon1 = new OG.geometry.Polygon([
				[0, 0],
				[20, 10],
				[30, 10]
			]),
			polygon2 = new OG.geometry.Polygon([
				[10, 10],
				[20, 10],
				[30, 10]
			]),
			boundary = new OG.geometry.Envelope([50, 50], 50, 50);

		assertEquals("{type:'Polygon',vertices:[[50,50],[63,75],[75,100],[88,75],[100,50],[50,50]]}", clonedGeometry.fitToBoundary(boundary));
		assertEquals("{type:'Polygon',vertices:[[50,50],[83,100],[100,100],[50,50]]}", polygon1.fitToBoundary(boundary));
		assertEquals("{type:'Polygon',vertices:[[50,50],[75,50],[100,50],[50,50]]}", polygon2.fitToBoundary(boundary));
	}

//	testIsContains: function () {
//		var clonedGeometry = OG.Util.clone(this.polygon),
//			polygon1 = new OG.geometry.Polygon([
//				[0, 0],
//				[20, 10],
//				[30, 10]
//			]),
//			polygon2 = new OG.geometry.Polygon([
//				[10, 10],
//				[20, 10],
//				[30, 10]
//			]),
//			point = new OG.Point([20, 10]);
//
//		assertFalse(clonedGeometry.isContains(polygon1));
//		assertTrue(clonedGeometry.isContains(polygon2));
//		assertTrue(clonedGeometry.isContains(point));
//	},

//	testIsWithin: function () {
//		var clonedGeometry = OG.Util.clone(this.polygon),
//			polygon1 = new OG.geometry.Polygon([
//				[0, 0],
//				[20, 10],
//				[30, 10]
//			]),
//			polygon2 = new OG.geometry.Polygon([
//				[10, 10],
//				[20, 10],
//				[30, 10]
//			]);
//
//		assertFalse(polygon1.isWithin(clonedGeometry));
//		assertTrue(polygon2.isWithin(clonedGeometry));
//	}
});