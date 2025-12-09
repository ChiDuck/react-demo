import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import css from "./Favorite.module.scss";

export default function FavoriteSection() {
  const data = useLoaderData();
  const sln = data.salons.data;
  const srv = data.services.data;
  const [salons, setSalons] = useState(sln);
  const [service, setServices] = useState(srv);
  return (
    <div className={css.favorite}>
      <div>
        <h3>Salons</h3>
        <h3>Technicians</h3>
        <h3>Services</h3>
      </div>
      <div>
        <div>
          <h3>Salons</h3>
          <span>0 Saved Salons</span>
        </div>
        <div></div>
      </div>
      <div>
        <div>
          <h3>Technicians</h3>
          <span>0 Saved Technicians</span>
        </div>
        <div></div>
      </div>
      <div>
        <div>
          <h3>Services</h3>
          <span>0 Saved Services</span>
        </div>
        <div></div>
      </div>
      <div>
        <strong>See More</strong>
      </div>
    </div>
  );
}
