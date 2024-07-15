import { useEffect, useState, useContext } from 'react';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import { GlobalContext } from "../../state";

const columnsProd = [
  { field: 'id', headerName: 'Código', flex: 0.2 },
  { field: 'stock', headerName: 'Stock', flex: 0.2 },
  { field: 'name', headerName: 'Nombre', flex: 1 },
] // agregar categorias,subcat, precios, fecha modificacion

const columnsEntity = [
  { field: 'id', headerName: 'Código', flex: 0.2 },
  { field: 'name', headerName: 'Nombre', flex: 1 },
]

function CustomNoRowsOverlay() {
  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: "center" }}>No hay información para mostrar</Box>
  );
}

export default function Grid({ handleSelect, operation }) {
  const { fetchData, state } = useContext(GlobalContext);

  const [data, setData] = useState({ count: 0, rows: [] });
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 30,
  });

  const getDataFromDb = async ({ field = undefined, value = undefined }) => {
    const { page, pageSize } = paginationModel

    const offset = page * pageSize

    let query = ""
    if (field) query = `${field}=${value}` // valido que me manden para construir una query y la construyo

    let path: string

    if (operation == "ventas") path = state.routes.clients
    else if (operation == "compras") path = state.routes.suppliers
    else path = state.routes.products

    const [response, status] = await fetchData({ path, query: `offset=${offset}&limit=${pageSize}&${query}` });

    if (status == 200) {
      setData(response.data);
    } else {
      alert(response);
    }
  };

  useEffect(() => {
    getDataFromDb({})
  }, [paginationModel])

  const onFilterChange = (e) => {
    if (e?.items[0]?.value) getDataFromDb(e.items[0]) // solamente si le coloqué un valor al filtro hace la busqueda
  }

  return (
    <Box sx={{
      height: "100%", width: '100%', backgroundColor: "rgba(255, 255, 255, 0.63)"
    }}>
      <DataGrid
        rows={data.rows}
        columns={!operation ? columnsProd : columnsEntity}
        pageSizeOptions={[30]}
        paginationModel={paginationModel}
        paginationMode='server'
        rowCount={data.count}
        onPaginationModelChange={setPaginationModel}
        filterMode="server"
        onFilterModelChange={onFilterChange}
        disableRowSelectionOnClick
        slots={{ noRowsOverlay: CustomNoRowsOverlay }}
        onRowClick={handleSelect}
      />
    </Box>
  );
}