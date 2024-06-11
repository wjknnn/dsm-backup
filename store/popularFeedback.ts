import { create } from 'zustand';

type PopularFeedbackStoreType = {
  page: number;
  max: number;
  updatePage: (newPage: number) => void;
  updateMax: (newMax: number) => void;
};

export const popularFeedbackStore = create<PopularFeedbackStoreType>((set) => ({
  page: 1,
  max: 5,
  updatePage: (newPage: number) => set(() => ({ page: newPage })),
  updateMax: (newMax: number) => set(() => ({ max: newMax })),
}));
