import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import StoreProducts from "./pages/StoreProducts";
import ErrorPage from "./pages/ErrorPage";
import { getAllProducts, getSingleProduct } from "./api/products";
import Product from "./pages/Product";
import Bag from "./pages/Bag";
import Wishlist from "./pages/Wishlist";
import Account from "./pages/Account";
import { getUser } from "./api/user";
import Form from "./components/layout/Form";
import NotFoundPage from "./pages/NotFoundPage";

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
      {
        path: "bag",
        element: <Bag />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "account",
        loader: getUser,
        element: <Account />,
      },
      {
        path: "resetPassword/:token",
        element: <Form />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
