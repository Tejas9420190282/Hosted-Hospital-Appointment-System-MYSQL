
// Admin_Navbar.js

import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/Admin/logo.svg";

function Admin_Navbar() {
  
  const navigate = useNavigate();

  const handleLogout = () => {

    sessionStorage.removeItem("role");
    sessionStorage.removeItem("token");
    navigate("/");
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between p-4 bg-white shadow-md md:pl-64">
      {/* Logo and Title */}
      <div className="flex sm:ml-8 md:ml-8 items-center ml-4 ">
        <img src={logo} alt="Prescripto Logo" className="h-8" />
        <div className="ml-4 border-2 border-gray-300 rounded-full px-4 py-1 hover:border-blue-500 transition-colors">
          <span className="text-gray-800 hover:text-blue-600 font-medium text-sm md:text-base">
            Admin Panel
          </span>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium sm:font-nano py-2 px-4 rounded-full transition-all shadow hover:shadow-lg"
      >
        Logout
      </button>
    </nav>
  );
}

export default Admin_Navbar;

