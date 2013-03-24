import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.List;
import java.util.concurrent.BrokenBarrierException;
import java.util.concurrent.CyclicBarrier;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineFactory;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

public class TestInParallel {

    public static class Executor implements Runnable {

        private ScriptEngine engine;

        private CyclicBarrier barrier;

        public Executor(ScriptEngine engine, CyclicBarrier barrier) {
            this.engine = engine;
            this.barrier = barrier;
        }

        private void log(String s) {
            // TODO
            System.out.println(engine.getFactory().getEngineName() + ": " + s);
        }

        @Override
        public void run() {

            try {
                log("Ready!");

                barrier.await();

                long start = System.currentTimeMillis();

                // TODO: move this out
                new java.io.File(".").getAbsolutePath();
                engine.eval(new FileReader("./script.js"));

                log("Finished in " + (System.currentTimeMillis() - start) + " ms.");

            } catch (InterruptedException | BrokenBarrierException | ScriptException | FileNotFoundException ex) {
                log(ex.getMessage());
            }

        }
    }

    public static void main(String... args) {

        List<ScriptEngineFactory> factories = new ScriptEngineManager().getEngineFactories();

        CyclicBarrier b = new CyclicBarrier(factories.size(), new Runnable() {
            @Override
            public void run() {
                System.out.println("Everybody start!");
            }
        });

        for (ScriptEngineFactory factory : factories) {
            new Thread(new Executor(factory.getScriptEngine(), b)).start();
        }

    }
}
