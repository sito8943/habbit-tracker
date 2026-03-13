import { SYNC_CODE_ALPHABET, SYNC_CODE_LENGTH, SYNC_CODE_STORAGE_KEY } from "./constants";

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

export const resolveInitialSyncCode = (): string => {
  const storedCode = localStorage.getItem(SYNC_CODE_STORAGE_KEY);
  const normalizedStoredCode = normalizeSyncCode(storedCode ?? "");

  if (isValidSyncCode(normalizedStoredCode)) {
    return normalizedStoredCode;
  }

  const generatedCode = generateSyncCode();
  localStorage.setItem(SYNC_CODE_STORAGE_KEY, generatedCode);

  return generatedCode;
};
