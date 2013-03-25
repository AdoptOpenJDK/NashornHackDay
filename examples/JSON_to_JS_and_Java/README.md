Create JSON Objects in Javascript and Java
==========================================

A repo for containing an example of how to create a JSON object using an external Javascript library and Java library/class in Nashorn.

Contents
--------
 * JSON-java - repo containing JSONObject class implemented in Java to be used as a Java library.
 
 * JSON-js - repo containing JSONObject class implemented in Javascript to be used as a Javascript library.
 
 * JSONObjectClient.java - a client implementation of the class JSONObject in Java.
 
 * JSON_to_JS_and_Java.js	- javascript implementation of creating a JSON object from Javascript and Java using external libraries.
 
 * JSON_to_JS_and_Java_benchmark.js - benchmarking the created JSON object.

How to use
----------
    $ java -cp JSON-java/JSON.jar:<location to nashorn repo>/nashorn/dist/nashorn.jar jdk.nashorn.tools.Shell JSON_to_JS_and_Java.js

or

    $ java -cp JSON-java/JSON.jar:<location to nashorn repo>/nashorn/dist/nashorn.jar jdk.nashorn.tools.Shell JSON_to_JS_and_Java_benchmark.js


Note: JS in this context means javascript on the Nashorn platform.
