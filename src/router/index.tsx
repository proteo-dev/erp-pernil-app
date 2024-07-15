import { createBrowserRouter } from "react-router-dom";

import LoginPage from "../pages/login/login"
import HomePage from "../pages/home"
import Categories from "../components/categories/index"
import SubCategories from "../components/sub-categories/index"
import Products from "../components/products";
import Sales from "../components/sales";
import Buys from "../components/buys";

const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    path: "/",
    element: <HomePage />,
    children: [
      { path: "/", element: <Categories /> },
      { path: "/subcategorias", element: <SubCategories /> },
      { path: "/productos", element: <Products /> },
      { path: "/ventas", element: <Sales /> },
      { path: "/compras", element: <Buys /> },
    ],
  },
]);

export default router;
