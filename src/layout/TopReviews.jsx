import ContentSection from "../components/ContentSection";
import ReviewCard from "../components/ReviewCard";

export default function TopReviews() {
  return (
    <ContentSection>
      <div className="reviews-header">
        <h1>Top Reviews</h1>
        <p>
          Explore on the world's best & largest Bidding marketplace with our
          beautiful <br /> Bidding products. We want to be a part of your smile,
          success and future growth.
        </p>
      </div>
      <div className="review-row">
        <ReviewCard
          salon_img="logo/b9f21775293a2c2c86941e865ff81ff0a92ae96f.png"
          reviewer_img="avatar/aa0f1deacbaf753bf06ae8b28a64323b0b7cbf76.png"
          review_date="4/20/2023"
          salon_name="Lathersalonaspen"
          reviewer_name="Johan Martin"
          reviewer_title="CEO"
          review_text="The Pacific Grove Chamber of Commerce would like to thank eLab Communications and Mr. Will Elkadi for all the efforts that assisted."
        />
        <ReviewCard
          salon_img="logo/2964e0655dfbc971398f425a471b09d11eefab45.png"
          reviewer_img="avatar/f87af351011278f6e1c978f0c9cffb1d7faff605.png"
          review_date="4/20/2023"
          salon_name="IGK Hair"
          reviewer_name="Jamie Anderson"
          reviewer_title="Manager"
          review_text="The Pacific Grove Chamber of Commerce would like to thank eLab Communications and Mr. Will Elkadi for all the efforts that assisted."
        />
        <ReviewCard
          salon_img="logo/428d4bfe38d99ef3e2c6e064f4b437e5003c08fc.png "
          reviewer_img="avatar/a42d362d2e67069ad0534ece3f37ba6dd195ff70.png"
          review_date="4/20/2023"
          salon_name="Hawai'i"
          reviewer_name="John Peter"
          reviewer_title="Area Manager"
          review_text="The Pacific Grove Chamber of Commerce would like to thank eLab Communications and Mr. Will Elkadi for all the efforts that assisted."
        />
      </div>
    </ContentSection>
  );
}
