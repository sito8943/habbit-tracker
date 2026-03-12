import { createContext, useContext } from "react";

export const SYNC_CODE_STORAGE_KEY = "habit-sync-code";
export const SYNC_CODE_LENGTH = 4;

const SYNC_CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export const normalizeSyncCode = (value: string): string =>
  value
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, SYNC_CODE_LENGTH);

export const isValidSyncCode = (value: string): boolean =>
  new RegExp(`^[A-Z0-9]{${SYNC_CODE_LENGTH}}$`).test(value);

export const generateSyncCode = (): string =>
  Array.from(
    { length: SYNC_CODE_LENGTH },
    () => SYNC_CODE_ALPHABET[Math.floor(Math.random() * SYNC_CODE_ALPHABET.length)]
  ).join("");

export type SyncCodeContextType = {
  code: string;
  setCode: (nextCode: string) => boolean;
};

export const SyncCodeContext = createContext<SyncCodeContextType | null>(null);

export const useSyncCode = (): SyncCodeContextType => {
  const context = useContext(SyncCodeContext);

  if (!context) {
    throw new Error("useSyncCode must be used within a SyncCodeProvider");
  }

  return context;
};
