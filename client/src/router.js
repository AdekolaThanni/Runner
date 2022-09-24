import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import StoreProducts from "./pages/StoreProducts";
import ErrorPage from "./pages/ErrorPage";
import { getAllProducts, getSingleProduct } from "./api/products";
import Product from "./pages/Product";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        loader: getAllProducts,
        element: <StoreProducts />,
      },
      {
        path: "products/:productId",
        loader: getSingleProduct,
        element: <Product />,
      },
    ],
  },
]);

export default router;
