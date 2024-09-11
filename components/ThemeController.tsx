import React, { useEffect } from 'react';
import { daisyuiThemes } from '../tailwind.config';
import useCookie from '@/hooks/useCookie';

export default function ThemeController() {
  const [theme, setTheme] = useCookie<string>('theme', 'defaultTheme'); // Replace 'defaultTheme' with your default theme

  // Apply the theme to the HTML element
  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  // Handler for changing the theme
  const handleChangeTheme = (newTheme: string) => {
    setTheme(newTheme); // Save theme to cookie
  };

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn m-1">
        Theme
        <svg
          width="12px"
          height="12px"
          className="inline-block h-2 w-2 fill-current opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content bg-base-300 rounded-box z-[1] w-fit h-48 overflow-y-scroll p-2 shadow-2xl right-0"
      >
        {daisyuiThemes.map(avaTheme => (
          <li key={avaTheme}>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
              aria-label={avaTheme}
              value={avaTheme}
              checked={avaTheme === theme}
              onChange={() => handleChangeTheme(avaTheme)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
