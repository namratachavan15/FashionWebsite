// FirstPage.jsx - CORRECTED VERSION
import React, { useState, useEffect } from "react";
import Header from "./Header";  // ← ADD THIS IMPORT
import HeroSection from "./HeroSection";
import CategorySection from "./CategorySection";
import ProductCollection from "./ProductCollection";
import Footer from "./Footer";
import { useShop } from "../context/ShopContext";

function FirstPage() {
  const { products, categories } = useShop();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const filteredProducts = products.filter((item) =>
    selectedCategory === "" || item.category === selectedCategory
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="first-page">
      {/* ← ADD HEADER HERE - AT THE TOP */}
      <Header />
      
      <HeroSection />
      
      <section className="featured-section">
        <div className="container-custom">
          <div className="section-header">
            <span className="section-subtitle">Curated For You</span>
            <h2 className="section-title">Featured Categories</h2>
            <div className="section-divider"></div>
          </div>
          <CategorySection categories={categories} onCategoryClick={setSelectedCategory} />
        </div>
      </section>

      <section className="collection-section">
        <div className="container-custom">
          <div className="section-header">
            <span className="section-subtitle">
              {selectedCategory || "Latest"}
            </span>
            <h2 className="section-title">
              {selectedCategory ? `${selectedCategory} Collection` : "New Arrivals"}
            </h2>
            <div className="section-divider"></div>
          </div>
          
          <ProductCollection items={currentProducts} />
          
          {filteredProducts.length > 0 && (
            <div className="pagination-wrapper">
              <button
                className="pagination-btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
              
              <div className="pagination-numbers">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    className={`page-number ${currentPage === index + 1 ? "active" : ""}`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              
              <button
                className="pagination-btn"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .first-page {
          background: var(--bg-light);
        }
        
        .featured-section {
          padding: 80px 0;
        }
        
        .collection-section {
          padding: 0 0 80px;
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 50px;
        }
        
        .section-subtitle {
          font-size: 13px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--accent);
          font-weight: 500;
        }
        
        .section-title {
          font-size: 42px;
          font-weight: 600;
          margin-top: 12px;
          margin-bottom: 20px;
          color: var(--primary-dark);
        }
        
        .section-divider {
          width: 60px;
          height: 3px;
          background: var(--accent);
          margin: 0 auto;
        }
        
        .pagination-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          margin-top: 50px;
        }
        
        .pagination-btn {
          padding: 10px 20px;
          background: transparent;
          border: 1px solid var(--border-light);
          border-radius: 8px;
          cursor: pointer;
          transition: var(--transition);
          font-weight: 500;
        }
        
        .pagination-btn:hover:not(:disabled) {
          border-color: var(--accent);
          color: var(--accent);
        }
        
        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .pagination-numbers {
          display: flex;
          gap: 8px;
        }
        
        .page-number {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          background: transparent;
          border-radius: 50%;
          cursor: pointer;
          transition: var(--transition);
          font-weight: 500;
        }
        
        .page-number:hover {
          background: var(--accent-light);
        }
        
        .page-number.active {
          background: var(--primary-dark);
          color: white;
        }
        
        @media (max-width: 768px) {
          .section-title {
            font-size: 32px;
          }
          .featured-section {
            padding: 50px 0;
          }
        }
      `}</style>
    </div>
  );
}

export default FirstPage;