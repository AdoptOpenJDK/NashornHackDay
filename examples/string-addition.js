
(function() {

    benchmark(1000, function() {
        var s = '';
        for(var i = 0; i < 1000; ++i) {
            s += ':'+i;
        }
    });

})();

