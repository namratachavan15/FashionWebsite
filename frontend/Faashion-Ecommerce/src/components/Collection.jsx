import dress1 from "../assets/images/productimage1.jpg";
import dress2 from "../assets/images/productimage2.jpg";
import dress3 from "../assets/images/productimage3.jpg";

const Collection = () => {
  return (
    <div className="container py-5">

      {/* Heading */}
      <h2 className="mb-5" style={{ fontFamily: "serif" }}>
        Our Collection
      </h2>

      <div className="row text-center">

        {/* Card 1 */}
        <div className="col-md-4 mb-4">
          <img src={dress1} className="img-fluid" alt="dress" />

          <h5 className="mt-3"  style={{fontFamily: "'Cormorant Garamond', serif",fontSize: "25px",fontWeight: 800}}>Luxury Dress</h5>
          <p className="text-muted small">Special Edition</p>

          <h6 style={{ fontFamily: "'Playfair Display', serif" ,fontWeight:'bold'}}>$3500</h6>

          <button className="btn w-100 mt-2" style={{ background: "#8c8575", color: "#fff" }}>
            View product
          </button>

          <button className="btn btn-light w-100 mt-2 border">
            Learn more
          </button>
        </div>

        {/* Card 2 */}
        <div className="col-md-4 mb-4">
          <img src={dress2} className="img-fluid" alt="dress" />

          <h5 className="mt-3" style={{fontFamily: "'Cormorant Garamond', serif",fontSize: "25px",fontWeight: 800}}>Luxury Black Clothing</h5>
          <p className="text-muted small">Luxury Collection</p>

          <h6 style={{ fontFamily: "'Playfair Display', serif" ,fontWeight:'bold'}}>$1050</h6>

          <button className="btn w-100 mt-2" style={{ background: "#8c8575", color: "#fff" }}>
            View product
          </button>

          <button className="btn btn-light w-100 mt-2 border">
            Learn more
          </button>
        </div>

        {/* Card 3 */}
        <div className="col-md-4 mb-4">
          <img src={dress3} className="img-fluid" alt="dress" />

          <h5 className="mt-3" style={{fontFamily: "'Cormorant Garamond', serif",fontSize: "25px",fontWeight: 800}}>Luxury Blue Dress</h5>
          <p className="text-muted small">Summer Edition</p>

          <h6 style={{ fontFamily: "'Playfair Display', serif" ,fontWeight:'bold'}}>$5000</h6>
          <button className="btn w-100 mt-2" style={{ background: "#8c8575", color: "#fff" }}>
            View product
          </button>

          <button className="btn btn-light w-100 mt-2 border">
            Learn more
          </button>
        </div>

      </div>
    </div>






  );
};

export default Collection;