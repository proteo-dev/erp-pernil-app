import { useContext, useState } from "react";
import { GlobalContext } from "../../state";
import { useNavigate } from "react-router-dom";

import ProductModal from "../modals/product-modal";
import InputModal from "../modals/modal";
import "./index.css";

function Panel({ resource, title, children = [] }) {
  const navigate = useNavigate();

  const { state, setState } = useContext(GlobalContext);
  const [modalState, setModal] = useState({ open: false, action: "POST" });

  const changePanel = () => {
    switch (resource) {
      case state.routes.subCategories:
        navigate("/productos");
        break;
      case state.routes.products:
        setModal({ action: "GET", open: true })
        break;

      default:
        navigate("/subcategorias");
        break;
    }
  };

  const handleClose = () => setModal((prev) => {
    return { ...prev, open: false }
  })

  return (
    <div className="container">
      <div className="background">{title}</div>
      <div className="panel">
        {children.map((el) => (
          <div onClick={(e) => { setState({ card_selected: e.target }); changePanel(); }} key={el.id} id={el.id} className={"item"}>{el.name}</div>
        ))}
      </div>
      <div
        className="button"
        onClick={() => setModal((prev) => {
          return { ...prev, open: true }
        })}>
        Crear
      </div>
      {modalState.open && (resource == state.routes.products ? <ProductModal action={modalState.action} handleClose={handleClose} /> : <InputModal resource={resource} handleClose={handleClose} />)}
    </div>
  );
}

export default Panel;
