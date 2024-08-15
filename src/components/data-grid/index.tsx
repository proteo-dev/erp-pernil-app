import { useEffect, useState, useContext } from "react";

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

import CustomNoRowsOverlay from "../noRows";
import Alert from "../modals/alert";

import { GlobalContext } from "../../state";
import { useLocation } from "react-router-dom";

const columnsProd = [
  { field: "id", headerName: "Código", flex: 0.2 },
  { field: "name", headerName: "Descripción", flex: 1 },
  { field: "stock", headerName: "Stock", flex: 0.2, filterable: false },
  {
    field: "cost",
    headerName: "Costo",
    flex: 0.2,
    filterable: false,
  },
  {
    field: "profit",
    headerName: "Ganancia",
    flex: 0.2,
    filterable: false,
  },
  {
    field: "sellPrice",
    headerName: "Precio",
    flex: 0.2,
    filterable: false,
  },
  {
    field: "Category",
    headerName: "Categoría",
    flex: 0.3,
    valueGetter: (value: { name: string }) => value?.name,
  },
  {
    field: "Subcategory",
    headerName: "Subcategoría",
    flex: 0.3,
    minWidth: "100px",
    valueGetter: (value: { name: string }) => value?.name,
  },
  {
    field: "updatedAt",
    headerName: "Fecha modificación",
    flex: 0.4,
    filterable: false,
    valueGetter: (value: string) => new Date(value).toLocaleString("es-AR"),
  },
];

const columnsAgent = [
  { field: "id", headerName: "Código", flex: 0.2 },
  { field: "name", headerName: "Nombre", flex: 1 },
];

export default function Grid({ handleSelect, operation }) {
  const { fetchData, state } = useContext(GlobalContext);
  const { pathname } = useLocation();
  const [modalState, setAlertModal] = useState({ open: false, message: "" });
  const [data, setData] = useState({ count: 0, rows: [] });
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 30,
  });

  const handleCloseAlert = () => {
    setAlertModal((prev) => {
      return { ...prev, open: false };
    });
  };

  const getDataFromDb = async ({
    field: filterField = "",
    value: filterValue = "",
  }) => {
    const { page, pageSize } = paginationModel;

    const offset = page * pageSize;

    let path: string;

    let query = "";
    if (filterValue) query = `${filterField}=${filterValue}&`; // valido si me llegaron datos de un filtro y construyo la query

    const field = pathname.includes("ventas") ? "sell" : "buy"; // verifico donde estoy para solicitar productos de ventas o compras

    switch (operation) {
      case "ventas":
        path = state.routes.clients;
        break;
      case "compras":
        path = state.routes.suppliers;
        break;
      case "productos":
        query += `${field}=true`;

        path = state.routes.products;
        break;
    }

    const [data, status] = await fetchData({
      path,
      query: `isActive=true&offset=${offset}&${query}`,
    });

    if (status == 200) {
      setData(data.data);
    } else {
      setAlertModal({ open: true, message: data });
    }
  };

  useEffect(() => {
    getDataFromDb({});
  }, [paginationModel]);

  const onFilterChange = ({ items }) => {
    if (items[0].value?.length >= 3) getDataFromDb(items[0]);
    else if (!items[0].value) getDataFromDb({}); // si NO hay contenido en el fitro, pido todos los productos
  };

  return (
    <>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.63)",
        }}
      >
        <DataGrid
          rows={data.rows}
          columns={operation == "productos" ? columnsProd : columnsAgent}
          pageSizeOptions={[30]}
          paginationModel={paginationModel}
          paginationMode="server"
          rowCount={data.count}
          onPaginationModelChange={setPaginationModel}
          filterMode="server"
          onFilterModelChange={onFilterChange}
          disableRowSelectionOnClick
          slots={{ noRowsOverlay: CustomNoRowsOverlay }}
          onRowClick={handleSelect}
        />
      </Box>
      {modalState.open && (
        <Alert
          title="ALERTA"
          message={modalState.message}
          handleClose={handleCloseAlert}
        />
      )}
    </>
  );
}
