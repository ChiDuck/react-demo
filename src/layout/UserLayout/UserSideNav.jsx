import { Link } from "react-router-dom";
import css from "../UserLayout/UserSideNav.module.scss";

const imgUrl = import.meta.env.VITE_API_IMG_URL;

function NavItem(props) {
  const { tab, setTab, name, index } = props;

  const handleClick = () => {
    setTab({ index, name });
  };

  return (
    <li className={tab.index === index ? css.select : ""} onClick={handleClick}>
      <img src={props.icon} alt="" />
      <strong>{name}</strong>
    </li>
  );
}

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
      <ul className={css.navlist}>
        <NavItem
          {...props}
          icon="/icon/user/6.svg"
          index={1}
          name="Appointments"
        />
        <NavItem {...props} icon="/icon/user/7.svg" index={2} name="Review" />
        <NavItem {...props} icon="/icon/user/8.svg" index={3} name="Gallery" />
        <NavItem {...props} icon="/icon/user/2.svg" index={4} name="Favorite" />
        <NavItem {...props} icon="/icon/user/5.svg" index={5} name="Payment" />
        <NavItem
          {...props}
          icon="/icon/user/3.svg"
          index={6}
          name="Account Setting"
        />
        <NavItem
          {...props}
          icon="/icon/user/1.svg"
          index={7}
          name="Classified Ads"
        />
        <NavItem {...props} icon="/icon/user/4.svg" index={8} name="Logout" />
      </ul>
    </nav>
  );
}
