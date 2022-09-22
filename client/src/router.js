import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import StoreProducts from "./pages/StoreProducts";
import { getAllProducts } from "./api/products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
