import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import StoreProducts from "./pages/StoreProducts";
import ErrorPage from "./pages/ErrorPage";
import { getAllProducts } from "./api/products";

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
    ],
  },
]);

export default router;
