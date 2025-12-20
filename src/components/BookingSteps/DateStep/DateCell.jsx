import "./DateStep.scss";

export default function DateCell({
  idx,
  day,
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

  const salonClosed = schedule.find(
    (i) =>
      cellDate.getUTCDay() + 1 === i.weekdays &&
      i.status === 0 &&
      i.startdate === null &&
      i.enddate === null
  );

  const notWorking = tech
    .filter((t) => !t.schedule.some((s) => s.weekdays === cellDate.getUTCDay()))
    .map((t) => t.nickname || t.techname);
  const isSelected =
    selectedDate &&
    selectedDate.getUTCFullYear() === viewDate.getUTCFullYear() &&
    selectedDate.getUTCMonth() === viewDate.getUTCMonth() &&
    selectedDate.getUTCDate() === day;

  function handleSelect(day) {
    if (disabled || isHoliday || salonClosed || notWorking.length === 0) return;
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

  if (day === null) return <div key={"empty-" + idx} className="empty" />;

  return (
    <div
      key={day}
      className={[
        "date-cell",
        disabled || isHoliday || salonClosed || notWorking.length === 0
          ? "disabled"
          : "",
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

      {notWorking.length === 0 && !disabled && (
        <div className="not-working">
          <i className="fa-solid fa-user-slash"></i>
        </div>
      )}
    </div>
  );
}
