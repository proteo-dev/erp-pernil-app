import State from "../state";
import { Router } from "@vaadin/router";

class Grid extends HTMLElement {
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

			.container {
				position:relative;
				height: 100%;

				display: flex;
				flex-direction: column;
				justify-content: space-between;
				row-gap: 20px;

				background-color: rgba(255, 255, 255, 0.207);
				border: 2px solid white;
				border-radius: 27px;
			}

			.background {
				display: flex;
				justify-content: center;

				font-weight: bolder;
				font-size: 60px;
				color: rgba(255, 255, 255, 0.27);
			}
						
			.grid {
				padding: 0 10%;
				height: 30vh;

				display: grid;
				grid-template-columns: repeat(3, 1fr);
				grid-template-rows: repeat(3, 1fr);
				grid-gap: 30px;
				
				justify-items: center;
				align-items: center;

				overflow-y: auto;
			}

			.grid .item {
				width: 100%;
				max-width: 250px;
				height: 90px;
				padding: 18px;

				display: flex;
				justify-content: center;
				align-items: center;

				font-size: 24px;
				font-weight: bold;

				color: white;
				background-color: rgba(255, 255, 255, 0.27);
				border-radius: 18px;
				
				cursor: pointer;
			}

			.grid .item:hover {
				background-color: rgba(255, 255, 255, 0.45);
			}

			.button {
				background-color: rgba(255, 255, 255, 0.63);
				padding: 8px;
				align-self: end;

				color: #2c5364;
				font-size: 54px;
				font-weight: bolder;
				text-align: center;

				border: 0 solid white;
				border-radius: 27px 0 24px 0;
				cursor: pointer;
			}

			.button:hover {
				background-color: rgba(255, 255, 255, 0);
				color: white;
			}
		`;

		this.shadow.appendChild(style);
	}

	renderLayout() {
		const title = this.getAttribute("title");
		const data = this.getAttribute("data");

		this.shadow.innerHTML = `
		<div class=container>
			<div class=background>${title}</div>
			<div class=grid>${data}</div>
			<div class=button>Crear</div>
		</div>
		`;

		this.addListeners();
	}

	addListeners() {
		const mainEl = this.shadow.querySelector(".container") as HTMLElement;
		const buttonEl = this.shadow.querySelector(".button") as HTMLElement;

		buttonEl.addEventListener("click", () => {
			const path = this.getAttribute("resource") as any;
			let modal;

			if (path == State.Routes.products)
				modal = document.createElement("product-modal");
			else {
				modal = document.createElement("input-modal");
				modal.setAttribute("resource", path);
			}

			mainEl.appendChild(modal);
		});

		const itemEls = this.shadow.querySelectorAll(".item") as NodeList;

		for (const itemEl of itemEls) {
			itemEl.addEventListener("click", (e) => {
				const lastState = State.getState;

				State.setState = { ...lastState, card_selected: e.target };
				this.changeGrid();
			});
		}
	}

	changeGrid() {
		const path = this.getAttribute("resource") as any;

		switch (path) {
			case State.Routes.subcategories:
				Router.go("/productos");
				break;

			case State.Routes.products:
				const mainEl = this.shadow.querySelector(".container") as HTMLElement;

				let modal = document.createElement("product-modal");
				modal.setAttribute("action", "get");

				mainEl.appendChild(modal)
				break;

			default:
				Router.go("/subcategorias");
				break;
		}
	}
}

customElements.define("custom-grid", Grid);
