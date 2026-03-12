export const queryKeys = {
  habits: (code: string) => ["habits", code] as const,
  logs: (code: string) => ["logs", code] as const,
  logsByRange: (code: string, from: string, to: string) =>
    ["logs", code, "range", from, to] as const,
};
