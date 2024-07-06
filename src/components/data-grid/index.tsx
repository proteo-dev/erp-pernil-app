import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'Código', flex: 0.1 },
  { field: 'stock', headerName: 'Stock', flex: 0.1 },
  { field: 'name', headerName: 'Nombre', flex: 1 },
]

export default function Grid({ data }) {
  return (
    <Box sx={{
      height: "100%", width: '100%', backgroundColor: "rgba(255, 255, 255, 0.63)"
    }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        pageSizeOptions={[20]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}