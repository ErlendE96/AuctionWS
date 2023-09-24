export const postBids = (post) => {
  if (post && post.bids && post.bids.length > 0) {
    const element = document.createElement("div");
    element.classList.add("post-bids");

    const bidsContainer = document.createElement("div");
    bidsContainer.classList.add("bids-container");

    post.bids.forEach((bid) => {
      if (bid.bidderName && bid.amount && bid.created) {
        const bidElement = document.createElement("div");
        bidElement.classList.add("bid"); 
        const formattedDate = new Date(bid.created).toLocaleString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false, 
        });

        bidElement.innerText = `${bid.bidderName}: $${bid.amount} (Bid at: ${formattedDate})`;

        bidsContainer.appendChild(bidElement);
      }
    });

    if (bidsContainer.children.length > 0) {
      element.appendChild(bidsContainer);
      return element;
    }
  }

  return null; 
};
