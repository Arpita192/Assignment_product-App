export default function Pagination({ total, page, limit, setPage }) {
  const pages = Math.ceil(total / limit);
  if (pages <= 1) return null;

  return (
    <div className="pagination">
      {Array.from({ length: pages }, (_, i) => (
        <button
          key={i}
          className={page === i + 1 ? "active" : ""}
          onClick={() => setPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
