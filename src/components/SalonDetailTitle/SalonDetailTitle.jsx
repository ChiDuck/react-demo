import style from "../../styles/SalonDetail.module.scss";
import { getOpenStatus } from "./openStatus";

const imgUrl = import.meta.env.VITE_API_IMG_URL;

export default function SalonDetailTitle({ detail }) {
  const status = getOpenStatus(detail.schedule, detail.timezone);
  const star = (detail.star / 5) * 100;
  return (
    <div>
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
              <div className={style.rateAndReview}>
                <div >
                  <div className={style.trueStar} style={{ width: `${star}%` }}>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                  </div>
                  <div>
                    <i
                      className="fa-solid fa-star"
                      style={{ color: "#aaaaaa" }}
                    ></i>
                    <i
                      className="fa-solid fa-star"
                      style={{ color: "#aaaaaa" }}
                    ></i>
                    <i
                      className="fa-solid fa-star"
                      style={{ color: "#aaaaaa" }}
                    ></i>
                    <i
                      className="fa-solid fa-star"
                      style={{ color: "#aaaaaa" }}
                    ></i>
                    <i
                      className="fa-solid fa-star"
                      style={{ color: "#aaaaaa" }}
                    ></i>
                  </div>
                </div>
                <strong>{Number(detail.star.toFixed(1))}</strong>
              </div>
              <span>({detail.countreview} Reviews) </span>
            </div>
            <img src="/icon/verified.svg" />
          </div>
        </div>
      </div>
    </div>
  );
}
