import { Link } from "react-router-dom";
import css from "../UserLayout/UserSideNav.module.scss";

function NavItem(props) {
  const handleClick = () => {};

  return (
    <li>
      <img src="#" alt="" />
      {!props.collapsed && <strong>{props.name}</strong>}
    </li>
  );
}

export default function UserSideNav(props) {
  return (
    <nav
      className={
        props.collapsed
          ? `${css.userSideNav} ${css.collapsed}`
          : css.userSideNav
      }
    >
      <Link to="/">
        <div>
          <img src="/logo/logonail.svg" alt="" />
        </div>
      </Link>
      <div className={css.info}>
        <img className={css.avatar} src="/logo/logo.png" alt="" />
        <strong>Ntp 5454</strong>
        <div className={css.point}>
          <img src="/icon/pts.svg" alt="" />
          <div>
            <h5>My Rewards</h5>
            <strong>45,000,400</strong>
            <span> PTS</span>
          </div>
        </div>
      </div>
      <ul className={css.navlist}>
        <NavItem {...props} name="Appointments" />
        <NavItem {...props} name="Review" />
        <NavItem {...props} name="Gallery" />
        <NavItem {...props} name="Favorite" />
        <NavItem {...props} name="Payment" />
        <NavItem {...props} name="Account Setting" />
        <NavItem {...props} name="Classified Ads" />
        <NavItem {...props} name="Logout" />
      </ul>
    </nav>
  );
}
