import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LogIn from "./components/Login";
import NewProducts from "./components/NewProducts";
import BuyProducts from "./components/BuyProducts";
import AllProducts from "./components/AllProducts";
import SpecialProducts from "./components/SpecialProducts";
import AllGetProducts from "./components/AllGetProducts";
import Contact from "./components/Contact";
import CheckOut from "./components/CheckOut";
import Search from "./components/Search";
import AdminPanel from "./views/AdminPenal";
import "./css/style.css";

const App: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname === "/admin";

  return (
    <>
      <ToastContainer />
      {!isAdminRoute && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-account" element={<LogIn />} />
        <Route path="/new-products" element={<NewProducts />} />
        <Route path="/special-products" element={<SpecialProducts />} />
        <Route path="/all-products" element={<AllGetProducts />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/show-products/:id" element={<AllProducts />} />
        <Route path="/buy-products/:id" element={<BuyProducts />} />
        <Route path="/search-products/:name" element={<Search />} />
        <Route path="/admin" element={<AdminPanel />} />
        {/* Redirect to Home if no matching route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {!isAdminRoute && (
        <div className="container">
          <Footer />
        </div>
      )}
    </>
  );
};

const WrappedApp: React.FC = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default WrappedApp;
