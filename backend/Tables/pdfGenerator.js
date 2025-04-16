
// pdfGenerator.js

const PDFDocument = require('pdfkit');
const fs = require('fs');

const generateAppointmentPDF = async (appointmentData) => {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument();
            const buffers = [];
            
            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => {
                const pdfData = Buffer.concat(buffers);
                resolve(pdfData);
            });

            // Add content to PDF
            doc.fontSize(20).text('Appointment Confirmation', { align: 'center' });
            doc.moveDown();
            
            // Patient Information
            doc.fontSize(16).text('Patient Information:', { underline: true });
            doc.fontSize(12).text(`patientId: ${appointmentData.patient.patientId}`);
            doc.fontSize(12).text(`Name: ${appointmentData.patient.name}`);
            doc.text(`Contact: ${appointmentData.patient.contact}`);
            doc.text(`Address: ${appointmentData.patient.address}`);
            doc.moveDown();
            
            // Doctor Information
            doc.fontSize(16).text('Doctor Information:', { underline: true });
            doc.fontSize(12).text(`doctorId: ${appointmentData.doctor.doctorId}`);
            doc.fontSize(12).text(`Name: ${appointmentData.doctor.name}`);
            doc.text(`Contact: ${appointmentData.doctor.contact}`);
            doc.text(`Specialization: ${appointmentData.doctor.doctor_type}`);
            doc.moveDown();
            
            // Appointment Details
            doc.fontSize(16).text('Appointment Details:', { underline: true });
            doc.fontSize(12).text(`sloteId: ${appointmentData.slot.slotId}`);
            doc.fontSize(12).text(`Date: ${new Date(appointmentData.date).toLocaleDateString()}`);
            doc.text(`Time: ${appointmentData.slot.start_time} - ${appointmentData.slot.end_time}`);
            doc.moveDown();
            
            // Payment Details
            doc.fontSize(16).text('Payment Details:', { underline: true });
            doc.fontSize(12).text(`Amount: ₹ ${appointmentData.amount/100}`);
            doc.text(`Payment Status: ${appointmentData.payment_status}`);
            doc.text(`Payment ID: ${appointmentData.payment_id}`);
            
            doc.end();
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = { generateAppointmentPDF };


