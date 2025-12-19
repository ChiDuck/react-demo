import { useMemo, useState } from "react";
import "../BookingSteps.scss";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDateInTimezone(date, timezone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const year = Number(parts.find((p) => p.type === "year").value);
  const month = Number(parts.find((p) => p.type === "month").value);
  const day = Number(parts.find((p) => p.type === "day").value);

  return new Date(Date.UTC(year, month - 1, day));
}

function addMonths(date, months) {
  const d = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + months, 1)
  );
  return d;
}

function formatDateUTC(date) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}/${m}/${d}`;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function DateStep({ onSelect, timezone, srvsRef, techsRef }) {
  const today = useMemo(
    () => getDateInTimezone(new Date(), timezone),
    [timezone]
  );

  const minMonth = useMemo(
    () => new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1)),
    [today]
  );
  const maxMonth = useMemo(() => addMonths(minMonth, 6), [minMonth]);

  const [viewDate, setViewDate] = useState(minMonth);
  const [selectedDate, setSelectedDate] = useState(null);

  const monthLabel = useMemo(() => {
    return viewDate.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
  }, [viewDate]);

  const firstWeekday = useMemo(
    () =>
      new Date(
        Date.UTC(viewDate.getUTCFullYear(), viewDate.getUTCMonth(), 1)
      ).getUTCDay(),
    [viewDate]
  );
  const daysInMonth = useMemo(
    () =>
      new Date(
        Date.UTC(viewDate.getUTCFullYear(), viewDate.getUTCMonth() + 1, 0)
      ).getUTCDate(),
    [viewDate]
  );

  const canPrev = useMemo(() => {
    // prev allowed if viewDate is after minMonth
    return !(
      viewDate.getUTCFullYear() === minMonth.getUTCFullYear() &&
      viewDate.getUTCMonth() === minMonth.getUTCMonth()
    );
  }, [viewDate, minMonth]);

  const canNext = useMemo(() => {
    // next allowed if viewDate is before maxMonth
    return !(
      viewDate.getUTCFullYear() === maxMonth.getUTCFullYear() &&
      viewDate.getUTCMonth() === maxMonth.getUTCMonth()
    );
  }, [viewDate, maxMonth]);

  function goPrev() {
    if (!canPrev) return;
    setViewDate((v) => addMonths(v, -1));
  }

  function goNext() {
    if (!canNext) return;
    setViewDate((v) => addMonths(v, 1));
  }

  function isDisabled(day) {
    const cell = new Date(
      Date.UTC(viewDate.getUTCFullYear(), viewDate.getUTCMonth(), day)
    );
    // if viewing current month, disable days before today
    if (
      viewDate.getUTCFullYear() === today.getUTCFullYear() &&
      viewDate.getUTCMonth() === today.getUTCMonth()
    ) {
      return cell < today;
    }
    return false;
  }

  function handleSelect(day) {
    if (isDisabled(day)) return;
    const d = new Date(
      Date.UTC(viewDate.getUTCFullYear(), viewDate.getUTCMonth(), day)
    );
    setSelectedDate(d);
    if (onSelect) onSelect(d);
  }

  // build grid items including leading empty slots
  const cells = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const now = new Date();
  const todayUTC = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  );

  const endOfMonthUTC = new Date(
    Date.UTC(todayUTC.getUTCFullYear(), todayUTC.getUTCMonth() + 1, 0)
  );

  const fetchDatetime = async () => {
    const payload = {
      salonid: id,
      services: JSON.stringify(srvsRef.current),
      techsRef: JSON.stringify(techsRef.current),
      fromtime: formatDateUTC(todayUTC),
      totime: formatDateUTC(endOfMonthUTC),
      random: randomInt(100, 2000),
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
    setTechs(res.data);
  };

  return (
    <>
      <div className="text-center">
        <h3>Select a Date</h3>
        <p>
          Available dates are shown based on your group size and preferred
          technicians.
        </p>
      </div>
      <div className="date-select">
        <div>
          <button
            onClick={goPrev}
            disabled={!canPrev}
            aria-label="Previous month"
          >
            <i className="fa-solid fa-angle-left"></i>
          </button>
          <div>
            <h3>{monthLabel}</h3>
          </div>
          <button onClick={goNext} disabled={!canNext} aria-label="Next month">
            <i className="fa-solid fa-angle-right"></i>
          </button>
        </div>

        <div className="weekday">
          {WEEKDAYS.map((w) => (
            <span key={w}>{w}</span>
          ))}
        </div>

        <div className="date-grid">
          {cells.map((day, idx) => {
            if (day === null)
              return <div key={"empty-" + idx} className="empty" />;
            const disabled = isDisabled(day);
            const cellDate = new Date(
              Date.UTC(viewDate.getUTCFullYear(), viewDate.getUTCMonth(), day)
            );
            const isToday = cellDate.getTime() === today.getTime();
            const isSelected =
              selectedDate &&
              selectedDate.getUTCFullYear() === viewDate.getUTCFullYear() &&
              selectedDate.getUTCMonth() === viewDate.getUTCMonth() &&
              selectedDate.getUTCDate() === day;
            return (
              <div
                key={day}
                className={[
                  "date-cell",
                  disabled ? "disabled" : "",
                  isToday ? "today" : "",
                  isSelected ? "selected" : "",
                ].join(" ")}
                onClick={() => handleSelect(day)}
                disabled={disabled}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
