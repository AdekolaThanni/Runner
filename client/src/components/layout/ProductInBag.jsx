import { useState } from "react";
import { useDispatch } from "react-redux";
import Image from "../UI/Image";
import { confirmationActions } from "../../stores/appStore/confirmationReducer";
import useBag from "../../hooks/useBag";
import Spinner from "../UI/Spinner";
import { Link } from "react-router-dom";

function ProductInBag({ product, quantity }) {
  const [quantityVal, setQuantityVal] = useState(quantity);
  const dispatch = useDispatch();
  const { updateBag, deleteFromBag, fetchState } = useBag();

  return (
    <div className="relative flex gap-md my-lg xl:mb-[2rem]  xl:flex-col xl:w-[40rem] xl:gap-lg lg:gap-md   lg:flex-row lg:w-full xs:mb-[2rem]  xs:flex-col xs:w-full xs:gap-lg">
      {fetchState === "loading" && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <Spinner className="w-[4rem] h-[4rem]" />
        </div>
      )}
      <Link
        className={`w-[30rem] h-[25rem] xs:h-[35rem] xl:w-full lg:w-[30rem] xs:w-full ${
          fetchState === "loading" && "opacity-10"
        }`}
        to={`/products/${product._id}`}
      >
        <Image
          src={product.images?.[0]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </Link>
      <div className={`flex-grow ${fetchState === "loading" && "opacity-10"}`}>
        <div className="flex justify-between">
          <h3>{product.name}</h3>
          <p className="font-semibold">
            ${(quantity * product.price).toFixed(2)}
          </p>
        </div>
        <p className="capitalize mb-md">
          {product.brand} - {product.category}
        </p>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-sm">
            Quantity:
            <div className="relative">
              <select
                name="quantity"
                id="quantity"
                className="p-xs pr-[4rem] self-start border border-black cursor-pointer"
                onChange={(event) => {
                  if (quantityVal === event.target.value) return;
                  setQuantityVal(event.target.value);
                  updateBag(product._id, event.target.value);
                }}
                value={quantityVal}
              >
                <option value="1">1</option>
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
          </span>
          <svg
            width="21"
            height="26"
            viewBox="0 0 21 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() =>
              dispatch(
                confirmationActions.askConfirmation({
                  question:
                    "Are you sure you want to remove this product from your bag?",
                  execution: () => deleteFromBag(product._id),
                })
              )
            }
            className="cursor-pointer"
          >
            <path
              d="M1.625 8.3125V23.9375C1.625 24.7969 2.32812 25.5 3.1875 25.5H17.25C18.1094 25.5 18.8125 24.7969 18.8125 23.9375V8.3125H1.625ZM6.3125 22.375H4.75V11.4375H6.3125V22.375ZM9.4375 22.375H7.875V11.4375H9.4375V22.375ZM12.5625 22.375H11V11.4375H12.5625V22.375ZM15.6875 22.375H14.125V11.4375H15.6875V22.375ZM19.2031 3.625H14.125V1.67188C14.1238 1.36145 13.9999 1.0641 13.7804 0.844598C13.5609 0.625096 13.2635 0.501234 12.9531 0.5L7.48438 0.5C7.17395 0.501234 6.8766 0.625096 6.6571 0.844598C6.4376 1.0641 6.31373 1.36145 6.3125 1.67188V3.625H1.23438C0.923828 3.62582 0.626236 3.74955 0.406645 3.96915C0.187055 4.18874 0.0633248 4.48633 0.0625 4.79688V6.75H20.375V4.79688C20.3742 4.48633 20.2504 4.18874 20.0309 3.96915C19.8113 3.74955 19.5137 3.62582 19.2031 3.625ZM12.5625 3.625H7.875V2.08281H12.5625V3.625Z"
              className="fill-red-900"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default ProductInBag;
