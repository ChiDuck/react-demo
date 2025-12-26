import { useEffect, useRef, useState } from "react";

export function useBookingCountdown(onExpire) {
    const [remaining, setRemaining] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        const expiresAt = Number(localStorage.getItem("booking_expires_at"));
        if (!expiresAt) return;

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
        console.log(remaining);

        return () => clearInterval(intervalRef.current);
    }, [onExpire]);

    return remaining;
}
