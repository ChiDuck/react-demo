import { redirect } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
const token = "0cf58164-5614-48c3-9037-927283107cad";

export async function action({ request }) {
    const formData = await request.formData();
    // const headline = formData.get("headline");
    // const review = formData.get("review");

    const res = await fetch(`${API_URL}salon/cmd?c=AddSalonReview`, {
        headers: { Authorization: `Bearer ${token}` },
        method: "POST",
        body: formData,
    });

    if (!res.ok) {
        return { error: "Something went wrong." };
    }

    return redirect();
}
