package com.github.tasubo.adoptjdk;


import perf.Timer;
import java.io.*;

import javax.script.*;
import perf.gc.Monitor;

class JsNBody {

    public static void main(String[] args) throws Exception {
        
        System.setProperty("rhino.opt.level", "0");

        Monitor.Builder.getDefaultMonitor().start();
        
        System.out.println(new File(".").getAbsolutePath());

        Reader script = new InputStreamReader(JsNBody.class.getResourceAsStream("/NBody.js"));

        ScriptEngineManager factory = new ScriptEngineManager();
        ScriptEngine engine = factory.getEngineByName("nashorn");

        if (engine == null) {
            throw new RuntimeException("ScriptEngine not found");
        }

        engine.eval(script);
        Invocable inv = (Invocable) engine;
        
        Timer timer = Timer.start();
        inv.invokeFunction("NBody");
        System.out.println("\n" + timer.lap());
        System.exit(0);
    }
}
