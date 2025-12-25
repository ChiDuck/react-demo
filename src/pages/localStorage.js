const user_key = "profileUserLight";

export function saveUserToStorage(user) {
  if (!user) return;
  localStorage.setItem(user_key, JSON.stringify(user));
}

export function loadUserFromStorage() {
  try {
    const raw = localStorage.getItem(user_key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearUserStorage() {
  localStorage.removeItem(user_key);
}
