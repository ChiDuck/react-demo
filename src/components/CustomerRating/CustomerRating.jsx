import style from "./CustomerRating.module.scss";

function CalculateRating({ rating, selectedRating = 0, onSelectRating }) {
  const starlist = [
    rating.one,
    rating.two,
    rating.three,
    rating.four,
    rating.five,
  ];
  const starcolor = ["#F17A55", "#FAB851", "#F6D757", "#b7ea83", "#76dc99"];
  return Array.from({ length: 5 }, (_, i) => 5 - i).map((star) => {
    const count = starlist[star - 1] ?? 0;
    const per = rating.total ? (count / rating.total) * 100 : 0;
    const isSelected = selectedRating === star;
    return (
      <button
        key={star}
        className={style.rateBar}
        onClick={() => {
          if (typeof onSelectRating === "function") {
            // always select the clicked rating (no toggle)
            onSelectRating(star);
          }
        }}
        aria-pressed={isSelected}
        aria-label={`Filter by ${star} star reviews`}
      >
        <span>{star} star</span>
        <div>
          <div style={{ width: `${per}%`, background: starcolor[star - 1] }} />
        </div>
        <span>{`${Math.round(per)}%`}</span>
      </button>
    );
  });
}

export default function CustomerRating({
  reviewOverall,
  selectedRating = 0,
  onSelectRating,
}) {
  const star = (reviewOverall.star / 5) * 100;
  return (
    <div className={style.rating}>
      <h3>Customer Ratings</h3>

      <div className={style.overall}>
        <div>
          <div className={style.trueStar} style={{ width: `${star}%` }}>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </div>
          <div>
            <i className="fa-solid fa-star" style={{ color: "#aaaaaa" }}></i>
            <i className="fa-solid fa-star" style={{ color: "#aaaaaa" }}></i>
            <i className="fa-solid fa-star" style={{ color: "#aaaaaa" }}></i>
            <i className="fa-solid fa-star" style={{ color: "#aaaaaa" }}></i>
            <i className="fa-solid fa-star" style={{ color: "#aaaaaa" }}></i>
          </div>
        </div>
        <strong>{Number(reviewOverall.star.toFixed(1))}</strong>
      </div>
      <div>
        <span>{reviewOverall.total} Customer Reviews</span>
      </div>
      <div className={style.ratingStars}>
        <CalculateRating
          rating={reviewOverall}
          selectedRating={selectedRating}
          onSelectRating={onSelectRating}
        />
      </div>
    </div>
  );
}
