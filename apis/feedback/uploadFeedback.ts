import { instance } from '../interceptor';

type FeedbackUploadType = {
  title: string;
  content?: string;
  tags?: string[];
  // writer: string;
};

export const uploadFeedback = async (
  token: string,
  feedbackData: FeedbackUploadType
) => {
  return await instance({
    method: 'POST',
    url: '/feedback',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: feedbackData,
  });
};
