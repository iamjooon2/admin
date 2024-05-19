export default function Pagination01({ totalCount, page, setPage }) {
  const handlePrevPage = () => {
    if (page !== 1) setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (totalCount) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div>
      <button onClick={handlePrevPage}>이전</button>
      <span>{page}</span>
      <button onClick={handleNextPage}>다음</button>
    </div>
  );
}
