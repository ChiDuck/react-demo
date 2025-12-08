import { useState } from "react";
import { useFetcher } from "react-router-dom";
import { formatReviewDate } from "../../formatReviewDate";
import StarRating from "../../StarRating";
import css from "./Review.module.scss";

const imgUrl = import.meta.env.VITE_API_IMG_URL;

export default function Review({ data, openDelete }) {
  const star = (data.salonstar / 5) * 100;
  const imgList = data.content.images || [];
  const [isEditting, setIsEditting] = useState(false);
  const [headline, setHeadline] = useState(data.content.headline);
  const [review, setReview] = useState(data.content.review);
  const [rating, setRating] = useState(data.stars);
  const fetcher = useFetcher();

  // detect success
  if (fetcher.data?.success) {
    console.log("success")
  }

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
      <fetcher.Form method="post" action="." className={css.editForm}>
        <input type="hidden" name="id" value={data.id} />
        <input type="hidden" name="salonid" value={data.salonid} />
        <input type="hidden" name="star" value={rating} />
        <div className={css.iconBlock}>
          {isEditting ? (
            <div>
              <StarRating
                initStar={data.stars}
                onChange={(num) => setRating(num)}
              />
            </div>
          ) : (
            <div>
              {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
                <i
                  key={star}
                  className="fa-solid fa-star"
                  style={{
                    color:
                      star <= data.stars ? "#ffb800" : "rgb(170, 170, 170)",
                  }}
                ></i>
              ))}
            </div>
          )}
          <div>
            <button
              type="button"
              onClick={() => setIsEditting((prev) => !prev)}
            >
              <i className="fa-regular fa-pen-to-square"></i>
            </button>
            <button
              type="button"
              onClick={() => openDelete(data.id, data.salonid)}
            >
              <i className="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>
        {isEditting ? (
          <>
            <input
              name="headline"
              type="text"
              onChange={(e) => setHeadline(e.target.value)}
              value={headline}
            />
            <textarea
              name="review"
              onChange={(e) => setReview(e.target.value)}
              value={review}
            ></textarea>
          </>
        ) : (
          <>
            <div>
              <strong>{headline}</strong>
            </div>
            <div>
              <span
                style={{ overflowWrap: "break-word", whiteSpace: "pre-wrap" }}
              >
                {review}
              </span>
            </div>
          </>
        )}
        <div className={css.imgBlock}>
          <div className={css.imgList}>
            {imgList.map((item, idx) => (
              <img
                key={idx}
                src={`${imgUrl}/${data.content.path}${item}`}
                alt=""
              />
            ))}
          </div>
          {isEditting && <button type="submit">Save</button>}
        </div>
      </fetcher.Form>
    </div>
  );
}
