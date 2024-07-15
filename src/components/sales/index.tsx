import { useContext, useEffect, useState } from "react";

import { GlobalContext } from "../../state";

import AccountingBoard from "../accounting-board"

function Sales() { // se re-rendiriza 3 veces
  const { state, fetchData } = useContext(GlobalContext)
  const [movements, setMovements] = useState([])

  useEffect(() => {
    (async () => {
      const [movements, status] = await fetchData({
        path: state.routes.movements,
        query: `operation=venta`
      })

      if (status == 200) {
        setMovements(movements.data?.rows);
      } else {
        alert(movements)
      }

    })()
  }, [])

  return <AccountingBoard location="ventas" title={"Ventas"}>{movements}</AccountingBoard>
}

export default Sales