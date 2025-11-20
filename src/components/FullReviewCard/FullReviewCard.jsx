import style from "./FullReviewCard.module.scss";
import { formatReviewDate } from "./formatReviewDate";

export default function FullReviewCard({
  avatar,
  name,
  timeago,
  headline,
  review,
  like,
  helpful,
  stars,
  date,
}) {
  // const rating = new Array(stars).fill(null);
  return (
    <div className={style.card}>
      <div className={style.header}>
        <img src={avatar} alt="" />
        <div>
          <p>{name}</p>
          {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
            <i
              key={star}
              className="fa-solid fa-star"
              style={{
                color: star < stars ? "#ffb800" : "rgb(170, 170, 170)",
              }}
            ></i>
          ))}
          {/* {rating.map((_, index) => (
            <i key={index} className="fa-solid fa-star"></i>
          ))} */}
        </div>
        <span>{formatReviewDate(timeago, date)}</span>
      </div>
      <div>
        <strong>{headline}</strong>
        <p>{review}</p>
      </div>
      <div style={{ display: "flex" }}>
        <button>
          <img src="/icon/like.svg" alt="" />
          <span>{like} | Love it</span>
        </button>
        <button>
          <img src="/icon/helpful.svg" alt="" />
          <span>{helpful} | Helpful</span>
        </button>
      </div>
    </div>
  );
}
