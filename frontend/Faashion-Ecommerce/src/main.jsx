import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { ShopProvider } from "./context/ShopContext";
import { ColorProvider } from "./context/ColorContext";
import { SizeProvider } from "./context/SizeContext";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <WishlistProvider>
    <ColorProvider>
    <SizeProvider>
      <CartProvider>
    <ShopProvider>
    <App />
    </ShopProvider>
    </CartProvider>
    </SizeProvider>
    </ColorProvider>
    </WishlistProvider>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);