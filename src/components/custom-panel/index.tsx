import { useContext, useState } from "react";
import { GlobalContext } from "../../state";
import { useNavigate, useLocation } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/joy/IconButton";
import Tooltip from "@mui/joy/Tooltip";
import Box from "@mui/joy/Box";
import Fab from "@mui/material/Fab";
import LeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import AddIcon from "@mui/icons-material/Add";

import InputModal from "../modals/modal";
import ProductModal from "../modals/product-modal";
import AgentModal from "../modals/agent";
import Alert from "../modals/alert";

import "./index.css";

function Panel({ location, title, reload, children = [] }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state, fetchData } = useContext(GlobalContext);
  const [modalState, setModal] = useState({
    open: false,
    action: "POST",
    elementId: "",
  });
  const [alertModalState, setAlertModal] = useState({
    open: false,
    message: "",
  });

  const handleClose = () => {
    setModal((prev) => {
      return { ...prev, open: false };
    });
    reload();
  };

  const handleCloseAlert = () => {
    setAlertModal((prev) => {
      return { ...prev, open: false };
    });
  };

  const changePanel = (id) => {
    switch (location) {
      case state.routes.subCategories:
        navigate(`${pathname}/${id}/productos`);
        break;

      case state.routes.products:
        setModal({ action: "GET", open: true, elementId: id });
        break;

      case state.routes.clients:
        setModal({ action: "GET", open: true, elementId: id });
        break;

      case state.routes.suppliers:
        setModal({ action: "GET", open: true, elementId: id });
        break;

      default:
        navigate(`/${id}/subcategorias`);
        break;
    }
  };

  const deleteItem = async (id) => {
    const [response, status] = await fetchData({
      path: `${location}/${id}`,
      method: "DELETE",
    });

    if (status != 200) return setAlertModal({ open: true, message: response });

    reload();
  };

  return (
    <div className="container">
      <div className="background">
        <Fab onClick={() => navigate(-1)} size="small" aria-label="edit">
          <LeftIcon />
        </Fab>
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
      <div className="panel">
        {children.map((el) => (
          <Box
            sx={{ position: "relative" }}
            key={el.id}
            onClick={() => changePanel(el.id)}
            className="card"
          >
            <Box className={"item"}>{el.name}</Box>
            <Tooltip
              sx={{ position: "absolute", bottom: 0, right: 1 }}
              title="Eliminar"
            >
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  deleteItem(el.id);
                }}
              >
                <DeleteIcon color="error" sx={{ height: "17px" }} />
              </IconButton>
            </Tooltip>
          </Box>
        ))}
      </div>
      {modalState.open &&
        (location == state.routes.products ? (
          <ProductModal
            productId={modalState.elementId}
            action={modalState.action}
            handleClose={handleClose}
          />
        ) : location == state.routes.clients ||
          location == state.routes.suppliers ? (
          <AgentModal
            location={location}
            agentId={modalState.elementId}
            action={modalState.action}
            handleClose={handleClose}
          />
        ) : (
          <InputModal location={location} handleClose={handleClose} />
        ))}
      {alertModalState.open && (
        <Alert
          title="ALERTA"
          message={alertModalState.message}
          handleClose={handleCloseAlert}
        />
      )}
    </div>
  );
}

export default Panel;
