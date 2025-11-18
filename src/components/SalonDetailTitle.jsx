import { useLoaderData } from "react-router-dom";
import style from "../styles/SalonDetail.module.scss";

export default function SalonDetailTitle() {
  const item = useLoaderData();
  console.log(item);
  return (
    <div className={style.salonDetailHeader}>
      <img src="logo\b9f21775293a2c2c86941e865ff81ff0a92ae96f.png" />
      <div>
        <div className={style.flex1}>
          <h1>{item.name}</h1>
          <span>
            Open Now <span> - Closes 10 PM</span>
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
          <img src="icon\verified.svg" />
        </div>
      </div>
    </div>
  );
}
