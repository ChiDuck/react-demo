import { useLoaderData } from "react-router-dom";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import SalonDetailTitle from "../../components/SalonDetailTitle/SalonDetailTitle";

export default function SalonReviewPage() {
  const data = useLoaderData();
  return (
    <>
      <SalonDetailTitle detail={data.detail} />
      <ReviewForm />
    </>
  );
}
