TestCase("HashMapTest", {
	setUp: function () {
		this.map = new OG.HashMap({key1: 'value1', key2: 'value2'});
	},

	testPut: function () {
		var clonedMap = OG.Util.clone(this.map);

		clonedMap.put("key3", "value3");

		assertEquals("value3", clonedMap.get("key3"));
	},

	testGet: function () {
		assertEquals("value1", this.map.get("key1"));
		assertEquals("value2", this.map.get("key2"));
	},

	testContainsKey: function () {
		assertTrue(this.map.containsKey("key1"));
		assertTrue(this.map.containsKey("key2"));
		assertFalse(this.map.containsKey("key3"));
	},

	testContainsValue: function () {
		assertTrue(this.map.containsValue("value1"));
		assertTrue(this.map.containsValue("value2"));
		assertFalse(this.map.containsValue("value3"));
	},

	testIsEmpty: function () {
		assertFalse(this.map.isEmpty());
	},

	testClear: function () {
		var clonedMap = OG.Util.clone(this.map);
		clonedMap.clear();
		assertTrue(clonedMap.isEmpty());
	},

	testRemove: function () {
		var clonedMap = OG.Util.clone(this.map);
		clonedMap.remove("key2");
		assertFalse(clonedMap.containsKey("key2"));
	},

	testKeys: function () {
		assertEquals("key1,key2", this.map.keys());
	},

	testValues: function () {
		assertEquals("value1,value2", this.map.values());
	},

	testSize: function () {
		assertEquals(2, this.map.size());
	}

});