import { useState } from "react";

export default function Theme() {

  const [theme, setTheme_] = useState(localStorage.getItem('theme'));
  type Theme = "light" | "dark" | null
  // copied from https://tailwindcss.com/docs/dark-mode#supporting-system-preference-and-manual-selection
  const setTheme = (theme: Theme) => {
    switch (theme) {
    case "dark":
      localStorage.theme = 'dark';
      break;
    case "light":
      localStorage.theme = 'light';
      break;
    default:
      localStorage.removeItem('theme');
      break;
    }
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setTheme_(theme);
  };

  const next = () => {
    switch (localStorage.getItem('theme')) {
    case "dark"  : return setTheme("light");
    case "light" : return setTheme(null);
    default      : return setTheme("dark");
    }
  };

  const icon = () => {
    switch (theme) {
    case "dark"  : return "fa-moon";
    case "light" : return "fa-sun";
    default      : return "fa-desktop";
    }
  };
  return (
    <>
      <button className="bg-inherit h-8 w-8 hover:bg-fb-comment-bg-light hover:dark:bg-fb-comment-bg rounded-full" title="theme" onClick={next}>
        <i className={`fa-solid ${icon()}`} />
      </button>
    </>
  );
}
