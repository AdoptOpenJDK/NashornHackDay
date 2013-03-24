This code makes use of http://benchmarksgame.alioth.debian.org/u64q/benchmark.php?test=nbody&lang=java code for n-body problem simulation.

I've converted Java code to Javascript code with as little changes as possible.


A few interesting results for running 500000 iterations:
 + Rhino (no optimizations): takes ~50s and uses 7MB max RAM
 + Rhino (with opt): takes ~5.5s and uses 95MB max RAM
 + Nashorn: ~14.3s; 52MB max RAM
 + V8 (from NodeJS, includes JVM for memory): ~0.5s; 13MB max RAM
 + Java: 0.118s, 0.8MB RAM


By no means these numbers can be taken for granted but it does provide a few general insights


