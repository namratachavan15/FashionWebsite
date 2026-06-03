// CategoryPage.jsx - Professional Redesign
import React, { useEffect, useState } from "react";
import { useShop } from "../context/ShopContext";
import { useNavigate, useParams } from "react-router-dom";
import { Home, ChevronRight, SlidersHorizontal, ShoppingBag, Star } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CategoryPage = () => {
  const { products } = useShop();
  const { category } = useParams();
  const navigate = useNavigate();

  const [sort, setSort] = useState("default");
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  const allProducts = products || [];

  const currentCategory = decodeURIComponent(category || "")
    .trim()
    .toLowerCase();

  let filteredProducts = allProducts.filter((product) =>
    product.category?.trim().toLowerCase() === currentCategory
  );

  // Apply price filter
  filteredProducts = filteredProducts.filter(
    (product) => product.price >= priceRange.min && product.price <= priceRange.max
  );

  // Apply sorting
  if (sort === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sort === "name") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  const getRating = (id) => {
    const ratings = [4, 4.5, 3.5, 5, 4];
    return ratings[id % ratings.length];
  };

  const renderStars = (rating) => {
    return (
      <div style={{ display: "flex", justifyContent: "center", gap: "3px", marginBottom: "8px" }}>
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
      
      <div className="category-page">
        <div className="container-custom">
          
          {/* BREADCRUMB */}
          <div className="breadcrumb">
            <button onClick={() => navigate("/")} className="breadcrumb-link">
              <Home size={16} />
              <span>Home</span>
            </button>
            <ChevronRight size={14} className="breadcrumb-separator" />
            <button onClick={() => navigate("/collection")} className="breadcrumb-link">
              Collection
            </button>
            <ChevronRight size={14} className="breadcrumb-separator" />
            <span className="breadcrumb-current">{category}</span>
          </div>

          {/* CATEGORY HEADER */}
          <div className="category-header">
            <div className="category-header-bg"></div>
            <div className="category-header-content">
              <span className="category-badge">Shop by Category</span>
              <h1 className="category-title">{category} Collection</h1>
              <p className="category-description">
                Discover our exquisite range of {category} designed to elevate your style
              </p>
              <div className="category-stats">
                <span>{filteredProducts.length} Products</span>
              </div>
            </div>
          </div>

          {/* FILTER & SORT SECTION */}
          <div className="filter-section">
            <div className="filter-header">
              <button 
                className="filter-toggle"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <SlidersHorizontal size={18} />
                <span>Filters</span>
              </button>
              <p className="results-count">
                Showing {filteredProducts.length} results
              </p>
            </div>

            <div className={`filter-panel ${filterOpen ? "open" : ""}`}>
              <div className="filter-group">
                <h4>Price Range</h4>
                <div className="price-inputs">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                  />
                </div>
              </div>
            </div>

            <div className="sort-section">
              <label>Sort by:</label>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="default">Default</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>

          {/* PRODUCTS GRID */}
          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((product) => {
                const rating = getRating(product.id);
                return (
                  <div key={product.id} className="product-card">
                    <div className="product-image-wrapper">
                      <img src={product.image} alt={product.name} />
                      <button 
                        className="quick-view-btn"
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                        Quick View
                      </button>
                    </div>
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p className="product-category">{product.category}</p>
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
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">🛍️</div>
              <h3>No Products Found</h3>
              <p>We couldn't find any products in this category.</p>
              <button onClick={() => navigate("/collection")} className="shop-now-btn">
                Shop All Products
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />

      <style jsx>{`
        .category-page {
          min-height: 100vh;
          background: var(--bg-light);
          padding: 30px 0 60px;
        }
        
        .container-custom {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }
        
        /* BREADCRUMB */
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
        
        /* CATEGORY HEADER */
        .category-header {
          position: relative;
          background: linear-gradient(135deg, #1A1A2E 0%, #2D2D44 100%);
          border-radius: 24px;
          margin-bottom: 50px;
          overflow: hidden;
        }
        
        .category-header-bg {
          position: absolute;
          top: 0;
          right: 0;
          width: 50%;
          height: 100%;
          background-image: url('https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80');
          background-size: cover;
          background-position: center;
          opacity: 0.1;
        }
        
        .category-header-content {
          position: relative;
          padding: 60px 40px;
          text-align: center;
          color: white;
        }
        
        .category-badge {
          display: inline-block;
          padding: 6px 16px;
          background: rgba(212, 165, 165, 0.2);
          border-radius: 30px;
          font-size: 12px;
          letter-spacing: 2px;
          margin-bottom: 16px;
        }
        
        .category-title {
          font-size: 48px;
          font-weight: 700;
          margin-bottom: 16px;
          font-family: 'Playfair Display', serif;
        }
        
        .category-description {
          font-size: 16px;
          opacity: 0.8;
          margin-bottom: 20px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .category-stats {
          display: inline-block;
          padding: 8px 20px;
          background: rgba(255,255,255,0.1);
          border-radius: 30px;
          font-size: 13px;
        }
        
        /* FILTER SECTION */
        .filter-section {
          background: white;
          border-radius: 16px;
          padding: 20px 24px;
          margin-bottom: 40px;
          box-shadow: var(--shadow-sm);
        }
        
        .filter-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        
        .filter-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: 1px solid var(--border-light);
          padding: 8px 20px;
          border-radius: 30px;
          cursor: pointer;
          transition: var(--transition);
          font-weight: 500;
        }
        
        .filter-toggle:hover {
          border-color: var(--accent);
          color: var(--accent);
        }
        
        .results-count {
          color: var(--text-muted);
          font-size: 14px;
        }
        
        .filter-panel {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
          margin-top: 0;
        }
        
        .filter-panel.open {
          max-height: 200px;
          margin-top: 20px;
        }
        
        .filter-group {
          padding-top: 16px;
          border-top: 1px solid var(--border-light);
        }
        
        .filter-group h4 {
          font-size: 14px;
          margin-bottom: 12px;
          color: var(--text-dark);
        }
        
        .price-inputs {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .price-inputs input {
          flex: 1;
          padding: 10px 12px;
          border: 1px solid var(--border-light);
          border-radius: 8px;
          outline: none;
          font-size: 14px;
        }
        
        .price-inputs input:focus {
          border-color: var(--accent);
        }
        
        .sort-section {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid var(--border-light);
        }
        
        .sort-section label {
          font-size: 14px;
          color: var(--text-muted);
        }
        
        .sort-section select {
          padding: 8px 16px;
          border: 1px solid var(--border-light);
          border-radius: 8px;
          outline: none;
          cursor: pointer;
          font-size: 14px;
          background: white;
        }
        
        /* PRODUCTS GRID */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 30px;
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
          margin-bottom: 6px;
          font-weight: 500;
          font-family: 'Inter', sans-serif;
        }
        
        .product-category {
          font-size: 12px;
          color: var(--text-muted);
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
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
        
        /* EMPTY STATE */
        .empty-state {
          text-align: center;
          padding: 80px 20px;
          background: white;
          border-radius: 24px;
        }
        
        .empty-state-icon {
          font-size: 64px;
          margin-bottom: 20px;
        }
        
        .empty-state h3 {
          font-size: 24px;
          margin-bottom: 12px;
          color: var(--text-dark);
        }
        
        .empty-state p {
          color: var(--text-muted);
          margin-bottom: 24px;
        }
        
        .shop-now-btn {
          padding: 12px 32px;
          background: var(--primary-dark);
          color: white;
          border: none;
          border-radius: 40px;
          cursor: pointer;
          transition: var(--transition);
        }
        
        .shop-now-btn:hover {
          background: var(--accent);
          transform: translateY(-2px);
        }
        
        /* RESPONSIVE */
        @media (max-width: 992px) {
          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 24px;
          }
        }
        
        @media (max-width: 768px) {
          .category-page {
            padding: 20px 0 40px;
          }
          
          .category-title {
            font-size: 32px;
          }
          
          .category-header-content {
            padding: 40px 24px;
          }
          
          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
          }
          
          .filter-header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .sort-section {
            justify-content: flex-start;
          }
        }
        
        @media (max-width: 576px) {
          .products-grid {
            grid-template-columns: 1fr;
          }
          
          .breadcrumb {
            margin-bottom: 20px;
          }
        }
      `}</style>
    </>
  );
};

export default CategoryPage;