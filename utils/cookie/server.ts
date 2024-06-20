import { cookies } from 'next/headers';
import { createClient } from '../supabase/server';

export const getUserId = () => {
  return cookies().get('userId')?.value;
};

export const getToken = () => {
  return cookies().get('token')?.value;
};

export const checkUserId = async () => {
  const supabase = createClient();
  const userId = cookies().get('userId')?.value;
  const { data } = await supabase.auth.getUserIdentities();
  console.log('called!');
  if (userId !== data?.identities[0].user_id) {
    cookies().set('userId', data?.identities[0].user_id || '');
  }
  return data?.identities[0].user_id;
};
