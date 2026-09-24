import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL and Anon Key are missing. Authentication and database features will not work until they are set in .env');
}

export const supabase = createClient(
  supabaseUrl || 'http://placeholder-url.com',
  supabaseAnonKey || 'placeholder-anon-key'
);
