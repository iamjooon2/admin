import { create } from 'zustand';

const useAuthStore = create((set) => ({
  sessionId: '',
  setSessionId: (sessionId) => {
    set({ sessionId });
  },
  removeSessionId: async () => {
    set({ sessionId: '' });
    window.sessionStorage.setItem('threeIdiots', '');
  },
}));

export default useAuthStore;
