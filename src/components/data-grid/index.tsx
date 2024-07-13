import { useState } from 'react';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columnsProd = [
  { field: 'id', headerName: 'Código', flex: 0.2 },
  { field: 'stock', headerName: 'Stock', flex: 0.2 },
  { field: 'name', headerName: 'Nombre', flex: 1 },
]
const columnsEntity = [
  { field: 'id', headerName: 'Código', flex: 0.2 },
  { field: 'name', headerName: 'Nombre', flex: 1 },
]

export default function Grid({ data, count, handleSelect, handlePaginate, type }) {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 30,
    page: 0,
  });

  const handleClick = (e) => {
    handleSelect(e)
  }

  return (
    <Box sx={{
      height: "100%", width: '100%', backgroundColor: "rgba(255, 255, 255, 0.63)"
    }}>
      <DataGrid
        rows={data}
        columns={type == 1 ? columnsProd : columnsEntity}
        pageSizeOptions={[10, 20, 30]}
        paginationModel={paginationModel}
        paginationMode='server'
        rowCount={count}
        onPaginationModelChange={(e) => {
          handlePaginate(e)
          setPaginationModel(e)
        }}
        disableRowSelectionOnClick
        onRowClick={handleClick}
      />
    </Box>
  );
}