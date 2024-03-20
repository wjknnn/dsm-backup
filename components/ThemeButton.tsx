"use client";

export const ThemeButton = () => {
  const changeDark = () => {
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
