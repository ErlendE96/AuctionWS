import { deletePost } from "../../api/index.js";
import { getSearchParams } from "../../router/searchParams.js";
import { load } from "../../storage/load.js";
import { templateInstance } from "../instance.js";

export const postActions = (post) => {
  const profile = load("profile");
  const clone = templateInstance('postActions');
  const { postId } = getSearchParams();
  const viewing = postId == post.id;

  const viewButton = clone.querySelector('a[data-action=view]');
  const deleteButton = clone.querySelector('button[data-action=delete]');

  if (viewing) {
    viewButton.remove();
  } else {
    viewButton.href = `./?view=post&postId=${post.id}`;
  }

  if (profile) { 
    const owned = post.seller && profile.name === post.seller.name;

    if (owned) {
      deleteButton.addEventListener("click", async () => {
        await deletePost(post.id);
        location.href = "./";
      });
    } else {
      deleteButton.remove();
    }
  } else {
    const message = document.createElement("div");
    message.classList.add("alert", "alert-warning");
    message.innerText = "Please log in to make bids.";
    clone.appendChild(message);
  }

  return clone;
};
