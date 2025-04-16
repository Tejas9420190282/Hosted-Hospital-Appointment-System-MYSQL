
// Admin_Doctor_Login.jsx (React)

import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Admin_Doctor_Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [doctorName, setDoctorName] = useState("");
    const [doctorIMG, setDoctorIMG] = useState("");
    const [doctorId, setDoctorId] = useState("");


    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:1212/admin-doctor-login-submit",
                { email, password }
            );
    
            if (response.data.success) {
                // Store values directly from response
                const { doctorName, doctorIMG, doctorID } = response.data;
                
                if (doctorName && doctorIMG && doctorID) {
                    // Update state (though you might not need these states)
                    setDoctorIMG(doctorIMG);
                    setDoctorName(doctorName);
                    setDoctorId(doctorID);
    
                    // Store in sessionStorage immediately
                    sessionStorage.setItem("imgOfDoctor", doctorIMG);
                    sessionStorage.setItem("nameOfDoctor", doctorName);
                    sessionStorage.setItem("doctorId", doctorID);
                    
                    console.log("Stored DoctorId:", doctorID);  // Now this will show correctly
                }

                sessionStorage.setItem("token", response.data.token);
                sessionStorage.setItem("role", response.data.role);
                
                navigate(response.data.redirect);
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">
                Admin/Doctor Login
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default Admin_Doctor_Login;




