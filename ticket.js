const PDFDocument = require('pdfkit');
const fs = require('fs');

// Function to create a ticket PDF
function createTicketPDF(sourceStation, destinationStation) {
  // Create a new PDF document
  const doc = new PDFDocument();

  // Pipe the PDF into a file
  const writeStream = fs.createWriteStream('ticket.pdf');
  doc.pipe(writeStream);

  // Add content to the PDF
  doc.fontSize(12).text('Ticket Details', { align: 'center' });
  doc.moveDown();
  doc.text(`Date: ${new Date().toDateString()}`);
  doc.text(`Time: ${new Date().toTimeString()}`);
  doc.text(`Source Station: ${sourceStation}`);
  doc.text(`Destination Station: ${destinationStation}`);

  // Finalize the PDF
  doc.end();

  // Return the filename once the PDF is created
  return 'ticket.pdf';
}

// Call the function with the source and destination stations
const sourceStation = 'SourceStationName';
const destinationStation = 'DestinationStationName';
const pdfFileName = createTicketPDF(sourceStation, destinationStation);
