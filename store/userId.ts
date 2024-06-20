import { create } from 'zustand';

type UserIdStoreType = {
  userId: string;
  updateUserId: (newUserId: string) => void;
};

export const userIdStore = create<UserIdStoreType>((set) => ({
  userId: '',
  updateUserId: (newUserId: string) => set(() => ({ userId: newUserId })),
}));
