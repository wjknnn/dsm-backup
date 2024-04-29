import { instance } from './interceptor';

export interface UserDataType {
  id: string;
  name: string;
  grade: number;
  profile_image?: string;
}

export const signup = async (token: string, userData: UserDataType) => {
  console.log(`called!\ntoken : ${token}\nuserData : ${userData}`);
  return await instance({
    method: 'POST',
    url: `/auth/signup`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: userData,
  })
    .then((response) => {
      console.log(response);
      return 1;
    })
    .catch((error) => {
      console.log(error);
      return 0;
    });
};
