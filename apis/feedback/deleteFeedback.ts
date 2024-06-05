import { instance } from '../interceptor';

export const deleteFeedback = async (id: string, token: string) => {
  return await instance({
    method: 'DELETE',
    url: `/feedback/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
