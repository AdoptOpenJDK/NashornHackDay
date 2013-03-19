NashornHackDay
==============

A repo for build instructions &amp; materials related to Nashorn HackDays.

Contents
--------

 * This file - instructions for installing a Java 8 snapshot and building Nashorn on various platforms
 * run-js.sh - a shell script to normalise the command line and environment for the Nashorn and Rhino interpreters
 * lib/* - various JavaScript libraries suitable for experimentation
 * examples/* - a few example scripts to get us going.

Running a script
----------------

After building Nashorn,

    ./run-js.sh nashorn examples/run-jshint.js
    ./run-js.sh rhino examples/run-jshint.js

will check a script for errors using JSHint. The first command uses Nashorn, the second Rhino.

Installation and building
=========================

Mac OS X
--------

Download the Java 8 snapshot JDK dmg file from http://jdk8.java.net/download.html

Install. Note that this will set your system JDK to use this snapshot instead of any other JDK, so edit your .bash_profile file to include a line like

    export JAVA_HOME=`/usr/libexec/java_home -v 1.7`

Change '1.7' to whichever version you want to use and have installed. Use 1.6 for the Mac OS default Java install.

You'll also want to disable the Java browser plugin for obvious reasons. Go to *System Preferences*, click on the *Java* icon at the bottom, click the *Security* tab, uncheck "Enable Java content in browser", and click *Apply*.

Make a directory to work in.

    mkdir ~/nashorn-hackday
    cd nashorn-hackday

Clone the Nashorn repo as ~/nashorn-hackday/nashorn . To avoid having to install command line tools for Mercurial, use http://www.sourcetreeapp.com/ . Run SourceTree, click the + icon at the left of the toolbar, and use this URL:

    http://hg.openjdk.java.net/nashorn/jdk8/nashorn

Set the location to /Users/yourname/nashorn-hackday/nashorn (where yourname is your username).

Get ANT from http://ant.apache.org/bindownload.cgi , unpack into ~/nashorn-hackday to get ~/nashorn-hackday/apache-ant-1.9.0

Get TestNG

    curl http://testng.org/testng-6.8.zip > testng-6.8.zip
    unzip testng-6.8.zip
    cp testng-6.8/testng-6.8.jar nashorn/test/lib/testng.jar

And then you're ready to build Nashorn!

Get your environment ready:

    export JAVA_HOME=`/usr/libexec/java_home -v 1.8`
    export PATH=$PATH:~/nashorn-hackday/apache-ant-1.9.0/bin

and then build Nashorn:

    cd nashorn
    cd make
    ant clean; ant

Then you're ready to go... Make sure this repo is cloned to ~/nashorn-hackday/NashornHackDay, then try running a script

    cd ~/nashorn-hackday/NashornHackDay
    ./run-js.sh nashorn examples/run-jshint.js


Linux
-----

Install mercurial and ant using your package manager.

Make a directory to work in:

    mkdir ~/nashorn-hackday
    cd nashorn-hackday

Get an Oracle snapshot of the 32 or 64 bit JDK, depending on your platform, from http://jdk8.java.net/download.html , and unpack it to the nashorn-hackday directory.

Clone Nashorn:

   hg clone http://hg.openjdk.java.net/nashorn/jdk8/nashorn nashorn

Get TestNG

    wget http://testng.org/testng-6.8.zip
    unzip testng-6.8.zip
    cp testng-6.8/testng-6.8.jar nashorn/test/lib/testng.jar

Get your environment ready:

    export PATH=~/nashorn-hackday/jdk1.8.0/bin:$PATH
    export JAVA_HOME=~/nashorn-hackday/jdk1.8.0
    export _JAVA_OPTIONS=-Xmx2048M

And build Nashorn!

    cd ~/nashorn-hackday/nashorn
    cd make
    ant clean; ant
