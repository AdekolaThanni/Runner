import React from "react";
import Spinner from "../UI/Spinner";

function ProductsSkeletons() {
  return (
    <div className="flex justify-center">
      <Spinner className="w-[8rem] h-[8rem] my-xl" />
    </div>
  );
}

export default ProductsSkeletons;
