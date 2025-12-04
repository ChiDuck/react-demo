import React, { useEffect, useRef, useState } from "react";
import { getSalonAPI } from "../../../config/apiCalls";
import "../../../styles/main.scss";
import css from "./BookingDetail.module.scss";
const imgUrl = import.meta.env.VITE_API_IMG_URL;

export default function BookingDetail(props) {
  const { data, open, onToggle, onSendMessage, id } = props;

  const [detail, setDetail] = useState({});
  const [chat, setChat] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const datadetail = useRef({});
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;

    onSendMessage(detail.appointmentuuid, text);
    setText("");
    fetchDetailandChat();
  };

  function formattedBookingTime(date) {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  const fetchDetailandChat = async () => {
    const detail = await getSalonAPI({
      s: "GetSalonCartDetailById",
      cartid: data.idcart,
      idsalon: data.idsalon,
      salon: true,
    });
    const detailJson = await detail.data;
    console.log(detailJson);
    const chat = await getSalonAPI({
      s: "GetUserAppointmentChat",
      appointmentid: data.id,
      user: true,
    });
    const chatJson = await chat.data;
    console.log(chatJson);

    setDetail(detailJson);
    setChat(chatJson);
  };

  useEffect(() => {
    if (open) {
      fetchDetailandChat();
    }
  }, [open]);

  useEffect(() => {
    datadetail.current = (detail.isguest != null ? detail.isguest : true)
      ? detail.datadetailguest
      : detail.datadetail[0];
    setIsLoading(false);
  }, [detail]);

  return (
    <div className={css.bookingDetailContainer}>
      <div
        onClick={() => {
          if (!open) setIsLoading(true);
          onToggle(id);
        }}
      >
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

            {!isLoading ? (
              <div className={css.bookingDetail}>
                <div>
                  <strong>{datadetail.current.customername}</strong>
                </div>
                <div>
                  <div>
                    <div>
                      <strong>Number of Guests</strong>
                      <strong>{datadetail.current.guestcount}</strong>
                    </div>
                  </div>
                  <div>
                    <div>
                      <strong>Booking Time</strong>
                      <strong>
                        {formattedBookingTime(new Date(detail.appointmenttime))}
                      </strong>
                    </div>
                  </div>
                  <strong>Preferred Services</strong>
                  <div>
                    {datadetail.current.services?.map((item) => (
                      <div key={item.id}>
                        <strong>{item.servicename}</strong>
                        <strong>${item.price.toFixed(2)}+</strong>
                      </div>
                    ))}
                  </div>
                  <strong>Preferred Technician</strong>
                  <div>
                    {datadetail.current.technicians?.length ? (
                      datadetail.current.technicians.map((item) => (
                        <div key={item.id}>
                          <strong>{item.technicianname}</strong>
                        </div>
                      ))
                    ) : (
                      <div>
                        <strong>Anyone</strong>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="loading-dot">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            )}
          </div>
          <div className={css.msg}>
            <strong>Messages</strong>
            {!isLoading && (
              <>
                <div>
                  {chat?.map((item, idx) => {
                    const next = chat[idx + 1];
                    const dateStr = new Date(
                      item.createddate
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    });
                    return (
                      <React.Fragment key={item.id ?? idx}>
                        <div
                          className={item.iscustomer ? css.customer : css.admin}
                        >
                          {item.content.message}
                        </div>
                        {next?.iscustomer != item.iscustomer && (
                          <div className={css.chatAvatar}>
                            <img src={`${imgUrl}/${item.avatar}`} alt="" />
                            <span>{dateStr}</span>
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
                <div>
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type a message..."
                  />
                  <button onClick={handleSend}>
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
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
