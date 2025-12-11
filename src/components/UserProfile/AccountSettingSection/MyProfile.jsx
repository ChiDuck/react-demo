import { useRef, useState } from "react";
import { postSalonAPI } from "../../../config/apiCalls";
import css from "./AccountSetting.module.scss";

const imgUrl = import.meta.env.VITE_API_IMG_URL;

export default function MyProfile({ data }) {
  const [detail, setDetail] = useState(data.data[0]);
  const img = JSON.parse(detail.content);
  const [curImg, setCurImg] = useState(`${imgUrl}/${img.avatar}`);
  const fileInputRef = useRef(null);
  const [updated, setUpdated] = useState(false);

  const updateHandler = async () => {
    const payload = new FormData();
    [
      "firstname",
      "lastname",
      "timereminder",
      "isnotibookingconfirm",
      "isnotibookingcanceled",
      "isnoticheckedin",
      "isnotireviewhidden",
      "isnotiupcomingappointment",
      "isnotibookingrejected",
    ].forEach((key) => {
      payload.append(key, detail[key]);
    });
    // payload.append("phone", detail.phonenumber);

    const res = await postSalonAPI({
      c: "updateprofile",
      user: true,
      body: payload,
    });

    if (res.error !== "") {
      console.log(res.error);
      return;
    }

    setUpdated(true);
  };

  // Use for update img, not yet implemented
  // useEffect(() => {}, [curImg]);

  return (
    <>
      <div className={updated ? `${css.overlay} ${css.active}` : css.overlay}>
        <div className={css.modal}>
          <div onClick={() => setUpdated(false)}>x</div>
          <h3>Update Succeed</h3>
          <p>All I want for Christmas is you.</p>
        </div>
      </div>
      <div className={css.profile}>
        <div>
          <div
            className={css.avatar}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                setCurImg(URL.createObjectURL(e.target.files[0]));
              }}
              style={{ display: "none" }}
            />
            <img src={curImg} alt="" />
            <div>
              <svg
                width="21"
                height="18"
                viewBox="0 0 21 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.04834 1.55859C3.69678 1.55859 3.42334 1.28516 3.42334 0.933594C3.42334 0.621094 3.69678 0.308594 4.04834 0.308594H6.54834C6.86084 0.308594 7.17334 0.621094 7.17334 0.933594C7.17334 1.28516 6.86084 1.55859 6.54834 1.55859H4.04834ZM18.4233 0.308594C19.7905 0.308594 20.9233 1.44141 20.9233 2.80859V15.3086C20.9233 16.7148 19.7905 17.8086 18.4233 17.8086H3.42334C2.01709 17.8086 0.92334 16.7148 0.92334 15.3086V4.68359C0.92334 3.31641 2.01709 2.18359 3.42334 2.18359H8.42334L11.6265 0.582031C11.978 0.425781 12.3687 0.308594 12.7593 0.308594H18.4233ZM19.6733 15.3086V10.3086H15.9233C15.9233 13.082 13.6577 15.3086 10.9233 15.3086C8.1499 15.3086 5.92334 13.082 5.92334 10.3086H2.17334V15.3086C2.17334 16.0117 2.72021 16.5586 3.42334 16.5586H18.4233C19.0874 16.5586 19.6733 16.0117 19.6733 15.3086ZM7.17334 10.3086C7.17334 12.3789 8.85303 14.0586 10.9233 14.0586C12.9546 14.0586 14.6733 12.3789 14.6733 10.3086C14.6733 8.27734 12.9546 6.55859 10.9233 6.55859C8.85303 6.55859 7.17334 8.27734 7.17334 10.3086ZM19.6733 9.05859V2.80859C19.6733 2.14453 19.0874 1.55859 18.4233 1.55859H12.7593C12.564 1.55859 12.3687 1.63672 12.1733 1.71484L9.24365 3.19922C8.89209 3.35547 8.50146 3.43359 8.11084 3.43359H3.42334C2.72021 3.43359 2.17334 4.01953 2.17334 4.68359V9.05859H6.07959C6.62646 6.91016 8.57959 5.30859 10.9233 5.30859C13.228 5.30859 15.1812 6.91016 15.728 9.05859H19.6733Z"
                  fill="#D3427A"
                ></path>
              </svg>
            </div>
          </div>
          <div className={css.info}>
            <span>First Name</span>
            <input
              type="text"
              value={detail.firstname}
              onChange={(e) =>
                setDetail({ ...detail, firstname: e.target.value })
              }
            />
            <span>Last Name</span>
            <input
              type="text"
              value={detail.lastname}
              onChange={(e) =>
                setDetail({ ...detail, lastname: e.target.value })
              }
            />
            <span>Email Address</span>
            <input type="text" value={detail.email} readOnly />
            <span>Phone Number</span>
            <input type="text" value={detail.phonenumber} readOnly />
            <span>Appointment Reminder</span>
            <div>
              <button
                onClick={() =>
                  setDetail({
                    ...detail,
                    timereminder: Math.max(1, detail.timereminder - 1),
                  })
                }
              >
                -
              </button>
              <span>{detail.timereminder}</span>
              <button
                onClick={() =>
                  setDetail({
                    ...detail,
                    timereminder: Math.max(1, detail.timereminder + 1),
                  })
                }
              >
                +
              </button>
              <span> Hour{detail.timereminder > 1 ? "s" : ""}</span>
            </div>
          </div>
          <div className={css.checkbox}>
            <div>
              <input
                type="checkbox"
                checked={detail.isnotibookingconfirm === 1}
                onChange={(e) =>
                  setDetail({
                    ...detail,
                    isnotibookingconfirm: e.target.checked ? 1 : 0,
                  })
                }
              />
              <span>Booking Confirmation</span>
            </div>
            <div>
              <input
                type="checkbox"
                checked={detail.isnotibookingcanceled === 1}
                onChange={(e) =>
                  setDetail({
                    ...detail,
                    isnotibookingcanceled: e.target.checked ? 1 : 0,
                  })
                }
              />
              <span>Booking Canceled</span>
            </div>
            <div>
              <input
                type="checkbox"
                checked={detail.isnoticheckedin === 1}
                onChange={(e) =>
                  setDetail({
                    ...detail,
                    isnoticheckedin: e.target.checked ? 1 : 0,
                  })
                }
              />
              <span>Checked In</span>
            </div>
            <div>
              <input
                type="checkbox"
                checked={detail.isnotireviewhidden === 1}
                onChange={(e) =>
                  setDetail({
                    ...detail,
                    isnotireviewhidden: e.target.checked ? 1 : 0,
                  })
                }
              />
              <span>Review Hidden</span>
            </div>
            <div>
              <input
                type="checkbox"
                checked={detail.isnotiupcomingappointment === 1}
                onChange={(e) =>
                  setDetail({
                    ...detail,
                    isnotiupcomingappointment: e.target.checked ? 1 : 0,
                  })
                }
              />
              <span>Upcoming Appointment</span>
            </div>
            <div>
              <input
                type="checkbox"
                checked={detail.isnotibookingrejected === 1}
                onChange={(e) =>
                  setDetail({
                    ...detail,
                    isnotibookingrejected: e.target.checked ? 1 : 0,
                  })
                }
              />
              <span>Booking Rejected</span>
            </div>
          </div>
        </div>
        <div>
          <button onClick={updateHandler}>Update Profile</button>
        </div>
      </div>
    </>
  );
}
