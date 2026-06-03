// CategorySection.jsx - Updated with new styling
import React from "react";
import { useNavigate } from "react-router-dom";

const CategorySection = ({ categories = [], onCategoryClick }) => {
  const navigate = useNavigate();

  const handleClick = (categoryName) => {
    if (onCategoryClick) {
      onCategoryClick(categoryName);
    }
    navigate(`/category/${encodeURIComponent(categoryName)}`);
  };

  return (
   <div className="category-section" id="categories">
      <div className="category-grid">
        {categories.map((category, index) => (
          <div 
            key={index} 
            className="category-card"
            onClick={() => handleClick(category.name)}
          >
            <div className="category-image-wrapper">
              <img src={category.image} alt={category.name} />
              <div className="category-overlay"></div>
            </div>
            <div className="category-info">
              <h3>{category.name}</h3>
              <span>Shop Now →</span>
            </div>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        .category-section {
          width: 100%;
        }
        
        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }
        
        .category-card {
          position: relative;
          cursor: pointer;
          overflow: hidden;
          border-radius: 16px;
          transition: var(--transition);
        }
        
        .category-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }
        
        .category-image-wrapper {
          position: relative;
          overflow: hidden;
          border-radius: 16px;
        }
        
        .category-image-wrapper img {
          width: 100%;
          height: 400px;
          object-fit: contain;
          transition: transform 0.6s ease;
        }
        
        .category-card:hover .category-image-wrapper img {
          transform: scale(1.05);
        }
        
        .category-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
        }
        
        .category-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 24px;
          color: white;
          text-align: center;
        }
        
        .category-info h3 {
          font-size: 24px;
          margin-bottom: 8px;
        }
        
        .category-info span {
          font-size: 13px;
          letter-spacing: 2px;
          opacity: 0.8;
        }
        
        @media (max-width: 768px) {
          .category-grid {
            gap: 20px;
          }
          .category-image-wrapper img {
            height: 300px;
          }
        }
      `}</style>
    </div>
  );
};

export default CategorySection;