import { useContext, useState } from "react";
import { GlobalContext } from "../../state";
import { useNavigate, useLocation } from "react-router-dom";

import ProductModal from "../modals/product-modal";
import InputModal from "../modals/modal";
import "./index.css";

function Panel({ resource, title, children = [] }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { state } = useContext(GlobalContext);
  const [modalState, setModal] = useState({
    open: false,
    action: "POST",
    elementId: "",
  });

  const handleClose = () =>
    setModal((prev) => {
      return { ...prev, open: false };
    });

  const changePanel = (id: string) => {
    switch (resource) {
      case state.routes.subCategories:
        navigate(`${pathname}/${id}/productos`);
        break;
      case state.routes.products:
        setModal({ action: "GET", open: true, elementId: id });
        break;

      default:
        navigate(`/${id}/subcategorias`);
        break;
    }
  };

  return (
    <div className="container">
      <div className="background">{title}</div>
      <div className="panel">
        {children.map((el) => (
          <div
            onClick={(e) => changePanel(e.target.id)}
            key={el.id}
            id={el.id}
            className={"item"}
          >
            {el.name}
          </div>
        ))}
      </div>
      <div
        className="button"
        onClick={() =>
          setModal((prev) => {
            return { ...prev, action: "POST", open: true };
          })
        }
      >
        Crear
      </div>
      {modalState.open &&
        (resource == state.routes.products ? (
          <ProductModal
            productId={modalState.elementId}
            action={modalState.action}
            handleClose={handleClose}
          />
        ) : (
          <InputModal resource={resource} handleClose={handleClose} />
        ))}
    </div>
  );
}

export default Panel;
