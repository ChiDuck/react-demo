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
