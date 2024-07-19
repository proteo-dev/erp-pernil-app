import Navbar from "../../components/navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navbar />
      <section className="main">
        <Outlet />
      </section>
    </>
  );
}

export default Layout;
