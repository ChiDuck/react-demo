

import { fetchApi } from "../config/apiHelper";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiTlRQIFx1MDBkOXdcdTAwZGEgT25pLUNoYW4gQmFrYSIsImlkIjoiNGQzOGFmYzAtYWM4My00ODg0LWI4ZDMtZTA4YjNhNWQxYWQ0Iiwicm9sZSI6InVzZXIiLCJhY3RpdmUiOnRydWUsImRiaWQiOiI5MjIxMWEyMyIsImV4cCI6MTc2NTgwMDA2MX0.lpRS1gSvZ1gRWC1Qu3qkv9dAFfCTCxe-77JBJbxyzZw";

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
    listingtype,
    zip,
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
        listingtype,
        zip,
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
