import { useEffect, useState } from "react";
import { getSalonAPI } from "../../../config/apiCalls";
import "../BookingSteps.scss";
export default function ServicesStep({ guest, service, setService, id }) {
  const [list, setList] = useState([]);
  const [selectedList, setSelectedList] = useState([]);

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
          {list?.map((item, i) => (
            <div key={item.id || i}>
              <div className="d-flex justify-content-between">
                <strong>{item.name}</strong>
                <img src="/icon/down.svg" alt="" />
              </div>
              <div className="srv-list">
                {item.services?.map((srv, j) => (
                  <div className="srv-item" key={srv.id || i}>
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
                      <button>
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <span>0</span>
                      <button>
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="selected-services">
          <strong>Service Pool Summary</strong>
          <div>
            <strong>Est.Total</strong>
            <strong>$0.00</strong>
          </div>
        </div>
      </div>
    </>
  );
}
