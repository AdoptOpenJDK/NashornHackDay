
import java.io.*;

import javax.script.*;

class TestInterop
{
    // This uses the scripting API, but is there more oppourtunity for exciting code if you use
    // the internal API? Look at jdk.nashorn.tools.Shell as an example.

    // See nashorn/docs/JavaScriptingProgrammersGuide.html for docs on the scripting engine.

    public static void main(String[] args) throws Exception
    {
        ScriptEngineManager factory = new ScriptEngineManager();
        ScriptEngine engine = factory.getEngineByName("nashorn");
        engine.eval(new java.io.FileReader("script.js"));
        // Fetch the value of a variable
        System.out.println("nashornVariable = "+engine.get("nashornVariable"));
        // Invoke a function
        Invocable inv = (Invocable)engine;
        System.out.println("nashornTestFunction returned: "+inv.invokeFunction("nashornTestFunction", "Something"));
    }
}
