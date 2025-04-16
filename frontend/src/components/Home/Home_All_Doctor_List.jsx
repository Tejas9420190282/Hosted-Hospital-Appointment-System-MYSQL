import axios from "axios";
import React, { useEffect, useState } from "react";
import Home_Navar from "./Home_Navar";

function Home_All_Doctor_List() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/show-all-doctors-list`
                );

                if (
                    response.data?.success &&
                    Array.isArray(response.data.doctors)
                ) {
                    setDoctors(response.data.doctors);
                } else {
                    throw new Error("Invalid data format from server");
                }
            } catch (err) {
                console.error("Error fetching doctors:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

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
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            
            <Home_Navar />


            <main className="flex-1 pt-5  bg-gray-50 min-h-screen">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-800 ml-20 mb-6">
                        All Doctors
                    </h1>

                    {doctors.length === 0 ? (
                        <div className="bg-yellow-100 border  border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                            No doctors found
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 ml-10 mr-10 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {doctors.map((doctor) => (
                                <div
                                    key={doctor.id}
                                    className="bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                                >
                                    {/* Large Profile Image Section */}
                                    <div className="flex justify-center py-6 bg-gray-100">
                                        {doctor.img ? (
                                            <img
                                                className="h-72 w-72 rounded-4xl object-cover border-4 border-white shadow-md bg-sky-300"
                                                src={doctor.img}
                                                alt={doctor.name}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src =
                                                        "https://cdn-icons-png.flaticon.com/512/3304/3304567.png";
                                                }}
                                            />
                                        ) : (
                                            <div className="h-48 w-48 rounded-full bg-gray-200 border-4 border-white shadow-md flex items-center justify-center">
                                                <svg
                                                    className="h-24 w-24 text-gray-400"
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

                                    {/* Doctor Details Section */}
                                    <div className="p-6">
                                        <div className="text-center">
                                            <h2 className="text-xl font-bold text-gray-800">
                                                Dr. {doctor.name}
                                            </h2>
                                            <p className="text-md text-blue-600 font-medium mt-1">
                                                {doctor.doctor_type}
                                            </p>
                                        </div>

                                        <div className="mt-4 space-y-2">
                                            <div className="flex items-center">
                                                <svg
                                                    className="h-5 w-5 text-gray-500 mr-2"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                    />
                                                </svg>
                                                <span className="text-gray-700">
                                                    {doctor.email}
                                                </span>
                                            </div>
                                            <div className="flex items-center">
                                                <svg
                                                    className="h-5 w-5 text-gray-500 mr-2"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                    />
                                                </svg>
                                                <span className="text-gray-700">
                                                    {doctor.contact}
                                                </span>
                                            </div>
                                            <div className="flex items-center">
                                                <svg
                                                    className="h-5 w-5 text-gray-500 mr-2"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                    />
                                                </svg>
                                                <span className="text-gray-700">
                                                    {doctor.experience} years
                                                    experience
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-6 text-center">
                                            <span className="px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                                Available ✅
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Home_All_Doctor_List;
