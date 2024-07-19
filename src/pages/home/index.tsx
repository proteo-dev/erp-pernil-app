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
  let resource: string;
  let query: string;

  switch (location) {
    case "subcategorias":
      title = "Sub categorias";
      resource = state.routes.subCategories;
      query = `CategoryId=${categoryId}`;
      break;

    case "productos":
      title = "Productos";
      resource = state.routes.products;
      query = `SubcategoryId=${subcategoryId}`;
      break;

    default:
      title = "Categorias";
      resource = state.routes.categories;
      break;
  }

  const handleClose = () => {
    setAlertModal((prev) => {
      return { ...prev, open: false };
    });
  };

  useEffect(() => {
    (async () => {
      const [response, status] = await fetchData({
        path: resource,
        query,
      });

      if (status == 200) {
        setContent(response.data?.rows);
      } else {
        setAlertModal({ open: true, message: response });
      }
    })();
  }, [location]);

  return (
    <>
      <CustomPanel resource={resource} title={title}>
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
