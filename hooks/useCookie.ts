import { useState, useCallback } from 'react';
import Cookies from 'js-cookie';

// Define the type of the return values from the hook
type UseCookieReturn<T> = [
  T | null, // value
  (newValue: T, options?: Cookies.CookieAttributes) => void, // updateCookie function
  () => void // deleteCookie function
];

// Custom hook
export default function useCookie<T>(name: string, defaultValue: T): UseCookieReturn<T> {
  const [value, setValue] = useState<T | null>(() => {
    const cookie = Cookies.get(name);
    if (cookie) return cookie as unknown as T; // Type assertion for cookie value
    Cookies.set(name, defaultValue as any); // TypeScript requires casting to 'any' when setting cookies
    return defaultValue;
  });

  const updateCookie = useCallback(
    (newValue: T, options?: Cookies.CookieAttributes) => {
      Cookies.set(name, newValue as any, options); // TypeScript needs 'newValue' to be cast to 'any'
      setValue(newValue);
    },
    [name]
  );

  const deleteCookie = useCallback(() => {
    Cookies.remove(name);
    setValue(null);
  }, [name]);

  return [value, updateCookie, deleteCookie];
}
