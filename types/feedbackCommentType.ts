export type FeedbackCommentType = {
  id: number;
  content: string;
  recomment: number;
  feedback: number;
  answer: number;
  writer: string;
  created_at: string;
  updated_at: string;
  users: { name: string; profile_image: string };
};

export type FeedbackCommentListType = FeedbackCommentType[];
