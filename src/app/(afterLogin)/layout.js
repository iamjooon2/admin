'use client';

import useAuthStore from '@/store/auth/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '@/app/(afterLogin)/after.module.scss';
import { alarmApi } from '@/api/alarm/alarm.api';
import useProfileStatusStore from '@/store/profileStatus/profileStatus';
import { httpApi } from '@/utils/api/api';
import { membersProfileStatusApi } from '@/api/member/member.api';

export default function AfterLayout({ children }) {
  const router = useRouter();
  const setProfileStatus = useProfileStatusStore((state) => state.setProfileStatus);
  const { sessionId, setSessionId, removeSessionId } = useAuthStore();
  const [isAlarm, setIsAlarm] = useState(false);
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  const callApprovalStatus = async (sessionIdStorage) => {
    httpApi.defaults.headers.common['xxx-three-idiots-xxx'] = sessionIdStorage;
    const { result } = await membersProfileStatusApi();
    setProfileStatus({
      openKakaoRoomStatus: result.memberOpenKakaoRoomStatuses,
      profileImageStatus: result.memberProfileImageStatuses,
      studentIdImageStatus: result.memberStudentIdStatuses,
    });
  };

  useEffect(() => {
    const sessionIdStorage = window.sessionStorage.getItem('threeIdiots');

    if (!sessionId) {
      if (sessionIdStorage) {
        setSessionId(sessionIdStorage);

        callApprovalStatus(sessionIdStorage);
        console.log('이게 작동했네');
      } else {
        router.replace('/BSDFJ#DSF%((DFKSJK!ADFFGA');
      }
    }
  }, [sessionId]);

  const onClickAlarm = async () => {
    if (!title && !contents) return alert('값이 비어 있습니다.');
    // 알림 보내기 전에 모달창으로 한번 더 물어보고 보내기
    try {
      await alarmApi({
        title,
        contents,
      });
      setIsAlarm(false);
      setTitle('');
      setContents('');
      alert('알림 전송에 성공하였습니다.');
    } catch (err) {
      console.log('error', err);
      alert('알림 전송에 실패하였습니다.');
    }
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (e) => {
    setContents(e.target.value);
  };

  const onClickLogout = async () => {
    alert('로그아웃 하였습니다.');
    await removeSessionId();
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.headerNav}>
          <ul className={styles.headerUl}>
            <li className={styles.li}>
              <button>새로고침</button>
            </li>
            <li className={styles.li}>
              <button onClick={() => setIsAlarm(true)}>푸쉬알림 보내기</button>
            </li>
            {isAlarm && (
              <li className={styles.alarmLi}>
                <input placeholder="제목" onChange={onChangeTitle}></input>
                <input placeholder="내용" onChange={onChangeContent}></input>
                <button onClick={onClickAlarm}>전송</button>
                <button onClick={() => setIsAlarm(false)}>취소</button>
              </li>
            )}
            <li className={styles.li}>
              <button onClick={onClickLogout}>로그아웃</button>
            </li>
          </ul>
        </nav>
      </header>
      <div className={styles.body}>
        <aside className={styles.aside}>
          <nav>
            <li>
              <a href="a" aria-current="aPage">
                전체 멤버
              </a>
            </li>
            <li>
              <a href="c" aria-current="cPage">
                승인 대기 멤버
              </a>
            </li>
          </nav>
        </aside>
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
