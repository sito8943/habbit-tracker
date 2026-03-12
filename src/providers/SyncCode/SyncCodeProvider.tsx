import { useMemo, useState, useEffect, useCallback, type ReactNode } from "react";
import {
  generateSyncCode,
  isValidSyncCode,
  normalizeSyncCode,
  SYNC_CODE_STORAGE_KEY,
  SyncCodeContext,
  type SyncCodeContextType,
} from "./useSyncCode";

type SyncCodeProviderProps = {
  children: ReactNode;
};

const resolveInitialCode = (): string => {
  const storedCode = localStorage.getItem(SYNC_CODE_STORAGE_KEY);
  const normalizedStoredCode = normalizeSyncCode(storedCode ?? "");

  if (isValidSyncCode(normalizedStoredCode)) {
    return normalizedStoredCode;
  }

  const generatedCode = generateSyncCode();
  localStorage.setItem(SYNC_CODE_STORAGE_KEY, generatedCode);

  return generatedCode;
};

export const SyncCodeProvider = ({ children }: SyncCodeProviderProps) => {
  const [code, setCodeState] = useState(resolveInitialCode);

  useEffect(() => {
    localStorage.setItem(SYNC_CODE_STORAGE_KEY, code);
  }, [code]);

  const setCode = useCallback((nextCode: string) => {
    const normalizedCode = normalizeSyncCode(nextCode);
    if (!isValidSyncCode(normalizedCode)) {
      return false;
    }

    setCodeState(normalizedCode);
    return true;
  }, []);

  const contextValue = useMemo<SyncCodeContextType>(
    () => ({
      code,
      setCode,
    }),
    [code, setCode]
  );

  return <SyncCodeContext.Provider value={contextValue}>{children}</SyncCodeContext.Provider>;
};
