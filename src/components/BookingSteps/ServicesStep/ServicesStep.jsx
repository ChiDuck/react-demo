import { useEffect, useState } from "react";
import { getSalonAPI } from "../../../config/apiCalls";
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
        <strong>${srv.price}</strong>
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

function ServiceCategory(props) {
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
    <div className={open ? "active" : ""} key={props.item.id}>
      <div
        className="d-flex justify-content-between mx-3"
        style={{ cursor: "pointer" }}
        onClick={() => {
          hide ? setHide(false) : setOpen(false);
        }}
      >
        <strong style={{ fontSize: "20px" }}>{props.item.name}</strong>
        <img src="/icon/down.svg" alt="" />
      </div>

      <div className="srv-list" style={{ display: hide ? "none" : "flex" }}>
        {props.item.services.length > 0 ? (
          props.item.services?.map((srv) => (
            <ServiceItem key={srv.id} srv={srv} {...props} />
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

function SelectedItem({ item, quantity }) {
  return (
    <div className="selected-item">
      <strong>
        {item.name} x {quantity}
      </strong>
      <div>
        <strong>${item.price}</strong>
        <br />
        <span>{item.minutes} Min</span>
      </div>
    </div>
  );
}

export default function ServicesStep({ guest, setService, id }) {
  const [list, setList] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [total, setTotal] = useState(0);
  const fetchService = async () => {
    const res = await getSalonAPI({
      s: "GetSalonCategoryService",
      idsalon: id,
    });

    if (res.error !== "") {
      console.log(res.error);
      return;
    }
    setList(res.data);
  };

  useEffect(() => {
    fetchService();
  }, []);

  const addOrRmItem = (srv, delta = 1) => {
    setService((prev) => prev + delta);
    setTotal((prev) => prev + srv.price * delta);
    setQuantities((prev) => {
      const found = prev.find((i) => i.id === srv.id);

      if (!found && delta === 1) {
        return [...prev, { id: srv.id, quantity: 1 }];
      }

      return prev
        .map((item) =>
          item.id === srv.id
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0);
    });

    setSelectedList((prev) => {
      const exists = prev.some((i) => i.id === srv.id);

      if (delta === 1 && !exists) {
        return [...prev, srv];
      }

      if (delta === -1 && exists) {
        // remove if quantity will hit 0
        const q = quantities.find((i) => i.id === srv.id)?.quantity ?? 0;
        if (q <= 1) {
          return prev.filter((i) => i.id !== srv.id);
        }
      }

      return prev;
    });
  };

  useEffect(() => {
    console.log(selectedList);
    console.log(quantities);
  }, [selectedList]);

  return (
    <>
      <div className="text-center">
        <h2>Select Your Services</h2>
        <p>
          Let us know all the services you would like for your party of {guest}
        </p>
      </div>
      <div className="d-flex justify-content-between gap-5">
        <div className="service-categ-list">
          {list?.map((item) => (
            <ServiceCategory
              key={item.id}
              item={item}
              guest={guest}
              quantities={quantities}
              addOrRmItem={addOrRmItem}
            />
          ))}
        </div>
        <div className="selected-services">
          <strong>Service Pool Summary</strong>
          <div>
            {selectedList?.map((item) => {
              const q = quantities.find((i) => i.id === item.id);
              return (
                <SelectedItem key={item.id} item={item} quantity={q.quantity} />
              );
            })}
            <div className="est-total">
              <strong>Est. Total</strong>
              <strong>${total}</strong>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
