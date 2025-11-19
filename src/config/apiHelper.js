export const API_URL = import.meta.env.VITE_API_URL;

export async function fetchApi(path, options = {}) {
    const res = await fetch(`${API_URL}${path}`, options);
    if (!res.ok) {
        const text = await res.text();
        let details;
        try { details = JSON.parse(text); } catch { details = text }
        throw new Response(details.message || text || "API error", { status: res.status });
    }
    const json = await res.json();
    return json.data;
}