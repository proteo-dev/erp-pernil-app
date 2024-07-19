import { useNavigate } from "react-router-dom";

import "./index.css";

function Navbar() {
  const navigate = useNavigate();

  const handleNavigate = (e) => {
    switch (e.target.id) {
      case "buy":
        navigate("/compras");
        break;
      case "sell":
        navigate("/ventas");
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
        <li id="sell" onClick={handleNavigate}>
          Ventas
        </li>
        <li id="buy" onClick={handleNavigate}>
          Compras
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
