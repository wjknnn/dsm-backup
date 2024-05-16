import { FeedbackListType, FeedbackOrderType } from '@/types';
import { instance } from '../interceptor';

export const getFeedbackList = async (
  page: number,
  order?: FeedbackOrderType
) => {
  return await instance<FeedbackListType>({
    method: 'GET',
    url: `/feedback/all?page=${page}&order=${order || 'latest'}`,
  });
};
