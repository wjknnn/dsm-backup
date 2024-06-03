import { removeCookie, setCookie } from '@/utils';
import { createClient } from '@/utils/supabase/client';
import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 30000,
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const supabase = createClient();
      const { data, error } = await supabase.auth.refreshSession();
      if (!error) {
        const { session } = data;
        setCookie('token', `${session?.access_token}`);
      }
    }
    return Promise.reject(error);
  }
);
