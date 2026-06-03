import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const API = "http://localhost:8081/cart";
const ORDER_API = "http://localhost:8081/orders";

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);


  // ✅ UPDATE QUANTITY
const updateQuantity = async (id, quantity) => {

  if (quantity < 1) return;

  await fetch(`${API}/update/${id}`, {

    method: "PUT",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      quantity
    })

  });

  fetchCart();

};

  // ✅ FETCH USER CART
  const fetchCart = async () => {
    if (!user) return;

    try {
      const res = await fetch(`${API}/${user.email}`);

      if (!res.ok) throw new Error("Cart API failed");

      const data = await res.json();
      setCart(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
      setCart([]);
    }
  };

  // ✅ ADD TO CART
  const addToCart = async (item) => {
    if (!user) {
      alert("Please login first");
      return;
    }

    await fetch(`${API}/${item.productId}/${user.email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        quantity: item.quantity,
        size: item.size,
        color: item.color
      })
    });

    fetchCart();
  };

  // ✅ REMOVE
  const removeFromCart = async (id) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE"
    });

    fetchCart();
  };

  // ✅ PLACE ORDER
  const placeOrder = async (
    navigate,
    checkoutData
  ) => {
  
    if (cart.length === 0) return;
  
    if (!user) {
  
      alert("Please login");
  
      return;
  
    }
  
    const orderData = {
  
      email: user.email,
  
      checkoutDetails: checkoutData,
  
      items: cart.map((item) => ({
  
        productId:
          item.product.id,
  
        quantity:
          item.quantity,
  
        size:
          item.size,
  
        color:
          item.color,
  
      })),
  
    };
  
    try {
  
      const res = await fetch(
        ORDER_API,
        {
          method: "POST",
  
          headers: {
            "Content-Type":
              "application/json",
          },
  
          body: JSON.stringify(
            orderData
          ),
        }
      );
  
      if (!res.ok)
        throw new Error(
          "Order failed"
        );
  
      setCart([]);
  
      navigate("/");
  
    } catch (err) {
  
      console.error(err);
  
      alert("Order failed!");
  
    }
  
  }; // ✅ AUTO LOAD CART ON LOGIN
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [user]);

  const clearCart = () => {
    setCart([]);
  };
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, placeOrder,updateQuantity,clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};