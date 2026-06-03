import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import FirstPage from "./components/FirstPage";
import ProductDetails from "./components/ProductDetails";
import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";
import Login from "./components/Login";
import Register from "./components/Register";
import SearchPage from "./components/SearchPage";
import Profile from "./components/Profile";
import OrderHistory from "./components/OrderHistory";
import OrderDetails from "./components/OrderDetails";
import PrivateRoute from "./components/PrivateRoute";
import About from "./components/About";
import Contact from "./components/Contact";
import CategoryPage from "./components/CategoryPage";
import './app.css'
import WishlistPage from "./components/WishlistPage";
function App() {
  return (
    <Routes>

      {/* HOME WITHOUT LAYOUT */}
      <Route path="/" element={<FirstPage />} />

      {/* PAGES WITH HEADER + FOOTER */}
      <Route element={<Layout />}>

        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/order-details/:id" element={<OrderDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/category/:category" element={<CategoryPage />} />

<Route
  path="/wishlist"
  element={
    <PrivateRoute>
      <WishlistPage />
    </PrivateRoute>
  }
/>
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <CartPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <CheckoutPage />
            </PrivateRoute>
          }
        />

      </Route>

      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

    </Routes>
  );
}

export default App;