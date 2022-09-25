import React, { useRef } from "react";

function ProductAction({ productId }) {
  //   const [dropdownVisible, setDropdownVisible] = useState(false);
  const quantityRef = useRef();

  const addToBag = () => {};

  const addToWishlist = () => {};

  return (
    <div className="flex flex-col gap-sm border-y border-y-grayFaint py-lg my-lg">
      <div className="relative w-[15rem] ">
        <select
          ref={quantityRef}
          //   onClick={() => setDropdownVisible((prevState) => !prevState)}
          name="quantity"
          id="quantity"
          className="w-full h-[5rem] self-start border border-black text-center"
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
        {/* Arrow */}
        <svg
          width="13"
          height="7"
          viewBox="0 0 13 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`
          } w-[1.5rem] h-[1.5rem] absolute top-1/2 right-sm -translate-y-1/2`}
        >
          <path
            d="M0.727662 0.0535889L0.0531311 0.72812L5.91251 6.58749L6.24954 6.90953L6.58657 6.58749L12.4459 0.72812L11.7719 0.0540574L6.25001 5.57593L0.727662 0.0535889Z"
            fill="black"
          />
        </svg>
      </div>

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
