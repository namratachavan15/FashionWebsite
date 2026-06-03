import dress1 from "../assets/images/productimage7.jpg";
import dress2 from "../assets/images/productimage8.jpg";
import dress3 from "../assets/images/productimage9.jpg";

const Collection3 = () => {
  return (
    <div className="container py-5">

      <div className="row text-center">

        {/* Card 1 */}
        <div className="col-md-4 mb-4">
          <img src={dress1} className="img-fluid" alt="dress" />

          <h5 className="mt-3" style={{fontFamily: "'Cormorant Garamond', serif",fontSize: "28px",fontWeight: 500}}>Luxury Brown Dress</h5>
          <p className="text-muted small">Unique Collection</p>

          <h6 style={{ fontFamily: "'Playfair Display', serif" ,fontWeight:'bold'}}>$4500</h6>

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

          <h5 className="mt-3" style={{fontFamily: "'Cormorant Garamond', serif",fontSize: "28px",fontWeight: 500}}>Premium Brown Dress</h5>
          <p className="text-muted small">Unique Collection</p>

          <h6 style={{ fontFamily: "'Playfair Display', serif" ,fontWeight:'bold'}}>$4500</h6>

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

          <h5 className="mt-3" style={{fontFamily: "'Cormorant Garamond', serif",fontSize: "28px",fontWeight: 500}}> Luxury White Dress </h5>
          <p className="text-muted small">Unique Collection</p>

          <h6 style={{ fontFamily: "'Playfair Display', serif" ,fontWeight:'bold'}}>$4500</h6>

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

export default Collection3;