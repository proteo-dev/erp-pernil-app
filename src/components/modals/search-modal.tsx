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
import DataGrid from "../data-grid"

import { GlobalContext } from "../../state";

export default function SearchModal({ catchSelectedItem, operation = null }) {
	const [open, setOpen] = useState(false);
	const [data, setData] = useState({ count: 0, rows: [] });

	const { fetchData, state } = useContext(GlobalContext);

	const getDataFromDb = async ({ page = 0, size = 30 }) => {
		let path: string

		const offset = page * size
		const limit = size

		if (operation == "ventas") path = state.routes.clients
		else if (operation == "compras") path = state.routes.suppliers
		else path = state.routes.products

		const [response, status] = await fetchData({ path, query: `offset=${offset}&limit=${limit}` });

		if (status == 200) {
			setData(response.data);
		} else {
			alert(response);
		}
	};

	useEffect(() => {
		getDataFromDb({})
	}, []);

	const handleSelect = (e) => {
		catchSelectedItem({ id: e.id, operation })
		setOpen(false);
	}

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
					{/* <FormControl>
						<Input label="Descripción" type="text" />
					</FormControl> */}
					<DataGrid type={!operation ? 1 : 2} count={data.count} data={data.rows} handleSelect={handleSelect} handlePaginate={getDataFromDb} />
				</ModalDialog>
			</ModalOverflow>
		</Modal >
	</>
}
