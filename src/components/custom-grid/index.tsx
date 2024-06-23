import { useContext } from "react";
import { GlobalContext } from "../../state";
import { useNavigate } from "react-router-dom";

import "./index.css"

function Grid({ resource, title, children }) {
	const { state, setState } = useContext(GlobalContext)

	const navigate = useNavigate()

	const changeGrid = () => {
		switch (resource) {
			case state.routes.subCategories:
				navigate("/productos");
				break;

			// case state.routes.products:
			// 	const mainEl = document.querySelector(".container") as HTMLElement;

			// 	let modal = document.createElement("product-modal");
			// 	modal.setAttribute("action", "get");

			// 	mainEl.appendChild(modal)
			// 	break;

			default:
				navigate("/subcategorias");
				break;
		}
	}

	const itemEls = document.querySelectorAll(".item") as NodeList;

	for (const itemEl of itemEls) { // checkear
		itemEl.addEventListener("click", (e) => {
			setState({ card_selected: e.target });

			changeGrid();
		});
	}

	const handleCreate = () => {
		const mainEl = document.querySelector(".container") as HTMLElement;
		const buttonEl = document.querySelector(".button") as HTMLElement;

		buttonEl.addEventListener("click", () => {
			const path = this.getAttribute("resource");
			let modal;

			if (path == state.routes.products)
				modal = document.createElement("product-modal");
			else {
				modal = document.createElement("input-modal");
				modal.setAttribute("resource", path);
			}

			mainEl.appendChild(modal);
		})
	}

	return <div className="container">
		<div className="background">{title}</div>
		<div className="grid">{children.map((el) => <div key={el.id} id={el.id} className={"item"}>{el.name}</div>)}</div>
		<div onClick={handleCreate} className="button">Crear</div>
	</div>
}

export default Grid




