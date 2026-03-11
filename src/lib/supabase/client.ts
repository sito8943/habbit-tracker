import { createClient } from "@supabase/supabase-js";
import { env } from "../../config/env";
import type { Database } from "./database.types";

export const createSupabaseClient = () =>
  createClient<Database>(env.supabaseUrl, env.supabaseAnonKey);
