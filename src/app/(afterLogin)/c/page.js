'use client';

import { membersApprovalApi } from '@/api/member/member.api';
import useMemberStore from '@/store/member.js/member';
import { DataGrid } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Pagination01 from '../_components/paginations/pagination01/Pagination01';

const columns = [
  { field: 'memberId', headerName: '식별번호' },
  { field: 'name', headerName: '이름' },
  { field: 'major', headerName: '학과' },
  { field: 'studentId', headerName: '학번' },
  { field: 'schoolName', headerName: '학교' },
  { field: 'phone', headerName: '연락처' },
  { field: 'openKakaoRoomStatus', headerName: '카카오 상태' },
  { field: 'profileImageStatus', headerName: '프로필 상태' },
  { field: 'studentIdImageStatus', headerName: '학생증 상태' },
];

export default function CPage() {
  const router = useRouter();
  const setMember = useMemberStore((state) => state.setMember);
  const [usersData, setUsersData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchUsersData = async (page) => {
    const { result } = await membersApprovalApi(page);
    setUsersData(result.data);
    setTotalCount(result.data.length);
  };

  useEffect(() => {
    fetchUsersData(page);
  }, [page]);

  const handleUrlClick = (value, field, row) => {
    if (value) {
      const { memberId } = row;
      setMember({ ...row, field });
      router.push(`/c/image/${memberId}`);
    }
  };

  return (
    <>
      <DataGrid
        rows={usersData}
        columns={columns}
        pagination={false}
        {...usersData}
        // rowsPerPageOptions={[5, 10, 20, 25]}
        // paginationMode="server"
        // page={page}
        // onPageChange={handlePageChange}
        getRowId={(row) => row.memberId}
        hasNextPage={true}
        onCellClick={(params) => {
          if (
            params.field === 'openKakaoRoomStatus' ||
            params.field === 'profileImageStatus' ||
            params.field === 'studentIdImageStatus'
          ) {
            handleUrlClick(params.value, params.field, params.row);
          }
        }}
      />
      <Pagination01 setPage={setPage} page={page} totalCount={totalCount} />
    </>
  );
}
