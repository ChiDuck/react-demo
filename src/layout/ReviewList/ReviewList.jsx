import { useEffect, useRef, useState } from "react";
import FullReviewCard from "../../components/FullReviewCard/FullReviewCard";
import { getSalonAPI } from "../../config/apiCalls";
import style from "./ReviewList.module.scss";

const imgUrl = import.meta.env.VITE_API_IMG_URL;

async function filterQuery({ id, p, o, f, k, setTotalPages }) {
  const list = await getSalonAPI({
    s: "GetSalonReviews",
    salonid: id,
    p: p,
    k: k && k.current ? k.current.value : k,
    o: o && o.current ? o.current.toLowerCase().replace(/\s+/g, "") : o,
    f:
      (typeof f === "object" && f && "current" in f ? f.current : f) == 0
        ? ""
        : typeof f === "object" && f && "current" in f
        ? f.current
        : f,
  });
  setTotalPages(Math.ceil(list.total / 6));
  return list;
}

function Pagination({ totalPages, page, setPage }) {
  function goToPage(p) {
    if (p < 1) p = 1; // safety guard
    if (p > totalPages) p = totalPages;

    setPage(p);
  }

  return (
    <div className={style.pagination}>
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
          {Array.from({ length: totalPages }, (_, i) => (
            <li key={i} className={page === i + 1 ? style.active : ""}>
              <button onClick={() => goToPage(i + 1)}>{i + 1}</button>
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

export default function ReviewList({
  reviewsList,
  reviewImg,
  salonid,
  // controlled rating (0 = All). If provided, this component becomes controlled
  rating: controlledRating,
  onRatingChange,
}) {
  const reviews = reviewsList.data;
  const [openSort, setOpenSort] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [filteredList, setFilteredList] = useState(reviews);
  const [page, setPage] = useState(1);
  const searchValue = useRef("");
  // support controlled prop or local state
  const [ratingState, setRatingState] = useState(controlledRating ?? 0);
  const rating =
    controlledRating !== undefined ? controlledRating : ratingState;
  const setRating = onRatingChange ? onRatingChange : setRatingState;
  const sort = useRef("Newest First");
  const [totalPages, setTotalPages] = useState(
    Math.ceil(reviewsList.total / 6)
  );

  async function handleFilter() {
    const list = await filterQuery({
      id: salonid,
      p: page,
      k: searchValue,
      o: sort,
      f: rating,
      setTotalPages: setTotalPages,
    });
    setFilteredList(list.data);
  }
  // refetch when page changes
  useEffect(() => {
    handleFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // refetch when rating changes - reset page to 1 if needed
  useEffect(() => {
    if (page !== 1) setPage(1);
    else handleFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating]);

  return (
    <div className={style.reviewList}>
      <h3>Review with Images</h3>
      <div className={style.reviewImg}>
        {reviewImg.map((item, index) => (
          <img
            key={index}
            src={`${imgUrl}/${item.imgpath}${item.imgname}`}
            alt="review img"
          />
        ))}
      </div>
      <div>
        <a href="#">Show all Photos</a>
      </div>

      <div className={style.reviewHeader}>
        <h3>Reviews</h3>
        <div>
          <div className={style.search}>
            <input
              type="text"
              placeholder="Search by keyword..."
              ref={searchValue}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // prevent default form submit if any
                  if (page != 1) setPage(1);
                  else handleFilter();
                }
              }}
            />
            <div
              className={style.searchIcon}
              onClick={() => {
                if (page != 1) setPage(1);
                else handleFilter();
              }}
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
          <div className={style.dropdown}>
            <button
              className={style.filterAndSort}
              onClick={() => {
                setOpenSort((v) => !v);
                setOpenFilter(false);
              }}
            >
              Sort by: <strong>{sort.current}</strong>
              <img src="/icon/down.svg" alt="" />
            </button>
            {openSort && (
              <div>
                {[
                  "Newest First",
                  "Oldest First",
                  "Highest Rate",
                  "Lowest Rate",
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      sort.current = option;
                      if (page != 1) setPage(1);
                      else handleFilter();
                      setOpenSort(false);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className={style.dropdown}>
            <button
              className={style.filterAndSort}
              onClick={() => {
                setOpenFilter((v) => !v);
                setOpenSort(false);
              }}
            >
              Filter by rating: <strong>{rating == 0 ? "All" : rating}</strong>
              <img src="/icon/down.svg" alt="" />
            </button>
            {openFilter && (
              <div>
                {[0, 1, 2, 3, 4, 5].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => {
                      setRating(rate);
                      if (page != 1) setPage(1);
                      else handleFilter();
                      setOpenFilter(false);
                    }}
                  >
                    {rate === 0 ? "All" : rate}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={style.list}>
        {filteredList.length > 0 ? (
          filteredList.map((item, index) => (
            <FullReviewCard key={index} item={item} full={true} />
          ))
        ) : (
          <div className={style.noReview}>
            This salon doesn't have any review
          </div>
        )}
      </div>
      {totalPages > 1 && (
        <Pagination totalPages={totalPages} page={page} setPage={setPage} />
      )}
    </div>
  );
}
