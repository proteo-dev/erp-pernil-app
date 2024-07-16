import { useContext, useEffect, useState } from "react";

import { GlobalContext } from "../../state";

import AccountingBoard from "../accounting-board"
import Alert from "../modals/alert";

function Sales() { // se re-rendiriza 3 veces
  const { state, fetchData } = useContext(GlobalContext)
  const [movements, setMovements] = useState([])
  const [modalState, setAlertModal] = useState({ open: false, message: "" });

  const handleCloseAlert = () => {
    setAlertModal((prev) => {
      return { ...prev, open: false }
    })
  };

  useEffect(() => {
    (async () => {
      const [movements, status] = await fetchData({
        path: state.routes.movements,
        query: `operation=venta`
      })

      if (status == 200) {
        setMovements(movements.data?.rows);
      } else {
        setAlertModal({ open: true, message: movements.response })
      }

    })()
  }, [])

  return <>
    <AccountingBoard location="ventas" title={"Ventas"}>{movements}</AccountingBoard>
    {modalState.open && <Alert title="ALERTA" message={modalState.message} handleClose={handleCloseAlert} />}
  </>

}

export default Sales