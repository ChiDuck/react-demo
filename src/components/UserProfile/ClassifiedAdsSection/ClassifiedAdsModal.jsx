import { useState } from "react";
import css from "./ClassifiedAds.module.scss";

export default function ClassifiedAdsModal({ open, setOpen }) {
  const [type, setType] = useState(0);
  const [errors, setErrors] = useState({
    mailErr: "",
    emptyErr: "",
    formatErr: "",
    dupErr: "",
    maxErr: "",
    zipErr: "",
  });

  return (
    <div className={open ? `${css.overlay} ${css.active}` : css.overlay}>
      <div className={css.modal}>
        <div>
          <button
            style={{ all: "unset", cursor: "pointer" }}
            onClick={() => setOpen(false)}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className={css.switch}>
          <div className={type === 1 ? css.buysell : ""}>
            <div></div>
            <div>
              <div onClick={() => setType(0)}>
                <strong className={type === 0 && css.white}>
                  Salon Jobs Listing
                </strong>
              </div>
              <div onClick={() => setType(1)}>
                <strong className={type === 1 && css.white}>
                  Salon - Buy & Sell
                </strong>
              </div>
            </div>
          </div>
        </div>
        <button type="button" className={css.upload}>
          <img src="/icon/upload.svg" alt="" />
          <span>Upload photo for listing</span>
        </button>
        <div className={css.row}>
          <div>
            <span>
              Contract Name <span>*</span>
            </span>
            <input type="text" />
          </div>
          <div>
            <span>
              Contract Number <span>*</span>
            </span>
            <input type="text" />
          </div>
        </div>
        <div className={css.row}>
          <div>
            <span>Email Address</span>
            <input type="text" />
          </div>
          <div>
            <span>
              Street <span>*</span>
            </span>
            <input type="text" />
          </div>
        </div>
        <div className={css.row}>
          <div>
            <span>Unit, Suite</span>
            <input type="text" />
          </div>
          <div>
            <span>
              Zip Code <span>*</span>
            </span>
            <input type="number" />
          </div>
        </div>
        <div className={css.row}>
          <div>
            <span>State</span>
            <input type="text" disabled />
          </div>
          <div>
            <span>City</span>
            <input type="text" disabled />
          </div>
        </div>
        <div className={css.row}>
          <div>
            <span>
              Title <span>*</span>
            </span>
            <input type="text" />
            <div>
              <span>Limit: 30 characters</span>
            </div>
          </div>
        </div>
        <div className={css.row}>
          <div>
            <span>Description</span>
            <textarea name="" id=""></textarea>
            <div>
              <span>Limit: 250 characters</span>
            </div>
          </div>
        </div>
        <div className={css.row}>
          <button>Upload Ad</button>
        </div>
      </div>
    </div>
  );
}
