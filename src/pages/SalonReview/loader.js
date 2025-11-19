import { getSalonDetail, getSalonReviews } from "../../config/apiCalls";

export async function salonReviewLoader({ params, request }) {
    const { id } = params;
    console.log("loader running", params, request.url);
    if (!id) throw new Response("Missing id", { status: 400 });

    const [detail, reviews] = await Promise.all([
        getSalonDetail(id, { signal: request.signal }),
        getSalonReviews(id, { signal: request.signal }),
    ])

    console.log({ detail, reviews });
    return { detail, reviews };
}