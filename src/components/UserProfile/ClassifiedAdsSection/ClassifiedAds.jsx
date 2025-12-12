import css from "./ClassifiedAds.module.scss";

const imgUrl = import.meta.env.VITE_API_IMG_URL;

export default function AdCard({ item }) {
  const empl = item.employer;
  const img =
    empl.images != null ? `${imgUrl}/${empl.images[0]}` : "/logo/logonail.svg";
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US");
  };

  return (
    <div
      className={item.status !== 3 ? css.card : `${css.card} ${css.inactive}`}
    >
      <img
        src={img}
        style={
          empl.images != null
            ? { objectFit: "cover" }
            : { objectFit: "contain" }
        }
        alt=""
      />
      <div>
        <h2>Contact Name: {empl.contactname}</h2>
        <p>Contact Number: {empl.phone}</p>
        <p>Email Address: {empl.email}</p>
        <p>
          Address: {empl.street} {empl.city} {empl.state} {empl.zip}
        </p>
        <p>Title: {item.title}</p>
        <p>Description: {item.description} </p>
        <p>
          Status:{" "}
          {item.status === 1
            ? "Approved"
            : item.status === 0
            ? "Pending"
            : "Inactive"}
        </p>
        <p>Posted Date: {formatDate(item.startdate)} </p>
        <p>Expiration Date: {formatDate(item.expireddate)}</p>
        {item.status !== 3 && (
          <div>
            <button>Inactive</button>
          </div>
        )}
      </div>
    </div>
  );
}
