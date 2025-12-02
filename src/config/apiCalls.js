

import { fetchApi } from "../config/apiHelper";

export async function getSalonAPI({
    s,
    sort,
    p,
    z = 6,
    k,
    o,
    f,
    salonid,
    idsalon,
    user = false,
    token,
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
        cache: 0
    };

    // Build query string and REMOVE empty values
    const query = Object.entries(params)
        .filter(([_, value]) => value !== undefined && value !== null)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");

    const fetchString = user ? `user/search?${query}` : `public?${query}`;
    return fetchApi(fetchString, token, { signal });
}

