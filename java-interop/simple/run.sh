#!/bin/sh

CLASSPATH=../../../nashorn/dist/nashorn.jar:.
export CLASSPATH

javac TestInterop.java
java TestInterop
