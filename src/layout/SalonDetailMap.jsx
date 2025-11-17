import Button from "../components/Button";
import style from "../styles/SalonDetailMap.module.scss";

export default function SalonDetailMap() {
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
          <img src="icon\Group 102.svg" alt="" />
          <span>7400 Hazard Ave Westminster, CA 92683</span>
        </div>
        <button>Directions</button>
      </div>
      <div className={style.info}>
        <div>
          <img src="icon\Group 103.svg" alt="" />
          <span>613-555-0184</span>
        </div>
        <button>Call</button>
      </div>
      <div className={style.open}>
        <div>
          <span>Open Now</span>
          <span> - Closes 10 PM</span>
        </div>
        <div>
          <img src="icon\down.svg" alt="" />
        </div>
      </div>
      <div>
        <a href="#">www.lathersalonaspen.com.au</a>
      </div>
      <div className={style.social}>
        <span>Social Media</span>
        <img src="social-icon\Group1.svg" alt="facebook" />
        <img src="social-icon\Group2.svg" alt="instagram" />
        <img src="social-icon\Group4.svg" alt="twitter" />
      </div>
      <div>
        <Button text="Book Now" />
      </div>
    </div>
  );
}
