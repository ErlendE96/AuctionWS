import { postList } from "../../views/postList.js";
import { templateInstance } from "../instance.js";
import { load } from "../../storage/load.js";
import { updatePost } from "../../api/index.js";

export const profilePageTemplate = (data) => {

  const clone = templateInstance("profilePagePrivate");

  const avatarImage = clone.querySelector("img.avatar");
  const profileName = clone.querySelector(".profile-name");
  const profileEmail = clone.querySelector(".profile-email");
  const profileCredits = clone.querySelector(".profile-credits");
  const profilePosts = clone.querySelector(".profile-posts");

  avatarImage.src = data.avatar;
  profileName.innerText = data.name;
  profileEmail.innerText = data.email;
  profileCredits.innerText = `Credits: ${data.credits}`;

  if (data.listings && data.listings.length) {
    const posts = postList(data.listings);
    profilePosts.append(posts);
  } else {
    const alert = document.createElement("div");
    alert.classList.add("alert", "alert-info");
    alert.innerText = "There are no posts yet...";
    profilePosts.append(alert);
  }


  const avatarUrlInput = clone.querySelector(".bid-amount-input");
  const updateAvatarButton = clone.querySelector(".updateAvatar");

  const profileData = load("profile");
  const owned = data.name === profileData.name;

  if (owned && updateAvatarButton) {
    updateAvatarButton.addEventListener("click", async () => {
      const newImageUrl = avatarUrlInput.value.trim();

      if (newImageUrl) {
        try {

          await updatePost(newImageUrl); 


          avatarImage.src = newImageUrl;

        } catch (error) {
          console.error("Error updating profile image:", error);
        }
      } else {
        console.error("Please provide a valid image URL.");
      }
    });
  } else {
    if (avatarUrlInput) {
      avatarUrlInput.remove();
    }
    if (updateAvatarButton) {
      updateAvatarButton.remove();
    }
  }

  return clone;
};

