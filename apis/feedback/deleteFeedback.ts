import { createClient } from '@/utils/supabase/client';

export const deleteFeedback = async (id: string) => {
  const supabase = createClient();
  const { error } = await supabase.from('feedback').delete().eq('id', +id);

  if (error) {
    console.log(error);
    return 0;
  }

  return 1;
};
