import jdk.nashorn.api.scripting.JSObject;
import javax.script.Bindings;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineFactory;
import javax.script.ScriptEngineManager;

public class JSObjectTest {

    final static ScriptEngineManager m = new ScriptEngineManager();
    final static ScriptEngine e = m.getEngineByName("nashorn");

    public static void main(String[] args) throws Exception {
        try {
            e.eval("var obj = { '1': 'world', func: function() { return this.bar; }, bar: 'hello' }");
            JSObject obj = (JSObject) e.get("obj");

            // try basic get on existing properties
            if (! obj.getMember("bar").equals("hello")) {
                fail("obj.bar != 'hello'");
            }

            if (! obj.getSlot(1).equals("world")) {
                fail("obj[1] != 'world'");
            }

            if (! obj.call("func", new Object[0]).equals("hello")) {
                fail("obj.call('func') != 'hello'");
            }

            // try setting properties
            obj.setMember("bar", "new-bar");
            obj.setSlot(1, "new-element-1");
            if (! obj.getMember("bar").equals("new-bar")) {
                fail("obj.bar != 'new-bar'");
            }

            if (! obj.getSlot(1).equals("new-element-1")) {
                fail("obj[1] != 'new-element-1'");
            }

            // try adding properties
            obj.setMember("prop", "prop-value");
            obj.setSlot(12, "element-12");
            if (! obj.getMember("prop").equals("prop-value")) {
                fail("obj.prop != 'prop-value'");
            }

            if (! obj.getSlot(12).equals("element-12")) {
                fail("obj[12] != 'element-12'");
            }

            // delete properties
            obj.removeMember("prop");
            if ("prop-value".equals(obj.getMember("prop"))) {
                fail("obj.prop is not deleted!");
            }

            // Simple eval tests
            //assertEquals(obj.eval("typeof Object"), "function");
            //assertEquals(obj.eval("'nashorn'.substring(3)"), "horn");
        } catch (final Exception exp) {
            exp.printStackTrace();
            fail(exp.getMessage());
        }
    }

    private static void fail(String failedString) {
        System.out.println(failedString);
    }
}