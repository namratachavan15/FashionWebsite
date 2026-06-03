// SearchPage.jsx - Professional Redesign
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { ChevronRight, Home, Search, ShoppingBag, Star } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { products } = useShop();


   useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const query = new URLSearchParams(location.search).get("q") || "";
  const filteredProducts = (products || []).filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const getRating = (id) => {
    const ratings = [4, 4.5, 3.5, 5, 4];
    return ratings[id % ratings.length];
  };

  const renderStars = (rating) => {
    return (
      <div className="stars-container">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            fill={i < Math.floor(rating) ? "#C9A96E" : "none"}
            color="#C9A96E"
            style={{ fillOpacity: i < Math.floor(rating) ? 1 : 0 }}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="search-page">
        <div className="container-custom">
          {/* Breadcrumb */}
          <div className="breadcrumb">
            <button onClick={() => navigate("/")} className="breadcrumb-link">
              <Home size={16} />
              <span>Home</span>
            </button>
            <ChevronRight size={14} className="breadcrumb-separator" />
            <span className="breadcrumb-current">Search Results</span>
          </div>

          {/* Header */}
          <div className="page-header">
            <div className="search-icon-wrapper">
              <Search size={28} />
            </div>
            <h1 className="page-title">Search Results</h1>
            <p className="page-subtitle">
              {query ? `Showing results for "${query}"` : "Enter a keyword to search"}
            </p>
            {query && (
              <div className="results-count">
                {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
              </div>
            )}
          </div>

          {/* Results */}
          {query === "" ? (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h2>Search Something</h2>
              <p>Use the search bar above to find your favorite products.</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">😔</div>
              <h2>No Products Found</h2>
              <p>We couldn't find any products matching "{query}".</p>
              <button className="shop-now-btn" onClick={() => navigate("/collection")}>
                Browse All Products
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => {
                const rating = getRating(product.id);
                return (
                  <div key={product.id} className="product-card">
                    <div className="product-image-wrapper">
                      <img
                        src={product.image}
                        alt={product.name}
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/300x350?text=No+Image";
                        }}
                      />
                      <button
                        className="quick-view-btn"
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                        Quick View
                      </button>
                    </div>
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p className="product-subtitle">{product.subtitle}</p>
                      {renderStars(rating)}
                      <div className="product-price">
                        <span className="current-price">₹{product.price.toLocaleString()}</span>
                      </div>
                      <button
                        className="view-product-btn"
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                        <ShoppingBag size={16} />
                        View Product
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />

      <style jsx>{`
        .search-page {
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
          margin-bottom: 50px;
        }
        
        .search-icon-wrapper {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 70px;
          height: 70px;
          background: var(--accent-light);
          border-radius: 50%;
          margin-bottom: 20px;
          color: var(--accent);
        }
        
        .page-title {
          font-size: 42px;
          font-weight: 600;
          color: var(--primary-dark);
          margin-bottom: 12px;
          font-family: 'Playfair Display', serif;
        }
        
        .page-subtitle {
          color: var(--text-muted);
          font-size: 16px;
          margin-bottom: 12px;
        }
        
        .results-count {
          display: inline-block;
          padding: 6px 16px;
          background: var(--accent-light);
          color: var(--accent);
          border-radius: 30px;
          font-size: 13px;
          font-weight: 500;
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
        
        /* Products Grid */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 30px;
        }
        
        .product-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          transition: var(--transition);
          box-shadow: var(--shadow-sm);
        }
        
        .product-card:hover {
          transform: translateY(-5px);
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
          font-size: 13px;
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
          font-weight: 500;
          margin-bottom: 6px;
          font-family: 'Inter', sans-serif;
        }
        
        .product-subtitle {
          font-size: 12px;
          color: var(--text-muted);
          margin-bottom: 10px;
        }
        
        .stars-container {
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
        
        .view-product-btn {
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
        
        .view-product-btn:hover {
          background: var(--primary-dark);
          color: white;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .search-page {
            padding: 20px 0 40px;
          }
          
          .page-title {
            font-size: 32px;
          }
          
          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 20px;
          }
          
          .quick-view-btn {
            display: none;
          }
        }
        
        @media (max-width: 576px) {
          .products-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
};

export default SearchPage;