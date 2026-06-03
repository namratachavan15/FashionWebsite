import dress1 from "../assets/images/productimage4.jpg";
import dress2 from "../assets/images/productimage5.jpg";
import dress3 from "../assets/images/productimage6.jpg";

const Collection2 = () => {
  return (
    <div className="container py-5">

      <div className="row text-center">

        {/* Card 1 */}
        <div className="col-md-4 mb-4">
          <img src={dress1} className="img-fluid" alt="dress" />

          <h5 className="mt-3" style={{fontFamily: "'Cormorant Garamond', serif",fontSize: "28px",fontWeight: 500}}>Special Brown Dress</h5>
          <p className="text-muted small">Unique Collection</p>

          <h6 style={{ fontFamily: "'Playfair Display', serif" ,fontWeight:'bold'}}>$2500</h6>

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

          <h5 className="mt-3" style={{fontFamily: "'Cormorant Garamond', serif",fontSize: "28px",fontWeight: 500}}>Special Luxury Dress</h5>
          <p className="text-muted small">Unique Collection</p>

          <h6 style={{ fontFamily: "'Playfair Display', serif" ,fontWeight:'bold'}}>$5200</h6>

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

          <h5 className="mt-3" style={{fontFamily: "'Cormorant Garamond', serif",fontSize: "28px",fontWeight: 500}}>Super Luxury Dress </h5>
          <p className="text-muted small">Unique Collection</p>

          <h6 style={{ fontFamily: "'Playfair Display', serif" ,fontWeight:'bold'}}>$8500</h6>

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

export default Collection2;