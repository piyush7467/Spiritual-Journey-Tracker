import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { 
  FaSave, FaArrowLeft, FaUser, FaUsers, 
  FaMapMarkerAlt, FaCalendarAlt, FaPray, 
  FaSpinner, FaHome, FaEdit, FaTrash,
  FaUserFriends, FaStar, FaPlus, FaMinus,
  FaExclamationCircle, FaBook
} from "react-icons/fa";

const EditPlace = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);

  // Form state - ADDED mantras STATES
  const [visitType, setVisitType] = useState("individual");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [mantras, setMantras] = useState(""); // ADDED: Main mantras
  const [purpose, setPurpose] = useState("");
  const [otherPurpose, setOtherPurpose] = useState("");
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  // Fetch place details
  useEffect(() => {
    const fetchPlace = async () => {
      const token = user?.accessToken || localStorage.getItem("accessToken");
      if (!token) {
        setError("Access token missing. Please login again.");
        setFetching(false);
        return;
      }

      try {
        const res = await axios.get(
          `https://spiritual-journey-tracker-backend.vercel.app/api/v1/place/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const data = res.data.visit;
        setVisitType(data.visitType || "individual");
        setPlace(data.place || "");
        setDate(data.date ? data.date.split("T")[0] : "");
        setMantras(data.mantras || ""); // ADDED: Set mantras from API
        setPurpose(data.purpose || "");
        setOtherPurpose(data.customPurpose || "");

        if (data.visitType === "family" && data.familyMembers?.length > 0) {
          setMembers(data.familyMembers.map(m => ({
            name: m.name || "",
            relationship: m.relationship || "",
            age: m.age || "",
            mantras: m.mantras || "", // ADDED: Member mantras
            _id: m._id || Date.now() + Math.random()
          })));
        } else {
          setMembers([{ name: "", relationship: "", age: "", mantras: "", _id: Date.now() + Math.random() }]);
        }
      } catch (err) {
        console.error(err);
        if (err.response?.status === 403) {
          setError("Access denied. You cannot edit this Spiritual visit.");
        } else if (err.response?.status === 404) {
          setError("Spiritual visit not found.");
        } else {
          setError("Failed to fetch visit details. Please try again.");
        }
      } finally {
        setFetching(false);
      }
    };

    fetchPlace();
  }, [id, user]);

  // Handle family member input
  const handleMemberChange = (index, field, value) => {
    const newMembers = [...members];
    newMembers[index] = { ...newMembers[index], [field]: value };
    setMembers(newMembers);
  };

  // Add new member
  const addMember = () => {
    setMembers([...members, { 
      name: "", 
      relationship: "", 
      age: "", 
      mantras: "", 
      _id: Date.now() + Math.random() 
    }]);
  };

  // Remove member
  const removeMember = (index) => {
    if (members.length > 1) {
      const newMembers = members.filter((_, i) => i !== index);
      setMembers(newMembers);
    }
  };

  // Handle form submit
  const handleUpdatePlace = async () => {
    // Validation - ADDED mantras VALIDATION
    if (!place.trim()) {
      alert("🙏 Please enter the Spiritual place name");
      return;
    }

    if (!date) {
      alert("🙏 Please select the date of your visit");
      return;
    }

    if (!mantras) {
      alert("🙏 Please select your spiritual mantras");
      return;
    }

    if (!purpose) {
      alert("🙏 Please select the purpose of your visit");
      return;
    }

    if (purpose === "Other" && !otherPurpose.trim()) {
      alert("🙏 Please provide the custom purpose");
      return;
    }

    if (visitType === "family") {
      const invalidMember = members.find(m => !m.name?.trim() || !m.relationship?.trim());
      if (invalidMember) {
        alert("🙏 Please fill all family member details");
        return;
      }
    }

    const token = user?.accessToken || localStorage.getItem("accessToken");
    if (!token) {
      alert("🔒 Access token missing. Please login again.");
      return;
    }

    const payload = {
      visitType,
      place: place.trim(),
      date,
      mantras, // ADDED: Include main mantras
      purpose,
      customPurpose: purpose === "Other" ? otherPurpose.trim() : null,
      familyMembers:
        visitType === "family"
          ? members.map((m) => ({
              name: m.name.trim(),
              relationship: m.relationship.trim(),
              age: m.age ? parseInt(m.age) : null,
              mantras: m.mantras || "" // ADDED: Include member mantras
            }))
          : [],
    };

    try {
      setLoading(true);
      const res = await axios.put(
        `https://spiritual-journey-tracker-backend.vercel.app/api/v1/place/update/${id}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ " + (res.data.message || "Spiritual visit updated successfully!"));
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
    { value: "Other", label: "Other Spiritual Purpose" },
  ];

  const mantrasOptions = [
    { value: "Pratham Nam", label: "Pratham Nam 🙏" },
    { value: "Satnam", label: "Satnam 🌟" },
    { value: "Saarnam", label: "Saarnam ✨" },
  ];

  if (fetching) {
    return (
      <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center justify-center p-4 safe-area">
        <div className="text-center">
          <div className="text-6xl mb-6 animate-pulse">🙏</div>
          <h2 className="text-xl text-gray-700 dark:text-gray-300 mb-4 font-medium">Loading Spiritual Visit...</h2>
          <FaSpinner className="animate-spin text-amber-600 dark:text-amber-400 text-3xl mx-auto" />
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-4">Receiving blessings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 safe-area">
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 max-w-md w-full shadow-2xl border border-red-100 dark:border-red-900">
          <div className="text-5xl text-center mb-6 text-red-500">🙏</div>
          <h3 className="text-xl font-bold text-red-600 dark:text-red-400 text-center mb-3">Unable to Edit Visit</h3>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8">{error}</p>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/place")}
              className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
            >
              Back to Visits
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex-1 bg-linear-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 text-white px-4 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 safe-area transition-colors duration-300">
      {/* Back Button */}
      <button
        onClick={() => navigate("/place")}
        className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-6 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
      >
        <FaArrowLeft />
        <span className="font-medium">Back to Visits</span>
      </button>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">✍️</div>
        <h1 className="text-3xl font-bold bg-linear-to-r from-amber-700 to-orange-700 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
          Edit Spiritual Visit
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Update your spiritual journey details with mantrass
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
                className={`flex-1 py-4 text-center font-medium transition-all duration-300 ${
                  currentStep === step
                    ? "bg-linear-to-r from-amber-500 to-orange-500 text-white"
                    : "text-gray-600 dark:text-gray-400 hover:bg-amber-50 dark:hover:bg-gray-700/50"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep === step 
                      ? "bg-white/20" 
                      : "bg-amber-100 dark:bg-gray-700"
                  }`}>
                    {step}
                  </div>
                  <span className="hidden sm:inline">
                    {step === 1 ? "Type" : step === 2 ? "Details" : "Family"}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Step 1: Visit Type */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                  <FaEdit />
                  Update Visit Type
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setVisitType("individual")}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-3 ${
                      visitType === "individual"
                        ? "border-amber-500 bg-linear-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 shadow-lg"
                        : "border-gray-200 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-700"
                    }`}
                  >
                    <div className={`p-4 rounded-full ${
                      visitType === "individual"
                        ? "bg-linear-to-r from-amber-500 to-orange-500"
                        : "bg-gray-100 dark:bg-gray-700"
                    }`}>
                      <FaUser className={`text-xl ${
                        visitType === "individual" ? "text-white" : "text-gray-600 dark:text-gray-400"
                      }`} />
                    </div>
                    <div className="text-center">
                      <h4 className="font-bold text-lg text-gray-800 dark:text-white">Individual</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Solo spiritual journey</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setVisitType("family")}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-3 ${
                      visitType === "family"
                        ? "border-blue-500 bg-linear-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 shadow-lg"
                        : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
                    }`}
                  >
                    <div className={`p-4 rounded-full ${
                      visitType === "family"
                        ? "bg-linear-to-r from-blue-500 to-cyan-500"
                        : "bg-gray-100 dark:bg-gray-700"
                    }`}>
                      <FaUsers className={`text-xl ${
                        visitType === "family" ? "text-white" : "text-gray-600 dark:text-gray-400"
                      }`} />
                    </div>
                    <div className="text-center">
                      <h4 className="font-bold text-lg text-gray-800 dark:text-white">Family</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">With blessed family members</p>
                    </div>
                  </button>
                </div>

                <div className="flex justify-between pt-6 border-t border-gray-100 dark:border-gray-700">
                  <div></div>
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="bg-linear-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                  >
                    Continue
                    <FaArrowLeft className="rotate-180" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Details */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                  <FaMapMarkerAlt />
                  Update Visit Details
                </h3>

                {/* Place */}
                <div>
                  <label className=" text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-amber-600 dark:text-amber-400" />
                    Satlok Ashram Name *
                  </label>
                  <div className="relative">
                    <input
                      className="w-full p-4 pl-12 bg-white/50 dark:bg-gray-700/50 border-2 border-amber-200 dark:border-amber-800 rounded-xl focus:border-amber-500 dark:focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-800 transition-all duration-300"
                      value={place}
                      onChange={(e) => setPlace(e.target.value)}
                      placeholder="Enter the name of SAtlok ashram"
                    />
                    <FaHome className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500 dark:text-amber-400" />
                  </div>
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
                      className="w-full p-4 pl-12 bg-white/50 dark:bg-gray-700/50 border-2 border-amber-200 dark:border-amber-800 rounded-xl focus:border-amber-500 dark:focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-800 transition-all duration-300"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                    <FaCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500 dark:text-amber-400" />
                  </div>
                </div>

                {/* mantras - ADDED */}
                <div>
                  <label className=" text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <FaBook className="text-purple-600 dark:text-purple-400" />
                    Spiritual mantras *
                  </label>
                  <div className="relative">
                    <select
                      className="w-full p-4 pl-12 appearance-none bg-white/50 dark:bg-gray-700/50 border-2 border-amber-200 dark:border-amber-800 rounded-xl focus:border-amber-500 dark:focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-800 transition-all duration-300"
                      value={mantras}
                      onChange={(e) => setMantras(e.target.value)}
                    >
                      <option value="">Select your spiritual mantras</option>
                      {mantrasOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <FaBook className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500 dark:text-purple-400" />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Purpose */}
                <div>
                  <label className=" text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <FaPray className="text-amber-600 dark:text-amber-400" />
                    Spiritual Purpose *
                  </label>
                  <div className="relative">
                    <select
                      className="w-full p-4 pl-12 appearance-none bg-white/50 dark:bg-gray-700/50 border-2 border-amber-200 dark:border-amber-800 rounded-xl focus:border-amber-500 dark:focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-800 transition-all duration-300"
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                    >
                      <option value="">Select your spiritual purpose</option>
                      {purposeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <FaStar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500 dark:text-amber-400" />
                  </div>
                </div>

                {/* Custom Purpose */}
                {purpose === "Other" && (
                  <div>
                    <label className=" text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Describe Your Purpose *
                    </label>
                    <textarea
                      className="w-full p-4 bg-white/50 dark:bg-gray-700/50 border-2 border-amber-200 dark:border-amber-800 rounded-xl focus:border-amber-500 dark:focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-800 transition-all duration-300 resize-none"
                      placeholder="Share your spiritual intention..."
                      rows="3"
                      value={otherPurpose}
                      onChange={(e) => setOtherPurpose(e.target.value)}
                    />
                  </div>
                )}

                <div className="flex justify-between pt-6 border-t border-gray-100 dark:border-gray-700">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 flex items-center gap-2"
                  >
                    <FaArrowLeft />
                    Back
                  </button>
                  <button
                    onClick={() => visitType === "family" ? setCurrentStep(3) : handleUpdatePlace()}
                    className="bg-linear-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                  >
                    {visitType === "family" ? "Update Family Members" : "Update Visit"}
                    {visitType === "family" ? <FaArrowLeft className="rotate-180" /> : <FaSave />}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Family Members */}
            {currentStep === 3 && visitType === "family" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                    <FaUserFriends className="text-blue-600 dark:text-blue-400" />
                    Family Members ({members.length})
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
                  Update blessed family members who joined this spiritual journey. Each member can have their own mantras.
                </p>

                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {members.map((m, i) => (
                    <div
                      key={m._id || i}
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
                        <div>
                          <label className=" text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Name *
                          </label>
                          <input
                            type="text"
                            className="w-full p-3 bg-white/70 dark:bg-gray-800/70 border border-blue-200 dark:border-blue-800 rounded-lg focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-300"
                            placeholder="Full name"
                            value={m.name || ""}
                            onChange={(e) =>
                              handleMemberChange(i, "name", e.target.value)
                            }
                          />
                        </div>

                        <div>
                          <label className=" text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Relationship *
                          </label>
                          <select
                            className="w-full p-3 bg-white/70 dark:bg-gray-800/70 border border-blue-200 dark:border-blue-800 rounded-lg focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-300"
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
                        </div>

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

                        {/* Member mantras - ADDED */}
                        <div>
                          <label className=" text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Member's mantras (Optional)
                          </label>
                          <select
                            className="w-full p-3 bg-white/70 dark:bg-gray-800/70 border border-blue-200 dark:border-blue-800 rounded-lg focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-300"
                            value={m.mantras || ""}
                            onChange={(e) =>
                              handleMemberChange(i, "mantras", e.target.value)
                            }
                          >
                            <option value="">Select mantras (optional)</option>
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

                <div className="flex justify-between pt-6 border-t border-gray-100 dark:border-gray-700">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 flex items-center gap-2"
                  >
                    <FaArrowLeft />
                    Back to Details
                  </button>
                  <button
                    onClick={handleUpdatePlace}
                    disabled={loading}
                    className="bg-linear-to-r from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <FaSave />
                        Update Spiritual Visit
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Important Note */}
        <div className="mt-6 p-4 bg-linear-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl border border-amber-200 dark:border-amber-800/30">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <FaExclamationCircle className="text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-white mb-1">Important Note</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                You are editing an existing Spiritual visit. Please ensure all information is accurate 
                as this update will replace the previous details. May your updated records bring 
                continued blessings.
              </p>
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
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default EditPlace;