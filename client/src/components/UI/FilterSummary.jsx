import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { queryActions } from "../../stores/queryStore/queryReducer";

function FilterSummary() {
  const dispatch = useDispatch();
  const query = useSelector((state) => state);
  const checkQueryLength = (query) =>
    Object.keys(query).flatMap((filter) => query[filter]).length;

  return (
    !!checkQueryLength(query) && (
      <div className="flex px-[5rem] gap-xs mt-sm">
        {Object.keys(query)
          .flatMap((filter) => {
            const value = query[filter];
            return value.map((val) => [filter, val]);
          })
          .map(([filter, option], index) => (
            <div
              key={index}
              className="flex items-center gap-xs p-xs text-[1.3rem] font-bold capitalize bg-lightGray"
            >
              <span className="cursor-pointer">
                {filter}: {option}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2.5rem"
                height="2.5rem"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
                className="cursor-pointer"
                onClick={() =>
                  dispatch(queryActions.removeFromFilters([filter, option]))
                }
              >
                <path
                  fill="currentColor"
                  d="M15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z"
                />
              </svg>
            </div>
          ))}

        <div
          onClick={() => dispatch(queryActions.clearQuery())}
          className="flex items-center gap-xs p-xs text-[1.3rem] font-bold capitalize"
        >
          <span className="cursor-pointer">Clear</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2.5rem"
            height="2.5rem"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
            className="cursor-pointer"
          >
            <path
              fill="currentColor"
              d="M15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z"
            />
          </svg>
        </div>
      </div>
    )
  );
}

export default FilterSummary;
