import { useCallback, useEffect, useRef, useState } from "react";
import { getSalonAPI } from "../../../config/apiCalls";
import css from "./Appointments.module.scss";
import BookingDetail from "./BookingDetail";

const imgUrl = import.meta.env.VITE_API_IMG_URL;
const apiUrl = import.meta.env.VITE_API_URL;
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiTlRQIDU0MDUiLCJpZCI6IjRkMzhhZmMwLWFjODMtNDg4NC1iOGQzLWUwOGIzYTVkMWFkNCIsInJvbGUiOiJ1c2VyIiwiYWN0aXZlIjp0cnVlLCJkYmlkIjoiYzhiYjgwMzkiLCJleHAiOjE3NjQ4NDcxOTd9.szDGMcUmB4bNqEOiUofNqp5KanQBf3aK3QYqLOtqdxU";

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

function OtherInfo({ data }) {
  const dateObj = new Date(data.fromtime);

  const weekday = dateObj.toLocaleDateString("en-US", {
    weekday: "long",
  });
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
  const formattedTime = dateObj.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return (
    <div className={css.otherInfo}>
      <strong style={{ fontSize: "30px" }}>
        {weekday} -{" "}
        <span style={{ color: "rgb(252, 184, 45) " }}>{data.status}</span>
      </strong>
      <span>Amount</span>
      <strong className={css.amount}>${data.amount}</strong>
      <span>
        No. of Guests: <strong>{data.guestcount}</strong>
      </span>
      <div>
        <img src="#" alt="" />
        <strong>{formattedDate}</strong>
        <img src="#" alt="" />
        <strong>{formattedTime}</strong>
      </div>
      <button>Change/ Cancel</button>
    </div>
  );
}

function Appointments(props) {
  return (
    <div className={css.appointmentContainer}>
      <div className={css.appointmentInfo}>
        <SalonInfo data={props.data} />
        <OtherInfo data={props.data} />
      </div>
      <BookingDetail {...props} />
    </div>
  );
}

export default function AppointmentsSection({ json }) {
  const total = json.total;
  const [items, setItems] = useState(json.data);
  const [page, setPage] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [openId, setOpenId] = useState(null);
  const [fakeChat, setFakeChat] = useState([]);
  const containerRef = useRef(null);

  const fetchPage = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const res = await getSalonAPI({
        s: "GetUserAppointment",
        p: page,
        z: 5,
        sort: "",
        user: true,
      });
      const newItems = res.data ?? [];

      setItems((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);

      // replace with your API's total count
      setHasMore(items.length + newItems.length < total);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [page, isLoading, hasMore, total]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;
      // when scrolled to bottom (threshold 50px)
      if (scrollTop + clientHeight >= scrollHeight) {
        fetchPage();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [fetchPage]);

  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
    // clicking the same child closes it
  };

  const sendMessage = async (appointmentId, text) => {
    const payload = {
      appointmentid: appointmentId,
      content: JSON.stringify({
        message: text,
        images: null,
      }),
      idreply: null,
      iscustomer: 1,
    };

    const res = await fetch(`${apiUrl}salon/cmd?c=AddSalonAppointmentChat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (data.error === "") {
      
    }
  };

  return (
    <div className={css.appointmentList} ref={containerRef}>
      {items.map((item, idx) => (
        <Appointments
          key={idx}
          data={item}
          id={idx}
          open={openId === idx}
          onToggle={handleToggle}
          onSendMessage={sendMessage}
        />
      ))}
      {isLoading && (
        <div className={css.loadingBar}>
          <div></div>
        </div>
      )}
    </div>
  );
}
