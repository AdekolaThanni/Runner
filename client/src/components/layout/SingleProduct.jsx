import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useWishlist from "../../hooks/useWishlist";
import Image from "../UI/Image";
import ReviewStars from "../UI/ReviewStars";

function WishlistController({ productId }) {
  const { wishlist, checkProductInWishlist } = useWishlist();
  const [status, setStatus] = useState(checkProductInWishlist(productId));
  useEffect(() => {
    setStatus(checkProductInWishlist(productId));
  }, [wishlist]);

  return (
    status && (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 1024 1024"
        className="w-[2rem] h-[2rem] absolute top-[3rem] right-[3rem]"
      >
        <path
          fill="currentColor"
          d="M923 283.6a260.04 260.04 0 0 0-56.9-82.8a264.4 264.4 0 0 0-84-55.5A265.34 265.34 0 0 0 679.7 125c-49.3 0-97.4 13.5-139.2 39c-10 6.1-19.5 12.8-28.5 20.1c-9-7.3-18.5-14-28.5-20.1c-41.8-25.5-89.9-39-139.2-39c-35.5 0-69.9 6.8-102.4 20.3c-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 0 0-56.9 82.8c-13.9 32.3-21 66.6-21 101.9c0 33.3 6.8 68 20.3 103.3c11.3 29.5 27.5 60.1 48.2 91c32.8 48.9 77.9 99.9 133.9 151.6c92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3c56-51.7 101.1-102.7 133.9-151.6c20.7-30.9 37-61.5 48.2-91c13.5-35.3 20.3-70 20.3-103.3c.1-35.3-7-69.6-20.9-101.9z"
          className="fill-brown"
        />
      </svg>
    )
  );
}

function SingleProduct({ product }) {
  return (
    <Link
      to={`/products/${product._id}`}
      className="hover:-translate-y-sm hover:scale-105 cursor-pointer duration-200 ease-out font-semibold flex flex-col space-y-xs relative"
    >
      <WishlistController productId={product._id} />
      <div className="h-[35rem]">
        <Image
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <p className="">{product.name}</p>
      <p>${product.price.toFixed(2)}</p>
      <ReviewStars
        ratingsCount={product.ratingsCount}
        ratingsAverage={product.ratingsAverage}
      />
    </Link>
  );
}

export default SingleProduct;
