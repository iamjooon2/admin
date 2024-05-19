'use client';

import { membersProfileUpdateApi } from '@/api/member/member.api';
import styles from '@/app/(afterLogin)/_components/modals/imageModal/imageModal.module.scss';
import useMemberStore from '@/store/member.js/member';
import useProfileStatusStore from '@/store/profileStatus/profileStatus';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ImageModal() {
  const router = useRouter();
  const profileStatus = useProfileStatusStore((state) => state.profileStatus);

  const member = useMemberStore((state) => state.member);
  const [status, setStatus] = useState('');
  const {
    name,
    field,
    memberId,
    openKakaoRoomUrl,
    studentIdImageUrl,
    openKakaoRoomStatus,
    profileImageStatus,
    studentIdImageStatus,
    profileImageUrl,
  } = member;

  useEffect(() => {
    if (profileStatus[field]) {
      setStatus(profileStatus[field][0]);
    }
  }, []);

  const onClickClose = (e) => {
    router.back();
  };

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
  };

  const onClickProfileUpdate = async () => {
    const newData = {
      openKakaoRoomStatus: field === 'openKakaoRoomStatus' ? status : openKakaoRoomStatus,
      profileImageStatus: field === 'profileImageStatus' ? status : profileImageStatus,
      studentIdImageStatus: field === 'studentIdImageStatus' ? status : studentIdImageStatus,
    };

    try {
      await membersProfileUpdateApi(memberId, newData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.modalBackground} onClick={onClickClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <header className={styles.modalHeader}>
          <button className={styles.closeButton} onClick={onClickClose}>
            <svg width={24} viewBox="0 0 24 24" aria-hidden="true">
              <g>
                <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
              </g>
            </svg>
          </button>
          {`${name} : ${memberId}`}
        </header>
        <section className={styles.section}>
          <div className={styles.imgBox}>
            {field === 'openKakaoRoomStatus' ? (
              <div
                style={{ color: 'blue', textDecoration: 'underline' }}
                onClick={() => {
                  window.open(openKakaoRoomUrl);
                }}
              >
                {openKakaoRoomUrl}
              </div>
            ) : (
              <img
                className={styles.img}
                src={field === 'studentIdImageStatus' ? studentIdImageUrl : profileImageUrl}
              ></img>
            )}
          </div>
          <select value={status} onChange={onChangeStatus}>
            {profileStatus[field]?.map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
          <button onClick={onClickProfileUpdate}>변경</button>
        </section>
      </div>
    </div>
  );
}
