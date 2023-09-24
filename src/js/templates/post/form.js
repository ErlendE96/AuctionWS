import { createPost } from "../../api/index.js";
import { clear } from "../../tools/clear.js";
import { templateInstance } from "../instance.js";
import { postThumbnailTemplate } from "./thumbnail.js";

function populateForm(post, form) {
  form.title.value = post.title;
  form.description.value = post.description; 
  form.media.value = post.media;
  form.endsAt.value = post.endsAt; 
}

function populatePreview(post, preview) {
  const page = postThumbnailTemplate(post, false);
  clear(preview);
  preview.append(page);
}

export const postFormTemplate = (post) => {
  const clone = templateInstance('postForm');
  const form = clone.querySelector('#postForm');
  const button = clone.querySelector('[data-action=submit]');
  const preview = clone.querySelector('#postPreview');

  if (post && post.id) {
    populateForm(post, form);
    populatePreview(post, preview);
    button.querySelector("[data-action=publish]").style.display = "none";
  } else {
    button.querySelector("[data-action=update]").style.display = "none";
  }

  form.addEventListener("input", () => {
    const updatedPost = {
      title: form.title.value,
      description: form.description.value, 
      media: form.media.value,
      endsAt: form.endsAt.value, 
    };
    populatePreview(updatedPost, preview);
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const title = data.get("title");
    const description = data.get("description");
    
    
    
  
    const tags = data.has("tags") ? data.get("tags").split(", ") : [];
    const media = data.has("media") ? data.get("media").split(", ") : [];
    
    const endsAtString = data.get("endsAt");
    const endsAt = new Date(endsAtString);
  
    try {
      const post = await createPost(title, description, tags, media, endsAt);
      location.href = `./?view=post&postId=${post.id}`;
    } catch (error) {
      console.error(error);
    }

    
  });
  

  return clone;
};
