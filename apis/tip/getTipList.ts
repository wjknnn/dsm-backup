import { Tables } from '@/types/supabase';
import { createClient } from '@/utils/supabase/client';

export const getTipList = async () => {
  const supabase = createClient();
  const { data: tipListData, error } = await supabase
    .from('tip')
    .select('*')
    .order('created_at', { ascending: true })
    .returns<Tables<'tip'>[]>();

  if (error) return [];

  return tipListData;
};
