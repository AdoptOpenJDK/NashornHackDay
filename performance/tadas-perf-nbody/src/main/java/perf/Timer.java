package perf;


import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;

/**
 *
 * @author openjdk
 */
public class Timer {

    private long startTime;
    private long lapTime;

    public static Timer start() {
        Timer timer = new Timer();
        timer.startTime = System.currentTimeMillis();
        return timer;
    }

    public Timer lap() {
        Timer timer = new Timer();
        timer.startTime = startTime;
        timer.lapTime = System.currentTimeMillis();

        return timer;
    }

    @Override
    public String toString() {
        if (lapTime < 1000) {
            throw new IllegalStateException("This timer doesn't lap time");
        }
        DecimalFormatSymbols unusualSymbols = new DecimalFormatSymbols();
        unusualSymbols.setGroupingSeparator(' ');
        DecimalFormat df = new DecimalFormat("#,###", unusualSymbols);
        return "Timer-Lap: " + df.format((lapTime - startTime)) + "ms";
    }
}
