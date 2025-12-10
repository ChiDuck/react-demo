import { Link } from "react-router-dom";
import "../styles/SalonCard.scss";
import Button from "./Button";

export default function SalonCard(props) {
  return (
    <Link
      to="/salon-detail/0cf58164-5614-48c3-9037-927283107cad"
      className="salon-card-link"
    >
      <div className="salon-card">
        <img
          className="favorite-icon"
          src="icon/heart-icon.svg"
          alt="favorite"
        />
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
            <Button className="book-button" text="Book Now" />
          </div>
        </div>
      </div>
    </Link>
  );
}
