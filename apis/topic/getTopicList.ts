import { TopicListType } from '@/types';
import { instance } from '../interceptor';

export const getTopicList = async (limit?: number) => {
  return await instance<TopicListType>({
    method: 'GET',
    url: `/topic/all${limit ? `?limit=${limit}` : ''}`,
  });
};
