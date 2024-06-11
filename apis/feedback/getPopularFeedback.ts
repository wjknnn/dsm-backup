import { FeedbackListType } from '@/types';
import { instance } from '../interceptor';

export const getPopularFeedback = async () => {
  return await instance<FeedbackListType>({
    method: 'GET',
    url: '/feedback/popular',
  }).then((response) => response.data);
};
