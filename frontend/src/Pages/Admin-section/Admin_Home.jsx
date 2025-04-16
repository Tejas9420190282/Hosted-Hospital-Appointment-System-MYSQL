
// Admin_Home

import React from 'react';
import Admin_Navbar from '../../components/Admin-component/Admin-Home-Components/Admin_Navbar';
import Admin_sidebar from '../../components/Admin-component/Admin-Home-Components/Admin_sidebar';

function Admin_Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar - no need to pass toggle props anymore */}
      <Admin_Navbar />
      
      {/* Self-contained Sidebar */}
      <Admin_sidebar />
      
      {/* Main Content */}
      <main className="flex-1 pt-16 md:pl-64 bg-gray-50 min-h-screen">
        <div className="p-6">
          {/* Your page content goes here */}
        </div>
      </main>
    </div>
  );
}

export default Admin_Home;

