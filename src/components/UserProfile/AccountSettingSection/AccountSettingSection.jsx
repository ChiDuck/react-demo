import css from "./AccountSetting.module.scss";
export default function AccountSettingSection() {
  return (
    <>
      <div className={css.navbar}>
        <div>My Profile</div>
        <div>Change Password</div>
        <div>Two-Factor Authentication</div>
      </div>
      <div className={css.settingContainer}>
        <div>
          <img src="" alt="" />
        </div>
        <div className={css.info}>
          <span>First Name</span>
          <input type="text" />
          <span>Last Name</span>
          <input type="text" />
          <span>Email Address</span>
          <input type="text" readOnly />
          <span>Phone Number</span>
          <input type="text" readOnly />
          <span>Appointment Reminder</span>
          <div>
            <button>-</button>
            <span>1</span>
            <button>+</button>
            <span>Hour</span>
          </div>
        </div>
        <div className={css.checkbox}>
          <div>
            <input type="checkbox" />
            <span>Booking Confirmation</span>
          </div>
          <div>
            <input type="checkbox" />
            <span>Booking Canceled</span>
          </div>
          <div>
            <input type="checkbox" />
            <span>Checked In</span>
          </div>
          <div>
            <input type="checkbox" />
            <span>Review Hidden</span>
          </div>
          <div>
            <input type="checkbox" />
            <span>Upcoming Appointment</span>
          </div>
          <div>
            <input type="checkbox" />
            <span>Booking Rejected</span>
          </div>
        </div>
      </div>
    </>
  );
}
