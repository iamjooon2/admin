import { Get, Patch } from '@/utils/api/api';

export const membersApi = (page = 1) => Get(`/members?page=${page}`);

export const membersPendingImage = () => Get('/members/pending/image');
export const membersPendingStudentIma = () => Get('/members/pending/student-id/image');
export const membersPendingKakao = () => Get('/members/pending/kakao');

export const membersApprovalApi = (page = 1) => Get(`/members/approval?page=${page}&size=25`);

export const membersProfileStatusApi = () => Get('/member/profile/status');

export const membersProfileUpdateApi = (memberId, contents) => Patch(`members/${memberId}/profile/status`, contents);
