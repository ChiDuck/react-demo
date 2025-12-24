import {
  bookableDay,
  formatDateUTC,
  isTechWithinSchedule,
} from "./dateFunction";
import "./DateStep.scss";

export default function DateCell({
  state,
  dispatch,
  day,
  selectedTech,
  viewDate,
  fullSchedule,
  isDisabled,
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

  const daySchedules = schedule.filter(
    (s) =>
      s.status === 1 &&
      s.weekdays === cellDate.getUTCDay() + 1 &&
      s.startdate === null &&
      s.enddate === null
  );

  const salonClosed = !daySchedules;

  const notWorking = tech
    .filter(
      (t) =>
        (selectedTech.length === 0 || selectedTech.some((p) => p === t.id)) &&
        !t.schedule.some(
          (s) =>
            s.weekdays === cellDate.getUTCDay() + 1 &&
            daySchedules.some(
              (shift) =>
                s.weekdays === shift.weekdays && isTechWithinSchedule(s, shift)
            )
        )
    )
    .map((t) => t.nickname || t.techname);

  const isBookable = bookableDay(
    selectedTech,
    tech,
    daySchedules,
    state.guests
  );

  const isSelected =
    state.selectedDate &&
    state.selectedDate.getUTCFullYear() === viewDate.getUTCFullYear() &&
    state.selectedDate.getUTCMonth() === viewDate.getUTCMonth() &&
    state.selectedDate.getUTCDate() === day;

  function handleSelect(day) {
    if (disabled || isHoliday || salonClosed || !isBookable) return;
    const d = new Date(
      Date.UTC(viewDate.getUTCFullYear(), viewDate.getUTCMonth(), day)
    );
    dispatch({
      type: "SET_DATE",
      payload: { date: d, formatted: formatDateUTC(d) },
    });
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
            tech.length - notWorking.length < state.guests
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
