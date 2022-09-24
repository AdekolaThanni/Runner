import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigation, useSearchParams } from "react-router-dom";
import SingleProduct from "./SingleProduct";

function Products({ products, results, uniqueKey }) {
  const [allProducts, setAllProducts] = useState([]);
  const navigation = useNavigation();
  const [searchParams, setSearchParams] = useSearchParams();

  const addProducts = async () => {
    const productsPerPage = 18;
    const totalPages = Math.ceil(results / productsPerPage);
    const currentPage = searchParams.get("page") * 1;
    const nextPage = currentPage ? currentPage + 1 : 2;
    if (nextPage > totalPages) return;
    searchParams.set("page", nextPage);
    setSearchParams(searchParams.toString());
  };

  useEffect(() => {
    if (typeof uniqueKey === "number") {
      if (searchParams.get("page")) {
        setAllProducts((prevState) => prevState.concat(products));
      } else {
        setAllProducts(products);
      }
    }
  }, [uniqueKey]);

  return (
    (navigation.state === "idle" ||
      navigation.location.search.includes("page")) && (
      <motion.div
        className="mt-xl"
        onViewportLeave={addProducts}
        viewport={{ margin: "-90% 0px 0px" }}
      >
        <h1 className="text-md">
          {results ? `${results} Products` : "No Products Found"}
        </h1>
        <div className="grid grid-cols-3 gap-[3rem] my-md">
          {allProducts.map((product, index) => (
            <SingleProduct key={index} product={product} />
          ))}
        </div>
      </motion.div>
    )
  );
}

export default Products;
