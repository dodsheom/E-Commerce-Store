import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "./services/api";

import Products from "./pages/Products.jsx";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

import AdminDashboard from "./pages/AdminDashboard";

import AdminUsers from "./pages/AdminUsers";



import "./App.css";

function App() {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = async () => {
    try {
      const res = await api.get("/cart");
      setCartCount(res.data.items.length);
    } catch (err) {
      setCartCount(0);
    }
  };

  useEffect(() => {
    updateCartCount();
    window.updateCartCount = updateCartCount;
  }, []);

  return (
    <BrowserRouter>
      <Header cartCount={cartCount} />

      <Routes>
        <Route path="/" element={<h2 style={{ padding: 20 }}>مرحبًا يكم القاضي للسيارات</h2>} />

        <Route
          path="/products"
          element={<Products updateCartCount={updateCartCount} />}
        />

        <Route path="/cart" element={<Cart />} />

        <Route path="/login" element={<Login />} />

        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/admin/users" element={<AdminUsers />} />


      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
