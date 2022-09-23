import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigation, useSearchParams } from "react-router-dom";
import SingleProduct from "./SingleProduct";

function Products({ products, results, page }) {
  const [allProducts, setAllProducts] = useState(products);
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
    if (page > 1) {
      setAllProducts((prevState) => prevState.concat(products));
    } else {
      setAllProducts(products);
    }
  }, [page]);

  return (
    (navigation.state === "idle" ||
      navigation.location.search.includes("page")) && (
      <motion.div
        className=""
        onViewportLeave={addProducts}
        viewport={{ margin: "-90% 0px 0px" }}
      >
        <h1 className="text-md">{results} Products</h1>
        <div className="grid grid-cols-3 px-[5rem] gap-[3rem] my-md">
          {allProducts.map((product) => (
            <SingleProduct key={product._id} product={product} />
          ))}
        </div>
      </motion.div>
    )
  );
}

export default Products;
