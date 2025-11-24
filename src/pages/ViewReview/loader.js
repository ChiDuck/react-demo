import { GetReviewImage, getSalonDetail, GetSalonReviewOverall, getSalonReviews } from "../../config/apiCalls";

export async function viewReviewLoader({ params, request }) {
    const { id } = params;
    console.log("loader running", params, request.url);
    if (!id) throw new Response("Missing id", { status: 400 });

    const [detail, reviews, reviewOverall, reviewImg] = await Promise.all([
        getSalonDetail(id, { signal: request.signal }),
        getSalonReviews(id, { signal: request.signal }),
        GetSalonReviewOverall(id, { signal: request.signal }),
        GetReviewImage(id, { signal: request.signal }),
    ])

    console.log({ detail, reviews, reviewOverall, reviewImg });
    return { detail, reviews, reviewOverall, reviewImg };
}