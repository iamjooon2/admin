import { Post } from '@/utils/api/api';

export const alarmApi = (contents) => Post('/alarm', contents);
