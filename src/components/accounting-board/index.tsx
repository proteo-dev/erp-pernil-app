import { useState } from "react";
import MovementModal from "../modals/movement-modal";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

import "./index.css";

const columns = [
  {
    field: "id",
    headerName: "Código",
    flex: 0.2,
  },
  {
    field: "Product",
    headerName: "Descripción",
    flex: 1,
    valueGetter: (value: { name: string }) => value?.name,
  },
  { field: "units", headerName: "Unidades", flex: 0.2, filterable: false },
  {
    field: "x",
    headerName: "$/u",
    flex: 0.2,
    filterable: false,
    valueGetter: (_value: object, row: { amount: number; units: number }) =>
      row.amount / row.units,
  },
  { field: "amount", headerName: "Total", flex: 0.2, filterable: false },
  {
    field: "paymentMethod",
    headerName: "Forma de pago",
    flex: 0.3,
    filterable: false,
  },
  {
    field: "User",
    headerName: "Usuario",
    flex: 0.3,
    minWidth: "100px",
    filterable: false,
    valueGetter: (value: { fullName: string }) => value?.fullName,
  },
  {
    field: "createdAt",
    headerName: "Fecha",
    flex: 0.3,
    minWidth: "100px",
    filterable: false,
    valueGetter: (value: string) => value.split("T")[0],
  },
  // agregar columna cliente/proveedor con su respectivo nombre
];

function AccountingBoard({ title, location, children }) {
  const [modalState, setModal] = useState({ open: false, action: "POST" });

  const handleClose = () => {
    setModal((prev) => {
      return { ...prev, open: false };
    });
  };

  return (
    <div className="table-container">
      <div className="table-background">
        <div style={{ width: "40px" }}></div>
        <h2>{title}</h2>
        <Fab
          onClick={() =>
            setModal((prev) => {
              return { ...prev, action: "POST", open: true };
            })
          }
          size="small"
          aria-label="edit"
        >
          <AddIcon />
        </Fab>
      </div>

      <Box
        sx={{
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.63)",
        }}
      >
        <DataGrid
          rows={children}
          columns={columns}
          pageSizeOptions={[30, 100]}
          paginationMode="server"
          disableRowSelectionOnClick
          rowCount={children.length}
        />
      </Box>
      {modalState.open && (
        <MovementModal operation={location} handleClose={handleClose} />
      )}
    </div>
  );
}

export default AccountingBoard;
