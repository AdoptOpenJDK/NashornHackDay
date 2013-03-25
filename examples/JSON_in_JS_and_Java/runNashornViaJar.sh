# Script is expecting the "nashorn.jar" to be present in the folder called 'nashorn' and "JSON.jar" in 'JSON-java' in the current path
# Another way to run nashorn using the -jar parameter: java -jar nashorn/dist/nashorn.jar $1
#
#java -cp JSON-java/JSON.jar:$HOME/sources/nashorn-hackday/nashorn/dist/nashorn.jar jdk.nashorn.tools.Shell $1

java -jar JSON-java/JSON.jar: $HOME/sources/nashorn-hackday/nashorn/dist/nashorn.jar $1
