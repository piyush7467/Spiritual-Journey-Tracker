import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";
import { 
  FaEye, FaEyeSlash, FaEnvelope, FaLock, 
  FaArrowRight, FaSpinner, FaPray, FaUser,
  FaShieldAlt, FaLeaf, FaPeace, FaHeart,
  FaKey, FaUserCheck, FaHome
} from "react-icons/fa";

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
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
        
        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            errors.email = "Please enter a valid email";
        }
        
        if (!formData.password) {
            errors.password = "Password is required";
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
                `https://spiritual-journey-tracker-backend.vercel.app/api/v1/user/login`,
                formData,
                { headers: { "Content-Type": "application/json" } }
            );

            if (res.data.success) {
                const user = res.data.user;
                // Update Redux state safely
                dispatch(setUser({
                    user: user || null,
                    accessToken: res.data.accessToken || null,
                    refreshToken: res.data.refreshToken || null,
                }));
                // Optionally store accessToken in localStorage for API calls
                if (res.data.accessToken) {
                    localStorage.setItem("accessToken", res.data.accessToken);
                }
                
                toast.success(res.data.message);
                navigate("/");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Login failed. Please check your credentials.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 safe-area transition-colors duration-300">
            {/* Background Spiritual Elements */}
            <div className="absolute inset-0 overflow-hidden opacity-5">
                <div className="absolute top-1/4 left-1/4 text-8xl">🙏</div>
                <div className="absolute top-1/3 right-1/3 text-7xl">🪷</div>
                <div className="absolute bottom-1/4 right-1/4 text-8xl">🙏</div>
                
                <div className="absolute bottom-1/3 left-1/3 text-9xl">☮️</div>
            </div>

            <div className="relative z-10 w-full max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="text-6xl mb-4 animate-pulse">🕊️</div>
                    <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-amber-700 to-orange-700 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                        Welcome Back, Spiritual Seeker
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Continue your Spiritual journey and access your records
                    </p>
                </div>

                <div className="flex items-center justify-center">
                    {/* Left Side - Login Form */}
                    <div className="lg:col-span-3">
                        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-amber-100 dark:border-gray-700 overflow-hidden">
                            <div className="p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-linear-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl">
                                        <FaUserCheck className="text-amber-600 dark:text-amber-400 text-2xl" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Spiritual Login</h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Enter your credentials</p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-5">
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
                                                className={`w-full p-4 pl-12 bg-white/50 dark:bg-gray-700/50 border-2 rounded-xl focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-800 transition-all duration-300 ${
                                                    formErrors.email 
                                                        ? "border-red-500 dark:border-red-500" 
                                                        : "border-amber-200 dark:border-amber-800 focus:border-amber-500 dark:focus:border-amber-500"
                                                }`}
                                                placeholder="your@gmail.email"
                                                disabled={isLoading}
                                            />
                                            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500 dark:text-amber-400" />
                                        </div>
                                        {formErrors.email && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.email}</p>
                                        )}
                                    </div>

                                    {/* Password Field */}
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                                <FaLock className="text-amber-600 dark:text-amber-400" />
                                                Password *
                                            </label>
                                            <Link
                                                to="/forgot-password"
                                                className="text-xs text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors flex items-center gap-1"
                                            >
                                                <FaKey size={10} />
                                                Forgot password?
                                            </Link>
                                        </div>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className={`w-full p-4 pl-12 pr-12 bg-white/50 dark:bg-gray-700/50 border-2 rounded-xl focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-800 transition-all duration-300 ${
                                                    formErrors.password 
                                                        ? "border-red-500 dark:border-red-500" 
                                                        : "border-amber-200 dark:border-amber-800 focus:border-amber-500 dark:focus:border-amber-500"
                                                }`}
                                                placeholder="Enter your Spiritual password"
                                                disabled={isLoading}
                                            />
                                            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500 dark:text-amber-400" />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                disabled={isLoading}
                                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors disabled:opacity-50"
                                            >
                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                        </div>
                                        {formErrors.password && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.password}</p>
                                        )}
                                    </div>

                                    {/* Remember Me & Quick Actions */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                id="remember"
                                                className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500 dark:focus:ring-amber-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label htmlFor="remember" className="text-sm text-gray-600 dark:text-gray-400">
                                                Remember this device
                                            </label>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => navigate("/signup")}
                                            className="text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors flex items-center gap-1"
                                        >
                                            <FaUser size={12} />
                                            New to the journey?
                                        </button>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-linear-to-r from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-6 group"
                                    >
                                        {isLoading ? (
                                            <>
                                                <FaSpinner className="animate-spin" />
                                                Connecting to Divine...
                                            </>
                                        ) : (
                                            <>
                                                <FaPray />
                                                Enter Spiritual Space
                                                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    
                </div>

                {/* Footer Links */}
                <div className="text-center mt-8">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Need help?{" "}
                        <Link to="/contact" className="text-amber-600 dark:text-amber-400 hover:underline font-medium">
                            Contact Divine Support
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;