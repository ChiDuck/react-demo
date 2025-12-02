import { getSalonAPI } from "../../config/apiCalls";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiTlRQIDU0MDUiLCJpZCI6IjRkMzhhZmMwLWFjODMtNDg4NC1iOGQzLWUwOGIzYTVkMWFkNCIsInJvbGUiOiJ1c2VyIiwiYWN0aXZlIjp0cnVlLCJkYmlkIjoiNTdhY2ZlOWQiLCJleHAiOjE3NjQ2NzcwODF9.9EBJtMtXdsCtoFV2FhKDeV0SI-MU4Qf6igy3OfcF5TE";

export async function userProfileLoader({ params, request }) {
    // const { id } = params;
    // console.log("loader running", params, request.url);
    // if (!id) throw new Response("Missing id", { status: 400 });

    const [detail, appointments] = await Promise.all([
        getSalonAPI({
            s: "GetUserDetail",
            user: true,
            token,
            signal: request.signal
        }),
        getSalonAPI({
            s: "GetUserAppointment",
            user: true,
            token,
            signal: request.signal
        })
    ])

    console.log({ detail, appointments });
    return { detail, appointments };
}