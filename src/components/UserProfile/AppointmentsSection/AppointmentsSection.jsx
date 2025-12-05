import { useCallback, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getSalonAPI } from "../../../config/apiCalls";
import Appointments from "./Appointments";
import css from "./Appointments.module.scss";

const apiUrl = import.meta.env.VITE_API_URL;
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiTlRQIDU0MDUiLCJpZCI6IjRkMzhhZmMwLWFjODMtNDg4NC1iOGQzLWUwOGIzYTVkMWFkNCIsInJvbGUiOiJ1c2VyIiwiYWN0aXZlIjp0cnVlLCJkYmlkIjoiZjI5YzFmNjIiLCJleHAiOjE3NjQ5MzMxMTl9.owp4MfxFQDNqXcu1V0NbqfqGq8TnQVk4KppT1UESI3g";

export default function AppointmentsSection() {
  const data = useLoaderData();
  const total = data.total;
  const [items, setItems] = useState(data.data);
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
