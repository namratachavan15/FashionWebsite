import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";

const API = "http://localhost:8081";

function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <div
      style={{
        maxWidth: "1300px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      {/* HEADER */}
      <div style={{ marginBottom: "40px" }}>
        <h1
          style={{
            fontSize: "40px",
            fontWeight: "700",
            color: "#1A1A2E",
            marginBottom: "10px",
          }}
        >
          My Wishlist
        </h1>

        <p style={{ color: "#777", fontSize: "16px" }}>
          Your favourite fashion picks
        </p>
      </div>

      {/* EMPTY */}
      {wishlist.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "80px 20px",
            background: "#fff",
            borderRadius: "20px",
          }}
        >
          <Heart size={60} color="#D4A5A5" />

          <h2 style={{ marginTop: "20px", color: "#1A1A2E" }}>
            Wishlist is Empty
          </h2>

          <p style={{ color: "#777", marginTop: "10px" }}>
            Save items you love for later.
          </p>

          <button
            onClick={() => navigate("/")}
            style={{
              marginTop: "25px",
              padding: "14px 30px",
              border: "none",
              borderRadius: "40px",
              background: "#1A1A2E",
              color: "white",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
            gap: "30px",
          }}
        >
          {wishlist.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#fff",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
                transition: "0.3s",
              }}
            >
              {/* IMAGE */}
              <div
                style={{
                  height: "320px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <img
                  src={
                    item.image?.startsWith("http")
                      ? item.image
                      : `${API}${item.image}`
                  }
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                {/* REMOVE */}
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  style={{
                    position: "absolute",
                    top: "15px",
                    right: "15px",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "none",
                    background: "white",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  }}
                >
                  <Trash2 size={18} color="red" />
                </button>
              </div>

              {/* INFO */}
              <div style={{ padding: "20px" }}>
                <h3
                  style={{
                    fontSize: "18px",
                    marginBottom: "8px",
                    color: "#1A1A2E",
                  }}
                >
                  {item.name}
                </h3>

                <p
                  style={{
                    color: "#777",
                    marginBottom: "10px",
                    fontSize: "14px",
                  }}
                >
                  {item.subtitle}
                </p>

                <h2
                  style={{
                    color: "#1A1A2E",
                    marginBottom: "18px",
                  }}
                >
                  ₹{item.price.toLocaleString()}
                </h2>

                <button
                  onClick={() => navigate(`/product/${item.id}`)}
                  style={{
                    width: "100%",
                    padding: "14px",
                    border: "none",
                    borderRadius: "40px",
                    background: "#1A1A2E",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <ShoppingBag size={18} />
                  View Product
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WishlistPage;