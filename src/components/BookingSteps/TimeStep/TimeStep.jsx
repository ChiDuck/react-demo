import { useEffect, useState } from "react";
import { postSalonAPI } from "../../../config/apiCalls";
import "../BookingSteps.scss";
import {
  formatDateUTC,
  minutesToTime,
  randomInt,
  timeToMinutes,
} from "../DateStep/dateFunction";
import { buildSlotsWithAvailability } from "./timeFunction";

function generateTimeSlots({
  dateStr,
  schedule,
  timeblock,
  lasttimebeforeclose,
}) {
  const date = new Date(dateStr.replaceAll("/", "-") + "T00:00:00Z");
  const weekday = date.getUTCDay() + 1;

  const activeSchedule = schedule.find(
    (s) => s.status === 1 && s.weekdays === weekday
  );

  if (!activeSchedule) return [];

  let start = timeToMinutes(activeSchedule.starttime);
  const end = timeToMinutes(activeSchedule.endtime) - lasttimebeforeclose;

  const slots = [];
  while (start <= end) {
    slots.push(minutesToTime(start));
    start += timeblock;
  }

  return slots;
}

export default function TimeStep({
  dateRef,
  id,
  srvsRef,
  techsRef,
  sessionKey,
  guest,
  setNext,
}) {
  const [selectedTime, setSelectedTime] = useState(null);
  const [fullSchedule, setFullSchedule] = useState({
    technician: [],
    schedule: [],
  });

  const pickedDate = formatDateUTC(dateRef.current);

  const fetchTime = async () => {
    const payload = {
      salonid: id,
      hasanyone: 1,
      services: JSON.stringify(srvsRef.current),
      technicians: JSON.stringify(techsRef.current),
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
  };

  useEffect(() => {
    fetchTime();
  }, []);

  const slots = generateTimeSlots({
    dateStr: pickedDate,
    schedule: fullSchedule.schedule,
    timeblock: fullSchedule.timeblock,
    lasttimebeforeclose: fullSchedule.lasttimebeforeclose,
  });
  console.log(techsRef);
  const validSlots = buildSlotsWithAvailability({
    slots,
    dateStr: pickedDate,
    preferredTechs: fullSchedule.technician.filter((t) =>
      techsRef.current.some((i) => i === t.id)
    ),
    allTechs: fullSchedule.technician,
    guestCount: guest,
    timeblock: fullSchedule.timeblock,
  });

  return (
    <>
      <div className="text-center">
        <h3>Choose Your Start Time</h3>
        <p>Available times for your group on.</p>
        <span>Thursday, December 25.</span>
      </div>
      <div className="time-grid">
        {validSlots.map((slot) => (
          <div
            key={slot.time}
            className={[
              slot.disabled ? "disabled" : "",
              selectedTime === slot.time ? "selected" : "",
            ].join(" ")}
            onClick={() => !slot.disabled && setSelectedTime(slot.time)}
          >
            {slot.time}
          </div>
        ))}
      </div>
    </>
  );
}
