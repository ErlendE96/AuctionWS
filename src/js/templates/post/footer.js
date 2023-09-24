import { templateInstance } from "../instance.js";
import { placeBid } from "./placebid.js";


export function postFooter(post) {
  const clone = templateInstance('postFooter');
  clone.querySelector('.card-footer').append(...arguments)



  const bidAmountInput = clone.querySelector('.bid-amount-input');
  const placeBidButton = clone.querySelector('.place-bid-button');

  placeBidButton.addEventListener('click', async () => {
    const bidAmount = parseFloat(bidAmountInput.value);

    if (isNaN(bidAmount) || bidAmount <= 0) {
      alert("Please enter a valid bid amount.");
      return;
    }

    try {
      const newBid = await placeBid(post.id, bidAmount);
    } catch (error) {
    }
    
  });
  return clone;
} 