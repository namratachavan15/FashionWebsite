// ProductDetails.jsx - Complete file with modern arrow styles for carousel
import { useParams, useNavigate } from "react-router-dom";

import { useSize } from "../context/SizeContext";
import { useState, useEffect, useRef } from "react";
import { useCart } from "../context/CartContext";
import { ChevronRight, Home, Star, ShoppingBag, Heart, Minus, Plus, Shield, Truck, RotateCcw } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";

const API = "http://localhost:8081";

const ProductDetails = () => {
  const getRating = (id) => {
    const ratings = [4, 4.5, 3.5, 5, 4];
    return ratings[id % ratings.length];
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  const { size: sizes } = useSize();
  const { addToCart } = useCart();

  const {
  addToWishlist,
  removeFromWishlist,
  isWishlisted,
} = useWishlist();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
 const [selectedColor, setSelectedColor] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const { user } = useAuth();


  // FETCH SINGLE PRODUCT
  useEffect(() => {
    setLoading(true);
    fetch(`${API}/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);


  // FETCH ALL PRODUCTS
  useEffect(() => {
    fetch(`${API}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  // SCROLL TOP
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 320, behavior: "smooth" });
  };

  const handleAddToCart = () => {
   if (!selectedSize){
      alert("Please select size and color");
      return;
    }

    if (product.stock <= 0) {
      alert("Product Out Of Stock");
      return;
    }

    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      size: selectedSize,
     color: product.color,
    });

    navigate("/cart");
  };

const toggleWishlist = async () => {

  if (!user) {
    navigate("/login");
    return;
  }

  try {

    if (isWishlisted(product.id)) {

      await removeFromWishlist(product.id);

    } else {

      await addToWishlist(product);

    }

  } catch (err) {
    console.log(err);
  }
};

  const renderStars = (rating) => {
    return (
      <div className="stars-container">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={18}
            fill={i < Math.floor(rating) ? "#C9A96E" : "none"}
            color="#C9A96E"
            style={{ fillOpacity: i < Math.floor(rating) ? 1 : 0 }}
          />
        ))}
        <span className="rating-value">{rating.toFixed(1)}</span>
      </div>
    );
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading product details...</p>
        </div>
        <style jsx>{`
          .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 60vh;
            gap: 20px;
          }
          .loading-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid var(--border-light);
            border-top-color: var(--accent);
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <div className="not-found">
          <h2>Product Not Found</h2>
          <button onClick={() => navigate("/collection")}>Browse Collection</button>
        </div>
      </>
    );
  }

  const similarProducts = products
  .filter(
    (p) =>
      p.id !== product.id &&
      p.category === product.category
  )
  .slice(0, 8);

  return (
    <>
      <Header />
      
      <div className="product-details-page">
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
            <button onClick={() => navigate(`/category/${product.category}`)} className="breadcrumb-link">
              {product.category}
            </button>
            <ChevronRight size={14} className="breadcrumb-separator" />
            <span className="breadcrumb-current">{product.name}</span>
          </div>

          {/* PRODUCT MAIN SECTION */}
          <div className="product-main">
            {/* IMAGE GALLERY */}
            <div className="product-gallery">
              <div className="main-image">
                <img
                  src={product.image?.startsWith("http") ? product.image : `${API}${product.image}`}
                  alt={product.name}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/600x700?text=No+Image";
                  }}
                />
<button
  className="wishlist-btn"
  onClick={toggleWishlist}
>
  <Heart
    size={20}
    fill={isWishlisted(product.id) ? "red" : "none"}
    color={isWishlisted(product.id) ? "red" : "black"}
  />
</button>
              </div>
            </div>

            {/* PRODUCT INFO */}
            <div className="product-info-section">
              <div className="product-header">
                <span className="product-category">{product.category}</span>
                <h1 className="product-title">{product.name}</h1>
                <p className="product-subtitle">{product.subtitle}</p>
                <div className="selected-product-color">
  <strong>Selected Color:</strong> {product.color}
</div>
                {renderStars(getRating(product.id))}
              </div>

              <div className="product-price">
                <span className="current-price">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <>
                    <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
                    <span className="discount-badge">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* STOCK STATUS */}
              <div className="stock-status">
                {product.stock > 0 ? (
                  <span className="in-stock">✓ In Stock ({product.stock} items left)</span>
                ) : (
                  <span className="out-of-stock">✗ Out of Stock</span>
                )}
              </div>

              {/* SIZE SELECTION */}
              <div className="option-group">
                <div className="option-header">
                  <label>Select Size</label>
                  <button
                    className="size-guide-btn"
                    onClick={() => setShowSizeGuide(true)}
                  >
                    Size Guide →
                  </button>
                </div>
                <div className="size-options">
                  {sizes?.map((s) => (
                    <button
                      key={s.id}
                      className={`size-btn ${selectedSize === s.value ? "active" : ""}`}
                      onClick={() => setSelectedSize(s.value)}
                    >
                      {s.value}
                    </button>
                  ))}
                </div>
              </div>

              {/* COLOR SELECTION */}
              {/* <div className="option-group">
                <label>Select Color</label>
                <div className="color-options">
                  {color?.map((c) => (
                    <button
                      key={c.id}
                      className={`color-btn ${selectedColor === c.value ? "active" : ""}`}
                      style={{ backgroundColor: c.colorCode || "#ccc" }}
                      onClick={() => setSelectedColor(c.value)}
                      title={c.value}
                    >
                      {!c.colorCode && c.value?.charAt(0)}
                    </button>
                  ))}
                </div>
                {selectedColor && <span className="selected-color">{selectedColor}</span>}
              </div> */}

              {/* QUANTITY */}
              <div className="option-group">
                <label>Quantity</label>
                <div className="quantity-selector">
                  <button
                    className="qty-btn"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="qty-value">{quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* ADD TO CART BUTTON */}
              <button
                className={`add-to-cart-btn ${product.stock <= 0 ? "disabled" : ""}`}
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
              >
                <ShoppingBag size={18} />
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </button>

              {/* FEATURES */}
              <div className="product-features">
                <div className="feature">
                  <Truck size={20} />
                  <div>
                    <strong>Free Shipping</strong>
                    <span>On orders over ₹5000</span>
                  </div>
                </div>
                <div className="feature">
                  <RotateCcw size={20} />
                  <div>
                    <strong>Easy Returns</strong>
                    <span>30 days return policy</span>
                  </div>
                </div>
                <div className="feature">
                  <Shield size={20} />
                  <div>
                    <strong>Secure Payment</strong>
                    <span>100% secure checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PRODUCT DESCRIPTION WITH WORKING TABS */}
          <div className="product-description">
            <div className="tabs">
              <button 
                className={`tab ${activeTab === "description" ? "active" : ""}`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
              <button 
                className={`tab ${activeTab === "details" ? "active" : ""}`}
                onClick={() => setActiveTab("details")}
              >
                Details & Care
              </button>
              <button 
                className={`tab ${activeTab === "shipping" ? "active" : ""}`}
                onClick={() => setActiveTab("shipping")}
              >
                Shipping & Returns
              </button>
            </div>
            
            <div className="description-content">
              {/* DESCRIPTION TAB */}
              {activeTab === "description" && (
                <div className="tab-content">
                  <p>{product.description || "This elegant piece is crafted with premium quality materials, designed to provide both comfort and style. Perfect for any occasion, this dress will make you feel confident and beautiful."}</p>
                  
                  <h4>Product Highlights</h4>
                  <ul>
                    <li>Premium quality fabric for ultimate comfort</li>
                    <li>Expertly tailored for a perfect fit</li>
                    <li>Versatile design suitable for multiple occasions</li>
                    <li>Easy to care for and maintain</li>
                    <li>Made with sustainable practices</li>
                  </ul>
                  
                  <h4>Fabric & Care</h4>
                  <ul>
                    <li>100% Premium Cotton / Polyester blend</li>
                    <li>Machine wash cold with similar colors</li>
                    <li>Do not bleach</li>
                    <li>Iron on low heat if needed</li>
                    <li>Hang dry for best results</li>
                  </ul>
                </div>
              )}
              
              {/* DETAILS TAB */}
              {activeTab === "details" && (
                <div className="tab-content">
                  <h4>Product Details</h4>
                  {Array.isArray(product.details) && product.details.length > 0 ? (
                    <ul>
                      {product.details.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  ) : (
                    <ul>
                      <li>Premium quality material</li>
                      <li>Available in multiple sizes and colors</li>
                      <li>Model is wearing size S</li>
                      <li>True to size fit</li>
                      <li>Length: Approximately 45 inches</li>
                    </ul>
                  )}
                  
                  <h4>Size & Fit</h4>
                  <ul>
                    <li>Regular fit - order your usual size</li>
                    <li>Model height: 5'7" wearing size S</li>
                    <li>Inseam length varies by size</li>
                    <li>Refer to our size guide for exact measurements</li>
                  </ul>
                  
                  <h4>Material Composition</h4>
                  <ul>
                    <li>Main Fabric: 95% Polyester, 5% Spandex</li>
                    <li>Lining: 100% Viscose</li>
                    <li>Buttons: Premium quality</li>
                  </ul>
                </div>
              )}
              
              {/* SHIPPING TAB */}
              {activeTab === "shipping" && (
                <div className="tab-content">
                  <h4>Shipping Information</h4>
                  <ul>
                    <li><strong>Free Shipping:</strong> On all orders above ₹5000</li>
                    <li><strong>Standard Shipping:</strong> ₹199 - Delivery within 5-7 business days</li>
                    <li><strong>Express Shipping:</strong> ₹399 - Delivery within 2-3 business days</li>
                    <li><strong>Same Day Delivery:</strong> Available in select cities (Additional charges apply)</li>
                    <li><strong>International Shipping:</strong> Available worldwide with tracking</li>
                  </ul>
                  
                  <h4>Returns & Exchanges</h4>
                  <ul>
                    <li><strong>30-Day Return Policy:</strong> Easy returns within 30 days of delivery</li>
                    <li><strong>Free Returns:</strong> On all prepaid orders</li>
                    <li><strong>Condition:</strong> Items must be unworn, unwashed, with original tags</li>
                    <li><strong>Exchange:</strong> Free size exchange available</li>
                    <li><strong>Refund:</strong> Processed within 5-7 business days after pickup</li>
                  </ul>
                  
                  <h4>Need Help?</h4>
                  <ul>
                    <li>Contact our customer support: support@elegancestudio.com</li>
                    <li>Call us: +91 98765 43210 (Mon-Sat, 10 AM - 7 PM)</li>
                    <li>Live chat available on our website</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* SIMILAR PRODUCTS - EQUAL SIZE CARDS WITH MODERN ARROWS */}
          {similarProducts.length > 0 && (
            <div className="similar-products">
              <div className="section-header">
                <span className="section-subtitle">You May Also Like</span>
                <h2 className="section-title">Similar Products</h2>
                <div className="section-divider"></div>
              </div>

              <div className="slider-container">
                <button className="slider-btn left" onClick={scrollLeft}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className="slider-btn right" onClick={scrollRight}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <div className="products-slider" ref={sliderRef}>
                  {similarProducts.map((p) => (
                    <div key={p.id} className="similar-product-card">
                      <div className="product-image">
                        <img
                          src={p.image?.startsWith("http") ? p.image : `${API}${p.image}`}
                          alt={p.name}
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/300x350?text=No+Image";
                          }}
                        />
                      </div>
                      <div className="product-info">
                        <h3>{p.name}</h3>
                        <p className="product-category">{p.subtitle}</p>
                        <div className="product-price">
                          <span>₹{p.price.toLocaleString()}</span>
                        </div>
                        <button onClick={() => navigate(`/product/${p.id}`)}>
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SIZE GUIDE MODAL */}
      {showSizeGuide && (
        <div
          className="size-guide-overlay"
          onClick={() => setShowSizeGuide(false)}
        >
          <div
            className="size-guide-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-modal"
              onClick={() => setShowSizeGuide(false)}
            >
              ✕
            </button>

            <h2>Size Guide</h2>

            <table className="size-table">
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Bust</th>
                  <th>Waist</th>
                  <th>Hip</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>S</td>
                  <td>34"</td>
                  <td>28"</td>
                  <td>36"</td>
                </tr>
                <tr>
                  <td>M</td>
                  <td>36"</td>
                  <td>30"</td>
                  <td>38"</td>
                </tr>
                <tr>
                  <td>L</td>
                  <td>38"</td>
                  <td>32"</td>
                  <td>40"</td>
                </tr>
                <tr>
                  <td>XL</td>
                  <td>40"</td>
                  <td>34"</td>
                  <td>42"</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Footer />

      <style jsx>{`
        .product-details-page {
          background: var(--bg-light);
          min-height: 100vh;
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
        
        /* PRODUCT MAIN */
        .product-main {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
          background: white;
          border-radius: 24px;
          padding: 40px;
          margin-bottom: 40px;
          box-shadow: var(--shadow-sm);
        }
        
        .product-gallery {
          position: relative;
        }
        
        .main-image {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
        }
        
        .main-image img {
          width: 100%;
          height: auto;
          object-fit: cover;
          border-radius: 16px;
        }
        
        .wishlist-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 40px;
          height: 40px;
          background: white;
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition);
          box-shadow: var(--shadow-sm);
        }
        
        .wishlist-btn:hover {
          background: var(--accent);
          color: white;
        }
        
        .product-header {
          margin-bottom: 20px;
        }
        
        .product-category {
          display: inline-block;
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 12px;
        }
        
        .product-title {
          font-size: 32px;
          font-weight: 600;
          margin-bottom: 10px;
          color: var(--primary-dark);
        }
        
        .product-subtitle {
          font-size: 16px;
          color: var(--text-muted);
          margin-bottom: 12px;
        }
        
        .stars-container {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        
        .rating-value {
          color: var(--text-muted);
          font-size: 13px;
          margin-left: 6px;
        }
        
        .product-price {
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border-light);
        }
        
        .current-price {
          font-size: 32px;
          font-weight: 700;
          color: var(--primary-dark);
        }
        
        .original-price {
          font-size: 20px;
          color: var(--text-muted);
          text-decoration: line-through;
          margin-left: 12px;
        }
        
        .discount-badge {
          display: inline-block;
          background: #e8f7ee;
          color: #2e7d32;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          margin-left: 12px;
        }
        
        .stock-status {
          margin-bottom: 24px;
        }
        
        .in-stock {
          color: #2e7d32;
          font-size: 14px;
          font-weight: 500;
        }
        
        .out-of-stock {
          color: #d32f2f;
          font-size: 14px;
          font-weight: 500;
        }
        
        .option-group {
          margin-bottom: 24px;
        }
        
        .option-group label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 12px;
          color: var(--text-dark);
        }
        
        .option-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        
        .size-guide-btn {
          background: none;
          border: none;
          font-size: 12px;
          color: var(--accent);
          cursor: pointer;
        }
        
        .size-options {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        
        .size-btn {
          width: 48px;
          height: 48px;
          border: 1.5px solid var(--border-light);
          background: white;
          border-radius: 8px;
          cursor: pointer;
          transition: var(--transition);
          font-weight: 500;
        }
        
        .size-btn:hover, .size-btn.active {
          border-color: var(--primary-dark);
          background: var(--primary-dark);
          color: white;
        }
        
        .color-options {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .selected-product-color {
  margin: 12px 0;
  font-size: 15px;
  color: #333;
}

.selected-product-color strong {
  font-weight: 600;
}
        .color-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid var(--border-light);
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
        }
        
        .color-btn:hover, .color-btn.active {
          border-color: var(--primary-dark);
          transform: scale(1.1);
        }
        
        .selected-color {
          display: inline-block;
          margin-top: 8px;
          font-size: 12px;
          color: var(--text-muted);
        }
        
        .quantity-selector {
          display: flex;
          align-items: center;
          gap: 16px;
          border: 1px solid var(--border-light);
          border-radius: 40px;
          width: fit-content;
        }
        
        .qty-btn {
          width: 40px;
          height: 40px;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
        }
        
        .qty-btn:hover:not(:disabled) {
          color: var(--accent);
        }
        
        .qty-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .qty-value {
          font-size: 16px;
          font-weight: 500;
          min-width: 30px;
          text-align: center;
        }
        
        .add-to-cart-btn {
          width: 100%;
          padding: 16px;
          background: var(--primary-dark);
          color: white;
          border: none;
          border-radius: 40px;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 24px;
        }
        
        .add-to-cart-btn:hover:not(.disabled) {
          background: var(--accent);
          transform: translateY(-2px);
        }
        
        .add-to-cart-btn.disabled {
          background: #ccc;
          cursor: not-allowed;
        }
        
        .product-features {
          display: flex;
          gap: 20px;
          padding-top: 20px;
          border-top: 1px solid var(--border-light);
        }
        
        .feature {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          color: var(--text-muted);
        }
        
        .feature strong {
          display: block;
          color: var(--text-dark);
        }
        
        /* DESCRIPTION WITH TABS */
        .product-description {
          background: white;
          border-radius: 24px;
          padding: 40px;
          margin-bottom: 60px;
          box-shadow: var(--shadow-sm);
        }
        
        .tabs {
          display: flex;
          gap: 30px;
          border-bottom: 1px solid var(--border-light);
          margin-bottom: 24px;
        }
        
        .tab {
          background: none;
          border: none;
          padding: 12px 0;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          color: var(--text-muted);
          transition: var(--transition);
          position: relative;
        }
        
        .tab:hover {
          color: var(--accent);
        }
        
        .tab.active {
          color: var(--accent);
        }
        
        .tab.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--accent);
        }
        
        .tab-content {
          animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .tab-content p {
          line-height: 1.8;
          color: var(--text-muted);
          margin-bottom: 24px;
        }
        
        .tab-content h4 {
          font-size: 18px;
          margin: 24px 0 16px;
          color: var(--text-dark);
        }
        
        .tab-content h4:first-of-type {
          margin-top: 0;
        }
        
        .tab-content ul {
          padding-left: 20px;
          line-height: 1.8;
          color: var(--text-muted);
        }
        
        .tab-content li {
          margin-bottom: 8px;
        }
        
        /* SIMILAR PRODUCTS - MODERN ARROW STYLES */
        .similar-products {
          margin-top: 20px;
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 40px;
        }
        
        .section-subtitle {
          font-size: 13px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--accent);
          font-weight: 500;
        }
        
        .section-title {
          font-size: 36px;
          font-weight: 600;
          margin-top: 12px;
          margin-bottom: 16px;
          color: var(--primary-dark);
        }
        
        .section-divider {
          width: 60px;
          height: 3px;
          background: var(--accent);
          margin: 0 auto;
        }
        
        .slider-container {
          position: relative;
          padding: 0 20px;
        }
        
        /* MODERN ARROW BUTTONS */
        .slider-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          background: white;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          z-index: 10;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary-dark);
        }
        
        .slider-btn:hover {
          background: var(--primary-dark);
          color: white;
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }
        
        .slider-btn:active {
          transform: translateY(-50%) scale(0.95);
        }
        
        .slider-btn.left {
          left: -24px;
        }
        
        .slider-btn.right {
          right: -24px;
        }
        
        .slider-btn svg {
          width: 24px;
          height: 24px;
          stroke-width: 2;
          transition: all 0.3s ease;
        }
        
        .slider-btn:hover svg {
          stroke: white;
        }
        
        .products-slider {
          display: flex;
          gap: 24px;
          overflow-x: auto;
          scroll-behavior: smooth;
          scrollbar-width: none;
          padding: 10px 0 20px;
          scroll-snap-type: x mandatory;
        }
        
        .products-slider::-webkit-scrollbar {
          display: none;
        }
        
        .similar-product-card {
          scroll-snap-align: start;
          flex: 0 0 260px;
          width: 260px;
          background: white;
          border-radius: 16px;
          overflow: hidden;
          transition: var(--transition);
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          height: 450px;
        }
        
        .similar-product-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }
        
        .product-image {
          flex-shrink: 0;
          height: 280px;
          overflow: hidden;
        }
        
        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .similar-product-card:hover .product-image img {
          transform: scale(1.05);
        }
        
        .similar-product-card .product-info {
          flex: 1;
          padding: 16px;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        
        .similar-product-card .product-info h3 {
          font-size: 16px;
          margin-bottom: 6px;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .similar-product-card .product-category {
          font-size: 12px;
          color: var(--text-muted);
          margin-bottom: 8px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .similar-product-card .product-price {
          font-size: 18px;
          font-weight: 600;
          color: var(--primary-dark);
          margin-bottom: 12px;
          padding-bottom: 0;
          border: none;
        }
        
        .similar-product-card button {
          width: 100%;
          padding: 10px;
          background: transparent;
          border: 1px solid var(--primary-dark);
          border-radius: 30px;
          cursor: pointer;
          transition: var(--transition);
          font-weight: 500;
          margin-top: auto;
        }
        
        .similar-product-card button:hover {
          background: var(--primary-dark);
          color: white;
        }
        
        .not-found {
          text-align: center;
          padding: 100px 20px;
        }
        
        .not-found button {
          margin-top: 20px;
          padding: 12px 32px;
          background: var(--primary-dark);
          color: white;
          border: none;
          border-radius: 40px;
          cursor: pointer;
        }
        
        /* SIZE GUIDE MODAL */
        .size-guide-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
        }
        
        .size-guide-modal {
          background: white;
          width: 100%;
          max-width: 600px;
          border-radius: 20px;
          padding: 30px;
          position: relative;
          animation: modalFade 0.3s ease;
          box-shadow: 0 20px 60px rgba(0,0,0,0.2);
        }
        
        @keyframes modalFade {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .close-modal {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 36px;
          height: 36px;
          border: none;
          border-radius: 50%;
          background: #f5f5f5;
          cursor: pointer;
          font-size: 18px;
          transition: 0.3s ease;
        }
        
        .close-modal:hover {
          background: var(--primary-dark);
          color: white;
        }
        
        .size-guide-modal h2 {
          margin-bottom: 24px;
          font-size: 28px;
          color: var(--primary-dark);
          text-align: center;
        }
        
        .size-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .size-table th,
        .size-table td {
          border: 1px solid var(--border-light);
          padding: 14px;
          text-align: center;
        }
        
        .size-table th {
          background: var(--primary-dark);
          color: white;
          font-weight: 600;
        }
        
        .size-table tr:nth-child(even) {
          background: #fafafa;
        }
        
        /* RESPONSIVE */
        @media (max-width: 992px) {
          .product-main {
            grid-template-columns: 1fr;
            gap: 30px;
            padding: 24px;
          }
          
          .slider-btn {
            width: 40px;
            height: 40px;
          }
          
          .slider-btn.left {
            left: -16px;
          }
          
          .slider-btn.right {
            right: -16px;
          }
          
          .slider-btn svg {
            width: 20px;
            height: 20px;
          }
        }
        
        @media (max-width: 768px) {
          .product-details-page {
            padding: 20px 0 40px;
          }
          
          .product-title {
            font-size: 24px;
          }
          
          .current-price {
            font-size: 24px;
          }
          
          .product-features {
            flex-direction: column;
            gap: 12px;
          }
          
          .similar-product-card {
            flex: 0 0 220px;
            width: 220px;
            height: 380px;
          }
          
          .product-image {
            height: 240px;
          }
          
          .slider-btn {
            display: none;
          }
          
          .slider-container {
            padding: 0;
          }
          
          .tabs {
            gap: 15px;
            overflow-x: auto;
          }
          
          .tab {
            white-space: nowrap;
            font-size: 14px;
          }
          
          .size-guide-modal {
            padding: 20px;
          }
          
          .size-guide-modal h2 {
            font-size: 22px;
          }
          
          .size-table th,
          .size-table td {
            padding: 10px;
            font-size: 14px;
          }
        }
      `}</style>
    </>
  );
};

export default ProductDetails;