import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { popupActions } from "../stores/appStore/popupReducer";
import { wishlistActions } from "../stores/appStore/wishlistReducer";

const useWishlist = () => {
  const [fetchState, setFetchState] = useState();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlistReducer);

  const getWishlist = async () => {
    const response = await fetch(`/api/users/wishlist`);
    if (!response.ok) throw new Error("An error occured");
    const data = await response.json();
    dispatch(wishlistActions.updateWishlist(data.data.wishlist));
  };

  const addToWishlist = async (productId) => {
    try {
      setFetchState("loading");
      const response = await fetch(`/api/users/wishlist/${productId}`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Could not add product to wishlist");
      await getWishlist();
      setFetchState("success");
      dispatch(
        popupActions.showPopup({
          type: "success",
          message: "Added to your wishlist successfully",
        })
      );
    } catch (error) {
      setFetchState("fail");
      dispatch(
        popupActions.showPopup({ type: "error", message: error.message })
      );
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      setFetchState("loading");
      const response = await fetch(`/api/users/wishlist/${productId}`, {
        method: "DELETE",
      });
      if (!response.ok)
        throw new Error("Could not delete product from wishlist");
      await getWishlist();
      setFetchState("success");
      dispatch(
        popupActions.showPopup({
          type: "success",
          message: "Product removed from your wishlist successfully",
        })
      );
    } catch (error) {
      setFetchState("fail");
      dispatch(
        popupActions.showPopup({ type: "error", message: error.message })
      );
    }
  };

  const checkProductInWishlist = (productId) =>
    wishlist?.some((product) => product._id === productId);

  return {
    wishlist,
    getWishlist,
    fetchState,
    addToWishlist,
    removeFromWishlist,
    checkProductInWishlist,
  };
};

export default useWishlist;
