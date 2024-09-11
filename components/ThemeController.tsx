import React, { Suspense, useEffect, useState } from 'react';
import { daisyuiThemes } from '../tailwind.config';
import useCookie from '@/hooks/useCookie';

export default function ThemeController() {
  const [theme, setTheme] = useCookie<string>('theme', 'retro');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && theme) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme, isClient]);

  const handleChangeTheme = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn m-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42"
          />
        </svg>
        <Suspense>{theme}</Suspense>
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
