
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://xnykeattlvxfevbfrrml.supabase.co";

// Add your Supabase publishable key between the quotation marks.
const SUPABASE_ANON_KEY = "sb_publishable_SmeD_22mi0H-4ISHrk2jjA_ZSnnVnFb";

export const supabase = createClient(
  SUPABASE_URL,
    SUPABASE_ANON_KEY
    );
