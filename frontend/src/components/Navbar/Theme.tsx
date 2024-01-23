import { useState } from "react";

export default function Theme() {

  const [theme, setTheme_] = useState<Theme>(localStorage.getItem('theme') as Theme);
  type Theme = "light" | "dark" | null
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

  const next: React.MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation();
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
      <button className="w-full p-1 flex gap-2 justify-left items-center bg-inherit hover:bg-fb-comment-bg-light hover:dark:bg-fb-comment-bg transition-colors rounded-md" onClick={next}>
        <div className="flex justify-center items-center bg-inherit h-8 w-8 brightness-200 rounded-full">
          <i className={`fa-solid ${icon()}`} />
        </div>
          Change Theme
      </button>
    </>
  );
}
