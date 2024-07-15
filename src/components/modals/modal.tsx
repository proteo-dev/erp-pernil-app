import { useContext } from "react";

import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";

import { GlobalContext } from "../../state";

export default function InputModal({ resource, handleClose }) {
	const { fetchData, state } = useContext(GlobalContext);

	const handleSubmit = async (e) => {
		e.preventDefault()

		const formElements = e.currentTarget.elements;
		const data = {
			name: formElements.name.value,
		};

		if (resource == state.routes.subCategories) data["CategoryId"] = state.card_selected.id;

		const [response, status] = await fetchData({ method: "POST", path: resource, data })

		if (status == 201) {
			handleClose()
			location.replace("/")
		} else {
			alert(response);
		}
	}

	return <Modal open={true} onClose={() => handleClose()}>
		<ModalDialog>
			<DialogTitle>{resource == state.routes.categories ? "CATEGORÍA" : "SUB-CATEGORÍA"}</DialogTitle>
			<DialogContent>
				Completá la información para crear la {resource == state.routes.categories ? "categoría." : "subcategoría."}
			</DialogContent>
			<form onSubmit={handleSubmit}>
				<Stack spacing={2}>
					<FormControl>
						<FormLabel>Nombre</FormLabel>
						<Input id="name" name="name" autoFocus required />
					</FormControl>
					<Button type="submit">Ok</Button>
				</Stack>
			</form>
		</ModalDialog>
	</Modal>
}

