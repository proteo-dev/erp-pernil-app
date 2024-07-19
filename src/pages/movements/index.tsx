import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { GlobalContext } from "../../state";

import AccountingBoard from "../../components/accounting-board";
import Alert from "../../components/modals/alert";

function Movements() {
  const { state, fetchData } = useContext(GlobalContext);
  const { pathname } = useLocation();
  const [movements, setMovements] = useState([]);
  const [modalState, setAlertModal] = useState({ open: false, message: "" });

  const location = pathname.replace("/", "");

  const handleClose = () => {
    setAlertModal((prev) => {
      return { ...prev, open: false };
    });
  };

  useEffect(() => {
    (async () => {
      const [movements, status] = await fetchData({
        path: state.routes.movements,
        query: `operation=${location}`,
      });

      if (status == 200) {
        setMovements(movements.data?.rows);
      } else {
        setAlertModal({ open: true, message: movements });
      }
    })();
  }, [location]);

  return (
    <>
      <AccountingBoard
        location={location}
        title={location[0].toUpperCase() + location.slice(1)}
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
