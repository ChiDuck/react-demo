import { useState } from "react";
import ProfileContent from "../../layout/UserLayout/ProfileContent";
import UserHeaderBar from "../../layout/UserLayout/UserHeaderBar";
import UserSideNav from "../../layout/UserLayout/UserSideNav";
import "./UserPage.scss";

export default function UserPage() {
  const [tab, setTab] = useState("Appointments");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="user-page">
      <div>
        <UserSideNav tab={tab} setTab={setTab} collapsed={collapsed} />
        <div className="user-page-content">
          <UserHeaderBar collapsed={collapsed} setCollapsed={setCollapsed} />
          <ProfileContent tab={tab} />
        </div>
      </div>
    </div>
  );
}
