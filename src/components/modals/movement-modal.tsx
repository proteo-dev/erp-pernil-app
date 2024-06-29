// import State from "../state";
// import searchModal from "./search-modal"

// class MovementModal extends HTMLElement {
// 	shadow = this.attachShadow({ mode: "open" });
// 	isSalesOperation: boolean

// 	constructor() {
// 		super();
// 	}

// 	connectedCallback() {
// 		this.render();
// 		this.addStyles();
// 	}

// 	addStyles() {
// 		const style = document.createElement("style");

// 		style.innerHTML = `
// 			* {
// 				margin: 0;
// 				padding: 0;
// 				box-sizing: border-box;
// 			}

// 			form {
// 				display: flex;
// 				position: absolute;
// 				bottom: 5%;
// 				top: 5%;
// 				right: 7.5%;
// 				left: 7.5%;
// 				font-weight: bolder;
// 				background-color: rgba(255, 255, 255);
// 				border-radius: 27px;
// 				border: 3px solid rgb(161, 161, 161);
// 				flex-direction: column;
// 				justify-content: space-between;
// 			}

// 			form .input {
// 				background-color: rgba(161, 161, 161, 0.39);
// 				border: none;
// 				border-radius: 15px;

// 				width: 100%;
// 				height: 15%;

// 				color: black;
// 				font-size: 24px;
// 				text-align: center;
// 			}

// 			form .input::placeholder {
// 				color: rgba(161, 161, 161, 0.39);
// 			}

// 			form .button {
// 				background-color: white;
// 				border: none;
// 				border: 2px solid rgb(161, 161, 161);
// 				border-radius: 27px 0 22px 0;

// 				width: 18vw;

// 				display: flex;
// 				align-self: flex-end;

// 				font-size: 54px;
// 				font-weight: bolder;
// 				color: rgb(161, 161, 161);
// 				text-align: center;

// 				cursor: pointer;
// 			}

// 			form .button:hover {
// 				background-color: rgb(161, 161, 161);
// 				color: white;
// 			}

// 			form .inputs-container {
// 				background-color: rgba(161, 161, 161, 0.39);
// 				width: 100%;
// 				height: 52%;
// 				border-radius: 15px;
// 				display: flex;
// 				justify-content: space-around;
// 				align-items: center;
// 			}

// 			.fields-container {
// 				width: 150px;
// 				display: flex;
// 				flex-direction: column;
// 				justify-content: center;
// 				align-items: center;
// 			}

// 			.fields-container div {
// 				width: 100%;
// 				display: flex;
// 				column-gap: 10px;
// 				justify-content: space-between;
// 				align-items: center;
// 			}
// 		`;

// 		this.shadow.appendChild(style);
// 	}

// 	render() {
// 		const operation = this.getAttribute("operation");
// 		this.isSalesOperation = operation == "ventas"

// 		const entity = this.isSalesOperation ? "Cliente" : "Proveedor"

// 		this.shadow.innerHTML = `
// 		<form class="form">
// 			<div class=inputs-container>				
// 				<div class="fields-container">
// 					<div>
// 						<input id=inputProduct name=product type=number placeholder=Producto required class=input />
// 						<button id="productsButton" >Ver</button>
// 					</div>

// 					<div>
// 						<input id=inputEntity name=entity type=number placeholder=${entity} required class=input />
// 						<button id="buttonEntity" >Ver</button>
// 					</div>
// 				</div>

// 				<div class="fields-container">
// 					<div>
// 						<input id=inputAmount name=amount type=number placeholder=Monto class=input />
// 					</div>

// 					<div>
// 						<input id=inputUnits name=units type=number placeholder=Unidades required class=input />
// 					</div>
// 				</div>
// 			</div>
// 			<searchModal />

// 			<input type=submit class=button />
// 		</form>
// 		`;

// 		// agregar estetica y buscadores de clientes, proveedores y productos
// 		this.hideElements()
// 		this.addListeners();
// 	}

// 	hideElements() {
// 		const inputAmountEl = this.shadow.querySelector("#inputAmount") as HTMLInputElement;

// 		if (this.isSalesOperation) inputAmountEl.style.display = "none"
// 	}

// 	async formListener() {
// 		const formEl = this.shadow.querySelector(".form") as HTMLElement;

// 		const inputProductEl = this.shadow.querySelector("#inputProduct") as HTMLInputElement;
// 		const inputEntityEl = this.shadow.querySelector("#inputEntity") as HTMLInputElement;
// 		const inputUnitsEl = this.shadow.querySelector("#inputUnits") as HTMLInputElement;

// 		formEl.addEventListener("submit", (e) => {
// 			e.preventDefault()
// 			const ProductId = inputProductEl.value;
// 			const entity = inputEntityEl.value;
// 			const units = inputUnitsEl.value;

// 			const body: any = {
// 				units,
// 				ProductId,
// 			};

// 			if (this.isSalesOperation) body.ClientId = entity
// 			else {
// 				body.SupplierId = entity
// 				body.operation = "compra"
// 				body.amount = ""
// 			}

// 			State.fetchData({ path: State.Routes.movements, method: "post", body });
// 		});
// 	}

import { useContext, useState, Fragment, useEffect } from "react";

import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

import { GlobalContext } from "../../state";

export default function MovementModal({ action, operation }) {
	const [elements, setElements] = useState({
		amount: 0,
		units: 1,
		paymentMethod: "",
		ClientId: 0,
		SupplierId: 0,
		ProductId: 0,
	});

	const [open, setOpen] = useState<boolean>(true);

	const { fetchData, state } = useContext(GlobalContext);

	useEffect(() => {
		// const getDataFromDb = async () => {
		// 	const [response, status] = await fetchData({
		// 		path: `products/${state.card_selected.id}`,
		// 	});

		// 	if (status == 200) {
		// 		const { amount, units, operation, paymentMethod, User, Client, Supplier } = response.data;

		// 		setElements((prev) => {
		// 			return {
		// 				...prev,
		// 				amount,
		// 				units,
		// 				operation,
		// 				paymentMethod,
		// 				User: ,
		// 				Client: ,
		// 				Supplier: ,
		// 			};
		// 		});
		// 	} else {
		// 		console.log(response);
		// 	}
		// };

		// if (action == "GET") {
		// 	getDataFromDb();
		// }
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formElements = e.currentTarget.elements;

		const data = {
			name: formElements.title.value,
			stock: formElements.stock.value,
			isService: formElements.service.checked,
			buy: formElements.buy.checked,
			sell: formElements.sell.checked,
			SubcategoryId: state.card_selected.id,
		};

		setOpen(false);

		let method = "POST";
		let path = state.routes.movements;

		if (action == "GET") {
			method = "PATCH";
			path = state.routes.movements + "/" + state.card_selected.id;
		}

		const [response, status] = await fetchData({ method, path, data });

		if (status == 201 || status == 200) {
			location.replace("/");
		} else {
			console.log(response);
		}
	};

	const handleChange = (e) => {
		switch (e.target.name) {
			case "entity":
				setElements((prev) => {
					return {
						...prev,
						title: e.target.value,
					};
				});
				break;
			case "product":
				setElements((prev) => {
					return {
						...prev,
						product: e.target.checked,
						service: !e.target.checked,
					};
				});
				break;
			case "amout":
				setElements((prev) => {
					return {
						...prev,
						service: e.target.checked,
						product: !e.target.checked,
					};
				});
				break;
			case "units":
				setElements((prev) => {
					return { ...prev, buy: e.target.checked };
				});
				break;
			case "payment":
				setElements((prev) => {
					return { ...prev, buy: e.target.checked };
				});
				break;
		}
	};

	return (
		<Fragment>
			<Modal open={open} onClose={() => setOpen(false)}>
				<ModalDialog>
					<DialogTitle>Movimientos</DialogTitle>
					<DialogContent>Completá la información del movimiento.</DialogContent>
					<form id="movementForm" onSubmit={handleSubmit}>
						<Stack spacing={2}>
							<FormControl>
								<FormLabel>Codigo del producto</FormLabel>
								<Input
									onChange={handleChange}
									value={elements.ProductId}
									type="number"
									id="product"
									name="product"
									autoFocus
									required
									endDecorator={<Button>Buscar</Button>}
								/>
							</FormControl>
							<FormControl>
								<FormLabel>Codigo del {operation == "ventas" ? "cliente" : "proveedor"}</FormLabel>
								<Input
									onChange={handleChange}
									value={operation == "ventas" ? elements.ClientId : elements.SupplierId}
									id="entity"
									name="entity"
									type="number"
									autoFocus
									required
									endDecorator={<Button>Buscar</Button>}
								/>
							</FormControl>
							<FormControl>
								<FormLabel>Unidades</FormLabel>
								<Input
									onChange={handleChange}
									id="units"
									name="units"
									type="number"
									placeholder="Unidades"
									value={elements.units}
								/>
							</FormControl>
							<FormControl>
								<FormLabel>Monto</FormLabel>
								<Input
									onChange={handleChange}
									id="amount"
									name="amount"
									type="number"
									placeholder="Monto"
									value={elements.amount}
								/>
							</FormControl>
							<FormControl>
								<FormLabel>Método de pago</FormLabel>
								{/* <Input
									onChange={handleChange}
									id="paymentMethod"
									name="paymentMethod"
									placeholder="metodo de pago"
									value={elements.paymentMethod}
								/> */}
								<Select name="payment" onChange={handleChange} defaultValue="cash">
									<Option id="cash" value="cash">Efectivo</Option>
									<Option id="transfer" value="transfer">Transferencia</Option>
									<Option id="mp" value="mp">Mercado pago</Option>
									<Option id="creditCard" value="creditCard">Tarjeta crédito</Option>
									<Option id="debitCard" value="debitCard">Tarjeta débito</Option>
								</Select>
							</FormControl>
							<Button type="submit">Ok</Button>
						</Stack>
					</form>
				</ModalDialog>
			</Modal>
		</Fragment>
	);
}

