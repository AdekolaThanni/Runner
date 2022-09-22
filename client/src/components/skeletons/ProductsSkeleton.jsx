import React from "react";
import Spinner from "../UI/Spinner";

function ProductsSkeletons() {
  return (
    <div className="w-screen h-screen flex justify-center">
      <Spinner className="w-[8rem] h-[8rem] mt-xl" />
    </div>
  );
}

export default ProductsSkeletons;
