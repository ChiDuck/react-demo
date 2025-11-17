import { Link } from "react-router-dom";
import "../styles/SalonCard.scss";
import Button from "./Button";

export default function SalonCard({
  picture,
  logo,
  salon_name,
  description,
  distance,
}) {
  return (
    <Link to="/salon-detail" className="salon-card-link">
      <div className="salon-card">
        <img
          className="favorite-icon"
          src="icon/heart-icon.svg"
          alt="favorite"
        />
        <div className="salon-image">
          <img src={picture} alt="salon" />
        </div>
        <div className="salon-overlay">
          <div className="salon-badge">
            <img height="40" width="40" src={logo} alt="badge" />
            <div>
              <h3>{salon_name}</h3>
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
          <p>{description}</p>
          <div className="salon-book">
            <div>
              <img className="location-icon" src="icon/distance-icon.svg" />
              <span>{distance} miles away</span>
            </div>
            <Button className="book-button" text="Book Now" />
          </div>
        </div>
      </div>
    </Link>
  );
}
