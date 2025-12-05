import { Link } from "react-router-dom";
import css from "../UserLayout/UserSideNav.module.scss";
import NavBar from "./NavBar";

const imgUrl = import.meta.env.VITE_API_IMG_URL;

export default function UserSideNav(props) {
  const data = props.data[0];
  const img = JSON.parse(props.data[0].content);

  return (
    <nav
      className={
        props.collapsed
          ? `${css.userSideNav} ${css.collapsed}`
          : css.userSideNav
      }
    >
      <Link to="/" className={css.logo}>
        <div>
          <img src="/logo/logonail.svg" alt="" />
        </div>
      </Link>
      <div className={css.info}>
        <img className={css.avatar} src={`${imgUrl}/${img.avatar}`} alt="" />
        <strong>
          {data.firstname} {data.lastname}
        </strong>
        <div className={css.point}>
          <img src="/icon/pts.svg" alt="" />
          {!props.collapsed && (
            <div>
              <h5>My Rewards</h5>
              <span>
                {data.point}
                <span> PTS</span>
              </span>
            </div>
          )}
        </div>
      </div>
      <NavBar {...props} />
    </nav>
  );
}
