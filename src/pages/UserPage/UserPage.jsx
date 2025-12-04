import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import ProfileContent from "../../layout/UserLayout/ProfileContent";
import UserHeaderBar from "../../layout/UserLayout/UserHeaderBar";
import UserSideNav from "../../layout/UserLayout/UserSideNav";
import "./UserPage.scss";

export default function UserPage() {
  const data = useLoaderData();
  const [tab, setTab] = useState({ index: 1, name: "Appointments" });
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    console.log(tab);
  }, [tab]);

  return (
    <div className="user-page">
      <div>
        <UserSideNav
          tab={tab}
          setTab={setTab}
          collapsed={collapsed}
          data={data.detail.data}
        />
        <div className="user-page-content">
          <UserHeaderBar collapsed={collapsed} setCollapsed={setCollapsed} />
          <ProfileContent tab={tab} json={data.appointments} />
        </div>
      </div>
    </div>
  );
}
