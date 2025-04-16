import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function User_Protected_Route() {
    
    const isAuthenticated = sessionStorage.getItem("userToken");
    
    return isAuthenticated ? <Outlet /> : <Navigate to="/user-login" replace />
};

export default User_Protected_Route
