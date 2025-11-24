import { useState } from "react";
import FullReviewCard from "../../components/FullReviewCard/FullReviewCard";
import style from "./ReviewList.module.scss";

const imgUrl = import.meta.env.VITE_API_IMG_URL;

function searchReviews(reviews, keyword) {
  if (!keyword.trim()) return reviews; // empty input → show all
  const lower = keyword.toLowerCase();

  return reviews.filter(
    (r) =>
      r.content.headline?.toLowerCase().includes(lower) ||
      r.content.review?.toLowerCase().includes(lower)
  );
}

export default function ReviewList({ reviews, reviewImg }) {
  const [query, setQuery] = useState("");
  const [openSort, setOpenSort] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const filtered = searchReviews(reviews, query);
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
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className={style.searchIcon}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
          <button
            className={style.filterAndSort}
            onClick={() => {
              setOpenSort((v) => !v);
              setOpenFilter(false);
            }}
          >
            Sort by:
            <span>All</span>
            <img src="/icon/down.svg" alt="" />
            {openSort && (
              <div>
                <ul>
                  <li>O</li>
                  <li>N</li>
                  <li>H</li>
                  <li>L</li>
                </ul>
              </div>
            )}
          </button>
          <button
            className={style.filterAndSort}
            onClick={() => {
              setOpenFilter((v) => !v);
              setOpenSort(false);
            }}
          >
            Filter by rating:
            <img src="/icon/down.svg" alt="" />
            {openFilter && (
              <div>
                <button>All</button>
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button>4</button>
                <button>5</button>
              </div>
            )}
          </button>
        </div>
      </div>
      <div className={style.list}>
        {filtered.map((item, index) => (
          <FullReviewCard
            key={index}
            avatar={`${imgUrl}${item.avatar}`}
            name={item.name}
            headline={item.content.headline}
            review={item.content.review}
            like={item.like}
            helpful={item.helpful}
            stars={item.star}
            timeago={item.interval}
            date={item.createddate}
            full={true}
            imgpath={item.content.path}
            imglist={item.content.images}
          />
        ))}
      </div>
      <div>
        <a href=""></a>
        <a href=""></a>
        <a href=""></a>
        <a href=""></a>
        <a href=""></a>
        <a href=""></a>
      </div>
    </div>
  );
}
