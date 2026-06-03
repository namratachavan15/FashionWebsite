import { createContext, useContext, useEffect, useState } from "react";

const OrderContext = createContext();
export const useOrder = () => useContext(OrderContext);

const API = "http://localhost:8081/order";

export const OrderProvider = ({ children }) => {
    const placeOrder = () => {
        const orderData = {
          totalAmount: cart.reduce(
            (t, i) => t + i.product.price * i.quantity,
            0
          ),
          items: cart
        };
      
        fetch(ORDER_API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(orderData)
        })
          .then(res => res.json())
          .then(() => {
            setCart([]); // ✅ clear frontend cart
            fetchCart(); // optional refresh
          })
          .catch(err => console.log(err));
      };
 
  return (
    <OrderContext.Provider value={{cart, addToCart, removeFromCart, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
};