
// Admin_sidebar.js

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import add_doctor from "../../../assets/Admin/add-doctor.svg";
import appointment from "../../../assets/Admin/appointment.svg";
import dashboard from "../../../assets/Admin/dashboard.svg";
import doctor_list from "../../../assets/Admin/doctor-list.svg";

function Admin_sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { icon: dashboard, label: "Dashboard", path: "/admin/admin-home" },
    { icon: appointment, label: "Appointments", path: "/show-all-appointments" },
    { icon: add_doctor, label: "Add Doctor", path: "/admin/add-doctor" },
    { icon: doctor_list, label: "Doctors List", path: "/admin/doctors-list" }
  ];

  // Toggle for mobile menu button
  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Menu Button - Now part of Sidebar component */}
      <button 
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-600 text-white shadow-lg"
        onClick={toggleSidebar}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
          />
        </svg>
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 bottom-0 z-40 w-64 bg-white shadow-lg transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 transition-transform duration-300 ease-in-out
      `}>
        <div className="h-full flex flex-col border-r border-gray-200">
          {/* Sidebar Header */}
          <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
          </div>
          
          {/* Menu Items */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    onClick={closeSidebar}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors
                      ${location.pathname === item.path
                        ? 'bg-blue-100 text-blue-600 font-medium'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}
                    `}
                  >
                    <img 
                      src={item.icon} 
                      alt={item.label} 
                      className="w-5 h-5 mr-3" 
                    />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={closeSidebar}
        />
      )}
    </>
  );
}

export default Admin_sidebar;