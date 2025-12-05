import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Review from "./Review";
import css from "./Review.module.scss";
export default function ReviewSection() {
  const data = useLoaderData();
  const [items, setItems] = useState(data.data);
  const [deleting, setDeleting] = useState(false);

  const deleteReview = () => {};
  const openDelete = () => {};
  return (
    <div className={css.reviewListContainer}>
      {items.map((item, idx) => (
        <Review key={item.id || idx} data={item} />
      ))}
      {/* {isLoading && (
        <div className={css.loadingBar}>
          <div></div>
        </div>
      )} */}
      <div className={css.overlay}>
        <div>
          <h2>Are you sure you want to delete this review?</h2>
          <div>
            <button>Yes</button>
            <button>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
