import style from "../styles/SalonDetail.module.scss";

export default function SalonDetailGallery({ gallery }) {
  const imgUrl = import.meta.env.VITE_API_IMG_URL;
  return (
    <div className={style.gallery}>
      <button>
        <img src="/icon/all.svg" alt="" />
        <span>Show all Photos</span>
      </button>
      {gallery.map((item, index) => (
        <img
          key={index}
          src={`${imgUrl}${item.imgpath}${item.imgname}`}
          alt="gallery item"
        />
      ))}
    </div>
  );
}
