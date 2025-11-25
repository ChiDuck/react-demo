import { getSalonAPI } from "../../config/apiCalls";

export async function viewReviewLoader({ params, request }) {
    const { id } = params;
    console.log("loader running", params, request.url);
    if (!id) throw new Response("Missing id", { status: 400 });

    const [detail, reviews, reviewOverall, reviewImg] = await Promise.all([
        getSalonAPI({
            s: "GetSalonDetail",
            salonid: id,
            signal: request.signal
        }),
        getSalonAPI({
            s: "GetSalonReviews",
            p: 1,
            z: 6,
            salonid: id,
            signal: request.signal
        }),
        getSalonAPI({
            s: "GetSalonReviewOverall",
            salonid: id,
            signal: request.signal
        }),
        getSalonAPI({
            s: "GetReviewImage",
            z: 4,
            salonid: id,
            signal: request.signal
        }),
    ])

    console.log({ detail, reviews, reviewOverall, reviewImg });
    return { detail, reviews, reviewOverall, reviewImg };
}