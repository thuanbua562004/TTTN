import { Outlet, Link } from "react-router-dom";
import Header from "./Header"
import Footer from "./Footer"
import ModalLogin from "./ModalLogin";
const Layout = () => {
  return (
    <>
{/* HEADER */}
      <Header/>
      <Outlet />

{/* FOOTER */}
      <Footer/>
      <ModalLogin/>
    </>
  )
};

export default Layout;