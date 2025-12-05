import { getSalonAPI } from "../../config/apiCalls";

export async function userProfileLoader({ request }) {

    const detail = await
        getSalonAPI({
            s: "GetUserDetail",
            user: true,
            signal: request.signal
        })

    console.log(detail);
    return detail;
}