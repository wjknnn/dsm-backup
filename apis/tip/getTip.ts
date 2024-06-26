import { Tables } from '@/types/supabase';
import { createClient } from '@/utils/supabase/client';

export const getTip = async (id: number) => {
  const supabase = createClient();
  const { data: tipData, error } = await supabase
    .from('tip')
    .select('*')
    .eq('id', id)
    .returns<Tables<'tip'>[]>();

  if (error) return null;

  return tipData[0];
};
