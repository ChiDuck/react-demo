import { useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import css from "./AccountSetting.module.scss";
import ChangePassword from "./ChangePassword";
import MyProfile from "./MyProfile";

export default function AccountSettingSection() {
  const data = useRouteLoaderData("parent");
  const [tab, setTab] = useState(1);

  return (
    <>
      <div className={css.navbar}>
        <div className={tab == 1 ? css.active : ""} onClick={() => setTab(1)}>
          My Profile
        </div>
        <div className={tab == 2 ? css.active : ""} onClick={() => setTab(2)}>
          Change Password
        </div>
        <div className={tab == 3 ? css.active : ""} onClick={() => setTab(3)}>
          Two-Factor Authentication
        </div>
      </div>
      <div className={css.settingContainer}>
        {tab == 1 && <MyProfile data={data} />}
        {tab == 2 && <ChangePassword data={data} />}
      </div>
    </>
  );
}
