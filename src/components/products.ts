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
    const ls = State.getState || [];

    const [products, status] = await State.fetchData({
      path: State.Routes.products,
      query: `SubcategoryId=${ls.card_selected.id}`,
    });

    if (status == 200) {
      State.setState = { ...ls, products: products.data };

      return this.parseFetchedData(products.data);
    } else {
      // configurar error
    }
  }

  parseFetchedData(fetchedData) {
    const data = fetchedData
      .map(
        (product) => `<div id=${product.id} class=item>${product.name}</div>`
      )
      .join(" ");

    return data;
  }

  async renderLayout() {
    const products = await this.getDataFromDB();

    this.shadow.innerHTML = `
			<section class="main">
				<custom-grid data="${products}" resource=${State.Routes.products} title=Productos></custom-grid>
			</section>
		`;
  }
}

customElements.define("products-board", Products);
