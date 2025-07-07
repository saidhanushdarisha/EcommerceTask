import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import SearchBar from "../component/SearchBar";

export default function MainLayout() {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Navbar />
      <SearchBar />
      <Outlet />
      <Footer />
    </div>
  );
}
