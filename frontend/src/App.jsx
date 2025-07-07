import { Routes, Route } from "react-router-dom";
import MainLayout from "./component/Mainlayout";
import AuthLayout from "./component/Authlayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import Verify from "./pages/Verify";
import Contact from "./pages/Contact";
import About from "./pages/About"; 
import Collection from './pages/Collection';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Orders from'./pages/Orders';
import PlaceOrder from './pages/PlaceOrder';
import { ToastContainer } from "react-toastify";
import VerifyOtp from "./pages/VerifyOtp";
import Newpassword from "./pages/Newpassword";

// ...other imports

function App() {
  return (
    <>
    <ToastContainer/>
      <Routes>
        {/* Routes with Navbar/Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
           <Route path="/verify" element={<Verify />} />
            <Route path="/login" element={<Login />} />
        </Route>

        {/* Routes without Navbar/Footer */}
        <Route element={<AuthLayout />}>
         
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/reset-password" element={<Newpassword/>} />


         
        </Route>
      </Routes>
    </>
  );
}

export default App;

