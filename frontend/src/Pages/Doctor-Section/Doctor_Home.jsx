
// Doctor_Home.jsx

import React from 'react';
import Doctor_Navbar from '../../components/Doctor-Component/Doctor_Navbar';
import { Link } from 'react-router-dom';

function Doctor_Home() {
    const doctorIMG = sessionStorage.getItem("imgOfDoctor");
    const doctorName = sessionStorage.getItem("nameOfDoctor");

    return (
        <>
            <Doctor_Navbar />
            
            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        {/* Doctor Image */}
                        <div className="w-full md:w-1/3 flex justify-center">
                            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                <img 
                                    src={doctorIMG || '/default-doctor.jpg'} 
                                    alt={`Dr. ${doctorName}`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.src = '/default-doctor.jpg';
                                    }}
                                />
                            </div>
                        </div>
                        
                        {/* Welcome Message */}
                        <div className="w-full md:w-2/3 text-center md:text-left">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                                Welcome, <span className="text-blue-600">Dr. {doctorName}</span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-600 mb-6">
                                Manage your appointments and patient care from your personalized dashboard.
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                <Link
                                    to="/doctor/view-all-appointments"
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    View Appointments
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Doctor_Home;