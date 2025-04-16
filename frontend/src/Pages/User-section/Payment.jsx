
// Payment.jsx (React)

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import User_Navbar from "../../components/User_Component/User_Navbar";

function Payment() {
    const { id, patientId, selectedSlot } = useParams();
    const [doctorFees, setDoctorFees] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [message, setMessage] = useState("");

    const doctorName = sessionStorage.getItem("nameOfDoctor");

    console.log(doctorName);

    const nevigate = useNavigate();

    
    

    useEffect(() => {
        const fees = sessionStorage.getItem("fees");
        if (fees) setDoctorFees(fees);

        const date = sessionStorage.getItem("date");
        if (date) setSelectedDate(date);
    }, []);

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePaymentSuccess = async (response) => {
        try {
            const verification = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/payment`,
                {
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                    doctorId: id,
                    patientId,
                    slotId: selectedSlot,
                    date: selectedDate,
                    amount: doctorFees * 100,
                },
                { responseType: "blob" } // Important for PDF download
            );

            // Create download link for PDF
            const url = window.URL.createObjectURL(
                new Blob([verification.data])
            );
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute(
                "download",
                `appointment_${response.razorpay_payment_id}.pdf`
            );
            document.body.appendChild(link);
            link.click();
            link.remove();

            setMessage(
                "Payment successful! Appointment booked and PDF downloaded."
            );

            setTimeout(() => {
                nevigate("/user/user-home");
            }, 5000);
        } catch (error) {
            console.error("Verification error:", error);
            setMessage("Payment successful but error downloading receipt");
        }
    };

    const handlePayment = async () => {
        try {
            const isScriptLoaded = await loadRazorpayScript();
            if (!isScriptLoaded) {
                setMessage("Razorpay SDK failed to load");
                return;
            }

            const orderResponse = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/create-razorpay-order`,
                {
                    amount: doctorFees * 100,
                    doctorId: id,
                    patientId,
                    slotId: selectedSlot,
                    date: selectedDate,
                }
            );

            if (!orderResponse.data.success) {
                setMessage("Failed to create payment order");
                return;
            }

            const options = {
                key: "rzp_test_6Pg8m8ifI60Xmi",
                amount: orderResponse.data.order.amount,
                currency: "INR",
                name: `Dr. ${doctorName}`,
                description: "Appointment Booking",
                order_id: orderResponse.data.order.id,
                handler: handlePaymentSuccess, // Updated handler
                prefill: {
                    name: sessionStorage.getItem("patientName") || "Patient",
                    email:
                        sessionStorage.getItem("patientEmail") ||
                        "patient@example.com",
                    contact:
                        sessionStorage.getItem("patientPhone") || "9999999999",
                },
                theme: {
                    color: "#3399cc",
                },
                notes: {
                    appointmentDetails: `Appointment with Dr. ${id} on ${selectedDate}`,
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Payment error:", error);
            setMessage("Payment failed. Please try again.");
        }
    };

    return (
        <>
            <User_Navbar />

            <div className="max-w-md mx-auto p-4 mt-30">
                <h2 className="text-2xl font-bold mb-4">Complete Payment</h2>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">
                            Appointment Summary
                        </h3>
                        <div className="space-y-2">
                            <p>Doctor Fee: ₹{doctorFees}</p>
                            <p>Date: {selectedDate}</p>
                            <p>Slot ID: {selectedSlot}</p>
                        </div>
                    </div>

                    <button
                        onClick={handlePayment}
                        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                    >
                        Pay Now
                    </button>

                    {message && (
                        <div
                            className={`mt-4 p-3 rounded-md ${
                                message.includes("success")
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                            }`}
                        >
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Payment;
