import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  FaPaperPlane, FaUser, FaEnvelope, FaComment, 
  FaMapMarkerAlt, FaPhone, FaClock, FaSpinner,
  FaArrowLeft, FaHeart, FaShieldAlt, FaStar,
  FaInstagram, FaFacebook, FaTwitter, FaLinkedin,
  FaWhatsapp, FaCheckCircle,
  FaYoutube
} from "react-icons/fa";
import { MdContactPhone } from "react-icons/md";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear messages when user starts typing
    setSuccess("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await axios.post("https://spiritual-journey-tracker-backend.vercel.app/api/v1/user/contact", formData);
      setSuccess("✨ Your message has been sent with divine blessings! We'll respond soon.");
      setFormData({ name: "", email: "", message: "" });
      
      // Auto-clear success message after 5 seconds
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    } catch (err) {
      setError("🙏 Connection issue. Please try again or chant a prayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 pb-12 safe-area transition-colors duration-300">
      
      {/* Divine Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute top-20 left-10 text-7xl">📿</div>
        <div className="absolute top-1/3 right-20 text-8xl">🕊️</div>
        <div className="absolute bottom-1/4 left-1/4 text-6xl">🪷</div>
        <div className="absolute bottom-40 right-1/4 text-7xl">🙏</div>
        <div className="absolute top-1/2 left-1/3 text-9xl">☮️</div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-24 left-4 z-10 p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        <FaArrowLeft className="text-amber-600 dark:text-amber-400 text-lg" />
      </button>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 pt-8">
          <div className="text-8xl mb-6 animate-float">📬</div>
          <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-amber-700 via-orange-600 to-amber-700 dark:from-amber-400 dark:via-orange-400 dark:to-amber-400 bg-clip-text text-transparent mb-4">
            Divine Contact
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Connect with us for blessings, support, or spiritual guidance. We're here with divine love.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            {/* Contact Cards */}
            <div className="bg-linear-to-br from-white to-amber-50/50 dark:from-gray-800/80 dark:to-gray-900/50 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-amber-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
                <MdContactPhone className="text-amber-600 dark:text-amber-400" />
                Sacred Connection
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-linear-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl">
                    <FaEnvelope className="text-amber-600 dark:text-amber-400 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-white">Blessing Emails</h3>
                    <p className="text-gray-600 dark:text-gray-400">piyushshakya7467.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-linear-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl">
                    <FaPhone className="text-blue-600 dark:text-blue-400 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-white">Divine Support</h3>
                    <p className="text-gray-600 dark:text-gray-400">6398667467</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">24/7 Spiritual Emergency</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-linear-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl">
                    <FaMapMarkerAlt className="text-green-600 dark:text-green-400 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-white">Spiritual Center</h3>
                    <p className="text-gray-600 dark:text-gray-400">Satlok Ashram</p>
                    <p className="text-gray-600 dark:text-gray-400">Mundka, Delhi, India</p>
                  </div>
                </div>

                {/* <div className="flex items-start gap-4">
                  <div className="p-3 bg-linear-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl">
                    <FaClock className="text-purple-600 dark:text-purple-400 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-white">Sacred Hours</h3>
                    <p className="text-gray-600 dark:text-gray-400">Mon - Sun: 6 AM - 10 PM IST</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">Meditation breaks: 12-1 PM & 7-8 PM</p>
                  </div>
                </div> */}
              </div>
            </div>

            {/* Social Connection */}
            <div className="bg-linear-to-br from-white to-amber-50/50 dark:from-gray-800/80 dark:to-gray-900/50 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-purple-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
                <FaHeart className="text-red-500 dark:text-red-400" />
                Connect Spiritually
              </h2>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                <a href="https://www.facebook.com/spiritualleaderSaintRampalJI" className="p-4 bg-linear-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center">
                  <FaFacebook className="text-blue-600 dark:text-blue-400 text-2xl mb-2" />
                  <span className="text-xs text-gray-700 dark:text-gray-300">Blessings</span>
                </a>
                <a href="https://www.instagram.com/spiritualleadersaintrampalji/" className="p-4 bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center">
                  <FaInstagram className="text-purple-600 dark:text-purple-400 text-2xl mb-2" />
                  <span className="text-xs text-gray-700 dark:text-gray-300">Meditations</span>
                </a>
                <a href="https://www.youtube.com/santrampaljimaharajji" className="p-4 bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center">
                  <FaYoutube className="text-red-600 dark:text-red-400 text-2xl mb-2" />
                  <span className="text-xs text-gray-700 dark:text-gray-300">Prayer Group</span>
                </a>
                <a href="https://x.com/SaintRampalJiM" className="p-4 bg-linear-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center">
                  <FaTwitter className="text-cyan-600 dark:text-cyan-400 text-2xl mb-2" />
                  <span className="text-xs text-gray-700 dark:text-gray-300">Wisdom</span>
                </a>
                {/* <a href="#" className="p-4 bg-linear-to-br from-blue-200 to-blue-300 dark:from-blue-800 dark:to-blue-700 rounded-xl hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center">
                  <FaLinkedin className="text-blue-700 dark:text-blue-300 text-2xl mb-2" />
                  <span className="text-xs text-gray-700 dark:text-gray-300">Community</span>
                </a>
                <div className="p-4 bg-linear-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl flex flex-col items-center justify-center">
                  <FaShieldAlt className="text-amber-600 dark:text-amber-400 text-2xl mb-2" />
                  <span className="text-xs text-gray-700 dark:text-gray-300">Secure</span>
                </div> */}
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                Join our divine community for daily blessings
              </p>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-linear-to-br from-white to-amber-50/50 dark:from-gray-800/80 dark:to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-amber-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-linear-to-br from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 rounded-xl">
                  <FaPaperPlane className="text-emerald-600 dark:text-emerald-400 text-2xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Send Divine Message</h2>
                  <p className="text-gray-600 dark:text-gray-400">We respond within 24 hours with blessings</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-800 dark:text-white font-medium">
                    <FaUser className="text-amber-600 dark:text-amber-400" />
                    Your Sacred Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your blessed name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-4 rounded-2xl bg-linear-to-r from-amber-50/50 to-orange-50/50 dark:from-gray-800 dark:to-gray-900 border-2 border-amber-200 dark:border-gray-700 focus:border-amber-400 dark:focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400/30 dark:focus:ring-amber-500/30 transition-all duration-300 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-800 dark:text-white font-medium">
                    <FaEnvelope className="text-blue-600 dark:text-blue-400" />
                    Blessed Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="peace@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-4 rounded-2xl bg-linear-to-r from-amber-50/50 to-orange-50/50 dark:from-gray-800 dark:to-gray-900 border-2 border-amber-200 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400/30 dark:focus:ring-blue-500/30 transition-all duration-300 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-800 dark:text-white font-medium">
                    <FaComment className="text-purple-600 dark:text-purple-400" />
                    Divine Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Share your thoughts, prayers, or spiritual questions..."
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full p-4 rounded-2xl bg-linear-to-r from-amber-50/50 to-orange-50/50 dark:from-gray-800 dark:to-gray-900 border-2 border-amber-200 dark:border-gray-700 focus:border-purple-400 dark:focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400/30 dark:focus:ring-purple-500/30 transition-all duration-300 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                  ></textarea>
                </div>

                {/* Status Messages */}
                {success && (
                  <div className="p-4 bg-linear-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200 dark:border-green-800/30">
                    <div className="flex items-center gap-3">
                      <FaCheckCircle className="text-green-500 dark:text-green-400 text-xl" />
                      <p className="text-green-700 dark:text-green-300">{success}</p>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="p-4 bg-linear-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-2xl border border-red-200 dark:border-red-800/30">
                    <div className="flex items-center gap-3">
                      <div className="text-red-500 dark:text-red-400 text-xl">🙏</div>
                      <p className="text-red-700 dark:text-red-300">{error}</p>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-linear-to-r from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin text-xl" />
                      Sending with Blessings...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="group-hover:translate-x-1 transition-transform" />
                      Send Divine Message
                    </>
                  )}
                </button>

                {/* Security Note */}
                <div className="pt-4 border-t border-amber-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <FaShieldAlt className="text-amber-600 dark:text-amber-400" />
                    <p>Your message is protected with divine encryption. We respect your spiritual privacy.</p>
                  </div>
                </div>
              </form>
            </div>

            {/* FAQ/Additional Info */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-linear-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-4 border border-blue-200 dark:border-blue-800/30">
                <h3 className="font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                  <FaStar className="text-blue-500" />
                  Response Time
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We respond within 24 hours, often with morning blessings
                </p>
              </div>
              
              <div className="bg-linear-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-4 border border-purple-200 dark:border-purple-800/30">
                <h3 className="font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                  <FaHeart className="text-red-500" />
                  Spiritual Support
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Need urgent spiritual guidance? We're here for you
                </p>
              </div>
              
              <div className="bg-linear-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-4 border border-amber-200 dark:border-amber-800/30">
                <h3 className="font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                  <FaShieldAlt className="text-amber-600" />
                  Privacy Promise
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your spiritual conversations remain sacred and private
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divine Message */}
        <div className="mt-12 text-center">
          <div className="text-4xl mb-4">🪷🙏🕊️</div>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            "May your message carry divine energy and receive blessings from the universe. 
            We await your sacred words with open hearts."
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
            With love from the Sacred Journey Team
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
}