import { useLoaderData, useParams } from "react-router-dom";
import CustomerRating from "../../components/CustomerRating/CustomerRating";
import SalonDetailAction from "../../components/SalonDetailAction";
import SalonDetailTitle from "../../components/SalonDetailTitle/SalonDetailTitle";
import ReviewList from "../../layout/ReviewList/ReviewList";
import SalonDetailMap from "../../layout/SalonDetailMap";
import style from "./ViewReviewPage.module.scss";

export default function ViewReviewPage() {
  const data = useLoaderData();
  const { id } = useParams();
  return (
    <div className={style.viewreview}>
      <SalonDetailTitle detail={data.detail} />
      <SalonDetailAction />
      <div className={style.viewSection}>
        <div>
          <CustomerRating reviewOverall={data.reviewOverall} />
          <div className={style.map}>
            <SalonDetailMap detail={data.detail} />
          </div>
        </div>
        <ReviewList
          reviews={data.reviews}
          reviewOverall={data.reviewOverall}
          reviewImg={data.reviewImg}
          salonid={id}
        />
      </div>
    </div>
  );
}
