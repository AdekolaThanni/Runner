import { defer } from "react-router-dom";

const API_URL = "/api/users";

export const getWishlist = async () => {
  const fetcher = async () => {};

  return defer({ wishlist: fetcher() });
};
