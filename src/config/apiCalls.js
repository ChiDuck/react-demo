

import { fetchApi } from "../config/apiHelper";
export function getSalonDetail(id, { signal } = {}) {
    return fetchApi(`public?s=GetSalonDetail&salonid=${encodeURIComponent(id)}&cache=0`, { signal }
    )
}

export function getSalonGallery(id, { signal } = {}) {
    return fetchApi(`public?s=GetSalonGallery&z=10&idsalon=${encodeURIComponent(id)}&cache=0`, { signal }
    )
}
export function getSalonService(id, { signal } = {}) {
    return fetchApi(`public?s=GetSalonServices&z=12&idsalon=${encodeURIComponent(id)}&cache=0`, { signal }
    )
}

export function getSalonReviews(id, { signal } = {}) {
    return fetchApi(`public?s=GetSalonReviews&p=1&z=5&cache=0&salonid=${encodeURIComponent(id)}`, { signal }
    )
}

