import { postSalonAPI } from "../../../config/apiCalls";

export async function editReview({ request }) {
    const form = await request.formData();
    const headline = form.get("headline");
    const review = form.get("review");

    const body = {
        id: form.get("id"),
        salonid: form.get("salonid"),
        content: JSON.stringify({ headline, review }),
        star: form.get("star"),
    };

    const res = await postSalonAPI({
        c: "EditSalonReview",
        body: JSON.stringify(body),
    });

    if (res.error !== "") {
        return { success: false, error: res.error };
    }

    return { success: true };
}
