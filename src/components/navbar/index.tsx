import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "./index.css";

function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [elVisibility, setElVisibility] = useState({
    buy: "initial",
    sell: "initial",
    clients: "none",
    suppliers: "none",
  });

  useEffect(() => {
    switch (pathname) {
      case "/ventas":
        setElVisibility({
          buy: "none",
          sell: "none",
          clients: "initial",
          suppliers: "none",
        });
        break;

      case "/compras":
        setElVisibility({
          buy: "none",
          sell: "none",
          clients: "none",
          suppliers: "initial",
        });
        break;

      case "/":
        setElVisibility({
          buy: "initial",
          sell: "initial",
          clients: "none",
          suppliers: "none",
        });
        break;
    }
  }, [pathname]);

  const handleNavigate = (e) => {
    switch (e.target.id) {
      case "buy":
        navigate("/compras");
        break;

      case "sell":
        navigate("/ventas");
        break;

      case "clients":
        navigate(`${pathname}/clientes`);
        break;

      case "suppliers":
        navigate(`${pathname}/provedores`);
        break;

      default:
        navigate("/");
        break;
    }
  };

  return (
    <nav>
      <div id="logo" onClick={handleNavigate} className="logo">
        DASHBOARD
      </div>

      <ul>
        <li
          id="sell"
          style={{ display: elVisibility.sell }}
          onClick={handleNavigate}
        >
          Ventas
        </li>
        <li
          id="buy"
          style={{ display: elVisibility.buy }}
          onClick={handleNavigate}
        >
          Compras
        </li>
        <li
          id="clients"
          style={{ display: elVisibility.clients }}
          onClick={handleNavigate}
        >
          Clientes
        </li>
        <li
          id="suppliers"
          style={{ display: elVisibility.suppliers }}
          onClick={handleNavigate}
        >
          Proveedores
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
