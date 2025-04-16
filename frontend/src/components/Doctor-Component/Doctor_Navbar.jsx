
// Doctor_Navbar.jsx(React)

import React, { useState } from 'react';
import { TiThMenu } from "react-icons/ti";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';

function Doctor_Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear doctor authentication data
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/');
    };

    return (
        <nav className="bg-gray-300 shadow-lg">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center h-20">
                    {/* Logo/Brand */}
                    <div className="flex-shrink-0">
                        <Link to="/doctor-home" className="text-xl font-bold text-blue-600">
                            Doctor Portal
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8">
                        <Link 
                            to="/doctor/view-all-appointments" 
                            className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-xl font-medium"
                        >
                            View All Appointments
                        </Link>
                        
                        <button
                            onClick={handleLogout}
                            className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-xl font-medium"
                        >
                            Logout
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-700 hover:text-blue-600 focus:outline-none"
                        >
                            {isMenuOpen ? (
                                <IoMdClose size={24} />
                            ) : (
                                <TiThMenu size={24} />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t-2 border-gray-100">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            to="/doctor/view-all-appointments"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            View All Appointments
                        </Link>
                        <button
                            onClick={() => {
                                handleLogout();
                                setIsMenuOpen(false);
                            }}
                            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Doctor_Navbar;



