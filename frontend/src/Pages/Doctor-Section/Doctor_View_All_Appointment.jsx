
// Doctor_View_All_Appointment.jsx

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';

function Doctor_View_All_Appointment() {
    const [appointmentData, setAppointmentData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterDate, setFilterDate] = useState('');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const doctorId = sessionStorage.getItem("doctorId"); 
                
                console.log(doctorId);
                
                if (!doctorId) {
                    throw new Error("Doctor ID not found");
                } 
    
                const response = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/get-doctor-all-apointment`, 
                    { doctorId } 
                );

                console.log("API Response:", response.data);
    
                if (response.data.success) {
                    // Remove [0] since backend now sends flat array
                    setAppointmentData(response.data.allAppointment || []); 
                } else {
                    setError("Failed to fetch appointments");
                }
            } catch (err) {
                setError(err.message);
                setAppointmentData([]); // Ensure we have an array
            } finally {
                setLoading(false);
            }
        };
    
        fetchAppointments();
    }, []); 

    const formatDate = (dateString) => {
        try {
            const date = parseISO(dateString);
            return format(date, 'dd MMM yyyy');
        } catch {
            return 'Invalid date';
        }
    };

    const filteredAppointments = filterDate 
        ? appointmentData.filter(appt => 
            formatDate(appt.date) === formatDate(filterDate))
        : appointmentData;

    return (
        <div className="p-4 md:p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Patient Appointments</h1>
            
            {/* Filter Controls */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div>
                    <label htmlFor="date-filter" className="block text-sm font-medium text-gray-700 mb-1">
                        Filter by Date
                    </label>
                    <input
                        type="date"
                        id="date-filter"
                        className="p-2 border rounded-md"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                    />
                </div>
                <button 
                    onClick={() => setFilterDate('')}
                    className="self-end sm:self-auto px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                    Clear Filter
                </button>
            </div>

            {loading ? (
                <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    <p className="mt-2 text-gray-600">Loading appointments...</p>
                </div>
            ) : error ? (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
                    <p>Error: {error}</p>
                </div>
            ) : filteredAppointments && filteredAppointments.length === 0 ? (
                <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4">
                    <p>No appointments found</p>
                </div>
            ) : (
                <>
                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="min-w-full bg-white rounded-lg overflow-hidden">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">Patient Name</th>
                                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">Contact</th>
                                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">Address</th>
                                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">Date</th>
                                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">Time Slot</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredAppointments.map((appointment, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="py-4 px-4">{appointment.name}</td>
                                        <td className="py-4 px-4">{appointment.contact}</td>
                                        <td className="py-4 px-4">{appointment.address}</td>
                                        <td className="py-4 px-4">{formatDate(appointment.date)}</td>
                                        <td className="py-4 px-4">
                                            {appointment.start_time} - {appointment.end_time}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden space-y-4">
                        {filteredAppointments.map((appointment, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow">
                                <div className="space-y-2">
                                    <div>
                                        <span className="font-semibold">Patient:</span> {appointment.name}
                                    </div>
                                    <div>
                                        <span className="font-semibold">Contact:</span> {appointment.contact}
                                    </div>
                                    <div>
                                        <span className="font-semibold">Date:</span> {formatDate(appointment.date)}
                                    </div>
                                    <div>
                                        <span className="font-semibold">Time:</span> {appointment.start_time} - {appointment.end_time}
                                    </div>
                                    <div className="pt-2">
                                        <span className="font-semibold">Address:</span> {appointment.address}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Doctor_View_All_Appointment;

