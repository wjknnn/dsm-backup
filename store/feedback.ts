import { FeedbackOrderType } from '@/types';
import { create } from 'zustand';

type feedbackStoreType = {
  page: number;
  order: FeedbackOrderType;
  isList: boolean;
  updatePage: (newPage: number) => void;
  updateOrder: (newOrder: FeedbackOrderType) => void;
  updateIsList: (newIsList: boolean) => void;
};

export const feedbackStore = create<feedbackStoreType>((set) => ({
  page: 1,
  order: 'latest',
  isList: false,
  updatePage: (newPage: number) => set(() => ({ page: newPage })),
  updateOrder: (newOrder: FeedbackOrderType) =>
    set(() => ({ order: newOrder })),
  updateIsList: (newIsList: boolean) => set(() => ({ isList: newIsList })),
}));
