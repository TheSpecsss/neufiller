import "client-only"
 
import { createClient } from "@supabase/supabase-js"
 
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "env-err";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "env-err";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);