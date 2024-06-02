import State from "../state";

class accountingBoard extends HTMLElement {
	shadow = this.attachShadow({ mode: "open" });
	path

	constructor() {
		super();
	}

	async connectedCallback() {
		await this.renderLayout();
		await this.addStyles();
	}

	async addStyles() {
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

            .table-container {
				min-height: 30vh;
                width: 100%;
                display: flex;
                flex-direction: column;
				overflow-y: auto;
            }
            
            table {
                width: 100%;
                border-collapse: collapse;
            }

            th, td {
                border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;
            }

            th {
                background-color: #f2f2f2;
            }
            
            td {
                background-color: rgba(255, 255, 255, 0.27);
                
                max-width: 100px;
                max-height: 100px;

                font-weight: 500;
                color: white;
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

	async getDbData() {
		const ubi = location.pathname.replace("/", "")
		const operation = ubi == "ventas" ? "venta" : "compra"

		const [movements, status] = await State.fetchData({
			path: State.Routes.movements,
			query: `operation=${operation}`
		})

		if (status != 200) ""

		return movements.data
	}

	async renderLayout() {
		this.path = location.pathname.replace("/", "")
		const capitalizedText = this.path[0].toUpperCase() + this.path.slice(1)

		const movements = await this.getDbData()

		this.shadow.innerHTML = `
		<div class=container>
			<div class=background>${capitalizedText}</div>
 				<div class='table-container'>
 					<table>
 						<thead>
 							<tr>
 								<th>n° Operación</th>
 								<th>Monto</th>
 								<th>Unidades</th>
 								<th>Usuario</th>
 								<th>${this.path == "ventas" ? "Cliente" : "Proveedor"}</th>
 								<th>Fecha</th>
 							</tr>
 						</thead>
 						<tbody>
 						${movements.map((el: any) => `<tr>
                            <td>${el.id}</td>
                            <td>$ ${el.amount}</td>
                            <td>${el.units}</td>
                            <td>${el.User.fullName}</td>
                            <td>${el.Client?.name || el.Supplier?.name}</td>
                            <td>${el.createdAt.split("T")[0]}</td>
                            </tr>`)}
 						</tbody>
 					</table>
 				</div>
			<div class=button>Crear</div>
		</div>
		`;

		this.addListeners();
	}

	addListeners() {
		const mainEl = this.shadow.querySelector(".container") as HTMLElement;
		const buttonEl = this.shadow.querySelector(".button") as HTMLElement;

		buttonEl.addEventListener("click", () => {
			const modal = document.createElement("movement-modal");

			modal.setAttribute("operation", this.path);

			mainEl.appendChild(modal);
		})
	}
}

customElements.define("accounting-board", accountingBoard);
