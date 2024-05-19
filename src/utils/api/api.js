import axios from 'axios';
import { deleteSessionId, getSessionId } from '../auth/getSessionId';
import { useRouter } from 'next/navigation';

const baseURL = process.env.NEXT_PUBLIC_API_URL;
export const httpApi = axios.create({
  baseURL,
});

httpApi.interceptors.request.use(
  (config) => {
    const sessionId = getSessionId();

    if (sessionId) {
      config.headers['xxx-three-idiots-xxx'] = sessionId;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

httpApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log('401이 작동했어요');
      deleteSessionId();
      console.log('세션ID를 지웠어요');
    }
    return Promise.reject(error);
  },
);

const handleError = (error) => {
  return Promise.reject(error);
};

export const Get = async (url, params = {}) => {
  try {
    const response = await httpApi.get(url, { params });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const Post = async (url, data) => {
  try {
    const response = await httpApi.post(url, data);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const Put = async (url, data) => {
  try {
    const response = await httpApi.put(url, data);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const Delete = async (url) => {
  try {
    const response = await httpApi.delete(url);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const Patch = async (url, data) => {
  try {
    const response = await httpApi.patch(url, data);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};
