'use client';

import React from 'react';
import styles from '@/app/(beforeLogin)/before.module.scss';
import Image from 'next/image';
import logo from '../../../../public/logo.png';
import { loginApi } from '@/api/auth/auth.api';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/auth/auth';
import { membersProfileStatusApi } from '@/api/member/member.api';
import { httpApi } from '@/utils/api/api';
import useProfileStatusStore from '@/store/profileStatus/profileStatus';

export default function BeforePage() {
  const router = useRouter();
  const setProfileStatus = useProfileStatusStore((state) => state.setProfileStatus);
  const setSessionId = useAuthStore((state) => state.setSessionId);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    try {
      const { result } = await loginApi({ ...data });

      const sessionId = result.sessionId;

      console.log('sessionId: {}', result.sessionId);

      window.sessionStorage.setItem('threeIdiots', sessionId);

      await setSessionId(result.sessionId);

      httpApi.defaults.headers.common['xxx-three-idiots-xxx'] = sessionId;
      const { result: memberResult } = await membersProfileStatusApi();
      setProfileStatus({
        openKakaoRoomStatus: memberResult.memberOpenKakaoRoomStatuses,
        profileImageStatus: memberResult.memberProfileImageStatuses,
        studentIdImageStatus: memberResult.memberStudentIdStatuses,
      });

      console.log('로그인 했을때', memberResult);

      alert('로그인에 성공하였습니다.');
      router.replace('/a');
    } catch (err) {
      console.log(err);
      alert('로그인에 실패하였습니다.');
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Image src={logo} alt="logo"></Image>
        <h1 className={styles.title}>BookBla</h1>
      </header>
      <main className={styles.main} onSubmit={onSubmit}>
        <form className={styles.wrapper}>
          <input className={styles.input} name="id" placeholder="아이디" />
          <input className={styles.input} name="password" placeholder="비밀번호" type="password" />
          <button className={styles.button} type="submit">
            로그인
          </button>
        </form>
      </main>
    </div>
  );
}
