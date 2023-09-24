
import { apiPath } from "../../api/constants.js";
import { headers } from "../../api/headers.js";

export async function placeBid(listingId, bidAmount) {
  try {
    const response = await fetch(`${apiPath}/auction/listings/${listingId}/bids`, {
      method: "post",
      body: JSON.stringify({ amount: bidAmount }),
      headers: headers("application/json")
    });

    if (response.ok) {
      return await response.json();
    }

    console.error("Error placing bid. Response status:", response.status);
    const errorData = await response.json(); 

    if (errorData.errors && errorData.errors.length > 0) {
      const errorMessages = errorData.errors.map((error) => error.message).join(', ');
      console.error("Error messages:", errorMessages);
      throw new Error("Error placing bid. " + errorMessages);
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error("Error placing bid:", error);
    throw error;
  }
}


