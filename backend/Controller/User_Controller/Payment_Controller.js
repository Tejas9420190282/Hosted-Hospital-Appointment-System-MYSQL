// payment_Controller.js (Node)

require("dotenv").config();
const { mySqlPool } = require("../../config/db");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { generateAppointmentPDF } = require("../../Tables/pdfGenerator");

const razorpay = new Razorpay({
    key_id:"rzp_test_6Pg8m8ifI60Xmi",
    key_secret:"9cLSFrLUCm0hJnwfbs0szhRK",
});

// Create Razorpay order
const createRazorpayOrder = async (req, res) => {
    try {
        const { amount, doctorId, patientId, slotId, date } = req.body;

        const options = {
            amount: amount, // amount in paise
            currency: "INR",
            receipt: `appt_${Date.now()}`,
            notes: {
                doctorId,
                patientId,
                slotId,
                date,
            },
        };

        const order = await razorpay.orders.create(options);

        res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        res.status(500).json({
            success: false,
            message: "Error creating payment order",
        });
    }
};

// Verify payment and create appointment
const payment_Controller = async (req, res) => {
    try {
        const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            doctorId,
            patientId,
            slotId,
            date,
            amount,
        } = req.body;

        // Verify payment signature
        const expectedSignature = crypto
            .createHmac("sha256", razorpay.key_secret)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment signature",
            });
        }

        // Create appointment first
        const [appointmentResult] = await mySqlPool.query(
            "INSERT INTO appointment (date, slote_id, doctor_id, patient_id ) VALUES (?, ?, ?, ?)",
            [date, slotId, doctorId, patientId]
        );

        // Get all appointment details with joins
        const [appointmentDetails] = await mySqlPool.query(
            `
            SELECT 
                a.id AS appointment_id,
                a.date,
                p.name AS patient_name,
                p.contact AS patient_contact,
                p.address AS patient_address,
                d.name AS doctor_name,
                d.contact AS doctor_contact,
                d.doctor_type,
                d.fees,
                s.start_time,
                s.end_time
            FROM appointment a
            JOIN patient p ON a.patient_id = p.id
            JOIN doctor d ON a.doctor_id = d.id
            JOIN slote s ON a.slote_id = s.id
            WHERE a.id = ?
        `,
            [appointmentResult.insertId]
        );

        if (!appointmentDetails.length) {
            throw new Error("Failed to fetch appointment details");
        }

        const appointmentData = appointmentDetails[0];

        // Generate PDF
        const pdfData = await generateAppointmentPDF({
            patient: {
                patientId : patientId,
                name: appointmentData.patient_name,
                contact: appointmentData.patient_contact,
                address: appointmentData.patient_address,
            },
            doctor: {
                doctorId : doctorId,
                name: appointmentData.doctor_name,
                contact: appointmentData.doctor_contact,
                doctor_type: appointmentData.doctor_type,
                fees: appointmentData.fees,
            },
            slot: {
                slotId : slotId,
                start_time: appointmentData.start_time,
                end_time: appointmentData.end_time,
            },
            date: appointmentData.date,
            amount,
            payment_status: "Success",
            payment_id: razorpay_payment_id,
        });

        // Send response with PDF
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=appointment_${razorpay_payment_id}.pdf`
        );
        res.send(pdfData);
    } catch (error) {
        console.error("Error in payment_Controller:", error);
        res.status(500).json({
            success: false,
            message: "Error processing payment",
            error: error.message,
        });
    }
};

module.exports = {
    payment_Controller,
    createRazorpayOrder,
};



