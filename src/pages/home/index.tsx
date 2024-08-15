import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { GlobalContext } from "../../state";

import CustomPanel from "../../components/custom-panel";
import Alert from "../../components/modals/alert";

function Home() {
  const { state, fetchData } = useContext(GlobalContext);
  const { categoryId, subcategoryId } = useParams();
  const [content, setContent] = useState([]);

  const [modalState, setAlertModal] = useState({ open: false, message: "" });

  const fullUrl = useLocation().pathname.split("/");
  const location = fullUrl[fullUrl.length - 1];

  let title: string;
  let path: string;
  let query: string;

  switch (location) {
    default:
      title = "Categorias";
      path = state.routes.categories;
      break;

    case "subcategorias":
      title = "Sub categorias";
      path = state.routes.subCategories;
      query = `CategoryId=${categoryId}`;
      break;

    case "productos":
      title = "Productos";
      path = state.routes.products;
      query = `SubcategoryId=${subcategoryId}`;
      break;

    case "clientes":
      title = "Clientes";
      path = state.routes.clients;
      break;

    case "proveedores":
      title = "Proveedores";
      path = state.routes.suppliers;
      break;
  }

  const getData = async () => {
    const [response, status] = await fetchData({
      path: path,
      query,
    });

    if (status != 200) return setAlertModal({ open: true, message: response });

    setContent(response.data?.rows);
  };

  const handleClose = () => {
    setAlertModal((prev) => {
      return { ...prev, open: false };
    });
  };

  useEffect(() => {
    getData();
  }, [location]);

  return (
    <>
      <CustomPanel location={path} title={title} reload={getData}>
        {content}
      </CustomPanel>
      {modalState.open && (
        <Alert
          title="ALERTA"
          message={modalState.message}
          handleClose={handleClose}
        />
      )}
    </>
  );
}

export default Home;
