"use client";

import { useEffect } from "react";

export const ThemeButton = () => {
  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, []);
  const changeDark = () => {
    if (localStorage.getItem("theme") === "dark") {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
    }
    document.documentElement.classList.toggle("dark");
  };
  return (
    <button
      id="darkModeToggle"
      className="border border-grayLight1 dark:border-grayDark1 rounded-full text-black dark:text-white bg-white dark:bg-black fixed top-[120px] right-[40px] p-[8px_16px]"
      onClick={changeDark}
    >
      Theme Change
    </button>
  );
};
