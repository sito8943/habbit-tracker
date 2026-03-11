import { useState, useEffect, useRef } from "react";

const readLocalStorageValue = <T,>(key: string, initialValue: T): T => {
  const saved = localStorage.getItem(key);
  return saved ? (JSON.parse(saved) as T) : initialValue;
};

function useLocalStorage<T>(key: string, initialValue: T) {
  const initialValueRef = useRef(initialValue);
  const [value, setValue] = useState<T>(() => readLocalStorageValue(key, initialValueRef.current));

  useEffect(() => {
    setValue(readLocalStorageValue(key, initialValueRef.current));
  }, [key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

export default useLocalStorage;
