import { setCookie } from './cookies';
import { createClient } from './supabase/client';

export const storeUserId = async (
  updateUserId: (newUserId: string) => void
) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (!error) {
    updateUserId(data.user.id);
    setCookie('userId', data.user.id);
  }
};
