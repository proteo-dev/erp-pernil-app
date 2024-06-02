import { Router } from "@vaadin/router";
import State from "../state";

class ProductModal extends HTMLElement {
	shadow = this.attachShadow({ mode: "open" });

	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
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
			
			form {
				display: flex;
				position: absolute;
				bottom: 5%;
				top: 5%;
				right: 7.5%;
				left: 7.5%;
				font-weight: bolder;
				background-color: rgba(255, 255, 255);
				border-radius: 27px;
				border: 3px solid rgb(161, 161, 161);
				flex-direction: column;
				justify-content: space-between;
			}

			form .title {
				color: rgb(161, 161, 161);
				font-size: 54px;
			}

			form .input {
				background-color: rgba(161, 161, 161, 0.39);
				border: none;
				border-radius: 15px;
				
				width: 100%;
				height: 15%;
				
				color: black;
				font-size: 24px;
				text-align: center;
			}

			form .input::placeholder {
				color: rgba(161, 161, 161, 0.39);
			}

			form .input:focus {
				background-color: rgba(161, 161, 161, 0.39);
			}

			form .titleContainer {
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				top: 0;
				padding-top: 18px;
				width: 100%;

				font-size: 21px;
				font-weight: bolder;
				color: black;
			}

			form .button {
				background-color: white;
				border: none;
				border: 2px solid rgb(161, 161, 161);
				border-radius: 27px 0 27px 0;

				width: 18vw;

				display: flex;
				align-self: flex-end;
				
				font-size: 54px;
				font-weight: bolder;
				color: rgb(161, 161, 161);
				text-align: center;
				
				cursor: pointer;
			}
			}

			form .button:hover {
				background-color: rgb(161, 161, 161);
				color: white;
			}

			form .checkboxes {
				background-color: rgba(161, 161, 161, 0.39);
				width: 100%;
				height: 52%;
				border-radius: 15px;
				display: flex;
				justify-content: space-around;
				align-items: center;
			}

			.fields-container {
				width: 150px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
			
			.fields-container div {
				width: 100%;
				display: flex;
				column-gap: 10px;
				justify-content: space-between;
				align-items: center;
			}

			.checkbox, .radioBox {
				width: 23px;
				height: 23px;
			}

			.radioBox:checked {
				border-color: #007bff;
			}

			form .checkboxes div label {
				font-size: 24px;
				color: black;
			}
		`;

		this.shadow.appendChild(style);
	}

	render() {
		this.shadow.innerHTML = `
		<form class="form">
			<input id=inputName type=text placeholder=Nombre required class=input />

			<div class=checkboxes>					
				<div class="fields-container">
					<div>
						<label>Servicio</label>
						<input id=inputService type=radio name=productType class=radioBox />
					</div>
					
					<div>
						<label>Producto</label>
						<input id=inputProduct type=radio name=productType class=radioBox checked />
					</div>
				</div>
				
				
				<div class="fields-container">
					<div>
						<label for="buyCheck">Compra</label>
						<input id=inputBuy type=checkbox name=buyCheck class=checkbox checked />
					</div>
					
					<div>
						<label for="sellCheck">Venta</label>
						<input id=inputSell type=checkbox name=sellCheck class=checkbox checked />
					</div>
				</div>
				
				<div class="fields-container">
					<input id=inputStock type=number placeholder=Stock required class=input />
				</div>
				
				<div class="fields-container">
					<label for="inactiveCheck">Inactivo</label>
					<input id=inputInactive type=checkbox name=inactiveCheck class=checkbox />
				</div>
			</div>
			
			<input type=submit class=button />
		</form>
		`;

		this.addListeners();
	}

	async addListeners() {
		const ls = State.getState;

		const formEl = this.shadow.querySelector(".form") as HTMLElement;

		const inputNameEl = this.shadow.querySelector("#inputName") as HTMLInputElement;
		const inputProductEl = this.shadow.querySelector("#inputProduct") as any;
		const inputServiceEl = this.shadow.querySelector("#inputService") as any;
		const inputBuyEl = this.shadow.querySelector("#inputBuy") as any;
		const inputSellEl = this.shadow.querySelector("#inputSell") as any;
		const inputInactiveEl = this.shadow.querySelector("#inputInactive") as any;
		const inputStockEl = this.shadow.querySelector("#inputStock") as HTMLInputElement;

		const name = inputNameEl.value;
		const isProduct = inputProductEl.value;
		const isService = inputServiceEl.value;
		const buy = inputBuyEl.value;
		const sell = inputSellEl.value;
		const stock = inputStockEl.value;
		const inactive = inputInactiveEl.value;

		const action = this.getAttribute("action");

		switch (action) {
			case "get":
				const [product, status] = await State.fetchData({ path: `${State.Routes.products}/${ls.card_selected.id}`, method: "get" });

				if (status == 200) {
					const { name, isProduct, isService, buy, sell, inactive, stock } = product.data

					inputNameEl.value = name;
					inputStockEl.value = stock;

					inputProductEl.checked = isProduct;
					inputServiceEl.checked = isService;
					inputBuyEl.checked = buy;
					inputSellEl.checked = sell;
					inputInactiveEl.checked = inactive;
				}

				// const body: any = {
				// 	name,
				// 	stock,
				// 	isProduct,
				// 	isService,
				// 	buy,
				// 	sell,
				// 	inactive,
				// 	SubcategoryId: ls.card_selected.id,
				// };

				// State.fetchData({ path: State.Routes.products, method: "update", body });
				break;

			default:
				formEl.addEventListener("submit", () => {
					const body: any = {
						name,
						stock,
						isProduct,
						isService,
						buy,
						sell,
						inactive,
						SubcategoryId: ls.card_selected.id,
					};

					State.fetchData({ path: State.Routes.products, method: "post", body });
				});
				break;
		}
	}
}

customElements.define("product-modal", ProductModal);
