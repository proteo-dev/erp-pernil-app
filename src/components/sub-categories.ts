import State from "../state";

class Subcategories extends HTMLElement {
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

    const [subcategories, status] = await State.fetchData({
      path: State.Routes.subcategories,
      query: `CategoryId=${ls.card_selected.id}`,
    });

    if (status == 200) {
      State.setState = { ...ls, subCategories: subcategories.data };

      return this.parseFetchedData(subcategories.data);
    } else {
      // configurar error
    }
  }

  parseFetchedData(fetchedData) {
    const data = fetchedData
      .map(
        (subcategory) =>
          `<div id=${subcategory.id} class=item>${subcategory.name}</div>`
      )
      .join(" ");

    return data;
  }

  async renderLayout() {
    const subcategories = await this.getDataFromDB();

    this.shadow.innerHTML = `
			<section class="main">
				<custom-grid data="${subcategories}" resource=${State.Routes.subcategories} title=Sub-Categorias></custom-grid>
			</section>
		`;
  }
}

customElements.define("subcategories-board", Subcategories);
