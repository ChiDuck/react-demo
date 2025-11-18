function getSalonNow(timezone) {
    // returns a Date object representing "now" in the salon timezone
    const now = new Date();
    const locale = now.toLocaleString("en-US", { timeZone: timezone });
    return new Date(locale);
}

function parseSalonTime(timeStr, baseDate) {
    const [time, period] = timeStr.split(" ");
    let [hour, minute] = time.split(":").map(Number);

    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;

    return new Date(
        baseDate.getFullYear(),
        baseDate.getMonth(),
        baseDate.getDate(),
        hour,
        minute,
        0,
        0
    );
}

export function getOpenStatus(schedule, timezone) {
    const now = getSalonNow(timezone);
    console.log(now);
    const todayIndex = now.getDay() + 1; // 0 = Sun, 1 = Mon...

    const today = schedule.find(s => s.weekdays == todayIndex);

    if (!today || !today.times || today.times.length === 0) {
        return { isOpen: false, text1: "Closed Today", text2: " - Opening Soon" };
    }

    const { starttime, endtime } = today.times[0];

    const start = parseSalonTime(starttime, now);
    let end = parseSalonTime(endtime, now);

    // handle overnight (start > end)
    if (end <= start) {
        end.setDate(end.getDate() + 1);
    }

    if (now >= start && now < end) {
        // currently OPEN
        return { isOpen: true, text1: "Open Now", text2: ` — Closes ${endtime}` };
    }

    // currently CLOSED
    const minutesUntilOpen = Math.floor((start - now) / 1000 / 60);
    if (minutesUntilOpen <= 60 && minutesUntilOpen > 0) {
        return { isOpen: false, text1: "Opening Soon", text2: ` (${starttime})` };
    }

    return { isOpen: false, text1: "Closed", text2: ` — Opens ${starttime}` };
}
