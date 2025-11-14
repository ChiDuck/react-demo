import "../styles/ReviewCard.scss";

export default function ReviewCard({
  salon_img,
  reviewer_img,
  salon_name,
  reviewer_name,
  reviewer_title,
  review_text,
  review_date,
}) {
  return (
    <div className="review-card">
      <div style={{ display: "flex" }}>
        <img className="salon-name" src={salon_img} alt="Salon Logo" />
        <div>
          <span className="salon-name-review">Salon Name</span>
          <div className="review-card-header">
            <span>⭐⭐⭐⭐⭐</span>
            <span>{review_date}</span>
          </div>
        </div>
      </div>
      <p className="review-text">{review_text}</p>
      <div className="reviewer">
        <div style={{ display: "flex", alignItems: "center", gap: "1em" }}>
          <img src={reviewer_img} alt="Reviewer Avatar" />
          <div>
            <h4>{reviewer_name}</h4>
            <span>{reviewer_title}</span>
          </div>
        </div>
        <img src="icon/quote-green.svg" alt="Quote Icon" />
      </div>
    </div>
  );
}
