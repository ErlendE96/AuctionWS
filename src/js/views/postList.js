import { postThumbnailTemplate } from "../templates/index.js";

export const postList = (listings, preview = false) => {
  const element = document.createElement("div");
    element.classList.add("post", "list")
    element.append(...listings.map(listings => postThumbnailTemplate(listings, preview)))
    return element
}

