import State from "../state";
import searchModal from "./search-modal"

class MovementModal extends HTMLElement {
	shadow = this.attachShadow({ mode: "open" });
	isSalesOperation: boolean

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

			form .button {
				background-color: white;
				border: none;
				border: 2px solid rgb(161, 161, 161);
				border-radius: 27px 0 22px 0;

				width: 18vw;

				display: flex;
				align-self: flex-end;
				
				font-size: 54px;
				font-weight: bolder;
				color: rgb(161, 161, 161);
				text-align: center;
				
				cursor: pointer;
			}

			form .button:hover {
				background-color: rgb(161, 161, 161);
				color: white;
			}

			form .inputs-container {
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
		`;

		this.shadow.appendChild(style);
	}

	render() {
		const operation = this.getAttribute("operation");
		this.isSalesOperation = operation == "ventas"

		const entity = this.isSalesOperation ? "Cliente" : "Proveedor"

		this.shadow.innerHTML = `
		<form class="form">
			<div class=inputs-container>				
				<div class="fields-container">
					<div>
						<input id=inputProduct name=product type=number placeholder=Producto required class=input />
						<button id="productsButton" >Ver</button>
					</div>

					<div>
						<input id=inputEntity name=entity type=number placeholder=${entity} required class=input />
						<button id="buttonEntity" >Ver</button>
					</div>
				</div>
				
				<div class="fields-container">
					<div>
						<input id=inputAmount name=amount type=number placeholder=Monto class=input />
					</div>
	
					<div>
						<input id=inputUnits name=units type=number placeholder=Unidades required class=input />
					</div>
				</div>
			</div>
			<searchModal />
			
			<input type=submit class=button />
		</form>
		`;

		// agregar estetica y buscadores de clientes, proveedores y productos
		this.hideElements()
		this.addListeners();
	}

	hideElements() {
		const inputAmountEl = this.shadow.querySelector("#inputAmount") as HTMLInputElement;

		if (this.isSalesOperation) inputAmountEl.style.display = "none"
	}

	async formListener() {
		const formEl = this.shadow.querySelector(".form") as HTMLElement;

		const inputProductEl = this.shadow.querySelector("#inputProduct") as HTMLInputElement;
		const inputEntityEl = this.shadow.querySelector("#inputEntity") as HTMLInputElement;
		const inputUnitsEl = this.shadow.querySelector("#inputUnits") as HTMLInputElement;

		formEl.addEventListener("submit", (e) => {
			e.preventDefault()
			const ProductId = inputProductEl.value;
			const entity = inputEntityEl.value;
			const units = inputUnitsEl.value;

			const body: any = {
				units,
				ProductId,
			};

			if (this.isSalesOperation) body.ClientId = entity
			else {
				body.SupplierId = entity
				body.operation = "compra"
				body.amount = ""
			}

			State.fetchData({ path: State.Routes.movements, method: "post", body });
		});
	}

	async buttonsListener() {
		const formEl = this.shadow.querySelector(".form") as HTMLElement;
		const productsButtonEl = this.shadow.querySelector("#productsButton") as HTMLElement;
		const entityButtonEl = this.shadow.querySelector("#entityButton") as HTMLElement;

		productsButtonEl.addEventListener("click", () => {
			const searchModalEl = document.createElement("search-modal")
			formEl.appendChild(searchModalEl)
		});
	}

	async addListeners() {
		this.formListener()
		this.buttonsListener()
	}
}

customElements.define("movement-modal", MovementModal);
