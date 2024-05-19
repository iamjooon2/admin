import { Post } from '@/utils/api/api';

export const loginApi = (contents) => Post('/auth/login', contents);
