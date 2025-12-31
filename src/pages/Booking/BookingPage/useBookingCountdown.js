import { useEffect, useRef, useState } from "react";

export function useBookingCountdown({ enabled, step, onExpire }) {
    const [remaining, setRemaining] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (!enabled || step <= 1) return;

        const raw = localStorage.getItem("booking_timer");
        if (!raw) return;

        const { expiresAt } = JSON.parse(raw);

        function tick() {
            const diff = Math.max(0, Math.floor((expiresAt - Date.now()) / 1000));
            setRemaining(diff);

            if (diff <= 0) {
                clearInterval(intervalRef.current);
                onExpire?.();
            }
        }

        tick();
        intervalRef.current = setInterval(tick, 1000);

        return () => clearInterval(intervalRef.current);
    }, [enabled, step, onExpire]);

    return remaining;
}

export function ensureStepTimer(step) {
    if (step <= 1) {
        // clear timer when going back to step 1
        localStorage.removeItem("booking_timer");
        return;
    }

    const raw = localStorage.getItem("booking_timer");
    const stored = raw ? JSON.parse(raw) : null;

    // reset if step changed or timer doesn't exist
    if (!stored || stored.step !== step) {
        const expiresAt = Date.now() + 300 * 1000;

        localStorage.setItem(
            "booking_timer",
            JSON.stringify({ step, expiresAt })
        );
    }
}
