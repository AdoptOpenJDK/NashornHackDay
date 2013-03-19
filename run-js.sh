#!/bin/sh

# Script to simplify running the same code on both Nashorn and Rhino.
# Assumes Nashorn is built next to the directory containing this script.

IMPLEMENTATION=$1
shift

case $IMPLEMENTATION in
'nashorn')
    sh ../nashorn/bin/jjs lib/hackday/bootstrap.js $*
    ;;
'rhino')
    java -cp rhino-js/js.jar org.mozilla.javascript.tools.shell.Main lib/hackday/bootstrap.js $*
    ;;
*)
    echo "Usage: run-js.sh nashorn|rhino file1.js [file2.js, ...]"
    exit 1
    ;;
esac
