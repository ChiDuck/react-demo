import css from "./Pagination.module.scss";

export default function Pagination({ totalPages, page, setPage }) {
  function goToPage(p) {
    if (p < 1) p = 1;
    if (p > totalPages) p = totalPages;
    setPage(p);
  }

  let start = page - 1;
  let end = page + 1;

  if (start < 1) {
    start = 1;
    end = Math.min(3, totalPages);
  }

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, totalPages - 2);
  }

  const pages = [];
  for (let p = start; p <= end; p++) pages.push(p);

  return (
    <div className={css.pagination}>
      <nav>
        <ul>
          <li>
            <button onClick={() => goToPage(1)}>
              <i className="fa-solid fa-angles-left"></i>
            </button>
          </li>

          <li>
            <button onClick={() => goToPage(page - 1)}>
              <i className="fa-solid fa-angle-left"></i>
            </button>
          </li>

          {pages.map((p) => (
            <li key={p} className={page === p ? css.active : ""}>
              <button onClick={() => goToPage(p)}>{p}</button>
            </li>
          ))}

          <li>
            <button onClick={() => goToPage(page + 1)}>
              <i className="fa-solid fa-angle-right"></i>
            </button>
          </li>

          <li>
            <button onClick={() => goToPage(totalPages)}>
              <i className="fa-solid fa-angles-right"></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
