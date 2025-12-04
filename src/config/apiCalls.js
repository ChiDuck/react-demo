

import { fetchApi } from "../config/apiHelper";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiTlRQIDU0MDUiLCJpZCI6IjRkMzhhZmMwLWFjODMtNDg4NC1iOGQzLWUwOGIzYTVkMWFkNCIsInJvbGUiOiJ1c2VyIiwiYWN0aXZlIjp0cnVlLCJkYmlkIjoiYzhiYjgwMzkiLCJleHAiOjE3NjQ4NDcxOTd9.szDGMcUmB4bNqEOiUofNqp5KanQBf3aK3QYqLOtqdxU";

export async function getSalonAPI({
    s,
    sort,
    p,
    z,
    k,
    o,
    f,
    salonid,
    idsalon,
    cartid,
    appointmentid,
    user = false,
    salon = false,
    signal, }
) {

    const params = {
        s,
        sort,
        p,
        z,
        k,
        o,
        f,
        salonid,
        idsalon,
        cartid,
        appointmentid,
        cache: 0
    };

    // Build query string and REMOVE empty values
    const query = Object.entries(params)
        .filter(([_, value]) => value !== undefined && value !== null)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");


    const fetchString = user ? "user/search?" : (salon ? "salon/search?" : "public?")

    return fetchApi(`${fetchString}${query}`, (user || salon) ? token : null, { signal });
}

