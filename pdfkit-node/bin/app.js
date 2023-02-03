//const PDFDocument = require('pdfkit');
const PDFDocument = require("pdfkit-table");
const fs = require('fs');
const path = require('path')
const open = require('open')

const options = { 
    margin: 30, 
    size: 'A4',
    pdfVersion: '1.5',
    lang: 'en-US',
    tagged: true,
    displayTitle: true,
    info: {
        Title: "Test PDF",
        Subject: "508 Compliance",
        Author: "Brett Mosley"
    }
}

const outputPath = path.resolve("./dist")
if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath)
}
// Create a document
const doc = new PDFDocument(options);

// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
doc.pipe(fs.createWriteStream(`${outputPath}/output.pdf`));

const section1 = doc.struct('Sect', [
    doc.struct('H', 
        doc.text("wjnfweojfnwejf weojnfowjen")
    ),
    doc.struct('L', doc.list(['ffffff', 'dddddddd', 'ssssssss'])),
    doc.struct('P', doc.text('jownefojnofjnwefj')),
    // doc.struct('Table', doc.table({
    //     title: "Title",
    //     subtitle: "Subtitle",
    //     headers: [ "Country", "Conversion rate", "Trend" ],
    //     rows: [
    //       [ "Switzerland", "12%", "+1.12%" ],
    //       [ "France", "67%", "-0.98%" ],
    //       [ "England", "33%", "+4.44%" ],
    //     ],
    //   },{
    //     width: 600
    // }))
    doc.struct('Table', doc.table({
        title: "Title",
        subtitle: "Subtitle",
        headers: [ "Country", "Conversion rate", "Trend" ],
        rows: [
          [ "Switzerland", "12%", "+1.12%" ],
          [ "France", "67%", "-0.98%" ],
          [ "England", "33%", "+4.44%" ],
        ],
      },{
        width: 600
    }))
])
doc.addStructure(section1)
//*************************** */
// // Embed a font, set the font size, and render some text
// // doc
// //   .font('fonts/Arial.ttf')
// //   .fontSize(25)
// //   .text('Some text with an embedded font!', 100, 100);

// // Add an image, constrain it to a given size, and center it vertically and horizontally
// // doc.image('path/to/image.png', {
// //   fit: [250, 300],
// //   align: 'center',
// //   valign: 'center'
// // });

// // Add another page
// doc
//   //.addPage()
//   .fontSize(25)
//   .text('Here is some vector graphics...', 100, 100);

// // Draw a triangle
// // doc
// //   .save()
// //   .moveTo(100, 150)
// //   .lineTo(100, 250)
// //   .lineTo(200, 250)
// //   .fill('#FF3300');

// // Apply some transforms and render an SVG path with the 'even-odd' fill rule
// doc
//   .scale(0.6)
//   .translate(470, -380)
//   .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
//   .fill('red', 'even-odd')
//   .restore();

// // Add some text with annotations
// doc
//   .addPage()
//   .fillColor('blue')
//   .text('Here is a link!', 100, 100)
//   .underline(100, 100, 160, 27, { color: '#0000FF' })
//   .link(100, 100, 160, 27, 'http://google.com/');

// Finalize PDF file
doc.end();

open('file:///'+ `${outputPath}/output.pdf`)