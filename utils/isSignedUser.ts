import { createClient } from './supabase/server';
import { getUserId } from './cookie/server';

export const isSignedUser = async () => {
  const supabase = createClient();
  const userId = getUserId();

  const { error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.log('존재하지 않는 유저.', error);
    return 0;
  } else {
    return 1;
  }
};
