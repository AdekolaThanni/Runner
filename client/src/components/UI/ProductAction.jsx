import React, { useRef } from "react";

function ProductAction({ productId }) {
  const quantityRef = useRef();

  const addToBag = () => {};

  const addToWishlist = () => {};

  return (
    <div className="flex flex-col gap-sm border-y border-y-grayFaint py-lg my-lg">
      <select
        ref={quantityRef}
        name="quantity"
        id="quantity"
        className="w-[5rem] h-[5rem] self-start border border-black"
      >
        <option value="1" disabled>
          Qty
        </option>
        <option value="1" selected>
          1
        </option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>

      <button onclick={addToBag} className="primary-button">
        Add To Bag
      </button>
      <button onclick={addToWishlist} className="secondary-button">
        Add To Wishlist
      </button>
    </div>
  );
}

export default ProductAction;
