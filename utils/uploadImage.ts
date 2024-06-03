import { convertToWebp } from './convertToWebp';
import { createClient } from './supabase/client';

export const uploadImage = async (file: File) => {
  const supabase = createClient();
  const webpFile = await convertToWebp(file);
  const fileName = `${Date.now()}_${file.name.split('.')[0]}.webp`;

  const { error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_NAME || '')
    .upload(fileName, webpFile);

  if (error) throw error;

  return `${process.env.NEXT_PUBLIC_IMAGE_URL}${fileName}`;
};
