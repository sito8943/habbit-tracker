import { useState, useEffect, useRef } from "react";
import type { UseLocalStorageResult } from "./types";
import { readLocalStorageValue } from "./utils";

function useLocalStorage<T>(key: string, initialValue: T): UseLocalStorageResult<T> {
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
