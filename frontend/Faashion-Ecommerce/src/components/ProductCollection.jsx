// ProductCollection.jsx - Updated with new styling
import React from "react";
import { useNavigate } from "react-router-dom";
import { Star, ShoppingBag } from "lucide-react";

const ProductCollection = ({ items = [] }) => {
  const navigate = useNavigate();

  const getRating = (id) => {
    const ratings = [4, 4.5, 3.5, 5, 4];
    return ratings[id % ratings.length];
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            fill={i < fullStars ? "#C9A96E" : "none"}
            color="#C9A96E"
            style={{ fillOpacity: i < fullStars ? 1 : 0 }}
          />
        ))}
      </div>
    );
  };

  if (items.length === 0) {
    return (
      <div className="empty-state">
        <p>No products found in this collection.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {items.map((item) => {
        const rating = getRating(item.id);
        
        return (
          <div key={item.id} className="product-card">
            <div className="product-image-wrapper">
              <img src={item.image} alt={item.name} />
              <button 
                className="quick-view-btn"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                Quick View
              </button>
            </div>
            
            <div className="product-info">
              <h3>{item.name}</h3>
              <p className="product-subtitle">{item.subtitle}</p>
              {renderStars(rating)}
              <div className="product-price">
                <span className="current-price">₹{item.price.toLocaleString()}</span>
              </div>
              <button 
                className="add-to-cart-btn"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <ShoppingBag size={16} />
                View Details
              </button>
            </div>
          </div>
        );
      })}
      
      <style jsx>{`
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 40px;
        }
        
        .product-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          transition: var(--transition);
        }
        
        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-lg);
        }
        
        .product-image-wrapper {
          position: relative;
          overflow: hidden;
          aspect-ratio: 3/4;
        }
        
        .product-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .product-card:hover .product-image-wrapper img {
          transform: scale(1.05);
        }
        
        .quick-view-btn {
          position: absolute;
          bottom: -50px;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          border: none;
          padding: 10px 24px;
          border-radius: 30px;
          font-weight: 500;
          cursor: pointer;
          transition: bottom 0.3s ease;
          white-space: nowrap;
        }
        
        .product-card:hover .quick-view-btn {
          bottom: 20px;
        }
        
        .product-info {
          padding: 20px;
          text-align: center;
        }
        
        .product-info h3 {
          font-size: 18px;
          margin-bottom: 6px;
          font-weight: 500;
        }
        
        .product-subtitle {
          font-size: 12px;
          color: var(--text-muted);
          margin-bottom: 10px;
        }
        
        .stars {
          display: flex;
          justify-content: center;
          gap: 3px;
          margin-bottom: 10px;
        }
        
        .product-price {
          margin-bottom: 15px;
        }
        
        .current-price {
          font-size: 20px;
          font-weight: 600;
          color: var(--primary-dark);
        }
        
        .add-to-cart-btn {
          width: 100%;
          padding: 12px;
          background: transparent;
          border: 1.5px solid var(--primary-dark);
          border-radius: 40px;
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        
        .add-to-cart-btn:hover {
          background: var(--primary-dark);
          color: white;
        }
        
        .empty-state {
          text-align: center;
          padding: 60px;
          color: var(--text-muted);
        }
        
        @media (max-width: 768px) {
          .product-grid {
            gap: 20px;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }
          .quick-view-btn {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductCollection;