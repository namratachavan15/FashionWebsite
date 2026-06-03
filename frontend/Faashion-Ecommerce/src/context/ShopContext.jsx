import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

const API = "http://localhost:8081/products";

export const ShopProvider = ({ children }) => {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [cart, setCart] = useState([]);

  // ✅ fetch products
  const fetchProducts = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();

      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API}/categories`);
      const data = await res.json();

      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ load data
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // ✅ ADD TO CART
  const addToCart = (item) => {
    setCart(prev => {

      const existing = prev.find(
        i =>
          i.id === item.id &&
          i.size === item.size &&
          i.color === item.color
      );

      if (existing) {
        return prev.map(i =>
          i === existing
            ? {
                ...i,
                quantity:
                  i.quantity + item.quantity
              }
            : i
        );
      }

      return [...prev, item];
    });
  };

  // ✅ REMOVE
  const removeFromCart = (id) => {
    setCart(prev =>
      prev.filter(item => item.id !== id)
    );
  };

  // ✅ PLACE ORDER
  const placeOrder = () => {
    console.log("ORDER DATA:", cart);
    setCart([]);
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        categories,
        cart,
        addToCart,
        removeFromCart,
        placeOrder
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};