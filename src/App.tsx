import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import LogIn from "./components/Login";
// import NewProducts from "./components/NewProducts";
// import BuyProducts from "./components/BuyProducts";
// import AllProducts from "./components/AllProducts";
// import SpecialProducts from "./components/SpecialProducts";
// import AllGetProducts from "./components/AllGetProducts";
// import Contact from "./components/Contact";
// import CheckOut from "./components/CheckOut";
import Search from "./components/Search";
import "./css/style.css";

// interface MatchParams {
//   url: string;
// }

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-account" element={<LogIn />} />
        {/* <Route path="/new-products" element={<NewProducts />} /> */}
        {/* <Route path="/special-products" element={<SpecialProducts />} /> */}
        {/* <Route path="/all-products" element={<AllGetProducts />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
        {/* <Route path="/checkout" element={<CheckOut />} /> */}

        {/* <Route path="/show-products/:url" element={<AllProducts />} /> */}

        {/* <Route path="/buy-products/:url" element={<BuyProducts />} /> */}

        <Route path="/search-products/:url" element={<Search data={""} />} />

        {/* Redirect to Home if no matching route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
