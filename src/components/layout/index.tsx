import Navbar from "../../components/navbar";
import { Outlet } from "react-router-dom";

import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";

import "./index.css";

function Layout() {
  return (
    <>
      <Navbar />
      <section className="main">
        <Outlet />
      </section>
      <Box className="footer" component="footer">
        <Typography level="body-xs" fontWeight="bold" textAlign="center">
          © Proteo Software
        </Typography>
      </Box>
    </>
  );
}

export default Layout;
