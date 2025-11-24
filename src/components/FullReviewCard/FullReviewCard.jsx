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
  full = false,
  imgpath = null,
  imglist = [],
}) {
  const imgUrl = import.meta.env.VITE_API_IMG_URL;

  return (
    <div className={style.card}>
      <div className={style.header}>
        <img src={avatar} alt="avatar" />
        <div>
          <p>{name}</p>
          <div>
            {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
              <i
                key={star}
                className="fa-solid fa-star"
                style={{
                  color: star <= stars ? "#ffb800" : "rgb(170, 170, 170)",
                }}
              ></i>
            ))}
          </div>
          <span style={{ position: full ? "static" : "absolute" }}>
            {formatReviewDate(timeago, date)}
          </span>
        </div>
      </div>
      <div className={style.content}>
        <strong>{headline}</strong>
        <p>
          {review}
          {/* <span>Read more</span> */}
        </p>
      </div>
      <div style={{ display: "flex" }}>
        <button>
          <img src="/icon/like.svg" alt="" />
          <span>{like} | Love it</span>
        </button>
        <button>
          <img src="/icon/helpful.svg" alt="" />
          <span>{helpful} | Helpful</span>
        </button>{" "}
        {full && (
          <>
            <button>
              <img src="/icon/share.svg" alt="" />
              <span>Share</span>
            </button>
            <button>
              <img src="/icon/flag.svg" alt="" />
              <span>Report</span>
            </button>
          </>
        )}
      </div>
      {full && imglist.length > 0 && (
        <div className={style.reviewImgs}>
          <ul>
            {imglist.map((item, index) => (
              <li>
                <img
                  key={index}
                  src={`${imgUrl}/${imgpath}${item}`}
                  alt="review img"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
