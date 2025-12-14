import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { 
  FaEnvelope, FaSpinner, FaArrowRight, FaShieldAlt,
  FaLock, FaPray, FaHeart, FaStar, FaLeaf,
  FaCheckCircle, FaExclamationCircle, FaArrowLeft
} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { store } from '@/redux/store';

const ForgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();
    const {user}=useSelector(store=>store.auth)

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        
        if (!email.trim()) {
            setError("Please enter your blessed email address");
            return;
        }
        
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError("Please enter a valid email address");
            return;
        }

        try {
            setIsLoading(true);
            setError('');
            
            const res = await axios.post(`https://spiritual-journey-tracker-backend.vercel.app/api/v1/user/forgot-password`, { email });
            
            if (res.data.success) {
                toast.success("✨ Spiritual reset link sent to your email!");
                navigate(`/verify-otp/${email}`);
                setIsSubmitted(true);
                setEmail('');
            }
            
        } catch (error) {
            console.log(error);
            setError(error.response?.data?.message || "Unable to send reset link. Please try again.");
            toast.error("❌ Could not send reset link");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetForm = () => {
        setIsSubmitted(false);
        setError('');
        setEmail('');
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 safe-area transition-colors duration-300">
            {/* Background Spiritual Elements */}
            <div className="absolute inset-0 overflow-hidden opacity-10">
                <div className="absolute top-1/4 left-1/4 text-8xl">🔐</div>
                <div className="absolute bottom-1/4 right-1/4 text-8xl">🙏</div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl">🔑</div>
                <div className="absolute top-1/3 right-1/3 text-7xl">🙏</div>
            </div>

            <div className="relative z-10 w-full max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="text-6xl mb-4 animate-pulse">🛡️</div>
                    <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-amber-700 to-orange-700 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                        Reset Spiritual Access
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Reclaim your spiritual journey with divine assistance
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    {/* Left Side - Form */}
                    <div className="lg:col-span-3">
                        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-amber-100 dark:border-gray-700 overflow-hidden">
                            <div className="p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-linear-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl">
                                        <FaLock className="text-amber-600 dark:text-amber-400 text-2xl" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Forgot Password</h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {isSubmitted ? "Divine link sent!" : "Receive Spiritual reset instructions"}
                                        </p>
                                    </div>
                                </div>

                                {error && (
                                    <div className="mb-6 p-4 bg-linear-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl border border-red-200 dark:border-red-800/30">
                                        <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                                            <FaExclamationCircle />
                                            <span className="text-sm">{error}</span>
                                        </div>
                                    </div>
                                )}

                                {isSubmitted ? (
                                    // Success State
                                    <div className="text-center space-y-6 animate-fadeIn">
                                        <div className="flex justify-center">
                                            <div className="p-6 bg-linear-to-br from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 rounded-2xl animate-bounce">
                                                <FaCheckCircle className="text-emerald-600 dark:text-emerald-400 text-6xl" />
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-3">
                                            <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-400">
                                                Spiritual Link Sent! ✨
                                            </h3>
                                            <p className="text-gray-700 dark:text-gray-300">
                                                Check your inbox at <span className="font-semibold text-blue-600 dark:text-blue-400">{email}</span>
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Divine instructions are on their way to reclaim your access
                                            </p>
                                        </div>

                                        <div className="space-y-3">
                                            <button
                                                onClick={() => navigate(`/verify-otp/${email}`)}
                                                className="w-full bg-linear-to-r from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group"
                                            >
                                                Continue to OTP
                                                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                            </button>
                                            
                                            <button
                                                onClick={handleResetForm}
                                                className="w-full border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-medium hover:border-amber-400 dark:hover:border-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/10 transition-all duration-300"
                                            >
                                                Enter Different Email
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    // Form State
                                    <form onSubmit={handleForgotPassword} className="space-y-6">
                                        <div>
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                                <FaEnvelope className="text-amber-600 dark:text-amber-400" />
                                                Email Address *
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => {
                                                        setEmail(e.target.value);
                                                        if (error) setError('');
                                                    }}
                                                    className={`w-full p-4 pl-12 bg-white/50 dark:bg-gray-700/50 border-2 rounded-xl focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-800 transition-all duration-300 ${
                                                        error 
                                                            ? "border-red-500 dark:border-red-500" 
                                                            : "border-amber-200 dark:border-amber-800 focus:border-amber-500 dark:focus:border-amber-500"
                                                    }`}
                                                    placeholder="your@blessed.email"
                                                    disabled={isLoading}
                                                />
                                                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500 dark:text-amber-400" />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full bg-linear-to-r from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <FaSpinner className="animate-spin" />
                                                    Sending Divine Link...
                                                </>
                                            ) : (
                                                <>
                                                    <FaShieldAlt />
                                                    Send Spiritual Reset Link
                                                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}

                                {/* Back to Login */}

                                {
                                    user ? (<>
                                     <div className="text-center mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        Don't want to change your Spiritual password?{" "}
                                        <br/>
                                        <Link 
                                            to="/dashboard" 
                                            className="text-amber-600 dark:text-amber-400 font-semibold hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
                                        >
                                            Go back 
                                        </Link>
                                    </p>
                                </div>
                                    </>):(<>
                                     <div className="text-center mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        Remember your Spiritual password?{" "}
                                        
                                        <Link 
                                            to="/login" 
                                            className="text-amber-600 dark:text-amber-400 font-semibold hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
                                        >
                                            Continue Your Journey
                                        </Link>
                                    </p>
                                </div>
                                    
                                    </>)
                                }


                                {/* <div className="text-center mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        Remember your Spiritual password?{" "}

                                        <Link 
                                            to="/login" 
                                            className="text-amber-600 dark:text-amber-400 font-semibold hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
                                        >
                                            Continue Your Journey
                                        </Link>
                                    </p>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Features */}
                    <div className="lg:col-span-2">
                        <div className="h-full bg-linear-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-3xl p-6 border border-amber-200 dark:border-amber-800/30">
                            <div className="text-5xl mb-6 text-center">✨</div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                                Divine Security Process
                            </h3>
                            
                            <div className="space-y-4">
                                {/* Feature 1 */}
                                <div className="flex items-start gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                                    <div className="p-2 bg-linear-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg">
                                        <FaShieldAlt className="text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 dark:text-white">Spiritual Verification</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Receive a blessed OTP code for authentication
                                        </p>
                                    </div>
                                </div>

                                {/* Feature 2 */}
                                <div className="flex items-start gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                                    <div className="p-2 bg-linear-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg">
                                        <FaCheckCircle className="text-green-600 dark:text-green-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 dark:text-white">Secure Reset</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Create a new blessed password with peace of mind
                                        </p>
                                    </div>
                                </div>

                                {/* Feature 3 */}
                                <div className="flex items-start gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                                    <div className="p-2 bg-linear-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg">
                                        <FaLeaf className="text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 dark:text-white">Peaceful Recovery</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Regain access to your Spiritual journey records
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Security Note */}
                            <div className="mt-8 p-4 bg-linear-to-r from-amber-100/50 to-orange-100/50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-xl border border-amber-200 dark:border-amber-800/20">
                                <div className="flex items-center gap-2 mb-2">
                                    <FaPray className="text-amber-600 dark:text-amber-400" size={14} />
                                    <span className="text-sm font-medium text-gray-800 dark:text-white">Divine Protection</span>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    Your spiritual journey data remains encrypted and protected throughout this process.
                                </p>
                            </div>

                            {/* Help Message */}
                            <div className="mt-6 text-center">
                                <div className="text-2xl mb-2">🙏</div>
                                <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                                    "Sat Saheb"
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="text-center mt-8">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Having trouble? Contact our{' '}
                        <a href="/contact" className="text-amber-600 dark:text-amber-400 hover:underline">
                            Spiritual support team
                        </a>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                        Your spiritual journey is important to us. We're here to help.
                    </p>
                </div>
            </div>

            {/* Animation CSS */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default ForgotPassword;