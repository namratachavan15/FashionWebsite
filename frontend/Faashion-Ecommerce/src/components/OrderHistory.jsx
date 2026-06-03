// OrderHistory.jsx - Professional Redesign
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Home, Package, Eye, EyeOff, Calendar, IndianRupee } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const OrderHistory = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openOrderId, setOpenOrderId] = useState(null);

  useEffect(() => {
    if (user?.id) {
      fetchOrders();
    } else if (!user) {
      navigate("/login");
    }
  }, [user]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8081/orders/user/${user?.id}`);
      if (Array.isArray(res.data)) {
        setOrders(res.data);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.log(err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };



  return (
    <>
      <Header />
      <div className="order-history-page">
        <div className="container-custom">
          {/* Breadcrumb */}
          <div className="breadcrumb">
            <button onClick={() => navigate("/")} className="breadcrumb-link">
              <Home size={16} />
              <span>Home</span>
            </button>
            <ChevronRight size={14} className="breadcrumb-separator" />
            <button onClick={() => navigate("/profile")} className="breadcrumb-link">
              My Profile
            </button>
            <ChevronRight size={14} className="breadcrumb-separator" />
            <span className="breadcrumb-current">Order History</span>
          </div>

          <div className="page-header">
            <h1 className="page-title">Order History</h1>
            <p className="page-subtitle">Track and manage your orders</p>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading your orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <h2>No Orders Yet</h2>
              <p>You haven't placed any orders. Start shopping to see your orders here.</p>
              <button className="shop-now-btn" onClick={() => navigate("/")}>
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order) => {
              const total = order.totalAmount || 0;
                return (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div className="order-info">
                        <div className="order-id">
                          <Package size={18} />
                          <span>Order #{order.id}</span>
                        </div>
                        <div className="order-date">
                          <Calendar size={14} />
                          <span>{formatDate(order.createdAt || order.orderDate)}</span>
                        </div>
                      </div>
                      <div className="order-total">
                        <IndianRupee size={16} />
                        <span>{total.toLocaleString()}</span>
                      </div>
                      <button
                        className="toggle-details-btn"
                        onClick={() => setOpenOrderId(openOrderId === order.id ? null : order.id)}
                      >
                        {openOrderId === order.id ? <EyeOff size={16} /> : <Eye size={16} />}
                        {openOrderId === order.id ? "Hide Details" : "View Details"}
                      </button>
                    </div>

                    {openOrderId === order.id && (
                      <div className="order-details">
                        <div className="details-header">
                          <h4>Order Items</h4>
                        </div>
                        <div className="items-list">
                          {order.items?.map((item, idx) => (
                            <div key={idx} className="order-item">
                              <img
                                src={item.product?.image}
                                alt={item.product?.name}
                                className="item-image"
                                onError={(e) => {
                                  e.target.src = "https://via.placeholder.com/80x100?text=No+Image";
                                }}
                              />
                              <div className="item-info">
                                <h4>{item.product?.name}</h4>
                                <p className="item-meta">
                                  {item.color && <span>Color: {item.color}</span>}
                                  {item.size && <span>Size: {item.size}</span>}
                                </p>
                                <div className="item-price-row">
                                  <span>₹{item.product?.price?.toLocaleString()}</span>
                                  <span>× {item.quantity}</span>
                                  <span className="item-subtotal">
                                    ₹{(item.product?.price * item.quantity).toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="details-footer">
                        <div className="summary-line">
  <span>Subtotal</span>
  <span>₹{order.subtotal?.toLocaleString()}</span>
</div>

<div className="summary-line">
  <span>Shipping</span>
  <span>
    {order.shippingCharge === 0
      ? "Free"
      : `₹${order.shippingCharge?.toLocaleString()}`}
  </span>
</div>

<div className="summary-line">
  <span>Tax</span>
  <span>₹{order.tax?.toLocaleString()}</span>
</div>

<div className="summary-line total">
  <span>Total</span>
  <span>₹{order.totalAmount?.toLocaleString()}</span>
</div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />

      <style jsx>{`
        .order-history-page {
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
        .page-header {
          text-align: center;
          margin-bottom: 40px;
        }
        
        .page-title {
          font-size: 42px;
          font-weight: 600;
          color: var(--primary-dark);
          margin-bottom: 8px;
          font-family: 'Playfair Display', serif;
        }
        
        .page-subtitle {
          color: var(--text-muted);
          font-size: 14px;
        }
        
        /* Loading */
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px;
          background: white;
          border-radius: 24px;
        }
        
        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 3px solid var(--border-light);
          border-top-color: var(--accent);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin-bottom: 16px;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 80px 20px;
          background: white;
          border-radius: 24px;
          box-shadow: var(--shadow-sm);
        }
        
        .empty-icon {
          font-size: 80px;
          margin-bottom: 20px;
        }
        
        .empty-state h2 {
          font-size: 28px;
          margin-bottom: 12px;
          color: var(--text-dark);
        }
        
        .empty-state p {
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
        
        /* Orders List */
        .orders-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        
        .order-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
        }
        
        .order-card:hover {
          box-shadow: var(--shadow-md);
        }
        
        .order-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          padding: 20px 24px;
          background: white;
          border-bottom: 1px solid var(--border-light);
        }
        
        .order-info {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }
        
        .order-id {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          color: var(--primary-dark);
        }
        
        .order-date {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: var(--text-muted);
        }
        
        .order-total {
          display: flex;
          align-items: center;
          gap: 4px;
          font-weight: 700;
          font-size: 18px;
          color: var(--primary-dark);
        }
        
        .toggle-details-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          background: transparent;
          border: 1px solid var(--border-light);
          border-radius: 30px;
          cursor: pointer;
          transition: var(--transition);
          font-size: 13px;
          font-weight: 500;
        }
        
        .toggle-details-btn:hover {
          border-color: var(--accent);
          color: var(--accent);
        }
        
        /* Order Details */
        .order-details {
          padding: 24px;
          background: #fafafa;
          border-top: 1px solid var(--border-light);
        }
        
        .details-header h4 {
          font-size: 16px;
          margin-bottom: 16px;
          color: var(--text-dark);
        }
        
        .items-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 24px;
        }
        
        .order-item {
          display: flex;
          gap: 16px;
          background: white;
          padding: 16px;
          border-radius: 16px;
          box-shadow: var(--shadow-sm);
        }
        
        .item-image {
          width: 80px;
          height: 100px;
          object-fit: cover;
          border-radius: 12px;
        }
        
        .item-info {
          flex: 1;
        }
        
        .item-info h4 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 6px;
        }
        
        .item-meta {
          display: flex;
          gap: 16px;
          font-size: 12px;
          color: var(--text-muted);
          margin-bottom: 8px;
        }
        
        .item-price-row {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 13px;
        }
        
        .item-price-row span:first-child {
          font-weight: 600;
          color: var(--primary-dark);
        }
        
        .item-subtotal {
          font-weight: 700;
          color: var(--primary-dark);
          margin-left: auto;
        }
        
        .details-footer {
          background: white;
          padding: 16px 20px;
          border-radius: 16px;
          max-width: 300px;
          margin-left: auto;
        }
        
        .summary-line {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 13px;
          color: var(--text-muted);
        }
        
        .summary-line.total {
          font-size: 16px;
          font-weight: 700;
          color: var(--primary-dark);
          margin-top: 8px;
          padding-top: 8px;
          border-top: 1px solid var(--border-light);
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .order-history-page {
            padding: 20px 0 40px;
          }
          
          .page-title {
            font-size: 32px;
          }
          
          .order-header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .order-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          
          .order-total {
            align-self: flex-start;
          }
          
          .toggle-details-btn {
            align-self: flex-start;
          }
          
          .order-item {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          
          .item-price-row {
            justify-content: center;
            flex-wrap: wrap;
          }
          
          .item-subtotal {
            margin-left: 0;
          }
          
          .details-footer {
            max-width: 100%;
            margin-top: 16px;
          }
        }
      `}</style>
    </>
  );
};

export default OrderHistory;