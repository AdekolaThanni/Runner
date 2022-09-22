import React from "react";
import { useNavigation } from "react-router-dom";
import SingleProduct from "./SingleProduct";

function Products({ products }) {
  const navigation = useNavigation();
  return (
    navigation.state === "idle" && (
      <div className="">
        <h1 className="text-md">{products.length} Products</h1>
        <div className="grid grid-cols-3 px-[5rem] gap-[3rem] my-md">
          {products.map((product) => (
            <SingleProduct key={product._id} product={product} />
          ))}
        </div>
      </div>
    )
  );
}

export default Products;
