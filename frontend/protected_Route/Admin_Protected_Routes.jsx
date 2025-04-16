
// Admin_Protected_Routes.jsx (React)

import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function Admin_Protected_Routes() {
    const role = sessionStorage.getItem("role");
    return role === "admin" ? (
        <Outlet />
    ) : (
        <Navigate to="/admin-doctor-login" replace />
    );
}

export default Admin_Protected_Routes;
