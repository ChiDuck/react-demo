

import { fetchApi } from "../config/apiHelper";

const user_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiTlRQIFx1MDBkOXdcdTAwZGEgT25pLUNoYW4gQmFrYSIsImlkIjoiNGQzOGFmYzAtYWM4My00ODg0LWI4ZDMtZTA4YjNhNWQxYWQ0Iiwicm9sZSI6InVzZXIiLCJhY3RpdmUiOnRydWUsImRiaWQiOiI3ZjhkNzU0MiIsImV4cCI6MTc2NzE3NjExMX0.qBX5-XkJ6NB7PNFbzXdvO3uB7sZzueSCUkkcrCXVr3U";

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

    return fetchApi(`${fetchString}${query}`, (user || salon || token) ? user_token : null, { signal });
}

export async function postSalonAPI({ c, body, user = false, isPublic = false, login = false }) {
    const fetchString = user ? "user/" : isPublic ? "public?c=" : login ? "login" : "salon/cmd?c=";

    return fetchApi(`${fetchString}${c}`, user_token, {
        method: "POST",
        body: body,
    })
}
