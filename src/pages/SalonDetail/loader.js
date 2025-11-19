import { getSalonDetail, getSalonGallery, getSalonService } from "../../config/apiCalls";

export async function salonDetailLoader({ params, request }) {
    const { id } = params;
    console.log("loader running", params, request.url);
    if (!id) throw new Response("Missing id", { status: 400 });

    const [detail, gallery, services] = await Promise.all([
        getSalonDetail(id, { signal: request.signal }),
        getSalonGallery(id, { signal: request.signal }),
        getSalonService(id, { signal: request.signal }),
    ])

    console.log({ detail, gallery, services });
    return { detail, gallery, services };
}