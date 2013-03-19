
var inputFilename = "test-data/example.jpeg";
var outputFilename = 'resized-image.jpeg';

var java = new JavaImporter(java.io, java.lang, java.util, java.awt, java.awt.image, javax.imageio);

// Using the 'with' keyword is a horrid JavaScript feature, but it allows you use avoid
// prefixing every Java class with "java." Do not use 'with' in your code. I'm mildly
// surprised at myself for using it here.
with(java) {
    var image = ImageIO.read(new File(inputFilename));
    var imageScaled = image.getScaledInstance(
            image.getWidth() / 2,
            image.getHeight() / 2,
            Image.SCALE_SMOOTH
        );
    var imageOutput = new BufferedImage(image.getWidth() / 2, image.getHeight() / 2, BufferedImage.TYPE_INT_RGB);
    var graphics = imageOutput.createGraphics();
    graphics.drawImage(imageScaled, 0, 0, null);
    graphics.dispose();

    var iter = ImageIO.getImageWritersByFormatName("jpeg");
    if(iter.hasNext()) {
        var writer = iter.next();
        var outFile = new File(outputFilename);
        if(outFile.exists()) { outFile.delete(); }
        var output = ImageIO.createImageOutputStream(outFile);
        writer.setOutput(output);
        // TODO: Work out why you can't use null instead of the new ArrayList(), new IIOMetadata(), like this:
        //   writer.write(new IIOImage(imageOutput, null, null));
        // and why this doesn't work either:
        //   writer.write(new IIOImage(imageOutput, new ArrayList(), new IIOMetadata()));
        writer.write(imageOutput);
        output.close();
        print("Wrote resized image to "+outputFilename);
    }
}
