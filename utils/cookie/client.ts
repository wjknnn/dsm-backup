import { getCookie } from '../cookies';

export const getUserId = () => {
  return getCookie('userId');
};

export const getToken = () => {
  return getCookie('token');
};
