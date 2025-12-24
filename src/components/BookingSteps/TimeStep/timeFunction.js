import { timeToMinutes } from "../DateStep/dateFunction";

function getNowMinutesInTimezone(timezone) {
    const now = new Date();

    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).formatToParts(now);

    const hour = Number(parts.find(p => p.type === "hour").value);
    const minute = Number(parts.find(p => p.type === "minute").value);

    return hour * 60 + minute;
}

function isPastSlot(slotMin, pickedDate, timezone) {
    const today = new Intl.DateTimeFormat("en-CA", {
        timeZone: timezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(new Date()); // YYYY-MM-DD

    if (pickedDate !== today) return false;

    const nowMin = getNowMinutesInTimezone(timezone);
    return slotMin < nowMin;
}


function isSlotInsideAnyTechShift(slotMin, techSchedules, block) {
    return techSchedules.some((sched) => {
        const start = timeToMinutes(sched.starttime);
        const end = timeToMinutes(sched.endtime);
        return slotMin >= start && slotMin + block <= end;
    });
}

function countAvailableTechs(slotMin, techs, weekday, block) {
    return techs.filter((tech) => {
        const shifts = tech.schedule.filter(
            (s) => s.weekdays === weekday
        );
        return isSlotInsideAnyTechShift(slotMin, shifts, block);
    }).length;
}

function isSlotSelectable({
    slotMin,
    preferredTechs,
    allTechs,
    weekday,
    block,
    guestCount,
}) {
    // Rule 1: preferred techs must ALL be working
    if (
        preferredTechs.length > 0 &&
        !preferredTechs.every((tech) => {
            const shifts = tech.schedule.filter(
                (s) => s.weekdays === weekday
            );
            return isSlotInsideAnyTechShift(slotMin, shifts, block);
        })
    ) {
        return false;
    }

    // Rule 2: capacity check
    const availableCount = countAvailableTechs(
        slotMin,
        allTechs,
        weekday,
        block
    );

    return availableCount >= guestCount;
}

export function buildSlotsWithAvailability({
    slots,
    weekdays,
    preferredTechs,
    allTechs,
    guestCount,
    timeblock,
    pickedDate
}) {
    return slots.map((time) => {
        const slotMin = timeToMinutes(time);

        if (isPastSlot(slotMin, pickedDate)) {
            return { time, disabled: true };
        }

        const enabled = isSlotSelectable({
            slotMin,
            preferredTechs,
            allTechs,
            weekday: weekdays,
            block: timeblock,
            guestCount,
        });

        return {
            time,
            disabled: !enabled,
        };
    });
}


