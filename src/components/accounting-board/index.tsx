import { useContext, useState } from "react";
import { GlobalContext } from "../../state";
import MovementModal from "../modals/movement-modal";

import "./index.css"

function AccountingBoard({ title, location, children }) {
	const { state, fetchData } = useContext(GlobalContext)

	const [modalState, setModal] = useState({ open: false, action: "POST" });

	const handleClose = () => {
		setModal((prev) => {
			return { ...prev, open: false }
		})
	};

	return <div className="container">
		<div className="background">{title}</div>
		<div className='table-container'>
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Producto</th>
						<th>Unidades</th>
						<th>$/u</th>
						<th>Total</th>
						<th>Forma de pago</th>
						<th>Usuario</th>
						<th>{location == "ventas" ? "Cliente" : "Proveedor"}</th>
						<th>Fecha</th>
					</tr>
				</thead>
				<tbody>
					{children.map((el) => <tr key={el.id}>
						<td>{el.id}</td>
						<td>{el.Product?.name}</td>
						<td>{el.units}</td>
						<td>${el.amount / el.units}</td>
						<td>${el.amount}</td>
						<td>{el.paymentMethod}</td>
						<td>{el.User?.fullName}</td>
						<td>{el.Client?.name || el.Supplier?.name}</td>
						<td>{el.createdAt.split("T")[0]}</td>
					</tr>)
					}
				</tbody>
			</table>
		</div>
		<div
			onClick={() => setModal((prev) => { return { ...prev, open: true } })}
			className="button">
			Crear
		</div>

		{modalState.open && <MovementModal operation={location} action={modalState.action} handleClose={handleClose} />}
	</div>
}

export default AccountingBoard
