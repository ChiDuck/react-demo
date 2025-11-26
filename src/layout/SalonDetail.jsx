import SalonDetailAction from "../components/SalonDetailAction";
import SalonDetailTitle from "../components/SalonDetailTitle/SalonDetailTitle";
import style from "../styles/SalonDetail.module.scss";

export default function SalonDetail({ detail, salonid, view, write }) {
  return (
    <div className={style.titleFlex}>
      <SalonDetailTitle detail={detail} />
      <SalonDetailAction salonid={salonid} view={view} write={write} />
    </div>
  );
}
