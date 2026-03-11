export const queryKeys = {
  habits: ["habits"] as const,
  logs: ["logs"] as const,
  logsByRange: (from: string, to: string) => ["logs", "range", from, to] as const,
};
