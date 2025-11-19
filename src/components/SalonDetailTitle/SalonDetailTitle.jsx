import style from "../../styles/SalonDetail.module.scss";
import { getOpenStatus } from "./openStatus";

const imgUrl = import.meta.env.VITE_API_IMG_URL;

export default function SalonDetailTitle({ detail }) {
  const status = getOpenStatus(detail.schedule, detail.timezone);
  console.log(status.text);
  console.log(detail);
  return (
    <div className={style.salonDetailHeader}>
      <img src={`${imgUrl}/${detail.avatarimg}`} />
      <div>
        <div className={style.flex1}>
          <h1>{detail.name}</h1>
          <span className={`${status.isOpen ? "" : style.closed}`}>
            {status.text1}
            <span> {status.text2}</span>
          </span>
        </div>
        <div className={style.titleBlock}>
          <div>
            <div>
              <span>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </span>
              <span>5.0</span>
            </div>
            <span>({detail.countreview} Reviews) </span>
          </div>
          <img src="/icon/verified.svg" />
        </div>
      </div>
    </div>
  );
}
