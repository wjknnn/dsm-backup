import { getCookie } from '../cookie';

export const getUserId = () => {
  return getCookie('userId');
};

export const getToken = () => {
  return getCookie('token');
};
