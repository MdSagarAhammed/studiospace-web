/**
 * Thin fetch wrapper around the Express REST API.
 * All requests send credentials so the BetterAuth session cookie travels along.
 */

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5010/api";

async function request(path, { method = "GET", body, silent, signal } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    credentials: "include",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    signal,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    // non-JSON response (e.g. empty body)
  }

  if (!res.ok) {
    if (silent) return null;
    const message =
      data?.message || res.statusText || "Something went wrong. Try again.";
    const error = new Error(message);
    error.status = res.status;
    throw error;
  }
  return data;
}

export const api = {
  get: (path, opts) => request(path, opts),
  post: (path, body, opts) => request(path, { ...opts, method: "POST", body }),
  put: (path, body, opts) => request(path, { ...opts, method: "PUT", body }),
  patch: (path, body, opts) =>
    request(path, { ...opts, method: "PATCH", body }),
  delete: (path, opts) => request(path, { ...opts, method: "DELETE" }),
};

/**
 * Upload a File to imgbb and return the hosted URL.
 * Requirement: image uploading system via imgbb, URL persisted in MongoDB.
 */
export async function uploadToImgbb(file) {
  const key = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  if (!key) throw new Error("imgbb API key is not configured");

  const form = new FormData();
  form.append("image", file);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
    method: "POST",
    body: form,
  });
  const json = await res.json();
  if (!json?.success) {
    throw new Error(json?.error?.message || "Image upload failed");
  }
  return json.data.url;
}
