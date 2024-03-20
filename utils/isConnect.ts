import { createClient } from "./supabase/server";

export const isSupabaseConnected = () => {
  try {
    createClient();
    return true;
  } catch (e) {
    return false;
  }
};
