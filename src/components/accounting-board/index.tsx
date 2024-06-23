import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../state";
// import { useNavigate } from "react-router-dom";

import "./index.css"

function AccountingBoard() {
	const { state, fetchData } = useContext(GlobalContext)
	const [movements, setMovements] = useState([])

	const path = location.pathname.replace("/", "")

	useEffect(() => {
		(async () => {
			const operation = path == "ventas" ? "venta" : "compra"

			const [movements, status] = await fetchData({
				path: state.routes.movements,
				query: `operation=${operation}`
			})

			if (status == 200) {
				setMovements(movements.data)
			}
		})()
	}, [])

	const capitalizedText = path[0].toUpperCase() + path.slice(1)

	return <div className="container">
		<div className="background">{capitalizedText}</div>
		<div className='table-container'>
			<table>
				<thead>
					<tr>
						<th>N° operación</th>
						<th>Monto</th>
						<th>Unidades</th>
						<th>Usuario</th>
						<th>{path == "ventas" ? "Cliente" : "Proveedor"}</th>
						<th>Fecha</th>
					</tr>
				</thead>
				<tbody>
					{movements.map((el) => <tr key={el.id}>
						<td>{el.id}</td>
						<td>${el.amount}</td>
						<td>{el.units}</td>
						<td>{el.User.fullName}</td>
						<td>{el.Client?.name || el.Supplier?.name}</td>
						<td>{el.createdAt.split("T")[0]}</td>
					</tr>)
					}
				</tbody>
			</table>
		</div>
		<div className="button">Crear</div>
	</div>
}

// 	addListeners() {
// 		const mainEl = this.shadow.querySelector(".container") as HTMLElement;
// 		const buttonEl = this.shadow.querySelector(".button") as HTMLElement;

// 		buttonEl.addEventListener("click", () => {
// 			const modal = document.createElement("movement-modal");

// 			modal.setAttribute("operation", this.path);

// 			mainEl.appendChild(modal);
// 		})
// 	}
// }

export default AccountingBoard
