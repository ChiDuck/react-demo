import { useLoaderData, useParams } from "react-router-dom";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import ReviewLog from "../../components/ReviewLog/ReviewLog";
import SalonDetailAction from "../../components/SalonDetailAction";
import SalonDetailTitle from "../../components/SalonDetailTitle/SalonDetailTitle";
import style from "./SalonReviewPage.module.scss";
export default function SalonReviewPage() {
  const data = useLoaderData();
  const { id } = useParams();
  return (
    <div className={style.writeReview}>
      <SalonDetailTitle detail={data.detail} />
      <SalonDetailAction />
      <div className={style.reviewLog}>
        <ReviewForm salonid={id} />
        <ReviewLog reviews={data.reviews} />
      </div>
    </div>
  );
}
