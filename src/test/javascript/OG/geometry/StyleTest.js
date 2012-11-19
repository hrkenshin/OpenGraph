TestCase("StyleTest", {

	setUp: function () {
		this.style = new OG.Style({key1: 'value1', key2: 'value2', fill: 'green'});
	},

	testPut: function () {
		var clonedStyle = OG.Util.clone(this.style);

		clonedStyle.put("key3", "value3");
		clonedStyle.put("fill", "red");

		assertEquals("value3", clonedStyle.get("key3"));
		assertEquals("red", clonedStyle.get("fill"));
	},

	testGet: function () {
		assertEquals("value1", this.style.get("key1"));
		assertEquals("value2", this.style.get("key2"));
		assertEquals("green", this.style.get("fill"));
	},

	testContainsKey: function () {
		assertTrue(this.style.containsKey("key1"));
		assertTrue(this.style.containsKey("key2"));
		assertFalse(this.style.containsKey("key3"));
	},

	testContainsValue: function () {
		assertTrue(this.style.containsValue("value1"));
		assertTrue(this.style.containsValue("value2"));
	},

	testIsEmpty: function () {
		assertFalse(this.style.isEmpty());
	},

	testClear: function () {
		var clonedStyle = OG.Util.clone(this.style);
		clonedStyle.clear();
		assertTrue(clonedStyle.isEmpty());
	},

	testRemove: function () {
		var clonedStyle = OG.Util.clone(this.style);
		clonedStyle.remove("key2");
		assertFalse(clonedStyle.containsKey("key2"));
	}
});