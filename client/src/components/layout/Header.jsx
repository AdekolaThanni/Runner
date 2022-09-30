import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import useBag from "../../hooks/useBag";
import { authActions } from "../../stores/appStore/authReducer";
import { popupActions } from "../../stores/appStore/popupReducer";
import BagIcon from "../UI/BagIcon";
import Logo from "../UI/Logo";
import SearchBar from "../UI/SearchBar";
import UserIcon from "../UI/UserIcon";
import WishlistIcon from "../UI/WishlistIcon";

function Header() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { deleteBag } = useBag();
  const getLoggedInState = async () => {
    try {
      const response = await fetch("/api/users/login");

      if (!response.ok) throw new Error();

      const data = await response.json();
      dispatch(authActions.setLoggedInState({ loggedIn: data.data }));
    } catch (error) {
      dispatch(authActions.setLoggedInState({ loggedIn: false }));
    }
  };

  useEffect(() => {
    getLoggedInState();
    if (searchParams.has("success")) {
      dispatch(
        popupActions.showPopup({
          type: "success",
          message:
            "Payment has been accepted, more information about your order will be sent to your telephone number.",
        })
      );
      setTimeout(deleteBag, 3000);
      navigate("/");
    }

    if (searchParams.has("canceled")) {
      dispatch(
        popupActions.showPopup({
          type: "error",
          message: "Payment Rejected, try again later",
        })
      );
      navigate("/");
    }
  }, []);
  return (
    <header className="bg-black text-white px-[5rem] py-[2rem] flex justify-between items-center mb-xl">
      <Logo />
      <div className="flex items-center gap-[2.5rem]">
        <SearchBar />
        <WishlistIcon />
        <BagIcon />
        <UserIcon />
      </div>
    </header>
  );
}

export default Header;
