import React, { useEffect, useState } from "react";
import Image from "../UI/Image";
import ReviewStars from "../UI/ReviewStars";

function WishlistController({ initialStatus }) {
  const [status, setStatus] = useState(initialStatus);

  useEffect(() => {
    setStatus(initialStatus);
  }, [initialStatus]);

  return !status ? (
    <svg
      width="23"
      height="21"
      viewBox="0 0 23 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[2rem] h-[2rem] absolute top-[3rem] right-[3rem]"
    >
      <path
        d="M11.5 20.5208C11.3466 20.5203 11.1976 20.4691 11.0764 20.375C7.21529 17.375 4.55556 14.7917 2.69445 12.243C0.319454 8.9861 -0.222213 5.97916 1.08334 3.30555C2.0139 1.39582 4.68751 -0.166675 7.81251 0.743047C9.30247 1.17342 10.6024 2.09637 11.5 3.3611C12.3976 2.09637 13.6975 1.17342 15.1875 0.743047C18.3056 -0.152786 20.9861 1.39582 21.9167 3.30555C23.2222 5.97916 22.6806 8.9861 20.3056 12.243C18.4445 14.7917 15.7847 17.375 11.9236 20.375C11.8024 20.4691 11.6534 20.5203 11.5 20.5208ZM6.03473 1.87499C5.29116 1.84605 4.55374 2.02016 3.90164 2.37864C3.24954 2.73711 2.70737 3.26641 2.33334 3.90971C1.25695 6.11805 1.74306 8.57638 3.81945 11.4167C6.0261 14.2629 8.61002 16.7954 11.5 18.9444C14.3895 16.7975 16.9734 14.2674 19.1806 11.4236C21.2639 8.57638 21.7431 6.11805 20.6667 3.91666C19.9722 2.52777 17.8889 1.4236 15.5695 2.07638C14.8257 2.29617 14.1363 2.66924 13.5454 3.17157C12.9546 3.6739 12.4755 4.29437 12.1389 4.99305C12.0866 5.12042 11.9976 5.22935 11.8832 5.30602C11.7688 5.38269 11.6342 5.42362 11.4965 5.42362C11.3588 5.42362 11.2243 5.38269 11.1099 5.30602C10.9955 5.22935 10.9065 5.12042 10.8542 4.99305C10.5201 4.29262 10.0418 3.67071 9.45063 3.16806C8.85942 2.66542 8.16866 2.29339 7.42362 2.07638C6.97221 1.94527 6.50479 1.87749 6.03473 1.87499Z"
        className={`fill-black stroke-black`}
      />
    </svg>
  ) : (
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
      />
    </svg>
  );
}

function SingleProduct({ product }) {
  return (
    <div className="hover:-translate-y-sm hover:scale-105 cursor-pointer duration-200 ease-out w-full font-semibold flex flex-col space-y-xs relative">
      <WishlistController initialStatus={false} />
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
