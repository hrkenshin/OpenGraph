TestCase("UtilTest", {
	testClone: function () {
		var upperLeft = new OG.geometry.Coordinate(10, 10),
			obj = new OG.geometry.Envelope(upperLeft, 10, 10),
			clonedObj = OG.Util.clone(obj);

		assertTrue(upperLeft.isEquals(obj.getUpperLeft()));
		assertTrue(upperLeft.isEquals(clonedObj.getUpperLeft()));
		assertTrue(obj.getCentroid().isEquals(clonedObj.getCentroid()));
		assertTrue(obj.getLowerRight().isEquals(clonedObj.getLowerRight()));
		assertEquals(obj.getWidth(), clonedObj.getWidth());
		assertEquals(obj.getLowerCenter(), clonedObj.getLowerCenter());
		assertNotEquals(obj.getLowerCenter(), clonedObj.getLowerRight());

//		TODO : clone 보완 필요
//		clonedObj.move(10, 5);
//		assertNotEquals(obj.getUpperLeft(), clonedObj.getUpperLeft());
	}
});