import React, { useState } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";

function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("search"));
  const navigate = useNavigate();
  const location = useLocation();

  const searchFilter = (searchText) => {
    searchParams.delete("page");
    if (!searchText) {
      searchParams.delete("search");
    } else {
      searchParams.set("search", searchText);
    }
    if (location.pathname === "/") {
      setSearchParams(searchParams.toString());
    } else {
      navigate(`/?${searchParams.toString()}`);
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        searchFilter(searchValue);
      }}
      className="border border-darkGray flex items-center px-xs gap-sm"
    >
      {/* Search Icon */}
      <div className="">
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block"
        >
          <path
            d="M18.3469 16.1625C19.8598 14.0979 20.5375 11.5382 20.2442 8.99552C19.951 6.4528 18.7085 4.11457 16.7653 2.44861C14.8221 0.782663 12.3215 -0.0881455 9.7638 0.0104063C7.20613 0.108958 4.77997 1.1696 2.97073 2.98014C1.16149 4.79068 0.102578 7.21759 0.0058564 9.77534C-0.0908652 12.3331 0.781732 14.833 2.44907 16.775C4.11642 18.7171 6.45554 19.9579 8.99847 20.2493C11.5414 20.5408 14.1006 19.8613 16.1641 18.3468H16.1625C16.2094 18.4093 16.2594 18.4687 16.3156 18.5265L22.3312 24.5422C22.6242 24.8353 23.0217 25.0001 23.4362 25.0003C23.8506 25.0004 24.2482 24.8359 24.5414 24.5429C24.8346 24.25 24.9994 23.8525 24.9995 23.438C24.9997 23.0235 24.8352 22.626 24.5422 22.3328L18.5266 16.3172C18.4707 16.2606 18.4106 16.2084 18.3469 16.1609V16.1625ZM18.75 10.1562C18.75 11.2848 18.5277 12.4023 18.0958 13.4449C17.664 14.4876 17.031 15.4349 16.2329 16.2329C15.4349 17.0309 14.4876 17.6639 13.4449 18.0958C12.4023 18.5277 11.2848 18.75 10.1562 18.75C9.0277 18.75 7.91021 18.5277 6.86756 18.0958C5.82492 17.6639 4.87755 17.0309 4.07955 16.2329C3.28155 15.4349 2.64854 14.4876 2.21666 13.4449C1.78478 12.4023 1.5625 11.2848 1.5625 10.1562C1.5625 7.87702 2.46791 5.69117 4.07955 4.07953C5.69119 2.46788 7.87705 1.56247 10.1562 1.56247C12.4355 1.56247 14.6213 2.46788 16.2329 4.07953C17.8446 5.69117 18.75 7.87702 18.75 10.1562Z"
            className="fill-darkGray"
          />
        </svg>
      </div>
      <input
        type="text"
        className="bg-transparent w-[20rem] h-[4rem] placeholder:text-darkGray focus:outline-none uppercase"
        placeholder="SEARCH RUNNER"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
    </form>
  );
}

export default SearchBar;
