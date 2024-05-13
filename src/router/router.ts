import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));

router.setRoutes([
  { path: "/", component: "login-page" },
  {
    path: "/home",
    component: "home-page",
    children: [
      { path: "/", component: "categories-board" },
      { path: "/products", component: "products-board" },
      { path: "/products/:category", component: "custom-product" },
      {
        path: "/products/:category/:product",
        component: "product-overview",
      },
      { path: "/crear", component: "custom-form" },
    ],
  },
]);

export { Router };
