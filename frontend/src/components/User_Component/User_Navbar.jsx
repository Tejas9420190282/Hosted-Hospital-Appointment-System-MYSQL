// User_Navbar.jsx

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function User_Navbar() {
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userName, setUserName] = useState(null);

    const nevigate = useNavigate();

    const handleLogout = () => {

        sessionStorage.removeItem("userToken");
        sessionStorage.removeItem("userId");
        nevigate("/");
    }

    useEffect(() => {
        
        const name = sessionStorage.getItem("userName");
        setUserName(name);
        console.log(userName);
    }, []);

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-24">
                    {/* Left side - User Panel */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-bold text-blue-600">{`Welcome ${userName}`}</span>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <svg
                                    className="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Right side - Navigation Links (Desktop) */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/user/user-home"
                            className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-xl font-medium transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            to="/user/schedule-appointment"
                            className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-xl font-medium transition-colors"
                        >
                            Schedule Appointment
                        </Link>
                        <Link
                            to="/user/view-scedule-appointments"
                            className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-xl font-medium transition-colors"
                        >
                            View Scheduled Appointments
                        </Link>
                        <Link
                            onClick={handleLogout}
                            className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-xl font-medium transition-colors"
                        >
                            Logout
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            to="/user/user-home"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to="/user/schedule-appointment"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Schedule Appointment
                        </Link>
                        <Link
                            to="/user/view-scedule-appointments"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            View Scheduled Appointments
                        </Link>
                        <Link
                            to="/"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Logout
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default User_Navbar;
