import React from "react";
import BagIcon from "../UI/BagIcon";
import Logo from "../UI/Logo";
import SearchBar from "../UI/SearchBar";
import UserIcon from "../UI/UserIcon";
import WishlistIcon from "../UI/WishlistIcon";

function Header() {
  return (
    <header className="bg-black text-white px-[5rem] py-[2rem] flex justify-between items-center">
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
