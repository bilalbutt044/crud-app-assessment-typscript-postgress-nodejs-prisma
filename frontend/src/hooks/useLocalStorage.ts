// src/hooks/useLocalStorage.ts
import { useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        try {
          // Try to parse as JSON first (for objects)
          return JSON.parse(item);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
          // If parsing fails, it's probably just a string or primitive value
          return item as T;
        }
      }
      return initialValue;
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);
      if (typeof valueToStore === "object" || Array.isArray(valueToStore)) {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } else {
        // If it's a string or primitive, just store it as is
        window.localStorage.setItem(key, valueToStore as unknown as string);
      }
    } catch (error) {
      console.error("Error writing to localStorage", error);
    }
  };

  const remove = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error("Error removing from localStorage", error);
    }
  };

  return { storedValue, setValue, remove } as const;
}

export default useLocalStorage;
