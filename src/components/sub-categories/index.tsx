import { useContext, useEffect, useState } from "react";

import { GlobalContext } from "../../state";

import CustomPanel from "../custom-panel/index"
import Alert from "../modals/alert";

function SubCategories() {
  const { state, fetchData } = useContext(GlobalContext)
  const [subCategories, setSubCategories] = useState([])
  const [modalState, setAlertModal] = useState({ open: false, message: "" });

  const handleClose = () => {
    setAlertModal((prev) => {
      return { ...prev, open: false }
    })
  };

  useEffect(() => {
    (async () => {
      const [subCategories, status] = await fetchData({
        path: state.routes.subCategories,
        query: `CategoryId=${state.card_selected.id}`,
      });

      if (status == 200) {
        setSubCategories(subCategories.data?.rows);
      } else {
        setAlertModal({ open: true, message: subCategories.response })
      }

    })()

  }, [])

  return <>
    <CustomPanel resource={state.routes.subCategories} title={"Sub categorias"}>{subCategories}</CustomPanel >
    {modalState.open && <Alert title="ALERTA" message={modalState.message} handleClose={handleClose} />}
  </>

}

export default SubCategories