import { createBrowserRouter } from "react-router-dom";

import LoginPage from "../pages/login/login";
import Layout from "../components/layout";
import Movements from "../pages/movements";
import Home from "../pages/home";

const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "/:categoryId/subcategorias",
            element: <Home />,
            children: [
              {
                path: "/:categoryId/subcategorias/:subcategoryId/productos",
                element: <Home />,
              },
            ],
          },
          { path: "/ventas/clientes", element: <Home /> },
          { path: "/compras/proveedores", element: <Home /> },
        ],
      },
      {
        path: "/ventas",
        element: <Movements />,
      },
      {
        path: "/compras",
        element: <Movements />,
      },
    ],
  },
]);

export default router;
