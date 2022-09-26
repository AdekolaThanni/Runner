import React from "react";

function Divider({ className }) {
  return (
    <div
      className={`block w-screen bg-grayFaint h-[1px] relative left-[50%] translate-x-[-50%] ${className}`}
    ></div>
  );
}

export default Divider;
