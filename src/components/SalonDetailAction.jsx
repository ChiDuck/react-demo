import { Link } from "react-router-dom";
import style from "../styles/SalonDetail.module.scss";
import Button from "./Button";

export default function SalonDetailAction({
  salonid,
  write = false,
  view = false,
}) {
  return (
    <div>
      <div className={style.action}>
        <Button text="Book Now" />
        {!write && (
          <>
            <Link to={`/writereview/${salonid}`} className={style.actionLink}>
              <button>
                <img src="/icon/review.svg" alt="" />
                <span>Write a Review</span>
              </button>
            </Link>
            {!view && (
              <button>
                <img src="/icon/+.svg" alt="" />
                <span>Add Photo</span>
              </button>
            )}
          </>
        )}
        <button>
          <img src="\icon\share.svg" alt="" />
          <span>Share</span>
        </button>
        <button>
          <img src="\icon\heart.svg" alt="" />
          <span>Save</span>
        </button>
      </div>
    </div>
  );
}
