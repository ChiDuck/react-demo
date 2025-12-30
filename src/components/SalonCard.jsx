import { useNavigate } from "react-router-dom";
import "../styles/SalonCard.scss";

export default function SalonCard(props) {
  const navigate = useNavigate();

  const handleBookNow = (e) => {
    e.stopPropagation(); // Prevent triggering the card click
    navigate(
      `/booking?salonid=${
        props.salonid || "0cf58164-5614-48c3-9037-927283107cad"
      }`
    );
  };

  const handleCardClick = () => {
    navigate(
      `/salon-detail/${props.salonid || "0cf58164-5614-48c3-9037-927283107cad"}`
    );
  };

  return (
    <div className="salon-card" onClick={handleCardClick}>
      <img className="favorite-icon" src="icon/heart-icon.svg" alt="favorite" />
      <div className="salon-image">
        <img src={props.picture} alt="salon" />
      </div>
      <div className="salon-overlay">
        <div className="salon-badge">
          <img height="40" width="40" src={props.logo} alt="badge" />
          <div>
            <h3>{props.salon_name}</h3>
            <div className="salon-rating">
              <span>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </span>
              <span>5.0</span>
              <span>(1200 Reviews)</span>
            </div>
          </div>
        </div>
        <p>{props.description}</p>
        <div className="salon-book">
          <div>
            <img className="location-icon" src="icon/distance-icon.svg" />
            <span>{props.distance} miles away</span>
          </div>
          <button className="book-button" onClick={handleBookNow}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
