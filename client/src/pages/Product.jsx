import React from "react";
import { Await, useAsyncValue, useLoaderData } from "react-router-dom";
import ProductsSkeletons from "../components/skeletons/ProductsSkeleton";
import ImageGallery from "../components/UI/ImageGallery";
import ProductAction from "../components/UI/ProductAction";
import ReviewStars from "../components/UI/ReviewStars";

function ProductData() {
  const product = useAsyncValue();

  return (
    <>
      {/* Top */}
      <div className="flex items-start gap-[5rem]">
        <ImageGallery images={product.images} />
        <div className="w-[45rem]">
          <h1 className="">{product.name}</h1>
          <p className="capitalize font-semibold text-[1.7rem]">
            {product.brand} - Men
          </p>
          <p className="text-lg font-bold mt-xs">${product.price.toFixed(2)}</p>
          <ProductAction productId={product._id} />
          <p className="text-darkGray">
            {product.details.description.slice(0, 300)}...
          </p>
          <div className="flex items-center my-md gap-md">
            <span className="font-bold">Reviews ({product.ratingsCount})</span>
            <ReviewStars
              ratingsCount={product.ratingsCount}
              ratingsAverage={product.ratingsAverage}
            />
          </div>
          <div className="flex justify-between items-center">
            <button className="link">View full details</button>
            <button className="link">Write review</button>
          </div>
        </div>
      </div>
    </>
  );
}

function Product() {
  const data = useLoaderData();

  return (
    <React.Suspense fallback={<ProductsSkeletons />}>
      <Await resolve={data.product}>
        <ProductData />
      </Await>
    </React.Suspense>
  );
}

export default Product;
