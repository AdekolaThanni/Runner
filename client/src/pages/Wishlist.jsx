import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SingleProduct from "../components/layout/SingleProduct";
import Divider from "../components/UI/Divider";
import Spinner from "../components/UI/Spinner";
import useWishlist from "../hooks/useWishlist";
import { confirmationActions } from "../stores/appStore/confirmationReducer";
import { formActions } from "../stores/appStore/formReducer";

function WishlistProduct({ product }) {
  const dispatch = useDispatch();
  const { removeFromWishlist, fetchState } = useWishlist();

  return (
    <div className="flex flex-col">
      <SingleProduct key={product._id} product={product} />
      <button
        onClick={() => {
          dispatch(
            confirmationActions.askConfirmation({
              question:
                "Are you sure you want to remove this product from your wishlist",
              execution: () => {
                removeFromWishlist(product._id);
              },
            })
          );
        }}
        className="primary-button mt-md"
      >
        {fetchState === "loading" ? (
          <Spinner className="w-[2.5rem] h-[2.5rem]" />
        ) : (
          "Remove"
        )}
      </button>
    </div>
  );
}

function Wishlist() {
  const { wishlist } = useWishlist();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.authReducer.loggedIn);

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
      dispatch(formActions.showForm({ type: "login" }));
    }
  }, []);

  return (
    <div>
      <Helmet>
        <title>Wishlist</title>
      </Helmet>
      {wishlist.length ? (
        <>
          <h1 className="">My Wishlist ({wishlist.length})</h1>
          <Divider className="mt-lg" />
          <div className="grid lg:grid-cols-2 sm:gap-[2rem] grid-cols-3 gap-[5rem] my-md">
            {wishlist.map((product) => (
              <WishlistProduct product={product} />
            ))}
          </div>
        </>
      ) : (
        <h1 className="text-brown text-[5rem] text-center mt-[10rem]">
          Your wishlist is empty
        </h1>
      )}
    </div>
  );
}

export default Wishlist;
