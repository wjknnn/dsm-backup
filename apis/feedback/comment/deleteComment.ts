import { createClient } from '@/utils/supabase/client'

export const deleteComment = async (id: string) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('feedback_comment')
    .delete()
    .eq('id', id)

  if (error) Promise.reject(error)
  return data
}
