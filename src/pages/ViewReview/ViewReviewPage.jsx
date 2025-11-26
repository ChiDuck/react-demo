import { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import CustomerRating from "../../components/CustomerRating/CustomerRating";
import ReviewList from "../../layout/ReviewList/ReviewList";
import SalonDetail from "../../layout/SalonDetail";
import SalonDetailMap from "../../layout/SalonDetailMap";
import style from "./ViewReviewPage.module.scss";

export default function ViewReviewPage() {
  const data = useLoaderData();
  const { id } = useParams();
  const [selectedRating, setSelectedRating] = useState(0);
  return (
    <div className={style.viewreview}>
      <SalonDetail view={true} salonid={id} detail={data.detail.data} />
      <div className={style.viewSection}>
        <div>
          <CustomerRating
            reviewOverall={data.reviewOverall.data}
            selectedRating={selectedRating}
            onSelectRating={(r) => setSelectedRating(r)}
          />
          <div className={style.map}>
            <SalonDetailMap detail={data.detail.data} />
          </div>
        </div>
        <ReviewList
          reviewsList={data.reviews}
          reviewImg={data.reviewImg.data}
          salonid={id}
          rating={selectedRating}
          onRatingChange={(r) => setSelectedRating(r)}
        />
      </div>
    </div>
  );
}
