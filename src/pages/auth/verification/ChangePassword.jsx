import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { 
  FaLock, FaEye, FaEyeSlash, FaSpinner, FaArrowRight,
  FaCheckCircle, FaShieldAlt, FaPray, FaHeart,
  FaStar, FaLeaf, FaKey, FaUserCheck
} from 'react-icons/fa';

const ChangePassword = () => {
  const { email } = useParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const handlePasswordChange = (value) => {
    setNewPassword(value);
    setPasswordStrength(calculatePasswordStrength(value));
  };

  const getStrengthColor = () => {
    switch(passwordStrength) {
      case 0: return 'from-red-500 to-red-600';
      case 1: return 'from-orange-500 to-orange-600';
      case 2: return 'from-yellow-500 to-yellow-600';
      case 3: return 'from-green-500 to-green-600';
      case 4: return 'from-emerald-500 to-emerald-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getStrengthText = () => {
    switch(passwordStrength) {
      case 0: return 'Too weak';
      case 1: return 'Weak';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Strong';
      default: return '';
    }
  };

  const handleChangePassword = async () => {
    setError("");
    setSuccess("");

    if (!newPassword || !confirmPassword) {
      setError("Please fill in all Spiritual fields");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 blessed characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match. Please ensure both fields are the same.");
      return;
    }

    if (passwordStrength < 2) {
      setError("Please choose a stronger password for divine protection");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(`https://spiritual-journey-tracker-backend.vercel.app/api/v1/user/change-password/${email}`, {
        newPassword,
        confirmPassword
      });

      setSuccess(res.data.message);
      toast.success("✨ Password changed successfully!");
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong. Please try again.");
      toast.error("❌ Failed to change password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 safe-area transition-colors duration-300">
      {/* Background Spiritual Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-1/4 left-1/4 text-8xl">🔐</div>
        <div className="absolute bottom-1/4 right-1/4 text-8xl">🛡️</div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl">🔑</div>
        <div className="absolute top-1/3 right-1/3 text-7xl">🙏</div>
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-amber-100 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-emerald-400/10 to-emerald-500/10 dark:from-emerald-700/10 dark:to-emerald-800/10 p-8 text-center">
            <div className="relative inline-">
              <div className="absolute -inset-4 bg-linear-to-r from-emerald-400 to-cyan-400 rounded-full blur-lg opacity-30"></div>
              <div className="relative p-6 bg-linear-to-br from-emerald-100 to-cyan-100 dark:from-emerald-900/30 dark:to-cyan-900/30 rounded-2xl shadow-lg">
                <FaLock className="text-emerald-600 dark:text-emerald-400 text-5xl mx-auto" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mt-6 mb-2">
              Create New Spiritual Password
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              For <span className="font-semibold text-blue-600 dark:text-blue-400">{email}</span>
            </p>
          </div>

          <div className="p-8 md:p-10">
            {success ? (
              // Success State
              <div className="text-center space-y-6 animate-fadeIn">
                <div className="flex justify-center">
                  <div className="p-6 bg-linear-to-br from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 rounded-2xl animate-bounce">
                    <FaCheckCircle className="text-emerald-600 dark:text-emerald-400 text-6xl" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                    🎉 Password Reset Complete!
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 text-lg">
                    Your Spiritual password has been successfully updated.
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Redirecting you to login with your new blessed password...
                  </p>
                </div>

                <div className="flex items-center justify-center gap-3 bg-linear-to-r from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 rounded-xl p-4">
                  <FaSpinner className="animate-spin text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Returning to Spiritual login...</span>
                </div>
              </div>
            ) : (
              // Form State
              <div className="space-y-6">
                {error && (
                  <div className="p-4 bg-linear-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl border border-red-200 dark:border-red-800/30">
                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                      <FaShieldAlt />
                      <span className="text-sm">{error}</span>
                    </div>
                  </div>
                )}

                {/* New Password Field */}
                <div>
                  <label className=" text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <FaLock className="text-amber-600 dark:text-amber-400" />
                    New Spiritual Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => handlePasswordChange(e.target.value)}
                      className="w-full p-4 pl-12 pr-12 bg-white/50 dark:bg-gray-700/50 border-2 border-amber-200 dark:border-amber-800 rounded-xl focus:border-amber-500 dark:focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-800 transition-all duration-300"
                      placeholder="Create a blessed password"
                    />
                    <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500 dark:text-amber-400" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {newPassword && (
                    <div className="mt-3 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600 dark:text-gray-400">Password Strength</span>
                        <span className={`font-medium ${passwordStrength >= 3 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                          {getStrengthText()}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-linear-to-r ${getStrengthColor()} transition-all duration-300`}
                          style={{ width: `${(passwordStrength / 4) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label className=" text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <FaKey className="text-amber-600 dark:text-amber-400" />
                    Confirm Spiritual Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full p-4 pl-12 bg-white/50 dark:bg-gray-700/50 border-2 border-amber-200 dark:border-amber-800 rounded-xl focus:border-amber-500 dark:focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-800 transition-all duration-300"
                      placeholder="Re-enter your blessed password"
                    />
                    <FaKey className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500 dark:text-amber-400" />
                  </div>
                </div>

                {/* Password Requirements */}
                <div className="bg-linear-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-xl p-4 border border-amber-200 dark:border-amber-800/30">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                    <FaStar className="text-amber-500" />
                    Divine Password Requirements
                  </h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <li className={`flex items-center gap-2 ${newPassword.length >= 8 ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>
                      <FaHeart className="text-xs" />
                      At least 8 blessed characters
                    </li>
                    <li className={`flex items-center gap-2 ${/[A-Z]/.test(newPassword) ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>
                      <FaLeaf className="text-xs" />
                      One uppercase letter (A-Z)
                    </li>
                    <li className={`flex items-center gap-2 ${/[0-9]/.test(newPassword) ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>
                      <FaPray className="text-xs" />
                      One number (0-9)
                    </li>
                    <li className={`flex items-center gap-2 ${/[^A-Za-z0-9]/.test(newPassword) ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>
                      <FaShieldAlt className="text-xs" />
                      One special character (!@#$%^&*)
                    </li>
                  </ul>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleChangePassword}
                  disabled={isLoading || !newPassword || !confirmPassword}
                  className="w-full bg-linear-to-r from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                >
                  {isLoading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Updating Spiritual Password...
                    </>
                  ) : (
                    <>
                      <FaUserCheck />
                      Update & Continue Journey
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                {/* Back to Login */}
                <div className="text-center pt-4 border-t border-gray-100 dark:border-gray-700">
                  <button
                    onClick={() => navigate('/login')}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center justify-center gap-2 mx-auto"
                  >
                    <FaArrowRight className="rotate-180" />
                    Return to Spiritual Login
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-linear-to-r from-white/50 to-transparent dark:from-gray-800/50 p-6 border-t border-amber-100 dark:border-gray-700">
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="text-2xl">🔒</div>
                <div className="text-2xl">🛡️</div>
                <div className="text-2xl">🙏</div>
                <div className="text-2xl">✨</div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your spiritual journey remains protected with divine encryption
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Your Spiritual password is encrypted and never stored in plain text
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

export default ChangePassword;