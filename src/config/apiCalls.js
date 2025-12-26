

import { fetchApi } from "../config/apiHelper";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiTlRQIFx1MDBkOXdcdTAwZGEgT25pLUNoYW4gQmFrYSIsImlkIjoiNGQzOGFmYzAtYWM4My00ODg0LWI4ZDMtZTA4YjNhNWQxYWQ0Iiwicm9sZSI6InVzZXIiLCJhY3RpdmUiOnRydWUsImRiaWQiOiI3OTg0NzU3NCIsImV4cCI6MTc2NjY1NjE1M30.UokD74X1UNmAG4-cFmu6e7_SJ0oxJOLAXI5cyvQbM0Y";

export async function getSalonAPI({
    s, p, z, k, o, f,
    sort,
    salonid, idsalon,
    cartid, idcart,
    type,
    appointmentid,
    listingtype,
    zip,
    key,
    user = false,
    salon = false,
    token = false,
    cache = true,
    signal, }
) {

    const params = {
        s, p, z, k, o, f,
        sort,
        salonid, idsalon,
        cartid, idcart,
        type,
        key,
        appointmentid,
        listingtype,
        zip,
        cache: cache ? 0 : null,
    };

    // Build query string and REMOVE empty values
    const query = Object.entries(params)
        .filter(([_, value]) => value !== undefined && value !== null)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");


    const fetchString = user ? "user/search?" : (salon ? "salon/search?" : "public?")

    return fetchApi(`${fetchString}${query}`, (user || salon || token) ? token : null, { signal });
}

export async function postSalonAPI({ c, body, user = false, isPublic = false, login = false }) {
    const fetchString = user ? "user/" : isPublic ? "public?c=" : login ? "login" : "salon/cmd?c=";

    return fetchApi(`${fetchString}${c}`, token, {
        method: "POST",
        body: body,
    })
}
