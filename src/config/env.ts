const readRequiredEnv = (keys: Array<keyof ImportMetaEnv>): string => {
  for (const key of keys) {
    const value = import.meta.env[key];
    if (typeof value === "string" && value.length > 0) {
      return value;
    }
  }

  throw new Error(`Missing required environment variable. Tried: ${keys.join(", ")}`);
};

export const env = {
  supabaseUrl: readRequiredEnv(["VITE_SUPABASE_URL", "VITE_SUPABASE_CO"]),
  supabaseAnonKey: readRequiredEnv(["VITE_SUPABASE_ANON_KEY", "VITE_SUPABASE_ANON"]),
  supabasePublishableKey: import.meta.env.VITE_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
} as const;
