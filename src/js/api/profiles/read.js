import { apiPath } from "../constants.js";
import { headers } from "../headers.js";

export async function getProfiles() {
  const response = await fetch(`${apiPath}/auction/profiles`, { headers: headers() });
  if (response.ok) {
    return await response.json()
  }

  throw new Error(response.statusText);
}

export async function getProfile(name) {
  const response = await fetch(`${apiPath}/auction/profiles/${name}?&_seller=true&_listings=true`, { headers: headers() });
  if (response.ok) {
    return await response.json()
  }

  throw new Error(response.statusText);
}