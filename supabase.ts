import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://kqdguvmkecuykquvstvc.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxZGd1dm1rZWN1eWtxdXZzdHZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1ODQwMzAsImV4cCI6MjAzMDE2MDAzMH0.SGzQOmlOpOc-XuJW_QAolqDHDS732mVPz73AdvCxulM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
