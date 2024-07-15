import { useContext, useEffect, useState } from "react";

import { GlobalContext } from "../../state";

import CustomPanel from "../custom-panel/index"
import Alert from "../modals/alert";

function Categories() {
  const { state, fetchData } = useContext(GlobalContext)
  const [categories, setCategories] = useState([])
  const [modalState, setAlertModal] = useState({ open: false, message: "" });

  const handleClose = () => {
    setAlertModal((prev) => {
      return { ...prev, open: false }
    })
  };

  useEffect(() => {
    (async () => {
      const [categories, status] = await fetchData({ path: state.routes.categories });

      if (status == 200) {
        setCategories(categories.data?.rows);
      } else {
        setAlertModal({ open: true, message: categories.response })
      }

    })()
  }, [])

  return <>
    <CustomPanel resource={state.routes.categories} title={"Categorias"}>{categories}</CustomPanel >
    {modalState.open && <Alert title="ALERTA" message={modalState.message} handleClose={handleClose} />}
  </>

}

export default Categories