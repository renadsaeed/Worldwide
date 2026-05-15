import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Logo from "./Logo";
import Styles from "./Sidebar.module.css";
import AppNav from "./AppNav";
export default function Sidebar() {
  return (
    <div className={Styles.Sidebar} style={{ flex: "1" }}>
      <Logo />
      <AppNav />
      <Outlet />
      <Footer />
    </div>
  );
}
