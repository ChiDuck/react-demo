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

export function isPastSlot(slotMin, pickedDate, timezone) {
    const today = new Intl.DateTimeFormat("en-CA", {
        timeZone: timezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(new Date()).replace(/-/g, "/"); // YYYY-MM-DD

    if (pickedDate !== today) return false;

    const nowMin = getNowMinutesInTimezone(timezone);
    return slotMin < nowMin;
}

function isTechAvailableAtSlot({
    tech,
    slotMin,
    weekday,
    block,
    blockedMap,
}) {
    // must be scheduled that day
    const shifts = tech.schedule.filter(s => s.weekdays === weekday);
    if (!shifts.length) return false;

    const insideShift = shifts.some(s => {
        const start = timeToMinutes(s.starttime);
        const end = timeToMinutes(s.endtime);
        return slotMin >= start && slotMin + block <= end;
    });

    if (!insideShift) return false;

    // blocked by calendar?
    if (blockedMap.get(tech.id)?.has(slotMin)) return false;

    return true;
}

function buildBlockedSlotMap(calendar) {
    const map = new Map();

    for (const item of calendar) {
        if (item.idtechnician !== null) {
            const time = new Date(item.fromtime);
            const minutes = time.getUTCHours() * 60 + time.getUTCMinutes();

            if (!map.has(item.idtechnician)) {
                map.set(item.idtechnician, new Set());
            }

            map.get(item.idtechnician).add(minutes);
        }
    }

    return map;
}

function isSlotSelectable({
    slotMin,
    preferredTechs,
    allTechs,
    weekday,
    block,
    guestCount,
    blockedMap,
}) {
    // Rule 1: preferred techs must ALL be working
    if (
        preferredTechs.length > 0 &&
        !preferredTechs.every(tech =>
            isTechAvailableAtSlot({
                tech,
                slotMin,
                weekday,
                block,
                blockedMap,
            })
        )
    ) {
        return false;
    }

    // Rule 2: capacity check
    const availableCount = allTechs.filter(tech =>
        isTechAvailableAtSlot({
            tech,
            slotMin,
            weekday,
            block,
            blockedMap,
        })
    ).length;

    return availableCount >= guestCount;
}

export function buildSlotsWithAvailability({
    slots,
    weekday,
    preferredTechs,
    allTechs,
    guestCount,
    timeblock,
    pickedDate,
    timezone,
    calendar,
}) {
    // const blockedMap = buildBlockedSlotMap(calendar);
    const blockedMap = new Map();

    return slots.map((time) => {
        const slotMin = timeToMinutes(time);

        if (isPastSlot(slotMin, pickedDate, timezone)) {
            return { time, disabled: true };
        }

        const enabled = isSlotSelectable({
            slotMin,
            weekday,
            preferredTechs,
            allTechs,
            guestCount,
            block: timeblock,
            blockedMap,
        });

        return {
            time,
            disabled: !enabled,
        };
    });
}


