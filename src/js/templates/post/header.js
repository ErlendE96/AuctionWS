import { templateInstance } from "../instance.js";
import { profileThumbnail } from "../profile/thumbnail.js";
import { postEndsAt } from "./timer.js";
import { postBids } from "./bids.js";
import { postTags } from "./tags.js";

export const postHeader = (post) => {
  const clone = templateInstance('postHeader');

  clone.querySelector('.card-header').href = `./?view=post&postId=${post.id}`;
  clone.querySelector('h3').innerText = post.title;
  
  if (post.description) {
    clone.querySelector('span').innerText = post.description;
  } else {
    clone.querySelector('span').remove();
  }

  const timerBadge = postEndsAt(post);
  const bidsInfo = postBids(post);
  const tagsBadges = postTags(post)

  const badgeContainer = document.createElement('div');
  const imgContainer = document.createElement('div');
  badgeContainer.classList.add('badge-container');
  badgeContainer.append( tagsBadges,timerBadge, bidsInfo);

  if (post.seller) {
    imgContainer.appendChild(profileThumbnail(post.seller));
  }


  clone.querySelector('.card-header').appendChild(badgeContainer);
  clone.querySelector('.profileimg').appendChild(imgContainer);
  return clone;
}
