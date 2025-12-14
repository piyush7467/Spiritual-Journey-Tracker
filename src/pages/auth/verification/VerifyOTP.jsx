import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { 
  FaCheckCircle, FaSpinner, FaSync, FaArrowRight, 
  FaShieldAlt, FaEnvelope, FaLock, FaPray,
  FaStar, FaHeart, FaClock, FaExclamationCircle,
  FaKey, FaUserCheck, FaArrowLeft
} from 'react-icons/fa'

const VerifyOTP = () => {
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState("")
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [timer, setTimer] = useState(30)
  const inputRefs = useRef([])
  const { email } = useParams()
  const navigate = useNavigate()

  // Countdown timer for resend
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer(prev => prev - 1)
      }, 1000)
      return () => clearInterval(countdown)
    }
  }, [timer])

  // handle OTP change
  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return // Only allow numbers
    
    if (value.length > 1) {
      // Auto-fill from paste
      const pastedOtp = value.slice(0, 6).split('')
      const newOtp = [...otp]
      pastedOtp.forEach((digit, i) => {
        if (i < 6) newOtp[i] = digit
      })
      setOtp(newOtp)
      // Focus last filled input
      const lastFilledIndex = Math.min(pastedOtp.length - 1, 5)
      inputRefs.current[lastFilledIndex]?.focus()
    } else {
      setError("") // clear error on typing
      const updatedOtp = [...otp]
      updatedOtp[index] = value
      setOtp(updatedOtp)
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  // verify OTP
  const handleVerify = async () => {
    const finalOtp = otp.join("")
    if (finalOtp.length !== 6) {
      setError("Please enter all 6 Spiritual digits")
      return
    }

    try {
      setIsLoading(true)
      const res = await axios.post(`https://spiritual-journey-tracker-backend.vercel.app/api/v1/user/verify-otp/${email}`, {
        otp: finalOtp,
      })
      
      toast.success("🎉 OTP Verified Successfully!")
      setIsVerified(true)

      // redirect after short delay
      setTimeout(() => {
        navigate(`/change-password/${email}`)
      }, 2000)
    } catch (error) {
      setError(error.response?.data?.message || "Verification failed. Please try again.")
      toast.error("❌ Verification failed")
    } finally {
      setIsLoading(false)
    }
  }

  // clear OTP
  const clearOtp = () => {
    setOtp(["", "", "", "", "", ""])
    setError("")
    inputRefs.current[0]?.focus()
  }

  // resend OTP
  const handleResendOTP = async () => {
    if (timer > 0) return
    
    try {
      setResendLoading(true)
      await axios.post(`https://spiritual-journey-tracker-backend.vercel.app/api/v1/user/resend-otp/${email}`)
      toast.success("✨ New OTP sent to your email!")
      setTimer(30)
      clearOtp()
    } catch (error) {
      toast.error("❌ Failed to resend OTP. Please try again.")
    } finally {
      setResendLoading(false)
    }
  }

  // auto-focus first input
  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 safe-area transition-colors duration-300">
      {/* Background Spiritual Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-1/4 left-1/4 text-8xl">🔐</div>
        <div className="absolute bottom-1/4 right-1/4 text-8xl">🕉️</div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl">🔢</div>
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-amber-100 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-blue-400/10 to-cyan-400/10 dark:from-blue-700/10 dark:to-cyan-700/10 p-8 text-center">
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-linear-to-r from-blue-400 to-cyan-400 rounded-full blur-lg opacity-30"></div>
              <div className="relative p-6 bg-linear-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-2xl shadow-lg">
                <FaKey className="text-blue-600 dark:text-blue-400 text-5xl mx-auto" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mt-6 mb-2">
              Spiritual Verification
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Enter the divine code sent to <span className="font-semibold text-blue-600 dark:text-blue-400">{email}</span>
            </p>
          </div>

          <div className="p-8 md:p-10">
            {isVerified ? (
              // Success State
              <div className="text-center space-y-6 animate-fadeIn">
                <div className="flex justify-center">
                  <div className="p-6 bg-linear-to-br from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 rounded-2xl animate-bounce">
                    <FaCheckCircle className="text-emerald-600 dark:text-emerald-400 text-6xl" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                    🎉 Verification Complete!
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 text-lg">
                    Your Spiritual code has been verified successfully.
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Redirecting you to reset your password...
                  </p>
                </div>

                <div className="flex items-center justify-center gap-3 bg-linear-to-r from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 rounded-xl p-4">
                  <FaSpinner className="animate-spin text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Preparing your Spiritual space...</span>
                </div>
              </div>
            ) : (
              // OTP Input State
              <div className="space-y-8">
                {/* OTP Input Section */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center justify-center gap-2">
                    <FaShieldAlt className="text-amber-600" />
                    Enter 6-Digit Spiritual Code
                  </h3>
                  
                  <div className="flex gap-3 justify-center mb-6">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        maxLength={1}
                        ref={(el) => (inputRefs.current[index] = el)}
                        value={digit}
                        className={`w-14 h-14 text-center text-2xl font-bold rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 ${
                          error ? 'border-red-500 dark:border-red-500' : 'border-blue-300 dark:border-blue-700 focus:border-blue-500 dark:focus:border-blue-500'
                        } bg-white/80 dark:bg-gray-700/80`}
                      />
                    ))}
                  </div>

                  {error && (
                    <div className="mb-4 p-3 bg-linear-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl border border-red-200 dark:border-red-800/30">
                      <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                        <FaExclamationCircle />
                        <span className="text-sm">{error}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <button
                    onClick={handleVerify}
                    disabled={isLoading || otp.some((digit) => digit === "")}
                    className="w-full bg-linear-to-r from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                  >
                    {isLoading ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        Verifying Spiritual Code...
                      </>
                    ) : (
                      <>
                        <FaUserCheck />
                        Verify & Continue
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={clearOtp}
                      disabled={isLoading}
                      className="p-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:border-amber-400 dark:hover:border-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/10 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <FaSync />
                      Clear
                    </button>

                    <button
                      onClick={handleResendOTP}
                      disabled={resendLoading || timer > 0}
                      className="p-3 bg-linear-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {resendLoading ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <FaEnvelope />
                      )}
                      {timer > 0 ? `Resend (${timer}s)` : 'Resend Code'}
                    </button>
                  </div>
                </div>

                {/* Guidance Section */}
                <div className="space-y-4">
                  <div className="bg-linear-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-2xl p-4 border border-amber-200 dark:border-amber-800/30">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                      <FaStar className="text-amber-500" />
                      Spiritual Tips
                    </h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                      <li className="flex items-center gap-2">
                        <FaHeart className="text-red-400 text-xs" />
                        Code expires in 10 minutes for divine security
                      </li>
                      <li className="flex items-center gap-2">
                        <FaClock className="text-blue-400 text-xs" />
                        Check spam folder if you don't see the email
                      </li>
                      <li className="flex items-center gap-2">
                        <FaLock className="text-emerald-400 text-xs" />
                        Never share your Spiritual code with anyone
                      </li>
                    </ul>
                  </div>

                  {/* Back Link */}
                  <div className="text-center pt-4 border-t border-gray-100 dark:border-gray-700">
                    <button
                      onClick={() => navigate('/forgot-password')}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center justify-center gap-2"
                    >
                      <FaArrowLeft />
                      Use different email
                    </button>
                  </div>
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
                Divine protection for your Spiritual account verification
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Need help? Contact our{' '}
            <a href="/contact" className="text-amber-600 dark:text-amber-400 hover:underline">
              Spiritual support team
            </a>
          </p>
        </div>
      </div>

      {/* Add CSS to your global CSS file instead */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
        `}
      </style>
    </div>
  )
}

export default VerifyOTP