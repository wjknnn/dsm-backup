import { getUserId } from './cookie/client';

export const isSined = (comment: string) => {
  const userId = getUserId();

  if (!userId && !alert(comment)!) {
    location.href = '/login';
    return false;
  }
  return true;
};
