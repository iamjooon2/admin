import { create } from 'zustand';

const useMemberStore = create((set) => ({
  member: {},
  setMember: (member) => {
    set({ member });
  },
  resetMember: () => {
    set({ member: {} });
  },
}));

export default useMemberStore;
