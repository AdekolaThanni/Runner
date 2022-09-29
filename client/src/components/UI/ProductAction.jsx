import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useBag from "../../hooks/useBag";
import useWishlist from "../../hooks/useWishlist";
import { formActions } from "../../stores/appStore/formReducer";
import Spinner from "./Spinner";

function ProductAction({ productId }) {
  const quantityRef = useRef();
  const dispatch = useDispatch();
  const { fetchState, addToBag } = useBag();
  const { fetchState: fetchWishlistState, addToWishlist } = useWishlist();
  const loggedIn = useSelector((state) => state.authReducer.loggedIn);

  const addToWishlistHandler = () => {
    if (!loggedIn) {
      return dispatch(formActions.showForm({ type: "login" }));
    }

    addToWishlist(productId);
  };

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

      <button
        onClick={() => addToBag(productId, quantityRef.current.value)}
        className={`primary-button ${fetchState === "loading" && "opacity-70"}`}
      >
        {fetchState === "loading" ? (
          <Spinner className="w-[2.5rem] h-[2.5rem]" />
        ) : (
          <span className="flex items-center">Add To Bag</span>
        )}
      </button>
      <button
        onClick={addToWishlistHandler}
        className={`secondary-button group ${
          fetchWishlistState === "loading" && "bg-black"
        }`}
      >
        {fetchWishlistState === "loading" ? (
          <Spinner className="w-[2.5rem] h-[2.5rem]" />
        ) : (
          <span className="flex items-center gap-xs group">
            Add To Wishlist{" "}
            <svg
              width="23"
              height="21"
              viewBox="0 0 23 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.5 20.5208C11.3466 20.5203 11.1976 20.4691 11.0764 20.375C7.21529 17.375 4.55556 14.7917 2.69445 12.243C0.319454 8.9861 -0.222213 5.97916 1.08334 3.30555C2.0139 1.39582 4.68751 -0.166675 7.81251 0.743047C9.30247 1.17342 10.6024 2.09637 11.5 3.3611C12.3976 2.09637 13.6975 1.17342 15.1875 0.743047C18.3056 -0.152786 20.9861 1.39582 21.9167 3.30555C23.2222 5.97916 22.6806 8.9861 20.3056 12.243C18.4445 14.7917 15.7847 17.375 11.9236 20.375C11.8024 20.4691 11.6534 20.5203 11.5 20.5208ZM6.03473 1.87499C5.29116 1.84605 4.55374 2.02016 3.90164 2.37864C3.24954 2.73711 2.70737 3.26641 2.33334 3.90971C1.25695 6.11805 1.74306 8.57638 3.81945 11.4167C6.0261 14.2629 8.61002 16.7954 11.5 18.9444C14.3895 16.7975 16.9734 14.2674 19.1806 11.4236C21.2639 8.57638 21.7431 6.11805 20.6667 3.91666C19.9722 2.52777 17.8889 1.4236 15.5695 2.07638C14.8257 2.29617 14.1363 2.66924 13.5454 3.17157C12.9546 3.6739 12.4755 4.29437 12.1389 4.99305C12.0866 5.12042 11.9976 5.22935 11.8832 5.30602C11.7688 5.38269 11.6342 5.42362 11.4965 5.42362C11.3588 5.42362 11.2243 5.38269 11.1099 5.30602C10.9955 5.22935 10.9065 5.12042 10.8542 4.99305C10.5201 4.29262 10.0418 3.67071 9.45063 3.16806C8.85942 2.66542 8.16866 2.29339 7.42362 2.07638C6.97221 1.94527 6.50479 1.87749 6.03473 1.87499Z"
                className="stroke-black fill-black group-hover:stroke-white group-hover:fill-white duration-200"
              />
            </svg>
          </span>
        )}
      </button>
    </div>
  );
}

export default ProductAction;
