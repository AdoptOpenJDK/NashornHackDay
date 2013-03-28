import javax.script.*;

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
				Object jsonObjFromJS = engine.get("JSONObjectUsingJavaScript");
				System.out.println("JSONObjectUsingJavaScript = " + jsonObjFromJS);
			} else {
				System.out.println("No engine object has been created.");
			}
		} else {
			System.out.println("No factory object has been created.");
		}
	}
}
