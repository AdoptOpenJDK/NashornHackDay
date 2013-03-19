
load("lib/handlebars.js");

(function() {

    var templateSource = '<div class="template"><a href="{{link}}">{{title}}</a></div>';
    var template = Handlebars.compile(templateSource);

    benchmark(1000, function() {
        for(var i = 0; i < 1000; ++i) {
            var html = template({
                link: "/link/to/page/"+i,
                title: "Page "+i
            });
        }
    });

})();
