import { useState } from "react";
import { formatReviewDate } from "../../formatReviewDate";
import css from "./Review.module.scss";

const imgUrl = import.meta.env.VITE_API_IMG_URL;

export default function Review({ data }) {
  const star = (data.salonstar / 5) * 100;
  const imgList = data.content.images || [];
  return (
    <div className={css.reviewCard}>
      <div className={css.reviewHeader}>
        <span>{formatReviewDate(data.interval, data.createddate)}</span>
        <img src={`${imgUrl}/${data.avatarimg[0]}`} alt="" />
        <div>
          <strong>{data.salonname}</strong>
          <div className={css.rateAndReview}>
            <div>
              <div className={css.trueStar} style={{ width: `${star}%` }}>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <div>
                <i
                  className="fa-solid fa-star"
                  style={{ color: "#aaaaaa" }}
                ></i>
                <i
                  className="fa-solid fa-star"
                  style={{ color: "#aaaaaa" }}
                ></i>
                <i
                  className="fa-solid fa-star"
                  style={{ color: "#aaaaaa" }}
                ></i>
                <i
                  className="fa-solid fa-star"
                  style={{ color: "#aaaaaa" }}
                ></i>
                <i
                  className="fa-solid fa-star"
                  style={{ color: "#aaaaaa" }}
                ></i>
              </div>
            </div>
            <strong>{data.salonstar.toFixed(1)}</strong>
            <span>({data.countreview} Reviews)</span>
          </div>
          <span>{data.address}</span>
        </div>
      </div>
      <div className={css.iconBlock}>
        <div>
          {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
            <i
              key={star}
              className="fa-solid fa-star"
              style={{
                color: star <= data.stars ? "#ffb800" : "rgb(170, 170, 170)",
              }}
            ></i>
          ))}
        </div>
        <div>
          <button>
            <i className="fa-regular fa-pen-to-square"></i>
          </button>
          <button>
            <i className="fa-regular fa-trash-can"></i>
          </button>
        </div>
      </div>
      <div>
        <strong>{data.content.headline}</strong>
      </div>
      <div>
        <span>{data.content.review}</span>
      </div>
      <div className={css.imgList}>
        {imgList.map((item, idx) => (
          <img key={idx} src={`${imgUrl}/${data.content.path}${item}`} alt="" />
        ))}
      </div>
    </div>
  );
}
