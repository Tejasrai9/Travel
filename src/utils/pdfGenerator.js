import PDFDocument from 'pdfkit';
import fs from 'fs';

// Modified to accept trNumber as an additional parameter
export function generatePDF(formData, userEmail, trNumber, callback) {
  const doc = new PDFDocument({ margin: 50 });
  const pdfPath = `./tmp/approval-request-${trNumber}-${Date.now()}.pdf`; // Adjust path as needed

  doc.pipe(fs.createWriteStream(pdfPath));

  // Document Header
  doc.image('public/pics/logo.jpg', 50, 45, { width: 50 }) // Logo, adjust path and dimensions
    .fontSize(25)
    .font('Times-Bold')
    .text('Travel Request Form', 110, 50, {
      align: 'center',
      underline: true
    })
    .moveDown(2);

  // TR Number and User Email as sub-headings with improved layout
  doc.fontSize(12)
    .font('Times-Roman')
    .fillColor('black')
    .text(`TR Number: ${trNumber}`, {
      align: 'left'
    })
    .text(`User Email: ${userEmail}`, {
      align: 'left'
    })
    .moveDown(1);

  // Improved data presentation
  doc.fontSize(10)
    .font('Times-Italic');

  Object.entries(formData).forEach(([key, value], index) => {
    doc.fillColor('black').text(`${key}:`, { continued: true, bold: true })
      .fillColor('blue')
      .text(` ${value}`)
      .moveDown(0.5);
  });

  // Footer
  doc.fontSize(10)
    .font('Helvetica')
    .fillColor('grey')
    .text(`Generated on ${new Date().toLocaleDateString()}`, 50, doc.page.height - 40, {
      align: 'center'
    });

  doc.end(); // Finalize the PDF document

  // Execute the callback function with the path to the generated PDF
  callback(pdfPath);
}
