import React from 'react';
import Gastroenterologist from "../../assets/home-page-img/Gastroenterologist.svg";
import Gynecologist from "../../assets/home-page-img/Gynecologist.svg";
import Pediatricians from "../../assets/home-page-img/Pediatricians.svg";
import Neurologist from "../../assets/home-page-img/Neurologist.svg";

import general_physician from "../../assets/home-page-img/general_physician.svg";
import dermatologies from "../../assets/home-page-img/dermatologies.svg";


function Section_3() {
    const specialties = [
        { name: "general_physician", icon: general_physician},
        { name: "Gynecologist", icon: Gynecologist },
        { name: "Pediatricians", icon: Pediatricians },
        { name: "Neurologist", icon: Neurologist },
        { name: "Gastroenterologist", icon: Gastroenterologist },
        { name: "dermatologies", icon: dermatologies},
    ];

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Find by Speciality
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Simply browse through our extensive list of trusted doctors,<br />
                        schedule your appointment hassle-free.
                    </p>
                </div>

                {/* Specialties Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mx-auto justify-center">

                    {specialties.map((specialty, index) => (
                        <div 
                            key={index}
                            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 text-center cursor-pointer hover:border-blue-500 hover:border-2"
                        >
                            <div className="flex justify-around mb-4">
                                <img 
                                    src={specialty.icon} 
                                    alt={specialty.name} 
                                    className="h-16 w-16 object-contain"
                                />
                            </div>
                            <h3 className="text-lg font-medium text-gray-800">{specialty.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Section_3;