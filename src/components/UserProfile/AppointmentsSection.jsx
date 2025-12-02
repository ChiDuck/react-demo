import { useState } from "react";
import css from "./Appointments.module.scss";

const imgUrl = import.meta.env.VITE_API_IMG_URL;

function BookingDetail() {
  const [open, setOpen] = useState(false);
  return (
    <div className={css.bookingDetailContainer}>
      <div onClick={() => setOpen(!open)}>
        <h3>Booking Details & Messages</h3>
        <svg
          className={open ? css.open : ""}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.77734 1.3125L5.16797 5.03125C5.03125 5.19531 4.83984 5.25 4.64844 5.25C4.42969 5.25 4.23828 5.19531 4.10156 5.03125L0.492188 1.3125C0 0.820312 0.355469 0 1.01172 0H8.25781C8.91406 0 9.26953 0.820312 8.77734 1.3125Z"
            fill="#777777"
          />
        </svg>
      </div>
      {open && (
        <div className={css.bookingDetailContent}>
          <div>
            <strong>Booking details</strong>
            <div className={css.bookingDetail}>
              <div>
                <strong>NTP 5454</strong>
              </div>
              <div>
                <div>
                  <strong>Number of Guests</strong>
                  <strong>1</strong>
                </div>
                <div>
                  <strong>Booking Time</strong>
                  <strong>07:00 AM</strong>
                </div>
                <strong>Preferred Services</strong>
                <div>
                  <strong>Acrylics</strong>
                  <strong>$55.00+</strong>
                </div>
                <strong>Preferred Technician</strong>
                <div>
                  <strong>Anyone</strong>
                </div>
              </div>
            </div>
          </div>
          <div className={css.msg}>
            <strong>Messages</strong>
            <div></div>
            <div>
              <input type="text" placeholder="Type a message..." />
              <button>
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.6094 0.234375C19.9219 0.429688 20.0781 0.78125 19.9609 1.13281L17.4609 18.0078C17.4219 18.2812 17.2656 18.5547 16.9922 18.6719C16.875 18.75 16.7188 18.8281 16.5625 18.8281C16.4062 18.8281 16.2891 18.7891 16.1719 18.75L12.3438 17.1094L8.00781 19.9219C7.85156 20 7.65625 20.0391 7.5 20.0391C7.38281 20.0391 7.22656 20 7.07031 19.9609C6.75781 19.7656 6.60156 19.4531 6.60156 19.1016V14.6875L0.585938 12.1875C0.273438 12.0312 0.0390625 11.7188 0.0390625 11.3672C0 11.0156 0.195312 10.6641 0.507812 10.5078L18.6328 0.195312C18.9453 0 19.3359 0.0390625 19.6094 0.234375ZM14.4531 4.72656L3.08594 11.1719L7.14844 12.8906L14.4531 4.72656ZM8.4375 17.3828L10.2344 16.25L8.4375 15.4688V17.3828ZM15.8203 16.5234L17.6953 3.90625L8.94531 13.6328L15.8203 16.5234Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SalonInfo({ data }) {
  const star = (data.salonstar / 5) * 100;
  return (
    <div className={css.salonInfo}>
      <div className={css.imgStyle}>
        <div>
          <img src={`${imgUrl}/${data.thumbnail}`} alt="thumbnail" />
        </div>
        <svg
          width="380"
          height="10"
          viewBox="0 0 380 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 0H369.743L379.743 9.72358H0L10 0Z"
            fill="url(#paint0_linear_2_39371)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_2_39371"
              x1="189.872"
              y1="0"
              x2="189.872"
              y2="9.72358"
              gradientUnits="userSpaceOnUse"
            >
              <stop />
              <stop offset="1" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className={css.gradient}>
        <img src={`${imgUrl}/${data.avatarimg[0]}`} alt="" />
        <div>
          <strong>{data.salonname}</strong>
          <div className={css.rateAndReview}>
            <div>
              <div className={css.trueStar} style={{ width: `${star}%` }}>
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
            <strong>{data.salonstar.toFixed(1)}</strong>
            <span>({data.countreview} Reviews)</span>
          </div>
          <span>{data.address}</span>
        </div>
      </div>
    </div>
  );
}

function OtherInfo() {
  return (
    <div className={css.otherInfo}>
      <strong style={{ fontSize: "30px" }}>
        Friday -{" "}
        <span style={{ color: "rgb(252, 184, 45) " }}>Pending Approval</span>
      </strong>
      <span>Amount</span>
      <strong className={css.amount}>$60.60</strong>
      <span>
        No. of Guests: <strong>1</strong>
      </span>
      <div>
        <img src="#" alt="" />
        <strong>Nov 28 2025</strong>
        <img src="#" alt="" />
        <strong>07:00 AM</strong>
      </div>
      <button>Change/ Cancel</button>
    </div>
  );
}

function Appointments({ data }) {
  return (
    <div className={css.appointmentContainer}>
      <div className={css.appointmentInfo}>
        <SalonInfo data={data} />
        <OtherInfo data={data} />
      </div>
      <BookingDetail data={data} />
    </div>
  );
}

export default function AppointmentsSection({ data }) {
  return (
    <div className={css.appointmentList}>
      {data.map((item) => (
        <Appointments data={item} />
      ))}
    </div>
  );
}
