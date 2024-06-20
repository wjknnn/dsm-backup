import { getCookie, setCookie } from '../cookies';
import { createClient } from '../supabase/client';

export const getUserId = async () => {
  const supabase = createClient();
  const userId = getCookie('userId');
  const { data } = await supabase.auth.getUserIdentities();
  console.log(data?.identities[0].user_id);
  if (userId !== data?.identities[0].user_id) {
    setCookie('userId', data?.identities[0].user_id || '');
  }
  return data?.identities[0].user_id;
};

export const getToken = () => {
  return getCookie('token');
};
