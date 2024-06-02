import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));

router.setRoutes([
  { path: "/login", component: "login-page" },
  {
    path: "/",
    component: "home-page",
    children: [
      { path: "/", component: "categories-board" },
      { path: "/subcategorias", component: "subcategories-board" },
      { path: "/productos", component: "products-board" },
      { path: "/ventas", component: "accounting-board" },
      { path: "/compras", component: "accounting-board" },
    ],
  },
]);

export { Router };
