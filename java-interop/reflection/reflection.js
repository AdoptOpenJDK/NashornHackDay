var ctx = {types : {}};

// This function returns a data structure of methods available on the 
// typeName passed in
//
// NOTE: As of 2013-03-24, describe() does not work correctly, due to what look like
// flaws in the handling of hosted Java objects. describe2(), with related functionality
// does work (but of course only provides counts of objects)
// 
function describe(typeName) {
    var clzT = Java.type("java.lang.Class");

    var meths = clzT.forName(typeName).getMethods();
    
    if (typeof ctx.types[typeName] === "undefined")
	ctx.types[typeName] = {};

    var p = {"a" : "b"}; // works
    var o = new java.lang.Object(); // doesn't work
    for (var i=0; i<meths.length; i++) {
	var m = meths[i];
	var mname = m.getName();
	if (typeof ctx.types[typeName][mname] === "undefined") {
	    print(m); // try to debug what's going on
	    ctx.types[typeName][mname] = [];
	    print(ctx.types[typeName][mname]); // try to debug what's going on
	}
	ctx.types[typeName][mname].push(m); // using p works, but o or m doesn't
    }

    return ctx.types[typeName];
}

function describe2(typeName) {
    var clzT = Java.type("java.lang.Class");

    var meths = clzT.forName(typeName).getMethods();
    
    if (typeof ctx.types[typeName] === "undefined")
	ctx.types[typeName] = {};

    var p = {"a" : "b"}; // works
    var o = new java.lang.Object();
    for (var i=0; i<meths.length; i++) {
	var m = meths[i];
	var mname = m.getName();
	if (typeof ctx.types[typeName][mname] === "undefined") {
	    ctx.types[typeName][mname] = 0;
	}
	ctx.types[typeName][mname]++;
    }

    return ctx.types[typeName];
}


//describe("java.lang.String"); 

describe("java.lang.Object");

//describe2("java.lang.Object");

print(JSON.stringify(ctx));
