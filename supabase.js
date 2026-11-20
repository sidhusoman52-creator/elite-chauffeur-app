
import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://xnykeattlvxfevbfrrml.supabase.co";

// Keep your existing publishable key here.
const SUPABASE_ANON_KEY = "sb_publishable_SmeD_22mi0H-4ISHrk2jjA_ZSnnVnFb";

export const supabase = createClient(
  SUPABASE_URL,
    SUPABASE_ANON_KEY,
      {
          auth: {
                storage: AsyncStorage,
                      autoRefreshToken: true,
                            persistSession: true,
                                  detectSessionInUrl: false
                                      }
                                        }
                                        );
