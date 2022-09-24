import React, { useState, useEffect, useRef } from "react";
import useQuery from "../../hooks/useQuery";
import { useSelector } from "react-redux";

function Selection({ option, type, addOption, removeOption, initialActive }) {
  const [active, setActive] = useState(initialActive);

  useEffect(() => {
    setActive(initialActive);
  }, [initialActive]);

  const mark = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1rem"
      height="1rem"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 1024 1024"
    >
      <path
        className="fill-white"
        d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5L207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"
      />
    </svg>
  );
  const activeElement =
    type === "checkbox" ? (
      mark
    ) : (
      <span className="w-[1rem] h-[1rem] rounded-full bg-black">&nbsp;</span>
    );
  return (
    <div
      onClick={() => (active ? removeOption() : addOption())}
      className="flex items-center gap-[2rem] px-[3rem] py-[1rem] hover:bg-lightGray"
      htmlFor={option}
    >
      <input
        type="checkbox"
        id={option}
        value={option}
        checked={active && true}
        hidden
      />
      <div
        className={`flex items-center justify-center border border-darkGray h-[2rem] w-[2rem] ${
          type === "radio" && "rounded-full"
        } ${active && type === "checkbox" ? "bg-black" : "border-2"}`}
      >
        {active && activeElement}
      </div>

      <span className="text-[1.6rem] text-darkGray cursor-default">
        {option}
      </span>
    </div>
  );
}

function Dropdown({ placeholder, options, type }) {
  const [visibility, setVisibility] = useState(false);
  const mainTitle = placeholder.split(" ")[0].toLowerCase();
  const modal = useRef();
  const { addOption, removeOption, clearFilter, initialize } = useQuery();
  const activeOptions = useSelector((state) => state[mainTitle]);

  useEffect(() => {
    // Hide modal on clicking outside
    document.addEventListener("mouseup", function (event) {
      if (!modal.current?.contains(event.target)) {
        setVisibility(false);
      }
    });

    initialize(mainTitle);
  }, []);

  return (
    <div className="relative">
      <div
        onClick={() => setVisibility(true)}
        className="duration-75 cursor-pointer hover:border-black flex font-bold gap-sm items-center p-xs text-sm border border-grayFaint"
      >
        <span className="cursor-pointer">{placeholder}</span>
        {/* Arrow */}
        <svg
          width="13"
          height="7"
          viewBox="0 0 13 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${visibility && "rotate-180"} w-[1.5rem] h-[1.5rem]`}
        >
          <path
            d="M0.727662 0.0535889L0.0531311 0.72812L5.91251 6.58749L6.24954 6.90953L6.58657 6.58749L12.4459 0.72812L11.7719 0.0540574L6.25001 5.57593L0.727662 0.0535889Z"
            fill="black"
          />
        </svg>
      </div>
      {/* Selection */}
      {visibility && (
        <div
          ref={modal}
          className={`first-letter🧮 py-[1.5rem] absolute ${
            placeholder === "Sort By" ? "right-0" : "left-0"
          } top-[5rem] bg-white shadow-sm shadow-black flex flex-col min-w-[30rem] gap-[.5rem] z-50`}
        >
          {/* Close icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2.5rem"
            height="2.5rem"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
            className="self-end cursor-pointer mr-[3rem]"
            onClick={() => setVisibility(false)}
          >
            <path
              fill="currentColor"
              d="M15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z"
            />
          </svg>
          {/* Clear */}
          {!!activeOptions.length && (
            <div
              onClick={() => clearFilter(mainTitle)}
              className="flex items-center gap-xs p-xs pl-[3rem] text-[1.3rem] font-bold capitalize"
            >
              <span className="cursor-pointer">Clear</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2.5rem"
                height="2.5rem"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
                className="cursor-pointer"
              >
                <path
                  fill="currentColor"
                  d="M15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z"
                />
              </svg>
            </div>
          )}
          {options.map((option, index) => (
            <Selection
              key={index}
              option={option}
              type={type}
              addOption={() => addOption(mainTitle, option)}
              removeOption={() => removeOption(mainTitle, option)}
              initialActive={activeOptions.includes(option)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
