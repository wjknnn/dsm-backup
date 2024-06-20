import { TopicListType } from '@/types';
import { instance } from '../interceptor';

export const getTopicList = async (page?: number, limit?: number) => {
  return await instance<TopicListType>({
    method: 'GET',
    url: `/topic/all?page=${page ?? 1}&limit=${limit || 20}`,
  }).then((response) => response.data);
};
