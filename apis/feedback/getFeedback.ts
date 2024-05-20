import { FeedbackType } from '@/types';
import { instance } from '../interceptor';

export const getFeedback = async (id: string) => {
  return await instance<FeedbackType>({
    method: 'GET',
    url: `/feedback/${id}`,
  }).then((response) => response.data);
};
