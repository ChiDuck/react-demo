import { useState } from "react";
import { Form } from "react-router-dom";
import style from "./ReviewForm.module.scss";

function StarRating({ maxStars = 5, onChange }) {
  const [selected, setSelected] = useState(maxStars);
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
        fontSize: "24px",
        userSelect: "none",
      }}
    ></i>
  ));
}

export default function ReviewForm({ salonid }) {
  const [rating, setRating] = useState(5);
  const [headline, setHeadline] = useState("");
  const [review, setReview] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!headline.trim()) newErrors.headline = "Headline is required";
    if (!review.trim()) newErrors.review = "Review is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  return (
    <Form
      method="post"
      onSubmit={(e) => {
        if (!validate()) e.preventDefault(); // block submission if invalid
      }}
      className={style.reviewForm}
    >
      <div>
        <p>Select Your Rating</p>
        <StarRating onChange={(num) => setRating(num)} />
      </div>
      <input type="hidden" name="star" value={rating} />
      <input type="hidden" name="salonid" value={salonid} />
      <div>
        <p>Add a Headline</p>
        <input
          type="text"
          name="headline"
          onChange={(e) => {
            setHeadline(e.target.value);
            validate();
          }}
          placeholder="What's most important to know?"
        />
        {errors.headline && (
          <div style={{ color: "red", marginTop: "4px", fontSize: "12px" }}>
            {errors.headline}
          </div>
        )}
      </div>
      <div>
        <p>Write Your Review</p>
        <textarea
          onChange={(e) => {
            setReview(e.target.value);
            validate();
          }}
          name="review"
          rows="5"
          placeholder="What did you like or dislike about service/ products?"
        ></textarea>
        {errors.review && (
          <div style={{ color: "red", marginTop: "4px", fontSize: "12px" }}>
            {errors.review}
          </div>
        )}
      </div>
      <button className={style.upload}>
        <img src="/icon/upload.svg" alt="" />
        <span>Upload Photo /Videos</span>
      </button>
      <button className={style.post} type="submit">
        Post Review
      </button>
    </Form>
  );
}
