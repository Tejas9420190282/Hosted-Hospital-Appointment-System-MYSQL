// Home_Navar.jsx
import logo from "../../assets/home-page-img/logo.svg";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import React, { useState } from "react";

function Home_Navar() {
    const [menuOpen, setMenuOpen] = useState(false); // State to toggle menu

    return (
        <nav className="flex items-center justify-between p-6 bg-white shadow-md">
            {/* Logo */}
            <div className="flex items-center ml-5">
                <img src={logo} alt="Prescripto Logo" className="h-10" />
            </div>

            {/* Navigation Links */}
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
                {/* Regular Links */}
                <div className="flex space-x-6">
                    <a
                        href="/"
                        className="text-gray-800 hover:text-blue-600 font-medium text-lg uppercase tracking-wide transition-colors duration-200 ease-in-out px-1 py-2 border-b-2 border-transparent hover:border-blue-500 "
                    >
                        HOME
                    </a>
                    <a
                        href="/all-doctors"
                        className="text-gray-800 hover:text-blue-600 font-medium text-lg uppercase tracking-wide transition-colors duration-200 ease-in-out px-1 py-2 border-b-2 border-transparent hover:border-blue-500"
                    >
                        ALL DOCTORS
                    </a>
                    <a
                        href="/about"
                        className="text-gray-800 hover:text-blue-600 font-medium text-lg uppercase tracking-wide transition-colors duration-200 ease-in-out px-1 py-2 border-b-2 border-transparent hover:border-blue-500"
                    >
                        ABOUT
                    </a>
                    <a
                        href="/contact"
                        className="text-gray-800 hover:text-blue-600 font-medium text-lg uppercase tracking-wide transition-colors duration-200 ease-in-out px-1 py-2 border-b-2 border-transparent hover:border-blue-500"
                    >
                        CONTACT
                    </a>
                </div>

                {/* Admin Panel Link */}
                <div className="ml-4 border-2 border-gray-300 rounded-full px-4 py-1 hover:border-blue-500 transition-colors duration-200">
                    <a
                        href="/admin-doctor-login"
                        className="text-gray-800 hover:text-blue-600 font-medium text-lg uppercase tracking-wide"
                    >
                        Admin/Doctors Panel
                    </a>
                </div>
            </div>

            {/* Create Account Button */}
            <a
                href="/user-login"
                className="hidden mr-5 sm:block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg active:scale-95"
            >
                User's Login
            </a>

            {/* Mobile Menu Button */}
            <IoMdMenu
                className="md:hidden text-gray-700 size-7 cursor-pointer"
                onClick={() => setMenuOpen(true)} // Open menu
            />

            {/* Mobile Navigation Menu (Full-screen overlay) */}
            {menuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
                    <div className="w-64 bg-white h-full p-6 shadow-lg transform transition-transform duration-300">
                        {/* Close Button */}
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold">Menu</h2>
                            <IoMdClose
                                className="text-gray-700 size-7 cursor-pointer"
                                onClick={() => setMenuOpen(false)} // Close menu
                            />
                        </div>

                        {/* Navigation Links */}
                        <div className="mt-6  flex flex-col space-y-4">
                            <a
                                href="/"
                                className="text-gray-700 hover:text-blue-600 text-lg font-medium"
                            >
                                HOME
                            </a>
                            <a
                                href="/all-doctors"
                                className="text-gray-700 hover:text-blue-600 text-lg font-medium"
                            >
                                ALL DOCTORS
                            </a>
                            <a
                                href="/about"
                                className="text-gray-700 hover:text-blue-600 text-lg font-medium"
                            >
                                ABOUT
                            </a>
                            <a
                                href="/contact"
                                className="text-gray-700 hover:text-blue-600 text-lg font-medium"
                            >
                                CONTACT
                            </a>
                            <a
                                href="/admin-doctor-login"
                                className="text-gray-700 hover:text-blue-600 text-lg font-medium"
                            >
                                Admin/Doctors Panel
                            </a>
                            <a
                                href="/user-login"
                                className="text-gray-700 hover:text-blue-600 text-lg font-medium"
                            >
                                User's Login
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Home_Navar;



