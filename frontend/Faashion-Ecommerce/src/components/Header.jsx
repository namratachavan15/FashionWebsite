// Header.jsx - FIXED VERSION (Header always visible)
import React, { useState, useEffect } from "react";
import { useWishlist } from "../context/WishlistContext";
import { Menu, Search, User, ShoppingBag, X, Heart } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
const { wishlist } = useWishlist();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    // Set initial state
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* SIDEBAR */}
      <div style={{
        position: "fixed",
        top: 0,
        left: sidebarOpen ? "0" : "-300px",
        width: "300px",
        height: "100%",
        background: "white",
        transition: "0.3s ease",
        zIndex: 2000,
        boxShadow: "0 0 20px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column"
      }}>
        <div style={{ display: "flex", justifyContent: "flex-end", padding: "20px" }}>
          <button onClick={() => setSidebarOpen(false)} style={{
            background: "none",
            border: "none",
            fontSize: "24px",
            cursor: "pointer"
          }}>✕</button>
        </div>
        
        <div style={{ textAlign: "center", padding: "20px", borderBottom: "1px solid #eee" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#D4A5A5" }}>ÉLÉGANCE</h2>
        </div>
        
        <nav style={{ flex: 1, padding: "30px 0" }}>
          <Link to="/" onClick={() => setSidebarOpen(false)} style={{
            display: "block",
            padding: "12px 30px",
            textDecoration: "none",
            color: "#1E1E2A",
            transition: "all 0.3s ease"
          }}>Home</Link>
         <button
  onClick={() => {
    setSidebarOpen(false);

    if (window.location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        const section = document.getElementById("categories");
        section?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const section = document.getElementById("categories");
      section?.scrollIntoView({ behavior: "smooth" });
    }
  }}
  style={{
    display: "block",
    width: "100%",
    textAlign: "left",
    padding: "12px 30px",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#1E1E2A",
    transition: "all 0.3s ease",
    fontSize: "16px"
  }}
>
  Collection
</button>
          <Link to="/about" onClick={() => setSidebarOpen(false)} style={{
            display: "block",
            padding: "12px 30px",
            textDecoration: "none",
            color: "#1E1E2A",
            transition: "all 0.3s ease"
          }}>About</Link>
          <Link to="/contact" onClick={() => setSidebarOpen(false)} style={{
            display: "block",
            padding: "12px 30px",
            textDecoration: "none",
            color: "#1E1E2A",
            transition: "all 0.3s ease"
          }}>Contact</Link>
        </nav>
      </div>

      {/* MAIN HEADER - ALWAYS VISIBLE WITH BACKGROUND */}
      <header style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        background: scrolled ? "white" : "rgba(0, 0, 0, 0.85)",
        backdropFilter: scrolled ? "none" : "blur(10px)",
        padding: scrolled ? "12px 0" : "16px 0",
        transition: "all 0.3s ease",
        zIndex: 1000,
        boxShadow: scrolled ? "0 2px 15px rgba(0,0,0,0.08)" : "none",
        borderBottom: scrolled ? "1px solid #eee" : "1px solid rgba(255,255,255,0.1)"
      }}>
        <div style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          {/* Menu Button */}
          <button onClick={() => setSidebarOpen(true)} style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            color: scrolled ? "#1E1E2A" : "white",
            display: "flex",
            alignItems: "center",
            transition: "color 0.3s ease"
          }}>
            <Menu size={22} />
          </button>

          {/* Logo */}
          <Link to="/" style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "22px",
            fontWeight: "bold",
            textDecoration: "none",
            color: scrolled ? "#1E1E2A" : "white",
            letterSpacing: "2px",
            transition: "color 0.3s ease"
          }}>
            ÉLÉGANCE<span style={{ color: "#D4A5A5" }}>Studio</span>
          </Link>

          {/* Right Icons */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {/* Search */}
            <div style={{ position: "relative" }}>
              {!searchOpen ? (
                <button onClick={() => setSearchOpen(true)} style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: scrolled ? "#1E1E2A" : "white",
                  transition: "color 0.3s ease",
                  display: "flex",
                  alignItems: "center"
                }}>
                  <Search size={20} />
                </button>
              ) : (
                <div style={{
                  position: "absolute",
                  top: "50%",
                  right: 0,
                  transform: "translateY(-50%)",
                  display: "flex",
                  background: "white",
                  border: "1px solid #ddd",
                  borderRadius: "30px",
                  padding: "5px 10px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
                }}>
                  <input
                    type="text"
                    placeholder="Search dresses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                    style={{
                      border: "none",
                      outline: "none",
                      padding: "8px 12px",
                      width: "200px",
                      fontSize: "14px",
                      borderRadius: "30px"
                    }}
                    autoFocus
                  />
                  <button onClick={() => setSearchOpen(false)} style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0 8px",
                    color: "#666"
                  }}>
                    <X size={18} />
                  </button>
                </div>
              )}
            </div>

            {/* Wishlist */}
 {/* Wishlist */}
<button
  onClick={() => navigate("/wishlist")}
  style={{
    position: "relative",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: scrolled ? "#1E1E2A" : "white",
    transition: "color 0.3s ease",
    display: "flex",
    alignItems: "center"
  }}
>
  <Heart size={20} />

  {wishlist.length > 0 && (
    <span
      style={{
        position: "absolute",
        top: "-8px",
        right: "-12px",
        background: "#D4A5A5",
        color: "white",
        borderRadius: "50%",
        width: "18px",
        height: "18px",
        fontSize: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold"
      }}
    >
      {wishlist.length}
    </span>
  )}
</button>

            {/* User */}
            {user ? (
              <div style={{ position: "relative" }}>
                <button onClick={() => navigate("/profile")} style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  background: scrolled ? "#1A1A2E" : "#D4A5A5",
                  color: "white",
                  border: "none",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "14px",
                  transition: "all 0.3s ease"
                }}>
                  {user?.firstName?.charAt(0)?.toUpperCase()}
                </button>
              </div>
            ) : (
              <button onClick={() => navigate("/login")} style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: scrolled ? "#1E1E2A" : "white",
                transition: "color 0.3s ease",
                display: "flex",
                alignItems: "center"
              }}>
                <User size={20} />
              </button>
            )}

            {/* Cart */}
            <button onClick={() => navigate("/cart")} style={{
              position: "relative",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: scrolled ? "#1E1E2A" : "white",
              transition: "color 0.3s ease",
              display: "flex",
              alignItems: "center"
            }}>
              <ShoppingBag size={20} />
              {cart.length > 0 && (
                <span style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-12px",
                  background: "#D4A5A5",
                  color: "white",
                  borderRadius: "50%",
                  width: "18px",
                  height: "18px",
                  fontSize: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold"
                }}>
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from hiding under fixed header */}
      <div style={{ height: "70px" }}></div>
    </>
  );
}

export default Header;