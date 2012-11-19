TestCase("EnvelopeTest", {
	setUp: function () {
		this.upperLeft = new OG.geometry.Coordinate(10, 10);
		this.envelope = new OG.geometry.Envelope([10, 10], 10, 10);
		this.uperCenter = new OG.geometry.Coordinate(15, 10);
		this.upperRight = new OG.geometry.Coordinate(20, 10);
		this.rightCenter = new OG.geometry.Coordinate(20, 15);
		this.lowerRight = new OG.geometry.Coordinate(20, 20);
		this.lowerCenter = new OG.geometry.Coordinate(15, 20);
		this.lowerLeft = new OG.geometry.Coordinate(10, 20);
		this.leftCenter = new OG.geometry.Coordinate(10, 15);
		this.center = new OG.geometry.Coordinate(15, 15);
		this.outer = new OG.geometry.Coordinate(20, 21);
	},

	testGetUpperLeft: function () {
		assertTrue(this.upperLeft.isEquals(this.envelope.getUpperLeft()));
	},

	testSetUpperLeft: function () {
		var clonedEnvelope = OG.Util.clone(this.envelope),
			upperLeft = new OG.geometry.Coordinate(20, 20),
			centroid = new OG.geometry.Coordinate(25, 25);

		clonedEnvelope.setUpperLeft(upperLeft);

		assertTrue(centroid.isEquals(clonedEnvelope.getCentroid()));
	},

	testGetUpperCenter: function () {
		assertTrue(this.uperCenter.isEquals(this.envelope.getUpperCenter()));
	},

	testGetUpperRight: function () {
		assertTrue(this.upperRight.isEquals(this.envelope.getUpperRight()));
	},

	testGetRightCenter: function () {
		assertTrue(this.rightCenter.isEquals(this.envelope.getRightCenter()));
	},

	testGetLowerRight: function () {
		assertTrue(this.lowerRight.isEquals(this.envelope.getLowerRight()));
	},

	testGetLowerCenter: function () {
		assertTrue(this.lowerCenter.isEquals(this.envelope.getLowerCenter()));
	},

	testGetLowerLeft: function () {
		assertTrue(this.lowerLeft.isEquals(this.envelope.getLowerLeft()));
	},

	testGetLeftCenter: function () {
		assertTrue(this.leftCenter.isEquals(this.envelope.getLeftCenter()));
	},

	testGetCentroid: function () {
		assertTrue(this.center.isEquals(this.envelope.getCentroid()));
	},

	testSetCentroid: function () {
		var clonedEnvelope = OG.Util.clone(this.envelope),
			upperLeft = new OG.geometry.Coordinate(15, 15),
			centroid = new OG.geometry.Coordinate(20, 20);

		clonedEnvelope.setCentroid(centroid);

		assertTrue(upperLeft.isEquals(clonedEnvelope.getUpperLeft()));
	},

	testGetWidth: function () {
		assertEquals(10, this.envelope.getWidth());
	},

	testSetWidth: function () {
		var clonedEnvelope = OG.Util.clone(this.envelope),
			width = 20,
			centroid = new OG.geometry.Coordinate(20, 15);

		clonedEnvelope.setWidth(width);

		assertTrue(centroid.isEquals(clonedEnvelope.getCentroid()));
	},

	testGetHeight: function () {
		assertEquals(10, this.envelope.getHeight());
	},

	testSetHeight: function () {
		var clonedEnvelope = OG.Util.clone(this.envelope),
			height = 20,
			centroid = new OG.geometry.Coordinate(15, 20);

		clonedEnvelope.setHeight(height);

		assertTrue(centroid.isEquals(clonedEnvelope.getCentroid()));
	},

	testGetVertices: function () {
		var vertices = this.envelope.getVertices();

		assertEquals(9, vertices.length);
		assertTrue(vertices[0] instanceof OG.geometry.Coordinate);
		assertTrue(this.upperLeft.isEquals(vertices[0]));
		assertTrue(this.uperCenter.isEquals(vertices[1]));
		assertTrue(this.upperRight.isEquals(vertices[2]));
		assertTrue(this.rightCenter.isEquals(vertices[3]));
		assertTrue(this.lowerRight.isEquals(vertices[4]));
		assertTrue(this.lowerCenter.isEquals(vertices[5]));
		assertTrue(this.lowerLeft.isEquals(vertices[6]));
		assertTrue(this.leftCenter.isEquals(vertices[7]));
		assertTrue(this.upperLeft.isEquals(vertices[8]));
	},

	testIsContains: function () {
		assertTrue(this.envelope.isContains(this.upperLeft));
		assertTrue(this.envelope.isContains(this.lowerRight));
		assertTrue(this.envelope.isContains(this.center));
		assertFalse(this.envelope.isContains(this.outer));
	},

	testIsContainsAll: function () {
		assertTrue(this.envelope.isContainsAll([[10, 10], [12, 12], [20, 20]]));
		assertTrue(this.envelope.isContainsAll([[11, 11], [12, 12], [13, 13]]));
		assertFalse(this.envelope.isContainsAll([[11, 11], [12, 12], [30, 30]]));
	},

	testMove: function () {
		var clonedEnvelope = OG.Util.clone(this.envelope),
			upperLeft = new OG.geometry.Coordinate(20, 0);

		clonedEnvelope.move(10, -10);

		assertTrue(upperLeft.isEquals(clonedEnvelope.getUpperLeft()));
	},

	testResize: function () {
		var clonedEnvelope = OG.Util.clone(this.envelope),
			upperLeft = new OG.geometry.Coordinate(5, 0);

		clonedEnvelope.resize(10, -5, 5, -10);

		assertTrue(upperLeft.isEquals(clonedEnvelope.getUpperLeft()));
		assertEquals(5, clonedEnvelope.getWidth());
		assertEquals(15, clonedEnvelope.getHeight());
	}
});