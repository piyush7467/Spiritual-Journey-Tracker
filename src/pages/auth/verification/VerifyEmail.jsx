import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { 
  FaEnvelope, FaCheckCircle, FaArrowRight, 
  FaSpinner, FaSync, FaInbox, FaPray,
  FaShieldAlt, FaHeart, FaStar, FaClock
} from 'react-icons/fa'

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  const handleResendEmail = async () => {
    setResending(true);
    // Simulate API call
    setTimeout(() => {
      setResending(false);
      setResendSuccess(true);
      setTimeout(() => setResendSuccess(false), 3000);
    }, 1500);
  };

  const handleCheckEmail = () => {
    // This would typically open the user's email client
    window.open('mailto:', '_blank');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 safe-area transition-colors duration-300">
      {/* Background Spiritual Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-1/4 left-1/4 text-8xl">✉️</div>
        <div className="absolute bottom-1/4 right-1/4 text-8xl">🕉️</div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl">📨</div>
        <div className="absolute top-1/3 right-1/3 text-7xl">🙏</div>
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-amber-100 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-emerald-400/10 to-emerald-500/10 dark:from-emerald-700/10 dark:to-emerald-800/10 p-8 text-center">
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-linear-to-r from-emerald-400 to-cyan-400 rounded-full blur-lg opacity-30"></div>
              <div className="relative p-6 bg-linear-to-br from-emerald-100 to-cyan-100 dark:from-emerald-900/30 dark:to-cyan-900/30 rounded-2xl shadow-lg">
                <FaEnvelope className="text-emerald-600 dark:text-emerald-400 text-5xl mx-auto" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mt-6 mb-2">
              Check Your Spiritual Inbox
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Divine verification awaits in your email
            </p>
          </div>

          <div className="p-8 md:p-10">
            {/* Main Content */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-linear-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl">
                  <FaCheckCircle className="text-amber-600 dark:text-amber-400 text-3xl" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mb-4">
                Email Sent Successfully!
              </h2>
              
              <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 max-w-md mx-auto">
                We've sent a Spiritual verification link to your email. Please check your inbox and click the link to continue your spiritual journey.
              </p>
            </div>

            {/* Steps */}
            <div className="mb-10">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6 text-center flex items-center justify-center gap-2">
                <FaStar className="text-amber-500" />
                Follow These Divine Steps
                <FaStar className="text-amber-500" />
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Step 1 */}
                <div className="bg-linear-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-5 text-center border border-blue-100 dark:border-blue-800/30">
                  <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-cyan-500 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-3">
                    1
                  </div>
                  <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg mb-3">
                    <FaInbox className="text-blue-600 dark:text-blue-400 text-2xl mx-auto" />
                  </div>
                  <h4 className="font-bold text-gray-800 dark:text-white mb-2">Open Your Email</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Check your inbox for our Spiritual message
                  </p>
                </div>

                {/* Step 2 */}
                <div className="bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-5 text-center border border-green-100 dark:border-green-800/30">
                  <div className="w-10 h-10 bg-linear-to-r from-green-500 to-emerald-500 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-3">
                    2
                  </div>
                  <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg mb-3">
                    <FaShieldAlt className="text-green-600 dark:text-green-400 text-2xl mx-auto" />
                  </div>
                  <h4 className="font-bold text-gray-800 dark:text-white mb-2">Click Verification Link</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Click the blessed link in the email
                  </p>
                </div>

                {/* Step 3 */}
                <div className="bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-5 text-center border border-purple-100 dark:border-purple-800/30">
                  <div className="w-10 h-10 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-3">
                    3
                  </div>
                  <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg mb-3">
                    <FaPray className="text-purple-600 dark:text-purple-400 text-2xl mx-auto" />
                  </div>
                  <h4 className="font-bold text-gray-800 dark:text-white mb-2">Begin Journey</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Start documenting your Spiritual visits
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleCheckEmail}
                className="flex-1 bg-linear-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <FaInbox />
                Open Email App
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>

              {/* <button
                onClick={handleResendEmail}
                disabled={resending || resendSuccess}
                className="flex-1 bg-linear-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {resending ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Sending...
                  </>
                ) : resendSuccess ? (
                  <>
                    <FaCheckCircle />
                    Email Resent!
                  </>
                ) : (
                  <>
                    <FaSync />
                    Resend Email
                  </>
                )}
              </button> */}
            </div>

            {/* Help Section */}
            <div className="bg-linear-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-2xl p-5 border border-amber-200 dark:border-amber-800/30">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg shrink-0">
                  <FaClock className="text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                    Divine Guidance
                  </h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <li className="flex items-center gap-2">
                      <FaHeart className="text-red-400 text-xs" />
                      Check your spam/junk folder if you don't see the email
                    </li>
                    <li className="flex items-center gap-2">
                      <FaStar className="text-amber-400 text-xs" />
                      Verification links expire in 24 hours for security
                    </li>
                    <li className="flex items-center gap-2">
                      <FaShieldAlt className="text-emerald-400 text-xs" />
                      Ensure the email matches your registered address
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Back to Login */}
            <div className="text-center mt-8">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Already verified? Continue your spiritual journey
              </p>
              <button
                onClick={() => navigate('/login')}
                className="text-emerald-600 dark:text-emerald-400 font-semibold hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors flex items-center justify-center gap-2 mx-auto"
              >
                <FaArrowRight className="rotate-180" />
                Return to Spiritual Login
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-linear-to-r from-white/50 to-transparent dark:from-gray-800/50 p-6 border-t border-amber-100 dark:border-gray-700">
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="text-2xl">📧</div>
                
                <div className="text-2xl">🙏</div>
                <div className="text-2xl">✨</div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                May your verification bring blessings to your spiritual documentation journey
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            If you continue to face issues, please contact our{' '}
            <a href="/contact" className="text-amber-600 dark:text-amber-400 hover:underline">
              Spiritual support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;