import { isPastSlot } from "../TimeStep/timeFunction";

export function getDateInTimezone(date, timezone) {
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

export function addMonths(date, months) {
    const d = new Date(
        Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + months, 1)
    );
    return d;
}

export function formatDateUTC(date) {
    const y = date.getUTCFullYear();
    const m = String(date.getUTCMonth() + 1).padStart(2, "0");
    const d = String(date.getUTCDate()).padStart(2, "0");
    return `${y}/${m}/${d}`;
}

export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function minutesToTime(minutes) {
    let hours = Math.floor(minutes / 60);
    let mins = minutes % 60;

    const modifier = hours >= 12 ? "PM" : "AM";
    if (hours === 0) hours = 12;
    else if (hours > 12) hours -= 12;

    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")} ${modifier}`;
}

export function timeToMinutes(timeStr) {
    const [time, meridiem] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (meridiem === "PM" && hours !== 12) hours += 12;
    if (meridiem === "AM" && hours === 12) hours = 0;

    return hours * 60 + minutes;
}

function isTechWorkingOnDay(tech, daySchedules, cellDate, timezone) {
    if (!daySchedules?.length) return false;

    return tech.schedule.some(
        (sched) =>
            daySchedules.some(
                (shift) =>
                    sched.weekdays === shift.weekdays &&
                    isTechWithinSchedule(sched, shift, cellDate, timezone)
            )
    );
}


export function isTechWithinSchedule(tech, schedule, cellDate, timezone) {
    if (!tech || !schedule) return false;
    const techStart = timeToMinutes(tech.starttime);
    const techEnd = timeToMinutes(tech.endtime);
    if (isPastSlot(techEnd, cellDate, timezone) === true) return false;

    const schedStart = timeToMinutes(schedule.starttime);
    const schedEnd = timeToMinutes(schedule.endtime);

    return techStart < schedEnd && techEnd > schedStart;
}

export function bookableDay(selectedTech, techs, daySchedules, guest, cellDate, timezone) {
    const preferredTechs =
        selectedTech.length > 0
            ? techs.filter((t) => selectedTech.includes(t.id))
            : [];

    const otherTechs = techs.filter(
        (t) => !preferredTechs.some((p) => p.id === t.id)
    );

    // All preferred techs must work at least one span that day
    const preferredWorking = preferredTechs.filter((t) =>
        isTechWorkingOnDay(t, daySchedules, cellDate, timezone)
    );

    if (preferredWorking.length !== preferredTechs.length) {
        return false;
    }

    const availableOthers = otherTechs.filter((t) =>
        isTechWorkingOnDay(t, daySchedules, cellDate, timezone)
    );

    const remainingGuests = guest - preferredTechs.length;

    return remainingGuests <= 0 || availableOthers.length >= remainingGuests;
}
