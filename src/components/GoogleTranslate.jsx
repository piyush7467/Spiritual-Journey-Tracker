import { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    if (window.__googleTranslateLoaded) return;

    window.__googleTranslateLoaded = true;

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,hi",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      id="google_translate_element"
      className="text-sm"
    />
  );
};

export default GoogleTranslate;
