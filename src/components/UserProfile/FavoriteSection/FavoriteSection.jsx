import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { getSalonAPI } from "../../../config/apiCalls";
import css from "./Favorite.module.scss";

const imgUrl = import.meta.env.VITE_API_IMG_URL;
const noImgUrl = import.meta.env.VITE_API_NO_IMG_URL;

function SalonCard({ item }) {
  const star = (item.star / 5) * 100;
  return (
    <Link className={css.card} to={`/salon-detail/${item.salonid}`}>
      <div className="favorite-icon">
        <svg
          width="18"
          height="16"
          viewBox="0 0 18 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask
            id="path-1-outside-1_2_42905"
            maskUnits="userSpaceOnUse"
            x="-0.375"
            y="-0.408203"
            width="18"
            height="16"
            fill="black"
          >
            <rect
              fill="white"
              x="-0.375"
              y="-0.408203"
              width="18"
              height="16"
            />
            <path d="M15.375 8.06055L9.34375 14.3105C8.9375 14.7168 8.28125 14.7168 7.90625 14.3105L1.84375 8.06055C0.09375 6.24805 0.1875 3.24805 2.15625 1.56055C3.84375 0.0917969 6.4375 0.373047 8 1.9668L8.625 2.62305L9.21875 1.9668C10.7812 0.373047 13.3438 0.0917969 15.0938 1.56055C17.0312 3.24805 17.125 6.24805 15.375 8.06055Z" />
          </mask>
          <path
            d="M15.375 8.06055L9.34375 14.3105C8.9375 14.7168 8.28125 14.7168 7.90625 14.3105L1.84375 8.06055C0.09375 6.24805 0.1875 3.24805 2.15625 1.56055C3.84375 0.0917969 6.4375 0.373047 8 1.9668L8.625 2.62305L9.21875 1.9668C10.7812 0.373047 13.3438 0.0917969 15.0938 1.56055C17.0312 3.24805 17.125 6.24805 15.375 8.06055Z"
            fill="#D3427A"
          />
          <path
            d="M15.375 8.06055L14.9434 7.64379L14.9432 7.64391L15.375 8.06055ZM9.34375 14.3105L9.76808 14.7349L9.7755 14.7272L9.34375 14.3105ZM7.90625 14.3105L8.34713 13.9036L8.3421 13.8981L8.33693 13.8928L7.90625 14.3105ZM1.84375 8.06055L1.41211 8.4773L1.41307 8.4783L1.84375 8.06055ZM2.15625 1.56055L2.54674 2.01611L2.55016 2.01313L2.15625 1.56055ZM8 1.9668L8.43453 1.55296L8.42844 1.54675L8 1.9668ZM8.625 2.62305L8.19052 3.03684L8.63628 3.50489L9.06992 3.02559L8.625 2.62305ZM9.21875 1.9668L8.79031 1.54675L8.78189 1.55534L8.77383 1.56425L9.21875 1.9668ZM15.0938 1.56055L15.4879 1.10802L15.4795 1.10096L15.0938 1.56055ZM14.9432 7.64391L8.912 13.8939L9.7755 14.7272L15.8068 8.47719L14.9432 7.64391ZM8.91949 13.8863C8.73773 14.068 8.47549 14.0426 8.34713 13.9036L7.46537 14.7175C8.08701 15.391 9.13727 15.3656 9.76801 14.7348L8.91949 13.8863ZM8.33693 13.8928L2.27443 7.64279L1.41307 8.4783L7.47557 14.7283L8.33693 13.8928ZM2.27539 7.64379C0.761671 6.07601 0.84408 3.47551 2.54672 2.0161L1.76578 1.10499C-0.46908 3.02058 -0.574171 6.42008 1.41211 8.4773L2.27539 7.64379ZM2.55016 2.01313C3.96428 0.782323 6.19854 0.98636 7.57156 2.38684L8.42844 1.54675C6.67646 -0.240267 3.72322 -0.59873 1.76234 1.10796L2.55016 2.01313ZM7.56552 2.38059L8.19052 3.03684L9.05948 2.20925L8.43448 1.553L7.56552 2.38059ZM9.06992 3.02559L9.66367 2.36934L8.77383 1.56425L8.18008 2.2205L9.06992 3.02559ZM9.64719 2.38684C11.0157 0.99093 13.225 0.77542 14.708 2.02013L15.4795 1.10096C13.4625 -0.591826 10.5468 -0.244836 8.79031 1.54675L9.64719 2.38684ZM14.6997 2.013C16.3749 3.47207 16.4578 6.07524 14.9434 7.64379L15.8066 8.4773C17.7922 6.42085 17.6876 3.02403 15.4878 1.1081L14.6997 2.013Z"
            fill="white"
            mask="url(#path-1-outside-1_2_42905)"
          />
        </svg>
      </div>
      <div className={css.salonImg}>
        <img src={`${imgUrl}/${item.thumbnail}`} alt="salon" />
      </div>
      <div className={css.info}>
        <div className={css.header}>
          <img src={`${imgUrl}/${item.avatarimg[0]}`} alt="" />
          <div>
            <strong>{item.name}</strong>
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
              <strong>{item.star.toFixed(1)}</strong>
              <span>({item.countreview} Reviews)</span>
            </div>
          </div>
        </div>
        <p>{item.shortdescription}</p>
        <p>{item.address}</p>
        <div className={css.bookBtn}>
          <button>Book Now</button>
        </div>
      </div>
    </Link>
  );
}

function ServiceCard({ item }) {
  return (
    <div className={css.card}>
      <div className="favorite-icon">
        <svg
          width="18"
          height="16"
          viewBox="0 0 18 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask
            id="path-1-outside-1_2_42905"
            maskUnits="userSpaceOnUse"
            x="-0.375"
            y="-0.408203"
            width="18"
            height="16"
            fill="black"
          >
            <rect
              fill="white"
              x="-0.375"
              y="-0.408203"
              width="18"
              height="16"
            />
            <path d="M15.375 8.06055L9.34375 14.3105C8.9375 14.7168 8.28125 14.7168 7.90625 14.3105L1.84375 8.06055C0.09375 6.24805 0.1875 3.24805 2.15625 1.56055C3.84375 0.0917969 6.4375 0.373047 8 1.9668L8.625 2.62305L9.21875 1.9668C10.7812 0.373047 13.3438 0.0917969 15.0938 1.56055C17.0312 3.24805 17.125 6.24805 15.375 8.06055Z" />
          </mask>
          <path
            d="M15.375 8.06055L9.34375 14.3105C8.9375 14.7168 8.28125 14.7168 7.90625 14.3105L1.84375 8.06055C0.09375 6.24805 0.1875 3.24805 2.15625 1.56055C3.84375 0.0917969 6.4375 0.373047 8 1.9668L8.625 2.62305L9.21875 1.9668C10.7812 0.373047 13.3438 0.0917969 15.0938 1.56055C17.0312 3.24805 17.125 6.24805 15.375 8.06055Z"
            fill="#D3427A"
          />
          <path
            d="M15.375 8.06055L14.9434 7.64379L14.9432 7.64391L15.375 8.06055ZM9.34375 14.3105L9.76808 14.7349L9.7755 14.7272L9.34375 14.3105ZM7.90625 14.3105L8.34713 13.9036L8.3421 13.8981L8.33693 13.8928L7.90625 14.3105ZM1.84375 8.06055L1.41211 8.4773L1.41307 8.4783L1.84375 8.06055ZM2.15625 1.56055L2.54674 2.01611L2.55016 2.01313L2.15625 1.56055ZM8 1.9668L8.43453 1.55296L8.42844 1.54675L8 1.9668ZM8.625 2.62305L8.19052 3.03684L8.63628 3.50489L9.06992 3.02559L8.625 2.62305ZM9.21875 1.9668L8.79031 1.54675L8.78189 1.55534L8.77383 1.56425L9.21875 1.9668ZM15.0938 1.56055L15.4879 1.10802L15.4795 1.10096L15.0938 1.56055ZM14.9432 7.64391L8.912 13.8939L9.7755 14.7272L15.8068 8.47719L14.9432 7.64391ZM8.91949 13.8863C8.73773 14.068 8.47549 14.0426 8.34713 13.9036L7.46537 14.7175C8.08701 15.391 9.13727 15.3656 9.76801 14.7348L8.91949 13.8863ZM8.33693 13.8928L2.27443 7.64279L1.41307 8.4783L7.47557 14.7283L8.33693 13.8928ZM2.27539 7.64379C0.761671 6.07601 0.84408 3.47551 2.54672 2.0161L1.76578 1.10499C-0.46908 3.02058 -0.574171 6.42008 1.41211 8.4773L2.27539 7.64379ZM2.55016 2.01313C3.96428 0.782323 6.19854 0.98636 7.57156 2.38684L8.42844 1.54675C6.67646 -0.240267 3.72322 -0.59873 1.76234 1.10796L2.55016 2.01313ZM7.56552 2.38059L8.19052 3.03684L9.05948 2.20925L8.43448 1.553L7.56552 2.38059ZM9.06992 3.02559L9.66367 2.36934L8.77383 1.56425L8.18008 2.2205L9.06992 3.02559ZM9.64719 2.38684C11.0157 0.99093 13.225 0.77542 14.708 2.02013L15.4795 1.10096C13.4625 -0.591826 10.5468 -0.244836 8.79031 1.54675L9.64719 2.38684ZM14.6997 2.013C16.3749 3.47207 16.4578 6.07524 14.9434 7.64379L15.8066 8.4773C17.7922 6.42085 17.6876 3.02403 15.4878 1.1081L14.6997 2.013Z"
            fill="white"
            mask="url(#path-1-outside-1_2_42905)"
          />
        </svg>
      </div>
      <div className={css.salonImg}>
        <img
          src={item.imagejson ? `${imgUrl}/${item.imagejson}` : noImgUrl}
          alt="salon"
        />
      </div>
      <div className={css.infoSrv}>
        <div>
          <h3>{item.name}</h3>
          <div>
            <svg
              width="16"
              height="13"
              viewBox="0 0 16 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 0H4.375C3.39062 0 2.625 0.792969 2.625 1.75V7.875C2.625 8.85938 3.39062 9.625 4.375 9.625H14C14.957 9.625 15.75 8.85938 15.75 7.875V1.75C15.75 0.792969 14.957 0 14 0ZM14.4375 7.875C14.4375 8.12109 14.2188 8.3125 14 8.3125H13.5625L10.5547 3.9375C10.4727 3.80078 10.3359 3.71875 10.1992 3.71875C10.0352 3.71875 9.89844 3.80078 9.81641 3.9375L8.12109 6.50781L7.49219 5.66016C7.41016 5.55078 7.30078 5.46875 7.16406 5.46875C7 5.46875 6.89062 5.55078 6.80859 5.66016L4.8125 8.3125H4.375C4.12891 8.3125 3.9375 8.12109 3.9375 7.875V1.75C3.9375 1.53125 4.12891 1.3125 4.375 1.3125H14C14.2188 1.3125 14.4375 1.53125 14.4375 1.75V7.875ZM6.125 2.1875C5.63281 2.1875 5.25 2.59766 5.25 3.0625C5.25 3.55469 5.63281 3.9375 6.125 3.9375C6.58984 3.9375 7 3.55469 7 3.0625C7 2.59766 6.58984 2.1875 6.125 2.1875ZM12.4688 12.25H3.28125C1.44922 12.25 0 10.8008 0 8.96875V2.40625C0 2.05078 0.273438 1.75 0.65625 1.75C1.01172 1.75 1.3125 2.05078 1.3125 2.40625V8.96875C1.3125 10.0625 2.1875 10.9375 3.28125 10.9375H12.4688C12.8242 10.9375 13.125 11.2383 13.125 11.5938C13.125 11.9766 12.8242 12.25 12.4688 12.25Z"
                fill="#777777"
              />
            </svg>
            {item.saloncountreview}
          </div>
        </div>
        <span>{item.salonname}</span>
        <div className={css.bookBtn}>
          <div>
            <i className="fa-solid fa-star"></i>
            <span>{item.star.toFixed(2)}</span>
            <span>({item.saloncountreview})</span>
          </div>
          <button>Book Now</button>
        </div>
      </div>
    </div>
  );
}
export default function FavoriteSection() {
  const data = useLoaderData();
  const sln = data.salons;
  const srv = data.services;
  const [salons, setSalons] = useState(sln.data);
  const [services, setServices] = useState(srv.data);
  const [tab, setTab] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const getAllServices = async () => {
    setIsLoading(true);
    const res = await getSalonAPI({
      s: "GetUserServiceFavourite",
      user: true,
    });

    if (res.error !== "") {
      console.log(res.error);
      return;
    }

    setServices(await res.data);
  };

  useEffect(() => {
    setIsLoading(false);
  }, [salons, services]);
  return (
    <div className={css.favorite}>
      <div className={css.navbar}>
        <a
          className={tab === 1 ? css.tab : ""}
          onClick={() => setTab(1)}
          href="#section1"
        >
          Salons
        </a>
        <a
          className={tab === 2 ? css.tab : ""}
          onClick={() => setTab(2)}
          href="#section2"
        >
          Technicians
        </a>
        <a
          className={tab === 3 ? css.tab : ""}
          onClick={() => setTab(3)}
          href="#section3"
        >
          Services
        </a>
      </div>
      <section id="section1">
        <div>
          <h3>Salons</h3>
          <span>{sln.total} Saved Salons</span>
        </div>
        <div className={css.grid}>
          {salons.map((item, idx) => (
            <SalonCard key={item.salonid || idx} item={item} />
          ))}
        </div>
        {sln.total > 8 && salons.length < sln.total && (
          <div className={css.seeMore}>
            <strong>See More</strong>
          </div>
        )}
      </section>
      <section id="section2">
        <div>
          <h3>Technicians</h3>
          <span>0 Saved Technicians</span>
        </div>
        <div></div>
      </section>
      <section id="section3">
        <div>
          <h3>Services</h3>
          <span>{srv.total} Saved Services</span>
        </div>
        <div className={css.grid}>
          {services.map((item, idx) => (
            <ServiceCard key={item.id || idx} item={item} />
          ))}
        </div>
        {srv.total > 8 && services.length < srv.total && (
          <div className={css.seeMore}>
            <strong onClick={getAllServices}>See More</strong>
          </div>
        )}
        {isLoading && (
          <div style={{ height: "140px", paddingTop: "70px" }}>
            <div className="loading-dot">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
