import { create } from 'zustand';

type PageStoreType = {
  page: number;
  updatePage: (newPage: number) => void;
};

export const topicPageStore = create<PageStoreType>((set) => ({
  page: 1,
  updatePage: (newPage: number) => set(() => ({ page: newPage })),
}));
