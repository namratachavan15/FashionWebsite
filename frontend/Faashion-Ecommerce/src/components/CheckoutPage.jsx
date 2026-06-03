// CheckoutPage.jsx - Professional Redesign
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Home, Truck, Shield, CreditCard } from "lucide-react";
import Header from "../components/Header";


function CheckoutPage() {
  const { cart, placeOrder, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    apartment: "",
    city: "",
    country: "",
    state: "",
    postalCode: "",
    phone: "",
    paymentMethod: "Credit Card",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvc: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const shipping = subtotal >= 5000 ? 0 : 50;
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + shipping + tax;

  const handleConfirmOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8081/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });
      const order = await res.json();

      const options = {
        key: "rzp_test_SpbQQ7A8Nugdfc",
        amount: order.amount,
        currency: "INR",
        name: "ÉLÉGANCE Studio",
        description: "Order Payment",
        order_id: order.id,
        handler: async function (response) {
          try {
            const verifyRes = await fetch("http://localhost:8081/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const result = await verifyRes.text();
            if (result === "Payment Verified") {
              const orderData = {
  email: formData.email,

  paymentId: response.razorpay_payment_id,
  razorpayOrderId: response.razorpay_order_id,
  paymentStatus: "PAID",

  // ✅ TOTALS
  subtotal,
  shippingCharge: shipping,
  tax,
  totalAmount: total,

  checkoutDetails: formData,

  items: cart.map((item) => ({
    productId: item.product.id,
    quantity: item.quantity,
    size: item.size,
    color: item.color,
  })),

              };
              const saveOrder = await fetch("http://localhost:8081/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData),
              });
              if (saveOrder.ok) {
                alert("Order Placed Successfully");
                clearCart();
                navigate("/");
              } else {
                alert("Order Save Failed");
              }
            } else {
              alert("Payment Failed");
            }
          } catch (err) {
            console.log(err);
          }
        },
        prefill: {
          name: formData.firstName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#D4A5A5" },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <div className="checkout-page">
        <div className="container-custom">
          {/* Breadcrumb */}
          <div className="breadcrumb">
            <button onClick={() => navigate("/")} className="breadcrumb-link">
              <Home size={16} />
              <span>Home</span>
            </button>
            <ChevronRight size={14} className="breadcrumb-separator" />
            <button onClick={() => navigate("/cart")} className="breadcrumb-link">
              Cart
            </button>
            <ChevronRight size={14} className="breadcrumb-separator" />
            <span className="breadcrumb-current">Checkout</span>
          </div>

          <div className="checkout-header">
            <h1 className="checkout-title">Checkout</h1>
            <p className="checkout-subtitle">Complete your order securely</p>
          </div>

          <div className="checkout-grid">
            {/* LEFT SIDE - FORM */}
            <div className="checkout-form">
              {/* Contact Information */}
              <div className="form-section">
                <h3 className="section-title">Contact Information</h3>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              {/* Shipping Information */}
              <div className="form-section">
                <h3 className="section-title">Shipping Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Jane"
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Company (Optional)</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company name"
                  />
                </div>
                <div className="form-group">
                  <label>Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street address"
                  />
                </div>
                <div className="form-group">
                  <label>Apartment, suite, etc. (Optional)</label>
                  <input
                    type="text"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleChange}
                    placeholder="Apartment, floor, etc."
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                    />
                  </div>
                  <div className="form-group">
                    <label>Country *</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Country"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>State *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="State"
                    />
                  </div>
                  <div className="form-group">
                    <label>Postal Code *</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="Postal Code"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="form-section">
                <h3 className="section-title">Payment Method</h3>
                <div className="payment-methods">
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Credit Card"
                      checked={formData.paymentMethod === "Credit Card"}
                      onChange={handleChange}
                    />
                    <CreditCard size={18} />
                    <span>Credit / Debit Card</span>
                  </label>
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="PayPal"
                      checked={formData.paymentMethod === "PayPal"}
                      onChange={handleChange}
                    />
                    <span>PayPal</span>
                  </label>
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Transfer"
                      checked={formData.paymentMethod === "Transfer"}
                      onChange={handleChange}
                    />
                    <span>Bank Transfer</span>
                  </label>
                </div>

                {formData.paymentMethod === "Credit Card" && (
                  <div className="card-details">
                    <div className="form-group">
                      <label>Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="form-group">
                      <label>Name on Card</label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        placeholder="JANE DOE"
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Expiry Date</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleChange}
                          placeholder="MM/YY"
                        />
                      </div>
                      <div className="form-group">
                        <label>CVC</label>
                        <input
                          type="text"
                          name="cvc"
                          value={formData.cvc}
                          onChange={handleChange}
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT SIDE - ORDER SUMMARY */}
            <div className="order-summary-card">
              <h3>Order Summary</h3>

              <div className="summary-items">
                {cart.map((item) => (
                  <div key={item.id} className="summary-item">
                    <img src={item.product.image} alt={item.product.name} />
                    <div className="summary-item-details">
                      <h4>{item.product.name}</h4>
                      <p className="summary-item-meta">
                        {item.color} / {item.size}
                      </p>
                      <p className="summary-item-price">₹{item.product.price.toLocaleString()}</p>
                    </div>
                    <span className="summary-item-qty">x{item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="summary-totals">
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
              </div>

              {shipping > 0 && subtotal < 5000 && (
                <div className="free-shipping-note">
                  <Truck size={14} />
                  Add ₹{(5000 - subtotal).toLocaleString()} more to get free shipping!
                </div>
              )}

              <button
                className="confirm-order-btn"
                onClick={handleConfirmOrder}
                disabled={loading}
              >
                {loading ? "Processing..." : "Confirm Order"}
              </button>

              <div className="secure-badge">
                <Shield size={16} />
                <span>Secure payment powered by Razorpay</span>
              </div>
            </div>
          </div>
        </div>
      </div>
   

      <style jsx>{`
        .checkout-page {
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
        
        /* Header */
        .checkout-header {
          text-align: center;
          margin-bottom: 40px;
        }
        
        .checkout-title {
          font-size: 42px;
          font-weight: 600;
          color: var(--primary-dark);
          margin-bottom: 8px;
          font-family: 'Playfair Display', serif;
        }
        
        .checkout-subtitle {
          color: var(--text-muted);
          font-size: 14px;
        }
        
        /* Grid Layout */
        .checkout-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 40px;
        }
        
        /* Form Styles */
        .checkout-form {
          background: white;
          border-radius: 24px;
          padding: 32px;
          box-shadow: var(--shadow-sm);
        }
        
        .form-section {
          margin-bottom: 36px;
        }
        
        .form-section:last-child {
          margin-bottom: 0;
        }
        
        .section-title {
          font-size: 20px;
          font-weight: 600;
          color: var(--primary-dark);
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--border-light);
        }
        
        .form-group {
          margin-bottom: 20px;
        }
        
        .form-group label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 8px;
          color: var(--text-dark);
        }
        
        .form-group input {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid var(--border-light);
          border-radius: 12px;
          font-size: 14px;
          transition: var(--transition);
          outline: none;
        }
        
        .form-group input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(212, 165, 165, 0.1);
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        
        /* Payment Methods */
        .payment-methods {
          display: flex;
          gap: 24px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }
        
        .payment-option {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-size: 14px;
        }
        
        .payment-option input {
          margin: 0;
          accent-color: var(--accent);
        }
        
        .card-details {
          padding: 20px;
          background: var(--bg-light);
          border-radius: 16px;
        }
        
        /* Order Summary Card */
        .order-summary-card {
          background: white;
          border-radius: 24px;
          padding: 28px;
          box-shadow: var(--shadow-sm);
          height: fit-content;
          position: sticky;
          top: 100px;
        }
        
        .order-summary-card h3 {
          font-size: 20px;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-light);
        }
        
        .summary-items {
          max-height: 400px;
          overflow-y: auto;
          margin-bottom: 24px;
        }
        
        .summary-item {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-light);
        }
        
        .summary-item img {
          width: 60px;
          height: 70px;
          object-fit: cover;
          border-radius: 8px;
        }
        
        .summary-item-details {
          flex: 1;
        }
        
        .summary-item-details h4 {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 4px;
        }
        
        .summary-item-meta {
          font-size: 11px;
          color: var(--text-muted);
          margin-bottom: 4px;
        }
        
        .summary-item-price {
          font-size: 13px;
          font-weight: 500;
          color: var(--primary-dark);
        }
        
        .summary-item-qty {
          font-size: 13px;
          color: var(--text-muted);
        }
        
        .summary-totals {
          margin-bottom: 20px;
        }
        
        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          font-size: 14px;
          color: var(--text-muted);
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
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #e8f7ee;
          color: #2e7d32;
          padding: 12px;
          border-radius: 12px;
          font-size: 12px;
          margin-bottom: 20px;
        }
        
        .confirm-order-btn {
          width: 100%;
          padding: 14px;
          background: var(--primary-dark);
          color: white;
          border: none;
          border-radius: 40px;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
          margin-bottom: 16px;
        }
        
        .confirm-order-btn:hover:not(:disabled) {
          background: var(--accent);
          transform: translateY(-2px);
        }
        
        .confirm-order-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
        
        .secure-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 12px;
          color: var(--text-muted);
          padding-top: 12px;
          border-top: 1px solid var(--border-light);
        }
        
        /* Responsive */
        @media (max-width: 992px) {
          .checkout-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          
          .order-summary-card {
            position: static;
          }
        }
        
        @media (max-width: 768px) {
          .checkout-page {
            padding: 20px 0 40px;
          }
          
          .checkout-title {
            font-size: 32px;
          }
          
          .checkout-form {
            padding: 24px;
          }
          
          .form-row {
            grid-template-columns: 1fr;
            gap: 0;
          }
          
          .payment-methods {
            gap: 16px;
          }
        }
      `}</style>
    </>
  );
}

export default CheckoutPage;