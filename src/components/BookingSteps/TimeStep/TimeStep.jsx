import { useEffect, useState } from "react";
import { postSalonAPI } from "../../../config/apiCalls";
import "../BookingSteps.scss";
import {
  minutesToTime,
  randomInt,
  timeToMinutes,
} from "../DateStep/dateFunction";

export function generateTimeSlots({
  weekdays,
  schedule,
  timeblock,
  lasttimebeforeclose,
}) {
  const daySchedules = schedule.filter(
    (s) =>
      s.status === 1 &&
      s.weekdays === weekdays &&
      s.startdate === null &&
      s.enddate === null
  );
  if (!daySchedules.length) return [];

  const slots = [];

  daySchedules.forEach((span) => {
    let start = timeToMinutes(span.starttime);
    const end = timeToMinutes(span.endtime) - lasttimebeforeclose;

    while (start <= end) {
      slots.push(minutesToTime(start));
      start += timeblock;
    }
  });

  // remove duplicates + sort
  return [...new Set(slots)].sort(
    (a, b) => timeToMinutes(a) - timeToMinutes(b)
  );
}

export default function TimeStep({ state, dispatch, id, sessionKey }) {
  const [fullSchedule, setFullSchedule] = useState({
    technician: [],
    data: [],
    schedule: [],
  });
  const selectedTechId = state.selectedTechnician.map((i) => i.id);
  const pickedDate = state.formatselecteddate;

  const fetchTime = async () => {
    const payload = {
      salonid: id,
      hasanyone: 1,
      services: JSON.stringify(state.selectedService.map((i) => i.id)),
      technicians: JSON.stringify(selectedTechId),
      fromtime: pickedDate,
      totime: pickedDate,
      random: randomInt(100, 2000),
      key: sessionKey,
    };

    const res = await postSalonAPI({
      c: "GetSalonCalendarByTime",
      isPublic: true,
      body: JSON.stringify(payload),
    });

    if (res.error !== "") {
      console.log(res.error);
      return;
    }
    setFullSchedule(res.data);
    console.log(res.data.data);
  };

  useEffect(() => {
    fetchTime();
  }, []);

  useEffect(() => {
    console.log(state);
  }, [state.selectedTime]);

  const formatted = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date(state.selectedDate.currentdate));

  return (
    <>
      <div className="text-center">
        <h3>Choose Your Start Time</h3>
        <p>Available times for your group on.</p>
        <span>{formatted}.</span>
      </div>
      <div className="time-grid">
        {state.selectedDate.times.allTime.map((slot) => (
          <div
            key={slot.time}
            className={[
              slot.active ? "" : "disabled",
              state.selectedTime === slot.time ? "selected" : "",
            ].join(" ")}
            onClick={() =>
              slot.active &&
              dispatch({
                type: "SET_TIME",
                payload: slot.time,
              })
            }
          >
            {slot.time}
          </div>
        ))}
      </div>
    </>
  );
}
