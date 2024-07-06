import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../state";
import MovementModal from "../modals/movement-modal";

import "./index.css"

function AccountingBoard() {
	const { state, fetchData } = useContext(GlobalContext)

	const [movements, setMovements] = useState([])
	const [modalState, setModal] = useState({ open: false, action: "POST" });

	const path = location.pathname.replace("/", "")

	useEffect(() => {
		(async () => {
			const operation = path == "ventas" ? "venta" : "compra"

			const [movements, status] = await fetchData({
				path: state.routes.movements,
				query: `operation=${operation}` // no funciona
			})

			if (status == 200) {
				setMovements(movements.data)
			}
		})()
	}, [])

	const handleClose = () => {
		setModal((prev) => {
			return { ...prev, open: false }
		})
	};

	const capitalizedText = path[0].toUpperCase() + path.slice(1)

	return <div className="container">
		<div className="background">{capitalizedText}</div>
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
						<th>{path == "ventas" ? "Cliente" : "Proveedor"}</th>
						<th>Fecha</th>
					</tr>
				</thead>
				<tbody>
					{movements.map((el) => <tr key={el.id}>
						<td>{el.id}</td>
						<td>{el.Product.name}</td>
						<td>{el.units}</td>
						<td>${el.amount / el.units}</td>
						<td>${el.amount}</td>
						<td>{el.paymentMethod}</td>
						<td>{el.User.fullName}</td>
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

		{modalState.open && <MovementModal operation={path} action={modalState.action} handleClose={handleClose} />}

	</div >
}

export default AccountingBoard
