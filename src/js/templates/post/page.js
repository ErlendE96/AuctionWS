import { templateInstance } from "../instance.js";
import { postHeader } from "./header.js";
import { postMedia } from "./media.js";
import { postFooter } from "./footer.js";
import { postActions } from "./actions.js";


export const postPageTemplate = (post) => {
  const clone = templateInstance('postPage')

  clone.querySelector('.post').id = post.id;

  const header = postHeader(post);
  const media = postMedia(post, 'div')
  const footer = postFooter(postActions(post))
  const children = [header, media, footer];
  clone.querySelector(".page").append(...children)

  return clone;
}