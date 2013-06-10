import javax.script.*;

import jdk.nashorn.api.scripting.JSObject;
import jdk.nashorn.internal.runtime.ScriptObject;
import jdk.nashorn.internal.runtime.ScriptRuntime;
import static jdk.nashorn.internal.runtime.ECMAErrors.typeError;
import static jdk.nashorn.internal.runtime.ScriptRuntime.UNDEFINED;

import java.util.List;

public class JSJSONInJava {
	public static void main(String[] args) throws Exception {
		// create a script engine manager
		ScriptEngineManager factory = new ScriptEngineManager();
		
		if (factory != null) {
			// create a Javascript engine
			ScriptEngine engine = factory.getEngineByName("nashorn");
			
			if (engine != null) {
				// evaluate JavaScript code from file 
				engine.eval(new java.io.FileReader("JSON_to_JS_and_Java.js"));

				// fetch the value of a variable
				Object objFromJS = engine.get("JSONObjectUsingJavaScript");
				System.out.println("objFromJS = " + objFromJS);
				JSObject jsonObjFromJS = (JSObject)objFromJS;
				System.out.println("JSONObjectUsingJavaScript = " + jsonObjFromJS);
				System.out.println("JSONObjectUsingJavaScript.name = " + jsonObjFromJS.getMember("name"));

				JSObject objectArray = (JSObject) jsonObjFromJS.getMember("messages");
				long msgArrayLength = (Long) objectArray.getMember("length");
                                for (int i=0; i<msgArrayLength; i++) {
                                    System.out.format("\tmessages (element %d) = %s%n", i, objectArray.getSlot(i));
                                }
                       }
 		} else {
			System.out.println("No factory object has been created.");
		}
	}
}
