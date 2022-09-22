import React from "react";

function ReviewStars({ ratingsCount, ratingsAverage, starClass }) {
  const emptyStar = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 16 16"
      className={starClass}
    >
      <path
        fill="currentColor"
        fill-rule="evenodd"
        d="M9.595 6.252L8 1L6.405 6.252H1l4.373 3.4L3.75 15L8 11.695L12.25 15l-1.623-5.348L15 6.252H9.595zm-7.247.47H6.72L8 2.507L6.72 6.722H2.348zm3.537 2.75l-1.307 4.305l1.307-4.305zm7.767-2.75H9.28h4.372zm-8.75.9h2.366L8 5.214l.732 2.41h2.367l-1.915 1.49l.731 2.409L8 10.032l-1.915 1.49l.731-2.41l-1.915-1.49z"
        clip-rule="evenodd"
      />
    </svg>
  );
  const filledStar = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 16 16"
      className={starClass}
    >
      <path
        className="fill-black"
        fill-rule="evenodd"
        d="M9.595 6.252L8 1L6.405 6.252H1l4.373 3.4L3.75 15L8 11.695L12.25 15l-1.623-5.348L15 6.252H9.595z"
        clip-rule="evenodd"
      />
    </svg>
  );
  const halfFilledStar = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 16 16"
      className={starClass}
    >
      <path
        fill="currentColor"
        fill-rule="evenodd"
        d="M6.405 6.252L8 1l1.595 5.252H15l-4.373 3.4L12.25 15L8 11.695L3.75 15l1.623-5.348L1 6.252h5.405zM8 10.032l1.915 1.49l-.731-2.41l1.915-1.49H8.732L8 5.214v4.82zm0-7.525zm5.652 4.215H9.28h4.372z"
        clip-rule="evenodd"
      />
    </svg>
  );

  let ratings = [];

  while (ratingsAverage > 0) {
    if (ratingsAverage >= 1) {
      ratings.push(1);
    } else if (ratingsAverage > 0) {
      ratings.push(0.5);
    } else break;
    ratingsAverage -= 1;
  }

  while (ratings.length < 5) ratings.push(0);

  return (
    <div className="flex items-center">
      <div className="flex items-center">
        {ratings.map((rating) => {
          if (rating === 1) return filledStar;
          else if (rating === 0.5) return halfFilledStar;

          return emptyStar;
        })}
      </div>
      <span>({ratingsCount})</span>
    </div>
  );
}

export default ReviewStars;
