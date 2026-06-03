// HeroSection.jsx - Fixed for ALL screen sizes (including large screens)
import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-background"></div>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="hero-badge">Summer 2026 Collection</div>
        <h1 className="hero-title">
          Timeless <span className="hero-accent">Elegance</span>
          <br />
          For Every Woman
        </h1>
        <p className="hero-subtitle">
          Discover our curated collection of premium dresses designed to make you feel confident and beautiful.
        </p>
        <div className="hero-buttons">
          <button className="hero-btn-primary" onClick={() => {
  const section = document.getElementById("categories");
  section?.scrollIntoView({ behavior: "smooth" });
}}>
            Shop Now
          </button>
          <button className="hero-btn-secondary" onClick={() => {
  const section = document.getElementById("categories");
  section?.scrollIntoView({ behavior: "smooth" });
}}>
            View Collection
          </button>
        </div>
      </div>
      
      <style jsx>{`
        .hero-section {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
        }
        
        /* Background image with proper positioning */
        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          background-image: url('https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          z-index: 0;
        }
        
        /* For extra large screens (1920px and above) */
        @media (min-width: 1920px) {
          .hero-background {
            background-size: cover;
            background-position: center top;
          }
        }
        
        /* For very large screens (2560px and above) */
        @media (min-width: 2560px) {
          .hero-background {
            background-size: cover;
            background-position: center;
          }
        }
        
        /* For tablet screens */
        @media (max-width: 1024px) {
          .hero-background {
            background-image: url('https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80');
            background-position: center;
          }
        }
        
        /* For mobile landscape */
        @media (max-width: 768px) {
          .hero-background {
            background-image: url('https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80');
            background-position: 70% center;
          }
        }
        
        /* For mobile portrait */
        @media (max-width: 480px) {
          .hero-background {
            background-image: url('https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80');
            background-position: 75% center;
          }
        }
        
        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.35) 100%);
          z-index: 1;
        }
        
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 800px;
          width: 90%;
          padding: 0 24px;
          color: white;
        }
        
        .hero-badge {
          display: inline-block;
          padding: 8px 20px;
          background: rgba(212, 165, 165, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 40px;
          font-size: 12px;
          letter-spacing: 3px;
          margin-bottom: 24px;
          font-weight: 500;
        }
        
        .hero-title {
          font-size: clamp(32px, 5vw, 64px);
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .hero-accent {
          color: #D4A5A5;
        }
        
        .hero-subtitle {
          font-size: clamp(14px, 2vw, 18px);
          opacity: 0.95;
          margin-bottom: 32px;
          line-height: 1.6;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .hero-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .hero-btn-primary {
          padding: 14px 36px;
          background: white;
          border: none;
          border-radius: 40px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 14px;
          letter-spacing: 0.5px;
        }
        
        .hero-btn-primary:hover {
          background: #D4A5A5;
          color: white;
          transform: translateY(-3px);
        }
        
        .hero-btn-secondary {
          padding: 14px 36px;
          background: transparent;
          border: 1.5px solid white;
          border-radius: 40px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 14px;
          letter-spacing: 0.5px;
        }
        
        .hero-btn-secondary:hover {
          background: white;
          color: #1A1A2E;
          transform: translateY(-3px);
        }
        
        /* Tablet */
        @media (max-width: 768px) {
          .hero-badge {
            font-size: 10px;
            padding: 6px 16px;
          }
          
          .hero-buttons {
            gap: 15px;
          }
          
          .hero-btn-primary,
          .hero-btn-secondary {
            padding: 12px 28px;
            font-size: 13px;
          }
        }
        
        /* Mobile */
        @media (max-width: 480px) {
          .hero-section {
            min-height: 550px;
          }
          
          .hero-badge {
            font-size: 9px;
            padding: 6px 14px;
            margin-bottom: 16px;
          }
          
          .hero-buttons {
            flex-direction: column;
            align-items: center;
            gap: 12px;
            width: 100%;
            max-width: 250px;
            margin: 0 auto;
          }
          
          .hero-btn-primary,
          .hero-btn-secondary {
            width: 100%;
            padding: 12px 20px;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;