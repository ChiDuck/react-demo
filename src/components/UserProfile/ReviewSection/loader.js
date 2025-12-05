import { getSalonAPI } from "../../../config/apiCalls";

export async function userReviewLoader({ request }) {
    const review = await
        getSalonAPI({
            s: "GetUserReview",
            user: true,
            p: 1,
            z: 5,
            signal: request.signal
        })

    console.log(review);
    return review;
}