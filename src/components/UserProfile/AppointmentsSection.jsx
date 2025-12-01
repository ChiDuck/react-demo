import css from "./Appointments.module.scss";
function Appointments() {
  const star = 75;
  return (
    <div className={css.appointmentContainer}>
      <div className={css.appointmentInfo}>
        <div className={css.salonInfo}>
          <div className={css.imgStyle}>
            <div>
              <img
                src="/pictures/2be5716a6c96bb1efdf2082f548b691638876426.png"
                alt=""
              />
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
            <img src="/logo/logo2.svg" alt="" />
            <div>
              <strong>Larelala</strong>
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
                <strong>4.5</strong>
                <span>(10 Reviews)</span>
              </div>
              <span>013 key lamar esat lala</span>
            </div>
          </div>
        </div>
        <div className={css.otherInfo}>
          <strong style={{ fontSize: "30px" }}>
            Friday -{" "}
            <span style={{ color: "rgb(252, 184, 45) " }}>
              Pending Approval
            </span>
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
      </div>
      <div className={css.bookingdetail}>
        <div>
          <h3>Booking Details & Messages</h3>
          <img src="/icon/down.svg" alt="" />
        </div>
      </div>
    </div>
  );
}

export default function AppointmentsSection() {
  return (
    <div>
      <Appointments />
    </div>
  );
}
