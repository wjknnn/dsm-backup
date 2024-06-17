export type FeedbackAnswerType = {
  id: number;
  content: string;
  like: string[];
  pick: boolean;
  writer: string;
  feedback: number;
  created_at: string;
  users: { name: string; profile_image: string };
  feedback_comment: { count: number }[];
};

export type FeedbackAnswerListType = FeedbackAnswerType[];
