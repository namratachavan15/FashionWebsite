// Home.jsx

import {
  Menu,
  Search,
  User,
  ShoppingBag,
  X,
} from "lucide-react";

import bannerImg from "../assets/images/banner1.jpg";
import "../pages/Home.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Home = () => {

  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const { cart } = useCart();

  console.log("user",user)
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // CLOSE DROPDOWN
  useEffect(() => {

    const close = () => setDropdown(false);

    window.addEventListener("click", close);

    return () =>
      window.removeEventListener("click", close);

  }, []);

  return (
    <div className="position-relative vh-100 overflow-hidden">

      {/* SIDEBAR */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: open ? "0" : "-250px",
          width: "250px",
          height: "100%",
          background: "white",
          transition: "0.3s",
          padding: "20px",
          zIndex: 20,
        }}
      >

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          <span
            onClick={() => setOpen(false)}
            style={{
              fontSize: "22px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            ✕
          </span>
        </div>

        <h3>Menu</h3>
        <p
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/");
            setOpen(false);
          }}
        >
          Home
        </p>
        <p
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/about");
            setOpen(false);
          }}
        >
          About
        </p>

        <p
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/contact");
            setOpen(false);
          }}
        >
          Contact
        </p>


      </div>

      {/* NAVBAR */}
      <header
        className="position-absolute top-0 start-0 w-100 bg-white d-flex align-items-center justify-content-between px-4 py-3 z-3"
      >

        {/* LEFT */}
        <Menu
          size={20}
          onClick={() => setOpen(!open)}
          style={{ cursor: "pointer" }}
        />

        {/* CENTER */}
        <h1
          className="position-absolute top-50 start-50 translate-middle m-0"
          style={{
            letterSpacing: "6px",
            fontFamily: "serif",
            fontSize: "20px",
          }}
        >
          FASHION
        </h1>

        {/* RIGHT */}
        <div className="d-flex gap-3 align-items-center">

          {/* SEARCH */}
          <div style={{ position: "relative" }}>

            {!searchOpen ? (

              <Search
                size={18}
                style={{ cursor: "pointer" }}
                onClick={() => setSearchOpen(true)}
              />

            ) : (

              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >

                <input
                  type="text"
                  placeholder="Search dress..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      navigate(
                        `/search?q=${search}`
                      );
                    }
                  }}
                  style={{
                    padding: "6px 35px 6px 10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    width: "220px",
                  }}
                />

                <X
                  size={18}
                  style={{
                    position: "absolute",
                    right: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setSearchOpen(false);
                    setSearch("");
                  }}
                />

              </div>
            )}
          </div>

          {/* USER */}
          {user ? (

            <div
              style={{ position: "relative" }}
              onClick={(e) => e.stopPropagation()}
            >

              <div
              onClick={() => navigate("/profile")}
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  background: "black",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
               {user?.firstName?.charAt(0).toUpperCase()}             </div>

              {dropdown && (

                <div
                  style={{
                    position: "absolute",
                    top: "40px",
                    right: "0",
                    background: "white",
                    boxShadow:
                      "0 5px 15px rgba(0,0,0,0.2)",
                    borderRadius: "5px",
                    padding: "10px",
                    minWidth: "150px",
                  }}
                >

                  <p style={{ margin: "5px 0" }}>
                    {user.email}
                  </p>

                  <hr />

                  <p
                    style={{
                      cursor: "pointer",
                      color: "red",
                      margin: 0,
                    }}
                    onClick={handleLogout}
                  >
                    Logout
                  </p>

                </div>
              )}

            </div>

          ) : (

            <User
              size={18}
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/login")}
            />
          )}

          {/* CART */}
          <div
            style={{
              position: "relative",
              cursor: "pointer"
            }}
            onClick={() => navigate("/cart")}
          >

            <ShoppingBag size={18} />

            {cart.length > 0 && (

              <span
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-8px",
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  fontSize: "10px",
                  padding: "2px 5px",
                }}
              >
                {cart.length}
              </span>
            )}

          </div>

        </div>
      </header>

      {/* HERO */}
      <div
        className="w-100 h-100 d-flex align-items-center justify-content-center text-center Banner"
        style={{
          backgroundImage: `url(${bannerImg})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
      >

        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>

        <div className="position-relative text-white mt-5">

          <h1
            style={{
              fontFamily: "serif",
              fontWeight: "600",
            }}
          >
            Discover the Best <br />
            Fashion Collection
          </h1>

          <p className="mt-3">
            The High - Quality Collection
          </p>

          <div className="mt-3 d-flex justify-content-center gap-3">

            <button className="btn btn-light px-4">
              Shop Now
            </button>

            <button className="btn btn-outline-light px-4">
              See Collection
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Home;