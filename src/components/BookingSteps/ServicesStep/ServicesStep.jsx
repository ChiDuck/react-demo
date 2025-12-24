import { useEffect, useState } from "react";
import { getSalonAPI } from "../../../config/apiCalls";
import "../BookingSteps.scss";
import ServiceCategory, { SelectedItem } from "./ServiceCategory";

export default function ServicesStep({ state, dispatch, id }) {
  const [srvData, setSrvData] = useState({});

  const fetchService = async () => {
    const res = await getSalonAPI({
      s: "GetSalonCategoryService",
      idsalon: id,
    });

    if (res.error !== "") {
      console.log(res.error);
      return;
    }
    setSrvData(res);
  };

  useEffect(() => {
    fetchService();
  }, []);

  const addOrRmItem = (srv, delta = 1) => {
    const exists = state.selectedService.some((i) => i.id === srv.id);
    let updated;

    if (exists) {
      updated = state.selectedService
        .map((item) =>
          item.id === srv.id
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0);
    } else if (delta === 1) {
      updated = [...state.selectedService, { ...srv, quantity: 1 }];
    } else {
      updated = state.selectedService;
    }

    dispatch({
      type: "SET_SERVICES",
      payload: {
        srv: updated,
        tax: !!srvData.isservicetaxed ? srvData.tax : 0,
      },
    });
  };

  return (
    <>
      <div className="text-center">
        <h2>Select Your Services</h2>
        <p>
          Let us know all the services you would like for your party of{" "}
          {state.guests}
        </p>
      </div>
      <div className="d-flex justify-content-between gap-5">
        <div className="service-categ-list">
          {srvData.data?.map((item) => (
            <ServiceCategory
              key={item.id}
              item={item}
              guest={state.guests}
              quantities={state.selectedService}
              addOrRmItem={addOrRmItem}
            />
          ))}
        </div>
        <div className="selected-services">
          <strong>Service Pool Summary</strong>
          <div>
            {state.selectedService?.map((item) => (
              <SelectedItem
                key={item.id}
                item={item}
                quantity={item.quantity}
              />
            ))}
            <div className="est-total">
              <strong>Est. Total</strong>
              <strong>
                $
                {state.selectedService
                  ?.reduce((a, item) => a + item.price * item.quantity, 0)
                  .toFixed(2)}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
