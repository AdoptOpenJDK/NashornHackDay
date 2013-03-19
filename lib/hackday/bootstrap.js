
// Simple implementation of enough of the Node.js modules system to load some library scripts.
// Hopefully it'll work well enough to try out various JavaScript libraries, but this is
// not guaranteed.
var module = {};
var exports = undefined; // should get a warning from JSHint
var requireBase = '';
var requireLoaded = {};
var require = function(filename) {
    if(!/\.js$/i.test(filename)) {
        filename += '.js';
    }
    var path = filename.split('/');
    var moduleName = path.pop();
    if(moduleName in requireLoaded) {
        return requireLoaded[moduleName];
    }
    // Load JS file
    var oldBase = requireBase;
    try {
        if(path.length > 0) {
            requireBase = requireBase + '/' + path.join('/');
        }
        var loaderExports = {};
        requireLoaded[moduleName] = loaderExports;
        exports = loaderExports;
        load(requireBase+'/'+moduleName);
        exports = undefined;
    } finally {
        requireBase = oldBase;
    }
    return requireLoaded[moduleName];
};

// Simple benchmarking function:
//   maxRuntime - run for at least this number of ms
//   fn - function to benchmark
var benchmark = function(maxRuntime, fn) {
    // Run function once to warm up
    fn();
    var startTime = (new Date()) * 1;
    var totalTime;
    var runs = 0;
    // Loop until maxRuntime is exceeded
    do {
        fn();
        runs++;
        totalTime = (new Date()) - startTime;
    } while(totalTime < maxRuntime);
    print("Time per execution: "+(totalTime / runs)+"ms");
};

// Provide a readFile function for Nashorn
if(typeof(readFile) !== 'function') {
    var rf_imports = new JavaImporter(java.io, java.lang, java.util);
    readFile = function(filename) {
        var br = new rf_imports.BufferedReader(new rf_imports.FileReader(filename));
        var sb = new rf_imports.StringBuilder();
        var line;
        while((line = br.readLine()) !== null) {
            sb.append(line);
            sb.append("\n");
        }
        br.close();
        return sb.toString();
    };
}

// In Rhino, load all the scripts on the command line
if(typeof(version) === 'function') {
    if(arguments.length === 0) {
        print("No script files to load specified on command line");
    } else {
        load(arguments);
    }
}
