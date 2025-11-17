import Button from "../components/Button";
import style from "../styles/SalonDetail.module.scss";

export default function SalonDetailMap() {
  return (
    <div className={style.map}>
      <h2>Location & Hours</h2>
      <img className={style.mapImage} src="pictures\Mask group.png" alt="" />
      <div className={style.info}>
        <img src="icon\Group 102.svg" alt="" />
        <span>7400 Hazard Ave Westminster, CA 92683</span>
        <button>Directions</button>
      </div>
      <div className={style.info}>
        <img src="icon\Group 103.svg" alt="" />
        <span>613-555-0184</span>
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
      <div>
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
