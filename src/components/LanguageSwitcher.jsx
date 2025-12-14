import i18n from "i18next";

const LanguageSwitcher = () => {
  return (
    <select
      className="border px-2 py-1 rounded"
      onChange={(e) => i18n.changeLanguage(e.target.value)}
    >
      <option value="en">English</option>
      <option value="hi">Hindi</option>
    </select>
  );
};

export default LanguageSwitcher;
