import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

const API = "http://localhost:8081";

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const { user } = useAuth();

  // LOAD USER WISHLIST
  useEffect(() => {
    if (user?.id) {
      fetch(`${API}/wishlist/${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          // backend returns Wishlist[]
          // each item contains product
          const products = data.map((item) => item.product);

          setWishlist(products);
        })
        .catch((err) => console.log(err));
    } else {
      setWishlist([]);
    }
  }, [user]);

  // ADD
  const addToWishlist = async (product) => {
    if (!user) {
      alert("Please login first");
      return;
    }

    try {
      await fetch(
        `${API}/wishlist/add?userId=${user.id}&productId=${product.id}`,
        {
          method: "POST",
        }
      );

      setWishlist((prev) => {
        const exists = prev.find((p) => p.id === product.id);

        if (exists) return prev;

        return [...prev, product];
      });
    } catch (err) {
      console.log(err);
    }
  };

  // REMOVE
  const removeFromWishlist = async (productId) => {
    try {
      await fetch(
        `${API}/wishlist/remove?userId=${user.id}&productId=${productId}`,
        {
          method: "DELETE",
        }
      );

      setWishlist((prev) =>
        prev.filter((item) => item.id !== productId)
      );
    } catch (err) {
      console.log(err);
    }
  };

  // CHECK
  const isWishlisted = (id) => {
    return wishlist.some((item) => item.id === id);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);