import State from "../state";
import { Router } from "@vaadin/router";

class Products extends HTMLElement {
  shadow = this.attachShadow({ mode: "open" });

  constructor() {
    super();
  }

  async connectedCallback() {
    this.renderLayout();
    this.addStyles();
  }

  addStyles() {
    const style = document.createElement("style");

    style.innerHTML = `			
			* {
				margin: 0;
				padding: 0;
				box-sizing: border-box;
			}

			.main {
				width: 100%;
				height: 100%;

				display: flex;
				justify-content: center;
				align-items: center;
			}

			custom-grid {
				width: 100%;
				height: 100%;
			}
		`;

    this.shadow.appendChild(style);
  }

  async getDataFromDB() {
    const currentState = State.getState || [];

    console.log(currentState.card_selected);

    const products = await State.fetchData({
      // chequear
      path: State.Routes.products,
      query: `CategoryId=${currentState.card_selected.id}`,
    });

    State.setState = { ...currentState, products: products.data };

    return this.parseFetchedData(products.data);
  }

  parseFetchedData(fetchedData) {
    const data = fetchedData
      .map((product) => `<div class=item>${product.name}</div>`)
      .join(" ");

    return data;
  }

  async renderLayout() {
    const products = await this.getDataFromDB();

    this.shadow.innerHTML = `
			<section class="main">
				<custom-grid resource=${State.Routes.products} title=Products>${products}</custom-grid>
			</section>
		`;
  }
}

customElements.define("products-board", Products);
