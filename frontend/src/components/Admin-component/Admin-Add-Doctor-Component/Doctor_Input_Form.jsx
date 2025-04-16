
// Doctor_Input_Form.jsx (React)

import React, { useState, useRef } from "react";
import Admin_Navbar from "../Admin-Home-Components/Admin_Navbar";
import Admin_sidebar from "../Admin-Home-Components/Admin_sidebar";
import axios from "axios";

function Doctor_Input_Form() {
    // State for all form fields
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [doctorType, setDoctorType] = useState("");
    const [education, setEducation] = useState("");
    const [educationPlace, setEducationPlace] = useState("");
    const [experience, setExperience] = useState("");
    const [about, setAbout] = useState("");
    const [fees, setFees] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [showImageModal, setShowImageModal] = useState(false);
    const [message, setMessage] = useState();
    const fileInputRef = useRef(null);


    // Generate years options (1-50)
    const yearsOptions = Array.from({ length: 50 }, (_, i) => i + 1);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setError(""); // Reset previous errors

        // Validate type
        if (!file.type.match("image.*")) {
            setError("Only JPEG/PNG images allowed");
            e.target.value = "";
            return;
        }

        // Validate size (2MB)
        if (file.size > 2 * 1024 * 1024) {
            setError("Image must be smaller than 2MB");
            e.target.value = "";
            return;
        }

        // Create preview URL
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
        setImageFile(file);
    };

    const uploadToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append(
            "upload_preset",
            import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
        );
        formData.append(
            "cloud_name",
            import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        );

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${
                    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
                }/image/upload`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.data.secure_url;

        } catch (error) {
            console.error("Error uploading to Cloudinary:", error);
            throw new Error("Failed to upload image. Please try again.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate time inputs
        if (startTime >= endTime) {
            setError("End time must be after start time");
            return;
        }

        setIsUploading(true);
        setError("");

        try {
            let imageUrl = "";
            if (imageFile) {
                imageUrl = await uploadToCloudinary(imageFile);
            }

            const doctorData = {
                email,
                password,
                name,
                contact,
                doctorType,
                education,
                educationPlace,
                experience,
                about,
                fees,
                imageUrl,
                startTime,
                endTime,
            };

            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/admin/create-doctor-submit`,
                doctorData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Response:", response.data);
            
            if (response.data.success) {
                setMessage(response.data.message)

                alert(`${message}`);
            }
            // Reset form
            resetForm();
            
        } catch (error) {
            console.error("Error submitting form:", error);
            setError(error.response?.data?.message || "Failed to submit form. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    const resetForm = () => {
        setEmail("");
        setPassword("");
        setName("");
        setContact("");
        setDoctorType("");
        setEducation("");
        setEducationPlace("");
        setExperience("");
        setAbout("");
        setFees("");
        setStartTime("");
        setEndTime("");
        setImageFile(null);
        if (preview) {
            URL.revokeObjectURL(preview);
        }
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <Admin_Navbar />

            {/* Sidebar */}
            <Admin_sidebar />

            {/* Main Content */}
            <main className="flex-1 pt-16 md:pl-64 bg-gray-50 min-h-screen">
                <div className="p-4 sm:p-6">
                    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                        <h2 className="text-xl sm:text-2xl font-bold text-center py-4 bg-blue-600 text-white">
                            Doctor Registration Form
                        </h2>

                        <div className="p-4 sm:p-6">
                            {error && (
                                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6" data-gramm="false">
                                {/* Profile Image Section */}
                                <div className="flex flex-col items-center mb-8">
                                    <div className="relative mb-4">
                                        <div 
                                            className="h-32 w-32 rounded-full border-4 border-dashed border-gray-300 overflow-hidden bg-gray-100 flex items-center justify-center cursor-pointer hover:border-blue-400 transition-colors"
                                            onClick={() => preview && setShowImageModal(true)}
                                        >
                                            {preview ? (
                                                <img
                                                    src={preview}
                                                    alt="Preview"
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <svg
                                                    className="h-16 w-16 text-gray-400"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                        {preview && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setPreview(null);
                                                    setImageFile(null);
                                                    URL.revokeObjectURL(preview);
                                                    if (fileInputRef.current) {
                                                        fileInputRef.current.value = "";
                                                    }
                                                }}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none"
                                                aria-label="Remove image"
                                            >
                                                <svg
                                                    className="h-4 w-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                    <div className="w-full max-w-xs">
                                        <input
                                            type="file"
                                            id="image"
                                            ref={fileInputRef}
                                            onChange={handleImageChange}
                                            className="hidden"
                                            accept="image/jpeg, image/png"
                                            data-gramm="false"
                                        />
                                        <label
                                            htmlFor="image"
                                            className="cursor-pointer flex flex-col items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            <svg
                                                className="mb-1 h-6 w-6 text-gray-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                />
                                            </svg>
                                            {preview ? "Change Profile Image" : "Upload Profile Image"}
                                        </label>
                                        <p className="mt-2 text-xs text-center text-gray-500">
                                            JPEG/PNG, max 2MB. Recommended: Square image, at least 200x200 pixels
                                        </p>
                                    </div>
                                </div>

                                {/* Image Preview Modal */}
                                {showImageModal && preview && (
                                    <div 
                                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
                                        onClick={() => setShowImageModal(false)}
                                    >
                                        <div className="relative max-w-4xl w-full max-h-[90vh]">
                                            <button
                                                className="absolute -top-10 right-0 text-white hover:text-gray-300 focus:outline-none"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setShowImageModal(false);
                                                }}
                                            >
                                                <svg
                                                    className="h-8 w-8"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </button>
                                            <img
                                                src={preview}
                                                alt="Full size preview"
                                                className="max-w-full max-h-[80vh] mx-auto object-contain"
                                            />
                                            <p className="text-white text-center mt-2">
                                                Click anywhere to close
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Personal Information Section */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">
                                        Personal Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) =>
                                                    setName(e.target.value)
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Contact Number
                                            </label>
                                            <input
                                                type="tel"
                                                value={contact}
                                                onChange={(e) =>
                                                    setContact(e.target.value)
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Daily Start Time
                                            </label>
                                            <input
                                                type="time"
                                                value={startTime}
                                                onChange={(e) =>
                                                    setStartTime(e.target.value)
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Daily End Time
                                            </label>
                                            <input
                                                type="time"
                                                value={endTime}
                                                onChange={(e) =>
                                                    setEndTime(e.target.value)
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Professional Information Section */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">
                                        Professional Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Specialization
                                            </label>
                                            <select
                                                value={doctorType}
                                                onChange={(e) =>
                                                    setDoctorType(
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                                required
                                            >
                                                <option value="">
                                                    Select specialization
                                                </option>
                                                <option value="General Physician">
                                                    General Physician
                                                </option>
                                                <option value="Gynecologist">
                                                    Gynecologist
                                                </option>
                                                <option value="Cardiologist">
                                                    Cardiologist
                                                </option>
                                                <option value="Dermatologist">
                                                    Dermatologist
                                                </option>
                                                <option value="Pediatrician">
                                                    Pediatrician
                                                </option>
                                                <option value="Neurologist">
                                                    Neurologist
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Years of Experience
                                            </label>
                                            <select
                                                value={experience}
                                                onChange={(e) =>
                                                    setExperience(
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                                required
                                            >
                                                <option value="">
                                                    Select years
                                                </option>
                                                {yearsOptions.map((year) => (
                                                    <option
                                                        key={year}
                                                        value={year}
                                                    >
                                                        {year}{" "}
                                                        {year === 1
                                                            ? "year"
                                                            : "years"}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Education/Degree
                                            </label>
                                            <input
                                                type="text"
                                                value={education}
                                                onChange={(e) =>
                                                    setEducation(e.target.value)
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Institution/University
                                            </label>
                                            <input
                                                type="text"
                                                value={educationPlace}
                                                onChange={(e) =>
                                                    setEducationPlace(
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Information Section */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">
                                        Additional Information
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                About/Bio
                                            </label>
                                            <textarea
                                                value={about}
                                                onChange={(e) =>
                                                    setAbout(e.target.value)
                                                }
                                                rows={4}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Consultation Fees (₹)
                                            </label>
                                            <input
                                                type="number"
                                                value={fees}
                                                onChange={(e) =>
                                                    setFees(e.target.value)
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={isUploading}
                                        className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isUploading ? (
                                            <span className="flex items-center justify-center">
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Processing...
                                            </span>
                                        ) : (
                                            "Register Doctor"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Doctor_Input_Form;

