import { getSalonAPI } from "../../config/apiCalls";

export async function salonDetailLoader({ params, request }) {
    const { id } = params;
    console.log("loader running", params, request.url);
    if (!id) throw new Response("Missing id", { status: 400 });

    const [detail, gallery, services] = await Promise.all([
        getSalonAPI({
            s: "GetSalonDetail",
            salonid: id,
            signal: request.signal
        }),

        getSalonAPI({
            s: "GetSalonGallery",
            z: 10,
            idsalon: id,
            signal: request.signal
        }),

        getSalonAPI({
            s: "GetSalonServices",
            z: 12,
            idsalon: id,
            signal: request.signal
        }),])

    console.log({ detail, gallery, services });
    return { detail, gallery, services };
}