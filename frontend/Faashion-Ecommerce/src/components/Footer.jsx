// Footer.jsx - Professional Redesign
import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaPinterestP, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-newsletter">
        <div className="container-custom">
          <div className="newsletter-content">
            <h3>Join Our Newsletter</h3>
            <p>Subscribe to receive exclusive offers, early access, and fashion inspiration.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Your email address" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-main">
        <div className="container-custom">
          <div className="footer-grid">
            <div className="footer-brand">
              <h2>ÉLÉGANCE<span>Studio</span></h2>
              <p>Luxury fashion for the modern woman. Timeless elegance meets contemporary design.</p>
              <div className="footer-social">
                <a href="#"><FaFacebookF /></a>
                <a href="#"><FaInstagram /></a>
                <a href="#"><FaTwitter /></a>
                <a href="#"><FaPinterestP /></a>
                <a href="#"><FaYoutube /></a>
              </div>
            </div>
            
            <div className="footer-links-group">
              <h4>Shop</h4>
              <Link to="/collection">All Products</Link>
              <Link to="/category/dresses">Dresses</Link>
              <Link to="/category/tops">Tops</Link>
              <Link to="/category/skirts">Skirts</Link>
              <Link to="/sale">Sale</Link>
            </div>
            
            <div className="footer-links-group">
              <h4>Help</h4>
              <Link to="/contact">Contact Us</Link>
              <Link to="/shipping">Shipping Info</Link>
              <Link to="/returns">Returns</Link>
              <Link to="/size-guide">Size Guide</Link>
              <Link to="/faq">FAQ</Link>
            </div>
            
            <div className="footer-links-group">
              <h4>Company</h4>
              <Link to="/about">About Us</Link>
              <Link to="/sustainability">Sustainability</Link>
              <Link to="/press">Press</Link>
              <Link to="/careers">Careers</Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container-custom">
          <div className="footer-bottom-content">
            <p>&copy; 2026 ÉLÉGANCE Studio. All rights reserved.</p>
            <div className="footer-bottom-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/cookies">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .footer {
          background: #111;
          color: #fff;
        }
        
        .footer-newsletter {
          background: var(--primary-dark);
          padding: 60px 0;
          text-align: center;
        }
        
        .newsletter-content h3 {
          font-size: 28px;
          margin-bottom: 12px;
        }
        
        .newsletter-content p {
          color: rgba(255,255,255,0.7);
          margin-bottom: 24px;
        }
        
        .newsletter-form {
          display: flex;
          justify-content: center;
          gap: 12px;
          max-width: 500px;
          margin: 0 auto;
        }
        
        .newsletter-form input {
          flex: 1;
          padding: 14px 20px;
          border: none;
          border-radius: 8px;
          outline: none;
          font-size: 14px;
        }
        
        .newsletter-form button {
          padding: 14px 28px;
          background: var(--accent);
          border: none;
          border-radius: 8px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
        }
        
        .newsletter-form button:hover {
          background: var(--accent-dark);
        }
        
        .footer-main {
          padding: 60px 0 40px;
        }
        
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 50px;
        }
        
        .footer-brand h2 {
          font-size: 28px;
          margin-bottom: 16px;
        }
        
        .footer-brand h2 span {
          color: var(--accent);
        }
        
        .footer-brand p {
          color: rgba(255,255,255,0.6);
          line-height: 1.6;
          margin-bottom: 24px;
        }
        
        .footer-social {
          display: flex;
          gap: 16px;
        }
        
        .footer-social a {
          width: 38px;
          height: 38px;
          background: rgba(255,255,255,0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          transition: var(--transition);
        }
        
        .footer-social a:hover {
          background: var(--accent);
          transform: translateY(-3px);
        }
        
        .footer-links-group h4 {
          font-size: 18px;
          margin-bottom: 20px;
          color: white;
        }
        
        .footer-links-group a {
          display: block;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          margin-bottom: 12px;
          font-size: 14px;
          transition: var(--transition);
        }
        
        .footer-links-group a:hover {
          color: var(--accent);
          transform: translateX(5px);
        }
        
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.1);
          padding: 24px 0;
        }
        
        .footer-bottom-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }
        
        .footer-bottom p {
          color: rgba(255,255,255,0.5);
          font-size: 13px;
        }
        
        .footer-bottom-links {
          display: flex;
          gap: 24px;
        }
        
        .footer-bottom-links a {
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          font-size: 13px;
          transition: var(--transition);
        }
        
        .footer-bottom-links a:hover {
          color: var(--accent);
        }
        
        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
        }
        
        @media (max-width: 576px) {
          .footer-grid {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .footer-social {
            justify-content: center;
          }
          .footer-bottom-content {
            flex-direction: column;
            text-align: center;
          }
          .footer-bottom-links {
            justify-content: center;
            flex-wrap: wrap;
          }
          .newsletter-form {
            flex-direction: column;
            padding: 0 20px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;