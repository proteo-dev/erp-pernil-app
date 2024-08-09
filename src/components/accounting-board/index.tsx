import { useState } from "react";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

import CustomNoRowsOverlay from "../noRows";
import MovementModal from "../modals/movement-modal";

import "./index.css";

const columnsOnSell = [
  {
    field: "id",
    headerName: "Código",
    flex: 0.2,
    filterable: false,
  },
  {
    field: "Product",
    headerName: "Descripción",
    flex: 1,
    valueGetter: (value: { name: string }) => value?.name,
    filterable: false,
  },
  {
    field: "units",
    headerName: "Unidades",
    flex: 0.2,
    filterable: false,
  },
  {
    field: "x",
    headerName: "$/u",
    flex: 0.2,
    filterable: false,
    valueGetter: (_value: object, row: { amount: number; units: number }) =>
      row.amount / row.units,
  },
  {
    field: "amount",
    headerName: "Total",
    flex: 0.2,
    filterable: false,
  },
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
    valueGetter: (value: { fullname: string }) => value?.fullname,
  },
  {
    field: "Client",
    headerName: "Cliente",
    flex: 0.3,
    minWidth: "100px",
    filterable: false,
    valueGetter: (value: { name: string }) => value?.name,
  },
  {
    field: "createdAt",
    headerName: "Fecha",
    flex: 0.3,
    minWidth: "100px",
    filterable: false,
    valueGetter: (value: string) => value.split("T")[0],
  },
];

const columnsOnBuy = [
  {
    field: "id",
    headerName: "Código",
    flex: 0.2,
    filterable: false,
  },
  {
    field: "Product",
    headerName: "Descripción",
    flex: 1,
    valueGetter: (value: { name: string }) => value?.name,
    filterable: false,
  },
  {
    field: "units",
    headerName: "Unidades",
    flex: 0.2,
    filterable: false,
  },
  {
    field: "amount",
    headerName: "$/u",
    flex: 0.2,
    filterable: false,
  },
  {
    field: "x",
    headerName: "Total",
    flex: 0.2,
    filterable: false,
    valueGetter: (_value, row: { amount: number; units: number }) =>
      row.amount * row.units, // amountt debería tener el costo
  },
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
    valueGetter: (value: { fullname: string }) => value?.fullname,
  },
  {
    field: "Supplier",
    headerName: "Proveedor",
    flex: 0.3,
    minWidth: "100px",
    filterable: false,
    valueGetter: (value: { name: string }) => value?.name,
  },
  {
    field: "createdAt",
    headerName: "Fecha",
    flex: 0.3,
    minWidth: "100px",
    filterable: false,
    valueGetter: (value: string) => value.split("T")[0],
  },
];

function AccountingBoard({ title, location, children, reload }) {
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
          columns={location == "ventas" ? columnsOnSell : columnsOnBuy}
          pageSizeOptions={[30, 100]}
          paginationMode="server"
          disableRowSelectionOnClick
          slots={{ noRowsOverlay: CustomNoRowsOverlay }}
          rowCount={children.length}
        />
      </Box>
      {modalState.open && (
        <MovementModal
          operation={location}
          handleClose={handleClose}
          reload={reload}
        />
      )}
    </div>
  );
}

export default AccountingBoard;
