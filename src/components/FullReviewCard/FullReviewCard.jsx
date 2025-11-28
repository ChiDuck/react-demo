import style from "./FullReviewCard.module.scss";
import { formatReviewDate } from "./formatReviewDate";

export default function FullReviewCard({ item, full = false }) {
  const imgUrl = import.meta.env.VITE_API_IMG_URL;
  const imglist = item.content.images ? item.content.images : [];
  return (
    <div className={style.card}>
      <div className={style.header}>
        <img src={`${imgUrl}${item.avatar}`} alt="avatar" />
        <div>
          <p>{item.name}</p>
          <div>
            {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
              <i
                key={star}
                className="fa-solid fa-star"
                style={{
                  color: star <= item.star ? "#ffb800" : "rgb(170, 170, 170)",
                }}
              ></i>
            ))}
          </div>
          <span style={{ position: full ? "static" : "absolute" }}>
            {formatReviewDate(item.interval, item.createddate)}
          </span>
        </div>
      </div>
      <div className={style.content}>
        <strong>{item.content.headline}</strong>
        <p>
          {item.content.review}
          {/* <span>Read more</span> */}
        </p>
      </div>
      <div style={{ display: "flex" }}>
        <button>
          <img src="/icon/like.svg" alt="" />
          <span>{item.like} | Love it</span>
        </button>
        <button>
          <img src="/icon/helpful.svg" alt="" />
          <span>{item.helpful} | Helpful</span>
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
            {imglist.map((it, index) => (
              <li key={index}>
                <img
                  src={`${imgUrl}/${item.content.path}${it}`}
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
