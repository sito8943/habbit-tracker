export const readLocalStorageValue = <T>(key: string, initialValue: T): T => {
  const saved = localStorage.getItem(key);
  return saved ? (JSON.parse(saved) as T) : initialValue;
};
