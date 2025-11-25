import { useRef, useState } from "react";
import FullReviewCard from "../../components/FullReviewCard/FullReviewCard";
import { getSalonAPI } from "../../config/apiCalls";
import style from "./ReviewList.module.scss";

const imgUrl = import.meta.env.VITE_API_IMG_URL;

function filterQuery() {}

function Pagination({ setFilteredList, totalPages, page, setPage, salonid }) {
  async function getPage(p) {
    console.log(p);
    if (p < 1) p = 1; // safety guard
    if (p > totalPages) p = totalPages;

    setPage(p);

    const data = await getSalonAPI({
      s: "GetSalonReviews",
      salonid,
      p,
    });

    return data;
  }

  return (
    <div className={style.pagination}>
      <nav>
        <ul>
          <li>
            <button onClick={async () => setFilteredList(await getPage(1))}>
              <i className="fa-solid fa-angles-left"></i>
            </button>
          </li>
          <li>
            <button
              onClick={async () => setFilteredList(await getPage(page - 1))}
            >
              <i className="fa-solid fa-angle-left"></i>
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, i) => (
            <li key={i} className={page === i + 1 ? style.active : ""}>
              <button
                onClick={async () => setFilteredList(await getPage(i + 1))}
              >
                {i + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={async () => setFilteredList(await getPage(page + 1))}
            >
              <i className="fa-solid fa-angle-right"></i>
            </button>
          </li>
          <li>
            <button
              onClick={async () => setFilteredList(await getPage(totalPages))}
            >
              <i className="fa-solid fa-angles-right"></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default function ReviewList({
  reviews,
  reviewImg,
  salonid,
  reviewOverall,
}) {
  const [openSort, setOpenSort] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [filteredList, setFilteredList] = useState(reviews);
  const [page, setPage] = useState(1);
  const searchValue = useRef("");
  const rating = useRef(0);
  const sort = useRef("Newest First");
  const totalPages = Math.ceil(reviewOverall.total / 6);
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
              onKeyDown={async (e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // prevent default form submit if any
                  setFilteredList(
                    await getSalonAPI({
                      s: "GetSalonReviews",
                      f: rating.current == 0 ? "" : rating.current,
                      o: sort.current.toLowerCase().replace(/\s+/g, ""),
                      k: searchValue.current.value,
                      salonid: salonid,
                    })
                  );
                }
              }}
            />
            <div
              className={style.searchIcon}
              onClick={async () => {
                setFilteredList(
                  await getSalonAPI({
                    s: "GetSalonReviews",
                    f: rating.current == 0 ? "" : rating.current,
                    o: sort.current.toLowerCase().replace(/\s+/g, ""),
                    k: searchValue.current.value,
                    salonid: salonid,
                  })
                );
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
                    onClick={async () => {
                      sort.current = option;
                      console.log(sort.current);
                      setFilteredList(
                        await getSalonAPI({
                          s: "GetSalonReviews",
                          f: rating.current == 0 ? "" : rating.current,
                          o: sort.current.toLowerCase().replace(/\s+/g, ""),
                          k: searchValue.current.value,
                          salonid: salonid,
                        })
                      );
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
              Filter by rating:{" "}
              <strong>{rating.current == 0 ? "All" : rating.current}</strong>
              <img src="/icon/down.svg" alt="" />
            </button>
            {openFilter && (
              <div>
                {Array.from({ length: 6 }, (_, i) => i + 1).map((rate) => (
                  <button
                    onClick={async () => {
                      rating.current = rate - 1;
                      setFilteredList(
                        await getSalonAPI({
                          s: "GetSalonReviews",
                          f: rating.current == 0 ? "" : rating.current,
                          o: sort.current.toLowerCase().replace(/\s+/g, ""),
                          k: searchValue.current.value,
                          salonid: salonid,
                        })
                      );
                      setOpenFilter(false);
                    }}
                  >
                    {rate - 1 == 0 ? "All" : rate - 1}
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
      {filteredList.length >= 6 &&
        page >
          1(
            <Pagination
              setFilteredList={setFilteredList}
              totalPages={totalPages}
              page={page}
              setPage={setPage}
              salonid={salonid}
            />
          )}
    </div>
  );
}
