import "../styles/ServiceCard.scss";
import Button from "./Button";

const imgUrl = import.meta.env.VITE_API_IMG_URL;
const noImgUrl = import.meta.env.VITE_API_NO_IMG_URL;

export default function ServiceCard({ item }) {
  return (
    <div className="service-card">
      <img
        className="favorite-icon"
        src="/icon/heart-icon.svg"
        alt="favorite"
      />
      <div className="service-image">
        <img
          src={item.imagejson ? `${imgUrl}/${item.imagejson}` : noImgUrl}
          alt="service"
        />
      </div>
      <div className="service-overlay">
        <h3>{item.name}</h3>
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
            <span>{item.countimage}</span>
          </div>
        </div>
        <p className="service-desc">{item.desc}</p>
        <div className="service-book">
          <div>
            <p>Price:</p>
            <span>${item.price}</span>
          </div>
          <Button className="book-button" text="Quick Book" />
        </div>
      </div>
    </div>
  );
}
