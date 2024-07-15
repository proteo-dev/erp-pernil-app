import { useContext, useEffect, useState } from "react";

import { GlobalContext } from "../../state";

import AccountingBoard from "../accounting-board"

function Buys() {
  const { state, fetchData } = useContext(GlobalContext)
  const [movements, setMovements] = useState([])

  useEffect(() => {
    (async () => {
      const [movements, status] = await fetchData({
        path: state.routes.movements,
        query: `operation=compra`
      })

      if (status == 200) {
        setMovements(movements.data?.rows);
      }

    })()
  }, [])

  return <AccountingBoard location="compras" title={"Compras"}>{movements}</AccountingBoard>
}

export default Buys