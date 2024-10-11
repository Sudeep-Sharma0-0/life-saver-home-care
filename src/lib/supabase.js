// lib/supabase.js
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient("https://ufuoxgvmnchdcrfbilii.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmdW94Z3ZtbmNoZGNyZmJpbGlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgwNDQ0MzYsImV4cCI6MjA0MzYyMDQzNn0.LYxupXnpxL0lauJepGOCmx1ymgNyaqCsa_O5IeJ2oTc");

export { supabase };
