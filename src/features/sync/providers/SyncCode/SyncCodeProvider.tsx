import { useMemo, useState, useEffect, useCallback } from "react";
import { SYNC_CODE_STORAGE_KEY } from "./constants";
import type { SyncCodeContextType, SyncCodeProviderProps } from "./types";
import { isValidSyncCode, normalizeSyncCode, resolveInitialSyncCode } from "./utils";
import { SyncCodeContext } from "./useSyncCode";

export const SyncCodeProvider = ({ children }: SyncCodeProviderProps) => {
  const [code, setCodeState] = useState(resolveInitialSyncCode);

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
