import { cookies } from 'next/headers';

export const getUserId = () => {
  return cookies().get('userId')?.value;
};

export const getToken = () => {
  return cookies().get('token')?.value;
};
