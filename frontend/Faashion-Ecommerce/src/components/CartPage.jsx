// CartPage.jsx - Professional Redesign
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronRight, Home, Trash2, ShoppingBag, Heart, Star } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleRating = (id, value) => {
    setRatings((prev) => ({ ...prev, [id]: value }));
  };

  // Calculate totals
  const subtotal = Array.isArray(cart)
    ? cart.reduce((t, i) => t + i.product.price * i.quantity, 0)
    : 0;
  const shipping = subtotal > 0 ? (subtotal >= 5000 ? 0 : 50) : 0;
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + shipping + tax;

  const hasOutOfStock =
    Array.isArray(cart) &&
    cart.some((item) => item.quantity > item.product.stock);

  return (
    <>
      <Header />
      <div className="cart-page">
        <div className="container-custom">
          {/* Breadcrumb */}
          <div className="breadcrumb">
            <button onClick={() => navigate("/")} className="breadcrumb-link">
              <Home size={16} />
              <span>Home</span>
            </button>
            <ChevronRight size={14} className="breadcrumb-separator" />
            <span className="breadcrumb-current">Shopping Cart</span>
          </div>

          <div className="cart-header">
            <h1 className="cart-title">Shopping Cart</h1>
            <p className="cart-subtitle">
              {cart.length} {cart.length === 1 ? "item" : "items"} in your bag
            </p>
          </div>

          {cart.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <h2>Your cart is empty</h2>
              <p>Looks like you haven't added any items yet.</p>
              <button className="shop-now-btn" onClick={() => navigate("/")}>
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="cart-content">
              {/* Cart Items */}
              <div className="cart-items">
                <div className="cart-items-header">
                  <span>Product</span>
                  <span>Quantity</span>
                  <span>Total</span>
                  <span></span>
                </div>

                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-product">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="cart-item-image"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/100x120?text=No+Image";
                        }}
                      />
                      <div className="cart-item-details">
                        <h3>{item.product.name}</h3>
                        <p className="cart-item-meta">
                          {item.color && <span>Color: {item.color}</span>}
                          {item.size && <span>Size: {item.size}</span>}
                        </p>
                        <p className="cart-item-price">₹{item.product.price.toLocaleString()}</p>

                        {/* Star Rating */}
                   {/* Star Rating */}
<div className="rating-stars">
  {[...Array(5)].map((_, i) => {
    const currentRating = ratings[item.id] || 0;

    return (
      <button
        key={i}
        type="button"
        className="star-btn"
        onClick={() => handleRating(item.id, i + 1)}
      >
        <Star
          size={18}
          fill={i < currentRating ? "#C9A96E" : "none"}
          color="#C9A96E"
          style={{
            fillOpacity: i < currentRating ? 1 : 0,
          }}
        />
      </button>
    );
  })}

  <span className="rating-value">
    {ratings[item.id] || 0}.0
  </span>
</div>

                        <div className="stock-status">
                          {item.product.stock > 0 ? (
                            <span className="in-stock">In Stock</span>
                          ) : (
                            <span className="out-of-stock">Out of Stock</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="cart-item-quantity">
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stock}
                      >
                        +
                      </button>
                    </div>

                    <div className="cart-item-total">
                      ₹{(item.product.price * item.quantity).toLocaleString()}
                    </div>

                    <button
                      className="cart-item-remove"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="order-summary">
                <h3>Order Summary</h3>
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                </div>
                <div className="summary-row">
                  <span>Tax (10%)</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>

                {shipping > 0 && subtotal < 5000 && (
                  <div className="free-shipping-note">
                    Add ₹{(5000 - subtotal).toLocaleString()} more to get free shipping!
                  </div>
                )}

                <button
                  className="checkout-btn"
                  disabled={cart.length === 0 || hasOutOfStock}
                  onClick={() => {
                    if (cart.length === 0) return alert("Your cart is empty");
                    if (hasOutOfStock) return alert("Some items are out of stock");
                    navigate("/checkout");
                  }}
                >
                  {hasOutOfStock ? "Stock Issue" : "Proceed to Checkout"}
                </button>

                <button className="continue-shopping" onClick={() => navigate("/")}>
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
 

      <style jsx>{`
        .cart-page {
          background: var(--bg-light);
          min-height: 100vh;
          padding: 30px 0 60px;
        }
        
        .container-custom {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }
        
        /* Breadcrumb */
        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 30px;
          font-size: 13px;
          flex-wrap: wrap;
        }
        
        .breadcrumb-link {
          display: flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          transition: var(--transition);
          font-size: 13px;
        }
        
        .breadcrumb-link:hover {
          color: var(--accent);
        }
        
        .breadcrumb-separator {
          color: var(--text-muted);
        }
        
        .breadcrumb-current {
          color: var(--primary-dark);
          font-weight: 600;
        }
        
        /* Cart Header */
        .cart-header {
          text-align: center;
          margin-bottom: 40px;
        }
        
        .cart-title {
          font-size: 42px;
          font-weight: 600;
          color: var(--primary-dark);
          margin-bottom: 8px;
          font-family: 'Playfair Display', serif;
        }
        
        .cart-subtitle {
          color: var(--text-muted);
          font-size: 14px;
        }
        
        /* Empty Cart */
        .empty-cart {
          text-align: center;
          padding: 80px 20px;
          background: white;
          border-radius: 24px;
          box-shadow: var(--shadow-sm);
        }
        
        .empty-cart-icon {
          font-size: 80px;
          margin-bottom: 20px;
        }
        
        .empty-cart h2 {
          font-size: 28px;
          margin-bottom: 12px;
          color: var(--text-dark);
        }
        
        .empty-cart p {
          color: var(--text-muted);
          margin-bottom: 30px;
        }
        
        .shop-now-btn {
          padding: 14px 36px;
          background: var(--primary-dark);
          color: white;
          border: none;
          border-radius: 40px;
          cursor: pointer;
          transition: var(--transition);
          font-weight: 500;
        }
        
        .shop-now-btn:hover {
          background: var(--accent);
          transform: translateY(-2px);
        }
        
        /* Cart Content */
        .cart-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 40px;
        }
        
        /* Cart Items Table */
        .cart-items {
          background: white;
          border-radius: 24px;
          padding: 24px;
          box-shadow: var(--shadow-sm);
        }
        
        .cart-items-header {
          display: grid;
          grid-template-columns: 3fr 1fr 1fr 0.5fr;
          padding: 16px 0;
          border-bottom: 1px solid var(--border-light);
          font-weight: 600;
          color: var(--text-muted);
          font-size: 14px;
        }
        
        .cart-item {
          display: grid;
          grid-template-columns: 3fr 1fr 1fr 0.5fr;
          align-items: center;
          padding: 24px 0;
          border-bottom: 1px solid var(--border-light);
        }
        
        .cart-item:last-child {
          border-bottom: none;
        }
        
        .cart-item-product {
          display: flex;
          gap: 16px;
        }
        
        .cart-item-image {
          width: 100px;
          height: 120px;
          object-fit: cover;
          border-radius: 12px;
        }
        
        .cart-item-details h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 6px;
        }
        
        .cart-item-meta {
          font-size: 12px;
          color: var(--text-muted);
          margin-bottom: 6px;
          display: flex;
          gap: 12px;
        }
        
        .cart-item-price {
          font-weight: 600;
          color: var(--primary-dark);
          margin-bottom: 8px;
        }
        
        .rating-stars {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 8px;
        }
        
    .rating-stars {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 8px;
}

.star-btn {
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.star-btn:hover {
  transform: scale(1.1);
}

.rating-value {
  font-size: 11px;
  color: var(--text-muted);
  margin-left: 6px;
}
        
        .rating-value {
          font-size: 11px;
          color: var(--text-muted);
          margin-left: 6px;
        }
        
        .stock-status {
          font-size: 12px;
        }
        
        .in-stock {
          color: #2e7d32;
        }
        
        .out-of-stock {
          color: #d32f2f;
        }
        
        .cart-item-quantity {
          display: flex;
          align-items: center;
          gap: 12px;
          border: 1px solid var(--border-light);
          border-radius: 40px;
          width: fit-content;
          padding: 4px 8px;
        }
        
        .qty-btn {
          width: 30px;
          height: 30px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 16px;
          font-weight: 500;
          transition: var(--transition);
        }
        
        .qty-btn:hover:not(:disabled) {
          color: var(--accent);
        }
        
        .qty-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .cart-item-total {
          font-weight: 700;
          color: var(--primary-dark);
          font-size: 18px;
        }
        
        .cart-item-remove {
          background: none;
          border: none;
          cursor: pointer;
          color: #999;
          transition: var(--transition);
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
        
        .cart-item-remove:hover {
          background: #fee2e2;
          color: #e74c3c;
        }
        
        /* Order Summary */
        .order-summary {
          background: white;
          border-radius: 24px;
          padding: 28px;
          box-shadow: var(--shadow-sm);
          height: fit-content;
          position: sticky;
          top: 100px;
        }
        
        .order-summary h3 {
          font-size: 20px;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-light);
        }
        
        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          color: var(--text-muted);
          font-size: 14px;
        }
        
        .summary-row.total {
          font-size: 18px;
          font-weight: 700;
          color: var(--primary-dark);
          margin-top: 8px;
        }
        
        .summary-divider {
          height: 1px;
          background: var(--border-light);
          margin: 16px 0;
        }
        
        .free-shipping-note {
          background: #e8f7ee;
          color: #2e7d32;
          padding: 12px;
          border-radius: 12px;
          font-size: 12px;
          text-align: center;
          margin: 16px 0;
        }
        
        .checkout-btn {
          width: 100%;
          padding: 14px;
          background: var(--primary-dark);
          color: white;
          border: none;
          border-radius: 40px;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
          margin-top: 16px;
        }
        
        .checkout-btn:hover:not(:disabled) {
          background: var(--accent);
          transform: translateY(-2px);
        }
        
        .checkout-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
        
        .continue-shopping {
          width: 100%;
          padding: 12px;
          background: transparent;
          border: 1px solid var(--border-light);
          border-radius: 40px;
          cursor: pointer;
          transition: var(--transition);
          margin-top: 12px;
          font-weight: 500;
        }
        
        .continue-shopping:hover {
          border-color: var(--accent);
          color: var(--accent);
        }
        
        /* Responsive */
        @media (max-width: 992px) {
          .cart-content {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          
          .order-summary {
            position: static;
          }
        }
        
        @media (max-width: 768px) {
          .cart-page {
            padding: 20px 0 40px;
          }
          
          .cart-title {
            font-size: 32px;
          }
          
          .cart-items-header {
            display: none;
          }
          
          .cart-item {
            grid-template-columns: 1fr;
            gap: 16px;
            padding: 20px 0;
          }
          
          .cart-item-product {
            flex-direction: column;
            text-align: center;
          }
          
          .cart-item-image {
            width: 100%;
            height: 250px;
            object-fit: cover;
          }
          
          .cart-item-quantity {
            justify-content: center;
            margin: 0 auto;
          }
          
          .cart-item-total {
            text-align: center;
          }
          
          .cart-item-remove {
            position: absolute;
            right: 20px;
            top: 20px;
          }
          
          .cart-item {
            position: relative;
          }
        }
      `}</style>
    </>
  );
}

export default CartPage;