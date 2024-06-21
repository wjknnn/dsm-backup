import { TopicType } from '@/types';
import { instance } from '../interceptor';

export const getTopic = async (id: string) => {
  return await instance<TopicType>({
    method: 'GET',
    url: `/topic/${id}`,
  }).then((response) => response.data);
};
