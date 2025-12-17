import { useState } from "react";
import { Outlet, useLoaderData, useLocation } from "react-router-dom";
import { userNavItems } from "../../components/IconSVG/navItems";
import UserHeaderBar from "../../layout/UserLayout/UserHeaderBar";
import UserSideNav from "../../layout/UserLayout/UserSideNav";
import "./UserPage.scss";

export default function UserPage() {
  const data = useLoaderData();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const curLbl = userNavItems.find((item) =>
    location.pathname.startsWith(item.path)
  );
  return (
    <div className="user-page">
      <div>
        <UserSideNav collapsed={collapsed} data={data.data} />
        <div className="user-page-content">
          <UserHeaderBar collapsed={collapsed} setCollapsed={setCollapsed} />
          <h3 style={{ margin: "20px 0", fontSize: 22 }}>
            {curLbl?.label || ""}
          </h3>
          <div style={{ overflow: "auto" }}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
