(function(root, name, factory) {
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = factory();
	} else if (typeof define === 'function' && define.amd) {
		define([name], factory);
	} else {
		root[name] = factory();
	}
	
})(this, 'Accents', function() {
	
	function Accents() {

	}
	
	var aHead = "chr	hexCode	numeric	htmlEntity	escaped	encodeURI	description".split(/\t/);
	var htmEntityIndex = 3;
	var htmlEntities = {};
	var escapeChars = {
		'&': "&amp;",
         '<': "&lt;",
         '>': "&gt;",
         '"': "&quot;",
         "'": "&#039;"
	};
	var accents = 
		"À	\\xC0	&#192;	&Agrave;	%C0	%C3%80	latin capital letter A with grave\n"
		+ "Á	\\xC1	&#193;	&Aacute;	%C1	%C3%81	latin capital letter A with acute\n"
		+ "Â	\\xC2	&#194;	&Acirc;	%C2	%C3%82	latin capital letter A with circumflex\n"
		+ "Ã	\\xC3	&#195;	&Atilde;	%C3	%C3%83	latin capital letter A with tilde\n"
		+ "Ä	\\xC4	&#196;	&Auml;	%C4	%C3%84	latin capital letter A with diaeresis\n"
		+ "Å	\\xC5	&#197;	&Aring;	%C5	%C3%85	latin capital letter A with ring above\n"
		+ "Æ	\\xC6	&#198;	&AElig;	%C6	%C3%86	latin capital ligature AE\n"
		+ "Ç	\\xC7	&#199;	&Ccedil;	%C7	%C3%87	latin capital letter C with cedilla\n"
		+ "È	\\xC8	&#200;	&Egrave;	%C8	%C3%88	latin capital letter E with grave\n"
		+ "É	\\xC9	&#201;	&Eacute;	%C9	%C3%89	latin capital letter E with acute\n"
		+ "Ê	\\xCA	&#202;	&Ecirc;	%CA	%C3%8A	latin capital letter E with circumflex\n"
		+ "Ë	\\xCB	&#203;	&Euml;	%CB	%C3%8B	latin capital letter E with diaeresis\n"
		+ "Ì	\\xCC	&#204;	&Igrave;	%CC	%C3%8C	latin capital letter I with grave\n"
		+ "Í	\\xCD	&#205;	&Iacute;	%CD	%C3%8D	latin capital letter I with acute\n"
		+ "Î	\\xCE	&#206;	&Icirc;	%CE	%C3%8E	latin capital letter I with circumflex\n"
		+ "Ï	\\xCF	&#207;	&Iuml;	%CF	%C3%8F	latin capital letter I with diaeresis\n"
		+ "Ð	\\xD0	&#208;	&ETH;	%D0	%C3%90	latin capital letter ETH\n"
		+ "Ñ	\\xD1	&#209;	&Ntilde;	%D1	%C3%91	latin capital letter N with tilde\n"
		+ "Ò	\\xD2	&#210;	&Ograve;	%D2	%C3%92	latin capital letter O with grave\n"
		+ "Ó	\\xD3	&#211;	&Oacute;	%D3	%C3%93	latin capital letter O with acute\n"
		+ "Ô	\\xD4	&#212;	&Ocirc;	%D4	%C3%94	latin capital letter O with circumflex\n"
		+ "Õ	\\xD5	&#213;	&Otilde;	%D5	%C3%95	latin capital letter O with tilde\n"
		+ "Ö	\\xD6	&#214;	&Ouml;	%D6	%C3%96	latin capital letter O with diaeresis\n"
		+ "Ø	\\xD8	&#216;	&Oslash;	%D8	%C3%98	latin capital letter O with stroke\n"
		+ "Ù	\\xD9	&#217;	&Ugrave;	%D9	%C3%99	latin capital letter U with grave\n"
		+ "Ú	\\xDA	&#218;	&Uacute;	%DA	%C3%9A	latin capital letter U with acute\n"
		+ "Û	\\xDB	&#219;	&Ucirc;	%DB	%C3%9B	latin capital letter U with circumflex\n"
		+ "Ü	\\xDC	&#220;	&Uuml;	%DC	%C3%9C	latin capital letter U with diaeresis\n"
		+ "Ý	\\xDD	&#221;	&Yacute;	%DD	%C3%9D	latin capital letter Y with acute\n"
		+ "Þ	\\xDE	&#222;	&THORN;	%DE	%C3%9E	latin capital letter THORN\n"
		+ "ß	\\xDF	&#223;	&szlig;	%DF	%C3%9F	latin small letter sharp s = ess-zed\n"
		+ "à	\\xE0	&#224;	&agrave;	%E0	%C3%A0	latin small letter a with grave\n"
		+ "á	\\xE1	&#225;	&aacute;	%E1	%C3%A1	latin small letter a with acute\n"
		+ "â	\\xE2	&#226;	&acirc;	%E2	%C3%A2	latin small letter a with circumflex\n"
		+ "ã	\\xE3	&#227;	&atilde;	%E3	%C3%A3	latin small letter a with tilde\n"
		+ "ä	\\xE4	&#228;	&auml;	%E4	%C3%A4	latin small letter a with diaeresis\n"
		+ "å	\\xE5	&#229;	&aring;	%E5	%C3%A5	latin small letter a with ring above\n"
		+ "æ	\\xE6	&#230;	&aelig;	%E6	%C3%A6	latin small ligature ae\n"
		+ "ç	\\xE7	&#231;	&ccedil;	%E7	%C3%A7	latin small letter c with cedilla\n"
		+ "è	\\xE8	&#232;	&egrave;	%E8	%C3%A8	latin small letter e with grave\n"
		+ "é	\\xE9	&#233;	&eacute;	%E9	%C3%A9	latin small letter e with acute\n"
		+ "ê	\\xEA	&#234;	&ecirc;	%EA	%C3%AA	latin small letter e with circumflex\n"
		+ "ë	\\xEB	&#235;	&euml;	%EB	%C3%AB	latin small letter e with diaeresis\n"
		+ "ì	\\xEC	&#236;	&igrave;	%EC	%C3%AC	latin small letter i with grave\n"
		+ "í	\\xED	&#237;	&iacute;	%ED	%C3%AD	latin small letter i with acute\n"
		+ "î	\\xEE	&#238;	&icirc;	%EE	%C3%AE	latin small letter i with circumflex\n"
		+ "ï	\\xEF	&#239;	&iuml;	%EF	%C3%AF	latin small letter i with diaeresis\n"
		+ "ð	\\xF0	&#240;	&eth;	%F0	%C3%B0	latin small letter eth\n"
		+ "ñ	\\xF1	&#241;	&ntilde;	%F1	%C3%B1	latin small letter n with tilde\n"
		+ "ò	\\xF2	&#242;	&ograve;	%F2	%C3%B2	latin small letter o with grave\n"
		+ "ó	\\xF3	&#243;	&oacute;	%F3	%C3%B3	latin small letter o with acute\n"
		+ "ô	\\xF4	&#244;	&ocirc;	%F4	%C3%B4	latin small letter o with circumflex\n"
		+ "õ	\\xF5	&#245;	&otilde;	%F5	%C3%B5	latin small letter o with tilde\n"
		+ "ö	\\xF6	&#246;	&ouml;	%F6	%C3%B6	latin small letter o with diaeresis\n"
		+ "ø	\\xF8	&#248;	&oslash;	%F8	%C3%B8	latin small letter o with stroke\n"
		+ "ù	\\xF9	&#249;	&ugrave;	%F9	%C3%B9	latin small letter u with grave\n"
		+ "ú	\\xFA	&#250;	&uacute;	%FA	%C3%BA	latin small letter u with acute\n"
		+ "û	\\xFB	&#251;	&ucirc;	%FB	%C3%BB	latin small letter u with circumflex\n"
		+ "ü	\\xFC	&#252;	&uuml;	%FC	%C3%BC	latin small letter u with diaeresis\n"
		+ "ý	\\xFD	&#253;	&yacute;	%FD	%C3%BD	latin small letter y with acute\n"
		+ "þ	\\xFE	&#254;	&thorn;	%FE	%C3%BE	latin small letter thorn\n"
		+ "ÿ	\\xFF	&#255;	&yuml;	%FF	%C3%BF	latin small letter y with diaeresis\n"
		+ "Œ	\\u0152	&#338;	&OElig;	%u0152	%C5%92	latin capital ligature OE\n"
		+ "œ	\\u0153	&#339;	&oelig;	%u0153	%C5%93	latin small ligature oe\n"
		+ "Š	\\u0160	&#352;	&Scaron;	%u0160	%C5%A0	latin capital letter S with caron\n"
		+ "š	\\u0161	&#353;	&scaron;	%u0161	%C5%A1	latin small letter s with caron\n"
		+ "Ÿ	\\u0178	&#376;	&Yuml;	%u0178	%C5%B8	latin capital letter Y with diaeresis\n"
		+ "ƒ	\\u0192	&#402;	&fnof;	%u0192	%C6%92	latin small f with hook";
		
	var chars = [];
	var items = [];
	var decodes = {
		
	};
	var ch;
	accents.split(/\n/).forEach(function(a, i) {
		var toks = a.split(/\t/), item = {};
		ch = toks[0];
		toks.forEach(function(t, j) {
			item[aHead[j]] = t;
		});
		htmlEntities[ch] = toks[htmEntityIndex];
		chars[i] =ch;
		items[i] = item;
		decodes[toks[1]] = decodes[toks[2]] = decodes[toks[3]] = decodes[toks[4]] = decodes[toks[5]] = ch;
	});

	var uHead = ["unicode", "chr"];
	var unicodes = 
		  "\\00e1 á\n"
		+ "\\00e9 é\n"
		+ "\\00ed í\n"
		+ "\\00f3 ó\n"
		+ "\\00fa ú\n"
		+ "\\00c1 Á\n"
		+ "\\00c9 É\n"
		+ "\\00cd Í\n"
		+ "\\00d3 Ó\n"
		+ "\\00da Ú\n"
		+ "\\00f1 ñ\n"
		+ "\\00d1 Ñ";
		
	unicodes = Accents.UNICODE_LIST = unicodes.split(/\n/);
	var UCHARS = Accents.UNICODE_CHARS = {};
	var UNICODES = Accents.UNICODES = {}
	unicodes.forEach(function(u, i) {
		var toks = u.split(/[ ]/);
		UCHARS[toks[0]] = toks[1];
		decodes[toks[0]] = toks[1];
		UNICODES[toks[1]] = toks[0];
		unicodes.push({ unicode: toks[0], chr: toks[1], "char": toks[1] });
	});
	
	for (var k in htmlEntities) {
		escapeChars[k] = htmlEntities[k];
	}
		
		
	
	
	Accents.decode = function(ch) {
		return decodes[ch]||ch;
	};
	
	Accents.encode = function(ch) {
		return htmlEntities[ch]||ch;
	};
	
	Accents.escapeHTML = function(str) {
		var html = "", i = 0, n = str.length, ch;
		for (; i < n; i++) {
			html += escapeChars[ch = str[i]]||ch;
		}
		return html;
	};
	
	var ure = [];
	var unscaped = {}, _k;
	for (var ec in escapeChars) {
		ure.push(_k = escapeChars[ec]);
		unscaped[_k] = ec;
	}
	
	ure = new RegExp(ure.join("\\|"), "g");
	
	Accents.UNESCAPED = unscaped;
	
	Accents.unescapeHTML = function(html) {
		return html.replace(ure, function($) {
			return unscaped[$];
		});
	}
	//decodes
	
	return Accents;
});



if (typeof escapeHTML === 'undefined' || (function()  {
	var ua = navigator ? navigator.userAgent.toLowerCase() : "";
	return ua.indexOf("internet explorer") >= 0 || ua.indexOf("msie") >= 0 ||  ua.indexOf("; trident/") >=  0;
})()) {
	escapeHTML = Accents.escapeHTML;
}

unescapeHTML = Accents.unescapeHTML;