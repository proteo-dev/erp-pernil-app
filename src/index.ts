import { Router } from "@vaadin/router";
import State from "./state";

// ROUTER

import "./router/router";

// COMPONENTS

import "./components/layout";
import "./components/products";
import "./components/categories";
import "./components/custom-grid";
import "./components/modal";
import "./components/form";

// PAGES

import "./pages/login";
import "./pages/home";

(async function main() {
  await State.init();

  window.addEventListener("load", () => {
    const currentURL = location.pathname;
    if (currentURL === "/") return Router.go("/");
  });
})();
