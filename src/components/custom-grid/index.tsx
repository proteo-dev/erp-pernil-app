import { useContext, useState } from "react";
import { GlobalContext } from "../../state";
import { useNavigate } from "react-router-dom";

import ProductModal from "../modals/product-modal";
import InputModal from "../modals/modal";
import "./index.css";

function Grid({ resource, title, children = [] }) {
  const navigate = useNavigate();

  const { state, setState } = useContext(GlobalContext);
  const [modalState, setModal] = useState({ open: false, action: "POST" });

  const changeGrid = () => {
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

  const handleCreate = () => {
    setModal((prev) => {
      return { ...prev, open: true }
    })
  };

  return (
    <div className="container">
      <div className="background">{title}</div>
      <div className="grid">
        {children.map((el) => (
          <div onClick={(e) => { setState({ card_selected: e.target }); changeGrid(); }} key={el.id} id={el.id} className={"item"}>{el.name}</div>
        ))}
      </div>
      <div onClick={handleCreate} className="button">
        Crear
      </div>
      {modalState.open ? resource == state.routes.products ? <ProductModal action={modalState.action} /> : <InputModal resource={resource} /> : ""}
    </div>
  );
}

export default Grid;
