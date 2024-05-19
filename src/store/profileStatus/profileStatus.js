import { create } from 'zustand';

const useProfileStatusStore = create((set) => ({
  profileStatus: {},
  setProfileStatus: (profileStatus) => {
    set({ profileStatus });
  },
}));

export default useProfileStatusStore;
