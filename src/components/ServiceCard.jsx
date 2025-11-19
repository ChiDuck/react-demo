import "../styles/ServiceCard.scss";
import Button from "./Button";

export default function ServiceCard({
  picture,
  service_name,
  description,
  price,
  countimg,
}) {
  return (
    <div className="service-card">
      <img
        className="favorite-icon"
        src="/icon/heart-icon.svg"
        alt="favorite"
      />
      <div className="service-image">
        <img src={picture} alt="service" />
      </div>
      <div className="service-overlay">
        <h3>{service_name}</h3>
        <div className="service-badge">
          <div>
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
          <div>
            <img src="/icon/pic.svg" alt="pics" />
            <span>{countimg}</span>
          </div>
        </div>
        <p>{description}</p>
        <div className="service-book">
          <div>
            <p>Price:</p>
            <span>${price}</span>
          </div>
          <Button className="book-button" text="Quick Book" />
        </div>
      </div>
    </div>
  );
}
