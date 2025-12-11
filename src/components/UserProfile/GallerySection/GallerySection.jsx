import { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getSalonAPI } from "../../../config/apiCalls";
import Pagination from "../../Pagination/Pagination";
import css from "./Gallery.module.scss";

const imgUrl = import.meta.env.VITE_API_IMG_URL;
const PAGE_SIZE = 16;

function FullImgModal(props) {
  const curImgUrl = props.curItem
    ? `${imgUrl}/${props.curItem.imgpath}${props.curItem.imgname}`
    : "";

  return (
    <div
      className={
        props.index !== -1 ? `${css.overlay} ${css.active}` : css.overlay
      }
    >
      <div className={css.modal}>
        <div className={css.head}>
          <div>
            {props.index + 1}/{PAGE_SIZE}
          </div>
          <button onClick={() => props.setIndex(-1)}>X</button>
        </div>
        <div className={css.imgBlock}>
          <img src={curImgUrl} alt="" />
        </div>
        <div className={props.index + 1 == 1 ? css.disable : ""}>
          <button onClick={() => props.setIndex((i) => i - 1)}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        </div>
        <div className={props.index + 1 == PAGE_SIZE ? css.disable : ""}>
          <button onClick={() => props.setIndex((i) => i + 1)}>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function GallerySection() {
  const data = useLoaderData();
  const [items, setItems] = useState(data.data);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(data.total / PAGE_SIZE)
  );
  const [openImg, setOpenImg] = useState("");
  const [index, setIndex] = useState(-1);
  const [curItem, setCurItem] = useState({});

  useEffect(() => {
    setCurItem(items[index]);
  }, [index]);

  useEffect(() => {
    setIndex(items.findIndex((x) => x.id === openImg));
  }, [openImg]);

  async function handlePage() {
    if (page === 1) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const res = await getSalonAPI({
      s: "GetUserGallery",
      p: page,
      z: PAGE_SIZE,
      user: true,
      signal,
    });

    if (res.error !== "") {
      console.log(res.error);
      return;
    }
    setItems(await res.data);
    const tot = Number(res.total);
    setTotalPages(Math.max(1, Math.ceil(tot / PAGE_SIZE)));

    window.scrollTo({ top: 0 });

    return () => controller.abort();
  }

  useEffect(() => {
    handlePage();
  }, [page]);

  return (
    <div className={css.gallery}>
      <div className={css.galleryGrid}>
        {items.map((item, idx) => {
          return (
            <img
              key={item.id ?? idx}
              src={`${imgUrl}/${item.imgpath}${item.imgname}`}
              alt=""
              onClick={() => setOpenImg(item.id)}
            />
          );
        })}
      </div>
      <Pagination totalPages={totalPages} page={page} setPage={setPage} />
      <FullImgModal curItem={curItem} index={index} setIndex={setIndex} />
    </div>
  );
}
