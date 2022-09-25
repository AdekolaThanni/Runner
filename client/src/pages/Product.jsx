import React, { useRef } from "react";
import { Helmet } from "react-helmet";
import { Await, useAsyncValue, useLoaderData } from "react-router-dom";
import Reviews from "../components/layout/Reviews";
import ProductsSkeletons from "../components/skeletons/ProductsSkeleton";
import ImageGallery from "../components/UI/ImageGallery";
import ProductAction from "../components/UI/ProductAction";
import ReviewStars from "../components/UI/ReviewStars";

function ProductData() {
  const product = useAsyncValue();
  const detailsRef = useRef();
  return (
    <>
      <Helmet>
        <title>{product.name}</title>
        <meta name="description" content={product.details.description} />
      </Helmet>
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
            <button
              className="link"
              onClick={() => {
                const { top, left } =
                  detailsRef.current.getBoundingClientRect();
                window.scrollTo({
                  left,
                  top,
                  behavior: "smooth",
                });
              }}
            >
              View full details
            </button>
            <button className="link">Write review</button>
          </div>
        </div>
      </div>
      {/* Bottom */}
      <div className="mt-[12rem] w-[65rem]" ref={detailsRef} id="details">
        <h2>Product Story</h2>
        <p className="text-darkGray border-b border-grayFaint pb-[3rem] mb-[3rem]">
          {product.details.description}
        </p>
        <h2>Features</h2>
        <ul className="list-disc list-inside border-b border-grayFaint pb-[3rem] mb-[3rem]">
          {product.details.features.map((feature) => (
            <li>{feature}</li>
          ))}
        </ul>
        <Reviews productId={product._id} />
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
