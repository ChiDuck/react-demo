import { useEffect, useState } from "react";
import { postSalonAPI } from "../../../config/apiCalls";
import "../BookingSteps.scss";

const imgUrl = import.meta.env.VITE_API_IMG_URL;
const dfUserUrl = import.meta.env.VITE_API_DF_USER_URL;

export default function PreferencesStep({ state, dispatch, id, techsRef }) {
  const [open, setOpen] = useState(false);
  const [hide, setHide] = useState(true);
  const [techs, setTechs] = useState([]);

  const fetchTech = async () => {
    const res = await postSalonAPI({
      c: "GetSalonTechnicianByService",
      isPublic: true,
      body: JSON.stringify({
        salonid: id,
        services: JSON.stringify(state.selectedService.map((i) => i.id)),
      }),
    });

    if (res.error !== "") {
      console.log(res.error);
      return;
    }
    setTechs(res.data);
  };

  useEffect(() => {
    fetchTech();
  }, []);

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
    <>
      <div className="text-center">
        <h3>Technician Preferences</h3>
        <p>
          Let us know who you'd like. If you don't have a preference, we will
          assign you to anyone first available
        </p>
      </div>
      <div className="technician-select">
        <label>Preferred Technicians for {state.guests} Guests</label>
        <div>
          <div
            className="tech-input"
            onClick={() => {
              hide ? setHide(false) : setOpen(false);
            }}
          >
            {state.selectedTechnician?.map((item) => (
              <div key={item.id}>
                <strong>{item.nickname || item.firstname}</strong>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const updated = state.selectedTechnician.filter(
                      (i) => i.id !== item.id
                    );
                    dispatch({
                      type: "SET_PREFERENCES",
                      payload: updated,
                    });
                  }}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            ))}
          </div>
          <div className={`tech-list ${open ? "active" : ""}`}>
            {techs?.map((item) => {
              const selected =
                state.selectedTechnician.find((i) => i.id === item.id) ||
                state.selectedTechnician.length === state.guests;
              return (
                <div
                  className={selected ? "selected" : ""}
                  key={item.id}
                  onClick={() => {
                    !selected &&
                      dispatch({
                        type: "SET_PREFERENCES",
                        payload: [...state.selectedTechnician, item],
                      });
                  }}
                >
                  <div>
                    <img
                      src={
                        item.avatar !== ""
                          ? `${imgUrl}/${item.avatar}`
                          : dfUserUrl
                      }
                      alt=""
                    />
                  </div>
                  <strong>{item.nickname || item.firstname}</strong>
                </div>
              );
            })}
          </div>
        </div>
        <span>
          You can select up to {state.guests} preference(s).{" "}
          {state.selectedTechnician.length} selected.
        </span>
      </div>
    </>
  );
}
