import { createClient } from '@/utils/supabase/client'

export const deleteFeedback = async (id: string) => {
  const supabase = createClient()

  const { data, error } = await supabase.from('feedback').delete().eq('id', +id)

  if (error) Promise.reject(error)
  return data
}
