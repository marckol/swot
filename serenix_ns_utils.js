if (typeof globalNS === 'undefined') {
	globalNS = typeof window !== 'undefined' ? window :
				typeof global !== 'undefined' ? global :
				typeof self !== 'undefined' ? self : this;
}

if (typeof SereniX === 'undefined') {
	SereniX = { ui: {}};
} else if (typeof SereniX.ui === 'undefined') {
	if (typeof SereniX.Namespace === 'function') {
		SereniX.Namespace.ns("SereniX.ui");
	} else {
		SereniX.ui = {};
	}
}

function addToNS(c, ns) {	
	if (typeof SereniX.Namespace === 'function') {
		if (ns instanceof SereniX.Namespace) {
			return ns.addChild(c);
		} else if (typeof ns === 'string') {
			return SereniX.Namespace.ns(ns).addChild(c);
		}
	} else {
		var o;
		if (typeof ns === 'string') {
			o = globalNS;
			ns.split(".").forEach(function(token, i) {
				o = o[token];
			});
			ns = o;
		}		
	}
	ns[c.__CLASS_NAME__||c.name] = c;
	return ns;
}

function $def($0, $1) {
	var name, val;
	if (typeof $0 === 'string') {
		name = $0;
		val = $1;
	} else {
		name = $1;
		val = $0;
	}
	if (!name && typeof val === 'function') {
		name = val.__CLASS_NAME__||val.name||val.Name;
	}
	(function(root, name, factory) {
		if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
			module.exports = val;
		} else if (typeof define === 'function' && define.amd) {
			define([name], (function() { return val;})());
		} else {
			root[name] = val;
		}
		
	})(this, name);
}

if (typeof def === 'function') def = $def;

if (typeof jQuery !== 'undefined') {
	jQuery.def = $def;
} else if (typeof $ !== 'undefined') {
	$.def = $def;
	if (typeof $.define == 'undefined') {
		$.define = $def;
	}
}

if (typeof SereniX == 'undefined') {
	SereniX = {};
}

SereniX.define = $def;

SereniX.def = $def;