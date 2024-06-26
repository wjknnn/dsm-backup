export type TopicType = {
  id: number;
  title: string;
  image: string;
  num_a: number;
  num_b: number;
  created_at: string;
  comment: TopicCommentType[];
  commentCount: number;
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
  like?: string[];
  recomment?: number;
  topic: number;
  recommentInfo: Omit<TopicCommentType, 'recommentInfo'>[];
};
