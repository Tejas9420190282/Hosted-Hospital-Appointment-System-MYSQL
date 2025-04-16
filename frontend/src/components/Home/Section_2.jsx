import React from "react";
import group_profile from "../../assets/home-page-img/group_profiles.png";
import three_doctors from "../../assets/home-page-img/three-doctors.png";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function Section_2() {

    const nevigate = useNavigate();

    return (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Left Content */}
                <div className="space-y-6">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                        Book Appointment <br />
                        <span className="text-blue-600">
                            With Trusted Doctors
                        </span>
                    </h2>

                    <p className="text-lg text-gray-600 max-w-lg">
                        Simply browse through our extensive list of Trusted
                        doctors, schedule your appointment facials-free.
                    </p>

                    <button onClick={() => nevigate("/user-login")}
                        href="/user-login"
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
                    >
                        Book appointment <FaArrowRightLong /> 
                    </ button>
                </div>

                {/* Right Image */}
                <div className="relative">
                    <img
                        src={three_doctors}
                        alt="Trusted doctors"
                        className="w-full h-auto rounded-lg shadow-xl"
                    />
                </div>
            </div>
        </section>
    );
}

export default Section_2;
