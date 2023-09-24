import { templateInstance } from "../instance.js";

function formatDateTime(date) {
  const options = {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12: false,
  };
  return date.toLocaleDateString(undefined, options);
}

export const postEndsAt = (post) => {
  if (post.endsAt) {
    const element = document.createElement("span");
    element.classList.add("post-endsAt");
  
    const formattedDateTime = formatDateTime(new Date(post.endsAt));
  
    const tagElement = templateInstance("postTag");
    tagElement.querySelector(".badge").innerText = "Bidding ends at: " + formattedDateTime;
  
    element.appendChild(tagElement);
    return element;
  }


}
