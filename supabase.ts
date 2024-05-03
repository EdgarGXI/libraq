import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://zpuhnvflmdsliafydpfy.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwdWhudmZsbWRzbGlhZnlkcGZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ3MDQxNDIsImV4cCI6MjAzMDI4MDE0Mn0.CyfJn2dB7Ahhh-G-QBKHhMjf8GOdYHCZS-w5v2UevWQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

