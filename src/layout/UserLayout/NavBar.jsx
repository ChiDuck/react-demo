import { NavLink } from "react-router-dom";
import { userProfileIcons } from "../../assets/icons/icons";
import { userNavItems } from "../../components/IconSVG/navItems";
import css from "../UserLayout/NavBar.module.scss";

export default function NavBar(props) {
  return (
    <ul className={css.navlist}>
      {userNavItems.map((item) => {
        const Icon = userProfileIcons[item.icon];
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? `${css.navItem} ${css.active}` : css.navItem
            }
          >
            <li>
              {Icon && <Icon />}
              <strong>{item.label}</strong>
            </li>
          </NavLink>
        );
      })}
    </ul>
  );
}
