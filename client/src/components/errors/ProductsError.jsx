import React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

function ProductsError() {
  const error = useRouteError();

  console.log(error);

  if (isRouteErrorResponse(error) && error.status === 404) {
    return <div>ProductsError</div>;
  }

  throw error;
}

export default ProductsError;
