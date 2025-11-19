

import { fetchApi } from "../config/apiHelper";
export function getSalonDetail(id, { signal } = {}) {
    return fetchApi(`GetSalonDetail&salonid=${encodeURIComponent(id)}&cache=0`, { signal }
    )
}

export function getSalonGallery(id, { signal } = {}) {
    return fetchApi(`GetSalonGallery&z=10&idsalon=${encodeURIComponent(id)}&cache=0`, { signal }
    )
}
export function getSalonService(id, { signal } = {}) {
    return fetchApi(`GetSalonServices&z=12&idsalon=${encodeURIComponent(id)}&cache=0`, { signal }
    )
}