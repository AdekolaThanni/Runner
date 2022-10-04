import React, { useRef } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { Await, useAsyncValue, useLoaderData } from "react-router-dom";
import Reviews from "../components/layout/Reviews";
import ProductsSkeletons from "../components/skeletons/ProductsSkeleton";
import ImageGallery from "../components/UI/ImageGallery";
import ProductAction from "../components/UI/ProductAction";
import ReviewStars from "../components/UI/ReviewStars";
import { formActions } from "../stores/appStore/formReducer";

function ProductData() {
  const product = useAsyncValue();
  const detailsRef = useRef();
  const dispatch = useDispatch();
  return (
    <>
      <Helmet>
        <title>{product.name}</title>
        <meta name="description" content={product.details.description} />
      </Helmet>
      {/* Top */}
      <div className="">
        <div className="flex items-start gap-[1.5rem] lg:gap-[3.5rem] lg:flex-col max-w-[138rem] overflow-x-hidden">
          <ImageGallery images={product.images} />
          <div className="w-[45rem] xl:w-[40rem] shrink-0 ml-auto lg:ml-0 lg:w-full">
            <h1 className="">{product.name}</h1>
            <p className="capitalize font-semibold text-[1.7rem]">
              {product.brand} - {product.category}
            </p>
            <p className="text-lg font-bold mt-xs">
              ${product.price.toFixed(2)}
            </p>
            <ProductAction productId={product._id} />
            <p className="text-darkGray">
              {product.details.description.slice(0, 300)}...
            </p>
            <div className="flex items-center my-md gap-md">
              <span className="font-bold">
                Reviews ({product.ratingsCount})
              </span>
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
              <button
                onClick={() =>
                  dispatch(
                    formActions.showForm({
                      type: "review",
                      payload: product._id,
                    })
                  )
                }
                className="link"
              >
                Write review
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom */}
      <div className="mt-[12rem] max-w-[65rem]" ref={detailsRef} id="details">
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
      <Await
        resolve={data.product}
        errorElement={
          <h1 className="text-brown text-[5rem] text-center mt-[10rem]">
            Could not get product
          </h1>
        }
      >
        <ProductData />
      </Await>
    </React.Suspense>
  );
}

export default Product;
