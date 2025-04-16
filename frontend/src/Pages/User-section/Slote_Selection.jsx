// Slote_Selection.jsx (React)

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import User_Navbar from "../../components/User_Component/User_Navbar";

const Slote_Selection = () => {
    const { id, patientId } = useParams();
    const navigate = useNavigate();
    const [slots, setSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedDate, setSelectedDate] = useState("");
    const [error, setError] = useState(null);
    const [doctorFees, setDoctorFees] = useState(null);

    useEffect(() => {
        if (selectedDate) {
            fetchSlots();
        }
    }, [selectedDate]);

    const fetchSlots = async () => {
        try {
            setError(null);
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/insert-slote`,
                {
                    params: {
                        id,
                        date: selectedDate,
                    },
                }
            );

            if (response.data.success) {
                setSlots(response.data.slote || []);
                setDoctorFees(response.data.doctorFees); // Set fees from response
                setSelectedSlot(null);

                // Store in sessionStorage after successful fetch
                sessionStorage.setItem("date", selectedDate);
                sessionStorage.setItem("fees", response.data.doctorFees);
            }
        } catch (err) {
            setSlots([]);
            setDoctorFees(null);
            console.error("Error fetching slots:", err);
        }
    };

    const handleSlotSelect = (slotId) => {
        setSelectedSlot(slotId);
    };

    const handleNext = () => {
        if (!selectedDate) {
            alert("Please select a date");
            return;
        }
        if (!selectedSlot) {
            alert("Please select a time slot");
            return;
        }

        navigate(
            `/user/doctor/${id}/schedule-appointment/patientid/${patientId}/booking-slote/sloteid/${selectedSlot}/payment`,
            {
                state: {
                    patientId,
                    slotId: selectedSlot,
                    doctorId: id,
                    appointmentDate: selectedDate,
                },
            }
        );
    };

    return (
        <>
            <User_Navbar />
            
            <div className="max-w-md mx-auto p-4 mt-30">
                <h2 className="text-2xl font-bold mb-4">Select Appointment</h2>
                <p className="mb-4">Patient ID: {patientId}</p>

                {/* Date Selection */}
                <div className="mb-6">
                    <label
                        htmlFor="appointmentDate"
                        className="block mb-2 font-medium"
                    >
                        Appointment Date
                    </label>
                    <input
                        type="date"
                        id="appointmentDate"
                        className="w-full p-2 border rounded"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        required
                    />
                </div>

                {/* Time Slots */}
                {selectedDate && (
                    <>
                        <h3 className="text-xl font-semibold mb-3">
                            Available Time Slots
                        </h3>
                        <div className="space-y-2 mb-6">
                            {slots.length > 0 ? (
                                slots.map((slot) => (
                                    <div
                                        key={slot.id}
                                        className={`p-3 border rounded cursor-pointer transition-colors ${
                                            selectedSlot === slot.id
                                                ? "bg-blue-500 text-white"
                                                : slot.status === "available"
                                                ? "hover:bg-gray-100"
                                                : "bg-gray-200 cursor-not-allowed"
                                        }`}
                                        onClick={() =>
                                            slot.status === "available" &&
                                            handleSlotSelect(slot.id)
                                        }
                                    >
                                        {slot.start_time} - {slot.end_time}
                                        {slot.status !== "available" && (
                                            <span className="ml-2 text-sm text-red-500">
                                                (Booked)
                                            </span>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">
                                    Select a date to see available slots
                                </p>
                            )}
                        </div>
                    </>
                )}

                <button
                    onClick={handleNext}
                    disabled={!selectedSlot || !selectedDate}
                    className={`w-full py-2 px-4 rounded text-white ${
                        selectedSlot && selectedDate
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-gray-400 cursor-not-allowed"
                    }`}
                >
                    Next
                </button>
            </div>
        </>
    );
};

export default Slote_Selection;
