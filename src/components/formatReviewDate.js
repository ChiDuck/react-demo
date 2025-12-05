export function formatReviewDate(interval, date) {
    const TIME_ZONE = "America/Los_Angeles";

    // Convert input to LA timezone

    const laDate = new Date(date);

    const diffSec = Math.floor(interval);
    const diffMin = Math.floor(interval / 60);
    const diffHrs = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHrs / 24);
    // Relative formatting (within 24h)
    if (diffDays <= 7) {
        if (diffDays >= 1) return `${diffDays}d ago`;
        if (diffHrs >= 1) return `${diffHrs}h ago`;
        if (diffMin >= 1) return `${diffMin}m ago`;
        return `${diffSec}s ago`;
    }

    // MM/dd/YYYY
    return laDate.toLocaleDateString({
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
    });
}
