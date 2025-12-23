import { timeToMinutes } from "../DateStep/dateFunction";

function getTechScheduleForDay(tech, weekday) {
    return tech.schedule.find(
        (s) => s.status === 1 && s.weekdays === weekday
    );
}

function isSlotInsideTech(slotMin, techSchedule, block) {
    if (!techSchedule) return false;

    const start = timeToMinutes(techSchedule.starttime);
    const end = timeToMinutes(techSchedule.endtime);

    return slotMin >= start && slotMin + block <= end;
}

function allPreferredTechsAvailable(
    slotMin,
    preferredTechs,
    weekday,
    block
) {
    return preferredTechs.every((tech) => {
        const sched = getTechScheduleForDay(tech, weekday);
        return isSlotInsideTech(slotMin, sched, block);
    });
}

function countAvailableTechs(slotMin, techs, weekday, block) {
    return techs.filter((tech) => {
        const sched = getTechScheduleForDay(tech, weekday);
        return isSlotInsideTech(slotMin, sched, block);
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
        !allPreferredTechsAvailable(
            slotMin,
            preferredTechs,
            weekday,
            block
        )
    ) {
        return false;
    }

    // Rule 2: total capacity must satisfy guests
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
    dateStr,
    preferredTechs,
    allTechs,
    guestCount,
    timeblock,
}) {
    const date = new Date(dateStr.replaceAll("/", "-") + "T00:00:00Z");
    const weekday = date.getUTCDay() + 1;

    return slots.map((time) => {
        const slotMin = timeToMinutes(time);

        const enabled = isSlotSelectable({
            slotMin,
            preferredTechs,
            allTechs,
            weekday,
            block: timeblock,
            guestCount,
        });

        return {
            time,
            disabled: !enabled,
        };
    });
}

