export type TopicType = {
  id: number;
  title: string;
  image: string;
  num_a: number;
  num_b: number;
  created_at: string;
  comment: TopicCommentType[];
};

export type TopicCommentType = {
  id: number;
  comment: string;
  created_at: string;
  updated_at: string;
  user: {
    id: string;
    name: string;
    profile_image?: string;
  };
  recomment?: number;
  topic: number;
  recommentInfo: Omit<TopicCommentType, 'recommentInfo'>[];
};
