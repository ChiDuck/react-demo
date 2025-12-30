import { useMemo } from "react";
import {
  bookableDay,
  formatDate,
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
  handleSelectDate,
  timezone,
}) {
  const schedule = fullSchedule.schedule;
  const allTech = fullSchedule.technician;
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

  const salonClosed = daySchedules.length === 0;

  const notWorking = useMemo(() => {
    return allTech
      .filter(
        (t) =>
          (selectedTech.length === 0 || selectedTech.includes(t.id)) &&
          !t.schedule.some((s) =>
            daySchedules.some(
              (shift) =>
                s.weekdays === shift.weekdays &&
                isTechWithinSchedule(
                  s,
                  shift,
                  formatDateUTC(cellDate),
                  timezone
                )
            )
          )
      )
      .map((t) => t.nickname || t.techname);
  }, [allTech, selectedTech, daySchedules, cellDate, timezone]);

  const isBookable = useMemo(() => {
    return bookableDay(
      selectedTech,
      allTech,
      daySchedules,
      state.guests,
      formatDateUTC(cellDate),
      timezone
    );
  }, [selectedTech, allTech, daySchedules, state.guests, cellDate, timezone]);

  const isSelected = useMemo(() => {
    if (!state.selectedDate?.currentdate) return false;

    const d = new Date(state.selectedDate.currentdate);

    return (
      d.getUTCFullYear() === viewDate.getUTCFullYear() &&
      d.getUTCMonth() === viewDate.getUTCMonth() &&
      d.getUTCDate() === day
    );
  }, [state.selectedDate, viewDate, day]);

  if (day === null) return <div />;
  return (
    <div
      className={[
        "date-cell",
        disabled || isHoliday || salonClosed || !isBookable ? "disabled" : "",
        isSelected ? "selected" : "",
      ].join(" ")}
      onClick={() => {
        if (disabled || isHoliday || salonClosed || !isBookable) return;
        handleSelectDate({
          weekdays: cellDate.getUTCDay(),
          currentdate: cellDate,
          quantity: allTech.length - notWorking.length,
        });
      }}
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
            allTech.length - notWorking.length < state.guests
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
