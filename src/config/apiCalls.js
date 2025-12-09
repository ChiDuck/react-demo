

import { fetchApi } from "../config/apiHelper";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiTlRQIFx1MDBkOXdcdTAwZGEgT25pLUNoYW4gQmFrYSIsImlkIjoiNGQzOGFmYzAtYWM4My00ODg0LWI4ZDMtZTA4YjNhNWQxYWQ0Iiwicm9sZSI6InVzZXIiLCJhY3RpdmUiOnRydWUsImRiaWQiOiJmNWUzMzNkMyIsImV4cCI6MTc2NTI4MDYxMH0.kgx7Owz2JNnAcic9hzjBlKOQNr-JsbfaINfQLdCQf9g";

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

export async function postSalonAPI({ c, body }) {
    return fetchApi(`salon/cmd?c=${c}`, token, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
    })
}
