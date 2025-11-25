import FullReviewCard from "../FullReviewCard/FullReviewCard";
import style from "./ReviewLog.module.scss";
const imgUrl = import.meta.env.VITE_API_IMG_URL;
export default function ReviewLog({ reviews }) {
  return (
    <div className={style.reviews}>
      <div>
        <h3>Newest Reviews</h3>
        <span>View all</span>
      </div>
      <div className={style.list}>
        {reviews.map((item, index) => (
          <FullReviewCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
