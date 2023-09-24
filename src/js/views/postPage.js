import { getPost, isLoggedIn, profile } from "../api/index.js";
import { postFormTemplate, postTabsTemplate, postThumbnailTemplate } from "../templates/index.js";

export const publicPostPage = async (post) => {
  const element = document.createElement("div");
  element.classList.add("post", "page", "mb-3");
  const thumbnail = postThumbnailTemplate(post, true);
  element.append(thumbnail);
  return element;
};

export const postPage = async (postId) => {
  if (!isLoggedIn()) {
    location.href = "./";
  } else {
    const me = profile();

    if (postId) {
      const post = await getPost(postId);
      const owner = post.name === me.name;

      if (owner) {
        const page = postTabsTemplate();
        const thumbnail = postThumbnailTemplate(post);
        const postForm = postFormTemplate(post);
        page.querySelector('#nav-default').append(thumbnail);
        page.querySelector('#nav-edit').append(postForm);
        return page;
      }

      return publicPostPage(post);
    }


    return postFormTemplate();
  }
};
