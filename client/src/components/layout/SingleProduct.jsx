import React from "react";
import Image from "../UI/Image";
import ReviewStars from "../UI/ReviewStars";

function SingleProduct({ product }) {
  return (
    <div className="hover:-translate-y-sm hover:scale-105 cursor-pointer duration-200 ease-out w-full font-semibold flex flex-col space-y-xs">
      <Image
        src={product.images[0]}
        alt={product.name}
        className="w-full h-[35rem] object-cover"
      />
      <p className="">{product.name}</p>
      <p>${product.price.toFixed(2)}</p>
      <ReviewStars
        ratingsCount={product.ratingsCount}
        ratingsAverage={product.ratingsAverage}
      />
    </div>
  );
}

export default SingleProduct;
