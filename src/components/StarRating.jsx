import { useState } from "react";
import style from "../components/ReviewForm/ReviewForm.module.scss";
export default function StarRating({ maxStars = 5, initStar = 5, onChange }) {
  const [selected, setSelected] = useState(initStar);
  const [hovered, setHovered] = useState(0);
  const handleClick = (index) => {
    setSelected(index);
    if (onChange) onChange(index); // return the number to parent
  };

  return Array.from({ length: maxStars }, (_, i) => i + 1).map((star) => (
    <i
      key={star}
      className={`fa-solid fa-star ${style.rating}`}
      onClick={() => handleClick(star)}
      onMouseEnter={() => setHovered(star)}
      onMouseLeave={() => setHovered(0)}
      style={{
        color: star <= (hovered || selected) ? "#ffb800" : "rgb(170, 170, 170)",
      }}
    ></i>
  ));
}
