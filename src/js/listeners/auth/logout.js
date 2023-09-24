import * as auth from "../../api/auth/index.js";


export function logoutListener() {
  try {
    auth.logout()
    location.href = "./"
  } catch {
    return alert("There was a problem logging out");
  }
}