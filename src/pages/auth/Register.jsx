import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import {
    FaEye, FaEyeSlash, FaUser, FaEnvelope,
    FaPhone, FaMapMarkerAlt, FaLock, FaPray,
    FaSpinner, FaArrowRight, FaUserPlus,
    FaShieldAlt, FaCheckCircle, FaLeaf,
    FaBookOpen
} from "react-icons/fa";

const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        mantras: ""  // Fixed: mantras field
    });

    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field when user starts typing
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.name.trim()) {
            errors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            errors.email = "Please enter a valid email";
        }

        if (!formData.password) {
            errors.password = "Password is required";
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        if (!formData.mantras) {
            errors.mantras = "Please select your spiritual mantras";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Please fill in all required fields");
            return;
        }

        try {
            setIsLoading(true);
            const res = await axios.post(
                `https://spiritual-journey-tracker-backend.vercel.app/api/v1/user/register`,
                formData,
                { headers: { "Content-Type": "application/json" } }
            );

            if (res.data.success) {
                toast.success("🎉 Account created successfully! Please check your email for verification.");
                navigate("/verify");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const mantrasOptions = [
        { value: "Pratham Nam", label: "Pratham Nam 🙏" },
        { value: "Satnam", label: "Satnam 🌟" },
        { value: "Sarname", label: "Sarname ✨" },
        
    ];

    return (
        <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 safe-area transition-colors duration-300">
            {/* Background Spiritual Elements */}
            <div className="absolute inset-0 overflow-hidden opacity-5">
                <div className="absolute top-1/3 right-1/3 text-7xl">🪷</div>
                <div className="absolute bottom-1/4 right-1/4 text-8xl">🙏</div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl">☮️</div>
            </div>

            <div className="relative z-10 w-full max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="text-6xl mb-4 animate-float">🪷</div>
                    <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-amber-700 to-orange-700 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                        Begin Your Spiritual Journey
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Create your Spiritual account to document  visits and memories
                    </p>
                </div>

                <div className="flex items-center justify-center">
                    
                    {/* Right Side - Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-amber-100 dark:border-gray-700 overflow-hidden h-full">
                            <div className="p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-linear-to-br from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 rounded-xl">
                                        <FaUserPlus className="text-emerald-600 dark:text-emerald-400 text-2xl" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Create your Account</h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Fill in your details with care</p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        {/* Name Field */}
                                        <div className="md:col-span-2">
                                            <label className=" text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                                <FaUser className="text-amber-600 dark:text-amber-400" />
                                                Full Name *
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className={`w-full p-4 pl-12 bg-white/50 dark:bg-gray-700/50 border-2 rounded-xl focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-800 transition-all duration-300 ${formErrors.name
                                                        ? "border-red-500 dark:border-red-500"
                                                        : "border-amber-200 dark:border-amber-800 focus:border-amber-500 dark:focus:border-amber-500"
                                                        }`}
                                                    placeholder="Enter your name"
                                                />
                                                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500 dark:text-amber-400" />
                                            </div>
                                            {formErrors.name && (
                                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.name}</p>
                                            )}
                                        </div>

                                        {/* Email Field */}
                                        <div>
                                            <label className=" text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                                <FaEnvelope className="text-amber-600 dark:text-amber-400" />
                                                Email Address *
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className={`w-full p-4 pl-12 bg-white/50 dark:bg-gray-700/50 border-2 rounded-xl focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-800 transition-all duration-300 ${formErrors.email
                                                        ? "border-red-500 dark:border-red-500"
                                                        : "border-amber-200 dark:border-amber-800 focus:border-amber-500 dark:focus:border-amber-500"
                                                        }`}
                                                    placeholder="peace@example.com"
                                                />
                                                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500 dark:text-amber-400" />
                                            </div>
                                            {formErrors.email && (
                                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.email}</p>
                                            )}
                                        </div>

                                        {/* Phone Field */}
                                        <div>
                                            <label className=" text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                                <FaPhone className="text-amber-600 dark:text-amber-400" />
                                                Phone Number
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="w-full p-4 pl-12 bg-white/50 dark:bg-gray-700/50 border-2 border-amber-200 dark:border-amber-800 rounded-xl focus:border-amber-500 dark:focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-800 transition-all duration-300"
                                                    placeholder="+1 (555) 123-4567"
                                                />
                                                <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500 dark:text-amber-400" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Address Field */}
                                    <div>
                                        <label className=" text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                            <FaMapMarkerAlt className="text-amber-600 dark:text-amber-400" />
                                            Sacred Address
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                className="w-full p-4 pl-12 bg-white/50 dark:bg-gray-700/50 border-2 border-amber-200 dark:border-amber-800 rounded-xl focus:border-amber-500 dark:focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-800 transition-all duration-300"
                                                placeholder="Your spiritual location (optional)"
                                            />
                                            <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500 dark:text-amber-400" />
                                        </div>
                                    </div>

                                    {/* Mantras Field - FIXED */}
                                    <div>
                                        <label className=" text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                            <FaBookOpen className="text-purple-600 dark:text-purple-400" />
                                            Your Spiritual Mantras *
                                        </label>
                                        <div className="relative">
                                            <select
                                                name="mantras"
                                                value={formData.mantras}
                                                onChange={handleChange}
                                                className={`w-full p-4 pl-12 bg-white/50 dark:bg-gray-700/50 border-2 rounded-xl focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-800 transition-all duration-300 appearance-none ${formErrors.mantras
                                                    ? "border-red-500 dark:border-red-500"
                                                    : "border-amber-200 dark:border-amber-800 focus:border-amber-500 dark:focus:border-amber-500"
                                                    }`}
                                            >
                                                <option value="">Select your spiritual mantras</option>
                                                {mantrasOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                            <FaBookOpen className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500 dark:text-purple-400" />
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        {formErrors.mantras && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.mantras}</p>
                                        )}
                                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                            Choose the mantras that guide your spiritual practice
                                        </p>
                                    </div>

                                    {/* Password Field */}
                                    <div>
                                        <label className=" text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                            <FaLock className="text-amber-600 dark:text-amber-400" />
                                            Sacred Password *
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className={`w-full p-4 pl-12 pr-12 bg-white/50 dark:bg-gray-700/50 border-2 rounded-xl focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-800 transition-all duration-300 ${formErrors.password
                                                    ? "border-red-500 dark:border-red-500"
                                                    : "border-amber-200 dark:border-amber-800 focus:border-amber-500 dark:focus:border-amber-500"
                                                    }`}
                                                placeholder="Create a password"
                                            />
                                            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500 dark:text-amber-400" />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                                                aria-label={showPassword ? "Hide password" : "Show password"}
                                            >
                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                        </div>
                                        {formErrors.password && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.password}</p>
                                        )}
                                        <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                                            <div className="flex items-center gap-1">
                                                <div className={`w-2 h-2 rounded-full ${formData.password.length >= 6 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                                <span className={formData.password.length >= 6 ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}>
                                                    6+ characters
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <div className={`w-2 h-2 rounded-full ${/[A-Z]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                                <span className={/[A-Z]/.test(formData.password) ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}>
                                                    Uppercase
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <div className={`w-2 h-2 rounded-full ${/[0-9]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                                <span className={/[0-9]/.test(formData.password) ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}>
                                                    Number
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <div className={`w-2 h-2 rounded-full ${/[^A-Za-z0-9]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                                <span className={/[^A-Za-z0-9]/.test(formData.password) ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}>
                                                    Special char
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                 
                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-linear-to-r from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-2 group"
                                    >
                                        {isLoading ? (
                                            <>
                                                <FaSpinner className="animate-spin" />
                                                Creating Sacred Account...
                                            </>
                                        ) : (
                                            <>
                                                <FaUserPlus />
                                                Begin Spiritual Journey
                                                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>

                                    {/* Login Link */}
                                    <div className="text-center pt-4 border-t border-amber-200 dark:border-gray-700">
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                                            Already walk the spiritual path?{" "}
                                            <Link
                                                to="/login"
                                                className="text-amber-600 dark:text-amber-400 font-semibold hover:text-amber-700 dark:hover:text-amber-300 transition-colors inline-flex items-center gap-1"
                                            >
                                                Continue Your Journey
                                                <FaArrowRight className="text-sm" />
                                            </Link>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="text-center mt-8">
                    <div className="text-3xl mb-2">☸️✡️🙏✝️☯️</div>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                        "The journey of a thousand miles begins with a single step of faith"
                    </p>
                </div>
            </div>

            {/* CSS for floating animation */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default Register;