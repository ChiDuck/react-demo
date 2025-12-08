import { useCallback, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getSalonAPI, postSalonAPI } from "../../../config/apiCalls";
import Review from "./Review";
import css from "./Review.module.scss";

export default function ReviewSection() {
  const data = useLoaderData();
  const total = data.total;
  const [items, setItems] = useState(data.data);
  const [deleting, setDeleting] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef(null);

  const fetchPage = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const res = await getSalonAPI({
        s: "GetUserReview",
        p: page,
        z: 5,
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

  const deleteReview = async () => {
    const body = JSON.stringify(deleting);
    const res = await postSalonAPI({
      c: "DeleteSalonReview",
      body: body,
    });
    if (res.error !== "") {
      console.log(res.error);
      return;
    }

    fetchReviews();
    setDeleting({});
    setPage(2);
  };

  const openDelete = (id, salonid) => {
    setDeleting({ id, salonid });
  };

  const fetchReviews = async () => {
    const res = await getSalonAPI({
      s: "GetUserReview",
      user: true,
      p: 1,
      z: 5,
    });
    const data = await res.data;
    setItems(data);
  };

  return (
    <div className={css.reviewListContainer} ref={containerRef}>
      {items.map((item, idx) => (
        <Review key={item.id || idx} data={item} openDelete={openDelete} />
      ))}
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
      <div
        className={
          deleting.id != null && deleting.salonid != null
            ? `${css.overlay} ${css.active}`
            : css.overlay
        }
      >
        <div>
          <h2>Are you sure you want to delete this review?</h2>
          <div>
            <button onClick={deleteReview}>Yes</button>
            <button onClick={() => setDeleting({})}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
