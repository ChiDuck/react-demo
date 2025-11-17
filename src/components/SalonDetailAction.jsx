import style from "../styles/SalonDetail.module.scss";
import Button from "./Button";

export default function SalonDetailAction() {
  return (
    <div className={style.action}>
      <Button text="Book Now" />
      <button>Write a Review</button>
      <button>Add Photo</button>
      <button>Share</button>
      <button>Save</button>
    </div>
  );
}
