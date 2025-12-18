import { useEffect, useState } from "react";
import "../BookingSteps.scss";
export default function PreferencesStep({ guest }) {
  const [open, setOpen] = useState(false);
  const [hide, setHide] = useState(true);

  const fetchTech = async () => {
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
        <label>Preferred Technicians for {guest} Guests</label>
        <div
          onClick={() => {
            hide ? setHide(false) : setOpen(false);
          }}
        >
          <div className="tech-input"></div>
          <div className={`tech-list ${open ? "active" : ""}`}></div>
        </div>
        <span>You can select up to {guest} preference(s). 0 selected.</span>
      </div>
    </>
  );
}
