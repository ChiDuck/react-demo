import { bookableDay, isTechWithinSchedule } from "./dateFunction";
import "./DateStep.scss";

export default function DateCell({
  day,
  guest,
  techsRef,
  viewDate,
  fullSchedule,
  isDisabled,
  selectedDate,
  setSelectedDate,
}) {
  const schedule = fullSchedule.schedule;
  const tech = fullSchedule.technician;
  const disabled = isDisabled(day);
  const cellDate = new Date(
    Date.UTC(viewDate.getUTCFullYear(), viewDate.getUTCMonth(), day)
  );

  const isHoliday = schedule.find(
    (i) =>
      i.startdate <= formatDate(cellDate) &&
      i.enddate >= formatDate(cellDate) &&
      i.status === 0
  );

  const activeDay = schedule.find(
    (i) =>
      cellDate.getUTCDay() + 1 === i.weekdays && //(UTCDay: 0 = Sun, weekdays: 1 = Sun)
      i.status === 1 &&
      i.startdate === null &&
      i.enddate === null
  );

  const salonClosed = !activeDay;

  const notWorking = tech
    .filter(
      (t) =>
        (techsRef.length === 0 || techsRef.some((p) => p === t.id)) &&
        !t.schedule.some(
          (s) =>
            s.weekdays === cellDate.getUTCDay() + 1 &&
            isTechWithinSchedule(s, activeDay)
        )
    )
    .map((t) => t.nickname || t.techname);

  const isBookable = bookableDay(techsRef, tech, activeDay, guest);

  console.log(formatDate(cellDate) + " " + notWorking);

  const isSelected =
    selectedDate &&
    selectedDate.getUTCFullYear() === viewDate.getUTCFullYear() &&
    selectedDate.getUTCMonth() === viewDate.getUTCMonth() &&
    selectedDate.getUTCDate() === day;

  function handleSelect(day) {
    if (disabled || isHoliday || salonClosed || !isBookable) return;
    const d = new Date(
      Date.UTC(viewDate.getUTCFullYear(), viewDate.getUTCMonth(), day)
    );
    setSelectedDate(d);
    if (onSelect) onSelect(d);
  }

  function formatDate(date) {
    const y = date.getUTCFullYear();
    const m = String(date.getUTCMonth() + 1).padStart(2, "0");
    const d = String(date.getUTCDate()).padStart(2, "0");

    return `${y}-${m}-${d}T00:00:00`;
  }

  if (day === null) return <div />;

  return (
    <div
      className={[
        "date-cell",
        disabled || isHoliday || salonClosed || !isBookable ? "disabled" : "",
        isSelected ? "selected" : "",
      ].join(" ")}
      onClick={() => handleSelect(day)}
    >
      {day}
      {isHoliday && !disabled && (
        <div className="closed" style={{ background: "#808080" }}>
          Holiday Off
        </div>
      )}
      {salonClosed && !disabled && <div className="closed">Salon Closed</div>}

      {!isBookable && !disabled && !isHoliday && !salonClosed && (
        <div
          className="not-working"
          title={
            tech.length - notWorking.length < guest
              ? "Not enough technicians working"
              : notWorking.map((i) => `${i} is not working`).join("\n")
          }
        >
          <i className="fa-solid fa-user-slash"></i>
        </div>
      )}
    </div>
  );
}
