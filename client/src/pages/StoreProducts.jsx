import React from "react";
import Dropdown from "../components/UI/Dropdown";
import { Provider } from "react-redux";
import queryStore from "../stores/queryStore/queryStore";
import FilterSummary from "../components/UI/FilterSummary";
import { Await, useLoaderData } from "react-router-dom";
import ProductsSkeleton from "../components/skeletons/ProductsSkeleton";
import Products from "../components/layout/Products";

function StoreProducts() {
  const data = useLoaderData();
  return (
    <Provider store={queryStore}>
      <h1>Shop All shoes</h1>

      {/* Filter box */}
      <div className="bg-white z-10 border-y border-grayFaint mt-lg px-[5rem] flex items-center py-[2rem] gap-lg sticky top-0 left-0">
        <svg
          width="21"
          height="22"
          viewBox="0 0 21 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 3.70834H5.16667M19.75 3.70834H9.33333M1 11H13.5M19.75 11H17.6667M1 18.2917H3.08333M19.75 18.2917H7.25"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            d="M7.24999 5.79167C8.40058 5.79167 9.33332 4.85893 9.33332 3.70833C9.33332 2.55774 8.40058 1.625 7.24999 1.625C6.0994 1.625 5.16666 2.55774 5.16666 3.70833C5.16666 4.85893 6.0994 5.79167 7.24999 5.79167Z"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            d="M15.5833 13.0833C16.7339 13.0833 17.6667 12.1506 17.6667 11C17.6667 9.8494 16.7339 8.91666 15.5833 8.91666C14.4327 8.91666 13.5 9.8494 13.5 11C13.5 12.1506 14.4327 13.0833 15.5833 13.0833Z"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            d="M5.16668 20.375C6.31727 20.375 7.25001 19.4423 7.25001 18.2917C7.25001 17.1411 6.31727 16.2083 5.16668 16.2083C4.01608 16.2083 3.08334 17.1411 3.08334 18.2917C3.08334 19.4423 4.01608 20.375 5.16668 20.375Z"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
        <Dropdown
          placeholder="Category"
          options={["Male", "Female", "Kids"]}
          type="checkbox"
        />
        <Dropdown
          placeholder="Brand"
          options={["Nike", "Puma", "Louis Vuitton", "Skechers", "New Balance"]}
          type="checkbox"
        />
        <Dropdown
          placeholder="Price"
          options={["$50 - $100", "$100 - $150"]}
          type="radio"
        />
        <Dropdown
          placeholder="Rating"
          options={["4 and Upwards", "3 and Upwards"]}
          type="radio"
        />
        <div className="ml-auto">
          <Dropdown
            placeholder="Sort By"
            options={["Price Low to High", "Price High to Low"]}
            type="radio"
          />
        </div>
      </div>
      {/* Filter summary */}
      <FilterSummary />
      <React.Suspense fallback={<ProductsSkeleton />}>
        <Await
          resolve={data.products}
          errorElement={<div className="text-lg">Error occured</div>}
        >
          {({ data: { products } }) => <Products products={products} />}
        </Await>
      </React.Suspense>
    </Provider>
  );
}

export default StoreProducts;
