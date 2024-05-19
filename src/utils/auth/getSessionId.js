import useAuthStore from '@/store/auth/auth';

export const getSessionId = () => {
  const { sessionId } = useAuthStore.getState();
  return sessionId;
};

export const deleteSessionId = () => {
  const { removeSessionId } = useAuthStore.getState();
  return removeSessionId();
};
