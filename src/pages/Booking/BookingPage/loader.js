import { getSalonAPI } from "../../../config/apiCalls";

export async function salonDetailBookingLoader({ request }) {
    const url = new URL(request.url);
    const salonid = url.searchParams.get("salonid");

    const detail = await
        getSalonAPI({
            s: "GetSalonDetail",
            salonid: salonid,
            signal: request.signal
        })

    console.log(detail);
    return detail;
}