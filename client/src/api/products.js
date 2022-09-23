import { defer, json } from "react-router-dom";
const API_URL = "/api/products";

export const getAllProducts = async ({ request }) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  const fetcher = async () => {
    const response = await fetch(
      `${API_URL}?${searchParams.toString()}&limit=name,price,ratingsCount,ratingsAverage,images`
    );

    console.log(response);

    if (response.status === 404)
      throw json({ message: "No Products Found" }, { status: 404 });

    const data = await response.json();

    return data;
  };

  return defer({ products: fetcher() });
};
