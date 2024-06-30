import { useEffect, useState, useContext } from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalOverflow from '@mui/joy/ModalOverflow';
import Typography from '@mui/joy/Typography';

import Input from '../floating-label-input';

import { GlobalContext } from "../../state";

export default function SearchModal({ catchSelectedItem, operation = null }) {
	const [open, setOpen] = useState(false);
	const [data, setData] = useState([]);

	const { fetchData, state } = useContext(GlobalContext);

	useEffect(() => {
		const getDataFromDb = async () => {
			let path: string

			if (operation == "ventas") path = state.routes.clients
			else if (operation == "compras") path = state.routes.suppliers
			else path = state.routes.products

			const [response, status] = await fetchData({ path });

			if (status == 200) {
				setData(response.data);
			} else {
				console.log(response);
			}
		};

		getDataFromDb()
	}, []);

	return <>
		<Button
			onClick={() => {
				setOpen(true);
			}}>Buscar</Button>
		<Modal
			open={open}
			onClose={() => setOpen(false)}
		>
			<ModalOverflow>
				<ModalDialog aria-labelledby="modal-dialog-overflow" layout="fullscreen">
					<ModalClose />
					<Typography id="modal-dialog-overflow" level="h2">Búsqueda</Typography>
					<FormControl>
						<Input label="Descripción" type="text" />
					</FormControl>
					<List>
						{data.map((el, index) => (
							<ListItem id={el.id}
								key={index}
								component="button"
								sx={{ padding: "20px 0 20px 10px", fontSize: "20px", fontWeight: "bold", marginBottom: "10px", backgroundColor: "rgb(180 183 186 / 16%)", borderRadius: "6px" }}
								onClick={(e) => { setOpen(false); catchSelectedItem({ target: e.target, operation }) }}>
								{el.name[0].toUpperCase() + el.name.slice(1)}
							</ListItem>
						))}
					</List>
				</ModalDialog>
			</ModalOverflow>
		</Modal >
	</>
}
