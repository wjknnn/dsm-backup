export type FeedbackCommentType = {
  id: number;
  comment: string;
  feedback: number;
  answer: number;
  writer: string;
  created_at: string;
  updated_at: string;
  users: { name: string };
};

export type FeedbackCommentListType = FeedbackCommentType[];
