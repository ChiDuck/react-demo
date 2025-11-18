import { useLoaderData } from "react-router-dom";
import style from "../../styles/SalonDetail.module.scss";
import { getOpenStatus } from "./openStatus";

export default function SalonDetailTitle() {
  const item = useLoaderData();
  const status = getOpenStatus(item.schedule, item.timezone);
  console.log(status.text);
  console.log(item);
  return (
    <div className={style.salonDetailHeader}>
      <img
        src={`https://dev.nail360.info/light/api/images/${item.avatarimg}`}
      />
      <div>
        <div className={style.flex1}>
          <h1>{item.name}</h1>
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
            <span>({item.countreview} Reviews) </span>
          </div>
          <img src="/icon/verified.svg" />
        </div>
      </div>
    </div>
  );
}
