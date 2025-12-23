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

function isTechWorkingOnDay(tech, schedule) {
    if (schedule === undefined) return false;
    return tech.schedule.some(
        (s) =>
            s.weekdays === schedule.weekdays &&
            isTechWithinSchedule(s, schedule)
    );
}

export function isTechWithinSchedule(tech, schedule) {
    if (!tech || !schedule) return false;
    const techStart = timeToMinutes(tech.starttime);
    const techEnd = timeToMinutes(tech.endtime);

    const schedStart = timeToMinutes(schedule.starttime);
    const schedEnd = timeToMinutes(schedule.endtime);

    return techStart < schedEnd && techEnd > schedStart;
}

export function bookableDay(techsRef, tech, activeDay, guest) {
    const prfTechs =
        techsRef.length > 0
            ? tech.filter((t) => techsRef.some((p) => p === t.id))
            : [];

    const otherTechs = tech.filter((t) => !prfTechs.some((p) => p.id === t.id));

    const prfWorking = prfTechs.filter((t) => isTechWorkingOnDay(t, activeDay));

    if (prfWorking.length !== prfTechs.length) {
        return false; // preferred tech missing
    }

    const availableOthers = otherTechs.filter((t) =>
        isTechWorkingOnDay(t, activeDay)
    );

    const remainingGuests = guest - prfTechs.length;

    const isBookable =
        remainingGuests <= 0 || availableOthers.length >= remainingGuests;

    return isBookable
}