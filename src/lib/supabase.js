// lib/supabase.js
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient("https://ufuoxgvmnchdcrfbilii.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmdW94Z3ZtbmNoZGNyZmJpbGlpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyODA0NDQzNiwiZXhwIjoyMDQzNjIwNDM2fQ.txOeB8mO0R6ZI1tcK2BDj82Y-LJM5zzfPv989MZUJlY");

export { supabase };
