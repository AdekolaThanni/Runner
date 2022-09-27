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

      if (!response.ok) throw new Error("Could not get your bag");

      const data = await response.json();
      if (!data.message) {
        dispatch(bagActions.updateBag(data.data.cart.products));
      } else {
        dispatch(bagActions.updateBag([]));
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
      if (data.data.cart.products.length === formerLength) {
        throw new Error("Product is in bag already");
      }
      dispatch(bagActions.updateBag(data.data.cart.products));
      dispatch(
        popupActions.showPopup({
          type: "success",
          message: "Product added to bag successfully",
        })
      );
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

  const updateBag = async (productId, quantity) => {
    try {
      setFetchState("loading");
      const response = await fetch(`/api/cart/${productId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quantity,
        }),
      });

      if (!response.ok) throw new Error("Product could not be updated");

      const data = await response.json();

      if (data.message) throw new Error(data.message);
      setFetchState("success");
      dispatch(
        popupActions.showPopup({
          type: "success",
          message: "Bag has been updated successfully",
        })
      );
      await getBag();
    } catch (error) {
      setFetchState("fail");
      dispatch(popupActions.showPopup({ type: error, message: error.message }));
    }
  };

  const deleteFromBag = async (productId) => {
    try {
      setFetchState("loading");
      const response = await fetch(`/api/cart/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Product could not be deleted");
      setFetchState("success");
      dispatch(
        popupActions.showPopup({
          type: "success",
          message: "Product removed from bag successfully",
        })
      );
      await getBag();
    } catch (error) {
      setFetchState("fail");
      dispatch(popupActions.showPopup({ type: error, message: error.message }));
    }
  };

  return {
    getBag,
    amount,
    addToBag,
    fetchState,
    bag,
    updateBag,
    deleteFromBag,
  };
};

export default useBag;
