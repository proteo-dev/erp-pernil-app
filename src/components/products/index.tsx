import { useContext, useEffect, useState } from "react";

import { GlobalContext } from "../../state";

import CustomGrid from "../custom-panel/index"
import Alert from "../modals/alert";

function Products() {
  const { state, fetchData } = useContext(GlobalContext)
  const [products, setProducts] = useState([])
  const [modalState, setAlertModal] = useState({ open: false, message: "" });

  const handleClose = () => {
    setAlertModal((prev) => {
      return { ...prev, open: false }
    })
  };

  useEffect(() => {
    (async () => {
      const [products, status] = await fetchData({
        path: state.routes.products,
        query: `SubcategoryId=${state.card_selected.id}`,
      });

      if (status == 200) {
        setProducts(products.data?.rows);
      } else {
        setAlertModal({ open: true, message: products.response })
      }
    })()

  }, [])

  return <>
    <CustomGrid resource={state.routes.products} title={"Productos"}>{products}</CustomGrid>
    {modalState.open && <Alert title="ALERTA" message={modalState.message} handleClose={handleClose} />}
  </>

}

export default Products