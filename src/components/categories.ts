import State from "../state";
import { Router } from "@vaadin/router";

class Categories extends HTMLElement {
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

  parseFetchedData(fetchedData) {
    const data = fetchedData
      .map(
        (category) => `<div id=${category.id} class=item>${category.name}</div>`
      )
      .join(" ");

    return data;
  }

  async getDataFromDB() {
    const [categories] = await State.fetchData({ path: State.Routes.categories });

    const currentState = State.getState || [];

    State.setState = { ...currentState, categories: categories.data };

    return this.parseFetchedData(categories.data);
  }

  async renderLayout() {
    const categories = await this.getDataFromDB();

    this.shadow.innerHTML = `
			<section class="main">
				<custom-grid data="${categories}" resource=${State.Routes.categories} title=Categorias></custom-grid>
			</section>
		`;
  }
}

customElements.define("categories-board", Categories);
