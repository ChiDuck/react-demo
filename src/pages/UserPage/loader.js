import { getSalonAPI } from "../../config/apiCalls";



export async function userProfileLoader({ params, request }) {
    // const { id } = params;
    // console.log("loader running", params, request.url);
    // if (!id) throw new Response("Missing id", { status: 400 });

    const [detail, appointments] = await Promise.all([
        getSalonAPI({
            s: "GetUserDetail",
            user: true,
            signal: request.signal
        }),
        getSalonAPI({
            s: "GetUserAppointment",
            user: true,
            p: 1,
            z: 5,
            signal: request.signal
        })
    ])

    console.log({ detail, appointments });
    return { detail, appointments };
}