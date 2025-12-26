import { getSalonAPI } from "../../../config/apiCalls";

export async function thankYouDetailLoader({ request }) {
    const url = new URL(request.url);
    const idorder = url.searchParams.get("idorder");

    const detail = await
        getSalonAPI({
            s: "GetBookingDetailByCartId",
            idcart: idorder,
            type: 0,
            token: true,
            signal: request.signal
        })

    console.log(detail);
    return detail;
}