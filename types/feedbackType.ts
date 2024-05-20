import { FeedbackStatusType } from './feedbackStatusType';

export type FeedbackType = {
  id: number;
  title: string;
  explanation: string;
  image: string;
  content: string;
  tags: string[];
  status: FeedbackStatusType;
  writer: string;
  feedback: number;
  created_at: string;
  users: { name: string; profile_image: string };
};

export type FeedbackListType = FeedbackType[];
