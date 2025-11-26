import { useLoaderData, useParams } from "react-router-dom";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import ReviewLog from "../../components/ReviewLog/ReviewLog";
import SalonDetail from "../../layout/SalonDetail";
import style from "./SalonReviewPage.module.scss";
export default function SalonReviewPage() {
  const data = useLoaderData();
  const { id } = useParams();
  return (
    <div className={style.writeReview}>
      <SalonDetail write={true} salonid={id} detail={data.detail.data} />
      <div className={style.reviewLog}>
        <ReviewForm salonid={id} />
        <ReviewLog reviews={data.reviews.data} />
      </div>
    </div>
  );
}
