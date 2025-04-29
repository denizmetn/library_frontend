import { Switch } from "antd";
import React, { useEffect, useState } from "react";
const Settings = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");

    if (theme === "dark") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <div>
      <div className="bg-neutral-100 dark:bg-gray-800 rounded-xl shadow-md p-6 space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-lg font-medium text-gray-700 dark:text-gray-400">
            Tema
          </label>
          <Switch
            onChange={changeTheme}
            checked={theme === "dark"}
            checkedChildren="Karanlık"
            unCheckedChildren="Açık"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold ">Şifre Değiştir</h1>
        <button className="w-1/4 h-10 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-300 shadow-md">
          Şifre Değiştir
        </button>
      </div>
    </div>
  );
};
export default Settings;
