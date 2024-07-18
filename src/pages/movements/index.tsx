import { useContext, useEffect, useState } from "react";

import { GlobalContext } from "../../state";

import AccountingBoard from "../../components/accounting-board";
import Alert from "../../components/modals/alert";

function Movements() {
  const { state, fetchData } = useContext(GlobalContext);
  const [movements, setMovements] = useState([]);
  const [modalState, setAlertModal] = useState({ open: false, message: "" });

  const locat = location.pathname.replace("/", "");

  const handleClose = () => {
    setAlertModal((prev) => {
      return { ...prev, open: false };
    });
  };

  useEffect(() => {
    (async () => {
      const [movements, status] = await fetchData({
        path: state.routes.movements,
        query: `operation=${locat}`,
      });

      if (status == 200) {
        setMovements(movements.data?.rows);
      } else {
        setAlertModal({ open: true, message: movements });
      }
    })();
  }, []);

  return (
    <>
      <AccountingBoard
        location={locat}
        title={locat[0].toUpperCase() + locat.slice(1)}
      >
        {movements}
      </AccountingBoard>
      {modalState.open && (
        <Alert
          title="ALERTA"
          message={modalState.message}
          handleClose={handleClose}
        />
      )}
    </>
  );
}

export default Movements;
