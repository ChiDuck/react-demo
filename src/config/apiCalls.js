

import { fetchApi } from "../config/apiHelper";

export async function getSalonAPI({
    s,
    p,
    z = 6,
    k,
    o,
    f,
    salonid,
    idsalon,
    signal, }
) {

    const params = {
        s,
        p,
        z,
        k,
        o,
        f,
        salonid: salonid,
        idsalon: idsalon,
        cache: 0
    };

    // Build query string and REMOVE empty values
    const query = Object.entries(params)
        .filter(([_, value]) => value !== undefined && value !== null)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");
    return fetchApi(`public?${query}`, { signal });
}
