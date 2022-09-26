import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bagActions } from "../stores/appStore/bagReducer";
import { popupActions } from "../stores/appStore/popupReducer";

const useBag = () => {
  const [fetchState, setFetchState] = useState();
  const bag = useSelector((state) => state.bagReducer);
  const amount = useSelector((state) => state.bagReducer.length);
  const dispatch = useDispatch();

  const getBag = async () => {
    try {
      setFetchState("loading");
      const response = await fetch("/api/cart");

      if (!response.ok) throw new Error();

      const data = await response.json();
      if (data.message) return;
      dispatch(bagActions.updateBag(data.data.cart.products));
      setFetchState("success");
    } catch (error) {
      setFetchState("fail");
      dispatch(
        popupActions.showPopup({
          type: "error",
          message: error.message,
        })
      );
    }
  };

  const addToBag = async (productId, quantity) => {
    try {
      setFetchState("loading");
      const response = await fetch(`/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: productId,
          quantity,
        }),
      });

      if (!response.ok)
        throw new Error("Please check your internet connection...");

      const formerLength = amount;
      const data = await response.json();
      dispatch(bagActions.updateBag(data.data.cart.products));
      if (data.data.cart.products.length === formerLength) {
        throw new Error("Product is in bag already");
      }

      setFetchState("success");
    } catch (error) {
      setFetchState("fail");
      dispatch(
        popupActions.showPopup({
          type: "error",
          message: error.message,
        })
      );
    }
  };

  return {
    getBag,
    amount,
    addToBag,
    fetchState,
    bag,
  };
};

export default useBag;
