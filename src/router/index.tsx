import { createBrowserRouter } from "react-router-dom";

import LoginPage from "../pages/login/login";
import HomePage from "../pages/home";
import Movements from "../pages/movements";
import Categories from "../components/categories/index";
import SubCategories from "../components/sub-categories/index";
import Products from "../components/products";

const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    path: "/",
    element: <HomePage />,
    children: [
      { path: "/", element: <Categories /> },
      { path: "/subcategorias", element: <SubCategories /> },
      { path: "/productos", element: <Products /> },
      { path: "/ventas", element: <Movements /> },
      { path: "/compras", element: <Movements /> },
    ],
  },
]);

export default router;
