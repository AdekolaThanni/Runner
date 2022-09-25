import React, { useState, useEffect } from "react";
import ReviewStars from "../UI/ReviewStars";
import Spinner from "../UI/Spinner";

let initial = true;
function Reviews({ productId }) {
  const [loadingState, setLoadingState] = useState("idle");
  const [reviews, setReviews] = useState([]);
  const [sort, setSort] = useState(false);

  const fetchReviews = async () => {
    try {
      setLoadingState("loading");
      const response = await fetch(
        `/api/products/review/${productId}?sort=${sort}`
      );
      if (!response.ok) throw new Error("Could not fetch reviews");
      const data = await response.json();
      setReviews(data.data.reviews);
      setLoadingState("idle");
    } catch (error) {
      setLoadingState("fail");
    }
  };

  useEffect(() => {
    if (!initial) {
      fetchReviews();
    }

    initial = false;
  }, [sort]);

  if (!sort)
    return (
      <button className="link" onClick={() => setSort("-date")}>
        See product reviews
      </button>
    );

  if (loadingState === "loading")
    return <Spinner className="mt-md w-[3rem] h-[3rem] mx-auto" />;

  if (loadingState === "fail")
    return <h3 className="">Could not fetch reviews</h3>;

  if (loadingState === "idle" && !reviews.length)
    return <h3 className="">No reviews yet!</h3>;

  return (
    <div>
      <div className="flex justify-between items-center mb-md">
        <h2>Reviews ({reviews.length})</h2>
        <div className="relative">
          <select
            name="quantity"
            id="quantity"
            className="p-xs pr-[4rem] self-start border border-black"
            onChange={(event) => setSort(event.target.value)}
            value={sort}
          >
            <option value="-date">Newest</option>
            <option value="date">Oldest</option>
            <option value="-rating">Highest Rated</option>
            <option value="rating">Lowest Rated</option>
          </select>

          {/* Arrow */}
          <svg
            width="13"
            height="7"
            viewBox="0 0 13 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`
          } w-[1.5rem] h-[1.5rem] absolute top-1/2 right-sm -translate-y-1/2`}
          >
            <path
              d="M0.727662 0.0535889L0.0531311 0.72812L5.91251 6.58749L6.24954 6.90953L6.58657 6.58749L12.4459 0.72812L11.7719 0.0540574L6.25001 5.57593L0.727662 0.0535889Z"
              fill="black"
            />
          </svg>
        </div>
      </div>
      {reviews.map((review) => (
        <div key={review._id} className="mb-sm">
          {/* Head */}
          <div className="flex items-center gap-[1.7rem]">
            <h3 className="mr-auto">{review.name}</h3>
            <ReviewStars ratingsAverage={review.rating} />
            <span className="w-[4px] h-[4px] rounded-full bg-black">
              &nbsp;
            </span>
            <span>
              {new Date(review.date).toLocaleDateString("en-US", {
                month: "long",
                day: "2-digit",
              })}
            </span>
          </div>
          <p className="">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default Reviews;
