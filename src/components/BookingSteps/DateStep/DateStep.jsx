import { useCallback, useEffect, useMemo, useState } from "react";
import { postSalonAPI } from "../../../config/apiCalls";
import { buildSlotsWithAvailability } from "../TimeStep/timeFunction";
import { generateTimeSlots } from "../TimeStep/TimeStep";
import DateCell from "./DateCell";
import {
  addMonths,
  formatDate,
  formatDateUTC,
  getDateInTimezone,
  randomInt,
} from "./dateFunction";
import "./DateStep.scss";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function DateStep({
  state,
  dispatch,
  timezone,
  id,
  sessionKey,
}) {
  const [fullSchedule, setFullSchedule] = useState({
    technician: [],
    calendar: [],
    schedule: [],
  });
  const selectedTechId = state.selectedTechnician.map((i) => i.id);

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
    return !(
      viewDate.getUTCFullYear() === minMonth.getUTCFullYear() &&
      viewDate.getUTCMonth() === minMonth.getUTCMonth()
    );
  }, [viewDate, minMonth]);

  const canNext = useMemo(() => {
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

  // build grid items including leading empty slots
  const cells = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const now = new Date();
  const todayUTC = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  );
  const startOfMonthUTC = new Date(
    Date.UTC(viewDate.getUTCFullYear(), viewDate.getUTCMonth(), 1)
  );

  const endOfMonthUTC = new Date(
    Date.UTC(viewDate.getUTCFullYear(), viewDate.getUTCMonth() + 1, 0)
  );

  const fetchDatetime = async () => {
    const payload = {
      salonid: id,
      hasanyone: 1,
      services: JSON.stringify(state.selectedService.map((i) => i.id)),
      technicians: JSON.stringify(selectedTechId),
      fromtime: formatDateUTC(
        viewDate.getTime() === minMonth.getTime() ? todayUTC : startOfMonthUTC
      ),
      totime: formatDateUTC(endOfMonthUTC),
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
    fetchDatetime();
  }, [viewDate]);

  const handleSelectDate = useCallback(
    (dayInfo) => {
      const slots = generateTimeSlots({
        weekdays: fullSchedule.data?.[0]?.weekdays,
        schedule: fullSchedule.schedule,
        timeblock: fullSchedule.timeblock,
        lasttimebeforeclose: fullSchedule.lasttimebeforeclose,
      });

      const computedTimes = buildSlotsWithAvailability({
        slots,
        pickedDate: formatDateUTC(dayInfo.currentdate),
        weekday: dayInfo.weekdays,
        preferredTechs: fullSchedule.technician.filter((tech) =>
          selectedTechId.includes(tech.id)
        ),
        allTechs: fullSchedule.technician,
        guestCount: state.guests,
        timeblock: fullSchedule.timeblock,
        timezone,
        calendar: fullSchedule.data?.[0]?.calendar ?? [],
      });

      dispatch({
        type: "SET_DATE",
        payload: {
          date: {
            weekdays: dayInfo.weekdays,
            currentdate: formatDate(dayInfo.currentdate),
            status: 1,
            times: {
              allTime: computedTimes.map((t) => ({
                time: t.time,
                active: !t.disabled,
                ...(t.disabled ? {} : { quantity: dayInfo.quantity }),
              })),
            },
            workListTechSelected: [],
            workListTechAnyone: [],
            workListTechIstemp: [],
            technicianOff: [],
            statusTechOff: 0,
          },
          formatted: formatDateUTC(dayInfo.currentdate),
        },
      });
    },
    [
      fullSchedule,
      selectedTechId,
      state.guests,
      state.formatselecteddate,
      timezone,
      dispatch,
    ]
  );

  useEffect(() => {
    console.log(state);
  }, [state]);
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
          {cells.map((day, idx) => (
            <DateCell
              key={idx}
              day={day}
              guests={state.guests}
              selectedDate={state.selectedDate}
              selectedTech={selectedTechId}
              timezone={timezone}
              viewDate={viewDate}
              schedule={fullSchedule.schedule}
              allTech={fullSchedule.technician}
              handleSelectDate={handleSelectDate}
              disabled={isDisabled(day)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
