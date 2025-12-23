import { useEffect, useState } from "react";
import "../BookingSteps.scss";

function ServiceItem({ srv, guest, quantities, addOrRmItem }) {
  const quantity = quantities.find((i) => i.id === srv.id)?.quantity ?? 0;

  return (
    <div className="srv-item" key={srv.id}>
      <div>
        <strong>{srv.name}</strong>
        <br />
        <span>{srv.desc}</span>
      </div>
      <div>
        <strong>${srv.price.toFixed(2)}</strong>
        <br />
        <span>{srv.minutes} Min</span>
      </div>
      <div>
        <button disabled={quantity == 0} onClick={() => addOrRmItem(srv, -1)}>
          <i className="fa-solid fa-minus"></i>
        </button>
        <span>{quantity}</span>
        <button disabled={quantity == guest} onClick={() => addOrRmItem(srv)}>
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
  );
}

export default function ServiceCategory({
  item,
  guest,
  quantities,
  addOrRmItem,
}) {
  const [open, setOpen] = useState(false);
  const [hide, setHide] = useState(true);

  useEffect(() => {
    if (open) {
      setHide(false);
    } else {
      const t = setTimeout(() => setHide(true), 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!hide) setOpen(true);
  }, [hide]);

  return (
    <div className={open ? "active" : ""} key={item.id}>
      <div
        className="d-flex justify-content-between mx-3"
        style={{ cursor: "pointer" }}
        onClick={() => {
          hide ? setHide(false) : setOpen(false);
        }}
      >
        <strong style={{ fontSize: "20px" }}>{item.name}</strong>
        <img src="/icon/down.svg" alt="" />
      </div>

      <div className="srv-list" style={{ display: hide ? "none" : "flex" }}>
        {item.services.length > 0 ? (
          item.services?.map((srv) => (
            <ServiceItem
              key={srv.id}
              srv={srv}
              guest={guest}
              quantities={quantities}
              addOrRmItem={addOrRmItem}
            />
          ))
        ) : (
          <div className="text-center">
            This category doesn't have any service
          </div>
        )}
      </div>
    </div>
  );
}

export function SelectedItem({ item, quantity }) {
  return (
    <div className="selected-item">
      <strong>
        {item.name} x {quantity}
      </strong>
      <div>
        <strong>${item.price.toFixed(2)}</strong>
        <br />
        <span>{item.minutes} Min</span>
      </div>
    </div>
  );
}
