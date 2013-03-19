
// Check the bootstrap.js script for syntax errors:

// Set the script 'arguments' like Rhino would...
var arguments = ['lib/hackday/bootstrap.js'];

// Then run the script.
// It's unmodified, except for adding '// ' to the very beginning of the script as Nashorn doesn't ignore
// first lines which start with '#!'
load("lib/jshint-rhino-1.1.0.js");
