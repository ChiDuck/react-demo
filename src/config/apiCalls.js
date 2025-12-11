

import { fetchApi } from "../config/apiHelper";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiTlRQIFx1MDBkOXdcdTAwZGEgT25pLUNoYW4gQmFrYSIsImlkIjoiNGQzOGFmYzAtYWM4My00ODg0LWI4ZDMtZTA4YjNhNWQxYWQ0Iiwicm9sZSI6InVzZXIiLCJhY3RpdmUiOnRydWUsImRiaWQiOiJiYTBmZTRkYiIsImV4cCI6MTc2NTQ1MjU5MX0.LD2B1cmKH60UcRcAwqxobqUFuxoypBCJ4S-s7T5G6mI";

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

export async function postSalonAPI({ c, body, user = false }) {
    const fetchString = user ? "user/" : "salon/cmd?c=";

    return fetchApi(`${fetchString}${c}`, token, {
        method: "POST",
        body: body,
    })
}
