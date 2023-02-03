// const PDFDocument = require('pdfkit');
const PDFDocument = require("pdfkit-table");
const blobStream  = require('blob-stream');
const template = require('./template')
const filesaver = require('file-saver');

module.exports = function bar() {
  
  
  // create a document the same way as above
  const doc = new PDFDocument({ 
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
});
  
  // pipe the document to a blob
  const stream = doc.pipe(blobStream());

  // add your content to the document here, as usual
  const section1 = doc.struct('Sect', [
    doc.struct('H', 
        doc.text("wjnfweojfnwejf weojnfowjen", {
            align: 'center',
            bold: true
        })
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
        }, {
            width: 300
        })
    )
])

doc.addStructure(section1)


  // get a blob when you're done
  doc.end();
  stream.on('finish', function() {
    // get a blob you can do whatever you like with
    const blob = stream.toBlob('application/pdf');

    // or get a blob URL for display in the browser
    const url = stream.toBlobURL('application/pdf');

    const iframe = document.getElementById('mm')
    iframe.src = url;

    filesaver.saveAs(blob, 'output.pdf')
  });
 
   
  }
