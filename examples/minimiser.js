
requireBase = 'lib/uglify-js';
require('uglify-js.js');
var uglify = module.exports;

(function() {

    var javascript = readFile("lib/underscore.js");

    // Uncomment to print minimised version of underscore.js
    // print(uglify(javascript));

    print("This takes a while...");
    benchmark(8000, function() {
        uglify(javascript);
    });

})();
