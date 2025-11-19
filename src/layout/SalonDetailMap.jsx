import Button from "../components/Button";
import { getOpenStatus } from "../components/SalonDetailTitle/openStatus";
import style from "../styles/SalonDetailMap.module.scss";

function formattedPhone(num) {
  if (!num) return "";
  return num.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
}

export default function SalonDetailMap({ detail }) {
  const status = getOpenStatus(detail.schedule, detail.timezone);
  return (
    <div className={style.map}>
      <h3>Location & Hours</h3>
      <div className={style.embedMapResponsive}>
        <div className={style.embedMapContainer}>
          <iframe
            className={style.embedMapFrame}
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src="https://maps.google.com/maps?width=600&height=400&hl=en&q=John%20Brooks%20Supermarket&t=&z=14&ie=UTF8&iwloc=B&output=embed"
          ></iframe>
          <a
            href="https://sprunkiretake.net"
            style={{
              fontSize: "2px!important",
              color: "gray!important",
              position: "absolute",
              bottom: 0,
              left: 0,
              zIndex: 1,
              maxHeight: "1px",
              overflow: "hidden",
            }}
          >
            sprunki retake
          </a>
        </div>
      </div>
      <div className={style.info}>
        <div>
          <img src="/icon/Group 102.svg" alt="" />
          <span>
            {detail.street} {detail.city}, {detail.state} {detail.zip}
          </span>
        </div>
        <button>Directions</button>
      </div>
      <div className={style.info}>
        <div>
          <img src="/icon/Group 103.svg" alt="" />
          <span>
            {detail.countryphone} {formattedPhone(detail.phone)}
          </span>
        </div>
        <button>Call</button>
      </div>
      <div className={style.open}>
        <div>
          <span>{status.text1}</span>
          <span>{status.text2}</span>
        </div>
        <div>
          <img src="/icon/down.svg" alt="" />
        </div>
      </div>
      <div>
        <a href="#">{detail.website}</a>
      </div>
      <div className={style.social}>
        <span>Social Media</span>
        {Object.entries(detail.social).map(([platform, url]) => (
          <a key={platform} href={url}>
            <img src={`/social-icon/${platform}.svg`} alt={platform} />
          </a>
        ))}
      </div>
      <div>
        <Button text="Book Now" />
      </div>
    </div>
  );
}
