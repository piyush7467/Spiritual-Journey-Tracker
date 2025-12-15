import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaSave, FaArrowLeft, FaUser, FaUsers,
  FaMapMarkerAlt, FaCalendarAlt, FaPray,
  FaSpinner, FaHome, FaHeart, FaPlus, FaMinus,
  FaUserFriends, FaStar,
  FaBook, FaCheckCircle, FaQuoteLeft
} from "react-icons/fa";

const AddPlace = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Form state
  const [visitType, setVisitType] = useState("individual");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [mantras, setMantras] = useState(""); // Fixed: main mantras
  const [purpose, setPurpose] = useState("");
  const [otherPurpose, setOtherPurpose] = useState("");
  const [memberCount, setMemberCount] = useState(1);
  const [members, setMembers] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  // Set today's date as default
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
  }, []);

  // Handle family member input changes
  const handleMemberChange = (index, field, value) => {
    const newMembers = [...members];
    newMembers[index] = { ...newMembers[index], [field]: value };
    setMembers(newMembers);
    
    // Clear error for this member
    if (errors[`member_${index}_${field}`]) {
      setErrors(prev => ({ ...prev, [`member_${index}_${field}`]: "" }));
    }
  };

  // Add new member
  const addMember = () => {
    setMembers([...members, {}]);
    setMemberCount(memberCount + 1);
  };

  // Remove member
  const removeMember = (index) => {
    if (members.length > 1) {
      const newMembers = members.filter((_, i) => i !== index);
      setMembers(newMembers);
      setMemberCount(memberCount - 1);
      
      // Remove errors for this member
      const newErrors = { ...errors };
      Object.keys(newErrors).forEach(key => {
        if (key.startsWith(`member_${index}_`)) {
          delete newErrors[key];
        }
      });
      setErrors(newErrors);
    }
  };

  // Validate current step
  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 2) {
      if (!place.trim()) newErrors.place = "Please enter the Spiritual place name";
      if (!date) newErrors.date = "Please select the date of your visit";
      if (!mantras) newErrors.mantras = "Please select your spiritual mantra";
      if (!purpose) newErrors.purpose = "Please select the purpose of your visit";
      if (purpose === "Other" && !otherPurpose.trim()) {
        newErrors.otherPurpose = "Please provide the custom purpose";
      }
    }
    
    if (step === 3 && visitType === "family") {
      members.forEach((m, i) => {
        if (!m.name?.trim()) newErrors[`member_${i}_name`] = "Name is required";
        if (!m.relationship?.trim()) newErrors[`member_${i}_relationship`] = "Relationship is required";
      });
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigate to next step
  const goToNextStep = () => {
    if (currentStep === 2 && !validateStep(2)) {
      return;
    }
    
    if (currentStep === 3 && visitType === "family" && !validateStep(3)) {
      return;
    }
    
    const nextStep = currentStep + 1;
    
    if (visitType === "family" && nextStep === 3) {
      setCurrentStep(3);
    } else if (visitType === "individual" && nextStep === 3) {
      handleCreatePlace();
    } else {
      setCurrentStep(nextStep);
    }
  };

  // Handle form submit & API call
  const handleCreatePlace = async () => {
    // Final validation
    if (!validateStep(2)) {
      return;
    }
    
    if (visitType === "family" && !validateStep(3)) {
      return;
    }

    // Get token
    const token = user?.accessToken || localStorage.getItem("accessToken");
    if (!token) {
      alert("🔒 Access token missing. Please login again.");
      return;
    }

    // Prepare payload
    const payload = {
      visitType,
      place: place.trim(),
      date,
      mantras, // Fixed: include main mantras
      purpose,
      customPurpose: purpose === "Other" ? otherPurpose.trim() : null,
      familyMembers:
        visitType === "family"
          ? members.map((m) => ({
            name: m.name.trim(),
            relationship: m.relationship.trim(),
            age: m.age ? parseInt(m.age) : null,
            mantras: m.mantras || "" // Include member mantras if provided
          }))
          : [],
    };

    try {
      setLoading(true);
      const res = await axios.post(
        "https://spiritual-journey-tracker-backend.vercel.app/api/v1/place/create",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      // Show success toast
      alert("✅ " + (res.data.message || "Spiritual visit recorded successfully!"));
      navigate("/place");
      
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "❌ Server Error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const purposeOptions = [
    { value: "Seva", label: "Seva 🙏" },
    { value: "Bhandara", label: "Bhandara 🍲" },
  
    { value: "Other", label: "Other Spiritual Purpose ✨" },
  ];

  const mantrasOptions = [
    { value: "Pratham Nam", label: "Pratham Nam 🙏" },
    { value: "Satnam", label: "Satnam 🌟" },
    { value: "Saarnam", label: "Saarnam ✨" },
    
  ];

  // Clear error when field changes
  const handleFieldChange = (setter, field, value) => {
    setter(value);
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 safe-area transition-colors duration-300">
      {/* Back Button */}
      <button
        onClick={() => navigate("/place")}
        className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-6 hover:text-amber-600 dark:hover:text-amber-400 transition-colors group"
      >
        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Spiritual Visits</span>
      </button>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4 animate-float">🪷</div>
        <h1 className="text-3xl font-bold bg-linear-to-r from-amber-700 to-orange-700 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
          Record Spiritual Visit
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Document your spiritual journey with places and mantras
        </p>
      </div>

      {/* Form Container */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-amber-100 dark:border-gray-700 overflow-hidden">
          {/* Progress Steps */}
          <div className="flex border-b border-amber-100 dark:border-gray-700">
            {[1, 2, 3].map((step) => (
              <button
                key={step}
                onClick={() => setCurrentStep(step)}
                className={`flex-1 py-4 text-center font-medium transition-all duration-300 relative ${currentStep === step
                    ? "bg-linear-to-r from-amber-500 to-orange-500 text-white"
                    : "text-gray-600 dark:text-gray-400 hover:bg-amber-50 dark:hover:bg-gray-700/50"
                  }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep === step
                      ? "border-white/30 bg-white/20"
                      : "border-amber-200 dark:border-gray-600 bg-amber-100 dark:bg-gray-700"
                    }`}>
                    {step}
                  </div>
                  <span className="hidden sm:inline">
                    {step === 1 ? "Visit Type" : step === 2 ? "Details" : visitType === "family" ? "Family" : "Review"}
                  </span>
                </div>
                {currentStep > step && (
                  <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
                    <FaCheckCircle className="text-white text-sm" />
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Step 1: Visit Type */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                  <FaUser className="text-amber-600 dark:text-amber-400" />
                  Select Your Visit Type
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose how you experienced this spiritual journey
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setVisitType("individual")}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-3 group ${visitType === "individual"
                        ? "border-amber-500 bg-linear-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 shadow-lg scale-105"
                        : "border-gray-200 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-700 hover:shadow-lg"
                      }`}
                  >
                    <div className={`p-4 rounded-full transition-all duration-300 ${visitType === "individual"
                        ? "bg-linear-to-r from-amber-500 to-orange-500 group-hover:scale-110"
                        : "bg-gray-100 dark:bg-gray-700 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/30"
                      }`}>
                      <FaUser className={`text-xl transition-colors ${visitType === "individual" ? "text-white" : "text-gray-600 dark:text-gray-400 group-hover:text-amber-600"
                        }`} />
                    </div>
                    <div className="text-center">
                      <h4 className="font-bold text-lg text-gray-800 dark:text-white">Individual Journey</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Personal spiritual experience</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setVisitType("family")}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-3 group ${visitType === "family"
                        ? "border-blue-500 bg-linear-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 shadow-lg scale-105"
                        : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg"
                      }`}
                  >
                    <div className={`p-4 rounded-full transition-all duration-300 ${visitType === "family"
                        ? "bg-linear-to-r from-blue-500 to-cyan-500 group-hover:scale-110"
                        : "bg-gray-100 dark:bg-gray-700 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30"
                      }`}>
                      <FaUsers className={`text-xl transition-colors ${visitType === "family" ? "text-white" : "text-gray-600 dark:text-gray-400 group-hover:text-blue-600"
                        }`} />
                    </div>
                    <div className="text-center">
                      <h4 className="font-bold text-lg text-gray-800 dark:text-white">With Family </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Shared spiritual journey</p>
                    </div>
                  </button>
                </div>

                <div className="flex justify-between pt-6 border-t border-gray-100 dark:border-gray-700">
                  <div></div>
                  <button
                    onClick={goToNextStep}
                    className="bg-linear-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 group"
                  >
                    Continue to Details
                    <FaArrowLeft className="rotate-180 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Details */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                  <FaMapMarkerAlt className="text-amber-600 dark:text-amber-400" />
                  Spiritual Visit Details
                </h3>

                {/* Place */}
                <div>
                  <label className=" text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-amber-600 dark:text-amber-400" />
                    Satlok Ashram Name *
                  </label>
                  <div className="relative">
                    <input
                      className={`w-full p-4 pl-12 bg-white/50 dark:bg-gray-700/50 border-2 rounded-xl focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-800 transition-all duration-300 ${errors.place
                          ? "border-red-500 dark:border-red-500"
                          : "border-amber-200 dark:border-amber-800 focus:border-amber-500 dark:focus:border-amber-500"
                        }`}
                      value={place}
                      onChange={(e) => handleFieldChange(setPlace, "place", e.target.value)}
                      placeholder="Enter the name of satlok ashram"
                    />
                    <FaHome className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500 dark:text-amber-400" />
                  </div>
                  {errors.place && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.place}</p>
                  )}
                </div>

                {/* Date */}
                <div>
                  <label className=" text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <FaCalendarAlt className="text-amber-600 dark:text-amber-400" />
                    Date of Visit *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      className={`w-full p-4 pl-12 bg-white/50 dark:bg-gray-700/50 border-2 rounded-xl focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-800 transition-all duration-300 ${errors.date
                          ? "border-red-500 dark:border-red-500"
                          : "border-amber-200 dark:border-amber-800 focus:border-amber-500 dark:focus:border-amber-500"
                        }`}
                      value={date}
                      onChange={(e) => handleFieldChange(setDate, "date", e.target.value)}
                    />
                    <FaCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500 dark:text-amber-400" />
                  </div>
                  {errors.date && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.date}</p>
                  )}
                </div>

                {/* Mantras - MAIN */}
                <div>
                  <label className=" text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <FaBook className="text-amber-600 dark:text-amber-400" />
                    Your Spiritual Mantra *
                  </label>
                  <div className="relative">
                    <select
                      className={`w-full p-4 pl-12 appearance-none bg-white/50 dark:bg-gray-700/50 border-2 rounded-xl focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-800 transition-all duration-300 ${errors.mantras
                          ? "border-red-500 dark:border-red-500"
                          : "border-amber-200 dark:border-amber-800 focus:border-amber-500 dark:focus:border-amber-500"
                        }`}
                      value={mantras}
                      onChange={(e) => handleFieldChange(setMantras, "mantras", e.target.value)}
                    >
                      <option value="">Choose your guiding mantra</option>
                      {mantrasOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <FaBook className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500 dark:text-amber-400" />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                  {errors.mantras && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.mantras}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    The mantra you chanted during this visit
                  </p>
                </div>

                {/* Purpose */}
                <div>
                  <label className=" text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <FaPray className="text-amber-600 dark:text-amber-400" />
                    Spiritual Purpose *
                  </label>
                  <div className="relative">
                    <select
                      className={`w-full p-4 pl-12 appearance-none bg-white/50 dark:bg-gray-700/50 border-2 rounded-xl focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-800 transition-all duration-300 ${errors.purpose
                          ? "border-red-500 dark:border-red-500"
                          : "border-amber-200 dark:border-amber-800 focus:border-amber-500 dark:focus:border-amber-500"
                        }`}
                      value={purpose}
                      onChange={(e) => handleFieldChange(setPurpose, "purpose", e.target.value)}
                    >
                      <option value="">Select your spiritual intention</option>
                      {purposeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <FaStar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500 dark:text-amber-400" />
                  </div>
                  {errors.purpose && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.purpose}</p>
                  )}
                </div>

                {/* Custom Purpose */}
                {purpose === "Other" && (
                  <div>
                    <label className=" text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Describe Your Spiritual Purpose *
                    </label>
                    <div className="relative">
                      <textarea
                        className={`w-full p-4 pl-12 bg-white/50 dark:bg-gray-700/50 border-2 rounded-xl focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-800 transition-all duration-300 resize-none ${errors.otherPurpose
                            ? "border-red-500 dark:border-red-500"
                            : "border-amber-200 dark:border-amber-800 focus:border-amber-500 dark:focus:border-amber-500"
                          }`}
                        placeholder="Share your spiritual intention, prayer, or experience..."
                        rows="3"
                        value={otherPurpose}
                        onChange={(e) => handleFieldChange(setOtherPurpose, "otherPurpose", e.target.value)}
                      />
                      <FaQuoteLeft className="absolute left-4 top-4 text-amber-500 dark:text-amber-400" />
                    </div>
                    {errors.otherPurpose && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.otherPurpose}</p>
                    )}
                  </div>
                )}

                <div className="flex justify-between pt-6 border-t border-gray-100 dark:border-gray-700">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow transition-all duration-300 flex items-center gap-2 group"
                  >
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    Back
                  </button>
                  <button
                    onClick={goToNextStep}
                    className="bg-linear-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 group"
                  >
                    {visitType === "family" ? "Add Family Members" : "Review & Save"}
                    <FaArrowLeft className="rotate-180 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Family Members or Review */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fadeIn">
                {visitType === "family" ? (
                  <>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                        <FaUserFriends className="text-blue-600 dark:text-blue-400" />
                        Family Members ({memberCount})
                      </h3>
                      <button
                        onClick={addMember}
                        className="bg-linear-to-r from-blue-500 to-cyan-500 text-white p-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
                        title="Add family member"
                      >
                        <FaPlus />
                        <span className="hidden sm:inline">Add Member</span>
                      </button>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Add blessed family members who joined this spiritual journey. Each member can have their own mantra.
                    </p>

                    <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                      {members.map((m, i) => (
                        <div
                          key={i}
                          className="p-5 bg-linear-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border-2 border-blue-200 dark:border-blue-800/30"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                                <FaUser className="text-blue-600 dark:text-blue-400" />
                              </div>
                              <h4 className="font-bold text-gray-800 dark:text-white">
                                Member {i + 1}
                              </h4>
                            </div>
                            {members.length > 1 && (
                              <button
                                onClick={() => removeMember(i)}
                                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                title="Remove member"
                              >
                                <FaMinus />
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Name */}
                            <div>
                              <label className=" text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Full Name *
                              </label>
                              <input
                                type="text"
                                className={`w-full p-3 bg-white/70 dark:bg-gray-800/70 border rounded-lg focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-300 ${errors[`member_${i}_name`]
                                    ? "border-red-500 dark:border-red-500"
                                    : "border-blue-200 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-500"
                                  }`}
                                placeholder="Full name"
                                value={m.name || ""}
                                onChange={(e) =>
                                  handleMemberChange(i, "name", e.target.value)
                                }
                              />
                              {errors[`member_${i}_name`] && (
                                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors[`member_${i}_name`]}</p>
                              )}
                            </div>

                            {/* Relationship */}
                            <div>
                              <label className=" text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Relationship *
                              </label>
                              <select
                                className={`w-full p-3 bg-white/70 dark:bg-gray-800/70 border rounded-lg focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-300 ${errors[`member_${i}_relationship`]
                                    ? "border-red-500 dark:border-red-500"
                                    : "border-blue-200 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-500"
                                  }`}
                                value={m.relationship || ""}
                                onChange={(e) =>
                                  handleMemberChange(i, "relationship", e.target.value)
                                }
                              >
                                <option value="">Select relationship</option>
                                <option value="Spouse">Spouse 💑</option>
                                <option value="Child">Child 👶</option>
                                <option value="Parent">Parent 👨‍👩‍👧</option>
                                <option value="Sibling">Sibling 👫</option>
                                <option value="Grandparent">Grandparent 👴👵</option>
                                <option value="Grandchild">Grandchild 🧒</option>
                                <option value="Relative">Relative 👨‍👩‍👧‍👦</option>
                                <option value="Friend">Friend 👥</option>
                              </select>
                              {errors[`member_${i}_relationship`] && (
                                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors[`member_${i}_relationship`]}</p>
                              )}
                            </div>

                            {/* Age */}
                            <div>
                              <label className=" text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Age (Optional)
                              </label>
                              <input
                                type="number"
                                min="1"
                                max="120"
                                className="w-full p-3 bg-white/70 dark:bg-gray-800/70 border border-blue-200 dark:border-blue-800 rounded-lg focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-300"
                                placeholder="Age"
                                value={m.age || ""}
                                onChange={(e) =>
                                  handleMemberChange(i, "age", e.target.value)
                                }
                              />
                            </div>

                            {/* Member Mantra */}
                            <div>
                              <label className=" text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Member's Mantra (Optional)
                              </label>
                              <select
                                className="w-full p-3 bg-white/70 dark:bg-gray-800/70 border border-blue-200 dark:border-blue-800 rounded-lg focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-300"
                                value={m.mantras || ""}
                                onChange={(e) =>
                                  handleMemberChange(i, "mantras", e.target.value)
                                }
                              >
                                <option value="">Select mantra (optional)</option>
                                {mantrasOptions.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  /* Review for Individual */
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                      <FaCheckCircle className="text-emerald-600 dark:text-emerald-400" />
                      Review Your Spiritual Visit
                    </h3>
                    
                    <div className="bg-linear-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl p-5 border border-emerald-200 dark:border-emerald-800/30">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                            <FaMapMarkerAlt className="text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Sacred Place</p>
                            <p className="font-medium text-gray-800 dark:text-white">{place}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                            <FaCalendarAlt className="text-amber-600 dark:text-amber-400" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Date</p>
                            <p className="font-medium text-gray-800 dark:text-white">
                              {new Date(date).toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                            <FaBook className="text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Spiritual Mantra</p>
                            <p className="font-medium text-gray-800 dark:text-white">{mantras}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <FaPray className="text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Purpose</p>
                            <p className="font-medium text-gray-800 dark:text-white">
                              {purpose === "Other" ? otherPurpose : purpose}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-6 border-t border-gray-100 dark:border-gray-700">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow transition-all duration-300 flex items-center gap-2 group"
                  >
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    Back to Details
                  </button>
                  <button
                    onClick={handleCreatePlace}
                    disabled={loading}
                    className="bg-linear-to-r from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        Saving Blessings...
                      </>
                    ) : (
                      <>
                        <FaSave />
                        Save Spiritual Visit
                        <FaCheckCircle className="group-hover:scale-110 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Spiritual Tips */}
        <div className="mt-6 p-5 bg-linear-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl border border-amber-200 dark:border-amber-800/30">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
              <FaHeart className="text-amber-600 dark:text-amber-400 text-xl" />
            </div>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">Sacred Recording Tips</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                  Be specific about the sacred place name
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                  Choose mantras that resonate with your journey
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                  Family members share in the spiritual blessings
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                  Your spiritual records are precious memories
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AddPlace;