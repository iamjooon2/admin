'use client';

import { membersApi, membersProfileStatusApi } from '@/api/member/member.api';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import Pagination01 from '../_components/paginations/pagination01/Pagination01';

const columns = [
  { field: 'memberId', headerName: '식별번호', width: 70 },
  { field: 'memberType', headerName: '회원타입', width: 70 },
  { field: 'name', headerName: '이름', width: 70 },
  { field: 'gender', headerName: '성별', width: 50 },
  { field: 'birthDate', headerName: '생년월일', width: 50 },
  { field: 'authEmail', headerName: '계정 이메일', width: 100 },
  { field: 'schoolEmail', headerName: '학교 이메일', width: 100 },
  { field: 'school', headerName: '학교', width: 70 },
  { field: 'phone', headerName: '연락처', width: 100 },
  { field: 'status', headerName: '상태', width: 100 },
];

export default function APage() {
  const [usersData, setUsersData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchUsersData = async (page) => {
    const { result } = await membersApi(page);
    setUsersData(result.data);
    setTotalCount(result.data.length);
  };

  useEffect(() => {
    fetchUsersData(page);
  }, [page]);

  return (
    <>
      <DataGrid
        rows={usersData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowId={(row) => row.memberId}
      />
      <Pagination01 setPage={setPage} page={page} totalCount={totalCount} />
    </>
  );
}
