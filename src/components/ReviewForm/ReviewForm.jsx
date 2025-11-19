import { Form } from "react-router-dom";
import style from "./ReviewForm.module.scss";

export default function ReviewForm() {
  return (
    <Form method="post" className={style.reviewForm}>
      <div>
        <p>Select Your Rating</p>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
      </div>
      <div>
        <p>Add a Headline</p>
        <input
          type="text"
          name="headline"
          placeholder="What's most important to know?"
          required
        />
      </div>
      <div>
        <p>Write Your Review</p>
        <input
          type="text"
          name="review"
          placeholder="What did you like or dislike about service/ products?"
          required
        />
      </div>
      <button>Upload Photo</button>
      <button type="submit">Post Review</button>
    </Form>
  );
}
