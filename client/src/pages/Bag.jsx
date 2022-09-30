import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import Divider from "../components/UI/Divider";
import Spinner from "../components/UI/Spinner";
import useBag from "../hooks/useBag";
import { formActions } from "../stores/appStore/formReducer";
import ProductInBag from "../components/layout/ProductInBag";

function Bag() {
  const { bag, getBag, fetchState, amount } = useBag();
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    setTotalPrice(
      bag.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0)
    );
  }, [bag]);

  useEffect(() => {
    getBag();
  }, []);

  return (
    <div className="">
      <Helmet>
        <title>{`Runner | Bag (${amount})`}</title>
      </Helmet>
      {fetchState === "success" && !bag.length ? (
        <h1 className="text-brown text-[5rem] text-center mt-[10rem]">
          Your bag is empty!
        </h1>
      ) : (
        <>
          <h1 className="">My Shopping Bag ({amount})</h1>
          <Divider className="mt-lg" />
          <div className="flex min-h-[90vh]">
            <div className="w-[85rem]">
              {fetchState === "loading" ? (
                <Spinner className="w-[7rem] h-[7rem] mx-auto mt-xl" />
              ) : fetchState === "fail" ? (
                <h2 className="mt-xl">An error occured</h2>
              ) : (
                bag.map(({ product, quantity }, index) => (
                  <React.Fragment key={product._id}>
                    <ProductInBag product={product} quantity={quantity} />
                    {index !== bag.length - 1 && <Divider />}
                  </React.Fragment>
                ))
              )}
            </div>
            <div className="border-l border-l-grayFaint ml-xl pl-lg pt-[3rem] z-50 bg-white flex-grow">
              <h2>Summary</h2>
              <div className="flex items-center justify-between text-[1.8rem] mt-md text-darkGray">
                Subtotal
                <span className="font-bold">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-[1.8rem] mt-sm text-darkGray">
                Estimated Delivery and Handling
                <span className="font-bold">$00.00</span>
              </div>
              <div className="flex items-center justify-between text-[1.8rem] my-lg border-y border-y-grayFaint py-md">
                Total
                <span className="font-bold">
                  ${(totalPrice + 0).toFixed(2)}
                </span>
              </div>
              <button
                onClick={() =>
                  dispatch(formActions.showForm({ type: "address" }))
                }
                className="primary-button w-full"
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
          <Divider className="" />
        </>
      )}
    </div>
  );
}

export default Bag;
