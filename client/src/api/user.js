import { defer } from "react-router-dom";

const API_URL = "/api/users";

export const getUser = async () => {
  const fetcher = async () => {
    const response = await fetch(`${API_URL}/me`);

    const data = await response.json();
    return data.data.user;
  };

  return defer({ user: fetcher() });
};
