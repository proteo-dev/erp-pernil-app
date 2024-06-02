import { Router } from "@vaadin/router";
import State from "./state";

// ROUTER

import "./router/router";

// COMPONENTS

import "./components/layout";
import "./components/products";
import "./components/categories";
import "./components/sub-categories";
import "./components/custom-grid";
import "./components/modal";
import "./components/product-modal";
import "./components/movement-modal";
import "./components/form";
import "./components/accounting-board";

// PAGES

import "./pages/login";
import "./pages/home";

(async function main() {
  await State.init();

  window.addEventListener("load", () => {
    const currentURL = location.pathname;
    // if (currentURL === "/") Router.go("/login");
    Router.go("/");
  });
})();
