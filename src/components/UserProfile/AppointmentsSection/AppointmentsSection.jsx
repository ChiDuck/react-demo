import { useCallback, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getSalonAPI, postSalonAPI } from "../../../config/apiCalls";
import Appointments from "./Appointments";
import css from "./Appointments.module.scss";

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

    const res = await postSalonAPI({
      c: "AddSalonAppointmentChat",
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
