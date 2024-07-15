import { useContext, useState } from "react";

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

import SearchModal from "./search-modal";

import { GlobalContext } from "../../state";

export default function MovementModal({ action, operation, handleClose }) {
	const isSalesOperation = operation == "ventas"

	const [elements, setElements] = useState({
		amountPerUnit: 1,
		amountToPaid: 1,
		units: 1,
		paymentMethod: "efectivo",
		agentId: "",
		ProductId: "",
	});

	const { fetchData, state } = useContext(GlobalContext);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = {
			ProductId: elements.ProductId,
			paymentMethod: elements.paymentMethod,
			units: elements.units,
			amount: elements.amountToPaid,
		};

		if (operation == "ventas") {
			data["ClientId"] = elements.agentId
		} else {
			data["SupplierId"] = elements.agentId
		}

		let method = "POST";
		let path = state.routes.movements;

		if (action == "GET") {
			method = "PATCH";
			path = state.routes.movements + "/" + state.card_selected.id;
		}

		const [response, status] = await fetchData({ method, path, data });

		if (status == 201 || status == 200) {
			handleClose();
			location.replace("/");
		} else {
			alert(response);
		}
	};

	const handleChange = (e) => {
		const value = e.target.name || e.target.role

		switch (value) {
			case "agent":
				setElements((prev) => {
					return {
						...prev,
						agentId: e.target.value,
					};
				});
				break;
			case "product":
				setElements((prev) => {
					return {
						...prev,
						ProductId: e.target.value,
					};
				});
				break;
			case "amountPerUnit":
				setElements((prev) => {
					return {
						...prev,
						amountPerUnit: e.target.value,
						amountToPaid: e.target.value * prev.units,
					};
				});
				break;
			case "amountToPaid":
				setElements((prev) => {
					return {
						...prev,
						amountToPaid: e.target.value,
						amountPerUnit: Math.round(e.target.value / prev.units)
					};
				});
				break;
			case "units":
				setElements((prev) => {
					return { ...prev, units: e.target.value, amountToPaid: prev.amountPerUnit * e.target.value };
				});
				break;
			case "option":
				setElements((prev) => {
					return { ...prev, paymentMethod: e.target.innerText };
				});
				break;
		}
	};

	const catchSelectedItem = ({ id, operation }) => {
		if (!operation) {
			setElements((prev) => {
				return { ...prev, ProductId: id };
			})
		} else {
			setElements((prev) => {
				return { ...prev, agentId: id };
			})
		}
	}

	return <Modal open={true} onClose={() => handleClose()}>
		<ModalDialog>
			<DialogTitle>Movimientos</DialogTitle>
			<DialogContent>Completá la información del movimiento.</DialogContent>
			<form id="movementForm" onSubmit={handleSubmit}>
				<Stack spacing={2}>
					<FormControl>
						<FormLabel>Codigo producto</FormLabel>
						<Input
							onChange={handleChange}
							value={elements.ProductId}
							type="number"
							id="product"
							name="product"
							autoFocus
							required
							endDecorator={<SearchModal catchSelectedItem={catchSelectedItem} />}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Codigo {isSalesOperation ? "cliente" : "proveedor"}</FormLabel>
						<Input
							onChange={handleChange}
							value={elements.agentId}
							id="agent"
							name="agent"
							type="number"
							autoFocus
							required
							endDecorator={<SearchModal catchSelectedItem={catchSelectedItem} operation={operation} />}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Unidades</FormLabel>
						<Input
							onChange={handleChange}
							id="units"
							name="units"
							type="number"
							value={elements.units}
							slotProps={
								{
									input: {
										min: 1
									}
								}
							}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Monto X u.</FormLabel>
						<Input
							onChange={handleChange}
							id="amountPerUnit"
							name="amountPerUnit"
							type="number"
							startDecorator={"$"}
							value={elements.amountPerUnit}
							slotProps={
								{
									input: {
										min: 1
									}
								}
							}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Monto total</FormLabel>
						<Input
							onChange={handleChange}
							id="amountToPaid"
							name="amountToPaid"
							type="number"
							startDecorator={"$"}
							value={elements.amountToPaid}
							slotProps={
								{
									input: {
										min: 1
									}
								}
							}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Método de pago</FormLabel>
						<Select onChange={handleChange} defaultValue="cash">
							<Option id="cash" value="cash">efectivo</Option>
							<Option id="transfer" value="transfer">transferencia</Option>
							<Option id="mp" value="mp">mercado pago</Option>
							<Option id="creditCard" value="creditCard">tarjeta de credito</Option>
							<Option id="debitCard" value="debitCard">tarjeta de debito</Option>
						</Select>
					</FormControl>
					<Button type="submit">Ok</Button>
				</Stack>
			</form>
		</ModalDialog>
	</Modal>
}

