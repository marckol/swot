(function(root, name, factory) {
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = factory();
	} else if (typeof define === 'function' && define.amd) {
		define([name], factory);
	} else {
		root[name] = factory();
	}
	
})(this, 'Css', function() {
	
	/**
	 * 
	 * @class Css
	 */
	function Css(o) {
		if (isPlainObj(o)) {
			
		}
		
	}
	
	var p = Css.prototype;
	Css.__CLASS__ = p.__CLASS__ = Css;
	
	Css.__CLASS_NAME__ = p.__CLASS_NAME__ = "Css";
	
	function isColorLike(c) {
		return /^(?:#[a-zA-Z0-9]{3,8}|(?:(?:rgba?|hsla?)\s*\([^\)]\))|black|silver|gray|white|maroon|red|purple|fuchsia|green|lime|olive|yellow|navy|blue|teal|aqua|aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen)$/.test(c);
	}
	
	var hexDigits = "0123456789ABCDEF";
	function hex(c) {
		c = Math.round(c);
		if (c > 255 || c < 0) throw new Error("Incorrect argument");
		var r = c % 16;
		
		return hexDigits[(c - r)/16]+hexDigits[r];
	}
	
	function hexAlpha(a) {
		if ((t = typeof a) === 'string' && a) {
			if (m = /^(100(?:\.0+)|\d{1, 2}(?:\.\d+)?)%$/.exec(x)) {
				a = 2.55*parseFloat(a, 10);
			} else {
				throw new Error("Incorrect alpha value: " + a);
			}
		} else if (t !== 'number' && a >= 0 && a <= 1) {
			a *= 255;
		} else if (a) {
			throw new Error("Incorrect alpha value");
		} else {
			return "";
		}		
		return hex(a);
	}
	
	function getAlpha(a) {
		if ((t = typeof a) === 'string' && a) {
			if (m = /^(100(?:\.0+)|\d{1, 2}(?:\.\d+)?)%$/.exec(x)) {
				a = parseFloat(a, 10)/100;
			} else {
				throw new Error("Incorrect alpha value: " + a);
			}
		} else if (t !== 'number' && a >= 0 && a <= 1) {
			
		} else if (a) {
			throw new Error("Incorrect alpha value");
		} else {
			return "";
		}		
		return a;
	}
	
	
	function colorString(c)  {
		var x, a, t, m;
		function toNum(x) {
			var v;
			if ((t = typeof x) === 'number') {
				return x;
			} else if (t !== 'string') {
				throw new Error("invalid olor component");
			}
			if (m = /^(\d+(?:\.\d+)?)(%)$/.exec(x)) {
				if (m[2]) {
					v = parseFloat(m[1], 10)*255/100;
				} else {
					v = parseFloat(m[1], 10);
				}
				if (v > 255 || v < 0 || Number.isNaN(v)) {
					throw new Error("Incorrect color component value: " + x);
				}
			}
			return v;
		}
		if (typeof c === 'string') return c;
		if (isArray(c)) {
			if (a = c[3]) {
				if (x = typeof a === 'number') {
					a = hexAlpha(a);
				} else if (x === 'string') {
					if (m = /^(100(?:\.0+)|\d{1, 2}(?:\.\d+)?)%$/.exec(x)) {
						a = hex(Math.ceil(parseFloat(m[1])*2.55));
					}
				}
			}
			
			return '#' + hex(toNum(c[0]||0)) + hex(toNum(c[1]||0)) + hex(toNum(c[2]||0)) +  (a||"");
		}
		x = c.hexa||c.hex||c.hexaColor||c.hexColor||c.rgbString||c.rgb||c.rgbaString||c.rgba||c.hslString||c.hsl||c.hslaString||c.hsla;
		if (typeof x === 'string') return x;
		if (typeof x === 'function') return x.call(c);
		a = c.alpha;
		if (a == undefined) {
			a = c.a;
		}
		var t, h = c.h, s = c.s, l = c.l;
		if (h == undefined) {
			h = c.hue;
			s = c.sturation;
			l = c.lightness;
			if (l === undefined) {
				l = c.luminance;
				if (l === undefined) l = c.luminence;
			}
		}
		if (h != undefined && s != undefined && l != undefined) {
			a = getAlpha(a);
			return "hsl" + (a ? "a" : "") + "(" + h + "," + percent(s) + "," + percent(l) + (a === "" ? "" : ", " + a) + ")";
		}
		return '#' + hex(toNum(c.red||c.r||c.rouge||0)) + hex(toNum(c.green||c.g||c.vert||c.v||0)) + hex(toNum(c.blue||c.b||c.bleu||0)) + (a === 0 ? 0 : a||hexAlpha(a));
	}
	
	function percent(v) {
		var t, m;
		if ((t = typeof v) === 'number') {
			if (v < 0 || v > 100) {
				return v = "%";
			}
		} else if (t === 'string') {
			if (m = /^(100(?:\.0+)|\d{1, 2}(?:\.\d+)?)%?$/.exec(x)) {
				return m[1] + "%";
			}			
		}
		throw new Error("Incorrect percent value");
		
	}
	
	var acceptStringValProps = {
		"line-height" : ["normal"],
		"letter-spacing": ["normal"],
		"border-width": ["thin", "medium", "thick", "inherit"],
		"font-size": ["xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "smaller", "larger", "inherit"]
	};
	
	var borders = ["border-left", "border-right", "border-top", "border-bottom"];
	
	borders.forEach(function(name) {
		//TODO
		acceptStringValProps[name + "-width"] = acceptStringValProps["border-width"];
	});
	
	function isLengthProp(name) {
		return /(?:width|height|radius|text-indent)$/i.test(name) || /^(?:left|top|bottom|right|margin-top|margin-left|margin-bottom|margin-right|padding-top|padding-left|padding-bottom|padding-right|x|y)$/.test(name);
	}
	
	function isAngleProp(name) {
		return /^rotate/.test(name);
	}
	
	function isColorProp(name) {
		return /color$/i.test(name);
	}
	var acceptNumberValProps = ['line-height'];
	
	function acceptNumberValProp(prop) {
		return acceptNumberValProps.indexOf(prop);
	}
	
	function toValue(x, prop) {
		var t, m, s = acceptStringValProps[prop];
		if (s && s.indexOf(x) >= 0) return x;
		if (acceptNumberValProp(prop) && ((t=typeof x) === 'number' || (t === 'string' && /^\d+(?:\.\d+)?$/.test(x)))) return x;
		
		if (isLengthProp(prop) || (/^(?:margin|padding)$/i.test(prop) && ((t = typeof x) === 'number' || (t === 'string' && !/[ \t]/.test(x))))) {
			if ((t = typeof x) === 'number') return x + "px";
			if (t === 'string') {
				if (m = /\d+(?:\.\d+)?(px|pt|pc|cm|mm|rem|em|en)?/.exec(x)) {
					if (!m[1]) x += "px";
					return x;
				}
			}
		} else if (isAngleprop(prop)) {
			if ((t = typeof x) === 'number') return x + "deg";
			if (t === 'string') {
				if (m = /\d+(?:\.\d+)?(deg|rad|grad|turn|%)?/.exec(x)) {
					if (!m[1]) x += "deg";
					return x;
				}
			}
		} else if (isColorProp(prop)) {
			return colorString(x);
		} else {
			return x;
		}
		throw new Error("Incorrect css style property value: " + prop + " => " + x);
	}
	
	function setVerticalTextStyle(el, bottomToTop) {
		if (bottomToTop) {
			
		} else {
			
		}
	}
	
	verticalTexts = {
		bottomToTop : {
			"top-right":
			  " transform-origin: top right;"
			  + "right:0;"
			  + "top:0;"
			  + "transform: rotate(-90deg) translateY(-100%);",

			"top-left": 
			  "transform-origin: top left;"
			  + "left:0;"
			  + "top:0;"
			  + "transform: rotate(-90deg) translateX(-100%);",

			"bottom-right": 
			  "transform-origin:bottom right;"
			  + "right:0;"
			  + "bottom:0;"
			  + "transform: rotate(-90deg) translateX(100%);",
			"bottom-left":
			  "transform-origin:bottom left;"
			  + "left:0;"
			  + "bottom:0;"
			  + "transform: rotate(-90deg) translateY(100%);"
			,
				/* */
			"top":
				  "transform-origin: top right;"
				+ "right:50%;"
				+ "top:0;"
				+ "transform: rotate(-90deg) translateY(-50%);"
				,
				/* */
			"left":
				  "transform-origin: top left;"
				+ "left:0;"
				+ "top:50%;"
				+ "transform: rotate(-90deg) translateX(-50%);"
				,
				/**/
			"right":
				  "transform-origin:top right;"
				+ "right:0;"
				+ "top:50%;"
				+ "transform: rotate(90deg) translateX(50%);"
				,
				/**/
			"bottom":
				  "transform-origin:bottom left;"
				+ "left:50%;"
				+ "bottom:0;"
				+ "transform: rotate(-90deg) translateY(50%);"
		},
		topToBottom: {
			
		}
	};
	
	verticalTexts['top-to-bottom'] =verticalTexts.topToBottom;
	verticalTexts['bottom-to-top'] =verticalTexts.bottomToTop;
	
	verticalTexts['top-bottom'] =verticalTexts. topToBottom;
	verticalTexts['bottom-top'] =verticalTexts. bottomToTop;
	
	verticalTexts['topbottom'] =verticalTexts.topToBottom;
	verticalTexts['bottomtop'] =verticalTexts.bottomToTop;
	
	
	verticalTexts['ttb'] =verticalTexts.topToBottom;
	verticalTexts['tb'] =verticalTexts.topToBottom;
	
	verticalTexts['btt'] =verticalTexts.bottomToTop;
	verticalTexts['bt'] =verticalTexts.bottomToTop;
	/**
	 * 
	 * @memberOf Css
	 * @param {String} dir  The reading direction
	 * @param {String} pos	The position of the text
	 * @return {String}
	 */
	function verticalTextCss(dir, pos) {
		var s = verticalTexts[dir.toLowerCase()];
		if (!s || !(s = s[pos])) {
			throw new Error("Incorrect direction or position");
		}
		return s;
	}
	/**
	 * 
	 * @memberOf Css
	 * @param {Boolean} bottomToTop  The bottom to top reading direction ?
	 * @param {String|Object|Number} [margin]	The margin
	 * @return {String}
	 */
	function verticalTextStyle(bottomToTop, margin) {
		margin = margin||"";
		//margin-left: 70px
		if (bottomToTop) { //bottom right case
			return "-webkit-transform: rotate(-90deg);-moz-transform: rotate(-90deg);-ms-transform: rotate(-90deg);-o-transform: rotate(-90deg);transform: rotate(-90deg);transform-origin: 50% 50%;filter: progid: DXImageTransform.Microsoft.BasicImage(rotation=3);" + margin;
			/*
			-webkit-transform: rotate(-90deg);
        -moz-transform: rotate(-90deg);
        -ms-transform: rotate(-90deg);
        -o-transform: rotate(-90deg);
        transform: rotate(-90deg);
        -webkit-transform-origin: 50% 50%;
        -moz-transform-origin: 50% 50%;
        -ms-transform-origin: 50% 50%;
        -o-transform-origin: 50% 50%;
        transform-origin: 50% 50%;
        filter: progid: DXImageTransform.Microsoft.BasicImage(rotation=3);
      }*/
		} else { //top left case
			return "-webkit-transform: rotate(90deg);-moz-transform: rotate(90deg);-ms-transform: rotate(90deg);-o-transform: rotate(90deg);transform: rotate(90deg);transform-origin: left top 0;" + margin;
			/*
			.vertical {
  transform: rotate(90deg);
  transform-origin: left top 0;
  margin-left: 70px;
}			*/
		}
	}
	function toName(prop) {
		return prop = prop[0].toLowerCase() + prop.substring(1).replace(/[A-Z]/g, function($0) {
					return "-" + $0;
				});
	}
	/**
	 * 
	 * @param {Object} s
	 * @param {Array&lt;String&gt;} [names] The CSS property names to write the property
	 * @return {String}
	 */
	function toProps(s, names) {
		var css = "";
		(names||Css.DEFAULT_PROPERTY_NAMES||[
			"padding", "margin", "border", 
			"fontFamily", "font-family",
			"fontSize", "font-size", 
			"fontWeight", "font-weight",
			"marginBottom", "marginLeft", "marginTop", "marginRight",
			"margin-bottom", "margin-left", "margin-top", "margin-right",
			"paddingBottom", "paddingLeft", "paddingTop", "paddingRight",
			"padding-bottom", "padding-left", "padding-top", "padding-right",
			"borderBottom", "borderLeft", "borderTop", "borderRight",
			"border-bottom", "border-left", "border-top", "border-right",
			"borderRadius", "border-radius",
			"transform",
			"rotate",
			"width", "height"
		]).forEach(function(prop) {
			var v = s[prop];
			if (v != undefined) {
				prop = prop[0].toLowerCase() + prop.substring(1).replace(/[A-Z]/g, function($0) {
					return "-" + $0;
				});
				css += prop + ":" + toValue(v, prop) + ";";
			}
		});
		return css;
	}
	
	
	Css.getAlpha = getAlpha;
	
	Css.percent = percent;
	
	Css.colorString = colorString;
	
	Css.toProps = toProps;
	
	Css.propsString = toProps;
	
	Css.propsText = toProps;
	
	Css.verticalTextCss = verticalTextCss;
	
	Css.verticalTextStyle = verticalTextStyle;
	
	Css.hexAlpha = hexAlpha;
	
	Css.hex = hex;
	
	Css.isColorLike = isColorLike;
	
	Css.isColor = isColorLike;
	
	Css.toValue = toValue;
	
	Css.toPropertyName = toName;
	
	Css.toName = toName;
	
	return Css;
});