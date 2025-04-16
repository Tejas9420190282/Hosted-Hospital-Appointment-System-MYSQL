
// Doctor_Detail_Page.jsx (React)

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function Doctor_Detail_Page() {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const nevigate = useNavigate();

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/doctor/${id}`
                );

                if (response.data?.success) {
                    setDoctor(response.data.doctor);
                } else {
                    throw new Error("Doctor not found");
                }
            } catch (err) {
                console.error("Error fetching doctor:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctor();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    Error: {error}
                </div>
                <Link to="/doctor-home" className="mt-4 text-blue-600 hover:underline">
                    Back to Home
                </Link>
            </div>
        );
    }

    if (!doctor) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                    Doctor not found
                </div>
                <Link to="/" className="mt-4 text-blue-600 hover:underline">
                    Back to Home
                </Link>
            </div>
        );
    }

    return (
        <main className="flex-1 pt-16 bg-gray-50 min-h-screen">
            <div className="mx-auto max-w-4xl p-6">
                <Link 
                    to="/" 
                    className="flex items-center text-blue-600 hover:underline mb-6"
                >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Doctors
                </Link>
                
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    {/* Doctor Header Section */}
                    <div className="bg-blue-600 p-6 text-white">
                        <h1 className="text-3xl font-bold">Dr. {doctor.name}</h1>
                        <p className="text-xl mt-2">{doctor.doctor_type}</p>
                    </div>
                    
                    {/* Doctor Content Section */}
                    <div className="md:flex">
                        {/* Image Section */}
                        <div className="md:w-1/3 p-6 flex justify-center">
                            {doctor.img ? (
                                <img
                                    className="h-64 w-64 rounded-full object-cover border-4 border-white shadow-md"
                                    src={doctor.img}
                                    alt={doctor.name}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src =
                                            "https://cdn-icons-png.flaticon.com/512/3304/3304567.png";
                                    }}
                                />
                            ) : (
                                <div className="h-64 w-64 rounded-full bg-gray-200 border-4 border-white shadow-md flex items-center justify-center">
                                    <svg
                                        className="h-32 w-32 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>
                        
                        {/* Details Section */}
                        <div className="md:w-2/3 p-6">
                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">About</h2>
                                    <p className="text-gray-600 mt-2">{doctor.about}</p>
                                </div>
                                
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">Education</h2>
                                    <p className="text-gray-600 mt-2">
                                        {doctor.education} from {doctor.education_place}
                                    </p>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-800">Contact</h2>
                                        <p className="text-gray-600 mt-2">{doctor.contact}</p>
                                        <p className="text-gray-600">{doctor.email}</p>
                                    </div>
                                    
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-800">Experience</h2>
                                        <p className="text-gray-600 mt-2">{doctor.experience} years</p>
                                    </div>
                                    
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-800">Consultation Fee</h2>
                                        <p className="text-gray-600 mt-2">${doctor.fees}</p>
                                    </div>
                                    
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-800">Availability</h2>
                                        <p className="text-gray-600 mt-2">
                                            {doctor.start_time} - {doctor.end_time}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-8">
                                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full md:w-auto" onClick={() => nevigate(`/user/doctor/${id}/scedule-appointment`)}>
                                    Book Appointment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Doctor_Detail_Page;

