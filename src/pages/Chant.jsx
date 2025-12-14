import React, { useState, useEffect } from "react";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.png";
import img5 from "../assets/img5.png";
import img6 from "../assets/img6.png";
import img7 from "../assets/img7.png";
import { FaPlus, FaRedo, FaPlay, FaPause, FaVolumeUp, FaHome } from "react-icons/fa";

const Chant = () => {
  const [count, setCount] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [selectedImage, setSelectedImage] = useState(img1);

  const imagesRow1 = [img2, img3, img4];
  const imagesRow2 = [img5, img6, img7];

  // Auto-increment functionality
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCount(prev => {
          if (prev >= 108) {
            return 1; // Reset to 1 (not 0) since we're incrementing
          }
          return prev + 1;
        });
      }, 6000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Reset to 0 when count reaches 108
  useEffect(() => {
    if (count >= 108) {
      setTimeout(() => {
        setCount(0);
      }, 1000); // Show completion for 1 second then reset
    }
  }, [count]);

  const handleIncrement = () => {
    if (count >= 108) {
      setCount(1); // If at 108, go to 1 (since we're adding 1)
    } else {
      setCount(count + 1);
    }
  };

  const handleReset = () => {
    setCount(0);
    setIsAutoPlaying(false);
  };

  const quickAdd = (number) => {
    const newCount = count + number;
    if (newCount >= 108) {
      setCount(0); // Reset to 0 if exceeds 108
    } else {
      setCount(newCount);
    }
  };

  const resetToImg1 = () => {
    setSelectedImage(img1);
  };

  // Calculate display count (shows 108 briefly before resetting)
  const displayCount = count >= 108 ? 108 : count;
  const progressPercentage = Math.min((displayCount / 108) * 100, 100);

  return (
    <div className="min-h-screen bg-linear-to-b from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center p-4 transition-colors duration-300">
      {/* Header */}
      <div className="w-full max-w-md text-center mt-4 mb-6">
        <h1 className="text-3xl font-bold bg-linear-to-r from-purple-700 to-indigo-700 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
          Chant Counter
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Count your mantras with devotion</p>
      </div>

      {/* Main Content Card */}
      <div className="w-full max-w-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 mb-6 border border-white/40 dark:border-gray-700/40 transition-colors duration-300">
        {/* Large Counter Display */}
        <div className="text-center mb-6">
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-linear-to-r from-purple-400 to-pink-400 dark:from-purple-600 dark:to-pink-600 rounded-full blur-lg opacity-30"></div>
            <div className={`relative bg-linear-to-br from-purple-50 to-white dark:from-gray-800 dark:to-gray-900 border border-purple-100 dark:border-gray-700 rounded-2xl p-6 shadow-inner transition-all duration-300 ${count >= 108 ? 'animate-pulse' : ''}`}>
              <div className="text-7xl font-bold text-gray-800 dark:text-white">{displayCount}</div>
              <div className="text-purple-600 dark:text-purple-400 text-sm font-medium mt-2">
                {count >= 108 ? "Mala Complete! 🎉" : "Mantras Chanted"}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
            <span>Progress</span>
            <span>{displayCount}/108</span>
          </div>
          <div className="h-3 bg-purple-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-linear-to-r from-green-400 to-emerald-500 dark:from-green-500 dark:to-emerald-600 transition-all duration-300 ${count >= 108 ? 'animate-pulse' : ''}`}
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-1">
            {count >= 108 ? "Mala Complete! Resetting..." : `${108 - displayCount} remaining for full mala`}
          </div>
        </div>

        {/* Main Image with Reset Button */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Reset to img1 Button */}
            <button
              onClick={resetToImg1}
              className="absolute -top-2 -right-2 z-10 bg-linear-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 text-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 active:scale-95"
              title="Reset to default image"
            >
              <FaHome size={14} />
            </button>
            
            <div className="absolute -inset-3 bg-linear-to-r from-amber-400 to-orange-400 dark:from-amber-600 dark:to-orange-600 rounded-full blur-md opacity-40"></div>
            <img
              src={selectedImage}
              alt="Main Deity"
              className="relative rounded-full h-40 w-40 object-cover border-4 border-white dark:border-gray-700 shadow-xl"
            />
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-linear-to-r from-purple-600 to-purple-700 dark:from-purple-700 dark:to-purple-800 text-white px-4 py-1 rounded-full text-xs font-medium shadow-md">
              Active
            </div>
          </div>
        </div>

        {/* Image Rows */}
        <div className="space-y-6 mb-8">
          {/* Row 1 */}
          <div className="flex justify-center gap-4">
            {imagesRow1.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`rounded-full p-1 transition-all duration-300 ${
                  selectedImage === img 
                    ? 'ring-4 ring-yellow-400 dark:ring-yellow-500 scale-110' 
                    : 'ring-2 ring-gray-200 dark:ring-gray-700 hover:ring-purple-300 dark:hover:ring-purple-500 hover:scale-105'
                }`}
              >
                <img
                  src={img}
                  alt={`Chant ${index + 2}`}
                  className="rounded-full h-16 w-16 object-cover"
                />
              </button>
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex justify-center gap-4">
            {imagesRow2.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`rounded-full p-1 transition-all duration-300 ${
                  selectedImage === img 
                    ? 'ring-4 ring-yellow-400 dark:ring-yellow-500 scale-110' 
                    : 'ring-2 ring-gray-200 dark:ring-gray-700 hover:ring-purple-300 dark:hover:ring-purple-500 hover:scale-105'
                }`}
              >
                <img
                  src={img}
                  alt={`Chant ${index + 5}`}
                  className="rounded-full h-16 w-16 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Quick Add Buttons - Uncomment if needed */}
        {/* <div className="grid grid-cols-4 gap-3 mb-6">
          <button
            onClick={() => quickAdd(1)}
            className="bg-linear-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 py-3 rounded-xl text-sm font-medium active:scale-95 transition-all"
          >
            +1
          </button>
          <button
            onClick={() => quickAdd(5)}
            className="bg-linear-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border border-green-200 dark:border-green-700 text-green-700 dark:text-green-300 py-3 rounded-xl text-sm font-medium active:scale-95 transition-all"
          >
            +5
          </button>
          <button
            onClick={() => quickAdd(10)}
            className="bg-linear-to-r from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30 border border-amber-200 dark:border-amber-700 text-amber-700 dark:text-amber-300 py-3 rounded-xl text-sm font-medium active:scale-95 transition-all"
          >
            +10
          </button>
          <button
            onClick={() => quickAdd(27)}
            className="bg-linear-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 border border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300 py-3 rounded-xl text-sm font-medium active:scale-95 transition-all"
          >
            +27
          </button>
        </div> */}

        {/* Main Action Buttons */}
        <div className="flex justify-center gap-4 mb-4">
          {/* Auto Play Button */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all ${
              isAutoPlaying 
                ? 'bg-linear-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700' 
                : 'bg-linear-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700'
            }`}
          >
            {isAutoPlaying ? 
              <FaPause size={20} className="text-white" /> : 
              <FaPlay size={20} className="text-white" />
            }
          </button>

          {/* Increment Button */}
          <button
            onClick={handleIncrement}
            className={`flex items-center justify-center w-20 h-20 rounded-full shadow-xl active:scale-95 transition-transform ${
              count >= 108 
                ? 'bg-linear-to-r from-yellow-500 to-orange-500 dark:from-yellow-600 dark:to-orange-600 animate-pulse' 
                : 'bg-linear-to-r from-purple-600 to-purple-700 dark:from-purple-700 dark:to-purple-800'
            }`}
          >
            <FaPlus size={24} className="text-white" />
          </button>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="flex items-center justify-center w-14 h-14 rounded-full bg-linear-to-r from-gray-500 to-gray-600 dark:from-gray-600 dark:to-gray-700 shadow-lg active:scale-95 transition-transform"
          >
            <FaRedo size={20} className="text-white" />
          </button>
        </div>

        {/* Sound Button */}
        {/* <div className="flex justify-center">
          <button className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 border border-indigo-100 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium">
            <FaVolumeUp size={14} />
            Play Meditation Tone
          </button>
        </div> */}
      </div>

      {/* Stats Bar */}
      <div className="w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 mb-6 shadow-md transition-colors duration-300">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">{displayCount}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Current</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{Math.floor(displayCount/108)}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Malas</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{108 - (displayCount % 108)}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Remaining</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-500 dark:text-gray-400 text-sm mb-8">
        <p className="text-lg">🙏🙏🙏Sat Saheb🙏🙏🙏</p>
      </div>

      {/* Completion Celebration */}
      {count >= 108 && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-linear-to-br from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900 border-2 border-yellow-300 dark:border-yellow-600 rounded-3xl p-8 max-w-sm mx-4 shadow-2xl text-center animate-bounce">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-orange-700 dark:text-orange-300 mb-2">Mala Complete!</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">You've completed 108 chants. Well done!</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Auto-resetting in 1 second...</p>
          </div>
        </div>
      )}

      {/* Auto-play Indicator */}
      {isAutoPlaying && (
        <div className="fixed top-4 right-4 bg-linear-to-r from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg animate-pulse">
          Auto-counting...
        </div>
      )}
    </div>
  );
};

export default Chant;