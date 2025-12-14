import { FaMoon, FaSun, FaTimes, FaGlobe } from "react-icons/fa";
import GoogleTranslate from "./GoogleTranslate";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/redux/themeSlice";

const SettingsModal = ({ open, onClose }) => {
    const dispatch = useDispatch();
    const { theme } = useSelector((state) => state.theme);

    if (!open) return null;

    return (

        <>
        <GoogleTranslate/>
        <div className="fixed inset-0 z-9999 bg-black/40 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 relative">

                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
                >
                    <FaTimes />
                </button>

                <h2 className="text-xl font-bold mb-6 text-center">
                    ⚙️ Settings
                </h2>

                {/* Theme */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-gray-100 dark:bg-gray-800 mb-4">
                    <div className="flex items-center gap-3">
                        {theme === "light" ? <FaMoon /> : <FaSun />}
                        <span className="font-medium">Theme</span>
                    </div>

                    <button
                        onClick={() => dispatch(toggleTheme())}
                        className="px-4 py-2 rounded-lg bg-amber-500 text-white"
                    >
                        {theme === "light" ? "Dark" : "Light"}
                    </button>
                </div>

                

                {/* Language */}
                {/* <div className="flex items-center justify-between p-4 rounded-xl bg-gray-100 dark:bg-gray-800">
                    <div className=" z-9999">
                        <FaGlobe />
                        <GoogleTranslate/>
                    </div> */}
                    {/* <GoogleTranslate/> */}

                    
                    
                {/* </div> */}

            </div>
        </div>
        </>
        
    );
};

export default SettingsModal;
