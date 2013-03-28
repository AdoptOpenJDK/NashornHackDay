package perf.gc;

import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

/**
 *
 * @author openjdk
 */
public class Monitor {

    private static final ScheduledExecutorService scheduler =
            Executors.newScheduledThreadPool(4);
    private Probe probe;

    public static void shutdown() {
        scheduler.shutdown();
    }

    public static class Check {
    }

    public static interface Probe {

        void run(Check check);
    }

    public static class Builder {

        private Monitor monitor = new Monitor();

        public static Builder get() {
            return new Builder();
        }

        public static Builder getDefaultMonitor() {
            Builder builder = new Builder();
            builder.onCheck(getMemoryProbe());
            return builder;
        }

        public Monitor start() {
            scheduler.scheduleAtFixedRate(new Runnable() {
                @Override
                public void run() {
                    monitor.probe.run(new Check());
                }
            }, 0, 1, TimeUnit.SECONDS);
            return monitor;
        }

        public Builder onCheck(Probe probe) {
            monitor.probe = probe;
            return this;
        }

        public static Probe getMemoryProbe() {
            return new Probe() {
                private DecimalFormat df;

                {
                    DecimalFormatSymbols unusualSymbols = new DecimalFormatSymbols();
                    unusualSymbols.setGroupingSeparator(' ');
                    df = new DecimalFormat("#,###", unusualSymbols);
                }

                @Override
                public void run(Check check) {
                    Runtime runtime = Runtime.getRuntime();
                    int norm = 1024;
                    System.out.println("Used Memory: " + df.format((runtime.totalMemory() - runtime.freeMemory()) / norm) + "kB");
                }
            };
        }
    }
}
