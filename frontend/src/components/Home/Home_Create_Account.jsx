

import React from "react";
import { useNavigate } from "react-router-dom";
import create_Account from "../../assets/home-page-img/create_Account.png";

function Home_Create_Account() {
    const navigate = useNavigate();

    return (
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-10 px-6 rounded-xl mx-4 md:mx-12 my-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center">
                {/* Left Side */}
                <div className="space-y-6 text-white">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
                        Book Appointment <br />
                        <span className="text-blue-600">With 100+ Trusted Doctors</span>
                    </h2>

                    <button
                        onClick={() => navigate("/user-create-account")}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full text-lg transition duration-300"
                    >
                        Create account
                    </button>
                </div>

                {/* Right Side Image */}
                <div className="flex justify-center mt-8 md:mt-0">
                    <img
                        src={create_Account}
                        alt="Trusted Doctor"
                        className="w-[300px] md:w-[350px] lg:w-[400px] object-cover"
                    />
                </div>
            </div>
        </section>
    );
}

export default Home_Create_Account;



/*  
import React from "react";
import { useNavigate } from "react-router-dom";
import create_Account from "../../assets/home-page-img/create_Account.png";
import { FaArrowRightLong } from "react-icons/fa6";

function Home_Create_Account() {
    const nevigate = useNavigate();

    return (
        <section className="py-0 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Left Content 
                <div className="space-y-6">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                    Book Appointment <br />
                        <span className="text-blue-600">
                        With 100+ Trusted Doctors.
                        </span>
                    </h2>

                    <button
                        onClick={() => nevigate("/user-create-account")}
                        href="/user-login"
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
                    >
                        Create Account<FaArrowRightLong />
                    </button>
                </div>

                {/* Right Image 
                <div className="relative">
                    <img
                        src={create_Account}
                        alt="Trusted doctors"
                        className="w-full h-auto rounded-lg shadow-xl"
                    />
                </div>
            </div>
        </section>
    );
}

export default Home_Create_Account;
 */