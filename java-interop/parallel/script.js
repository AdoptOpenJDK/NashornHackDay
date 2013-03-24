function fib(n) {
    if (n == 0 || n == 1) {
        return n;
    } else {
        return n + fib(n - 1);
    }

}

java.lang.System.out.println(fib(10));