import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ScrollToTop } from "../components/ui/ScrollToTop";

export const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
      <ScrollToTop />
    </div>
  );
};
