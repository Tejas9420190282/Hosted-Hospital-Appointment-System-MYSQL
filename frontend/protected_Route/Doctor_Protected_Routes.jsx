
// Doctor_Protected_Routes.js (React)

import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function Doctor_Protected_Routes() {

    const role = sessionStorage.getItem("role");
    const token = sessionStorage.getItem("token");

    return role === 'doctor' && token ? <Outlet /> : <Navigate to="/admin-doctor-login" replace />
};

export default Doctor_Protected_Routes

