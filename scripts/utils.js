var distanceSift3 = function(s1, s2) {
	if (s1 == null || s1.length === 0) {
		if (s2 == null || s2.length === 0) {
			return 0;
		} else {
			return s2.length;
		}
	}

	if (s2 == null || s2.length === 0) {
		return s1.length;
	}

	var c = 0;
	var offset1 = 0;
	var offset2 = 0;
	var lcs = 0;
	var maxOffset = 5;

	while ((c + offset1 < s1.length) && (c + offset2 < s2.length)) {
		if (s1[c + offset1] == s2[c + offset2]) {
			lcs++;
		} else {
			offset1 = offset2 = 0;
			for (var i = 0; i < maxOffset; i++) {
				if ((c + i < s1.length) && (s1[c + i] == s2[c])) {
					offset1 = i;
					break;
				}
				if ((c + i < s2.length) && (s1[c] == s2[c + i])) {
					offset2 = i;
					break;
				}
			}
		}
		c++;
	}
	return (s1.length + s2.length) / 2 - lcs;
}

var cleanDeter = function (str) {
	var deters = [
	"the"
	,"an"
	,"a"
	,"un"
	,"une"
	,"le"
	,"la"
	,"les"
	]

	for (i in deters)
		if (str.toLowerCase().search(new RegExp(""+deters[i]+" ","gi")) == 0)
			return str.substr(deters[i].length).trim()
		return str
	}