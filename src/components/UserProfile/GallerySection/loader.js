import { getSalonAPI } from "../../../config/apiCalls";

export async function userGalleryLoader({ request }) {
    const review = await
        getSalonAPI({
            s: "GetUserGallery",
            user: true,
            p: 1,
            z: 16,
            signal: request.signal
        })

    console.log(review);
    return review;
}