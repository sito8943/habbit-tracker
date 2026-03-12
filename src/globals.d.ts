declare module "@fontsource/*" {}
declare module "@fontsource-variable/*" {}

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_CO?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly VITE_SUPABASE_ANON?: string;
  readonly VITE_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
