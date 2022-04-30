//requires serenix_css.js already loaded

(function(root, name, factory) {
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = factory();
	} else if (typeof define === 'function' && define.amd) {
		define([name], factory);
	} else {
		root[name] = factory();
	}
	
})(this, 'SWOTDimension', function() {
	
	var blue = "#0C3175";
	
	var afrikpayBlue = "#007ABE"
	
	
	/*---------------------------------------------------------------------------------*/
	/*                              SWOT dimension class                               */
	/*---------------------------------------------------------------------------------*/
	
	/**
	 * <h3>SWOTDimension class</h3>
	 * A SWOT dimension represents strengths, weaknesses, opportunities or threats.
	 * @param {Object|Array|String} [o]
	 *	<p>When the argument is an array or a string, the second argument (type) is 
	 *	mandatory/required.</p>
	 *  <p>When the first argument is a plain object without field named 'type' with 
	 *  one of the following 'strengths', 'weaknesses', 'opportunities' or 
	 *  'threats'.</p>
	 * @param {String} [type]  The dimension type: 'strengths', 'weaknesses',
	 * 		'opportunities' or 'threats'.
	 * <p>When not specified, the first argument should be a plain object 
	 * with a field named type with one of the following 'strengths', 'weaknesses',
	 * 'opportunities' or 'threats'.</p>
	 * @class SWOTDimension
	 */
	function SWOTDimension(o, type) {
		this.__$$map$$__ = {};
		if (arguments.length === 1) {
			if (typeof o === 'string') {
				this.setType(o);
			} else if (o instanceof String) {
				this.setType(o.valueOf());
			} else {
				throw new Error("Incorrect arguments");
			}
			this.__findings_ = [];
		} else if (isArray(o)) {
			this.setType(type);
			this.setItems(o);
		} else if (o) {
			this.setType(type||o.type||o.dimension||o.axis);
			this.setItems(o.findings||o.analyzes||o.details||o.elements);
		}
	}
	
	
	SWOTDimension.__CLASS__ = SWOTDimension.prototype.__CLASS__ = SWOTDimension;
	
	SWOTDimension.__CLASS_NAME__ = SWOTDimension.prototype.__CLASS_NAME__ = "SWOTDimension";
	
	/**
	 * Liste of differents SWOT analysis dimensions.
	 * @type Array
	 */
	SWOTDimension.TYPES = ["strengths", "weaknesses", "opportunities", "threats"];
	/**
	 * Liste of differents SWOT analysis dimensions.
	 * @type Array
	 */
	SWOTDimension.DIMENSIONS = SWOTDimension.TYPES;
	
	SWOTDimension.STRENGTHS = "strengths";
	SWOTDimension.WEAKNESSES = "weaknesses";
	SWOTDimension.OPPORTUNITIES = "opportunities";
	SWOTDimension.THREATS = "threats";
	SWOTDimension.BLUE = blue;
	
	SWOTDimension.AFRIKPAY_BLUE = afrikpayBlue;
	
	
	
	var p = SWOTDimension.prototype;
	
	p.setType = function(type) {
		if (arguments.length == 0) throw new Error("Argument expected");
		if (/^s/i.test(type)) {
			this.__type_ = SWOTDimension.STRENGTHS;
		} else if (/^w/i.test(type)) {
			this.__type_ = SWOTDimension.WEAKNESSES;
		} else if (/^o/i.test(type)) {
			this.__type_ = SWOTDimension.OPPORTUNITIES;
		} else if (/^t/i.test(type)) {
			this.__type_ = SWOTDimension.THREATS;
		} else {
			throw new Error("Incorrect argument");
		}
		return this;
	};
	
	p.getType = function() {
		return this.__type_;
	};
	
	p.getDimension = p.getType;
	
	p.setDimension = p.setType;
	
	p.addFinding = function(finding, i) {
		var arr = this.__findings_ || (this.__findings_ = []);
		if (typeof i === 'number' && i >= 0) {
			arr.splice(i, 0, finding);
		} else {
			arr.push(finding);
		}
		return this;
	};
	
	p.add = p.addFinding;
	
	p.addItem = p.addFinding;
	/**
	 * 
	 * param {Array} $
	 * @return {SWOTDimension}
	 */
	p.setFindings = function($) {
		var findings, len = arguments.length, args = Array.prototype.slice.call(arguments);
		if (len === 0) throw new Error("Argument expected");
		if (isArray($)) {
			findings = $;
		} else if (len > 1) {
			findings = args;
		} else {
			throw new Error("Incorrect argument");
		}
		var arr = this.__findings_ = [];
		findings.forEach(function(it) {
			if (it instanceof String) it = it.valueOf();
			if (typeof it === 'string' || (isPlainObj(it))) {
				arr.push(it);
			} else {
				throw new Error("Incorrect argument");
			}
		});
		return this;
	};
	
	p.setItems = p.setFindings;
	
	p.setAnalyzes = p.setFindings;
	
	p.getFindings = function() {
		return this.__findings_;
	};
	
	p.getItems = p.getFindings;
	
	p.getAnalyzes = p.getFindings;
	
	
	
	p.getLabel = function() {
		var type;
		return this.__label_||((type = this.__type_)[0].toUpperCase() + type.substring(1));
	};
	var _isColor = typeof isColor === 'function' ? isColor : function(c) {
		return /^(?:#[a-zA-Z0-9]{3,8}|(?:(?:rgba?|hsla?)\s*\([^\)]\))|black|silver|gray|white|maroon|red|purple|fuchsia|green|lime|olive|yellow|navy|blue|teal|aqua|aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen)$/.test(c);
	};
	
	function getStyle(css) {
		var s = "", v;
		if (typeof css === 'string' && css) {
			if (_isColor(css)) {
				s += "color:" + css + ";";
			}
		} else if (isPlainObj(css)) {
			v = css.color;
			if (typeof v === 'string' && _isColor(v)) {
				s += "color:" + v + ";";
			} else if (v) {
				s += Css.colorString(v);
			}
			v = css.backgroundColor||css['background-color']||css.background;
			if (typeof v === 'string' && _isColor(v)) {
				s += "background-color:" + v + ";";
			}
			v = css.fontName||css.fontFamily||css["font-family"]||css.font;
			if (typeof v === 'string' && v) {
				s += "font-family:" + v + ";";
			}
			
			if (css.bold) {
				s += "font_weight:bold";
				if (css.italic) {
					s += " italic";
				}
				s += ";";
			} else if (css.italic) {
				s += "font_weight:italic;";
			} else {
				v = css.fontWeight||css["font-weight"];
				if (typeof v === 'string' && v) {
					s += "font-weight:" + v + ";";
				}
			}
		}
		return s ? " style=\"" + s + "\"" : "";;
	}
	
	SWOTDimension.getStyle =  getStyle;
	p.isInternal = function() {
		return this.__type_ === "strengths" || this.__type_ === 'weaknesses';
	};
	p.isExternal = function() {
		return this.__type_ === "opportunities" || this.__type_ === 'threats';
	};
	p.toHTMLString = function(options) {
		options = options||{};
		var style = options.style, s, c, v;
		var ref = getStyle(options.ref||options.reference||options.num||(style ? style.ref||style.reference||style.num||"" : ""));
		var type = this.__type_, pref = type[0]
		var html = "<div class=\"SereniX-swot-axis " 
				+ type + "\"><div class=\"title\">" 
				+ toHtml(this.getLabel()||(type[0].toUpperCase() + type.substring(1))) + "</div>";
		
		html += "<div class=\"content\"><ul>";
		
		(this.__findings_||[]).forEach(function(item, i) {
			html += "<li>"
				+ "<div><span class=\"num ref\""  + ref + ">" + pref + (i + 1) + "</span>: <span class=\"text\">"
				+ toHtml(item);
				+ "</span></div></li>"
		});
		html += "</ul></div></div>";
		
		
		return html;
	};
	
	
	addToNS(SWOTDimension, SereniX.ui);
	
	return SWOTDimension;
});

(function(root, name, factory) {
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = factory();
	} else if (typeof define === 'function' && define.amd) {
		define([name], factory);
	} else {
		root[name] = factory();
	}
	
})(this, 'SWOTInternalDim', function() {
	
	function SWOTInternalDim() {
		SWOTDimension.apply(this, arguments);
	}
	
	
	
	SWOTInternalDim.prototype = new SWOTDimension();
	
	SWOTInternalDim.__CLASS__ = SWOTInternalDim.prototype.__CLASS__ = SWOTInternalDim;
	
	SWOTInternalDim.__CLASS_NAME__ = SWOTInternalDim.prototype.__CLASS_NAME__ = "SWOTInternalDim";
	
	SWOTInternalDim.prototype.setType = function(type) {
		if (arguments.length == 0) throw new Error("Argument expected");
		if (/^s/i.test(type) || /^forces?$/i.test(type)) {
			this.__type_ = SWOTDimension.STRENGTHS;
		} else if (/^w/i.test(type) || /^faiblesses?$/i.test(type)) {
			this.__type_ = SWOTDimension.WEAKNESSES;
		} else {
			throw new Error("Incorrect argument");
		}
		return this;
	};
	
	
	return SWOTInternalDim;
	
});




(function(root, name, factory) {
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = factory();
	} else if (typeof define === 'function' && define.amd) {
		define([name], factory);
	} else {
		root[name] = factory();
	}
	
})(this, 'SWOTExternalDim', function() {
	
	function SWOTExternalDim() {
		SWOTDimension.apply(this, arguments);
	}
	
	
	
	SWOTExternalDim.prototype = new SWOTDimension();
	
	SWOTExternalDim.__CLASS__ = SWOTExternalDim.prototype.__CLASS__ = SWOTExternalDim;
	
	SWOTExternalDim.__CLASS_NAME__ = SWOTExternalDim.prototype.__CLASS_NAME__ = "SWOTExternalDim";
	
	SWOTExternalDim.prototype.setType = function(type) {
		if (arguments.length == 0) throw new Error("Argument expected");
		if (/^o/i.test(type)) {
			this.__type_ = SWOTDimension.OPPORTUNITIES;
		} else if (/^t/i.test(type) || /^menaces?$/i.test(type)) {
			this.__type_ = SWOTDimension.WEAKNESSES;
		} else {
			throw new Error("Incorrect argument");
		}
		return this;
	};
	
	
	return SWOTExternalDim;
	
});


(function(root, name, factory) {
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = factory();
	} else if (typeof define === 'function' && define.amd) {
		define([name], factory);
	} else {
		root[name] = factory();
	}
	
})(this, 'SWOT', function() {
	
	
	var keys = {
		"st": ["st", "ST", "strengths-threats", "Strengths-Threats", "strengthsThreats" ],
		"so": ["so", "SO", "strengths-opportunities", "Strengths-Opportunities", "strengthsOpportunities" ],
		"wt": ["wt", "WT", "weaknesses-threats", "Weaknesses-Threats", "weaknessesThreats" ],
		"wo": ["wo", "WO", "weaknesses-opportunities", "Weaknesses-Opportunities", "weaknessesOpportunities" ]
	};
	
	/*
	SO (Strengths – Opportunities) : la combinaison des forces internes et externes aide les entrepreneurs à déterminer quelles forces peuvent être utilisées pour exploiter les opportunités environnementales en vue de la réussite de leur entreprise. En ce qui concerne la dimension des SO, des stratégies d’appariement seront élaborées afin d’accroître les points forts.
 
	ST (Strengths – Threats) : une combinaison de forces internes et de risques externes devrait montrer quelles forces existantes peuvent minimiser le risque de menaces environnementales. Objectif de la dimension ST : développer des stratégies de neutralisation avec lesquelles l’entreprise peut s’assurer contre les risques.
	 
	WO (Weaknesses – Opportunities) : dans une comparaison des faiblesses internes et des opportunités externes, les entrepreneurs tentent d’identifier les faiblesses à partir desquelles des opportunités peuvent se présenter. Objectif pour la dimension WO : développer des stratégies de transformation qui peuvent être utilisées pour développer des divisions d’entreprise auparavant faibles.
	 
	WT (Weaknesses – Threats) : en combinant les faiblesses internes avec les risques externes, les entrepreneurs identifient les domaines où il y a un besoin aigu d’action afin de se protéger d’éventuels dommages. Objectif pour la dimension TAE : développer des stratégies de défense qui minimisent les risques et évitent les menaces.
	*/
	
	var colors = {
		toDevelop: "#93B944", //green: strengths and opportunities
		toMonitor: "#FC8B29", //orange: strengths and threats
		toImprove: "#EAFECF", //light green : weaknesses and opportunities
		toEliminate: "#B63633" //red : weaknesses and threats
	}
	
	colors.so = colors.SO = colors["Strengths–Opportunities"] = colors["strengths–opportunities"] = colors.q1 = colors.toDevelop;
	colors.st = colors.ST = colors["Strengths–Threats"] = colors["strengths–threats"] = colors.q2 = colors.toMonitor;
	colors.wo = colors.WO = colors["Weaknesses–Opportunities"] = colors["weaknesses–opportunities"] = colors.q3 = colors.toImprove;
	colors.wt = colors.WT = colors["Weaknesses–Threats"] = colors["weaknesses–threats"] = colors.q4 = colors.toEliminate;
	
	function contains(arr1, arr2, right) {
		var i, n, left;
		if (arguments.length === 2) {
			right = arr2.length > arr1.length;
		}
		if (!right) {
			i = arr1; 
			arr1 = arr2.length;
			arr2 = i;
		}
		i =0; n = arr1.length;
		for (;i<n;i++) {
			if (arr2.indexOf(arr1[i]) >= 0)
				return true;
		}
		return false;
	}
	
	
	function cssText($) {
		var bg,qBgColors, color, qColor, q, c, qProps = "", xiProps = "", pref = "";
		var css = "";
		if (arguments.length === 2 || arguments.length === 3) {
			pref = arguments[2]||"";
			q = arguments[1];
			if ($ instanceof String) {
				$ = $.valueOf();
			}
			if (isPlainObj($)) {
				if (contains(Object.keys($), ["color", "background", "backgroundColor", "bg", "bgColor"])) {
					bg = $.background||$.bg||$.backgroundColor||$.bgColor;
					color = $.color;
				} else {
					bg = Css.colorString($);
				}
				xiProps = toProps($)||"";
			} else if (typeof $ === 'string') {
				bg = $;
			}
			if (isPlainObj(q)) {
				if (contains(Object.keys(q), ["color", "background", "backgroundColor", "bg", "bgColor"])) {
					qBgColors = q.background||q.bg||q.backgroundColors||q.bgColors||q.backgroundColor||q.bgColor;
					qColor = q.color;
				} else {
					qBgColors = Css.colorString(q);
				}
				qProps = toProps(q)||"";
			} else if (typeof q === 'string' || isArray(q)) {
				qBgColors = q;
			}
		} else if (arguments.length > 1) {
			bg = arguments[0];
			qBgColors = arguments[1];
			color = arguments[2];
			qColor = arguments[3];
			pref = arguments[4]||"";
		} else {
			bg = $.background;
			color = $.color;
			if (q = $.quadrant||$.q) {
				qColor = q.color;
				qBgColors = q.backgrounds||q.backgroundColors
							||q.background||q.backgroundColor
							||q.bgs||q.bgColors
							||q.bg||q.bgColor;
				qProps = toProps(q);
			} else {
				qBgColors = $.qBackgrounds||$.qBackgroundColors||$.quadrantBackgrounds||$.quadrantBackgroundColors
							||$.qBackground||$.qBackgroundColor||$.quadrantBackground||$.quadrantBackgroundColor
							||$.qBgs||$.qBgColors||$.quadrantBgs||$.quadrantBgColors
							||$.qBg||$.qBgColor||$.quadrantBg||$.quadrantBgColor;
				qColor = $.qColor||$.quadrantColor;
			}
			pref = $.prefix||$.pref||"";
		}
		if (qBgColors instanceof qBgColors) qBgColors = qBgColors.valueOf();
		if (typeof qBgColors === 'string') {
			if (c = qBgColors.split(/\s*\|\s*/).length > 1) {
				qBgColors = c;
			}
		}
		
		if (isArray(qBgColors)) {
			qBgColors = { so : qBgColors[0], st : qBgColors[1], wo: qBgColors[2], wt: qBgColors[3]};
		} else if (typeof qBgColors === 'string' && qBgColors) {
			c = {};
			c.so = c.st = c.wo = c.wt = qBgColors;
			qBgColors = c;
		}
		color = color ? "color:" + color + ";" : "";
		qColor = qColor ? "color:" + qColor + ";" : "";
		bg = bg ? "background-color:" + bg + ";" : "";
		if (bg || color || xiProps) {
			css += pref + ".SereniX-swot .enterprise, .SereniX-swot .entreprise, .SereniX-swot .corner {" + bg + color + xiProps + "}";
		}
		if (qBgColors) {
			css += pref + ".SereniX-swot .so {background-color:" + (qBgColors.so||qBgColors.SO||qBgColors["strengths-opportunities"]||qBgColors["Strengths-Opportunities"]||"transparent") + ";}";
			css += pref + ".SereniX-swot .st {background-color:" + (qBgColors.st||qBgColors.ST||qBgColors["strengths-threats"]||qBgColors["Strengths-Threats"]||"transparent") + ";}";
			css += pref + ".SereniX-swot .wo {background-color:" + (qBgColors.wo||qBgColors.WO||qBgColors["weakness-opportunities"]||qBgColors["Weakness-Opportunities"]||"transparent") + ";}";
			css += pref + ".SereniX-swot .wt {background-color:" + (qBgColors.wt||qBgColors.WT||qBgColors["weakness-threats"]||qBgColors["Weakness-Threats"]||"transparent") + ";}";
		}	
		if (qColor || qProps) {
			css += pref + ".SereniX-swot .quadrant {" + (qColor||"") + (qProps||"") + "}";
		}
		return css;
	}
	
	function set(findings, type, self) {
		if (typeof findings === 'string' || (findings instanceof String)) {
			findings = findings.split(/\s*\|\s*/);
		}
		if (findings instanceof SWOTDimension) {
			findings.__type_ = type;
			self['__' + type + '_'] = findings;
		} else if (isArray(findings)) {
			self['__' + type + '_'] = new SWOTDimension(findings, type);
		} else {
			throw new Error("Incorrect argument");
		}
	}
	/**
	 * 
	 * @param {String} type
	 * @param {String|Array|Object} finding
	 * @param {Number|String} i
	 * @param {SWOT} self
	 */
	function add(type, finding, i, self) {
		var a;
		if (/^s(?:trengths?)?$/i.test(type)) {
			a = self.__strengths_||(self.__strengths_ = new SWOTDimension('strengths'));
		} else if (/^w(?:eakness(?:es)?)?$/i.test(type)) {
			a = self.__weaknesses_||(self.__weaknesses_ = new SWOTDimension('weaknesses'));
		} else if (/^o(?:pportunit(?:y|ies)?)?$/i.test(type)) {
			a = self.__opportunities_||(self.__opportunities_ = new SWOTDimension('opportunities'));
		} else if (/^t(?:hreat(?:s)?)?$/i.test(type)) {
			a = self.__threats_||(self.__threats_ = new SWOTDimension('threats'));
		} else {
			throw new Error("Type not supported: " + type);
		}
		if (isArray(finding)) {
			finding = { key : finding[0], content: finding[1]};
		} else if (isPlainObj(finding)) {
			if (!finding.key) {
				if (typeof i === 'string') {
					finding.key = i;
				} else {
					if (i == undefined) {
						i = (a.__findings_||(a.__findings_ = [])).length;
					}
					finding.key = type[0] + (i + 1);
				}
			}
		} else if (['string', 'function'].indexOf(typeof finding)>= 0){
			if (i == undefined) {
				i = (a.__findings_||(a.__findings_ = [])).length;
			}
			finding = { key : type[0] + (i + 1), content: finding};
		} else {
			throw new Error("Incorrect arguments");
		}
		a.addFinding(finding);
	}
	
	function setColors(td, c) {
		if (!c) return;
		if (typeof c === 'string') {
			td.style.backgroundColor = c;
		} else {
			if (c.background) {
				td.style.backgroundColor = Css.colorString(c.background);
			}
			if (c.color) {
				td.style.color = Css.colorString(c.color);
			}
		}
	}
	
	function getLength(p) {
		var x, m;
		if (!p && typeof p !== 'number') return;
		if (typeof p === 'string') {
			if (m = /^\d+(?:\.\d+)?(px|pt|pc|mm|cm|%|em|en|rem)/.exec(p)) {
				if (!m[1]) p += "px";
			}
			return p;
		} else if (typeof p === 'number') {
			return p + "px";
		}
	}
	
	function setPadding(td, p) {
		setMargin(td, p, "padding");
	}
	
	function setMargin(td, p, type) {
		var top, left, bottom, right;
		if (isPlainObj(p)) {
			left = getLength(p.left);
			top = getLength(p.top);
			right = getLength(p.right);
			bottom = getLength(p.bottom);
			p = "";
			if (top) {
				if (left === top && top === right && top === bottom) {
					p = top;
				} else if (top === bottom) {
					if (left) {
						p = top + " " + left + " " + bottom;
						if (right) {
							p += " " + right;
						}
					} else if (right) {
						
					} else {
						
					}
				}
			} else if (bottom) {
				
			} else if (left) {
				
			} else if (right) {
				
			}
		} else  if (isArray(p)) {
			x = [];			
			p.forEach(function(v) {
				x.push(getLength(p));
			});
			p = x.join(" ");
		}
		else {
			p = getLength(p);
		}
		if (p) {
			td.style[type||"margin"] = p;
		}
	}
	
	function getQ(q, r, c) {
		if (!q) q = {};
		if (typeof q === 'string' || q.color || q.background) return q;
		if (r === 0) {
			if (c === 0) {
				return q.so||q.SO||q.strengths||q['strengths-opportunities']||q['Strengths-Opportunities']||q.q1||q.Q1||q[0];
			} else {
				return q.wo||q.WO||q.weaknesses||q.weakness||q['weaknesses-opportunities']||q['Weaknesses-Opportunities']||q.q2||q.Q2||q[1];
			}
		} else {
			if (c === 0) {
				return q.st||q.ST||q.opportunities||q['strengths-threats']||q['Strengths-Threats']||q.q3||q.Q3||q[2];
			} else {
				return q.wt||q.WT||q.threats||q['weaknesses-threats']||q['Weaknesses-Threats']||q.q4||q.Q4||q[3];
			}
		}
	}
	
	function isQ(o, field) {
		var i, n, x;
		if (field) {
			x = keys[field];
			for(i=0, n = x.length; i < n; i++) {
				if (o[x[i]]) return true;
			};
		} else {
			for (var k in keys) {
				x = keys[k];
				for(i=0, n = x.length; i < n; i++) {
					if (o[x[i]]) return true;
				};
			}
		}
	}
	
	function getQVal(o, k) {
		var i, n, x, v;
		x = keys[k];
		for(i=0, n = x.length; i < n; i++) {
			if ((v = o[x[i]]) !== undefined) return v;
		};
	}
	
	function normalizeColors(c) {
		if (typeof c === 'string' && c) {
			c = { background: c };
		}
		return c;
	}
	
	
	function isStrengths(type) {
		return /^s(?:trengths?)?(?:\s+|[:-])?(\d+)/i.test(type);
	}
	function isWeaknesses(type) {
		return /^w(?:eakness(?:es)?)?(?:\s+|[:])?(\d+)/i.test(type);
	}
	function isOpportunities(type) {
		return /^o(?:pportunit(?:y|ies)?)?(?:\s+|[:])?(\d+)/i.test(type);
	}
	function isThreats(type) {
		return /^t(?:hreat(?:s)?)?(?:\s+|[:])?(\d+)/i.test(type);
	}
	
	function _getAnalyze(d) {
		return d.findings||d.items||d.analyzes||d.analyses||d.analyze||d.analyze||d.content||d.data;
	}
	
	function dim(d, type, self) {
		//check if there is already a dimension of the same type
		if (self["__" + type + "_"]) {
			throw new Error("Too many " + type);
		}
		return d;
	}
	
	function setFindings(a) {		
		if (a.length === 4) {
			a.forEach(function(d, i) {
				if (isStrengths(d.type)) {
					this.setStrengths(dim(_getAnalyze(d), "strengths", this));
				} else if (isWeaknesses(d.type)) {
					this.setWeaknesses(dim(_getAnalyze(d), "weaknesses", this));
				} else if (isOpportunities(d.type)) {
					this.setOpportunities(dim(_getAnalyze(d), "opportunities", this));
				} else if (isThreats(d.type)) {
					this.setThreats(dim(_getAnalyze(d), 'threats', this));
				} else if (i === 0) {
					this.setStrengths(dim(d, "strengths", this));
				} else if (i === 1) {
					this.setWeaknesses(dim(d, "weaknesses", this));
				} else if (i === 2) {
					this.setOpportunities(dim(d, "opportunities", this));
				} else if (i === 3) {
					this.setThreats(dim(d, "threats", this));
				} else {
					throw new Error("Incorrect arguments");
				}
			});
		} else {
			a.forEach(function(f, i) {
				if (isStrength(f.type)) {
					this.addStrength(f);
				} else if (isWeaknesses(f.type)) {
					this.addWeakness(f);
				} else if (isOpportunities(f.type)) {
					this.addOpportunity(f);
				} else if (isThreats(f.type)) {
					this.addThreat(f);
				}  else {
					throw new Error("Incorrect arguments");
				}
			});
		}
	}
	
	/*---------------------------------------------------------------------------------*/
	/*                            SWOT Analyze/matrix class                            */
	/*---------------------------------------------------------------------------------*/
	
	/**
	 * <h3> SWOT analysis class</h3>
	 * @param {Object} [o]
	 * @param {Boolean} [build=true]
	 * @class SWOT
	 */
	function SWOT(o, build) {
		var a, m, type, strategies, own, v, s;
		if (isPlainObj(o)) {
			this.__colors_ = o.colors;
			this.__style_ = o.style||o.css||o.styles||o.cssText;
			if((v = o.cellPadding||o.cellPaddings||o.cellpadding||o.cellpaddings) || v === 0) this.__cellPadding_ = v;
			if ((v=o.padding||o.paddings) || v === 0) this.__padding_ = v;
			if (o.crossDelim) this.__crossDelim_ = o.crossDelim;
			this.__externalLabel_ = o.externalLabel;
			this.__internalLabel_ = o.internalLabel;
			this.__cornerLabel_ = o.cornerLabel;
			this.__environmentTextOrientation_ = o.environmentTextOrientation;
			s = o.swot||o.data||o.object||o;
			if (isArray(a = s.findings||s.diagnostic||s.analyzes||s.analysis||s.analyses||s.dimensions)) {
				setFindings(a);
			} else if (isPlainObj(a)) {
				if (a.strengths||a.weaknesses||a.opportunities||o.threats) {
					this.setSrengths(a.strengths);
					this.setWeaknesses(a.weaknesses);
					this.setOpportunities(a.opportunities);
					this.setThreats(a.threats);
					own = a;
				} else {
					for (var key in a) {						
						if (m = /^s(?:trengths?)?(?:\s+|[:-])?(\d+)/i.exec(key)) {
							this.addStrength(a[key], parseInt(m[1], 10));
						} else if (m = /^w(?:eakness(?:es)?)?(?:\s+|[:])?(\d+)/i.exec(key)) {
							this.addWeakness(a[key], parseInt(m[1], 10));
						}else if (m = /^o(?:pportunit(?:y|ies)?)?(?:\s+|[:])?(\d+)/i.exec(key)) {
							this.addOpportunity(a[key], parseInt(m[1], 10));
						} else if (m = /^t(?:hreat(?:s)?)?(?:\s+|[:])?(\d+)/i.exec(key)) {
							this.addThreath(a[key], parseInt(m[1], 10));
						} else {
							throw new Error("Not supported yet");
						}
					}
				}
			} else {
				this.setStrengths(s.strengths);
				this.setWeaknesses(s.weaknesses);
				this.setOpportunities(s.opportunities);
				this.setThreats(s.threats);
				own = s;
			}
			if (strategies = s.strategies||s.crossing||s.cross) {
				this.setStrategies(strategies);
			}
			s = o.styles||o.css||o.cssText||o.style;
			
			if (s instanceof String) s = s.valueOf();
			
			if (isPlainObj(s) || typeof s === "string") {
				this.__style_ = s;
			} else if (s = o.colors) {
				this.__colors_ = o.colors;
			}
			if (build || build == undefined) this.build();
		}
	}
	
	if (typeof SereniX.ui.Container === 'function') {
		SWOT.prototype = new SereniX.ui.Container();
	} else if (typeof Container === 'function') {
		SWOT.prototype = new Container();
	}
	
	var p = SWOT.prototype;
	
	p.__CLASS__ = SWOT.__CLASS__ = SWOT;
	
	p.__CLASS_NAME__ = SWOT.__CLASS_NAME__ = "SWOT";
	
	
	p.setEnvironmentTextOrientation = function(o) {
		if (o instanceof String) o = o.valueOf();
		if (typeof o !== 'string') {
			throw new Error("Incorrect argument");
		}
		this.__environmentTextOrientation_ = /^h(?:orizontal)?/i.test(o) ? 'horizontal' : 
				/^v(?:ertical)?/i.test(o) ? 'vertical' : (function() { throw new Error("Incorrect value");});
		return this;
	};
	
	p.getEnvironmentTextOrientation = function() {
		return this.__environmentTextOrientation_;
	};
	
	p.addStrength = function(s, i) {
		add('strength', s, i, this);
		return this;
	};
	
	p.addWeakness = function(s, i) {
		add('weakness', s, i, this);
		return this;
	};
	
	p.addOpportunity = function(s, i) {
		add('opportunity', s, i, this);
		return this;
	};
	
	p.addThreath = function(s, i) {
		add('threat', s, i, this);
	};
	p.setStrengths = function(strengths) {
		set(strengths, 'strengths', this);
		return this;
	};
	
	p.setWeaknesses = function(weaknesses) {
		set(weaknesses, 'weaknesses', this);
		return this;
	};
	
	p.setOpportunities = function(opportunities) {
		set(opportunities, 'opportunities', this);
		return this;
	};
	
	p.setThreats = function(threats) {
		set(threats, 'threats', this);
		return this;
	};
	
	p.getStrengths = function() {
		return this.__strengths_;
	};
	
	p.getWeaknesses = function() {
		return this.__weaknesses_;
	};
	
	p.getOpportunities = function() {
		return this.__opportunities_;
	};
	
	p.getThreats = function() {
		return this.__threats_;
	};
	
	p.contains = function(item, type) {
		var x, findings, match;
		if (!type) {
			throw new Error("Not yet supported");
		} else if (typeof type === 'string') {
			type = /^s/i.test(type) ? 'strengths' : /^w/i.test(type) ? 'weaknesses' : /^o/i.test(type) ? 'opportunities' : /^t/i.test(type) ? 'threats' : type;
			x = this['__' + type + '-'];
			var re = new RegExp("^" + type[0] + "(\d+)$");
			if (typeof item === 'string' && (match = re.exec(item))) {
				return !!x.findings[parseInt(match[1], 10) - 1]
			}
			x.__findings_.forEach(function(it) {
				if (typeof item === 'string') {
					if (typeof it === 'string') {
						if (it === item) return true;
					} else if (it.name === item || it.label === item || it.text === item) {
						return true;
					}
				} else if (isPlainObj(item)) {
					if (typeof it === 'string') {
						
					} else if (item === it) {
						return true;
					}
				}
			});
		}
		return false;
	};
	/**
	 * 
	 * @param {Array} dims the SWOT dimensions to put in the strategy
	 * @param {String} type The type of dimension accepted
	 * @param {SWOT} The SWOT
	 */
	function _match(dims, type, self) {
		function contains(dims, d) {
			var i=0, n = dims.length;
			for (;i<n;i++) {
				if (dims[i].key === d)
					return true;
			}
		}
		var i = 0, n = dims.length, els = self["__" + type + "_"];
		for (;i<n;i++) {
			if (!contains(els, dims[0]))
				throw new Error("Incorrect SWOT dimension of the strategy");
		}
		return this;
	}
	
	p.setStrategies = function(strategies) {
		
		var s = {}, p, v, keys, type, match, inner = ['s', 'w'], outer = ['o', 't'], _strategies, labels;
		if (_strategies = strategies.strategies) {		
			labels = strategies.labels||strategies;
		} else {
			_strategies = strategies;
			labels = {};
		}
		
		if (isPlainObj(_strategies)) {		
			for(key in _strategies) {
				v = _strategies[key];
				keys = key.split(/\s*[:\/+-]\s*/);
				type = undefined;
				keys.forEach(function(k, i) {
					k = k.toLowerCase();
					if (!type) {
						if (inner.indexOf(k[0]) < 0) {
							throw new Error("");
						}
						type = k[0];
					} else if (type.length == 1 && type[0] !== k[0]) {
						if (outer.indexOf(k[0]) < 0) {
							throw new Error("");
						}
						type += k[0];
					} else if (type.length == 2) {
						if (type[1] !== k[0]) {
							throw new Error("Incorrect argument");
						}
					}
					if (match = /(\d+)$/.exec(k)) {
						
					} else {
						throw new Error("Incorrect argument");
					}
				});
				if (type.length != 2) {
					throw new Error("Incorrect argument");
				}
				if (typeof v === 'string' || v instanceof String) {
					v = v.split(/\s*\|\s*/);
				}
				function getLabel(labels, type) {
					var v = labels[type];
					if (v) {
						
					}
					return v;
				}
				function entry(s, type) {
					return s[type]||(s[type] = { strategies: {}, label: getLabel(labels, type)});
				};
				if (isArray(v)) {		
					entry(s, type).strategies[key] = v.length === 1 ? v[0] : v;
				} else if (isPlainObj(v)) {
					entry(s, type).strategies[key] = v;
				} else {
					throw new Error("Incorrect argument");
				}
			}		
			this.__strategies_ =  s;
		} else if (isArray(_strategies)) {
			if (_strategies.length) {
				var internals, externals, innerType, outerType;
				var fields = _strategies[0].internals ? ["internals", "externals"] : _strategies[0].internal ? ["internal", "external"] : ["key"]
				if (fields.length === 1) {
					
				} else {
					_strategies.forEach(function(st) {
						internals = st[fields[0]];
						externals = st[fields[1]];
						if (!isArray(internals)) internals = typeof internals === 'string' ? internals.split(/\|/) : [internals];
						if (!isArray(externals)) externals = typeof externals === 'string' ? externals.split(/\|/) : [externals];
						if (contains(this.__strengths_, internals[0])) {
							innerType = "strengths";
						} else if (contains(this.__weaknesses_, internals[0])) {
							innerType = "weaknesses";							
						} else {
							throw new Error("");
						}
						//check if all internals are strengths or weaknesses defined in 
						//the swot
						_match(internals, innerType, self);
						if (contains(this.__strengths_, externals[0])) {
							outerType = "opportunities";
						} else if (contains(this.__threats_, externals[0])) {
							outerType = "threats"
						} else {
							throw new Error("");
						}
						//check if all internals are opportunities or threats defined in 
						//the swot
						_match(externals, outerType, self);
					});
				}
			}
		}
		
		
		return this;
	};
	
	p.getStrategies = function() {
		return this.__strategies_;
	};
	
	p.getElement = function() {
		if (!this.__built__) this.build();
		return this._element__;
	};
	
	p.getCornerLabel = function() {
		return this.__cornerLabel_;
	};
	
	p.setCornerLabel = function(label) {
		this.__cornerLabel_ = label;
		return this;
	};
	
	p.getInternalLabel = function() {
		return this.__internalLabel_;
	};
	
	p.setInternalLabel = function(label) {
		this.__internalLabel_ = label;
		return this;
	};
	
	p.getExternalLabel = function() {
		return this.__externalLabel_;
	};
	
	p.setExternalLabel = function(label) {
		this.__externalLabel_ = label;
		return this;
	};
	
	var getStyle = SWOTDimension.getStyle;
	
	function buildStrategy(internals, externals, strategy, crossDelim, sref) {
		
		function key(input) {
			var s;
			if (isArray(input)) {
				return input.join("-");
			} else if (typeof input === 'string') {
				return escapeHTML(input);
			} else {
				return toHtml(input);
			}
		}
		
		return "<p><span class=\"num s-ref\"" + sref + ">" + key(internals) 
				+ (crossDelim||"-") 
				+ key(externals) + "</span>: " + toHtml(strategy||"") + "<p>";
	}

	p.build = function(force) {
		var el, tbl, tr, td, body, container;
		var style = this.__style_||{};
		var sref = getStyle(this.sref||this["s-ref"]||this.sRef||this.sreference||this.snum||(style ? style.sref||style.sRef||style['s-ref']||style.sreference||style.num||"" : ""));
		var self = this, 
			addCell,
			colors = this.__colors_,
			cellPadding = this.__cellPadding_,
			q, corner, axis, xAxis, yAxis;
		var s, strategies, crossType, obj, qFields, group, crossDelim = this.__crossDelim_;
		if (colors) {
			q = normalizeColors(isQ(colors) ? colors : colors.quadrants||colors.quadrant||colors.q||colors.strategies||colors.crossing||colors.cross);
			xAxis = normalizeColors(colors.xAxis||colors.x||colors.internal||colors.enterprise||colors.entreprise);
			yAxis = normalizeColors(colors.yAxis||colors.y||colors.external||colors.environment||colors.environement);			
			axis = normalizeColors(colors.axis||colors.axes||color.axe||colors.analyzes||colors.analyze);   
			corner = normalizeColors(colors.corner)||axis;
		}
		if (this.__built__ && !force) return this;
		container = this.__container_;
		if (this.__id_) {
			el = document.getElementById(this.__id_);
			if (el) {
				el.innerHTML = "";
				if (container) {
					container.appendChild(el);
				}
			} else {
				el = document.createElement("div");
				el.id = this.__id_;
				(container||document.getElementsByTagName("body")[0]).appendChild(el);
			}
		} else {
			el = document.createElement("div");
			(container||document.getElementsByTagName("body")[0]).appendChild(el);
		}
		tbl = document.createElement("table");
		
		body = [document.createElement("tr"), document.createElement("tr")];
		strategies = this.__strategies_;
		crossType = this.crossType || strategies;
		var cellPadding = this.__cellPadding_;
		if (crossType) {
			s = obj = this.__strategies_||{};
			qFields = [ "so", "wo",  "st", "wt"];
			group = this.getExternalLabel() || this.getInternalLabel() ? true : false;
			if (group) {
				tr = document.createElement("tr");
				
				td = document.createElement("td");
				addCssClass(td, "corner");
				setColors(td, corner);
				setPadding(td, cellPadding);
				td.colSpan = 2;
				td.rowSpan = 2;
				td.style.textAlign = "center";
				td.innerHTML = toHtml(this.getCornerLabel()||"");
				tr.appendChild(td);
				
				td = document.createElement("td");
				addCssClass(td, "enterprise");
				setColors(td, xAxis||axis);
				setPadding(td, cellPadding);
				td.colSpan = 2;
				td.style.textAlign = "center";
				td.innerHTML = toHtml(this.getInternalLabel()||"Enterprise");
				tr.appendChild(td);
				tbl.appendChild(tr);
				tr = document.createElement("tr");
			} else {
				rowSpan = 1;
				tr = document.createElement("tr");
				td = document.createElement("td");
				addCssClass(td, "corner");
				setColors(td, corner);
				setPadding(td, cellPadding);
				td.innerHTML = toHtml(this.getCornerLabel()||"");
				tr.appendChild(td);
			}
			
			
			
			td = document.createElement("td");
			addCssClass(td, "enterprise");
			setColors(td, xAxis||axis);
			setPadding(td, cellPadding);
			td.innerHTML = toHtml(this.__strengths_||this.strengthsLabel||"Strengths", this.__style_);
			tr.appendChild(td);
			
			td = document.createElement("td");
			addCssClass(td, "enterprise");
			setColors(td, xAxis||axis);
			setPadding(td, cellPadding);
			td.innerHTML = toHtml(this.__weaknesses_||this.weaknessesLabel||"Weaknesses", this.__style_);
			tr.appendChild(td);
			
			tbl.appendChild(tr);

			if (group) {
				td = document.createElement("td");
				addCssClass(td, "environment");
				setColors(td, yAxis||axis);
				setPadding(td, cellPadding);
				td.rowSpan = 2;
				var txt = document.createElement("span");
				txt.innerHTML = toHtml(this.getExternalLabel()||"Environnement");
				if (this.__environmentTextOrientation_ === 'vertical') {
					addCssClass(txt, 'vertical');
				}
				document.getElementsByTagName("body")[0].appendChild(txt);
				var w = CssBoxModel.width(txt);
				var h = CssBoxModel.height(txt);
				txt.style.width = w + 'px';
				txt.style.height = h + 'px';
				td.appendChild(txt);
				td.style.width = h + 'px';
				body[0].appendChild(td);
			}
			
			td = document.createElement("td");
			addCssClass(td, "environment");
			setColors(td, yAxis||axis);
			setPadding(td, cellPadding);
			td.innerHTML = toHtml(this.__opportunities_||this.opportunitiesLabel||"Opportunities", this.__style_);
			body[0].appendChild(td);
			
			td = document.createElement("td");
			addCssClass(td, "environment");
			setColors(td, axis);
			setPadding(td, cellPadding);
			td.innerHTML = toHtml(this.__threats_||this.threatsLabel||"Threats", this.__style_);
			body[1].appendChild(td);
			var key, keyField, v, strategy, internals, externals;
			addCell = function(field, r, c) {
				var s, html;
				td = document.createElement("td");
				addCssClass(td, "quadrant " + field);
				setColors(td, normalizeColors(getQ(q, r, c)));
				setPadding(td, cellPadding);
				s = obj[field];
				if (s.strategies) {
					s = s.strategies;
				}
				if (isPlainObj(s)) {
					html = "";
					for (var k in s) {
						html += "<p><span class=\"num s-ref\"" + sref + ">" + k + "</span>: " + toHtml(s[k]||"") + "<p>";
					}
					td.innerHTML = html;
				} else if (isArray(s)) { 
					if (s.length) {
						v = s[0];
						if (keyField = v.key ? "key" : v.reference ? "reference" : v.ref ? "ref" : v.num ? "num" : undefined) {
							s.forEach(function(st) {
								key = st[keyField];
								
							});
						} else if (st.internals) {
							s.forEach(function(st) {
								html += buildStrategy(st.internals, st.externals, st.strategy||st.text||st.description, crossDelim, sref);
							});
						} else {
							s.forEach(function(st) {
								html += buildStrategy(st.internal, st.external, st.strategy||st.text||st.description, crossDelim, sref);
							});
						}
					}
				} else {
					td.innerHTML = toHtml(s||"");
				}
				body[r].appendChild(td);
			}			
		} else {
			obj = this;
			qFields = [ "strengths", "weaknesses", "opportunities",  "threats"];
			addCell = function(field, r, c) {
				td = document.createElement("td");
				var el = document.createElement("div");
				var tit = document.createElement("div");
				tit.innerHTML = toHtml(obj[field + "Label"]||(field[0].toUpperCase() + field.substring(1)));
				var content = document.createElement("div");
				content.innerHTML = toHtml(obj[field]||"");
				el.appendChild(tit);
				el.appendChild(content);
				addCssClass(td, "quadrant " + field);
				setColors(td, normalizeColors(getQ(q, r, c)));
				setPadding(td, cellPadding);
				td.appendChild(td);
				body[r].appendChild(td);
			};
		} 
		
		addCell(qFields[0], 0, 0)
		addCell(qFields[1], 0, 1);
		
		tbl.appendChild(body[0]);
		
		addCell(qFields[2], 1, 0);
		addCell(qFields[3], 1, 1);
		
		tbl.appendChild(body[1]);
		
		addCssClass(el, "SereniX-swot" + (this.crossType ? " cross" : ""));
		el.appendChild(tbl);
		this._element__ = el;
		return this;
	};
	
	setObjProps(p, ["strategies", "id", "strengths", "weaknesses", "opportunities", "threats"]);
	
	SWOT.COLORS = colors;
	
	SWOT.cssText = cssText;
	
	SWOT.getQVal = getQVal;
	
	SWOT.isQ = isQ;
	
	SWOT.setPadding = setPadding;
	SWOT.setMargin = setMargin;
	
	SWOT.BLUE = SWOTDimension.BLUE;
	
	SWOT.AFRIKPAY_BLUE = SWOTDimension.AFRIKPAY_BLUE;
	
	SWOT.getStyle =  SWOTDimension.getStyle;
	
	addToNS(SWOT, SereniX.ui);

	return SWOT;
});
