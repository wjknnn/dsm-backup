import { instance } from '../interceptor';

type TopicListData = {
  id: number;
  title: string;
  image: string;
  numA: number;
  numB: number;
  created_at: Date;
}[];

export const getTopicList = async (limit?: number) => {
  return await instance<TopicListData>({
    method: 'GET',
    url: `/topic/all${limit ? `?limit=${limit}` : ''}`,
  });
};
