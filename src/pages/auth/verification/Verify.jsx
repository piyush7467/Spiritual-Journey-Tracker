import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { 
  FaCheckCircle, FaTimesCircle, FaSpinner, 
  FaEnvelope, FaArrowRight, FaPray, FaShieldAlt,
  FaHeart, FaStar, FaLeaf
} from 'react-icons/fa'

const Verify = () => {
    const navigate = useNavigate();
    const { token } = useParams();
    const [status, setStatus] = useState("Verifying...");
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("Confirming your Spiritual journey begins");

    useEffect(() => {
        const VerifyEmail = async () => {
            try {
                const res = await axios.post(`http://localhost:8020/api/v1/user/verify`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (res.data.success) {
                    setStatus("verified");
                    setMessage("🎉 Email Verified Successfully! Your spiritual journey begins now.");
                    setTimeout(() => {
                        navigate('/login')
                    }, 3000)
                } else {
                    setStatus("invalid");
                    setMessage("❌ This verification link has expired or is invalid.");
                }

            } catch (error) {
                console.log(error);
                setStatus("failed");
                setMessage("❌ Verification failed. The link may have expired.");
            } finally {
                setLoading(false);
            }
        };
        VerifyEmail();
    },[token, navigate]);

    const getStatusIcon = () => {
        switch(status) {
            case 'verified':
                return <FaCheckCircle className="text-emerald-500 text-6xl animate-bounce" />;
            case 'invalid':
            case 'failed':
                return <FaTimesCircle className="text-red-500 text-6xl" />;
            default:
                return <FaSpinner className="text-amber-500 text-6xl animate-spin" />;
        }
    };

    const getStatusColor = () => {
        switch(status) {
            case 'verified':
                return 'from-emerald-100 to-emerald-50 dark:from-emerald-900/20 dark:to-emerald-800/20 border-emerald-200';
            case 'invalid':
            case 'failed':
                return 'from-red-100 to-red-50 dark:from-red-900/20 dark:to-red-800/20 border-red-200';
            default:
                return 'from-amber-100 to-amber-50 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-200';
        }
    };

    const getActionButton = () => {
        if (status === 'verified') {
            return (
                <button
                    onClick={() => navigate('/login')}
                    className="mt-6 bg-linear-to-r from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group"
                >
                    Continue to Spiritual Login
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
            );
        } else if (status === 'invalid' || status === 'failed') {
            return (
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <button
                        onClick={() => navigate('/login')}
                        className="flex-1 bg-linear-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        Go to Login
                    </button>
                    <button
                        onClick={() => window.location.reload()}
                        className="flex-1 bg-linear-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        Try Again
                    </button>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 safe-area transition-colors duration-300">
            {/* Background Spiritual Elements */}
            <div className="absolute inset-0 overflow-hidden opacity-10">
                <div className="absolute top-1/4 left-1/4 text-8xl">🪷</div>
                <div className="absolute bottom-1/4 right-1/4 text-8xl">🙏</div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl">🪷</div>
            </div>

            <div className="relative z-10 w-full max-w-2xl mx-auto">
                <div className={`bg-linear-to-br ${getStatusColor()} backdrop-blur-sm rounded-3xl shadow-2xl border overflow-hidden transition-all duration-500`}>
                    <div className="p-8 md:p-12 text-center">
                        {/* Icon */}
                        <div className="mb-6 flex justify-center">
                            <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-2xl shadow-lg">
                                {getStatusIcon()}
                            </div>
                        </div>

                        {/* Main Message */}
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                            {status === 'verified' ? 'Blessings Confirmed!' : 
                             status === 'invalid' || status === 'failed' ? 'Verification Issue' : 
                             'Divine Verification'}
                        </h1>
                        
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                            {loading ? "Confirming your Spiritual journey begins..." : message}
                        </p>

                        {/* Progress Bar for Loading */}
                        {loading && (
                            <div className="w-full max-w-sm mx-auto h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-6">
                                <div className="h-full bg-linear-to-r from-amber-500 to-orange-500 animate-pulse" style={{ width: '70%' }}></div>
                            </div>
                        )}

                        {/* Status Details */}
                        {!loading && (
                            <div className="bg-white/30 dark:bg-gray-800/30 rounded-2xl p-6 mb-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="flex flex-col items-center p-4">
                                        <div className="p-3 bg-linear-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl mb-2">
                                            <FaShieldAlt className="text-amber-600 dark:text-amber-400 text-xl" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-800 dark:text-white">Security Check</span>
                                        <span className="text-xs text-gray-600 dark:text-gray-400">Complete</span>
                                    </div>
                                    <div className="flex flex-col items-center p-4">
                                        <div className="p-3 bg-linear-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl mb-2">
                                            <FaEnvelope className="text-blue-600 dark:text-blue-400 text-xl" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-800 dark:text-white">Email Verified</span>
                                        <span className="text-xs text-gray-600 dark:text-gray-400">
                                            {status === 'verified' ? 'Confirmed' : 'Pending'}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-center p-4">
                                        <div className="p-3 bg-linear-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl mb-2">
                                            <FaLeaf className="text-green-600 dark:text-green-400 text-xl" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-800 dark:text-white">Spiritual Access</span>
                                        <span className="text-xs text-gray-600 dark:text-gray-400">
                                            {status === 'verified' ? 'Granted' : 'Awaiting'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Action Button */}
                        {getActionButton()}

                        {/* Help Text */}
                        {status === 'invalid' || status === 'failed' ? (
                            <div className="mt-8 p-4 bg-linear-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-xl border border-amber-200 dark:border-amber-800/30">
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                                    <FaPray className="text-amber-600" />
                                    Need Help?
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    If you continue to face issues, please contact our Spiritual support team or request a new verification email from login.
                                </p>
                            </div>
                        ) : null}

                        {/* Auto-redirect notice */}
                        {status === 'verified' && (
                            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <FaHeart className="text-pink-400 animate-pulse" />
                                <span>Redirecting to login in 3 seconds...</span>
                            </div>
                        )}
                    </div>

                    {/* Decorative Footer */}
                    <div className="bg-linear-to-r from-white/50 to-transparent dark:from-gray-800/50 p-4 border-t border-white/30 dark:border-gray-700/30">
                        <div className="flex items-center justify-center gap-4">
                            <div className="text-2xl">🙏</div>
                            <div className="text-2xl">☮️</div>
                            <div className="text-2xl">🪷</div>
                            <div className="text-2xl">🌟</div>
                        </div>
                    </div>
                </div>

                {/* Additional Information */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Verification ensures only blessed souls can access the Spiritual journey tracker
                    </p>
                    <div className="flex items-center justify-center gap-2">
                        <FaStar className="text-amber-400" />
                        <span className="text-xs text-gray-500 dark:text-gray-500">
                            May peace and blessings accompany your verification
                        </span>
                        <FaStar className="text-amber-400" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Verify;