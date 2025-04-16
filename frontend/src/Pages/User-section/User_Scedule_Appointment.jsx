// User_Scedule_Appointment.jsx (React)
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import User_Navbar from "../../components/User_Component/User_Navbar";

function User_Scedule_Appointment() {
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");
    const [patientId, setPatientId] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const { id } = useParams(); // This gets the actual ID from the URL

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const patientResponse = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/create-patient`,
                {
                    name,
                    contact,
                    address,
                    id: id,
                }
            );

            if (patientResponse.data.success) {
                const newPatientId = patientResponse.data.patientId;
                setPatientId(newPatientId);

                console.log(newPatientId); // This will show the correct value

                // Use newPatientId directly instead of patientId state
                navigate(
                    `/user/doctor/${id}/schedule-appointment/patientid/${newPatientId}/booking-slote`
                );
            }
        } catch (error) {
            console.error(`Error : ${error.message}`);
            setError("Failed to create patient. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <User_Navbar />
            
            <div className="max-w-md mx-auto p-4 mt-30">
                <h2 className="text-2xl font-bold mb-4">Patient Information</h2>

                {error && <div className="text-red-500 mb-4">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="contact" className="block mb-1">
                            Contact
                        </label>
                        <input
                            type="tel"
                            className="w-full p-2 border rounded"
                            id="contact"
                            name="contact"
                            placeholder="Enter your Contact"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="address" className="block mb-1">
                            Address
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            id="address"
                            name="address"
                            placeholder="Enter your Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Continue to Schedule"}
                    </button>
                </form>
            </div>
        </>
    );
}

export default User_Scedule_Appointment;
