"use client";

export const ThemeButton = () => {
  const changeDark = () => {
    document.documentElement.classList.toggle("dark");
  };
  return (
    <button
      id="darkModeToggle"
      className="text-gray-600 dark:text-gray-400 dark:bg-red-500"
      onClick={changeDark}
    >
      Dark Mode 토글
    </button>
  );
};
