import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../stores/appStore/authReducer";
import BagIcon from "../UI/BagIcon";
import Logo from "../UI/Logo";
import SearchBar from "../UI/SearchBar";
import UserIcon from "../UI/UserIcon";
import WishlistIcon from "../UI/WishlistIcon";

function Header() {
  const dispatch = useDispatch();
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
